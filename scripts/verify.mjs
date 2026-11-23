import assert from "node:assert/strict";
const base = process.env.BASE_URL || "http://localhost:3002";
const runId = Date.now();
const response = await fetch(`${base}/sitemap.xml`);
assert.equal(response.status, 200, "Sitemap must load");
const sitemap = await response.text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
const failures = [];
const knownPaths = new Set(paths);
const descriptions = new Set();
console.log(`Checking ${paths.length} sitemap pages at ${base}…`);
let cursor = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (cursor < paths.length) {
      const path = paths[cursor++];
      const res = await fetch(`${base}${path}`, {
        signal: AbortSignal.timeout(60000),
      });
      const html = await res.text();
      const description = html.match(
        /<meta name="description" content="([^"]+)"/,
      );
      if (!description || descriptions.has(description[1]))
        failures.push(`${path}: missing or duplicate description`);
      else descriptions.add(description[1]);
      if (res.status !== 200 || !html.includes("<h1"))
        failures.push(`${path}: ${res.status}`);
      for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
        if (match[1].startsWith("/") && !match[1].startsWith("//")) {
          const destination = match[1].split(/[?#]/)[0];
          if (!knownPaths.has(destination))
            failures.push(`${path}: broken link ${destination}`);
        }
      }
    }
  }),
);
assert.deepEqual(failures, [], "All site pages must render");
assert.equal(
  (await fetch(`${base}/this-page-does-not-exist`)).status,
  404,
  "Unknown route must return 404",
);
const valid = {
  name: "Sample Buyer",
  company: "Demo Business",
  email: "buyer@example.com",
  phone: "",
  country: "India",
  category: "men",
  fabric: "Cotton",
  quantity: "250",
  sizes: "S–XL",
  decoration: "",
  branding: "",
  packaging: "",
  date: "",
  message: "Sample inquiry for validation testing only.",
  consent: true,
  website: "",
  products: ["round-neck-t-shirt"],
  sample: false,
};
async function post(data, ip, file, origin) {
  const body = new FormData();
  body.set("data", JSON.stringify(data));
  if (file) body.set("file", file, "reference.png");
  return fetch(`${base}/api/inquiry`, {
    method: "POST",
    body,
    headers: {
      "x-forwarded-for": `${ip}-${runId}`,
      ...(origin ? { origin } : {}),
    },
  });
}
let res = await post(valid, "test-valid");
assert.equal(res.status, 503);
assert.match((await res.json()).message, /nothing was sent or stored/);
assert.equal(
  (await post({ ...valid, consent: false }, "test-consent")).status,
  400,
);
assert.equal(
  (await post({ ...valid, email: "invalid" }, "test-email")).status,
  400,
);
assert.equal(
  (await post({ ...valid, quantity: "0" }, "test-quantity")).status,
  400,
);
assert.equal(
  (await post({ ...valid, website: "bot" }, "test-spam")).status,
  400,
);
assert.equal(
  (await post({ ...valid, products: ["unknown-product"] }, "test-product"))
    .status,
  400,
);
assert.equal(
  (
    await post(
      valid,
      "test-file",
      new Blob(["not a png"], { type: "image/png" }),
    )
  ).status,
  400,
);
assert.equal(
  (await post(valid, "test-origin", undefined, "https://example.org")).status,
  403,
);
for (let i = 0; i < 5; i++)
  assert.equal((await post(valid, "test-ratelimit")).status, 503);
res = await post(valid, "test-ratelimit");
assert.equal(res.status, 429);
assert.equal(res.headers.get("retry-after"), "60");
console.log(
  `PASS: ${paths.length} pages, custom 404, inquiry demo response, schema validation, consent, honeypot, product references, file signature, origin and rate limiting.`,
);

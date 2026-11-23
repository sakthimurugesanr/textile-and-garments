# Textile & garments — company website

A complete Next.js App Router / TypeScript / Tailwind CSS B2B inquiry website. Warm ivory, navy and muted teal, editorial layouts, responsive navigation and an editable catalog. All company-specific information is a clearly labeled placeholder. No certifications, production figures, testimonials or export achievements are invented.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm ci
```

Copy `.env.example` to `.env.local`, then:

```sh
npm run dev
```

Open http://localhost:3000. To verify and build:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Webpack is selected explicitly because this Windows environment's Next.js 16.4.3 Turbopack CSS worker exits before connecting. Tailwind uses its standard PostCSS adapter. The existing Turbopack config remains available for environments that support it.

## Pages and editable content

- `/`: complete company landing page.
- `/about`, `/services`, `/services/[service]`.
- `/products`, `/products/category/[category]`, `/products/[product]`.
- `/fabrics`, `/manufacturing-process`, `/infrastructure`, `/quality`, `/sustainability`.
- `/private-label`, `/exports`, `/gallery`, `/insights`, `/insights/[article]`.
- `/faq`, `/contact`, `/request-a-quote`, `/privacy`, `/terms`.
- Custom not-found, loading and recoverable error views, sitemap, robots and Open Graph image.

`lib/data.ts` contains the company profile, 29 product directions, five categories, nine services, FAQs, process stages and six buyer articles. `components/page-content.tsx` contains the narrative company pages; `app/[...slug]/page.tsx` resolves and pre-renders all catalog/detail routes and rejects unknown paths. `components/common.tsx` provides shared page elements. Interactive components cover filters, persistent product inquiry references, mobile menus, form validation and a native accessible gallery dialog.

Theme values are centralized at the top of `app/globals.css`. Set `data-theme="slate"` on `<html>` for an alternate accent palette. System fonts are intentional: no remote font request or build-time font dependency. Media is local and rendered through `next/image`. GSAP/ScrollTrigger respect reduced motion, avoid small-screen parallax and revert on route unmount. Content remains visible without animation.

## Inquiry behavior — demo mode

The quote form and contact form share React Hook Form and Zod validation. Products are stored as product references in browser localStorage (`textile-inquiry`), never as checkout items. Multiple selections persist across navigation. A sample request preselects the product and sample intent.

`POST /api/inquiry` enforces same-origin requests, validates schema and product references, rejects a honeypot, checks file MIME type, signatures and 5 MB limit, and limits attempts to five per minute per forwarded address (or local fallback). The current limiter is process-local and is suitable only for this demo. In multi-instance production, use a trusted proxy identity and a shared durable rate-limit service.

**No delivery or file storage is configured.** Valid requests deliberately receive HTTP 503 with an explicit message that nothing was sent or stored. Invalid requests return 400, oversize requests 413 and repeated attempts 429. Browser loading, validation, network failure and demo responses are visible. A success style is implemented for a future confirmed 2xx delivery response; the demo never reports success. Use test data, not confidential tech packs.

### Connect real submission

1. Select a verified transactional email provider and private object storage. Add server-only credentials using your deployment provider's secret settings. The environment keys are documented placeholders; merely setting them does not activate delivery.
2. Replace the final demo response in `app/api/inquiry/route.ts` with your provider integration after all existing validation. Store files in a private bucket using generated object names, not user filenames. Scan attachments before staff access, define retention and restrict downloads.
3. Add a durable inquiry record/queue and an idempotency key before triggering email. Escape user content, keep recipient/sender server-configured, enforce timeouts and do not log personal data or attachments.
4. Return 2xx only after durable acceptance; return a clear failure on provider errors. Do not claim email delivery when only local validation passed. Update the demo notices and button only after end-to-end verification.
5. Replace the process-local limiter with a shared store and configure the trusted ingress. Enforce a request body limit at the hosting proxy as well as in the route. Add production bot protection where appropriate.
6. Test malformed data, missing consent, honeypot, incorrect file signatures, oversize files, provider outage, duplicate requests and retries. Verify staff receipt and safe file retrieval.

## Deployment

Deploy to a platform supporting the Next.js Node.js runtime (for example Vercel), or a Node server running `npm ci`, `npm run build`, then `npm start`. A static-only host cannot run the inquiry endpoint. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin before building. Configure a persistent file/object store rather than the server filesystem. Set proxy body limits and trusted forwarding headers. Never expose server credentials via public environment variables.

Preview pages are noindex and robots-disallowed by default. After all launch checks, set `NEXT_PUBLIC_LAUNCH_READY=true`, add the verified legal company name, and rebuild. Organization structured data appears only when both fields are configured; no placeholder organization claims are emitted. Breadcrumb and Article JSON-LD use visible content. Canonical and sitemap origins follow the configured site URL.

## Launch checklist

- [ ] Replace company name, legal entity, address, email, international phone, WhatsApp and business hours.
- [ ] Replace sample history, leadership and department information with approved facts.
- [ ] Verify every product, fabric, service, in-house operation and production-partner responsibility; remove unsupported offerings.
- [ ] Confirm machinery, capacity, floor area and employee information before adding figures.
- [ ] Approve MOQ, sample charges, size charts, care guidance, lead times and commercial terms.
- [ ] Replace illustrative media with authorized product and factory images; retain licenses and credits.
- [ ] Supply certificates, scope, validity and logo permissions before displaying certifications.
- [ ] Verify sourcing and sustainability initiatives; publish supporting evidence before making claims.
- [ ] Confirm export destinations, documentation scope, shipment responsibilities and delivery terms.
- [ ] Add a verified factory map and directions. The current map link is only a city reference.
- [ ] Review privacy and terms, retention, processors, legal contacts and effective dates.
- [ ] Connect and test durable inquiry delivery, private uploads, spam controls and shared rate limiting.
- [ ] Set site origin and contact environment values; enable indexing only after review.
- [ ] Check keyboard navigation, screen readers, reduced motion and layouts at 360, 768, 1024 and 1440 px; run Lighthouse on the deployed build. No performance or accessibility score is claimed without an audit.

## Image credits

The fabric rolls concept (`public/images/textile-hero.jpg`) was AI-generated for this preview and is illustrative. Garment reference images were downloaded from Unsplash under the Unsplash image license; none depict company facilities or confirmed products:

- White T-shirt: https://images.unsplash.com/photo-1521572163474-6864f9cf17ab (source image; add the photographer's canonical photo page when preparing final credits).
- Folded shirts: `photo-1562157873-818bc0726f68`, images.unsplash.com.
- Clothing rail: `photo-1558769132-cb1aea458c5e`, images.unsplash.com.

These are editorial reference images, not exact photographs of catalog products. A real company should replace them with approved photography. Stock or generated images must never be presented as actual factory evidence.

The kidswear flat lay (`public/images/kids.jpg`) is also an AI-generated illustrative concept. Generated PNG originals are retained alongside the optimized JPEG assets.

## Repeatable HTTP verification

With the app running, execute `node scripts/verify.mjs`. It checks every sitemap page, the custom 404 and inquiry response behavior using synthetic test data. Set `BASE_URL` if the app uses a port other than 3002. A production server is recommended for this check because development rendering and compilation are slower.

The final check results and responsive screenshots are recorded in [VERIFICATION.md](VERIFICATION.md). `proxy.ts` validates catalog paths before streaming and rewrites unknown pages to the branded `/404` view with HTTP 404. When adding a new route outside the editable catalogs, update the proxy allowlist and sitemap as appropriate.

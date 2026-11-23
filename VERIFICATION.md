# Verification — 26 October 2026

The final source was checked with Next.js 16.4.3, React 19.3.0 and Node.js 24.21.0 on Windows.

| Check | Result |
| --- | --- |
| `npm run lint` | Passed, no errors or warnings |
| `npm run typecheck` | Passed |
| `npm run build` | Passed using Webpack and Tailwind PostCSS |
| `node scripts/verify.mjs` | Passed against the production server |

The HTTP check verified all 67 sitemap pages, their headings, internal link destinations and unique meta descriptions. Unknown page requests return HTTP 404 with the custom error design. The build generated 76 static outputs including framework and metadata routes.

Inquiry checks verified the explicit HTTP 503 demo response, invalid email and quantity handling, required consent, honeypot rejection, product references, attachment signature rejection, origin checks, HTTP 429 rate limiting and its retry header. No inquiry was sent or stored.

Browser checks covered product search, category and fabric filtering, reset and empty states; multiple saved inquiry references, sample preselection and item removal; required-field messages and the demo response; mobile navigation submenus; gallery filtering, pressed states, native modal opening, Escape dismissal and focus restoration.

| Viewport width | Horizontal overflow |
| --- | --- |
| 360 px | None detected |
| 768 px | None detected |
| 1024 px | None detected |
| 1440 px | None detected |

Screenshots: [Desktop](artifacts/desktop-preview.jpg) · [Mobile](artifacts/mobile-preview.jpg).

No Lighthouse, Core Web Vitals or screen-reader audit score is claimed. Reduced-motion behavior is implemented in CSS and GSAP matchMedia; it has not been measured with an external accessibility audit. Live email delivery, durable file storage, a shared production rate limiter and verified company data still require configuration as described in README.md.

# CLAUDE.md — Hickory Kitchen Remodeling (rank & rent)

**Niche + city:** Kitchen remodeling, Hickory NC (Catawba Valley / NC foothills).

## Business context (READ before writing trust-signal copy)
This is a **rank-and-rent site NOT yet tied to a real operating business**. Per the
build template's honesty rules:
- **No fabricated trust signals** — no "X years in business", "1,000+ jobs", review
  counts/ratings, or "licensed & insured" claims.
- Worded as a **marketing/referral service** that connects homeowners with independent
  local kitchen remodelers. Body copy uses first-person "we do it" voice (we
  remodel / we install); the referral/marketing-service disclosure appears ONLY in
  the footer disclaimer, not in the body copy.
- If a real tenant is signed later, their genuine trust signals may be added.

## NAP (keep identical everywhere)
- **Name:** Hickory Kitchen Remodeling
- **Phone:** (941) 327-9667  →  `tel:+19413279667`  *(placeholder number, easily swappable)*
- Service-area business, no public street address.
- Assumed domain for canonicals/OG: `https://www.hickorykitchenremodel.com`

## Structure
- Homepage `index.html` targets "kitchen remodeling Hickory NC".
- **6 service pages:** kitchen-remodeling, kitchen-cabinets, countertops,
  kitchen-islands, kitchen-backsplash, kitchen-flooring.
- **6 location pages** (each hand-written, genuinely distinct — real landmarks /
  population): statesville, lenoir, morganton, newton, conover, lincolnton.
- about, contact (+ thank-you), sitemap.xml, robots.txt, _headers.

## Design
- **Palette:** brass/orange accent + deep navy blue (was green — changed per request).
  All colors are CSS variables in `css/styles.css` (`--brass`, `--forest` = navy, etc.).
- Buttons have deliberate depth (bevel highlight, 3D lip, colored ambient shadow, press
  animation). Bold serif headings (Fraunces) + Inter body.
- Images are **professional placeholder graphics** (navy/brass gradients labeled
  "PLACEHOLDER") in `/images` as JPG + WebP `<picture>`. **Swap these for real photos
  before launch** — keep the same filenames and the markup just works.

## No-build workflow (throwaway tooling — NOT deployed)
Hand-maintained static site, deploy by drag-and-drop. These are dev-only helpers:
- `partials/header.html`, `partials/footer.html` + `build-inject.js` — shared
  header/footer. Edit a partial, then run `node build-inject.js` to re-inject into every
  page (replaces `<!--#HEADER#-->` / `<!--#FOOTER#-->`).
- `gen-images.js` — regenerates placeholder images (needs `npm install sharp`).
- `.claude/launch.json` — local preview server (`npx serve`).

**Do NOT upload to the host:** `node_modules/`, `package*.json`, `partials/`,
`gen-images.js`, `build-inject.js`, `.claude/`, `CLAUDE.md`, `README.md`.
See README.md for the deploy checklist.

## Tracking / launch to-dos (need the client's Google login)
- Add GA4 tag to `<head>` on every page (call-click events already wired via
  `gtag('event','call_click', …)` with distinct `event_label` per button).
- Google Search Console verify + submit sitemap.xml.
- Swap placeholder images for real photos; consider a real call-tracking number later
  (phone is in the two partials + inline CTAs — grep `9413279667`).

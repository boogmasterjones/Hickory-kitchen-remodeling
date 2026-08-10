# Hickory Kitchen Remodeling — static site

Fast, hand-maintained static site (no build step required to run). Orange + navy theme.

## Preview locally
```bash
npx serve -l 5599 .
```
Then open http://localhost:5599 . (Use a server, not `file://`, so the absolute
`/css`, `/images` paths resolve.)

## Deploy (drag-and-drop, e.g. Netlify)
Upload **only** the static site — leave the dev tooling behind.

**Upload these:**
- `*.html`
- `css/`, `js/`, `images/`
- `favicon.svg`, `apple-touch-icon.png`
- `sitemap.xml`, `robots.txt`, `_headers`

**Do NOT upload:** `node_modules/`, `package*.json`, `partials/`, `gen-images.js`,
`build-inject.js`, `.claude/`, `CLAUDE.md`, `README.md`.

The contact form uses Netlify Forms (`data-netlify="true"`); it works automatically on
a Netlify deploy and redirects to `/thank-you.html`.

## Editing
- **Phone number:** search-and-replace `9413279667` / `(941) 327-9667` (mainly in
  `partials/header.html`, `partials/footer.html`, and each page's CTAs).
- **Header/footer:** edit the files in `partials/`, then run `node build-inject.js`.
- **Images:** replace the files in `images/` with real photos of the same name (keep
  both `.jpg` and `.webp`), or regenerate placeholders with `node gen-images.js`
  (`npm install sharp` first).
- **Colors:** all in the `:root` block of `css/styles.css`.

## Before launch
- [ ] Swap placeholder images for real photos
- [ ] Add the GA4 tag to every page's `<head>`
- [ ] Point the domain, verify Google Search Console, submit `sitemap.xml`
- [ ] Update canonical/OG domain if it differs from `hickorykitchenremodel.com`

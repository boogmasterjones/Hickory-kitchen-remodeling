/* Throwaway: sync shared header/footer/call-bar partials into every page.
   SAFE: replaces each region with a precise, non-greedy pattern so it can be
   re-run without eating page content. Handles fresh placeholders too. */
const fs = require("fs");
const full = fs.readFileSync("partials/header.html", "utf8").trim();
const footer = fs.readFileSync("partials/footer.html", "utf8").trim();

// Split the header partial into (a) header+mnav (through </aside>) and
// (b) the call-bar block, so each is replaced independently and precisely.
const splitIdx = full.indexOf('<div class="call-bar">');
const headerMain = full.slice(0, splitIdx).trim();
const callBar = full.slice(splitIdx).trim();

const HEADER_RE  = /<header class="site-header">[\s\S]*?<\/aside>/;   // stops at </aside>
const CALLBAR_RE = /<div class="call-bar">[\s\S]*?<\/a>\s*<\/div>/;     // single call-bar block (ends at last </a></div>)
const FOOTER_RE  = /<footer class="site-footer">[\s\S]*?<\/footer>/;

const files = fs.readdirSync(".").filter(f => f.endsWith(".html"));
let n = 0;
for (const f of files) {
  let html = fs.readFileSync(f, "utf8");
  const before = html;

  if (html.includes("<!--#HEADER#-->")) html = html.replace("<!--#HEADER#-->", full);
  else {
    if (HEADER_RE.test(html))  html = html.replace(HEADER_RE, headerMain);
    if (CALLBAR_RE.test(html)) html = html.replace(CALLBAR_RE, callBar);
  }

  if (html.includes("<!--#FOOTER#-->")) html = html.replace("<!--#FOOTER#-->", footer);
  else if (FOOTER_RE.test(html))        html = html.replace(FOOTER_RE, footer);

  if (html !== before) { fs.writeFileSync(f, html); console.log("synced:", f); n++; }
}
console.log(`Done — ${n} page(s).`);

/* Throwaway: give interior page heroes a background image. */
const fs = require("fs");
// file -> [imageBaseName, width, height, altCity]
const MAP = {
  "statesville.html":       ["hero-statesville", 1920, 1080, "Statesville, NC"],
  "lenoir.html":            ["hero-lenoir",      1920, 1080, "Lenoir, NC"],
  "morganton.html":         ["hero-morganton",   1920, 1080, "Morganton, NC"],
  "newton.html":            ["hero-newton",      1920, 1080, "Newton, NC"],
  "conover.html":           ["hero-conover",     1920, 1080, "Conover, NC"],
  "lincolnton.html":        ["hero-lincolnton",  1920, 1080, "Lincolnton, NC"],
  "kitchen-remodeling.html":["service-remodeling",1200, 900, "Hickory, NC"],
  "kitchen-cabinets.html":  ["service-cabinets",  1200, 900, "Hickory, NC"],
  "countertops.html":       ["service-countertops",1200,900, "Hickory, NC"],
  "kitchen-islands.html":   ["service-islands",   1200, 900, "Hickory, NC"],
  "kitchen-backsplash.html":["service-backsplash",1200, 900, "Hickory, NC"],
  "kitchen-flooring.html":  ["service-flooring",  1200, 900, "Hickory, NC"],
  "about.html":             ["hero-home",         1920, 1080, "Hickory, NC"],
  "contact.html":           ["hero-home",         1920, 1080, "Hickory, NC"],
};

const OPEN = '<section class="page-hero on-dark">';
let n = 0;
for (const [file, [img, w, h, city]] of Object.entries(MAP)) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('class="hero-bg"')) continue; // already done
  if (!html.includes(OPEN)) { console.log("skip (no page-hero):", file); continue; }
  const pic =
    '<section class="page-hero on-dark has-img">\n' +
    `  <picture><source type="image/webp" srcset="/images/${img}.webp"><img class="hero-bg" src="/images/${img}.jpg" alt="Kitchen remodeling in ${city}" width="${w}" height="${h}" fetchpriority="high"></picture>`;
  html = html.replace(OPEN, pic);
  fs.writeFileSync(file, html);
  console.log("hero bg added:", file);
  n++;
}
console.log(`Done — ${n} page(s).`);

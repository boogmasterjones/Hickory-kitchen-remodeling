/* Throwaway: generate professional placeholder images (JPG + WebP).
   Delete this + node_modules + package.json after running. */
const sharp = require("sharp");
const fs = require("fs");

const OUT = "images";
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

// warm, photographic-feeling gradient palettes [top, bottom, textLight?]
const P = {
  navy:   ["#28385a", "#141d31", true],
  walnut: ["#5b4a34", "#2f2418", true],
  slate:  ["#3f4d66", "#20293a", true],
  brass:  ["#a8722a", "#5f3f16", true],
  stone:  ["#8a8175", "#4c463d", true],
  clay:   ["#9a5b3f", "#5a3221", true],
  fog:    ["#6f7d90", "#3a4457", true],
  steel:  ["#4a6285", "#22314d", true],
};

function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

function svg(w, h, pal, title, sub) {
  const [c1, c2, light] = pal;
  const fg = light ? "#f6f2ea" : "#2b2419";
  const fgSoft = light ? "rgba(246,242,234,.72)" : "rgba(43,36,25,.66)";
  const mono = light ? "rgba(246,242,234,.10)" : "rgba(43,36,25,.09)";
  const line = light ? "rgba(246,242,234,.16)" : "rgba(43,36,25,.14)";
  const tSize = Math.round(w * 0.052);
  const sSize = Math.round(w * 0.022);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="v" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.28"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <!-- subtle diagonal sheen -->
  <polygon points="0,0 ${w*0.6},0 ${w*0.2},${h} 0,${h}" fill="#ffffff" opacity="0.03"/>
  <rect width="${w}" height="${h}" fill="url(#v)"/>
  <!-- brand monogram watermark -->
  <g transform="translate(${w/2},${h*0.40})" opacity="1">
    <g transform="translate(-${w*0.11},-${w*0.11}) scale(${w*0.00345})">
      <rect x="16" y="15" width="7" height="34" rx="2" fill="${mono}"/>
      <rect x="41" y="15" width="7" height="34" rx="2" fill="${mono}"/>
      <rect x="16" y="28" width="32" height="7" rx="2" fill="${mono}"/>
    </g>
  </g>
  <rect x="${w*0.5-28}" y="${h*0.5-2}" width="56" height="3" rx="1.5" fill="${fg}" opacity="0.5"/>
  <text x="50%" y="${h*0.58}" text-anchor="middle" fill="${fg}" font-family="Georgia, 'Times New Roman', serif" font-size="${tSize}" font-weight="600">${esc(title)}</text>
  <text x="50%" y="${h*0.58 + sSize*2}" text-anchor="middle" fill="${fgSoft}" font-family="Arial, sans-serif" font-size="${sSize}" letter-spacing="1.5">${esc(sub)}</text>
  <rect x="0.5" y="0.5" width="${w-1}" height="${h-1}" fill="none" stroke="${line}" stroke-width="1"/>
</svg>`;
}

async function make(name, w, h, pal, title, sub) {
  const buf = Buffer.from(svg(w, h, pal, title, sub));
  await sharp(buf).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/${name}.jpg`);
  await sharp(buf).webp({ quality: 80, effort: 5 }).toFile(`${OUT}/${name}.webp`);
  console.log("  ", name);
}

(async () => {
  console.log("Generating placeholders...");
  // Hero (portrait 4:5)
  await make("kitchen-hero", 1000, 1250, P.navy, "Modern Kitchen Remodel", "HICKORY, NC · PLACEHOLDER");

  // Homepage feature (landscape 4:3)
  await make("kitchen-feature", 1200, 900, P.walnut, "Custom Kitchen Island", "HICKORY, NC · PLACEHOLDER");

  // 6 service pages (landscape 4:3)
  await make("service-remodeling",  1200, 900, P.navy,  "Full Kitchen Remodel",     "HICKORY, NC · PLACEHOLDER");
  await make("service-cabinets",    1200, 900, P.walnut, "Kitchen Cabinets",         "HICKORY, NC · PLACEHOLDER");
  await make("service-countertops", 1200, 900, P.stone,  "Quartz & Granite Counters","HICKORY, NC · PLACEHOLDER");
  await make("service-islands",     1200, 900, P.slate,  "Kitchen Islands",          "HICKORY, NC · PLACEHOLDER");
  await make("service-backsplash",  1200, 900, P.clay,   "Backsplash & Tile",        "HICKORY, NC · PLACEHOLDER");
  await make("service-flooring",    1200, 900, P.brass,  "Kitchen Flooring",         "HICKORY, NC · PLACEHOLDER");

  // 6 location pages (landscape 4:3) — labeled per city
  await make("loc-statesville", 1200, 900, P.slate,  "Kitchen Remodeling", "STATESVILLE, NC · PLACEHOLDER");
  await make("loc-lenoir",      1200, 900, P.walnut, "Kitchen Remodeling", "LENOIR, NC · PLACEHOLDER");
  await make("loc-morganton",   1200, 900, P.navy,  "Kitchen Remodeling", "MORGANTON, NC · PLACEHOLDER");
  await make("loc-newton",      1200, 900, P.stone,  "Kitchen Remodeling", "NEWTON, NC · PLACEHOLDER");
  await make("loc-conover",     1200, 900, P.fog,    "Kitchen Remodeling", "CONOVER, NC · PLACEHOLDER");
  await make("loc-lincolnton",  1200, 900, P.clay,   "Kitchen Remodeling", "LINCOLNTON, NC · PLACEHOLDER");

  // OG share image (1200x630)
  await make("og-image", 1200, 630, P.navy, "Hickory Kitchen Remodeling", "KITCHEN REMODELING · HICKORY, NC");

  // Wide hero backgrounds (1920x1080)
  await make("hero-home", 1920, 1080, P.navy, "Modern Kitchen Remodel", "HICKORY, NC · PLACEHOLDER");
  await make("hero-statesville", 1920, 1080, P.slate,  "Kitchen Remodeling", "STATESVILLE, NC · PLACEHOLDER");
  await make("hero-lenoir",      1920, 1080, P.steel,  "Kitchen Remodeling", "LENOIR, NC · PLACEHOLDER");
  await make("hero-morganton",   1920, 1080, P.navy,   "Kitchen Remodeling", "MORGANTON, NC · PLACEHOLDER");
  await make("hero-newton",      1920, 1080, P.slate,  "Kitchen Remodeling", "NEWTON, NC · PLACEHOLDER");
  await make("hero-conover",     1920, 1080, P.fog,    "Kitchen Remodeling", "CONOVER, NC · PLACEHOLDER");
  await make("hero-lincolnton",  1920, 1080, P.steel,  "Kitchen Remodeling", "LINCOLNTON, NC · PLACEHOLDER");
  console.log("Done.");
})();

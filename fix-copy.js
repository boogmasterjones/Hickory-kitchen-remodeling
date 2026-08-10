/* Throwaway: convert "we connect you with remodelers" referral wording to
   first-person "we do it" voice across all pages. Referral disclosure stays
   only in the footer disclaimer. Literal, global string replacements. */
const fs = require("fs");

const R = [
  // generic schema/meta
  ["Kitchen remodeling referral service for", "Kitchen remodeling company serving"],
  ['Hickory Kitchen Remodeling connects homeowners in Hickory, NC and the foothills with trusted local kitchen remodelers for cabinets, countertops & full renovations.',
   'Kitchen remodeling in Hickory, NC and the foothills — custom cabinets, countertops, islands & full renovations by Hickory Kitchen Remodeling. Free estimates.'],
  ['How we connect Hickory-area homeowners with trusted local kitchen remodelers.',
   'Kitchen remodeling across Hickory and the NC foothills — cabinets, countertops & full renovations.'],
  ['Custom kitchen islands & peninsulas in Hickory, NC — add prep space, storage, and seating. Built by trusted local remodelers.',
   'Custom kitchen islands & peninsulas in Hickory, NC — add prep space, storage, and seating. Built by our local kitchen team.'],

  // cabinets
  ['we connect you with local cabinet installers who measure precisely, order to spec, and hang everything level and true',
   'we measure precisely, order cabinets to spec, and hang everything level and true'],
  ["We'll connect you with a local remodeler who can look at your kitchen and give you honest options",
   "We'll look at your kitchen and give you honest options"],
  ["New cabinets or a reface — we'll connect you with the right local crew for a free estimate.",
   "New cabinets or a reface — get a free estimate from our kitchen team."],

  // flooring
  ['We connect you with local flooring installers who prep and level the subfloor first, then install a surface chosen for durability and easy cleanup, with transitions that sit flush to adjoining rooms.',
   'We prep and level the subfloor first, then install a surface chosen for durability and easy cleanup, with transitions that sit flush to adjoining rooms.'],
  ['We connect you with local installers who level the subfloor properly first, because even the best flooring telegraphs a bad subfloor.',
   'We level the subfloor properly first, because even the best flooring telegraphs a bad subfloor.'],
  ["Tell us your flooring choice and we'll connect you with a trusted local installer for a free estimate.",
   "Tell us your flooring choice and we'll get you a free estimate."],

  // backsplash
  ['We connect you with local tile installers who prep the wall properly, lay out the pattern so cuts fall in the least-visible places, and finish edges with the right trim or a mitered return.',
   'We prep the wall properly, lay out the pattern so cuts fall in the least-visible places, and finish edges with the right trim or a mitered return.'],
  ['We connect you with experienced local tile setters who dry-lay the pattern first, keep grout lines consistent, and handle the tricky cuts around windows, outlets, and range hoods so the finished wall looks seamless.',
   'Our experienced tile setters dry-lay the pattern first, keep grout lines consistent, and handle the tricky cuts around windows, outlets, and range hoods so the finished wall looks seamless.'],
  ["Tell us your tile and layout and we'll connect you with a trusted local installer for a free estimate.",
   "Tell us your tile and layout and we'll get you a free estimate."],

  // countertops
  ['We connect you with local fabricators and installers who template precisely so seams land where they should and your counters sit flat and true.',
   'We template precisely so seams land where they should and your counters sit flat and true.'],
  ['We connect you with experienced local countertop fabricators who handle the whole process — measuring, digital templating, edge profiling, cutouts for sinks and cooktops, and precise installation.',
   'We handle the whole process — measuring, digital templating, edge profiling, cutouts for sinks and cooktops, and precise installation.'],
  ["Tell us your material and layout and we'll connect you with a trusted local installer for a free estimate.",
   "Tell us your material and layout and we'll get you a free estimate."],

  // islands
  ['We connect you with Hickory remodelers who plan the island around traffic flow and clearances so it opens the kitchen up instead of crowding it.',
   'We plan the island around traffic flow and clearances so it opens the kitchen up instead of crowding it.'],
  ['We connect you with local kitchen remodelers who size the island to your room, leaving the right walkways on every side so it feels generous rather than tight — a detail builder-grade islands often get wrong.',
   'We size the island to your room, leaving the right walkways on every side so it feels generous rather than tight — a detail builder-grade islands often get wrong.'],
  ["Tell us about your kitchen and we'll connect you with a trusted local remodeler for a free estimate.",
   "Tell us about your kitchen and we'll get you a free estimate."],

  // full remodeling
  ['planned, built, and finished by trusted local remodelers.',
   'planned, built, and finished by our local kitchen team.'],
  ["We connect you with a Hickory-area remodeler who handles the whole project — so you're not juggling a separate cabinet installer, countertop fabricator, electrician, and flooring crew on your own.",
   "We handle the whole project — so you're not juggling a separate cabinet installer, countertop fabricator, electrician, and flooring crew on your own."],
  ['we can match your kitchen remodeling project with a trusted local crew and get you a free, no-obligation estimate.',
   'we can take on your kitchen remodeling project and get you a free, no-obligation estimate.'],
  ["Tell us what you want to change and we'll connect you with a trusted Hickory remodeler for a free estimate.",
   "Tell us what you want to change and we'll get you a free estimate."],

  // locations
  ['Because Newton is so close, we can quickly connect you with a nearby remodeler who knows these homes well.',
   "Because Newton is so close, we're on-site quickly, and we know these homes well."],
  ['We connect you with local remodelers who can guide those decisions and give you an honest, itemized quote.',
   'We can guide those decisions and give you an honest, itemized quote.'],
  ["We match each Morganton kitchen with a remodeler who fits the home — whether you're restoring character in an older kitchen or modernizing a newer one for entertaining.",
   "We tailor each Morganton kitchen to the home — whether you're restoring character in an older kitchen or modernizing a newer one for entertaining."],
  ['We connect you with local remodelers who can plan either direction and deliver an honest, written estimate.',
   'We can plan either direction and deliver an honest, written estimate.'],
  ["it's why we match each Statesville homeowner with a remodeler who fits the age and style of the house",
   "it's why we tailor each Statesville kitchen to the age and style of the house"],
  ['call <a href="tel:+19413279667">(941) 327-9667</a> and we\'ll connect you with a trusted local remodeler.',
   'call <a href="tel:+19413279667">(941) 327-9667</a> and we\'ll get you a free estimate.'],
  ["We match Lincolnton homeowners with remodelers who can honor an older home's character or modernize a newer kitchen for how families cook and entertain now.",
   "We tailor each Lincolnton kitchen to the home — honoring an older home's character or modernizing a newer kitchen for how families cook and entertain now."],
  ['Whichever fits your home, we connect you with a trusted local remodeler who will measure, talk through options, and provide an honest written estimate.',
   "Whichever fits your home, we'll measure, talk through options, and provide an honest written estimate."],
  ["Whether your Conover kitchen needs a straightforward refresh or a full redesign, we'll connect you with a nearby remodeler who can be on-site quickly.",
   'Whether your Conover kitchen needs a straightforward refresh or a full redesign, we can be on-site quickly.'],
  ['Whatever the scope, we connect you with a trusted local remodeler and make sure you get a clear, written estimate before any work begins.',
   'Whatever the scope, we make sure you get a clear, written estimate before any work begins.'],

  // about
  ['Your local connection for kitchen remodeling in Hickory, NC',
   'Kitchen remodeling in Hickory, NC, done right'],
  ['We make the hardest part of a kitchen remodel — finding a remodeler you can trust — simple, by matching Hickory-area homeowners with vetted local pros.',
   'Hickory homeowners trust us to remodel their kitchens the right way — on schedule, on budget, and built to last.'],
  ["Hickory Kitchen Remodeling is a local marketing and referral service focused on one thing: connecting homeowners across Hickory and the surrounding foothills with trusted kitchen remodelers who do great work. We're not a general contractor ourselves — instead, we've done the legwork of finding reliable local pros so you don't have to sort through a list of names and hope for the best.",
   "Hickory Kitchen Remodeling focuses on one thing: remodeling kitchens across Hickory and the surrounding foothills. From layout and cabinets to countertops, tile, and flooring, we handle the whole project so you have a single team to rely on from the first measurement to the final walkthrough."],
  ["When you reach out, we learn what you want to change and connect you with a remodeler suited to your project, whether that's a full renovation, new cabinets, or a countertop upgrade. From there you get a free in-home estimate and an itemized written quote, with no obligation to move forward.",
   "When you reach out, we learn what you want to change and set up a visit — whether that's a full renovation, new cabinets, or a countertop upgrade. You get a free in-home estimate and an itemized written quote, with no obligation to move forward."],
  ['We connect you with kitchen remodelers who work throughout Catawba County and the foothills and know local homes and permitting.',
   'We work throughout Catawba County and the foothills, and we know local homes and permitting.'],
  ["we'll connect you with the right local remodeler for the job.",
   "we do it — and we'll get you a free estimate for the job."],
  ["Tell us what you're picturing and we'll connect you with a trusted local remodeler for a free estimate.",
   "Tell us what you're picturing and we'll get you a free estimate."],

  // contact
  ["Tell us about your kitchen project in Hickory or the surrounding foothills and we'll connect you with a trusted local remodeler for a free, no-pressure estimate.",
   "Tell us about your kitchen project in Hickory or the surrounding foothills and we'll get you a free, no-pressure estimate."],
];

const files = fs.readdirSync(".").filter(f => f.endsWith(".html"));
let total = 0;
for (const f of files) {
  let html = fs.readFileSync(f, "utf8");
  let hits = 0;
  for (const [a, b] of R) {
    if (html.includes(a)) { html = html.split(a).join(b); hits++; }
  }
  if (hits) { fs.writeFileSync(f, html); console.log(`${f}: ${hits} replacement(s)`); total += hits; }
}
console.log(`Total: ${total}`);

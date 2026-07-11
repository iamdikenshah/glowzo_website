// =============================================================================
// BUILD STEP — pre-render static HTML shells for known deep routes
// =============================================================================
// GitHub Pages serves a file only where one exists on disk; every other path
// falls through to 404.html (HTTP 404, no Open Graph tags). Social crawlers
// (WhatsApp/Facebook/LinkedIn) don't run the SPA's JS redirect, so a shared deep
// link like /services/plumbing would get no metadata and show a stale preview.
//
// This script copies the freshly built dist/index.html (already carrying the
// hashed asset tags Vite injected) into dist/<route>/index.html, swapping the
// title/description/canonical/OG/Twitter meta per route. GitHub Pages then serves
// serview.com/<route> as a real 200 page with correct preview data, and the SPA
// boots identically because the body/scripts are untouched.
//
// Runs automatically after `vite build` (see package.json).
// =============================================================================

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { SERVICES } from "../src/data/content.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, "../dist");
const SITE = "https://serview.com";
const BRAND = "ServView";

// Static routes.
const ROUTES = [
  {
    path: "services",
    title: `Our Home Services — ${BRAND}`,
    description:
      "Browse ServView's full range of home services — cleaning, handyman repairs, plumbing, electrical, painting, appliance installation, furniture assembly and pest control.",
  },
  {
    path: "about",
    title: `About Us — ${BRAND}`,
    description:
      "How ServView is raising the bar for home services in Ahmedabad — vetted, insured professionals, transparent pricing and a satisfaction guarantee.",
  },
  {
    path: "testimonials",
    title: `Customer Reviews — ${BRAND}`,
    description:
      "Read what homeowners across Ahmedabad say about ServView's cleaning, repair and maintenance services.",
  },
  {
    path: "contact",
    title: `Contact & Free Quote — ${BRAND}`,
    description:
      "Get a free quote from ServView. Book home cleaning, repairs and maintenance across Ahmedabad, or reach us by phone, email or WhatsApp.",
  },
  {
    path: "privacy",
    title: `Privacy Policy — ${BRAND}`,
    description: "How ServView collects, uses and protects your personal data.",
  },
  {
    path: "terms",
    title: `Terms & Conditions — ${BRAND}`,
    description: "The terms governing use of the ServView website and services.",
  },
];

// One shell per service detail page.
for (const s of SERVICES) {
  ROUTES.push({
    path: `services/${s.slug}`,
    title: `${s.name} — ${BRAND}`,
    description: s.shortDescription,
  });
}

// Escape a value for safe insertion into an HTML attribute.
const esc = (v) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Replace the content/href of a tag identified by `attr="value"`.
function setAttr(html, identifier, targetAttr, value) {
  const re = new RegExp(`(${identifier}[^>]*?${targetAttr}=")[^"]*(")`, "i");
  if (!re.test(html)) throw new Error(`prerender: no match for ${identifier} / ${targetAttr}`);
  return html.replace(re, `$1${esc(value)}$2`);
}

const source = await readFile(resolve(dist, "index.html"), "utf8");

for (const route of ROUTES) {
  const url = `${SITE}/${route.path}`;
  let html = source;

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${esc(route.title)}</title>`);
  html = setAttr(html, 'name="description"', "content", route.description);
  html = setAttr(html, 'rel="canonical"', "href", url);
  html = setAttr(html, 'property="og:title"', "content", route.title);
  html = setAttr(html, 'property="og:description"', "content", route.description);
  html = setAttr(html, 'property="og:url"', "content", url);
  html = setAttr(html, 'name="twitter:title"', "content", route.title);
  html = setAttr(html, 'name="twitter:description"', "content", route.description);

  const outDir = resolve(dist, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, "index.html"), html, "utf8");
  console.log(`prerendered /${route.path}`);
}

console.log(`\n✓ Prerendered ${ROUTES.length} route shells.`);

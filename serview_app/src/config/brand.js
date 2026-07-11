// =============================================================================
// BRAND — single source of truth for name, contact details and site metadata
// =============================================================================
// The business name was left as a placeholder during the build. Everything the
// UI renders (nav wordmark, footer, page <title>s, JSON-LD, WhatsApp links) reads
// from this file, so renaming the company is a one-line change here — no need to
// hunt through components. Update SERVICE_AREA / contact details the same way.
// =============================================================================

export const BRAND = {
  name: "ServView",
  tagline: "Home care, handled.",
  // Short descriptor used in footers and meta fallbacks.
  blurb:
    "Vetted professionals for home cleaning, repairs and everyday maintenance — booked in minutes, done right the first time.",

  // Contact + service area. Phone is stored in international format (no spaces)
  // for tel:/wa.me links; `phoneDisplay` is the human-readable version.
  phone: "919000000000",
  phoneDisplay: "+91 90000 00000",
  email: "hello@serview.com",
  serviceArea: "Ahmedabad",
  serviceAreaLong: "Ahmedabad, Gujarat",
  hours: "Mon–Sat, 8:00 AM – 8:00 PM",

  // Neighbourhoods / zones covered — shown on the contact page.
  areas: [
    "Bopal",
    "SG Highway",
    "Satellite",
    "Thaltej",
    "Bodakdev",
    "Prahlad Nagar",
    "Vastrapur",
    "Shela",
    "South Bopal",
    "Gota",
  ],

  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  // Absolute site origin — used for canonical URLs and Open Graph tags.
  siteUrl: "https://serview.com",
};

/** wa.me deep link with an optional prefilled message. */
export function whatsappLink(message = "") {
  const base = `https://wa.me/${BRAND.phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** tel: link for the primary phone number. */
export const telLink = `tel:+${BRAND.phone}`;

// =============================================================================
// SEED CONTENT — bundled fallback + canonical service catalog
// =============================================================================
// These arrays power the site when Firebase isn't configured (local/demo builds)
// and act as the canonical source for service-detail slug routing. When the CMS
// has data, the public pages merge Firestore records over these by slug, so the
// site never renders empty. `icon` values map to keys in components/ServiceIcon.
// =============================================================================

export const SERVICE_CATEGORIES = ["Cleaning", "Repairs", "Installations", "Outdoor"];

export const SERVICES = [
  {
    slug: "house-cleaning",
    name: "House Cleaning",
    category: "Cleaning",
    icon: "sparkle",
    shortDescription:
      "Deep cleans, recurring visits and move-in/move-out packages by trained cleaners.",
    fullDescription:
      "A spotless home without lifting a finger. Our trained cleaners handle everything from a one-off deep clean to weekly upkeep, using safe, effective products and a room-by-room checklist so nothing is missed. Choose recurring visits and lock in the same trusted team each time.",
    includes: [
      "Dusting, mopping and vacuuming across all rooms",
      "Kitchen surfaces, sinks and appliance exteriors",
      "Bathroom deep-clean and sanitisation",
      "Interior windows, skirting and switchboards",
      "Optional move-in / move-out add-ons",
    ],
    startingPrice: "₹799",
    order: 1,
  },
  {
    slug: "handyman-repairs",
    name: "Handyman Repairs",
    category: "Repairs",
    icon: "wrench",
    shortDescription:
      "General fixes around the house — from squeaky doors to wall mounts and more.",
    fullDescription:
      "The odd jobs that pile up on your to-do list, sorted in a single visit. Our handymen carry the tools and know-how for dozens of small repairs, so you get one dependable person instead of chasing five specialists.",
    includes: [
      "Door, drawer and cabinet adjustments",
      "Wall mounting for TVs, shelves and mirrors",
      "Curtain rods, hooks and fixture fitting",
      "Minor carpentry and hardware replacement",
      "General tightening, sealing and patch-ups",
    ],
    startingPrice: "₹499",
    order: 2,
  },
  {
    slug: "electrical-lighting",
    name: "Electrical & Lighting",
    category: "Repairs",
    icon: "bolt",
    shortDescription:
      "Certified electricians for wiring, switches, fans and lighting upgrades.",
    fullDescription:
      "Electrical work is no place for guesswork. Our certified electricians diagnose faults, install fixtures and upgrade your lighting safely — with clear pricing before any work begins and a workmanship guarantee after.",
    includes: [
      "Switch, socket and MCB replacement",
      "Ceiling fan and light-fixture installation",
      "Fault-finding and short-circuit repair",
      "LED and smart-lighting upgrades",
      "Safety checks on existing wiring",
    ],
    startingPrice: "₹399",
    order: 3,
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    category: "Repairs",
    icon: "droplet",
    shortDescription:
      "Leak repairs, fittings, blockages and installations by experienced plumbers.",
    fullDescription:
      "From a dripping tap to a blocked drain, our plumbers arrive equipped to fix it fast and keep it fixed. Transparent quotes, tidy work and no upselling — just the repair you actually need.",
    includes: [
      "Tap, mixer and shower installation or repair",
      "Leak detection and pipe fixing",
      "Drain and sink unclogging",
      "Toilet, cistern and flush repairs",
      "Water-motor and tank fittings",
    ],
    startingPrice: "₹449",
    order: 4,
  },
  {
    slug: "painting-touchups",
    name: "Painting & Touch-ups",
    category: "Repairs",
    icon: "roller",
    shortDescription:
      "Fresh walls, patch-ups and accent finishes with minimal mess and disruption.",
    fullDescription:
      "Whether it's a single scuffed wall or a full room refresh, our painters prep surfaces properly, protect your furniture and leave crisp, even finishes. We help you pick shades and give an honest estimate on paint and labour.",
    includes: [
      "Wall preparation, filling and sanding",
      "Single-wall touch-ups and full-room repaints",
      "Primer and two-coat finish application",
      "Furniture covering and floor protection",
      "Post-job clean-up and waste removal",
    ],
    startingPrice: "₹12/sq ft",
    order: 5,
  },
  {
    slug: "appliance-installation",
    name: "Appliance Installation",
    category: "Installations",
    icon: "plug",
    shortDescription:
      "Safe setup of washing machines, ACs, geysers, chimneys and more.",
    fullDescription:
      "Bought a new appliance? We'll unbox, position, connect and test it so it's ready to use — safely and to the manufacturer's spec. No damaged walls, no guesswork, no leftover packaging.",
    includes: [
      "Washing machine and dishwasher setup",
      "Geyser and water-purifier mounting",
      "Chimney and hob installation",
      "Split & window AC fitting (with vendor coordination)",
      "Testing, demo and safe packaging disposal",
    ],
    startingPrice: "₹599",
    order: 6,
  },
  {
    slug: "furniture-assembly",
    name: "Furniture Assembly",
    category: "Installations",
    icon: "chair",
    shortDescription:
      "Flat-pack and modular furniture assembled correctly, the first time.",
    fullDescription:
      "Skip the confusing instruction booklets. Our team assembles beds, wardrobes, desks and modular units quickly and sturdily, then tidies away every last screw and offcut before we leave.",
    includes: [
      "Flat-pack beds, wardrobes and storage units",
      "Study tables, chairs and office furniture",
      "Modular kitchen and shelving assembly",
      "Wall anchoring for tall, tip-prone units",
      "Packaging removal and site clean-up",
    ],
    startingPrice: "₹449",
    order: 7,
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    category: "Outdoor",
    icon: "shield",
    shortDescription:
      "Safe, effective treatments for common household pests and prevention.",
    fullDescription:
      "Keep your home pest-free with targeted, family-safe treatments. We identify the source, treat affected areas and share simple prevention tips — with optional follow-up visits for stubborn infestations.",
    includes: [
      "General disinfection and cockroach control",
      "Ant, mosquito and rodent treatment",
      "Termite inspection and treatment",
      "Family- and pet-safe chemicals",
      "Optional periodic maintenance plans",
    ],
    startingPrice: "₹699",
    order: 8,
  },
];

/** Look up a seed service by slug. */
export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);

// -----------------------------------------------------------------------------
// TESTIMONIALS — original placeholder reviews (approved by default in seed)
// -----------------------------------------------------------------------------
export const TESTIMONIALS = [
  {
    customerName: "Priya Nair",
    quote:
      "Booked a deep clean before a house party and the team was punctual, thorough and genuinely friendly. My kitchen hasn't looked this good since we moved in.",
    rating: 5,
    serviceType: "House Cleaning",
    approved: true,
  },
  {
    customerName: "Rohan Mehta",
    quote:
      "Had three separate niggles — a leaky tap, a loose door and a TV to mount. One handyman handled all of it in under two hours. Fair price, no fuss.",
    rating: 5,
    serviceType: "Handyman Repairs",
    approved: true,
  },
  {
    customerName: "Anjali Desai",
    quote:
      "The electrician explained exactly what was wrong and what it would cost before starting. Everything works perfectly and the area was left spotless.",
    rating: 5,
    serviceType: "Electrical & Lighting",
    approved: true,
  },
  {
    customerName: "Karan Shah",
    quote:
      "Same-week slot, on-time arrival and a spotless plumbing fix. This is how home services should work. I've already booked them for a repaint.",
    rating: 5,
    serviceType: "Plumbing",
    approved: true,
  },
  {
    customerName: "Meera Joshi",
    quote:
      "They assembled an entire wardrobe and a study desk without a single wobble, then took away all the packaging. Effortless from start to finish.",
    rating: 5,
    serviceType: "Furniture Assembly",
    approved: true,
  },
  {
    customerName: "Aditya Patel",
    quote:
      "Transparent quote, insured staff and a genuine satisfaction guarantee — that peace of mind is exactly why I keep coming back to ServView.",
    rating: 5,
    serviceType: "Appliance Installation",
    approved: true,
  },
];

// -----------------------------------------------------------------------------
// HOMEPAGE SUPPORTING CONTENT
// -----------------------------------------------------------------------------
export const STATS = [
  { value: "500+", label: "Homes served" },
  { value: "4.9★", label: "Average rating" },
  { value: "50+", label: "Vetted professionals" },
  { value: "Same-week", label: "Scheduling" },
];

export const DIFFERENTIATORS = [
  {
    icon: "badge-check",
    title: "Vetted, insured staff",
    text: "Every professional is background-checked, trained and insured before they set foot in your home.",
  },
  {
    icon: "tag",
    title: "Transparent pricing",
    text: "Clear, upfront quotes with no hidden charges. You approve the price before any work begins.",
  },
  {
    icon: "calendar",
    title: "Same-week scheduling",
    text: "Flexible slots that fit your day, with most bookings served within the same week.",
  },
  {
    icon: "shield",
    title: "Satisfaction guarantee",
    text: "Not happy with the work? We'll make it right — that's our promise on every single job.",
  },
];

export const HOW_IT_WORKS = [
  {
    icon: "chat",
    title: "Request a quote",
    text: "Tell us what you need in under a minute — online or over WhatsApp.",
  },
  {
    icon: "user-check",
    title: "Get matched with a pro",
    text: "We assign a vetted specialist and confirm a slot that works for you.",
  },
  {
    icon: "check-circle",
    title: "Service completed",
    text: "Your pro arrives on time and gets the job done right the first time.",
  },
  {
    icon: "star",
    title: "Rate your experience",
    text: "Share feedback so we keep raising the bar on every visit.",
  },
];

export const TRUST_BADGES = [
  { icon: "shield", label: "Fully insured" },
  { icon: "badge-check", label: "Background-checked staff" },
  { icon: "thumbs-up", label: "Satisfaction guarantee" },
];

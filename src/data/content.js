export const TESTIMONIALS = [
  {
    initial: 'R',
    gradient: 'linear-gradient(135deg,#0EA5E9,#0369A1)',
    name: 'Rahul Mehta',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"Absolutely brilliant service! They showed up on time, were super professional, and my car looks brand new. Worth every rupee!"',
  },
  {
    initial: 'P',
    gradient: 'linear-gradient(135deg,#06B6D4,#0891B2)',
    name: 'Priya Shah',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"So convenient! I booked via WhatsApp and they were at my apartment in under 30 minutes. The interior clean was spotless. Highly recommend!"',
  },
  {
    initial: 'A',
    gradient: 'linear-gradient(135deg,#6366F1,#4338CA)',
    name: 'Ankit Patel',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"Best doorstep car wash in Bopal! They use quality products and the tyre polish makes my car look amazing. Booked the premium plan — totally worth it."',
  },
  {
    initial: 'N',
    gradient: 'linear-gradient(135deg,#10B981,#047857)',
    name: 'Nisha Joshi',
    place: 'Bopal, Ahmedabad',
    stars: 4,
    text: '"Great experience overall. Punctual team, eco-friendly products, and my car smells fresh. Would love if they expanded to Satellite area soon!"',
  },
  {
    initial: 'K',
    gradient: 'linear-gradient(135deg,#F59E0B,#B45309)',
    name: 'Karan Desai',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"I\'ve used many car wash services but Glowzo is in a different league. The attention to detail — windows, dashboard, tyres — everything was perfect."',
  },
  {
    initial: 'S',
    gradient: 'linear-gradient(135deg,#EC4899,#BE185D)',
    name: 'Simran Kapoor',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"Such a time-saver! Working from home means I never have time to visit a car wash. Glowzo comes to me and does a fantastic job every single time."',
  },
];

export const AREAS = [
  { name: 'Bopal, Ahmedabad', active: true },
  { name: 'Satellite', active: false },
  { name: 'Vastrapur', active: false },
  { name: 'SG Highway', active: false },
  { name: 'South Bopal', active: false },
  { name: 'Ghuma', active: false },
];

export const INCLUDES = [
  { label: 'Exterior Body Wash', note: 'pH-neutral shampoo, 2-bucket method, microfibre dry' },
  { label: 'Interior Vacuuming', note: 'Seats, floor mats, boot, and all interior surfaces' },
  { label: 'Tyre & Rim Cleaning', note: 'Brake-dust removal, tyre shine application' },
  { label: 'Dashboard Cleaning', note: 'Dust wipe-down, dashboard polish, AC vent cleaning' },
  { label: 'Window Cleaning', note: 'Streak-free glass cleaner, inside & outside' },
  { label: 'Door Jamb Cleaning', note: 'Often missed — we clean every door edge and seal' },
  { label: 'Seat Wipe-Down', note: 'Fabric & leather-safe conditioner wipe (Premium plan)' },
  { label: 'Air Freshener', note: 'Subtle fragrance applied inside the cabin' },
];

export const PLANS = [
  {
    tier: 'Basic Wash',
    price: '₹299',
    sub: 'Per wash · All vehicle types',
    features: [
      'Exterior body wash',
      'Interior vacuuming',
      'Window cleaning (outside)',
      'Tyre cleaning',
      'Air freshener',
    ],
    popular: false,
    cta: 'Book Basic Wash',
    btnClass: 'btn-outline',
  },
  {
    tier: 'Premium Wash',
    price: '₹499',
    sub: 'Per wash · All vehicle types',
    features: [
      'Everything in Basic',
      'Dashboard deep clean',
      'Door jamb cleaning',
      'Tyre shine polish',
      'Seat wipe & conditioning',
      'Window cleaning (inside + outside)',
      'AC vent cleaning',
    ],
    popular: true,
    cta: 'Book Premium Wash',
    btnClass: 'btn-primary',
  },
];

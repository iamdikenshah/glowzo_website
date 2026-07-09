export const STATS = [
  { num: '500+', label: 'Cars Cleaned' },
  { num: '300+', label: 'Monthly Subscribers' },
  { num: '4.9★', label: 'Average Rating' },
  { num: '7 Days', label: 'A Week Service' },
];

export const SERVICES = [
  {
    key: 'daily',
    title: 'Daily Car Cleaning',
    desc: 'Fresh, spotless car every single day at your doorstep. Exterior body wipe-down, dusting, glass cleaning and tyre care — done before you leave for the day.',
    points: ['Daily exterior cleaning', 'Glass & mirror wipe', 'Tyre & rim dusting', 'Eco-friendly products'],
    icon: 'car',
  },
  {
    key: 'foam',
    title: 'Interior Foam Cleaning',
    desc: 'Deep foam treatment for your cabin — seats, dashboard, mats and every corner shampooed and sanitised for a fresh, like-new interior.',
    points: ['Seat & fabric shampoo', 'Dashboard foam polish', 'Mat & carpet cleaning', 'Odour treatment'],
    icon: 'foam',
  },
];

// Monthly subscription pricing by vehicle category.
export const PRICING_TIERS = [
  {
    tier: 'Standard',
    types: 'Hatchback / Sedan / Compact SUV',
    price: '₹599',
    period: '/ month',
    popular: false,
  },
  {
    tier: 'Premium SUV',
    types: 'Fortuner, Scorpio N, XUV700, Safari, Harrier, MG Hector, Innova Hycross, Hilux, Thar',
    price: '₹799',
    period: '/ month',
    popular: true,
  },
  {
    tier: 'Luxury',
    types: 'BMW, Mercedes-Benz, Audi, Volvo, Jaguar, Land Rover, Lexus, Porsche',
    price: '₹999',
    period: '/ month',
    popular: false,
  },
];

export const SERVICE_AREAS = [
  { name: 'South Bopal', active: true },
  { name: 'Bopal', active: true },
  { name: 'Shilaj', active: true },
  { name: 'Ambli', active: false },
  { name: 'Ghuma', active: false },
  { name: 'SG Highway', active: false },
];

export const WHY_CHOOSE = [
  { icon: '⚡', title: 'Fast & Reliable', text: 'On-time doorstep service every single day — your car is ready before you head out.' },
  { icon: '💰', title: 'Budget Friendly', text: 'Flat monthly pricing with no hidden charges. Premium care that fits your budget.' },
  { icon: '📅', title: 'Always Available', text: 'We work 7 days a week so your car stays spotless around your schedule.' },
  { icon: '✅', title: '100% Satisfaction', text: 'Not happy with a clean? We re-do it, no questions asked.' },
  { icon: '🌿', title: 'Eco-Friendly', text: 'pH-neutral, biodegradable products and water-smart techniques.' },
  { icon: '👨‍🔧', title: 'Trained Experts', text: 'Background-checked professionals trained to care for every vehicle type.' },
];

export const STEPS = [
  { num: '01', title: 'Register Your Car', text: 'Share your details, vehicle and society in under a minute — online or on WhatsApp.' },
  { num: '02', title: 'We Schedule You', text: 'Our team confirms your daily slot and assigns a cleaner to your location.' },
  { num: '03', title: 'Daily Doorstep Clean', text: 'We arrive every day and clean your car right where it is parked.' },
  { num: '04', title: 'Enjoy a Fresh Ride', text: 'Step out to a spotless car, every single morning. Cancel anytime.' },
];

export const FAQS = [
  {
    q: 'What does the daily car cleaning include?',
    a: 'Every daily visit covers an exterior body wipe-down, glass and mirror cleaning, tyre and rim dusting, and a quick interior tidy. Deep interior foam cleaning can be added on a schedule that suits you.',
  },
  {
    q: 'Do I need to be present during the cleaning?',
    a: 'No. As long as your car is accessible at its registered parking spot, our team cleans it without you having to be there. You’ll get a fresh car whenever you head out.',
  },
  {
    q: 'How is the monthly price decided?',
    a: 'Pricing is a flat monthly amount based on your vehicle category — Standard (₹599), Premium SUV (₹799) or Luxury (₹999). No per-wash charges and no hidden fees.',
  },
  {
    q: 'Which areas do you currently serve?',
    a: 'We currently operate in South Bopal, Bopal and Shilaj, with Ambli, Ghuma and SG Highway launching soon. Register your interest and we’ll notify you as we expand.',
  },
  {
    q: 'Is the cleaning safe for my car’s paint?',
    a: 'Absolutely. We use pH-neutral, biodegradable products and microfibre cloths that are gentle on paint, rubber and trim — with water-smart techniques that minimise waste.',
  },
  {
    q: 'Can I pause or cancel my subscription?',
    a: 'Yes — you can pause or cancel anytime. Cancellation takes effect from your next billing cycle, and there are no lock-in contracts.',
  },
];

export const TESTIMONIALS = [
  {
    initial: 'R',
    gradient: 'linear-gradient(135deg,#0EA5E9,#0369A1)',
    name: 'Rahul Mehta',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"Absolutely brilliant service! They show up every morning, super professional, and my car looks brand new daily. Worth every rupee!"',
  },
  {
    initial: 'P',
    gradient: 'linear-gradient(135deg,#06B6D4,#0891B2)',
    name: 'Priya Shah',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"So convenient! The monthly plan means I never think about washing my car again. The interior foam clean was spotless. Highly recommend!"',
  },
  {
    initial: 'A',
    gradient: 'linear-gradient(135deg,#6366F1,#4338CA)',
    name: 'Ankit Patel',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"Best doorstep car cleaning in Bopal! Quality products and the daily cleaning keeps my car showroom-fresh. The subscription is totally worth it."',
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
    text: '"I\'ve tried many services but Glowzo is in a different league. The attention to detail — windows, dashboard, tyres — everything is perfect."',
  },
  {
    initial: 'S',
    gradient: 'linear-gradient(135deg,#EC4899,#BE185D)',
    name: 'Simran Kapoor',
    place: 'Bopal, Ahmedabad',
    stars: 5,
    text: '"Such a time-saver! Working from home means I never have time. Glowzo comes to me and does a fantastic job every single day."',
  },
];

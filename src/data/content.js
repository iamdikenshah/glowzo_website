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

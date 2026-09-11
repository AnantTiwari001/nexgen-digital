/**
 * Central business configuration. Everything that identifies the business or that a
 * non-developer may want to change lives here: names, contacts, hours, socials,
 * feature flags. Copy and page content live in src/data and src/i18n.
 */
export const site = {
  name: 'NexGen Digital',
  legalName: 'NexGen Digital Pvt. Ltd.', // placeholder
  tagline: 'Creative Growth Solutions for Nepal',
  description:
    'NexGen Digital is a Kathmandu-based digital growth agency helping Nepali businesses, brands and creators grow with social media marketing, AI content, Meta and Google ads, websites, and the AI Smart Reviews QR stand.',
  foundedYear: 2026,
  registrationNumber: 'Reg. No. 000000/082/083', // placeholder
  pan: 'PAN 000000000', // placeholder

  location: {
    city: 'Kathmandu',
    country: 'Nepal',
    addressLine: 'Putalisadak, Kathmandu 44600', // placeholder
    mapEmbedUrl: '', // paste a Google Maps embed URL to show a map on the contact page
    // Latitude and longitude used in JSON-LD. Kathmandu centre as a placeholder.
    geo: { lat: 27.7172, lng: 85.324 },
    serviceArea: 'Nepal and beyond',
  },

  contact: {
    phone: '+977 98XXXXXXXX', // placeholder
    whatsapp: '9779800000000', // digits only, international format, placeholder
    whatsappGreeting: 'Hi NexGen Digital, I would like to know more about your services.',
    email: 'hello@nexgendigital.com.np', // placeholder
    hours: { open: '6:00 AM', close: '10:00 PM', days: 'Sunday to Saturday', timezone: 'Asia/Kathmandu' },
  },

  social: {
    facebook: 'https://facebook.com/nexgendigitalnepal',
    instagram: 'https://instagram.com/nexgendigitalnepal',
    tiktok: 'https://tiktok.com/@nexgendigitalnepal',
    linkedin: 'https://linkedin.com/company/nexgendigitalnepal',
    youtube: 'https://youtube.com/@nexgendigitalnepal',
    googleBusiness: 'https://g.page/r/placeholder/review', // placeholder Google review link
  },

  /** Short brand phrases pulled from the brand sheet. Used as accents around the site. */
  phrases: {
    scriptHero: 'Creative People, Stronger Nepal',
    scriptAlt: 'Ideas Today, Growth Tomorrow',
    localBusiness: 'Local Business, Stronger Nepal',
    brighter: 'A Brighter Nepal, Digitally',
    dreams: 'Same Dreams. Bigger Possibilities.',
    pillars: ['Ideas', 'Marketing', 'Creativity', 'Technology'],
    audience: ['Businesses', 'Brands', 'Creators'],
    footerLine: 'Ideas Today. A Brighter Nepal Tomorrow.',
    partner: "Nepal's Digital Partner for a Brighter Tomorrow",
  },

  /** Feature flags. Flip to hide or show areas without touching page code. */
  features: {
    chatWidget: true,
    languageToggle: true,
    darkMode: true,
    pricingPage: true,
    preorder: true,
    testimonials: true,
    stats: true,
    smoothScroll: true,
  },

  /** Currency shown on pricing placeholders. */
  currency: { code: 'NPR', symbol: 'Rs.' },

  seo: {
    defaultTitle: 'NexGen Digital | Creative Growth Solutions for Nepal',
    titleTemplate: '%s | NexGen Digital',
    keywords: [
      'digital marketing agency Kathmandu',
      'digital marketing Nepal',
      'social media marketing Nepal',
      'Meta ads Nepal',
      'Google ads Nepal',
      'website design Kathmandu',
      'Google review QR stand Nepal',
      'AI video production Nepal',
    ],
    ogImage: '/og/default.png',
    twitterHandle: '@nexgendigitalnp',
  },
} as const;

export type Site = typeof site;

export const whatsappUrl = (message: string = site.contact.whatsappGreeting) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

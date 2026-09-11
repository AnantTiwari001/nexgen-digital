import type { Benefit, Faq, IconName, PricingTier, ProcessStep } from './types';

/**
 * The flagship product: AI Smart Reviews Business QR Stand.
 * Currently in pre-order. All prices are placeholders in NPR.
 */
export const product = {
  slug: 'ai-smart-reviews-qr',
  name: 'AI Smart Reviews QR Stand',
  shortName: 'Smart Reviews QR',
  status: 'preorder' as 'preorder' | 'available',
  tagline: 'Customers scan. Reviews grow.',
  nepaliTagline: 'ग्राहकले scan गर्छन्, review दिन्छन्।',
  summary:
    'A premium counter stand with one smart QR code. Customers scan and tap to leave a Google review, follow your social accounts, pay, or contact you. Built for Nepal’s cafés, restaurants, salons, clinics, hotels and local shops.',
  accentPhrase: 'One QR, more possibilities',
  audience: ['Cafés', 'Restaurants', 'Salons', 'Clinics', 'Hotels', 'Retail shops', 'Gyms', 'Pharmacies'],

  /** What one scan opens */
  links: [
    { icon: 'google' as IconName, title: 'Google Maps Reviews', text: 'Direct to your review form' },
    { icon: 'instagram' as IconName, title: 'Social Media', text: 'Instagram, Facebook, TikTok' },
    { icon: 'card' as IconName, title: 'Payment Options', text: 'eSewa, Khalti, bank, Fonepay' },
    { icon: 'user' as IconName, title: 'Contact Details', text: 'Call, WhatsApp, location' },
    { icon: 'grid' as IconName, title: 'More Tools', text: 'Menu, offers, booking' },
  ],

  features: [
    { icon: 'scan', title: 'Scan & Tap', text: 'Works with any phone camera. No app needed.' },
    { icon: 'google', title: 'Google Reviews', text: 'One tap to the review form. Fewer steps, more reviews.' },
    { icon: 'shield', title: 'More Trust', text: 'Recent reviews are the first thing new customers read.' },
    { icon: 'trend', title: 'More Visibility', text: 'Reviews lift your ranking on Google Maps searches.' },
    { icon: 'chart', title: 'Smart Insights', text: 'See how many people scanned and what they tapped.' },
    { icon: 'gear', title: 'Update Anytime', text: 'Change links without printing a new QR.' },
  ] satisfies Benefit[],

  howItWorks: [
    { title: 'Place the stand', text: 'At the counter, table or reception where customers finish their visit.' },
    { title: 'Customer scans', text: 'The camera opens your branded smart page in one second.' },
    { title: 'One tap', text: 'Review, follow, pay or contact. Each is one tap away.' },
    { title: 'You grow', text: 'Reviews, followers and repeat customers build month after month.' },
  ] satisfies ProcessStep[],

  preorderPerks: [
    { icon: 'rocket', title: 'Early Access', text: 'Be the first to use it before public launch.' },
    { icon: 'gear', title: 'Priority Setup', text: 'Get prioritised setup and support.' },
    { icon: 'box', title: 'Limited Units', text: 'Exclusive early batch. Limited availability.' },
  ] satisfies Benefit[],

  tiers: [
    {
      name: 'Stand',
      price: '4,999',
      period: 'one-time',
      features: ['Premium acrylic stand', 'Branded smart QR page', 'Google review link', 'Social follow links', 'Free delivery in Kathmandu valley'],
    },
    {
      name: 'Stand + Care',
      price: '6,999',
      period: 'first year',
      note: 'Then Rs. 1,999/year',
      highlight: true,
      features: ['Everything in Stand', 'Payment links', 'Scan and tap analytics', 'Unlimited link updates', 'Priority support'],
    },
    {
      name: 'Multi-location',
      price: 'Custom',
      features: ['3 or more stands', 'Central dashboard', 'Branch-level analytics', 'Volume pricing'],
    },
  ] satisfies PricingTier[],

  /** Options offered during pre-order */
  options: {
    quantities: [1, 2, 3, 5, 10],
    finishes: ['Clean White', 'NexGen Orange', 'Matte Black'],
    paymentMethods: [
      { id: 'esewa', label: 'eSewa', hint: 'Pay via eSewa on delivery' },
      { id: 'khalti', label: 'Khalti', hint: 'Pay via Khalti on delivery' },
      { id: 'bank', label: 'Bank transfer', hint: 'Details shared before delivery' },
      { id: 'cash', label: 'Cash on delivery', hint: 'Kathmandu valley only' },
    ],
    businessTypes: ['Café / Restaurant', 'Salon / Spa', 'Clinic / Pharmacy', 'Hotel / Homestay', 'Retail shop', 'Gym / Fitness', 'Education', 'Other'],
  },

  faqs: [
    { q: 'When will it ship?', a: 'The first batch is planned soon after launch. Pre-order customers are served first, in order of booking.' },
    { q: 'Do I pay now?', a: 'No. Pre-ordering reserves your stand. We confirm details with you and collect payment on delivery or before dispatch, using the method you choose.' },
    { q: 'Do I need a Google Business Profile?', a: 'Yes, for reviews. If you do not have one yet, we will set it up for you as part of onboarding.' },
    { q: 'Can I change my links later?', a: 'Yes. The QR never changes. Links behind it can be updated anytime on the Care plan, or on request on the Stand plan.' },
    { q: 'Is it only for Kathmandu?', a: 'No. We deliver across Nepal. Free delivery applies inside the Kathmandu valley.' },
  ] satisfies Faq[],

  seo: {
    title: 'AI Smart Reviews QR Stand | Pre-order Now',
    description:
      'Get more Google reviews, followers and easy payments with the AI Smart Reviews QR stand from NexGen Digital. Pre-order open for Nepal businesses.',
  },
};

export type Product = typeof product;

/**
 * Knowledge base used by the chat widget (rule-based) and the general FAQ section.
 * Each entry has keywords that trigger it. Keep answers short and friendly.
 */
export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  /** Optional link shown as a button after the answer */
  link?: { label: string; href: string };
}

export const knowledge: KnowledgeEntry[] = [
  {
    id: 'services',
    keywords: ['service', 'services', 'what do you do', 'offer', 'सेवा', 'help with'],
    question: 'What services do you offer?',
    answer:
      'We offer social media management, content creation, Meta and Google ads, AI video and graphics, website design, marketing strategy, and the AI Smart Reviews QR stand for local businesses.',
    link: { label: 'See all services', href: '/services' },
  },
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'how much', 'rate', 'package', 'fee', 'budget', 'मूल्य', 'कति'],
    question: 'How much do your services cost?',
    answer:
      'Plans start from Rs. 8,000 per month for content and Rs. 10,000 per month for ads management. Websites start from Rs. 35,000. Every service page shows starting prices, and we send a custom quote after a short call.',
    link: { label: 'View pricing', href: '/pricing' },
  },
  {
    id: 'qr',
    keywords: ['qr', 'review', 'reviews', 'stand', 'google review', 'preorder', 'pre-order', 'pre order'],
    question: 'What is the AI Smart Reviews QR stand?',
    answer:
      'It is a counter stand with one smart QR code. Customers scan it to leave a Google review, follow your socials, pay or contact you. It is in pre-order now, starting at Rs. 4,999, with no payment required to reserve.',
    link: { label: 'Pre-order now', href: '/preorder' },
  },
  {
    id: 'contact',
    keywords: ['contact', 'call', 'phone', 'whatsapp', 'email', 'reach', 'talk', 'number', 'सम्पर्क'],
    question: 'How can I contact you?',
    answer: 'The fastest way is WhatsApp. You can also use the contact form or email us. We reply within one business day, usually much faster.',
    link: { label: 'Contact us', href: '/contact' },
  },
  {
    id: 'hours',
    keywords: ['hours', 'open', 'time', 'when', 'available', 'timing', 'समय'],
    question: 'What are your hours?',
    answer: 'We are available from 6:00 AM to 10:00 PM, seven days a week, Nepal time.',
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'office', 'address', 'kathmandu', 'pokhara', 'outside', 'city', 'कहाँ'],
    question: 'Where are you located?',
    answer: 'We are based in Kathmandu and work with businesses across Nepal and abroad. Most work happens online, so location is never a barrier.',
  },
  {
    id: 'ads',
    keywords: ['ads', 'ad', 'meta', 'facebook ads', 'google ads', 'boost', 'advertis', 'campaign'],
    question: 'Do you run Facebook and Google ads?',
    answer:
      'Yes. We manage Meta (Facebook and Instagram), TikTok and Google Ads campaigns with proper tracking. Management fees start at Rs. 10,000 per month, with ad spend paid directly to the platform from your own account.',
    link: { label: 'Meta Ads', href: '/services/meta-ads' },
  },
  {
    id: 'website',
    keywords: ['website', 'web', 'site', 'ecommerce', 'e-commerce', 'online store', 'domain', 'hosting'],
    question: 'Do you build websites?',
    answer: 'Yes. Landing pages from Rs. 35,000, business sites from Rs. 75,000 and e-commerce from Rs. 1,50,000. Fast, SEO-ready and easy to update.',
    link: { label: 'Website design', href: '/services/website-design-development' },
  },
  {
    id: 'video',
    keywords: ['video', 'reel', 'reels', 'tiktok', 'promo', 'ai video', 'animation'],
    question: 'Can you make reels and promo videos?',
    answer: 'Yes. AI Smart Video Production delivers reels from Rs. 4,500 and promo videos from Rs. 12,000, usually within 3 to 5 working days.',
    link: { label: 'AI Video', href: '/services/ai-video-production' },
  },
  {
    id: 'design',
    keywords: ['design', 'graphic', 'graphics', 'logo', 'poster', 'banner', 'brand'],
    question: 'Do you do graphic design and logos?',
    answer: 'Yes. Single creatives from Rs. 1,500, packs of ten from Rs. 12,000 and full brand kits from Rs. 25,000.',
    link: { label: 'AI Graphics', href: '/services/ai-graphics-design' },
  },
  {
    id: 'smm',
    keywords: ['social', 'instagram', 'facebook', 'manage', 'posting', 'content', 'followers'],
    question: 'Can you manage my social media?',
    answer: 'Yes. Social media management starts at Rs. 12,000 per month and includes a content calendar, design, posting, engagement and reporting.',
    link: { label: 'Social Media Management', href: '/services/social-media-management' },
  },
  {
    id: 'start',
    keywords: ['start', 'begin', 'get started', 'onboard', 'process', 'how does it work', 'next step'],
    question: 'How do we get started?',
    answer: 'Message us on WhatsApp or leave your details here. We book a short call, understand your goal, and send a proposal within two business days.',
    link: { label: 'Get started', href: '/contact' },
  },
];

/** General FAQ shown on the contact page */
export const generalFaq = knowledge.filter((k) => ['services', 'pricing', 'start', 'hours', 'location', 'qr'].includes(k.id));

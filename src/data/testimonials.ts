/**
 * Testimonials. Placeholder content until real client stories are added.
 * `video` can hold a YouTube/Facebook embed URL or an mp4 path; leave empty for text-only.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  business: string;
  location: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string; // image path in /public or empty for initials
  video?: string; // embed URL or mp4 path
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Within two months our Instagram went from a few likes to daily enquiries. The team understands what Nepali customers respond to.',
    name: 'Client Name',
    role: 'Owner',
    business: 'Himalayan Brew Café',
    location: 'Jhamsikhel, Lalitpur',
    service: 'Social Media Management',
    rating: 5,
    placeholder: true,
  },
  {
    quote:
      'The Google Ads campaign brought patients who were actively searching for us. Clear reporting, no surprises on the budget.',
    name: 'Client Name',
    role: 'Director',
    business: 'Sunrise Dental Clinic',
    location: 'Baneshwor, Kathmandu',
    service: 'Google Ads',
    rating: 5,
    placeholder: true,
  },
  {
    quote:
      'Our promo reels look like a big-brand production and were delivered in four days. We use them across Meta ads and TikTok.',
    name: 'Client Name',
    role: 'Founder',
    business: 'Everest Trek Gear',
    location: 'Thamel, Kathmandu',
    service: 'AI Smart Video Production',
    rating: 5,
    placeholder: true,
    video: '',
  },
  {
    quote:
      'The new website loads instantly and the WhatsApp button alone doubled our booking messages. Worth every rupee.',
    name: 'Client Name',
    role: 'Manager',
    business: 'Pokhara Lake View Resort',
    location: 'Lakeside, Pokhara',
    service: 'Website Design & Development',
    rating: 5,
    placeholder: true,
  },
];

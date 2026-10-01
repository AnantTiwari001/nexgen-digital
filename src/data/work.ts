/**
 * Proof for the homepage: client work and case studies. Every entry is a placeholder
 * (`placeholder: true`) until it is replaced with real client material, and the site
 * labels placeholders as samples. To add the real thing, set `media` (a path in
 * /public, e.g. '/work/himalayan-brew-reel.mp4') and fill in the client's own numbers.
 */

export type WorkKind = 'reel' | 'post' | 'ad' | 'website';

export interface WorkItem {
  client: string;
  area: string;
  kind: WorkKind;
  /** What the piece is, in a few words */
  title: string;
  /** What it did, with a timeframe */
  result: string;
  /** Service slug, links the piece to its service page */
  service: string;
  /** Image or poster path; reels can also set `video` */
  media?: string;
  video?: string;
  placeholder?: boolean;
}

export const work: WorkItem[] = [
  { client: 'Himalayan Brew Café', area: 'Jhamsikhel', kind: 'reel', title: 'Morning menu reel', result: '41k views in 7 days', service: 'social-media-management', placeholder: true },
  { client: 'Everest Trek Gear', area: 'Thamel', kind: 'ad', title: 'Dashain sale carousel', result: '4.6x return on ad spend', service: 'meta-ads', placeholder: true },
  { client: 'Sunrise Dental Clinic', area: 'Baneshwor', kind: 'post', title: 'Patient-care series', result: '2.3x more saves', service: 'content-creation', placeholder: true },
  { client: 'Lake View Resort', area: 'Pokhara', kind: 'website', title: 'Booking website', result: '2x WhatsApp booking clicks', service: 'website-design-development', placeholder: true },
  { client: 'Namaste Salon', area: 'Lazimpat', kind: 'reel', title: 'Before-and-after reel', result: '2,400 new local followers', service: 'followers-growth', placeholder: true },
  { client: 'Patan Handicrafts', area: 'Patan', kind: 'post', title: 'Festival poster set', result: 'Delivered in under 24 hours', service: 'ai-graphics-design', placeholder: true },
];

export interface CaseStudy {
  client: string;
  area: string;
  service: string; // slug
  serviceName: string;
  /** The headline number, short enough to print large */
  metric: string;
  /** What the number counts, and over what time */
  metricLabel: string;
  summary: string;
  photo?: string;
  placeholder?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    client: 'Himalayan Brew Café',
    area: 'Jhamsikhel, Lalitpur',
    service: 'social-media-management',
    serviceName: 'Social Media Management',
    metric: '3.1×',
    metricLabel: 'weekly engagement in 60 days',
    summary: 'A page that had gone quiet for months, rebuilt with a content calendar and a steady reel cadence.',
    placeholder: true,
  },
  {
    client: 'Sunrise Dental Clinic',
    area: 'Baneshwor, Kathmandu',
    service: 'google-ads',
    serviceName: 'Google Ads',
    metric: '3.4×',
    metricLabel: 'booked consultations in 90 days',
    summary: 'Search and Google Maps campaigns aimed at people nearby searching for a dentist right now.',
    placeholder: true,
  },
  {
    client: 'Everest Trek Gear',
    area: 'Thamel, Kathmandu',
    service: 'meta-ads',
    serviceName: 'Meta Ads',
    metric: '4.6×',
    metricLabel: 'return on ad spend over Dashain',
    summary: 'Five hooks tested in the first week of the festival sale; the winner got the budget.',
    placeholder: true,
  },
];

/**
 * Social-proof numbers. Placeholders until real figures are available.
 * `value` is the number the counter animates to; `suffix` is appended.
 */
export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  placeholder?: boolean;
}

export const stats: Stat[] = [
  { value: 120, suffix: '+', label: 'Brands supported', placeholder: true },
  { value: 4.9, suffix: '/5', label: 'Average client rating', placeholder: true },
  { value: 2.5, prefix: '', suffix: 'M+', label: 'People reached monthly', placeholder: true },
  { value: 98, suffix: '%', label: 'Clients who renew', placeholder: true },
];

export const trustedBy: { name: string; placeholder?: boolean }[] = [
  { name: 'Himalayan Brew', placeholder: true },
  { name: 'Sunrise Dental', placeholder: true },
  { name: 'Everest Trek Gear', placeholder: true },
  { name: 'Lake View Resort', placeholder: true },
  { name: 'Kathmandu Kitchen', placeholder: true },
  { name: 'Namaste Salon', placeholder: true },
  { name: 'Patan Handicrafts', placeholder: true },
  { name: 'Peak Fitness', placeholder: true },
];

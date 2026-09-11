/** About page content. Placeholders until the real team and story are provided. */
export const story = {
  headline: 'Local talent. Global impact.',
  intro:
    'NexGen Digital was started in Kathmandu with one belief: Nepali businesses deserve world-class digital marketing built by people who understand Nepal.',
  paragraphs: [
    'We saw brilliant local businesses, cafés, clinics, shops, resorts and creators, losing customers to whoever showed up first online. Not because their product was worse, but because nobody had helped them tell their story properly.',
    'So we brought together designers, writers, ad specialists and technologists who grew up here, combined them with the best AI tools available today, and built an agency that delivers fast, affordable and professional growth.',
    'Every plan we make starts with your goal, not a template. Every report we send is written so you can actually understand it. And every rupee you spend has a job to do.',
  ],
  placeholder: true,
};

export const values = [
  { icon: 'bolt', title: 'Ideas', text: 'Fresh thinking for every brand, not recycled templates.' },
  { icon: 'megaphone', title: 'Marketing', text: 'Strategy that connects your product to the right people.' },
  { icon: 'palette', title: 'Creativity', text: 'Design and stories that stop the scroll and stay remembered.' },
  { icon: 'sparkles', title: 'Technology', text: 'AI and modern tools that make quality fast and affordable.' },
] as const;

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  placeholder?: boolean;
}

export const team: TeamMember[] = [
  { name: 'Founder Name', role: 'Founder & Strategy Lead', bio: 'Leads strategy and client growth. Ten years across marketing and technology.', placeholder: true },
  { name: 'Team Member', role: 'Creative Director', bio: 'Shapes every visual, from brand kits to reels.', placeholder: true },
  { name: 'Team Member', role: 'Performance Marketing Lead', bio: 'Runs Meta and Google campaigns with an eye on cost per result.', placeholder: true },
  { name: 'Team Member', role: 'Web & Product Lead', bio: 'Builds fast websites and the Smart Reviews QR platform.', placeholder: true },
];

export const milestones = [
  { year: '2026', title: 'NexGen Digital founded in Kathmandu', placeholder: true },
  { year: '2026', title: 'AI Smart Reviews QR Stand announced', placeholder: true },
  { year: 'Next', title: 'Expanding to businesses across Nepal', placeholder: true },
];

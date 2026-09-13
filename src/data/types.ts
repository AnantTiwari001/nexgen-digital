export type IconName =
  | 'megaphone'
  | 'users'
  | 'video'
  | 'palette'
  | 'qr'
  | 'chart'
  | 'doc'
  | 'meta'
  | 'google'
  | 'globe'
  | 'dots'
  | 'sparkles'
  | 'phone'
  | 'mail'
  | 'whatsapp'
  | 'arrow'
  | 'check'
  | 'star'
  | 'shield'
  | 'rocket'
  | 'gear'
  | 'box'
  | 'pin'
  | 'clock'
  | 'sun'
  | 'moon'
  | 'lang'
  | 'chat'
  | 'close'
  | 'menu'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'linkedin'
  | 'youtube'
  | 'play'
  | 'mountain'
  | 'code'
  | 'image'
  | 'trend'
  | 'target'
  | 'heart'
  | 'send'
  | 'quote'
  | 'scan'
  | 'card'
  | 'user'
  | 'grid'
  | 'bolt'
  | 'search';

export type CategoryId = 'social' | 'ads' | 'ai-creative' | 'web' | 'local' | 'strategy';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  icon: IconName;
}

export interface PricingTier {
  name: string;
  price: string; // formatted, e.g. "15,000"
  period?: string; // "/month", "one-time"
  note?: string;
  features: string[];
  highlight?: boolean;
  cta?: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface Benefit {
  title: string;
  text: string;
  icon?: IconName;
}

export interface Faq {
  q: string;
  a: string;
}

/**
 * Short, placeholder-labelled proof point for a service page: a headline
 * result, the scenario it came from, and a category tag. Always mark
 * `placeholder: true` until replaced with a real client case study.
 */
export interface CaseStudyExample {
  title: string;
  /** Headline result/stat, e.g. "3.2x more engagement in 60 days" */
  stat: string;
  /** One-line scenario description */
  description: string;
  tag: string;
  placeholder?: boolean;
}

export interface WhyUsPoint {
  title: string;
  text: string;
}

/** "Why choose NexGen for this service" copy, specific to each service. */
export interface ServiceWhyUs {
  lead: string;
  points: WhyUsPoint[];
}

/**
 * A drag-to-compare before/after reveal, part of the site's traced-line signature
 * moment system (see PLAN.md "Signature Moments"). Only services where the work
 * is literally a visible transformation should set this — it auto-sweeps open
 * on scroll into view, no drag required to see it happen.
 */
export interface BeforeAfterDemo {
  beforeCaption: string;
  afterCaption: string;
  afterTag: string;
}

/** One scene in a VideoScrubDemo's auto-playing timeline. */
export interface VideoScrubScene {
  name: string;
}

/**
 * An auto-playing scrub-style video timeline, part of the traced-line signature
 * moment system. Only the video production service should set this.
 */
export interface VideoScrubDemo {
  scenes: VideoScrubScene[];
  durationSeconds: number;
}

export interface Service {
  slug: string;
  name: string;
  shortName?: string;
  category: CategoryId;
  icon: IconName;
  tagline: string;
  summary: string;
  /** Script-font accent phrase for the hero */
  accentPhrase: string;
  /** Optional Nepali accent line shown under the hero */
  nepaliLine?: string;
  problem: { title: string; text: string };
  benefits: Benefit[];
  deliverables: string[];
  examples: CaseStudyExample[];
  whyUs: ServiceWhyUs;
  /** Only set for the AI Graphics Design service. */
  beforeAfter?: BeforeAfterDemo;
  /** Only set for the AI Video Production service. */
  videoDemo?: VideoScrubDemo;
  process: ProcessStep[];
  pricing: PricingTier[];
  faqs: Faq[];
  related: string[];
  /** For services that are actually a product page, link there instead */
  href?: string;
  seo: { title: string; description: string };
}

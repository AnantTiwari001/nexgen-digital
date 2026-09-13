import type { Category, Service } from './types';

/**
 * Service catalogue. Organised into categories for the customer's benefit.
 * Prices are placeholders in NPR and are labelled as "starting from" on the site.
 */
export const categories: Category[] = [
  { id: 'social', name: 'Social Media', tagline: 'Show up every day, the right way.', icon: 'users' },
  { id: 'ads', name: 'Paid Advertising', tagline: 'Reach the customers who are ready to buy.', icon: 'target' },
  { id: 'ai-creative', name: 'AI Creative Studio', tagline: 'Scroll-stopping video and design, fast.', icon: 'sparkles' },
  { id: 'web', name: 'Web & Digital', tagline: 'A home for your brand that converts.', icon: 'globe' },
  { id: 'local', name: 'Local Business Tools', tagline: 'Turn walk-ins into reviews and followers.', icon: 'qr' },
  { id: 'strategy', name: 'Strategy & Custom', tagline: 'A plan built around your goals.', icon: 'chart' },
];

export const services: Service[] = [
  // ---------------- Social Media ----------------
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    shortName: 'SMM',
    category: 'social',
    icon: 'users',
    tagline: 'Consistent, on-brand posting across Facebook, Instagram and TikTok.',
    summary:
      'We plan, design, write, schedule and manage your social channels so your brand shows up every day with purpose. Strategy, content and consistency, handled end to end.',
    accentPhrase: 'Consistency builds brands',
    nepaliLine: 'Social media मा random post होइन। Strategy, content र consistency ले brand grow हुन्छ।',
    problem: {
      title: 'Random posts do not grow a brand',
      text: 'Most Nepali businesses post when they remember to, with no plan, no voice and no measurement. Followers stop paying attention and the page stops working for the business.',
    },
    benefits: [
      { title: 'Monthly content calendar', text: 'A clear plan of what goes out, when, and why. Approved by you before anything is published.', icon: 'doc' },
      { title: 'Designed to your brand', text: 'Every post, story and reel is made in your colours, fonts and tone. No template look.', icon: 'palette' },
      { title: 'Community management', text: 'We reply to comments and messages during business hours so no customer waits.', icon: 'chat' },
      { title: 'Monthly performance report', text: 'Reach, engagement, followers and what we will do next month, in plain language.', icon: 'chart' },
    ],
    deliverables: [
      'Channel audit and brand voice guide',
      'Content calendar approved monthly',
      '12 to 30 posts per month depending on plan',
      'Stories, reels and carousels',
      'Caption writing in English, Nepali or both',
      'Hashtag and posting-time strategy',
      'Comment and inbox management',
      'Monthly analytics report',
    ],
    process: [
      { title: 'Audit', text: 'We review your pages, competitors and audience to find what is working and what is missing.' },
      { title: 'Plan', text: 'A monthly content calendar with themes, formats and campaign hooks. You approve it.' },
      { title: 'Create', text: 'Our designers and writers produce posts, reels and stories in your brand style.' },
      { title: 'Publish and engage', text: 'We schedule, post, reply and keep the community warm.' },
      { title: 'Report and improve', text: 'Each month we show results and adjust the plan.' },
    ],
    pricing: [
      { name: 'Starter', price: '12,000', period: '/month', features: ['12 posts per month', '1 platform', 'Basic design', 'Monthly report'] },
      { name: 'Growth', price: '25,000', period: '/month', highlight: true, features: ['20 posts + 8 stories', '2 platforms', '4 reels per month', 'Community management', 'Monthly strategy call'] },
      { name: 'Pro', price: '45,000', period: '/month', features: ['30 posts + daily stories', '3 platforms', '8 reels per month', 'Priority support', 'Ad-ready creatives'] },
    ],
    faqs: [
      { q: 'Which platforms do you manage?', a: 'Facebook, Instagram and TikTok are the core. LinkedIn and YouTube can be added on Growth and Pro plans.' },
      { q: 'Do I need to give you my passwords?', a: 'No. We work through Meta Business Suite and TikTok Business Center access, which you control and can revoke at any time.' },
      { q: 'Can you post in Nepali?', a: 'Yes. We write in English, Nepali, or the natural mix most Nepali audiences prefer.' },
      { q: 'How soon will I see results?', a: 'Engagement usually improves within the first month. Follower growth and leads build over three months of consistent posting.' },
    ],
    examples: [
      { title: 'Dormant cafe page rebuilt', stat: '3.1x more weekly engagement in 60 days', description: 'A Lalitpur cafe Instagram page had gone quiet for months; a content calendar and reel cadence rebuilt an active audience.', tag: 'Food and Beverage', placeholder: true },
      { title: 'Faster inbox response for a clinic', stat: '40% faster reply time on Messenger and Instagram DMs', description: 'Standard response templates and business-hours coverage turned a slow inbox into a lead channel.', tag: 'Healthcare', placeholder: true },
      { title: 'A real content calendar for a retail store', stat: '20+ posts every month with zero missed weeks', description: 'Moved a clothing retailer from posting only when remembered to a planned, on-brand monthly calendar.', tag: 'Retail', placeholder: true },
    ],
    whyUs: {
      lead: 'Managing social media well is not the same as designing a calendar template once. It means showing up every day with judgement: knowing which reel format works this month, replying before a comment turns into a complaint, and keeping one voice across three platforms.',
      points: [
        { title: 'We run pages, not just design posts', text: 'Design studios hand over creatives and move on. We plan the calendar, publish it, and watch the inbox, the full job, not only the visuals.' },
        { title: 'Built around Nepali platform behaviour', text: 'Posting times, tone and format come from how Kathmandu and Pokhara audiences actually scroll, not a generic global playbook.' },
        { title: 'Reports you can act on', text: 'A monthly report in plain language: what worked, what did not, and the specific change for next month.' },
      ],
    },
    related: ['content-creation', 'social-media-marketing', 'followers-growth'],
    seo: {
      title: 'Social Media Management in Nepal',
      description: 'Social media management for Nepali businesses. Strategy, content calendar, design, posting, engagement and reporting for Facebook, Instagram and TikTok.',
    },
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing & Advertising',
    shortName: 'Social Marketing',
    category: 'social',
    icon: 'megaphone',
    tagline: 'Campaigns that turn attention into customers.',
    summary:
      'Organic content builds trust. Paid social builds reach. We combine both into campaigns with a clear goal, whether that is sales, sign-ups, store visits or brand awareness.',
    accentPhrase: 'Attention into action',
    problem: {
      title: 'Boosting posts is not a marketing strategy',
      text: 'Hitting "boost" without targeting, creative testing or a landing plan burns budget. Campaigns need an objective, an audience, creatives that speak to them, and follow-up.',
    },
    benefits: [
      { title: 'Goal-first campaigns', text: 'Every campaign starts with one measurable goal and a budget that matches it.', icon: 'target' },
      { title: 'Creative testing', text: 'We test several hooks, formats and offers to find what your audience responds to.', icon: 'sparkles' },
      { title: 'Full-funnel', text: 'Awareness, consideration and conversion content working together, not in isolation.', icon: 'trend' },
      { title: 'Transparent reporting', text: 'Spend, reach, leads and cost per result shared weekly.', icon: 'chart' },
    ],
    deliverables: [
      'Campaign strategy and audience research',
      'Creative concepts, copy and design',
      'Meta and TikTok ad setup and management',
      'Influencer and creator collaborations on request',
      'Landing page or WhatsApp funnel recommendations',
      'Weekly performance snapshots',
    ],
    process: [
      { title: 'Define', text: 'We agree the goal, budget and success metric.' },
      { title: 'Build', text: 'Audiences, creatives and tracking are set up.' },
      { title: 'Launch and test', text: 'Campaigns go live with multiple creative variations.' },
      { title: 'Optimise', text: 'Budget moves to what works. Weak creatives are replaced.' },
      { title: 'Scale', text: 'Winning campaigns are expanded and refreshed.' },
    ],
    pricing: [
      { name: 'Campaign', price: '15,000', period: 'per campaign', note: 'Ad spend not included', features: ['One goal, one platform', 'Up to 4 creatives', '2-week run', 'Results report'] },
      { name: 'Always-on', price: '30,000', period: '/month', highlight: true, note: 'Ad spend not included', features: ['Meta + TikTok', 'Monthly creative refresh', 'Weekly optimisation', 'Lead tracking'] },
      { name: 'Growth Partner', price: 'Custom', features: ['Multi-platform', 'Dedicated strategist', 'Creator collaborations', 'Full-funnel reporting'] },
    ],
    faqs: [
      { q: 'Is ad spend included in your fee?', a: 'No. Ad spend is paid directly to Meta or TikTok from your own ad account. Our fee covers strategy, creative and management.' },
      { q: 'What is a good starting budget in Nepal?', a: 'Many local businesses see useful results from Rs. 15,000 to 30,000 per month in ad spend. We will recommend a budget based on your goal.' },
      { q: 'Can you run campaigns for events or launches?', a: 'Yes. Short, high-impact campaigns for launches, festivals and events are a common request.' },
    ],
    examples: [
      { title: 'A Dashain launch campaign', stat: '4.6x return on ad spend over a two-week festival push', description: 'A multi-creative Meta campaign timed to a festival sale, tested across five hooks before scaling the winner.', tag: 'Festival Campaign', placeholder: true },
      { title: 'Full-funnel gym membership push', stat: '215 qualified sign-up leads in one quarter', description: 'Awareness, retargeting and WhatsApp click campaigns worked as one system instead of a single boosted post.', tag: 'Fitness', placeholder: true },
      { title: 'Creator collaboration for a footwear brand', stat: '3 creator partnerships, 92,000 combined reach', description: 'Paid social paired with Nepali micro-creators built trust that ads alone could not.', tag: 'Retail', placeholder: true },
    ],
    whyUs: {
      lead: 'Anyone can press boost. Turning attention into a customer needs a clear objective, a tested creative, and a place for that person to land, so every campaign we run is built around an outcome, not reach for its own sake.',
      points: [
        { title: 'We test before we spend big', text: 'Every campaign launches with several creative variants. Budget only scales once we know which hook and offer actually convert.' },
        { title: 'Full-funnel, not a single boosted post', text: 'Awareness, retargeting and conversion work together, so someone who saw an ad once is not forgotten after they scroll past.' },
        { title: 'Weekly numbers, not a black box', text: 'Spend, results and cost per result shared weekly, so you always know what the budget bought.' },
      ],
    },
    related: ['meta-ads', 'social-media-management', 'ai-video-production'],
    seo: {
      title: 'Social Media Marketing & Advertising in Nepal',
      description: 'Goal-driven social media marketing campaigns for Nepali brands. Strategy, creative, Meta and TikTok ads, and clear reporting.',
    },
  },
  {
    slug: 'content-creation',
    name: 'Content Creation',
    category: 'social',
    icon: 'doc',
    tagline: 'Posts, reels, captions and stories your audience actually wants.',
    summary:
      'A steady flow of high-quality content in your brand voice. Photography direction, short videos, graphics and copy, delivered as a ready-to-post library each month.',
    accentPhrase: 'Good stories grow brands',
    problem: {
      title: 'No time, no ideas, no content',
      text: 'Business owners are busy running the business. Content is the first thing that slips, and an empty page tells customers the business is quiet.',
    },
    benefits: [
      { title: 'Monthly content library', text: 'A batch of posts, reels and stories delivered ahead of time so you are never scrambling.', icon: 'grid' },
      { title: 'On-brand, every time', text: 'Templates, colours and tone set once and applied consistently.', icon: 'palette' },
      { title: 'Nepali and English copy', text: 'Captions written for how your customers actually talk.', icon: 'lang' },
      { title: 'Shoot-day direction', text: 'We plan and direct product or team shoots when needed.', icon: 'video' },
    ],
    deliverables: [
      'Content pillars and monthly themes',
      'Static posts and carousels',
      'Short-form reels and TikToks',
      'Story templates and highlights covers',
      'Captions, hooks and hashtags',
      'Product and lifestyle shoot direction',
    ],
    process: [
      { title: 'Discover', text: 'We learn your products, customers and the questions they ask.' },
      { title: 'Plan', text: 'Content pillars and a monthly theme list.' },
      { title: 'Produce', text: 'Design, video and copy created in batches.' },
      { title: 'Deliver', text: 'A ready-to-post library with posting notes, or we post it for you.' },
    ],
    pricing: [
      { name: 'Lite', price: '8,000', period: '/month', features: ['8 posts', 'Captions included', 'Story templates'] },
      { name: 'Standard', price: '18,000', period: '/month', highlight: true, features: ['16 posts', '4 reels', 'Captions in EN + NE', 'Monthly themes'] },
      { name: 'Studio', price: '35,000', period: '/month', features: ['24 posts', '8 reels', 'Shoot direction', 'Priority turnaround'] },
    ],
    faqs: [
      { q: 'Do you come to our location for shoots?', a: 'Yes, within the Kathmandu valley. Outside the valley we plan remote shoots or work with your photos and videos.' },
      { q: 'Who owns the content?', a: 'You do. Everything we create for you is yours to use anywhere.' },
    ],
    examples: [
      { title: 'A monthly content library for a bakery', stat: '24 ready-to-post pieces delivered a week ahead, every month', description: 'Batched shoot days and a content pillar system replaced last-minute scrambling for content.', tag: 'Food and Beverage', placeholder: true },
      { title: 'Bilingual caption rewrite', stat: '2.3x more saves after switching to natural Nepali-English captions', description: 'Captions rewritten in the mixed tone local audiences actually use, instead of stiff formal copy.', tag: 'Copywriting', placeholder: true },
      { title: 'Shoot direction for a handicrafts brand', stat: '40+ usable shots from a single half-day shoot', description: 'A planned shot list and on-site direction turned one shoot into three months of content.', tag: 'Handicrafts', placeholder: true },
    ],
    whyUs: {
      lead: 'Content is the first thing that slips when a business gets busy. We build a repeatable system, pillars, batching and a delivery rhythm, so the page never goes quiet again.',
      points: [
        { title: 'Batched, not scrambled', text: 'A month of content produced ahead of time in planned shoot and design batches, so nothing gets rushed out the night before it is due.' },
        { title: 'Writers who think in both languages', text: 'Captions written the way customers actually talk, not translated word for word from a template.' },
        { title: 'Everything delivered is yours', text: 'Every post, reel and design file we make belongs to you, with no lock-in and no re-buying your own content later.' },
      ],
    },
    related: ['social-media-management', 'ai-graphics-design', 'ai-video-production'],
    seo: {
      title: 'Content Creation Services in Nepal',
      description: 'Monthly content creation for Nepali brands: posts, reels, stories and captions in English and Nepali, delivered ready to publish.',
    },
  },
  {
    slug: 'followers-growth',
    name: 'Audience & Followers Growth',
    shortName: 'Followers Growth',
    category: 'social',
    icon: 'trend',
    tagline: 'Grow a real audience that engages and buys.',
    summary:
      'Real, targeted growth through content strategy, engagement campaigns, creator collaborations and follower-objective ads. No bots, no fake accounts, just people who care about your brand.',
    accentPhrase: 'Real people, real growth',
    problem: {
      title: 'Fake followers do not buy anything',
      text: 'Bought followers wreck your reach and your credibility. Platforms detect them and hide your content. Growth has to come from people who actually want to hear from you.',
    },
    benefits: [
      { title: 'Targeted follower campaigns', text: 'Follower-objective ads aimed at your ideal customer profile and location.', icon: 'target' },
      { title: 'Engagement sprints', text: 'Giveaways, collaborations and interactive content that bring new eyes to your page.', icon: 'heart' },
      { title: 'Creator partnerships', text: 'We match you with Nepali creators whose audience fits your brand.', icon: 'users' },
      { title: 'Safe and platform-compliant', text: 'Everything we do follows Meta and TikTok rules, protecting your account.', icon: 'shield' },
    ],
    deliverables: [
      'Growth audit and target audience profile',
      'Follower-objective ad campaigns',
      'Giveaway and collaboration planning',
      'Creator shortlist and outreach',
      'Weekly growth tracking',
    ],
    process: [
      { title: 'Profile', text: 'Who should follow you, and why would they?' },
      { title: 'Optimise', text: 'Bio, highlights, pinned posts and first impression fixed.' },
      { title: 'Activate', text: 'Ads, collaborations and sprints launched.' },
      { title: 'Retain', text: 'Content keeps new followers engaged so they stay.' },
    ],
    pricing: [
      { name: 'Sprint', price: '10,000', period: 'per 30 days', note: 'Ad spend not included', features: ['Profile optimisation', '1 growth campaign', 'Weekly tracking'] },
      { name: 'Momentum', price: '20,000', period: '/month', highlight: true, note: 'Ad spend not included', features: ['Ongoing campaigns', '1 giveaway or collab per month', 'Creator outreach'] },
    ],
    faqs: [
      { q: 'Do you sell followers?', a: 'No. We only grow audiences through content, ads, and collaborations that comply with platform rules.' },
      { q: 'How many followers can I expect?', a: 'It depends on budget, niche and content. We share realistic targets after the audit instead of promising a number.' },
    ],
    examples: [
      { title: 'Targeted follower campaign for a salon', stat: '2,400 new targeted followers in 45 days', description: 'Follower-objective ads aimed at a defined local radius replaced generic boosting.', tag: 'Beauty and Wellness', placeholder: true },
      { title: 'Giveaway with two local creators', stat: '1,900 entries, 68% still following after 30 days', description: 'A structured giveaway with clear entry rules brought people who stayed, not only prize hunters.', tag: 'Engagement Sprint', placeholder: true },
      { title: 'Profile fix before spending on ads', stat: 'Follow-through rate up from 4% to 11%', description: 'Bio, highlights and pinned post rebuilt so profile visits actually turned into follows.', tag: 'Profile Optimisation', placeholder: true },
    ],
    whyUs: {
      lead: 'Bought followers wreck reach and credibility. Real growth is slower to promise but it is the only kind that buys from you, so every tactic here is built to attract people who stay.',
      points: [
        { title: 'No bots, no shortcuts', text: 'Every follower comes from a targeted ad, a collaboration or content that earned the attention, and stays platform-compliant so the account is never at risk.' },
        { title: 'The profile gets fixed first', text: 'A visitor who lands on a weak profile will not follow no matter how good the ad was, so bio, highlights and pinned posts are reviewed before any spend.' },
        { title: 'Planned for retention, not just a spike', text: 'A giveaway can bring a thousand followers in a week. Content and community are what keep them past week two.' },
      ],
    },
    related: ['social-media-management', 'social-media-marketing', 'content-creation'],
    seo: {
      title: 'Grow Real Followers in Nepal',
      description: 'Ethical audience growth for Nepali brands: targeted follower campaigns, collaborations and engagement strategy. No bots.',
    },
  },

  // ---------------- Paid Ads ----------------
  {
    slug: 'meta-ads',
    name: 'Meta Ads',
    category: 'ads',
    icon: 'meta',
    tagline: 'Facebook and Instagram ads that reach Nepal’s largest online audience.',
    summary:
      'Facebook and Instagram are where Nepal spends its screen time. We build and manage Meta campaigns with precise targeting, tested creatives and conversion tracking so every rupee is accountable.',
    accentPhrase: 'Reach more customers',
    problem: {
      title: 'Boosted posts, no leads',
      text: 'Boosting reaches people, but not the right people, and rarely the ones ready to buy. Proper campaign structure, pixel tracking and creative testing change the outcome.',
    },
    benefits: [
      { title: 'Precise targeting', text: 'Location, interests, behaviours, lookalikes and retargeting of people who already engaged.', icon: 'target' },
      { title: 'Conversion tracking', text: 'Meta Pixel and Conversions API set up so we optimise for leads and sales, not just clicks.', icon: 'chart' },
      { title: 'Creative that converts', text: 'Video, carousel and static ads made for the feed and tested against each other.', icon: 'sparkles' },
      { title: 'WhatsApp and Messenger ads', text: 'Click-to-chat campaigns that fit how Nepali customers like to buy.', icon: 'whatsapp' },
    ],
    deliverables: [
      'Ad account and Business Manager setup',
      'Pixel and Conversions API installation',
      'Campaign structure and audiences',
      'Ad creatives and copy',
      'Daily monitoring and optimisation',
      'Weekly and monthly reporting',
    ],
    process: [
      { title: 'Setup', text: 'Accounts, tracking and audiences configured correctly.' },
      { title: 'Launch', text: 'Campaigns go live with multiple creatives.' },
      { title: 'Optimise', text: 'We cut what does not work and scale what does.' },
      { title: 'Report', text: 'Clear numbers on spend, results and cost per result.' },
    ],
    pricing: [
      { name: 'Starter', price: '10,000', period: '/month', note: 'Ad spend not included', features: ['1 campaign', 'Up to 3 ad sets', 'Pixel setup', 'Monthly report'] },
      { name: 'Growth', price: '20,000', period: '/month', highlight: true, note: 'Ad spend not included', features: ['Up to 3 campaigns', 'Retargeting', 'Creative refresh', 'Weekly reports'] },
      { name: 'Scale', price: '15% of spend', note: 'Min. Rs. 30,000', features: ['Unlimited campaigns', 'Dedicated manager', 'Landing page advice', 'Daily optimisation'] },
    ],
    faqs: [
      { q: 'Can you run ads from my own ad account?', a: 'Yes, and we recommend it. You keep ownership of the account, data and payment method.' },
      { q: 'How do I pay Meta from Nepal?', a: 'We help you set up a supported payment method. Options are explained during onboarding.' },
    ],
    examples: [
      { title: 'Pixel and Conversions API rebuild', stat: '31% lower cost per lead after proper tracking', description: 'Replaced boosted posts with a pixel-tracked campaign structure and lookalike audiences.', tag: 'Lead Generation', placeholder: true },
      { title: 'Click-to-WhatsApp funnel', stat: '180+ WhatsApp conversations in the first month', description: 'Click-to-chat ads matched how customers actually prefer to enquire and buy.', tag: 'Click to Chat', placeholder: true },
      { title: 'Creative testing for an online store', stat: '5 creatives tested, winning ad cut cost per purchase by 27%', description: 'Video, carousel and static variants tested head to head before scaling the budget.', tag: 'E-commerce', placeholder: true },
    ],
    whyUs: {
      lead: 'Boosting reaches people, not necessarily the right ones. Real Meta advertising means pixel tracking, proper audience structure and creative built for the feed, the difference between spending and investing.',
      points: [
        { title: 'Tracking set up correctly from day one', text: 'Meta Pixel and Conversions API installed properly, so campaigns optimise for leads and sales instead of clicks.' },
        { title: 'Built for how Nepal buys', text: 'Click-to-WhatsApp and Messenger campaigns fit the way local customers prefer to enquire, not only a generic shop-now button.' },
        { title: 'Daily eyes on the account', text: 'Campaigns are monitored and adjusted daily, never set up once and left to run alone.' },
      ],
    },
    related: ['google-ads', 'social-media-marketing', 'ai-video-production'],
    seo: {
      title: 'Meta Ads Management in Nepal',
      description: 'Facebook and Instagram ads management in Nepal. Targeting, pixel tracking, creative testing and reporting by NexGen Digital.',
    },
  },
  {
    slug: 'google-ads',
    name: 'Google Ads',
    category: 'ads',
    icon: 'google',
    tagline: 'Be found the moment customers search for what you sell.',
    summary:
      'Search, Display, YouTube and Google Maps campaigns that put your business in front of people actively looking. High intent, measurable results.',
    accentPhrase: 'Found when it matters',
    problem: {
      title: 'Your competitors show up on Google. Do you?',
      text: 'When someone searches "best dental clinic Kathmandu" or "trekking gear near me", the businesses at the top win the call. Google Ads gets you there today, not after months of SEO.',
    },
    benefits: [
      { title: 'Search campaigns', text: 'Appear for the exact keywords your customers type.', icon: 'search' },
      { title: 'Google Maps and local', text: 'Show up for "near me" searches with call and direction buttons.', icon: 'pin' },
      { title: 'YouTube and Display', text: 'Video and banner campaigns for awareness and retargeting.', icon: 'play' },
      { title: 'Conversion tracking', text: 'Calls, forms and WhatsApp clicks tracked so we optimise for real outcomes.', icon: 'chart' },
    ],
    deliverables: [
      'Keyword research and competitor analysis',
      'Campaign build with ad groups and extensions',
      'Ad copy and landing page recommendations',
      'Conversion tracking via Google Tag',
      'Ongoing bid and budget optimisation',
      'Monthly reporting',
    ],
    process: [
      { title: 'Research', text: 'Keywords, intent and competitor ads.' },
      { title: 'Build', text: 'Structured campaigns, ad copy and extensions.' },
      { title: 'Track', text: 'Calls, forms and chats measured as conversions.' },
      { title: 'Optimise', text: 'Weekly refinement of keywords, bids and negatives.' },
    ],
    pricing: [
      { name: 'Local', price: '10,000', period: '/month', note: 'Ad spend not included', features: ['Search + Maps', '1 campaign', 'Call tracking'] },
      { name: 'Growth', price: '20,000', period: '/month', highlight: true, note: 'Ad spend not included', features: ['Search + Display', 'Up to 3 campaigns', 'Remarketing', 'Weekly reports'] },
      { name: 'Scale', price: '15% of spend', note: 'Min. Rs. 30,000', features: ['Search, Display, YouTube', 'Dedicated manager', 'Landing page CRO'] },
    ],
    faqs: [
      { q: 'Does Google Ads work for small businesses in Nepal?', a: 'Yes, especially for services people search for: clinics, education, travel, real estate, repairs and B2B.' },
      { q: 'How is Google Ads different from SEO?', a: 'Ads give immediate placement for a cost per click. SEO builds free rankings over months. Many clients use both.' },
    ],
    examples: [
      { title: 'Local search for a dental clinic', stat: '3.4x more booked consultations in 90 days', description: 'Search and Google Maps campaigns targeted at near-me intent for a Baneshwor clinic.', tag: 'Healthcare', placeholder: true },
      { title: 'Trekking gear search cleanup', stat: '22% lower cost per click after negative keyword cleanup', description: 'Keyword research and a negative keyword list removed irrelevant clicks eating the budget.', tag: 'Retail and Travel', placeholder: true },
      { title: 'Call tracking for a real estate agency', stat: '140 tracked phone enquiries in one quarter', description: 'Call and form conversion tracking gave a real cost-per-lead number for the first time.', tag: 'Real Estate', placeholder: true },
    ],
    whyUs: {
      lead: 'SEO can take months to show results. Google Ads puts a business in front of people typing exactly what they want to buy, today, but only if the account is structured, tracked and managed properly.',
      points: [
        { title: 'Built around real intent', text: 'Campaigns are structured around what people actually search for locally, including near-me and Google Maps intent, not only broad keywords.' },
        { title: 'Every call and form counted', text: 'Conversion tracking on calls, forms and chats means we know exactly what is working, not guessing from click volume.' },
        { title: 'Weekly refinement, not a launch-and-leave account', text: 'Negative keywords, bids and ad copy are refined weekly so budget stops leaking to irrelevant clicks.' },
      ],
    },
    related: ['meta-ads', 'website-design-development', 'marketing-advertising'],
    seo: {
      title: 'Google Ads Management in Nepal',
      description: 'Google Search, Maps, Display and YouTube ads management in Nepal. Keyword research, tracking and optimisation by NexGen Digital.',
    },
  },

  // ---------------- AI Creative ----------------
  {
    slug: 'ai-video-production',
    name: 'AI Smart Video Production',
    shortName: 'AI Video',
    category: 'ai-creative',
    icon: 'video',
    tagline: 'Reels, ads and promo videos that grab attention, delivered fast.',
    summary:
      'AI-assisted production lets us script, generate, edit and export professional short videos in days instead of weeks. Perfect for reels, product promos, business intros and Meta ads.',
    accentPhrase: 'Good stories grow brands',
    nepaliLine: 'Reels, ads ra promo videos — fast, creative, and ready to post.',
    problem: {
      title: 'Video wins the feed, but production is slow and expensive',
      text: 'Traditional video needs crews, days and big budgets. Most businesses skip it and lose the most engaging format on every platform.',
    },
    benefits: [
      { title: 'Fast turnaround', text: 'Most short videos delivered within 3 to 5 working days.', icon: 'bolt' },
      { title: 'AI + human craft', text: 'AI generates and accelerates. Our editors direct, refine and make it feel like your brand.', icon: 'sparkles' },
      { title: 'Made for each platform', text: 'Vertical for reels and TikTok, square for feed, wide for YouTube and web.', icon: 'grid' },
      { title: 'Voice-over in Nepali or English', text: 'Natural AI or recorded voice-overs, with subtitles.', icon: 'lang' },
    ],
    deliverables: [
      'Script and storyboard',
      'AI-generated scenes, b-roll and motion graphics',
      'Editing, colour, music and sound design',
      'Subtitles and voice-over',
      'Exports for every platform',
      'Two rounds of revisions',
    ],
    process: [
      { title: 'Brief', text: 'Goal, audience, message and references.' },
      { title: 'Script', text: 'Hook, story and call to action written for you to approve.' },
      { title: 'Generate and edit', text: 'Scenes produced, then edited with music, text and branding.' },
      { title: 'Deliver', text: 'Final files in every format you need.' },
    ],
    pricing: [
      { name: 'Reel', price: '4,500', period: 'per video', features: ['Up to 30 seconds', 'Subtitles', '1 revision'] },
      { name: 'Promo', price: '12,000', period: 'per video', highlight: true, features: ['Up to 60 seconds', 'Voice-over', 'Motion graphics', '2 revisions'] },
      { name: 'Monthly Studio', price: '30,000', period: '/month', features: ['8 reels per month', 'Priority delivery', 'Content strategy included'] },
    ],
    faqs: [
      { q: 'Will it look like AI?', a: 'Our editors direct every video so it feels authentic. We also blend in your real photos, products and footage when available.' },
      { q: 'Do you film on location too?', a: 'Yes, within Kathmandu valley for an additional fee. Many clients combine a short shoot with AI-generated scenes.' },
    ],
    examples: [
      { title: 'Four-day festival promo turnaround', stat: '60-second promo delivered in 4 working days', description: 'AI-generated scenes and human editing produced a launch video in a fraction of a traditional shoot timeline.', tag: 'Retail Launch', placeholder: true },
      { title: 'Reel series for a trekking gear brand', stat: '3.2x more engagement per reel than static posts', description: 'Eight AI-assisted reels with Nepali voice-over built a consistent short-form presence.', tag: 'Outdoor and Travel', placeholder: true },
      { title: 'Business intro video for a clinic', stat: 'One video reused across ads, website and WhatsApp', description: 'A single 60-second intro produced once and repurposed across three channels.', tag: 'Healthcare', placeholder: true },
    ],
    whyUs: {
      lead: 'Traditional video needs a crew, a studio day and a budget most businesses cannot spare. AI-assisted production compresses that timeline to days, directed by editors so it never looks like a shortcut.',
      points: [
        { title: 'AI accelerates, humans direct', text: 'Every video is scripted, storyboarded and edited by a person. AI speeds up production, it does not replace judgement about what looks right for a brand.' },
        { title: 'Built for the platform it will run on', text: 'Vertical for reels, square for feed, wide for YouTube, exported and captioned for where it will actually be watched.' },
        { title: 'Days, not weeks', text: 'Most short videos are delivered in three to five working days, so a launch or festival window is never missed.' },
      ],
    },
    videoDemo: {
      scenes: [{ name: 'The Hook' }, { name: 'The Product' }, { name: 'The Proof' }, { name: 'The CTA' }],
      durationSeconds: 18,
    },
    related: ['ai-graphics-design', 'content-creation', 'meta-ads'],
    seo: {
      title: 'AI Video Production in Nepal',
      description: 'AI-assisted video production in Nepal: reels, promo ads, product videos and business intros delivered fast by NexGen Digital.',
    },
  },
  {
    slug: 'ai-graphics-design',
    name: 'AI Graphics Design',
    shortName: 'AI Graphics',
    category: 'ai-creative',
    icon: 'palette',
    tagline: 'Posters, social creatives, banners and brand visuals in record time.',
    summary:
      'Our designers use AI tools to explore more directions faster, then craft the final piece by hand. You get more options, quicker delivery and a consistent brand look.',
    accentPhrase: 'Ideas today, visuals tomorrow',
    problem: {
      title: 'Great design should not take a week',
      text: 'Festival offers, new menus and launch announcements cannot wait. Businesses need professional visuals the same day, without sacrificing quality.',
    },
    benefits: [
      { title: 'Same-week delivery', text: 'Most social creatives delivered within 24 to 48 hours.', icon: 'bolt' },
      { title: 'More concepts to choose from', text: 'AI exploration means you see several directions, not one.', icon: 'grid' },
      { title: 'Brand consistency', text: 'A design system for your brand so every piece matches.', icon: 'palette' },
      { title: 'Print and digital', text: 'Social posts, banners, flex prints, menus, brochures and packaging.', icon: 'image' },
    ],
    deliverables: [
      'Social media creatives and ad banners',
      'Posters, flex and print designs',
      'Logo refresh and brand identity kits',
      'Menus, brochures and business cards',
      'Product mock-ups and visuals',
      'Editable source files',
    ],
    process: [
      { title: 'Brief', text: 'What, for whom, where it will be used.' },
      { title: 'Explore', text: 'AI-assisted concepts in several directions.' },
      { title: 'Craft', text: 'Designers refine the chosen direction by hand.' },
      { title: 'Deliver', text: 'Final files in every size you need.' },
    ],
    pricing: [
      { name: 'Single', price: '1,500', period: 'per creative', features: ['1 design', '2 sizes', '1 revision'] },
      { name: 'Pack of 10', price: '12,000', period: 'one-time', highlight: true, features: ['10 creatives', 'All sizes', '2 revisions each'] },
      { name: 'Brand Kit', price: '25,000', period: 'one-time', features: ['Logo refresh', 'Colour and type system', 'Templates for social', 'Business card and letterhead'] },
    ],
    faqs: [
      { q: 'Do you design logos?', a: 'Yes. Full brand identity kits and logo refreshes are part of our Brand Kit package.' },
      { q: 'Can I get editable files?', a: 'Yes. Source files are delivered for Brand Kit and Pack customers, and on request for single designs.' },
    ],
    examples: [
      { title: 'Same-day festival offer creative', stat: 'Delivered in under 24 hours during peak Dashain demand', description: 'A last-minute festival offer poster designed and exported for social and print in one day.', tag: 'Seasonal Offer', placeholder: true },
      { title: 'Brand kit for a cafe chain', stat: '12-piece brand system rolled out across 3 outlet locations', description: 'One consistent colour, type and template system replaced mismatched menus and signage.', tag: 'Brand Identity', placeholder: true },
      { title: 'Menu redesign for a restaurant', stat: 'Print and digital menu finished in 2 revisions', description: 'AI-assisted concept exploration gave the owner five directions to choose from before final design.', tag: 'Print and Menu Design', placeholder: true },
    ],
    whyUs: {
      lead: 'Festival offers and launch announcements cannot wait a week for design. AI-assisted concepting means more directions to choose from, finished by hand, without slowing delivery down.',
      points: [
        { title: 'More directions, same timeline', text: 'AI exploration means several concepts to choose from, instead of a single first idea from one designer.' },
        { title: 'A system, not a one-off design', text: 'Every piece is built against a brand kit, colour, type and templates, so nothing looks like it came from a different designer each time.' },
        { title: 'Same-week delivery when it matters', text: 'Most social creatives are ready in 24 to 48 hours, built for the pace Nepali festivals and promotions actually move at.' },
      ],
    },
    beforeAfter: {
      beforeCaption: '☕ New menu items available now! Come check it out guys, link in bio thanks',
      afterCaption: "The valley's best cold brew, brewed slow for 18 hours.",
      afterTag: 'NEW · WINTER MENU',
    },
    related: ['ai-video-production', 'content-creation', 'website-design-development'],
    seo: {
      title: 'AI Graphics Design in Nepal',
      description: 'Fast, professional graphic design in Nepal powered by AI tools and finished by designers: social creatives, posters, brand kits and print.',
    },
  },

  // ---------------- Web ----------------
  {
    slug: 'website-design-development',
    name: 'Website Design & Development',
    shortName: 'Websites',
    category: 'web',
    icon: 'code',
    tagline: 'Fast, beautiful websites that turn visitors into enquiries.',
    summary:
      'From a one-page business site to an e-commerce store, we design and build websites that load fast, look premium and are built to be found on Google.',
    accentPhrase: 'Your brand, online, properly',
    problem: {
      title: 'Customers check online first, then they buy',
      text: 'A slow, outdated or missing website costs trust. Your site should answer questions, show your work and make it easy to contact you in one tap.',
    },
    benefits: [
      { title: 'Designed for conversion', text: 'Clear structure, strong calls to action, WhatsApp and call buttons where they matter.', icon: 'target' },
      { title: 'Blazing fast', text: 'Modern static-first builds that score high on Google PageSpeed.', icon: 'bolt' },
      { title: 'SEO-ready', text: 'Clean structure, metadata and local SEO for Nepal from day one.', icon: 'search' },
      { title: 'Easy to update', text: 'Simple content editing so you are never stuck waiting for a developer.', icon: 'gear' },
    ],
    deliverables: [
      'Discovery and sitemap',
      'Custom UI design in your brand',
      'Responsive development',
      'Contact, WhatsApp and lead forms',
      'On-page SEO and analytics setup',
      'Hosting and domain guidance',
      '30 days post-launch support',
    ],
    process: [
      { title: 'Discover', text: 'Goals, pages, content and references.' },
      { title: 'Design', text: 'Wireframes and visual design, approved by you.' },
      { title: 'Build', text: 'Development, content entry and testing on all devices.' },
      { title: 'Launch', text: 'Deployment, analytics, and hand-over training.' },
    ],
    pricing: [
      { name: 'Landing', price: '35,000', period: 'one-time', features: ['1 page', 'Custom design', 'Contact + WhatsApp', 'Basic SEO'] },
      { name: 'Business', price: '75,000', period: 'one-time', highlight: true, features: ['Up to 8 pages', 'Custom design', 'Blog or news section', 'Analytics + SEO', '30 days support'] },
      { name: 'E-commerce', price: '1,50,000+', period: 'one-time', features: ['Product catalogue', 'Payments (eSewa, Khalti, cards)', 'Order management', 'Training'] },
    ],
    faqs: [
      { q: 'Do you provide hosting and domain?', a: 'We guide you to register the domain and hosting in your own name and set everything up. You own it all.' },
      { q: 'How long does it take?', a: 'Landing pages take 1 to 2 weeks. Business sites 3 to 5 weeks. E-commerce 6 to 10 weeks depending on catalogue size.' },
      { q: 'Can you redesign my existing site?', a: 'Yes. We can redesign on top of your existing content or migrate to a new platform.' },
    ],
    examples: [
      { title: 'Resort booking site rebuild', stat: '2x more WhatsApp booking clicks after launch', description: 'A slow, outdated resort site rebuilt fast and static-first with a prominent WhatsApp button.', tag: 'Hospitality', placeholder: true },
      { title: 'Local SEO foundation for a clinic', stat: 'Page load under 1.5 seconds on 4G', description: 'A static-first build and clean metadata gave a real PageSpeed and local search foundation.', tag: 'Healthcare', placeholder: true },
      { title: 'E-commerce catalogue launch', stat: '120 products live with eSewa and Khalti at launch', description: 'A full product catalogue and Nepali payment options shipped in one coordinated build.', tag: 'E-commerce', placeholder: true },
    ],
    whyUs: {
      lead: 'A slow or outdated website costs trust before a customer ever calls. We build static-first sites that load fast, rank cleanly and make it effortless to get in touch.',
      points: [
        { title: 'Built to convert, not only to look good', text: 'Every page is structured around a clear next step, a call, a WhatsApp message or a form, not just a portfolio of screens.' },
        { title: 'Fast by default', text: 'Modern static-first builds that score well on Google PageSpeed, which matters more on the mobile networks most visitors use in Nepal.' },
        { title: 'You own everything', text: 'Domain and hosting registered in your name, with training so you are never stuck waiting on a developer for a small text change.' },
      ],
    },
    related: ['google-ads', 'ai-graphics-design', 'marketing-advertising'],
    seo: {
      title: 'Website Design & Development in Kathmandu, Nepal',
      description: 'Website design and development in Nepal. Fast, SEO-ready, conversion-focused websites and e-commerce stores by NexGen Digital.',
    },
  },

  // ---------------- Local business ----------------
  {
    slug: 'ai-smart-reviews-qr',
    name: 'AI Smart Reviews Business QR Stand',
    shortName: 'AI Smart Reviews QR',
    category: 'local',
    icon: 'qr',
    href: '/products/ai-smart-reviews-qr',
    tagline: 'One scan. Google reviews, followers, payments and contact.',
    summary:
      'A premium counter stand with a smart QR code. Customers scan, tap and leave a Google review, follow your socials, pay, or contact you. Reviews build stronger businesses.',
    accentPhrase: 'One QR, more possibilities',
    nepaliLine: 'ग्राहकले scan गर्छन्, review दिन्छन्।',
    problem: {
      title: 'Happy customers rarely leave reviews on their own',
      text: 'They mean to, then forget. A stand at the counter with one clear ask makes it effortless, and every review lifts your Google ranking and trust.',
    },
    benefits: [
      { title: 'More Google reviews', text: 'A direct link to your review form, no searching required.', icon: 'star' },
      { title: 'More followers', text: 'Instagram, Facebook and TikTok follow links on the same page.', icon: 'users' },
      { title: 'Easy payments', text: 'Show eSewa, Khalti, bank or Fonepay options in one place.', icon: 'card' },
      { title: 'Smart insights', text: 'See scans and taps in a simple dashboard.', icon: 'chart' },
    ],
    deliverables: ['Branded acrylic counter stand', 'Smart QR landing page', 'Google review link setup', 'Social and payment links', 'Scan analytics'],
    process: [
      { title: 'Order', text: 'Tell us about your business and links.' },
      { title: 'Design', text: 'We brand the stand and landing page.' },
      { title: 'Deliver', text: 'Stand shipped or delivered to your counter.' },
      { title: 'Grow', text: 'Reviews and followers start flowing.' },
    ],
    pricing: [
      { name: 'Stand', price: '4,999', period: 'one-time', features: ['Acrylic stand', 'Smart QR page', 'Google review link', 'Social links'] },
      { name: 'Stand + Care', price: '6,999', period: 'first year', highlight: true, features: ['Everything in Stand', 'Payment links', 'Scan analytics', 'Link updates anytime'] },
    ],
    faqs: [{ q: 'Is this available now?', a: 'The product is in pre-order. Early orders get priority setup and delivery from the first batch.' }],
    examples: [
      { title: 'Counter stand for a cafe', stat: '3.5x more Google reviews in the first month', description: 'A single QR stand at the till made leaving a review a ten-second tap instead of a forgotten intention.', tag: 'Food and Beverage', placeholder: true },
      { title: 'Salon reviews and rebooking', stat: '48 new Google reviews in 6 weeks', description: 'Reviews, social follows and rebooking links combined on one scannable card at reception.', tag: 'Beauty and Wellness', placeholder: true },
    ],
    whyUs: {
      lead: 'Happy customers rarely leave a review without being asked at the right moment. A stand at the counter with one clear scan makes it effortless, and every review lifts ranking and trust.',
      points: [
        { title: 'One scan, several outcomes', text: 'Reviews, social follows, payments and contact live on the same smart page, instead of separate stickers and signs.' },
        { title: 'Built for the counter, not a drawer', text: 'A branded acrylic stand designed to actually stay visible next to the till, not get buried under the register.' },
        { title: 'Simple insights', text: 'Scans and taps tracked in a simple dashboard, so it is clear the stand is actually being used.' },
      ],
    },
    related: ['google-ads', 'social-media-management'],
    seo: {
      title: 'AI Smart Reviews QR Stand for Nepal Businesses',
      description: 'Get more Google reviews and followers with the AI Smart Reviews QR stand. One scan for reviews, socials, payments and contact.',
    },
  },

  // ---------------- Strategy ----------------
  {
    slug: 'marketing-advertising',
    name: 'Marketing & Advertising Strategy',
    shortName: 'Strategy',
    category: 'strategy',
    icon: 'chart',
    tagline: 'A clear growth plan across digital and offline channels.',
    summary:
      'Before spending on any channel, know what to say, to whom, and where. We build practical marketing strategies for Nepali businesses, then help execute them.',
    accentPhrase: 'Plan first, then grow',
    problem: {
      title: 'Activity without direction',
      text: 'Posting, printing flyers, boosting posts, sponsoring events, all without knowing which one is working. A strategy gives every rupee a job.',
    },
    benefits: [
      { title: 'Market and competitor research', text: 'Understand your position and the gaps you can win.', icon: 'search' },
      { title: 'Positioning and messaging', text: 'A clear promise and the words that make customers choose you.', icon: 'megaphone' },
      { title: 'Channel plan and budget', text: 'Where to spend, how much, and what to expect.', icon: 'chart' },
      { title: 'Campaign calendar', text: 'Festivals, launches and seasons mapped for the year.', icon: 'doc' },
    ],
    deliverables: ['Marketing audit', 'Customer personas', 'Positioning and messaging guide', '90-day action plan', 'Budget allocation', 'Quarterly review sessions'],
    process: [
      { title: 'Audit', text: 'What you are doing now and what it is returning.' },
      { title: 'Research', text: 'Customers, competitors and opportunities.' },
      { title: 'Plan', text: 'Strategy, channels, budget and calendar.' },
      { title: 'Execute', text: 'We deliver, or coach your team to.' },
    ],
    pricing: [
      { name: 'Strategy Sprint', price: '25,000', period: 'one-time', features: ['Audit + research', '90-day plan', '1 workshop'] },
      { name: 'Fractional CMO', price: '50,000', period: '/month', highlight: true, features: ['Ongoing strategy', 'Team coordination', 'Monthly reviews', 'Vendor management'] },
    ],
    faqs: [{ q: 'Do you handle offline advertising too?', a: 'Yes. We plan and coordinate print, outdoor, radio and event sponsorships alongside digital, and design the creatives.' }],
    examples: [
      { title: '90-day plan for a multi-branch salon', stat: 'One plan replaced five uncoordinated vendors', description: 'A single channel plan and budget allocation across social, ads and offline for a growing chain.', tag: 'Growth Planning', placeholder: true },
      { title: 'Positioning reset for a new cafe brand', stat: 'Messaging tested across 3 audience segments before launch', description: 'Clarified who the cafe was actually for before a rupee was spent on ads.', tag: 'Positioning', placeholder: true },
      { title: 'A year of campaigns mapped for a retailer', stat: 'Every festival and sale planned a full year ahead', description: 'Dashain, Tihar and New Year campaigns planned months in advance instead of assembled at the last minute.', tag: 'Campaign Planning', placeholder: true },
    ],
    whyUs: {
      lead: 'Posting, boosting and printing flyers without a plan means nobody can tell you what is actually working. A strategy gives every rupee a job before it is spent.',
      points: [
        { title: 'Research before recommendations', text: 'Positioning and channel plans are built on a real audit of the market and competitors, not assumptions.' },
        { title: 'A plan your team can run, or we can', text: 'The 90-day plan is detailed enough to hand to your own team, or we can deliver it end to end.' },
        { title: 'One partner across every channel', text: 'Digital and offline, print, radio, events, coordinated by one strategist instead of several vendors pulling in different directions.' },
      ],
    },
    related: ['social-media-marketing', 'google-ads', 'custom-solutions'],
    seo: {
      title: 'Marketing Strategy Consulting in Nepal',
      description: 'Marketing and advertising strategy for Nepali businesses. Research, positioning, channel planning and execution by NexGen Digital.',
    },
  },
  {
    slug: 'custom-solutions',
    name: 'Custom Digital Solutions',
    shortName: 'Custom',
    category: 'strategy',
    icon: 'dots',
    tagline: 'Something specific in mind? Let’s build it.',
    summary:
      'Chatbots, WhatsApp automation, QR menus, booking systems, email campaigns, event promotion, creator management. If it grows your business online, talk to us.',
    accentPhrase: 'And more',
    problem: {
      title: 'Every business is different',
      text: 'Standard packages do not fit everyone. A hotel, a school, a clothing brand and a creator need different things. We scope custom work around your exact goal.',
    },
    benefits: [
      { title: 'WhatsApp and chat automation', text: 'Auto-replies, catalogues and lead capture on WhatsApp Business.', icon: 'whatsapp' },
      { title: 'Email and SMS campaigns', text: 'Reach existing customers with offers and news.', icon: 'mail' },
      { title: 'QR menus and digital cards', text: 'Contactless menus, digital business cards and link pages.', icon: 'qr' },
      { title: 'Creator and event marketing', text: 'Influencer campaigns and event promotion end to end.', icon: 'users' },
    ],
    deliverables: ['Scoping call and proposal', 'Custom build or campaign', 'Training and hand-over', 'Ongoing support options'],
    process: [
      { title: 'Talk', text: 'Tell us the goal.' },
      { title: 'Scope', text: 'We propose an approach, timeline and price.' },
      { title: 'Build', text: 'Delivered in milestones with your feedback.' },
      { title: 'Support', text: 'We stay available after launch.' },
    ],
    pricing: [{ name: 'Custom', price: 'Quote', features: ['Scoped to your goal', 'Fixed price or retainer', 'Clear milestones'] }],
    faqs: [{ q: 'How do I start?', a: 'Message us on WhatsApp or use the contact form with a short description. We reply within one business day.' }],
    examples: [
      { title: 'WhatsApp catalogue automation for a boutique', stat: 'Auto-replies handled 70% of routine questions', description: 'A WhatsApp Business catalogue and auto-reply flow freed up staff time during peak hours.', tag: 'WhatsApp Automation', placeholder: true },
      { title: 'QR menu system for a restaurant chain', stat: 'Contactless menus live across 4 locations in one week', description: 'One QR menu system replaced reprinting paper menus every time a price changed.', tag: 'QR and Digital Menus', placeholder: true },
      { title: 'Event promotion for a creator meetup', stat: '600+ RSVPs driven through one coordinated campaign', description: 'Email, social and creator outreach coordinated around a single event date.', tag: 'Event Marketing', placeholder: true },
    ],
    whyUs: {
      lead: 'Standard packages do not fit every business. A hotel, a school and a clothing brand each need something different, so the exact build is scoped around the goal instead of forced into a template.',
      points: [
        { title: 'Scoped to the actual problem', text: 'A short call and a written proposal before anything is built, so the approach, timeline and price are clear up front.' },
        { title: 'Delivered in milestones', text: 'Custom builds ship in stages with feedback along the way, not as one big reveal at the end.' },
        { title: 'Support after launch', text: 'We stay available once it is live, automations, menus and campaigns need small adjustments as a business changes.' },
      ],
    },
    related: ['marketing-advertising', 'website-design-development'],
    seo: {
      title: 'Custom Digital Solutions in Nepal',
      description: 'Custom digital marketing and automation solutions for Nepali businesses: WhatsApp automation, QR menus, email campaigns, creator and event marketing.',
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesByCategory = (id: Category['id']) => services.filter((s) => s.category === id);
export const serviceHref = (s: Service) => s.href ?? `/services/${s.slug}`;
/** Services shown as pages under /services (excludes product pages). */
export const servicePages = services.filter((s) => !s.href);

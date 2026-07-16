export type CampaignTile = {
  name: string;
  views: string;
  color: string;
  icon: "ticket" | "mic" | "console" | "play" | "chip" | "bag";
};

export const siteConfig = {
  name: "ClipWave",
  calLink: "zack-woods-si9bra/30min",
  bookingDuration: "30 min",
} as const;

export const navigation = [
  { label: "About", href: "#top", dropdown: false },
  { label: "Work With Us", href: "#work-with", dropdown: true },
  { label: "Case Studies", href: "#reviews", dropdown: true },
  { label: "Compare", href: "#compare", dropdown: true },
  { label: "Resources", href: "#blog", dropdown: true },
  { label: "Contact", href: "#faq", dropdown: true },
] as const;

export const campaignTiles: CampaignTile[] = [
  { name: "Indie Artist", views: "12M+ views", color: "mq-red", icon: "ticket" },
  { name: "Pop Star", views: "2B+ views", color: "mq-slate", icon: "mic" },
  { name: "Sports League", views: "8M+ views", color: "mq-blue", icon: "console" },
  { name: "AI Startup", views: "59M+ views", color: "mq-red", icon: "console" },
  { name: "Reality Star", views: "17M+ views", color: "mq-purple", icon: "play" },
  { name: "Public Figure", views: "6M+ views", color: "mq-slate", icon: "play" },
  { name: "Gaming Brand", views: "53M+ views", color: "mq-green", icon: "chip" },
  { name: "DTC Product", views: "3M+ views", color: "mq-sand", icon: "bag" },
  { name: "Podcast", views: "4M+ views", color: "mq-green", icon: "bag" },
];

export const reviews = [
  { quote: "Payouts landed on time, every time. Easily the most organized program I have clipped for.", name: "Marcus" },
  { quote: "The briefs are actually clear. You know exactly what counts before you post.", name: "Big T" },
  { quote: "They are the best for clipping ✨", name: "Sumit" },
  { quote: "the BEST community", name: "Zziiroo" },
  { quote: "this is the best clipping program of all time", name: "Ellijah" },
  { quote: "It is the best community ❤️", name: "John" },
  { quote: "they are the best! and the mods are super approachable and helpful with any questions", name: "Kimmy" },
  { quote: "A campaign that genuinely pays for effort. My best month yet came from one brief.", name: "Dana" },
  { quote: "Great place to sharpen your editing, learn what performs, and get paid doing it.", name: "Ravi" },
] as const;

export const guideTabs = [
  {
    label: "Campaign model",
    eyebrow: "▦ How our clipping campaigns work",
    content:
      "A clipping agency should do more than cut clips — the real job is distribution. We turn your source content, from long-form footage and podcasts to interviews and live moments, into a campaign brief with clear guidelines. Our clipper network then creates and posts vertical edits from their own accounts across TikTok, Reels, and Shorts.",
  },
  {
    label: "Why volume wins",
    eyebrow: "▦ Why volume wins",
    content:
      "One great clip can pop; hundreds of good clips posted consistently will compound. Volume gives the algorithm more chances to find your audience, and it keeps your brand present across every feed that matters, every single day.",
  },
  {
    label: "Quality and reporting",
    eyebrow: "▦ Quality and reporting",
    content:
      "Every submission is manually reviewed against your campaign guidelines before it counts. Views are verified, filtered, and rolled into one live report — so the number you see is the number you actually got.",
  },
] as const;

export const faqs = [
  {
    question: "What is ClipWave?",
    answer:
      "A managed clipping agency. We turn your source content into short-form distribution at scale through a vetted network of clippers, with strategy, quality review, and verified reporting handled for you.",
  },
  {
    question: "What does a clipping agency do?",
    answer:
      "We build your campaign strategy and content guidelines, our clipper network creates and posts edits from their own accounts across TikTok, Reels, and Shorts, every submission is reviewed against the brief, and you track posted videos and views in one report.",
  },
  {
    question: "How does the process work?",
    answer:
      "Book a call, share your goals and source content, and we map the plan. We brief the network, review every submission, and report verified performance while the campaign scales.",
  },
  {
    question: "How quickly can I launch a campaign?",
    answer: "Most campaigns are live within 1–2 days of the intro call, assuming source content is ready.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Creators, artists, startups, large brands, podcasts, gaming teams, and businesses planning managed short-form distribution. Best fit is teams with a $15k+ launch budget.",
  },
  {
    question: "What does it cost to start?",
    answer:
      "Managed campaigns currently fit $15k+ budgets best. Larger brand scopes and agency partnerships are priced separately — if you're not sure the investment fits your stage, email us first and we'll point you in the right direction.",
  },
] as const;

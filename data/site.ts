import clipsGenerated from "./clips.generated.json";

export type LeadClassification = "qualified" | "manual_review";

export type CampaignGoal =
  | "awareness"
  | "launch"
  | "audience_growth"
  | "content_repurposing"
  | "other";

export type BudgetRange =
  | "under_1000"
  | "1000_2499"
  | "2500_4999"
  | "5000_plus";

export type SourceReadiness = "ready" | "needs_preparation" | "not_ready";

export type LeadAttribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  landingPage?: string;
  referrer?: string;
};

export type LeadSubmission = {
  name: string;
  email: string;
  company: string;
  sourceContentUrl: string;
  campaignGoal: CampaignGoal;
  budgetRange: BudgetRange;
  sourceReadiness: SourceReadiness;
  notes?: string;
  classification: LeadClassification;
  attribution: LeadAttribution;
  submittedAt: string;
};

export type CampaignCaseStudy = {
  slug: string;
  title: string;
  campaignGoal: string;
  vertical: string;
  durationDays: number;
  approvedClips: number;
  verifiedViews: number;
  platforms: string[];
  budgetBand: string;
  measurementMethodology: string;
  summary: string;
};

export const siteConfig = {
  name: "Second Wind",
  description:
    "Performance-based short-form distribution. We guarantee a verified-view target for your budget at $4 per 1,000 views—and you only pay for the views we deliver.",
  bookingDuration: "30 minutes",
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "zack-woods-si9bra/30min",
  whopUrl: process.env.NEXT_PUBLIC_WHOP_URL ?? "#",
  discordUrl: process.env.NEXT_PUBLIC_DISCORD_URL ?? "#",
} as const;

export const navigation = [
  { label: "Pilot", href: "/#pilot" },
  { label: "Process", href: "/#process" },
  { label: "Clips", href: "/#clips" },
  { label: "Case studies", href: "/case-studies" },
] as const;

// Add only verified, anonymized campaign records. The public pages intentionally
// show process proof until real campaign datasets are supplied.
export const caseStudies: CampaignCaseStudy[] = [];

export type ClipWallItem = {
  id: string;
  src: string;
  poster: string;
  handle: string;
  views: string;
  platform: "tiktok" | "yt" | "ig";
  href: string;
};

// Generated from data/clips.links.txt by `npm run clips` — do not hand-edit the
// JSON. Every entry is a real post: the view count is read off the live page and
// the card links back to it. An empty manifest hides the section rather than
// showing invented numbers.
export const clipWall = clipsGenerated as ClipWallItem[];

export const processProof = [
  {
    title: "A written campaign brief",
    body: "Goals, source boundaries, editing direction, posting requirements, and approval criteria are documented before work begins.",
  },
  {
    title: "Review before approval",
    body: "A clip counts toward the pilot only after it meets the agreed brief and its posted URL is recorded.",
  },
  {
    title: "A delivery record",
    body: "You receive a campaign-level record of approved posts, public platform counts, the closing measurement, and verified views delivered against your target.",
  },
] as const;

export const faqs = [
  {
    question: "What is included in a campaign?",
    answer:
      "Source review, campaign launch, a written brief, clipper coordination, flexible approved post volume, and public view tracking. The campaign keeps running toward the verified-view target your budget buys.",
  },
  {
    question: "Do you guarantee views?",
    answer:
      "We agree a verified-view target for your budget before launch and run the campaign toward it. You are invoiced only for the valid verified views actually delivered, so if we miss the target you are not billed for what did not land.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Campaigns are priced at $4 per 1,000 valid verified views, with a $1,000 minimum budget—250,000 views at that minimum. It is a rate, not a fixed package: a larger budget buys proportionally more views at the same $4 per 1,000, with no cap.",
  },
  {
    question: "How are verified views counted?",
    answer:
      "We sum native public view counters on approved, recorded campaign posts when the campaign closes. Removed, private, duplicate, paid or promoted, fraudulent, and otherwise invalid views or posts do not count.",
  },
  {
    question: "What source content works best?",
    answer:
      "Podcasts, interviews, streams, webinars, product demos, and other footage with clear moments and enough usable material for multiple vertical edits.",
  },
  {
    question: "Can I apply as a clipper?",
    answer:
      "Yes. Visit the separate For Clippers page to join the Second Wind community through Whop or Discord.",
  },
] as const;

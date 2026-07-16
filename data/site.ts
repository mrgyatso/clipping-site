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
export type LaunchWindow = "within_30_days" | "one_to_three_months" | "later";

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
  launchWindow: LaunchWindow;
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
  name: "ClipWave",
  description:
    "Managed short-form clipping campaigns for brands with source content ready to distribute.",
  bookingDuration: "30 minutes",
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "zack-woods-si9bra/30min",
} as const;

export const navigation = [
  { label: "Pilot", href: "/#pilot" },
  { label: "Process", href: "/#process" },
  { label: "Case studies", href: "/case-studies" },
  { label: "For clippers", href: "/for-clippers" },
] as const;

// Add only verified, anonymized campaign records. The public pages intentionally
// show process proof until real campaign datasets are supplied.
export const caseStudies: CampaignCaseStudy[] = [];

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
    body: "You receive a campaign-level record of approved clips, post links, platforms, dates, and available view data.",
  },
] as const;

export const faqs = [
  {
    question: "What is included in the pilot?",
    answer:
      "Campaign setup, a written brief, clipper coordination, review, and 20 approved clips posted over 21 days. You also receive a delivery record with post links and available platform metrics.",
  },
  {
    question: "Do you guarantee views?",
    answer:
      "No. Performance depends on the source content, audience, platform, timing, and creative response. We guarantee only the operational deliverables defined in the final scope.",
  },
  {
    question: "Why does the pilot start at $1,000?",
    answer:
      "Source length, editing complexity, rights, brand constraints, and posting requirements affect the work involved. We review your source content before confirming final scope and price.",
  },
  {
    question: "What source content works best?",
    answer:
      "Podcasts, interviews, streams, webinars, product demos, and other footage with clear moments and enough usable material for multiple vertical edits.",
  },
  {
    question: "What if I am not ready to launch within 30 days?",
    answer:
      "Your submission goes to manual review. We will assess fit and respond by email rather than opening the scheduling calendar immediately.",
  },
  {
    question: "Can I apply as a clipper?",
    answer:
      "Yes. The creator opportunity, expectations, FAQs, and interest form are on the separate For Clippers page.",
  },
] as const;

export const clipperTestimonials = [
  {
    quote:
      "Payouts landed on time, every time. Easily the most organized program I have clipped for.",
    name: "Marcus",
  },
  {
    quote: "The briefs are clear. You know what counts before you post.",
    name: "Big T",
  },
  {
    quote:
      "The moderators are approachable and helpful whenever a brief needs clarification.",
    name: "Kimmy",
  },
] as const;

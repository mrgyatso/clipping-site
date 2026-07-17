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
  name: "ClipWave",
  description:
    "A $1,000 distribution campaign that runs until approved posts reach 250,000 verified views.",
  bookingDuration: "30 minutes",
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "zack-woods-si9bra/30min",
  whopUrl: process.env.NEXT_PUBLIC_WHOP_URL ?? "#",
  discordUrl: process.env.NEXT_PUBLIC_DISCORD_URL ?? "#",
} as const;

export const navigation = [
  { label: "Pilot", href: "/#pilot" },
  { label: "Process", href: "/#process" },
  { label: "Case studies", href: "/case-studies" },
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
    body: "You receive a campaign-level record of approved posts, public platform counts, the closing measurement, and verified views toward 250K.",
  },
] as const;

export const faqs = [
  {
    question: "What is included in the pilot?",
    answer:
      "Source review, campaign launch, a written brief, clipper coordination, flexible approved post volume, and public view tracking. The campaign continues until approved posts reach 250,000 valid verified views unless it ends early under the signed terms.",
  },
  {
    question: "Do you guarantee views?",
    answer:
      "For an accepted campaign, the target is 250,000 valid verified views. You pay $250 to launch and the $750 completion balance when the target is reached. If the campaign ends early under the signed terms, only that $750 balance is prorated to valid views delivered.",
  },
  {
    question: "How does the $1,000 campaign price work?",
    answer:
      "$250 is paid before launch for source review, briefing, routing, and campaign management. The remaining $750 is due when approved campaign posts reach 250,000 valid verified views. Total charges are capped at $1,000.",
  },
  {
    question: "How are verified views counted?",
    answer:
      "We sum native public view counters on approved, recorded campaign posts when the campaign reaches 250K or ends early. Removed, private, duplicate, paid or promoted, fraudulent, and otherwise invalid views or posts do not count.",
  },
  {
    question: "What source content works best?",
    answer:
      "Podcasts, interviews, streams, webinars, product demos, and other footage with clear moments and enough usable material for multiple vertical edits.",
  },
  {
    question: "Can I apply as a clipper?",
    answer:
      "Yes. Visit the separate For Clippers page to join the ClipWave community through Whop or Discord.",
  },
] as const;

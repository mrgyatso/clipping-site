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

export type ViewTargetRange =
  | "100k_499k"
  | "500k_999k"
  | "1m_4_9m"
  | "5m_plus";

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
  viewTargetRange: ViewTargetRange;
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
    "Guaranteed-view distribution campaigns for YouTubers and live sellers with content ready to move.",
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
    body: "You receive a campaign-level record of approved posts, public platform counts, cutoff dates, and verified views toward the guarantee.",
  },
] as const;

export const faqs = [
  {
    question: "What is included in the pilot?",
    answer:
      "Campaign setup, a written brief, clipper coordination, review, flexible post volume within the agreed scope, and public view tracking. The campaign runs until its guaranteed verified-view target is reached or 30 days after the first approved post goes live.",
  },
  {
    question: "Do you guarantee views?",
    answer:
      "For eligible campaigns, yes. Your signed proposal defines a verified-view target and itemizes the distribution fee. If approved campaign posts fall short at the day-30 cutoff, the undelivered percentage is refunded from that distribution fee. Setup and strategy fees are nonrefundable.",
  },
  {
    question: "Why does the pilot start at $1,000?",
    answer:
      "The guaranteed view target, source length, editing complexity, rights, brand constraints, and required post volume all affect the work involved. We review your source content before confirming the target, itemized fees, and final price.",
  },
  {
    question: "How are verified views counted?",
    answer:
      "We sum native public view counters on approved, recorded campaign posts at the campaign cutoff. Removed, private, duplicate, paid or promoted, fraudulent, and otherwise invalid views or posts do not count.",
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
      "Yes. Visit the separate For Clippers page to join the ClipWave community through Whop or Discord.",
  },
] as const;

import { NextResponse } from "next/server";
import type {
  BudgetRange,
  CampaignGoal,
  LeadAttribution,
  LeadClassification,
  LeadSubmission,
  SourceReadiness,
} from "@/data/site";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";

const recentSubmissions = new Map<string, number>();
const campaignGoals = new Set<CampaignGoal>([
  "awareness",
  "launch",
  "audience_growth",
  "content_repurposing",
  "other",
]);
const budgetRanges = new Set<BudgetRange>([
  "under_1000",
  "1000_2499",
  "2500_4999",
  "5000_plus",
]);
const sourceReadinessValues = new Set<SourceReadiness>([
  "ready",
  "needs_preparation",
  "not_ready",
]);

function clean(value: unknown, maxLength = 300) {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function validUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function classify(
  budgetRange: BudgetRange,
  sourceReadiness: SourceReadiness,
): LeadClassification {
  return budgetRange !== "under_1000" && sourceReadiness === "ready"
    ? "qualified"
    : "manual_review";
}

function sanitizeAttribution(value: unknown): LeadAttribution {
  const raw =
    typeof value === "object" && value
      ? (value as Record<string, unknown>)
      : {};

  return {
    source: clean(raw.source, 200) || undefined,
    medium: clean(raw.medium, 200) || undefined,
    campaign: clean(raw.campaign, 200) || undefined,
    term: clean(raw.term, 200) || undefined,
    content: clean(raw.content, 200) || undefined,
    landingPage: clean(raw.landingPage, 1000) || undefined,
    referrer: clean(raw.referrer, 1000) || undefined,
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {
        status: "validation_failure",
        message: "Please reload the form and try again.",
      },
      { status: 400 },
    );
  }

  // Return a neutral response for bots rather than exposing spam detection.
  if (clean(body.website)) {
    return NextResponse.json({ status: "manual_review" });
  }

  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < 3_000 || elapsed > 86_400_000) {
    return NextResponse.json(
      {
        status: "validation_failure",
        message: "Please wait a moment, then submit the form again.",
      },
      { status: 400 },
    );
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 180).toLowerCase();
  const company = clean(body.company, 140);
  const sourceContentUrl = clean(body.sourceContentUrl, 1000);
  const campaignGoal = clean(body.campaignGoal) as CampaignGoal;
  const budgetRange = clean(body.budgetRange) as BudgetRange;
  const sourceReadiness = clean(body.sourceReadiness) as SourceReadiness;
  const notes = clean(body.notes, 3000);

  const invalid =
    !name ||
    !company ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !validUrl(sourceContentUrl) ||
    !campaignGoals.has(campaignGoal) ||
    !budgetRanges.has(budgetRange) ||
    !sourceReadinessValues.has(sourceReadiness);

  if (invalid) {
    return NextResponse.json(
      {
        status: "validation_failure",
        message:
          "Complete every required field with a valid email and source-content URL.",
      },
      { status: 400 },
    );
  }

  const fingerprint = `${email}:${sourceContentUrl}`;
  const previousSubmission = recentSubmissions.get(fingerprint);
  if (
    previousSubmission &&
    Date.now() - previousSubmission < 15 * 60 * 1000
  ) {
    return NextResponse.json(
      {
        status: "validation_failure",
        message:
          "We already received this request. Please wait before submitting it again.",
      },
      { status: 409 },
    );
  }

  const classification = classify(budgetRange, sourceReadiness);
  const lead: LeadSubmission = {
    name,
    email,
    company,
    sourceContentUrl,
    campaignGoal,
    budgetRange,
    sourceReadiness,
    notes: notes || undefined,
    classification,
    attribution: sanitizeAttribution(body.attribution),
    submittedAt: new Date().toISOString(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Second Wind lead delivery environment is incomplete.");
    return NextResponse.json(
      {
        status: "delivery_failure",
        message:
          "Lead delivery is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  let deliveryResponse: Response;
  try {
    deliveryResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[${classification === "qualified" ? "Qualified" : "Manual review"}] ${company} — Second Wind campaign fit`,
        text: [
          `Classification: ${classification}`,
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company}`,
          `Source content: ${sourceContentUrl}`,
          `Goal: ${campaignGoal}`,
          `Budget: ${budgetRange}`,
          "Offer: $4 per 1,000 verified views, $1,000 minimum",
          `Source readiness: ${sourceReadiness}`,
          `Notes: ${notes || "—"}`,
          `Attribution: ${JSON.stringify(lead.attribution)}`,
          `Submitted: ${lead.submittedAt}`,
        ].join("\n"),
      }),
    });
  } catch (error) {
    console.error("Resend request failed.", error);
    return NextResponse.json(
      {
        status: "delivery_failure",
        message: "We could not deliver your request. Please try again.",
      },
      { status: 502 },
    );
  }

  if (!deliveryResponse.ok) {
    console.error("Resend rejected lead delivery.", deliveryResponse.status);
    return NextResponse.json(
      {
        status: "delivery_failure",
        message: "We could not deliver your request. Please try again.",
      },
      { status: 502 },
    );
  }

  recentSubmissions.set(fingerprint, Date.now());

  if (classification === "qualified") {
    const params = new URLSearchParams({
      name,
      email,
      company,
      campaign_offer: "250k_verified_views",
      utm_source: lead.attribution.source ?? "",
      utm_medium: lead.attribution.medium ?? "",
      utm_campaign: lead.attribution.campaign ?? "",
    });
    return NextResponse.json({
      status: "qualified",
      calendarUrl: `https://cal.com/${siteConfig.calLink}?${params.toString()}`,
    });
  }

  return NextResponse.json({ status: "manual_review" });
}

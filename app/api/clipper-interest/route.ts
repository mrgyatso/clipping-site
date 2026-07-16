import { NextResponse } from "next/server";

export const runtime = "nodejs";

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

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ status: "validation_failure" }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ status: "received" });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 180).toLowerCase();
  const portfolio = clean(body.portfolio, 1000);
  const elapsed = Date.now() - Number(body.startedAt);
  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !validUrl(portfolio) ||
    !Number.isFinite(elapsed) ||
    elapsed < 2_000
  ) {
    return NextResponse.json({ status: "validation_failure" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ status: "delivery_failure" }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Clipper interest] ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPortfolio: ${portfolio}`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ status: "delivery_failure" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ status: "delivery_failure" }, { status: 502 });
  }

  return NextResponse.json({ status: "received" });
}

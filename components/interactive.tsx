"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    Cal?: CalApi & { ns?: Record<string, CalApi> };
  }
}

type CalApi = {
  (...args: unknown[]): void;
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, CalApi>;
};

export function trackEvent(name: string, parameters: Record<string, unknown> = {}) {
  window.gtag?.("event", name, parameters);
}

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag("js",new Date());gtag("config","${gaId}",{anonymize_ip:true});`}
      </Script>
    </>
  );
}

export function TrackedLink({
  href,
  event,
  className,
  children,
}: {
  href: string;
  event: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => trackEvent(event, { href })}
    >
      {children}
    </a>
  );
}

export function RevealManager() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

type LeadResult =
  | { status: "qualified"; calendarUrl: string }
  | { status: "manual_review" }
  | { status: "validation_failure"; message: string }
  | { status: "delivery_failure"; message: string };

const initialFields = {
  name: "",
  email: "",
  company: "",
  sourceContentUrl: "",
  campaignGoal: "",
  budgetRange: "",
  sourceReadiness: "",
  launchWindow: "",
  notes: "",
  website: "",
};

export function LeadForm() {
  const [fields, setFields] = useState(initialFields);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  function update(name: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    if (!started) {
      setStarted(true);
      setStartedAt(Date.now());
      trackEvent("lead_form_start");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);

    const search = new URLSearchParams(window.location.search);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          startedAt,
          attribution: {
            source: search.get("utm_source") || undefined,
            medium: search.get("utm_medium") || undefined,
            campaign: search.get("utm_campaign") || undefined,
            term: search.get("utm_term") || undefined,
            content: search.get("utm_content") || undefined,
            landingPage: window.location.href,
            referrer: document.referrer || undefined,
          },
        }),
      });
      const data = (await response.json()) as LeadResult;
      setResult(data);
      trackEvent("lead_submission", { result: data.status });

      if (data.status === "qualified") {
        trackEvent("lead_qualified");
        trackEvent("calendar_reveal");
      } else if (data.status === "manual_review") {
        trackEvent("lead_manual_review");
      }
    } catch {
      setResult({
        status: "delivery_failure",
        message:
          "We could not send your request. Check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.status === "qualified") {
    return (
      <div
        className="form-result qualified"
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <span className="kicker">Campaign fit confirmed</span>
        <h3>Choose a time to review your source content.</h3>
        <p>
          Before the call, have your source-content link, primary goal, brand
          guidelines, and ideal launch date ready.
        </p>
        <CalEmbed calendarUrl={result.calendarUrl} />
      </div>
    );
  }

  if (result?.status === "manual_review") {
    return (
      <div
        className="form-result"
        ref={resultRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <span className="kicker">Submitted for manual review</span>
        <h3>Thanks — we’ll review the details first.</h3>
        <p>
          Your timing, budget, or content readiness needs a closer look. We’ll
          follow up by email; the calendar stays closed until fit is confirmed.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <FormField
          label="Name"
          name="name"
          value={fields.name}
          update={update}
          autoComplete="name"
        />
        <FormField
          label="Work email"
          name="email"
          type="email"
          value={fields.email}
          update={update}
          autoComplete="email"
        />
        <FormField
          label="Company or brand"
          name="company"
          value={fields.company}
          update={update}
          autoComplete="organization"
        />
        <FormField
          label="Source-content URL"
          name="sourceContentUrl"
          type="url"
          value={fields.sourceContentUrl}
          update={update}
          placeholder="https://"
        />
        <SelectField
          label="Campaign goal"
          name="campaignGoal"
          value={fields.campaignGoal}
          update={update}
          options={[
            ["awareness", "Brand awareness"],
            ["launch", "Launch or release"],
            ["audience_growth", "Audience growth"],
            ["content_repurposing", "Content repurposing"],
            ["other", "Other"],
          ]}
        />
        <SelectField
          label="Campaign budget"
          name="budgetRange"
          value={fields.budgetRange}
          update={update}
          options={[
            ["under_1000", "Under $1,000"],
            ["1000_2499", "$1,000–$2,499"],
            ["2500_4999", "$2,500–$4,999"],
            ["5000_plus", "$5,000+"],
          ]}
        />
        <SelectField
          label="Source-content readiness"
          name="sourceReadiness"
          value={fields.sourceReadiness}
          update={update}
          options={[
            ["ready", "Ready to share"],
            ["needs_preparation", "Needs light preparation"],
            ["not_ready", "Not ready yet"],
          ]}
        />
        <SelectField
          label="Target launch window"
          name="launchWindow"
          value={fields.launchWindow}
          update={update}
          options={[
            ["within_30_days", "Within 30 days"],
            ["one_to_three_months", "1–3 months"],
            ["later", "Later / exploring"],
          ]}
        />
      </div>

      <label className="field full">
        <span>
          Anything else we should know? <em>Optional</em>
        </span>
        <textarea
          name="notes"
          rows={4}
          value={fields.notes}
          onChange={(event) => update("notes", event.target.value)}
        />
      </label>

      <label className="honeypot" aria-hidden="true">
        Website
        <input
          name="website"
          value={fields.website}
          onChange={(event) => update("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      {result && "message" in result && (
        <div
          className="form-error"
          ref={resultRef}
          tabIndex={-1}
          role="alert"
        >
          {result.message}
        </div>
      )}

      <div className="form-actions">
        <button className="button primary" disabled={submitting} type="submit">
          {submitting ? "Checking fit…" : "Check campaign fit"}
          <span aria-hidden="true">↗</span>
        </button>
        <span className="form-actions-or" aria-hidden="true">
          or
        </span>
        <a
          className="button book-direct"
          href={`https://cal.com/${siteConfig.calLink}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("direct_booking_click", { location: "lead_form" })}
        >
          <span className="booking-mark" aria-hidden="true">
            <svg viewBox="0 0 34 34">
              <path className="booking-mark-page" d="M7.5 9.5h19v17h-19z" />
              <path className="booking-mark-ring" d="M12 6.5v6M22 6.5v6M7.5 14h19" />
              <path className="booking-mark-wave" d="M11 21c2.2-3 4.1 3 6.2 0s4.1 3 6.3 0" />
              <circle cx="26.5" cy="8" r="4.25" />
              <path className="booking-mark-arrow" d="M24.5 8h4M27 6.5 28.5 8 27 9.5" />
            </svg>
          </span>
          <span>
            <small>Skip the form</small>
            Book a call instead
          </span>
        </a>
      </div>
      <p className="form-note">
        Submitting does not commit you to a campaign. We use your details only
        to assess fit and respond. Direct booking opens Cal.com in a new tab.
      </p>
    </form>
  );
}

function FormField({
  label,
  name,
  value,
  update,
  type = "text",
  ...props
}: {
  label: string;
  name: keyof typeof initialFields;
  value: string;
  update: (name: keyof typeof initialFields, value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        required
        name={name}
        type={type}
        value={value}
        onChange={(event) => update(name, event.target.value)}
        {...props}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  update,
  options,
}: {
  label: string;
  name: keyof typeof initialFields;
  value: string;
  update: (name: keyof typeof initialFields, value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select
        required
        name={name}
        value={value}
        onChange={(event) => update(name, event.target.value)}
      >
        <option value="">Select one</option>
        {options.map(([optionValue, optionLabel]) => (
          <option value={optionValue} key={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function CalEmbed({ calendarUrl }: { calendarUrl: string }) {
  useEffect(() => {
    const parsedUrl = new URL(calendarUrl);
    const config = Object.fromEntries(
      [...parsedUrl.searchParams.entries()].filter(([, value]) => value),
    );
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.Cal?.("init", "qualified", { origin: "https://app.cal.com" });
      const qualifiedCal = window.Cal?.ns?.qualified;
      qualifiedCal?.("inline", {
        elementOrSelector: "#qualified-calendar",
        calLink: siteConfig.calLink,
        config: { layout: "month_view", ...config },
      });
      qualifiedCal?.("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        styles: { branding: { brandColor: "#f05a28" } },
      });
      qualifiedCal?.("on", {
        action: "bookingSuccessful",
        callback: () => trackEvent("booking_success"),
      });
    };

    return () => script.remove();
  }, [calendarUrl]);

  return (
    <div className="calendar" id="qualified-calendar">
      <p>
        Loading scheduler… If it does not appear,{" "}
        <a href={calendarUrl}>open Cal.com</a>.
      </p>
    </div>
  );
}

export function ClipperInterestForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [startedAt] = useState(() => Date.now());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/clipper-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          portfolio: form.get("portfolio"),
          website: form.get("website"),
          startedAt,
        }),
      });
      if (!response.ok) throw new Error("delivery failed");
      setState("sent");
      trackEvent("clipper_interest_submission");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="form-result" role="status">
        <span className="kicker">Interest recorded</span>
        <h3>Thanks for raising your hand.</h3>
        <p>
          Your details were delivered for review. Registration is not an offer
          of work; we will follow up if a relevant campaign opens.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form compact-form" onSubmit={submit}>
      <div className="form-grid">
        <label className="field">
          <span>Name</span>
          <input required name="name" autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input required name="email" type="email" autoComplete="email" />
        </label>
        <label className="field full">
          <span>Portfolio or social profile</span>
          <input required name="portfolio" type="url" placeholder="https://" />
        </label>
      </div>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {state === "error" && (
        <div className="form-error" role="alert">
          We could not deliver your interest form. Please try again.
        </div>
      )}
      <button
        className="button primary"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending…" : "Register interest"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

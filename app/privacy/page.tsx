import type { Metadata } from "next";
import { Footer, Header, PageIntro } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "ClipWave privacy notice.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Legal"
          title="Privacy notice"
          description="How ClipWave handles information submitted through this website."
        />
        <article className="content-page">
          <p>Last updated: July 16, 2026.</p>
          <h2>Information we collect</h2>
          <p>
            We collect the contact, company, source-content, campaign, budget,
            desired view-target range, readiness, timing, notes, and attribution
            information you submit.
            Optional analytics may collect standard usage events when a GA4 ID
            is configured.
          </p>
          <h2>How we use it</h2>
          <p>
            We use submitted information to assess campaign fit, deliver the
            inquiry to our sales inbox, respond, schedule qualified calls, and
            understand funnel performance.
          </p>
          <h2>Service providers</h2>
          <p>
            Resend processes inquiry emails, Cal.com provides scheduling for
            qualified leads, and Google Analytics may process usage events when
            enabled.
          </p>
          <h2>Retention and choices</h2>
          <p>
            We retain inquiry records for business follow-up and operational
            needs. To request access, correction, or deletion, use the Contact
            page. Legal obligations may require us to retain limited records.
          </p>
          <h2>Source-content links</h2>
          <p>
            Submit only links you are authorized to share. Do not include
            passwords, private credentials, or sensitive personal information.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

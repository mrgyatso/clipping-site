import type { Metadata } from "next";
import { Footer, Header, PageIntro } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Terms",
  description: "ClipWave website terms.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Legal"
          title="Website terms"
          description="The terms governing use of this website and its campaign-fit process."
        />
        <article className="content-page">
          <p>Last updated: July 16, 2026.</p>
          <h2>Website use</h2>
          <p>
            You may use this website to evaluate ClipWave and submit legitimate
            campaign or creator inquiries. Do not interfere with the site,
            submit unlawful material, or misuse its forms.
          </p>
          <h2>No campaign agreement</h2>
          <p>
            A form submission, qualification result, or scheduled call does not
            create a services agreement. Campaign work begins only under a
            separately accepted scope and commercial terms.
          </p>
          <h2>Pricing and performance</h2>
          <p>
            The pilot starts at $1,000. Final pricing depends on source content
            and scope. ClipWave does not guarantee views, reach, engagement,
            conversions, or other performance outcomes.
          </p>
          <h2>Your content</h2>
          <p>
            You are responsible for having the rights and permissions required
            to share source content and authorize any eventual campaign use.
          </p>
          <h2>Availability</h2>
          <p>
            We may change or discontinue website features and may decline
            inquiries or campaign opportunities at our discretion.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

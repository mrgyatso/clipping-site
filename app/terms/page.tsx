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
          <h2>Campaign pricing</h2>
          <p>
            The pilot starts at $1,000. Final pricing depends on source content
            and scope. Eligible proposals separately itemize nonrefundable
            setup and strategy fees and the distribution fee covered by the
            verified-view guarantee.
          </p>
          <h2>Verified-view guarantee</h2>
          <p>
            A view guarantee applies only when it appears in a signed campaign
            proposal. The campaign begins when its first approved post goes
            live and ends when the agreed target is reached or 30 calendar days
            later, whichever comes first.
          </p>
          <p>
            Verified views are the native public view counts captured at the
            campaign cutoff on approved posts created, published, and recorded
            under the campaign brief. Removed, private, duplicate, paid or
            promoted, fraudulent, and otherwise invalid views or posts do not
            count toward the target.
          </p>
          <h2>Proportional distribution refund</h2>
          <p>
            If an eligible campaign misses its guaranteed target at the day-30
            cutoff, the distribution-fee refund is calculated as: distribution
            fee × undelivered guaranteed views ÷ guaranteed target. Setup and
            strategy fees remain nonrefundable. The signed proposal controls
            eligibility and any exclusions for client-caused takedowns, rights
            issues, source-content changes, or material platform disruptions.
          </p>
          <h2>Post volume and outcomes</h2>
          <p>
            ClipWave may publish as many approved posts as the campaign needs
            within the agreed budget, source-content limits, campaign brief,
            and 30-day window. The guarantee covers only the verified-view
            target; it does not guarantee sales, revenue, followers,
            engagement, conversions, or a specific post becoming viral.
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

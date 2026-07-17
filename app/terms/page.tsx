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
          <p>Last updated: July 17, 2026.</p>
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
            An accepted campaign has a maximum price of $1,000. The client pays
            a nonrefundable $250 launch payment before work begins. The remaining
            $750 becomes due when the campaign reaches 250,000 valid verified
            views, subject to the separately accepted campaign agreement.
          </p>
          <h2>Verified-view guarantee</h2>
          <p>
            The 250,000-view commitment applies only when it appears in an
            accepted campaign agreement. The campaign begins when its first
            approved post goes live and continues without an automatic time
            cutoff until it reaches the target or ends early under that agreement.
          </p>
          <p>
            Verified views are the native public view counts captured at the
            campaign closing measurement on approved posts created, published,
            and recorded under the campaign brief. Removed, private, duplicate, paid or
            promoted, fraudulent, and otherwise invalid views or posts do not
            count toward the target.
          </p>
          <h2>Early termination</h2>
          <p>
            A client may cancel in writing before completion. ClipWave may end a
            campaign when rights, source availability, client cooperation,
            platform restrictions, fraud, safety, or legal or compliance issues
            make continued delivery impracticable. The parties may also end a
            campaign by mutual written agreement.
          </p>
          <p>
            On an eligible early termination, the final performance invoice is
            calculated as $750 × valid verified views ÷ 250,000 and is capped at
            $750. The initial $250 launch payment remains nonrefundable. The
            accepted campaign agreement controls termination eligibility,
            measurement timing, payment timing, and any additional exclusions.
          </p>
          <h2>Post volume and outcomes</h2>
          <p>
            ClipWave may publish as many approved posts as the campaign needs
            within the source-content limits and campaign brief. Total campaign
            charges do not exceed $1,000, and views beyond 250,000 do not create
            an additional charge without a separate written agreement. The
            commitment covers only verified views; it does not guarantee sales, revenue, followers,
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

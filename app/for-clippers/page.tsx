import type { Metadata } from "next";
import { ClipperInterestForm } from "@/components/interactive";
import { Footer, Header, PageIntro } from "@/components/site-shell";
import { clipperTestimonials } from "@/data/site";

export const metadata: Metadata = {
  title: "For Clippers",
  description:
    "ClipWave creator expectations, working model, FAQs, and interest registration.",
  alternates: { canonical: "/for-clippers" },
};

export default function ForClippersPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Creator path"
          title="Clear briefs, defined approvals, and campaign-specific work."
          description="The clipper path is separate from the buyer funnel. Opportunities depend on active client campaigns, content fit, platform requirements, and review capacity."
        />
        <section className="content-page">
          <h2>What to expect</h2>
          <ul>
            <li>Each campaign has its own source content and written brief.</li>
            <li>Approval depends on meeting the brief, not effort alone.</li>
            <li>Posting, disclosure, and platform rules must be followed.</li>
            <li>Payment terms are disclosed before you accept campaign work.</li>
            <li>There is no promise of continuous assignments or income.</li>
          </ul>

          <h2>What current clippers value</h2>
          <div className="testimonial-grid">
            {clipperTestimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <p>“{testimonial.quote}”</p>
                <h2>{testimonial.name}</h2>
              </article>
            ))}
          </div>

          <h2>Register interest</h2>
          <p>
            Share a portfolio or social profile. Registration is not an offer
            of work; it gives the team a way to review fit when relevant
            campaigns open.
          </p>
          <ClipperInterestForm />

          <h2>Creator FAQ</h2>
          <h3>Do I need a large account?</h3>
          <p>
            Not necessarily. Campaign requirements vary, and editing quality,
            reliability, niche fit, and platform history may all matter.
          </p>
          <h3>Is every submitted clip approved?</h3>
          <p>
            No. A submission must meet the specific brief and posting
            requirements before it is approved.
          </p>
          <h3>Is work guaranteed?</h3>
          <p>
            No. Availability depends on active campaigns and creator fit.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

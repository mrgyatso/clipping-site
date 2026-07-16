import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header, PageIntro } from "@/components/site-shell";
import { caseStudies } from "@/data/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Verified, anonymized ClipWave campaign evidence and measurement methodology.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Campaign evidence"
          title="Results belong here only when they can be verified."
          description="Every published record will disclose the campaign goal, vertical, duration, approved clips, verified views, platforms, budget band, and measurement method."
        />
        <section className="content-page">
          {caseStudies.length ? (
            <div className="case-grid">
              {caseStudies.map((study) => (
                <article className="case-card" key={study.slug}>
                  <span className="kicker">{study.vertical}</span>
                  <h2>{study.title}</h2>
                  <p>{study.summary}</p>
                  <div className="case-meta">
                    <span>{study.approvedClips} approved clips</span>
                    <span>{study.durationDays} days</span>
                    <span>{study.verifiedViews.toLocaleString()} verified views</span>
                    <span>{study.budgetBand}</span>
                  </div>
                  <Link className="text-link" href={`/case-studies/${study.slug}`}>
                    Read campaign record →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="kicker">Honest launch state</span>
              <h2>Verified campaign datasets are being prepared.</h2>
              <p>
                We will not publish placeholder clients or invented outcomes.
                Until anonymized source records are available, evaluate
                ClipWave on the pilot’s defined deliverables, review process,
                and reporting standard.
              </p>
              <Link className="button primary" href="/#qualification">
                Check campaign fit <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}

          <h2>Publication standard</h2>
          <ul>
            <li>Posted URLs are retained as the delivery source of truth.</li>
            <li>Views are captured at a disclosed reporting cutoff.</li>
            <li>Deleted or unavailable posts are identified, not hidden.</li>
            <li>Budget appears as a band to preserve client confidentiality.</li>
            <li>No result is presented as a guarantee for another campaign.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

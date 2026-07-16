import Link from "next/link";
import { LeadForm, RevealManager, TrackedLink } from "@/components/interactive";
import { Footer, Header } from "@/components/site-shell";
import { faqs, processProof } from "@/data/site";

const deliverables = [
  ["20", "approved posted clips"],
  ["21", "days in the pilot window"],
  ["$1,000", "starting campaign price"],
] as const;

const steps = [
  {
    number: "01",
    title: "We review the source",
    body: "You share the content, goal, launch timing, and constraints. We confirm whether the source has enough usable material for the pilot.",
  },
  {
    number: "02",
    title: "We define the brief",
    body: "Clip direction, brand boundaries, approval criteria, platforms, and reporting expectations are agreed before production.",
  },
  {
    number: "03",
    title: "We manage delivery",
    body: "Clippers create and post. We coordinate the workflow, review submissions, and record each approved post.",
  },
  {
    number: "04",
    title: "You receive the record",
    body: "At the end of the pilot, you get approved post links and the platform metrics available during the reporting window.",
  },
] as const;

export default function Home() {
  return (
    <>
      <RevealManager />
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="kicker light">Managed clipping pilot</span>
            <h1>
              Turn ready source content into{" "}
              <em>20 approved posted clips.</em>
            </h1>
            <p>
              A 21-day managed pilot for brands that want short-form
              distribution without recruiting, briefing, and reviewing
              creators themselves.
            </p>
            <div className="button-row">
              <TrackedLink
                className="button primary large"
                href="#qualification"
                event="hero_fit_cta_click"
              >
                Check campaign fit <span aria-hidden="true">↗</span>
              </TrackedLink>
              <Link className="text-link light-link" href="#pilot">
                See what’s included ↓
              </Link>
            </div>
            <p className="microcopy">
              Starting at $1,000. Final scope follows a review of your source
              content. Views are not guaranteed.
            </p>
          </div>
          <div className="hero-panel" aria-label="Pilot delivery overview">
            <span className="panel-label">Pilot / 001</span>
            <strong>20</strong>
            <span>approved clips posted over 21 days</span>
            <div className="panel-rule" />
            <p>
              Briefing, coordination, review, posting record, and available
              platform metrics.
            </p>
          </div>
        </section>

        <section className="pilot section" id="pilot">
          <div className="section-heading reveal">
            <span className="kicker">The offer</span>
            <h2>A defined first campaign—not an open-ended retainer.</h2>
            <p>
              The pilot is built to test your source material and operating
              fit. It promises a clear delivery standard, not a speculative
              performance outcome.
            </p>
          </div>
          <div className="metric-grid reveal">
            {deliverables.map(([value, label]) => (
              <article className="metric-card" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
          <div className="included-grid reveal">
            <article className="dark-card">
              <span className="kicker light">Included</span>
              <ul className="check-list">
                <li>Source-content and campaign-fit review</li>
                <li>Written creative and posting brief</li>
                <li>Clipper coordination during the pilot</li>
                <li>Review against agreed approval criteria</li>
                <li>20 approved posts and a delivery record</li>
              </ul>
            </article>
            <article className="outline-card">
              <span className="kicker">Scope note</span>
              <h3>Starting price, confirmed after review.</h3>
              <p>
                The $1,000 starting point assumes usable source content and a
                straightforward brief. Editing complexity, rights, volume,
                turnaround, and brand requirements can change final pricing.
              </p>
            </article>
          </div>
        </section>

        <section className="proof section">
          <div className="section-heading reveal">
            <span className="kicker">Proof without theatre</span>
            <h2>Evidence should be inspectable.</h2>
            <p>
              Verified campaign records are not yet published, so this launch
              version shows the operating proof we can substantiate today.
            </p>
          </div>
          <div className="proof-grid reveal">
            {processProof.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="center reveal">
            <Link className="button secondary" href="/case-studies">
              View evidence standard <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="process section" id="process">
          <div className="section-heading left reveal">
            <span className="kicker">How it works</span>
            <h2>One managed path from source review to delivery.</h2>
          </div>
          <div className="steps">
            {steps.map((step) => (
              <article className="step reveal" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="qualification section" id="qualification">
          <div className="qualification-copy reveal">
            <span className="kicker light">Campaign qualification</span>
            <h2>Check whether the pilot fits your next 30 days.</h2>
            <p>
              Ready-to-share source content, at least a $1,000 budget, and a
              launch target within 30 days unlock scheduling after successful
              submission. Other requests receive a manual review.
            </p>
            <div className="prepare-card">
              <span>Qualified-call preparation</span>
              <ul>
                <li>Your primary source-content link</li>
                <li>The outcome this campaign should support</li>
                <li>Brand, rights, or compliance constraints</li>
                <li>Your ideal launch date</li>
              </ul>
            </div>
          </div>
          <div className="form-card reveal">
            <LeadForm />
          </div>
        </section>

        <section className="objections section">
          <div className="section-heading reveal">
            <span className="kicker">A realistic fit</span>
            <h2>What the pilot is—and what it is not.</h2>
          </div>
          <div className="objection-grid reveal">
            <article>
              <span>It is</span>
              <h3>A managed operational test</h3>
              <p>
                A way to test whether your source content can support a
                repeatable clipping workflow with clear delivery standards.
              </p>
            </article>
            <article>
              <span>It is not</span>
              <h3>A guaranteed viral outcome</h3>
              <p>
                Posting more creative creates more opportunities, but no agency
                can honestly promise views, conversions, or platform reach.
              </p>
            </article>
            <article>
              <span>Best for</span>
              <h3>Teams with material ready now</h3>
              <p>
                Podcasts, interviews, streams, demos, webinars, and other
                footage with multiple clear moments and permission to reuse it.
              </p>
            </article>
          </div>
        </section>

        <section className="faq section" id="faq">
          <div className="section-heading reveal">
            <span className="kicker">FAQ</span>
            <h2>Questions buyers ask before the fit check.</h2>
          </div>
          <div className="faq-list reveal">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="closing">
          <span className="kicker light">Start with the source</span>
          <h2>Know whether your campaign is workable before you book.</h2>
          <TrackedLink
            className="button primary large"
            href="#qualification"
            event="closing_fit_cta_click"
          >
            Check campaign fit <span aria-hidden="true">↗</span>
          </TrackedLink>
        </section>
      </main>
      <Footer />
    </>
  );
}

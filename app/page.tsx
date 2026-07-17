import Link from "next/link";
import { LeadForm, RevealManager, TrackedLink } from "@/components/interactive";
import { Footer, Header } from "@/components/site-shell";
import { faqs, processProof } from "@/data/site";

const deliverables = [
  ["TARGET", "verified views agreed upfront"],
  ["30", "days maximum per campaign"],
  ["$1,000", "starting campaign price"],
] as const;

const steps = [
  {
    number: "01",
    title: "We set the target",
    body: "You share the content, view goal, launch timing, and constraints. We review the source and confirm a guaranteed verified-view target and itemized price.",
  },
  {
    number: "02",
    title: "We define the brief",
    body: "Clip direction, brand boundaries, approval criteria, platforms, and reporting expectations are agreed before production.",
  },
  {
    number: "03",
    title: "We mobilize the army",
    body: "Clippers create and publish from creator accounts. We coordinate the campaign, review submissions, and scale approved post volume toward the target.",
  },
  {
    number: "04",
    title: "We verify the views",
    body: "The campaign ends when the target is reached or at the day-30 cutoff. You receive approved post links, public platform counts, and the final guarantee calculation.",
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
            <span className="kicker light">For YouTubers and live sellers</span>
            <h1>Your best moments shouldn’t <em>die after 48 hours.</em></h1>
            <p>
              Build a distribution army around every stream. ClipWave mobilizes
              clippers to create and publish as many posts as your campaign
              needs—until your guaranteed verified-view target is reached or 30
              days pass.
            </p>
            <p className="hero-mechanism">
              <strong>Editors deliver files.</strong> We manage the creators who
              publish them.
            </p>
            <div className="button-row">
              <TrackedLink
                className="button primary large"
                href="#qualification"
                event="hero_fit_cta_click"
              >
                Build my distribution army <span aria-hidden="true">↗</span>
              </TrackedLink>
              <Link className="text-link light-link" href="#pilot">
                See what’s included ↓
              </Link>
            </div>
            <p className="microcopy">
              Campaigns start at $1,000. Your view target, post volume, and
              final price are confirmed after source review.
            </p>
          </div>
          <div className="hero-panel" aria-label="Campaign guarantee overview">
            <span className="panel-label">Campaign / target-led</span>
            <strong>30</strong>
            <span>days maximum to reach your guaranteed view target</span>
            <div className="panel-rule" />
            <p>
              Flexible post volume. Public view verification. Pro-rata
              distribution-fee protection.
            </p>
          </div>
        </section>

        <section className="pilot section" id="pilot">
          <div className="section-heading reveal">
            <span className="kicker">The offer</span>
            <h2>Buy distribution—not another folder of clips.</h2>
            <p>
              Freelancers stop at production. ClipWave owns the operating loop:
              creator briefing, publishing, review, public view tracking, and a
              guaranteed target backed by proportional distribution-fee relief.
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
                <li>A guaranteed verified-view target</li>
                <li>Clipper coordination during the campaign</li>
                <li>Review against agreed approval criteria</li>
                <li>As many approved posts as the agreed scope needs</li>
                <li>Public view tracking and a delivery record</li>
              </ul>
            </article>
            <article className="outline-card">
              <span className="kicker">Scope note</span>
              <h3>Starting price, confirmed after review.</h3>
              <p>
                The $1,000 starting point assumes usable source content and a
                straightforward brief. The target, editing complexity, rights,
                post volume, and brand requirements determine final pricing.
                Proposals itemize setup and distribution fees.
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
            <h2>One managed path from source review to verified reach.</h2>
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
                <li>Your preferred verified-view target</li>
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
            <h2>Know exactly what ClipWave is—and isn’t.</h2>
          </div>
          <div className="objection-grid reveal">
            <article>
              <span>It is</span>
              <h3>A verified distribution target</h3>
              <p>
                Approved campaign posts count toward a view target measured
                from native public platform counters at the cutoff.
              </p>
            </article>
            <article>
              <span>It is not</span>
              <h3>Another folder of clips to post yourself</h3>
              <p>
                Editors hand you files and leave distribution on your plate.
                ClipWave coordinates clippers who create and publish from their
                own accounts, so reach is built into the campaign.
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
          <span className="kicker light">Your content already did the work</span>
          <h2>Now build the distribution army that keeps it moving.</h2>
          <TrackedLink
            className="button primary large"
            href="#qualification"
            event="closing_fit_cta_click"
          >
            Build my distribution army <span aria-hidden="true">↗</span>
          </TrackedLink>
        </section>
      </main>
      <Footer />
    </>
  );
}

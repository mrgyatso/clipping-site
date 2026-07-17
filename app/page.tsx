import Link from "next/link";
import { LeadForm, RevealManager, TrackedLink } from "@/components/interactive";
import { Footer, Header } from "@/components/site-shell";
import { faqs, processProof } from "@/data/site";

const deliverables = [
  ["25%", "paid before campaign launch"],
  ["75%", "paid at verified completion"],
  ["$1,000", "maximum campaign price"],
] as const;

const valueFlow = [
  {
    label: "Client",
    title: "Content + $250",
    body: "You supply campaign-ready footage and fund the launch.",
  },
  {
    label: "ClipWave",
    title: "Brief + route",
    body: "We direct the creative, coordinate clippers, and verify delivery.",
  },
  {
    label: "Clippers",
    title: "Create + post",
    body: "The network publishes approved clips from creator accounts.",
  },
  {
    label: "Completion",
    title: "250K verified views",
    body: "At the target, the campaign closes and the final $750 is due.",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "We qualify the source",
    body: "You share the footage, goal, and constraints. We confirm that the material can support the 250K verified-view campaign.",
  },
  {
    number: "02",
    title: "You fund the launch",
    body: "The first $250 secures campaign setup. We agree on clip direction, brand boundaries, platforms, and approval criteria.",
  },
  {
    number: "03",
    title: "We mobilize the army",
    body: "Clippers create and publish from creator accounts. We coordinate, review, and keep approved posts moving until they reach the target.",
  },
  {
    number: "04",
    title: "We close at 250K",
    body: "We capture the native public counts, deliver the campaign record, and invoice the final $750 when valid verified views reach 250K.",
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
              needs—and keeps the campaign moving until it reaches 250,000
              verified views.
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
              $250 launches the campaign. The final $750 is due when approved
              posts reach 250K valid verified views.
            </p>
          </div>
          <div className="hero-panel" aria-label="Campaign guarantee overview">
            <span className="panel-label">Campaign / target-led</span>
            <strong>250K</strong>
            <span>verified views before the campaign closes</span>
            <div className="panel-rule" />
            <p>
              Flexible post volume. Native public verification. $1,000 total
              campaign cap.
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
              run-to-target commitment backed by performance-based billing.
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
          <div className="value-flow reveal" aria-label="How campaign value moves">
            {valueFlow.map((item, index) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {index < valueFlow.length - 1 && (
                  <b aria-hidden="true">→</b>
                )}
              </article>
            ))}
          </div>
          <div className="included-grid reveal">
            <article className="dark-card">
              <span className="kicker light">Included</span>
              <ul className="check-list">
                <li>Source-content and campaign-fit review</li>
                <li>Written creative and posting brief</li>
                <li>A fixed 250K verified-view target</li>
                <li>Clipper coordination during the campaign</li>
                <li>Review against agreed approval criteria</li>
                <li>As many approved posts as the campaign needs</li>
                <li>Public view tracking and a delivery record</li>
              </ul>
            </article>
            <article className="outline-card">
              <span className="kicker">Scope note</span>
              <h3>One target. One campaign cap.</h3>
              <p>
                The $250 launch payment covers source review, briefing, routing,
                and management. The remaining $750 is due at 250K valid verified
                views. If the campaign ends early under the signed terms, only
                that completion balance is prorated to delivered views.
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
            <h2>Check whether your content can carry the campaign.</h2>
            <p>
              Ready-to-share source content and a $1,000 campaign budget unlock
              scheduling after successful submission. Other requests receive a
              manual review.
            </p>
            <div className="prepare-card">
              <span>Qualified-call preparation</span>
              <ul>
                <li>Your primary source-content link</li>
                <li>Your primary campaign goal</li>
                <li>Brand, rights, or compliance constraints</li>
                <li>Confirmation that the $250 launch payment is ready</li>
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
                Approved campaign posts run toward 250K views measured from
                native public platform counters when the campaign closes.
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

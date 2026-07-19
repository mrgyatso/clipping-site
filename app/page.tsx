import Link from "next/link";
import { BudgetSlider } from "@/components/budget-slider";
import { ClipWall } from "@/components/clip-wall";
import { LeadForm, RevealManager, TrackedLink } from "@/components/interactive";
import { Footer, Header } from "@/components/site-shell";
import { faqs, processProof } from "@/data/site";
import {
  MIN_BUDGET,
  RATE_PER_1K,
  formatBudget,
  formatViews,
  viewsForBudget,
} from "@/data/pricing";

// Derived from the rate rather than typed, so these can never contradict the
// slider sitting a few hundred pixels above them.
const deliverables = [
  [`$${RATE_PER_1K}`, "per 1,000 verified views"],
  [formatBudget(MIN_BUDGET), "minimum campaign budget"],
  [formatViews(viewsForBudget(MIN_BUDGET)), "verified views at the minimum"],
] as const;

const valueFlow = [
  {
    label: "Client",
    title: "Content + budget",
    body: "You supply campaign-ready footage and set the budget.",
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
    label: "Delivery",
    title: "Views land, then you pay",
    body: "We invoice the verified views we actually delivered. Miss the target, no invoice.",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "We qualify the source",
    body: "You share the footage, goal, and constraints. We confirm that the material can support the view target your budget buys.",
  },
  {
    number: "02",
    title: "We set the target",
    body: "Your budget sets the guaranteed target at $4 per 1,000 verified views. We agree on clip direction, brand boundaries, platforms, and approval criteria.",
  },
  {
    number: "03",
    title: "We mobilize the army",
    body: "Clippers create and publish from creator accounts. We coordinate, review, and keep approved posts moving until they reach the target.",
  },
  {
    number: "04",
    title: "We count, then invoice",
    body: "We capture the native public counts, deliver the campaign record, and invoice only the valid verified views delivered. Nothing landed, nothing billed.",
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
              needs—and keeps the campaign moving until it hits the verified-view
              target your budget buys.
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
              $4 per 1,000 verified views, $1,000 minimum budget. You only pay
              for the views we actually deliver.
            </p>
          </div>
          <BudgetSlider />
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
                <li>A guaranteed verified-view target set by your budget</li>
                <li>Clipper coordination during the campaign</li>
                <li>Review against agreed approval criteria</li>
                <li>As many approved posts as the campaign needs</li>
                <li>Public view tracking and a delivery record</li>
              </ul>
            </article>
            <article className="outline-card">
              <span className="kicker">Scope note</span>
              <h3>You only pay for views that land.</h3>
              <p>
                Campaigns are priced at $4 per 1,000 valid verified views, with a
                $1,000 minimum budget—250,000 views at the minimum. Larger budgets
                buy proportionally more views at the same rate, with no cap. We
                invoice the verified views actually delivered, so if we miss the
                target you are not billed for what did not land.
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

        <section className="clips section" id="clips" aria-labelledby="clips-heading">
          <div className="section-heading reveal">
            <span className="kicker">Real clips · Real views</span>
            <h2 id="clips-heading">Clips we&rsquo;ve put in front of millions.</h2>
            <p>
              A wall of real short-form we&rsquo;ve distributed for partners across
              every platform. Hover any clip to play it.
            </p>
          </div>
          <div className="clip-platforms reveal" aria-label="Platforms we distribute on">
            <span className="cp tiktok" title="TikTok">
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                <path d="M16.5 3c.3 2 1.7 3.6 3.7 3.9v2.8c-1.4.1-2.7-.3-3.9-1v5.6a5.7 5.7 0 11-5.7-5.7c.3 0 .6 0 .9.1v2.9a2.8 2.8 0 102 2.7V3z" fill="currentColor" />
              </svg>
            </span>
            <span className="cp yt" title="YouTube Shorts">
              <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
                <rect x="3" y="6" width="18" height="12" rx="4" fill="currentColor" />
                <path d="M10 9.2l5 2.8-5 2.8z" fill="#fff" />
              </svg>
            </span>
            <span className="cp ig" title="Instagram Reels">
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17" cy="7" r="1.1" fill="currentColor" />
              </svg>
            </span>
            <span className="cp x" title="X">
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path d="M3 3l7.5 9.7L3.4 21H6l5.5-6.4L16.3 21H21l-7.9-10.2L20.4 3H18l-5 5.9L8.4 3z" fill="currentColor" />
              </svg>
            </span>
          </div>
          <ClipWall />
          <div className="clip-cta reveal">
            <TrackedLink
              className="button primary"
              href="#qualification"
              event="clips_cta_click"
            >
              Build my distribution army <span aria-hidden="true">↗</span>
            </TrackedLink>
            <span className="clip-note">
              Every card links to the live post. View counts are read from the platform.
            </span>
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
                <li>Your campaign budget ($1,000 minimum)</li>
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
                Approved campaign posts run toward the view target your budget
                buys, measured from native public platform counters when the
                campaign closes.
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

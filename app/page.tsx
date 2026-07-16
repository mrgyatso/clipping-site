import {
  BackToTop,
  CalEmbed,
  GuideTabs,
  RevealManager,
  RotatingWord,
} from "@/components/interactive";
import {
  campaignTiles,
  faqs,
  navigation,
  reviews,
  siteConfig,
  type CampaignTile,
} from "@/data/site";

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 10 6" width="9" height="6" aria-hidden="true">
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LogoMark({ small = false }: { small?: boolean }) {
  return <span className={`logo-mark${small ? " sm" : ""}`}>C</span>;
}

function Arrow() {
  return <span className="arr">↗</span>;
}

function CampaignIcon({ icon }: Pick<CampaignTile, "icon">) {
  const icons = {
    ticket: <path d="M8 18a4 4 0 004-4h24a4 4 0 004 4v4a4 4 0 000 8v4a4 4 0 00-4 4H12a4 4 0 00-4-4v-4a4 4 0 000-8z" />,
    mic: <><rect x="18" y="8" width="12" height="22" rx="6" /><path d="M12 24a12 12 0 0024 0M24 36v6" /></>,
    console: <><rect x="8" y="14" width="32" height="20" rx="6" /><path d="M16 24h6M19 21v6M30 22h.5M34 26h.5" /></>,
    play: <><rect x="10" y="10" width="28" height="28" rx="7" /><path d="M21 18l10 6-10 6z" /></>,
    chip: <><circle cx="24" cy="24" r="12" /><circle cx="24" cy="24" r="5" /></>,
    bag: <><path d="M12 18h24l-2 20H14z" /><path d="M18 18a6 6 0 0112 0" /></>,
  };
  return <svg viewBox="0 0 48 48" aria-hidden="true">{icons[icon]}</svg>;
}

function Navigation() {
  return (
    <header className="nav-wrap">
      <nav className="nav glass-pill" aria-label="Main navigation">
        <a className="nav-logo" href="#top" aria-label={`${siteConfig.name} home`}><LogoMark /></a>
        <ul className="nav-links">
          {navigation.map((item) => <li key={item.label}><a href={item.href}>{item.label}{item.dropdown && <Chevron />}</a></li>)}
        </ul>
        <a className="btn btn-primary nav-cta" href="#book">Book a call <Arrow /></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-badge glass-chip reveal">
        <span className="avatar-stack" aria-hidden="true"><span className="avatar a1" /><span className="avatar a2" /><span className="avatar a3" /></span>
        Over <b>&nbsp;10B+ views&nbsp;</b> generated for our partners
      </div>
      <h1 id="hero-heading" className="hero-title reveal">
        The Clipping Agency Powering<br /><span className="rot-wrap"><RotatingWord /></span> Campaigns
      </h1>
      <p className="hero-sub reveal">
        A fully managed clipping agency built around performance — strategy, creator activation,
        quality review, and verified short-form distribution through a network of 230k+ clippers
        producing billions of views.
      </p>
      <div className="hero-ctas reveal">
        <a className="btn btn-primary" href="#book">Book a call <Arrow /></a>
        <a className="btn btn-glass" href="#faq">Become a clipper <Arrow /></a>
      </div>
      <p className="hero-micro reveal">A quick 30-minute call. Nothing to prepare.</p>
      <div className="hero-press reveal">
        <span className="press-label">As featured in</span>
        <div className="press-row">
          <span className="press serif-italic">The Ledger</span>
          <span className="press smallcaps-serif">VARSITY</span>
          <span className="press smallcaps-sans">MEDIA INSIDER</span>
        </div>
      </div>
      <div className="hero-video reveal" role="img" aria-label="Founder introduction video placeholder">
        <div className="video-gradient" /><span className="video-name">Founder&nbsp;Story</span>
        <button className="video-play" type="button" aria-label="Play video">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        </button>
      </div>
    </section>
  );
}

function CampaignMarquee() {
  const tiles = [...campaignTiles, ...campaignTiles];
  return (
    <section className="marquee-sec" aria-label="Recent campaigns">
      <div className="marquee">
        <div className="marquee-track">
          {tiles.map((tile, index) => (
            <div className={`mq-tile ${tile.color}`} key={`${tile.name}-${index}`} aria-hidden={index >= campaignTiles.length}>
              <CampaignIcon icon={tile.icon} /><span className="mq-name">{tile.name}</span><span className="mq-views">{tile.views}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="brand-row reveal">
        <span className="brandmark serif-italic">Capstone Records</span><span className="brandmark bracket">Story Studios</span>
        <span className="brandmark smallcaps-sans">E M P I R E</span><span className="brandmark serif-italic">North Label</span>
      </div>
    </section>
  );
}

const processSteps = [
  ["10B+ Views", "Campaign reach delivered", "Your goals become a campaign brief with clear content guidelines.", "Hop on a call with our team", "Bring yourself and your vision to a short call. We take care of strategy, campaign structure, and the rollout plan from there."],
  ["230K+ Clippers", "Active creator network", "Clippers post from their own accounts, following your campaign guidelines.", "Kick off the distribution wave", "Our clipper network turns your source content into vertical edits and posts them across TikTok, Reels, and Shorts — no recruiting or babysitting on your end."],
  ["Verified Views", "Reporting focus", "Every submission is reviewed against your guidelines before it counts.", "Watch performance in real time", "Track posted videos and verified views in a single live report while the campaign scales week over week."],
] as const;

function Process() {
  return (
    <section className="process" aria-labelledby="process-heading">
      <span className="pill-dark reveal">Process</span>
      <h2 id="process-heading" className="sec-title reveal">Launching a campaign has never been this easy</h2>
      <p className="sec-sub reveal">Forget slow agencies. Launch, scale, and measure a full short-form campaign in record time.</p>
      <div className="timeline">
        <div className="tl-line" aria-hidden="true" />
        {processSteps.map(([metric, eyebrow, note, title, body], index) => (
          <div className={`tl-row${index === 1 ? " flip" : ""}`} key={title}>
            <div className="tl-stat reveal"><span className="tl-big grad-blue">{metric}</span><span className="tl-eyebrow">{eyebrow}</span><p className="tl-note">{note}</p></div>
            <div className="tl-dot" aria-hidden="true" />
            <article className="tl-card glass-card reveal"><span className="step-chip"><b>{index + 1}</b> step</span><h3>{title}</h3><p>{body}</p></article>
          </div>
        ))}
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section className="booking" id="book" aria-labelledby="book-heading">
      <h2 id="book-heading" className="sec-title reveal">Book your strategy call</h2>
      <p className="sec-sub reveal">Grab a time below if you&apos;re planning a $15k+ managed campaign. Bring your goals and source content — we&apos;ll map the plan from there.</p>
      <div className="cal-card glass-card reveal">
        <div className="cal-left">
          <span className="cal-logo"><LogoMark /></span><h3>Intro Strategy Call</h3>
          <p className="cal-meta"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>{siteConfig.bookingDuration}</p>
          <p className="cal-meta"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>Web conferencing details on confirmation</p>
          <p className="cal-desc">A quick working session on goals, source content, and what a managed rollout looks like for you.</p>
        </div>
        <div className="cal-right"><CalEmbed /></div>
      </div>
    </section>
  );
}

function Guide() {
  return (
    <section className="guide" id="guide" aria-labelledby="guide-heading">
      <div className="explore-bar glass-card reveal">
        <span className="explore-label"><span className="dot-blue" /> Explore</span>
        <a className="chip" href="#guide">Clipping agency services →</a><a className="chip" href="#guide">Campaign model →</a>
        <a className="chip" href="#work-with">Logo campaigns →</a><a className="chip" href="#work-with">Music campaigns →</a><a className="chip" href="#work-with">Podcast campaigns →</a>
      </div>
      <span className="pill-dark reveal">How It Works</span>
      <h2 id="guide-heading" className="sec-title reveal">How we scale short-form distribution</h2>
      <p className="sec-sub reveal">We&apos;re a managed clipping agency for teams that want strategy, clipper activation, quality control, and verified view reporting. A clipping campaign turns your source content into a distribution system that stays managed and measurable.</p>
      <div className="guide-grid">
        <div className="guide-text glass-card reveal">
          <span className="eyebrow">Campaign narrative</span><GuideTabs />
          <div className="platform-chips"><span className="pchip">TikTok</span><span className="pchip">Instagram Reels</span><span className="pchip">YouTube Shorts</span></div>
          <div className="guide-ctas"><a className="btn btn-primary sm" href="#reviews">Explore case studies <Arrow /></a><a className="btn btn-ghost sm" href="#faq">What is clipping? <Arrow /></a></div>
        </div>
        <div className="guide-phone reveal">
          <div className="phone-mock">
            <div className="phone-screen"><span className="phone-word">Social&nbsp;Media</span><span className="ph-icon ph-like">♥</span><span className="ph-icon ph-bird">▶</span></div>
            <article className="phone-overlay glass-strong"><span className="chip-tiny">Campaign loop</span><h3>From briefing to performance scale</h3><ul className="check-list"><li>Campaign strategy and guidelines</li><li>Clipper activation and distribution</li><li>Manual review on every submission</li><li>Verified views in one report</li></ul></article>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalReach() {
  const stats = [["10B+", "views generated"], ["230K+", "active clippers"], ["100+", "campaigns launched"], ["$0.002", "avg. cost per view"], ["176K", "avg. views / video"]];
  return (
    <section className="global" aria-label="Global reach">
      <div className="globe-dots" aria-hidden="true" /><h2 className="global-title"><span className="g-line g1">WE ARE</span><span className="g-line g2">GLOBAL.</span></h2>
      <aside className="global-stats glass-card reveal">
        {stats.map(([value, label], index) => <div className={`gs${index === stats.length - 1 ? " gs-hot" : ""}`} key={label}><b>{value}</b><span>{label}</span></div>)}
        <a className="btn btn-glass sm lets-talk" href="#book">Let&apos;s talk →</a>
      </aside>
      <p className="global-caption glass-chip reveal">Your brand, everywhere. We deploy creators across every market, every timezone.</p>
    </section>
  );
}

function WorkWithUs() {
  const audiences = ["Artists", "Creators", "Casinos", "Products", "Brands", "Apps/Startups"];
  const other = ["Weeks to onboard", "Little real management", "Low-effort clippers", "Slow feedback loops", "Black-box reporting"];
  const ours = ["Live 1–2 days after your call", "24/7 community management", "Vetted, high-value clippers", "Real-time updates", "Full transparency"];
  return (
    <section className="work-with" id="work-with" aria-labelledby="ww-heading">
      <span className="pill-dark reveal">Work With Us</span><h2 id="ww-heading" className="sec-title left reveal">Who We Work With</h2><p className="sec-sub left reveal">Campaigns across every industry and niche.</p>
      <ul className="ww-list">{audiences.map((audience, index) => <li className="reveal" key={audience}><span className="ww-num">{String(index + 1).padStart(2, "0")}</span><h3>{audience}</h3><a href="#reviews" className="ww-view">View campaigns</a></li>)}</ul>
      <p className="ww-note reveal">For regulated categories, every campaign is checked for platform compliance, age restrictions, jurisdictional limits, and brand-safety requirements before launch.</p>
      <div className="compare" id="compare">
        <article className="cmp-card cmp-them glass-card reveal"><h3>Other Agencies</h3><ul>{other.map((item) => <li key={item}><span className="x">✕</span>{item}</li>)}</ul></article>
        <article className="cmp-card cmp-us glass-strong reveal"><h3><LogoMark small /> {siteConfig.name}</h3><ul>{ours.map((item) => <li key={item}><span className="ck">✓</span>{item}</li>)}</ul></article>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="rev-heading">
      <h2 id="rev-heading" className="sec-title reveal">Rated by real clippers</h2>
      <div className="rev-grid">{reviews.map((review) => <article className="rev-card reveal" key={`${review.name}-${review.quote}`}><span className="stars" aria-label="5 out of 5 stars">★ ★ ★ ★ ★</span><p className="rev-quote">“{review.quote}”</p><div className="rev-who"><span className="rev-av">{review.name[0]}</span><span className="rev-name">{review.name}</span></div></article>)}</div>
    </section>
  );
}

function Toolkit() {
  const fit = ["Brands launching products that need fast short-form awareness", "Artists and labels building repeatable momentum around releases", "Creators repurposing long-form episodes into daily clips", "Teams comparing agencies and wanting transparent reporting"];
  return (
    <section className="toolkit" id="campaign-toolkit" aria-labelledby="tk-heading">
      <span className="pill-dark reveal">⌘ Campaign Planning Toolkit</span><h2 id="tk-heading" className="sec-title reveal">A cleaner way to run your first clipping campaign</h2><p className="sec-sub reveal">A fast checklist covering setup, launch, and weekly optimization.</p>
      <div className="tk-grid">
        <div className="tk-panel glass-card reveal">
          <span className="eyebrow"><span className="dot-blue" /> Why teams stay with us</span>
          <div className="tk-cols">
            <div className="tk-col"><span className="tk-ic">◎</span><h4>We build the playbook</h4><p>Goals, creative angles, and campaign guidelines mapped before day one.</p><small>You share the vision — we write the plan.</small></div>
            <div className="tk-col"><span className="tk-ic">◈</span><h4>The network does the reps</h4><p>230K+ clippers briefed through your campaign guidelines.</p><small>No recruiting, no back-and-forth, no babysitting.</small></div>
            <div className="tk-col"><span className="tk-ic">◉</span><h4>Reviewed before it counts</h4><p>Every submission checked against the brief; views tracked in your report.</p><small>You get a report — we handle the rest.</small></div>
          </div>
        </div>
        <div className="tk-panel glass-card reveal"><span className="eyebrow"><span className="dot-blue" /> Practical setup checklist</span><h5 className="tk-sub">Bring to the call</h5><ul className="check-list"><li>Your goal — awareness, launches, or growth</li><li>Where your source content lives</li><li>Optional: any links or content you want us to see</li></ul><h5 className="tk-sub">What we configure</h5><ul className="check-list"><li>Campaign strategy and content guidelines</li><li>Clipper management</li><li>Manual video review and quality check</li><li>In-depth campaign reporting</li></ul></div>
      </div>
      <div className="tk-next glass-card reveal"><span className="eyebrow">Choose your next step</span><div className="tk-btns"><a className="btn btn-primary sm" href="#book">Book intro call <Arrow /></a><a className="btn btn-ghost sm" href="#compare">Compare services <Arrow /></a></div></div>
      <div className="tk-fit reveal"><span className="eyebrow center">Best fit for these campaign goals</span><div className="fit-row">{fit.map((item) => <span className="fit" key={item}><span className="ck">✓</span>{item}</span>)}</div></div>
    </section>
  );
}

function Research() {
  const cards = [
    ["90%", "U.S. teens who use YouTube", "Pew Research findings report that most U.S. teens use YouTube, with TikTok and Instagram following closely.", "Pew Research ↗"],
    ["200B+", "Daily Shorts views", "YouTube Shorts averages hundreds of billions of daily views according to recent industry reporting on global short-form reach.", "Industry data ↗"],
    ["2025", "Video defaults to vertical", "Major platforms continue consolidating around short-form-first distribution behavior across feeds.", "Platform reports ↗"],
    ["50% / 45% / 34%", "Video impact across the funnel", "Published research highlights digital video influence on awareness, choice, and purchase intent.", "Market research ↗"],
  ];
  return (
    <section className="research" aria-labelledby="rs-heading">
      <div className="rs-head reveal"><h2 id="rs-heading" className="sec-title left">Research context for short-form marketing</h2><span className="rs-label">Cited market signals</span></div>
      <div className="rs-grid">{cards.map(([value, title, body, source]) => <article className="rs-card reveal" key={title}><b>{value}</b><h4>{title}</h4><p>{body}</p><a className="rs-src" href="#blog">{source}</a></article>)}</div>
      <p className="rs-note reveal">External benchmarks show market behavior; campaign outcomes still vary by creative quality, offer strength, and distribution consistency.</p><p className="rs-note reveal">Use your own dashboard and attribution data for final budget, forecasting, and scale decisions.</p>
    </section>
  );
}

function Blog() {
  const posts = [
    ["▶", "bi1", "What Is Clipping? A Guide to Clipping Campaigns", "How clipping works, what a managed campaign includes, and when it beats traditional ads.", "Guide · 8 min read"],
    ["◫", "bi2", "UGC Ads vs Clipping vs Influencer Marketing", "Three distribution models compared on cost, control, speed, and compounding reach.", "Comparison · 6 min read"],
    ["◍", "bi3", "Clipping as a Marketing Strategy", "Why volume-based short-form distribution is becoming a core channel for modern brands.", "Strategy · 7 min read"],
  ];
  return (
    <section className="blog" id="blog" aria-labelledby="blog-heading">
      <span className="blog-watermark" aria-hidden="true">BLOG</span><span className="pill-grey reveal">Blog</span><h2 id="blog-heading" className="sec-title reveal">Latest from the Blog</h2><p className="sec-sub reveal">Guides, breakdowns, and playbooks from the team behind billions of views.</p>
      <div className="blog-grid">{posts.map(([icon, color, title, body, meta]) => <article className="blog-card glass-card reveal" key={title}><div className={`blog-img ${color}`}><span>{icon}</span></div><h3>{title}</h3><p>{body}</p><span className="blog-meta">{meta}</span></article>)}</div>
      <a className="btn btn-ghost sm center-btn reveal" href="#blog">View all posts →</a>
    </section>
  );
}

function ClosingSections() {
  return (
    <>
      <section className="strategy" aria-labelledby="st-heading"><h2 id="st-heading" className="sec-title reveal">Start with the strategy pages teams read before launch.</h2><div className="st-links reveal"><a className="chip lg" href="#guide">Clipping agency services →</a><a className="chip lg" href="#guide">Campaign model →</a><a className="chip lg" href="#compare">Agency comparison →</a><a className="chip lg" href="#faq">Pricing &amp; scope →</a><a className="chip lg" href="#blog">What is clipping? →</a></div></section>
      <section className="final-cta" aria-labelledby="cta-heading"><h2 id="cta-heading" className="sec-title reveal">Ready to launch your campaign?</h2><p className="sec-sub reveal">Book a call and have your first distribution wave live within days.</p><a className="btn btn-primary lg reveal" href="#book">Book a call <Arrow /></a></section>
      <section className="faq" id="faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="sec-title reveal">Frequently Asked Questions</h2>
        <div className="faq-list reveal">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span className="fq-num">{String(index + 1).padStart(2, "0")}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        <div className="faq-cta glass-card reveal"><h3>Clear answers, faster decisions</h3><p>Still unsure about scope or budget? Send a note and we&apos;ll tell you honestly if clipping fits.</p><a className="btn btn-primary sm" href="#book">Book intro call <Arrow /></a></div>
      </section>
    </>
  );
}

function SocialIcons() {
  return (
    <div className="socials">
      <a className="soc yt" href="#top" aria-label="YouTube"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M10 8.5l6 3.5-6 3.5z" fill="#fff" /></svg></a>
      <a className="soc ig" href="#top" aria-label="Instagram"><svg viewBox="0 0 24 24" width="15" height="15"><rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2" /><circle cx="17" cy="7" r="1.3" fill="#fff" /></svg></a>
      <a className="soc li" href="#top" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="15" height="15"><path d="M5 9h3v10H5zM6.5 4a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6zM11 9h3v1.5c.6-1 1.7-1.7 3-1.7 2.5 0 4 1.6 4 4.6V19h-3v-5c0-1.4-.6-2.3-1.8-2.3-1.3 0-2.2 1-2.2 2.5V19h-3z" fill="#fff" /></svg></a>
    </div>
  );
}

function Footer() {
  const columns = [
    ["Services", [["Clipping Agency", "#guide"], ["Clipping Campaigns", "#guide"], ["Video Clipping Service", "#guide"], ["Agency Pricing", "#faq"], ["Case Studies", "#reviews"], ["Short-Form Editing", "#guide"]]],
    ["Campaign Types", [["Logo Clipping Campaigns", "#work-with"], ["Music Clipping Campaigns", "#work-with"], ["Podcast Clipping Campaigns", "#work-with"]]],
    ["Company", [["Home", "#top"], ["About", "#top"], ["Careers", "#faq"], ["Become a clipper", "#faq"], ["Contact", "#faq"], ["Blog", "#blog"], ["Tools", "#guide"]]],
    ["Support", [["Privacy Policy", "#faq"], ["Terms of Service", "#faq"], ["FAQ", "#faq"], ["Media Kit", "#faq"]]],
  ] as const;
  return (
    <footer className="footer">
      <div className="foot-brand reveal"><LogoMark /><span className="foot-name">{siteConfig.name}</span></div><a className="btn btn-primary sm reveal" href="#book">Book intro call <Arrow /></a>
      <div className="foot-cols reveal">
        {columns.map(([heading, links]) => <div className="fcol" key={heading}><span className="fhead"><span className="dot-blue" /> {heading}</span>{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>)}
        <div className="fcol"><span className="fhead"><span className="dot-blue" /> Connect</span><SocialIcons /></div>
      </div>
      <div className="foot-wordmark" aria-hidden="true">CLIPWAVE</div><p className="foot-legal">Copyright © 2026 {siteConfig.name} · All Rights Reserved</p><button className="foot-cookie" type="button">Cookie settings</button>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <RevealManager /><Navigation />
      <main id="top"><Hero /><CampaignMarquee /><Process /><Booking /><Guide /><GlobalReach /><WorkWithUs /><Reviews /><Toolkit /><Research /><Blog /><ClosingSections /></main>
      <Footer /><BackToTop />
    </>
  );
}

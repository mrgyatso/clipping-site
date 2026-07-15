/* ═══════════════ ROTATING HERO WORD ═══════════════ */
const ROT_WORDS = ['Viral', 'Massive', 'Global'];
const rotEl = document.getElementById('rotWord');
let rotIdx = 0;
if (rotEl && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    rotEl.classList.add('out');
    setTimeout(() => {
      rotIdx = (rotIdx + 1) % ROT_WORDS.length;
      rotEl.textContent = ROT_WORDS[rotIdx];
      rotEl.classList.remove('out');
      rotEl.classList.add('in');
      setTimeout(() => rotEl.classList.remove('in'), 520);
    }, 400);
  }, 3200);
}

/* ═══════════════ REVEAL ON SCROLL ═══════════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

/* ═══════════════ CAMPAIGN MARQUEE TILES ═══════════════ */
const ICONS = {
  ticket: '<svg viewBox="0 0 48 48"><path d="M8 18a4 4 0 004-4h24a4 4 0 004 4v4a4 4 0 000 8v4a4 4 0 00-4 4H12a4 4 0 00-4-4v-4a4 4 0 000-8z"/></svg>',
  mic: '<svg viewBox="0 0 48 48"><rect x="18" y="8" width="12" height="22" rx="6"/><path d="M12 24a12 12 0 0024 0M24 36v6"/></svg>',
  console: '<svg viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="20" rx="6"/><path d="M16 24h6M19 21v6M30 22h.5M34 26h.5"/></svg>',
  play: '<svg viewBox="0 0 48 48"><rect x="10" y="10" width="28" height="28" rx="7"/><path d="M21 18l10 6-10 6z"/></svg>',
  chip: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12"/><circle cx="24" cy="24" r="5"/></svg>',
  bag: '<svg viewBox="0 0 48 48"><path d="M12 18h24l-2 20H14z"/><path d="M18 18a6 6 0 0112 0"/></svg>'
};
const TILES = [
  { name: 'Indie Artist', views: '12M+ views', color: 'mq-red', icon: 'ticket' },
  { name: 'Pop Star', views: '2B+ views', color: 'mq-slate', icon: 'mic' },
  { name: 'Sports League', views: '8M+ views', color: 'mq-blue', icon: 'console' },
  { name: 'AI Startup', views: '59M+ views', color: 'mq-red', icon: 'console' },
  { name: 'Reality Star', views: '17M+ views', color: 'mq-purple', icon: 'play' },
  { name: 'Public Figure', views: '6M+ views', color: 'mq-slate', icon: 'play' },
  { name: 'Gaming Brand', views: '53M+ views', color: 'mq-green', icon: 'chip' },
  { name: 'DTC Product', views: '3M+ views', color: 'mq-sand', icon: 'bag' },
  { name: 'Podcast', views: '4M+ views', color: 'mq-green', icon: 'bag' }
];
const track = document.getElementById('marqueeTrack');
if (track) {
  const tile = (t) =>
    `<div class="mq-tile ${t.color}">${ICONS[t.icon]}<span class="mq-name">${t.name}</span><span class="mq-views">${t.views}</span></div>`;
  const seq = TILES.map(tile).join('');
  track.innerHTML = seq + seq; // duplicate for seamless loop
}

/* ═══════════════ CAL.COM INLINE EMBED ═══════════════ */
const CAL_LINK = 'zack-woods-si9bra/30min';
const calEmbedEl = document.getElementById('cal-embed');
if (calEmbedEl) {
  /* Official Cal.com embed loader (https://cal.com/docs/integrations/embed) */
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal, ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement('script')).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); }, namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); }
        else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');

  Cal('init', 'book', { origin: 'https://app.cal.com' });
  Cal.ns.book('inline', {
    elementOrSelector: '#cal-embed',
    config: { layout: 'month_view', theme: 'light' },
    calLink: CAL_LINK
  });
  Cal.ns.book('ui', {
    theme: 'light',
    hideEventTypeDetails: true,
    layout: 'month_view',
    styles: { branding: { brandColor: '#0055fe' } }
  });
}

/* ═══════════════ GUIDE TABS ═══════════════ */
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
    document.querySelector(`.tab-panel[data-panel="${tab.dataset.tab}"]`)?.classList.add('active');
  });
});

/* ═══════════════ REVIEWS WALL ═══════════════ */
const REVIEWS = [
  { q: 'Payouts landed on time, every time. Easily the most organized program I have clipped for.', n: 'Marcus' },
  { q: 'The briefs are actually clear. You know exactly what counts before you post.', n: 'Big T' },
  { q: 'They are the best for clipping ✨', n: 'Sumit' },
  { q: 'the BEST community', n: 'Zziiroo' },
  { q: 'this is the best clipping program of all time', n: 'Ellijah' },
  { q: 'It is the best community ❤️', n: 'John' },
  { q: 'they are the best! and the mods are super approachable and helpful with any questions', n: 'Kimmy' },
  { q: 'A campaign that genuinely pays for effort. My best month yet came from one brief.', n: 'Dana' },
  { q: 'Great place to sharpen your editing, learn what performs, and get paid doing it.', n: 'Ravi' }
];
const revGrid = document.getElementById('revGrid');
if (revGrid) {
  revGrid.innerHTML = REVIEWS.map(
    (r) => `<article class="rev-card reveal">
      <span class="stars">★ ★ ★ ★ ★</span>
      <p class="rev-quote">“${r.q}”</p>
      <div class="rev-who"><span class="rev-av">${r.n[0]}</span><span class="rev-name">${r.n}</span></div>
    </article>`
  ).join('');
  revGrid.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));
}

/* ═══════════════ BACK TO TOP ═══════════════ */
const toTop = document.getElementById('toTop');
if (toTop) {
  addEventListener('scroll', () => {
    toTop.classList.toggle('show', scrollY > 900);
  }, { passive: true });
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

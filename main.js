/* ============================================================
   RIDGELINE FARMS — site engine (page-aware, self-guarding)
   Drives home, /strains, /media, /contact + legal pages.
   ============================================================ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- brand mark (inline SVG, uses currentColor + gold star) ---------- */
const MARK = `<svg viewBox="0 0 120 96" aria-hidden="true">
  <polygon points="0,74 20,42 34,56 52,28 66,52 84,34 104,60 120,44 120,86 0,86" fill="currentColor" opacity="0.5"/>
  <polygon points="0,80 16,54 30,66 46,38 60,64 76,44 92,68 108,52 120,66 120,90 0,90" fill="currentColor"/>
  <path d="M60 8 l3.2 8.4 8.4 3.2 -8.4 3.2 -3.2 8.4 -3.2 -8.4 -8.4 -3.2 8.4 -3.2 Z" fill="#e0a52e"/>
</svg>`;
$$('.mark').forEach(m => { if (!m.dataset.filled) { m.innerHTML = MARK; m.dataset.filled = 1; } });

/* ---------- social icons ---------- */
const SVGI = {
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3s-2.3 1.57-2.3 3.2V21H9z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3V9Z" fill="currentColor"/></svg>'
};
const SOCIALS = `
  <a href="https://www.instagram.com/ridgelinefarms_/" target="_blank" rel="noopener" aria-label="Instagram">${SVGI.ig}</a>
  <a href="https://www.leafly.com/brands/ridgeline-farms" target="_blank" rel="noopener" aria-label="Leafly">${SVGI.li}</a>`;
$$('.socials-mini').forEach(el => el.innerHTML = SOCIALS);

/* ---------- nav: scroll state + burger ---------- */
const nav = $('#nav');
if (nav) addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });
const burger = $('#burger'), navLinks = $('#navLinks');
if (burger) {
  burger.onclick = () => { burger.classList.toggle('x'); navLinks.classList.toggle('open'); document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : ''; };
  $$('#navLinks a').forEach(a => a.onclick = () => { burger.classList.remove('x'); navLinks.classList.remove('open'); document.body.style.overflow = ''; });
}

/* ---------- year ---------- */
$$('.yr').forEach(el => el.textContent = new Date().getFullYear());

/* ---------- reveal + count-up ---------- */
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));
const cio = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; cio.unobserve(en.target);
  const el = en.target, end = +el.dataset.count, suf = el.dataset.suffix || '', dec = el.dataset.dec ? +el.dataset.dec : 0;
  let t0; const st = t => { t0 ??= t; const p = Math.min((t - t0) / 1400, 1); const v = end * (1 - Math.pow(1 - p, 3)); el.textContent = v.toFixed(dec) + suf; if (p < 1) requestAnimationFrame(st); };
  requestAnimationFrame(st);
}), { threshold: .6 });
$$('[data-count]').forEach(el => cio.observe(el));

/* ---------- tilt ---------- */
if (matchMedia('(hover:hover)').matches && !RM) $$('[data-tilt]').forEach(t => {
  t.addEventListener('pointermove', e => {
    const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    t.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  });
  t.addEventListener('pointerleave', () => t.style.transform = '');
});

/* ============================================================
   HERO — generative ridgelines, sun rays, starfield, parallax
   ============================================================ */
(() => {
  const stars = $('#heroStars'), rays = $('#heroRays'), ridges = $('#heroRidges'), photo = $('#heroPhoto');
  if (photo && photo.dataset.img) photo.style.backgroundImage = `url(${photo.dataset.img})`;

  if (stars) {
    let s = '';
    for (let i = 0; i < 70; i++) {
      const x = rnd(0, 100), y = rnd(0, 96), r = rnd(.4, 1.6), o = rnd(.25, .95);
      s += `<circle cx="${x}%" cy="${y}%" r="${r}" fill="#fff" opacity="${o}">${RM ? '' : `<animate attributeName="opacity" values="${o};${o * .15};${o}" dur="${rnd(2.4, 6)}s" repeatCount="indefinite"/>`}</circle>`;
    }
    stars.innerHTML = s;
  }

  if (rays) {
    rays.setAttribute('viewBox', '0 0 100 100');
    let g = '';
    for (let a = 0; a < 360; a += 12) {
      const w = 2.4, r1 = (a * Math.PI) / 180, r2 = ((a + w) * Math.PI) / 180, L = 80;
      const x1 = 50 + Math.cos(r1) * L, y1 = 50 + Math.sin(r1) * L;
      const x2 = 50 + Math.cos(r2) * L, y2 = 50 + Math.sin(r2) * L;
      g += `<polygon points="50,50 ${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}" fill="rgba(247,193,110,${rnd(.05, .16).toFixed(2)})"/>`;
    }
    rays.innerHTML = g;
  }

  /* procedural ridge silhouette */
  function ridgePath(base, amp, rough, W = 1440, H = 460) {
    let d = `M0,${H} L0,${base}`;
    let x = 0, y = base;
    while (x < W) {
      const step = rnd(60, 130);
      x = Math.min(W, x + step);
      y = Math.max(28, Math.min(H - 20, base + rnd(-amp, amp) - Math.sin(x / W * Math.PI) * rough));
      d += ` L${x.toFixed(0)},${y.toFixed(0)}`;
    }
    d += ` L${W},${H} Z`;
    return d;
  }
  if (ridges) {
    const layers = [
      { base: 250, amp: 46, rough: 60, fill: '#3a4738', op: .9 },
      { base: 300, amp: 60, rough: 90, fill: '#2c3722', op: 1 },
      { base: 350, amp: 70, rough: 40, fill: '#1d2515', op: 1 },
      { base: 400, amp: 46, rough: 20, fill: '#12150c', op: 1 }
    ];
    ridges.innerHTML = layers.map((l, i) =>
      `<svg class="ridge ridge-${i + 1}" data-depth="${(i + 1) * 0.14}" viewBox="0 0 1440 460" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path d="${ridgePath(l.base, l.amp, l.rough)}" fill="${l.fill}" opacity="${l.op}"/></svg>`).join('');
  }

  /* parallax on scroll */
  if (!RM) {
    const sun = $('.hero-sun'), sun2 = $('.hero-rays'), inner = $('.hero-inner');
    const rls = $$('#heroRidges .ridge');
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        if (y < innerHeight) {
          rls.forEach(r => { const d = +r.dataset.depth; r.style.transform = `translateY(${y * d}px)`; });
          if (sun) sun.style.transform = `translate(-50%,calc(-50% + ${y * .18}px))`;
          if (sun2) sun2.style.transform = `translate(-50%,calc(-50% + ${y * .12}px))`;
          if (inner) inner.style.transform = `translateY(${y * -0.06}px)`;
          if (stars) stars.style.transform = `translateY(${y * .3}px)`;
        }
        ticking = false;
      });
    }, { passive: true });
  }
})();

/* section parallax images */
if (!RM) {
  const pio = $$('[data-parallax]');
  if (pio.length) addEventListener('scroll', () => {
    const vh = innerHeight;
    pio.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translateY(${p * (+el.dataset.parallax || 30)}px)`;
    });
  }, { passive: true });
}

/* ---------- ticker ---------- */
if ($('#ticker')) {
  const words = ['Sun-Grown', 'Southern Humboldt', 'Emerald Cup Champions', 'Family Farm', 'Second Generation', 'Quality Over Quantity', 'Living Soil'];
  const line = words.map(w => `<span>${w}</span>`).join('');
  $('#ticker').innerHTML = line + line;
}

/* ============================================================
   PRODUCT MODAL (shared)
   ============================================================ */
const modal = $('#modal');
function openModal({ img, title, tags, rows, desc, cta }) {
  if (!modal) return;
  $('#mImg').src = IMG[img]; $('#mImg').alt = title;
  $('#mTitle').textContent = title;
  $('#mTags').innerHTML = (tags || []).map(t => `<span class="modal-tag${t.solid ? ' solid' : ''}">${t.label}</span>`).join('');
  $('#mRows').innerHTML = rows || '';
  $('#mDesc').innerHTML = desc || '';
  $('#mCta').innerHTML = cta || '';
  modal.hidden = false; document.body.style.overflow = 'hidden';
  const x = $('.modal-x', modal); if (x) x.focus();
}
function closeModal() { if (modal) { modal.hidden = true; document.body.style.overflow = ''; } }
if (modal) {
  modal.addEventListener('click', e => { if (e.target.dataset.close !== undefined) closeModal(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
}
function openStrainModal(s) {
  openModal({
    img: s.img, title: s.n,
    tags: [{ label: s.t }, ...(s.award ? [{ label: '★ ' + s.award, solid: true }] : [])],
    rows: `<div><b>Lineage:</b> ${s.g}</div><div><b>Flavor:</b> ${s.f}</div><div><b>Potency:</b> ${s.potency}</div><div class="eff">✦ ${s.e}</div>`,
    desc: `<p class="modal-desc">${s.d}</p>`,
    cta: `<a class="btn olive" href="media.html#gallery" data-close><span>See it grown</span></a>
          <a class="btn ghost" href="contact.html#find" data-close>Where to buy</a>`
  });
}

/* ============================================================
   STRAIN VAULT — 3D coverflow
   ============================================================ */
if ($('#cfStage')) (() => {
  const stage = $('#cfStage'), info = $('#cfInfo'), cfEmpty = $('#cfEmpty'), coverflow = $('#coverflow');
  let view = [], cards = [], active = 0, fType = 'all', query = '';
  const matches = s => {
    const typeOk = fType === 'all' || (fType === 'feat' ? s.feat : s.t === fType);
    if (!typeOk) return false;
    const q = query.trim().toLowerCase();
    return !q || (s.n + ' ' + s.g + ' ' + s.f + ' ' + s.e + ' ' + s.t).toLowerCase().includes(q);
  };
  function build() {
    view = STRAINS.filter(matches); active = Math.min(active, Math.max(0, view.length - 1));
    if (cfEmpty) cfEmpty.hidden = view.length > 0;
    stage.innerHTML = view.map((s, i) => `
      <article class="cf-card" data-i="${i}">
        <img loading="lazy" src="${IMG[s.img]}" alt="${s.n}">
        <span class="cf-badge">${s.t}</span>${s.feat ? '<span class="cf-star">★</span>' : ''}
        <span class="cf-name">${s.n}</span>
      </article>`).join('');
    cards = $$('.cf-card', stage);
    cards.forEach(c => c.addEventListener('click', () => { const i = +c.dataset.i; if (i !== active) { active = i; layout(); } else openStrainModal(view[i]); }));
    const grid = $('#grid');
    if (grid) {
      grid.innerHTML = view.map((s, i) => `<button class="gtile" data-i="${i}"><img loading="lazy" src="${IMG[s.img]}" alt="${s.n}"><span class="gt-name">${s.n}</span></button>`).join('');
      $$('.gtile', grid).forEach(g => g.addEventListener('click', () => { active = +g.dataset.i; layout(); coverflow.scrollIntoView({ behavior: 'smooth', block: 'center' }); }));
    }
    if ($('#cAll')) $('#cAll').textContent = view.length;
    layout();
  }
  function layout() {
    active = Math.max(0, Math.min(active, view.length - 1));
    const spread = Math.min(innerWidth * 0.30, 320);
    cards.forEach((card, i) => {
      const off = i - active, abs = Math.abs(off), sign = Math.sign(off);
      card.style.transform = `translate(-50%,-50%) translateX(${off * spread}px) translateZ(${-abs * 260}px) rotateY(${-sign * Math.min(abs, 3) * 42}deg) scale(${Math.max(.6, 1 - abs * .12)})`;
      card.style.opacity = abs > 3 ? 0 : 1 - abs * .14;
      card.style.zIndex = 100 - abs;
      card.style.pointerEvents = abs > 3 ? 'none' : 'auto';
      card.classList.toggle('active', off === 0);
    });
    const total = view.length;
    if ($('#cfCount')) $('#cfCount').innerHTML = total ? `<b>${String(active + 1).padStart(2, '0')}</b> / ${total}` : '0';
    if ($('#cfBar')) $('#cfBar').style.width = total ? `${((active + 1) / total) * 100}%` : '0';
    $$('#grid .gtile').forEach((g, i) => g.classList.toggle('on', i === active));
    const s = view[active];
    if (s && info) {
      info.innerHTML = `
        <div class="ci-top"><span class="ci-type">${s.t}</span>${s.award ? `<span class="ci-award">${s.award}</span>` : ''}</div>
        <h3>${s.n}</h3>
        <div class="ci-lin">${s.g}</div>
        <p class="ci-desc">${s.d}</p>
        <div class="ci-tags"><span class="t">${s.f}</span><span class="t">${s.potency}</span><span class="t">✦ ${s.e}</span></div>
        <button class="btn olive" data-view><span>Full profile</span></button>`;
      info.classList.remove('swap'); void info.offsetWidth; info.classList.add('swap');
      const v = $('[data-view]', info); if (v) v.onclick = () => openStrainModal(s);
    } else if (info) info.innerHTML = '';
  }
  const move = d => { active += d; layout(); };
  $('#cfPrev').onclick = () => move(-1);
  $('#cfNext').onclick = () => move(1);
  let inView = false;
  new IntersectionObserver(es => es.forEach(e => inView = e.isIntersecting), { threshold: .25 }).observe(coverflow);
  addEventListener('keydown', e => {
    if (!inView || /input|textarea/i.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowLeft') move(-1); else if (e.key === 'ArrowRight') move(1);
  });
  let dragX = null;
  coverflow.addEventListener('pointerdown', e => dragX = e.clientX);
  addEventListener('pointerup', e => { if (dragX === null) return; const dx = e.clientX - dragX; dragX = null; if (Math.abs(dx) > 55) move(dx < 0 ? 1 : -1); });
  let wheelLock = false;
  coverflow.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) { e.preventDefault(); if (!wheelLock) { move(e.deltaX > 0 ? 1 : -1); wheelLock = true; setTimeout(() => wheelLock = false, 240); } }
  }, { passive: false });
  const filters = $('#filters');
  if (filters) filters.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', filters).forEach(c => c.classList.remove('active')); b.classList.add('active'); fType = b.dataset.f; active = 0; build(); });
  const search = $('#search'), clr = $('#searchClear');
  if (search) {
    let deb;
    search.addEventListener('input', () => { query = search.value; if (clr) clr.hidden = !query; clearTimeout(deb); deb = setTimeout(() => { active = 0; build(); }, 110); });
    if (clr) clr.onclick = () => { search.value = ''; query = ''; clr.hidden = true; active = 0; build(); search.focus(); };
  }
  const gwrap = $('#gwrap'), toggle = $('#gridToggle');
  if (toggle) toggle.onclick = () => { const open = gwrap.hidden; gwrap.hidden = !open; toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); toggle.querySelector('span').textContent = open ? 'Hide grid' : 'Browse all as grid'; };
  addEventListener('resize', layout, { passive: true });
  build();
})();

/* home mini-vault preview: render feature strain tiles */
if ($('#strainPreview')) {
  const feat = STRAINS.filter(s => s.feat).slice(0, 3);
  $('#strainPreview').innerHTML = feat.map(s => `
    <button class="gtile" data-n="${s.n}" style="aspect-ratio:3/4">
      <img loading="lazy" src="${IMG[s.img]}" alt="${s.n}">
      <span class="gt-name">${s.n}</span>
    </button>`).join('');
  $$('#strainPreview .gtile').forEach(g => g.onclick = () => openStrainModal(STRAINS.find(s => s.n === g.dataset.n)));
}

/* ============================================================
   AWARDS render
   ============================================================ */
if ($('#awards')) {
  const medal = '<svg class="award-medal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="9" r="6"/><path d="M9 14.5 7 22l5-3 5 3-2-7.5"/><path d="M12 6.5 13 8.6l2.3.3-1.6 1.6.4 2.3-2.1-1.1-2.1 1.1.4-2.3-1.6-1.6 2.3-.3z" fill="currentColor" stroke="none"/></svg>';
  $('#awards').innerHTML = AWARDS.map(a => `
    <div class="award-row reveal">
      <div class="award-yr">${a.yr}</div>
      <div class="award-body"><h3>${a.title}</h3><span>${a.org}</span><p>${a.note}</p></div>
      ${medal}
    </div>`).join('');
  $$('#awards .reveal').forEach(el => io.observe(el));
}

/* PRESS render */
if ($('#pressStrip')) $('#pressStrip').innerHTML = OUTLETS.map(o => `<span>${o}</span>`).join('');
if ($('#pressGrid')) $('#pressGrid').innerHTML = PRESS.map(p => `
  <div class="press-card reveal"><div class="q">“${p.quote}”</div><div class="src">${p.outlet}</div><div class="by">— ${p.by}</div></div>`).join('') , $$('#pressGrid .reveal').forEach(el => io.observe(el));

/* GROW render */
if ($('#growGrid')) {
  const ICO = {
    'Sun-Grown': '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    'Living Soil': '<path d="M12 2c1.5 3 4 4 4 7a4 4 0 0 1-8 0c0-3 2.5-4 4-7Z"/><path d="M4 20h16M7 20c0-2 2-3 5-3s5 1 5 3"/>',
    'Stewardship': '<path d="M12 21c-4-2-7-5-7-9a7 7 0 0 1 14 0c0 4-3 7-7 9Z"/><path d="M12 8v6M9 11h6"/>',
    'Legacy': '<path d="M12 3 4 7v6c0 4 3.5 6.5 8 8 4.5-1.5 8-4 8-8V7Z"/><path d="M9 12l2 2 4-4"/>'
  };
  $('#growGrid').innerHTML = GROW.map((g, i) => `
    <div class="grow-card reveal d${i}">
      <div class="grow-ico"><svg viewBox="0 0 24 24">${ICO[g.k] || ''}</svg></div>
      <span class="k">${g.k}</span><h3>${g.t}</h3><p>${g.d}</p>
    </div>`).join('');
  $$('#growGrid .reveal').forEach(el => io.observe(el));
}

/* GALLERY render */
if ($('#galleryGrid')) {
  $('#galleryGrid').innerHTML = GALLERY.map(g => `
    <figure data-img="${g.img}"><img loading="lazy" src="${IMG[g.img]}" alt="${g.cap}"><figcaption>${g.cap}</figcaption></figure>`).join('');
  $$('#galleryGrid figure').forEach(f => f.onclick = () => {
    const g = GALLERY.find(x => x.img === f.dataset.img);
    openModal({ img: g.img, title: g.cap, tags: [{ label: 'Ridgeline Farms' }], rows: '', desc: `<p class="modal-desc">Southern Humboldt · sun-grown · owner-operated.</p>`,
      cta: `<a class="btn olive" href="strains.html" data-close><span>See the strains</span></a>` });
  });
}

/* ============================================================
   STORE LOCATOR — interactive California map
   ============================================================ */
if ($('#caPins') && typeof RETAILERS !== 'undefined') (() => {
  const CITY = {
    'Humboldt County, CA': { x: 60,  y: 66  },
    'Santa Rosa, CA':      { x: 74,  y: 150 },
    'Santa Cruz, CA':      { x: 96,  y: 196 },
    'Los Angeles, CA':     { x: 188, y: 322 }
  };
  const pinsEl = $('#caPins'), listEl = $('#locList');
  const cities = [...new Set(RETAILERS.map(r => r.city))];
  pinsEl.innerHTML = cities.map(c => {
    const p = CITY[c] || { x: 150, y: 200 };
    const short = c.split(',')[0];
    return `<g class="pin" data-city="${c}" transform="translate(${p.x},${p.y})">
      <circle class="halo" r="7"/><circle class="dot" r="6"/>
      <text class="lbl" x="12" y="4">${short}</text></g>`;
  }).join('');
  listEl.innerHTML = RETAILERS.map((r, i) => `
    <div class="loc-item" data-city="${r.city}">
      <span class="num">${String(i + 1).padStart(2, '0')}</span>
      <div><h4>${r.n}</h4><span>${r.city}</span></div>
      <span class="arw">→</span>
    </div>`).join('');
  const setActive = (city, on) => {
    $$(`.pin`, pinsEl).forEach(p => p.classList.toggle('active', on && p.dataset.city === city));
    $$('.loc-item', listEl).forEach(l => l.classList.toggle('active', on && l.dataset.city === city));
  };
  $$('.loc-item', listEl).forEach(l => {
    l.addEventListener('mouseenter', () => setActive(l.dataset.city, true));
    l.addEventListener('mouseleave', () => setActive(l.dataset.city, false));
  });
  $$('.pin', pinsEl).forEach(p => {
    p.addEventListener('mouseenter', () => setActive(p.dataset.city, true));
    p.addEventListener('mouseleave', () => setActive(p.dataset.city, false));
  });
})();

/* ---------- forms (demo) ---------- */
$$('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const btn = f.querySelector('[type=submit]');
  if (btn) { const t = btn.querySelector('span') || btn; const o = t.textContent; t.textContent = '✓ Thank you'; btn.disabled = true; setTimeout(() => { t.textContent = o; btn.disabled = false; f.reset(); }, 2600); }
}));

/* ---------- cookie consent ---------- */
(() => {
  if (localStorage.getItem('rl-cookie')) return;
  const bar = document.createElement('div');
  bar.className = 'cookie';
  bar.innerHTML = `<p>We use cookies to enhance your experience. See our <a href="cookies.html">Cookie Policy</a>.</p>
    <div class="cookie-btns"><button class="btn olive" data-c="all"><span>Accept</span></button>
    <button class="btn ghost" data-c="necessary">Necessary</button></div>`;
  document.body.appendChild(bar);
  requestAnimationFrame(() => bar.classList.add('show'));
  bar.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; localStorage.setItem('rl-cookie', b.dataset.c); bar.classList.remove('show'); setTimeout(() => bar.remove(), 500); });
})();

/* ---------- age gate ---------- */
const gate = $('#ageGate');
if (gate) {
  const bg = $('.bg-ridge', gate);
  if (bg) bg.innerHTML = `<svg viewBox="0 0 1440 460" preserveAspectRatio="xMidYMax slice" style="position:absolute;bottom:0;width:100%">
    <path d="M0,460 L0,300 L180,210 L320,270 L520,180 L700,260 L900,190 L1120,250 L1320,200 L1440,240 L1440,460 Z" fill="#1d2515"/>
    <path d="M0,460 L0,360 L200,300 L400,350 L600,300 L820,360 L1040,310 L1260,350 L1440,320 L1440,460 Z" fill="#12150c"/></svg>`;
  if (sessionStorage.getItem('rl-age') === '1') gate.classList.add('hide');
  $('#ageYes').onclick = () => { sessionStorage.setItem('rl-age', '1'); gate.classList.add('hide'); };
}

/* ============================================================
   RIDGELINE FARMS — monochrome engine (page-aware)
   ============================================================ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOUCH = matchMedia('(hover:none)').matches || innerWidth < 900;

/* ---------- brand mark: line-art ridgeline + sun ---------- */
const MARK = `<svg viewBox="0 0 120 42" aria-hidden="true">
  <circle cx="92" cy="11" r="4" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M1 34 L20 16 L32 25 L50 8 L64 22 L80 12 L104 30 L119 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
</svg>`;
$$('.mark').forEach(m => { if (!m.dataset.filled) { m.innerHTML = MARK; m.dataset.filled = 1; } });

/* ---------- overlays: grain + vignette ---------- */
['grain', 'vignette'].forEach(c => { const d = document.createElement('div'); d.className = c; document.body.appendChild(d); });

/* ---------- custom cursor ---------- */
if (!TOUCH && !RM) {
  const ring = document.createElement('div'); ring.className = 'cursor'; ring.innerHTML = '<span class="clabel"></span>';
  const dot = document.createElement('div'); dot.className = 'cursor-dot';
  document.body.append(ring, dot);
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; }, { passive: true });
  (function loop() { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
  const GROW = 'a,button,input,textarea,.cf-card,.gtile,.loc-item,.pin,.gallery figure,.video-feature,.chip,.cf-nav,[data-cursor]';
  addEventListener('pointerover', e => { const t = e.target.closest(GROW); if (t) { ring.classList.add('grow'); ring.querySelector('.clabel').textContent = t.dataset.cursor || ''; } });
  addEventListener('pointerout', e => { if (e.target.closest(GROW) && !e.relatedTarget?.closest?.(GROW)) ring.classList.remove('grow'); });
  document.addEventListener('mouseleave', () => { ring.classList.add('hide'); dot.classList.add('hide'); });
  document.addEventListener('mouseenter', () => { ring.classList.remove('hide'); dot.classList.remove('hide'); });
}

/* ---------- loader (homepage) ---------- */
const loader = $('#loader');
if (loader) {
  const done = () => loader.classList.add('done');
  if (RM) done(); else { addEventListener('load', () => setTimeout(done, 1500)); setTimeout(done, 3200); }
}

/* ---------- social icons ---------- */
const SVGI = {
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3s-2.3 1.57-2.3 3.2V21H9z"/></svg>'
};
$$('.socials-mini').forEach(el => el.innerHTML =
  `<a href="https://www.instagram.com/ridgelinefarms_/" target="_blank" rel="noopener" aria-label="Instagram">${SVGI.ig}</a>
   <a href="https://www.leafly.com/brands/ridgeline-farms" target="_blank" rel="noopener" aria-label="Leafly">${SVGI.li}</a>`);

/* ---------- nav ---------- */
const nav = $('#nav');
if (nav) addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });
const burger = $('#burger'), navLinks = $('#navLinks');
if (burger) {
  burger.onclick = () => { burger.classList.toggle('x'); navLinks.classList.toggle('open'); document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : ''; };
  $$('#navLinks a').forEach(a => a.onclick = () => { burger.classList.remove('x'); navLinks.classList.remove('open'); document.body.style.overflow = ''; });
}

/* ---------- year ---------- */
$$('.yr').forEach(el => el.textContent = new Date().getFullYear());

/* ---------- reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .14 });
const observe = () => $$('.reveal:not(.in), .rmask:not(.in), .story-media:not(.in)').forEach(el => io.observe(el));
observe();

/* ============================================================
   HERO — line-art layered ridgelines (draw + parallax)
   ============================================================ */
(() => {
  const ridges = $('#heroRidges'), photo = $('#heroPhoto');
  if (photo && photo.dataset.img) photo.style.backgroundImage = `url(${photo.dataset.img})`;
  if (!ridges) return;
  function ridgePath(base, amp, W = 1440, H = 420) {
    let x = 0, y = base, d = `M0,${y.toFixed(0)}`;
    while (x < W) { x = Math.min(W, x + rnd(70, 140)); y = Math.max(40, Math.min(H - 20, base + rnd(-amp, amp))); d += ` L${x.toFixed(0)},${y.toFixed(0)}`; }
    return d;
  }
  const layers = [
    { base: 250, amp: 44, op: .18, depth: .05, fill: false },
    { base: 300, amp: 58, op: .30, depth: .09, fill: false },
    { base: 350, amp: 46, op: .5,  depth: .14, fill: false },
    { base: 392, amp: 30, op: .8,  depth: .2,  fill: true }
  ];
  ridges.innerHTML = layers.map((l, i) => {
    const line = ridgePath(l.base, l.amp);
    const area = l.fill ? `<path d="${line} L1440,420 L0,420 Z" fill="var(--black)"/>` : '';
    return `<div class="ridge" data-depth="${l.depth}"><svg viewBox="0 0 1440 420" preserveAspectRatio="none" aria-hidden="true">
      ${area}<path class="lp" d="${line}" style="opacity:${l.op}"/></svg></div>`;
  }).join('');
  // draw-in
  if (!RM) $$('#heroRidges .lp').forEach((p, i) => {
    const len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
    p.style.transition = `stroke-dashoffset 1.8s ${.2 + i * .12}s cubic-bezier(.19,1,.22,1)`;
    requestAnimationFrame(() => requestAnimationFrame(() => p.style.strokeDashoffset = 0));
  });
  // parallax
  if (!RM) {
    const rls = $$('#heroRidges .ridge'), inner = $('.hero-inner'); let tick = false;
    addEventListener('scroll', () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => {
        const y = scrollY; if (y < innerHeight) { rls.forEach(r => r.style.transform = `translateY(${y * +r.dataset.depth}px)`); if (inner) inner.style.transform = `translateY(${y * -.05}px)`; if (photo) photo.style.transform = `scale(1.05) translateY(${y * .04}px)`; }
        tick = false;
      });
    }, { passive: true });
  }
})();

/* ---------- ticker ---------- */
if ($('#ticker')) {
  const words = ['Sun-Grown', 'Southern Humboldt', 'Emerald Cup Champions', 'Family Farm', 'Second Generation', 'Quality Over Quantity', 'Living Soil'];
  const line = words.map(w => `<span>${w}</span>`).join('');
  $('#ticker').innerHTML = line + line;
}

/* ---------- hero typewriter ---------- */
(() => {
  const el = $('#heroType'); if (!el) return;
  const words = ['Sun-Grown in Southern Humboldt', 'Two-Time Emerald Cup Champions', 'A Second-Generation Family Farm', 'Quality Over Quantity — Always'];
  if (RM) { el.textContent = words[0]; return; }
  let wi = 0, ci = 0, del = false;
  (function tick() {
    const w = words[wi];
    el.textContent = w.slice(0, ci);
    if (!del) {
      if (ci < w.length) { ci++; setTimeout(tick, 52 + Math.random() * 46); }
      else { del = true; setTimeout(tick, 1800); }
    } else {
      if (ci > 0) { ci--; setTimeout(tick, 26); }
      else { del = false; wi = (wi + 1) % words.length; setTimeout(tick, 320); }
    }
  })();
})();

/* ============================================================
   MODAL
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
    tags: [{ label: s.t }, ...(s.award ? [{ label: s.award, solid: true }] : [])],
    rows: `<div><b>Lineage</b> — ${s.g}</div><div><b>Flavor</b> — ${s.f}</div><div><b>Potency</b> — ${s.potency}</div><div class="eff">${s.e}</div>`,
    desc: `<p class="modal-desc">${s.d}</p>`,
    cta: `<a class="btn light" href="media.html#gallery" data-close><span>See it grown</span></a>
          <a class="btn ghost" href="contact.html#find" data-close><span>Where to buy</span></a>`
  });
}

/* ============================================================
   STRAIN VAULT — coverflow
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
      <article class="cf-card" data-i="${i}" data-cursor="View">
        <img loading="lazy" src="${IMG[s.img]}" alt="${s.n}">
        <span class="cf-badge">${s.t}</span>${s.feat ? '<span class="cf-star"></span>' : ''}
        <span class="cf-name">${s.n}</span>
      </article>`).join('');
    cards = $$('.cf-card', stage);
    cards.forEach(c => c.addEventListener('click', () => { const i = +c.dataset.i; if (i !== active) { active = i; layout(); } else openStrainModal(view[i]); }));
    const grid = $('#grid');
    if (grid) {
      grid.innerHTML = view.map((s, i) => `<button class="gtile" data-i="${i}" data-cursor="View"><img loading="lazy" src="${IMG[s.img]}" alt="${s.n}"><span class="gt-name">${s.n}</span></button>`).join('');
      $$('.gtile', grid).forEach(g => g.addEventListener('click', () => { active = +g.dataset.i; layout(); coverflow.scrollIntoView({ behavior: 'smooth', block: 'center' }); }));
    }
    if ($('#cAll')) $('#cAll').textContent = view.length;
    layout();
  }
  function layout() {
    active = Math.max(0, Math.min(active, view.length - 1));
    const spread = Math.min(innerWidth * 0.28, 300);
    cards.forEach((card, i) => {
      const off = i - active, abs = Math.abs(off), sign = Math.sign(off);
      card.style.transform = `translate(-50%,-50%) translateX(${off * spread}px) translateZ(${-abs * 260}px) rotateY(${-sign * Math.min(abs, 3) * 40}deg) scale(${Math.max(.62, 1 - abs * .12)})`;
      card.style.opacity = abs > 3 ? 0 : 1 - abs * .16;
      card.style.zIndex = 100 - abs;
      card.style.pointerEvents = abs > 3 ? 'none' : 'auto';
      card.classList.toggle('active', off === 0);
    });
    const total = view.length;
    if ($('#cfCount')) $('#cfCount').innerHTML = total ? `<b>${String(active + 1).padStart(2, '0')}</b> / ${String(total).padStart(2, '0')}` : '—';
    if ($('#cfBar')) $('#cfBar').style.width = total ? `${((active + 1) / total) * 100}%` : '0';
    $$('#grid .gtile').forEach((g, i) => g.classList.toggle('on', i === active));
    const s = view[active];
    if (s && info) {
      info.innerHTML = `
        <div class="ci-top"><span class="ci-type">${s.t}</span>${s.award ? `<span class="ci-award">${s.award}</span>` : ''}</div>
        <h3>${s.n}</h3>
        <div class="ci-lin">${s.g}</div>
        <p class="ci-desc">${s.d}</p>
        <div class="ci-tags"><span class="t">${s.f}</span><span class="t">${s.potency}</span><span class="t">${s.e}</span></div>
        <button class="btn" data-view><span>Full profile</span></button>`;
      info.classList.remove('swap'); void info.offsetWidth; info.classList.add('swap');
      const v = $('[data-view]', info); if (v) v.onclick = () => openStrainModal(s);
    } else if (info) info.innerHTML = '';
  }
  const move = d => { active += d; layout(); };
  $('#cfPrev').onclick = () => move(-1);
  $('#cfNext').onclick = () => move(1);
  let inView = false;
  new IntersectionObserver(es => es.forEach(e => inView = e.isIntersecting), { threshold: .25 }).observe(coverflow);
  addEventListener('keydown', e => { if (!inView || /input|textarea/i.test(document.activeElement.tagName)) return; if (e.key === 'ArrowLeft') move(-1); else if (e.key === 'ArrowRight') move(1); });
  let dragX = null;
  coverflow.addEventListener('pointerdown', e => dragX = e.clientX);
  addEventListener('pointerup', e => { if (dragX === null) return; const dx = e.clientX - dragX; dragX = null; if (Math.abs(dx) > 55) move(dx < 0 ? 1 : -1); });
  let wheelLock = false;
  coverflow.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) { e.preventDefault(); if (!wheelLock) { move(e.deltaX > 0 ? 1 : -1); wheelLock = true; setTimeout(() => wheelLock = false, 240); } } }, { passive: false });
  const filters = $('#filters');
  if (filters) filters.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', filters).forEach(c => c.classList.remove('active')); b.classList.add('active'); fType = b.dataset.f; active = 0; build(); });
  const search = $('#search'), clr = $('#searchClear');
  if (search) { let deb; search.addEventListener('input', () => { query = search.value; if (clr) clr.hidden = !query; clearTimeout(deb); deb = setTimeout(() => { active = 0; build(); }, 110); }); if (clr) clr.onclick = () => { search.value = ''; query = ''; clr.hidden = true; active = 0; build(); search.focus(); }; }
  const gwrap = $('#gwrap'), toggle = $('#gridToggle');
  if (toggle) toggle.onclick = () => { const open = gwrap.hidden; gwrap.hidden = !open; toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); toggle.querySelector('span').textContent = open ? 'Hide grid' : 'Browse all as grid'; };
  addEventListener('resize', layout, { passive: true });
  build();
})();

/* home feature preview */
if ($('#strainPreview')) {
  const feat = STRAINS.filter(s => s.feat).slice(0, 3);
  $('#strainPreview').innerHTML = feat.map(s => `<button class="gtile" data-n="${s.n}" data-cursor="View"><img loading="lazy" src="${IMG[s.img]}" alt="${s.n}"><span class="gt-name">${s.n}</span></button>`).join('');
  $$('#strainPreview .gtile').forEach(g => g.onclick = () => openStrainModal(STRAINS.find(s => s.n === g.dataset.n)));
}

/* ---------- awards ---------- */
if ($('#awards')) {
  const medal = '<svg class="award-medal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="9" r="6"/><path d="M9 14.5 7 22l5-3 5 3-2-7.5"/></svg>';
  $('#awards').innerHTML = AWARDS.map(a => `
    <div class="award-row reveal"><div class="award-yr">${a.yr}</div>
      <div class="award-body"><h3>${a.title}</h3><span>${a.org}</span><p>${a.note}</p></div>${medal}</div>`).join('');
  observe();
}

/* ---------- press ---------- */
if ($('#pressStrip')) $('#pressStrip').innerHTML = OUTLETS.map(o => `<span>${o}</span>`).join('');
if ($('#pressGrid')) { $('#pressGrid').innerHTML = PRESS.map(p => `<div class="press-card reveal"><div class="q">“${p.quote}”</div><div class="src">${p.outlet}</div><div class="by">— ${p.by}</div></div>`).join(''); observe(); }

/* ---------- grow ---------- */
if ($('#growGrid')) {
  const ICO = {
    'Sun-Grown': '<circle cx="19" cy="12" r="5"/><path d="M19 3v3M19 18v3M28 12h3M7 12h3M25.4 5.6l-2.1 2.1M14.7 16.3l-2.1 2.1"/>',
    'Living Soil': '<path d="M19 4c2 4 5 5 5 9a5 5 0 0 1-10 0c0-4 3-5 5-9Z"/><path d="M6 34h26"/>',
    'Stewardship': '<path d="M19 33c-6-3-10-7-10-13a10 10 0 0 1 20 0c0 6-4 10-10 13Z"/>',
    'Legacy': '<path d="M19 4 6 10v8c0 6 5 9 13 12 8-3 13-6 13-12v-8Z"/>'
  };
  $('#growGrid').innerHTML = GROW.map((g, i) => `
    <div class="grow-card reveal d${i}">
      <div class="grow-ico"><svg viewBox="0 0 38 38">${ICO[g.k] || ''}</svg></div>
      <span class="k">${String(i + 1).padStart(2, '0')} — ${g.k}</span><h3>${g.t}</h3><p>${g.d}</p></div>`).join('');
  observe();
}

/* ---------- gallery ---------- */
if ($('#galleryGrid')) {
  $('#galleryGrid').innerHTML = GALLERY.map(g => `<figure data-img="${g.img}" data-cursor="View"><img loading="lazy" src="${IMG[g.img]}" alt="${g.cap}"><figcaption>${g.cap}</figcaption></figure>`).join('');
  $$('#galleryGrid figure').forEach(f => f.onclick = () => { const g = GALLERY.find(x => x.img === f.dataset.img);
    openModal({ img: g.img, title: g.cap, tags: [{ label: 'Ridgeline Farms', solid: true }], rows: '', desc: `<p class="modal-desc">Southern Humboldt · sun-grown · owner-operated.</p>`, cta: `<a class="btn light" href="strains.html" data-close><span>See the strains</span></a>` }); });
}

/* ============================================================
   STORE LOCATOR
   ============================================================ */
if ($('#caPins') && typeof RETAILERS !== 'undefined') (() => {
  const CITY = {
    'Humboldt County, CA': { x: 60, y: 66 }, 'Santa Rosa, CA': { x: 74, y: 150 },
    'Santa Cruz, CA': { x: 96, y: 196 }, 'Los Angeles, CA': { x: 188, y: 322 }
  };
  const pinsEl = $('#caPins'), listEl = $('#locList');
  const cities = [...new Set(RETAILERS.map(r => r.city))];
  pinsEl.innerHTML = cities.map(c => { const p = CITY[c] || { x: 150, y: 200 }; const short = c.split(',')[0];
    return `<g class="pin" data-city="${c}" data-cursor="" transform="translate(${p.x},${p.y})"><circle class="halo" r="6"/><circle class="dot" r="4.5"/><text class="lbl" x="12" y="4">${short}</text></g>`; }).join('');
  listEl.innerHTML = RETAILERS.map((r, i) => `<div class="loc-item" data-city="${r.city}"><span class="num">${String(i + 1).padStart(2, '0')}</span><div><h4>${r.n}</h4><span>${r.city}</span></div><span class="arw">→</span></div>`).join('');
  const set = (city, on) => { $$('.pin', pinsEl).forEach(p => p.classList.toggle('active', on && p.dataset.city === city)); $$('.loc-item', listEl).forEach(l => l.classList.toggle('active', on && l.dataset.city === city)); };
  $$('.loc-item', listEl).forEach(l => { l.addEventListener('mouseenter', () => set(l.dataset.city, true)); l.addEventListener('mouseleave', () => set(l.dataset.city, false)); });
  $$('.pin', pinsEl).forEach(p => { p.addEventListener('mouseenter', () => set(p.dataset.city, true)); p.addEventListener('mouseleave', () => set(p.dataset.city, false)); });
})();

/* ---------- forms ---------- */
$$('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault(); const btn = f.querySelector('[type=submit]');
  if (btn) { const t = btn.querySelector('span') || btn; const o = t.textContent; t.textContent = 'Thank you'; btn.disabled = true; setTimeout(() => { t.textContent = o; btn.disabled = false; f.reset(); }, 2600); }
}));

/* ---------- cookie ---------- */
(() => {
  if (localStorage.getItem('rl-cookie')) return;
  const bar = document.createElement('div'); bar.className = 'cookie';
  bar.innerHTML = `<p>We use cookies to enhance your experience. See our <a href="cookies.html">Cookie Policy</a>.</p>
    <div class="cookie-btns"><button class="btn light" data-c="all"><span>Accept</span></button><button class="btn ghost" data-c="necessary"><span>Necessary</span></button></div>`;
  document.body.appendChild(bar); requestAnimationFrame(() => bar.classList.add('show'));
  bar.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; localStorage.setItem('rl-cookie', b.dataset.c); bar.classList.remove('show'); setTimeout(() => bar.remove(), 600); });
})();

/* ---------- age gate ---------- */
const gate = $('#ageGate');
if (gate) {
  const bg = $('.bg-ridge', gate);
  if (bg) bg.innerHTML = `<svg viewBox="0 0 1440 420" preserveAspectRatio="none" style="position:absolute;bottom:0;width:100%;height:60%">
    <path class="lp" d="M0,300 L180,210 L320,270 L520,170 L700,250 L900,180 L1120,240 L1320,190 L1440,230" style="opacity:.5"/>
    <path class="lp" d="M0,360 L220,300 L420,350 L640,290 L860,350 L1080,300 L1300,350 L1440,320" style="opacity:.8"/></svg>`;
  if (sessionStorage.getItem('rl-age') === '1') gate.classList.add('hide');
  $('#ageYes').onclick = () => { sessionStorage.setItem('rl-age', '1'); gate.classList.add('hide'); };
}

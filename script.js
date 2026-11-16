/* ==========================================================================
   Fanni & Gábor — privát esküvői meghívó
   Statikus oldal, nincs analitika, nincs cookie, nincs külső szolgáltatás
   – kivéve a saját Make.com webhookok (lásd lent), amelyeket TE adsz meg.
   ========================================================================== */

/* -------------------------------------------------------------------------
   1) ÜGYFÉLADATOK — elsősorban ezt a részt kell átírni egy új esküvőhöz
   ------------------------------------------------------------------------- */
const weddingConfig = {
  coupleNames: "Fanni & Gábor",
  weddingDateISO: "2027-09-10T15:00:00",        // visszaszámláló célideje (helyi idő)
  weddingDateDisplay: "2027. szeptember 10.",

  rsvpDeadlineISO: "2027-03-16T23:59:59",       // <--- FENTI SZEKCIÓ (pl. március 16.)
  rsvpDeadlineDisplay: "2027. március 16.",

  lodgingDeadlineISO: "2027-01-15T23:59:59",    // <--- UGO SZÁLLÁSVISSZAJELZLS DÁTUMA (január 15.)
  lodgingDeadlineDisplay: "2027. január 15.",

  venueName: "UGO Birtok",
  address: "9228 Halászi, Kőhídi utca 11",
  mapsUrl: "https://maps.app.goo.gl/MJSLYEREetqKAMKt9",
  phone: "+36 20 485-0832",
  email: "annaesbence@gmail.com",
  instagram: "@fannigabor",
  instagramUrl: "https://instagram.com/fannigabor",
  hashtag: "Fanni&Gábor Esküvő",

  // Helyszíni szállás (élő számláló)
  lodging: {
    total: 36,              // ennyi hellyel indul a számláló
    countChildren: true,    // true: a gyerekek is csökkentik a számlálót; false: csak a felnőttek
    lowThreshold: 8         // ennyi vagy kevesebb szabad helynél "Fogyóban" állapot
  }
};

/* Make.com webhook URL-ek. Üresen hagyva az oldal DEMÓ módban fut:
   az űrlapok "elküldöttnek" látszanak, de nem megy el semmi. */
const webhooks = {
  rsvp: "",       // visszajelzés (ott leszek / nem tudok jönni)
  /*music: "",      // zenei kérések* - nem kell*/
  upload: "",     // vendégfotók (fájlfeltöltés)
  message: "",    // vendégüzenetek
  lodging: ""     // helyszíni szállás: "status" (szabad helyek) + "book" (foglalás) – lásd README.md
};

/* Szekciók ki/be kapcsolása (false = a szekció és a menüpontja eltűnik) */
const sections = {
  countdown: true,
  schedule: true,
  venue: true,
  information: true,
  gallery: true,
  rsvp: true,
  accommodation: true,
  faq: true,
  musicRequests: true,
  hashtag: true,
  guestUpload: true,
  guestMessages: true,
  contact: true
};

/* -------------------------------------------------------------------------
   2) TARTALMAK
   ------------------------------------------------------------------------- */
const scheduleItems = [
  { time: "15:00", title: "Polgári szertartás", place: "Városháza, Díszterem", icon: "ring" },
  { time: "16:00", title: "Érkezés & Üdvözlő ital", place: "Kastély udvar", icon: "toast" },
  { time: "17:00", title: "Fotózás", place: "Kastélypark", icon: "camera" },
  { time: "19:00", title: "Vacsora", place: "", icon: "dinner" },
  { time: "21:00", title: "Nyitótánc & Party", place: "", icon: "dance" },
  { time: "02:00", title: "Zárás", place: "", icon: "music" }
];

const infoCards = [
  { icon: "dress", title: "Öltözet", text: "Elegáns, alkalomhoz illő öltözet, amelyben kényelmesen ünnepelhettek és táncolhattok velünk hajnalig." },
  { icon: "gift", title: "Ajándék", text: "Egy borítékba zárt ajándéknak örülnénk a legjobban, de számunkra a legnagyobb boldogság ha velünk ünnepeltek." },
  { icon: "kids", title: "Gyerekek", text: "Örülünk ha a család legkisebb tagjaival is együtt ünnepelhetünk, így szeretettel várjuk őket is a nagy napra!" },
  { icon: "parking", title: "Parkolás", text: "A helyszínen ingyenes parkolási lehetőség biztosított." },
  { icon: "bed", title: "Szállás", text: "A szállást önköltségen tudja mindenki igénybe venni. A helyszínen korlátozott számú férőhely áll rendelkezésre, de a közelben is tudunk további szállásokat ajánlani.", link: { href: "#accommodation", label: "Részletek lent" } },
  { icon: "phone", title: "Kapcsolat", text: "Kérdés esetén keressetek minket bizalommal az alábbi elérhetőségen:", phone: true }
];

/* Képek: a kép- és kisebb méretek a width/height attribútumhoz kellenek (nincs ugrálás betöltéskor) */
const galleryImages = [
  { src: "images/IMG_6260.webp",   w: 1400, h: 1400, alt: "A jegyespár összebújva a naplementés domboldalon" },
  { src: "images/IMG_6222.webp", w: 900,  h: 1302, alt: "Gyertyákkal és őszi virágokkal díszített hosszú asztal" },
  { src: "images/IMG_6219.webp",  w: 1300, h: 867,  alt: "A menyasszony a fák között, háttérben a vőlegénnyel" },
  { src: "images/IMG_6258.webp",     w: 768,  h: 1376, alt: "A jegyespár kéz a kézben a naplementében" },
  { src: "images/IMG_6214.webp", w: 1200, h: 800, alt: "Menyasszonyi ruha és virágmintás nyaklánc" },
  { src: "images/IMG_6320.webp",   w: 900,  h: 1070, alt: "Borostyánszínű üvegvázák vadvirágokkal" },
  { src: "images/IMG_6334.webp",        w: 1600, h: 1001, alt: "A Kastély Szálló esti díszkivilágításban" },
  { src: "images/IMG_6264.webp",         w: 1300, h: 863,  alt: "Összefonódó kezek jegygyűrűkkel és barackrózsa-csokorral" },
  { src: "images/IMG_6253.webp",  w: 1200, h: 675,  alt: "A menyasszony hajában selyemszalagot kötnek" }
];

const hashtagStrip = ["images/table-amber.webp", "images/IMG_6214.webp", "images/table-candles.webp", "images/IMG_6220.webp"];

/* Szálláshelyek adatai */
const hotels = [
  { name: "Regina Panzió & Étterem Halászi", distance: "1,5 km a helyszíntől", address: "9228 Halászi, Kossuth Lajos utca 122.", phone: "+36 20 312 8676",
    text: "", img: "images/regina.jpg", url: "https://www.regiapanzio.hu/", cta: "Weboldal" },
  { name: "Neuhercz Apartmanok - Halászi", distance: "1,2 km a helyszíntől", address: "9228 Halászi, Árpád utca 5", phone: " +36 20 252 9790",
    text: "", img: "images/neuhercz.jpg", url: "https://www.booking.com/Share-mJK57C", cta: "Weboldal" },
];

const faqItems = [
  { q: "Meddig kell visszajelezni?", a: "Kérjük, legkésőbb 2027. ......-ig jelezz vissza a Visszajelzés résznél, hogy tudjunk tervezni a vendéglátással és az ültetéssel." },
  { q: "Kaphatok plusz egy főt?", a: "Ha szeretnél kísérőt hozni, kérjük, előbb egyeztess velünk telefonon vagy e-mailben. Igyekszünk mindenkinek helyet szorítani." },
  { q: "Lesz vegetáriánus étel?", a: "Igen. A visszajelzésnél megadhatod az étkezési preferenciádat és az ételallergiádat, ennek megfelelően állítjuk össze a menüt." },
  { q: "Fotózhatok az esküvőn?", a: "Természetesen! A polgári szertartás alatt kérjük a telefonok csendben tartását, utána viszont bátran fotózz, és oszd meg velünk a kedvenc pillanataidat." },
  { q: "Lesz reggeli a szálláson?", a: "Ez szálláshelyenként eltér, ezért kérjük, a foglalásnál érdeklődj közvetlenül a szálláshelyen." },
  { q: "Van parkolási lehetőség?", a: "Igen, a helyszínen ingyenes parkolási lehetőség biztosított." },
  { q: "Mikor kezdődik a szertartás?", a: "A polgári szertartás 15:00-kor kezdődik a Városháza Dísztermében. Kérjük, érkezz legalább 15 perccel korábban." },
  { q: "Van lehetőség szállást foglalni?", a: "Igen. A Kastély Szállóban korlátozott számú helyet tartottunk fenn – a szabad helyeket a Szálláslehetőségek résznél élőben követheted –, emellett a közelben további szálláshelyeket is ajánlunk." }
];

/* Egységes, vonalas SVG ikonok (48×48) */
const svgIcon = (inner) =>
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const glass = '<path d="M-4.5-14h9l-.9 11a3.6 3.6 0 0 1-7.2 0z"/><path d="M0 .4V12M-4 12.6h8"/>';
const icons = {
  ring:    svgIcon('<circle cx="24" cy="30" r="10"/><path d="M19.5 14l2.8-5h3.4l2.8 5-4.5 6z"/><path d="M19.5 14h9"/><path d="M24 3v2.5M15.5 6.5l1.7 1.7M32.5 6.5l-1.7 1.7"/>'),
  toast:   svgIcon(`<g transform="translate(16.5 26) rotate(14)">${glass}</g><g transform="translate(31.5 26) rotate(-14)">${glass}</g><path d="M24 7V3.5M19 8.5l-2-2.2M29 8.5l2-2.2"/>`),
  camera:  svgIcon('<rect x="6" y="14" width="36" height="24" rx="4"/><path d="M16 14l2.5-5h11l2.5 5"/><circle cx="24" cy="26" r="7"/><circle cx="24" cy="26" r="3"/><circle cx="35.5" cy="19.5" r=".7"/>'),
  dinner:  svgIcon('<circle cx="24" cy="24" r="16"/><path d="M17 15v6M20 15v6M23 15v6"/><path d="M17 21q3 3.5 6 0"/><path d="M20 24.5V34"/><path d="M29.5 34V15c3 1.6 4.5 5 4.5 9h-4.5"/>'),
  dance:   svgIcon('<circle cx="18" cy="10" r="3.2"/><circle cx="31" cy="11" r="3.2"/><path d="M18 14.5c-2 4-4 10-7.5 23.5h20c-2-9-4-16-7-21"/><path d="M31 15.5v13l-3.5 10M31 28.5l4.5 10"/><path d="M31 19.5l-8 4.5"/>'),
  music:   svgIcon('<path d="M18 36V12l18-4v24"/><path d="M18 18l18-4"/><circle cx="13.5" cy="36" r="4.5"/><circle cx="31.5" cy="32" r="4.5"/>'),
  dress:   svgIcon('<path d="M17 7l-10 7 4.5 8 5.5-3.5V41h16V18.5l5.5 3.5 4.5-8-10-7"/><path d="M17 7c1.5 4 4 6 7 6s5.5-2 7-6"/><path d="M24 13l-2.8 4.5L24 21l2.8-3.5z"/><path d="M24 21l-3 11 3 4 3-4z"/>'),
  gift:    svgIcon('<rect x="6" y="19" width="36" height="8" rx="1.5"/><path d="M9 27v14h30V27"/><path d="M24 19v22"/><path d="M24 19c-3-8-12-8-10-3.5 1.2 2.6 6 3.5 10 3.5zM24 19c3-8 12-8 10-3.5-1.2 2.6-6 3.5-10 3.5z"/>'),
  kids:    svgIcon('<circle cx="15" cy="11" r="4"/><circle cx="33" cy="11" r="4"/><path d="M15 17v13M9 21l6-2 6 2M15 30l-3.5 11M15 30l3.5 11"/><path d="M33 17l-7.5 15h15z"/><path d="M29.5 32v9M36.5 32v9"/>'),
  parking: svgIcon('<rect x="8" y="8" width="32" height="32" rx="6"/><path d="M19 34V14h7.5a6 6 0 0 1 0 12H19"/>'),
  bed:     svgIcon('<path d="M7 42V24M7 35h34v7M41 35v-5a5 5 0 0 0-5-5H21v10"/><circle cx="14" cy="30" r="3.2"/><circle cx="24" cy="10" r="5"/><path d="M24 8.3v.1M24 11v3"/>'),
  phone:   svgIcon('<g transform="scale(2)"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2C9.6 20 4 14.4 4 7a2 2 0 0 1 1-3z" stroke-width="1.1"/></g>')
};

/* -------------------------------------------------------------------------
   3) SEGÉDFÜGGVÉNYEK
   ------------------------------------------------------------------------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const pad2 = (n) => String(n).padStart(2, '0');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const telHref = (p) => 'tel:' + p.replace(/[^\d+]/g, '');

/* -------------------------------------------------------------------------
   4) ALAPBEÁLLÍTÁSOK (adatok, szekció-kapcsolók)
   ------------------------------------------------------------------------- */
function applyConfig() {
  $$('[data-config]').forEach((el) => {
    const v = weddingConfig[el.dataset.config];
    if (v !== undefined) el.textContent = v;
  });
  document.title = weddingConfig.coupleNames + ' — Esküvői meghívó';

  const maps = $('#maps-link'); if (maps) maps.href = weddingConfig.mapsUrl;
  const ph = $('#contact-phone'); if (ph) ph.href = telHref(weddingConfig.phone);
  const em = $('#contact-email'); if (em) em.href = 'mailto:' + weddingConfig.email;
  const ig = $('#contact-insta'); if (ig) ig.href = weddingConfig.instagramUrl;
}

function applySectionToggles() {
  Object.keys(sections).forEach((key) => {
    if (sections[key] === false) $$(`[data-section="${key}"]`).forEach((el) => el.remove());
  });
}

/* -------------------------------------------------------------------------
   5) LISTÁK RENDERELÉSE
   ------------------------------------------------------------------------- */
function renderSchedule() {
  const list = $('#schedule-list'); if (!list) return;
  list.innerHTML = scheduleItems.map((s) => `
    <li class="tl-item reveal">
      <span class="tl-time">${esc(s.time)}</span>
      <span class="tl-icon">${icons[s.icon] || ''}</span>
      <span><span class="tl-title">${esc(s.title)}</span>${s.place ? `<span class="tl-place">${esc(s.place)}</span>` : ''}</span>
    </li>`).join('');
}

function renderInfo() {
  const grid = $('#info-grid'); if (!grid) return;
  grid.innerHTML = infoCards.map((c) => `
    <div class="info-card reveal">
      <div class="info-icon">${icons[c.icon] || ''}</div>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.text)}</p>
      ${c.link ? `<p><a href="${esc(c.link.href)}">${esc(c.link.label)}</a></p>` : ''}
      ${c.phone ? `<p><a href="${telHref(weddingConfig.phone)}">${esc(weddingConfig.phone)}</a></p>` : ''}
    </div>`).join('');
}

function renderHotels() {
  const grid = $('#hotel-grid'); if (!grid) return;
  grid.innerHTML = hotels.map((h) => `
    <article class="hotel-card reveal">
      <img src="${esc(h.img)}" width="900" height="600" loading="lazy" alt="${esc(h.name)} – szoba">
      <div class="hotel-body">
        <h4>${esc(h.name)}</h4>
        <span class="hotel-dist">${esc(h.distance)}</span>
        <p>${esc(h.address)}<br><a href="${telHref(h.phone)}">${esc(h.phone)}</a></p>
        <p>${esc(h.text)}</p>
        <div class="hotel-spacer"></div>
        <a class="btn btn-ghost" href="${esc(h.url)}" target="_blank" rel="noopener noreferrer">${esc(h.cta)}</a>
      </div>
    </article>`).join('');
}

function renderFaq() {
  const list = $('#faq-list'); if (!list) return;
  list.innerHTML = faqItems.map((f, i) => `
    <div class="faq-item reveal">
      <h3 class="faq-h">
        <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
          <span>${esc(f.q)}</span><span class="faq-plus" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${esc(f.a)}</p></div></div>
    </div>`).join('');
  $$('.faq-item', list).forEach((item) => {
    const btn = $('.faq-q', item);
    btn.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      $$('.faq-item', list).forEach((o) => { o.classList.remove('is-open'); $('.faq-q', o).setAttribute('aria-expanded', 'false'); });
      if (!open) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
}

function renderHashtagStrip() {
  const strip = $('#hashtag-strip'); if (!strip) return;
  strip.innerHTML = hashtagStrip.map((src) => `<img src="${esc(src)}" width="900" height="1000" loading="lazy" alt="">`).join('');
}

/* -------------------------------------------------------------------------
   6) NAVIGÁCIÓ (tömör háttér, oldalról becsúszó panel, egyetlen X)
   ------------------------------------------------------------------------- */
function initNav() {
  const nav = $('#site-nav'), toggle = $('#nav-toggle'), panel = $('#nav-panel'), scrim = $('#nav-scrim');
  const root = document.documentElement;

  const setOpen = (open) => {
    panel.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    root.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    panel.inert = !open;
  };
  setOpen(false);

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  scrim.addEventListener('click', () => setOpen(false));
  $$('a', panel).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });

  /* árnyék görgetéskor + aktuális szekció kiemelése */
  const links = $$('.nav-links a, .nav-panel a');
  const ids = Array.from(new Set(links.map((a) => a.getAttribute('href')).filter((h) => h && h.startsWith('#') && h.length > 1)));
  let ticking = false;
  const update = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    const probe = window.scrollY + nav.offsetHeight + window.innerHeight * 0.3;
    let current = null;
    ids.forEach((id) => { const el = $(id); if (el && el.offsetTop <= probe) current = id; });
    links.forEach((a) => (a.getAttribute('href') === current ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* -------------------------------------------------------------------------
   7) VISSZASZÁMLÁLÁS + visszajelzési határidő
   ------------------------------------------------------------------------- */
function initCountdown() {
  const cells = { d: $('#cd-days'), h: $('#cd-hours'), m: $('#cd-minutes'), s: $('#cd-seconds') };
  if (!cells.d) return;
  const target = new Date(weddingConfig.weddingDateISO).getTime();
  const grid = $('#cd-grid'), done = $('#cd-done');
  let timer;
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) { grid.hidden = true; done.hidden = false; clearInterval(timer); return; }
    cells.d.textContent = pad2(Math.floor(diff / 864e5));
    cells.h.textContent = pad2(Math.floor((diff % 864e5) / 36e5));
    cells.m.textContent = pad2(Math.floor((diff % 36e5) / 6e4));
    cells.s.textContent = pad2(Math.floor((diff % 6e4) / 1e3));
  };
  tick();
  timer = setInterval(tick, 1000);
}

function initDeadlineChip() {
  // 1. Ott leszek visszajelzés határideje (pl. március 16.)
  const chip = $('#rsvp-deadline');
  if (chip) {
    const days = Math.ceil((new Date(weddingConfig.rsvpDeadlineISO).getTime() - Date.now()) / 864e5);
    if (days > 1) chip.textContent = `Még ${days} nap van a visszajelzési határidőig`;
    else if (days === 1) chip.textContent = 'A visszajelzési határidő holnap jár le';
    else if (days === 0) chip.textContent = 'A visszajelzési határidő ma jár le';
    else chip.textContent = 'A visszajelzési határidő lejárt – ha még szeretnél jelezni, kérjük, keress minket';
    chip.hidden = false;
  }

  // 2. UGO Szállás visszajelzés határideje (január 15.)
  const lodgingChip = $('#lodging-deadline');
  if (lodgingChip && weddingConfig.lodgingDeadlineISO) {
    const days = Math.ceil((new Date(weddingConfig.lodgingDeadlineISO).getTime() - Date.now()) / 864e5);
    if (days > 1) lodgingChip.textContent = `Még ${days} nap van a szállásfoglalási határidőig`;
    else if (days === 1) lodgingChip.textContent = 'A szállásfoglalási határidő holnap jár le';
    else if (days === 0) lodgingChip.textContent = 'A szállásfoglalási határidő ma jár le';
    else lodgingChip.textContent = 'A szállásfoglalási határidő lejárt – kérjük, keress minket';
    lodgingChip.hidden = false;
  }
}

/* -------------------------------------------------------------------------
   8) KÜLDÉS (Make.com webhook, FormData – egyszerű CORS kérés, nincs preflight)
   ------------------------------------------------------------------------- */
async function sendToWebhook(kind, fd, { needResponse = false } = {}) {
  fd.append('form_type', kind);
  fd.append('couple', weddingConfig.coupleNames);
  fd.append('sent_at', new Date().toISOString());

  const url = webhooks[kind];
  if (!url) { await wait(700); return { demo: true }; }          // DEMÓ mód

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30000);
  try {
    if (needResponse) {
      // A Make "Webhook response" modulja JSON-t ad vissza (+ Access-Control-Allow-Origin fejléc)
      const res = await fetch(url, { method: 'POST', body: fd, signal: ctrl.signal });
      const data = await res.json();
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return data;
    }
    // Válasz nem kell: "no-cors" – a kérés elmegy, a válasz átlátszatlan
    await fetch(url, { method: 'POST', body: fd, mode: 'no-cors', signal: ctrl.signal });
    return { ok: true };
  } finally { clearTimeout(t); }
}

const showError = (form, msg) => {
  const el = $('.form-error', form);
  if (!el) return;
  el.textContent = msg; el.hidden = !msg;
};
const GENERIC_ERROR = 'Nem sikerült elküldeni. Kérjük, próbáld újra, vagy írj nekünk e-mailben.';

/* Közös űrlapkezelő: RSVP, zene, üzenet, fotó */
function initForms() {
  $$('.js-form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      showError(form, '');
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const kind = form.dataset.kind;
      const fd = new FormData(form);
      const btn = $('.btn-submit', form);

      if (kind === 'upload') {
        if (!pickedPhotos.length) { showError(form, 'Kérjük, válassz ki legalább egy fotót.'); return; }
        pickedPhotos.forEach((p, i) => fd.append('photo' + (i + 1), p.blob, p.name));
        fd.append('photo_count', String(pickedPhotos.length));
      }

      btn.disabled = true;
      const label = btn.textContent; btn.textContent = 'Küldés…';
      try {
        if (!fd.get('company')) await sendToWebhook(kind, fd);   // kitöltött rejtett mező = robot, csendben eldobjuk
        form.hidden = true;
        const ok = $(form.dataset.success);
        if (ok) { ok.hidden = false; ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        if (kind === 'upload') clearPhotos();
        if (kind === 'rsvp') { const c = $('.choice'); if (c) c.hidden = true; }
        form.reset();
      } catch (err) {
        console.error(err);
        showError(form, GENERIC_ERROR);
      } finally {
        btn.disabled = false; btn.textContent = label;
      }
    });
  });
}

/* RSVP: Ott leszek / Nem tudok jönni */
function initRsvp() {
  const yes = $('#rsvp-yes'), no = $('#rsvp-no'), fy = $('#rsvp-yes-form'), fn = $('#rsvp-no-form');
  if (!yes) return;
  const pick = (isYes) => {
    yes.setAttribute('aria-pressed', String(isYes));
    no.setAttribute('aria-pressed', String(!isYes));
    fy.hidden = !isYes; fn.hidden = isYes;
    const f = isYes ? fy : fn;
    f.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  yes.addEventListener('click', () => pick(true));
  no.addEventListener('click', () => pick(false));
}

/* +/− léptetők */
function initSteppers() {
  $$('[data-stepper]').forEach((wrap) => {
    const input = $('input', wrap);
    $$('button', wrap).forEach((b) => b.addEventListener('click', () => {
      const min = +input.min, max = +input.max;
      input.value = Math.min(max, Math.max(min, (+input.value || 0) + (+b.dataset.step)));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }));
  });
}

/* -------------------------------------------------------------------------
   9) HELYSZÍNI SZÁLLÁS — élő számláló + foglalási kérés
   A számlálót MINDIG a szerver (Make + Google Sheet) számolja: az oldal
   csak megjeleníti, és a túlfoglalást a Make forgatókönyv is megakadályozza.
   ------------------------------------------------------------------------- */
const lodge = { total: weddingConfig.lodging.total, remaining: null, demoRemaining: weddingConfig.lodging.total };
const RING_LEN = 2 * Math.PI * 60;

function lodgePersons(form) {
  const a = +form.elements.adults.value || 0, c = +form.elements.children.value || 0;
  return a + (weddingConfig.lodging.countChildren ? c : 0);
}

function renderLodge() {
  const ring = $('#lodge-ring'); if (!ring) return;
  const num = $('#lodge-number'), status = $('#lodge-status'), totalLbl = $('#lodge-total-label');
  const form = $('#lodge-form'), full = $('#lodge-full'), ok = $('#lodge-success');
  const rem = lodge.remaining;

  const state = rem === null ? 'error' : rem <= 0 ? 'full' : rem <= weddingConfig.lodging.lowThreshold ? 'low' : 'ok';
  num.textContent = rem === null ? '–' : rem;
  ring.style.strokeDasharray = RING_LEN;
  ring.style.strokeDashoffset = RING_LEN * (1 - (rem === null ? 0 : Math.max(0, Math.min(1, rem / lodge.total))));
  ring.dataset.state = state;
  status.dataset.state = state;
  status.textContent = {
    ok: 'Szabad helyek a helyszínen',
    low: 'Fogyóban a szabad helyek',
    full: 'Betelt',
    error: 'A szabad helyek száma most nem érhető el'
  }[state];
  totalLbl.textContent = rem === null ? '' : `${lodge.total} helyből ${lodge.total - rem} már foglalt`;

  const bookedNow = !ok.hidden;
  full.hidden = !(state === 'full' && !bookedNow);
  form.hidden = bookedNow || state === 'full';
  if (state === 'error' && !bookedNow) {
    form.hidden = false;
    $('#lodge-submit').disabled = true;
    const err = $('#lodge-error');
    err.textContent = 'A szabad helyek száma most nem tölthető be. Kérjük, frissítsd az oldalt, vagy írj nekünk.'; err.hidden = false;
  }
  updateLodgeSummary();
}

function updateLodgeSummary() {
  const form = $('#lodge-form'); if (!form) return;
  const summary = $('#lodge-summary'), btn = $('#lodge-submit');
  const rem = lodge.remaining;
  const persons = lodgePersons(form);
  const adults = +form.elements.adults.value, kids = +form.elements.children.value;
  let msg = `Összesen <strong>${persons} fő</strong> részére kérsz helyet (${adults} felnőtt${kids ? `, ${kids} gyermek` : ''}).`;
  if (!weddingConfig.lodging.countChildren && kids) msg += ' A gyermekek nem csökkentik a szabad helyek számát.';
  if (rem !== null && persons > rem) { msg = `Jelenleg legfeljebb <strong>${rem} fő</strong> részére kérhetsz helyet.`; }
  summary.innerHTML = msg;
  if (rem !== null) btn.disabled = persons > rem || rem <= 0;
}

async function loadLodgeStatus() {
  if (!$('#lodge-ring')) return;
  if (!webhooks.lodging) {
    console.info('[Demó mód] Nincs lodging webhook megadva – a számláló csak ebben a böngészőlapban működik.');
    lodge.remaining = lodge.demoRemaining; renderLodge(); return;
  }
  try {
    const fd = new FormData(); fd.append('action', 'status');
    const data = await sendToWebhook('lodging', fd, { needResponse: true });
    lodge.remaining = Math.max(0, Math.min(lodge.total, parseInt(data.remaining, 10)));
    if (Number.isNaN(lodge.remaining)) throw new Error('Érvénytelen válasz');
  } catch (err) {
    console.error(err); lodge.remaining = null;
  }
  renderLodge();
}

function initLodge() {
  const form = $('#lodge-form'); if (!form) return;

  /* ne lehessen a szabad helyeknél többet kérni */
  form.addEventListener('change', (e) => {
    const rem = lodge.remaining;
    if (rem !== null && e.target.matches('input[type=number]')) {
      let over = lodgePersons(form) - rem;
      if (over > 0) {
        const t = e.target;
        const counted = t.name === 'adults' || weddingConfig.lodging.countChildren;
        if (counted) t.value = Math.max(+t.min, +t.value - over);
      }
    }
    updateLodgeSummary();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('#lodge-error'), btn = $('#lodge-submit');
    err.hidden = true;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const persons = lodgePersons(form);
    if (lodge.remaining === null || persons > lodge.remaining) { updateLodgeSummary(); return; }

    const fd = new FormData(form);
    if (fd.get('company')) return;                       // robot
    fd.append('action', 'book');
    fd.append('persons', String(persons));

    btn.disabled = true; const label = btn.textContent; btn.textContent = 'Küldés…';
    try {
      let result;
      if (!webhooks.lodging) {                           // DEMÓ
        await wait(800);
        lodge.demoRemaining -= persons;
        result = { ok: true, remaining: lodge.demoRemaining };
      } else {
        result = await sendToWebhook('lodging', fd, { needResponse: true });
      }

      if (result.ok) {
        lodge.remaining = Math.max(0, parseInt(result.remaining, 10));
        form.hidden = true;
        $('#lodge-success').hidden = false;
        renderLodge();
        $('#lodge').scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset();
      } else {
        // a szerver szerint közben elfogyott a hely
        if (result.remaining !== undefined) lodge.remaining = Math.max(0, parseInt(result.remaining, 10));
        renderLodge();
        err.textContent = lodge.remaining > 0
          ? `Közben megváltozott a szabad helyek száma – jelenleg ${lodge.remaining} hely maradt. Kérjük, módosítsd a létszámot.`
          : 'Sajnos közben elfogyott az utolsó szabad hely is.';
        err.hidden = false;
      }
    } catch (ex) {
      console.error(ex);
      err.textContent = GENERIC_ERROR; err.hidden = false;
    } finally {
      btn.textContent = label;
      updateLodgeSummary();
    }
  });
}

/* -------------------------------------------------------------------------
   10) FOTÓFELTÖLTÉS — kliensoldali kisebbítés (Make webhook ~5 MB-ig fogad)
   ------------------------------------------------------------------------- */
const MAX_PHOTOS = 5, MAX_EDGE = 2200, JPEG_Q = 0.86, MAX_TOTAL_BYTES = 4.2 * 1024 * 1024;
let pickedPhotos = [];

async function shrinkImage(file) {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); ctx.drawImage(bmp, 0, 0, w, h);
    const blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', JPEG_Q));
    if (blob && blob.size < file.size) return { blob, name: file.name.replace(/\.[^.]+$/, '') + '.jpg' };
  } catch (e) { /* nem dekódolható formátum (pl. HEIC) – az eredetit küldjük, ha belefér */ }
  return { blob: file, name: file.name };
}

function renderPhotoPreviews() {
  const ul = $('#upload-previews'); if (!ul) return;
  ul.innerHTML = '';
  pickedPhotos.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<img alt="Kiválasztott fotó ${i + 1}" src="${p.url}"><button type="button" aria-label="Fotó eltávolítása">&times;</button>`;
    $('button', li).addEventListener('click', () => {
      URL.revokeObjectURL(p.url); pickedPhotos.splice(i, 1); renderPhotoPreviews();
    });
    ul.appendChild(li);
  });
}
function clearPhotos() { pickedPhotos.forEach((p) => URL.revokeObjectURL(p.url)); pickedPhotos = []; renderPhotoPreviews(); }

async function addPhotos(fileList) {
  const err = $('#upload-error'); err.hidden = true;
  const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
  if (!files.length) { err.textContent = 'Kérjük, képfájlt válassz (JPG, PNG, WebP).'; err.hidden = false; return; }
  for (const f of files) {
    if (pickedPhotos.length >= MAX_PHOTOS) { err.textContent = `Legfeljebb ${MAX_PHOTOS} fotót tölthetsz fel egyszerre.`; err.hidden = false; break; }
    const { blob, name } = await shrinkImage(f);
    const total = pickedPhotos.reduce((s, p) => s + p.blob.size, 0) + blob.size;
    if (total > MAX_TOTAL_BYTES) { err.textContent = 'A képek együtt túl nagyok – kérjük, kevesebb vagy kisebb fotót válassz.'; err.hidden = false; break; }
    pickedPhotos.push({ blob, name, url: URL.createObjectURL(blob) });
  }
  renderPhotoPreviews();
}

function initUpload() {
  const zone = $('#dropzone'), input = $('#upload-input'); if (!zone) return;
  input.addEventListener('change', () => { addPhotos(input.files); input.value = ''; });
  ['dragenter', 'dragover'].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.add('is-drag'); }));
  ['dragleave', 'drop'].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.remove('is-drag'); }));
  zone.addEventListener('drop', (e) => addPhotos(e.dataTransfer.files));
}

/* -------------------------------------------------------------------------
   11) HASHTAG MÁSOLÁS
   ------------------------------------------------------------------------- */
function initCopy() {
  const btn = $('#hashtag-copy'), fb = $('#hashtag-feedback'); if (!btn) return;
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(weddingConfig.hashtag); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = weddingConfig.hashtag; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (_) {} ta.remove();
    }
    fb.textContent = 'Kimásolva!';
    clearTimeout(btn._t); btn._t = setTimeout(() => (fb.textContent = ''), 2200);
  });
}

/* -------------------------------------------------------------------------
   12) GALÉRIA + LIGHTBOX
   ------------------------------------------------------------------------- */
let lbIndex = 0, lbOpener = null;

function renderGallery() {
  const grid = $('#gallery-grid'); if (!grid) return;
  grid.innerHTML = galleryImages.map((g, i) => `
    <button class="g-item reveal" type="button" data-i="${i}" aria-label="Kép megnyitása: ${esc(g.alt)}">
      <img src="${esc(g.src)}" width="${g.w}" height="${g.h}" loading="lazy" alt="${esc(g.alt)}">
    </button>`).join('');
  $$('.g-item', grid).forEach((b) => b.addEventListener('click', () => openLightbox(+b.dataset.i, b)));
}

function showLightbox(i) {
  const n = galleryImages.length; lbIndex = (i + n) % n;
  const g = galleryImages[lbIndex];
  const img = $('#lightbox-img'); img.src = g.src; img.alt = g.alt;
  $('#lightbox-count').textContent = `${lbIndex + 1} / ${n}`;
}
function openLightbox(i, opener) {
  lbOpener = opener || null;
  showLightbox(i);
  $('#lightbox').hidden = false;
  document.documentElement.classList.add('lb-open');
  $('#lightbox-close').focus();
}
function closeLightbox() {
  $('#lightbox').hidden = true;
  document.documentElement.classList.remove('lb-open');
  if (lbOpener) lbOpener.focus();
}
function initLightbox() {
  const lb = $('#lightbox'); if (!lb) return;
  $('#lightbox-close').addEventListener('click', closeLightbox);
  $('#lightbox-prev').addEventListener('click', () => showLightbox(lbIndex - 1));
  $('#lightbox-next').addEventListener('click', () => showLightbox(lbIndex + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showLightbox(lbIndex + 1);
    if (e.key === 'ArrowLeft') showLightbox(lbIndex - 1);
    if (e.key === 'Tab') {                                   // fókusz a lightboxon belül marad
      const f = $$('button', lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let x0 = null;
  lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) showLightbox(lbIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
}

/* -------------------------------------------------------------------------
   13) MEGJELENÉSI ANIMÁCIÓ
   ------------------------------------------------------------------------- */
function initReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-visible')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((e) => io.observe(e));
}

/* -------------------------------------------------------------------------
   INDÍTÁS
   ------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  applySectionToggles();
  renderSchedule();
  renderInfo();
  renderGallery();
  renderHotels();
  renderFaq();
  renderHashtagStrip();

  initNav();
  initCountdown();
  initDeadlineChip();
  initSteppers();
  initRsvp();
  initForms();
  initUpload();
  initLodge();
  loadLodgeStatus();
  initCopy();
  initLightbox();
  initReveal();
});

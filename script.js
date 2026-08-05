/* ============================================================
   GRILLZ EMPIRE — script.js
   ============================================================ */

/* ── NAVIGATION ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose= document.getElementById('mobileClose');
const overlay    = document.getElementById('mobileOverlay');

function openMenu()  { mobileMenu.classList.add('open'); overlay.classList.add('show'); }
function closeMenu() { mobileMenu.classList.remove('open'); overlay.classList.remove('show'); }

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));

/* ── VITESSE VIDÉO HERO ── */
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) heroVideo.playbackRate = 0.5;

/* ── CANVAS PARTICULES HERO ── */
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, cParticles = [];

  function resizeCanvas() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function rand(a, b) { return Math.random() * (b - a) + a; }

  for (let i = 0; i < 50; i++) {
    cParticles.push({
      x: rand(0, 1), y: rand(0, 1),
      size: rand(.5, 2.5),
      speed: rand(.0002, .0006),
      alpha: rand(.1, .5),
      pulse: rand(0, Math.PI * 2)
    });
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * .001;
    cParticles.forEach(p => {
      p.y -= p.speed;
      if (p.y < 0) { p.y = 1; p.x = rand(0, 1); }
      const a = p.alpha * (.6 + .4 * Math.sin(t * 1.5 + p.pulse));
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawCanvas);
  }
  drawCanvas();
}

/* ── PARTICULES DIV (fallback) ── */
const pc = document.getElementById('particles');
if (pc) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `left:${Math.random()*100}%;width:${size}px;height:${size}px;animation-duration:${Math.random()*18+10}s;animation-delay:${Math.random()*15}s;`;
    pc.appendChild(p);
  }
}

/* ── REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

/* ── COMPTEURS ── */
const statObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let count = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count);
      if (count >= target) { el.textContent = target; clearInterval(timer); }
    }, 25);
    statObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statObs.observe(el));

/* ── GALERIE ── */
const galleryData = [
  { type: 'custom', name: 'Custom',         desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-1.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-2.webp' },
  { type: 'custom', name: 'Custom',         desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-3.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-4.webp' },
  { type: 'custom', name: 'Custom',         desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-5.webp' },
  { type: 'custom', name: 'Custom',         desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-6.webp' },
  { type: 'gold',   name: 'Gold',           desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-7.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-8.webp' },
  { type: 'custom', name: 'Custom',         desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-9.webp' },
  { type: 'gold',   name: 'Gold',           desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-10.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-11.webp' },
  { type: 'custom', name: 'Custom',         desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-12.webp' },
  { type: 'gold',   name: 'Gold',           desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-13.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-14.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-15.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-16.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-17.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-18.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-19.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-20.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-21.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-22.webp' },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-23.webp', tall: true },
  { type: 'chrome', name: 'Chrome-Cobalt',  desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-24.webp', tall: true },
];

function imgPath(path) {
  return path;
}

const galleryTrack = document.getElementById('galleryTrack');
if (galleryTrack) {
  let activeFilter = 'all';
  let galleryOpen = false;

  function getTag(item) {
    return item.type === 'chrome' ? 'Chrome-Cobalt' : item.type === 'gold' ? 'Gold' : 'Custom';
  }

  function galleryHtml(item) {
    return item.img
      ? `<img src="${imgPath(item.img)}" alt="${item.name}" loading="lazy" onerror="this.classList.add('broken')">
         <div class="gallery-overlay"><div><h4>${item.name}</h4><p>${item.desc}</p></div></div>
         <div class="gallery-tag gallery-tag-${item.type}">${getTag(item)}</div>`
      : `<div class="gallery-placeholder"><span>📷</span><p>Photo a venir</p></div>`;
  }

  function renderGallery(filter) {
    activeFilter = filter;
    const track = document.getElementById('galleryTrack');
    const grid  = document.getElementById('galleryGrid');
    track.innerHTML = '';
    grid.innerHTML  = '';

    const items = filter === 'all' ? galleryData : galleryData.filter(g => g.type === filter);
    const allItems = [...items, ...items];

    allItems.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'gallery-item' + (item.tall ? ' gallery-item-tall' : '');
      div.innerHTML = galleryHtml(item);
      if (item.img) div.addEventListener('click', () => openLightbox(i % items.length));
      track.appendChild(div);
    });

    items.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'gallery-item' + (item.tall ? ' gallery-item-tall' : '');
      div.innerHTML = galleryHtml(item);
      if (item.img) div.addEventListener('click', () => openLightbox(i));
      grid.appendChild(div);
    });

    galleryOpen = false;
    document.getElementById('galleryMore').style.display = 'none';
    document.getElementById('galleryBtn').textContent = 'Voir plus ↓';
  }

  window.toggleGallery = function() {
    const btn   = document.getElementById('galleryBtn');
    const more  = document.getElementById('galleryMore');
    const sliderWrap = document.querySelector('.gallery-slider-wrap');
    if (!galleryOpen) {
      more.style.display = 'block';
      sliderWrap.style.display = 'none';
      btn.textContent = 'Réduire ↑';
      galleryOpen = true;
    } else {
      more.style.display = 'none';
      sliderWrap.style.display = 'block';
      btn.textContent = 'Voir plus ↓';
      galleryOpen = false;
      document.getElementById('realisations').scrollIntoView({ behavior: 'smooth' });
    }
  };

  renderGallery('all');

  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });
}

/* ── AVIS ── */
const reviewsTrack = document.getElementById('reviewsTrack');
if (reviewsTrack) {
  const reviews = [
    { name: 'Kofi A.',   loc: 'Lome, Togo',              text: 'Qualite incroyable ! Mes grillz en Gold sont parfaits. Service rapide et professionnel.',            stars: 5, init: 'K' },
    { name: 'Ama S.',    loc: 'Paris, France',            text: 'J\'adore mon grillz Open Face ! Exactement ce que je voulais. Tout le monde me pose des questions !', stars: 5, init: 'A' },
    { name: 'Prince D.', loc: 'Cotonou, Benin',           text: 'Iced Out - absolument royal. Livraison rapide et emballage tres professionnel.',                     stars: 5, init: 'P' },
    { name: 'Fatou M.',  loc: 'Berlin, Allemagne',        text: 'Mon grillz personnalise est magnifique. L\'equipe tres patiente pour creer exactement ce que je voulais.', stars: 5, init: 'F' },
    { name: 'Yao B.',    loc: 'New York, USA',            text: 'Grillz Empire c\'est THE reference en Afrique de l\'Ouest. Qualite irreprochable !',                stars: 5, init: 'Y' },
    { name: 'Nadia K.',  loc: 'Lome, Togo',               text: 'Commande pour mon anniversaire — qualite exceptionnelle. 100% recommande !',                         stars: 5, init: 'N' },
    { name: 'Mawuli T.', loc: 'Cotonou, Benin',           text: 'Chrome-Cobalt Solid. Le fitting etait parfait, rien de genants. Parfait !',                          stars: 5, init: 'M' },
    { name: 'Aissa R.',  loc: 'Lyon, France',             text: 'Livraison en temps, emballage luxueux, grillz parfait. Grillz Empire tient ses promesses !',         stars: 5, init: 'A' },
  ];

  const track = document.getElementById('reviewsTrack');
  [...reviews, ...reviews].forEach(r => {
    track.innerHTML += `
      <div class="review-card">
        <div class="review-stars">${'★'.repeat(r.stars)}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author">
          <div class="review-avatar">${r.init}</div>
          <div>
            <div class="review-name">${r.name}</div>
            <div class="review-loc">📍 ${r.loc}</div>
          </div>
        </div>
      </div>`;
  });
}

/* ── LIGHTBOX ── */
const lightbox    = document.getElementById('lightbox');
const lightboxImgWrap = document.querySelector('.lightbox-image-wrap');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTag = document.getElementById('lightboxTag');
const lightboxName= document.getElementById('lightboxName');
const lightboxDesc= document.getElementById('lightboxDesc');
const lightboxCnt = document.getElementById('lightboxCounter');
let lightboxIndex = 0;
let zoomScale = 1, zoomX = 0, zoomY = 0;
let isDragging = false, didDrag = false, startX, startY;

function resetZoom() {
  zoomScale = 1; zoomX = 0; zoomY = 0;
  applyZoom();
}

function applyZoom() {
  lightboxImg.style.transform = `translate(${zoomX}px, ${zoomY}px) scale(${zoomScale})`;
  lightboxImg.style.cursor = zoomScale > 1 ? 'grab' : 'zoom-in';
}

function getLightboxItems() {
  const filter = typeof activeFilter !== 'undefined' ? activeFilter : 'all';
  return filter === 'all' ? galleryData : galleryData.filter(g => g.type === filter);
}

function renderLightbox(index) {
  resetZoom();
  const items = getLightboxItems();
  if (!items.length) return;
  lightboxIndex = (index + items.length) % items.length;
  const item = items[lightboxIndex];
  const tag = item.type === 'chrome' ? 'Chrome-Cobalt' : item.type === 'gold' ? 'Gold' : 'Custom';
  lightboxImg.src = imgPath(item.img);
  lightboxTag.textContent = tag;
  lightboxTag.className = 'lightbox-tag ' + (tag === 'Chrome-Cobalt' ? 'chrome' : tag.toLowerCase());
  lightboxName.textContent = item.name;
  lightboxDesc.textContent = item.desc;
  lightboxCnt.textContent = `${lightboxIndex + 1} / ${items.length}`;
}

function openLightbox(index) {
  renderLightbox(index);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  resetZoom();
}

function navigateLightbox(dir) {
  renderLightbox(lightboxIndex + dir);
}

lightboxImg.addEventListener('click', (e) => {
  if (didDrag) { didDrag = false; return; }
  e.stopPropagation();
  if (zoomScale > 1) { resetZoom(); return; }
  const rect = lightboxImgWrap.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  zoomScale = 2.5;
  const maxX = (zoomScale - 1) * rect.width / 2;
  const maxY = (zoomScale - 1) * rect.height / 2;
  zoomX = -(px - .5) * rect.width * (zoomScale - 1);
  zoomY = -(py - .5) * rect.height * (zoomScale - 1);
  zoomX = Math.max(-maxX, Math.min(maxX, zoomX));
  zoomY = Math.max(-maxY, Math.min(maxY, zoomY));
  applyZoom();
});

lightboxImg.addEventListener('mousedown', (e) => {
  if (zoomScale <= 1) return;
  isDragging = true; didDrag = false; startX = e.clientX - zoomX; startY = e.clientY - zoomY;
  lightboxImg.style.cursor = 'grabbing';
  e.preventDefault();
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  didDrag = true;
  zoomX = e.clientX - startX; zoomY = e.clientY - startY;
  applyZoom();
});
document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  lightboxImg.style.cursor = zoomScale > 1 ? 'grab' : 'zoom-in';
});

let lastTouchDist = 0;
lightboxImg.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    lastTouchDist = Math.hypot(dx, dy);
  }
}, { passive: true });
lightboxImg.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.hypot(dx, dy);
    const delta = dist / lastTouchDist;
    const rect = lightboxImgWrap.getBoundingClientRect();
    const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    const px = (cx - rect.left) / rect.width;
    const py = (cy - rect.top) / rect.height;
    const newScale = Math.max(1, Math.min(6, zoomScale * delta));
    if (newScale === 1) { resetZoom(); lastTouchDist = dist; return; }
    const ratio = newScale / zoomScale;
    zoomX = px * rect.width * (1 - ratio) + zoomX * ratio;
    zoomY = py * rect.height * (1 - ratio) + zoomY * ratio;
    zoomScale = newScale;
    const maxX = (zoomScale - 1) * rect.width / 2;
    const maxY = (zoomScale - 1) * rect.height / 2;
    zoomX = Math.max(-maxX, Math.min(maxX, zoomX));
    zoomY = Math.max(-maxY, Math.min(maxY, zoomY));
    applyZoom();
    lastTouchDist = dist;
  }
}, { passive: false });

lightboxImg.addEventListener('wheel', (e) => {
  if (!lightbox.classList.contains('open')) return;
  e.preventDefault();
  const rect = lightboxImgWrap.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const delta = e.deltaY > 0 ? .85 : 1.15;
  const newScale = Math.max(1, Math.min(6, zoomScale * delta));
  if (newScale === 1) { resetZoom(); return; }
  const ratio = newScale / zoomScale;
  zoomX = px * rect.width * (1 - ratio) + zoomX * ratio;
  zoomY = py * rect.height * (1 - ratio) + zoomY * ratio;
  zoomScale = newScale;
  const maxX = (zoomScale - 1) * rect.width / 2;
  const maxY = (zoomScale - 1) * rect.height / 2;
  zoomX = Math.max(-maxX, Math.min(maxX, zoomX));
  zoomY = Math.max(-maxY, Math.min(maxY, zoomY));
  applyZoom();
}, { passive: false });

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => { resetZoom(); navigateLightbox(-1); });
document.getElementById('lightboxNext').addEventListener('click', () => { resetZoom(); navigateLightbox(1); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { resetZoom(); navigateLightbox(-1); }
  if (e.key === 'ArrowRight') { resetZoom(); navigateLightbox(1); }
});

/* ── COOKIE BANNER ── */
function acceptCookies() {
  localStorage.setItem('grillz_cookies', 'accepted');
  document.getElementById('cookieBanner').classList.remove('show');
}
function refuseCookies() {
  localStorage.setItem('grillz_cookies', 'refused');
  document.getElementById('cookieBanner').classList.remove('show');
}
if (!localStorage.getItem('grillz_cookies')) {
  setTimeout(() => document.getElementById('cookieBanner').classList.add('show'), 1200);
} else {
  document.getElementById('cookieBanner').remove();
}

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── FORMULAIRE COLLAB ── */
function submitCollabForm(e) {
  e.preventDefault();
  const form = e.target;
  const nom     = form.nom.value.trim();
  const type    = form.type.value;
  const phone   = form.phone.value.trim();
  const social  = form.social.value.trim();
  const message = form.message.value.trim();

  const text = `Bonjour Grillz Empire 👋\n\n*Proposition de collaboration*\n\n👤 Nom / Pseudo : ${nom}\n🎭 Profil : ${type}\n📞 Contact : ${phone}${social ? `\n📲 Reseaux : ${social}` : ''}\n\n💬 Idee de collab :\n${message}`;

  const url = `https://wa.me/22871107392?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');

  showToast('Redirection vers WhatsApp… ✦');
  form.reset();
}

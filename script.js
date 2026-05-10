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
  { type: 'chrome', name: 'Chrome Solid',     desc: 'Chrome-Cobalt – 6 dents',    img: 'Nos-realisation/grillz-1.PNG' },
  { type: 'chrome', name: 'Chrome Full Set',  desc: 'Chrome-Cobalt – Haut & Bas', img: 'Nos-realisation/grillz-2.jpeg' },
  { type: 'chrome', name: 'Chrome Open Face', desc: 'Chrome-Cobalt – Open Face',  img: 'Nos-realisation/grillz-7.jpeg' },
  { type: 'chrome', name: 'Chrome Solid',     desc: 'Chrome-Cobalt – 6 dents',    img: 'Nos-realisation/grillz-10.jpeg' },
  { type: 'gold',   name: 'Gold Solid',       desc: 'Gold – Finition brillant',   img: 'Nos-realisation/grillz-3.PNG' },
  { type: 'gold',   name: 'Gold VVS',         desc: 'Gold – Diamants certifies',  img: 'Nos-realisation/grillz-4.PNG' },
  { type: 'gold',   name: 'Gold Rose',        desc: 'Gold – Sur mesure',          img: 'Nos-realisation/grillz-8.jpeg' },
  { type: 'custom', name: 'Drip Pattern',     desc: 'Style exclusif',             img: 'Nos-realisation/grillz-6.jpeg' },
  { type: 'custom', name: 'Initiales',        desc: 'Identite unique',            img: 'Nos-realisation/grillz-9.jpeg' },
  { type: 'custom', name: 'Grillz 11',        desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-11.JPG' },
  { type: 'custom', name: 'Grillz 12',        desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-12.jpg' },
  { type: 'custom', name: 'Grillz 5',        desc: 'Realisation exclusive',      img: 'Nos-realisation/grillz-5.jpg' },
];

const INITIAL = 6;
let showAll = false;

function renderGallery(filter) {
  showAll = false;
  const grid = document.getElementById('gallery');
  const btn  = document.getElementById('galleryBtn');
  grid.innerHTML = '';

  const items = filter === 'all' ? galleryData : galleryData.filter(g => g.type === filter);

  items.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item' + (i >= INITIAL ? ' hidden' : '');
    div.innerHTML = item.img
      ? `<img src="${item.img}" alt="${item.name}" onerror="this.parentElement.innerHTML='<div class=gallery-placeholder><span>📷</span><p>Photo a venir</p></div>'">
         <div class="gallery-tag gallery-tag-${item.type}">${item.type === 'chrome' ? 'Chrome-Cobalt' : item.type === 'gold' ? 'Gold' : 'Custom'}</div>`
      : `<div class="gallery-placeholder"><span>📷</span><p>Photo a venir</p></div>`;
    grid.appendChild(div);
  });

  const moreWrap = document.getElementById('galleryMore');
  moreWrap.style.display = items.length > INITIAL ? 'block' : 'none';
  if (btn) btn.textContent = 'Voir plus ↓';
}

function toggleGallery() {
  const btn = document.getElementById('galleryBtn');
  if (!showAll) {
    document.querySelectorAll('.gallery-item.hidden').forEach(el => el.classList.remove('hidden'));
    showAll = true;
    btn.textContent = 'Reduire ↑';
  } else {
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
      if (i >= INITIAL) el.classList.add('hidden');
    });
    showAll = false;
    btn.textContent = 'Voir plus ↓';
    document.getElementById('realisations').scrollIntoView({ behavior: 'smooth' });
  }
}

renderGallery('all');

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});


/* ── AVIS ── */
const reviews = [
  { name: 'Kofi A.',   loc: 'Accra, Ghana',           text: 'Qualite incroyable ! Mes grillz en Gold sont parfaits. Service rapide et professionnel.',            stars: 5, init: 'K' },
  { name: 'Ama S.',    loc: 'Lome, Togo',              text: 'J\'adore mon grillz Open Face ! Exactement ce que je voulais. Tout le monde me pose des questions !', stars: 5, init: 'A' },
  { name: 'Prince D.', loc: 'Cotonou, Benin',          text: 'Iced Out - absolument royal. Livraison rapide et emballage tres professionnel.',                     stars: 5, init: 'P' },
  { name: 'Fatou M.',  loc: 'Dakar, Senegal',          text: 'Mon grillz personnalise est magnifique. L\'equipe tres patiente pour creer exactement ce que je voulais.', stars: 5, init: 'F' },
  { name: 'Yao B.',    loc: 'Abidjan, Cote d\'Ivoire', text: 'Grillz Empire c\'est THE reference en Afrique de l\'Ouest. Qualite irreprochable !',                stars: 5, init: 'Y' },
  { name: 'Nadia K.',  loc: 'Lome, Togo',              text: 'Commande pour mon anniversaire — qualite exceptionnelle. 100% recommande !',                         stars: 5, init: 'N' },
  { name: 'Mawuli T.', loc: 'Kara, Togo',              text: 'Chrome-Cobalt Solid. Le fitting etait parfait, rien de genants. Parfait !',                          stars: 5, init: 'M' },
  { name: 'Aissa R.',  loc: 'Niamey, Niger',           text: 'Livraison en temps, emballage luxueux, grillz parfait. Grillz Empire tient ses promesses !',         stars: 5, init: 'A' },
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


/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
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

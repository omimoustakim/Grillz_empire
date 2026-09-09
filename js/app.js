(function () {
  "use strict";

  var STORAGE = "Nos-realisation/";

  var galleryFiles = [
    "grillz-1.webp", "grillz-2.webp", "grillz-3.webp", "grillz-4.webp",
    "grillz-5.webp", "grillz-6.webp", "grillz-7.webp", "grillz-8.webp",
    "grillz-9.webp", "grillz-10.webp", "grillz-11.webp", "grillz-12.webp",
    "grillz-13.webp", "grillz-14.webp", "grillz-15.webp", "grillz-16.webp",
    "grillz-17.webp", "grillz-18.webp", "grillz-19.webp", "grillz-20.webp",
    "grillz-21.webp", "grillz-22.webp", "grillz-23.webp", "grillz-24.webp",
    "grillz-25.webp", "grillz-26.webp", "grillz-27.webp", "grillz-28.webp",
    "grillz-29.webp", "grillz-30.webp", "grillz-31.webp", "grillz-32.webp",
    "grillz-33.webp", "grillz-34.webp", "grillz-35.webp", "grillz-37.webp",
    "grillz-37.webp", "grillz-38.webp", "grillz-39.jpg", "grillz-40.jpg", "grillz-41.jpg"
  ];
  var galleryTypes = ["Gold", "Custom", "Chrome-Cobalt", "Iced Out"];
  var gallery = galleryFiles.map(function (file, index) {
    return { image: STORAGE + file, title: "Réalisation " + String(index + 1).padStart(2, "0"), type: galleryTypes[index % galleryTypes.length] };
  });

  var slots = ["10:00", "12:00", "14:00", "16:30", "18:00"];

  function generateDates() {
    var dates = [];
    for (var i = 1; i <= 14; i++) {
      var date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().slice(0, 10),
        label: new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "2-digit", month: "short" }).format(date)
      });
    }
    return dates;
  }

  var upcomingDates = generateDates();
  var selectedDate = upcomingDates[0].value;
  var selectedSlot = slots[0];
  var galleryFilter = "Tous";
  var lightboxIndex = null;

  function scrollTo(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    var menuLinks = document.querySelector(".nav-links");
    if (menuLinks) menuLinks.classList.remove("nav-links-open");
  }

  function renderGallery(filter) {
    galleryFilter = filter;
    var filtered = filter === "Tous" ? gallery : gallery.filter(function (item) { return item.type === filter; });
    var grid = document.getElementById("real-gallery");
    if (!grid) return;
    grid.innerHTML = "";
    filtered.forEach(function (item) {
      var globalIndex = gallery.indexOf(item);
      var btn = document.createElement("button");
      btn.className = "real-card";
      btn.innerHTML = '<img src="' + item.image + '" alt="' + item.title + ' — ' + item.type + '" loading="lazy" /><span><small>' + item.type + '</small><strong>' + item.title + '</strong><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg></span>';
      btn.addEventListener("click", function () { openLightbox(globalIndex); });
      grid.appendChild(btn);
    });
  }

  function renderTabs() {
    var container = document.getElementById("gallery-tabs");
    if (!container) return;
    var filters = ["Tous", "Gold", "Chrome-Cobalt", "Iced Out", "Custom"];
    container.innerHTML = "";
    filters.forEach(function (f) {
      var btn = document.createElement("button");
      btn.textContent = f;
      if (f === galleryFilter) btn.classList.add("active");
      btn.addEventListener("click", function () { renderGallery(f); renderTabs(); });
      container.appendChild(btn);
    });
  }

  function renderDateGrid() {
    var grid = document.getElementById("date-grid");
    if (!grid) return;
    grid.innerHTML = "";
    upcomingDates.forEach(function (date) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = date.label;
      if (date.value === selectedDate) btn.classList.add("selected");
      btn.addEventListener("click", function () { selectedDate = date.value; renderDateGrid(); });
      grid.appendChild(btn);
    });
  }

  function renderSlotGrid() {
    var grid = document.getElementById("slot-grid");
    if (!grid) return;
    grid.innerHTML = "";
    slots.forEach(function (slot) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = slot;
      if (slot === selectedSlot) btn.classList.add("selected");
      btn.addEventListener("click", function () { selectedSlot = slot; renderSlotGrid(); });
      grid.appendChild(btn);
    });
  }

  function openLightbox(index) {
    lightboxIndex = index;
    var existing = document.getElementById("lightbox-overlay");
    if (existing) existing.remove();
    var item = gallery[index];
    var overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Détail de la réalisation");
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button><button class="lightbox-prev" aria-label="Image précédente"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><div class="lightbox-content"><img src="' + item.image + '" alt="' + item.title + '" /><div class="lightbox-caption"><span>' + item.type + '</span><strong>' + item.title + '</strong><small>' + (index + 1) + ' / ' + gallery.length + '</small></div></div><button class="lightbox-next" aria-label="Image suivante"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>';
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeLightbox(); });
    overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    overlay.querySelector(".lightbox-prev").addEventListener("click", function (e) { e.stopPropagation(); moveLightbox(-1); });
    overlay.querySelector(".lightbox-next").addEventListener("click", function (e) { e.stopPropagation(); moveLightbox(1); });
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    var el = document.getElementById("lightbox-overlay");
    if (el) el.remove();
    lightboxIndex = null;
    document.body.style.overflow = "";
  }

  function moveLightbox(direction) {
    if (lightboxIndex === null) return;
    lightboxIndex = (lightboxIndex + direction + gallery.length) % gallery.length;
    closeLightbox();
    openLightbox(lightboxIndex);
  }

  function handleBooking(e) {
    e.preventDefault();
    var form = e.target;
    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();
    var type = form.querySelector('[name="type"]').value;

    var text = "Bonjour Grillz Empire 👋\n\n" +
      "*Nouvelle demande de rendez-vous*\n\n" +
      "👤 Nom : " + name + "\n" +
      "📧 Email : " + email + "\n" +
      "📞 Téléphone : " + phone + "\n" +
      "🎭 Type de grillz : " + type + "\n" +
      "📅 Date souhaitée : " + selectedDate + "\n" +
      "🕐 Créneau : " + selectedSlot;

    var url = "https://wa.me/22871107392?text=" + encodeURIComponent(text);
    window.open(url, "_blank");

    showSuccess();
  }

  function showError() {
    var formWrap = document.getElementById("booking-form-area");
    var submitBtn = formWrap.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = "Demander ce créneau";
    var errorEl = document.getElementById("form-error");
    if (errorEl) errorEl.style.display = "block";
  }

  function showSuccess() {
    var formWrap = document.getElementById("booking-form-area");
    formWrap.innerHTML = '<div class="success-state"><div class="success-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div><p class="eyebrow"><span class="eyebrow-line"></span> Demande envoyée</p><h3>Votre créneau<br /><em>est en route.</em></h3><p>Votre demande a bien été transmise. L\'équipe vous confirme le rendez-vous sous 24h.</p><a class="button button-gold" href="https://wa.me/22871107392?text=Bonjour%20Grillz%20Empire%2C%20je%20viens%20de%20faire%20une%20demande%20de%20rendez-vous.">Suivre sur WhatsApp <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg></a></div>';
  }

  function initMenuToggle() {
    var toggle = document.getElementById("menu-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      links.classList.toggle("nav-links-open");
      var isOpen = links.classList.contains("nav-links-open");
      toggle.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    });
  }

  function initKeyboardLightbox() {
    document.addEventListener("keydown", function (e) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    });
  }

  function initNavScroll() {
    var navWrap = document.querySelector(".nav-wrap");
    if (!navWrap) return;
    window.addEventListener("scroll", function () {
      navWrap.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  function initMarquee() {
    var track = document.querySelector(".marquee-track");
    if (!track) return;
    var pos = 0;
    var speed = 0.6;
    function animate() {
      pos -= speed;
      if (Math.abs(pos) >= track.scrollWidth / 2) pos = 0;
      track.style.transform = "translateX(" + pos + "px)";
      requestAnimationFrame(animate);
    }
    animate();
  }

  function init() {
    initMenuToggle();
    initKeyboardLightbox();
    initNavScroll();
    initMarquee();
    renderTabs();
    renderGallery("Tous");
    renderDateGrid();
    renderSlotGrid();

    var form = document.getElementById("booking-form");
    if (form) form.addEventListener("submit", handleBooking);

    document.querySelectorAll("[data-scroll]").forEach(function (btn) {
      btn.addEventListener("click", function () { scrollTo(this.getAttribute("data-scroll")); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
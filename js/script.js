// =========================================================
// 1. Efek "mengetik" di terminal hero
// =========================================================
const typeOut = document.getElementById('cursor');
const outEl = document.getElementById('typeOut');
const textToType = "developer & mahasiswa RPL"; // Ganti sesuai profil Anda
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeEffect(text, el, speed = 60) {
  let i = 0;
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    }
  }
  step();
}

if (outEl) {
  if (prefersReducedMotion) {
    outEl.textContent = textToType;
  } else {
    typeEffect(textToType, outEl);
  }
}

// =========================================================
// 2. Tab bar: highlight tab aktif sesuai scroll + toggle mobile menu
// =========================================================
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('main section[id]');
const statusSection = document.getElementById('statusSection');

const sectionFileNames = {
  beranda: 'beranda.html',
  profil: 'profil.md',
  proyek: 'proyek.js',
  kontak: 'kontak.txt'
};

function setActiveTab(id) {
  tabs.forEach(tab => {
    tab.classList.toggle('is-active', tab.dataset.tab === id);
  });
  if (statusSection && sectionFileNames[id]) {
    statusSection.textContent = sectionFileNames[id];
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveTab(entry.target.id);
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));

const menuToggle = document.getElementById('menuToggle');
const tabsWrap = document.querySelector('.tabbar__tabs');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    tabsWrap.classList.toggle('is-open');
  });
  tabs.forEach(tab => tab.addEventListener('click', () => tabsWrap.classList.remove('is-open')));
}

// =========================================================
// 3. Status bar: jam realtime
// =========================================================
const statusTime = document.getElementById('statusTime');
function updateClock() {
  if (!statusTime) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  statusTime.textContent = `${hh}:${mm}`;
}
updateClock();
setInterval(updateClock, 1000 * 30);

// =========================================================
// 4. Tahun otomatis di footer
// =========================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =========================================================
// 5. Toggle tema terang/gelap (PEMBARUAN TAMPILAN)
//    Pilihan tema disimpan di localStorage agar tetap
//    tersimpan saat pengunjung membuka website lagi.
// =========================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.textContent = '🌙';
  } else {
    root.removeAttribute('data-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
  }
}

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const nextTheme = isLight ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });
}

// =========================================================
// 6. Animasi scroll-reveal (PEMBARUAN TAMPILAN)
//    Elemen dengan class "reveal" akan muncul perlahan
//    (fade + geser naik) saat masuk ke area layar.
// =========================================================
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
}

// =========================================================
// 7. Form kontak (tanpa backend / PHP — GitHub Pages statis)
//    Catatan: ganti action form ini dengan endpoint Formspree/Web3Forms
//    jika ingin pesan benar-benar terkirim ke email Anda.
// =========================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name');

    // DEMO: menampilkan status sukses di halaman.
    // Untuk pengiriman email sungguhan gratis tanpa server,
    // daftar di https://web3forms.com atau https://formspree.io
    // lalu ganti kode di bawah ini dengan fetch() ke endpoint mereka.
    formStatus.textContent = `Terima kasih, ${name}! Pesan Anda telah dicatat (mode demo).`;
    contactForm.reset();
  });
}

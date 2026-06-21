/**
 * app.js — Inisialisasi utama & event listeners umum
 * Bakso Mantap Jaya
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== INIT MODULES ===== */
  initGallery();
  initGalleryEvents();
  initMenuTabs();
  initCheckout();
  initBooking();
  renderCart();
  updateCartBadge();

  /* ===== NAVBAR TOGGLE (MOBILE) ===== */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animasi hamburger → X
    const spans = navToggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform    = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity      = '0';
      spans[2].style.transform    = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Tutup nav saat link di-klik (mobile)
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle?.querySelectorAll('span');
      spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ===== NAVBAR SCROLL EFFECT ===== */
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 4px 24px rgba(50,20,0,.15)';
    } else {
      navbar.style.boxShadow = '';
    }
  });

  /* ===== SMOOTH SCROLL FIX FOR ANCHOR LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id], div[id="keranjang"]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('nav-active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  /* ===== INIT DELIVERY METHOD (default: delivery) ===== */
  setMethod('delivery');

});

/* ===== ACTIVE NAV STYLE ===== */
const style = document.createElement('style');
style.textContent = `
  .nav-links a.nav-active {
    color: var(--primary) !important;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 2px;
  }
`;
document.head.appendChild(style);

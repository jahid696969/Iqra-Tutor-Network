'use strict';

/* ================================================================
   IQRA TUTOR NETWORK — main.js
   Configuration + Interactivity
   ================================================================

   HOW TO UPDATE THIS FILE:
   ─────────────────────────
   All URLs and contact details are in the CONFIG object below.
   Edit the values there — the rest of the page updates automatically.

   ================================================================ */

const CONFIG = {
  /* ── Registration Form ───────────────────────────────────────── */
  TUTOR_REGISTRATION_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSd3MeF2MW2JxgwvosRw3t-cynx04A4gH8ZKEYZuBL3fkk2Ocg/viewform?usp=header',

  /* ── Contact ─────────────────────────────────────────────────── */
  WHATSAPP_NUMBER: '8801572929029', // Include country code, no + or spaces

  /* ── Social ──────────────────────────────────────────────────── */
  FACEBOOK_PAGE_URL: 'https://www.facebook.com/share/1B5NVWtCXV/',

  /* ── Policy Pages ────────────────────────────────────────────── */
  // TODO (Business owner): Replace '#' with real URLs when pages exist
  PRIVACY_POLICY_URL: '#',
  TERMS_URL:          '#',
};

/* ================================================================
   CONFIGURATION CHECKLIST
   ─────────────────────────────────────────────────────────────────
   ✅  TUTOR_REGISTRATION_URL  — Set (Google Form)
   ✅  WHATSAPP_NUMBER         — Set (01572929029)
   ✅  FACEBOOK_PAGE_URL      — Set (facebook.com/share/1B5NVWtCXV/)
   ⚑   PRIVACY_POLICY_URL     — Needs real URL
   ⚑   TERMS_URL              — Needs real URL

   BUSINESS POLICY — ITEMS NEEDING CONFIRMATION:
   ⚑   Exact commission payment timing (when does the tutor pay?)
   ⚑   Cancellation or exceptional-case commission arrangements
   ⚑   Early-termination policy if a tuition ends before one month
   ⚑   Dispute resolution process
   ================================================================ */

/* ── Apply config URLs to DOM ───────────────────────────────────── */
function applyConfig() {
  // Registration URLs
  document.querySelectorAll('[href="TUTOR_REGISTRATION_URL"]').forEach(el => {
    el.href = CONFIG.TUTOR_REGISTRATION_URL;
  });

  // Facebook
  document.querySelectorAll('[href="FACEBOOK_PAGE_URL"]').forEach(el => {
    el.href = CONFIG.FACEBOOK_PAGE_URL;
    if (CONFIG.FACEBOOK_PAGE_URL === '#') {
      el.setAttribute('title', 'Facebook page URL not yet configured');
    }
  });

  // WhatsApp links (already hardcoded in HTML but normalise from config)
  const waNum = CONFIG.WHATSAPP_NUMBER;
  document.querySelectorAll('[href^="https://wa.me/"]').forEach(el => {
    el.href = `https://wa.me/${waNum}`;
  });

  // Policy links
  document.querySelectorAll('[href="PRIVACY_POLICY_URL"]').forEach(el => { el.href = CONFIG.PRIVACY_POLICY_URL; });
  document.querySelectorAll('[href="TERMS_URL"]').forEach(el => { el.href = CONFIG.TERMS_URL; });

  // Footer year
  const yr = document.getElementById('footer-year');
  if (yr) yr.textContent = new Date().getFullYear();
}

/* ── Navbar scroll shadow ───────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Mobile hamburger menu ──────────────────────────────────────── */
function initMobileMenu() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── FAQ accordion ──────────────────────────────────────────────── */
function initFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';
      const bodyId  = btn.getAttribute('aria-controls');
      const body    = document.getElementById(bodyId);
      const item    = btn.closest('.faq-item');

      // Close all
      list.querySelectorAll('.faq-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const bid = b.getAttribute('aria-controls');
        const bd  = document.getElementById(bid);
        if (bd) bd.classList.remove('open');
        b.closest('.faq-item')?.classList.remove('faq-item--open');
      });

      // Open clicked (unless it was already open)
      if (!isOpen && body) {
        btn.setAttribute('aria-expanded', 'true');
        body.classList.add('open');
        item?.classList.add('faq-item--open');
      }
    });
  });
}

/* ── Smooth scroll for anchor links ────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 64;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Lightweight scroll-reveal (no library) ─────────────────────── */
function initReveal() {
  // Mark elements for reveal
  const targets = [
    '.problem-card',
    '.step',
    '.value-card',
    '.network-card',
    '.trust-card',
    '.faq-item',
    '.section-header',
    '.coverage-block',
    '.screening-col',
    '.commission-card',
    '.commission-details',
    '.register-split__content',
    '.register-split__aside',
    '.fb-connect__content',
    '.fb-connect__visual',
  ];

  const els = document.querySelectorAll(targets.join(','));
  els.forEach(el => { el.classList.add('js-reveal'); });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('js-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ── Init ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initNav();
  initMobileMenu();
  initFAQ();
  initSmoothScroll();
  requestAnimationFrame(() => setTimeout(initReveal, 80));
});

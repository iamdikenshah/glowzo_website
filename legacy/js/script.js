/* ============================================================
   Glowzo — Main JavaScript
   Handles: Navbar, Scroll Reveal, Testimonials Carousel,
            Contact Form Validation, Year, Smooth Scroll
   ============================================================ */

'use strict';

/* ---- Helpers ---- */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============================================================
   1. NAVBAR — sticky scroll effect + hamburger + active links
   ============================================================ */
(function initNavbar() {
  const navbar    = qs('.navbar');
  const hamburger = qs('.navbar__hamburger');
  const mobileMenu = qs('.navbar__mobile');
  if (!navbar) return;

  /* --- Scroll-based class toggle --- */
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* --- Hamburger toggle --- */
  const closeMenu = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
  };

  hamburger?.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when a mobile nav link is clicked
  qsa('.navbar__mobile .navbar__link').forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', e => {
    if (mobileMenu?.classList.contains('open') && !navbar.contains(e.target)) closeMenu();
  });

  /* --- Active link highlighting on scroll --- */
  const sections = qsa('section[id]');
  const navLinks = qsa('.navbar__link[href*="#"]');

  const highlightLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${current}` || href === `index.html#${current}`);
    });
  };

  window.addEventListener('scroll', highlightLink, { passive: true });
  highlightLink();
})();

/* ============================================================
   2. SCROLL REVEAL — Intersection Observer
   ============================================================ */
(function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  qsa('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================================
   3. TESTIMONIALS — Infinite marquee
   Duplicate cards so the CSS animation loops seamlessly.
   Pause-on-hover is handled entirely in CSS.
   ============================================================ */
(function initTestimonials() {
  const track = qs('.testimonials__track');
  if (!track) return;

  // Clone every card and append — gives the -50% translateX loop a seamless join
  const originals = [...track.children];
  originals.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); // hide duplicates from screen readers
    track.appendChild(clone);
  });
})();

/* ============================================================
   4. CONTACT FORM VALIDATION
   Client-side only; simulates async submission
   ============================================================ */
(function initContactForm() {
  const form = qs('.contact-form');
  if (!form) return;

  /* --- Per-field validation logic --- */
  const rules = {
    name:    { required: true, minLen: 2, label: 'Full name' },
    phone:   { required: true, pattern: /^[6-9]\d{9}$/, patternMsg: 'Enter a valid 10-digit Indian mobile number.' },
    email:   { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMsg: 'Enter a valid email address.' },
    message: { required: true, minLen: 10, label: 'Message' },
  };

  const setFieldState = (input, state, msg = '') => {
    input.classList.toggle('is-error',   state === 'error');
    input.classList.toggle('is-success', state === 'success');
    const msgEl = input.closest('.form-group')?.querySelector('.form-msg');
    if (!msgEl) return;
    msgEl.textContent = msg;
    msgEl.className   = `form-msg${state === 'error' ? ' error-msg' : ''}`;
  };

  const validateField = input => {
    const name = input.name;
    const val  = input.value.trim();
    const rule = rules[name];
    if (!rule) return true;

    if (rule.required && !val) {
      setFieldState(input, 'error', `${rule.label || name.charAt(0).toUpperCase() + name.slice(1)} is required.`);
      return false;
    }
    if (rule.minLen && val.length < rule.minLen) {
      setFieldState(input, 'error', `Must be at least ${rule.minLen} characters.`);
      return false;
    }
    if (rule.pattern && val && !rule.pattern.test(val.replace(/\s/g, ''))) {
      setFieldState(input, 'error', rule.patternMsg);
      return false;
    }
    setFieldState(input, 'success');
    return true;
  };

  // Validate on blur, re-validate on input when already errored
  qsa('.form-input', form).forEach(input => {
    input.addEventListener('blur',  () => validateField(input));
    input.addEventListener('input', () => { if (input.classList.contains('is-error')) validateField(input); });
  });

  /* --- Form submit --- */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const inputs = qsa('.form-input', form);
    const allValid = inputs.map(validateField).every(Boolean);
    if (!allValid) return;

    const btn = qs('.form-submit', form);
    const alert = qs('.form__alert--success', form.closest('.contact__form-wrap') ?? document);

    // Simulate async send
    btn.textContent = 'Sending…';
    btn.disabled = true;

    await new Promise(res => setTimeout(res, 1200));

    form.reset();
    inputs.forEach(inp => setFieldState(inp, 'idle'));
    btn.textContent = 'Send Message';
    btn.disabled = false;

    if (alert) {
      alert.classList.add('show');
      setTimeout(() => alert.classList.remove('show'), 6000);
    }
  });
})();

/* ============================================================
   5. FOOTER — auto-update copyright year
   ============================================================ */
(function initYear() {
  const yearEl = qs('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ============================================================
   6. SMOOTH SCROLL for anchor links (fallback)
   CSS scroll-behavior handles most; this ensures offset for
   the fixed navbar on browsers that may ignore the CSS.
   ============================================================ */
(function initSmoothScroll() {
  const OFFSET = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-h') || '70',
    10
  );

  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').replace(/^.*#/, '#');
      if (id === '#') return;
      const target = qs(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   7. SERVICE PAGE — anchor links that point to index.html#id
   (no-op on service.html; already handled by href)
   ============================================================ */

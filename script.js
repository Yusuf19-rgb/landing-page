/* ════════════════════════════════════════════
   ARCH.STUDIO — script.js
   Architecture Studio Landing Page Scripts
   ════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   STICKY NAVBAR — adds .scrolled on scroll
   ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ─────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────── */
const navMobile = document.getElementById('navMobile');

function openMenu() {
  navMobile.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMobile.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────
   SCROLL REVEAL — IntersectionObserver
   ───────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ─────────────────────────────────────────
   COUNT-UP ANIMATION — stats section
   ───────────────────────────────────────── */

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Uses an ease-out cubic curve for a natural deceleration.
 *
 * @param {HTMLElement} el       - The element whose innerHTML to update
 * @param {number}      target   - The final number to count to
 * @param {string}      suffix   - Superscript suffix character (e.g. '+', '%')
 * @param {number}      duration - Animation duration in milliseconds
 */
function animateCount(el, target, suffix, duration = 1800) {
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;

    const elapsed  = timestamp - startTimestamp;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic: decelerates as it approaches the target
    const eased  = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.innerHTML = current + '<sup>' + suffix + '</sup>';

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

// Observe each stat number and trigger count-up once visible
const statNums = document.querySelectorAll('.stat-num[data-target]');

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '+';

        animateCount(el, target, suffix);
        statObserver.unobserve(el); // Run only once
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach((el) => statObserver.observe(el));

/* ─────────────────────────────────────────
   CONTACT FORM — submit handler
   ───────────────────────────────────────── */

/**
 * Handles form submission with a temporary success state.
 * In a real project, replace the body of this function with
 * a fetch() call to your backend / form service endpoint.
 *
 * @param {SubmitEvent} e
 */
function handleSubmit(e) {
  e.preventDefault();

  const form   = e.target;
  const btn    = form.querySelector('.form-submit');
  const fields = form.querySelectorAll('input, textarea, select');

  // Disable form while "sending"
  btn.disabled = true;
  fields.forEach((f) => (f.disabled = true));

  // Simulate async submission (replace with real fetch below)
  setTimeout(() => {
    btn.textContent        = 'Message Sent ✓';
    btn.style.background   = '#2E7D32';
    btn.style.color        = '#fff';

    // Reset after 3 seconds
    setTimeout(() => {
      btn.textContent      = 'Send Message';
      btn.style.background = '';
      btn.style.color      = '';
      btn.disabled         = false;
      fields.forEach((f) => (f.disabled = false));
      form.reset();
    }, 3000);
  }, 800);

  /*
  // ── Real fetch example ──────────────────────────────
  const data = new FormData(form);

  fetch('/api/contact', {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then(() => {
      btn.textContent = 'Message Sent ✓';
    })
    .catch(() => {
      btn.textContent = 'Error — please try again';
    })
    .finally(() => {
      btn.disabled = false;
    });
  */
}

/* ─────────────────────────────────────────
   SMOOTH SCROLL — all in-page anchor links
   ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');

    // Skip bare "#" links (e.g. placeholder hrefs)
    if (id.length <= 1) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────────
   NAV CTA — scroll to contact
   ───────────────────────────────────────── */
document.querySelector('.nav-cta')?.addEventListener('click', () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
});

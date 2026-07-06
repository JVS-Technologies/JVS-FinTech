/**
 * JVS FinTech — Landing Page Interactivity
 * Pure vanilla JavaScript, zero dependencies.
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
   * 1. Scroll-Triggered Reveal Animations
   * Uses IntersectionObserver to add `.active` once per element.
   * ============================================================ */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // fire only once
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal, .fade-in-left, .fade-in-right').forEach((el) => {
    revealObserver.observe(el);
  });

  /* ============================================================
   * 2. Navbar Scroll Effect
   * Adds `.scrolled` to the header after 50 px of scroll.
   * ============================================================ */
  const header = document.querySelector('.header');

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // set initial state

  /* ============================================================
   * 3. Mobile Menu Toggle
   * Hamburger ↔ X animation via `.active` classes.
   * ============================================================ */
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when any nav link is clicked
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  /* ============================================================
   * 4. Smooth Scroll with Header Offset
   * All anchor links scroll smoothly, accounting for fixed header.
   * ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return; // skip bare "#"

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  /* ============================================================
   * 5. Active Nav-Link Highlighting on Scroll
   * Highlights the nav link whose section is currently in view.
   * ============================================================ */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [];

  // Build a list of sections that correspond to nav links
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      const section = document.querySelector(href);
      if (section) sections.push({ el: section, link });
    }
  });

  const highlightActiveLink = () => {
    const headerHeight = header ? header.offsetHeight : 0;
    const scrollPos = window.scrollY + headerHeight + 1; // +1 for rounding

    // Walk backwards so the topmost visible section wins
    let currentSection = null;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollPos >= sections[i].el.offsetTop) {
        currentSection = sections[i];
        break;
      }
    }

    navLinks.forEach((link) => link.classList.remove('active'));
    if (currentSection) {
      currentSection.link.classList.add('active');
    }
  };

  window.addEventListener('scroll', highlightActiveLink, { passive: true });
  highlightActiveLink(); // set initial state

  /* ============================================================
   * 6. Animated Counters
   * Counts from 0 → data-target over ~2 s with ease-out.
   * Appends data-suffix (e.g. '+', '%') if present.
   * ============================================================ */
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    let startTime = null;

    const easeOutQuad = (t) => t * (2 - t); // deceleration curve

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentValue = Math.floor(easedProgress * target);

      el.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix; // ensure exact final value
      }
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  /* ============================================================
   * 7. Hero Parallax on Mouse Move
   * Subtle translate on `.hero-image` based on cursor position.
   * Max offset ≈ 15 px in any direction.
   * ============================================================ */
  const heroSection = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');

  if (heroSection && heroImage) {
    const MAX_OFFSET = 15; // px

    heroSection.addEventListener('mousemove', (e) => {
      const { width, height, left, top } = heroSection.getBoundingClientRect();

      // Normalise cursor position to -1 … +1 from centre
      const xNorm = ((e.clientX - left) / width - 0.5) * 2;
      const yNorm = ((e.clientY - top) / height - 0.5) * 2;

      const translateX = xNorm * MAX_OFFSET;
      const translateY = yNorm * MAX_OFFSET;

      heroImage.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    // Reset on mouse leave so image doesn't stay offset
    heroSection.addEventListener('mouseleave', () => {
      heroImage.style.transform = 'translate(0, 0)';
    });
  }

  /* ============================================================
   * 8. Typing Effect
   * Cycles through phrases with type → pause → delete → next.
   * ============================================================ */
  const typingEl = document.querySelector('.typing-text');

  if (typingEl) {
    const phrases = [
      'Smart Accounting.',
      'Powerful Reports.',
      'GST Compliance.',
      'Offline-First.',
    ];

    const TYPE_SPEED = 70;    // ms per character typed
    const DELETE_SPEED = 40;  // ms per character deleted
    const PAUSE_AFTER = 2000; // pause at full phrase
    const PAUSE_BEFORE = 500; // pause after deleting

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        // Typing forward
        charIndex++;
        typingEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === currentPhrase.length) {
          // Finished typing — pause, then start deleting
          isDeleting = true;
          setTimeout(tick, PAUSE_AFTER);
          return;
        }

        setTimeout(tick, TYPE_SPEED);
      } else {
        // Deleting backward
        charIndex--;
        typingEl.textContent = currentPhrase.substring(0, charIndex);

        if (charIndex === 0) {
          // Finished deleting — move to next phrase
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, PAUSE_BEFORE);
          return;
        }

        setTimeout(tick, DELETE_SPEED);
      }
    };

    // Kick off the loop
    setTimeout(tick, PAUSE_BEFORE);
  }

  /* ============================================================
   * 9. Copyright Year
   * Auto-fills the current year into #current-year.
   * ============================================================ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

}); // end DOMContentLoaded

/**
 * JVS FinTech — Landing Page Interactivity
 * Pure vanilla JavaScript, zero dependencies.
 * 
 * Changelog v3.0:
 * - Throttled hero parallax via rAF for jank-free movement
 * - Added Release History accordion
 * - Debounced scroll handlers for performance
 * - Removed backdrop-filter dependency from JS
 */
document.addEventListener('DOMContentLoaded', () => {
  const RELEASE_API_URL = 'https://api.github.com/repos/JV-Vigneesh/JVS-FinTech/releases/latest';
  const FALLBACK_VERSION = 'Server Unreachable';
  const FALLBACK_RELEASE_URL = 'https://github.com/JV-Vigneesh/JVS-FinTech/releases/latest';

  const cleanVersion = (value) => (value || FALLBACK_VERSION).replace(/^v/i, '');

  const updateReleaseUi = (release) => {
    const version = cleanVersion(release?.tag_name || release?.name);
    const releaseUrl = release?.html_url || FALLBACK_RELEASE_URL;
    const installerAsset = release?.assets?.find((asset) =>
      /\.(exe|msi|zip)$/i.test(asset.name || '')
    );
    const downloadUrl = installerAsset?.browser_download_url || releaseUrl;
    const releaseName = release?.name && cleanVersion(release.name) !== version
      ? release.name
      : `JVS FinTech ${version}`;
    const publishedDate = release?.published_at
      ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(release.published_at))
      : null;

    document.querySelectorAll('[data-release-version]').forEach((el) => {
      el.textContent = version;
    });

    document.querySelectorAll('[data-download-link]').forEach((link) => {
      link.href = downloadUrl;
    });

    document.querySelectorAll('[data-release-link]').forEach((link) => {
      link.href = releaseUrl;
    });

    const releaseTitle = document.getElementById('release-title');
    if (releaseTitle) {
      releaseTitle.textContent = releaseName;
    }

    const releaseMeta = document.getElementById('release-meta');
    if (releaseMeta) {
      const assetText = installerAsset ? `Installer: ${installerAsset.name}` : 'Open GitHub to choose a download asset.';
      releaseMeta.textContent = publishedDate
        ? `Published ${publishedDate}. ${assetText}`
        : 'Release details load automatically from GitHub when available.';
    }

    const softwareSchema = document.querySelector('script[type="application/ld+json"]');
    if (softwareSchema) {
      try {
        const schema = JSON.parse(softwareSchema.textContent);
        schema.softwareVersion = version;
        schema.downloadUrl = downloadUrl;
        softwareSchema.textContent = JSON.stringify(schema);
      } catch (error) {
        // Keep the static schema fallback if parsing ever fails.
      }
    }
  };

  const loadLatestRelease = async () => {
    updateReleaseUi({ tag_name: FALLBACK_VERSION, html_url: FALLBACK_RELEASE_URL });

    try {
      const response = await fetch(RELEASE_API_URL, {
        headers: { Accept: 'application/vnd.github+json' },
      });

      if (!response.ok) return;
      const release = await response.json();
      updateReleaseUi(release);
    } catch (error) {
      // Offline or rate-limited visitors still see the fallback version.
    }
  };

  loadLatestRelease();

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
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal, .fade-in-left, .fade-in-right').forEach((el) => {
    revealObserver.observe(el);
  });

  /* ============================================================
   * 2. Navbar Scroll Effect
   * Adds `.scrolled` to the header after 50 px of scroll.
   * Uses rAF-throttled handler for smooth performance.
   * ============================================================ */
  const header = document.querySelector('.header');
  let headerTicking = false;

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    headerTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!headerTicking) {
      requestAnimationFrame(handleHeaderScroll);
      headerTicking = true;
    }
  }, { passive: true });
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
      menuToggle.setAttribute('aria-expanded', String(navMenu.classList.contains('active')));
    });

    // Close menu when any nav link is clicked
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
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
   * Throttled with rAF for performance.
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

  let highlightTicking = false;

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
    highlightTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!highlightTicking) {
      requestAnimationFrame(highlightActiveLink);
      highlightTicking = true;
    }
  }, { passive: true });
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
   * 7. Hero Parallax (Removed per user request)
   * ============================================================ */

  /* ============================================================
   * 8. Typing Effect
   * Cycles through phrases with type → pause → delete → next.
   * ============================================================ */
  const typingEl = document.querySelector('.typing-text');

  if (typingEl) {
    const phrases = [
      'Offline-First',
      'Smart Accounting',
      'Powerful Reports',
      'GST Compliance',
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

  /* ============================================================
   * 10. FAQ Accordion
   * ============================================================ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all first
      faqItems.forEach(i => {
        i.classList.remove('active');
        const ans = i.querySelector('.faq-answer');
        const btn = i.querySelector('.faq-question');
        if (ans) ans.style.maxHeight = null;
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });




  /* ============================================================
   * 12. Screenshot Carousel
   * ============================================================ */
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slideCount = dots.length;

    const updateCarousel = (index) => {
      currentSlide = (index + slideCount) % slideCount;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      dots.forEach(dot => dot.classList.remove('active'));
      dots.forEach(dot => dot.removeAttribute('aria-current'));
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
        dots[currentSlide].setAttribute('aria-current', 'true');
      }
    };

    nextBtn.addEventListener('click', () => updateCarousel(currentSlide + 1));
    prevBtn.addEventListener('click', () => updateCarousel(currentSlide - 1));

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateCarousel(index));
    });
  }


}); // end DOMContentLoaded

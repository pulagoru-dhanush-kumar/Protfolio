

(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  /* ==================== NAVBAR SCROLL ==================== */
  const navbar   = $('#navbar');
  const navLinks = $$('.nav-link');
  const hamburger = $('#hamburger');
  const navMenu   = $('#navMenu');

  function handleNavScroll() {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveNav();
  }

  function updateActiveNav() {
    const sections   = ['home','about','projects','experience','skills','contact'];
    const scrollPos  = window.scrollY + 100;

    sections.forEach(id => {
      const sec = $(`#${id}`);
      if (!sec) return;
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-nav') === id) link.classList.add('active');
        });
      }
    });
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ==================== HAMBURGER MENU ==================== */
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  /* ==================== SMOOTH SCROLL ==================== */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });

  /* ==================== SCROLL REVEAL ==================== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), idx * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  $$('[data-reveal]').forEach(el => revealObserver.observe(el));

  /* ==================== ANIMATED COUNTERS ==================== */
  const statNumbers = $$('.stat-number');
  let countersAnimated = false;

  // Calculate dynamic experience
  const joinDate = new Date('2025-02-01');
  const today    = new Date();
  const yearsExp = ((today - joinDate) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

  // Update first stat with dynamic experience
  const firstStat = statNumbers[0];
  if (firstStat) firstStat.setAttribute('data-count', yearsExp);

  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersAnimated) {
      countersAnimated = true;
      animateCounters();
      counterObserver.disconnect();
    }
  }, { threshold: 0.4 });

  const heroStats = $('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  function animateCounters() {
    statNumbers.forEach((stat, i) => {
      const target   = parseFloat(stat.getAttribute('data-count'));
      const duration = 1800;
      const steps    = 60;
      const increment = target / steps;
      let current = 0;
      let frame   = 0;

      const tick = () => {
        current += increment;
        frame++;
        if (frame < steps) {
          stat.textContent = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
          requestAnimationFrame(tick);
        } else {
          // Final values
          if (i === 0) stat.textContent = yearsExp + '+';
          else if (target === 25) stat.textContent = '25+';
          else stat.textContent = target;
        }
      };
      requestAnimationFrame(tick);
    });
  }

  /* ==================== COPY EMAIL ==================== */
  const copyBtn   = $('#copyEmail');
  const emailLink = $('#emailLink');

  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', async () => {
      const email = emailLink.textContent.trim();
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(email);
        } else {
          fallbackCopy(email);
        }
        showCopySuccess();
      } catch {
        fallbackCopy(email);
      }
    });
  }

  function showCopySuccess() {
    if (!copyBtn) return;
    copyBtn.classList.add('copied');
    const orig = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = orig;
    }, 2000);
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showCopySuccess(); } catch {}
    document.body.removeChild(ta);
  }

  /* ==================== PARALLAX (subtle) ==================== */
  let rafPending = false;
  window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      $$('.bg-blob').forEach((blob, i) => {
        const speed = 0.12 + i * 0.06;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
      });
      rafPending = false;
    });
  }, { passive: true });

  /* ==================== SCROLL TO TOP ==================== */
  const topBtn = document.createElement('button');
  topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  topBtn.setAttribute('aria-label', 'Scroll to top');
  Object.assign(topBtn.style, {
    position:'fixed', bottom:'28px', right:'28px',
    width:'46px', height:'46px',
    background:'linear-gradient(135deg,#1a56e8,#6c3de8)',
    border:'none', borderRadius:'50%', color:'#fff',
    fontSize:'1.1rem', cursor:'pointer',
    opacity:'0', visibility:'hidden',
    transition:'all 0.3s ease', zIndex:'990',
    boxShadow:'0 4px 18px rgba(26,86,232,0.35)'
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  topBtn.addEventListener('mouseenter', () => { topBtn.style.transform='translateY(-4px) scale(1.1)'; });
  topBtn.addEventListener('mouseleave', () => { topBtn.style.transform='translateY(0) scale(1)'; });
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) { topBtn.style.opacity='1'; topBtn.style.visibility='visible'; }
    else                       { topBtn.style.opacity='0'; topBtn.style.visibility='hidden'; }
  }, { passive: true });

  /* ==================== SKILL TAGS HOVER ==================== */
  $$('.skill-tag, .tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px) scale(1.04)'; });
    tag.addEventListener('mouseleave', function() { this.style.transform = ''; });
  });

  /* ==================== PROJECT CARD HOVER ==================== */
  $$('.project-card, .info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-6px)';
      this.style.boxShadow = '0 14px 44px rgba(26,86,232,0.14)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  /* ==================== KEYBOARD NAV ==================== */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
    }
    if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
  });
  document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));

  /* ==================== LOAD REVEAL HERO ==================== */
  window.addEventListener('load', () => {
    setTimeout(() => {
      $$('.hero [data-reveal]').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 130);
      });
    }, 200);
  });

  /* ==================== LAZY IMAGES ==================== */
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.dataset.src) {
          e.target.src = e.target.dataset.src;
          e.target.removeAttribute('data-src');
          imgObserver.unobserve(e.target);
        }
      });
    });
    $$('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  /* ==================== CONSOLE MSG ==================== */
  console.log('%c👋 Hello there!', 'font-size:22px;font-weight:bold;color:#1a56e8;');
  console.log('%cLooking to hire? Let\'s connect!\n📧 dhanushpulagoru@gmail.com','font-size:13px;color:#3d4457;');
  console.log('%c✨ Portfolio loaded successfully!', 'color:#0ea875;font-weight:bold;');

})();
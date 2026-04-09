/* ==========================================================================
   PORTFOLIO INTERACTIVE FEATURES
   Smooth animations, scroll reveals, and dynamic interactions
   ========================================================================== */

(function() {
  'use strict';

  // ==================== UTILITIES ====================
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // ==================== NAVBAR SCROLL EFFECT ====================
  const navbar = $('#navbar');
  const navLinks = $$('.nav-link');
  const hamburger = $('#hamburger');
  const navMenu = $('#navMenu');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    updateActiveNav();
  }

  // Update active navigation based on scroll position
  function updateActiveNav() {
    const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
    const scrollPos = window.scrollY + 100;

    sections.forEach(sectionId => {
      const section = $(`#${sectionId}`);
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-nav') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // ==================== HAMBURGER MENU ====================
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ==================== SMOOTH SCROLL ====================
  $$('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = $(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== SCROLL REVEAL ANIMATION ====================
  const revealElements = $$('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100); // Stagger animation
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==================== ANIMATED COUNTERS ====================
  const statNumbers = $$('.stat-number');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  if ($('.hero-stats')) {
    counterObserver.observe($('.hero-stats'));
  }
// Calculate dynamic experience
const joinDate = new Date('2025-02-01');
const today = new Date();
const yearsExperience = ((today - joinDate) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

// Update the data-count attribute
const experienceStat = document.querySelector('.hero-stats .stat-number');
if (experienceStat) {
  experienceStat.setAttribute('data-count', yearsExperience);
}


function animateCounters() {
  statNumbers.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        // Display decimal for experience, integer for others
        if (stat === experienceStat) {
          stat.textContent = yearsExperience + '+';
        } else {
          stat.textContent = target + (target === 25 ? '+' : '');
        }
      }
    };

    updateCounter();
  });
}

  // ==================== COPY EMAIL FUNCTIONALITY ====================
  const copyEmailBtn = $('#copyEmail');
  const emailLink = $('#emailLink');

  if (copyEmailBtn && emailLink) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailLink.textContent;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
          showCopySuccess();
        } else {
          fallbackCopyEmail(email);
        }
      } catch (err) {
        console.error('Failed to copy email:', err);
        fallbackCopyEmail(email);
      }
    });
  }

  function showCopySuccess() {
    copyEmailBtn.classList.add('copied');
    const originalHTML = copyEmailBtn.innerHTML;
    copyEmailBtn.innerHTML = '<i class=\"fas fa-check\"></i>';

    setTimeout(() => {
      copyEmailBtn.classList.remove('copied');
      copyEmailBtn.innerHTML = originalHTML;
    }, 2000);
  }

  function fallbackCopyEmail(email) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      showCopySuccess();
    } catch (err) {
      alert('Email: ' + email);
    }

    document.body.removeChild(textArea);
  }

  // ==================== MAILTO LINK HANDLER ====================
  $$('a[href^=\"mailto:\"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = link.getAttribute('href');
    });
  });

  // ==================== TECH BADGES FLOATING ANIMATION ====================
  const techBadges = $$('.tech-badge');
  
  techBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.2}s`;
  });

  // ==================== PARALLAX EFFECT (Subtle) ====================
  function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = $$('.gradient-orb');

    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ==================== GLASS CARD TILT EFFECT (Optional) ====================
  const glassCards = $$('.glass-card');

  glassCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });

  // ==================== LOAD ANIMATIONS ====================
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
      const heroElements = $$('.hero [data-reveal]');
      heroElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('revealed');
        }, index * 150);
      });
    }, 300);
  });

  // ==================== CONSOLE MESSAGE ====================
  console.log(
    '%c👋 Hello there!',
    'font-size: 24px; font-weight: bold; color: #00d4ff;'
  );
  console.log(
    "%cLooking to hire? Let's connect!\n📧 dhanushpulagoru@gmail.com",
    'font-size: 14px; color: #b4bcd0;'
  );
  // ==================== PERFORMANCE OPTIMIZATION ====================
  // Lazy load images if needed
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    $$('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ==================== SKILL TAGS INTERACTION ====================
  const skillTags = $$('.skill-tag, .tech-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ==================== SOCIAL LINKS HOVER EFFECT ====================
  const socialLinks = $$('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ==================== PROJECT CARD HOVER EFFECT ====================
  const projectCards = $$('.project-card, .info-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 15px 50px rgba(0, 212, 255, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });

  // ==================== FEATURED PROJECT GLOW EFFECT ====================
  const showcaseCard = $('.showcase-card');
  
  if (showcaseCard) {
    showcaseCard.addEventListener('mousemove', (e) => {
      const rect = showcaseCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      showcaseCard.style.setProperty('--mouse-x', `${x}px`);
      showcaseCard.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  // ==================== KEYBOARD NAVIGATION ====================
  document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
    }
  });

  // ==================== ACCESSIBILITY IMPROVEMENTS ====================
  // Add focus visible for keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // ==================== SCROLL TO TOP FUNCTIONALITY ====================
  let scrollToTopBtn = null;

  function createScrollToTopButton() {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class=\"fas fa-arrow-up\"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    Object.assign(scrollToTopBtn.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
      border: 'none',
      borderRadius: '50%',
      color: 'white',
      fontSize: '1.25rem',
      cursor: 'pointer',
      opacity: '0',
      visibility: 'hidden',
      transition: 'all 0.3s ease',
      zIndex: '999',
      boxShadow: '0 4px 20px rgba(0, 212, 255, 0.4)'
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    scrollToTopBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.1)';
      this.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.6)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.4)';
    });

    document.body.appendChild(scrollToTopBtn);
  }

  createScrollToTopButton();

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });

  // ==================== INITIALIZE ====================
  console.log('%c✨ Portfolio Initialized Successfully!', 'color: #22ff88; font-weight: bold;');

})();

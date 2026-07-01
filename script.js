/* =============================================
   ARENA ARISTOCRAT — script.js
   ============================================= */

// ---- LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('open');
  });
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

// ---- BACK TO TOP ----
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- REVEAL ANIMATIONS ----
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- ANIMATED COUNTERS ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2200;
  const start = performance.now();

  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing function: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach(num => animateCounter(num));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-bar');
if (statsSection) counterObserver.observe(statsSection);

// ---- FAQ ACCORDION ----
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  btn?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    faqItems.forEach(i => i.classList.remove('open'));
    // Open clicked if it wasn't open
    if (!isOpen) item.classList.add('open');
  });
});

// ---- SMOOTH SCROLL FOR ALL # LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ---- FORM SUBMISSION ----
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#2a8a3e';
    btn.style.color = '#fff';
  }, 1000);
});

// ---- PARALLAX ON HERO ----
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroImg.style.transform = `scale(1.08) translateY(${scrolled * 0.2}px)`;
  }, { passive: true });
}

// ---- CURSOR GLOW (desktop only) ----
if (window.innerWidth > 1024) {
  const glow = document.createElement('div');
  glow.id = 'cursorGlow';
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ============================================
   JESSÉ OLIVEIRA — PORTFOLIO
   Cinematic GSAP animations
   ============================================ */

lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

/* ============================================
   CURSOR
   ============================================ */
(() => {
  if (window.innerWidth <= 768) return;
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.08 });
  });

  (function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-card, .btn-primary, .btn-glass, .sticky-cta-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
  });
})();

/* ============================================
   LOADER
   ============================================ */
const loader = document.getElementById('loader');
const loadTl = gsap.timeline({ onComplete: initAnimations });

loadTl
  .to('.loader-logo', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' })
  .to('.loader-bar', { opacity: 1, duration: 0.3 }, '-=0.2')
  .to('.loader-text', { opacity: 1, duration: 0.3 }, '-=0.1')
  .to('.loader-bar-fill', { width: '100%', duration: 1.2, ease: 'power2.inOut' }, '-=0.2')
  .to('.loader-inner', { opacity: 0, y: -20, duration: 0.4 }, '+=0.2')
  .to(loader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete: () => loader.style.display = 'none' }, '-=0.1');

/* ============================================
   NAVBAR
   ============================================ */
(() => {
  const nav = document.getElementById('navbar');
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 80);
    nav.classList.toggle('hidden', y > last && y > 200);
    last = y;
  });

  // Active link
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link[data-section]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
      }
    });
  }, { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' });
  secs.forEach(s => obs.observe(s));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      closeMobile();
    });
  });
})();

/* ============================================
   STICKY CTA
   ============================================ */
(() => {
  const cta = document.getElementById('sticky-cta');
  window.addEventListener('scroll', () => {
    cta.classList.toggle('visible', window.scrollY > window.innerHeight);
  });
})();

/* ============================================
   MOBILE MENU
   ============================================ */
const menuBtn = document.getElementById('menu-toggle');
const mobMenu = document.getElementById('mobile-menu');
const mobLinks = document.querySelectorAll('.mobile-link');

function openMobile() {
  menuBtn.classList.add('active');
  mobMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
  gsap.fromTo(mobLinks, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.15 });
}
function closeMobile() {
  menuBtn.classList.remove('active');
  mobMenu.classList.remove('open');
  document.body.style.overflow = '';
}
menuBtn.addEventListener('click', () => mobMenu.classList.contains('open') ? closeMobile() : openMobile());
mobLinks.forEach(l => l.addEventListener('click', closeMobile));

/* ============================================
   SKILLS
   ============================================ */
const skillCategories = {
  frontend: [
    { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'NextJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  ],
  backend: [
    { name: 'NodeJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg' },
    { name: 'ExpressJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-line.svg' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
    { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  ],
  mobile: [
    { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg' },
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  ],
  tools: [
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'assets/img/github.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  ],
};

// Populate categorized skills
function populateSkillCategory(containerId, skills) {
  const container = document.getElementById(containerId);
  if (!container) return;
  skills.forEach(s => {
    const pill = document.createElement('div');
    pill.className = 'skill-pill';
    const img = document.createElement('img');
    img.src = s.icon; img.alt = s.name; img.loading = 'lazy';
    const span = document.createElement('span');
    span.textContent = s.name;
    pill.appendChild(img);
    pill.appendChild(span);
    container.appendChild(pill);
  });
}

populateSkillCategory('skills-frontend', skillCategories.frontend);
populateSkillCategory('skills-backend', skillCategories.backend);
populateSkillCategory('skills-mobile', skillCategories.mobile);
populateSkillCategory('skills-tools', skillCategories.tools);

/* ============================================
   MAIN ANIMATIONS
   ============================================ */
function initAnimations() {
  const isDesktop = window.innerWidth > 768;

  // =============== HERO ===============
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  heroTl
    .to('.hero-title-word', { y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.2 })
    .to('.hero-tag', { opacity: 1, duration: 0.6 }, '-=0.6')
    .to('.hero-typed', { opacity: 1, duration: 0.5 }, '-=0.3')
    .add(() => {
      new Typed('#typed', {
        strings: ['Full Stack Developer', 'Mobile Developer', 'Flutter Developer', 'React Developer', 'Node.js Developer', 'Backend Developer'],
        typeSpeed: 50, backSpeed: 30, backDelay: 2000, loop: true,
      });
    }, '-=0.3')
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('.hero-socials', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('.hero-scroll', { opacity: 1, duration: 0.5 }, '-=0.2');

  // Hero parallax on scroll — image zooms, content fades
  if (isDesktop) {
    gsap.to('.hero-bg-img', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      scale: 1.3, ease: 'none',
    });
    gsap.to('.hero-content', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: true },
      y: -100, opacity: 0, filter: 'blur(10px)', ease: 'none',
    });
  }

  // =============== MARQUEE scroll speed ===============
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    gsap.to(marqueeTrack, {
      scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 0.5 },
      x: -200, ease: 'none',
    });
  }

  // =============== SECTION HEADINGS ===============
  document.querySelectorAll('.section-heading').forEach(h => {
    const label = h.parentElement.querySelector('.section-label');
    const spans = h.querySelectorAll('.heading-line > span');
    const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top 82%', toggleActions: 'play none none none' } });
    if (label) tl.to(label, { opacity: 1, duration: 0.4 });
    if (spans.length) tl.to(spans, { y: 0, duration: 0.8, stagger: 0.12, ease: 'power4.out' }, '-=0.1');
  });

  // =============== ABOUT ===============
  gsap.to('.about-card', {
    scrollTrigger: { trigger: '.about-card', start: 'top 78%', toggleActions: 'play none none none' },
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
  });

  gsap.to('.stat', {
    scrollTrigger: { trigger: '.about-stats', start: 'top 88%', toggleActions: 'play none none none' },
    opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out',
    onComplete: () => {
      document.querySelectorAll('.stat-num').forEach(n => {
        gsap.to(n, { innerText: parseInt(n.dataset.count), duration: 1.5, snap: { innerText: 1 }, ease: 'power2.out' });
      });
    }
  });

  // About image parallax
  if (isDesktop) {
    gsap.to('.about-img-wrap img', {
      scrollTrigger: { trigger: '.about-img-wrap', start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: -40, ease: 'none',
    });
  }

  // =============== PHOTO DIVIDERS — blur text reveal + parallax ===============
  document.querySelectorAll('.photo-divider').forEach(div => {
    const lines = div.querySelectorAll('.dh-line');
    const img = div.querySelector('.photo-divider-img');

    // Parallax on image
    if (isDesktop) {
      gsap.fromTo(img,
        { scale: 1.15 },
        { scale: 1, scrollTrigger: { trigger: div, start: 'top bottom', end: 'bottom top', scrub: true }, ease: 'none' }
      );
    }

    // Pin + blur text reveal
    if (lines.length) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: div,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
        }
      });

      lines.forEach((line, i) => {
        tl.to(line, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'power2.out' }, i * 0.5);
      });

      // Hold then slight fade
      tl.to({}, { duration: 0.5 });
      tl.to(div.querySelector('.photo-divider-text'), { opacity: 0.4, scale: 0.97, duration: 0.8 });
    }
  });

  // =============== SKILLS CATEGORIES ===============
  document.querySelectorAll('.skill-category').forEach((cat, i) => {
    gsap.to(cat, {
      scrollTrigger: { trigger: cat, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
    });
  });

  // =============== EDUCATION ROADMAP ===============
  gsap.to('.edu-card-main', {
    scrollTrigger: { trigger: '.edu-card-main', start: 'top 82%', toggleActions: 'play none none none' },
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    onComplete: () => {
      // Animate progress bar
      const bar = document.querySelector('.edu-bar-fill');
      if (bar) {
        const progress = bar.dataset.progress || 80;
        gsap.to(bar, { width: progress + '%', duration: 1.5, ease: 'power2.out' });
      }
    }
  });

  // =============== PROJECTS FULL-WIDTH ===============
  document.querySelectorAll('.project-full').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' },
      opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
    });
  });

  // Floating orbs subtle animation
  document.querySelectorAll('.orb').forEach(orb => {
    gsap.to(orb, {
      y: 'random(-20, 20)', x: 'random(-15, 15)',
      duration: 'random(3, 5)', repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
  });

  // =============== EXPERIENCE V2 ===============
  gsap.to('.exp-card-v2', {
    scrollTrigger: { trigger: '.exp-card-v2', start: 'top 82%', toggleActions: 'play none none none' },
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
  });

  // =============== FOOTER hero parallax ===============
  if (isDesktop) {
    gsap.to('.footer-hero-img', {
      scrollTrigger: { trigger: '.footer-hero', start: 'top bottom', end: 'bottom top', scrub: true },
      y: -60, ease: 'none',
    });
  }

  // Footer CTA reveal
  const ftLabels = document.querySelectorAll('.footer-hero-content .section-label');
  const ftSpans = document.querySelectorAll('.footer-cta-title .heading-line > span');
  const ftTl = gsap.timeline({ scrollTrigger: { trigger: '.footer-hero', start: 'top 70%', toggleActions: 'play none none none' } });
  ftLabels.forEach(l => ftTl.to(l, { opacity: 1, duration: 0.4 }));
  ftSpans.forEach(s => ftTl.to(s, { y: 0, duration: 0.7, ease: 'power4.out' }, '-=0.3'));
}

/* ============================================
   RE-INIT LUCIDE + DYNAMIC YEAR
   ============================================ */
window.addEventListener('load', () => {
  lucide.createIcons();
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

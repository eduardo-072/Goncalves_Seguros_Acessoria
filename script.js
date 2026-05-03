// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navbar = document.getElementById('navbar');

  // ===== MENU MOBILE =====
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('menu-open'); // evita scroll do body
    });
  }

  // Fecha menu ao clicar em link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
      hamburger?.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (
      navLinks &&
      hamburger &&
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // ===== NAVBAR NO SCROLL =====
  if (navbar) {
    const toggleNavbarScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', toggleNavbarScroll);
    toggleNavbarScroll();
  }

  // ===== CONTADOR ANIMADO =====
  const counters = document.querySelectorAll('.stat-num');
  const speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target) || 0;
      let count = 0;
      const increment = Math.ceil(target / speed);

      const update = () => {
        if (count < target) {
          count += increment;
          counter.innerText = Math.min(count, target);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });
  };

  const statsSection = document.querySelector('.hero-stats');

  if (statsSection && counters.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        e.preventDefault();

        const offset = navbar ? navbar.offsetHeight : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    });
  });

});
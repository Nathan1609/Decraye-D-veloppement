document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });

    // Menu mobile
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
    function closeMobile() { mobileMenu.classList.remove('open'); }

    // Scroll reveal (Intersection Observer)
    const fadeEls = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay pour les groupes
          const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up')];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.1}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => observer.observe(el));

    // Marquee : dupliquer les items pour boucle infinie
    const track = document.getElementById('marqueeTrack');
    const items = track.innerHTML;
    track.innerHTML = items + items; // dupliquer

    // Smooth scroll sur les liens ancre
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
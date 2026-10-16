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
        const href = a.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

// Formulaire de contact : envoi vers nathan@decrayedeveloppement.be via FormSubmit
const form = document.getElementById('contactForm');
if (form) {
  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    if (!form.checkValidity()) {
      status.textContent = 'Merci de remplir tous les champs avec une adresse e-mail valide.';
      status.classList.add('err');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';
    try {
      const res = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      const data = await res.json();
      if (!res.ok || data.success === 'false') throw new Error();
      form.reset();
      status.textContent = 'Merci, votre message a bien été envoyé. Je vous réponds rapidement.';
      status.classList.add('ok');
    } catch (err) {
      status.textContent = "L'envoi a échoué. Écrivez-moi directement à nathan@decrayedeveloppement.be.";
      status.classList.add('err');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMenu = () => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (!link.classList.contains('logo')) closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const revealItems = document.querySelectorAll('.reveal, .gallery-page-grid img, .gallery-grid img, .benefits div');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -70px 0px'
    });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('show'));
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const legalTriggers = document.querySelectorAll('[data-legal-modal]');
  const legalModals = document.querySelectorAll('.legal-modal');
  let lastLegalTrigger = null;

  const closeLegalModals = () => {
    legalModals.forEach((modal) => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.classList.remove('legal-modal-active');

    if (lastLegalTrigger) {
      lastLegalTrigger.focus();
      lastLegalTrigger = null;
    }
  };

  const openLegalModal = (modalName, trigger) => {
    const modal = document.getElementById(`legal-modal-${modalName}`);
    if (!modal) return;

    lastLegalTrigger = trigger || null;
    legalModals.forEach((item) => {
      item.classList.remove('open');
      item.setAttribute('aria-hidden', 'true');
    });

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('legal-modal-active');

    const closeButton = modal.querySelector('[data-legal-close]');
    if (closeButton) closeButton.focus();
  };

  legalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLegalModal(trigger.getAttribute('data-legal-modal'), trigger);
    });
  });

  document.querySelectorAll('[data-legal-close]').forEach((closeButton) => {
    closeButton.addEventListener('click', closeLegalModals);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.querySelector('.legal-modal.open')) {
      closeLegalModals();
    }
  });
});

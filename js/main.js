/* =========================================================
   MUNDO PEQUENO - main.js
   Funções gerais: menu mobile, scroll reveal, accordion,
   filtros, lightbox, newsletter, back-to-top.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MENU MOBILE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Fecha o menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- HEADER SHADOW ON SCROLL + BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) {
      if (window.scrollY > 400) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }
  });
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- ACCORDION (Dicas) ---------- */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const head = item.querySelector('.accordion-head');
    if (!head) return;
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // fecha os outros do mesmo accordion
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        const body = i.querySelector('.accordion-body');
        if (body) body.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        const body = item.querySelector('.accordion-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
  // Abre o primeiro item por padrão
  document.querySelectorAll('.accordion-item.open .accordion-body').forEach(body => {
    body.style.maxHeight = body.scrollHeight + 'px';
  });

  /* ---------- FILTRO DE BRINCADEIRAS (index) ---------- */
  const ageButtons = document.querySelectorAll('.age-filters button');
  const playCards = document.querySelectorAll('.play-card');
  if (ageButtons.length && playCards.length) {
    ageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        ageButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        playCards.forEach(card => {
          if (filter === 'all' || card.dataset.cat === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- FILTRO DE GALERIA (galeria.html) ---------- */
  const galleryButtons = document.querySelectorAll('.gallery-filters button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryButtons.length && galleryItems.length) {
    galleryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.cat === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- LIGHTBOX (galeria.html) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (lightbox && lightboxImg) {
    // Coleta apenas itens visíveis clicáveis com imagens (galeria e desenhos)
    const clickableImgs = Array.from(document.querySelectorAll('.gallery-item img, .view-btn'));
    let galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentIndex = 0;

    function openLightbox(index) {
      if (!galleryImgs.length) return;
      currentIndex = index;
      lightboxImg.src = galleryImgs[currentIndex].src;
      lightboxImg.alt = galleryImgs[currentIndex].alt;
      lightbox.classList.add('open');
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
    }

    galleryImgs.forEach((img, idx) => {
      img.closest('.gallery-item').addEventListener('click', () => openLightbox(idx));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
      openLightbox(currentIndex);
    });
    if (lightboxNext) lightboxNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryImgs.length;
      openLightbox(currentIndex);
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });
  }

  /* ---------- NEWSLETTER FORM ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nome = document.getElementById('nlNome').value.trim();
      const email = document.getElementById('nlEmail').value.trim();
      const interesse = document.getElementById('nlInteresse').value;
      const msgEl = document.getElementById('newsletterMsg');

      if (!nome || !email) {
        msgEl.textContent = 'Por favor, preencha nome e e-mail.';
        return;
      }

      try {
        const response = await fetch('tables/newsletter_subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, interesse })
        });
        if (response.ok) {
          msgEl.textContent = `Obrigado, ${nome}! 🎉 Você foi inscrito com sucesso.`;
          newsletterForm.reset();
        } else {
          msgEl.textContent = 'Ops! Algo deu errado. Tente novamente.';
        }
      } catch (err) {
        msgEl.textContent = 'Ops! Não foi possível conectar. Tente novamente mais tarde.';
      }
    });
  }

});

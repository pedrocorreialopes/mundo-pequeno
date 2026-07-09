/* =========================================================
   MUNDO PEQUENO - desenhos.js
   Funcionalidade da página de desenhos: visualizar em
   lightbox e imprimir cada desenho individualmente.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  // Botão "Ver" -> abre a imagem do card no lightbox
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.draw-card');
      const img = card.querySelector('.draw-thumb img');
      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // Botão "Imprimir" -> abre uma nova janela apenas com a imagem para impressão
  document.querySelectorAll('.print-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.draw-card');
      const img = card.querySelector('.draw-thumb img');
      const title = card.querySelector('h4') ? card.querySelector('h4').textContent : 'Desenho para Colorir';
      if (!img) return;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>${title} - Mundo Pequeno</title>
          <style>
            body{margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;}
            h2{margin:20px 0;}
            img{max-width:90%;max-height:80vh;object-fit:contain;}
            @media print{ h2{display:none;} }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          <img src="${img.src}" alt="${img.alt}">
          <script>
            window.onload = function(){ window.print(); };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    });
  });
});

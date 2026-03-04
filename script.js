/* ══════════════════════════════════════════════════
   script.js — Portfolio Baptiste Pillard
   Tout le code est enveloppé dans DOMContentLoaded
   pour garantir que le HTML est prêt avant d'exécuter
══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════
     1 · DARK / LIGHT MODE
  ══════════════════════════════════════════ */
  const htmlEl    = document.documentElement;
  const themeBtn  = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLbl  = document.getElementById('themeLabel');

  function setTheme(t) {
    htmlEl.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch (_) {}
    if (t === 'dark') {
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeLbl)  themeLbl.textContent  = 'Mode clair';
    } else {
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeLbl)  themeLbl.textContent  = 'Mode sombre';
    }
  }

  // Restaure la préférence sauvegardée
  let saved = 'light';
  try { saved = localStorage.getItem('theme') || 'light'; } catch (_) {}
  setTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTheme(htmlEl.dataset.theme === 'light' ? 'dark' : 'light');
    });
  }

  /* ══════════════════════════════════════════
     2 · TYPEWRITER EFFECT
  ══════════════════════════════════════════ */
  const typedEl = document.getElementById('typedText');

  if (typedEl) {
    const phrases = [
      'Étudiant en BUT Informatique — 1ère année',
      'Passionné par le code et les systèmes',
      'IUT Lyon 1 · La Doua',
      "Toujours en train d'apprendre ✦",
    ];

    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;

    function type() {
      const phrase = phrases[phraseIndex];

      if (!isDeleting) {
        typedEl.textContent = phrase.slice(0, ++charIndex);
        if (charIndex === phrase.length) {
          setTimeout(() => { isDeleting = true; type(); }, 2200);
          return;
        }
      } else {
        typedEl.textContent = phrase.slice(0, --charIndex);
        if (charIndex === 0) {
          isDeleting  = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(type, isDeleting ? 35 : 60);
    }

    setTimeout(type, 800);
  }

  /* ══════════════════════════════════════════
     3 · BARRES ANIMÉES AU SCROLL (CORRIGÉ)
  ══════════════════════════════════════════ */
  function setupBarAnimation(selector) {
    const bars = document.querySelectorAll(selector);
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;

        const bar = entry.target;
        
        // On laisse le navigateur souffler avant l'animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
                bar.style.width = (bar.dataset.width || '0') + '%';
            }, i * 50); // Léger délai en cascade
          });
        });

        observer.unobserve(bar);
      });
    }, { threshold: 0.2 });

    bars.forEach(bar => {
      bar.style.width = '0%'; // Force à 0 initialement
      observer.observe(bar);
    });
  }

  setupBarAnimation('.skill-fill');
  setupBarAnimation('.now-progress');

  /* ══════════════════════════════════════════
     4 · COPIER L'EMAIL + TOAST
  ══════════════════════════════════════════ */
  const copyBtn = document.getElementById('copyBtn');
  const toastEl = document.getElementById('toast');
  let   toastTimer;

  const EMAIL = 'baptistepillard@gmail.com';

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL)
          .then(()  => showToast('✅ Email copié dans le presse-papier !'))
          .catch(() => showToast('⚠️ Copiez : ' + EMAIL));
      } else {
        // Fallback pour les navigateurs sans clipboard API
        showToast('⚠️ Copiez : ' + EMAIL);
      }
    });
  }

  /* ══════════════════════════════════════════
     5 · EFFET 3D TILT SUR LES CARDS
     Désactivé sur mobile (pas de hover)
  ══════════════════════════════════════════ */
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x    = (e.clientX - rect.left)  / rect.width  - 0.5;
        const y    = (e.clientY - rect.top)   / rect.height - 0.5;

        card.style.transform = `
          perspective(900px)
          rotateY(${x * 6}deg)
          rotateX(${-y * 6}deg)
          translateY(-4px)
          scale(1.006)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

}); // fin DOMContentLoaded
/* ══════════════════════════════════════════════════
   script.js — Portfolio v2 · Baptiste Pillard
   1 · Thème sombre / clair
   2 · Terminal interactif (intro animée + commandes)
   3 · Copier l'email + toast
   4 · Effet 3D tilt sur les cards
══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ══════════════════════════════════════════
     1 · DARK / LIGHT MODE
     Sombre par défaut (on est entre gens de goût),
     mais on respecte la préférence sauvegardée
     puis celle du système.
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

  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (_) {}
  if (!saved) {
    saved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  setTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTheme(htmlEl.dataset.theme === 'light' ? 'dark' : 'light');
    });
  }

  /* ══════════════════════════════════════════
     2 · TERMINAL INTERACTIF
  ══════════════════════════════════════════ */
  const termBody   = document.getElementById('termBody');
  const termOutput = document.getElementById('termOutput');
  const inputRow   = document.getElementById('termInputRow');
  const termInput  = document.getElementById('termInput');

  if (termBody && termOutput && inputRow && termInput) {

    const P_ME  = 'baptiste@iut-lyon1:~$';
    const P_YOU = 'visiteur@portfolio:~$';

    // Échappe le HTML — indispensable pour tout ce que tape le visiteur
    const esc = (s) => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

    const scrollBottom = () => { termBody.scrollTop = termBody.scrollHeight; };

    // Ajoute une ligne (le HTML passé ici est le nôtre, donc de confiance)
    function line(html, cls = 't-out') {
      const div = document.createElement('div');
      div.className = 't-line ' + cls;
      div.innerHTML = html;
      termOutput.appendChild(div);
      scrollBottom();
      return div;
    }

    function echoCmd(prompt, cmd) {
      line(`<span class="t-prompt">${prompt}</span> <span class="t-cmd">${esc(cmd)}</span>`);
    }

    /* ── Sorties des commandes ─────────────── */

    const OUT = {};

    OUT.whoami = [
      '<span class="t-cmd">Baptiste Pillard</span>',
      'Étudiant en BUT Informatique (parcours DACS) — IUT Lyon 1, La Doua',
      'Alternant Concepteur Développeur <span class="t-accent">@ CARSAT Rhône-Alpes</span> dès sept. 2026',
      'Passionné de code, de systèmes et de tout ce qui se branche en RJ45.',
    ];

    OUT.carsat = [
      '<span class="t-cmd">CARSAT Rhône-Alpes</span> — Concepteur Développeur (alternance 2026 → 2028)',
      '├─ 💻 <span class="t-prompt">Équipe Développement</span> : conception, dev &amp; maintenance d\'applis',
      '│     métiers, tests, documentation, mise en production, support',
      '└─ 🌐 <span class="t-accent">Équipe Réseau</span> : data center, brassage, switchs &amp; Wi-Fi,',
      '      incidents, sécurisation, téléphonie',
      'Rythme : 1 semaine IUT ↔ 1 semaine entreprise, à Lyon.',
    ];

    OUT.parcours = [
      '<span class="t-warn">2021-2024</span>  Bac STI2D (spé SIN) — Lycée Val de Saône',
      '<span class="t-warn">2025-2026</span>  BUT 1 Informatique — IUT Lyon 1 <span class="t-prompt">✓ validée</span>',
      '<span class="t-warn">2026-2027</span>  BUT 2 — parcours DACS + alternance CARSAT',
      '<span class="t-warn">2027-2028</span>  BUT 3 — parcours DACS → diplôme',
    ];

    OUT.stack = [
      '<span class="t-prompt">dev</span>      : Java · Python · C · HTML/CSS · JS · SQL',
      '<span class="t-accent">sys/rés</span>  : Linux · Bash · Apache2 · TCP/IP',
      '<span class="t-warn">données</span>  : PostgreSQL · MCD-MLD · Power BI',
      '<span class="t-cmd">outils</span>   : Git · IntelliJ · VS Code',
    ];

    OUT.projets = [
      '<span class="t-prompt">SAE 1.01</span>  Application Python — algo, conception, implémentation',
      '<span class="t-prompt">SAE 1.04</span>  Base de données — MCD/MLD, SQL, PostgreSQL',
      '<span class="t-prompt">SAE 1.06</span>  Économie &amp; RSE — étude du cas BYD',
      '<span class="t-prompt">SAE 2.01</span>  Application Java + IHM — maths &amp; gestion de projet',
      '<span class="t-prompt">SAE 2.03</span>  Services réseau — Apache2, hébergement web, Linux',
      '<span class="t-prompt">SAE 2.04</span>  Exploitation de données — SQL avancé, Power BI',
    ];

    OUT.contact = [
      '📬 <span class="t-accent">baptistepillard@gmail.com</span>',
      '💼 linkedin.com/in/baptiste-pillard',
      '📄 CV : carte « contact », tout en bas de la page',
    ];

    OUT.help = [
      '<span class="t-cmd">commandes disponibles :</span>',
      '  <span class="t-prompt">whoami</span>      qui suis-je ?',
      '  <span class="t-prompt">carsat</span>      mon alternance en détail',
      '  <span class="t-prompt">parcours</span>    mon chemin jusqu\'ici',
      '  <span class="t-prompt">stack</span>       ce que je sais faire',
      '  <span class="t-prompt">projets</span>     mes SAE de BUT 1',
      '  <span class="t-prompt">contact</span>     me joindre',
      '  <span class="t-prompt">neofetch</span>    la carte d\'identité, façon Linux',
      '  <span class="t-prompt">theme</span>       basculer clair / sombre',
      '  <span class="t-prompt">clear</span>       nettoyer l\'écran',
      '  <span class="t-out">…et quelques surprises non documentées.</span>',
    ];

    // neofetch : art ASCII + fiche d'identité, alignés en colonnes
    function neofetch() {
      const art = [
        '    .--.     ',
        '   |o_o |    ',
        '   |:_/ |    ',
        '  //   \\ \\   ',
        ' (|     | )  ',
        ' /\'\\_   _/`\\ ',
        ' \\___)=(___/ ',
      ];
      const info = [
        'visiteur@portfolio',
        '──────────────────',
        'OS      : Étudiant BUT Informatique (parcours DACS)',
        'Hôte    : IUT Lyon 1 — La Doua',
        'Shell   : alternant @ CARSAT Rhône-Alpes',
        'Uptime  : BUT 1 validé ✓',
        'Paquets : java · python · c · sql · linux',
      ];
      const rows = Math.max(art.length, info.length);
      let html = '';
      for (let i = 0; i < rows; i++) {
        const a = art[i]  || ' '.repeat(13);
        const b = info[i] || '';
        html += `<span class="t-prompt">${esc(a)}</span> <span class="t-out">${esc(b)}</span>\n`;
      }
      line(html.replace(/\n$/, ''), 't-pre');
    }

    /* ── Interprète ────────────────────────── */

    function run(rawInput) {
      const input = rawInput.trim();
      if (!input) return;

      const [cmd, ...rest] = input.split(/\s+/);
      const arg = rest.join(' ');

      switch (cmd.toLowerCase()) {

        case 'help':
        case 'aide':
        case '?':
          OUT.help.forEach(l => line(l));
          break;

        case 'whoami':   OUT.whoami.forEach(l => line(l));   break;
        case 'carsat':   OUT.carsat.forEach(l => line(l));   break;
        case 'parcours': OUT.parcours.forEach(l => line(l)); break;
        case 'stack':    OUT.stack.forEach(l => line(l));    break;
        case 'projets':  OUT.projets.forEach(l => line(l));  break;
        case 'contact':  OUT.contact.forEach(l => line(l));  break;
        case 'neofetch': neofetch(); break;

        case 'ls':
          if (/^projets\/?$/.test(arg)) {
            line('sae-1.01_python.md   sae-1.04_bdd.md      sae-1.06_rse.md');
            line('sae-2.01_java-ihm.md sae-2.03_reseau.md   sae-2.04_data.md');
          } else {
            line('<span class="t-accent">projets/</span>  alternance.txt  parcours.md  stack.json  contact.txt  <span class="t-out">.secrets</span>');
          }
          break;

        case 'cat': {
          if (!arg)                          { line('cat : il manque un nom de fichier — essaie <span class="t-prompt">ls</span>', 't-err'); break; }
          const f = arg.replace(/^projets\//, '');
          if (f === 'alternance.txt')        OUT.carsat.forEach(l => line(l));
          else if (f === 'parcours.md')      OUT.parcours.forEach(l => line(l));
          else if (f === 'contact.txt')      OUT.contact.forEach(l => line(l));
          else if (f === 'stack.json')       OUT.stack.forEach(l => line(l));
          else if (f === '.secrets')         line('cat : .secrets : Permission refusée <span class="t-out">(bien tenté 😏)</span>', 't-err');
          else if (/^sae-/.test(f))          line('→ ouvre plutôt la section « projets » juste en dessous 😉');
          else                               line(`cat : ${esc(arg)} : aucun fichier de ce type`, 't-err');
          break;
        }

        case 'pwd':
          line('/home/visiteur/portfolio-de-baptiste');
          break;

        case 'echo':
          line(esc(arg) || ' ');
          break;

        case 'date':
          line(new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
          break;

        case 'theme':
          setTheme(htmlEl.dataset.theme === 'light' ? 'dark' : 'light');
          line(`thème basculé → <span class="t-accent">${htmlEl.dataset.theme}</span> ✓`);
          break;

        case 'sudo':
          line('[sudo] Mot de passe de visiteur : ');
          line('<span class="t-err">Échec.</span> visiteur n\'est pas dans le fichier sudoers.');
          line('Cet incident sera signalé. 🚨');
          break;

        case 'rm':
          line('🛑 pas touche. Ce portfolio a coûté un été entier.', 't-warn');
          break;

        case 'vim':
        case 'vi':
        case 'nano':
          line('pour quitter vim : <span class="t-prompt">:q!</span> — de rien 😌');
          break;

        case 'exit':
        case 'logout':
          line('logout… ah non, en fait tu peux rester 🐧');
          break;

        case 'clear':
        case 'cls':
          termOutput.innerHTML = '';
          break;

        default:
          line(`bash : ${esc(cmd)} : commande introuvable — essaie <span class="t-prompt">help</span>`, 't-err');
      }
    }

    /* ── Saisie + historique ───────────────── */

    const history = [];
    let histIdx = -1;

    function enableInput() {
      inputRow.hidden = false;
      scrollBottom();

      termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const value = termInput.value;
          echoCmd(P_YOU, value);
          if (value.trim()) { history.push(value); histIdx = history.length; }
          run(value);
          termInput.value = '';
          scrollBottom();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (history.length && histIdx > 0) termInput.value = history[--histIdx];
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (histIdx < history.length - 1) termInput.value = history[++histIdx];
          else { histIdx = history.length; termInput.value = ''; }
        }
      });

      // Cliquer dans le terminal met le focus sur la saisie
      // (sauf si l'utilisateur est en train de sélectionner du texte)
      termBody.addEventListener('click', () => {
        const sel = window.getSelection();
        if (sel && sel.toString()) return;
        termInput.focus({ preventScroll: true });
      });
    }

    /* ── Séquence d'intro scriptée ─────────── */

    const INTRO = [
      { cmd: 'whoami', out: ['Baptiste Pillard — étudiant en BUT Informatique @ IUT Lyon 1'] },
      { cmd: 'cat alternance.txt', out: [
        '→ Concepteur Développeur · <span class="t-accent">CARSAT Rhône-Alpes</span> (sept. 2026 → 2028)',
        '→ 50 % développement applicatif · 50 % infrastructure réseau',
      ] },
      { cmd: './demarrer-le-BUT2.sh --parcours=DACS', out: [
        '<span class="t-prompt">[OK]</span> BUT 1 validé — chargement de la suite…',
      ] },
    ];
    const HINT = '💡 À vous : tapez <span class="t-prompt">help</span> pour explorer.';

    if (reduceMotion) {
      // Pas d'animation : tout s'affiche d'un coup
      INTRO.forEach(step => { echoCmd(P_ME, step.cmd); step.out.forEach(l => line(l)); });
      line(HINT);
      enableInput();
    } else {
      // Frappe caractère par caractère, puis sortie ligne par ligne
      let stepIdx = 0;

      function playStep() {
        if (stepIdx >= INTRO.length) {
          setTimeout(() => { line(HINT); enableInput(); }, 350);
          return;
        }
        const step = INTRO[stepIdx++];
        const div  = line(`<span class="t-prompt">${P_ME}</span> <span class="t-cmd"></span><span class="t-cursor"></span>`);
        const slot = div.querySelector('.t-cmd');
        let i = 0;

        function typeChar() {
          if (i < step.cmd.length) {
            slot.textContent = step.cmd.slice(0, ++i);
            setTimeout(typeChar, 26 + Math.random() * 34);
          } else {
            div.querySelector('.t-cursor').remove();
            let j = 0;
            (function printOut() {
              if (j < step.out.length) {
                line(step.out[j++]);
                setTimeout(printOut, 90);
              } else {
                setTimeout(playStep, 420);
              }
            })();
          }
        }
        setTimeout(typeChar, 300);
      }

      setTimeout(playStep, 700);
    }
  }

  /* ══════════════════════════════════════════
     3 · COPIER L'EMAIL + TOAST
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
        showToast('⚠️ Copiez : ' + EMAIL);
      }
    });
  }

  /* ══════════════════════════════════════════
     4 · EFFET 3D TILT SUR LES CARDS
     Désactivé sur mobile, si mouvement réduit,
     et sur le terminal (on y tape du texte).
  ══════════════════════════════════════════ */
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice && !reduceMotion) {
    document.querySelectorAll('.card:not(.card-terminal)').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x    = (e.clientX - rect.left)  / rect.width  - 0.5;
        const y    = (e.clientY - rect.top)   / rect.height - 0.5;

        card.style.transform = `
          perspective(900px)
          rotateY(${x * 5}deg)
          rotateX(${-y * 5}deg)
          translateY(-3px)
          scale(1.005)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

}); // fin DOMContentLoaded

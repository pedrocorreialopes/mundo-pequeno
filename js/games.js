/* =========================================================
   MUNDO PEQUENO - games.js
   Jogos: Memória, Quiz dos Bichinhos, Jogo da Velha,
   Sequência de Cores (Simon).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ============ TABS DE JOGOS ============ */
  const tabButtons = document.querySelectorAll('.games-tabs button');
  const panels = document.querySelectorAll('.game-panel');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('panel-' + btn.dataset.game);
      if (target) target.classList.add('active');
    });
  });

  /* =========================================================
     JOGO DA MEMÓRIA
     ========================================================= */
  const memoryGrid = document.getElementById('memoryGrid');
  const memoryTimeEl = document.getElementById('memoryTime');
  const memoryMovesEl = document.getElementById('memoryMoves');
  const memoryPairsEl = document.getElementById('memoryPairs');
  const memoryRestartBtn = document.getElementById('memoryRestart');

  const EMOJIS = ['🐶','🐱','🐻','🦁','🐸','🐵','🦋','🐢'];
  let memoryState = {
    cards: [], flipped: [], matched: 0, moves: 0, timer: null, seconds: 0, locked: false
  };

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildMemoryBoard() {
    if (!memoryGrid) return;
    clearInterval(memoryState.timer);
    memoryState = { cards: [], flipped: [], matched: 0, moves: 0, timer: null, seconds: 0, locked: false };
    memoryTimeEl.textContent = '0';
    memoryMovesEl.textContent = '0';
    memoryPairsEl.textContent = '0';

    const deck = shuffle([...EMOJIS, ...EMOJIS]);
    memoryGrid.innerHTML = '';
    deck.forEach((emoji, idx) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.dataset.emoji = emoji;
      card.dataset.index = idx;
      card.textContent = emoji;
      card.addEventListener('click', () => handleMemoryClick(card));
      memoryGrid.appendChild(card);
      memoryState.cards.push(card);
    });

    memoryState.timer = setInterval(() => {
      memoryState.seconds++;
      memoryTimeEl.textContent = memoryState.seconds;
    }, 1000);
  }

  function handleMemoryClick(card) {
    if (memoryState.locked) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    memoryState.flipped.push(card);

    if (memoryState.flipped.length === 2) {
      memoryState.locked = true;
      memoryState.moves++;
      memoryMovesEl.textContent = memoryState.moves;

      const [a, b] = memoryState.flipped;
      if (a.dataset.emoji === b.dataset.emoji) {
        a.classList.add('matched');
        b.classList.add('matched');
        memoryState.matched++;
        memoryPairsEl.textContent = memoryState.matched;
        memoryState.flipped = [];
        memoryState.locked = false;
        if (memoryState.matched === EMOJIS.length) {
          clearInterval(memoryState.timer);
          setTimeout(() => alert('🎉 Parabéns! Você encontrou todos os pares em ' + memoryState.seconds + ' segundos e ' + memoryState.moves + ' jogadas!'), 300);
        }
      } else {
        setTimeout(() => {
          a.classList.remove('flipped');
          b.classList.remove('flipped');
          memoryState.flipped = [];
          memoryState.locked = false;
        }, 800);
      }
    }
  }

  if (memoryGrid) {
    buildMemoryBoard();
    memoryRestartBtn.addEventListener('click', buildMemoryBoard);
  }

  /* =========================================================
     QUIZ DOS BICHINHOS
     ========================================================= */
  const QUIZ_QUESTIONS = [
    { q: 'Qual animal é conhecido como "rei da selva"?', options: ['Elefante', 'Leão', 'Tigre', 'Girafa'], correct: 1 },
    { q: 'Qual animal tem o pescoço mais longo do mundo?', options: ['Girafa', 'Cavalo', 'Camelo', 'Avestruz'], correct: 0 },
    { q: 'Qual desses animais sabe voar?', options: ['Pinguim', 'Morcego', 'Golfinho', 'Cavalo-marinho'], correct: 1 },
    { q: 'Qual é o maior animal do mundo?', options: ['Elefante', 'Tubarão-branco', 'Baleia-azul', 'Rinoceronte'], correct: 2 },
    { q: 'Qual animal muda de cor para se camuflar?', options: ['Camaleão', 'Coelho', 'Cachorro', 'Pato'], correct: 0 }
  ];

  const quizProgress = document.getElementById('quizProgress');
  const quizQuestionEl = document.getElementById('quizQuestion');
  const quizOptionsEl = document.getElementById('quizOptions');
  const quizArea = document.getElementById('quizArea');
  const quizResultEl = document.getElementById('quizResult');
  const quizScoreEl = document.getElementById('quizScore');
  const quizRestartBtn = document.getElementById('quizRestart');

  let quizState = { current: 0, score: 0, answered: false };

  function buildQuizProgress() {
    quizProgress.innerHTML = '';
    QUIZ_QUESTIONS.forEach((_, idx) => {
      const span = document.createElement('span');
      if (idx < quizState.current) span.classList.add('done');
      quizProgress.appendChild(span);
    });
  }

  function loadQuestion() {
    quizState.answered = false;
    const item = QUIZ_QUESTIONS[quizState.current];
    quizQuestionEl.textContent = `Pergunta ${quizState.current + 1}: ${item.q}`;
    quizOptionsEl.innerHTML = '';
    item.options.forEach((opt, idx) => {
      const btn = document.createElement('div');
      btn.className = 'quiz-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(idx, btn));
      quizOptionsEl.appendChild(btn);
    });
    buildQuizProgress();
  }

  function selectAnswer(idx, btnEl) {
    if (quizState.answered) return;
    quizState.answered = true;
    const item = QUIZ_QUESTIONS[quizState.current];
    const allOpts = quizOptionsEl.querySelectorAll('.quiz-opt');

    if (idx === item.correct) {
      btnEl.classList.add('correct');
      quizState.score++;
    } else {
      btnEl.classList.add('wrong');
      allOpts[item.correct].classList.add('correct');
    }

    setTimeout(() => {
      quizState.current++;
      if (quizState.current < QUIZ_QUESTIONS.length) {
        loadQuestion();
      } else {
        showQuizResult();
      }
    }, 1000);
  }

  function showQuizResult() {
    quizArea.style.display = 'none';
    quizResultEl.style.display = 'block';
    quizScoreEl.textContent = `${quizState.score}/${QUIZ_QUESTIONS.length}`;
  }

  function restartQuiz() {
    quizState = { current: 0, score: 0, answered: false };
    quizArea.style.display = 'block';
    quizResultEl.style.display = 'none';
    loadQuestion();
  }

  if (quizQuestionEl) {
    loadQuestion();
    quizRestartBtn.addEventListener('click', restartQuiz);
  }

  /* =========================================================
     JOGO DA VELHA (Tic Tac Toe)
     ========================================================= */
  const tttBoard = document.getElementById('tttBoard');
  const tttStatus = document.getElementById('tttStatus');
  const tttRestartBtn = document.getElementById('tttRestart');
  let tttCells = [];
  let tttCurrentPlayer = 'X';
  let tttGameOver = false;

  const WIN_LINES = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function buildTttBoard() {
    if (!tttBoard) return;
    tttBoard.innerHTML = '';
    tttCells = Array(9).fill('');
    tttCurrentPlayer = 'X';
    tttGameOver = false;
    tttStatus.textContent = 'Vez do jogador ❌';

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'ttt-cell';
      cell.dataset.index = i;
      cell.addEventListener('click', () => handleTttClick(i, cell));
      tttBoard.appendChild(cell);
    }
  }

  function handleTttClick(index, cellEl) {
    if (tttGameOver || tttCells[index] !== '') return;
    tttCells[index] = tttCurrentPlayer;
    cellEl.textContent = tttCurrentPlayer === 'X' ? '❌' : '⭕';
    cellEl.classList.add(tttCurrentPlayer === 'X' ? 'x' : 'o');

    const winner = checkTttWinner();
    if (winner) {
      tttStatus.textContent = `🎉 Jogador ${winner === 'X' ? '❌' : '⭕'} venceu!`;
      tttGameOver = true;
      return;
    }
    if (!tttCells.includes('')) {
      tttStatus.textContent = '🤝 Empate!';
      tttGameOver = true;
      return;
    }

    tttCurrentPlayer = tttCurrentPlayer === 'X' ? 'O' : 'X';
    tttStatus.textContent = `Vez do jogador ${tttCurrentPlayer === 'X' ? '❌' : '⭕'}`;
  }

  function checkTttWinner() {
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      if (tttCells[a] && tttCells[a] === tttCells[b] && tttCells[a] === tttCells[c]) {
        return tttCells[a];
      }
    }
    return null;
  }

  if (tttBoard) {
    buildTttBoard();
    tttRestartBtn.addEventListener('click', buildTttBoard);
  }

  /* =========================================================
     SEQUÊNCIA DE CORES (Simon Says)
     ========================================================= */
  const simonButtons = document.querySelectorAll('.simon-btn');
  const simonStartBtn = document.getElementById('simonStart');
  const simonLevelEl = document.getElementById('simonLevel');
  const COLORS = ['red', 'blue', 'yellow', 'green'];
  let simonSequence = [];
  let simonPlayerSequence = [];
  let simonLevel = 0;
  let simonAccepting = false;

  function simonFlash(color, duration = 400) {
    const btn = document.querySelector(`.simon-btn.${color}`);
    if (!btn) return Promise.resolve();
    return new Promise(resolve => {
      btn.classList.add('active');
      setTimeout(() => {
        btn.classList.remove('active');
        resolve();
      }, duration);
    });
  }

  async function playSimonSequence() {
    simonAccepting = false;
    for (const color of simonSequence) {
      await simonFlash(color, 450);
      await new Promise(r => setTimeout(r, 200));
    }
    simonAccepting = true;
    simonPlayerSequence = [];
  }

  function nextSimonRound() {
    simonLevel++;
    simonLevelEl.textContent = simonLevel;
    simonSequence.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setTimeout(playSimonSequence, 600);
  }

  function startSimon() {
    simonSequence = [];
    simonPlayerSequence = [];
    simonLevel = 0;
    simonLevelEl.textContent = 0;
    nextSimonRound();
  }

  simonButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!simonAccepting) return;
      const color = btn.dataset.color;
      await simonFlash(color, 250);
      simonPlayerSequence.push(color);

      const idx = simonPlayerSequence.length - 1;
      if (simonPlayerSequence[idx] !== simonSequence[idx]) {
        simonAccepting = false;
        alert(`❌ Ops! Você chegou ao nível ${simonLevel}. Tente novamente!`);
        return;
      }

      if (simonPlayerSequence.length === simonSequence.length) {
        simonAccepting = false;
        setTimeout(nextSimonRound, 700);
      }
    });
  });

  if (simonStartBtn) {
    simonStartBtn.addEventListener('click', startSimon);
  }

});

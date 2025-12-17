(() => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const elScore = document.getElementById('score');
  const elLives = document.getElementById('lives');
  const elLevel = document.getElementById('level');
  const elBalls = document.getElementById('balls');
  const btnStart = document.getElementById('btnStart');
  const btnPause = document.getElementById('btnPause');
  const btnTests = document.getElementById('btnTests');
  const diag = document.getElementById('diag');
  const diagBox = document.getElementById('diagBox');

  const COLORS = { one: '#3ea6ff', two: '#ff9f3a', three: '#ff6f6f', steel: '#9fb0c8', ball: '#ffd53a', paddle: '#61e294' };
  const POWER_COLORS = { life: '#6be36b', slow: '#b7a6ff', expand: '#ffd53a' };
  const BRICK_TYPES = {
    '.': null,
    '1': { hp: 1, color: COLORS.one, score: 50 },
    '2': { hp: 2, color: COLORS.two, score: 80 },
    '3': { hp: 3, color: COLORS.three, score: 120 },
    '#': { hp: 9999, color: COLORS.steel, score: 0 }
  };
  const LEVELS = [
    ['..............', '..1111111111..', '..1222333221..', '..122###3221..', '..1111111111..', '..............'],
    ['..222..333..222..', '..2##2.3..3.2##2.', '..222..333..222..', '....111....111....', '....1..1....1..1..'],
    ['3333333333333333', '3..22222##2222..3', '3..21111221112..3', '3..2##22..22##2..3', '3..21111221112..3', '3333333333333333']
  ];

  let GRID_COLS = 0, GRID_ROWS = 0, BRICK_W = 0, BRICK_H = 28, BRICK_PAD = 6, BRICK_TOP = 60, BRICK_LEFT = 0;
  let paddleW = 120, paddleH = 14, paddleX = 0;
  let balls = [];
  const BALL_R = 9;
  const BASE_SPEED = 1.8;
  const MAX_SPEED = 3.6;
  let ballOnPaddle = true;
  let powerUps = [];
  const POWER_CHANCE = 0.12;
  let bricks = [];
  let level = 1, score = 0, lives = 4, paused = false, over = false, pressing = { left: false, right: false };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function setLevel(n) {
    const layout = LEVELS[(n - 1) % LEVELS.length];
    GRID_ROWS = layout.length;
    GRID_COLS = layout[0].length;
    BRICK_W = Math.floor((canvas.width - 2 * 24 - (GRID_COLS - 1) * BRICK_PAD) / GRID_COLS);
    BRICK_LEFT = Math.floor((canvas.width - (GRID_COLS * BRICK_W + (GRID_COLS - 1) * BRICK_PAD)) / 2);
    bricks = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      bricks[r] = [];
      for (let c = 0; c < GRID_COLS; c++) {
        const key = layout[r][c];
        const def = BRICK_TYPES[key];
        if (!def) { bricks[r][c] = null; continue; }
        bricks[r][c] = {
          x: BRICK_LEFT + c * (BRICK_W + BRICK_PAD),
          y: BRICK_TOP + r * (BRICK_H + BRICK_PAD),
          hp: def.hp,
          color: def.color,
          score: def.score,
          solid: key === '#',
        };
      }
    }
  }

  function resetPaddle() { paddleW = 120; paddleX = (canvas.width - paddleW) / 2; }

  function addBall(opts = {}) {
    const b = { x: opts.x ?? canvas.width / 2, y: opts.y ?? (canvas.height - 80), dx: (opts.dx ?? 0), dy: (opts.dy ?? 0), r: BALL_R };
    balls.push(b);
    updateUI();
  }

  function resetGame() {
    level = 1; score = 0; lives = 4; over = false; paused = false; powerUps = []; balls = []; ballOnPaddle = true;
    setLevel(level);
    resetPaddle();
    addBall({ x: paddleX + paddleW / 2, y: canvas.height - 20 - paddleH - BALL_R - 1, dx: 0, dy: 0 });
    updateUI();
  }

  function updateUI() { elScore.textContent = score; elLives.textContent = lives; elLevel.textContent = level; elBalls.textContent = balls.length; }

  document.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'arrowright' || k === 'd') pressing.right = true;
    else if (k === 'arrowleft' || k === 'a') pressing.left = true;
    else if (k === 'p') paused = !paused;
    else if (k === 'r') { resetGame(); }
    else if (k === ' ') { tryLaunch(); }
  });
  document.addEventListener('keyup', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'arrowright' || k === 'd') pressing.right = false;
    else if (k === 'arrowleft' || k === 'a') pressing.left = false;
  });
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    paddleX = clamp(mx - paddleW / 2, 0, canvas.width - paddleW);
    if (ballOnPaddle && balls[0]) {
      balls[0].x = paddleX + paddleW / 2;
    }
  });
  canvas.addEventListener('click', () => { tryLaunch(); });

  btnStart.addEventListener('click', () => { resetGame(); });
  btnPause.addEventListener('click', () => { paused = !paused; });

  function tryLaunch() {
    if (!ballOnPaddle || !balls[0]) return;
    const b = balls[0];
    const bias = (pressing.right ? 0.4 : 0) + (pressing.left ? -0.4 : 0);
    const angle = (-Math.PI / 2) + bias * (Math.PI / 4);
    b.dx = Math.sin(angle) * BASE_SPEED;
    b.dy = -Math.cos(angle) * BASE_SPEED;
    ballOnPaddle = false;
  }

  function step() {
    if (paused || over) return;
    if (pressing.right) paddleX = Math.min(canvas.width - paddleW, paddleX + 7);
    if (pressing.left) paddleX = Math.max(0, paddleX - 7);

    if (ballOnPaddle && balls[0]) {
      balls[0].x = paddleX + paddleW / 2;
      balls[0].y = canvas.height - 20 - paddleH - BALL_R - 1;
      return;
    }

    for (const b of balls) {
      b.x += b.dx; b.y += b.dy;
      if (b.x < b.r) { b.x = b.r; b.dx = Math.abs(b.dx); }
      if (b.x > canvas.width - b.r) { b.x = canvas.width - b.r; b.dx = -Math.abs(b.dx); }
      if (b.y < b.r) { b.y = b.r; b.dy = Math.abs(b.dy); }

      const py = canvas.height - 20 - paddleH;
      if (b.y + b.r >= py && b.y + b.r <= py + paddleH + 6 && b.x >= paddleX && b.x <= paddleX + paddleW && b.dy > 0) {
        const hit = (b.x - (paddleX + paddleW / 2)) / (paddleW / 2);
        const speed = Math.min(MAX_SPEED, Math.hypot(b.dx, b.dy) * 1.03);
        const angle = hit * (Math.PI / 3);
        b.dx = speed * Math.sin(angle);
        b.dy = -Math.abs(speed * Math.cos(angle));
      }
    }

    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const br = bricks[r][c]; if (!br || br.hp <= 0) continue;
        for (const b of balls) {
          const nearestX = clamp(b.x, br.x, br.x + BRICK_W);
          const nearestY = clamp(b.y, br.y, br.y + BRICK_H);
          const dist = Math.hypot(b.x - nearestX, b.y - nearestY);

          if (dist < b.r) {
            const overlap = b.r - dist;
            const normX = (b.x - nearestX) / dist;
            const normY = (b.y - nearestY) / dist;
            
            b.x += normX * overlap;
            b.y += normY * overlap;

            const dot = b.dx * normX + b.dy * normY;
            b.dx -= 2 * dot * normX;
            b.dy -= 2 * dot * normY;

            if (!br.solid) {
              br.hp -= 1; score += br.score; if (br.hp === 0) { maybeDrop(br.x + BRICK_W / 2, br.y + BRICK_H / 2); }
            }
            updateUI();
          }
        }
      }
    }

    if (allCleared()) nextLevel();

    for (const p of powerUps) { p.y += p.vy; }
    powerUps = powerUps.filter(p => {
      const py = canvas.height - 20 - paddleH;
      const caught = p.y > py && p.y < py + paddleH && p.x >= paddleX && p.x <= paddleX + paddleW;
      if (caught) { applyPower(p.type); return false; }
      return p.y < canvas.height + 30;
    });

    balls = balls.filter(b => b.y - b.r <= canvas.height);
    if (balls.length === 0) {
      lives--; updateUI();
      if (lives < 0) { over = true; paused = true; }
      else { ballOnPaddle = true; addBall({ x: paddleX + paddleW / 2, y: canvas.height - 20 - paddleH - BALL_R - 1, dx: 0, dy: 0 }); }
    }
  }

  function maybeDrop(x, y) { if (Math.random() < POWER_CHANCE) { const types = ['life', 'slow', 'expand']; const type = types[Math.floor(Math.random() * types.length)]; powerUps.push({ x, y, vy: 1.6, type }); } }

  function applyPower(type) {
    if (type === 'life') { lives += 1; }
    else if (type === 'slow') { for (const b of balls) { b.dx *= 0.7; b.dy *= 0.7; } }
    else if (type === 'expand') { paddleW = Math.min(paddleW + 30, 220); }
    updateUI();
  }

  function allCleared() {
    for (let r = 0; r < GRID_ROWS; r++) for (let c = 0; c < GRID_COLS; c++) { const br = bricks[r][c]; if (br && !br.solid && br.hp > 0) return false; }
    return true;
  }

  function nextLevel() {
    level++; setLevel(level);
    resetPaddle();
    for (const b of balls) { const s = Math.min(MAX_SPEED, Math.hypot(b.dx, b.dy) * 1.05); const ang = Math.atan2(b.dy, b.dx); b.dx = Math.cos(ang) * s; b.dy = Math.sin(ang) * s; }
    updateUI();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const br = bricks[r][c]; if (!br || br.hp <= 0) continue;
        ctx.fillStyle = br.color; ctx.fillRect(br.x, br.y, BRICK_W, BRICK_H);
        if (!br.solid && br.hp > 1) {
          ctx.fillStyle = 'rgba(0,0,0,0.25)';
          for (let i = 0; i < br.hp; i++) { ctx.fillRect(br.x + 6 + i * 10, br.y + BRICK_H - 6, 8, 4); }
        }
      }
    }
    const py = canvas.height - 20 - paddleH;
    ctx.fillStyle = COLORS.paddle; ctx.fillRect(paddleX, py, paddleW, paddleH);
    for (const b of balls) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fillStyle = COLORS.ball; ctx.fill(); ctx.closePath(); }
    for (const p of powerUps) {
      ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = POWER_COLORS[p.type]; ctx.fill(); ctx.closePath();
      ctx.fillStyle = '#0c1220'; ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'center'; ctx.fillText(p.type === 'life' ? '➕' : (p.type === 'slow' ? '⌛' : '⤢'), p.x, p.y + 4);
    }
    if (ballOnPaddle) {
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(0, py - 40, canvas.width, 28);
      ctx.fillStyle = '#cfe0ff'; ctx.font = 'bold 16px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('Press Space or Click to Launch', canvas.width / 2, py - 20);
    }
    if (paused) {
      ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#cfe0ff'; ctx.font = 'bold 28px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(over ? 'Game Over' : 'Paused', canvas.width / 2, canvas.height / 2 - 10);
      if (over) ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 24);
    }
  }

  let last = 0; function loop(ts) { if (!last) last = ts; const dt = ts - last; last = ts; if (!paused) step(); draw(); requestAnimationFrame(loop); }

  function log(t, ok) { const el = document.createElement('div'); el.innerHTML = (ok ? '✅ <span class="pass">PASS</span> ' : '❌ <span class="fail">FAIL</span> ') + t; diag?.appendChild(el); (ok ? console.log : console.error)(t); }
  function clearDiag() { if (diag) diag.innerHTML = ''; }
  function runTests() {
    clearDiag();
    setLevel(1); log('Level grid aligns (cols>0 & rows>0)', GRID_COLS > 0 && GRID_ROWS > 0);
    resetGame(); log('Ball initially on paddle', ballOnPaddle === true && balls.length === 1 && balls[0].dy === 0);
    tryLaunch(); const s = Math.hypot(balls[0].dx, balls[0].dy); log('Launch gives slow upward velocity', s > 0 && s <= MAX_SPEED && balls[0].dy < 0);
    log('Power-up chance valid', POWER_CHANCE > 0 && POWER_CHANCE < 1);
  }
  btnTests?.addEventListener('click', runTests);

  resetGame();
  runTests(); if (diagBox && diag.textContent.includes('FAIL')) diagBox.open = true;
  requestAnimationFrame(loop);
})();

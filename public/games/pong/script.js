(() => {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const scoreL = document.getElementById('scoreL');
  const scoreR = document.getElementById('scoreR');
  const winScore = document.getElementById('winScore');
  const selMode = document.getElementById('mode');
  const selAI = document.getElementById('ai');
  const btnStart = document.getElementById('btnStart');
  const btnPause = document.getElementById('btnPause');
  const btnTests = document.getElementById('btnTests');
  const diag = document.getElementById('diag');
  const diagBox = document.getElementById('diagBox');
  const padSpeedSlider = document.getElementById('padSpeed');
  const padSpeedVal = document.getElementById('padSpeedVal');
  const ballSpeedSlider = document.getElementById('ballSpeed');
  const ballSpeedVal = document.getElementById('ballSpeedVal');

  const COLORS = { ball: '#ffd53a', paddle: '#61e294', mid: '#213357' };
  const PADDLE_W = 14, PADDLE_H = 100;
  const PADDLE_MARGIN = 28;
  const BALL_R = 8;

  const PAD_MAX_V_BASE = 4.2;
  const PAD_ACCEL_BASE = 0.6;
  const PAD_FRICTION = 0.88;

  const BALL_BASE_SPEED = 2.2;
  const BALL_MAX_SPEED_BASE = 4.5;

  let padSpeedScale = 1.0;
  let ballSpeedScale = 1.0;

  let left = { y: canvas.height / 2 - PADDLE_H / 2, vy: 0, up: false, down: false };
  let right = { y: canvas.height / 2 - PADDLE_H / 2, vy: 0, up: false, down: false };
  let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 0, dy: 0, r: BALL_R };
  let sL = 0, sR = 0, paused = false, over = false, awaitingServe = true;
  let mode = 'solo';
  let aiLevel = 'normal';

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function resetPositions() {
    left.y = canvas.height / 2 - PADDLE_H / 2; left.vy = 0;
    right.y = canvas.height / 2 - PADDLE_H / 2; right.vy = 0;
    ball.x = canvas.width / 2; ball.y = canvas.height / 2; ball.dx = 0; ball.dy = 0; awaitingServe = true;
  }

  function serve(direction = (Math.random() < 0.5 ? -1 : 1)) {
    const angle = (Math.random() * 0.4 - 0.2);
    const speed = BALL_BASE_SPEED * ballSpeedScale;
    ball.dx = Math.cos(angle) * speed * direction;
    ball.dy = Math.sin(angle) * speed;
    awaitingServe = false;
  }

  function updateUI() { scoreL.textContent = sL; scoreR.textContent = sR; }

  function start() { sL = 0; sR = 0; paused = false; over = false; updateUI(); resetPositions(); }

  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (k === 'w') left.up = true; if (k === 's') left.down = true;
    if (k === 'arrowup') right.up = true; if (k === 'arrowdown') right.down = true;
    if (k === 'p') paused = !paused;
    if (k === 'r') start();
    if (k === ' ') { if (awaitingServe) serve(); }
  });

  document.addEventListener('keyup', e => {
    const k = e.key.toLowerCase();
    if (k === 'w') left.up = false; if (k === 's') left.down = false;
    if (k === 'arrowup') right.up = false; if (k === 'arrowdown') right.down = false;
  });

  canvas.addEventListener('click', () => { if (awaitingServe) serve(); });

  btnStart.addEventListener('click', start);
  btnPause.addEventListener('click', () => { paused = !paused; });
  selMode.addEventListener('change', () => { mode = selMode.value; start(); });
  selAI.addEventListener('change', () => { aiLevel = selAI.value; });

  padSpeedSlider.addEventListener('input', () => {
    padSpeedScale = Number(padSpeedSlider.value) / 100;
    padSpeedVal.textContent = Math.round(padSpeedScale * 100) + '%';
  });

  ballSpeedSlider.addEventListener('input', () => {
    ballSpeedScale = Number(ballSpeedSlider.value) / 100;
    ballSpeedVal.textContent = Math.round(ballSpeedScale * 100) + '%';
  });

  function movePaddle(p, scale) {
    const accel = PAD_ACCEL_BASE * padSpeedScale * (scale ?? 1);
    const maxV = PAD_MAX_V_BASE * padSpeedScale * (scale ?? 1);
    if (p.up) p.vy -= accel;
    if (p.down) p.vy += accel;
    p.vy *= PAD_FRICTION;
    p.vy = clamp(p.vy, -maxV, maxV);
    p.y += p.vy;
  }

  function predictY() {
    if (ball.dx <= 0) return canvas.height / 2;
    let tx = canvas.width - (PADDLE_MARGIN + PADDLE_W) - ball.r;
    let time = (tx - ball.x) / ball.dx;
    if (time <= 0) return canvas.height / 2;
    let y = ball.y + ball.dy * time;
    const H = canvas.height;
    while (y < ball.r || y > H - ball.r) {
      if (y < ball.r) y = ball.r + (ball.r - y);
      else if (y > H - ball.r) y = (H - ball.r) - (y - (H - ball.r));
    }
    return y;
  }

  function aiMove() {
    if (mode !== 'solo' || awaitingServe) return;
    const targetY = predictY();
    const center = right.y + PADDLE_H / 2;
    let speedScale = 1.0, noise = 0, dead = 6;
    if (aiLevel === 'easy') { speedScale = 0.8; noise = 14; dead = 14; }
    else if (aiLevel === 'normal') { speedScale = 1.3; noise = 8; dead = 10; }
    else { speedScale = 1.8; noise = 4; dead = 6; }
    const err = (Math.random() * 2 - 1) * noise;
    right.up = right.down = false;
    const aim = targetY + err;
    if (aim < center - dead) right.up = true; else if (aim > center + dead) right.down = true;
    movePaddle(right, speedScale);
    right.y = clamp(right.y, 0, canvas.height - PADDLE_H);
  }

  function step() {
    if (paused || over) return;
    movePaddle(left, 1);
    if (mode === 'duo') movePaddle(right, 1);
    left.y = clamp(left.y, 0, canvas.height - PADDLE_H);
    right.y = clamp(right.y, 0, canvas.height - PADDLE_H);
    aiMove();
    if (awaitingServe) return;
    ball.x += ball.dx; ball.y += ball.dy;
    if (ball.y - ball.r < 0) { ball.y = ball.r; ball.dy = Math.abs(ball.dy); }
    if (ball.y + ball.r > canvas.height) { ball.y = canvas.height - ball.r; ball.dy = -Math.abs(ball.dy); }
    const lX = PADDLE_MARGIN + PADDLE_W, rX = canvas.width - PADDLE_MARGIN - PADDLE_W;
    if (ball.x - ball.r <= lX && ball.x - ball.r >= PADDLE_MARGIN && ball.y >= left.y && ball.y <= left.y + PADDLE_H && ball.dx < 0) {
      const hit = (ball.y - (left.y + PADDLE_H / 2)) / (PADDLE_H / 2);
      const speed = Math.min(BALL_MAX_SPEED_BASE * ballSpeedScale, Math.hypot(ball.dx, ball.dy) * 1.02);
      const angle = hit * (Math.PI / 3);
      ball.dx = Math.abs(speed * Math.cos(angle));
      ball.dy = speed * Math.sin(angle);
    }
    if (ball.x + ball.r >= rX && ball.x + ball.r <= canvas.width - PADDLE_MARGIN && ball.y >= right.y && ball.y <= right.y + PADDLE_H && ball.dx > 0) {
      const hit = (ball.y - (right.y + PADDLE_H / 2)) / (PADDLE_H / 2);
      const speed = Math.min(BALL_MAX_SPEED_BASE * ballSpeedScale, Math.hypot(ball.dx, ball.dy) * 1.02);
      const angle = hit * (Math.PI / 3);
      ball.dx = -Math.abs(speed * Math.cos(angle));
      ball.dy = speed * Math.sin(angle);
    }
    if (ball.x < 0) { sR++; updateUI(); resetPositions(); }
    if (ball.x > canvas.width) { sL++; updateUI(); resetPositions(); }
    const target = Number(winScore.value || 7);
    if (sL >= target || sR >= target) { over = true; paused = true; }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = COLORS.mid; ctx.lineWidth = 2; ctx.setLineDash([8, 10]);
    ctx.beginPath(); ctx.moveTo(canvas.width / 2, 10); ctx.lineTo(canvas.width / 2, canvas.height - 10); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = COLORS.paddle;
    ctx.fillRect(PADDLE_MARGIN, Math.round(left.y), PADDLE_W, PADDLE_H);
    ctx.fillRect(canvas.width - PADDLE_MARGIN - PADDLE_W, Math.round(right.y), PADDLE_W, PADDLE_H);
    ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2); ctx.fillStyle = COLORS.ball; ctx.fill(); ctx.closePath();
    if (awaitingServe) {
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 36, 400, 40);
      ctx.fillStyle = '#cfe0ff'; ctx.font = 'bold 18px system-ui'; ctx.textAlign = 'center';
      ctx.fillText('Press Space or Click to Serve', canvas.width / 2, canvas.height / 2 - 10);
    }
    if (paused) {
      ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#cfe0ff'; ctx.font = 'bold 28px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(over ? 'Match Over' : 'Paused', canvas.width / 2, canvas.height / 2 - 10);
      if (over) ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 24);
    }
  }

  function loop() { step(); draw(); requestAnimationFrame(loop); }

  function log(t, ok) { const el = document.createElement('div'); el.innerHTML = (ok ? '✅ <span class="pass">PASS</span> ' : '❌ <span class="fail">FAIL</span> ') + t; diag?.appendChild(el); (ok ? console.log : console.error)(t); }
  function clearDiag() { if (diag) diag.innerHTML = ''; }
  function runTests() {
    clearDiag();
    start();
    log('Paddles initialized on screen', left.y >= 0 && left.y <= canvas.height - PADDLE_H && right.y >= 0 && right.y <= canvas.height - PADDLE_H);
    serve(1); const s1 = Math.hypot(ball.dx, ball.dy); log('Serve speed respects slider', Math.abs(s1 - BALL_BASE_SPEED * ballSpeedScale) < 0.25);
    ball.y = ball.r - 1; ball.dy = -Math.abs(ball.dy); step(1); log('Top wall bounces down', ball.dy > 0);
    ball.x = -10; step(1); log('Right score increments when ball exits left', Number(scoreR.textContent) > 0);
    resetPositions(); const y0 = right.y; aiMove(1); log('AI idle awaiting serve', right.y === y0);
  }
  btnTests?.addEventListener('click', runTests);

  if (padSpeedSlider) { padSpeedSlider.value = '100'; padSpeedVal.textContent = '100%'; padSpeedScale = 1.0; }
  if (ballSpeedSlider) { ballSpeedSlider.value = '100'; ballSpeedVal.textContent = '100%'; ballSpeedScale = 1.0; }

  start();
  runTests(); if (diagBox && diag.textContent.includes('FAIL')) diagBox.open = true;
  requestAnimationFrame(loop);
})();

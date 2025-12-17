(() => {
  // --- Config ---
  const COLS = 10, ROWS = 20, SIZE = 32; // 10x20 board, 32px block
  const DROP_SPEEDS = [800, 650, 520, 420, 340, 270, 210, 160, 120, 90, 70, 55, 45, 38, 32]; // ms per row

  const COLORS = { I:'#3ad5ff', J:'#5886ff', L:'#ff9f3a', O:'#ffd53a', S:'#61e294', T:'#c67dff', Z:'#ff6f6f', G:'#1b2946' };

  const SHAPES = {
    I: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    J: [[1,0,0],[1,1,1],[0,0,0]],
    L: [[0,0,1],[1,1,1],[0,0,0]],
    O: [[1,1],[1,1]],
    S: [[0,1,1],[1,1,0],[0,0,0]],
    T: [[0,1,0],[1,1,1],[0,0,0]],
    Z: [[1,1,0],[0,1,1],[0,0,0]],
  };

  const KICKS = {
    JLSTZ: [
      [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
      [[0,0],[ 1,0],[ 1,-1],[0, 2],[ 1, 2]],
      [[0,0],[ 1,0],[ 1,1],[0,-2],[ 1,-2]],
      [[0,0],[-1,0],[-1,-1],[0, 2],[-1, 2]],
    ],
    I: [
      [[0,0],[-2,0],[ 1,0],[-2,-1],[ 1, 2]],
      [[0,0],[-1,0],[ 2,0],[-1, 2],[ 2,-1]],
      [[0,0],[ 2,0],[-1,0],[ 2, 1],[-1,-2]],
      [[0,0],[ 1,0],[-2,0],[ 1,-2],[-2, 1]],
    ]
  };

  // --- Canvas & UI ---
  const board = document.getElementById('board');
  const ctx = board.getContext('2d');
  const nextCanvas = document.getElementById('next');
  const nextCtx = nextCanvas.getContext('2d');
  const holdCanvas = document.getElementById('hold');
  const holdCtx = holdCanvas.getContext('2d');

  const elScore = document.getElementById('score');
  const elLines = document.getElementById('lines');
  const elLevel = document.getElementById('level');
  const elSpeed = document.getElementById('speed');
  const btnStart = document.getElementById('btnStart');
  const btnPause = document.getElementById('btnPause');
  const btnTests = document.getElementById('btnTests');
  const diag = document.getElementById('diag');
  const diagBox = document.getElementById('diagBox');

  // --- Game State ---
  let grid = null, active = null, ghostY = 0, queue = [], hold = null, canHold = true, level = 1, score = 0, lines = 0, dropMs = DROP_SPEEDS[0], lastTime = 0, accTime = 0, paused = false, over = false;

  // Helpers
  const clone = (m) => m.map(r => r.slice());
  const shapeFor = (t) => clone(SHAPES[t]);

  function resetGrid() { grid = Array.from({length: ROWS}, () => Array(COLS).fill(null)); }

  function newBag() {
    const bag = ['I','J','L','O','S','T','Z'];
    for (let i = bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [bag[i], bag[j]] = [bag[j], bag[i]]; }
    return bag;
  }

  function ensureQueue(){ if (!Array.isArray(queue)) queue = []; if (queue.length === 0) queue.push(...newBag()); }

  function spawnFromType(t){
    const base = SHAPES[t];
    if (!base) { // extremely defensive: recover by refilling queue
      ensureQueue();
      const fallback = queue.shift();
      return spawnFromType(fallback);
    }
    const shape = clone(base);
    active = { t, shape, x: Math.floor((COLS - shape[0].length)/2), y: -1, r: 0, color: COLORS[t] };
    canHold = true;
    if (collides(0,0,shape)) { over = true; paused = true; }
    updateGhost();
    drawNext();
  }

  function spawn() {
    ensureQueue();
    const t = queue.shift();
    spawnFromType(t);
  }

  function rotateCW(shape){
    if (!shape || !shape[0]) return shape;
    const n = shape.length, m = shape[0].length;
    const out = Array.from({length:m}, () => Array(n).fill(0));
    for(let y=0;y<n;y++) for(let x=0;x<m;x++) out[x][n-1-y] = shape[y][x];
    return out;
  }
  function rotateCCW(shape){ return rotateCW(rotateCW(rotateCW(shape))); }

  function collides(dx, dy, shape = active?.shape, ox = active?.x, oy = active?.y) {
    if (!shape) return false;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (!shape[y][x]) continue;
        const nx = ox + x + dx;
        const ny = oy + y + dy;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
        if (ny >= 0 && grid && grid[ny][nx]) return true;
      }
    }
    return false;
  }

  function tryRotate(dir) {
    if (!active) return;
    const isI = active.t === 'I';
    const kicks = isI ? KICKS.I : KICKS.JLSTZ;
    const from = active.r % 4;
    const to = (active.r + (dir>0?1:3)) % 4;
    const rot = dir>0 ? rotateCW(active.shape) : rotateCCW(active.shape);

    const tests = kicks[from];
    for (const [kx, ky] of tests) {
      const nx = active.x + (dir>0? kx : -kx);
      const ny = active.y + (dir>0? ky : -ky);
      if (!collides(0,0,rot,nx,ny)) { active.shape = rot; active.x = nx; active.y = ny; active.r = to; updateGhost(); return; }
    }
  }

  function merge() {
    for (let y = 0; y < active.shape.length; y++) {
      for (let x = 0; x < active.shape[y].length; x++) {
        if (active.shape[y][x]) {
          const gx = active.x + x, gy = active.y + y;
          if (gy >= 0) grid[gy][gx] = active.t;
        }
      }
    }
  }

  function clearLines() {
    let cleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
      if (grid[y].every(c => c)) { grid.splice(y,1); grid.unshift(Array(COLS).fill(null)); cleared++; y++; }
    }
    if (cleared) {
      const add = [0,40,100,300,1200][cleared] * (level);
      score += add; lines += cleared; level = 1 + Math.floor(lines/10);
      dropMs = DROP_SPEEDS[Math.min(level-1, DROP_SPEEDS.length-1)];
      updateUI();
    }
  }

  function hardDrop() {
    if (!active) return;
    while(!collides(0,1)) active.y++;
    merge(); score += 2; lockAndNext();
  }

  function softDrop() {
    if (!active) return;
    if (!collides(0,1)) { active.y++; score += 1; } else { lockAndNext(); }
  }

  function move(dx) { if (!active) return; if (!collides(dx,0)) { active.x += dx; updateGhost(); } }

  function holdPiece() {
    if (!canHold || !active) return;
    const cur = active.t;
    if (!hold) { hold = cur; spawn(); }
    else { const tmp = hold; hold = cur; active = null; spawnFromType(tmp); }
    canHold = false; drawHold();
  }

  function lockAndNext(){ merge(); clearLines(); spawn(); }

  function updateGhost(){ if (!active) return; let gy = active.y; while(!collides(0,1,active.shape, active.x, gy)) gy++; ghostY = gy; }

  function drawCell(x, y, t, alpha = 1) {
    const px = x*SIZE, py = y*SIZE; ctx.globalAlpha = alpha; ctx.fillStyle = COLORS[t] || COLORS.G; ctx.fillRect(px+1, py+1, SIZE-2, SIZE-2); ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(px+2, py+2, SIZE-4, 4);
    ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(px+2, py+SIZE-6, SIZE-4, 4);
  }

  function drawGrid(){
    if (!grid) return; // SAFETY: grid may not be initialized yet
    ctx.fillStyle = '#0b1222'; ctx.fillRect(0,0,board.width,board.height);
    ctx.strokeStyle = '#10203a'; ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x*SIZE, 0); ctx.lineTo(x*SIZE, ROWS*SIZE); ctx.stroke(); }
    for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y*SIZE); ctx.lineTo(COLS*SIZE, y*SIZE); ctx.stroke(); }

    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (grid[y][x]) drawCell(x,y,grid[y][x]);

    if (active && Number.isInteger(ghostY)) {
      for (let y = 0; y < active.shape.length; y++) for (let x = 0; x < active.shape[y].length; x++) {
        if (active.shape[y][x]) { const gx = active.x + x, gy = ghostY + y; if (gy >= 0) drawCell(gx, gy, active.t, 0.25); }
      }
    }

    if (active) {
      for (let y = 0; y < active.shape.length; y++) for (let x = 0; x < active.shape[y].length; x++) {
        if (active.shape[y][x]) { const gx = active.x + x, gy = active.y + y; if (gy >= 0) drawCell(gx, gy, active.t, 1); }
      }
    }

    if (paused) {
      ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(0,0,board.width,board.height);
      ctx.fillStyle = '#cfe0ff'; ctx.font = 'bold 28px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(over? 'Game Over' : 'Paused', board.width/2, board.height/2 - 10);
      if (over) ctx.fillText('Press R to restart', board.width/2, board.height/2 + 24);
    }
  }

  function drawNext(){
    nextCtx.clearRect(0,0,nextCanvas.width,nextCanvas.height);
    if (!Array.isArray(queue)) return;
    const previews = queue.slice(0,3);
    let y = 8;
    for (const t of previews) {
      const shape = SHAPES[t]; if (!shape) continue;
      drawMini(nextCtx, shape, t, 8, y);
      y += 36 + shape.length*14;
    }
  }

  function drawHold(){ holdCtx.clearRect(0,0,holdCanvas.width,holdCanvas.height); if (!hold) return; drawMini(holdCtx, SHAPES[hold], hold, 8, 16); }

  function drawMini(c, shape, t, ox, oy){ const s = 14; for (let y = 0; y < shape.length; y++) for (let x = 0; x < shape[y].length; x++) { if (!shape[y][x]) continue; c.fillStyle = COLORS[t]; c.fillRect(ox + x*s, oy + y*s, s-2, s-2); } }

  function updateUI(){ elScore.textContent = String(score); elLines.textContent = String(lines); elLevel.textContent = String(level); const base = DROP_SPEEDS[0]; elSpeed.textContent = (base / dropMs).toFixed(2) + 'x'; }

  function tick(dt){ if (paused) return; accTime += dt; if (accTime >= dropMs) { softDrop(); accTime = 0; } }
  function loop(ts){ if (!lastTime) lastTime = ts; const dt = ts - lastTime; lastTime = ts; tick(dt); draw(); requestAnimationFrame(loop); }
  function draw(){ drawGrid(); }

  function start(){
    resetGrid(); queue = newBag(); hold = null; canHold = true; level = 1; score = 0; lines = 0; over = false; paused = false; dropMs = DROP_SPEEDS[0];
    updateUI(); spawn(); accTime = 0; lastTime = 0;
  }

  // --- Controls ---
  function onKey(e){
    if (e.repeat) return; const k = e.key.toLowerCase();
    if (k === 'p') { paused = !paused; return; }
    if (k === 'r') { start(); return; }
    if (paused) return;
    if (k === 'arrowleft') move(-1);
    else if (k === 'arrowright') move(1);
    else if (k === 'arrowdown') softDrop();
    else if (k === ' ') { e.preventDefault(); hardDrop(); }
    else if (k === 'z') tryRotate(-1);
    else if (k === 'x' || k === 'arrowup') tryRotate(1);
    else if (k === 'c') holdPiece();
  }
  document.addEventListener('keydown', onKey);

  // Buttons
  btnStart.addEventListener('click', start);
  btnPause.addEventListener('click', () => { paused = !paused; });

  // Touch controls
  document.querySelectorAll('.tbtn').forEach(btn => {
    const act = btn.getAttribute('data-act');
    const fire = () => {
      if (act==='left') move(-1);
      else if (act==='right') move(1);
      else if (act==='down') softDrop();
      else if (act==='rotL') tryRotate(-1);
      else if (act==='rotR') tryRotate(1);
      else if (act==='drop') hardDrop();
    };
    btn.addEventListener('touchstart', (e)=>{ e.preventDefault(); fire(); }, {passive:false});
    btn.addEventListener('click', (e)=>{ e.preventDefault(); fire(); });
  });

  // Scale canvas for high-DPI displays
  function fitCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    board.width = COLS * SIZE * dpr; board.height = ROWS * SIZE * dpr;
    board.style.width = (COLS * SIZE) + 'px'; board.style.height = (ROWS * SIZE) + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0); draw();
  }
  window.addEventListener('resize', fitCanvas);
  fitCanvas();

  // --- Minimal self-tests (run in console & panel) ---
  function deepEqual(a,b){ return JSON.stringify(a)===JSON.stringify(b); }
  function log(t, ok){ const el = document.createElement('div'); el.innerHTML = (ok? '✅ <span class="pass">PASS</span> ' : '❌ <span class="fail">FAIL</span> ') + t; diag?.appendChild(el); (ok?console.log:console.error)(t); }
  function clearDiag(){ if (diag) diag.innerHTML=''; }
  function runTests(){
    clearDiag();
    // 1) newBag has 7 unique tetrominoes
    const bag = newBag(); log('newBag() yields 7 unique pieces', bag.length===7 && new Set(bag).size===7);
    // 2) shapes defined and have at least one column
    for (const t of ['I','J','L','O','S','T','Z']) log(`SHAPES[${t}] is non-empty`, Array.isArray(SHAPES[t]) && SHAPES[t][0] && SHAPES[t][0].length>0);
    // 3) rotations: CW x4 returns original
    for (const t of ['I','J','L','O','S','T','Z']) {
      const orig = shapeFor(t); let r = orig; for(let i=0;i<4;i++) r = rotateCW(r); log(`${t} rotates CWx4 to original`, deepEqual(orig, r));
    }
    // 4) collides walls check (left of board)
    resetGrid(); const s = shapeFor('O'); log('Collision left wall', collides(0,0,s,-1,0) === true);
    // 5) spawn safety never throws
    let ok = true; try { queue = []; spawn(); } catch(e) { ok=false; console.error(e); }
    log('spawn() works with empty queue', ok);
  }

  btnTests?.addEventListener('click', runTests);

  // --- Start game BEFORE the first animation frame (fixes startup race) ---
  start();
  requestAnimationFrame(loop);

  // Run tests once on load and open diagnostics if a failure occurs
  setTimeout(() => { runTests();
    if (diagBox && diag.textContent.includes('FAIL')) diagBox.open = true;
  }, 0);
})();

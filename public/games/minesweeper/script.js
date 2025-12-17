(function(){
  var canvas = document.getElementById('board');
  var ctx = canvas.getContext('2d');
  var elMines = document.getElementById('mines');
  var elFlags = document.getElementById('flags');
  var elTime = document.getElementById('time');
  var selDiff = document.getElementById('difficulty');
  var rowCustom = document.getElementById('customRow');
  var inpW = document.getElementById('w');
  var inpH = document.getElementById('h');
  var inpM = document.getElementById('m');
  var flagMode = document.getElementById('flagMode');
  var btnNew = document.getElementById('btnNew');
  var btnChord = document.getElementById('btnChord');
  var btnTests = document.getElementById('btnTests');
  var diag = document.getElementById('diag');
  var diagBox = document.getElementById('diagBox');

  var COLORS = {
    bg:'#0c1220',
    grid:'#152442',
    covered:'#0f1628',
    light:'#18253f',
    dark:'#091223',
    text:'#cfe0ff',
    num:[null,'#6bd1ff','#62e892','#ffe08a','#ff9c9c','#ff7bd2','#9aa0ff','#b5b5b5','#ffffff'],
    mine:'#ff6f6f',
    flag:'#ffd53a'
  };

  var W=16,H=16,M=40,CELL=28,dpr=1;
  var cells=[], started=false, first=true, over=false, win=false, flags=0, revealed=0, exploded=-1;
  var timer=0, timerId=null;

  function idx(x,y){ return y*W+x; }
  function inb(x,y){ return x>=0 && y>=0 && x<W && y<H; }

  function fitCanvas(){
    dpr = Math.min(window.devicePixelRatio||1, 2);
    var w = W*CELL, h = H*CELL;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    canvas.style.width = w+'px';
    canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', fitCanvas);

  function setDifficulty(){
    var v = selDiff.value;
    if (v==='beginner'){
      W=9; H=9; M=10;
    } else if (v==='intermediate'){
      W=16; H=16; M=40;
    } else if (v==='expert'){
      W=30; H=16; M=99;
    } else {
      rowCustom.style.display='flex';
      W=clampN(Number(inpW.value),5,60);
      H=clampN(Number(inpH.value),5,32);
      M=clampN(Number(inpM.value),1,Math.max(1,W*H-9));
    }
    if (v!=='custom') rowCustom.style.display='none';
  }

  function clampN(n,a,b){ n = Math.floor(isFinite(n)?n:a); return Math.max(a,Math.min(b,n)); }

  function newGame(){
    setDifficulty();
    CELL = Math.max(22, Math.min(34, Math.floor(Math.min(720/W, 540/H))));
    fitCanvas();
    cells = new Array(W*H).fill(null).map(function(){
      return {mine:false,adj:0,revealed:false,flag:false};
    });
    started=false; first=true; over=false; win=false; flags=0; revealed=0; exploded=-1; timer=0;
    updateUI();
    draw();
    stopTimer();
    elTime.textContent = '000';
  }

  function startTimer(){
    if (timerId) return;
    timerId = setInterval(function(){
      if (over||win||!started){
        stopTimer();
        return;
      }
      timer++;
      elTime.textContent = (''+timer).padStart(3,'0');
    }, 1000);
  }
  function stopTimer(){ if (timerId){ clearInterval(timerId); timerId=null; } }

  function layMines(sx,sy){
    var spots=[];
    for (var y=0;y<H;y++){
      for (var x=0;x<W;x++){
        var far = !(Math.abs(x-sx)<=1 && Math.abs(y-sy)<=1);
        if (far) spots.push(idx(x,y));
      }
    }
    shuffle(spots);
    for (var i=0;i<M && i<spots.length;i++){
      cells[spots[i]].mine=true;
    }
    for (var y2=0;y2<H;y2++){
      for (var x2=0;x2<W;x2++){
        var id=idx(x2,y2);
        if (cells[id].mine) continue;
        var c=0;
        for (var dy=-1;dy<=1;dy++){
          for (var dx=-1;dx<=1;dx++){
            if (dx||dy){
              var nx=x2+dx, ny=y2+dy;
              if (inb(nx,ny) && cells[idx(nx,ny)].mine) c++;
            }
          }
        }
        cells[id].adj=c;
      }
    }
  }

  function shuffle(a){
    for (var i=a.length-1;i>0;i--){
      var j=Math.floor(Math.random()*(i+1));
      var t=a[i]; a[i]=a[j]; a[j]=t;
    }
  }

  function updateUI(){ elMines.textContent = M; elFlags.textContent = flags; }

  function posToCell(clientX,clientY){
    var r=canvas.getBoundingClientRect();
    var x = Math.floor((clientX - r.left) * (canvas.width/r.width) / dpr / CELL);
    var y = Math.floor((clientY - r.top) * (canvas.height/r.height) / dpr / CELL);
    return {x:x,y:y};
  }

  function reveal(x,y){
    if (!inb(x,y)) return;
    var c=cells[idx(x,y)];
    if (c.revealed||c.flag) return;
    if (first){
      layMines(x,y);
      started=true;
      first=false;
      startTimer();
    }
    c.revealed=true;
    revealed++;
    if (c.mine){
      over=true;
      exploded=idx(x,y);
      stopTimer();
      revealAllMines();
      draw();
      return;
    }
    if (c.adj===0){
      var q=[[x,y]];
      while(q.length){
        var cur=q.pop();
        var cx=cur[0], cy=cur[1];
        for (var dy=-1;dy<=1;dy++){
          for (var dx=-1;dx<=1;dx++){
            if (dx||dy){
              var nx=cx+dx, ny=cy+dy;
              if (inb(nx,ny)){
                var n=cells[idx(nx,ny)];
                if (!n.revealed && !n.flag && !n.mine){
                  n.revealed=true;
                  revealed++;
                  if (n.adj===0) q.push([nx,ny]);
                }
              }
            }
          }
        }
      }
    }
    checkWin();
    draw();
  }

  function revealAllMines(){
    for (var i=0;i<cells.length;i++){
      if(cells[i].mine) cells[i].revealed=true;
    }
  }

  function toggleFlag(x,y){
    if (!inb(x,y)) return;
    var c=cells[idx(x,y)];
    if (c.revealed) return;
    c.flag=!c.flag;
    flags += c.flag?1:-1;
    updateUI();
    draw();
  }

  function chord(x,y){
    if (!inb(x,y)) return;
    var c=cells[idx(x,y)];
    if (!c.revealed || c.adj<=0) return;
    var count=0;
    for (var dy=-1;dy<=1;dy++){
      for (var dx=-1;dx<=1;dx++){
        if (dx||dy){
          var nx=x+dx, ny=y+dy;
          if (inb(nx,ny) && cells[idx(nx,ny)].flag) count++;
        }
      }
    }
    if (count!==c.adj) return;
    for (var dy2=-1;dy2<=1;dy2++){
      for (var dx2=-1;dx2<=1;dx2++){
        if (dx2||dy2){
          var nx2=x+dx2, ny2=y+dy2;
          if (inb(nx2,ny2) && !cells[idx(nx2,ny2)].flag) reveal(nx2,ny2);
        }
      }
    }
  }

  function checkWin(){
    if (over) return;
    if (revealed === W*H - M){
      win=true;
      stopTimer();
      draw();
    }
  }

  canvas.addEventListener('contextmenu', function(e){ e.preventDefault(); });
  canvas.addEventListener('mousedown', function(e){
    if (over||win) return;
    var p=posToCell(e.clientX,e.clientY);
    var x=p.x, y=p.y;
    if (!inb(x,y)) return;
    if (e.button===2 || flagMode.checked){ toggleFlag(x,y); }
    else if (e.button===0){ reveal(x,y); }
  });
  document.addEventListener('keydown', function(e){
    if (e.code==='Space'){
      var r=canvas.getBoundingClientRect();
      var mx=r.left + r.width/2;
      var my=r.top + r.height/2;
      var p=posToCell(mx,my);
      chord(p.x,p.y);
    }
  });
  btnChord.addEventListener('click', function(){
    var r=canvas.getBoundingClientRect();
    var mx=r.left + r.width/2;
    var my=r.top + r.height/2;
    var p=posToCell(mx,my);
    chord(p.x,p.y);
  });
  btnNew.addEventListener('click', newGame);
  selDiff.addEventListener('change', function(){
    if (selDiff.value==='custom') rowCustom.style.display='flex'; else rowCustom.style.display='none';
    newGame();
  });
  inpW.addEventListener('change', newGame);
  inpH.addEventListener('change', newGame);
  inpM.addEventListener('change', newGame);

  function draw(){
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for (var y=0;y<H;y++){
      for (var x=0;x<W;x++){
        var c=cells[idx(x,y)];
        var px=x*CELL, py=y*CELL;
        if (!c.revealed){
          ctx.fillStyle = COLORS.covered;
          ctx.fillRect(px,py,CELL,CELL);
          ctx.fillStyle = 'rgba(255,255,255,0.06)';
          ctx.fillRect(px+2,py+2,CELL-4,4);
          ctx.fillStyle = 'rgba(0,0,0,0.2)';
          ctx.fillRect(px+2,py+CELL-6,CELL-4,4);
          if (c.flag){
            ctx.fillStyle = COLORS.flag;
            ctx.beginPath();
            ctx.moveTo(px+8,py+20);
            ctx.lineTo(px+8,py+8);
            ctx.lineTo(px+18,py+12);
            ctx.lineTo(px+8,py+16);
            ctx.closePath();
            ctx.fill();
          }
        } else {
          ctx.fillStyle = (idx(x,y)===exploded)? '#5b1e1e' : COLORS.light;
          ctx.fillRect(px,py,CELL,CELL);
          if (c.mine){
            ctx.fillStyle = COLORS.mine;
            ctx.beginPath();
            ctx.arc(px+CELL/2,py+CELL/2, CELL*0.28, 0, Math.PI*2);
            ctx.fill();
          } else if (c.adj>0){
            ctx.fillStyle = COLORS.num[c.adj];
            ctx.font = 'bold '+Math.floor(CELL*0.52)+'px system-ui';
            ctx.textAlign = 'center';
            ctx.textBaseline='middle';
            ctx.fillText(String(c.adj), px+CELL/2, py+CELL/2+1);
          }
        }
        ctx.strokeStyle = COLORS.grid;
        ctx.lineWidth = 1;
        ctx.strokeRect(px+0.5,py+0.5,CELL-1,CELL-1);
      }
    }
    if (win || over){
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#cfe0ff';
      ctx.font = 'bold 28px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(win? 'You win!' : 'Boom!', canvas.width/2, canvas.height/2 - 10);
      ctx.fillText('Click New Game to play again', canvas.width/2, canvas.height/2 + 24);
    }
  }

  function log(t, ok){
    var el = document.createElement('div');
    el.innerHTML = (ok? '✅ PASS ' : '❌ FAIL ') + t;
    diag.appendChild(el);
  }
  function clearDiag(){ if (diag) diag.innerHTML=''; }
  function runTests(){
    clearDiag();
    newGame();
    var sx=0, sy=0;
    reveal(sx,sy);
    var ok1=true;
    for (var dy=-1;dy<=1;dy++){
      for (var dx=-1;dx<=1;dx++){
        var nx=sx+dx,ny=sy+dy;
        if (inb(nx,ny)) ok1 = ok1 && !cells[idx(nx,ny)].mine;
      }
    }
    log('First click safe area', ok1);
    var mineCount=0;
    for (var i=0;i<cells.length;i++){ if (cells[i].mine) mineCount++; }
    log('Mine count matches M', mineCount===M);
    var sumAdj=0;
    for (var yy=0;yy<H;yy++){
      for (var xx=0;xx<W;xx++){
        var cc=cells[idx(xx,yy)];
        if (!cc.mine) sumAdj+=cc.adj;
      }
    }
    log('Adjacency numbers computed', sumAdj>0 || M===0);
    var fx=W-1, fy=H-1;
    toggleFlag(fx,fy);
    log('Flag toggles and updates', cells[idx(fx,fy)].flag===true && Number(elFlags.textContent)===1);
    toggleFlag(fx,fy);
    log('Flag toggles off', cells[idx(fx,fy)].flag===false && Number(elFlags.textContent)===0);
    var wcount=0;
    for (var k=0;k<cells.length;k++){
      if (!cells[k].mine){
        if (!cells[k].revealed){ cells[k].revealed=true; }
        wcount++;
      }
    }
    revealed = wcount;
    checkWin();
    log('Win when all safe revealed', win===true);
    log('Canvas size matches grid', parseInt(canvas.style.width,10)===W*CELL && parseInt(canvas.style.height,10)===H*CELL);
    newGame();
    log('Counters reset', flags===0 && revealed===0 && elTime.textContent==='000');
    var r=canvas.getBoundingClientRect();
    var ctr = posToCell(r.left + r.width/2, r.top + r.height/2);
    log('posToCell within bounds', inb(ctr.x, ctr.y));
    newGame();
    reveal(2,2);
    var before=cells[idx(3,3)].revealed;
    chord(2,2);
    var after=cells[idx(3,3)].revealed;
    log('Chord does not reveal without matching flags or number>0', before===after);
  }
  if (btnTests) btnTests.addEventListener('click', runTests);
  newGame();
  runTests();
  if (diagBox && diag.textContent.indexOf('FAIL')!==-1) diagBox.open = true;
})();

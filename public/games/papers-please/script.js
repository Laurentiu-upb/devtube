(function(){
  var canvas = document.getElementById('board');
  var ctx = canvas.getContext('2d');
  var elScore = document.getElementById('score');
  var elQueue = document.getElementById('queue');
  var elCorrect = document.getElementById('correct');
  var elMistakes = document.getElementById('mistakes');
  var elDay = document.getElementById('day');
  var elToday = document.getElementById('today');
  var btnApprove = document.getElementById('btnApprove');
  var btnDeny = document.getElementById('btnDeny');
  var btnNew = document.getElementById('btnNew');
  var btnTests = document.getElementById('btnTests');
  var diag = document.getElementById('diag');
  var diagBox = document.getElementById('diagBox');

  var TODAY = '1982-11-23';
  var ALLOWED_COUNTRY = 'Arstozka';
  var COUNTRIES = ['Arstozka','Imporia','Kolechi','Antegria','Obristan'];
  var FIRST = ['Ivana','Marta','Nadia','Alex','Georgi','Oleg','Elena','Sonia','Vlad','Irina'];
  var LAST = ['Petrova','Ivanov','Novik','Karpov','Miskov','Belov','Kuznets','Antonov','Lebedev','Morozov'];

  var state = { score:0, correct:0, mistakes:0, queue:12, day:1 };
  var doc = null;
  var drag = { active:false, dx:0, dy:0 };

  function rand(arr){ return arr[(Math.random()*arr.length)|0]; }
  function randInt(a,b){ return (Math.random()*(b-a+1)|0)+a; }
  function pad2(n){ return (n<10?'0':'')+n; }
  function dateStr(y,m,d){ return y+'-'+pad2(m)+'-'+pad2(d); }
  function dateCmp(a,b){ return a<b?-1:(a>b?1:0); }

  function genDoc(){
    var y = 1981 + randInt(0,3); var m = randInt(1,12); var d = randInt(1,28);
    var expiredBias = Math.random() < 0.2; if (!expiredBias){ y = 1983; m=randInt(1,12); d=randInt(1,28); }
    var person = {
      name: rand(FIRST)+' '+rand(LAST),
      country: rand(COUNTRIES),
      expiry: dateStr(y,m,d),
      photo: true
    };
    var docObj = { x:160, y:260, w:300, h:200, data:person, stamp:null };
    return docObj;
  }

  function startShift(){
    state.score=0; state.correct=0; state.mistakes=0; state.queue=12; state.day=1;
    elDay.textContent = state.day; elToday.textContent = TODAY;
    nextEntrant();
    draw();
    updateUI();
  }

  function updateUI(){
    elScore.textContent = state.score;
    elCorrect.textContent = state.correct;
    elMistakes.textContent = state.mistakes;
    elQueue.textContent = state.queue;
  }

  function nextEntrant(){
    doc = genDoc();
  }

  function judgeDecision(decision, docData){
    var okCountry = (docData.country === ALLOWED_COUNTRY);
    var okExpiry = dateCmp(docData.expiry, TODAY) >= 0;
    var shouldApprove = okCountry && okExpiry;
    var correct = (decision === 'APPROVED' && shouldApprove) || (decision === 'DENIED' && !shouldApprove);
    return correct;
  }

  function applyDecision(decision){
    if (!doc || doc.stamp) return;
    doc.stamp = decision;
    var isCorrect = judgeDecision(decision, doc.data);
    if (isCorrect){ state.score += 5; state.correct += 1; } else { state.score -= 3; state.mistakes += 1; }
    state.queue = Math.max(0, state.queue-1);
    setTimeout(function(){ if (state.queue>0){ nextEntrant(); draw(); } }, 380);
    updateUI();
    draw();
  }

  btnApprove.addEventListener('click', function(){ applyDecision('APPROVED'); });
  btnDeny.addEventListener('click', function(){ applyDecision('DENIED'); });
  btnNew.addEventListener('click', startShift);
  document.addEventListener('keydown', function(e){ var k=e.key.toLowerCase(); if (k==='a') applyDecision('APPROVED'); if (k==='d') applyDecision('DENIED'); });

  canvas.addEventListener('mousedown', function(e){
    var p = getMouse(e);
    if (hitDoc(p.x,p.y)){
      drag.active=true; drag.dx = p.x - doc.x; drag.dy = p.y - doc.y;
    }
  });
  canvas.addEventListener('mousemove', function(e){ if (!drag.active) return; var p=getMouse(e); doc.x = clamp(p.x - drag.dx, 40, canvas.width - doc.w - 40); doc.y = clamp(p.y - drag.dy, 120, canvas.height - doc.h - 40); draw(); });
  canvas.addEventListener('mouseup', function(){ drag.active=false; });
  canvas.addEventListener('mouseleave', function(){ drag.active=false; });

  function getMouse(e){ var r=canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * (canvas.width/r.width), y: (e.clientY - r.top) * (canvas.height/r.height) }; }
  function hitDoc(x,y){ if (!doc) return false; return x>=doc.x && x<=doc.x+doc.w && y>=doc.y && y<=doc.y+doc.h; }
  function clamp(v,a,b){ return Math.max(a, Math.min(b,v)); }

  function drawDesk(){
    ctx.fillStyle = '#131d31'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#1a2744'; ctx.fillRect(0,120,canvas.width,canvas.height-120);
    ctx.fillStyle = '#0e1527'; ctx.fillRect(0,120,140,canvas.height-120);
    ctx.fillStyle = '#0e1527'; ctx.fillRect(canvas.width-140,120,140,canvas.height-120);
    ctx.strokeStyle = '#213357'; ctx.lineWidth=2; ctx.strokeRect(10,130,canvas.width-20,canvas.height-140);

    ctx.fillStyle = '#bdd3ff'; ctx.font='bold 16px system-ui';
    ctx.fillText('Approve', 28, 170);
    ctx.fillText('Deny', canvas.width-112, 170);

    ctx.fillStyle = '#223a68'; ctx.fillRect(20,180,100,60); ctx.fillStyle='#8ae9b3'; ctx.font='bold 18px system-ui'; ctx.fillText('A', 68, 215);
    ctx.fillStyle = '#5a2330'; ctx.fillRect(canvas.width-120,180,100,60); ctx.fillStyle='#ffb2b2'; ctx.fillText('D', canvas.width-72, 215);
  }

  function drawDoc(){
    if (!doc) return;
    var x=doc.x, y=doc.y, w=doc.w, h=doc.h;
    ctx.fillStyle = '#eae3d2'; ctx.fillRect(x,y,w,h);
    ctx.strokeStyle = '#4b463c'; ctx.lineWidth=2; ctx.strokeRect(x+0.5,y+0.5,w-1,h-1);

    ctx.fillStyle = '#b5ad99'; ctx.fillRect(x,y, w, 30);
    ctx.fillStyle = '#1f2433'; ctx.font='bold 14px system-ui'; ctx.fillText('Passport', x+10, y+20);

    ctx.fillStyle = '#d0c9b6'; ctx.fillRect(x+16, y+46, 72, 88); // photo
    ctx.fillStyle = '#233'; ctx.beginPath(); ctx.arc(x+52, y+88, 24, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = '#1e2230'; ctx.font='bold 13px system-ui';
    ctx.fillText('Name:', x+110, y+62);
    ctx.fillText('Country:', x+110, y+86);
    ctx.fillText('Expiry:', x+110, y+110);
    ctx.font='12px system-ui';
    ctx.fillText(doc.data.name, x+180, y+62);
    ctx.fillText(doc.data.country, x+180, y+86);
    ctx.fillText(doc.data.expiry, x+180, y+110);

    if (doc.stamp){
      var s = doc.stamp;
      var col = s==='APPROVED'? '#69e089' : '#ff8585';
      ctx.save();
      ctx.translate(x+w-120, y+h-70);
      ctx.rotate(-0.18);
      ctx.fillStyle = col;
      ctx.strokeStyle = '#122';
      ctx.lineWidth = 3;
      ctx.fillRect(0,0,110,46);
      ctx.strokeRect(0,0,110,46);
      ctx.fillStyle = '#0a1624';
      ctx.font='bold 18px ui-sans-serif';
      ctx.fillText(s, 12, 30);
      ctx.restore();
    }
  }

  function drawHUD(){
    ctx.fillStyle = '#cfe0ff'; ctx.font='bold 18px system-ui'; ctx.fillText('Queue: '+state.queue, 20, 40);
    ctx.fillText('Score: '+state.score, 20, 66);
    ctx.fillText('Day '+state.day+' • Today '+TODAY, 20, 92);
    ctx.fillStyle = '#86a7ff'; ctx.font='12px system-ui'; ctx.fillText('Drag the passport. Press A to Approve, D to Deny.', 20, 112);
  }

  function draw(){
    drawDesk();
    drawHUD();
    drawDoc();
  }

  function log(t, ok){ var el=document.createElement('div'); el.innerHTML=(ok? '✅ <span class="pass">PASS</span> ' : '❌ <span class="fail">FAIL</span> ')+t; diag.appendChild(el); }
  function clearDiag(){ if (diag) diag.innerHTML=''; }
  function runTests(){
    clearDiag();
    var good={country:ALLOWED_COUNTRY, expiry:'1983-05-01'};
    var badCountry={country:'Imporia', expiry:'1983-05-01'};
    var badExpiry={country:ALLOWED_COUNTRY, expiry:'1982-01-01'};
    log('Approve good doc', judgeDecision('APPROVED', good)===true);
    log('Deny good doc wrong', judgeDecision('DENIED', good)===false);
    log('Approve wrong country', judgeDecision('APPROVED', badCountry)===false);
    log('Deny wrong country', judgeDecision('DENIED', badCountry)===true);
    log('Approve expired', judgeDecision('APPROVED', badExpiry)===false);
    log('Deny expired', judgeDecision('DENIED', badExpiry)===true);
    var prev = state.score; doc={x:0,y:0,w:100,h:50,data:good,stamp:null}; applyDecision('APPROVED'); log('Stamp applied', doc.stamp==='APPROVED');
    var d=genDoc(); var okFields = typeof d.data.name==='string' && COUNTRIES.indexOf(d.data.country)!==-1; log('Generated doc fields valid', okFields);
  }
  if (btnTests) btnTests.addEventListener('click', runTests);

  startShift();
  runTests(); if (diagBox && diag.textContent.indexOf('FAIL')!==-1) diagBox.open = true;
})();

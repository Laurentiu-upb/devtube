(() => {
  let timer = null, timeLeft = 0, running = false, paused = false;
  let score = 0, streak = 0, correct = 0, wrong = 0, total = 0;
  let currentAnswer = null;
  const history = [];

  const elProblem = document.getElementById('problem');
  const elAnswer = document.getElementById('answer');
  const elFeedback = document.getElementById('feedback');
  const elSubmit = document.getElementById('btnSubmit');

  const elScore = document.getElementById('statScore');
  const elStreak = document.getElementById('statStreak');
  const elAcc = document.getElementById('statAcc');
  const elGood = document.getElementById('statGood');
  const elBad = document.getElementById('statBad');
  const elTime = document.getElementById('statTime');

  const btnStart = document.getElementById('btnStart');
  const btnPause = document.getElementById('btnPause');

  const opAdd = document.getElementById('opAdd');
  const opSub = document.getElementById('opSub');
  const opMul = document.getElementById('opMul');
  const opDiv = document.getElementById('opDiv');
  const selDiff = document.getElementById('difficulty');
  const selMode = document.getElementById('mode');
  const rowTime = document.getElementById('timeRow');
  const selTime = document.getElementById('timeSelect');

  const overlay = document.getElementById('overlay');
  const sumScore = document.getElementById('sumScore');
  const sumAcc = document.getElementById('sumAcc');
  const sumGood = document.getElementById('sumGood');
  const sumBad = document.getElementById('sumBad');
  const btnAgain = document.getElementById('btnAgain');
  const btnClose = document.getElementById('btnClose');

  const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));
  function fmtTime(s){ s=Math.max(0,Math.floor(s)); const m=Math.floor(s/60); const r=s%60; return String(m).padStart(2,'0')+':'+String(r).padStart(2,'0'); }
  const updateStats = () => {
    elScore.textContent = String(score);
    elStreak.textContent = String(streak);
    const acc = total ? Math.round((correct/total)*100) : 0;
    elAcc.textContent = acc + '%';
    elGood.textContent = String(correct);
    elBad.textContent = String(wrong);
    elTime.textContent = fmtTime(timeLeft);
  };

  function rng(max){ return Math.floor(Math.random()*(max+1)); }
  function boundsForDifficulty(){
    switch(selDiff.value){
      case 'easy': return [0,10];
      case 'normal': return [0,20];
      case 'hard': return [0,99];
      default: return [0,20];
    }
  }
  function pickOps(){
    const ops=[];
    if(opAdd.checked) ops.push('+');
    if(opSub.checked) ops.push('-');
    if(opMul.checked) ops.push('×');
    if(opDiv.checked) ops.push('÷');
    if(ops.length===0) ops.push('+');
    return ops;
  }
  function genAddSub(a,b,op){ return { expr: a+' '+op+' '+b, ans: op==='+'?a+b:a-b }; }
  function genMul(a,b){ return { expr: a+' × '+b, ans: a*b }; }
  function genDiv(){
    const [lo,hi]=boundsForDifficulty();
    const divisor = clamp(rng(Math.max(2,hi)),2,Math.max(2,hi));
    const quotient = clamp(rng(Math.max(2,hi)),2,Math.max(2,hi));
    const dividend = divisor*quotient;
    return { expr: dividend+' ÷ '+divisor, ans: quotient };
  }
  function nextProblem(){
    const ops = pickOps();
    const op = ops[Math.floor(Math.random()*ops.length)];
    const [lo,hi]=boundsForDifficulty();
    let a=rng(hi), b=rng(hi);
    if(op==='-' && b>a){ const t=a; a=b; b=t; }
    let p;
    if(op==='+') p=genAddSub(a,b,'+');
    else if(op==='-') p=genAddSub(a,b,'-');
    else if(op==='×') p=genMul(a,b);
    else p=genDiv();
    currentAnswer = p.ans;
    elProblem.textContent = p.expr;
    elFeedback.textContent = '';
    elFeedback.className = 'feedback';
    elAnswer.value='';
    elAnswer.focus();
  }
  function applyCorrect(){
    streak+=1;
    const mult = 1 + Math.floor(streak/5)*0.25;
    const base = 10;
    score += Math.round(base*mult);
    correct+=1; total+=1;
    elFeedback.textContent = '✓ +' + Math.round(base*mult);
    elFeedback.className = 'feedback ok';
    updateStats(); nextProblem();
  }
  function applyWrong(){
    streak=0; wrong+=1; total+=1;
    score=Math.max(0,score-2);
    elFeedback.textContent = '✗ -2';
    elFeedback.className = 'feedback bad';
    updateStats(); nextProblem();
  }
  function submitAnswer(){
    if(!running||paused) return;
    const val = elAnswer.value.trim(); if(val==='') return;
    const user = Number(val);
    history.push({ q: elProblem.textContent, a: currentAnswer, u: user, ok: user===currentAnswer });
    if(user===currentAnswer) applyCorrect(); else applyWrong();
  }
  function startTimer(){
    if(selMode.value==='practice'){ timeLeft=0; updateStats(); return; }
    timeLeft = Number(selTime.value)||60; updateStats();
    clearInterval(timer);
    timer=setInterval(()=> {
      if(!running||paused) return;
      timeLeft-=1; updateStats();
      if(timeLeft<=0){ clearInterval(timer); finish(); }
    },1000);
  }
  function start(){
    running=true; paused=false;
    score=0; streak=0; correct=0; wrong=0; total=0; history.length=0;
    updateStats(); startTimer(); nextProblem();
  }
  function finish(){
    running=false; paused=false;
    const acc = total?Math.round((correct/total)*100):0;
    sumScore.textContent=String(score);
    sumAcc.textContent=acc+'%';
    sumGood.textContent=String(correct);
    sumBad.textContent=String(wrong);
    overlay.hidden=false;
  }
  function pauseToggle(){ if(!running) return; paused=!paused; if(!paused) elAnswer.focus(); }

  document.getElementById('btnStart').addEventListener('click',()=>{ overlay.hidden=true; start(); });
  document.getElementById('btnPause').addEventListener('click',pauseToggle);
  elSubmit.addEventListener('click',submitAnswer);
  elAnswer.addEventListener('keydown',(e)=>{ if(e.key==='Enter') submitAnswer(); else if(e.key==='Escape') elAnswer.value=''; });
  function syncTimeRow(){ document.getElementById('timeRow').style.display = selMode.value==='sprint'?'grid':'none'; }
  document.getElementById('mode').addEventListener('change',syncTimeRow); syncTimeRow();
  document.querySelectorAll('.numpad button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const k=btn.getAttribute('data-k');
      if(k==='ok') submitAnswer();
      else if(k==='bk') elAnswer.value = elAnswer.value.slice(0,-1);
      else elAnswer.value += k;
      elAnswer.focus();
    });
  });
  document.addEventListener('keydown',(e)=>{ if(e.key.toLowerCase()==='p') pauseToggle(); });
  document.getElementById('btnAgain').addEventListener('click',()=>{ overlay.hidden=true; start(); });
  document.getElementById('btnClose').addEventListener('click',()=>{ overlay.hidden=true; });
  updateStats();
})();

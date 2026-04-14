import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════
   🪢 TARIK TAMBANG — RobiLearn
   Mode: Tim A vs Tim B (guru klik)
   Menang: jawaban benar → kekuatan bertambah
═══════════════════════════════════════════════ */

/* ── Soal bank ── */
const QUESTIONS = [
  { q:'2 + 3 = ?',         a:'5',       opts:['4','5','6','7'],      icon:'➕' },
  { q:'7 - 4 = ?',         a:'3',       opts:['2','3','4','5'],      icon:'➖' },
  { q:'3 × 2 = ?',         a:'6',       opts:['4','5','6','8'],      icon:'✖️' },
  { q:'Ibu kota Indonesia?',a:'Jakarta', opts:['Bandung','Jakarta','Surabaya','Bali'], icon:'🇮🇩' },
  { q:'Warna langit siang?',a:'Biru',    opts:['Merah','Hijau','Biru','Kuning'], icon:'☀️' },
  { q:'8 ÷ 2 = ?',         a:'4',       opts:['2','3','4','5'],      icon:'➗' },
  { q:'4 + 6 = ?',         a:'10',      opts:['8','9','10','11'],     icon:'➕' },
  { q:'Hewan berbelalai?',  a:'Gajah',   opts:['Singa','Gajah','Zebra','Kuda'], icon:'🐘' },
  { q:'9 - 5 = ?',         a:'4',       opts:['3','4','5','6'],      icon:'➖' },
  { q:'Warna daun sehat?',  a:'Hijau',   opts:['Kuning','Hijau','Merah','Biru'], icon:'🌿' },
  { q:'5 + 5 = ?',         a:'10',      opts:['9','10','11','12'],    icon:'➕' },
  { q:'Buah berwarna kuning panjang?',a:'Pisang',opts:['Apel','Jeruk','Pisang','Mangga'],icon:'🍌'},
  { q:'3 + 7 = ?',         a:'10',      opts:['9','10','11','8'],     icon:'➕' },
  { q:'Berapa kaki kucing?',a:'4',       opts:['2','4','6','8'],       icon:'🐱' },
  { q:'6 × 2 = ?',         a:'12',      opts:['10','11','12','14'],   icon:'✖️' },
];

const shuf = a => [...a].sort(() => Math.random() - .5);

const TEAM_A = { name:'Tim A', color:'#3B82F6', light:'#EFF6FF', emoji:'🔵', mascot:'🦁' };
const TEAM_B = { name:'Tim B', color:'#EF4444', light:'#FEF2F2', emoji:'🔴', mascot:'🐯' };
const MAX_POWER = 10;
const WIN_POWER  = MAX_POWER;

export default function TugOfWarGame({ onClose }) {
  /* rope position: -MAX..0..MAX  (negative = A winning, positive = B winning) */
  const [rope,       setRope]       = useState(0);
  const [scoreA,     setScoreA]     = useState(0);
  const [scoreB,     setScoreB]     = useState(0);
  const [questions,  setQuestions]  = useState(() => shuf(QUESTIONS));
  const [qIdx,       setQIdx]       = useState(0);
  const [selected,   setSelected]   = useState(null);
  const [checked,    setChecked]    = useState(false);
  const [turn,       setTurn]       = useState('A'); // whose turn to answer
  const [winner,     setWinner]     = useState(null);
  const [flashTeam,  setFlashTeam]  = useState(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [round,      setRound]      = useState(1);
  const ropeRef = useRef(null);

  const q = questions[qIdx % questions.length];
  const opts = shuf(q.opts);
  const currentTeam = turn === 'A' ? TEAM_A : TEAM_B;

  function pickAnswer(opt) {
    if (checked || selected) return;
    setSelected(opt);
  }

  function confirm() {
    if (!selected || checked) return;
    setChecked(true);
    const correct = selected === q.a;

    if (correct) {
      const newRope = turn === 'A' ? rope - 1 : rope + 1;
      setRope(newRope);
      setFlashTeam(turn);
      turn === 'A' ? setScoreA(s => s + 1) : setScoreB(s => s + 1);
      setTimeout(() => setFlashTeam(null), 600);

      // Check win
      if (Math.abs(newRope) >= WIN_POWER) {
        setTimeout(() => setWinner(turn === 'A' ? TEAM_A : TEAM_B), 400);
        return;
      }
    } else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 600);
    }

    setTimeout(() => {
      setSelected(null);
      setChecked(false);
      setQIdx(i => i + 1);
      setTurn(t => t === 'A' ? 'B' : 'A');
      setRound(r => r + 1);
    }, 1000);
  }

  function reset() {
    setRope(0); setScoreA(0); setScoreB(0);
    setQIdx(0); setSelected(null); setChecked(false);
    setTurn('A'); setWinner(null); setRound(1);
    setQuestions(shuf(QUESTIONS));
  }

  /* rope visual: -10..10 → 0%..100% */
  const ropePercent = 50 + (rope / WIN_POWER) * 40;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-sky-300 via-sky-200 to-green-300 flex flex-col overflow-hidden">

      {/* ── Sky decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Clouds */}
        {[{t:'8%',l:'5%',w:120},{t:'12%',l:'55%',w:90},{t:'5%',l:'75%',w:110}].map((c,i)=>(
          <div key={i} className="absolute" style={{top:c.t,left:c.l}}>
            <div className="relative" style={{width:c.w}}>
              <div className="absolute bg-white/80 rounded-full" style={{width:c.w*.6,height:c.w*.28,top:c.w*.1,left:c.w*.2}}/>
              <div className="absolute bg-white/80 rounded-full" style={{width:c.w*.45,height:c.w*.22,top:c.w*.14,left:c.w*.08}}/>
              <div className="absolute bg-white/80 rounded-full" style={{width:c.w*.5,height:c.w*.25,top:c.w*.07,left:c.w*.42}}/>
            </div>
          </div>
        ))}
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-500/40 to-transparent"/>
        {/* Flags */}
        <div className="absolute bottom-16 left-[12%] text-4xl">🚩</div>
        <div className="absolute bottom-16 right-[12%] text-4xl">🚩</div>
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-3 pb-2">
        <div className="bg-white/80 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-2">
          <span className="text-xl">🪢</span>
          <span className="font-title text-lg text-slate-700">Tarik Tambang</span>
          <span className="text-xs font-bold text-slate-400 ml-1">Ronde {round}</span>
        </div>
        <button onClick={onClose}
                className="bg-white/80 backdrop-blur w-9 h-9 rounded-full
                           flex items-center justify-center text-slate-500 font-bold
                           hover:bg-red-100 hover:text-red-500 transition-all">✕</button>
      </div>

      {/* ── Scoreboard ── */}
      <div className="relative z-10 flex items-center justify-between px-4 pb-2 gap-3">
        <TeamScore team={TEAM_A} score={scoreA} active={turn==='A'} flash={flashTeam==='A'}/>
        <div className="bg-white/60 backdrop-blur rounded-2xl px-4 py-2 text-center">
          <p className="font-title text-2xl text-slate-700">VS</p>
          <p className="text-xs font-bold text-slate-500">Giliran: <span style={{color:currentTeam.color}}>{currentTeam.name}</span></p>
        </div>
        <TeamScore team={TEAM_B} score={scoreB} active={turn==='B'} flash={flashTeam==='B'} right/>
      </div>

      {/* ── Rope Arena ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4 px-4">

        {/* Pullers */}
        <div className="w-full flex items-center justify-between px-2">
          {/* Team A pullers */}
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className={`text-3xl transition-all duration-300
                                       ${flashTeam==='A'?'scale-125 drop-shadow-lg':''}
                                       ${turn==='A'?'animate-bounce':''}`}
                   style={{animationDelay:`${i*0.15}s`}}>
                {TEAM_A.mascot}
              </div>
            ))}
          </div>

          {/* Team B pullers */}
          <div className="flex gap-1 flex-row-reverse">
            {[0,1,2].map(i => (
              <div key={i} className={`text-3xl transition-all duration-300
                                       ${flashTeam==='B'?'scale-125 drop-shadow-lg':''}
                                       ${turn==='B'?'animate-bounce':''}`}
                   style={{animationDelay:`${i*0.15}s`}}>
                {TEAM_B.mascot}
              </div>
            ))}
          </div>
        </div>

        {/* Rope track */}
        <div ref={ropeRef} className="w-full bg-white/30 backdrop-blur rounded-full h-8
                                      border-2 border-white/60 relative overflow-hidden shadow-inner">
          {/* Rope pattern */}
          <div className="absolute inset-0 flex items-center">
            {Array.from({length:20}).map((_,i)=>(
              <div key={i} className="flex-1 h-3 border-r border-white/20"
                   style={{background:i%2===0?'rgba(139,90,43,0.6)':'rgba(101,65,30,0.6)'}}/>
            ))}
          </div>

          {/* Center marker */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white/80"/>

          {/* Knot / flag */}
          <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
               style={{left:`${ropePercent}%`,transform:'translateX(-50%) translateY(-50%)'}}>
            <div className={`w-8 h-8 rounded-full border-4 border-white shadow-xl flex items-center justify-center
                             text-sm font-bold transition-all duration-300
                             ${rope < 0 ? 'bg-blue-500' : rope > 0 ? 'bg-red-500' : 'bg-amber-400'}`}>
              🎯
            </div>
          </div>
        </div>

        {/* Power bars */}
        <div className="w-full flex gap-3">
          <PowerBar value={-Math.min(rope,0)} max={WIN_POWER} color="bg-blue-500" label="Tim A" />
          <PowerBar value={Math.max(rope,0)}  max={WIN_POWER} color="bg-red-500"  label="Tim B" right />
        </div>

        {/* ── Question Card ── */}
        {!winner && (
          <div className={`w-full max-w-lg bg-white rounded-3xl shadow-2xl p-5
                           border-4 transition-all duration-200
                           ${wrongFlash?'border-red-400 animate-shake':checked&&selected===q.a?'border-green-400':'border-white'}`}
               style={{borderColor: wrongFlash?'#EF4444' : checked&&selected===q.a?'#22C55E' : currentTeam.color}}>

            {/* Team indicator */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full" style={{background:currentTeam.color}}/>
              <span className="font-bold text-sm text-slate-500">Giliran {currentTeam.name}</span>
              <span className="ml-auto text-xl">{q.icon}</span>
            </div>

            {/* Question */}
            <p className="font-title text-2xl text-slate-800 text-center mb-4">{q.q}</p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-2">
              {opts.map(opt => {
                let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300';
                if (checked) {
                  if (opt === q.a)       cls = 'bg-green-100 border-green-400 text-green-700';
                  else if (opt===selected) cls = 'bg-red-100 border-red-400 text-red-600';
                  else                   cls = 'bg-slate-50 border-slate-100 text-slate-300 opacity-50';
                } else if (opt === selected) {
                  cls = 'border-b-4 text-white';
                }
                return (
                  <button key={opt} onClick={() => pickAnswer(opt)} disabled={checked}
                          className={`py-3 px-4 rounded-xl border-2 font-bold text-sm
                                      transition-all duration-150 ${cls}`}
                          style={opt===selected&&!checked?{background:currentTeam.color,borderColor:currentTeam.color}:{}}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Confirm button */}
            {!checked && (
              <button onClick={confirm} disabled={!selected}
                      className={`w-full mt-3 py-3 rounded-2xl font-title text-base text-white
                                  border-b-4 transition-all
                                  ${selected?'hover:-translate-y-0.5 active:translate-y-0 active:border-b-2':'opacity-50 cursor-not-allowed'}`}
                      style={selected?{background:currentTeam.color,borderColor:'rgba(0,0,0,0.2)'}:{background:'#CBD5E1',borderColor:'#94A3B8'}}>
                ✓ KONFIRMASI
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Winner Overlay ── */}
      {winner && (
        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 mx-4 text-center shadow-2xl max-w-sm w-full animate-pop-in">
            <div className="text-7xl mb-4">🏆</div>
            <h2 className="font-title text-4xl mb-2" style={{color:winner.color}}>
              {winner.name} Menang!
            </h2>
            <p className="text-slate-500 font-bold mb-2">Skor: {winner===TEAM_A?scoreA:scoreB} jawaban benar</p>
            <div className="text-5xl mb-6">{winner.mascot}</div>
            <div className="flex gap-3">
              <button onClick={reset}
                      className="flex-1 py-3 rounded-2xl font-title text-base text-white bg-blue-500 border-b-4 border-blue-700 hover:-translate-y-0.5 transition-all">
                🔄 Main Lagi
              </button>
              <button onClick={onClose}
                      className="flex-1 py-3 rounded-2xl font-title text-base text-slate-600 bg-slate-100 border-b-4 border-slate-300 hover:-translate-y-0.5 transition-all">
                🏠 Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TeamScore({ team, score, active, flash, right }) {
  return (
    <div className={`flex-1 rounded-2xl p-3 text-center border-2 transition-all duration-300
                     ${flash ? 'scale-105 shadow-lg' : ''}
                     ${active ? 'shadow-md' : 'opacity-80'}`}
         style={{
           background: active ? team.light : 'rgba(255,255,255,0.6)',
           borderColor: active ? team.color : 'rgba(255,255,255,0.8)',
         }}>
      <p className="text-2xl">{team.mascot}</p>
      <p className="font-title text-base" style={{color:team.color}}>{team.name}</p>
      <p className="font-title text-2xl text-slate-700">{score}</p>
      <p className="text-[10px] font-bold text-slate-400">benar</p>
    </div>
  );
}

function PowerBar({ value, max, color, label, right }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className={`flex-1 flex flex-col gap-1 ${right ? 'items-end' : 'items-start'}`}>
      <p className="text-[10px] font-bold text-white/80">{label} {pct}%</p>
      <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`}
             style={{width:`${pct}%`}}/>
      </div>
    </div>
  );
}
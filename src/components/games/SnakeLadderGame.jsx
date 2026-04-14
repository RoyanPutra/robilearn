import { useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════
   🎲 ULAR TANGGA EDUKASI — RobiLearn
   Mode: beberapa tim bergantian
   Fitur: soal muncul setiap kali berhenti
═══════════════════════════════════════════════ */

const BOARD_SIZE = 100;

/* Tangga: dari → ke */
const LADDERS = { 4:14, 9:31, 20:38, 28:84, 40:59, 51:67, 63:81, 71:91 };
/* Ular: dari → ke */
const SNAKES  = { 17:7, 54:34, 62:19, 64:60, 87:24, 93:73, 95:75, 99:78 };

/* Soal bank */
const QUESTIONS = [
  {q:'3 + 4 = ?',       a:'7',       opts:['5','6','7','8'],        icon:'➕'},
  {q:'8 - 3 = ?',       a:'5',       opts:['4','5','6','7'],        icon:'➖'},
  {q:'2 × 4 = ?',       a:'8',       opts:['6','7','8','9'],        icon:'✖️'},
  {q:'10 ÷ 2 = ?',      a:'5',       opts:['3','4','5','6'],        icon:'➗'},
  {q:'Warna pelangi ada berapa?', a:'7', opts:['5','6','7','8'],    icon:'🌈'},
  {q:'Ibu kota Indonesia?',a:'Jakarta',opts:['Bandung','Jakarta','Medan','Solo'],icon:'🇮🇩'},
  {q:'5 + 6 = ?',       a:'11',      opts:['10','11','12','13'],    icon:'➕'},
  {q:'Hewan raja hutan?',a:'Singa',   opts:['Gajah','Singa','Harimau','Beruang'],icon:'🦁'},
  {q:'9 - 4 = ?',       a:'5',       opts:['3','4','5','6'],        icon:'➖'},
  {q:'3 × 3 = ?',       a:'9',       opts:['6','7','8','9'],        icon:'✖️'},
  {q:'Berapa hari seminggu?',a:'7',   opts:['5','6','7','8'],        icon:'📅'},
  {q:'4 + 8 = ?',       a:'12',      opts:['10','11','12','13'],    icon:'➕'},
  {q:'Buah berwarna merah?',a:'Apel', opts:['Pisang','Apel','Mangga','Jeruk'],icon:'🍎'},
  {q:'15 - 6 = ?',      a:'9',       opts:['7','8','9','10'],       icon:'➖'},
  {q:'Planet tempat kita?',a:'Bumi',  opts:['Mars','Venus','Bumi','Jupiter'],icon:'🌍'},
  {q:'2 × 6 = ?',       a:'12',      opts:['10','11','12','14'],    icon:'✖️'},
  {q:'Hewan berbelalai?',a:'Gajah',   opts:['Singa','Gajah','Kuda','Sapi'],icon:'🐘'},
  {q:'6 + 7 = ?',       a:'13',      opts:['11','12','13','14'],    icon:'➕'},
  {q:'12 ÷ 3 = ?',      a:'4',       opts:['3','4','5','6'],        icon:'➗'},
  {q:'Warna daun sehat?',a:'Hijau',   opts:['Kuning','Hijau','Merah','Biru'],icon:'🌿'},
];

const TEAM_COLORS = ['#3B82F6','#EF4444','#22C55E','#F59E0B','#8B5CF6','#EC4899'];
const TEAM_EMOJIS = ['🔵','🔴','🟢','🟡','🟣','🩷'];
const MASCOTS     = ['🦁','🐯','🐻','🦊','🐺','🐸'];

const shuf = a => [...a].sort(() => Math.random() - .5);

function buildBoard() {
  // Board: 100 cells, snake-style numbering
  // Row 0 (bottom) = 1-10 left→right
  // Row 1 = 11-20 right→left, etc.
  const cells = [];
  for (let row = 0; row < 10; row++) {
    const nums = Array.from({length:10},(_,i)=>row*10+i+1);
    if (row % 2 === 1) nums.reverse();
    cells.push(nums);
  }
  return cells.reverse(); // top = high numbers
}

const BOARD = buildBoard();

export default function SnakeLadderGame({ onClose }) {
  /* Setup */
  const [teamCount, setTeamCount] = useState(null); // null = setup screen
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [positions, setPositions] = useState([]);
  const [diceValue, setDiceValue]   = useState(null);
  const [rolling, setRolling]       = useState(false);
  const [phase, setPhase]           = useState('roll'); // roll | question | moving | event | win
  const [question, setQuestion]     = useState(null);
  const [qOpts, setQOpts]           = useState([]);
  const [selected, setSelected]     = useState(null);
  const [checked, setChecked]       = useState(false);
  const [eventMsg, setEventMsg]     = useState('');
  const [winner, setWinner]         = useState(null);
  const [usedQ, setUsedQ]           = useState(new Set());
  const [moveBonus, setMoveBonus]   = useState(0); // extra move if correct

  /* Setup screen */
  if (!teamCount) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-indigo-600 to-purple-700
                      flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-pop-in">
          <div className="text-6xl mb-4">🎲</div>
          <h2 className="font-title text-3xl text-slate-800 mb-2">Ular Tangga</h2>
          <p className="text-slate-500 font-bold text-sm mb-6">Pilih jumlah tim yang bermain:</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[2,3,4,5,6].map(n => (
              <button key={n} onClick={() => startGame(n)}
                      className="py-4 rounded-2xl font-title text-2xl border-b-4 border-indigo-700
                                 bg-indigo-500 text-white hover:scale-105 hover:brightness-110
                                 active:translate-y-1 transition-all shadow-lg">
                {n}
              </button>
            ))}
          </div>
          <button onClick={onClose}
                  className="text-slate-400 font-bold text-sm hover:text-slate-600">
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  function startGame(n) {
    setTeamCount(n);
    setTeams(Array.from({length:n},(_,i)=>({
      name:`Tim ${i+1}`, color:TEAM_COLORS[i], emoji:TEAM_EMOJIS[i], mascot:MASCOTS[i],
    })));
    setPositions(Array(n).fill(0));
    setPhase('roll');
  }

  function rollDice() {
    if (rolling || phase !== 'roll') return;
    setRolling(true);
    setDiceValue(null);
    let count = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.ceil(Math.random() * 6));
      count++;
      if (count >= 10) {
        clearInterval(interval);
        const final = Math.ceil(Math.random() * 6);
        setDiceValue(final);
        setRolling(false);
        // Show question
        askQuestion(final);
      }
    }, 80);
  }

  function askQuestion(dice) {
    const pool = QUESTIONS.filter((_,i) => !usedQ.has(i));
    const idx  = pool.length > 0
      ? QUESTIONS.indexOf(shuf(pool)[0])
      : Math.floor(Math.random() * QUESTIONS.length);
    const q = QUESTIONS[idx];
    setQuestion({...q, idx});
    setQOpts(shuf(q.opts));
    setSelected(null);
    setChecked(false);
    setMoveBonus(dice);
    setPhase('question');
  }

  function answerQuestion(opt) {
    if (checked || !opt) return;
    setSelected(opt);
    setChecked(true);
    const correct = opt === question.a;

    // Mark question used
    setUsedQ(s => new Set([...s, question.idx]));

    setTimeout(() => {
      if (correct) {
        movePlayer(moveBonus, true);
      } else {
        // Wrong: move only half (round down), min 1
        movePlayer(Math.max(1, Math.floor(moveBonus / 2)), false);
      }
    }, 1000);
  }

  function movePlayer(steps, correct) {
    const pos    = positions[currentTeam];
    let newPos   = Math.min(pos + steps, 100);
    let msg      = correct ? `✅ Benar! Maju ${steps} langkah!` : `❌ Salah! Maju ${Math.max(1,Math.floor(steps/2))} langkah saja`;

    // Check ladder
    if (LADDERS[newPos]) {
      msg += ` 🪜 Tangga! Naik ke ${LADDERS[newPos]}!`;
      newPos = LADDERS[newPos];
    }
    // Check snake
    else if (SNAKES[newPos]) {
      msg += ` 🐍 Ular! Turun ke ${SNAKES[newPos]}!`;
      newPos = SNAKES[newPos];
    }

    const newPositions = positions.map((p,i) => i===currentTeam ? newPos : p);
    setPositions(newPositions);
    setEventMsg(msg);
    setPhase('event');

    // Check win
    if (newPos >= 100) {
      setTimeout(() => setWinner(teams[currentTeam]), 1500);
      return;
    }

    setTimeout(() => {
      setEventMsg('');
      setPhase('roll');
      setCurrentTeam(t => (t+1) % teamCount);
      setSelected(null);
      setChecked(false);
      setQuestion(null);
    }, 2000);
  }

  const ct = teams[currentTeam] || {};

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-white/80 backdrop-blur border-b border-purple-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎲</span>
          <span className="font-title text-lg text-slate-700">Ular Tangga Edukasi</span>
        </div>
        <button onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center
                           text-slate-400 hover:bg-red-100 hover:text-red-400 font-bold transition-all">
          ✕
        </button>
      </div>

      <div className="flex-1 flex gap-3 p-3 overflow-hidden min-h-0">

        {/* ── Board ── */}
        <div className="flex-1 min-w-0">
          <div className="grid gap-px bg-purple-200 rounded-2xl overflow-hidden border-2 border-purple-300 shadow-lg h-full"
               style={{gridTemplateColumns:'repeat(10,1fr)',gridTemplateRows:'repeat(10,1fr)'}}>
            {BOARD.flatMap((row, ri) => row.map((num, ci) => {
              const isLadderStart = LADDERS[num];
              const isLadderEnd   = Object.values(LADDERS).includes(num);
              const isSnakeStart  = SNAKES[num];
              const isSnakeEnd    = Object.values(SNAKES).includes(num);
              const teamsHere     = positions.map((p,i)=>p===num?i:null).filter(x=>x!==null);
              const isEven        = (ri+ci)%2===0;

              return (
                <div key={num}
                     className={`relative flex flex-col items-center justify-center text-center
                                 ${isEven?'bg-white':'bg-purple-50'}
                                 ${isLadderStart?'bg-green-100':isSnakeStart?'bg-red-100':''}
                                 transition-all`}
                     style={{minHeight:0}}>

                  {/* Cell number */}
                  <span className="text-[7px] font-bold text-slate-400 leading-none absolute top-0.5 left-0.5">
                    {num}
                  </span>

                  {/* Ladder/Snake indicator */}
                  {isLadderStart && <span className="text-base">🪜</span>}
                  {isSnakeStart  && <span className="text-base">🐍</span>}

                  {/* Player tokens */}
                  {teamsHere.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-px">
                      {teamsHere.map(ti => (
                        <span key={ti} className="text-sm leading-none" style={{filter:'drop-shadow(0 1px 2px rgba(0,0,0,.3))'}}>
                          {teams[ti]?.mascot}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Finish flag */}
                  {num===100 && <span className="text-lg">🏁</span>}
                </div>
              );
            }))}
          </div>
        </div>

        {/* ── Side Panel ── */}
        <div className="w-48 flex flex-col gap-2 shrink-0">

          {/* Teams */}
          <div className="bg-white rounded-2xl p-3 border-2 border-purple-100">
            <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Posisi Tim</p>
            <div className="flex flex-col gap-1.5">
              {teams.map((t,i) => (
                <div key={i}
                     className={`flex items-center gap-2 p-1.5 rounded-xl transition-all
                                 ${i===currentTeam?'shadow-md scale-105':''}`}
                     style={{background:i===currentTeam?t.color+'22':'transparent'}}>
                  <span className="text-lg">{t.mascot}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-slate-700 truncate">{t.name}</p>
                    <p className="text-[10px] text-slate-400">Kotak {positions[i] || 'Start'}</p>
                  </div>
                  {i===currentTeam && <span className="text-xs">▶</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Turn indicator */}
          <div className="bg-white rounded-2xl p-3 border-2 text-center"
               style={{borderColor:ct.color}}>
            <p className="text-xs font-bold text-slate-400 mb-1">Giliran</p>
            <p className="text-3xl">{ct.mascot}</p>
            <p className="font-title text-base" style={{color:ct.color}}>{ct.name}</p>
          </div>

          {/* Dice */}
          {phase === 'roll' && (
            <button onClick={rollDice} disabled={rolling}
                    className={`py-4 rounded-2xl font-title text-lg text-white border-b-4
                                transition-all shadow-lg
                                ${rolling?'opacity-70 cursor-not-allowed':'hover:-translate-y-1 active:translate-y-0 active:border-b-2'}`}
                    style={{background:ct.color,borderColor:'rgba(0,0,0,0.2)'}}>
              {rolling ? '🎲...' : diceValue ? `🎲 ${DICE_FACES[diceValue]}` : '🎲 Lempar!'}
            </button>
          )}

          {/* Dice result */}
          {diceValue && phase !== 'roll' && (
            <div className="bg-white rounded-2xl p-3 text-center border-2 border-purple-100">
              <p className="text-xs font-bold text-slate-400">Dadu</p>
              <p className="text-4xl">{DICE_FACES[diceValue]}</p>
              <p className="font-title text-lg text-slate-700">{diceValue} langkah</p>
            </div>
          )}

          {/* Legend */}
          <div className="bg-white rounded-2xl p-3 border-2 border-purple-100 text-xs">
            <p className="font-bold text-slate-500 mb-1">Keterangan:</p>
            <p>🪜 Tangga = Naik</p>
            <p>🐍 Ular = Turun</p>
            <p>✅ Benar = Penuh</p>
            <p>❌ Salah = ½ langkah</p>
          </div>
        </div>
      </div>

      {/* ── Question Modal ── */}
      {phase === 'question' && question && (
        <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-pop-in">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full" style={{background:ct.color}}/>
              <span className="font-bold text-sm text-slate-500">{ct.name} — Jawab untuk maju {moveBonus} langkah!</span>
            </div>
            <p className="font-title text-2xl text-slate-800 text-center mb-4">
              {question.icon} {question.q}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {qOpts.map(opt => {
                let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300';
                if (checked) {
                  if (opt===question.a)    cls='bg-green-100 border-green-400 text-green-700';
                  else if(opt===selected)  cls='bg-red-100 border-red-400 text-red-600';
                  else                     cls='opacity-40 bg-slate-50 border-slate-100';
                } else if(opt===selected)  cls='text-white';
                return (
                  <button key={opt} onClick={()=>answerQuestion(opt)} disabled={checked}
                          className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${cls}`}
                          style={opt===selected&&!checked?{background:ct.color,borderColor:ct.color}:{}}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <p className={`text-center font-title text-base ${selected===question.a?'text-green-600':'text-red-500'}`}>
                {selected===question.a ? '✅ Betul! Maju penuh!' : `❌ Salah! Jawaban: ${question.a}`}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Event Toast ── */}
      {phase==='event' && eventMsg && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10
                        bg-slate-900 text-white rounded-2xl px-6 py-3
                        font-bold text-sm shadow-xl animate-slide-up max-w-xs text-center">
          {eventMsg}
        </div>
      )}

      {/* ── Winner ── */}
      {winner && (
        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-pop-in">
            <div className="text-7xl mb-3">🏆</div>
            <h2 className="font-title text-4xl mb-2" style={{color:winner.color}}>
              {winner.name} Menang!
            </h2>
            <p className="text-5xl mb-6">{winner.mascot}</p>
            <div className="flex gap-3">
              <button onClick={()=>{setTeamCount(null);setWinner(null);setPositions([]);setPhase('roll');setCurrentTeam(0);setUsedQ(new Set());setDiceValue(null);}}
                      className="flex-1 py-3 rounded-2xl font-title text-white border-b-4 border-indigo-700 bg-indigo-500 hover:-translate-y-0.5 transition-all">
                🔄 Main Lagi
              </button>
              <button onClick={onClose}
                      className="flex-1 py-3 rounded-2xl font-title text-slate-600 bg-slate-100 border-b-4 border-slate-300 hover:-translate-y-0.5 transition-all">
                🏠 Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DICE_FACES = {1:'⚀',2:'⚁',3:'⚂',4:'⚃',5:'⚄',6:'⚅'};
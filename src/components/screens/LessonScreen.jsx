import { useState, useEffect, useCallback } from 'react';
import { useGameStore }                       from '../../store/gameStore';
import QuestionDisplay                        from '../ui/QuestionDisplay';
import MatchQuestion                          from '../ui/MatchQuestion';
import WordBuilder                            from '../ui/WordBuilder';
import TypeAnswer                             from '../ui/TypeAnswer';
import PictureQuiz                            from '../ui/PictureQuiz';
import QuestionTimer                          from '../ui/QuestionTimer';
import { ComboFlash, ScreenFlash }            from '../ui/ComboFlash';
import { sfxCorrect, sfxWrong, sfxClick, sfxHeart } from '../../lib/audio';

const CORRECT_MSG = ['Luar biasa! 🌟','Robi bangga! 🤖','Betul sekali! ✨','Kamu hebat! 💪','Mantap jiwa! 🔥'];
const WRONG_MSG   = ['Hampir benar! 💪','Jangan menyerah! 🌟','Robi percaya kamu bisa!','Belajar dari salah ya! 🧠'];

/* Robi kecil inline */
function MiniRobi({ emotion = 'happy' }) {
  const mouth = emotion==='sad' ? 'M34 64 Q50 54 66 64' : emotion==='excited' ? 'M30 56 Q50 74 70 56' : 'M34 58 Q50 70 66 58';
  return (
    <svg viewBox="0 0 100 120" width="52" height="63" style={{display:'block',flexShrink:0}}>
      <g style={{transformOrigin:'50% 100%',animation:'sway 2s ease-in-out infinite'}}>
        <line x1="50" y1="10" x2="50" y2="25" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="50" cy="7" r="7" fill="#F59E0B" stroke="#fff" strokeWidth="2"/>
      </g>
      <rect x="18" y="24" width="64" height="48" rx="18" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3"/>
      <rect x="9" y="38" width="11" height="18" rx="5" fill="#1D4ED8"/>
      <rect x="80" y="38" width="11" height="18" rx="5" fill="#1D4ED8"/>
      <rect x="26" y="34" width="20" height="20" rx="8" fill="white"/>
      <rect x="54" y="34" width="20" height="20" rx="8" fill="white"/>
      <circle cx="36" cy="44" r="7" fill="#1E293B"/>
      <circle cx="64" cy="44" r="7" fill="#1E293B"/>
      <circle cx="38" cy="42" r="2.5" fill="white"/>
      <circle cx="66" cy="42" r="2.5" fill="white"/>
      <path d={mouth} stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <rect x="24" y="74" width="52" height="36" rx="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3"/>
      <rect x="32" y="80" width="36" height="22" rx="8" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2"/>
      <circle cx="40" cy="91" r="4" fill="#22C55E"/>
      <circle cx="50" cy="91" r="4" fill="#F59E0B"/>
      <circle cx="60" cy="91" r="4" fill="#3B82F6"/>
      <rect x="5" y="76" width="20" height="12" rx="6" fill="#1D4ED8"/>
      <rect x="75" y="76" width="20" height="12" rx="6" fill="#1D4ED8"/>
      <rect x="30" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
      <rect x="54" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
    </svg>
  );
}

/* ── Timer seconds per question type ── */
const TIMER_SECONDS = { choice:15, match:30, word_builder:25, type_answer:20, picture_quiz:12, speed:8 };

export default function LessonScreen() {
  const {
    questions, qIndex, wrongCount, combo,
    hearts, maxHearts,
    nextQ, incWrong, incCorrect, loseHeart,
    addXP, addGems, goHomeFromLesson, retryLesson, toast,
  } = useGameStore();

  const [selected,  setSelected]  = useState(null);
  const [checked,   setChecked]   = useState(false);
  const [correct,   setCorrect]   = useState(null);
  const [flash,     setFlash]     = useState(null);
  const [matchDone, setMatchDone] = useState(false);
  const [timerKey,  setTimerKey]  = useState(0);

  const q       = questions[qIndex];
  const total   = questions.length;
  const pct     = Math.round(qIndex / total * 100);
  const qtype   = q?.type || 'choice';
  const isMatch = qtype === 'match';
  const isWord  = qtype === 'word_builder';
  const isType  = qtype === 'type_answer';
  const isPic   = qtype === 'picture_quiz';
  const isSpeed = q?.qtype === 'speed';
  const timerSec = TIMER_SECONDS[qtype] || 15;

  useEffect(() => {
    setSelected(null); setChecked(false);
    setCorrect(null); setFlash(null); setMatchDone(false);
    setTimerKey(k => k + 1);
  }, [qIndex]);

  if (!q) return null;

  /* ── Correct handler (shared) ── */
  function handleCorrect() {
    setCorrect(true); setFlash('correct');
    incCorrect(); addXP(10 + Math.max(0,5-wrongCount)); addGems(1); sfxCorrect();
    setTimeout(() => setFlash(null), 450);
    setTimeout(() => nextQ(), 900);
  }

  /* ── Wrong handler (shared) ── */
  function handleWrong() {
    setCorrect(false); setFlash('wrong');
    incWrong(); loseHeart(); sfxWrong(); sfxHeart();
    setTimeout(() => setFlash(null), 450);
    if (hearts - 1 <= 0) {
      setTimeout(() => { toast('💔 Nyawa habis! Coba lagi!'); setTimeout(retryLesson,1200); }, 700);
    }
  }

  /* ── Timeout ── */
  function handleTimeout() {
    if (checked || isMatch || isWord || isType || isPic) return;
    setChecked(true); setCorrect(false); setFlash('wrong');
    incWrong(); loseHeart(); sfxWrong(); sfxHeart();
    toast('⏰ Waktu habis!');
    setTimeout(() => { setFlash(null); nextQ(); }, 1200);
  }

  /* ── Choice check ── */
  function check() {
    if (checked || selected === null) return;
    setChecked(true);
    const ok = String(selected) === String(q.answer);
    if (ok) { setCorrect(true); setFlash('correct'); incCorrect(); addXP(10+Math.max(0,5-wrongCount)); addGems(1); sfxCorrect(); }
    else    { setCorrect(false); setFlash('wrong');  incWrong(); loseHeart(); sfxWrong(); sfxHeart();
      if (hearts-1<=0){ setTimeout(()=>{ toast('💔 Nyawa habis!'); setTimeout(retryLesson,1200); },700); }
    }
    setTimeout(() => setFlash(null), 450);
  }

  function handleMatchDone() {
    setMatchDone(true); addXP(15); addGems(2); sfxCorrect();
    setFlash('correct'); setTimeout(()=>{ setFlash(null); nextQ(); }, 800);
  }

  const robiEmotion = checked ? (correct ? 'excited' : 'sad') : 'happy';
  const fbMsg = correct===true ? CORRECT_MSG[qIndex%CORRECT_MSG.length]
              : correct===false ? WRONG_MSG[Math.floor(Math.random()*WRONG_MSG.length)] : '';

  /* ── Question type badge ── */
  const typeBadge = {
    choice:       { icon:'❓', label:'Pilihan Ganda',  color:'bg-blue-100 text-blue-600 border-blue-200' },
    match:        { icon:'🔗', label:'Cocokkan',        color:'bg-violet-100 text-violet-600 border-violet-200' },
    word_builder: { icon:'🔤', label:'Susun Kata',      color:'bg-amber-100 text-amber-600 border-amber-200' },
    type_answer:  { icon:'✏️', label:'Tulis Jawaban',   color:'bg-green-100 text-green-600 border-green-200' },
    picture_quiz: { icon:'🖼️', label:'Tebak Gambar',    color:'bg-pink-100 text-pink-600 border-pink-200' },
  }[qtype] || { icon:'❓', label:'Soal', color:'bg-blue-100 text-blue-600 border-blue-200' };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col">
      <ComboFlash combo={combo}/>
      {flash && <ScreenFlash type={flash} key={flash+Date.now()}/>}

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <button onClick={()=>{ sfxClick(); goHomeFromLesson(); }}
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center
                           text-slate-400 hover:bg-red-50 hover:text-red-400 transition-all font-bold shrink-0">
          ✕
        </button>

        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                 style={{width:`${pct}%`}}/>
          </div>
          <span className="text-xs font-bold text-slate-400 w-10 text-right shrink-0">
            {qIndex}/{total}
          </span>
        </div>

        <div className="flex gap-0.5 shrink-0">
          {Array.from({length:maxHearts}).map((_,i)=>(
            <span key={i} className={`text-xl transition-all duration-300
                                      ${i>=hearts?'grayscale opacity-25 scale-90':''}`}>❤️</span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-5 flex flex-col gap-4">

          {/* Type badge */}
          <span className={`self-start flex items-center gap-1.5 text-xs font-bold px-3 py-1.5
                            rounded-full border-2 ${typeBadge.color}`}>
            {typeBadge.icon} {typeBadge.label}
            {isSpeed && <span className="ml-1 text-orange-500">⚡ CEPAT</span>}
          </span>

          {/* Timer — untuk choice & speed */}
          {(qtype === 'choice' || isSpeed) && !checked && (
            <QuestionTimer
              key={timerKey}
              seconds={timerSec}
              onTimeout={handleTimeout}
              paused={checked}
            />
          )}

          {/* Question text */}
          {!isMatch && !isWord && !isPic && (
            <h2 className="font-title text-2xl text-slate-800 leading-snug">{q.question}</h2>
          )}

          {/* ── Robi speech bubble ── */}
          <div className={`flex items-end gap-3 p-4 rounded-2xl border-2 transition-all duration-300
                           ${checked&&correct  ?'bg-green-50 border-green-200'
                           :checked&&!correct  ?'bg-red-50   border-red-200'
                           :'bg-blue-50 border-blue-100'}`}>
            <div className={checked&&correct?'animate-bounce':''}>
              <MiniRobi emotion={robiEmotion}/>
            </div>
            <div className="flex-1 min-w-0">
              {!checked && (
                <p className="text-sm font-bold text-slate-500">
                  {isMatch?'Tap gambar, lalu tap namanya!'
                  :isWord ?'Tap huruf-huruf untuk susun kata!'
                  :isType ?'Ketik jawaban lalu klik Kirim!'
                  :isPic  ?'Klik gambar yang sesuai!'
                  :'Pilih jawaban yang benar ya!'}
                </p>
              )}
              {checked && (
                <div>
                  <p className={`font-title text-base ${correct?'text-green-600':'text-red-500'}`}>
                    {correct?'✅ Betul!':'❌ Salah!'}
                  </p>
                  <p className="text-sm font-bold text-slate-500 mt-0.5">{fbMsg}</p>
                  {!correct && q.answer && (
                    <p className="text-xs font-bold text-slate-400 mt-1">
                      Jawaban: <span className="text-green-600">{q.answer}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ══ RENDER SOAL sesuai tipe ══ */}

          {/* 1. Choice */}
          {qtype==='choice' && (
            <>
              <QuestionDisplay question={q}/>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map(opt=>{
                  let cls='';
                  if(!checked){
                    cls=opt.value===selected
                      ?'bg-blue-50 border-blue-400 border-b-blue-600 text-blue-700 scale-[1.02]'
                      :'bg-white border-slate-200 border-b-slate-300 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:-translate-y-0.5';
                  } else {
                    if(opt.value===q.answer)      cls='bg-green-50 border-green-400 border-b-green-600 text-green-700';
                    else if(opt.value===selected) cls='bg-red-50 border-red-400 border-b-red-600 text-red-600 animate-shake';
                    else                          cls='bg-white border-slate-100 text-slate-300 opacity-50';
                  }
                  return (
                    <button key={opt.value} disabled={checked}
                            onClick={()=>{if(!checked){sfxClick();setSelected(opt.value);}}}
                            className={`p-4 rounded-2xl border-2 border-b-4 font-bold text-sm
                                        text-center transition-all duration-150 ${cls}`}>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* 2. Match */}
          {isMatch && !matchDone && <MatchQuestion pairs={q.pairs} onAllMatched={handleMatchDone}/>}
          {isMatch && matchDone   && <div className="text-center py-6 font-title text-2xl text-green-600 animate-pop-in">🎉 Semua cocok!</div>}

          {/* 3. Word Builder */}
          {isWord && (
            <WordBuilder
              key={`wb_${qIndex}`}
              word={q.word} emoji={q.emoji} hint={q.hint}
              onCorrect={handleCorrect} onWrong={handleWrong}
            />
          )}

          {/* 4. Type Answer */}
          {isType && (
            <TypeAnswer
              key={`ta_${qIndex}`}
              answer={q.answer} hint={q.hint} emoji={q.emoji}
              onCorrect={handleCorrect} onWrong={handleWrong}
            />
          )}

          {/* 5. Picture Quiz */}
          {isPic && (
            <PictureQuiz
              key={`pq_${qIndex}`}
              question={q.question} answer={q.answer} options={q.options}
              onCorrect={handleCorrect} onWrong={handleWrong}
            />
          )}
        </div>
      </div>

      {/* ── Footer — hanya untuk choice ── */}
      {qtype==='choice' && (
        <div className={`border-t-2 px-4 py-4 transition-colors duration-300
                         ${checked&&correct ?'bg-green-50 border-green-200'
                         :checked&&!correct ?'bg-red-50   border-red-200'
                         :'bg-white border-slate-100'}`}>
          <div className="max-w-xl mx-auto flex justify-end">
            {!checked ? (
              <button onClick={check} disabled={selected===null}
                      className={`px-10 py-4 rounded-2xl font-title text-lg text-white border-b-4 transition-all
                                  ${selected!==null
                                    ?'bg-blue-500 border-blue-700 hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 shadow-lg shadow-blue-200'
                                    :'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'}`}>
                PERIKSA
              </button>
            ) : (
              <button onClick={nextQ}
                      className={`px-10 py-4 rounded-2xl font-title text-lg text-white border-b-4
                                  transition-all hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 shadow-lg
                                  ${correct?'bg-green-500 border-green-700 shadow-green-200':'bg-red-400 border-red-600 shadow-red-200'}`}>
                LANJUT →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
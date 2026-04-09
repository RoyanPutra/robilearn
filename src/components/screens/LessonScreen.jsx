import { useState, useEffect } from 'react';
import { useGameStore }         from '../../store/gameStore';
import QuestionDisplay          from '../ui/QuestionDisplay';
import MatchQuestion            from '../ui/MatchQuestion';
import Robi                     from '../ui/Robi';
import { ComboFlash, ScreenFlash } from '../ui/ComboFlash';
import { sfxCorrect, sfxWrong, sfxClick, sfxHeart } from '../../lib/audio';

const CS=['Kamu pintar sekali!','Luar biasa!','Robi bangga!','Terus semangat!','Mantap jiwa!'];
const WL=['Hampir! Coba lagi ya! 💪','Jangan menyerah! 🌟','Robi percaya kamu bisa!','Salah itu pelajaran! 🧠'];

export default function LessonScreen() {
  const { questions,qIndex,wrongCount,combo,hearts,maxHearts,nextQ,incWrong,incCorrect,addXP,addGems,goHomeFromLesson,retryLesson,toast } = useGameStore();
  const [selected,setSelected]=useState(null);
  const [checked,setChecked]=useState(false);
  const [correct,setCorrect]=useState(null);
  const [flash,setFlash]=useState(null);
  const [matchDone,setMatchDone]=useState(false);

  const q=questions[qIndex];
  const pct=Math.round(qIndex/questions.length*100);
  const isMatch=q?.type==='match';

  useEffect(()=>{ setSelected(null);setChecked(false);setCorrect(null);setFlash(null);setMatchDone(false); },[qIndex]);
  if(!q) return null;

  function check() {
    if(checked||selected===null) return;
    setChecked(true);
    const ok=String(selected)===String(q.answer);
    if(ok){ setCorrect(true);setFlash('correct');incCorrect();addXP(10+Math.max(0,5-wrongCount));addGems(1);sfxCorrect(); }
    else { setCorrect(false);setFlash('wrong');incWrong();sfxWrong();sfxHeart();if(hearts-1<=0){setTimeout(()=>{toast('💔 Nyawa habis! Coba lagi ya!');setTimeout(retryLesson,1200);},700);} }
    setTimeout(()=>setFlash(null),450);
  }
  function handleMatchDone() { setMatchDone(true);addXP(15);addGems(2);sfxCorrect();setFlash('correct');setTimeout(()=>{setFlash(null);nextQ();},800); }

  const fb = correct===true ? `✅ Betul! ${CS[qIndex%CS.length]}` : correct===false ? `❌ Salah. ${WL[Math.floor(Math.random()*WL.length)]}` : '';

  return (
    <div className="fixed inset-0 z-50 bg-surface flex flex-col min-h-screen">
      <ComboFlash combo={combo}/>
      {flash&&<ScreenFlash type={flash} key={flash+Date.now()}/>}

      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-faint/50 bg-white sticky top-0 z-10">
        <button onClick={()=>{sfxClick();goHomeFromLesson();}} className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-ink-muted hover:text-bad hover:bg-bad-light transition-all text-lg font-bold">✕</button>
        <div className="flex-1 bg-ink-faint rounded-full h-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-sky-400 rounded-full transition-all duration-500" style={{width:`${pct}%`}}/>
        </div>
        <div className="flex gap-0.5">{Array.from({length:maxHearts}).map((_,i)=><span key={i} className={`text-xl transition-all ${i>=hearts?'grayscale opacity-30 scale-90':''}`}>❤️</span>)}</div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full flex flex-col gap-4">
        <p className="font-title text-xl text-ink">{isMatch?'🔗 Cocokkan pasangannya!':q.question}</p>
        <div className="flex items-end gap-3">
          <Robi emotion={checked?(correct?'excited':'sad'):'happy'} size={70} anim={checked&&correct?'bounce':'float'}/>
          <div className="flex-1 bg-white border-2 border-ink-faint rounded-2xl rounded-bl-sm px-4 py-3 font-bold text-sm text-ink leading-relaxed shadow-sm">
            {isMatch?'Pasangkan gambar dengan namanya yang tepat!':q.question}
          </div>
        </div>
        {!isMatch&&<QuestionDisplay question={q}/>}
        {isMatch&&!matchDone&&<MatchQuestion pairs={q.pairs} onAllMatched={handleMatchDone}/>}
        {isMatch&&matchDone&&<div className="text-center py-4 font-title text-2xl text-ok animate-pop-in">✅ Semua cocok! Luar biasa!</div>}
        {!isMatch&&(
          <div className="grid grid-cols-2 gap-3">
            {q.options.map(opt=>{
              let cls='opt-idle';
              if(checked){ if(opt.value===q.answer) cls='opt-correct'; else if(opt.value===selected) cls='opt-wrong'; else cls='opt-idle opacity-50'; }
              else if(opt.value===selected) cls='opt-selected';
              return (
                <button key={opt.value} className={`${cls} p-4 font-bold text-sm text-ink flex flex-col items-center gap-2`} disabled={checked}
                        onClick={()=>{if(!checked){sfxClick();setSelected(opt.value);}}}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isMatch&&(
        <div className={`sticky bottom-0 px-4 py-4 border-t-2 flex items-center justify-between gap-4 transition-colors duration-300
                         ${checked&&correct?'bg-ok-light border-ok':checked&&!correct?'bg-bad-light border-bad':'bg-white border-ink-faint/50'}`}>
          <div className="flex-1">{checked&&<p className={`font-title text-base ${correct?'text-ok-dark':'text-bad-dark'}`}>{fb}</p>}</div>
          {!checked
            ? <button onClick={check} disabled={selected===null}
                      className={`shrink-0 px-8 py-3 rounded-2xl font-title text-lg text-white border-b-4 transition-all ${selected!==null?'bg-primary border-primary-dark hover:-translate-y-1 active:translate-y-0 active:border-b-2':'bg-ink-faint border-ink-muted text-ink-muted cursor-not-allowed'}`}>PERIKSA</button>
            : <button onClick={nextQ}
                      className={`shrink-0 px-8 py-3 rounded-2xl font-title text-lg text-white border-b-4 hover:-translate-y-1 active:translate-y-0 active:border-b-2 transition-all ${correct?'bg-ok border-ok-dark':'bg-bad border-bad-dark'}`}>LANJUT →</button>
          }
        </div>
      )}
    </div>
  );
}

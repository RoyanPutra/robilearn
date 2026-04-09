import { useEffect, useState } from 'react';
import Robi from '../ui/Robi';
import { sfxSplash } from '../../lib/audio';

export default function SplashScreen({ onDone }) {
  const [hiding, setHiding] = useState(false);
  function dismiss() {
    if(hiding) return;
    sfxSplash(); setHiding(true); setTimeout(onDone, 650);
  }
  useEffect(() => { const t=setTimeout(dismiss,8000); return()=>clearTimeout(t); }, []);
  return (
    <div onClick={dismiss}
         className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-2 cursor-pointer
                     bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950
                     ${hiding?'animate-splash-hide':''}`}>
      {['top-[8%] left-[10%]','top-[15%] right-[8%]','top-[70%] left-[7%]','top-[75%] right-[10%]','top-[40%] left-[5%]','top-[35%] right-[5%]'].map((p,i)=>(
        <span key={i} className={`absolute ${p} text-2xl animate-twinkle pointer-events-none`} style={{animationDelay:`${i*0.4}s`}}>
          {['⭐','🌟','✨','💫','⭐','🌟'][i]}
        </span>
      ))}
      <div className="animate-splash-drop"><Robi emotion="excited" size={140} anim="bounce"/></div>
      <h1 className="font-title text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200 drop-shadow-[0_4px_20px_rgba(147,197,253,.5)] animate-pop-in"
          style={{animationDelay:'.5s',animationFillMode:'both'}}>RobiLearn</h1>
      <p className="font-nunito font-bold text-blue-300/70 text-base tracking-wide animate-slide-up" style={{animationDelay:'.8s',animationFillMode:'both'}}>
        🤖 Belajar Seru untuk Anak Hebat!
      </p>
      <button onClick={e=>{e.stopPropagation();dismiss();}}
              className="mt-6 relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 text-white font-title text-2xl rounded-3xl px-16 py-5 border-b-[6px] border-blue-700 shadow-[0_8px_40px_rgba(59,130,246,.5)] hover:scale-105 active:translate-y-1 transition-all animate-pop-in"
              style={{animationDelay:'1s',animationFillMode:'both'}}>
        <span className="absolute top-0 left-[-80%] w-[55%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer pointer-events-none"/>
        🚀 MULAI BELAJAR!
      </button>
      <p className="text-blue-400/30 text-xs font-bold mt-4 animate-slide-up" style={{animationDelay:'2s',animationFillMode:'both'}}>Ketuk di mana saja untuk melewati →</p>
    </div>
  );
}

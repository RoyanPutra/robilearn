import { useEffect, useState, useCallback } from 'react';
import Robi from './Robi';
import { startBgMusic, stopBgMusic, sfxClick } from '../../lib/audio';
import { useGameStore } from '../../store/gameStore';

export default function AttractMode() {
  const [visible, setVisible] = useState(false);
  const { screen } = useGameStore();
  const show = useCallback(() => { if(screen==='lesson') return; setVisible(true); stopBgMusic(); },[screen]);
  const hide = useCallback(() => { setVisible(false); startBgMusic(); sfxClick(); },[]);
  useEffect(()=>{
    let timer=setTimeout(show,30000);
    const reset=()=>{ clearTimeout(timer); timer=setTimeout(show,30000); };
    ['click','keydown','mousemove','touchstart'].forEach(e=>window.addEventListener(e,reset,{passive:true}));
    return()=>{ clearTimeout(timer); ['click','keydown','mousemove','touchstart'].forEach(e=>window.removeEventListener(e,reset)); };
  },[show]);
  useEffect(()=>{ const f=e=>{ if(e.key==='Escape') hide(); }; window.addEventListener('keydown',f); return()=>window.removeEventListener('keydown',f); },[hide]);
  if(!visible) return null;
  return (
    <div onClick={hide} className="fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 cursor-pointer">
      {['5%','20%','40%','60%','80%','92%'].map((l,i)=>(
        <span key={i} className="absolute bottom-0 text-3xl opacity-40" style={{left:l,animation:`floatUp ${6+i}s linear ${i*1.5}s infinite`}}>
          {['🌟','📚','🎯','⭐','🤖','✨'][i]}
        </span>
      ))}
      <Robi emotion="excited" size={140} anim="bounce"/>
      <h2 className="font-title text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200 text-center">
        🤖 RobiLearn<br/>Belajar Seru!
      </h2>
      <p className="text-blue-300/60 font-bold text-base text-center">Game Pembelajaran Interaktif untuk Anak TK</p>
      <p className="text-white/60 font-title text-xl animate-attract-pulse">👆 Ketuk untuk Mulai Bermain!</p>
    </div>
  );
}

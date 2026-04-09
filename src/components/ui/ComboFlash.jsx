import { useEffect, useState } from 'react';
const LABELS = [null,null,{txt:'2 Combo! 🔥',color:'#3B82F6'},{txt:'MANTAP! 🌟',color:'#22C55E'},{txt:'WOW! ⚡',color:'#F59E0B'},{txt:'LUAR BIASA! 💥',color:'#8B5CF6'}];

export function ComboFlash({ combo }) {
  const [show,setShow]=useState(false);
  const [key,setKey]=useState(0);
  useEffect(()=>{
    if(!combo||combo<2) return;
    setKey(k=>k+1); setShow(true);
    const t=setTimeout(()=>setShow(false),900);
    return()=>clearTimeout(t);
  },[combo]);
  if(!show) return null;
  const info = combo>=6 ? {txt:`🔥 COMBO ×${combo}!`,color:'#EF4444'} : LABELS[Math.min(combo,LABELS.length-1)];
  if(!info) return null;
  return (
    <div key={key} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9995] pointer-events-none text-center animate-combo-pop font-title text-5xl md:text-6xl"
         style={{color:info.color,textShadow:`0 4px 24px ${info.color}88`}}>
      {info.txt}
    </div>
  );
}

export function ScreenFlash({ type }) {
  if(!type) return null;
  return (
    <div className={`fixed inset-0 pointer-events-none z-[9994] animate-flash-in
                     ${type==='correct'
                       ? 'bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,.3),transparent_70%)]'
                       : 'bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,.25),transparent_70%)]'}`}/>
  );
}

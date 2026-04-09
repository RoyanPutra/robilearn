import { useState } from 'react';
import { sfxCorrect, sfxWrong, sfxClick } from '../../lib/audio';
export default function MatchQuestion({ pairs, onAllMatched }) {
  const [selLeft,setSelLeft]=useState(null);
  const [matched,setMatched]=useState([]);
  const [badPair,setBadPair]=useState(null);
  const [rightOrder]=useState(()=>[...pairs.map(p=>p.l)].sort(()=>Math.random()-.5));
  function pickLeft(e){ sfxClick(); setSelLeft(e===selLeft?null:e); }
  function pickRight(l){
    if(!selLeft) return; sfxClick();
    const ok=pairs.find(p=>p.e===selLeft)?.l===l;
    if(ok){ sfxCorrect(); const n=[...matched,selLeft]; setMatched(n); setSelLeft(null); if(n.length===pairs.length) setTimeout(()=>onAllMatched?.(),500); }
    else { sfxWrong(); setBadPair({l:selLeft,r:l}); setTimeout(()=>{setBadPair(null);setSelLeft(null);},600); }
  }
  const stL=(e)=>matched.includes(e)?'mi-matched':badPair?.l===e?'mi-bad':selLeft===e?'mi-sel':'mi-idle';
  const stR=(l)=>{ const me=pairs.find(p=>p.l===l)?.e; return matched.includes(me)?'mi-matched':badPair?.r===l?'mi-bad':'mi-idle'; };
  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-ink-muted text-center uppercase tracking-wide">Gambar</p>
        {pairs.map(p=>(
          <button key={p.e} onClick={()=>!matched.includes(p.e)&&pickLeft(p.e)} className={`${stL(p.e)} p-3 text-center text-3xl transition-all`}>{p.e}</button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-ink-muted text-center uppercase tracking-wide">Nama</p>
        {rightOrder.map(l=>(
          <button key={l} onClick={()=>pickRight(l)} className={`${stR(l)} p-3 text-center font-bold text-sm transition-all`}>{l}</button>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
const COLORS=['#3B82F6','#22C55E','#F59E0B','#8B5CF6','#EF4444','#ffffff'];
const EMOJIS=['⭐','✨','🌟','💫','🎉'];
export default function Confetti({ active=false, count=60 }) {
  const ref=useRef([]);
  useEffect(()=>{
    if(!active) return;
    ref.current.forEach(el=>el?.remove()); ref.current=[];
    for(let i=0;i<count;i++) {
      setTimeout(()=>{
        const el=document.createElement('div');
        const isEmoji=Math.random()>.6;
        el.style.cssText=`position:fixed;pointer-events:none;z-index:9998;left:${Math.random()*100}vw;top:-20px;font-size:${isEmoji?1.4:0}rem;width:${isEmoji?'auto':10}px;height:${isEmoji?'auto':12}px;background:${isEmoji?'transparent':COLORS[Math.floor(Math.random()*COLORS.length)]};border-radius:2px;animation:confettiFall ${1.2+Math.random()*1.8}s linear forwards;transform:rotate(${Math.random()*360}deg);`;
        el.textContent=isEmoji?EMOJIS[Math.floor(Math.random()*EMOJIS.length)]:'';
        document.body.appendChild(el); ref.current.push(el);
        setTimeout(()=>el.remove(),3500);
      },i*35);
    }
  },[active]);
  return <style>{`@keyframes confettiFall{0%{transform:translateY(-20px) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>;
}

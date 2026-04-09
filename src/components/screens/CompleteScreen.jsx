import { useEffect }      from 'react';
import { useGameStore }   from '../../store/gameStore';
import { useAuthStore }   from '../../store/authStore';
import Robi               from '../ui/Robi';
import Confetti           from '../ui/Confetti';
import { sfxFanfare }     from '../../lib/audio';

const SP=['Yeay! Kamu berhasil! 🎉','Robi sangat bangga! 🤖❤️','Kamu luar biasa! 🌟','Woohooo! Top banget! 🚀'];

export default function CompleteScreen() {
  const { levelData, wrongCount, xpEarned, streak, levelStars, goBack, goTo } = useGameStore();
  const { syncProgress } = useAuthStore();
  const stars  = wrongCount===0?3:wrongCount<=2?2:1;
  const speech = SP[Math.floor(Math.random()*SP.length)];
  const saved  = levelData?(levelStars[levelData.id]??stars):stars;

  useEffect(()=>{ sfxFanfare(); syncProgress(); },[]);

  return (
    <div className="flex flex-col items-center gap-6 py-10 max-w-lg mx-auto text-center animate-slide-up">
      <Confetti active={true} count={70}/>
      <div className="relative">
        <Robi emotion="excited" size={120} anim="dance"/>
        <div className="absolute -top-2 -right-2 bg-white rounded-2xl shadow-lg px-3 py-2 font-bold text-sm text-ink max-w-[160px] leading-relaxed border border-ink-faint">
          {speech}
        </div>
      </div>
      <div className="flex gap-2 text-5xl animate-pop-in">
        {[1,2,3].map(n=><span key={n} className={`transition-all duration-500 ${n<=saved?'':'grayscale opacity-30'}`} style={{animationDelay:`${n*.15}s`}}>⭐</span>)}
      </div>
      <h1 className="font-title text-4xl text-ink">Pelajaran Selesai!</h1>
      <div className="grid grid-cols-2 gap-3 w-full">
        {[{icon:'⚡',label:'XP Didapat',val:xpEarned},{icon:'🎯',label:'Akurasi',val:wrongCount===0?'Sempurna!':`${wrongCount} salah`},{icon:'⭐',label:'Bintang',val:`${saved} / 3`},{icon:'🔥',label:'Streak',val:`${streak} hari`}].map(s=>(
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-title text-xl text-ink">{s.val}</div>
            <div className="text-xs text-ink-muted font-bold">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 w-full">
        <button onClick={()=>goTo('subject')} className="flex-1 btn-gray text-center">🏠 Beranda</button>
        <button onClick={goBack}              className="flex-1 btn-primary text-center">▶ Lanjut</button>
      </div>
      {/* Cloud sync indicator */}
      <p className="text-xs text-ink-muted font-bold animate-fade-in">☁️ Progress tersimpan ke cloud!</p>
    </div>
  );
}

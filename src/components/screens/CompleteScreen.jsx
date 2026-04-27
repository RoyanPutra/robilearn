import { useEffect, useRef } from 'react';
import { useGameStore }  from '../../store/gameStore';
import { useAuthStore }  from '../../store/authStore';
import { sfxFanfare }    from '../../lib/audio';

const SPEECH = ['Kamu luar biasa! 🌟','Robi sangat bangga! 🤖','Pertahankan terus! 💪','Yeay berhasil! 🎉','Top banget! 🚀'];

export default function CompleteScreen() {
  const { levelData, wrongCount, xpEarned, streak, levelStars, goBack, goTo } = useGameStore();
  const { syncProgress } = useAuthStore();
  const stars   = wrongCount===0 ? 3 : wrongCount<=2 ? 2 : 1;
  const saved   = levelData ? (levelStars[levelData.id] ?? stars) : stars;
  const speech  = SPEECH[Math.floor(Math.random() * SPEECH.length)];
  const perfect = wrongCount === 0;
  const ran     = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    sfxFanfare();
    syncProgress();
    burst();
  }, []);

  function burst() {
    const colors = ['#3B82F6','#22C55E','#F59E0B','#8B5CF6','#EF4444','#fff'];
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.style.cssText = `
          position:fixed;pointer-events:none;z-index:9998;
          left:${Math.random()*100}vw;top:-10px;
          width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          border-radius:${Math.random()>.5?'50%':'2px'};
          animation:confettiFall ${1.5+Math.random()*2}s linear forwards;
          transform:rotate(${Math.random()*360}deg);
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3500);
      }, i * 30);
    }
  }

  const accuracy = wrongCount === 0 ? 100 : Math.max(0, Math.round((1 - wrongCount/6)*100));

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5 py-6 sm:py-8
                    max-w-md mx-auto text-center px-4 animate-slide-up">
      <style>{`@keyframes confettiFall{0%{transform:translateY(-10px) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>

      {/* Stars */}
      <div className="flex gap-2 sm:gap-3 text-4xl sm:text-5xl">
        {[1,2,3].map(n => (
          <span key={n}
                className={`transition-all duration-500 drop-shadow
                            ${n <= saved ? 'scale-110' : 'grayscale opacity-20 scale-90'}`}>
            ⭐
          </span>
        ))}
      </div>

      {/* Title */}
      <div>
        <h1 className="font-title text-3xl sm:text-4xl text-slate-800">
          {perfect ? 'SEMPURNA! 🏆' : saved >= 2 ? 'Bagus Sekali! 🎉' : 'Level Selesai! ✅'}
        </h1>
        <p className="text-slate-400 font-bold text-sm mt-1">{speech}</p>
      </div>

      {/* Robi */}
      <div className="animate-bounce">
        <svg viewBox="0 0 100 120" width="90" height="108">
          <g style={{transformOrigin:'50% 100%',animation:'sway 1s ease-in-out infinite'}}>
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
          <path d="M30 56 Q50 74 70 56" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <rect x="24" y="74" width="52" height="36" rx="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3"/>
          <rect x="32" y="80" width="36" height="22" rx="8" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2"/>
          <circle cx="40" cy="91" r="4" fill="#22C55E"/>
          <circle cx="50" cy="91" r="4" fill="#F59E0B"/>
          <circle cx="60" cy="91" r="4" fill="#3B82F6"/>
          <rect x="-4" y="70" width="22" height="12" rx="6" fill="#1D4ED8" transform="rotate(-45 10 76)"/>
          <rect x="82" y="70" width="22" height="12" rx="6" fill="#1D4ED8" transform="rotate(45 94 76)"/>
          <rect x="30" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
          <rect x="54" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
        </svg>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
        {[
          { icon:'⚡', label:'XP Didapat',  value:`+${xpEarned}`,   color:'blue'   },
          { icon:'🎯', label:'Akurasi',      value:`${accuracy}%`,   color:'green'  },
          { icon:'⭐', label:'Bintang',      value:`${saved} / 3`,   color:'amber'  },
          { icon:'🔥', label:'Streak',       value:`${streak} hari`, color:'orange' },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Perfect bonus */}
      {perfect && (
        <div className="w-full bg-amber-50 border-2 border-amber-200
                        rounded-2xl p-3 sm:p-4 animate-pop-in">
          <p className="font-title text-base text-amber-600">🏆 Bonus Sempurna!</p>
          <p className="text-amber-500 text-xs font-bold mt-0.5">
            Semua jawaban benar! Luar biasa!
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 w-full">
        <button onClick={() => goTo('subject')}
                className="flex-1 py-4 rounded-2xl font-title text-base
                           bg-white border-2 border-slate-200 text-slate-500
                           hover:border-slate-300 hover:-translate-y-0.5
                           active:scale-95 transition-all min-h-[52px]">
          🏠 Beranda
        </button>
        <button onClick={goBack}
                className="flex-1 py-4 rounded-2xl font-title text-base text-white
                           bg-blue-500 border-b-4 border-blue-700
                           hover:-translate-y-0.5 active:translate-y-0 active:border-b-2
                           shadow-lg shadow-blue-200 transition-all min-h-[52px]">
          ▶ Lanjut
        </button>
      </div>

      <p className="text-slate-300 text-xs font-bold">☁️ Progress tersimpan otomatis</p>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const c = {
    blue:   'bg-blue-50   border-blue-200   text-blue-600',
    green:  'bg-green-50  border-green-200  text-green-600',
    amber:  'bg-amber-50  border-amber-200  text-amber-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
  };
  return (
    <div className={`${c[color]} border-2 rounded-2xl p-3 sm:p-4 text-center`}>
      <p className="text-xl sm:text-2xl mb-1">{icon}</p>
      <p className={`font-title text-lg sm:text-xl ${c[color].split(' ')[2]}`}>{value}</p>
      <p className="text-xs font-bold text-slate-400">{label}</p>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { sfxSplash } from '../../lib/audio';

export default function SplashScreen({ onDone }) {
  const [hiding, setHiding] = useState(false);

  function dismiss() {
    if (hiding) return;
    sfxSplash();
    setHiding(true);
    setTimeout(onDone, 650);
  }

  useEffect(() => {
    const t = setTimeout(dismiss, 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div onClick={dismiss}
         className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
                     bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950
                     cursor-pointer px-4 overflow-hidden
                     ${hiding ? 'animate-splash-hide' : ''}`}>

      {/* Sparkles */}
      {['top-[6%] left-[8%]','top-[12%] right-[6%]','top-[70%] left-[5%]',
        'top-[75%] right-[8%]','top-[40%] left-[3%]'].map((p,i) => (
        <span key={i}
              className={`absolute ${p} text-lg sm:text-2xl animate-twinkle pointer-events-none`}
              style={{ animationDelay:`${i*0.4}s` }}>
          {['⭐','🌟','✨','💫','⭐'][i]}
        </span>
      ))}

      {/* Robi */}
      <div className="animate-splash-drop mb-4">
        <svg viewBox="0 0 100 120" width="110" height="132" className="drop-shadow-2xl">
          <g style={{transformOrigin:'50% 100%',animation:'sway 2.2s ease-in-out infinite'}}>
            <line x1="50" y1="10" x2="50" y2="25" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="50" cy="7" r="7" fill="#FCD34D" stroke="white" strokeWidth="2"/>
          </g>
          <rect x="18" y="24" width="64" height="48" rx="18" fill="#3B82F6" stroke="#93C5FD" strokeWidth="3"/>
          <rect x="9" y="38" width="11" height="18" rx="5" fill="#1D4ED8"/>
          <rect x="80" y="38" width="11" height="18" rx="5" fill="#1D4ED8"/>
          <rect x="26" y="34" width="20" height="20" rx="8" fill="white"/>
          <rect x="54" y="34" width="20" height="20" rx="8" fill="white"/>
          <circle cx="36" cy="44" r="7" fill="#1E293B"/>
          <circle cx="64" cy="44" r="7" fill="#1E293B"/>
          <circle cx="38" cy="42" r="2.5" fill="white"/>
          <circle cx="66" cy="42" r="2.5" fill="white"/>
          <path d="M30 56 Q50 74 70 56" stroke="#93C5FD" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <rect x="24" y="74" width="52" height="36" rx="14" fill="#3B82F6" stroke="#93C5FD" strokeWidth="3"/>
          <rect x="32" y="80" width="36" height="22" rx="8" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="2"/>
          <circle cx="40" cy="91" r="4" fill="#22C55E"/>
          <circle cx="50" cy="91" r="4" fill="#FCD34D"/>
          <circle cx="60" cy="91" r="4" fill="#3B82F6"/>
          <rect x="-4" y="70" width="22" height="12" rx="6" fill="#1D4ED8" transform="rotate(-45 10 76)"/>
          <rect x="82" y="70" width="22" height="12" rx="6" fill="#1D4ED8" transform="rotate(45 94 76)"/>
          <rect x="30" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
          <rect x="54" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
        </svg>
      </div>

      {/* Title */}
      <h1 className="font-title text-4xl sm:text-6xl text-transparent bg-clip-text
                     bg-gradient-to-r from-blue-300 via-white to-blue-200
                     animate-pop-in text-center"
          style={{ animationDelay:'.4s', animationFillMode:'both' }}>
        RobiLearn
      </h1>

      <p className="font-bold text-blue-300/70 text-sm sm:text-base tracking-wide mt-2
                    animate-slide-up text-center"
         style={{ animationDelay:'.7s', animationFillMode:'both' }}>
        🤖 Belajar Seru untuk Anak Hebat!
      </p>

      {/* CTA Button */}
      <button
        onClick={e => { e.stopPropagation(); dismiss(); }}
        className="mt-6 relative overflow-hidden
                   bg-gradient-to-r from-blue-500 to-blue-400 text-white
                   font-title text-xl sm:text-2xl rounded-3xl
                   px-10 sm:px-16 py-4 sm:py-5
                   border-b-[6px] border-blue-700
                   shadow-[0_8px_40px_rgba(59,130,246,.5)]
                   hover:scale-105 active:translate-y-1 transition-all
                   animate-pop-in min-h-[56px]"
        style={{ animationDelay:'.9s', animationFillMode:'both' }}
      >
        <span className="absolute top-0 left-[-80%] w-[55%] h-full
                         bg-gradient-to-r from-transparent via-white/30 to-transparent
                         -skew-x-12 animate-shimmer pointer-events-none"/>
        🚀 MULAI BELAJAR!
      </button>

      <p className="text-blue-400/30 text-xs font-bold mt-4 animate-slide-up"
         style={{ animationDelay:'1.8s', animationFillMode:'both' }}>
        Ketuk di mana saja untuk melewati →
      </p>
    </div>
  );
}
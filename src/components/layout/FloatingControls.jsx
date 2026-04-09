import { useState } from 'react';
import { toggleMute, sfxClick } from '../../lib/audio';

export default function FloatingControls() {
  const [muted,   setMuted]   = useState(false);
  const [exhibit, setExhibit] = useState(false);
  const [fs,      setFs]      = useState(false);

  function handleFullscreen() {
    sfxClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setFs(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setFs(false);
    }
  }

  const btns = [
    {
      icon:  muted ? '🔇' : '🔊',
      label: muted ? 'Mute' : 'Suara',
      color: muted
        ? 'bg-slate-200 border-slate-400 text-slate-500'
        : 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-800 text-white shadow-lg shadow-blue-200',
      onClick: () => { const m = toggleMute(); setMuted(m); },
    },
    {
      icon:  fs ? '⊡' : '⛶',
      label: fs ? 'Keluar Fullscreen' : 'Layar Penuh',
      color: 'bg-gradient-to-br from-indigo-400 to-violet-500 border-violet-800 text-white shadow-lg shadow-indigo-200',
      onClick: handleFullscreen,
    },
    {
      icon:  exhibit ? '🏫' : '🎪',
      label: exhibit ? 'Mode Normal' : 'Mode Pameran',
      color: exhibit
        ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-emerald-700 text-white shadow-lg shadow-green-200'
        : 'bg-gradient-to-br from-amber-400 to-orange-500 border-orange-700 text-white shadow-lg shadow-amber-200',
      onClick: () => {
        sfxClick();
        const n = !exhibit;
        setExhibit(n);
        document.body.classList.toggle('exhibit-mode', n);
      },
    },
  ];

  return (
    /* ← top-20 supaya tidak nabrak TopBar & hearts */
    <div className="fixed top-20 right-4 z-[990] hidden lg:flex flex-col gap-2">
      {btns.map((b, i) => (
        <button
          key={i}
          title={b.label}
          onClick={b.onClick}
          className={`group relative w-12 h-12 rounded-2xl border-b-[3px] text-xl
                      flex items-center justify-center
                      hover:scale-110 hover:-translate-y-0.5
                      active:translate-y-0 active:border-b-[1px]
                      transition-all duration-150 ${b.color}`}
        >
          {b.icon}
          {/* Tooltip kiri */}
          <span className="absolute right-[54px] top-1/2 -translate-y-1/2
                           bg-ink text-white text-xs font-bold px-2.5 py-1.5
                           rounded-xl whitespace-nowrap opacity-0 pointer-events-none
                           group-hover:opacity-100 transition-all duration-150 shadow-lg">
            {b.label}
          </span>
        </button>
      ))}
    </div>
  );
}
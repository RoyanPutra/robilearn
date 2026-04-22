import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { toggleMute, sfxClick } from '../../lib/audio';
import MobileDrawer from './MobileDrawer';

export default function TopBar() {
  const { xp, streak, hearts, maxHearts, goTo, screen } = useGameStore();
  const [muted,      setMuted]      = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 lg:hidden
                         bg-white/95 backdrop-blur-md
                         border-b-2 border-blue-50 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2.5">

          {/* ── Hamburger menu ── */}
          <button
            onClick={() => { sfxClick(); setDrawerOpen(true); }}
            className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100
                       flex items-center justify-center shrink-0
                       hover:bg-blue-100 active:scale-95 transition-all"
          >
            <div className="flex flex-col gap-1">
              <div className="w-4 h-0.5 bg-blue-500 rounded-full"/>
              <div className="w-4 h-0.5 bg-blue-500 rounded-full"/>
              <div className="w-3 h-0.5 bg-blue-500 rounded-full"/>
            </div>
          </button>

          {/* ── Logo ── */}
          <button
            onClick={() => { sfxClick(); goTo('subject'); }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center
                            justify-center text-sm shadow-sm shadow-blue-200">
              🤖
            </div>
            <span className="font-title text-base text-blue-600">RobiLearn</span>
          </button>

          {/* ── Stats ── */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Streak */}
            <div className="flex items-center gap-1 bg-orange-50 border border-orange-200
                            rounded-full px-2.5 py-1 min-w-[44px] justify-center">
              <span className="text-xs">🔥</span>
              <span className="font-title text-xs text-orange-600">{streak}</span>
            </div>

            {/* Hearts */}
            <div className="flex items-center gap-0.5 bg-red-50 border border-red-200
                            rounded-full px-2 py-1">
              {Array.from({ length: maxHearts }).map((_, i) => (
                <span key={i}
                      className={`text-xs transition-all
                                  ${i >= hearts ? 'grayscale opacity-30' : ''}`}>
                  ❤️
                </span>
              ))}
            </div>

            {/* XP */}
            <div className="flex items-center gap-1 bg-blue-50 border border-blue-200
                            rounded-full px-2.5 py-1 min-w-[44px] justify-center">
              <span className="text-xs">⚡</span>
              <span className="font-title text-xs text-blue-600">{xp}</span>
            </div>

            {/* Mute */}
            <button
              onClick={() => { const m = toggleMute(); setMuted(m); }}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center
                          text-sm transition-all active:scale-95
                          ${muted
                            ? 'bg-slate-100 border-slate-200 text-slate-400'
                            : 'bg-blue-500 border-blue-600 text-white shadow-sm shadow-blue-200'}`}
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
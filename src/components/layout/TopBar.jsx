import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { toggleMute, sfxClick } from '../../lib/audio';
import UserBadge from '../auth/UserBadge';

export default function TopBar() {
  const { xp, streak, hearts, maxHearts, goTo } = useGameStore();
  const [muted, setMuted] = useState(false);

  return (
    <header className="sticky top-0 z-40 lg:hidden
                       bg-white/95 backdrop-blur-md
                       border-b-2 border-primary/10
                       shadow-sm shadow-blue-100/50">
      <div className="flex items-center justify-between px-4 py-2.5">

        {/* Logo */}
        <button
          onClick={() => { sfxClick(); goTo('subject'); }}
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600
                          rounded-xl flex items-center justify-center text-base shadow-sm">
            🤖
          </div>
          <span className="font-title text-lg text-primary">RobiLearn</span>
        </button>

        {/* Stats pills */}
        <div className="flex items-center gap-1.5">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-orange-50 border border-orange-200
                          rounded-full px-2.5 py-1">
            <span className="text-sm">🔥</span>
            <span className="font-title text-xs text-orange-600">{streak}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-0.5 bg-red-50 border border-red-200
                          rounded-full px-2.5 py-1">
            {Array.from({ length: maxHearts }).map((_, i) => (
              <span key={i}
                    className={`text-xs transition-all ${i >= hearts ? 'grayscale opacity-30' : ''}`}>
                ❤️
              </span>
            ))}
          </div>

          {/* XP */}
          <div className="flex items-center gap-1 bg-blue-50 border border-blue-200
                          rounded-full px-2.5 py-1">
            <span className="text-sm">⚡</span>
            <span className="font-title text-xs text-blue-600">{xp}</span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { const m = toggleMute(); setMuted(m); }}
            className={`w-8 h-8 rounded-xl border-b-2 flex items-center justify-center text-sm
                        transition-all hover:scale-110 active:translate-y-px
                        ${muted
                          ? 'bg-slate-100 border-slate-300 text-slate-400'
                          : 'bg-gradient-to-br from-blue-400 to-blue-500 border-blue-700 text-white shadow-sm'}`}
          >
            {muted ? '🔇' : '🔊'}
          </button>
          <UserBadge />
        </div>
      </div>
    </header>
  );
}

import { useState } from 'react';
import TugOfWarGame    from '../games/TugOfWarGame';
import SnakeLadderGame from '../games/SnakeLadderGame';
import { sfxClick }    from '../../lib/audio';

const GAMES = [
  {
    id: 'tug',
    title: 'Tarik Tambang',
    emoji: '🪢',
    desc: 'Tim A vs Tim B! Jawab soal untuk menarik tambang. Tim pertama yang mencapai ujung menang!',
    players: '2 Tim',
    difficulty: 'Mudah',
    color: 'from-blue-500 to-cyan-500',
    border: 'border-b-blue-700',
    tags: ['Kelas','Kompetitif','Seru'],
  },
  {
    id: 'snake',
    title: 'Ular Tangga',
    emoji: '🎲',
    desc: 'Lempar dadu, jawab soal, hindari ular dan naiki tangga! Siapa yang pertama sampai kotak 100?',
    players: '2-6 Tim',
    difficulty: 'Sedang',
    color: 'from-purple-500 to-indigo-500',
    border: 'border-b-purple-700',
    tags: ['Kelas','Strategi','Klasik'],
  },
];

export default function GameHubScreen() {
  const [active, setActive] = useState(null);

  if (active === 'tug')   return <TugOfWarGame    onClose={() => setActive(null)} />;
  if (active === 'snake') return <SnakeLadderGame onClose={() => setActive(null)} />;

  return (
    <div className="flex flex-col gap-4 pb-10 max-w-2xl mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-4 sm:p-5
                      shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-28 sm:w-32 h-28 sm:h-32 bg-white/10 rounded-full"/>
        <div className="absolute right-4 bottom-2 text-4xl sm:text-5xl opacity-30 pointer-events-none">🎮</div>
        <h1 className="font-title text-xl sm:text-2xl text-white">Ruang Game 🎮</h1>
        <p className="text-indigo-200 text-xs sm:text-sm font-bold mt-1">
          Game seru untuk dimainkan bersama di kelas!
        </p>
      </div>

      {/* Tips banner */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 sm:p-4
                      flex items-start gap-3">
        <span className="text-xl sm:text-2xl shrink-0">💡</span>
        <div>
          <p className="font-bold text-amber-700 text-xs sm:text-sm">Tips untuk Guru / Orang Tua</p>
          <p className="text-amber-600 text-xs font-bold mt-0.5 leading-relaxed">
            Buka dalam mode fullscreen (tombol ⛶) untuk pengalaman terbaik di proyektor atau smartboard!
          </p>
        </div>
      </div>

      {/* Section title */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-1 h-5 bg-purple-500 rounded-full"/>
        <h2 className="font-title text-base sm:text-lg text-slate-700">Pilih Game</h2>
      </div>

      {/* Game cards */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {GAMES.map(g => (
          <button key={g.id}
            onClick={() => { sfxClick(); setActive(g.id); }}
            className={`text-left bg-gradient-to-br ${g.color}
                        rounded-2xl sm:rounded-3xl p-4 sm:p-5
                        border-b-4 ${g.border} shadow-lg
                        hover:-translate-y-1 hover:shadow-xl
                        active:translate-y-0 active:border-b-2 active:scale-[0.98]
                        transition-all duration-200 group relative overflow-hidden
                        min-h-[88px]`}>

            {/* Shimmer */}
            <span className="absolute top-0 left-[-80%] w-[55%] h-full
                             bg-gradient-to-r from-transparent via-white/20 to-transparent
                             -skew-x-12 group-hover:animate-shimmer pointer-events-none"/>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-4xl sm:text-5xl drop-shadow-lg
                              group-hover:scale-110 transition-transform shrink-0">
                {g.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-title text-lg sm:text-xl text-white">{g.title}</h3>
                <p className="text-white/80 text-xs font-bold mt-0.5 leading-relaxed
                              hidden sm:block">{g.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="bg-white/25 text-white text-[10px] font-bold
                                   px-2 py-0.5 rounded-full">
                    👥 {g.players}
                  </span>
                  <span className="bg-white/25 text-white text-[10px] font-bold
                                   px-2 py-0.5 rounded-full">
                    ⚡ {g.difficulty}
                  </span>
                  {g.tags.map(t => (
                    <span key={t} className="bg-white/25 text-white text-[10px] font-bold
                                             px-2 py-0.5 rounded-full hidden sm:inline">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-white/60 text-2xl shrink-0
                               group-hover:translate-x-1 transition-transform">›</span>
            </div>
          </button>
        ))}
      </div>

      {/* Coming soon */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4
                      text-center">
        <p className="text-2xl mb-1">🔮</p>
        <p className="font-title text-sm text-slate-400">Game baru segera hadir!</p>
        <p className="text-xs text-slate-300 font-bold mt-0.5">Memory Card, Word Scramble & lebih banyak lagi</p>
      </div>
    </div>
  );
}
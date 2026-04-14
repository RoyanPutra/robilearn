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
    border: 'border-blue-700',
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
    border: 'border-purple-700',
    tags: ['Kelas','Strategi','Klasik'],
  },
];

export default function GameHubScreen() {
  const [active, setActive] = useState(null);

  if (active === 'tug')   return <TugOfWarGame    onClose={() => setActive(null)} />;
  if (active === 'snake') return <SnakeLadderGame onClose={() => setActive(null)} />;

  return (
    <div className="flex flex-col gap-5 pb-10 max-w-2xl mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5
                      shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full"/>
        <div className="absolute right-4 bottom-2 text-5xl opacity-30">🎮</div>
        <h1 className="font-title text-2xl text-white">Ruang Game 🎮</h1>
        <p className="text-indigo-200 text-sm font-bold mt-1">
          Game seru untuk dimainkan bersama di kelas!
        </p>
      </div>

      {/* Section title */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-1 h-5 bg-purple-500 rounded-full"/>
        <h2 className="font-title text-lg text-slate-700">Pilih Game</h2>
      </div>

      {/* Game cards */}
      <div className="flex flex-col gap-4">
        {GAMES.map(g => (
          <button key={g.id}
            onClick={() => { sfxClick(); setActive(g.id); }}
            className={`text-left bg-gradient-to-br ${g.color} ${g.border}
                        rounded-3xl p-5 border-b-4 shadow-lg
                        hover:-translate-y-1 hover:shadow-xl
                        active:translate-y-0 active:border-b-2
                        transition-all duration-200 group relative overflow-hidden`}>

            {/* Shimmer */}
            <span className="absolute top-0 left-[-80%] w-[55%] h-full
                             bg-gradient-to-r from-transparent via-white/20 to-transparent
                             -skew-x-12 group-hover:animate-shimmer pointer-events-none"/>

            <div className="flex items-start gap-4">
              <div className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform shrink-0">
                {g.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-title text-xl text-white">{g.title}</h3>
                <p className="text-white/80 text-xs font-bold mt-1 leading-relaxed">{g.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    👥 {g.players}
                  </span>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    ⚡ {g.difficulty}
                  </span>
                  {g.tags.map(t => (
                    <span key={t} className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-white/60 text-3xl shrink-0 group-hover:translate-x-1 transition-transform">›</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
        <p className="font-bold text-amber-700 text-sm flex items-center gap-2">
          💡 Tips untuk Guru
        </p>
        <p className="text-amber-600 text-xs font-bold mt-1 leading-relaxed">
          Game ini cocok untuk layar proyektor/smartboard di kelas.
          Buka dalam mode fullscreen (tombol ⛶) untuk pengalaman terbaik!
        </p>
      </div>
    </div>
  );
}
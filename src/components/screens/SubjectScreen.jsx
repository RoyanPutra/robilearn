import { useGameStore }  from '../../store/gameStore';
import { useAuthStore }  from '../../store/authStore';
import { SUBJECTS }      from '../../data/subjects';
import { CURRICULUM }    from '../../data/curriculum';
import { sfxClick }      from '../../lib/audio';

const SUBJECT_META = {
  math:        { bg:'bg-orange-400', light:'bg-orange-50', text:'text-orange-500', border:'border-orange-200', icon:'🔢', desc:'Hitung & berhitung seru' },
  pengetahuan: { bg:'bg-blue-400',   light:'bg-blue-50',   text:'text-blue-500',   border:'border-blue-200',   icon:'🌍', desc:'Kenali dunia sekitarmu' },
  bahasa:      { bg:'bg-green-400',  light:'bg-green-50',  text:'text-green-500',  border:'border-green-200',  icon:'📚', desc:'Baca, tulis & bercerita' },
  seni:        { bg:'bg-purple-400', light:'bg-purple-50', text:'text-purple-500', border:'border-purple-200', icon:'🎨', desc:'Warna, bentuk & kreasi' },
  ipa:         { bg:'bg-teal-500',   light:'bg-teal-50',   text:'text-teal-600',   border:'border-teal-200',   icon:'🔬', desc:'Sains & alam sekitar' },
};

export default function SubjectScreen() {
  const { pickSubject, completedLevels } = useGameStore();
  const { profile, user }                = useAuthStore();
  const name = profile?.username || user?.email?.split('@')[0] || 'Pejuang';

  function getProgress(sid) {
    const total = ['dasar','menengah','tinggi'].reduce((acc,dk) => {
      return acc + (CURRICULUM[`${sid}_${dk}`]||[]).reduce((a,st)=>a+st.levels.length,0);
    }, 0);
    const done = completedLevels.filter(id => id.startsWith(sid)).length;
    return { done, total, pct: total > 0 ? Math.round(done/total*100) : 0 };
  }

  const totalDone  = completedLevels.length;
  const totalLevel = SUBJECTS.reduce((acc,s) => acc + getProgress(s.id).total, 0);
  const overallPct = totalLevel > 0 ? Math.round(totalDone/totalLevel*100) : 0;

  return (
    <div className="flex flex-col gap-4 pb-10">

      {/* ── Greeting card ── */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-4 sm:p-5
                      shadow-lg shadow-blue-200 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full"/>
        <div className="absolute -right-2 bottom-0 w-20 h-20 bg-white/10 rounded-full"/>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">
              Selamat Datang 👋
            </p>
            <h1 className="font-title text-xl sm:text-2xl text-white mt-0.5">{name}!</h1>
            <p className="text-blue-100 text-xs font-bold mt-1">
              Ayo lanjutkan perjalanan belajarmu
            </p>
          </div>
          <div className="bg-white/20 rounded-2xl px-3 py-2 text-center shrink-0 ml-3">
            <p className="font-title text-2xl sm:text-3xl text-white">{overallPct}%</p>
            <p className="text-blue-200 text-[10px] font-bold">Selesai</p>
          </div>
        </div>
        <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-700"
               style={{width:`${overallPct}%`}}/>
        </div>
        <p className="text-blue-200 text-[10px] font-bold mt-1">
          {totalDone} dari {totalLevel} level selesai
        </p>
      </div>

      {/* ── Section title ── */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-1 h-5 bg-blue-500 rounded-full"/>
        <h2 className="font-title text-base sm:text-lg text-slate-700">
          Pilih Mata Pelajaran
        </h2>
      </div>

      {/* ── Subject grid — 2 kolom ── */}
      <div className="grid grid-cols-2 gap-3">
        {SUBJECTS.map(s => {
          const m = SUBJECT_META[s.id] || {};
          const { done, total, pct } = getProgress(s.id);
          const isNew = s.id === 'ipa';

          return (
            <button key={s.id}
              onClick={() => { sfxClick(); pickSubject(s.id); }}
              className={`group bg-white border-2 ${m.border} rounded-2xl p-3 sm:p-4
                         text-left shadow-sm hover:shadow-md hover:-translate-y-1
                         active:translate-y-0 active:scale-[0.98] transition-all duration-200
                         relative overflow-hidden`}>

              {/* NEW badge for IPA */}
              {isNew && (
                <span className="absolute top-2 right-2 bg-teal-500 text-white
                                 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  BARU!
                </span>
              )}

              {/* Icon */}
              <div className={`${m.bg} w-10 h-10 rounded-xl flex items-center justify-center
                               text-xl shadow-sm group-hover:scale-110 transition-transform mb-2.5`}>
                {m.icon}
              </div>

              {/* Title */}
              <h3 className="font-title text-xs sm:text-sm text-slate-700 leading-tight">
                {s.name}
              </h3>
              <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold mt-0.5 leading-relaxed">
                {m.desc}
              </p>

              {/* Progress */}
              <div className="mt-2">
                <div className={`w-full ${m.light} rounded-full h-1.5 sm:h-2
                                 overflow-hidden border ${m.border}`}>
                  <div className={`h-full ${m.bg} rounded-full transition-all duration-700`}
                       style={{width:`${pct}%`}}/>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] font-bold text-slate-400">
                    {done > 0 ? `${done}/${total}` : 'Mulai'}
                  </span>
                  <span className={`text-[9px] font-bold ${m.text}`}>{pct}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Game shortcut ── */}
      <button
        onClick={() => { sfxClick(); useGameStore.getState().goTo('gameHub'); }}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-3 sm:p-4
                   text-left border-b-4 border-indigo-700 shadow-md
                   hover:-translate-y-0.5 active:translate-y-0 active:border-b-2
                   active:scale-[0.99] transition-all flex items-center gap-3 min-h-[64px]">
        <div className="text-3xl shrink-0">🎮</div>
        <div className="flex-1 min-w-0">
          <p className="font-title text-sm sm:text-base text-white">Ruang Game</p>
          <p className="text-purple-200 text-xs font-bold truncate">
            Tarik Tambang & Ular Tangga
          </p>
        </div>
        <span className="text-white/60 text-xl shrink-0">›</span>
      </button>
    </div>
  );
}
import { useGameStore }          from '../../store/gameStore';
import { SUBJECTS, DIFFS }       from '../../data/subjects';
import { getStages, isDiffUnlocked } from '../../data/curriculum';
import { sfxClick }              from '../../lib/audio';

export default function DifficultyScreen() {
  const { subjectId, completedLevels, pickDiff, goBack } = useGameStore();
  const subject = SUBJECTS.find(s=>s.id===subjectId);

  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={()=>{ sfxClick(); goBack(); }}
                className="w-11 h-11 rounded-xl bg-white border-2 border-slate-200
                           flex items-center justify-center text-lg font-bold text-slate-500
                           hover:bg-blue-50 hover:border-blue-300 active:scale-95 transition-all">
          ←
        </button>
        <div className="flex items-center gap-2">
          <span className="text-3xl">{subject?.icon}</span>
          <h1 className="font-title text-lg sm:text-xl text-slate-700">{subject?.name}</h1>
        </div>
      </div>

      <p className="text-slate-500 font-bold text-sm px-1">Pilih tingkat kesulitan</p>

      <div className="flex flex-col gap-3">
        {['dasar','menengah','tinggi'].map((dk,idx)=>{
          const d      = DIFFS[dk];
          const stages = getStages(subjectId, dk);
          const locked = !isDiffUnlocked(subjectId, dk, completedLevels);
          const total  = stages.reduce((a,st)=>a+st.levels.length,0);
          const done   = stages.reduce((a,st)=>a+st.levels.filter(l=>completedLevels.includes(l.id)).length,0);
          const pct    = total>0?Math.round(done/total*100):0;
          const prev   = ['dasar','menengah','tinggi'][idx-1];

          return (
            <button key={dk}
              onClick={()=>{ if(!locked){ sfxClick(); pickDiff(dk); } }}
              disabled={locked}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-left flex items-center gap-4
                         border-2 border-b-4 transition-all duration-200
                         ${locked
                           ? 'bg-slate-50 border-slate-200 border-b-slate-300 opacity-60 cursor-not-allowed'
                           : `bg-gradient-to-r ${d.color} ${d.border}
                              hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:border-b-2 cursor-pointer`}`}>

              <span className="text-3xl sm:text-4xl shrink-0">{d.icon}</span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className={`font-title text-base sm:text-lg
                                  ${locked?'text-slate-500':'text-white'}`}>
                    {d.name}
                  </h2>
                  {locked && (
                    <span className="text-[10px] bg-slate-200 text-slate-500
                                     px-2 py-0.5 rounded-full font-bold">
                      🔒 Selesaikan {DIFFS[prev]?.name} dulu
                    </span>
                  )}
                </div>
                <p className={`text-xs font-bold mt-0.5
                               ${locked?'text-slate-400':'text-white/80'}`}>
                  {locked ? '' : d.desc}
                </p>
                {!locked && (
                  <div className="mt-2">
                    <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-white/80 rounded-full transition-all"
                           style={{width:`${pct}%`}}/>
                    </div>
                    <p className="text-white/70 text-[10px] font-bold mt-1">
                      {done}/{total} selesai
                    </p>
                  </div>
                )}
              </div>

              {!locked && <span className="text-white/60 text-2xl shrink-0">›</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
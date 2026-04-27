import { useGameStore }     from '../../store/gameStore';
import { SUBJECTS, DIFFS }  from '../../data/subjects';
import { getStages }        from '../../data/curriculum';
import { sfxClick }         from '../../lib/audio';

const DECO_L = ['🌳','🌸','🌻','🌴','🌵','🎋'];
const DECO_R = ['⭐','🌟','✨','💫','🏡','🌈'];

export default function StageMapScreen() {
  const { subjectId, diffKey, completedLevels, pickStage, goBack } = useGameStore();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const diff    = DIFFS[diffKey];
  const stages  = getStages(subjectId, diffKey);

  function isUnlocked(idx) {
    if (idx === 0) return true;
    return stages[idx-1].levels.some(l => completedLevels.includes(l.id));
  }
  function pct(stage) {
    const done = stage.levels.filter(l => completedLevels.includes(l.id)).length;
    return { done, total: stage.levels.length };
  }

  return (
    <div className="flex flex-col gap-4 pb-10">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => { sfxClick(); goBack(); }}
                className="w-11 h-11 rounded-xl bg-white border-2 border-slate-200
                           flex items-center justify-center text-lg font-bold text-slate-500
                           hover:bg-blue-50 hover:border-blue-300 active:scale-95 transition-all shrink-0">
          ←
        </button>
        <div>
          <h1 className="font-title text-base sm:text-lg text-slate-700">
            {subject?.name} — {diff?.name}
          </h1>
          <p className="text-xs text-slate-400 font-bold">Pilih stage untuk dimulai</p>
        </div>
      </div>

      {/* Stage map */}
      <div className="flex flex-col gap-3">
        {stages.map((stage, si) => {
          const locked  = !isUnlocked(si);
          const { done, total } = pct(stage);
          const complete = done === total;
          const isRight  = si % 2 === 1;

          return (
            <div key={stage.id}
                 className={`flex items-center gap-2 sm:gap-3 ${isRight ? 'flex-row-reverse' : ''}`}>

              {/* Deco */}
              <span className="text-xl sm:text-2xl shrink-0 w-7 sm:w-8 text-center animate-twinkle"
                    style={{ animationDelay:`${si*0.3}s` }}>
                {isRight ? DECO_R[si % DECO_R.length] : DECO_L[si % DECO_L.length]}
              </span>

              {/* Stage node */}
              <button
                onClick={() => { if (!locked) { sfxClick(); pickStage(stage.id); } }}
                disabled={locked}
                className={`flex-1 bg-white rounded-2xl p-3 sm:p-4 flex items-center gap-3
                           border-2 border-b-4 text-left transition-all duration-200
                           ${stage.isExam
                             ? locked
                               ? 'border-slate-200 border-b-slate-300 opacity-50 cursor-not-allowed'
                               : 'border-amber-300 border-b-amber-500 bg-amber-50 hover:-translate-y-1 hover:shadow-md cursor-pointer'
                             : complete
                               ? 'border-green-300 border-b-green-500 bg-green-50 hover:-translate-y-1 hover:shadow-md cursor-pointer'
                               : locked
                                 ? 'border-slate-200 border-b-slate-300 opacity-50 cursor-not-allowed'
                                 : 'border-blue-300 border-b-blue-500 bg-blue-50 hover:-translate-y-1 hover:shadow-md cursor-pointer animate-node-glow'}`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl
                                flex items-center justify-center text-xl sm:text-2xl shrink-0
                                ${stage.isExam ? 'bg-amber-200'
                                : complete     ? 'bg-green-200'
                                : locked       ? 'bg-slate-100'
                                : 'bg-blue-100'}`}>
                  {locked ? '🔒' : stage.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-title text-sm sm:text-base text-slate-700 truncate">
                    {stage.name}
                  </p>
                  <p className="text-xs text-slate-400 font-bold truncate">{stage.desc}</p>
                  {!locked && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full rounded-full transition-all
                                        ${stage.isExam ? 'bg-amber-400'
                                        : complete     ? 'bg-green-500'
                                        : 'bg-blue-500'}`}
                             style={{ width:`${Math.round(done/total*100)}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">
                        {done}/{total}
                      </span>
                    </div>
                  )}
                </div>

                {complete && <span className="text-green-500 text-lg shrink-0">✓</span>}
                {!locked && !complete && <span className="text-slate-300 text-lg shrink-0">›</span>}
              </button>

              <span className="text-xl sm:text-2xl shrink-0 w-7 sm:w-8 text-center">
                {isRight ? DECO_L[si % DECO_L.length] : DECO_R[si % DECO_R.length]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
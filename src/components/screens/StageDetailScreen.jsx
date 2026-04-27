import { useGameStore }      from '../../store/gameStore';
import { getStages }         from '../../data/curriculum';
import { generateLesson }    from '../../data/questions';
import { sfxClick }          from '../../lib/audio';

const DIFF_STYLE = {
  easy: { bg:'bg-green-500',  border:'border-green-700',  light:'bg-green-50',  text:'text-green-700'  },
  mid:  { bg:'bg-amber-500',  border:'border-amber-700',  light:'bg-amber-50',  text:'text-amber-700'  },
  hard: { bg:'bg-red-500',    border:'border-red-700',    light:'bg-red-50',    text:'text-red-700'    },
  exam: { bg:'bg-purple-500', border:'border-purple-700', light:'bg-purple-50', text:'text-purple-700' },
};

export default function StageDetailScreen() {
  const { subjectId, diffKey, stageId, completedLevels, levelStars, startLesson, goBack } = useGameStore();
  const stages = getStages(subjectId, diffKey);
  const stage  = stages.find(s => s.id === stageId) || stages[0];
  if (!stage) return null;

  const isUnlocked = (idx) => idx===0 || completedLevels.includes(stage.levels[idx-1].id);

  function handleStart(lv) {
    sfxClick();
    startLesson(lv, generateLesson(lv));
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
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl sm:text-3xl shrink-0">{stage.icon}</span>
          <div className="min-w-0">
            <h1 className="font-title text-base sm:text-lg text-slate-700 truncate">
              {stage.name}
            </h1>
            <p className="text-xs text-slate-400 font-bold">{stage.desc}</p>
          </div>
        </div>
      </div>

      {/* Level cards */}
      <div className="flex flex-col gap-3">
        {stage.levels.map((lv, idx) => {
          const locked   = !isUnlocked(idx);
          const done     = completedLevels.includes(lv.id);
          const stars    = levelStars[lv.id] || 0;
          const style    = DIFF_STYLE[lv.diff || 'easy'];

          return (
            <button
              key={lv.id}
              onClick={() => { if (!locked) handleStart(lv); }}
              disabled={locked}
              className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl
                         border-2 border-b-4 text-left transition-all duration-200
                         ${locked
                           ? 'bg-slate-50 border-slate-200 border-b-slate-300 opacity-50 cursor-not-allowed'
                           : `${style.light} ${style.border.replace('border-','border-')}
                              hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:border-b-2 cursor-pointer`}`}
            >
              {/* Level number badge */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl
                              flex items-center justify-center font-title text-xl shrink-0
                              ${locked ? 'bg-slate-200 text-slate-400' : `${style.bg} text-white shadow-sm`}`}>
                {locked ? '🔒' : idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-title text-sm sm:text-base truncate
                               ${locked ? 'text-slate-400' : style.text}`}>
                  {lv.name}
                </p>
                <p className="text-xs text-slate-400 font-bold mt-0.5 truncate">
                  {lv.desc}
                </p>
                {/* Stars */}
                <div className="flex gap-0.5 mt-1.5">
                  {[1,2,3].map(n => (
                    <span key={n}
                          className={`text-sm transition-all
                                      ${n <= stars ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              {done && !locked && (
                <div className={`${style.bg} w-8 h-8 rounded-full flex items-center
                                justify-center text-white text-sm shrink-0 shadow-sm`}>
                  ✓
                </div>
              )}
              {!done && !locked && (
                <span className="text-slate-300 text-xl shrink-0">›</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tips card */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mt-2">
        <p className="font-bold text-blue-600 text-sm flex items-center gap-2">
          💡 Tips
        </p>
        <p className="text-blue-500 text-xs font-bold mt-1 leading-relaxed">
          Selesaikan semua tingkat untuk buka level berikutnya.
          Jawab semua benar untuk dapat ⭐⭐⭐!
        </p>
      </div>
    </div>
  );
}
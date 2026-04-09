import { useGameStore }   from '../../store/gameStore';
import { SUBJECTS, DIFFS } from '../../data/subjects';
import { getStages }       from '../../data/curriculum';
import { generateLesson }  from '../../data/questions';
import { sfxClick }        from '../../lib/audio';

const DC = { easy:'from-ok/80 to-ok border-ok-dark', mid:'from-amber-400/80 to-amber-300 border-amber-600', hard:'from-bad/80 to-red-400 border-bad-dark', exam:'from-violet-500/80 to-violet-400 border-violet-700' };

export default function StageDetailScreen() {
  const { subjectId, diffKey, stageId, completedLevels, levelStars, startLesson, goBack } = useGameStore();
  const stages = getStages(subjectId, diffKey);
  const stage  = stages.find(s=>s.id===stageId)||stages[0];
  if(!stage) return null;
  const isUnlocked = (idx) => idx===0||completedLevels.includes(stage.levels[idx-1].id);
  return (
    <div className="flex flex-col gap-5 pb-8">
      <div className="flex items-center gap-3">
        <button onClick={()=>{sfxClick();goBack();}} className="w-10 h-10 rounded-xl bg-white border border-ink-faint flex items-center justify-center text-lg hover:bg-primary-light transition-all">←</button>
        <div className="flex items-center gap-3"><span className="text-3xl">{stage.icon}</span><div><h1 className="font-title text-lg text-ink">{stage.name}</h1><p className="text-xs text-ink-muted font-bold">{stage.desc}</p></div></div>
      </div>
      <div className="flex flex-col gap-3">
        {stage.levels.map((lv,idx)=>{
          const locked=!isUnlocked(idx), done=completedLevels.includes(lv.id), stars=levelStars[lv.id]||0, ck=lv.diff||'easy';
          return (
            <button key={lv.id} onClick={()=>{if(!locked){sfxClick();startLesson(lv,generateLesson(lv));}}} disabled={locked}
                    className={`card p-4 flex items-center gap-4 border-b-4 text-left transition-all duration-200
                                ${locked?'opacity-50 cursor-not-allowed border-ink-faint':`hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-gradient-to-r ${DC[ck]}`}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-title text-xl shrink-0 text-white ${locked?'bg-ink-faint':`bg-gradient-to-br ${DC[ck]}`}`}>{locked?'🔒':idx+1}</div>
              <div className="flex-1">
                <p className={`font-title text-base ${locked?'text-ink-muted':'text-white'}`}>{lv.name}</p>
                <p className={`text-xs font-bold mt-0.5 ${locked?'text-ink-muted':'text-white/80'}`}>{lv.desc}</p>
                <div className="flex gap-0.5 mt-1">{[1,2,3].map(n=><span key={n} className={`text-sm transition-all ${n<=stars?'opacity-100':'opacity-25 grayscale'}`}>⭐</span>)}</div>
              </div>
              {done?<span className="text-white text-xl">✓</span>:!locked&&<span className="text-white/70 text-lg">›</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

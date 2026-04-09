import { useGameStore } from '../../store/gameStore';
import { SUBJECTS, DIFFS } from '../../data/subjects';
import { getStages, isDiffUnlocked } from '../../data/curriculum';
import { sfxClick } from '../../lib/audio';

export default function DifficultyScreen() {
  const { subjectId, completedLevels, pickDiff, goBack } = useGameStore();
  const subject = SUBJECTS.find(s=>s.id===subjectId);
  return (
    <div className="flex flex-col gap-5 pb-8">
      <div className="flex items-center gap-3">
        <button onClick={()=>{sfxClick();goBack();}} className="w-10 h-10 rounded-xl bg-white border border-ink-faint flex items-center justify-center text-lg hover:bg-primary-light hover:border-primary transition-all">←</button>
        <div className="flex items-center gap-2"><span className="text-3xl">{subject?.icon}</span><h1 className="font-title text-xl text-ink">{subject?.name}</h1></div>
      </div>
      <p className="text-ink-muted font-bold text-sm">Pilih tingkat kesulitan</p>
      <div className="flex flex-col gap-4">
        {['dasar','menengah','tinggi'].map((dk,idx)=>{
          const d=DIFFS[dk], stages=getStages(subjectId,dk), locked=!isDiffUnlocked(subjectId,dk,completedLevels);
          const total=stages.reduce((a,st)=>a+st.levels.length,0);
          const done=stages.reduce((a,st)=>a+st.levels.filter(l=>completedLevels.includes(l.id)).length,0);
          const pct=total>0?Math.round(done/total*100):0;
          const prevDiff=['dasar','menengah','tinggi'][idx-1];
          return (
            <button key={dk} onClick={()=>{if(!locked){sfxClick();pickDiff(dk);}}} disabled={locked}
                    className={`card p-5 text-left flex items-center gap-4 border-b-4 transition-all duration-200
                                ${locked?'opacity-50 cursor-not-allowed border-ink-faint':`hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-gradient-to-r ${d.color} ${d.border}`}`}>
              <span className="text-4xl">{d.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className={`font-title text-lg ${locked?'text-ink-muted':'text-white'}`}>{d.name}</h2>
                  {locked&&<span className="text-xs bg-ink-faint text-ink-muted px-2 py-0.5 rounded-full font-bold">🔒 Kunci</span>}
                </div>
                <p className={`text-xs font-bold mt-0.5 ${locked?'text-ink-muted':'text-white/80'}`}>
                  {locked?`Selesaikan ${DIFFS[prevDiff]?.name} dulu`:d.desc}
                </p>
                {!locked&&<div className="mt-2"><div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden"><div className="h-full bg-white/80 rounded-full transition-all" style={{width:`${pct}%`}}/></div><p className="text-white/70 text-xs font-bold mt-1">{done}/{total} selesai</p></div>}
              </div>
              {!locked&&<span className="text-white/60 text-2xl">›</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

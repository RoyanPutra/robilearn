import { useGameStore } from '../../store/gameStore';
import { SUBJECTS, DIFFS } from '../../data/subjects';
import { getStages } from '../../data/curriculum';
import { sfxClick } from '../../lib/audio';

const DL=['🌳','🌸','🌻','🌴','🌵','🎋'];
const DR=['⭐','🌟','✨','💫','🏡','🌈'];

export default function StageMapScreen() {
  const { subjectId, diffKey, completedLevels, pickStage, goBack } = useGameStore();
  const subject=SUBJECTS.find(s=>s.id===subjectId), diff=DIFFS[diffKey];
  const stages=getStages(subjectId,diffKey);
  const isUnlocked=(idx)=>idx===0||stages[idx-1].levels.some(l=>completedLevels.includes(l.id));
  const pct=(st)=>({done:st.levels.filter(l=>completedLevels.includes(l.id)).length,total:st.levels.length});
  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-3">
        <button onClick={()=>{sfxClick();goBack();}} className="w-10 h-10 rounded-xl bg-white border border-ink-faint flex items-center justify-center text-lg hover:bg-primary-light transition-all">←</button>
        <div><h1 className="font-title text-lg text-ink">{subject?.name} — {diff?.name}</h1><p className="text-xs text-ink-muted font-bold">Pilih stage untuk dimulai</p></div>
      </div>
      <div className="relative flex flex-col gap-2 pt-2">
        {stages.map((stage,si)=>{
          const locked=!isUnlocked(si), {done,total}=pct(stage), complete=done===total, isRight=si%2===1;
          return (
            <div key={stage.id} className={`flex items-center gap-3 ${isRight?'flex-row-reverse':''}`}>
              <span className="text-2xl shrink-0 w-8 text-center animate-twinkle" style={{animationDelay:`${si*.3}s`}}>{isRight?DR[si%DR.length]:DL[si%DL.length]}</span>
              <button onClick={()=>{if(!locked){sfxClick();pickStage(stage.id);}}} disabled={locked}
                      className={`flex-1 card p-4 flex items-center gap-4 border-b-4 text-left transition-all duration-200
                                  ${stage.isExam?locked?'border-ink-faint opacity-50':'border-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50 hover:-translate-y-1 cursor-pointer'
                                    :complete?'border-ok bg-ok-light hover:-translate-y-1 cursor-pointer'
                                    :locked?'border-ink-faint opacity-50 cursor-not-allowed'
                                    :'border-primary bg-primary-light hover:-translate-y-1 cursor-pointer animate-node-glow'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${stage.isExam?'bg-amber-200':complete?'bg-ok/20':locked?'bg-ink-faint':'bg-primary/10'}`}>
                  {locked?'🔒':stage.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-title text-base text-ink">{stage.name}</p>
                  <p className="text-xs text-ink-muted font-bold">{stage.desc}</p>
                  {!locked&&<div className="flex items-center gap-2 mt-1.5"><div className="flex-1 bg-ink-faint rounded-full h-1.5 overflow-hidden"><div className={`h-full rounded-full transition-all ${stage.isExam?'bg-amber-400':complete?'bg-ok':'bg-primary'}`} style={{width:`${Math.round(done/total*100)}%`}}/></div><span className="text-xs text-ink-muted font-bold whitespace-nowrap">{done}/{total}</span></div>}
                </div>
                {complete&&<span className="text-ok text-xl">✓</span>}
                {!locked&&!complete&&<span className="text-ink-muted text-lg">›</span>}
              </button>
              <span className="text-2xl shrink-0 w-8 text-center">{isRight?DL[si%DL.length]:DR[si%DR.length]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

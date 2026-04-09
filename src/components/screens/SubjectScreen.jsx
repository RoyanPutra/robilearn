import { useGameStore }  from '../../store/gameStore';
import { useAuthStore }  from '../../store/authStore';
import { SUBJECTS }      from '../../data/subjects';
import { CURRICULUM }    from '../../data/curriculum';
import Robi              from '../ui/Robi';
import { sfxClick }      from '../../lib/audio';

export default function SubjectScreen() {
  const { pickSubject, completedLevels } = useGameStore();
  const { profile, user }                = useAuthStore();
  const name = profile?.username || user?.email?.split('@')[0] || 'Pejuang';

  function getProgress(sid) {
    const total = ['dasar','menengah','tinggi'].reduce((acc,dk) => {
      const s = CURRICULUM[`${sid}_${dk}`]||[];
      return acc + s.reduce((a,st)=>a+st.levels.length,0);
    }, 0);
    const done = completedLevels.filter(id=>id.startsWith(sid)).length;
    return { done, total };
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Greeting */}
      <div className="flex items-center gap-4 card p-5">
        <Robi emotion="happy" size={72} anim="float"/>
        <div>
          <h1 className="font-title text-2xl text-ink">Halo, {name}! 👋</h1>
          <p className="text-ink-muted font-bold text-sm mt-1">Mau belajar apa hari ini?</p>
        </div>
      </div>

      {/* Subject grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SUBJECTS.map(s => {
          const { done, total } = getProgress(s.id);
          const pct = total>0 ? Math.round(done/total*100) : 0;
          return (
            <button key={s.id} onClick={()=>{sfxClick();pickSubject(s.id);}}
                    className={`relative overflow-hidden text-left rounded-3xl p-6 bg-gradient-to-br ${s.color} border-b-4 ${s.border} shadow-lg hover:-translate-y-2 hover:shadow-2xl active:translate-y-0 active:border-b-2 transition-all duration-200 group`}>
              <span className="absolute top-0 left-[-80%] w-[55%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 group-hover:animate-shimmer pointer-events-none"/>
              <div className="flex items-start gap-4">
                <span className="text-5xl drop-shadow animate-robi-float" style={{animationDelay:`${Math.random()*2}s`}}>{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-title text-xl text-white">{s.name}</h2>
                  <p className="text-white/80 text-xs font-bold mt-1 leading-relaxed">{s.desc}</p>
                  <div className="mt-3">
                    <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-white/80 rounded-full transition-all duration-700" style={{width:`${pct}%`}}/>
                    </div>
                    <p className="text-white/70 text-xs font-bold mt-1">{done>0?`${done}/${total} level selesai`:'Belum mulai'}</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

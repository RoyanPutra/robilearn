import { useGameStore, QUEST_DEFS } from '../../store/gameStore';
import Leaderboard from '../ui/Leaderboard';

export default function RightSidebar() {
  const { questProgress, questDone, streak } = useGameStore();

  const today = new Date();
  const days  = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    return {
      label: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'][d.getDay()],
      done:  i >= 7 - streak
    };
  });

  return (
    <aside className="hidden xl:flex flex-col gap-3 w-64 shrink-0 py-4 px-3">

      {/* ── Daily Quests ── */}
      <div className="bg-white rounded-2xl border-2 border-slate-100 p-4">
        <h3 className="font-title text-base text-slate-700 mb-3 flex items-center gap-2">
          🎯 Misi Hari Ini
        </h3>
        <div className="flex flex-col gap-2.5">
          {QUEST_DEFS.map(q => {
            const prog = questProgress[q.id] ?? 0;
            const done = questDone[q.id];
            const pct  = Math.min(100, Math.round(prog / q.target * 100));
            return (
              <div key={q.id}
                   className={`p-3 rounded-xl border-2 transition-all
                               ${done ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{q.icon}</span>
                  <span className={`text-xs font-bold flex-1 truncate
                                    ${done ? 'text-green-700' : 'text-slate-600'}`}>
                    {q.label}
                  </span>
                  {done
                    ? <span className="text-green-500 font-bold text-xs">✓</span>
                    : <span className="text-[10px] text-slate-400 font-bold shrink-0">
                        {prog}/{q.target}
                      </span>}
                </div>
                {!done && (
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500"
                         style={{ width:`${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Streak Calendar ── */}
      <div className="bg-white rounded-2xl border-2 border-slate-100 p-4">
        <h3 className="font-title text-base text-slate-700 mb-3 flex items-center gap-2">
          🔥 Streak {streak} Hari
        </h3>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-slate-400 font-bold">{d.label}</span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center
                              text-xs font-bold transition-all
                              ${d.done
                                ? 'bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-400'}`}>
                {d.done ? '🔥' : '·'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Leaderboard ── */}
      <Leaderboard />

      {/* ── Tips ── */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
        <p className="text-xs font-bold text-blue-600">💡 Tips Belajar</p>
        <p className="text-xs text-blue-500 font-bold mt-1 leading-relaxed">
          Belajar 10 menit setiap hari lebih baik dari 1 jam seminggu sekali!
        </p>
      </div>
    </aside>
  );
}
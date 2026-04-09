import { useGameStore, QUEST_DEFS } from '../../store/gameStore';
import Leaderboard from '../ui/Leaderboard';

export default function RightSidebar() {
  const { questProgress, questDone, streak } = useGameStore();

  const today = new Date();
  const days  = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    return { label: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'][d.getDay()], done: i >= 7 - streak };
  });

  return (
    <aside className="hidden xl:flex flex-col gap-4 w-64 shrink-0 pt-4 pb-6 px-2">

      {/* Daily Quests */}
      <div className="card p-4">
        <h3 className="font-title text-base text-ink mb-3">🎯 Misi Hari Ini</h3>
        <div className="flex flex-col gap-3">
          {QUEST_DEFS.map(q => {
            const prog = questProgress[q.id] ?? 0;
            const done = questDone[q.id];
            const pct  = Math.min(100, Math.round(prog / q.target * 100));
            return (
              <div key={q.id} className={`p-3 rounded-xl border transition-all
                ${done ? 'bg-ok-light border-ok' : 'bg-surface border-ink-faint'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{q.icon}</span>
                  <span className={`text-xs font-bold flex-1 ${done ? 'text-ok-dark' : 'text-ink'}`}>
                    {q.label}
                  </span>
                  {done
                    ? <span className="text-ok font-bold text-sm">✓</span>
                    : <span className="text-xs text-ink-muted font-bold">{prog}/{q.target}</span>}
                </div>
                {!done && (
                  <div className="w-full bg-ink-faint rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500"
                         style={{ width:`${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="card p-4">
        <h3 className="font-title text-base text-ink mb-3">🔥 Streak {streak} Hari</h3>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-ink-muted font-bold">{d.label}</span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${d.done ? 'bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-sm' : 'bg-ink-faint text-ink-muted'}`}>
                {d.done ? '🔥' : '○'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <Leaderboard />

      {/* Tips */}
      <div className="card p-4 bg-primary-light border-primary-border">
        <p className="text-xs font-bold text-primary-dark">💡 Tips Belajar</p>
        <p className="text-xs text-ink-muted mt-1 leading-relaxed">
          Belajar 10 menit setiap hari lebih baik dari 1 jam seminggu sekali!
        </p>
      </div>
    </aside>
  );
}

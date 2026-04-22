import { useGameStore } from '../../store/gameStore';
import { useAuthStore } from '../../store/authStore';
import { QUEST_DEFS }   from '../../store/gameStore';
import { sfxClick }     from '../../lib/audio';

/**
 * MobileDrawer — slide-in dari kiri untuk mobile
 * Berisi: stats, nav, quest, user info
 */
export default function MobileDrawer({ open, onClose }) {
  const { xp, level, gems, streak, hearts, maxHearts,
          goTo, screen, questProgress, questDone } = useGameStore();
  const { user, profile, logout, syncProgress }    = useAuthStore();

  const name   = profile?.username || user?.email?.split('@')[0] || 'Siswa';
  const initial = name[0]?.toUpperCase() || '?';
  const xpPct  = Math.min(100, Math.round((xp % (level*100)) / (level*100) * 100));

  function nav(screen) {
    sfxClick();
    goTo(screen);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm lg:hidden"
             onClick={onClose}/>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 bottom-0 z-[999] w-72 bg-white
                       shadow-2xl transition-transform duration-300 ease-out lg:hidden
                       flex flex-col overflow-y-auto
                       ${open ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-5 pt-10 pb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/20 rounded-full flex items-center
                              justify-center font-title text-lg text-white shadow-sm">
                {initial}
              </div>
              <div>
                <p className="font-title text-base text-white">{name}</p>
                <p className="text-blue-200 text-xs font-bold truncate max-w-[120px]">
                  {user?.email}
                </p>
              </div>
            </div>
            <button onClick={onClose}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center
                               justify-center text-white font-bold hover:bg-white/30 transition-all">
              ✕
            </button>
          </div>

          {/* XP Bar */}
          <div className="bg-white/20 rounded-2xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-white/70 text-xs font-bold">Level {level}</span>
              <span className="text-white font-title text-base">{xp} XP</span>
            </div>
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-700"
                   style={{width:`${xpPct}%`}}/>
            </div>
          </div>
        </div>

        {/* Stats pills */}
        <div className="grid grid-cols-3 gap-2 px-4 py-3 border-b border-slate-100">
          <StatPill icon="🔥" value={streak} label="Streak"  bg="bg-orange-50" text="text-orange-500"/>
          <StatPill icon="❤️" value={hearts} label="Nyawa"   bg="bg-red-50"    text="text-red-500"/>
          <StatPill icon="💎" value={gems}   label="Permata" bg="bg-cyan-50"   text="text-cyan-500"/>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-1 px-3 py-3 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">
            Menu
          </p>
          <NavItem icon="🏠" label="Beranda"
                   active={screen==='subject'}
                   onClick={() => nav('subject')}/>
          <NavItem icon="🎮" label="Ruang Game"
                   active={screen==='gameHub'}
                   onClick={() => nav('gameHub')}
                   color="purple"/>
        </div>

        {/* Daily Quests */}
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            🎯 Misi Hari Ini
          </p>
          <div className="flex flex-col gap-2">
            {QUEST_DEFS.map(q => {
              const prog = questProgress[q.id] ?? 0;
              const done = questDone[q.id];
              const pct  = Math.min(100, Math.round(prog/q.target*100));
              return (
                <div key={q.id}
                     className={`p-2.5 rounded-xl border transition-all
                                 ${done?'bg-ok-light border-ok':'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{q.icon}</span>
                    <span className={`text-xs font-bold flex-1 ${done?'text-ok-dark':'text-slate-600'}`}>
                      {q.label}
                    </span>
                    {done
                      ? <span className="text-ok text-xs">✓</span>
                      : <span className="text-[10px] text-slate-400 font-bold">{prog}/{q.target}</span>}
                  </div>
                  {!done && (
                    <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all"
                           style={{width:`${pct}%`}}/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="px-4 py-3 mt-auto flex flex-col gap-2">
          <button onClick={async()=>{ sfxClick(); await syncProgress(); onClose(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                             bg-blue-50 border border-blue-200 text-blue-600
                             text-sm font-bold hover:bg-blue-100 transition-all">
            ☁️ Simpan ke Cloud
          </button>
          <button onClick={async()=>{ sfxClick(); await logout(); onClose(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                             bg-red-50 border border-red-200 text-red-500
                             text-sm font-bold hover:bg-red-100 transition-all">
            🚪 Keluar
          </button>
        </div>
      </div>
    </>
  );
}

function StatPill({ icon, value, label, bg, text }) {
  return (
    <div className={`${bg} rounded-xl p-2 text-center`}>
      <p className="text-base">{icon}</p>
      <p className={`font-title text-sm ${text}`}>{value}</p>
      <p className="text-[9px] font-bold text-slate-400">{label}</p>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, color='blue' }) {
  const activeStyle = color==='purple'
    ? 'bg-purple-500 text-white shadow-sm'
    : 'bg-blue-500 text-white shadow-sm';
  return (
    <button onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl
                        font-bold text-sm w-full transition-all
                        ${active ? activeStyle : 'text-slate-600 hover:bg-slate-100'}`}>
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
      {!active && <span className="ml-auto text-slate-300">›</span>}
    </button>
  );
}
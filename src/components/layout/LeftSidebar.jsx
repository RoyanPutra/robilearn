import { useGameStore } from '../../store/gameStore';
import { useAuthStore } from '../../store/authStore';
import UserBadge        from '../auth/UserBadge';
import { sfxClick }     from '../../lib/audio';

export default function LeftSidebar() {
  const { xp, level, gems, streak, hearts, maxHearts, goTo, screen } = useGameStore();
  const { syncProgress } = useAuthStore();
  const xpPct = Math.min(100, Math.round((xp % (level*100)) / (level*100) * 100));
  const xpNext = level * 100;
  const xpCur  = xp % xpNext;

  return (
    <aside className="hidden lg:flex flex-col gap-3 w-64 shrink-0 py-4 px-3">

      {/* ── Logo ── */}
      <button onClick={() => { sfxClick(); goTo('subject'); }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
                         hover:bg-blue-50 transition-all group">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center
                        text-xl shadow-md shadow-blue-200 group-hover:scale-110 transition-transform">
          🤖
        </div>
        <div className="text-left">
          <p className="font-title text-lg text-blue-600 leading-none">RobiLearn</p>
          <p className="text-slate-400 text-[10px] font-bold">Belajar Seru!</p>
        </div>
      </button>

      <div className="border-t border-slate-100 my-0.5"/>

      {/* ── XP + Level ── */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4
                      shadow-md shadow-blue-200">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Level</p>
            <p className="font-title text-2xl text-white">{level}</p>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
            <p className="font-title text-lg text-white">{xp}</p>
            <p className="text-blue-200 text-[10px] font-bold">XP Total</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-2.5 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-700"
               style={{width:`${xpPct}%`}}/>
        </div>
        <p className="text-blue-200 text-[10px] font-bold mt-1">
          {xpCur} / {xpNext} XP ke level {level+1}
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-2">
        {/* Streak */}
        <StatPill icon="🔥" value={streak} label="Streak" bg="bg-orange-50" border="border-orange-200" text="text-orange-500"/>
        {/* Hearts */}
        <StatPill icon="❤️" value={hearts} label="Nyawa"  bg="bg-red-50"    border="border-red-200"    text="text-red-500"/>
        {/* Gems */}
        <StatPill icon="💎" value={gems}   label="Permata" bg="bg-cyan-50"   border="border-cyan-200"  text="text-cyan-500"/>
      </div>

      {/* ── Hearts visual ── */}
      <div className="bg-white rounded-2xl border-2 border-slate-100 px-4 py-3 flex items-center gap-2">
        <p className="text-xs font-bold text-slate-400 mr-1">Nyawa</p>
        {Array.from({length: maxHearts}).map((_,i) => (
          <span key={i} className={`text-xl transition-all duration-300
                                    ${i >= hearts ? 'grayscale opacity-25 scale-90' : ''}`}>
            ❤️
          </span>
        ))}
      </div>

      <div className="border-t border-slate-100 my-0.5"/>

      {/* ── Nav ── */}
      <NavBtn icon="🏠" label="Beranda"
              active={screen==='subject'}
              onClick={() => { sfxClick(); goTo('subject'); }}/>

      {/* ── User ── */}
      <div className="mt-auto pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <UserBadge/>
          <button onClick={async()=>{sfxClick();await syncProgress();}}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-400
                             hover:text-blue-500 transition-colors px-2 py-1.5 rounded-xl
                             hover:bg-blue-50">
            ☁️ Sync
          </button>
        </div>
      </div>
    </aside>
  );
}

function StatPill({ icon, value, label, bg, border, text }) {
  return (
    <div className={`${bg} border-2 ${border} rounded-2xl p-3 text-center`}>
      <p className="text-lg">{icon}</p>
      <p className={`font-title text-base ${text}`}>{value}</p>
      <p className="text-[9px] font-bold text-slate-400">{label}</p>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm
                        w-full transition-all
                        ${active
                          ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                          : 'text-slate-500 hover:bg-slate-100'}`}>
      <span className="text-lg">{icon}</span> {label}
    </button>
  );
}
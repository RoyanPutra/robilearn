import { useGameStore } from '../../store/gameStore';
import { useAuthStore } from '../../store/authStore';
import Robi      from '../ui/Robi';
import UserBadge from '../auth/UserBadge';
import { sfxClick } from '../../lib/audio';

export default function LeftSidebar() {
  const { xp, level, gems, streak, hearts, maxHearts, goTo, screen } = useGameStore();
  const { syncProgress } = useAuthStore();
  const xpPct = Math.min(100, Math.round((xp % (level * 100)) / (level * 100) * 100));

  return (
    <aside className="hidden lg:flex flex-col gap-3 w-64 shrink-0 pt-4 pb-6 px-2">

      {/* ── Logo Banner ── */}
      <div
        onClick={() => { sfxClick(); goTo('subject'); }}
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600
                   rounded-2xl px-4 py-3 flex items-center justify-between
                   shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5
                   transition-all border-b-4 border-blue-700"
      >
        <div className="flex items-center gap-2">
          <Robi size={40} anim="float" />
          <div>
            <p className="font-title text-lg text-white leading-tight">RobiLearn</p>
            <p className="text-blue-200 text-[10px] font-bold">Belajar Seru! 🎉</p>
          </div>
        </div>
        <UserBadge light />
      </div>

      {/* ── Streak ── */}
      <StatCard
        gradient="from-orange-400 to-amber-500"
        border="border-orange-600"
        shadow="shadow-orange-100"
        icon="🔥"
        label="Streak Harian"
        value={`${streak} hari`}
        sub="berturut-turut"
      />

      {/* ── Hearts ── */}
      <div className="bg-gradient-to-r from-red-400 to-rose-500 rounded-2xl p-4
                      border-b-4 border-red-700 shadow-md shadow-red-100">
        <div className="flex items-center gap-3">
          <span className="text-2xl">❤️</span>
          <div className="flex-1">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wide">Nyawa</p>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: maxHearts }).map((_, i) => (
                <span key={i}
                      className={`text-xl transition-all ${i >= hearts ? 'grayscale opacity-30 scale-90' : ''}`}>
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── XP Bar ── */}
      <div className="bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl p-4
                      border-b-4 border-blue-700 shadow-md shadow-blue-100">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div className="flex-1">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wide">Total XP</p>
            <p className="font-title text-xl text-white">{xp}</p>
            <div className="w-full bg-black/20 rounded-full h-2 mt-1 overflow-hidden">
              <div
                className="h-full bg-white/80 rounded-full transition-all duration-500"
                style={{ width: `${xpPct}%` }}
              />
            </div>
            <p className="text-white/60 text-[10px] font-bold mt-1">
              Level {level} — {xp % (level * 100)}/{level * 100} XP
            </p>
          </div>
        </div>
      </div>

      {/* ── Gems ── */}
      <StatCard
        gradient="from-cyan-400 to-blue-500"
        border="border-blue-700"
        shadow="shadow-cyan-100"
        icon="💎"
        label="Permata"
        value={gems}
        sub="kumpulkan terus!"
      />

      {/* ── Nav ── */}
      <nav className="mt-1 flex flex-col gap-1">
        <NavBtn
          icon="🏠" label="Beranda"
          active={screen === 'subject'}
          onClick={() => { sfxClick(); goTo('subject'); }}
        />
      </nav>

      {/* ── Sync ── */}
      <button
        onClick={async () => { sfxClick(); await syncProgress(); }}
        className="mt-auto flex items-center gap-2 px-4 py-2.5 rounded-xl
                   bg-blue-50 border border-blue-200 text-blue-600
                   text-xs font-bold hover:bg-blue-100 transition-all"
      >
        ☁️ Simpan ke Cloud
      </button>
    </aside>
  );
}

/* ── Reusable stat card ── */
function StatCard({ gradient, border, shadow, icon, label, value, sub }) {
  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-4
                     border-b-4 ${border} shadow-md ${shadow}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-wide">{label}</p>
          <p className="font-title text-xl text-white">{value}</p>
          <p className="text-white/60 text-[10px] font-bold">{sub}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Nav button ── */
function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm w-full transition-all
                  ${active
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md border-b-2 border-blue-700'
                    : 'text-ink-muted hover:bg-blue-50 hover:text-primary'}`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}

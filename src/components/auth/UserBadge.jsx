import { useAuthStore } from '../../store/authStore';
import { sfxClick }     from '../../lib/audio';
import { useState }     from 'react';

export default function UserBadge({ light = false }) {
  const { user, profile, logout } = useAuthStore();
  const [open, setOpen]           = useState(false);

  if (!user) return null;

  const name    = profile?.username || user.email?.split('@')[0] || 'Siswa';
  const initial = name[0]?.toUpperCase() || '?';

  return (
    <div className="relative">
      <button
        onClick={() => { sfxClick(); setOpen(o => !o); }}
        className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5
                    hover:scale-105 transition-all
                    ${light
                      ? 'bg-white/20 hover:bg-white/30 text-white'
                      : 'bg-white border border-ink-faint hover:bg-primary-light hover:border-primary text-ink shadow-sm'}`}
      >
        {/* Avatar circle */}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center
                         font-title text-xs shrink-0
                         ${light ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
          {initial}
        </div>
        <span className={`text-xs font-bold max-w-[70px] truncate
                          ${light ? 'text-white' : 'text-ink'}`}>
          {name}
        </span>
        <span className={`text-[10px] ${light ? 'text-white/60' : 'text-ink-muted'}`}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-10 right-0 z-50 bg-white border border-ink-faint
                        rounded-2xl shadow-xl p-4 min-w-[200px] animate-pop-in">
          <p className="text-xs text-ink-muted font-bold mb-1">Login sebagai</p>
          <p className="text-sm font-bold text-ink mb-3 truncate">{user.email}</p>
          <button
            onClick={async () => { sfxClick(); await logout(); setOpen(false); }}
            className="w-full bg-bad-light text-bad-dark border border-bad
                       rounded-xl py-2 text-sm font-bold
                       hover:bg-bad hover:text-white transition-all"
          >
            🚪 Keluar
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-full mt-2 text-ink-muted text-xs font-bold py-1"
          >
            Batal
          </button>
        </div>
      )}
    </div>
  );
}

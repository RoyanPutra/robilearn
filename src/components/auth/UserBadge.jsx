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
        className={`flex items-center gap-2 rounded-2xl px-3 py-1.5
                    border-2 transition-all hover:scale-105
                    ${light
                      ? 'bg-white/20 border-white/30 hover:bg-white/30'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm'}`}
      >
        {/* Avatar */}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center
                         font-title text-xs shrink-0 shadow-sm
                         ${light ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}>
          {initial}
        </div>
        <span className={`text-xs font-bold max-w-[64px] truncate
                          ${light ? 'text-white' : 'text-slate-700'}`}>
          {name}
        </span>
        <span className={`text-[10px] ${light ? 'text-white/50' : 'text-slate-400'}`}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}/>

          <div className="absolute top-11 right-0 z-50 bg-white border-2 border-slate-100
                          rounded-2xl shadow-xl p-4 min-w-[200px] animate-pop-in">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center
                              font-title text-base text-white shadow-sm">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-700 truncate">{name}</p>
                <p className="text-[10px] text-slate-400 font-bold truncate">{user.email}</p>
              </div>
            </div>

            <button
              onClick={async () => { sfxClick(); await logout(); setOpen(false); }}
              className="w-full bg-red-50 text-red-500 border-2 border-red-100
                         rounded-xl py-2.5 text-sm font-bold
                         hover:bg-red-500 hover:text-white hover:border-red-500
                         transition-all flex items-center justify-center gap-2"
            >
              🚪 Keluar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
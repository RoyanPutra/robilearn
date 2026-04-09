import { useEffect, useState } from 'react';
import { getLeaderboard }       from '../../lib/supabase';
import { useAuthStore }         from '../../store/authStore';

export default function Leaderboard() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, profile }     = useAuthStore();

  useEffect(() => {
    getLeaderboard(10).then(({ data }) => {
      setRows(data || []);
      setLoading(false);
    });
  }, []);

  const myName = profile?.username || user?.email?.split('@')[0] || '';

  return (
    <div className="card p-4">
      <h3 className="font-title text-base text-ink mb-3 flex items-center gap-2">
        🏆 Papan Peringkat
      </h3>

      {loading ? (
        <p className="text-xs text-ink-muted text-center py-4 font-bold">Memuat...</p>
      ) : rows.length === 0 ? (
        <p className="text-xs text-ink-muted text-center py-4 font-bold">
          Belum ada data. Jadilah yang pertama! 🚀
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {rows.map((r, i) => {
            const isMe = r.username === myName;
            const medal = ['🥇','🥈','🥉'][i] || `${i+1}.`;
            return (
              <div key={r.user_id}
                   className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                               ${isMe
                                 ? 'bg-primary-light border-2 border-primary'
                                 : 'bg-surface border border-ink-faint'}`}>
                <span className="text-lg w-6 text-center shrink-0">{medal}</span>
                <div className="w-7 h-7 rounded-full bg-primary flex items-center
                                justify-center text-white font-title text-xs shrink-0">
                  {r.username?.[0]?.toUpperCase() || '?'}
                </div>
                <span className={`flex-1 text-xs font-bold truncate
                                  ${isMe ? 'text-primary-dark' : 'text-ink'}`}>
                  {r.username || 'Anonim'} {isMe && '(kamu)'}
                </span>
                <span className="text-xs font-bold text-star-dark shrink-0">
                  ⚡{r.xp}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useAuthStore }   from './store/authStore';
import { useGameStore }   from './store/gameStore';
import AppShell           from './components/layout/AppShell';
import LoginScreen        from './components/auth/LoginScreen';
import SplashScreen       from './components/screens/SplashScreen';
import AttractMode        from './components/ui/AttractMode';
import Toast              from './components/ui/Toast';
import { startBgMusic }   from './lib/audio';

export default function App() {
  const { user, loading: authLoading, init, syncProgress } = useAuthStore();
  const { toastMsg, clearToast, initQuests }               = useGameStore();
  const [splashDone, setSplashDone]                         = useState(false);

  /* init Supabase auth on mount */
  useEffect(() => { init(); }, []);

  /* auto-sync progress every 30 seconds while playing */
  useEffect(() => {
    if (!user) return;
    const t = setInterval(() => syncProgress(), 30_000);
    return () => clearInterval(t);
  }, [user]);

  /* also sync when tab/window closes */
  useEffect(() => {
    if (!user) return;
    const handler = () => syncProgress();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [user]);

  function handleSplashDone() {
    setSplashDone(true);
    initQuests();
    startBgMusic();
  }

  /* ── Loading spinner (checking auth) ── */
  if (authLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950 to-indigo-950
                      flex flex-col items-center justify-center gap-4">
        <div className="text-6xl animate-robi-bobble">🤖</div>
        <p className="font-title text-xl text-white animate-attract-pulse">Memuat RobiLearn...</p>
      </div>
    );
  }

  /* ── Not logged in → show login ── */
  if (!user) return <LoginScreen />;

  return (
    <div className="relative min-h-screen bg-surface font-nunito">
      {/* Splash (after login) */}
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}

      {splashDone && (
        <>
          <AppShell />
          <AttractMode />
        </>
      )}

      {toastMsg && <Toast msg={toastMsg} onDone={clearToast} />}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useAuthStore }   from './store/authStore';
import { useGameStore }   from './store/gameStore';
import AppShell           from './components/layout/AppShell';
import LoginScreen        from './components/auth/LoginScreen';
import SplashScreen       from './components/screens/SplashScreen';
import AttractMode        from './components/ui/AttractMode';
import Toast              from './components/ui/Toast';
import ErrorBoundary      from './components/ui/ErrorBoundary';
import { LoadingScreen }  from './components/ui/SkeletonLoader';
import { startBgMusic }   from './lib/audio';

export default function App() {
  const { user, loading: authLoading, init, syncProgress } = useAuthStore();
  const { toastMsg, clearToast, initQuests }               = useGameStore();
  const [splashDone, setSplashDone]                         = useState(false);
  const [forceReady, setForceReady]                         = useState(false);

  /* Force ready after 2 seconds max */
  useEffect(() => {
    const t = setTimeout(() => setForceReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  /* Init Supabase auth */
  useEffect(() => { init(); }, []);

  /* Auto-sync every 30s */
  useEffect(() => {
    if (!user) return;
    const t = setInterval(() => syncProgress(), 30_000);
    return () => clearInterval(t);
  }, [user]);

  /* Sync on tab close */
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

  /* ── Loading screen ── */
  if (authLoading && !forceReady) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950 to-indigo-950
                      flex flex-col items-center justify-center gap-4">
        <LoadingScreen message="Memuat RobiLearn..." />
      </div>
    );
  }

  /* ── Not logged in ── */
  if (!user) {
    return (
      <ErrorBoundary>
        <LoginScreen />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-surface font-nunito">

        {/* Splash */}
        {!splashDone && <SplashScreen onDone={handleSplashDone} />}

        {splashDone && (
          <>
            {/* Wrap each major section in ErrorBoundary */}
            <ErrorBoundary>
              <AppShell />
            </ErrorBoundary>
            <AttractMode />
          </>
        )}

        {toastMsg && <Toast msg={toastMsg} onDone={clearToast} />}
      </div>
    </ErrorBoundary>
  );
}
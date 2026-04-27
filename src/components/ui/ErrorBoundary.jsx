import { Component } from 'react';

/**
 * ErrorBoundary — tangkap error React dan tampilkan halaman error
 * Wrap komponen apapun dengan ini untuk mencegah white screen
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('🔴 RobiLearn Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorScreen
          error={this.state.error}
          onRetry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }
    return this.props.children;
  }
}

/* ── Error Screen ── */
export function ErrorScreen({ error, onRetry, message }) {
  const errMsg = message || error?.message || 'Terjadi kesalahan yang tidak terduga';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]
                    gap-5 px-6 text-center max-w-sm mx-auto">

      {/* Robot sad */}
      <div className="text-7xl animate-bounce">🤖</div>

      {/* Title */}
      <div>
        <h2 className="font-title text-2xl text-slate-700 mb-1">
          Aduh, Robi Error! 😢
        </h2>
        <p className="text-slate-400 font-bold text-sm leading-relaxed">
          Jangan khawatir, ini bukan salahmu. Coba refresh atau kembali ke beranda.
        </p>
      </div>

      {/* Error detail (collapsible) */}
      <details className="w-full bg-red-50 border-2 border-red-200 rounded-2xl
                          text-left cursor-pointer group">
        <summary className="p-4 font-bold text-red-500 text-sm flex items-center
                            justify-between list-none">
          <span>⚠️ Detail Error</span>
          <span className="text-xs text-red-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p className="px-4 pb-4 text-xs font-mono text-red-400 break-all">
          {errMsg}
        </p>
      </details>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 w-full">
        {onRetry && (
          <button onClick={onRetry}
                  className="w-full py-4 rounded-2xl font-title text-lg text-white
                             bg-blue-500 border-b-4 border-blue-700
                             hover:-translate-y-0.5 active:translate-y-0 active:border-b-2
                             shadow-lg shadow-blue-200 transition-all flex items-center
                             justify-center gap-2">
            🔄 Coba Lagi
          </button>
        )}
        <button onClick={() => window.location.reload()}
                className="w-full py-4 rounded-2xl font-title text-lg text-slate-600
                           bg-slate-100 border-b-4 border-slate-300
                           hover:-translate-y-0.5 active:translate-y-0 active:border-b-2
                           transition-all flex items-center justify-center gap-2">
          🔃 Refresh Halaman
        </button>
        <button onClick={() => window.location.href = '/'}
                className="w-full py-3 rounded-2xl font-bold text-sm text-slate-400
                           hover:text-blue-500 transition-colors">
          🏠 Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

/* ── Network Error ── */
export function NetworkError({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]
                    gap-4 px-6 text-center">
      <div className="text-5xl">📡</div>
      <div>
        <h3 className="font-title text-xl text-slate-700 mb-1">Koneksi Bermasalah</h3>
        <p className="text-slate-400 font-bold text-sm">
          Pastikan kamu terhubung ke internet lalu coba lagi.
        </p>
      </div>
      {onRetry && (
        <button onClick={onRetry}
                className="px-8 py-3 rounded-2xl font-title text-base text-white
                           bg-blue-500 border-b-4 border-blue-700
                           hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-200">
          🔄 Coba Lagi
        </button>
      )}
    </div>
  );
}

/* ── Empty State ── */
export function EmptyState({ icon = '📭', title, message, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]
                    gap-4 px-6 text-center">
      <div className="text-5xl">{icon}</div>
      <div>
        <h3 className="font-title text-xl text-slate-700 mb-1">{title}</h3>
        {message && (
          <p className="text-slate-400 font-bold text-sm">{message}</p>
        )}
      </div>
      {action && onAction && (
        <button onClick={onAction}
                className="px-8 py-3 rounded-2xl font-title text-base text-white
                           bg-blue-500 border-b-4 border-blue-700
                           hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-200">
          {action}
        </button>
      )}
    </div>
  );
}
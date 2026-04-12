import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  const { authScreen, setAuthScreen, login, register } = useAuthStore();
  const isLogin = authScreen === 'login';
  const [form,    setForm]    = useState({ email:'', password:'', username:'' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!form.email || !form.password) return setError('Email dan password wajib diisi!');
    if (!isLogin && !form.username)    return setError('Username wajib diisi!');
    if (form.password.length < 6)      return setError('Password minimal 6 karakter!');
    setLoading(true);
    if (isLogin) {
      const { error } = await login(form.email, form.password);
      if (error) setError(translateError(error));
    } else {
      const { error } = await register(form.email, form.password, form.username);
      if (error) setError(translateError(error));
      else setSuccess('✅ Akun dibuat! Silakan login.');
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center
                    bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 px-4 overflow-y-auto py-8">

      {/* Sparkles */}
      {['top-[6%] left-[8%]','top-[12%] right-[6%]','top-[70%] left-[5%]',
        'top-[75%] right-[8%]','top-[40%] left-[3%]','top-[20%] right-[20%]'].map((p,i)=>(
        <span key={i} className={`absolute ${p} text-xl animate-twinkle pointer-events-none`}
              style={{animationDelay:`${i*0.5}s`}}>
          {['⭐','✨','🌟','💫','⭐','🌟'][i]}
        </span>
      ))}

      <div className="w-full max-w-sm animate-slide-up">

        {/* Robi + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="animate-robi-bobble mb-3">
            <svg viewBox="0 0 100 120" width="100" height="120" className="drop-shadow-2xl">
              <g style={{transformOrigin:'50% 100%',animation:'sway 2.2s ease-in-out infinite'}}>
                <line x1="50" y1="10" x2="50" y2="25" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="50" cy="7" r="7" fill="#FCD34D" stroke="white" strokeWidth="2"/>
              </g>
              <rect x="18" y="24" width="64" height="48" rx="18" fill="#3B82F6" stroke="#93C5FD" strokeWidth="3"/>
              <rect x="9" y="38" width="11" height="18" rx="5" fill="#1D4ED8"/>
              <rect x="80" y="38" width="11" height="18" rx="5" fill="#1D4ED8"/>
              <rect x="26" y="34" width="20" height="20" rx="8" fill="white"/>
              <rect x="54" y="34" width="20" height="20" rx="8" fill="white"/>
              <circle cx="36" cy="44" r="7" fill="#1E293B"/>
              <circle cx="64" cy="44" r="7" fill="#1E293B"/>
              <circle cx="38" cy="42" r="2.5" fill="white"/>
              <circle cx="66" cy="42" r="2.5" fill="white"/>
              <path d="M34 58 Q50 70 66 58" stroke="#93C5FD" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
              <rect x="24" y="74" width="52" height="36" rx="14" fill="#3B82F6" stroke="#93C5FD" strokeWidth="3"/>
              <rect x="32" y="80" width="36" height="22" rx="8" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="2"/>
              <circle cx="40" cy="91" r="4" fill="#22C55E"/>
              <circle cx="50" cy="91" r="4" fill="#FCD34D"/>
              <circle cx="60" cy="91" r="4" fill="#3B82F6"/>
              <rect x="5" y="76" width="20" height="12" rx="6" fill="#1D4ED8"/>
              <rect x="75" y="76" width="20" height="12" rx="6" fill="#1D4ED8"/>
              <rect x="30" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
              <rect x="54" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
            </svg>
          </div>
          <h1 className="font-title text-5xl text-transparent bg-clip-text
                         bg-gradient-to-r from-blue-300 via-white to-blue-200">
            RobiLearn
          </h1>
          <p className="text-blue-400/70 font-bold text-sm mt-1">
            {isLogin ? 'Selamat datang kembali! 👋' : 'Buat akun baru 🎉'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20
                        rounded-3xl p-6 shadow-2xl">

          {/* Tab switch */}
          <div className="flex gap-2 mb-5 bg-white/10 rounded-2xl p-1">
            {['login','register'].map(tab => (
              <button key={tab}
                onClick={() => { setAuthScreen(tab); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-xl font-title text-sm transition-all
                            ${authScreen === tab
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'text-blue-300 hover:text-white'}`}>
                {tab === 'login' ? '🔑 Masuk' : '✨ Daftar'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Username */}
            {!isLogin && (
              <div>
                <label className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5 block">
                  Username
                </label>
                <input name="username" type="text" value={form.username} onChange={handleChange}
                  placeholder="Nama panggilanmu"
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-3
                             text-white font-bold text-sm outline-none placeholder:text-white/30
                             focus:border-blue-400 focus:bg-white/20 transition-all"/>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5 block">
                Email
              </label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="email@kamu.com"
                className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-3
                           text-white font-bold text-sm outline-none placeholder:text-white/30
                           focus:border-blue-400 focus:bg-white/20 transition-all"/>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5 block">
                Password
              </label>
              <input name="password" type="password" value={form.password} onChange={handleChange}
                placeholder="minimal 6 karakter"
                className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-3
                           text-white font-bold text-sm outline-none placeholder:text-white/30
                           focus:border-blue-400 focus:bg-white/20 transition-all"/>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border-2 border-red-400/40 rounded-2xl px-4 py-3
                              text-red-300 text-sm font-bold animate-slide-up flex items-center gap-2">
                😟 {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-500/20 border-2 border-green-400/40 rounded-2xl px-4 py-3
                              text-green-300 text-sm font-bold animate-slide-up">
                {success}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className={`w-full py-4 rounded-2xl font-title text-lg text-white mt-1
                          border-b-4 transition-all
                          ${loading
                            ? 'bg-white/20 border-white/10 cursor-not-allowed'
                            : 'bg-blue-500 border-blue-700 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:border-b-2 shadow-lg shadow-blue-900/50'}`}>
              {loading ? '⏳ Memproses...' : isLogin ? '🚀 MASUK BERMAIN!' : '🎉 BUAT AKUN!'}
            </button>
          </form>

          <p className="text-center text-white/30 text-xs font-bold mt-4">
            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button onClick={() => { setAuthScreen(isLogin?'register':'login'); setError(''); }}
                    className="text-blue-400 underline">
              {isLogin ? 'Daftar gratis' : 'Masuk di sini'}
            </button>
          </p>
        </div>

        <p className="text-center text-blue-500/30 text-xs font-bold mt-4">
          Tanpa akun, progress tidak tersimpan permanen
        </p>
      </div>
    </div>
  );
}

function translateError(msg) {
  if (msg.includes('Invalid login'))       return 'Email atau password salah!';
  if (msg.includes('Email not confirmed')) return 'Email belum diverifikasi. Cek inbox!';
  if (msg.includes('already registered'))  return 'Email sudah terdaftar. Coba login!';
  if (msg.includes('Password should be'))  return 'Password minimal 6 karakter!';
  if (msg.includes('rate limit'))          return 'Terlalu banyak percobaan. Tunggu sebentar!';
  return msg;
}
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
      else setSuccess('✅ Akun dibuat! Cek email untuk verifikasi lalu login.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">

      {/* Top hero */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 pt-16 pb-24 px-6 text-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"/>
        <div className="absolute -bottom-16 -right-8 w-56 h-56 bg-white/10 rounded-full"/>
        <div className="absolute top-8 right-12 w-16 h-16 bg-white/10 rounded-full"/>

        {/* Robi SVG inline — lebih terlihat */}
        <div className="relative inline-block mb-4 animate-bounce">
          <svg viewBox="0 0 100 120" width="90" height="108" className="drop-shadow-xl">
            <g style={{transformOrigin:'50% 100%',animation:'sway 2s ease-in-out infinite'}}>
              <line x1="50" y1="10" x2="50" y2="25" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="50" cy="7" r="7" fill="#FCD34D" stroke="white" strokeWidth="2"/>
            </g>
            <rect x="18" y="24" width="64" height="48" rx="18" fill="white" stroke="#BFDBFE" strokeWidth="3"/>
            <rect x="9" y="38" width="11" height="18" rx="5" fill="#BFDBFE"/>
            <rect x="80" y="38" width="11" height="18" rx="5" fill="#BFDBFE"/>
            <rect x="26" y="34" width="20" height="20" rx="8" fill="#EFF6FF"/>
            <rect x="54" y="34" width="20" height="20" rx="8" fill="#EFF6FF"/>
            <circle cx="36" cy="44" r="7" fill="#1E293B"/>
            <circle cx="64" cy="44" r="7" fill="#1E293B"/>
            <circle cx="38" cy="42" r="2.5" fill="white"/>
            <circle cx="66" cy="42" r="2.5" fill="white"/>
            <path d="M34 58 Q50 70 66 58" stroke="#93C5FD" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <rect x="24" y="74" width="52" height="36" rx="14" fill="white" stroke="#BFDBFE" strokeWidth="3"/>
            <rect x="32" y="80" width="36" height="22" rx="8" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2"/>
            <circle cx="40" cy="91" r="4" fill="#22C55E"/>
            <circle cx="50" cy="91" r="4" fill="#FCD34D"/>
            <circle cx="60" cy="91" r="4" fill="#3B82F6"/>
            <rect x="5" y="76" width="20" height="12" rx="6" fill="#BFDBFE"/>
            <rect x="75" y="76" width="20" height="12" rx="6" fill="#BFDBFE"/>
            <rect x="30" y="108" width="16" height="10" rx="5" fill="#BFDBFE"/>
            <rect x="54" y="108" width="16" height="10" rx="5" fill="#BFDBFE"/>
          </svg>
        </div>

        <h1 className="font-title text-4xl text-white drop-shadow">RobiLearn</h1>
        <p className="text-blue-100 font-bold mt-1 text-sm">
          {isLogin ? 'Selamat datang kembali! 👋' : 'Mulai perjalanan belajarmu! 🚀'}
        </p>
      </div>

      {/* Card form — naik ke atas dengan margin negatif */}
      <div className="flex-1 px-5 -mt-8 max-w-md mx-auto w-full pb-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-50 p-6">

          {/* Tab switch */}
          <div className="flex gap-2 mb-6 bg-blue-50 rounded-2xl p-1">
            {['login','register'].map(tab => (
              <button key={tab}
                onClick={() => { setAuthScreen(tab); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-xl font-title text-sm transition-all
                            ${authScreen === tab
                              ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                              : 'text-blue-400 hover:text-blue-600'}`}>
                {tab === 'login' ? '🔑 Masuk' : '✨ Daftar'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-widest">Username</label>
                <input name="username" type="text" value={form.username} onChange={handleChange}
                  placeholder="Nama panggilanmu"
                  className="border-2 border-blue-100 rounded-2xl px-4 py-3 font-bold text-slate-700
                             text-sm outline-none focus:border-blue-400 focus:bg-blue-50
                             transition-all placeholder:text-slate-300"/>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-blue-400 uppercase tracking-widest">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="email@kamu.com"
                className="border-2 border-blue-100 rounded-2xl px-4 py-3 font-bold text-slate-700
                           text-sm outline-none focus:border-blue-400 focus:bg-blue-50
                           transition-all placeholder:text-slate-300"/>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-blue-400 uppercase tracking-widest">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange}
                placeholder="minimal 6 karakter"
                className="border-2 border-blue-100 rounded-2xl px-4 py-3 font-bold text-slate-700
                           text-sm outline-none focus:border-blue-400 focus:bg-blue-50
                           transition-all placeholder:text-slate-300"/>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3
                              text-red-500 text-sm font-bold animate-slide-up flex items-center gap-2">
                <span className="text-lg">😟</span> {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl px-4 py-3
                              text-green-600 text-sm font-bold animate-slide-up flex items-center gap-2">
                <span className="text-lg">🎉</span> {success}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className={`w-full py-4 rounded-2xl font-title text-lg text-white
                          border-b-4 transition-all mt-1
                          ${loading
                            ? 'bg-slate-300 border-slate-400 cursor-not-allowed'
                            : 'bg-blue-500 border-blue-700 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:border-b-2 shadow-lg shadow-blue-200'}`}>
              {loading ? '⏳ Memproses...' : isLogin ? '🚀 MASUK BERMAIN!' : '🎉 BUAT AKUN!'}
            </button>
          </form>

          {/* Switch */}
          <p className="text-center text-slate-400 text-xs font-bold mt-5">
            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button onClick={() => { setAuthScreen(isLogin ? 'register' : 'login'); setError(''); }}
                    className="text-blue-500 underline font-bold">
              {isLogin ? 'Daftar gratis' : 'Masuk di sini'}
            </button>
          </p>
        </div>

        <p className="text-center text-slate-300 text-xs font-bold mt-4">
          Tanpa akun, progress tidak tersimpan permanen
        </p>
      </div>
    </div>
  );
}

function translateError(msg) {
  if (msg.includes('Invalid login'))       return 'Email atau password salah!';
  if (msg.includes('Email not confirmed')) return 'Email belum diverifikasi. Cek inbox kamu!';
  if (msg.includes('already registered'))  return 'Email sudah terdaftar. Coba login!';
  if (msg.includes('Password should be'))  return 'Password minimal 6 karakter!';
  if (msg.includes('rate limit'))          return 'Terlalu banyak percobaan. Tunggu sebentar!';
  return msg;
}
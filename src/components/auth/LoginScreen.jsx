import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Robi from '../ui/Robi';

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

    /* basic validation */
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
      else setSuccess('✅ Akun berhasil dibuat! Cek email untuk verifikasi, lalu login.');
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950
                    px-4 overflow-y-auto py-8">

      {/* Sparkles */}
      {['top-[6%] left-[8%]','top-[12%] right-[6%]','top-[70%] left-[5%]',
        'top-[75%] right-[8%]','top-[40%] left-[3%]'].map((p,i) => (
        <span key={i} className={`absolute ${p} text-xl animate-twinkle pointer-events-none`}
              style={{ animationDelay:`${i*0.5}s` }}>
          {['⭐','✨','🌟','💫','⭐'][i]}
        </span>
      ))}

      <div className="w-full max-w-md animate-slide-up">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Robi emotion="happy" size={90} anim="float" />
          <h1 className="font-title text-4xl text-white mt-2">RobiLearn</h1>
          <p className="text-blue-300/70 text-sm font-bold mt-1">
            {isLogin ? 'Selamat datang kembali! 👋' : 'Buat akun baru 🎉'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-7">

          {/* Tab switch */}
          <div className="flex gap-2 mb-6 bg-surface rounded-2xl p-1">
            {['login','register'].map(tab => (
              <button key={tab}
                      onClick={() => { setAuthScreen(tab); setError(''); setSuccess(''); }}
                      className={`flex-1 py-2.5 rounded-xl font-title text-sm transition-all
                                  ${authScreen === tab
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-ink-muted hover:text-primary'}`}>
                {tab === 'login' ? '🔑 Masuk' : '✨ Daftar'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Username — only register */}
            {!isLogin && (
              <div>
                <label className="text-xs font-bold text-ink-muted uppercase tracking-wide mb-1 block">
                  Username
                </label>
                <input
                  name="username" type="text"
                  value={form.username} onChange={handleChange}
                  placeholder="contoh: RoyanPutra"
                  className="w-full border-2 border-ink-faint rounded-2xl px-4 py-3
                             font-bold text-ink text-sm outline-none
                             focus:border-primary focus:bg-primary-light transition-all"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase tracking-wide mb-1 block">
                Email
              </label>
              <input
                name="email" type="email"
                value={form.email} onChange={handleChange}
                placeholder="email@kamu.com"
                className="w-full border-2 border-ink-faint rounded-2xl px-4 py-3
                           font-bold text-ink text-sm outline-none
                           focus:border-primary focus:bg-primary-light transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase tracking-wide mb-1 block">
                Password
              </label>
              <input
                name="password" type="password"
                value={form.password} onChange={handleChange}
                placeholder="minimal 6 karakter"
                className="w-full border-2 border-ink-faint rounded-2xl px-4 py-3
                           font-bold text-ink text-sm outline-none
                           focus:border-primary focus:bg-primary-light transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-bad-light border-2 border-bad rounded-2xl px-4 py-3
                              text-bad-dark text-sm font-bold animate-slide-up">
                ❌ {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-ok-light border-2 border-ok rounded-2xl px-4 py-3
                              text-ok-dark text-sm font-bold animate-slide-up">
                {success}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
                    className={`w-full py-4 rounded-2xl font-title text-lg text-white
                                border-b-4 transition-all mt-2
                                ${loading
                                  ? 'bg-ink-faint border-ink-muted cursor-not-allowed'
                                  : 'bg-primary border-primary-dark hover:-translate-y-1 active:translate-y-0 active:border-b-2'}`}>
              {loading
                ? '⏳ Memproses...'
                : isLogin ? '🚀 MASUK BERMAIN!' : '🎉 BUAT AKUN!'}
            </button>
          </form>

          {/* Switch hint */}
          <p className="text-center text-ink-muted text-xs font-bold mt-4">
            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button onClick={() => { setAuthScreen(isLogin ? 'register' : 'login'); setError(''); }}
                    className="text-primary underline">
              {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </p>
        </div>

        {/* Skip offline */}
        <p className="text-center text-blue-400/40 text-xs font-bold mt-4">
          Tanpa akun, progress tidak tersimpan permanen
        </p>
      </div>
    </div>
  );
}

/* translate common Supabase error messages to Indonesian */
function translateError(msg) {
  if (msg.includes('Invalid login'))         return 'Email atau password salah!';
  if (msg.includes('Email not confirmed'))   return 'Email belum diverifikasi. Cek inbox kamu!';
  if (msg.includes('already registered'))    return 'Email sudah terdaftar. Coba login!';
  if (msg.includes('Password should be'))    return 'Password minimal 6 karakter!';
  if (msg.includes('Unable to validate'))    return 'Email tidak valid!';
  if (msg.includes('rate limit'))            return 'Terlalu banyak percobaan. Tunggu sebentar!';
  return msg;
}

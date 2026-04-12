import { useState, useRef, useEffect } from 'react';
import { sfxClick, sfxCorrect, sfxWrong } from '../../lib/audio';

/**
 * TypeAnswer — ketik jawaban sendiri
 * props: answer (string), hint, emoji, onCorrect, onWrong
 */
export default function TypeAnswer({ answer, hint, emoji, onCorrect, onWrong }) {
  const [typed,  setTyped]  = useState('');
  const [status, setStatus] = useState('idle'); // idle | correct | wrong
  const [shake,  setShake]  = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTyped(''); setStatus('idle');
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [answer]);

  function normalize(str) {
    return str.trim().toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, ' ');
  }

  function check() {
    if (!typed.trim() || status !== 'idle') return;
    const ok = normalize(typed) === normalize(String(answer));
    if (ok) {
      setStatus('correct'); sfxCorrect();
      setTimeout(() => onCorrect?.(), 900);
    } else {
      setStatus('wrong'); sfxWrong();
      setShake(true);
      setTimeout(() => { setShake(false); }, 500);
      setTimeout(() => {
        setStatus('idle'); setTyped('');
        onWrong?.();
      }, 1200);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter') check();
  }

  const isCorrect = status === 'correct';
  const isWrong   = status === 'wrong';

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Emoji */}
      <div className={`text-7xl transition-all duration-300
                       ${isCorrect ? 'scale-125 drop-shadow-lg' : ''}`}>
        {emoji}
      </div>

      {/* Hint */}
      {hint && (
        <div className="flex gap-1.5 items-center bg-amber-50 border-2 border-amber-200
                        rounded-2xl px-4 py-2">
          <span className="text-sm">💡</span>
          <span className="text-xs font-bold text-amber-600">{hint}</span>
        </div>
      )}

      {/* Input */}
      <div className="w-full max-w-xs">
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={e => { if (status === 'idle') setTyped(e.target.value); }}
          onKeyDown={handleKey}
          placeholder="Ketik jawabanmu..."
          disabled={status !== 'idle'}
          className={`w-full text-center font-title text-xl px-5 py-4 rounded-2xl
                       border-2 border-b-4 outline-none transition-all duration-200
                       ${isCorrect
                         ? 'bg-green-50 border-green-400 border-b-green-600 text-green-700'
                         : isWrong
                         ? `bg-red-50 border-red-400 border-b-red-600 text-red-600 ${shake ? 'animate-shake' : ''}`
                         : 'bg-white border-slate-300 border-b-slate-500 text-slate-700 focus:border-blue-400 focus:border-b-blue-600'}`}
        />
      </div>

      {/* Feedback */}
      {isCorrect && (
        <p className="font-title text-lg text-green-600 animate-pop-in">✅ Tepat sekali!</p>
      )}
      {isWrong && (
        <p className="font-title text-lg text-red-500 animate-shake">
          ❌ Jawaban: <span className="text-green-600">{answer}</span>
        </p>
      )}

      {/* Submit button */}
      {status === 'idle' && (
        <button
          onClick={check}
          disabled={!typed.trim()}
          className={`px-10 py-3 rounded-2xl font-title text-lg text-white
                       border-b-4 transition-all
                       ${typed.trim()
                         ? 'bg-blue-500 border-blue-700 hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 shadow-lg shadow-blue-200'
                         : 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'}`}
        >
          ✓ Kirim
        </button>
      )}
    </div>
  );
}
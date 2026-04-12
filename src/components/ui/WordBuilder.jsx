import { useState, useEffect } from 'react';
import { sfxClick, sfxCorrect, sfxWrong } from '../../lib/audio';

/**
 * WordBuilder — tap huruf untuk susun kata
 * props: word (string), emoji, onCorrect, onWrong
 */
export default function WordBuilder({ word, emoji, onCorrect, onWrong }) {
  const letters = word.toUpperCase().split('');

  // Acak huruf (pastikan tidak sama dengan jawaban asli)
  const [pool, setPool]     = useState(() => scramble(letters));
  const [answer, setAnswer] = useState([]);  // {char, poolIdx}
  const [status, setStatus] = useState('idle'); // idle | correct | wrong

  useEffect(() => {
    setPool(scramble(letters));
    setAnswer([]);
    setStatus('idle');
  }, [word]);

  function scramble(arr) {
    let shuffled;
    do { shuffled = [...arr].sort(() => Math.random() - .5); }
    while (shuffled.join('') === arr.join('') && arr.length > 1);
    return shuffled.map((char, i) => ({ char, id: i, used: false }));
  }

  function pickFromPool(item) {
    if (item.used || status !== 'idle') return;
    sfxClick();
    setPool(p => p.map(x => x.id === item.id ? { ...x, used: true } : x));
    setAnswer(a => [...a, { char: item.char, poolId: item.id }]);
  }

  function removeFromAnswer(idx) {
    if (status !== 'idle') return;
    sfxClick();
    const removed = answer[idx];
    setPool(p => p.map(x => x.id === removed.poolId ? { ...x, used: false } : x));
    setAnswer(a => a.filter((_, i) => i !== idx));
  }

  function checkAnswer() {
    const typed = answer.map(x => x.char).join('');
    if (typed === word.toUpperCase()) {
      setStatus('correct');
      sfxCorrect();
      setTimeout(() => onCorrect?.(), 800);
    } else {
      setStatus('wrong');
      sfxWrong();
      setTimeout(() => {
        setStatus('idle');
        onWrong?.();
        // Reset
        setPool(scramble(letters));
        setAnswer([]);
      }, 900);
    }
  }

  function clearAll() {
    setPool(scramble(letters));
    setAnswer([]);
  }

  const isFull     = answer.length === letters.length;
  const isCorrect  = status === 'correct';
  const isWrong    = status === 'wrong';

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Emoji hint */}
      <div className={`text-7xl transition-all duration-300
                       ${isCorrect ? 'scale-125 drop-shadow-lg' : isWrong ? 'shake' : 'animate-pop-in'}`}>
        {emoji}
      </div>

      {/* Answer slots */}
      <div className="flex gap-2 flex-wrap justify-center min-h-[56px]">
        {letters.map((_, i) => {
          const filled = answer[i];
          return (
            <button
              key={i}
              onClick={() => filled && removeFromAnswer(i)}
              className={`w-11 h-11 rounded-xl border-2 border-b-4 font-title text-lg
                          flex items-center justify-center transition-all duration-200
                          ${filled
                            ? isCorrect
                              ? 'bg-green-100 border-green-400 border-b-green-600 text-green-700 scale-105'
                              : isWrong
                              ? 'bg-red-100 border-red-400 border-b-red-600 text-red-600 animate-shake'
                              : 'bg-blue-100 border-blue-400 border-b-blue-600 text-blue-700 hover:scale-95 cursor-pointer'
                            : 'bg-slate-100 border-slate-300 border-b-slate-400 border-dashed'}`}
            >
              {filled?.char || ''}
            </button>
          );
        })}
      </div>

      {/* Status message */}
      {isCorrect && (
        <p className="font-title text-lg text-green-600 animate-pop-in">✅ Betul! Luar biasa!</p>
      )}
      {isWrong && (
        <p className="font-title text-lg text-red-500 animate-shake">❌ Belum tepat, coba lagi!</p>
      )}

      {/* Letter pool */}
      <div className="flex gap-2 flex-wrap justify-center">
        {pool.map(item => (
          <button
            key={item.id}
            onClick={() => pickFromPool(item)}
            disabled={item.used || status !== 'idle'}
            className={`w-11 h-11 rounded-xl border-2 border-b-4 font-title text-lg
                        flex items-center justify-center transition-all duration-150
                        ${item.used
                          ? 'bg-slate-50 border-slate-100 border-b-slate-200 text-transparent cursor-not-allowed'
                          : 'bg-white border-slate-300 border-b-slate-500 text-slate-700 hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-50 active:translate-y-0 cursor-pointer shadow-sm'}`}
          >
            {item.used ? '' : item.char}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {answer.length > 0 && status === 'idle' && (
          <button onClick={clearAll}
                  className="px-4 py-2 rounded-xl bg-slate-100 border-2 border-slate-200
                             text-slate-500 text-sm font-bold hover:bg-slate-200 transition-all">
            🔄 Reset
          </button>
        )}
        {isFull && status === 'idle' && (
          <button onClick={checkAnswer}
                  className="px-8 py-2.5 rounded-xl bg-blue-500 border-b-4 border-blue-700
                             text-white font-title text-base
                             hover:-translate-y-0.5 active:translate-y-0 active:border-b-2
                             shadow-lg shadow-blue-200 transition-all">
            ✓ Cek Jawaban
          </button>
        )}
      </div>
    </div>
  );
}
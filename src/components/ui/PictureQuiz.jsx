import { useState } from 'react';
import { sfxClick, sfxCorrect, sfxWrong } from '../../lib/audio';

/**
 * PictureQuiz — grid gambar emoji, klik yang benar
 * props: question, answer, options [{emoji, label}], onCorrect, onWrong
 */
export default function PictureQuiz({ question, answer, options, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null);
  const [status,   setStatus]   = useState('idle');

  function pick(opt) {
    if (status !== 'idle') return;
    sfxClick();
    setSelected(opt.label);
    const ok = opt.label === answer;
    if (ok) {
      setStatus('correct'); sfxCorrect();
      setTimeout(() => onCorrect?.(), 900);
    } else {
      setStatus('wrong'); sfxWrong();
      setTimeout(() => { setStatus('idle'); setSelected(null); onWrong?.(); }, 1000);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Question */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl px-5 py-3 text-center">
        <p className="font-title text-xl text-blue-700">{question}</p>
      </div>

      {/* Picture grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {options.map(opt => {
          const isSelected = selected === opt.label;
          const isAnswer   = opt.label === answer;
          let cls = 'bg-white border-slate-200 border-b-slate-400 hover:border-blue-300 hover:bg-blue-50 hover:-translate-y-1 cursor-pointer';
          if (status !== 'idle') {
            if (isAnswer)           cls = 'bg-green-50 border-green-400 border-b-green-600 scale-105';
            else if (isSelected)    cls = 'bg-red-50 border-red-400 border-b-red-600 animate-shake';
            else                    cls = 'bg-slate-50 border-slate-100 opacity-40';
          }
          return (
            <button key={opt.label} onClick={() => pick(opt)}
                    disabled={status !== 'idle'}
                    className={`flex flex-col items-center gap-2 p-5 rounded-2xl
                                border-2 border-b-4 transition-all duration-200 ${cls}`}>
              <span className="text-5xl leading-none">{opt.emoji}</span>
              <span className={`text-xs font-bold
                                ${status !== 'idle' && isAnswer ? 'text-green-700'
                                : status !== 'idle' && isSelected ? 'text-red-600'
                                : 'text-slate-600'}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {status === 'correct' && (
        <p className="font-title text-lg text-green-600 animate-pop-in">🎉 Benar! Kamu hebat!</p>
      )}
      {status === 'wrong' && (
        <p className="font-title text-lg text-red-500">❌ Coba lagi!</p>
      )}
    </div>
  );
}
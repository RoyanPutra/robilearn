import { useEffect, useState, useRef } from 'react';

/**
 * QuestionTimer — countdown bar
 * props: seconds (total), onTimeout (callback), paused (bool)
 */
export default function QuestionTimer({ seconds = 15, onTimeout, paused = false, key: _k }) {
  const [left,   setLeft]   = useState(seconds);
  const [urgent, setUrgent] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setLeft(seconds);
    setUrgent(false);
  }, [seconds]);

  useEffect(() => {
    if (paused) { clearInterval(timer.current); return; }
    timer.current = setInterval(() => {
      setLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer.current);
          onTimeout?.();
          return 0;
        }
        if (prev <= 6) setUrgent(true);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer.current);
  }, [paused]);

  const pct = Math.round((left / seconds) * 100);

  return (
    <div className="flex items-center gap-3">
      {/* Countdown number */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-title text-lg
                       border-2 transition-all duration-300 shrink-0
                       ${urgent
                         ? 'bg-red-50 border-red-400 text-red-500 animate-pulse'
                         : 'bg-blue-50 border-blue-300 text-blue-600'}`}>
        {left}
      </div>

      {/* Progress bar */}
      <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000
                      ${pct > 50 ? 'bg-blue-400'
                      : pct > 25 ? 'bg-amber-400'
                      : 'bg-red-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Clock icon */}
      <span className={`text-lg shrink-0 ${urgent ? 'animate-bounce' : ''}`}>
        {urgent ? '⚠️' : '⏱️'}
      </span>
    </div>
  );
}
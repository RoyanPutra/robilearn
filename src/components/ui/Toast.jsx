import { useEffect } from 'react';
export default function Toast({ msg, onDone }) {
  useEffect(() => { const t=setTimeout(onDone,2500); return()=>clearTimeout(t); }, [msg]);
  return (
    <div className="fixed bottom-20 left-1/2 z-[9997] pointer-events-none
                    bg-ink text-white rounded-full px-6 py-3
                    font-title text-base shadow-xl whitespace-nowrap animate-toast-in">
      {msg}
    </div>
  );
}

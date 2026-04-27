/**
 * SkeletonLoader — placeholder abu-abu animasi saat konten loading
 * Variants: card, list, lesson, subject, profile
 */
export default function SkeletonLoader({ variant = 'card', count = 1 }) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonItem key={i} variant={variant} />
        ))}
      </>
    );
  }
  
  function SkeletonItem({ variant }) {
    const pulse = 'animate-pulse bg-slate-200 rounded-xl';
  
    if (variant === 'subject') {
      return (
        <div className="bg-white rounded-2xl p-4 border-2 border-slate-100">
          <div className={`${pulse} w-10 h-10 rounded-xl mb-3`} />
          <div className={`${pulse} h-4 w-3/4 mb-2`} />
          <div className={`${pulse} h-3 w-1/2 mb-3`} />
          <div className={`${pulse} h-2 w-full rounded-full`} />
        </div>
      );
    }
  
    if (variant === 'lesson') {
      return (
        <div className="max-w-xl mx-auto px-4 py-6 flex flex-col gap-4">
          {/* Question text */}
          <div className={`${pulse} h-8 w-3/4`} />
          {/* Robi + bubble */}
          <div className="flex items-end gap-3">
            <div className={`${pulse} w-14 h-16 rounded-2xl shrink-0`} />
            <div className={`${pulse} flex-1 h-14 rounded-2xl`} />
          </div>
          {/* Display area */}
          <div className={`${pulse} h-24 w-full rounded-2xl mx-auto`} />
          {/* Options grid */}
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(n => (
              <div key={n} className={`${pulse} h-14 rounded-2xl`} />
            ))}
          </div>
        </div>
      );
    }
  
    if (variant === 'profile') {
      return (
        <div className="flex items-center gap-3 p-4">
          <div className={`${pulse} w-12 h-12 rounded-full shrink-0`} />
          <div className="flex-1">
            <div className={`${pulse} h-4 w-1/2 mb-2`} />
            <div className={`${pulse} h-3 w-1/3`} />
          </div>
        </div>
      );
    }
  
    if (variant === 'list') {
      return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
          <div className={`${pulse} w-12 h-12 rounded-xl shrink-0`} />
          <div className="flex-1">
            <div className={`${pulse} h-4 w-2/3 mb-2`} />
            <div className={`${pulse} h-3 w-1/2`} />
          </div>
          <div className={`${pulse} w-6 h-6 rounded-full shrink-0`} />
        </div>
      );
    }
  
    /* default: card */
    return (
      <div className="bg-white rounded-2xl p-5 border-2 border-slate-100">
        <div className={`${pulse} h-5 w-1/2 mb-3`} />
        <div className={`${pulse} h-4 w-full mb-2`} />
        <div className={`${pulse} h-4 w-3/4 mb-4`} />
        <div className={`${pulse} h-8 w-full rounded-xl`} />
      </div>
    );
  }
  
  /* ── Loading Screen khusus ── */
  export function LoadingScreen({ message = 'Memuat...' }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        {/* Robi pulse */}
        <div className="relative">
          <div className="text-5xl animate-bounce">🤖</div>
          <div className="absolute -inset-3 rounded-full border-4 border-blue-200
                          border-t-blue-500 animate-spin"/>
        </div>
        <p className="font-title text-lg text-slate-500 animate-pulse">{message}</p>
        {/* Skeleton cards */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-3 mt-2">
          {[1,2,3,4].map(n => (
            <div key={n} className="bg-slate-100 animate-pulse rounded-2xl h-24"
                 style={{ animationDelay: `${n * 0.1}s` }} />
          ))}
        </div>
      </div>
    );
  }
  
  /* ── Inline spinner ── */
  export function Spinner({ size = 'md', color = 'blue' }) {
    const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-4', lg: 'w-12 h-12 border-4' };
    const colors = { blue: 'border-blue-200 border-t-blue-500', white: 'border-white/20 border-t-white' };
    return (
      <div className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`} />
    );
  }
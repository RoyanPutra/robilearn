export default function Robi({ emotion='happy', size=96, anim='float', className='' }) {
  const animClass = { float:'animate-robi-float', bounce:'animate-robi-bobble', dance:'animate-robi-dance', none:'' }[anim]||'';
  const mouth = { happy:'M34 58 Q50 70 66 58', sad:'M34 64 Q50 54 66 64', excited:'M30 56 Q50 74 70 56', thinking:'M36 62 Q50 62 64 62' }[emotion];
  const eyeScale = emotion==='sad' ? 'scaleY(0.6)' : 'scaleY(1)';
  return (
    <svg viewBox="0 0 100 120" fill="none" width={size} height={size*1.2} className={`${animClass} ${className}`} style={{display:'block'}}>
      <g style={{transformOrigin:'50% 100%',animation:'sway 2.2s ease-in-out infinite'}}>
        <line x1="50" y1="10" x2="50" y2="25" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="50" cy="7" r="7" fill="#F59E0B" stroke="#fff" strokeWidth="2"/>
      </g>
      <rect x="18" y="24" width="64" height="48" rx="18" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3"/>
      <rect x="9"  y="38" width="11" height="18" rx="5" fill="#1D4ED8"/>
      <rect x="80" y="38" width="11" height="18" rx="5" fill="#1D4ED8"/>
      <rect x="26" y="34" width="20" height="20" rx="8" fill="white"/>
      <rect x="54" y="34" width="20" height="20" rx="8" fill="white"/>
      <g className="robi-eye" style={{transformOrigin:'center',transform:eyeScale}}>
        <circle cx="36" cy="44" r="7" fill="#1E293B"/>
        <circle cx="64" cy="44" r="7" fill="#1E293B"/>
        <circle cx="38" cy="42" r="2.5" fill="white"/>
        <circle cx="66" cy="42" r="2.5" fill="white"/>
      </g>
      <path d={mouth} stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <rect x="24" y="74" width="52" height="36" rx="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3"/>
      <rect x="32" y="80" width="36" height="22" rx="8" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2"/>
      <circle cx="40" cy="91" r="4" fill="#22C55E"/>
      <circle cx="50" cy="91" r="4" fill="#F59E0B"/>
      <circle cx="60" cy="91" r="4" fill="#3B82F6"/>
      {emotion==='excited' ? (<>
        <rect x="-4" y="70" width="22" height="12" rx="6" fill="#1D4ED8" transform="rotate(-45 10 76)"/>
        <rect x="82" y="70" width="22" height="12" rx="6" fill="#1D4ED8" transform="rotate(45 94 76)"/>
      </>) : (<>
        <rect x="5"  y="76" width="20" height="12" rx="6" fill="#1D4ED8"/>
        <rect x="75" y="76" width="20" height="12" rx="6" fill="#1D4ED8"/>
      </>)}
      <rect x="30" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
      <rect x="54" y="108" width="16" height="10" rx="5" fill="#1D4ED8"/>
    </svg>
  );
}

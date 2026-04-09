let ctx = null, muted = false, bgPlaying = false, bgTimer = null;

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
function tone(freq, type='sine', dur=0.18, vol=0.26, delay=0) {
  if (muted) return;
  try {
    const c=ac(), o=c.createOscillator(), g=c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type=type; o.frequency.setValueAtTime(freq, c.currentTime+delay);
    g.gain.setValueAtTime(0, c.currentTime+delay);
    g.gain.linearRampToValueAtTime(vol, c.currentTime+delay+0.015);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime+delay+dur);
    o.start(c.currentTime+delay); o.stop(c.currentTime+delay+dur+0.05);
  } catch(e){}
}
export const sfxClick   = () => { tone(800,'sine',.05,.12); tone(1000,'sine',.05,.1,.04); };
export const sfxCorrect = () => { [523,659,784,1047].forEach((f,i)=>tone(f,'sine',.18,.24,i*.07)); };
export const sfxWrong   = () => { [220,180,150].forEach((f,i)=>tone(f,'sawtooth',.12,.18,i*.1)); };
export const sfxHeart   = () => { [330,220,165].forEach((f,i)=>tone(f,'sawtooth',.1,.16,i*.08)); };
export const sfxFanfare = () => {
  [523,659,784,1047,1319].forEach((f,i)=>tone(f,'triangle',.22,.2,i*.09));
  setTimeout(()=>[1047,1319,1568].forEach((f,i)=>tone(f,'triangle',.4,.18,i*.06)),600);
};
export const sfxLevelUp = () => { [392,494,587,784,988,1175].forEach((f,i)=>tone(f,'sine',.18,.18,i*.07)); };
export const sfxCombo   = (n) => { const f=400+n*75; tone(f,'sine',.1,.25); tone(f*1.5,'sine',.12,.2,.1); };
export const sfxSplash  = () => { [261,329,392,523,659].forEach((f,i)=>tone(f,'triangle',.18,.18,i*.11)); };

export function startBgMusic() {
  if (muted||bgPlaying) return;
  bgPlaying=true;
  const melody=[523,587,659,784,880,784,659,587,523,494,523,587];
  let idx=0;
  function next() {
    if(!bgPlaying||muted) return;
    try {
      const c=ac(), o=c.createOscillator(), g=c.createGain(), f=c.createBiquadFilter();
      f.type='lowpass'; f.frequency.value=1100;
      o.connect(g); g.connect(f); f.connect(c.destination);
      o.type='square'; o.frequency.value=melody[idx%melody.length];
      g.gain.setValueAtTime(0.04,c.currentTime);
      g.gain.linearRampToValueAtTime(0.07,c.currentTime+.02);
      g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+.28);
      o.start(c.currentTime); o.stop(c.currentTime+.3); idx++;
    } catch(e){}
    bgTimer=setTimeout(next,320);
  }
  next();
}
export function stopBgMusic()  { bgPlaying=false; clearTimeout(bgTimer); }
export function toggleMute()   { muted=!muted; muted?stopBgMusic():startBgMusic(); return muted; }
export function isMuted()      { return muted; }

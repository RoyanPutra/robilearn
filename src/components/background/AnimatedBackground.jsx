export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-sky-50 to-surface" />
      <div className="absolute top-6 right-12 w-20 h-20 rounded-full bg-amber-300 animate-sun-pulse shadow-[0_0_50px_20px_rgba(251,191,36,.3)]" />
      {[{w:180,top:8,dur:'28s',delay:'0s'},{w:130,top:18,dur:'36s',delay:'10s'},{w:150,top:5,dur:'42s',delay:'20s'}].map((c,i)=>(
        <div key={i} className="absolute animate-cloud-drift" style={{top:`${c.top}%`,animationDuration:c.dur,animationDelay:c.delay,left:'-250px'}}>
          <div className="relative" style={{width:c.w}}>
            <div className="absolute bg-white rounded-full opacity-90" style={{width:c.w*.6,height:c.w*.3,top:c.w*.1,left:c.w*.2}}/>
            <div className="absolute bg-white rounded-full opacity-90" style={{width:c.w*.45,height:c.w*.25,top:c.w*.15,left:c.w*.1}}/>
            <div className="absolute bg-white rounded-full opacity-90" style={{width:c.w*.5,height:c.w*.28,top:c.w*.08,left:c.w*.42}}/>
          </div>
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200/60 to-transparent rounded-t-[50%]"/>
      {['top-1/4 left-10','top-1/3 right-16','top-1/2 left-1/4','top-1/5 right-1/3'].map((pos,i)=>(
        <span key={i} className={`absolute ${pos} text-xl animate-twinkle`} style={{animationDelay:`${i*0.7}s`}}>
          {['✨','⭐','🌟','💫'][i]}
        </span>
      ))}
    </div>
  );
}

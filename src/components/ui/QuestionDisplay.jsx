export default function QuestionDisplay({ question }) {
  const { display } = question;
  if (!display) return null;
  if (display.type==='count') return (
    <div className="flex flex-col items-center gap-3 my-4">
      <div className="flex flex-wrap gap-2 justify-center max-w-xs">
        {Array.from({length:display.count}).map((_,i)=>(
          <span key={i} className="text-4xl animate-pop-in" style={{animationDelay:`${i*.05}s`,animationFillMode:'both'}}>{display.emoji}</span>
        ))}
      </div>
    </div>
  );
  if (display.type==='eq') return (
    <div className="text-center my-4">
      <p className="font-title text-5xl md:text-6xl tracking-widest text-ink animate-pop-in">
        {display.a} <span className="text-primary">{display.op}</span> {display.b} = ?
      </p>
    </div>
  );
  if (display.type==='emoji') return (
    <div className="text-center my-4"><span className="text-8xl block animate-pop-in">{display.emoji}</span></div>
  );
  if (display.type==='svg') return (
    <div className="flex justify-center my-4">
      <svg viewBox="0 0 120 120" width="120" height="120" dangerouslySetInnerHTML={{__html:display.svg}}/>
    </div>
  );
  return null;
}

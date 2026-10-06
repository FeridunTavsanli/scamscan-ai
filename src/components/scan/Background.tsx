export function Background() {
  const dots = Array.from({ length: 22 }, (_, i) => ({
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    delay: (i % 7) * 0.8,
    size: 3 + (i % 3) * 2,
  }));
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -start-32 h-[480px] w-[480px] rounded-full bg-primary/15 blur-3xl animate-float" />
      <div className="absolute top-1/3 -end-40 h-[520px] w-[520px] rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 start-1/3 h-[380px] w-[380px] rounded-full bg-violet/10 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary/25 animate-float"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
  );
}

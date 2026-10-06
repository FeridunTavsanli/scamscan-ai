import { useI18n } from "@/lib/i18n/context";

export function ScanningOrb() {
  const { t } = useI18n();
  const nodes = [[20, 30], [80, 25], [15, 75], [85, 70], [50, 10], [50, 92]];
  return (
    <div className="glass mx-auto flex max-w-3xl flex-col items-center rounded-3xl px-6 py-14 animate-fade-up">
      <div className="relative h-48 w-48">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <line x1="50" y1="50" x2={x} y2={y} stroke="var(--primary)" strokeOpacity=".25" strokeWidth=".5" />
              <circle cx={x} cy={y} r="1.8" fill="var(--accent)" />
            </g>
          ))}
        </svg>
        <div className="absolute inset-10 rounded-full bg-gradient-brand shadow-glow animate-orb" />
        <div className="absolute inset-14 rounded-full bg-background/40 blur-md" />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-scan" />
        </div>
      </div>
      <p className="mt-8 font-display text-xl font-semibold text-gradient">{t.analyzing}</p>
      <p className="mt-2 text-sm text-muted-foreground">{t.analyzing_sub}</p>
    </div>
  );
}

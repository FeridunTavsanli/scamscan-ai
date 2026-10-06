import { useEffect, useState } from "react";
import {
  AlertTriangle, Clock, Banknote, KeyRound, Lock, Smartphone, UserRound, Drama, Link2, Scissors,
  Gift, TrendingUp, Timer, Brain, Landmark, CreditCard, Sparkles, ListChecks, Copy, Check, RotateCcw,
  Info, Languages, ShieldAlert, ShieldCheck,
} from "lucide-react";
import type { ScanResult, RiskLevel } from "@/lib/scan-types";
import { useI18n } from "@/lib/i18n/context";
import type { Dict } from "@/lib/i18n/dict";

const ICONS: Record<string, typeof AlertTriangle> = {
  urgency: Clock, fear: AlertTriangle, money_request: Banknote, sensitive_info: Lock, password: KeyRound,
  otp: Smartphone, personal_info: UserRound, impersonation: Drama, suspicious_url: Link2, short_url: Scissors,
  unrealistic_reward: Gift, investment_promise: TrendingUp, pressure: Timer, social_engineering: Brain,
  fake_authority: Landmark, payment_instructions: CreditCard,
};

const LEVEL_COLOR: Record<RiskLevel, string> = {
  low: "var(--success)", suspicious: "var(--warning)", high: "var(--danger-high)", very_high: "var(--destructive)",
};

export function levelLabel(t: Dict, l: RiskLevel) {
  return { low: t.level_low, suspicious: t.level_suspicious, high: t.level_high, very_high: t.level_very_high }[l];
}

function Gauge({ score, level }: { score: number; level: RiskLevel }) {
  const { t } = useI18n();
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setV(Math.round(score * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score]);
  const r = 70, c = 2 * Math.PI * r;
  const color = LEVEL_COLOR[level];
  return (
    <div className="relative h-52 w-52">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--muted)" strokeWidth="12" />
        <circle cx="80" cy="80" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * v) / 100}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-bold">{v}%</span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color }}>{levelLabel(t, level)}</span>
      </div>
    </div>
  );
}

function Card({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <section className={`glass rounded-3xl p-6 animate-fade-up ${className}`} style={{ animationDelay: `${delay}ms` }}>{children}</section>;
}

export function ResultDashboard({ result, onReset }: { result: ScanResult; onReset: () => void }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const color = LEVEL_COLOR[result.riskLevel];
  const LevelIcon = result.riskScore >= 30 ? ShieldAlert : ShieldCheck;

  const copy = async () => {
    const text = [
      `ScamScan AI`,
      `${t.risk}: ${result.riskScore}% — ${levelLabel(t, result.riskLevel)}`,
      `${t.scam_type}: ${result.scamTypeLabel}`,
      "",
      `${t.why}`,
      ...(result.detectedSignals.length ? result.detectedSignals.map((s) => `• ${s.title}: ${s.explanation}`) : [t.no_signals]),
      "",
      `${t.ai_analysis}`,
      result.explanation,
      "",
      `${t.what_do}`,
      ...result.recommendations.map((r) => `• ${r}`),
      "",
      t.disclaimer,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Card className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
        <Gauge score={result.riskScore} level={result.riskLevel} />
        <div className="flex-1 text-center md:text-start">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{t.risk}</p>
          <h2 className="mt-1 flex items-center justify-center gap-2 text-3xl font-bold md:justify-start" style={{ color }}>
            <LevelIcon className="h-7 w-7" /> {levelLabel(t, result.riskLevel)}
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
            <div className="rounded-2xl border border-border bg-background/70 px-4 py-2">
              <p className="text-xs text-muted-foreground">{t.scam_type}</p>
              <p className="font-semibold text-gradient">{result.scamTypeLabel}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 px-4 py-2">
              <p className="flex items-center gap-1 text-xs text-muted-foreground"><Languages className="h-3 w-3" />{t.detected_lang}</p>
              <p className="font-semibold">{result.detectedLanguage}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
            <button onClick={copy} className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.03]">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? t.copied : t.copy}
            </button>
            <button onClick={onReset} className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/70 px-4 py-2 text-sm font-medium transition hover:bg-muted">
              <RotateCcw className="h-4 w-4" />{t.new_scan}
            </button>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        <Card delay={100}>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><AlertTriangle className="h-5 w-5 text-primary" />{t.why}</h3>
          {result.detectedSignals.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.no_signals}</p>
          ) : (
            <ul className="space-y-3">
              {result.detectedSignals.map((s, i) => {
                const Icon = ICONS[s.key] ?? AlertTriangle;
                return (
                  <li key={i} className="flex gap-3 rounded-2xl bg-background/60 p-3 transition hover:shadow-soft">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-sm text-muted-foreground">{s.explanation}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card delay={200}>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><ListChecks className="h-5 w-5 text-primary" />{t.what_do}</h3>
          <ul className="space-y-2.5">
            {result.recommendations.map((r, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success"><Check className="h-3 w-3" /></span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card delay={300}>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Sparkles className="h-5 w-5 text-violet" />{t.ai_analysis}</h3>
        <div className="space-y-3 whitespace-pre-line leading-relaxed text-foreground/85">{result.explanation}</div>
      </Card>

      {result.urls.length > 0 && (
        <Card delay={400}>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Link2 className="h-5 w-5 text-primary" />{t.urls}</h3>
          <ul className="space-y-3">
            {result.urls.map((u, i) => (
              <li key={i} className="rounded-2xl border border-border bg-background/60 p-3">
                <code className={`break-all rounded-md px-1.5 py-0.5 text-sm ${u.suspicious ? "bg-destructive/10 text-destructive" : "bg-muted"}`}>{u.url}</code>
                <p className={`mt-2 text-xs font-semibold ${u.suspicious ? "text-destructive" : "text-success"}`}>{u.suspicious ? t.url_warn : t.url_ok}</p>
                <p className="mt-1 text-sm text-muted-foreground">{u.notes}</p>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="flex gap-3 rounded-2xl border border-border bg-secondary/60 p-4 text-sm text-muted-foreground">
        <Info className="h-5 w-5 shrink-0 text-primary" /><p>{t.disclaimer}</p>
      </div>
    </div>
  );
}

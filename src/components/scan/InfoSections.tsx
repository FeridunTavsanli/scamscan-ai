import { ClipboardPaste, Cpu, Eye, ShieldCheck, Lock, Trash2, History as HistoryIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { HistoryItem } from "@/lib/history";
import { levelLabel } from "./ResultDashboard";

export function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { icon: ClipboardPaste, title: t.s1_t, desc: t.s1_d },
    { icon: Cpu, title: t.s2_t, desc: t.s2_d },
    { icon: Eye, title: t.s3_t, desc: t.s3_d },
    { icon: ShieldCheck, title: t.s4_t, desc: t.s4_d },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
      <h2 className="text-center text-3xl font-bold md:text-4xl">{t.how_title}</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={i} className="glass group rounded-3xl p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-glow">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground transition group-hover:scale-110">
                <s.icon className="h-6 w-6" />
              </span>
              <span className="font-display text-4xl font-bold text-muted">0{i + 1}</span>
            </div>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HistoryPanel({ items, onOpen, onClear }: { items: HistoryItem[]; onOpen: (i: HistoryItem) => void; onClear: () => void }) {
  const { t, lang } = useI18n();
  return (
    <section id="history" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10">
      <div className="glass rounded-3xl p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-semibold"><HistoryIcon className="h-5 w-5 text-primary" />{t.history}</h2>
          {items.length > 0 && (
            <button onClick={onClear} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="h-4 w-4" />{t.clear_history}
            </button>
          )}
        </div>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">{t.history_empty}</p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {items.map((h) => (
              <li key={h.id}>
                <button onClick={() => onOpen(h)} className="flex w-full items-center gap-4 rounded-2xl border border-border bg-background/60 p-3 text-start transition hover:-translate-y-0.5 hover:shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted font-display font-bold">{h.result.riskScore}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{h.message}</span>
                    <span className="block text-xs text-muted-foreground">
                      {levelLabel(t, h.result.riskLevel)} · {h.result.scamTypeLabel} · {new Date(h.date).toLocaleString(lang)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function Privacy() {
  const { t } = useI18n();
  return (
    <section id="privacy" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16">
      <div className="glass flex flex-col items-center gap-5 rounded-3xl p-8 text-center md:flex-row md:text-start">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow"><Lock className="h-7 w-7" /></span>
        <div>
          <h2 className="text-2xl font-bold">{t.privacy_title}</h2>
          <p className="mt-2 text-muted-foreground">{t.privacy_text}</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="px-4 pb-10 pt-6 text-center text-sm text-muted-foreground">
      <p className="font-display font-semibold text-foreground">ScamScan <span className="text-gradient">AI</span></p>
      <p className="mt-1">{t.footer}</p>
    </footer>
  );
}

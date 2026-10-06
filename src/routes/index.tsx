import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Sparkles, X, ScanSearch, Landmark, Package, Mail, TrendingUp, AlertCircle } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { LANGS } from "@/lib/i18n/dict";
import { EXAMPLES } from "@/lib/i18n/examples";
import { scanMessage } from "@/lib/scan.functions";
import type { ScanResult } from "@/lib/scan-types";
import { loadHistory, saveHistory, type HistoryItem } from "@/lib/history";
import { Header } from "@/components/scan/Header";
import { Background } from "@/components/scan/Background";
import { ScanningOrb } from "@/components/scan/ScanningOrb";
import { ResultDashboard } from "@/components/scan/ResultDashboard";
import { HowItWorks, HistoryPanel, Privacy, Footer } from "@/components/scan/InfoSections";

const TITLE = "ScamScan AI — Is this message trying to scam you?";
const DESC = "Paste any suspicious SMS, WhatsApp message or email and get an instant AI scam risk score, explanation and safety steps in 14 languages.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <I18nProvider>
      <App />
    </I18nProvider>
  ),
});

const MAX = 5000;

function App() {
  const { t, lang } = useI18n();
  const scan = useServerFn(scanMessage);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => setHistory(loadHistory()), []);

  const scroll = () => setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);

  const run = async () => {
    const msg = text.trim();
    if (!msg) { setError(t.err_empty); return; }
    setError(null); setResult(null); setLoading(true); scroll();
    try {
      const language = LANGS.find((l) => l.code === lang)!.english;
      const res = await scan({ data: { message: msg, language } });
      if (!res.ok) {
        setError(res.error === "rate_limit" ? t.err_rate : res.error === "credits" ? t.err_credits : t.err_failed);
      } else {
        setResult(res.result);
        const item: HistoryItem = { id: String(Date.now()), date: new Date().toISOString(), message: msg.slice(0, 160), result: res.result };
        const next = [item, ...history];
        setHistory(next); saveHistory(next);
      }
    } catch {
      setError(t.err_failed);
    } finally {
      setLoading(false); scroll();
    }
  };

  const exIcons = [Landmark, Package, Mail, TrendingUp];
  const exLabels = [t.ex_bank, t.ex_delivery, t.ex_phishing, t.ex_investment];

  return (
    <div id="top" className="relative min-h-screen">
      <Background />
      <Header />

      <main>
        <section className="mx-auto max-w-4xl px-4 pb-10 pt-14 text-center md:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-primary animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" />{t.badge}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl animate-fade-up" style={{ animationDelay: "80ms" }}>
            <span className="text-gradient">{t.hero_title}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg animate-fade-up" style={{ animationDelay: "160ms" }}>{t.hero_sub}</p>

          <div className="glass mt-8 rounded-3xl p-3 text-start animate-fade-up" style={{ animationDelay: "240ms" }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX))}
              placeholder={t.placeholder}
              rows={7}
              className="w-full resize-none rounded-2xl bg-background/50 p-4 text-base outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/30"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-2">
              <span className="text-xs text-muted-foreground tabular-nums">{text.length} / {MAX}</span>
              <div className="flex gap-2">
                {text && (
                  <button onClick={() => { setText(""); setError(null); }} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted">
                    <X className="h-4 w-4" />{t.clear}
                  </button>
                )}
                <button
                  onClick={run}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.03] disabled:opacity-60"
                >
                  <ScanSearch className="h-4 w-4" />{t.scan}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 animate-fade-up" style={{ animationDelay: "320ms" }}>
            <span className="text-sm text-muted-foreground">{t.try_example}</span>
            {exLabels.map((label, i) => {
              const Icon = exIcons[i]!;
              return (
                <button key={i} onClick={() => { setText(EXAMPLES[lang][i] ?? ""); setError(null); }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary">
                  <Icon className="h-3.5 w-3.5" />{label}
                </button>
              );
            })}
          </div>
        </section>

        <div ref={resultRef} className="scroll-mt-24 px-4">
          {loading && <ScanningOrb />}
          {error && !loading && (
            <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive animate-fade-up">
              <AlertCircle className="h-5 w-5 shrink-0" />{error}
            </div>
          )}
          {result && !loading && <ResultDashboard result={result} onReset={() => { setResult(null); setText(""); window.scrollTo({ top: 0, behavior: "smooth" }); }} />}
        </div>

        <HowItWorks />
        <HistoryPanel
          items={history}
          onOpen={(h) => { setResult(h.result); setText(h.message); setError(null); scroll(); }}
          onClear={() => { setHistory([]); saveHistory([]); }}
        />
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}

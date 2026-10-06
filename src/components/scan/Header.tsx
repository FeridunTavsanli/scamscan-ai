import { ShieldCheck, Globe, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LANGS } from "@/lib/i18n/dict";
import { useI18n } from "@/lib/i18n/context";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="glass !bg-background/90 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold">ScamScan <span className="text-gradient">AI</span></span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#how" className="transition-colors hover:text-foreground">{t.nav_how}</a>
          <a href="#history" className="transition-colors hover:text-foreground">{t.nav_history}</a>
          <a href="#privacy" className="transition-colors hover:text-foreground">{t.nav_privacy}</a>
        </nav>
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-2 text-sm transition hover:shadow-soft"
            aria-label="Language"
          >
            <Globe className="h-4 w-4 text-primary" />
            <span>{current.flag}</span>
            <span className="hidden sm:inline">{current.name}</span>
          </button>
          {open && (
            <div className="absolute end-0 mt-2 max-h-80 w-52 overflow-auto rounded-2xl border border-border bg-popover p-1.5 shadow-soft animate-fade-up">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-start text-sm hover:bg-muted"
                >
                  <span>{l.flag}</span>
                  <span className="flex-1">{l.name}</span>
                  {l.code === lang && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

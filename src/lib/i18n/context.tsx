import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DICTS, LANGS, type Dict, type Lang } from "./dict";

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: Dict; }
const I18nCtx = createContext<Ctx | null>(null);
const KEY = "scamscan_lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Lang | null;
    if (saved && saved in DICTS) setLangState(saved);
    else {
      const nav = navigator.language.slice(0, 2) as Lang;
      if (LANGS.some((l) => l.code === nav)) setLangState(nav);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(KEY, l);
  };

  return <I18nCtx.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const c = useContext(I18nCtx);
  if (!c) throw new Error("useI18n outside provider");
  return c;
}

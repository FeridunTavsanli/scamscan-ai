# ScamScan AI — Build Plan

A bright, premium single-page scam checker. Paste a message, AI analyzes it, and you get a risk score, scam type, warning signs, explanation and safety steps — in 14 languages. No accounts, no payments.

## What you'll get

**Header**: ScamScan AI logo, nav links (How it works, History, Privacy), language selector with flags (TR, EN, DE, FR, ES, IT, PT, NL, RU, AR, ZH, JA, KO, HI). Arabic switches the layout right-to-left. Language choice is remembered.

**Hero**: "Is this message trying to scam you?", glass textarea with character counter (5,000 max), Clear and Scan with AI buttons, four example buttons (bank, delivery, phishing, investment) whose sample texts are written in the chosen language.

**Scanning**: glowing orb, network lines, scan sweep, "Analyzing with AI…" — shown only while the AI works, then fades into results.

**Results dashboard**
- Animated circular risk score with level: Low (0–29), Suspicious (30–59), High (60–79), Very High (80–100)
- Scam type badge (12 categories)
- "Why is this suspicious?" — only signals actually found, each with icon, title and AI explanation
- URL analysis — links in the message are highlighted with notes like "Potentially suspicious URL pattern detected" (never claims a link is definitely malicious)
- "AI Analysis" — written explanation specific to the message
- "What should you do?" — only relevant recommendations
- Detected message language
- Copy Analysis button, disclaimer (translated)

**Scan history**: saved in the browser (date, preview, score, level, type); reopen or clear.

**How it works**: Paste → AI Analyzes → Understand → Stay Safe animated cards. **Privacy** section: no account, messages not stored on a server.

**Design**: white/light background, blue–cyan with a touch of violet, glass cards, soft shadows, subtle animated particle background, smooth hover and transitions, mobile-first. Fonts: Sora headings, Manrope body.

## Technical details
- Lovable AI via a server function (`src/lib/scan.functions.ts`) calling `openai/gpt-6-astra` on the Responses API with streaming, low reasoning, and a strict JSON schema returning `riskScore, riskLevel, scamType, detectedSignals[{key,title,explanation}], urls[{url,notes}], explanation, recommendations[], detectedLanguage`. Output language = selected UI language. Input validated with zod (1–5000 chars). Risk level re-derived from the score on the server for consistency.
- AI logic isolated in `src/lib/ai/analyze.server.ts` so the provider can be swapped.
- Errors (rate limit, out of credits, failure) shown as translated messages.
- i18n: typed dictionary per language in `src/lib/i18n/`, React context, `dir="rtl"` for Arabic.
- Components: Header, LanguageSelector, Hero/ScanInput, ScanningOrb, RiskGauge, ResultDashboard, SignalList, UrlAnalysis, HistoryPanel, HowItWorks, Privacy, Footer.
- History via localStorage read after hydration. Design tokens in `src/styles.css` (oklch). Proper page title/meta.

// Server-only AI analysis module. Swap provider here without touching UI.
import type { ScanResult } from "../scan-types";
import { levelFromScore, SCAM_TYPES } from "../scan-types";

export class AnalysisError extends Error {
  constructor(public code: "rate_limit" | "credits" | "failed") {
    super(code);
  }
}

const schema = {
  type: "object",
  additionalProperties: false,
  required: [
    "riskScore",
    "scamType",
    "scamTypeLabel",
    "detectedSignals",
    "urls",
    "explanation",
    "recommendations",
    "detectedLanguage",
  ],
  properties: {
    riskScore: { type: "integer", minimum: 0, maximum: 100 },
    scamType: { type: "string", enum: [...SCAM_TYPES] },
    scamTypeLabel: { type: "string" },
    detectedSignals: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["key", "title", "explanation"],
        properties: {
          key: {
            type: "string",
            enum: [
              "urgency", "fear", "money_request", "sensitive_info", "password", "otp",
              "personal_info", "impersonation", "suspicious_url", "short_url", "unrealistic_reward",
              "investment_promise", "pressure", "social_engineering", "fake_authority", "payment_instructions",
            ],
          },
          title: { type: "string" },
          explanation: { type: "string" },
        },
      },
    },
    urls: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["url", "suspicious", "notes"],
        properties: {
          url: { type: "string" },
          suspicious: { type: "boolean" },
          notes: { type: "string" },
        },
      },
    },
    explanation: { type: "string" },
    recommendations: { type: "array", items: { type: "string" } },
    detectedLanguage: { type: "string" },
  },
};

function systemPrompt(lang: string) {
  return `You are ScamScan AI, an expert fraud and social-engineering analyst.
Analyze the user's message carefully in context. Do not rely on keywords alone; reason about intent, sender plausibility, requested actions, and manipulation tactics.
Return:
- riskScore 0-100 reflecting real scam likelihood (benign everyday messages should score low).
- scamType: best-fitting category, or "other" if unclear or not a scam. scamTypeLabel: that category name translated.
- detectedSignals: ONLY warning signs actually present in the message, each with a short title and a 1-2 sentence explanation quoting or referencing the specific part of the message.
- urls: every URL/domain in the message. Describe pattern concerns (shortened, lookalike domain, http, odd TLD). Never claim a URL is definitely malicious; use cautious wording like "Potentially suspicious URL pattern detected". Empty array if none.
- explanation: 2-4 short paragraphs covering what the sender seems to want, which parts are suspicious, why they raise risk, whether social engineering is used, and what to be careful about.
- recommendations: 3-6 practical, specific actions relevant to THIS message only.
- detectedLanguage: the English name of the language the message is written in.
Write ALL human-readable text fields (titles, explanations, labels, notes, recommendations) in this language: ${lang}.`;
}

export async function analyzeMessage(message: string, lang: string, apiKey: string): Promise<ScanResult> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      stream: true,
      store: false,
      reasoning: { effort: "low" },
      input: [
        { role: "system", content: systemPrompt(lang) },
        { role: "user", content: `Message to analyze:\n"""\n${message}\n"""` },
      ],
      text: { format: { type: "json_schema", name: "scam_analysis", strict: true, schema } },
    }),
  });

  if (!res.ok || !res.body) {
    const body = await res.text().catch(() => "");
    console.error("AI gateway error", res.status, body.slice(0, 500));
    if (res.status === 429) throw new AnalysisError("rate_limit");
    if (res.status === 402) throw new AnalysisError("credits");
    throw new AnalysisError("failed");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let finalText: string | null = null;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === "response.output_text.delta") text += evt.delta ?? "";
        else if (evt.type === "response.output_text.done" && typeof evt.text === "string") finalText = evt.text;
        else if (evt.type === "response.failed" || evt.type === "error") {
          console.error("AI stream error", data.slice(0, 500));
          throw new AnalysisError("failed");
        }
      } catch (e) {
        if (e instanceof AnalysisError) throw e;
      }
    }
  }

  const raw = finalText ?? text;
  let parsed: Omit<ScanResult, "riskLevel">;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("AI returned unparsable output", raw.slice(0, 300));
    throw new AnalysisError("failed");
  }
  const score = Math.max(0, Math.min(100, Math.round(parsed.riskScore)));
  return { ...parsed, riskScore: score, riskLevel: levelFromScore(score) };
}

export const SCAM_TYPES = [
  "phishing", "bank", "delivery", "account_takeover", "investment", "giveaway",
  "job", "romance", "government", "tech_support", "payment", "other",
] as const;
export type ScamType = (typeof SCAM_TYPES)[number];
export type RiskLevel = "low" | "suspicious" | "high" | "very_high";

export interface ScanResult {
  riskScore: number;
  riskLevel: RiskLevel;
  scamType: ScamType;
  scamTypeLabel: string;
  detectedSignals: { key: string; title: string; explanation: string }[];
  urls: { url: string; suspicious: boolean; notes: string }[];
  explanation: string;
  recommendations: string[];
  detectedLanguage: string;
}

export function levelFromScore(s: number): RiskLevel {
  if (s >= 80) return "very_high";
  if (s >= 60) return "high";
  if (s >= 30) return "suspicious";
  return "low";
}

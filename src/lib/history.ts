import type { ScanResult } from "./scan-types";

export interface HistoryItem { id: string; date: string; message: string; result: ScanResult; }
const KEY = "scamscan_history";

export function loadHistory(): HistoryItem[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 30)));
}

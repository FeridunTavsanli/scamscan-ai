import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ScanResult } from "./scan-types";

export type ScanResponse =
  | { ok: true; result: ScanResult }
  | { ok: false; error: "rate_limit" | "credits" | "failed" };

export const scanMessage = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ message: z.string().trim().min(1).max(5000), language: z.string().min(2).max(40) }).parse(d),
  )
  .handler(async ({ data }): Promise<ScanResponse> => {
    const { analyzeMessage, AnalysisError } = await import("./ai/analyze.server");
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false, error: "failed" };
    try {
      return { ok: true, result: await analyzeMessage(data.message, data.language, key) };
    } catch (e) {
      if (e instanceof AnalysisError) return { ok: false, error: e.code };
      console.error(e);
      return { ok: false, error: "failed" };
    }
  });

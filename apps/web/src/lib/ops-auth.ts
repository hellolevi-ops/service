import { NextRequest } from "next/server";

/** Ops console key: OPS_ADMIN_KEY, fallback REVALIDATE_SECRET. */
export function getOpsSecret() {
  return process.env.OPS_ADMIN_KEY || process.env.REVALIDATE_SECRET || "";
}

export function assertOpsAuth(req: NextRequest): boolean {
  const expected = getOpsSecret();
  if (!expected) return false;
  const header = req.headers.get("x-ops-key") || "";
  const query = req.nextUrl.searchParams.get("key") || "";
  const cookie = req.cookies.get("ops_key")?.value || "";
  return header === expected || query === expected || cookie === expected;
}

export function maskMobile(mobile: string) {
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "mql",
  "sql",
  "won",
  "nurture",
  "invalid",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

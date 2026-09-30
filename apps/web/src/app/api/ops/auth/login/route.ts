import { NextRequest, NextResponse } from "next/server";
import { loginStaff } from "@/lib/auth/staff";
import { STAFF_COOKIE } from "@/lib/auth/crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const result = await loginStaff(body.email || "", body.password || "", {
    ip,
    userAgent: req.headers.get("user-agent") || undefined,
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }
  const res = NextResponse.json({ ok: true, staff: result.staff });
  res.cookies.set(STAFF_COOKIE, result.token, result.cookie);
  return res;
}

import { NextRequest, NextResponse } from "next/server";
import { verifyOtpAndCreateSession } from "@/lib/auth/customer";
import { CUSTOMER_COOKIE } from "@/lib/auth/crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    mobile?: string;
    code?: string;
    consent?: boolean;
    roleTag?: string;
    nickname?: string;
  };
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const result = await verifyOtpAndCreateSession(
    {
      mobile: (body.mobile || "").trim(),
      code: (body.code || "").trim(),
      consent: Boolean(body.consent),
      roleTag: body.roleTag,
      nickname: body.nickname,
    },
    { ip, userAgent: req.headers.get("user-agent") || undefined },
  );
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }
  const res = NextResponse.json({ ok: true, user: result.user });
  res.cookies.set(CUSTOMER_COOKIE, result.token, result.cookie);
  return res;
}

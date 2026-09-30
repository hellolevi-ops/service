import { NextRequest, NextResponse } from "next/server";
import { destroyStaffSession } from "@/lib/auth/staff";
import { STAFF_COOKIE } from "@/lib/auth/crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(STAFF_COOKIE)?.value;
  await destroyStaffSession(token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

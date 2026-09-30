import { NextRequest, NextResponse } from "next/server";
import { destroyCustomerSession } from "@/lib/auth/customer";
import { CUSTOMER_COOKIE } from "@/lib/auth/crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(CUSTOMER_COOKIE)?.value;
  await destroyCustomerSession(token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(CUSTOMER_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

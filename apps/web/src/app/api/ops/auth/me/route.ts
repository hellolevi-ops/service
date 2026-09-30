import { NextResponse } from "next/server";
import { getStaffFromCookies } from "@/lib/auth/staff";

export const dynamic = "force-dynamic";

export async function GET() {
  const staff = await getStaffFromCookies();
  if (!staff) {
    return NextResponse.json({ ok: true, staff: null });
  }
  return NextResponse.json({ ok: true, staff });
}

import { NextRequest, NextResponse } from "next/server";
import { getCustomerFromRequest } from "@/lib/auth/customer";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCustomerFromRequest();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const mobile = user.mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      mobile,
      nickname: user.nickname,
      role_tag: user.role_tag,
      level: user.level,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const user = await getCustomerFromRequest();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as {
    nickname?: string;
    roleTag?: string;
  };
  const nickname =
    typeof body.nickname === "string" ? body.nickname.trim().slice(0, 64) : undefined;
  const roleTag = ["applicant", "parent", "enrolled"].includes(body.roleTag || "")
    ? body.roleTag
    : undefined;

  const result = await query<{
    id: string;
    mobile: string;
    nickname: string | null;
    role_tag: string;
    level: string;
  }>(
    `UPDATE users SET
       nickname = COALESCE($2, nickname),
       role_tag = COALESCE($3, role_tag),
       updated_at = now()
     WHERE id = $1
     RETURNING id, mobile, nickname, role_tag, level`,
    [user.id, nickname ?? null, roleTag ?? null],
  );
  const row = result.rows[0];
  return NextResponse.json({
    ok: true,
    user: {
      id: row.id,
      mobile: row.mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
      nickname: row.nickname,
      role_tag: row.role_tag,
      level: row.level,
    },
  });
}

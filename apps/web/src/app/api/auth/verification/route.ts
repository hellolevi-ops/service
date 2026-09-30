import { NextRequest, NextResponse } from "next/server";
import { getCustomerFromRequest } from "@/lib/auth/customer";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCustomerFromRequest();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const result = await query<{
    id: string;
    real_name: string;
    university: string;
    program: string | null;
    proof_note: string | null;
    status: string;
    reviewer_note: string | null;
    created_at: string;
    reviewed_at: string | null;
  }>(
    `SELECT id, real_name, university, program, proof_note, status, reviewer_note, created_at, reviewed_at
     FROM verification_requests WHERE user_id = $1
     ORDER BY created_at DESC LIMIT 10`,
    [user.id],
  );
  return NextResponse.json({
    ok: true,
    level: user.level,
    requests: result.rows,
  });
}

export async function POST(req: NextRequest) {
  const user = await getCustomerFromRequest();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (user.level === "L2") {
    return NextResponse.json({ ok: false, error: "已完成在读认证" }, { status: 400 });
  }

  const pending = await query(
    `SELECT id FROM verification_requests
     WHERE user_id = $1 AND status = 'pending' LIMIT 1`,
    [user.id],
  );
  if (pending.rows[0]) {
    return NextResponse.json({ ok: false, error: "已有待审核申请，请耐心等待" }, { status: 400 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    realName?: string;
    university?: string;
    program?: string;
    proofNote?: string;
  };
  const realName = (body.realName || "").trim().slice(0, 64);
  const university = (body.university || "").trim().slice(0, 128);
  if (!realName || !university) {
    return NextResponse.json({ ok: false, error: "请填写姓名与院校" }, { status: 400 });
  }

  const result = await query(
    `INSERT INTO verification_requests (user_id, real_name, university, program, proof_note, status)
     VALUES ($1, $2, $3, $4, $5, 'pending')
     RETURNING id, status, created_at`,
    [
      user.id,
      realName,
      university,
      (body.program || "").trim().slice(0, 128) || null,
      (body.proofNote || "").trim().slice(0, 2000) || null,
    ],
  );

  return NextResponse.json({ ok: true, request: result.rows[0] });
}

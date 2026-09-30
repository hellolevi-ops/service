import { NextRequest, NextResponse } from "next/server";
import { resolveOpsAuth } from "@/lib/auth/staff";
import { query, withTransaction } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await resolveOpsAuth(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get("status") || "pending";
  const result = await query<{
    id: string;
    user_id: string;
    real_name: string;
    university: string;
    program: string | null;
    proof_note: string | null;
    status: string;
    created_at: string;
    mobile: string;
    nickname: string | null;
  }>(
    `SELECT v.id, v.user_id, v.real_name, v.university, v.program, v.proof_note, v.status, v.created_at,
            u.mobile, u.nickname
     FROM verification_requests v
     JOIN users u ON u.id = v.user_id
     WHERE ($1 = 'all' OR v.status = $1)
     ORDER BY v.created_at DESC
     LIMIT 100`,
    [status],
  );
  return NextResponse.json({
    ok: true,
    requests: result.rows.map((r) => ({
      ...r,
      mobile: r.mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
    })),
  });
}

export async function PATCH(req: NextRequest) {
  const auth = await resolveOpsAuth(req);
  if (!auth.ok || !auth.staff) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (auth.staff.role === "editor") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    id?: string;
    decision?: "approved" | "rejected";
    reviewerNote?: string;
  };
  if (!body.id || !["approved", "rejected"].includes(body.decision || "")) {
    return NextResponse.json({ ok: false, error: "参数错误" }, { status: 400 });
  }

  const staffId =
    auth.via === "key" || auth.staff.id.startsWith("00000000")
      ? null
      : auth.staff.id;

  try {
    await withTransaction(async (client) => {
      const cur = await client.query<{ user_id: string; status: string }>(
        `SELECT user_id, status FROM verification_requests WHERE id = $1 FOR UPDATE`,
        [body.id],
      );
      const row = cur.rows[0];
      if (!row) {
        const err = new Error("not_found");
        throw err;
      }
      if (row.status !== "pending") {
        throw new Error("already_reviewed");
      }

      await client.query(
        `UPDATE verification_requests SET
           status = $2,
           reviewer_note = $3,
           reviewed_by = $4,
           reviewed_at = now(),
           updated_at = now()
         WHERE id = $1`,
        [
          body.id,
          body.decision,
          (body.reviewerNote || "").slice(0, 1000) || null,
          staffId,
        ],
      );

      if (body.decision === "approved") {
        await client.query(
          `UPDATE users SET level = 'L2', role_tag = 'enrolled', updated_at = now() WHERE id = $1`,
          [row.user_id],
        );
      }
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg === "not_found") {
      return NextResponse.json({ ok: false, error: "申请不存在" }, { status: 404 });
    }
    if (msg === "already_reviewed") {
      return NextResponse.json({ ok: false, error: "已审核" }, { status: 400 });
    }
    throw err;
  }

  return NextResponse.json({ ok: true });
}

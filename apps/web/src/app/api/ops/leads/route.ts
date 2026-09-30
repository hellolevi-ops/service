import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { LEAD_STATUSES, maskMobile, type LeadStatus } from "@/lib/ops-auth";
import { resolveOpsAuth } from "@/lib/auth/staff";

export const dynamic = "force-dynamic";

type LeadRow = {
  id: string;
  name: string;
  mobile: string;
  wechat: string | null;
  track: string;
  status: string;
  form_variant: string;
  source_url: string | null;
  landing_slug: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  event_slug: string | null;
  lab_tool: string | null;
  preferred_advisor_id: string | null;
  assigned_advisor_id: string | null;
  next_follow_up_at: string | null;
  first_contact_at: string | null;
  invalid_reason: string | null;
  merge_count: number;
  guardian_name: string | null;
  created_at: string;
  updated_at: string;
};

export async function GET(req: NextRequest) {
  const auth = await resolveOpsAuth(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sp = req.nextUrl.searchParams;
  const status = sp.get("status") || "";
  const track = sp.get("track") || "";
  const q = (sp.get("q") || "").trim();
  const reveal = sp.get("reveal") === "1";
  const limit = Math.min(Number(sp.get("limit") || 50), 200);
  const offset = Math.max(Number(sp.get("offset") || 0), 0);

  const clauses: string[] = ["honeypot_hit = false"];
  const params: unknown[] = [];

  if (status && LEAD_STATUSES.includes(status as LeadStatus)) {
    params.push(status);
    clauses.push(`status = $${params.length}`);
  }
  if (track) {
    params.push(track);
    clauses.push(`track = $${params.length}`);
  }
  if (q) {
    params.push(`%${q}%`);
    const i = params.length;
    clauses.push(
      `(name ILIKE $${i} OR mobile ILIKE $${i} OR wechat ILIKE $${i} OR coalesce(landing_slug,'') ILIKE $${i})`,
    );
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  params.push(limit, offset);

  const result = await query<LeadRow>(
    `SELECT id, name, mobile, wechat, track, status, form_variant,
            source_url, landing_slug, utm_source, utm_medium, utm_campaign,
            event_slug, lab_tool, preferred_advisor_id, assigned_advisor_id,
            next_follow_up_at, first_contact_at, invalid_reason, merge_count,
            guardian_name, created_at, updated_at
     FROM leads
     ${where}
     ORDER BY created_at DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params,
  );

  const countParams = params.slice(0, -2);
  const count = await query<{ c: string }>(
    `SELECT count(*)::text AS c FROM leads ${where}`,
    countParams,
  );

  const leads = result.rows.map((row) => ({
    ...row,
    mobile: reveal ? row.mobile : maskMobile(row.mobile),
    mobile_full: reveal,
  }));

  return NextResponse.json({
    ok: true,
    total: Number(count.rows[0]?.c || 0),
    leads,
  });
}

export async function PATCH(req: NextRequest) {
  const auth = await resolveOpsAuth(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    id?: string;
    status?: string;
    note?: string;
    nextFollowUpAt?: string | null;
    invalidReason?: string | null;
    assignedAdvisorId?: string | null;
  };

  if (!body.id) {
    return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });
  }

  if (body.status && !LEAD_STATUSES.includes(body.status as LeadStatus)) {
    return NextResponse.json({ ok: false, error: "invalid status" }, { status: 400 });
  }

  const sets: string[] = ["updated_at = now()"];
  const params: unknown[] = [body.id];

  if (body.status) {
    params.push(body.status);
    sets.push(`status = $${params.length}`);
    if (body.status !== "new") {
      sets.push(`first_contact_at = coalesce(first_contact_at, now())`);
    }
  }
  if (body.nextFollowUpAt !== undefined) {
    params.push(body.nextFollowUpAt || null);
    sets.push(`next_follow_up_at = $${params.length}`);
  }
  if (body.invalidReason !== undefined) {
    params.push(body.invalidReason || null);
    sets.push(`invalid_reason = $${params.length}`);
  }
  if (body.assignedAdvisorId !== undefined) {
    params.push(body.assignedAdvisorId || null);
    sets.push(`assigned_advisor_id = $${params.length}`);
  }

  await query(`UPDATE leads SET ${sets.join(", ")} WHERE id = $1`, params);

  if (body.note?.trim()) {
    await query(
      `INSERT INTO lead_notes (lead_id, body) VALUES ($1, $2)`,
      [body.id, body.note.trim().slice(0, 4000)],
    );
  }

  const notes = await query<{ id: string; body: string; created_at: string }>(
    `SELECT id, body, created_at FROM lead_notes WHERE lead_id = $1 ORDER BY created_at DESC LIMIT 20`,
    [body.id],
  );

  return NextResponse.json({ ok: true, notes: notes.rows });
}

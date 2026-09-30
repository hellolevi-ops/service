import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { maskMobile } from "@/lib/ops-auth";
import { resolveOpsAuth } from "@/lib/auth/staff";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await resolveOpsAuth(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const reveal = req.nextUrl.searchParams.get("reveal") === "1";
  const actor =
    req.headers.get("x-ops-actor") ||
    auth.staff?.email ||
    "ops";

  if (reveal && auth.staff?.role === "editor") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const result = await query<{
    id: string;
    name: string;
    mobile: string;
    wechat: string | null;
    track: string;
    status: string;
    form_variant: string;
    utm_source: string | null;
    utm_campaign: string | null;
    landing_slug: string | null;
    created_at: string;
  }>(
    `SELECT id, name, mobile, wechat, track, status, form_variant,
            utm_source, utm_campaign, landing_slug, created_at
     FROM leads
     WHERE honeypot_hit = false
     ORDER BY created_at DESC
     LIMIT 2000`,
  );

  await query(
    `CREATE TABLE IF NOT EXISTS lead_export_logs (
       id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
       actor varchar(128) NOT NULL,
       row_count int NOT NULL,
       reveal_full boolean NOT NULL DEFAULT false,
       created_at timestamptz NOT NULL DEFAULT now()
     )`,
  );
  await query(
    `INSERT INTO lead_export_logs (actor, row_count, reveal_full) VALUES ($1, $2, $3)`,
    [actor.slice(0, 128), result.rows.length, reveal],
  );

  const header = [
    "id",
    "name",
    "mobile",
    "wechat",
    "track",
    "status",
    "form_variant",
    "utm_source",
    "utm_campaign",
    "landing_slug",
    "created_at",
  ];
  const lines = [header.join(",")];
  for (const row of result.rows) {
    const vals = [
      row.id,
      row.name,
      reveal ? row.mobile : maskMobile(row.mobile),
      row.wechat || "",
      row.track,
      row.status,
      row.form_variant,
      row.utm_source || "",
      row.utm_campaign || "",
      row.landing_slug || "",
      row.created_at,
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`);
    lines.push(vals.join(","));
  }

  const csv = lines.join("\n");
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${Date.now()}.csv"`,
    },
  });
}

import { NextResponse } from "next/server";
import { getCustomerFromRequest } from "@/lib/auth/customer";
import { query } from "@/lib/db";
import { maskMobile } from "@/lib/ops-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCustomerFromRequest();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // Ensure links exist for this mobile
  await query(
    `INSERT INTO user_lead_links (user_id, lead_id)
     SELECT $1, id FROM leads WHERE mobile = $2 AND honeypot_hit = false
     ON CONFLICT DO NOTHING`,
    [user.id, user.mobile],
  );

  const result = await query<{
    id: string;
    track: string;
    status: string;
    form_variant: string;
    landing_slug: string | null;
    created_at: string;
    mobile: string;
  }>(
    `SELECT l.id, l.track, l.status, l.form_variant, l.landing_slug, l.created_at, l.mobile
     FROM user_lead_links ull
     JOIN leads l ON l.id = ull.lead_id
     WHERE ull.user_id = $1
     ORDER BY l.created_at DESC
     LIMIT 50`,
    [user.id],
  );

  return NextResponse.json({
    ok: true,
    leads: result.rows.map((r) => ({
      id: r.id,
      track: r.track,
      status: r.status,
      form_variant: r.form_variant,
      landing_slug: r.landing_slug,
      created_at: r.created_at,
      mobile: maskMobile(r.mobile),
    })),
  });
}

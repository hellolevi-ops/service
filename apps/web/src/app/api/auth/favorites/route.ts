import { NextRequest, NextResponse } from "next/server";
import { getCustomerFromRequest } from "@/lib/auth/customer";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

const TYPES = new Set(["article", "case", "track", "guide", "university", "service"]);

export async function GET() {
  const user = await getCustomerFromRequest();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const result = await query<{
    id: string;
    target_type: string;
    target_slug: string;
    title: string;
    href: string;
    created_at: string;
  }>(
    `SELECT id, target_type, target_slug, title, href, created_at
     FROM user_favorites WHERE user_id = $1
     ORDER BY created_at DESC LIMIT 100`,
    [user.id],
  );
  return NextResponse.json({ ok: true, favorites: result.rows });
}

export async function POST(req: NextRequest) {
  const user = await getCustomerFromRequest();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as {
    targetType?: string;
    targetSlug?: string;
    title?: string;
    href?: string;
  };
  if (!TYPES.has(body.targetType || "") || !body.targetSlug || !body.title || !body.href) {
    return NextResponse.json({ ok: false, error: "参数不完整" }, { status: 400 });
  }
  if (!body.href.startsWith("/")) {
    return NextResponse.json({ ok: false, error: "非法链接" }, { status: 400 });
  }

  const result = await query(
    `INSERT INTO user_favorites (user_id, target_type, target_slug, title, href)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (user_id, target_type, target_slug) DO UPDATE SET title = EXCLUDED.title, href = EXCLUDED.href
     RETURNING id`,
    [
      user.id,
      body.targetType,
      body.targetSlug.slice(0, 128),
      body.title.slice(0, 256),
      body.href.slice(0, 512),
    ],
  );
  return NextResponse.json({ ok: true, id: result.rows[0].id });
}

export async function DELETE(req: NextRequest) {
  const user = await getCustomerFromRequest();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const sp = req.nextUrl.searchParams;
  const targetType = sp.get("targetType") || "";
  const targetSlug = sp.get("targetSlug") || "";
  if (!TYPES.has(targetType) || !targetSlug) {
    return NextResponse.json({ ok: false, error: "参数不完整" }, { status: 400 });
  }
  await query(
    `DELETE FROM user_favorites WHERE user_id = $1 AND target_type = $2 AND target_slug = $3`,
    [user.id, targetType, targetSlug],
  );
  return NextResponse.json({ ok: true });
}

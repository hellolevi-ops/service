import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

function authorized(secret: string | null) {
  return !!secret && secret === process.env.REVALIDATE_SECRET;
}

const COLLECTION_TAG: Record<string, string> = {
  articles: "cms:articles",
  cases: "cms:cases",
  advisors: "cms:advisors",
  events: "cms:events",
  tracks: "cms:tracks",
  playbooks: "cms:playbooks",
  settings: "cms:settings",
};

/** Manual: GET /api/revalidate?secret=&tag=cms:articles */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const tag = req.nextUrl.searchParams.get("tag") || "cms:articles";
  if (!authorized(secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag(tag);
  return NextResponse.json({ ok: true, tag });
}

/**
 * Directus Flow / webhook:
 * POST /api/revalidate  Authorization: Bearer <REVALIDATE_SECRET>
 * body: { collection?: string, tag?: string }
 */
export async function POST(req: NextRequest) {
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || null;
  const headerSecret = req.headers.get("x-revalidate-secret");
  const secret = bearer || headerSecret;
  if (!authorized(secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let collection = "";
  let tag = "";
  try {
    const body = (await req.json()) as {
      collection?: string;
      tag?: string;
      keys?: string[];
    };
    collection = body.collection || "";
    tag = body.tag || COLLECTION_TAG[collection] || (collection ? `cms:${collection}` : "cms:articles");
  } catch {
    tag = "cms:articles";
  }

  revalidateTag(tag);
  // Also refresh sibling tags commonly used together
  if (collection === "articles") revalidateTag("cms:articles");
  return NextResponse.json({ ok: true, tag, collection: collection || null });
}

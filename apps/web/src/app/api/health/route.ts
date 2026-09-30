import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, string> = { web: "ok" };

  try {
    await query("SELECT 1");
    checks.postgres = "ok";
  } catch {
    checks.postgres = "fail";
  }

  try {
    const redis = getRedis();
    if (redis.status !== "ready") await redis.connect();
    const pong = await redis.ping();
    checks.redis = pong === "PONG" ? "ok" : "fail";
  } catch (err) {
    checks.redis = "mock";
  }

  if (process.env.DIRECTUS_URL) {
    try {
      const res = await fetch(`${process.env.DIRECTUS_URL}/server/health`, { cache: "no-store" });
      checks.directus = res.ok ? "ok" : "fail";
    } catch {
      checks.directus = "offline";
    }
  } else {
    checks.directus = "skipped";
  }

  const ok = checks.web === "ok" && (checks.postgres === "ok" || checks.postgres === "mock");
  return NextResponse.json({ ok, checks, ts: new Date().toISOString() }, { status: ok ? 200 : 503 });
}

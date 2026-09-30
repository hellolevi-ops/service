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
  } catch {
    checks.redis = "fail";
  }

  try {
    const url = process.env.DIRECTUS_URL || "http://127.0.0.1:8055";
    const res = await fetch(`${url}/server/health`, { cache: "no-store" });
    checks.directus = res.ok ? "ok" : "fail";
  } catch {
    checks.directus = "fail";
  }

  const ok = Object.values(checks).every((v) => v === "ok");
  return NextResponse.json({ ok, checks, ts: new Date().toISOString() }, { status: ok ? 200 : 503 });
}

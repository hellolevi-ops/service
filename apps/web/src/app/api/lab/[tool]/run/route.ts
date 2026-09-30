import { NextRequest, NextResponse } from "next/server";
import { runAssessment, runTimeline } from "@/lib/lab";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ tool: string }> },
) {
  const { tool } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as Record<string, string>;

  let result;
  if (tool === "assessment") {
    result = runAssessment({
      track: body.track || "undecided",
      gpaBand: body.gpaBand || "80-85",
      language: body.language || "ready",
      timeline: body.timeline || "6-12m",
      goal: body.goal || "",
    });
  } else if (tool === "timeline") {
    result = runTimeline({
      track: body.track || "uk-pg",
      targetTerm: body.targetTerm || "2027 Fall",
    });
  } else {
    return NextResponse.json({ ok: false, error: "请选择站内提供的工具" }, { status: 404 });
  }

  try {
    await query(
      `INSERT INTO lab_sessions (tool, input_json, result_json) VALUES ($1, $2::jsonb, $3::jsonb)`,
      [tool, JSON.stringify(body), JSON.stringify(result)],
    );
  } catch {
    // non-fatal for P0 tool UX
  }

  return NextResponse.json({ ok: true, result });
}

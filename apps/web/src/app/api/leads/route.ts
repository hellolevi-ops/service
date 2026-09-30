import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/leads";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const requestId =
    req.headers.get("x-request-id")?.trim() ||
    `ld_${randomUUID().replace(/-/g, "").slice(0, 16)}`;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "请提交有效的 JSON 格式", requestId },
      { status: 400, headers: { "x-request-id": requestId } },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = req.headers.get("user-agent") || undefined;

  try {
    const result = await createLead(body, { ip, userAgent, requestId });
    if (result.status === 204) {
      return new NextResponse(null, {
        status: 204,
        headers: { "x-request-id": requestId },
      });
    }
    return NextResponse.json(result.body, {
      status: result.status,
      headers: { "x-request-id": requestId },
    });
  } catch (err) {
    console.error("[leads]", {
      requestId,
      message: err instanceof Error ? err.message : "error",
    });
    return NextResponse.json(
      { ok: false, error: "服务正在恢复，请稍后重试", requestId },
      { status: 500, headers: { "x-request-id": requestId } },
    );
  }
}

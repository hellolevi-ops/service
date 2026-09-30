"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { LabResultPanel } from "@/components/domain/LabResultPanel";
import type { LabResult } from "@/lib/lab";
import { TRACK_OPTIONS } from "@/lib/site";
import { track } from "@/lib/analytics";

export default function TimelineToolPage() {
  const [result, setResult] = useState<LabResult | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    track("lab_tool_start", { tool: "timeline" });
    const res = await fetch("/api/lab/timeline/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        track: fd.get("track"),
        targetTerm: fd.get("targetTerm"),
      }),
    });
    const json = (await res.json()) as { ok: boolean; result: LabResult };
    if (json.ok) {
      setResult(json.result);
      track("lab_tool_complete", { tool: "timeline" });
    }
  }

  return (
    <div className="container section lab-surface">
      <h1 className="display" style={{ fontSize: "2rem" }}>
        申请时间轴生成器
      </h1>
      <form onSubmit={onSubmit} style={{ maxWidth: "28rem" }}>
        <div className="field">
          <label htmlFor="track">方向</label>
          <select id="track" name="track" defaultValue="hk-sg">
            {TRACK_OPTIONS.filter((t) => t.slug !== "undecided").map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="targetTerm">目标入学学期</label>
          <input id="targetTerm" name="targetTerm" defaultValue="2027 Fall" />
        </div>
        <button type="submit" className="btn btn-primary">
          生成骨架
        </button>
      </form>
      {result ? (
        <>
          <LabResultPanel result={result} />
          <Link href="/book" className="btn btn-secondary" style={{ marginTop: "1rem" }}>
            节点冲突？预约评估
          </Link>
        </>
      ) : null}
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { LabResultPanel } from "@/components/domain/LabResultPanel";
import type { LabResult } from "@/lib/lab";
import { TRACK_OPTIONS } from "@/lib/site";
import { track } from "@/lib/analytics";

export function AssessmentTool() {
  const [result, setResult] = useState<LabResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    track("lab_tool_start", { tool: "assessment" });
    setLoading(true);
    try {
      const res = await fetch("/api/lab/assessment/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: fd.get("track"),
          gpaBand: fd.get("gpaBand"),
          language: fd.get("language"),
          timeline: fd.get("timeline"),
          goal: fd.get("goal"),
        }),
      });
      const json = (await res.json()) as { ok: boolean; result: LabResult };
      if (json.ok) {
        setResult(json.result);
        track("lab_tool_complete", { tool: "assessment" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} style={{ maxWidth: "28rem" }}>
        <div className="field">
          <label htmlFor="track">意向方向</label>
          <select id="track" name="track" defaultValue="uk-pg">
            {TRACK_OPTIONS.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="gpaBand">均分 / GPA 区间</label>
          <select id="gpaBand" name="gpaBand" defaultValue="80-85">
            <option value="below-75">&lt; 75 / 偏低</option>
            <option value="75-80">75–80</option>
            <option value="80-85">80–85</option>
            <option value="85-plus">85+</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="language">语言成绩</label>
          <select id="language" name="language" defaultValue="ready">
            <option value="ready">已达标或接近</option>
            <option value="not-ready">尚未准备</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="timeline">距目标入学</label>
          <select id="timeline" name="timeline" defaultValue="6-12m">
            <option value="lt-3m">&lt; 3 个月</option>
            <option value="3-6m">3–6 个月</option>
            <option value="6-12m">6–12 个月</option>
            <option value="12m-plus">12 个月以上</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="goal">一句话目标（选填）</label>
          <input id="goal" name="goal" placeholder="如：申英研金融" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "计算中…" : "查看结果"}
        </button>
      </form>

      {result ? (
        <>
          <LabResultPanel result={result} />
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <Link
              href="/book"
              className="btn btn-secondary"
              onClick={() => track("lab_ask_advisor_click", { tool: "assessment" })}
            >
              预约解读（可选）
            </Link>
            <Link href="/lab/playbooks/uk-pg-shuangfei-tiering" className="btn btn-secondary">
              继续 DIY Playbook
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

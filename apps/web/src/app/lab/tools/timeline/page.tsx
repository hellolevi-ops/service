"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { LabResultPanel } from "@/components/domain/LabResultPanel";
import type { LabResult } from "@/lib/lab";
import { TRACK_OPTIONS } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Calendar, ArrowRight, Clock, ChevronRight } from "lucide-react";

export default function TimelineToolPage() {
  const [result, setResult] = useState<LabResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    track("lab_tool_start", { tool: "timeline" });
    setLoading(true);
    try {
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Editorial Header */}
      <div className="page-banner">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <Link href="/lab" className="hover:text-slate-900 transition-colors">
            申请决策工具箱
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-medium">时间轴倒推工具</span>
        </div>
        <span className="page-banner__chip">
          申请节点倒排推演
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          目标学年申请节奏与关键里程碑倒排
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          基于全球主流大学开放网申、分轮截止与审理周期，科学推导语言备考、文书定本与院校递交的关键时间窗口。
        </p>
      </div>

      {/* Generator Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-2xl">
        <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-editorial-title">
              推演基本参数
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              选择目标赛道与入学学期，生成全周期筹备倒计时
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label htmlFor="track" className="block font-semibold text-slate-700">
              目标留学赛道 / 地区
            </label>
            <select
              id="track"
              name="track"
              defaultValue="hk-sg"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
            >
              {TRACK_OPTIONS.filter((t) => t.slug !== "undecided").map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="targetTerm" className="block font-semibold text-slate-700">
              目标入学学期
            </label>
            <input
              id="targetTerm"
              name="targetTerm"
              defaultValue="2027 Fall"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
              placeholder="例如：2027 Fall 或 2026 Spring"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <span>{loading ? "正在推算节点..." : "一键生成申请时间骨架"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </form>
      </div>

      {result && <LabResultPanel result={result} />}
    </div>
  );
}

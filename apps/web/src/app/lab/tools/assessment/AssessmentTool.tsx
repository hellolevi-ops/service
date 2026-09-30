"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { LabResultPanel } from "@/components/domain/LabResultPanel";
import type { LabResult } from "@/lib/lab";
import { TRACK_OPTIONS } from "@/lib/site";
import { track } from "@/lib/analytics";
import { ArrowRight, Calculator, CheckCircle2, RotateCcw } from "lucide-react";

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
    <div className="space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-2xl">
        <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-editorial-title">
              名校录取梯队即时自测
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              30 秒填写学术背景，依据官方名单政策即时推演梯度
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label htmlFor="track" className="block font-semibold text-slate-700">
              目标留学赛道 / 地区
            </label>
            <select
              id="track"
              name="track"
              defaultValue="uk-pg"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
            >
              {TRACK_OPTIONS.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="gpaBand" className="block font-semibold text-slate-700">
                当前平时均分 / GPA 区间
              </label>
              <select
                id="gpaBand"
                name="gpaBand"
                defaultValue="80-85"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
              >
                <option value="below-75">&lt; 75 / 均分偏低需策略突围</option>
                <option value="75-80">75–80 分</option>
                <option value="80-85">80–85 分 (核心稳健档)</option>
                <option value="85-plus">85+ 分 (高均分冲刺档)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="language" className="block font-semibold text-slate-700">
                外语标化准备进度
              </label>
              <select
                id="language"
                name="language"
                defaultValue="ready"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
              >
                <option value="ready">已达标或接近目标分数 (如雅思 6.5+/托福 95+)</option>
                <option value="not-ready">准备阶段 / 计划语言成绩后补递交</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="timeline" className="block font-semibold text-slate-700">
                距期望入学时间
              </label>
              <select
                id="timeline"
                name="timeline"
                defaultValue="6-12m"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
              >
                <option value="lt-3m">&lt; 3 个月 (第一轮加急抢跑)</option>
                <option value="3-6m">3–6 个月 (当季申请黄金窗口)</option>
                <option value="6-12m">6–12 个月 (长线背景提升关键期)</option>
                <option value="12m-plus">12 个月以上 (早鸟从容规划)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="goal" className="block font-semibold text-slate-700">
                目标专业与核心诉求（选填）
              </label>
              <input
                id="goal"
                name="goal"
                placeholder="如：申英港计算机 / 美本商科"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? "正在测算中…" : "开始智能梯队测算"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </form>
      </div>

      {result ? (
        <div className="space-y-4 max-w-3xl">
          <LabResultPanel result={result} />
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/book"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-xs"
              onClick={() => track("lab_ask_advisor_click", { tool: "assessment" })}
            >
              <span>预约导师深度解读该测算方案</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
            <Link
              href="/lab/playbooks/uk-pg-shuangfei-tiering"
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              查阅双非突围 Playbook
            </Link>
            <button
              type="button"
              onClick={() => setResult(null)}
              className="px-3 py-2.5 text-xs text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1 ml-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新测算</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

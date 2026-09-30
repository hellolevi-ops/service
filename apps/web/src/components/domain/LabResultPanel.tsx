"use client";

import Link from "next/link";
import type { LabResult } from "@/lib/lab";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Compass,
  FileText,
  Info,
  Sparkles,
} from "lucide-react";

export function LabResultPanel({ result }: { result: LabResult }) {
  return (
    <div className="mt-8 space-y-6 animate-in fade-in duration-300">
      {/* Summary Highlight Box */}
      <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>算法推演核心结论 · ASSESSMENT SUMMARY</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold font-editorial-title leading-snug">
          {result.summary}
        </h3>
        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>推演口径：{result.assumptions}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* DIY Next Steps */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 font-editorial-title">
              自主准备建议 (DIY Action Items)
            </h4>
          </div>
          <ol className="space-y-3 text-xs text-slate-600">
            {result.diyNext.map((x, idx) => (
              <li key={x} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{x}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Advisor Intervention Signals */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 font-editorial-title">
              专业学术介入预警信号
            </h4>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            {result.askAdvisorSignals.map((x) => (
              <li key={x} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <span className="leading-relaxed">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-600 space-y-0.5 text-center sm:text-left">
          <strong className="text-slate-900 block font-semibold">自测结果需要专家复核？</strong>
          <span>免费预约对口学科博导初诊，针对您填写的均分与赛道给出深度选校建议。</span>
        </div>
        <Link
          href="/book"
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>预约专家免费复核</span>
        </Link>
      </div>
    </div>
  );
}

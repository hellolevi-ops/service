"use client";

import { CheckCircle2, Clock, FileCheck2 } from "lucide-react";

export function ProcessTimeline({
  steps,
}: {
  steps: { title: string; detail: string; deliverable: string; duration: string }[];
}) {
  return (
    <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 my-6 space-y-8 pl-6 sm:pl-8">
      {steps.map((step, i) => (
        <div key={step.title} className="relative group">
          {/* Step Number Dot */}
          <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-white border-2 border-slate-900 group-hover:border-amber-500 group-hover:bg-amber-50 transition-all flex items-center justify-center text-xs font-bold text-slate-900 shadow-xs">
            {i + 1}
          </div>

          {/* Card Body */}
          <div className="bg-white border border-slate-200 group-hover:border-slate-300 p-5 sm:p-6 rounded-2xl shadow-xs transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-editorial-title">
                {step.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 self-start sm:self-auto font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>预计耗时：{step.duration}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {step.detail}
            </p>

            <div className="flex items-start sm:items-center gap-2 text-xs bg-slate-50/80 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-slate-700">
              <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <span className="font-semibold text-slate-900">核心交付物：</span>
                <span className="text-slate-600">{step.deliverable}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

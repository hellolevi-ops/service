"use client";

import Link from "next/link";
import { ArrowRight, Award, Users } from "lucide-react";
import type { AdvisorItem } from "@/data/catalog";
import { AdvisorPortrait } from "@/components/home/AdvisorPortrait";

export function AdvisorCard({ advisor }: { advisor: AdvisorItem }) {
  return (
    <article className="bg-white border border-slate-200 p-5 sm:p-6 rounded-xl hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--line)]"><AdvisorPortrait name={advisor.name} compact /></div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-editorial-title">
                  <Link href={`/advisors/${advisor.id}`}>{advisor.name}</Link>
                </h3>
                {advisor.acceptingAppointments ? (
                  <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">
                    可预约初诊
                  </span>
                ) : null}
              </div>
              <span className="text-xs font-semibold text-slate-600 block mt-0.5">
                {advisor.title}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-base font-bold text-slate-900 font-editorial-title block tabular-nums">
              {advisor.experienceYears} 年
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider block">
              带教资历
            </span>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 mb-3 text-xs space-y-1">
          <div className="text-slate-800 font-medium flex items-start gap-1.5 leading-snug">
            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>{advisor.academicBackground}</span>
          </div>
          <div className="text-slate-500 pl-5">研究领域：{advisor.researchFocus}</div>
        </div>

        <blockquote className="text-xs text-slate-600 border-l-2 border-amber-400 pl-3 py-1 my-3 leading-relaxed font-serif">
          &ldquo;{advisor.consultationPhilosophy}&rdquo;
        </blockquote>

        <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 mb-4 text-xs text-slate-600 flex items-start gap-2">
          <Users className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-800 font-medium">家长协同：</strong>
            {advisor.parentSyncMethod}
          </span>
        </div>
      </div>

      {advisor.acceptingAppointments ? (
        <Link
          href={`/book?advisor=${advisor.id}`}
          className="w-full py-2.5 text-center text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>指定该导师进行初诊</span>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </Link>
      ) : (
        <button
          type="button"
          className="w-full py-2.5 text-center text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed"
          disabled
        >
          本周期名额已满
        </button>
      )}
    </article>
  );
}

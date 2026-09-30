"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, ShieldAlert } from "lucide-react";
import type { CaseStudyItem } from "@/data/catalog";
import { OfferBadgeVisual } from "@/components/home/VisualAssets";

export function CaseStudyCard({ item }: { item: CaseStudyItem }) {
  return (
    <article className="bg-white border border-slate-200 p-5 sm:p-6 rounded-xl hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="font-semibold text-slate-900">{item.trackName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-500">{item.enrollmentYear} 录取</span>
          </div>
          <OfferBadgeVisual />
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-editorial-title leading-snug">
          <Link href={`/cases/${item.slug}`}>{item.admitUniversity}</Link>
        </h3>
        <span className="text-xs text-slate-600 block mt-1 mb-3 font-medium">
          {item.admitProgram}
        </span>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 mb-3 text-xs space-y-1">
          <div className="text-slate-600">
            <span className="text-slate-400 mr-1.5">原始背景：</span>
            <span className="text-slate-800 font-medium">{item.undergradProfile}</span>
          </div>
          <div className="text-slate-600 flex items-center justify-between gap-2">
            <span>
              <span className="text-slate-400 mr-1.5">GPA：</span>
              <span className="font-mono font-medium text-slate-900">{item.gpa}</span>
            </span>
            <span>
              <span className="text-slate-400 mr-1.5">标化：</span>
              <span className="font-mono font-medium text-slate-900">{item.testScores}</span>
            </span>
          </div>
        </div>

        <div className="mb-3 space-y-1">
          <div className="text-[11px] font-semibold text-rose-700 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            申请卡点与难点
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.hardBottlenecks}
          </p>
        </div>

        <div className="mb-4 space-y-1">
          <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            青藤导师破局策略
          </div>
          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
            {item.strategicInsight}
          </p>
        </div>
      </div>

      <Link
        href={`/cases/${item.slug}`}
        className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-blue-900 transition-colors"
      >
        <span>查阅完整案例复盘</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

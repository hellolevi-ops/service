"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, ShieldAlert } from "lucide-react";
import type { CaseStudyItem } from "@/data/catalog";

export function CaseStudyCard({ item }: { item: CaseStudyItem }) {
  return (
    <article className="bg-white border academic-hairline p-5 sm:p-6 rounded-sm hover:border-[#92400E] transition-all shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b academic-hairline text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#92400E] bg-[#F5F2EB] px-2 py-0.5 rounded-xs">
              {item.trackName}
            </span>
            <span className="text-[#78716C] font-mono">{item.enrollmentYear}</span>
          </div>
          <span className="text-[#44403C] font-medium bg-[#EDE7DC]/70 px-2 py-0.5 rounded-xs">
            {item.backgroundGrade}
          </span>
        </div>

        <h3 className="text-lg font-serif-title font-bold text-[#1C1917] leading-snug">
          {item.admitUniversity}
        </h3>
        <span className="text-xs text-[#78716C] block mt-0.5 mb-3 font-medium">
          {item.admitProgram}
        </span>

        <div className="bg-[#FBF9F5] p-3 rounded-xs border academic-hairline mb-3 text-xs space-y-1">
          <div className="text-[#57534E]">
            <span className="text-[#A8A29E] mr-1.5">原始背景：</span>
            {item.undergradProfile}
          </div>
          <div className="text-[#57534E] flex items-center justify-between gap-2">
            <span>
              <span className="text-[#A8A29E] mr-1.5">GPA：</span>
              <span className="font-mono font-medium text-[#1C1917]">{item.gpa}</span>
            </span>
            <span>
              <span className="text-[#A8A29E] mr-1.5">标化：</span>
              <span className="font-mono font-medium text-[#1C1917]">{item.testScores}</span>
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-[11px] font-semibold text-[#DC2626] uppercase tracking-wider mb-1 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            核心申请难点
          </div>
          <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed">
            {item.hardBottlenecks}
          </p>
        </div>

        <div className="mb-4">
          <div className="text-[11px] font-semibold text-[#059669] uppercase tracking-wider mb-1 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            青藤研判破局解法
          </div>
          <p className="text-xs text-[#44403C] line-clamp-2 leading-relaxed font-serif-title">
            {item.strategicInsight}
          </p>
        </div>
      </div>

      <Link
        href={`/cases/${item.slug}`}
        className="pt-3 border-t academic-hairline flex items-center justify-between text-xs text-[#92400E] font-medium"
      >
        <span>查看完整复盘</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </article>
  );
}

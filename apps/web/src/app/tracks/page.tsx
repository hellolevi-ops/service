import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { VERTICAL_TRACKS } from "@/data/boyan";

export const metadata = { title: "留学国家与赛道" };

export default function TracksIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          DESTINATIONS · 留学国家与垂直赛道
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          想去哪里留学？五大垂直赛道深耕
        </h1>
        <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed">
          英美港新低龄艺术，按国家与学段拆解录取逻辑、均分门槛与规划节奏。拒绝三十国流水线，只做吃透的赛道。
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {VERTICAL_TRACKS.map((track) => (
          <article
            key={track.id}
            className="bg-white border academic-hairline p-6 rounded-sm hover:border-[#92400E] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#EDE7DC] text-[#78350F] rounded-xs">
                  {track.badge}
                </span>
                <span className="text-[10px] text-[#059669] font-medium">2026申请中</span>
              </div>
              <h2 className="text-lg font-serif-title font-bold text-[#1C1917] mb-2">
                {track.name}
              </h2>
              <p className="text-[11px] text-[#78716C] font-mono mb-3">{track.subtitle}</p>
              <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3 mb-4">
                {track.overview}
              </p>
              <div className="space-y-1.5 text-xs text-[#78716C] border-t academic-hairline pt-3">
                <div className="flex justify-between gap-2">
                  <span className="shrink-0">建议均分</span>
                  <span className="text-[#1C1917] font-medium text-right truncate">
                    {track.scoreBenchmark.split("，")[0]}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="shrink-0">费用区间</span>
                  <span className="text-[#92400E] font-medium text-right line-clamp-1">
                    {track.costRange.split("（")[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5 pt-4 border-t academic-hairline">
              <Link
                href={`/tracks/${track.slug}`}
                className="flex-1 py-2 text-center text-xs font-semibold border academic-hairline rounded-xs hover:bg-[#F5F2EB] inline-flex items-center justify-center gap-1"
              >
                查看方案
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/book?track=${track.id}`}
                className="flex-1 py-2 text-center text-xs font-semibold bg-[#92400E] hover:bg-[#78350F] text-white rounded-xs inline-flex items-center justify-center gap-1"
              >
                咨询导师
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-[#FAF8F5] border academic-hairline rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-title font-bold text-[#1C1917] text-lg">还不确定国家？</h3>
          <p className="text-xs text-[#78716C] mt-1">先查全球名校库 List 政策，或预约 15 分钟背景评估。</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/universities"
            className="px-4 py-2 text-xs font-semibold border academic-hairline rounded-xs hover:bg-white"
          >
            全球名校库
          </Link>
          <Link
            href="/book"
            className="px-4 py-2 text-xs font-semibold bg-[#1C1917] text-white rounded-xs"
          >
            免费评估
          </Link>
        </div>
      </div>
    </div>
  );
}

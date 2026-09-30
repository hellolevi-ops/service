import Link from "next/link";
import { ArrowRight, ChevronRight, Compass } from "lucide-react";
import { VERTICAL_TRACKS } from "@/data/catalog";

export const metadata = {
  title: "留学国家与垂直规划赛道",
  description: "英国G5、美本常春藤、港新公立、艺术作品集与低龄高中全赛道深度规划与申请指南。",
};

export default function TracksIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="page-banner">
        <span className="page-banner__chip">留学国家与垂直赛道</span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          主流名校留学方向与申请规程
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          英美港新及全球艺术名校。按国家招考机制、内部认可名单（List）与学段特征精细化拆解，坚持量身定制，深耕每一条专属赛道。
        </p>
      </div>

      {/* Grid of Track Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VERTICAL_TRACKS.map((track) => (
          <article
            key={track.id}
            className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="px-2.5 py-0.5 font-semibold bg-slate-100 text-slate-700 rounded-md">
                  {track.badge}
                </span>
                <span className="text-emerald-700 font-medium text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  2026/2027 规划中
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-editorial-title mb-1">
                {track.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono mb-3">{track.subtitle}</p>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {track.overview}
              </p>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3.5 bg-slate-50/50 -mx-6 px-6 -mb-2 pb-2">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-400 shrink-0">均分建议：</span>
                  <span className="text-slate-800 font-medium text-right truncate">
                    {track.scoreBenchmark.split("，")[0]}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-400 shrink-0">费用参考：</span>
                  <span className="text-slate-900 font-semibold text-right line-clamp-1">
                    {track.costRange.split("（")[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100">
              <Link
                href={`/tracks/${track.slug}`}
                className="flex-1 py-2 text-center text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 inline-flex items-center justify-center gap-1 transition-colors"
              >
                <span>方案解析</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href={`/book?track=${track.id}`}
                className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg inline-flex items-center justify-center gap-1 transition-colors shadow-xs"
              >
                <span>咨询导师</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Cross Navigation Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h3 className="font-editorial-title font-bold text-white text-lg">
              仍在权衡留学目的地？
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            可查阅全球名校库与各院系认可名单（List），或预约 15 分钟专家初步诊断。
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/universities"
            className="px-4 py-2.5 text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl transition-colors"
          >
            查全球名校库
          </Link>
          <Link
            href="/book"
            className="px-5 py-2.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 !text-slate-950 rounded-xl transition-colors shadow-sm"
          >
            免费预约评估
          </Link>
        </div>
      </div>
    </div>
  );
}

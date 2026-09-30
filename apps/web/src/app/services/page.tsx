"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass } from "lucide-react";
import { SERVICE_LINES } from "@/data/catalog";

export default function ServicesPage() {
  const [tab, setTab] = useState("all");
  const list = useMemo(
    () => SERVICE_LINES.filter((s) => tab === "all" || s.id === tab),
    [tab],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="page-banner">
        <span className="page-banner__chip">全案规划服务体系</span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          青藤国际服务体系与透明收费标准
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          坚持清晰报价，所有服务均在合同中明确价格与范围。每一项服务均以书面形式明确适合对象、导师师资配置、具体核心交付物及退费规则，签约前明明白白。
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        <TabBtn active={tab === "all"} onClick={() => setTab("all")} label="全部服务全景" />
        {SERVICE_LINES.map((s) => (
          <TabBtn
            key={s.id}
            active={tab === s.id}
            onClick={() => setTab(s.id)}
            label={s.name}
          />
        ))}
      </div>

      {/* Service Cards */}
      <div className="space-y-8">
        {list.map((srv, idx) => (
          <article
            key={srv.id}
            id={srv.id}
            className="bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 font-mono mr-2">
                  0{idx + 1}. {srv.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-slate-900 inline">
                  {srv.name}
                </h2>
                <span className="text-xs text-slate-500 block mt-1">{srv.subname}</span>
              </div>
              <Link
                href={`/book?track=${srv.id}`}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
              >
                <span>咨询该项目</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 text-sm">适合对象</h3>
                <p className="text-slate-600 leading-relaxed">{srv.targetAudience}</p>
                <h3 className="font-semibold text-slate-900 text-sm pt-2">更适合其他路径的需求</h3>
                <p className="text-slate-600 leading-relaxed flex items-start gap-1.5">
                  <Compass className="w-4 h-4 text-[var(--brand)] shrink-0 mt-0.5" />
                  <span>{srv.notForAudience}</span>
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 text-sm">带教理念与流程</h3>
                <p className="text-slate-600 leading-relaxed">{srv.philosophy}</p>
                <p className="text-slate-500 pt-1">
                  <strong className="text-slate-700">导师师生配比：</strong>
                  {srv.mentorRatio}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-900 mb-3">核心书面交付物</h3>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                {srv.deliverables.map((d) => (
                  <div
                    key={d}
                    className="flex items-start gap-2 bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-500">收费机制：</span>
                <span className="text-slate-900 font-semibold ml-1">{srv.pricingLogic}</span>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/services/${srv.slug === "compare" ? "compare" : srv.slug}`}
                  className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                >
                  方案详情
                </Link>
                <Link
                  href="/process-fees"
                  className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                >
                  流程与费用
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
        active
          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
          : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200 hover:text-slate-900"
      }`}
    >
      {label}
    </button>
  );
}

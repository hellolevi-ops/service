"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { SERVICE_LINES } from "@/data/catalog";

export default function ServicesPage() {
  const [tab, setTab] = useState("all");
  const list = useMemo(
    () => SERVICE_LINES.filter((s) => tab === "all" || s.id === tab),
    [tab],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          SERVICE PACKAGES & FEES · 服务项目与费用标准
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          青藤国际服务项目与收费标准
        </h1>
        <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed">
          拒绝任何隐形加价与模糊承诺。每一项服务均清晰列明适合人群、导师配置、具体书面交付物以及正规退费规则，签约前明明白白。
        </p>
      </div>

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

      <div className="space-y-10">
        {list.map((srv) => (
          <article
            key={srv.id}
            id={srv.id}
            className="bg-white border academic-hairline p-6 sm:p-10 rounded-sm shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b academic-hairline gap-3">
              <div>
                <span className="text-xs font-semibold text-[#92400E] font-mono mr-2">
                  {srv.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917] inline">
                  {srv.name}
                </h2>
                <span className="text-xs text-[#78716C] block mt-1">{srv.subname}</span>
              </div>
              <Link
                href={`/book?track=${srv.id}`}
                className="px-4 py-2.5 bg-[#92400E] hover:bg-[#78350F] text-white text-xs font-semibold rounded-xs inline-flex items-center gap-1.5 shrink-0"
              >
                咨询该服务
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <h3 className="font-semibold text-[#1C1917]">适合谁</h3>
                <p className="text-[#57534E] leading-relaxed">{srv.targetAudience}</p>
                <h3 className="font-semibold text-[#1C1917] pt-2">不适合谁</h3>
                <p className="text-[#57534E] leading-relaxed flex items-start gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                  {srv.notForAudience}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-[#1C1917]">服务哲学</h3>
                <p className="text-[#57534E] leading-relaxed">{srv.philosophy}</p>
                <p className="text-[#78716C]">导师配比：{srv.mentorRatio}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-[#1C1917] mb-3">核心书面交付物</h3>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                {srv.deliverables.map((d) => (
                  <div
                    key={d}
                    className="flex items-start gap-1.5 bg-[#FBF9F5] border academic-hairline rounded-xs p-2.5 text-[#44403C]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t academic-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[#78716C]">定价机制：</span>
                <span className="text-[#92400E] font-semibold ml-1">{srv.pricingLogic}</span>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/services/${srv.slug === "compare" ? "compare" : srv.slug}`}
                  className="px-3 py-2 border academic-hairline rounded-xs hover:bg-[#F5F2EB] font-medium"
                >
                  查看详情页
                </Link>
                <Link
                  href="/process-fees"
                  className="px-3 py-2 border academic-hairline rounded-xs hover:bg-[#F5F2EB] font-medium"
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
      className={`px-4 py-2 rounded-xs transition-colors ${
        active
          ? "bg-[#1C1917] text-white font-medium"
          : "bg-[#F5F2EB] text-[#57534E] hover:bg-[#EDE7DC]"
      }`}
    >
      {label}
    </button>
  );
}

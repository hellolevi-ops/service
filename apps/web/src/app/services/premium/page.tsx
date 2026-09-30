import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Compass, ArrowRight } from "lucide-react";
import { SERVICE_LINES } from "@/data/catalog";
import { LeadForm } from "@/components/domain/LeadForm";

export const metadata = { title: "精品战略咨询" };

export default function PremiumPage() {
  const srv = SERVICE_LINES.find((s) => s.id === "premium");
  if (!srv) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="page-banner">
        <p className="text-xs text-slate-500 mb-2">
          <Link href="/services" className="hover:text-blue-900">
            服务项目
          </Link>{" "}
          / {srv.name}
        </p>
        <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
          {srv.badge}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title mt-2">
          {srv.name}
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-1">{srv.subname}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-xs">
        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
          <span className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5">
            <CheckCircle2 className="w-4 h-4" /> 适合人群
          </span>
          <p className="text-emerald-900 leading-relaxed">{srv.targetAudience}</p>
        </div>
        <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200">
          <span className="font-bold text-rose-800 flex items-center gap-1.5 mb-1.5">
            <Compass className="w-4 h-4" /> 更适合其他路径的需求
          </span>
          <p className="text-rose-900 leading-relaxed">{srv.notForAudience}</p>
        </div>
      </div>

      <section className="space-y-3 text-sm text-slate-600">
        <h2 className="text-lg font-bold text-slate-900 font-editorial-title">带教理念</h2>
        <p className="leading-relaxed">{srv.philosophy}</p>
        <p className="text-xs text-slate-500">导师配比：{srv.mentorRatio}</p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 font-editorial-title mb-3">
          核心书面交付物
        </h2>
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {srv.deliverables.map((d) => (
            <div
              key={d}
              className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-snug">{d}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
        <strong className="text-amber-700">定价逻辑：</strong>
        <span className="text-slate-600 ml-1">{srv.pricingLogic}</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/book"
          className="px-5 py-2.5 bg-amber-400 !text-slate-950 text-xs font-bold rounded-xl inline-flex items-center gap-1"
        >
          {srv.ctaText}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/services/compare"
          className="px-5 py-2.5 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl"
        >
          对照其他服务线
        </Link>
        <Link
          href="/process-fees"
          className="px-5 py-2.5 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl"
        >
          流程与费用
        </Link>
      </div>

      <LeadForm variant="short" />
    </div>
  );
}

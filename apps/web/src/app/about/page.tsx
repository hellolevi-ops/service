import Link from "next/link";
import { SITE } from "@/lib/site";
import { ArrowRight, ShieldCheck, CheckCircle2, Phone } from "lucide-react";

export const metadata = { title: "关于我们" };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          ABOUT · 关于我们
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          {SITE.brand}
        </h1>
        <p className="text-sm text-[#78716C] font-mono mt-1">{SITE.brandEn}</p>
        <p className="text-sm text-[#57534E] mt-4 leading-relaxed">{SITE.support}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white border academic-hairline rounded-sm p-4">
          <ShieldCheck className="w-5 h-5 text-[#D97706] mb-2" />
          <strong className="text-[#1C1917] block mb-1">拒绝模板代写</strong>
          <span className="text-[#78716C]">海外名校导师亲授，文书满意定稿。</span>
        </div>
        <div className="bg-white border academic-hairline rounded-sm p-4">
          <CheckCircle2 className="w-5 h-5 text-[#059669] mb-2" />
          <strong className="text-[#1C1917] block mb-1">账号 100% 自持</strong>
          <span className="text-[#78716C]">网申密码学生掌握，进度可查。</span>
        </div>
        <div className="bg-white border academic-hairline rounded-sm p-4">
          <Phone className="w-5 h-5 text-[#F59E0B] mb-2" />
          <strong className="text-[#1C1917] block mb-1">15 分钟响应</strong>
          <span className="text-[#78716C]">工作日人工首触，热线 {SITE.phone}。</span>
        </div>
      </div>

      <ul className="space-y-3 text-sm">
        <li>
          <Link href="/about/trust" className="text-[#92400E] font-semibold inline-flex items-center gap-1">
            信任与主体信息 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </li>
        <li>
          <Link href="/about/contact" className="text-[#92400E] font-semibold inline-flex items-center gap-1">
            联系我们 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </li>
        <li>
          <Link href="/process-fees" className="text-[#92400E] font-semibold inline-flex items-center gap-1">
            流程与费用 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </li>
        <li>
          <Link href="/services/compare" className="text-[#92400E] font-semibold inline-flex items-center gap-1">
            青藤 vs 传统中介 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

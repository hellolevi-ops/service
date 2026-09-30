import Link from "next/link";
import { SITE } from "@/lib/site";
import { ShieldCheck, Mail, Phone, Scale, ArrowRight } from "lucide-react";

export const metadata = { title: "信任与合规" };

export default function TrustPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
          TRUST & COMPLIANCE
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title">
          信任与主体信息
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          {SITE.brand}坚持实事求是：不做包录、不虚构成功率、不用恐吓倒计时促销。
        </p>
      </div>

      <ul className="space-y-4 text-sm text-slate-700">
        <li className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
          <Scale className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block">经营主体</strong>
            <span className="text-slate-600">北京青藤学术咨询交流有限公司（工商注册名可按实际上线替换）</span>
          </div>
        </li>
        <li className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block">备案与公示</strong>
            <span className="text-slate-600">{SITE.icpText}</span>
          </div>
        </li>
        <li className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
          <Mail className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block">投诉 / 监督邮箱</strong>
            <a href={`mailto:${SITE.complaintEmail}`} className="text-blue-900 font-medium">
              {SITE.complaintEmail}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
          <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block">顾问更换</strong>
            <span className="text-slate-600">
              评估后 7 日内可书面申请更换导师；说明见服务方案与合同附件。
            </span>
          </div>
        </li>
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link href="/privacy" className="text-xs font-semibold text-blue-900 inline-flex items-center gap-1">
          隐私政策 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/terms" className="text-xs font-semibold text-blue-900 inline-flex items-center gap-1">
          服务条款 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/disclaimer" className="text-xs font-semibold text-blue-900 inline-flex items-center gap-1">
          免责声明 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/about/contact" className="text-xs font-semibold text-blue-900 inline-flex items-center gap-1">
          联系我们 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

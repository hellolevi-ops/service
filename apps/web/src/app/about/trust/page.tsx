import Link from "next/link";
import { SITE } from "@/lib/site";
import { ShieldCheck, Mail, Phone, Scale, ArrowRight, CheckCircle2, Lock } from "lucide-react";

export const metadata = {
  title: "信任与合规承诺 · 青藤国际",
  description: "坚持实事求是：不做虚假包录、不虚构成功率、不用倒计时恐吓营销。",
};

export default function TrustPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
          TRUST & COMPLIANCE · 信任资质与合规承诺
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
          主体资质与合规治理承诺
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          {SITE.brand}恪守学术敬畏与商业伦理：不借“招生官内推关系”名义虚构保录承诺、不隐匿网申密码、拒签退费条款书面载明。
        </p>
      </div>

      {/* Compliance List */}
      <div className="space-y-4 text-xs sm:text-sm text-slate-700">
        <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <strong className="text-slate-900 text-sm block font-semibold">法定经营主体与正规资质</strong>
            <p className="text-slate-600 leading-relaxed text-xs">
              北京青藤学术咨询交流有限公司（依法注册并纳税，签署教育部范本留学咨询服务合同）。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-amber-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <strong className="text-slate-900 text-sm block font-semibold">官方备案与公示</strong>
            <p className="text-slate-600 leading-relaxed text-xs">
              增值电信业务经营许可与网站合规备案号：{SITE.icpText}。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <strong className="text-slate-900 text-sm block font-semibold">数据安全与隐私保护</strong>
            <p className="text-slate-600 leading-relaxed text-xs">
              严格遵循《个人信息保护法》。所有成绩单与文书绝不外泄给第三方营销平台，网申密码由学员全权自持。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-blue-600 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <strong className="text-slate-900 text-sm block font-semibold">独立学术督导与投诉监督通道</strong>
            <p className="text-slate-600 leading-relaxed text-xs">
              设立独立学术监督委员会，服务期内若对带教导师不满意，可无障碍申请更换或调解：
              <a href={`mailto:${SITE.complaintEmail}`} className="text-slate-900 font-semibold underline ml-1">
                {SITE.complaintEmail}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Cross Links */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 text-xs font-semibold">
        <Link href="/privacy" className="text-slate-900 hover:text-blue-900 inline-flex items-center gap-1">
          隐私权政策 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/terms" className="text-slate-900 hover:text-blue-900 inline-flex items-center gap-1">
          服务条款 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/disclaimer" className="text-slate-900 hover:text-blue-900 inline-flex items-center gap-1">
          免责声明 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link href="/about/contact" className="text-slate-900 hover:text-blue-900 inline-flex items-center gap-1">
          线下联系方式 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

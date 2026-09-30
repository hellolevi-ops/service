import Link from "next/link";
import { SITE } from "@/lib/site";
import { ArrowRight, ShieldCheck, CheckCircle2, Phone, Compass, Award, Users } from "lucide-react";

export const metadata = {
  title: "关于我们 · 青藤国际",
  description: "青藤国际留学服务平台，专注英美港新名校申请规划、海外名校博导1对1带教与真实录取案卷库。",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="page-banner">
        <span className="page-banner__chip">关于青藤国际</span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          专注名校学术带教的留学战略智库
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">{SITE.brandEn}</p>
        <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed max-w-3xl">
          {SITE.support} 青藤国际由多位英美名校海归学者共同创立，坚持“学者带教、学术立身、全案透明”三大立命准则，重构国内留学咨询服务体验。
        </p>
      </div>

      {/* 3 Core Value Pillars */}
      <div className="grid sm:grid-cols-3 gap-6 text-xs">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-3">
            <Award className="w-5 h-5" />
          </div>
          <strong className="text-slate-900 text-sm block font-semibold">坚持原创定制与导师亲授</strong>
          <p className="text-slate-600 leading-relaxed">
            由海外名校同专业硕博导师亲自操刀学术选题与文书构思，全文由学员满意签字后方可定稿。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <strong className="text-slate-900 text-sm block font-semibold">网申账号 100% 学生自持</strong>
          <p className="text-slate-600 leading-relaxed">
            官方网申系统账号、登录密码与留存邮箱完全向学员与家长公开，所有申请节点系统留痕。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-3">
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <strong className="text-slate-900 text-sm block font-semibold">导师年限额深度带教</strong>
          <p className="text-slate-600 leading-relaxed">
            严格控制单导师带教学员在 6–8 人以内，保证每位学员都有导师的充分精力与持续跟进。
          </p>
        </div>
      </div>

      {/* Directory of Links */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-slate-900 font-editorial-title">
          了解更多青藤国际官方政策与规程
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <Link
            href="/about/trust"
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between font-semibold text-slate-800"
          >
            <span>主体资质与信任承诺</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/process-fees"
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between font-semibold text-slate-800"
          >
            <span>标准化流程与收费边界</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/services/compare"
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between font-semibold text-slate-800"
          >
            <span>青藤国际 vs 传统中介对比</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/about/contact"
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between font-semibold text-slate-800"
          >
            <span>线下办事处与联系方式</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

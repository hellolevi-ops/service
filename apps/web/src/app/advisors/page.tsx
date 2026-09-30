import Link from "next/link";
import { ShieldCheck, Users, Award, ArrowRight } from "lucide-react";
import { ADVISORS } from "@/data/catalog";
import { AdvisorCard } from "@/components/catalog/AdvisorCard";

export const metadata = {
  title: "学术导师团队",
  description: "汇聚牛津、剑桥、常春藤、港前三及新加坡公立名校海归博士团队，坚持学科对口1对1带教。",
};

export default function AdvisorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="page-banner">
        <span className="page-banner__chip">海外名校学术导师团队</span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          全球顶尖名校海归硕博导师团队
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          青藤国际导师团队均拥有英国G5、美国常春藤、港前三或海外对口顶尖院校硕博学位与一线学术研究资历。坚持专业对口、年限带教，全程由导师本人负责。
        </p>
      </div>

      {/* 3 Core Principles */}
      <div className="grid sm:grid-cols-3 gap-5 text-xs">
        <Principle
          icon={<Award className="w-5 h-5 text-amber-600" />}
          title="学科对口 1对1 带教"
          body="严格根据学员申请院系与学科匹配同专业海归导师，保持专业对口，确保学术深度与专业把关。"
        />
        <Principle
          icon={<Users className="w-5 h-5 text-emerald-600" />}
          title="家长全程透明协同"
          body="定期双周进度备忘录与三方沟通研讨，申请进展与阶段性决策关键节点向学员及家庭全透明开放。"
        />
        <Principle
          icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
          title="保障机制与督导监管"
          body="完备的服务考核与学术督导巡检制度，支持依据服务合同约定申请更换导师，保障申请顺畅。"
        />
      </div>

      {/* Advisors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {ADVISORS.map((a) => (
          <AdvisorCard key={a.id} advisor={a} />
        ))}
      </div>

      {/* Bottom CTA Block */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-white">
            想找到最匹配的导师？
          </h2>
          <p className="text-sm text-slate-400">
            填写您的学术背景与目标院校，学术督导将在 15 分钟内为您精准引荐对口专业导师。
          </p>
        </div>
        <Link
          href="/book"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 !text-slate-950 text-xs font-bold rounded-xl shrink-0 transition-colors shadow-sm flex items-center gap-2"
        >
          <span>预约免费智能匹配</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Principle({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-3 shadow-xs">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div className="space-y-1">
        <strong className="text-slate-900 block font-semibold text-sm">{title}</strong>
        <p className="text-slate-600 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

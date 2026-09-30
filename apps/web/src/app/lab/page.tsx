import Link from "next/link";
import {
  Calculator,
  Calendar,
  CheckSquare,
  DollarSign,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Compass,
} from "lucide-react";
import { PRACTICE_PLAYBOOKS } from "@/data/catalog";

export const metadata = {
  title: "申请决策工具箱 · Practice Lab",
  description: "基于 2026/2027 官方录取规程。名校录取概率自测、留学总开销计算器与材料核对清单。",
};

const TOOLS = [
  {
    href: "/lab/tools/assessment",
    title: "名校录取概率快速自测",
    desc: "输入院校层次、GPA与目标国家，30秒推演冲刺/核心/保底三阶梯队。",
    icon: Calculator,
    badge: "热门自测",
  },
  {
    href: "/lab/tools/cost",
    title: "留学总费用与预算粗算器",
    desc: "英美港新主流大学学费、学生公寓租房与生活费开销实时测算。",
    icon: DollarSign,
    badge: "2026数据",
  },
  {
    href: "/lab/tools/checklist",
    title: "申请材料核对清单 (Checklist)",
    desc: "成绩单、英文在读证明、学术推荐信、资金证明逐项核对与留痕。",
    icon: CheckSquare,
    badge: "必备核对",
  },
  {
    href: "/lab/tools/timeline",
    title: "申请时间轴倒推工具",
    desc: "根据目标入学学年倒推背景提升、标化考试、文书定稿与网申节点。",
    icon: Calendar,
    badge: "规划工具",
  },
  {
    href: "/lab/when-to-ask",
    title: "何时需要寻求专业顾问介入",
    desc: "客观评估自身申请的 DIY 复杂度、关键卡点风险与专业带教介入时机。",
    icon: HelpCircle,
    badge: "理性评估",
  },
];

export default function LabHomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="page-banner">
        <span className="page-banner__chip">免费申请决策工具箱</span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
          名校申请自研决策工具箱
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          基于全球主流大学 2026/2027 官方最新招考政策与名单标准。打开即用、数据口径公开透明、按需留资。
        </p>
      </div>

      {/* Tools Bento Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <t.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {t.badge}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-900 font-editorial-title transition-colors">
                {t.title}
              </h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.desc}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-blue-900">
              <span>立即使用工具</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Practical Playbooks Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-slate-900 font-editorial-title">
              Playbook · 名校申请实战作战手册
            </h2>
          </div>
          <span className="text-xs text-slate-500">博导团队多年实战经验沉淀</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {PRACTICE_PLAYBOOKS.map((p) => (
            <Link
              key={p.slug}
              href={`/lab/playbooks/${p.slug}`}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded-md">
                  {p.category}
                </span>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-900 transition-colors mt-2">
                  {p.title}
                </h3>
              </div>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-400">
                <span>{p.readTime}</span>
                <span className="text-slate-700 font-medium group-hover:text-blue-900 flex items-center gap-1">
                  阅读手册 <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cross Section CTA */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h3 className="font-editorial-title font-bold text-white text-xl">
              需要专家协助复核您的自测结果？
            </h3>
          </div>
          <p className="text-sm text-slate-400">
            预约 1对1 免费初诊，由名校博导为您深度分析文书选题与内部认可名单（List）突围策略。
          </p>
        </div>
        <Link
          href="/book"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 !text-slate-950 text-xs font-bold rounded-xl shrink-0 transition-colors shadow-sm"
        >
          免费预约专家解读
        </Link>
      </div>
    </div>
  );
}

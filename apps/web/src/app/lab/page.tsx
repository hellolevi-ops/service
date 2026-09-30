import Link from "next/link";
import {
  Calculator,
  Calendar,
  CheckSquare,
  DollarSign,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { PRACTICE_PLAYBOOKS } from "@/data/catalog";

export const metadata = { title: "免费决策工具箱" };

const TOOLS = [
  {
    href: "/lab/tools/assessment",
    title: "名校录取概率快速自测",
    desc: "输入背景与意向，30秒看冲刺/核心/保底梯队",
    icon: Calculator,
  },
  {
    href: "/lab/tools/cost",
    title: "留学总费用预算粗算器",
    desc: "英美港新学费、住宿与生活费总开销估算",
    icon: DollarSign,
  },
  {
    href: "/lab/tools/checklist",
    title: "申请材料核对清单",
    desc: "成绩单、推荐信、存款证明逐项打勾",
    icon: CheckSquare,
  },
  {
    href: "/lab/tools/timeline",
    title: "申请时间轴倒推",
    desc: "按目标入学季生成关键节点骨架",
    icon: Calendar,
  },
  {
    href: "/lab/when-to-ask",
    title: "何时需要找顾问",
    desc: "诚实判断 DIY 天花板与介入时机",
    icon: HelpCircle,
  },
];

export default function LabHomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
          PRACTICE LAB · 免费决策工具箱
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
          不用找中介，先用工具测一测
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl">
          基于 2026/2027 官方规程与名单标准。结果前不锁表单；不做伪录取率承诺。
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-900 mb-3 group-hover:bg-blue-50">
              <t.icon className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-900">
              {t.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.desc}</p>
          </Link>
        ))}
      </div>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl font-bold text-slate-900 font-editorial-title">
            Playbook 实战手册
          </h2>
        </div>
        <ul className="space-y-2">
          {PRACTICE_PLAYBOOKS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/lab/playbooks/${p.slug}`}
                className="block bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-300"
              >
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                  {p.category}
                </span>
                <span className="block text-sm font-medium text-slate-800 mt-1.5">{p.title}</span>
                <span className="text-[11px] text-slate-500">{p.readTime}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

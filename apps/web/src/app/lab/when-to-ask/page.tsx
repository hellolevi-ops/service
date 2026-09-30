import Link from "next/link";
import { PRACTICE_PLAYBOOKS } from "@/data/catalog";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = { title: "何时需要找顾问" };

export default function WhenToAskPage() {
  const signals = PRACTICE_PLAYBOOKS.flatMap((p) => p.whenAdvisorNeeded).slice(0, 9);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <p className="text-xs text-slate-500 mb-2">
          <Link href="/lab" className="hover:text-blue-900">
            Practice Lab
          </Link>{" "}
          / 何时需要顾问
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title">
          诚实判断：何时该找顾问介入
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          我们鼓励 DIY 到天花板。以下信号出现时，继续硬扛往往浪费申请季窗口。
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        本页不做恐吓倒计时，也不暗示「不找顾问就一定失败」。目标是帮你节省试错成本。
      </div>

      <ul className="space-y-2">
        {signals.map((s) => (
          <li
            key={s}
            className="flex items-start gap-2 bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            {s}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/book"
          className="px-5 py-2.5 bg-amber-400 !text-slate-950 text-xs font-bold rounded-xl inline-flex items-center gap-1"
        >
          预约免费评估 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/lab/tools/assessment"
          className="px-5 py-2.5 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl"
        >
          先做录取概率自测
        </Link>
        <Link
          href="/services/compare"
          className="px-5 py-2.5 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl"
        >
          对照服务线
        </Link>
      </div>
    </div>
  );
}

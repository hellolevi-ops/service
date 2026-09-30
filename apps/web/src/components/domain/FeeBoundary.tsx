"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { ArrowRight, CheckCircle2, DollarSign, HelpCircle, ShieldCheck, XCircle } from "lucide-react";

export function FeeBoundary() {
  const boundaries = [
    {
      icon: DollarSign,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
      title: "计费逻辑与分档标准",
      detail:
        "按产品线（导师制精品专线 / 全流程精益交付）与申请复杂度分档报价。签约前提供书面确切区间与交付阶段约定，报价全程以书面为准。",
    },
    {
      icon: CheckCircle2,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      title: "学杂与海外就读成本单列",
      detail:
        "学费与海外当地生活费一律依据目标国家官方大学官网核准口径单列，提供最新汇率换算与通胀安全边际参考，预算保持真实稳健。",
    },
    {
      icon: XCircle,
      iconColor: "text-rose-600 bg-rose-50 border-rose-100",
      title: "签约前书面列明另行约定事项 (Exclusions)",
      detail:
        "大学官方网申申请费、雅思/托福考试报名费、签证审理规费、机票与住宿定金由学生自理。青藤国际坚持学生本人完成考试与背景材料，全部按规范流程办理。",
    },
    {
      icon: ShieldCheck,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
      title: "72小时冷静期与退费公约",
      detail:
        "签约后享有 72 小时全额退款冷静期；若已启动服务，按阶段交付备忘单据清算，退费规则白纸黑字入合同，条款公平透明。",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-editorial-title">
            费用边界准则与合规履约承诺
          </h3>
        </div>
        <Link
          href="/book"
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors shadow-xs shrink-0 self-start sm:self-auto"
          onClick={() => track("fee_cta_click", { page: "process-fees" })}
        >
          <span>获取个性化报价清单</span>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {boundaries.map((b) => (
          <div
            key={b.title}
            className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2.5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${b.iconColor}`}
              >
                <b.icon className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">{b.title}</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-11">{b.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

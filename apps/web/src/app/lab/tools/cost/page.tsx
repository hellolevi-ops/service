import { CostCalculator } from "@/components/lab/CostCalculator";
import Link from "next/link";

export const metadata = { title: "留学费用预算粗算器" };

export default function CostToolPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <div className="page-banner">
        <p className="text-xs text-slate-500 mb-1">
          <Link href="/lab" className="hover:text-blue-900">
            Practice Lab
          </Link>{" "}
          / 费用预算
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
          留学总费用预算粗算器
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          基于 2026/2027 学费与生活费区间粗算，结果仅供参考，具体以正式报价为准。
        </p>
      </div>
      <CostCalculator />
    </div>
  );
}

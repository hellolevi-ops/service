import Link from "next/link";
import { WeComDock } from "@/components/domain/WeComDock";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "提交成功" };

export default function ThankYouPage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-7 h-7 text-emerald-600" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
        已收到您的评估申请
      </h1>
      <p className="text-sm text-slate-500 leading-relaxed">
        工作时段我们将在 15 分钟内通过电话或微信首触。您也可先添加企微，把材料截图发过来加速诊断。
      </p>
      <div className="text-left">
        <WeComDock placement="inline" />
      </div>
      <div className="flex flex-wrap justify-center gap-3 text-xs">
        <Link href="/" className="px-4 py-2 border border-slate-200 rounded-xl font-semibold">
          返回首页
        </Link>
        <Link href="/cases" className="px-4 py-2 border border-slate-200 rounded-xl font-semibold">
          浏览案例
        </Link>
        <Link
          href="/lab/tools/assessment"
          className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold"
        >
          做录取概率自测
        </Link>
      </div>
    </div>
  );
}

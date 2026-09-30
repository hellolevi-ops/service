import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = { title: "免责声明" };

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <div className="page-banner">
        <p className="text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-900">
            首页
          </Link>{" "}
          / 法律文本
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
          免责声明
        </h1>
        <p className="text-xs text-slate-500 mt-2">最近更新：2026-09-28</p>
      </div>
      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          本站案例、录取播报、费用区间与政策解读均为脱敏示例或公开信息整理，不构成录取概率保证，亦不构成投资或法律意见。
        </p>
        <p>
          院校招生政策、名单（List）、学费与签证规则可能随时调整。请以学校与使领馆官方最新通告为准。
        </p>
        <p>
          {SITE.brand} 对因第三方系统故障、不可抗力或申请人未如实披露信息造成的延误与损失，在法律允许范围内免责。
        </p>
        <p>
          如有疑问，请通过 {SITE.complaintEmail} 或预约评估与我们沟通。
        </p>
      </div>
    </div>
  );
}

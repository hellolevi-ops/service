import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = { title: "服务条款" };

export default function TermsPage() {
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
          服务条款
        </h1>
        <p className="text-xs text-slate-500 mt-2">最近更新：2026-09-28</p>
      </div>
      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          使用 {SITE.brand} 网站与咨询服务，即表示您理解：免费评估不构成签约；正式服务以书面合同与报价清单为准。
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-2">服务边界</h2>
        <p>
          我们提供升学规划、材料合规辅导与流程管理建议，不代替学校招生决定，不做「包录」承诺，不虚构成功率。
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-2">费用与退费</h2>
        <p>
          签约前明示含项与不含项（考试、公证、签证等第三方规费通常另计）。退费与冷静期以合同条款为准。
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-2">账号与材料</h2>
        <p>
          网申账号密码默认由学生/家庭自持。您需保证提交材料真实合法；因虚假材料导致的后果由申请人自行承担。
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-2">争议解决</h2>
        <p>
          投诉请先联系监督邮箱 {SITE.complaintEmail}。未能协商解决的，按合同约定管辖处理。
        </p>
      </div>
    </div>
  );
}

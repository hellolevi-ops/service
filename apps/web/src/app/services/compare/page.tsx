import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "服务选型对照" };

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
          DECISION MATRIX · 服务选型
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
          青藤国际三线服务对照 · 如何选择
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          移动端可左右滑动查看完整列。签约前充分知情，评估后再决定产品线。
        </p>
      </div>

      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[40rem]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
              <th className="p-3.5 font-bold">考察维度</th>
              <th className="p-3.5 font-bold text-blue-700 bg-blue-50/50">学术导师制精品咨询</th>
              <th className="p-3.5 font-bold">全流程精益交付</th>
              <th className="p-3.5 font-bold text-slate-400">纯 DIY 自助</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {[
              ["主导导师配置", "海外名校博后/博士学者 1v1", "资深规划顾问 + 合规质检双专员", "学生本人完全独立"],
              ["文书产出模式", "学科前沿选题 · 严禁模板与AI套作", "标准化高质量素材深度打磨", "易陷入套路或语法瑕疵"],
              ["单导师带教限额", "每年限 6 人", "每年限 15–20 人", "—"],
              ["家长同步机制", "双周备忘录 + 关键节点三方会", "企微周报 + 7阶节点签字", "依赖学生口头汇报"],
              ["参考价格区间", "5.8万 – 12.8万元", "2.8万 – 5.6万元", "0元服务费（仅官方规费）"],
              ["违约与退费", "72小时冷静期 + 分阶段清算", "72小时冷静期 + 分阶段清算", "自行承担拒信沉没成本"],
            ].map(([k, a, b, c]) => (
              <tr key={k}>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50">{k}</td>
                <td className="p-3.5 text-blue-800 font-semibold bg-blue-50/30">{a}</td>
                <td className="p-3.5">{b}</td>
                <td className="p-3.5 text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h2 className="font-bold text-slate-900 mb-2">更适合精品线，如果…</h2>
          <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
            <li>目标 Top30 / G5 / 博士全奖，需要学者级文书与答辩</li>
            <li>背景有明显卡点（双非 List、跨专业、均分波动）</li>
            <li>希望限量带教、深度一对一</li>
          </ul>
          <Link
            href="/services/premium"
            className="inline-flex items-center gap-1 mt-4 text-blue-900 font-semibold"
          >
            查看精品线详情 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h2 className="font-bold text-slate-900 mb-2">更适合全流程，如果…</h2>
          <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
            <li>家庭需要全程项目管理与家长周报</li>
            <li>多国联合申请、材料合规压力大</li>
            <li>希望节点签字、账号全程自持透明</li>
          </ul>
          <Link
            href="/services/full-cycle"
            className="inline-flex items-center gap-1 mt-4 text-blue-900 font-semibold"
          >
            查看全流程详情 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-300 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-editorial-title">仍不确定选哪条线？</h2>
          <p className="text-sm text-slate-400 mt-1">免费评估后由督导匹配，不强推高价产品线。</p>
        </div>
        <Link
          href="/book"
          className="px-5 py-2.5 bg-amber-400 !text-slate-950 text-sm font-bold rounded-xl"
        >
          评估帮我选
        </Link>
      </div>
    </div>
  );
}

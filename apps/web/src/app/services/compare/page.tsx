import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "服务选型对照矩阵 · 青藤国际 vs 传统中介",
  description: "学术导师制精品咨询 vs 全流程精益交付 vs 传统中介填表套模横向对比，帮助家庭明晰服务边界。",
};

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
          DECISION MATRIX · 服务选型与中介对比
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
          青藤国际服务选型对照 · 如何科学决策
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          签约前充分知情，评估背景卡点后再决定产品线。拒绝虚标承诺，所有师资配置、文书交付与退费规则完全透明。
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[42rem]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
              <th className="p-4 font-bold">评估维度</th>
              <th className="p-4 font-bold text-slate-900 bg-amber-50/50 border-l border-r border-amber-200/50">
                青藤学术导师制精品咨询 (Flagship)
              </th>
              <th className="p-4 font-bold text-slate-900">全流程精益交付 (Full-Cycle)</th>
              <th className="p-4 font-bold text-slate-400">传统批量中介机构</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {[
              [
                "主导导师配置",
                "海外顶尖名校博后/博士学者 1对1 操刀",
                "资深全案规划顾问 + 合规质检双专员",
                "基层销售顾问转包给流水线文书文案",
              ],
              [
                "文书打磨机制",
                "学科前沿选题构思，严禁模板与AI套作",
                "高质量素材深度挖掘，学员反复修改定稿",
                "模板批量套用，甚至对学员隐瞒文书内容",
              ],
              [
                "单导师带教限额",
                "每年严格限额 6–8 人，保证深度与响应",
                "每年限额 15–20 人",
                "人均 50–100 人，后期基本失联",
              ],
              [
                "网申账号自主权",
                "100% 学生与家庭全权自主掌握密码",
                "100% 学生与家庭全权自主掌握密码",
                "中介把持账号密码，学生无法查看官方邮件",
              ],
              [
                "家校同步机制",
                "双周备忘录 + 关键决策节点三方研讨",
                "企微进度周报 + 7 阶关键节点确认签署",
                "无规范同步，全靠学生家长主动反复催问",
              ],
              [
                "违约与退费保障",
                "72小时冷静期 + 正规合同分阶段明确清算",
                "72小时冷静期 + 正规合同分阶段明确清算",
                "合同条款苛刻，拒录往往寻找各种借口扣费",
              ],
            ].map(([k, a, b, c]) => (
              <tr key={k} className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">{k}</td>
                <td className="p-4 text-slate-900 font-semibold bg-amber-50/20 border-l border-r border-amber-200/40">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-700">{b}</td>
                <td className="p-4 text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision Guidance Cards */}
      <div className="grid sm:grid-cols-2 gap-6 text-xs">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
            RECOMMENDED FOR
          </span>
          <h2 className="text-lg font-bold text-slate-900 font-editorial-title">
            更适合选择「学术博导制精品咨询」的情形：
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-1.5" />
              <span>目标全美 Top30、英国 G5 超级精英盟校或海外博士全额奖学金</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-1.5" />
              <span>背景有明显卡点（双非 List 边缘、跨学科申请、GPA 稍弱需科研学术逆袭）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-1.5" />
              <span>家庭高度看重学术导师资质与高频 1对1 深度带教体验</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/services/premium"
              className="inline-flex items-center gap-1.5 text-slate-900 hover:text-blue-900 font-semibold transition-colors"
            >
              <span>查看精品咨询专线详情</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
            RECOMMENDED FOR
          </span>
          <h2 className="text-lg font-bold text-slate-900 font-editorial-title">
            更适合选择「全流程精益交付」的情形：
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-1.5" />
              <span>家庭需要从选校、文书、递交到签证行前的全链条精细化项目管理</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-1.5" />
              <span>多国联申（如英港联申、美澳联申），申请材料繁杂且截止日差异大</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-1.5" />
              <span>追求透明省心、节点清晰签字、账号全权自持的家庭</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/services/full-cycle"
              className="inline-flex items-center gap-1.5 text-slate-900 hover:text-blue-900 font-semibold transition-colors"
            >
              <span>查看全流程交付专线详情</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom CTA Block */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-editorial-title">
            仍不确定哪套方案更契合您的目标？
          </h2>
          <p className="text-sm text-slate-400">
            预约 1对1 初诊，学术督导将根据您的真实背景给出客观配置建议，绝不强推高客单产品。
          </p>
        </div>
        <Link
          href="/book"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 !text-slate-950 text-xs font-bold rounded-xl shrink-0 transition-colors shadow-sm"
        >
          免费帮我评估选型
        </Link>
      </div>
    </div>
  );
}

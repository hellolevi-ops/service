import React, { useState } from 'react';
import { SERVICE_LINES } from '../data/mockData';
import { CheckCircle2, ArrowRight, ShieldCheck, XCircle, Users, FileText, Check } from 'lucide-react';
import { ParentReadableBlock } from '../components/ParentReadableBlock';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { FeeBoundary } from '../components/FeeBoundary';

interface ServicesViewProps {
  initialSubTab?: string;
  onOpenBooking: (advisorId?: string, trackId?: string) => void;
  onOpenWeCom: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  initialSubTab,
  onOpenBooking,
  onOpenWeCom
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState<string>(initialSubTab || 'all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          SERVICE PACKAGES & FEES · 服务项目与费用标准
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          青藤国际服务项目与收费标准
        </h1>
        <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed">
          拒绝任何隐形加价与模糊承诺。每一项服务均清晰列明适合人群、导师配置、具体书面交付物以及正规退费规则，签约前明明白白，保障家长与学子的每一分权益。
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setSelectedSubTab('all')}
          className={`px-4 py-2 rounded-xs transition-colors ${
            selectedSubTab === 'all'
              ? 'bg-[#1C1917] text-white font-medium'
              : 'bg-[#F5F2EB] text-[#57534E] hover:bg-[#EDE7DC]'
          }`}
        >
          全部服务全景
        </button>
        {SERVICE_LINES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSubTab(s.id)}
            className={`px-4 py-2 rounded-xs transition-colors ${
              selectedSubTab === s.id
                ? 'bg-[#1C1917] text-white font-medium'
                : 'bg-[#F5F2EB] text-[#57534E] hover:bg-[#EDE7DC]'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Detailed Service Cards */}
      <div className="space-y-12">
        {SERVICE_LINES.filter(s => selectedSubTab === 'all' || selectedSubTab === s.id).map((srv) => (
          <div 
            key={srv.id}
            id={srv.id}
            className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-10 rounded-sm shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b academic-hairline gap-3">
              <div>
                <span className="text-xs font-semibold text-[#92400E] font-mono mr-2">
                  {srv.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917] inline">
                  {srv.name}
                </h2>
                <span className="text-xs text-[#78716C] block mt-1">
                  {srv.subname}
                </span>
              </div>

              <button
                onClick={() => onOpenBooking(undefined, srv.id)}
                className="px-5 py-2.5 bg-[#1C1917] hover:bg-[#78350F] text-[#FBF9F5] font-semibold text-xs rounded-xs transition-colors self-start sm:self-auto shadow-xs"
              >
                {srv.ctaText}
              </button>
            </div>

            {/* Target vs Not For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F0FDF4]/70 p-4 rounded-xs border border-[#86EFAC]/50">
                <span className="font-semibold text-[#166534] block mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                  适合人群 (Target Demographic)
                </span>
                <p className="text-[#14532D] leading-relaxed">
                  {srv.targetAudience}
                </p>
              </div>

              <div className="bg-[#FEF2F2]/60 p-4 rounded-xs border border-[#FCA5A5]/40">
                <span className="font-semibold text-[#DC2626] block mb-1.5 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-[#DC2626]" />
                  明确不适合人群 (Not Suitable For)
                </span>
                <p className="text-[#991B1B] leading-relaxed">
                  {srv.notForAudience}
                </p>
              </div>
            </div>

            {/* Philosophy & Ratio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#44403C]">
              <div>
                <strong className="text-[#1C1917] block mb-1.5 font-serif-title text-sm">带教理念与指导准则：</strong>
                <p className="leading-relaxed text-[#57534E] font-serif-title">{srv.philosophy}</p>
              </div>
              <div>
                <strong className="text-[#1C1917] block mb-1.5 font-serif-title text-sm">导师配比与工时密度：</strong>
                <p className="leading-relaxed text-[#57534E]">{srv.mentorRatio}</p>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="pt-2">
              <strong className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block mb-3">
                核心书面交付物标准 (Tangible Deliverables)
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {srv.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 bg-[#FBF9F5] p-3 rounded-xs border academic-hairline">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span className="text-[#44403C] leading-snug">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Logic strip */}
            <div className="bg-[#FAF8F5] p-4 rounded-xs border academic-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-[#92400E] mr-2">定价与结算逻辑：</strong>
                <span className="text-[#57534E]">{srv.pricingLogic}</span>
              </div>
              <button
                onClick={onOpenWeCom}
                className="text-[#059669] hover:underline font-medium shrink-0 self-start sm:self-auto"
              >
                企微获取《分项报价单明细》
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Matrix Table (PRD US-SVC-03) */}
      <section className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
        <div className="pb-4 border-b academic-hairline">
          <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
            DECISION MATRIX
          </span>
          <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917]">
            三线服务维度对照评估表
          </h3>
          <p className="text-xs text-[#78716C] mt-1">
            移动端可左右滑动查看完整列 · 签约前充分知情决策
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#FBF9F5] border-b academic-hairline text-[#1C1917]">
                <th className="p-3.5 font-semibold">考察维度</th>
                <th className="p-3.5 font-semibold text-[#92400E]">学术导师制精品咨询</th>
                <th className="p-3.5 font-semibold">全流程精益交付线</th>
                <th className="p-3.5 font-semibold text-[#78716C]">纯 DIY 自助申请</th>
              </tr>
            </thead>
            <tbody className="divide-y academic-hairline text-[#57534E]">
              <tr>
                <td className="p-3.5 font-semibold text-[#1C1917] bg-[#FBF9F5]/40">主导导师配置</td>
                <td className="p-3.5 text-[#92400E] font-medium">海外名校博后/博士学者 1v1</td>
                <td className="p-3.5">资深规划顾问 + 合规质检双专员</td>
                <td className="p-3.5 text-[#78716C]">学生本人完全独立承担</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#1C1917] bg-[#FBF9F5]/40">文书产出模式</td>
                <td className="p-3.5 font-serif-title font-medium text-[#1C1917]">学科前沿选题 · 严禁模板与AI套作</td>
                <td className="p-3.5">标准化高质量素材深度打磨</td>
                <td className="p-3.5 text-[#78716C]">自行构思容易陷入套路或语法瑕疵</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#1C1917] bg-[#FBF9F5]/40">单导师带教限额</td>
                <td className="p-3.5 font-mono font-medium text-[#92400E]">每年限 6 人</td>
                <td className="p-3.5 font-mono">每年限 15–20 人</td>
                <td className="p-3.5 text-[#78716C]">—</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#1C1917] bg-[#FBF9F5]/40">家长同步机制</td>
                <td className="p-3.5">双周备忘录 + 关键节点三方决策会</td>
                <td className="p-3.5">企微周报 + 7阶节点签字确认</td>
                <td className="p-3.5 text-[#78716C]">全靠学生自发向家长口头汇报</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#1C1917] bg-[#FBF9F5]/40">参考价格区间</td>
                <td className="p-3.5 font-mono text-[#92400E] font-medium">5.8万 – 12.8万元</td>
                <td className="p-3.5 font-mono">2.8万 – 5.6万元</td>
                <td className="p-3.5 font-mono text-[#78716C]">0元服务费 (仅官方规费)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#1C1917] bg-[#FBF9F5]/40">违约与退费条款</td>
                <td className="p-3.5">72小时冷静期 + 分阶段里程碑清算</td>
                <td className="p-3.5">72小时冷静期 + 分阶段里程碑清算</td>
                <td className="p-3.5 text-[#78716C]">自行承担全部时间与拒信沉没成本</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Lifecycle and Fee Boundary modules */}
      <ProcessTimeline />
      <FeeBoundary />
      <ParentReadableBlock />
    </div>
  );
};

import React, { useState } from 'react';
import { SERVICE_LINES } from '../data/mockData';
import { CheckCircle2, ArrowRight, ShieldCheck, XCircle, Users, FileText, Check, Layers } from 'lucide-react';
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
      <div className="pb-8 border-b border-slate-200">
        <span className="text-xs font-mono font-semibold text-blue-800 tracking-wider block mb-2">
          PROGRAMS & FEE BOUNDARIES
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight font-editorial-title">
          青藤国际服务体系与收费标准
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          拒绝任何隐形加价与模糊承诺。每一项服务均清晰列明适合人群、导师配置、具体书面交付物以及正规退费规则，签约前明明白白，保障家长与学子的每一分权益。
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setSelectedSubTab('all')}
          className={`px-4 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
            selectedSubTab === 'all'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          全部服务全景
        </button>
        {SERVICE_LINES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSubTab(s.id)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
              selectedSubTab === s.id
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Detailed Service Cards */}
      <div className="space-y-10">
        {SERVICE_LINES.filter(s => selectedSubTab === 'all' || selectedSubTab === s.id).map((srv) => (
          <div 
            key={srv.id}
            id={srv.id}
            className="bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
              <div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 mr-2">
                  {srv.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 inline">
                  {srv.name}
                </h2>
                <span className="text-xs text-slate-500 block mt-1.5">
                  {srv.subname}
                </span>
              </div>

              <button
                onClick={() => onOpenBooking(undefined, srv.id)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors self-start sm:self-auto shadow-xs cursor-pointer"
              >
                {srv.ctaText}
              </button>
            </div>

            {/* Target vs Not For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-800 block mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  适合人群 (Target Demographic)
                </span>
                <p className="text-emerald-900 leading-relaxed">
                  {srv.targetAudience}
                </p>
              </div>

              <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200">
                <span className="font-bold text-rose-800 block mb-1.5 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  明确不适合人群 (Not Suitable For)
                </span>
                <p className="text-rose-900 leading-relaxed">
                  {srv.notForAudience}
                </p>
              </div>
            </div>

            {/* Philosophy & Ratio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-1.5 font-bold text-sm">带教理念与指导准则：</strong>
                <p className="leading-relaxed text-slate-600">{srv.philosophy}</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-1.5 font-bold text-sm">导师配比与工时密度：</strong>
                <p className="leading-relaxed text-slate-600">{srv.mentorRatio}</p>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="pt-2">
              <strong className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                核心书面交付物标准 (Tangible Deliverables)
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {srv.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 leading-snug">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Logic strip */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-amber-700 mr-2 font-semibold">定价与结算逻辑：</strong>
                <span className="text-slate-600">{srv.pricingLogic}</span>
              </div>
              <button
                onClick={onOpenWeCom}
                className="text-blue-600 hover:text-blue-700 hover:underline font-semibold shrink-0 self-start sm:self-auto cursor-pointer"
              >
                企微获取《分项报价单明细》
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Matrix Table */}
      <section className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            DECISION MATRIX
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            三线服务维度对照评估表
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            移动端可左右滑动查看完整列 · 签约前充分知情决策
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-3.5 font-bold">考察维度</th>
                <th className="p-3.5 font-bold text-blue-600 bg-blue-50/50">学术导师制精品咨询 (本案领衔)</th>
                <th className="p-3.5 font-bold">全流程精益交付线</th>
                <th className="p-3.5 font-bold text-slate-400">纯 DIY 自助申请</th>
              </tr>
            </thead>
            <tbody className="divide-y border-slate-100 text-slate-600">
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50">主导导师配置</td>
                <td className="p-3.5 text-blue-700 font-semibold bg-blue-50/30">海外名校博后/博士学者 1v1</td>
                <td className="p-3.5">资深规划顾问 + 合规质检双专员</td>
                <td className="p-3.5 text-slate-400">学生本人完全独立承担</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50">文书产出模式</td>
                <td className="p-3.5 font-semibold text-slate-900 bg-blue-50/30">学科前沿选题 · 严禁模板与AI套作</td>
                <td className="p-3.5">标准化高质量素材深度打磨</td>
                <td className="p-3.5 text-slate-400">自行构思容易陷入套路或语法瑕疵</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50">单导师带教限额</td>
                <td className="p-3.5 font-bold text-blue-700 bg-blue-50/30">每年限 6 人</td>
                <td className="p-3.5">每年限 15–20 人</td>
                <td className="p-3.5 text-slate-400">—</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50">家长同步机制</td>
                <td className="p-3.5 bg-blue-50/30">双周备忘录 + 关键节点三方决策会</td>
                <td className="p-3.5">企微周报 + 7阶节点签字确认</td>
                <td className="p-3.5 text-slate-400">全靠学生自发向家长口头汇报</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50">参考价格区间</td>
                <td className="p-3.5 font-bold text-blue-700 bg-blue-50/30">5.8万 – 12.8万元</td>
                <td className="p-3.5 font-semibold">2.8万 – 5.6万元</td>
                <td className="p-3.5 text-slate-400">0元服务费 (仅官方规费)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50">违约与退费条款</td>
                <td className="p-3.5 bg-blue-50/30">72小时冷静期 + 分阶段里程碑清算</td>
                <td className="p-3.5">72小时冷静期 + 分阶段里程碑清算</td>
                <td className="p-3.5 text-slate-400">自行承担全部时间与拒信沉没成本</td>
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

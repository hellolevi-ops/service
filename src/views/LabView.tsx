import React, { useState } from 'react';
import { PRACTICE_PLAYBOOKS, PlaybookItem } from '../data/mockData';
import { AssessmentTool } from '../components/lab/AssessmentTool';
import { TimelinePlanner } from '../components/lab/TimelinePlanner';
import { ChecklistTool } from '../components/lab/ChecklistTool';
import { CostCalculator } from '../components/lab/CostCalculator';
import { AnswerBlock } from '../components/AnswerBlock';
import { 
  Compass, Calendar, CheckSquare, Calculator, BookOpen, 
  HelpCircle, ArrowRight, ShieldCheck, XCircle, AlertTriangle, CheckCircle2, Wrench 
} from 'lucide-react';

interface LabViewProps {
  initialToolOrPlaybook?: string;
  onOpenBooking: (advisorId?: string, trackId?: string) => void;
  onOpenWeCom: () => void;
}

export const LabView: React.FC<LabViewProps> = ({
  initialToolOrPlaybook,
  onOpenBooking,
  onOpenWeCom
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'playbooks' | 'when-to-ask'>(
    initialToolOrPlaybook && ['assessment', 'timeline', 'checklist', 'cost'].includes(initialToolOrPlaybook)
      ? 'tools'
      : initialToolOrPlaybook
      ? 'playbooks'
      : 'tools'
  );

  const [activeTool, setActiveTool] = useState<string>(
    initialToolOrPlaybook && ['assessment', 'timeline', 'checklist', 'cost'].includes(initialToolOrPlaybook)
      ? initialToolOrPlaybook
      : 'assessment'
  );

  const [activePlaybook, setActivePlaybook] = useState<PlaybookItem | null>(
    initialToolOrPlaybook && !['assessment', 'timeline', 'checklist', 'cost'].includes(initialToolOrPlaybook)
      ? PRACTICE_PLAYBOOKS.find(p => p.slug === initialToolOrPlaybook) || PRACTICE_PLAYBOOKS[0]
      : PRACTICE_PLAYBOOKS[0]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="pb-8 border-b border-slate-200">
        <span className="text-xs font-mono font-semibold text-blue-800 tracking-wider block mb-2">
          DECISION TOOLS & FIELD GUIDES
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight font-editorial-title">
          免费自测工具箱与升学避坑指南
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          测录取概率、算留学总花费、核对申请材料清单、倒排申请时间线。所有自测工具免费开放，数据对标 2026/2027 官方最新标准，让您先自助摸清方向，少走弯路。
        </p>
      </div>

      {/* Primary Navigation Segment */}
      <div className="flex border-b border-slate-200 gap-8 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('tools')}
          className={`pb-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tools'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>核心四大交互工具箱</span>
        </button>

        <button
          onClick={() => setActiveTab('playbooks')}
          className={`pb-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'playbooks'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>6 大实战 Playbook 专著</span>
        </button>

        <button
          onClick={() => setActiveTab('when-to-ask')}
          className={`pb-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'when-to-ask'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>「何时需要顾问介入」决策树</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE TOOLS */}
      {activeTab === 'tools' && (
        <div className="space-y-8">
          {/* Tool Switcher Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <button
              onClick={() => setActiveTool('assessment')}
              className={`p-3.5 text-left border rounded-xl transition-all cursor-pointer flex items-center gap-3 ${
                activeTool === 'assessment'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <div>
                <strong className="block truncate text-sm">01. 背景四维雷达</strong>
                <span className={`text-[11px] block truncate ${activeTool === 'assessment' ? 'text-blue-100' : 'text-slate-400'}`}>量化准入胜算与缺漏</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTool('timeline')}
              className={`p-3.5 text-left border rounded-xl transition-all cursor-pointer flex items-center gap-3 ${
                activeTool === 'timeline'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <div>
                <strong className="block truncate text-sm">02. 18月倒排时间轴</strong>
                <span className={`text-[11px] block truncate ${activeTool === 'timeline' ? 'text-blue-100' : 'text-slate-400'}`}>锁定关键首轮批次</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTool('checklist')}
              className={`p-3.5 text-left border rounded-xl transition-all cursor-pointer flex items-center gap-3 ${
                activeTool === 'checklist'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <CheckSquare className="w-4 h-4 shrink-0" />
              <div>
                <strong className="block truncate text-sm">03. 材料自检清单</strong>
                <span className={`text-[11px] block truncate ${activeTool === 'checklist' ? 'text-blue-100' : 'text-slate-400'}`}>公章与防伪质检</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTool('cost')}
              className={`p-3.5 text-left border rounded-xl transition-all cursor-pointer flex items-center gap-3 ${
                activeTool === 'cost'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Calculator className="w-4 h-4 shrink-0" />
              <div>
                <strong className="block truncate text-sm">04. 留学预算粗算器</strong>
                <span className={`text-[11px] block truncate ${activeTool === 'cost' ? 'text-blue-100' : 'text-slate-400'}`}>学费加生活费透底</span>
              </div>
            </button>
          </div>

          {/* Active Tool Rendering */}
          {activeTool === 'assessment' && (
            <AssessmentTool
              onProceedToBooking={(data) => onOpenBooking(undefined, data.track)}
            />
          )}

          {activeTool === 'timeline' && <TimelinePlanner />}
          {activeTool === 'checklist' && <ChecklistTool />}
          {activeTool === 'cost' && <CostCalculator />}
        </div>
      )}

      {/* TAB 2: PLAYBOOKS REPOSITORY */}
      {activeTab === 'playbooks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left list */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              实战 Playbook 目录 (共 6 篇)
            </span>
            {PRACTICE_PLAYBOOKS.map((pb) => (
              <div
                key={pb.id}
                onClick={() => setActivePlaybook(pb)}
                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                  activePlaybook?.id === pb.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`flex items-center justify-between text-xs mb-1.5 ${activePlaybook?.id === pb.id ? 'text-blue-100' : 'text-slate-400'}`}>
                  <span>{pb.category}</span>
                  <span>{pb.readTime}</span>
                </div>
                <h4 className="text-xs font-bold leading-snug">
                  {pb.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Right reader */}
          {activePlaybook && (
            <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {activePlaybook.category}
                  </span>
                  <span className="text-slate-500 font-medium">{activePlaybook.author}</span>
                  <span className="text-slate-400 ml-auto">{activePlaybook.updatedAt}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {activePlaybook.title}
                </h2>
              </div>

              {/* Target vs Not For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
                  <strong className="text-emerald-800 block mb-1 font-bold">适用对象：</strong>
                  <span className="text-emerald-950">{activePlaybook.targetAudience}</span>
                </div>
                <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-200">
                  <strong className="text-rose-800 block mb-1 font-bold">不适用对象：</strong>
                  <span className="text-rose-950">{activePlaybook.notForAudience}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="text-sm text-slate-600 leading-relaxed">
                {activePlaybook.summary}
              </div>

              {/* Answer Block */}
              <AnswerBlock
                title="Playbook 核心实操结论"
                answer={activePlaybook.answerBlock}
                sourceStamp="青藤国际学术委员会官方教研资产 · 实操指引"
              />

              {/* Key Steps */}
              <div className="space-y-3 pt-2">
                <strong className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  标准化实操步骤清单 (Standard Operational Steps)
                </strong>
                <div className="space-y-2.5 text-xs text-slate-700">
                  {activePlaybook.keySteps.map((ks, kIdx) => (
                    <div key={kIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {ks.step}
                      </span>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">{ks.title}</strong>
                        <p className="text-slate-600 leading-relaxed">{ks.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DIY Ceiling & Critical Signals */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div>
                  <strong className="text-rose-700 block mb-1 flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>DIY 自助申请天花板边界 (DIY Ceiling)</span>
                  </strong>
                  <p className="text-slate-600 leading-relaxed">{activePlaybook.diyCeiling}</p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <strong className="text-amber-800 block mb-1.5 font-bold">建议顾问介入的关键临界信号：</strong>
                  <ul className="space-y-1.5 text-slate-600">
                    {activePlaybook.whenAdvisorNeeded.map((sig, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">!</span>
                        <span>{sig}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">对本篇方法论有疑问？</span>
                <button
                  onClick={() => onOpenBooking()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>预约顾问做针对性答疑</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: WHEN TO SEEK AN ADVISOR DECISION TREE */}
      {activeTab === 'when-to-ask' && (
        <div className="bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl shadow-xs space-y-8">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              HONEST DECISION TREE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              「何时需要专业顾问介入」诚实决策树
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              门槛来自于留学申请本身的专业复杂度，而非人为信息壁垒。如果您完全符合绿色情况，您完全可以自主申请。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Green Zone: When you CAN DIY */}
            <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 space-y-3.5">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>完全建议自主申请 (DIY) 的 4 类情形</span>
              </div>
              <ul className="space-y-2 text-emerald-950 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">1.</span>
                  <span>申请目标明确、硬性绩点 (GPA 3.8+) 与语言分 (托福 110+/雅思 7.5+) 远超目标大学往年中位数。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">2.</span>
                  <span>拥有海外名校学术导师直接提供强推（Strong Endorsement），教授已口头锁定实验室席位。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">3.</span>
                  <span>学生自驱力极强、英文写作功底深厚，且能投入每周 15+ 小时系统研究招生简章。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">4.</span>
                  <span>所选院校为统一录取制、无复杂名单（List）潜规则且先修课完全对口的直系学科。</span>
                </li>
              </ul>
            </div>

            {/* Red Zone: When an Advisor is highly recommended */}
            <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200 space-y-3.5">
              <div className="flex items-center gap-2 text-sm font-bold text-rose-800">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>强烈建议专业学者介入的 4 类临界情形</span>
              </div>
              <ul className="space-y-2 text-rose-950 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-700">1.</span>
                  <span>跨专业大转向或核心专业课均分卡线（如 84–88 分之间），需深度梳理课程大纲与先修对标。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-700">2.</span>
                  <span>冲刺全球前 30 或英 G5，标化分高但在同质化生源池中严重缺乏独特学术主轴。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-700">3.</span>
                  <span>大学成绩单存在不及格、重修记录，或经历重大生病/休学转折，需要合规起草公函说理。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-rose-700">4.</span>
                  <span>学生与家长在升学国家、专业及职业预期上存在重大认知分歧，需要客观第三方进行学术定损。</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-slate-600">
              无论您最终选择 DIY 还是由书院带教，青藤国际均愿为您提供 45 分钟客观免费初诊。
            </span>
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              预约客观学术初诊研判
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { VERTICAL_TRACKS, ADVISORS } from '../data/mockData';
import { AnswerBlock } from '../components/AnswerBlock';
import { NextStops } from '../components/NextStops';
import { 
  Compass, Calendar, Clock, DollarSign, AlertTriangle, 
  CheckCircle2, ArrowRight, UserCheck, HelpCircle, ChevronDown, ChevronUp 
} from 'lucide-react';

interface TracksViewProps {
  initialTrackSlug?: string;
  onOpenBooking: (advisorId?: string, trackId?: string) => void;
  onOpenWeCom: () => void;
  onNavigate: (tab: string, extraSlug?: string) => void;
}

export const TracksView: React.FC<TracksViewProps> = ({
  initialTrackSlug,
  onOpenBooking,
  onOpenWeCom,
  onNavigate
}) => {
  const [activeSlug, setActiveSlug] = useState<string>(initialTrackSlug || 'us-ug');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const activeTrack = VERTICAL_TRACKS.find(t => t.slug === activeSlug) || VERTICAL_TRACKS[0];
  const assignedAdvisor = ADVISORS.find(a => a.id === activeTrack.recommendedAdvisorId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          SPECIALIZED ACADEMIC PATHWAYS
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          五大垂直学科赛道学术研判
        </h1>
        <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed font-serif-title">
          不同赛道招生委员会的考核逻辑截然不同。从美本的全人叙事到英研的先修课名单穿透，我们为每条赛道构建深度的学术策略大纲与风险避雷指南。
        </p>
      </div>

      {/* Track Selector Tabs (Segmented control) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {VERTICAL_TRACKS.map((t) => (
          <button
            key={t.slug}
            onClick={() => {
              setActiveSlug(t.slug);
              setExpandedFaq(0);
            }}
            className={`p-3 text-left border rounded-xs transition-all ${
              activeSlug === t.slug
                ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                : 'bg-[#FFFFFF] text-[#44403C] border-stone-200 hover:bg-[#F5F2EB]'
            }`}
          >
            <span className="text-[10px] font-mono block opacity-60 uppercase">{t.badge}</span>
            <span className="font-semibold block truncate mt-0.5">{t.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Track Details */}
      <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-10 rounded-sm shadow-xs space-y-8">
        {/* Track Title Banner */}
        <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 border-b academic-hairline gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#92400E] bg-[#F5F2EB] px-2.5 py-0.5 rounded-xs">
                {activeTrack.badge}
              </span>
              <span className="text-xs text-[#78716C] font-mono">
                {activeTrack.targetDegree}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917] mt-2">
              {activeTrack.name}
            </h2>
            <span className="text-xs sm:text-sm text-[#78716C] font-medium block mt-0.5">
              {activeTrack.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => onOpenBooking(assignedAdvisor?.id, activeTrack.id)}
              className="px-5 py-2.5 bg-[#1C1917] hover:bg-[#78350F] text-[#FBF9F5] font-semibold text-xs rounded-xs transition-colors shadow-xs"
            >
              预约该赛道专属初诊
            </button>
          </div>
        </div>

        {/* Fact Sheet: Timeline, Score, Cost */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#FBF9F5] p-4 rounded-xs border academic-hairline space-y-1">
            <span className="text-[11px] text-[#A8A29E] flex items-center gap-1 font-semibold uppercase">
              <Clock className="w-3.5 h-3.5 text-[#92400E]" />
              典型申请时间轴
            </span>
            <p className="text-[#1C1917] font-medium leading-relaxed">
              {activeTrack.typicalTimeline}
            </p>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-xs border academic-hairline space-y-1">
            <span className="text-[11px] text-[#A8A29E] flex items-center gap-1 font-semibold uppercase">
              <Compass className="w-3.5 h-3.5 text-[#92400E]" />
              硬性成绩与标化基准
            </span>
            <p className="text-[#1C1917] font-medium leading-relaxed">
              {activeTrack.scoreBenchmark}
            </p>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-xs border academic-hairline space-y-1">
            <span className="text-[11px] text-[#A8A29E] flex items-center gap-1 font-semibold uppercase">
              <DollarSign className="w-3.5 h-3.5 text-[#92400E]" />
              年均总费用预算区间
            </span>
            <p className="text-[#1C1917] font-medium leading-relaxed">
              {activeTrack.costRange}
            </p>
          </div>
        </div>

        {/* Overview Paragraph */}
        <div className="text-sm text-[#44403C] leading-relaxed font-serif-title">
          {activeTrack.overview}
        </div>

        {/* AnswerBlock (PRD 11, citeable answer first) */}
        <AnswerBlock
          title={`【${activeTrack.name.split(' ')[0]}】学术研判结论 (Answer Block)`}
          answer={activeTrack.answerBlock}
          sourceStamp="依据 2026/2027 海外大学最新招生公报、录取均分分布与先修课大纲"
        />

        {/* Advisory Methods (3+ actionable methods) */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            <span>博研书院在该赛道的核心研判与破局方法论</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#57534E]">
            {activeTrack.advisoryMethods.map((m, idx) => (
              <div key={idx} className="bg-[#FBF9F5] p-3.5 rounded-xs border academic-hairline flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Risks to Avoid */}
        <div className="bg-[#FEF2F2]/60 p-5 rounded-sm border border-[#FCA5A5]/40 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626]">
            <AlertTriangle className="w-4 h-4" />
            <span>该赛道常见 3 大误区与违规红线风险 (Key Risks)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#991B1B]">
            {activeTrack.keyRisks.map((risk, rIdx) => (
              <li key={rIdx} className="flex items-start gap-2">
                <span className="font-bold">!</span>
                <span className="leading-snug">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Assigned Advisor Section */}
        {assignedAdvisor && (
          <div className="bg-[#FBF9F5] p-5 rounded-sm border academic-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif-title font-bold text-base shrink-0">
                {assignedAdvisor.name.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider block">
                  赛道领衔学术导师 (Lead Scholar)
                </span>
                <strong className="text-sm font-serif-title text-[#1C1917] block">
                  {assignedAdvisor.name} · {assignedAdvisor.title}
                </strong>
                <span className="text-[#78716C] mt-0.5 block">
                  {assignedAdvisor.academicBackground}
                </span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking(assignedAdvisor.id, activeTrack.id)}
              className="px-4 py-2 bg-[#92400E] hover:bg-[#78350F] text-white font-medium text-xs rounded-xs transition-colors self-start sm:self-auto shrink-0 shadow-xs"
            >
              指定 {assignedAdvisor.name} 为我初诊
            </button>
          </div>
        )}

        {/* FAQs */}
        <div className="space-y-3 pt-4 border-t academic-hairline">
          <h3 className="text-sm font-semibold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#92400E]" />
            <span>常见家庭高频决策 8 问精选 (FAQ)</span>
          </h3>

          <div className="space-y-2">
            {activeTrack.faqs.map((faq, fIdx) => (
              <div 
                key={fIdx}
                className="border academic-hairline rounded-xs overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === fIdx ? null : fIdx)}
                  className="w-full p-3.5 text-left text-xs font-semibold text-[#1C1917] bg-[#FBF9F5] hover:bg-[#F5F2EB] flex items-center justify-between transition-colors"
                >
                  <span>{faq.question}</span>
                  {expandedFaq === fIdx ? <ChevronUp className="w-4 h-4 text-[#78350F]" /> : <ChevronDown className="w-4 h-4 text-[#A8A29E]" />}
                </button>
                {expandedFaq === fIdx && (
                  <div className="p-4 bg-white text-xs text-[#57534E] leading-relaxed border-t academic-hairline font-serif-title">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* NextStops Component */}
        <NextStops
          items={[
            { title: '测算该赛道专属开销：留学全成本预算粗算器', tabId: 'lab', extraSlug: 'cost', reason: '输入你的意向专业与生活标准，3秒获得精细到千元的总账单' },
            { title: '查阅真实录取案卷：对标同背景学子破局历程', tabId: 'cases', reason: '研读与你当前均分、院校相仿的学术案卷与申请难点结构' }
          ]}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

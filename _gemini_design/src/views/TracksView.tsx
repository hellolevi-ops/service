import React, { useState } from 'react';
import { VERTICAL_TRACKS, ADVISORS } from '../data/mockData';
import { AnswerBlock } from '../components/AnswerBlock';
import { NextStops } from '../components/NextStops';
import { 
  Compass, Calendar, Clock, DollarSign, AlertTriangle, 
  CheckCircle2, ArrowRight, UserCheck, HelpCircle, ChevronDown, ChevronUp, Globe2 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="pb-8 border-b border-slate-200">
        <span className="text-xs font-mono font-semibold text-blue-800 tracking-wider block mb-2">
          GLOBAL ADMISSIONS · PATHWAYS
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight font-editorial-title">
          热门留学国家与升学方向规划
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          英国、美国、中国香港、新加坡及前沿艺术各方向招生规则大不相同。从申请时间线、选校梯队、均分门槛到文书要求，为您提供清晰透彻的升学路线图。
        </p>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        {VERTICAL_TRACKS.map((t) => (
          <button
            key={t.slug}
            onClick={() => {
              setActiveSlug(t.slug);
              setExpandedFaq(0);
            }}
            className={`p-4 text-left border rounded-xl transition-all cursor-pointer ${
              activeSlug === t.slug
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className={`text-[10px] font-semibold block uppercase ${activeSlug === t.slug ? 'text-blue-100' : 'text-slate-400'}`}>
              {t.badge}
            </span>
            <span className="font-bold block truncate mt-1 text-sm">{t.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Track Details */}
      <div className="bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl shadow-xs space-y-8">
        {/* Track Title Banner */}
        <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {activeTrack.badge}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {activeTrack.targetDegree}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              {activeTrack.name}
            </h2>
            <span className="text-xs sm:text-sm text-slate-500 font-medium block mt-1">
              {activeTrack.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => onOpenBooking(assignedAdvisor?.id, activeTrack.id)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              预约该赛道专属初诊
            </button>
          </div>
        </div>

        {/* Fact Sheet: Timeline, Score, Cost */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs text-slate-500 flex items-center gap-1.5 font-semibold">
              <Clock className="w-4 h-4 text-blue-600" />
              典型申请时间轴
            </span>
            <p className="text-slate-900 font-medium leading-relaxed">
              {activeTrack.typicalTimeline}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs text-slate-500 flex items-center gap-1.5 font-semibold">
              <Compass className="w-4 h-4 text-blue-600" />
              硬性成绩与标化基准
            </span>
            <p className="text-slate-900 font-medium leading-relaxed">
              {activeTrack.scoreBenchmark}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs text-slate-500 flex items-center gap-1.5 font-semibold">
              <DollarSign className="w-4 h-4 text-blue-600" />
              年均总费用预算区间
            </span>
            <p className="text-slate-900 font-medium leading-relaxed">
              {activeTrack.costRange}
            </p>
          </div>
        </div>

        {/* Overview Paragraph */}
        <div className="text-sm text-slate-600 leading-relaxed">
          {activeTrack.overview}
        </div>

        {/* AnswerBlock */}
        <AnswerBlock
          title={`【${activeTrack.name.split(' ')[0]}】官方招生研判结论`}
          answer={activeTrack.answerBlock}
          sourceStamp="依据 2026/2027 海外大学最新招生公报、录取均分分布与先修课大纲"
        />

        {/* Advisory Methods */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>青藤国际在该赛道的核心研判与应对策略</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            {activeTrack.advisoryMethods.map((m, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed text-slate-700">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Risks to Avoid */}
        <div className="bg-red-50/70 p-5 rounded-xl border border-red-200 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-red-700">
            <AlertTriangle className="w-4 h-4" />
            <span>该赛道常见 3 大误区与违规红线风险 (Key Risks)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-red-800">
            {activeTrack.keyRisks.map((risk, rIdx) => (
              <li key={rIdx} className="flex items-start gap-2">
                <span className="font-bold text-red-600">!</span>
                <span className="leading-snug">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Assigned Advisor Section */}
        {assignedAdvisor && (
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                {assignedAdvisor.name.charAt(0)}
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                  赛道领衔学术导师 (Lead Scholar)
                </span>
                <strong className="text-sm font-bold text-slate-900 block mt-0.5">
                  {assignedAdvisor.name} · {assignedAdvisor.title}
                </strong>
                <span className="text-slate-500 mt-0.5 block">
                  {assignedAdvisor.academicBackground}
                </span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking(assignedAdvisor.id, activeTrack.id)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors self-start sm:self-auto shrink-0 shadow-xs cursor-pointer"
            >
              指定 {assignedAdvisor.name} 为我初诊
            </button>
          </div>
        )}

        {/* FAQs */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>常见家庭高频决策 8 问精选 (FAQ)</span>
          </h3>

          <div className="space-y-2">
            {activeTrack.faqs.map((faq, fIdx) => (
              <div 
                key={fIdx}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === fIdx ? null : fIdx)}
                  className="w-full p-4 text-left text-xs font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {expandedFaq === fIdx ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedFaq === fIdx && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
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
            { title: '查阅真实录取案卷：对标同背景学子升学实录', tabId: 'cases', reason: '研读与你当前均分、院校相仿的学术案卷与申请难点结构' }
          ]}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

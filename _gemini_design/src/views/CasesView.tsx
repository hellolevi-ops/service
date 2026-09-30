import React, { useState } from 'react';
import { CASE_STUDIES, VERTICAL_TRACKS, CaseStudyItem } from '../data/mockData';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { PlacementAnalytics } from '../components/PlacementAnalytics';
import { 
  Search, Filter, BookOpen, ShieldAlert, Award, 
  User, CheckCircle2, X, ArrowRight, Quote, FileCheck, Trophy 
} from 'lucide-react';

interface CasesViewProps {
  selectedCaseModal: CaseStudyItem | null;
  onSelectCase: (c: CaseStudyItem | null) => void;
  onOpenBooking: (advisorId?: string, trackId?: string) => void;
}

export const CasesView: React.FC<CasesViewProps> = ({
  selectedCaseModal,
  onSelectCase,
  onOpenBooking
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedBgGrade, setSelectedBgGrade] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const bgGrades = ['all', '985/211', '双非本科', '美本/海本', '国际高中/K12', '艺术跨学科'];

  const filtered = CASE_STUDIES.filter((c) => {
    if (selectedTrack !== 'all' && c.trackId !== selectedTrack) return false;
    if (selectedBgGrade !== 'all' && c.backgroundGrade !== selectedBgGrade) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchUni = c.admitUniversity.toLowerCase().includes(q);
      const matchProg = c.admitProgram.toLowerCase().includes(q);
      const matchInitials = c.studentInitials.toLowerCase().includes(q);
      const matchProfile = c.undergradProfile.toLowerCase().includes(q);
      if (!matchUni && !matchProg && !matchInitials && !matchProfile) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="pb-8 border-b border-slate-200">
        <span className="text-xs font-mono font-semibold text-blue-800 tracking-wider block mb-2">
          CASE ARCHIVE · 真实案卷复盘
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight font-editorial-title">
          名校录取真实案卷与学术难点复盘
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          真实还原每一位学员的始发背景、均分短板、文书策略突破口与最终录取结果。支持按就读本科档次、目标国家与专业筛选，给您最接地气的借鉴参考。
        </p>
      </div>

      {/* Successful Placement Analytics Data Visualization (Recharts) */}
      <PlacementAnalytics />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4 text-xs">
        {/* Row 1: Search + Track Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="搜索录取大学、专业、或学生背景 (如: 帝国理工, 哥大, 软件工程...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none font-medium transition-all"
            >
              <option value="all">全部学术赛道 (All Tracks)</option>
              {VERTICAL_TRACKS.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Background Grade Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-slate-400 text-xs font-semibold mr-1">生源背景档次：</span>
          {bgGrades.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedBgGrade(grade)}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                selectedBgGrade === grade
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {grade === 'all' ? '全部背景' : grade}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-500 font-medium">
            检索出 <strong className="text-blue-600">{filtered.length}</strong> 份详案
          </span>
        </div>
      </div>

      {/* Grid of Case Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 p-12 text-center rounded-2xl">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500">未找到完全符合条件的案例记录，请重置筛选条件</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <CaseStudyCard
              key={item.id}
              item={item}
              onSelect={onSelectCase}
              onAppointAdvisor={(advId) => onOpenBooking(advId, item.trackId)}
            />
          ))}
        </div>
      )}

      {/* Bottom Legal Disclaimer */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 leading-relaxed">
        <strong className="text-slate-700">个案免责声明：</strong>
        本页面所有案例均基于青藤国际过往带教学员真实经历编写，已对姓名与核心隐私实施学术脱敏并签署存档授权协议。名校录取受当年申请池竞争、政策调整及招生官个体主观偏好综合影响，过往个案的成功不构成对任何后续学子录取结果之法律要约或必然性保证。
      </div>

      {/* Detailed Modal Popup for Single Case */}
      {selectedCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => onSelectCase(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="关闭案卷"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Meta */}
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-xs">
              <span className="font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {selectedCaseModal.trackName}
              </span>
              <span className="text-slate-500 font-medium">{selectedCaseModal.enrollmentYear}</span>
              <span className="text-slate-400 ml-auto font-mono text-[11px]">案卷号：{selectedCaseModal.slug}</span>
            </div>

            {/* University & Degree */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {selectedCaseModal.admitUniversity}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {selectedCaseModal.admitProgram}
              </p>
            </div>

            {/* Student Background Profile */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <span className="text-slate-400 block text-[11px]">始发背景院校与专业</span>
                <strong className="text-slate-900 font-semibold block mt-0.5">{selectedCaseModal.undergradProfile}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">GPA / 绩点加权</span>
                <strong className="text-slate-900 font-semibold block mt-0.5">{selectedCaseModal.gpa}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">托福 / 雅思 / 标化考分</span>
                <strong className="text-slate-900 font-semibold block mt-0.5">{selectedCaseModal.testScores}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">生源背景属性归类</span>
                <span className="text-blue-700 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-md inline-block mt-0.5 border border-blue-100">
                  {selectedCaseModal.backgroundGrade}
                </span>
              </div>
            </div>

            {/* 1. Hard Bottlenecks */}
            <div className="mb-5 space-y-1.5">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>1. 申请核心难点与背景短板 (Key Bottlenecks)</span>
              </span>
              <p className="text-xs text-rose-950 leading-relaxed bg-rose-50/70 p-3.5 rounded-xl border border-rose-200">
                {selectedCaseModal.hardBottlenecks}
              </p>
            </div>

            {/* 2. Strategic Insights */}
            <div className="mb-5 space-y-1.5">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>2. 青藤国际导师研判与应对方案 (Advisory Strategy)</span>
              </span>
              <p className="text-xs text-emerald-950 leading-relaxed bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
                {selectedCaseModal.strategicInsight}
              </p>
            </div>

            {/* 3. Tangible Deliverables */}
            <div className="mb-5 space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>3. 实际打磨交付的学术物料清单 (Deliverables)</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedCaseModal.keyDeliverables.map((del, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Final Result & Quote */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-2.5">
              <div className="text-xs text-slate-900">
                <strong className="text-amber-700 font-bold">最终实证录用结果：</strong>
                <span>{selectedCaseModal.finalResult}</span>
              </div>

              <blockquote className="text-xs text-slate-600 italic border-l-2 border-blue-500 pl-3 py-0.5 leading-relaxed">
                {selectedCaseModal.quote}
              </blockquote>

              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                <span>带教学者：{selectedCaseModal.leadAdvisorName}</span>
                <span className="text-emerald-700 font-semibold">已获学子正式书面存档授权</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                您是否也具备相似背景？让带教该案的学者为您初诊评估。
              </span>
              <button
                onClick={() => {
                  onSelectCase(null);
                  onOpenBooking(selectedCaseModal.leadAdvisorId, selectedCaseModal.trackId);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <span>预约该赛道对标学术评估</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { GLOBAL_UNIVERSITIES, UniversityItem } from '../data/mockData';
import { Search, Compass, BookOpen, ArrowRight, X, CheckCircle2, Award, Globe, Building2 } from 'lucide-react';

interface UniversitiesViewProps {
  onOpenBooking: (advisorId?: string, trackId?: string) => void;
  onOpenWeCom: () => void;
}

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({ onOpenBooking, onOpenWeCom }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('全部');
  const [selectedRankTier, setSelectedRankTier] = useState<string>('全部梯队');
  const [selectedListPolicy, setSelectedListPolicy] = useState<string>('全部');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('全部门类');
  const [sortBy, setSortBy] = useState<'qs' | 'acceptance'>('qs');

  // Modal Detail State
  const [selectedUniModal, setSelectedUniModal] = useState<UniversityItem | null>(null);

  const countries = ['全部', '英国', '美国', '中国香港', '新加坡'];
  const rankTiers = ['全部梯队', 'Top 10 (世界前10)', 'Top 30 (世界前30)', 'Top 50 (世界前50)', 'Top 100 (世界前100)'];
  const listPolicies = ['全部', '严格限定985/211', '有内部List(按均分分档)', '无硬性List/综合评审'];
  const disciplines = ['全部门类', '商科与管理', '计算机与AI', '工程与科技', '人文与社科', '建筑与艺术'];

  // Filtering Logic
  const filtered = GLOBAL_UNIVERSITIES.filter((uni) => {
    // Country Filter
    if (selectedCountry !== '全部' && uni.country !== selectedCountry) return false;

    // Search Keyword
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchNameZh = uni.nameZh.toLowerCase().includes(term);
      const matchNameEn = uni.nameEn.toLowerCase().includes(term);
      const matchCity = uni.city.toLowerCase().includes(term);
      const matchProgram = uni.featuredPrograms.some(p => p.toLowerCase().includes(term));
      if (!matchNameZh && !matchNameEn && !matchCity && !matchProgram) return false;
    }

    // Rank Tier
    if (selectedRankTier === 'Top 10 (世界前10)' && uni.qsRank2026 > 10) return false;
    if (selectedRankTier === 'Top 30 (世界前30)' && uni.qsRank2026 > 30) return false;
    if (selectedRankTier === 'Top 50 (世界前50)' && uni.qsRank2026 > 50) return false;
    if (selectedRankTier === 'Top 100 (世界前100)' && uni.qsRank2026 > 100) return false;

    // List Policy
    if (selectedListPolicy === '严格限定985/211' && !uni.chineseListPolicy.includes('严格')) return false;
    if (selectedListPolicy === '有内部List(按均分分档)' && !uni.chineseListPolicy.includes('认可名单')) return false;
    if (selectedListPolicy === '无硬性List/综合评审' && !uni.chineseListPolicy.includes('综合评审')) return false;

    // Discipline
    if (selectedDiscipline !== '全部门类') {
      const discKey = selectedDiscipline.slice(0, 2);
      const hasDiscipline = uni.featuredPrograms.some(p => p.includes(discKey));
      if (!hasDiscipline) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'qs') return a.qsRank2026 - b.qsRank2026;
    if (sortBy === 'acceptance') {
      const rateA = parseFloat(a.meanAcceptanceRate);
      const rateB = parseFloat(b.meanAcceptanceRate);
      return rateA - rateB;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Page Header */}
      <div className="pb-8 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-semibold text-blue-800 tracking-wider block mb-2">
              ACADEMIC DIRECTORY · 2026/2027
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight font-editorial-title">
              全球顶尖大学库与各校录取门槛查询
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              汇集英美港新主流大学 2026/2027 最新招生政策、中国高校内部认可名单（List）要求、学费预算与录取难度，帮您快速定位适合自己的冲刺与保底大学。
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onOpenWeCom}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-blue-700 font-semibold text-xs rounded-xl border border-blue-200 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>微信领取《2026各大名校录取名单完整版》</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modern Search and Multi-Dimensional Filter Hub */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-5 text-xs">
        
        {/* Row 1: Search Keyword Input + Sort Controller */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="搜索大学中英文名称、所在城市、或优势专业 (如: 帝国理工, 计算机, LSE, 金融, 建筑...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
          </div>

          <div className="sm:col-span-4 flex items-center justify-end gap-2 text-xs">
            <span className="text-slate-500 shrink-0 font-medium">排序方式：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
            >
              <option value="qs">按 QS 2026 世界大学排名 (升序)</option>
              <option value="acceptance">按录取率从低到高 (竞争度)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Country Selection Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-slate-400 text-xs font-semibold shrink-0 mr-1">
            留学目的地：
          </span>
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                selectedCountry === c
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Row 3: Rank Tier & List Policy Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              世界大学排名梯队 (QS 2026)
            </label>
            <select
              value={selectedRankTier}
              onChange={(e) => setSelectedRankTier(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-blue-500 focus:outline-none"
            >
              {rankTiers.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              中国生源内部白名单政策 (List Policy)
            </label>
            <select
              value={selectedListPolicy}
              onChange={(e) => setSelectedListPolicy(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-blue-500 focus:outline-none"
            >
              {listPolicies.map(lp => (
                <option key={lp} value={lp}>{lp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              优势学科门类 (Discipline Cluster)
            </label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-blue-500 focus:outline-none"
            >
              {disciplines.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
          <span>共筛选出 <strong className="text-blue-600 font-semibold">{filtered.length}</strong> 所对标名校</span>
          <span>数据基准：2026/2027申请季最新海外大学录取规程</span>
        </div>
      </div>

      {/* University Directory List */}
      <div className="space-y-4">
        {filtered.map((uni) => (
          <div
            key={uni.id}
            className="bg-white border border-slate-200 hover:border-blue-300 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Rank Badges, University Identity & Country */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
                <div className="flex items-start gap-4">
                  {/* Modern University Initial Emblem */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
                    {uni.nameZh.charAt(0)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        {uni.nameZh}
                      </h3>
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {uni.badge}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 font-medium block mt-1">
                      {uni.nameEn} · {uni.city} ({uni.country})
                    </span>
                  </div>
                </div>

                {/* World Rankings Pill */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto text-xs">
                  <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">QS 2026</span>
                    <span className="font-extrabold text-blue-600 text-base">
                      #{uni.qsRank2026}
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">THE 2026</span>
                    <span className="font-extrabold text-slate-800 text-base">
                      #{uni.theRank2026}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Crucial Admissions Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">平均录取胜率</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{uni.meanAcceptanceRate}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">年均学费基准</span>
                  <span className="font-semibold text-amber-700 text-sm mt-0.5 block truncate">{uni.tuitionYear.split(' ')[0]}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">中国大学List政策</span>
                  <span className={`font-semibold mt-0.5 block truncate ${
                    uni.chineseListPolicy.includes('严格') ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                    {uni.chineseListPolicy.split('(')[0]}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">最低语言硬性门槛</span>
                  <span className="text-slate-900 font-medium text-sm mt-0.5 block truncate">{uni.languageRequirement.split('或')[0]}</span>
                </div>
              </div>

              {/* Admission Criteria & List Details */}
              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 mb-4 text-xs space-y-1.5">
                <div className="text-slate-700">
                  <strong className="text-slate-900 mr-1.5">生源GPA门槛：</strong>
                  <span>{uni.gpaRequirementZh}</span>
                </div>
                <div className="text-slate-700">
                  <strong className="text-slate-900 mr-1.5">List名单政策说明：</strong>
                  <span className="text-blue-800">{uni.advisoryInsight}</span>
                </div>
              </div>

              {/* Featured Programs Tags */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  重点对标硕士/博士学科方向 (Featured Programs)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {uni.featuredPrograms.map((prog, pIdx) => (
                    <span 
                      key={pIdx} 
                      className="text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg border border-slate-200 font-medium transition-colors"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 font-medium">
                {uni.applicationDeadlineRound1}
              </span>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedUniModal(uni)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>完整先修课大纲详案</span>
                </button>

                <button
                  onClick={() => onOpenBooking(undefined, uni.country === '英国' ? 'uk-pg' : uni.country === '美国' ? 'us-ug' : 'hk-sg')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>测算我的背景匹配度</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Single University Modal Detail View */}
      {selectedUniModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUniModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="关闭院校详情"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs mb-1.5">
                <span className="font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedUniModal.badge}
                </span>
                <span className="text-slate-500 font-medium">{selectedUniModal.city} · {selectedUniModal.country}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {selectedUniModal.nameZh}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{selectedUniModal.nameEn}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-semibold">院校学术画像与学术定位：</strong>
                <p className="text-slate-600 leading-relaxed">{selectedUniModal.academicProfileSnippet}</p>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 space-y-1.5">
                <strong className="text-blue-900 block font-semibold">中国生源内部认可名单 (List) 与先修课审核关键：</strong>
                <p className="text-blue-800 leading-relaxed">{selectedUniModal.advisoryInsight}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-medium">在校均分标准 (GPA)</span>
                  <span className="font-semibold text-slate-900 block mt-1">{selectedUniModal.gpaRequirementZh}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-medium">语言要求 (Language)</span>
                  <span className="font-semibold text-slate-900 block mt-1">{selectedUniModal.languageRequirement}</span>
                </div>
              </div>

              <div>
                <strong className="text-slate-900 block mb-2 font-semibold">重点专业方向清单：</strong>
                <ul className="space-y-1.5 text-slate-600">
                  {selectedUniModal.featuredPrograms.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium text-slate-800">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                首轮批次截止：<strong className="text-slate-900">{selectedUniModal.applicationDeadlineRound1}</strong>
              </span>
              <button
                onClick={() => {
                  setSelectedUniModal(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                预约该校 1 对 1 先修课对标研判
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

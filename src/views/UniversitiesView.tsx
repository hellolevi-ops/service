import React, { useState } from 'react';
import { GLOBAL_UNIVERSITIES, UniversityItem } from '../data/mockData';
import { 
  Search, Filter, Landmark, Globe, Award, DollarSign, 
  Clock, ShieldCheck, CheckCircle2, ArrowRight, X, ExternalLink, 
  BookOpen, Compass, ChevronDown 
} from 'lucide-react';

interface UniversitiesViewProps {
  onOpenBooking: (advisorId?: string, trackId?: string) => void;
  onOpenWeCom: () => void;
  onNavigateToTools?: (toolId: string) => void;
}

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({
  onOpenBooking,
  onOpenWeCom,
  onNavigateToTools
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('全部');
  const [selectedRankTier, setSelectedRankTier] = useState<string>('全部');
  const [selectedListPolicy, setSelectedListPolicy] = useState<string>('全部');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('全部');
  const [sortBy, setSortBy] = useState<'qs' | 'acceptance'>('qs');
  
  const [selectedUniModal, setSelectedUniModal] = useState<UniversityItem | null>(null);

  const countries = ['全部', '英国', '美国', '中国香港', '新加坡'];
  const rankTiers = ['全部', '全球前10', '全球前30', '全球前50'];
  const listPolicies = ['全部', '严格执行白名单 (List严卡)', '按院校梯队分层 (List分档)', '无固定List (全面考量先修课)'];
  const disciplines = ['全部', 'STEM理工', '商科经济', '人文社科', '涉外法律', '前沿艺术'];

  // Filter logic
  const filtered = GLOBAL_UNIVERSITIES.filter((uni) => {
    // Country
    if (selectedCountry !== '全部' && uni.country !== selectedCountry) return false;
    
    // Rank Tier
    if (selectedRankTier === '全球前10' && uni.qsRank2026 > 10) return false;
    if (selectedRankTier === '全球前30' && uni.qsRank2026 > 30) return false;
    if (selectedRankTier === '全球前50' && uni.qsRank2026 > 50) return false;

    // List Policy
    if (selectedListPolicy !== '全部' && uni.chineseListPolicy !== selectedListPolicy) return false;

    // Discipline
    if (selectedDiscipline !== '全部' && !uni.disciplines.includes(selectedDiscipline as any)) return false;

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchNameZh = uni.nameZh.toLowerCase().includes(q);
      const matchNameEn = uni.nameEn.toLowerCase().includes(q);
      const matchCity = uni.city.toLowerCase().includes(q);
      const matchPrograms = uni.featuredPrograms.some(p => p.toLowerCase().includes(q));
      if (!matchNameZh && !matchNameEn && !matchCity && !matchPrograms) return false;
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
      <div className="pb-6 border-b academic-hairline">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#92400E]" />
              <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider font-sans">
                GLOBAL UNIVERSITIES DIRECTORY · 全球名校库
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
              全球名校库与各校录取要求查询
            </h1>
            <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed">
              汇集英美港新主流大学 2026/2027 最新招生政策、中国高校内部认可名单（List）要求、学费预算与录取难度，帮您快速定位适合自己的冲刺与保底大学。
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onOpenWeCom}
              className="px-4 py-2 bg-[#F5F2EB] hover:bg-[#EDE7DC] text-[#78350F] font-medium text-xs rounded-xs border academic-hairline flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#B45309]" />
              <span>微信领取《2026各大名校录取名单完整版》</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mastersportal Style Search and Multi-Dimensional Filter Hub */}
      <div className="bg-[#FFFFFF] border academic-hairline p-6 rounded-sm shadow-2xs space-y-5 text-xs">
        
        {/* Row 1: Search Keyword Input + Sort Controller */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-[#A8A29E] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="搜索大学中英文名称、所在城市、或优势专业 (如: 帝国理工, 计算机, LSE, 金融, 建筑...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4 flex items-center justify-end gap-2 text-xs">
            <span className="text-[#78716C] shrink-0 font-medium">排序方式：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] font-medium focus:border-[#92400E] focus:outline-none"
            >
              <option value="qs">按 QS 2026 世界大学排名 (升序)</option>
              <option value="acceptance">按录取率从低到高 (竞争度)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Country Selection Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t academic-hairline">
          <span className="text-[#A8A29E] text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1">
            留学目的地：
          </span>
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedCountry === c
                  ? 'bg-[#1C1917] text-white font-medium'
                  : 'bg-[#F5F2EB] text-[#57534E] hover:bg-[#EDE7DC]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Row 3: Rank Tier & List Policy Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t academic-hairline">
          <div>
            <label className="block text-[11px] font-semibold text-[#78716C] mb-1">
              世界大学排名梯队 (QS 2026)
            </label>
            <select
              value={selectedRankTier}
              onChange={(e) => setSelectedRankTier(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] font-medium"
            >
              {rankTiers.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#78716C] mb-1">
              中国生源内部白名单政策 (List Policy)
            </label>
            <select
              value={selectedListPolicy}
              onChange={(e) => setSelectedListPolicy(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] font-medium"
            >
              {listPolicies.map(lp => (
                <option key={lp} value={lp}>{lp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#78716C] mb-1">
              优势学科门类 (Discipline Cluster)
            </label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] font-medium"
            >
              {disciplines.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] text-[#A8A29E] font-mono">
          <span>共筛选出 {filtered.length} 所对标名校</span>
          <span>数据基准：2026/2027申请季最新海外大学录取规程</span>
        </div>
      </div>

      {/* University Directory List (Mastersportal Card-Style) */}
      <div className="space-y-4">
        {filtered.map((uni) => (
          <div
            key={uni.id}
            className="bg-[#FFFFFF] border academic-hairline p-6 rounded-sm shadow-2xs hover:border-[#92400E] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Rank Badges, University Identity & Country */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-3.5 mb-3.5 border-b academic-hairline gap-3">
                <div className="flex items-start gap-3.5">
                  {/* Heraldic Initial / Emblem Shield */}
                  <div className="w-12 h-12 rounded-sm bg-[#1C1917] text-[#FBF9F5] flex items-center justify-center font-serif-title font-bold text-xl shrink-0 border border-[#78350F]/40 shadow-xs">
                    {uni.nameZh.charAt(0)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-serif-title font-bold text-[#1C1917]">
                        {uni.nameZh}
                      </h3>
                      <span className="text-xs font-semibold text-[#92400E] bg-[#F5F2EB] px-2 py-0.5 rounded-xs border academic-hairline">
                        {uni.badge}
                      </span>
                    </div>

                    <span className="text-xs text-[#78716C] font-medium block mt-0.5">
                      {uni.nameEn} · {uni.city} ({uni.country})
                    </span>
                  </div>
                </div>

                {/* World Rankings Pill */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto text-xs">
                  <div className="bg-[#FAF8F5] border academic-hairline px-2.5 py-1 rounded-xs text-center">
                    <span className="text-[10px] text-[#A8A29E] block">QS 2026</span>
                    <span className="font-serif-title font-bold text-[#92400E] font-mono text-sm">
                      #{uni.qsRank2026}
                    </span>
                  </div>
                  <div className="bg-[#FAF8F5] border academic-hairline px-2.5 py-1 rounded-xs text-center">
                    <span className="text-[10px] text-[#A8A29E] block">THE 2026</span>
                    <span className="font-serif-title font-bold text-[#1C1917] font-mono text-sm">
                      #{uni.theRank2026}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Crucial Admissions Parameters (Mastersportal Spec) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div className="bg-[#FBF9F5] p-2.5 rounded-xs border academic-hairline">
                  <span className="text-[10px] text-[#A8A29E] block">平均录取胜率</span>
                  <span className="font-mono font-bold text-[#1C1917] mt-0.5 block">{uni.meanAcceptanceRate}</span>
                </div>

                <div className="bg-[#FBF9F5] p-2.5 rounded-xs border academic-hairline">
                  <span className="text-[10px] text-[#A8A29E] block">年均学费基准</span>
                  <span className="font-mono font-semibold text-[#92400E] mt-0.5 block truncate">{uni.tuitionYear.split(' ')[0]}</span>
                </div>

                <div className="bg-[#FBF9F5] p-2.5 rounded-xs border academic-hairline">
                  <span className="text-[10px] text-[#A8A29E] block">中国大学List政策</span>
                  <span className={`font-semibold mt-0.5 block truncate ${
                    uni.chineseListPolicy.includes('严格') ? 'text-[#DC2626]' : 'text-[#059669]'
                  }`}>
                    {uni.chineseListPolicy.split('(')[0]}
                  </span>
                </div>

                <div className="bg-[#FBF9F5] p-2.5 rounded-xs border academic-hairline">
                  <span className="text-[10px] text-[#A8A29E] block">最低语言硬性门槛</span>
                  <span className="font-mono text-[#1C1917] mt-0.5 block truncate">{uni.languageRequirement.split('或')[0]}</span>
                </div>
              </div>

              {/* Admission Criteria & List Details */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-xs border academic-hairline mb-4 text-xs space-y-1.5">
                <div className="text-[#57534E]">
                  <strong className="text-[#1C1917] mr-1.5">生源GPA门槛：</strong>
                  <span>{uni.gpaRequirementZh}</span>
                </div>
                <div className="text-[#57534E]">
                  <strong className="text-[#1C1917] mr-1.5">List名单政策说明：</strong>
                  <span className="text-[#78350F]">{uni.advisoryInsight}</span>
                </div>
              </div>

              {/* Featured Programs Tags */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-[#78716C] uppercase tracking-wider block mb-1.5">
                  重点对标硕士/博士学科方向 (Featured Programs)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {uni.featuredPrograms.map((prog, pIdx) => (
                    <span 
                      key={pIdx} 
                      className="text-[11px] text-[#1C1917] bg-[#F5F2EB] px-2.5 py-1 rounded-xs border academic-hairline font-mono"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t academic-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-[#A8A29E] font-mono text-[11px]">
                {uni.applicationDeadlineRound1}
              </span>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedUniModal(uni)}
                  className="px-3 py-1.5 bg-[#F5F2EB] hover:bg-[#EDE7DC] text-[#78350F] font-medium rounded-xs border academic-hairline flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>完整先修课大纲详案</span>
                </button>

                <button
                  onClick={() => onOpenBooking(undefined, uni.country === '英国' ? 'uk-pg' : uni.country === '美国' ? 'us-ug' : 'hk-sg')}
                  className="px-4 py-1.5 bg-[#1C1917] hover:bg-[#78350F] text-white font-medium rounded-xs transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] border academic-hairline rounded-sm shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUniModal(null)}
              className="absolute top-5 right-5 text-[#A8A29E] hover:text-[#1C1917] p-1.5 cursor-pointer"
              aria-label="关闭院校详情"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 mb-4 border-b academic-hairline">
              <div className="flex items-center gap-2 text-xs mb-1">
                <span className="font-semibold text-[#92400E] bg-[#F5F2EB] px-2 py-0.5 rounded-xs">
                  {selectedUniModal.badge}
                </span>
                <span className="text-[#78716C]">{selectedUniModal.city} · {selectedUniModal.country}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917]">
                {selectedUniModal.nameZh}
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5 font-mono">{selectedUniModal.nameEn}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-xs border academic-hairline space-y-1">
                <strong className="text-[#1C1917] block font-medium">院校学术画像与学术定位：</strong>
                <p className="text-[#57534E] leading-relaxed font-serif-title">{selectedUniModal.academicProfileSnippet}</p>
              </div>

              <div className="p-3 bg-[#FBF9F5] rounded-xs border academic-hairline space-y-2">
                <strong className="text-[#92400E] block font-medium">中国生源内部认可名单 (List) 与先修课审核关键：</strong>
                <p className="text-[#57534E] leading-relaxed">{selectedUniModal.advisoryInsight}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xs border academic-hairline">
                  <span className="text-[10px] text-[#A8A29E] block">在校均分标准 (GPA)</span>
                  <span className="font-medium text-[#1C1917] block mt-0.5">{selectedUniModal.gpaRequirementZh}</span>
                </div>
                <div className="bg-white p-3 rounded-xs border academic-hairline">
                  <span className="text-[10px] text-[#A8A29E] block">语言要求 (Language)</span>
                  <span className="font-medium text-[#1C1917] block mt-0.5">{selectedUniModal.languageRequirement}</span>
                </div>
              </div>

              <div>
                <strong className="text-[#1C1917] block mb-1">重点专业方向清单：</strong>
                <ul className="space-y-1 text-[#57534E]">
                  {selectedUniModal.featuredPrograms.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 bg-[#FAF8F5] p-2 rounded-xs border academic-hairline">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                      <span className="font-mono">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t academic-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#78716C]">
                首轮批次截止：<strong className="text-[#1C1917]">{selectedUniModal.applicationDeadlineRound1}</strong>
              </span>
              <button
                onClick={() => {
                  setSelectedUniModal(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#1C1917] hover:bg-[#78350F] text-white font-medium rounded-xs shadow-xs cursor-pointer"
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

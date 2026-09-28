import React from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, Award, Clock, 
  BookOpen, Users, Compass, FileText, ChevronRight, Sparkles, Building2,
  Calendar, Layers, Check
} from 'lucide-react';
import { 
  SERVICE_LINES, VERTICAL_TRACKS, CASE_STUDIES, ADVISORS, PRACTICE_PLAYBOOKS, CaseStudyItem 
} from '../data/mockData';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { AdvisorCard } from '../components/AdvisorCard';
import { AnswerBlock } from '../components/AnswerBlock';
import { ParentReadableBlock } from '../components/ParentReadableBlock';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { NextStops } from '../components/NextStops';

interface HomeViewProps {
  onNavigate: (tab: string, extraSlug?: string) => void;
  onOpenBooking: (advisorId?: string, trackId?: string) => void;
  onOpenWeCom: () => void;
  onSelectCase: (caseItem: CaseStudyItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenWeCom,
  onSelectCase
}) => {
  const featuredCases = CASE_STUDIES.slice(0, 3);
  const featuredAdvisors = ADVISORS.slice(0, 3);
  const featuredPlaybooks = PRACTICE_PLAYBOOKS.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION (Anti-slop, clean architectural composition) */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 border-b academic-hairline overflow-hidden paper-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left 7 Cols: Typography, Claim, CTA */}
            <div className="lg:col-span-7 space-y-6">
              {/* Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#78350F] tracking-wider uppercase font-sans">
                <span className="w-2 h-2 rounded-full bg-[#92400E]" />
                <span>垂直深耕型国际学者与升学研判体系</span>
                <span className="text-[#A8A29E]">·</span>
                <span className="text-[#78716C]">2026/2027 申请季已启动</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#1C1917] tracking-tight leading-[1.15] text-balance">
                以严谨学术研判为舟，<br />
                <span className="text-[#92400E] font-medium italic">穿透顶尖名校的信息黑箱</span>
              </h1>

              {/* Support Statement */}
              <p className="text-base sm:text-lg text-[#44403C] leading-relaxed max-w-2xl font-serif-title">
                拒绝流水线包装与模板文书。博研书院联合海外顶尖院校在研学者与学术督导，以严谨的文献方法学、先修课穿透匹配与全透明精益交付，协助高志向学子与理性家庭实现确定性跃迁。
              </p>

              {/* Quantitative Claim-to-Proof Ribbon (Single row, strict typography) */}
              <div className="grid grid-cols-3 gap-4 pt-2 pb-2 border-y academic-hairline max-w-xl text-xs">
                <div>
                  <span className="text-lg sm:text-xl font-serif-title font-bold text-[#1C1917] block">
                    100%
                  </span>
                  <span className="text-[11px] text-[#78716C]">网申账号家庭自主共享</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-serif-title font-bold text-[#1C1917] block">
                    7 阶
                  </span>
                  <span className="text-[11px] text-[#78716C]">全生命周期实物交付</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-serif-title font-bold text-[#92400E] block">
                    15 分钟
                  </span>
                  <span className="text-[11px] text-[#78716C]">工作日学术响应承诺</span>
                </div>
              </div>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3.5 bg-[#1C1917] hover:bg-[#78350F] text-[#FBF9F5] font-semibold text-sm rounded-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>预约免费学术背景评估 (45分钟)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('cases')}
                  className="px-5 py-3.5 bg-[#FFFFFF] hover:bg-[#EDE7DC] text-[#292524] font-medium text-sm rounded-xs border academic-hairline transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <BookOpen className="w-4 h-4 text-[#78350F]" />
                  <span>研读 8 大真实难点案例</span>
                </button>
              </div>

              <div className="text-[11px] text-[#78716C] flex items-center gap-3 pt-1">
                <span className="flex items-center gap-1 text-[#059669]">
                  <Check className="w-3.5 h-3.5" /> 零保录欺诈
                </span>
                <span className="text-[#D6CEBF]">|</span>
                <span>完全公开计费逻辑</span>
                <span className="text-[#D6CEBF]">|</span>
                <span>支持指定带教导师</span>
              </div>
            </div>

            {/* Right 5 Cols: Academic Crest / Archival Presentation Box */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFFFFF] border academic-hairline p-7 rounded-sm shadow-md relative">
                {/* Header of the archival dossier */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b academic-hairline text-xs">
                  <div className="flex items-center gap-2 text-[#78350F] font-semibold">
                    <Building2 className="w-4 h-4" />
                    <span>BOYAN ACADEMIC DOSSIER 2026</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8A29E]">ARCHIVE NO. 2026-A1</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-[#FBF9F5] rounded-xs border academic-hairline">
                    <span className="text-[11px] font-semibold text-[#1C1917] block mb-1">
                      【即时先修课对标研判】帝国理工与 UCL 计算机/数据科学
                    </span>
                    <p className="text-[#57534E] leading-relaxed text-[11px]">
                      经 2026 春季官方审定：本科纯数学、线性代数、概率统计学分低于 25 ECTS 申请者将被直接归入候补，建议提前补充海外官方微证书认证。
                    </p>
                  </div>

                  <div className="p-3 bg-[#FBF9F5] rounded-xs border academic-hairline">
                    <span className="text-[11px] font-semibold text-[#1C1917] block mb-1">
                      【常春藤早申胜率沙盘】ED (Early Decision) 唯一性契约
                    </span>
                    <p className="text-[#57534E] leading-relaxed text-[11px]">
                      达特茅斯、耶鲁、MIT 已恢复 SAT/ACT 强制递交标准，学术活动叙事必须摆脱“泛商业刷题”，聚焦核心单一课题闭环。
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onNavigate('lab')}
                      className="text-[#92400E] hover:text-[#78350F] font-medium flex items-center gap-1"
                    >
                      <span>进入 Practice Lab 免费自测</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={onOpenWeCom}
                      className="text-[#059669] hover:underline text-[11px] font-medium"
                    >
                      企微领取《2026名校List》
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THREE SERVICE LINES (PRD §6.2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b academic-hairline gap-4">
          <div>
            <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
              清晰区隔 · 拒绝模糊推销
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
              书院三大服务产品体系
            </h2>
          </div>
          <p className="text-xs text-[#78716C] max-w-md leading-relaxed">
            不同志向、不同阶段匹配差异化带教模式。每条产品线均有明确的“适合与不适合对象”及可核验交付物。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_LINES.map((srv) => (
            <div 
              key={srv.id}
              className="bg-[#FFFFFF] border academic-hairline p-6 rounded-sm shadow-2xs hover:shadow-xs flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b academic-hairline">
                  <span className="text-xs font-semibold text-[#92400E] font-mono">
                    {srv.badge}
                  </span>
                  <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider">
                    {srv.slug.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-serif-title font-bold text-[#1C1917] leading-snug">
                  {srv.name}
                </h3>
                <span className="text-xs text-[#78716C] block mt-0.5 mb-3">
                  {srv.subname}
                </span>

                <div className="bg-[#FBF9F5] p-3 rounded-xs border academic-hairline mb-4 text-xs space-y-2">
                  <div>
                    <strong className="text-[#1C1917] block text-[11px]">适合对象：</strong>
                    <span className="text-[#57534E] leading-relaxed">{srv.targetAudience}</span>
                  </div>
                  <div>
                    <strong className="text-[#DC2626] block text-[11px]">明确不适合：</strong>
                    <span className="text-[#78716C] leading-relaxed">{srv.notForAudience}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <span className="text-[11px] font-semibold text-[#1C1917] block">核心交付标准：</span>
                  <ul className="space-y-1.5 text-xs text-[#57534E]">
                    {srv.deliverables.slice(0, 3).map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t academic-hairline space-y-3">
                <div className="text-[11px] text-[#78716C]">
                  <strong>定价逻辑：</strong>{srv.pricingLogic}
                </div>

                <button
                  onClick={() => {
                    if (srv.id === 'compare') {
                      onNavigate('services', 'compare');
                    } else {
                      onOpenBooking(undefined, srv.id);
                    }
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#1C1917] hover:text-white bg-[#F5F2EB] hover:bg-[#1C1917] border academic-hairline rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FIVE VERTICAL TRACKS (PRD §6.1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b academic-hairline gap-4">
          <div>
            <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
              深耕学科领域 · 拒绝泛泛而谈
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
              五大核心研判赛道
            </h2>
          </div>
          <button
            onClick={() => onNavigate('tracks')}
            className="text-xs font-semibold text-[#92400E] hover:text-[#78350F] flex items-center gap-1 self-start md:self-auto"
          >
            <span>浏览全部赛道决策模型</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERTICAL_TRACKS.map((track) => (
            <div
              key={track.id}
              onClick={() => onNavigate('tracks', track.slug)}
              className="bg-[#FFFFFF] border academic-hairline p-6 rounded-sm shadow-2xs hover:border-[#92400E] cursor-pointer group transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b academic-hairline text-xs">
                  <span className="text-xs font-semibold text-[#92400E] bg-[#F5F2EB] px-2 py-0.5 rounded-xs">
                    {track.badge}
                  </span>
                  <span className="text-[11px] text-[#A8A29E] font-mono">{track.slug}</span>
                </div>

                <h3 className="text-lg font-serif-title font-bold text-[#1C1917] group-hover:text-[#92400E] transition-colors leading-snug">
                  {track.name}
                </h3>
                <span className="text-xs text-[#78716C] block mt-0.5 mb-3 font-medium">
                  {track.subtitle}
                </span>

                <p className="text-xs text-[#57534E] line-clamp-3 leading-relaxed mb-4">
                  {track.overview}
                </p>

                <div className="space-y-1.5 text-xs text-[#78716C] bg-[#FBF9F5] p-3 rounded-xs border academic-hairline mb-4">
                  <div>
                    <span className="text-[#A8A29E] mr-1">标化基准：</span>
                    <span className="text-[#1C1917] font-medium">{track.scoreBenchmark}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A29E] mr-1">预算区间：</span>
                    <span className="text-[#1C1917] font-medium">{track.costRange}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t academic-hairline flex items-center justify-between text-xs text-[#92400E] font-medium">
                <span>进入该赛道时间轴与解法</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED CASES (PRD §6.3, 难点结构化) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b academic-hairline gap-4">
          <div>
            <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
              可对标 · 可核验 · 难点结构化
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
              真实案例学术复盘精选
            </h2>
          </div>
          <button
            onClick={() => onNavigate('cases')}
            className="text-xs font-semibold text-[#92400E] hover:text-[#78350F] flex items-center gap-1 self-start md:self-auto"
          >
            <span>进入 8 大详细难点案例库</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCases.map((item) => (
            <CaseStudyCard 
              key={item.id} 
              item={item} 
              onSelect={onSelectCase}
            />
          ))}
        </div>

        <div className="mt-4 p-3 bg-[#FBF9F5] border academic-hairline rounded-xs text-[11px] text-[#A8A29E] text-center">
          声明：本院公布之案例系脱敏学术记录，均已取得学子书面授权存档；个案背景不可简单复制，不构成对任何后续申请者绝对录取概率之承诺。
        </div>
      </section>

      {/* 5. SEVEN STAGE LIFECYCLE (PRD §6.5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProcessTimeline />
      </section>

      {/* 6. ADVISOR TEAM PREVIEW (PRD §6.4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b academic-hairline gap-4">
          <div>
            <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
              真人学者 · 学术背景公开透明
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
              书院带教领衔顾问团队
            </h2>
          </div>
          <button
            onClick={() => onNavigate('advisors')}
            className="text-xs font-semibold text-[#92400E] hover:text-[#78350F] flex items-center gap-1 self-start md:self-auto"
          >
            <span>查看完整学者履历与案例</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAdvisors.map((advisor) => (
            <AdvisorCard
              key={advisor.id}
              advisor={advisor}
              onAppoint={(adv) => onOpenBooking(adv.id)}
            />
          ))}
        </div>
      </section>

      {/* 7. PRACTICE LAB PREVIEW (PRD R, Playbooks & Tools) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border academic-hairline p-8 rounded-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b academic-hairline gap-4">
            <div>
              <span className="text-xs font-semibold text-[#92400E] uppercase tracking-wider block mb-1">
                PRACTICE LAB · 经验资产展厅
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
                最佳实践工作室与自助工具箱
              </h2>
            </div>
            <button
              onClick={() => onNavigate('lab')}
              className="px-4 py-2 bg-[#1C1917] hover:bg-[#78350F] text-[#FBF9F5] text-xs font-semibold rounded-xs transition-colors shadow-xs"
            >
              打开全部 Lab 工具与 Playbook
            </button>
          </div>

          {/* 3 Playbooks cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {featuredPlaybooks.map((pb) => (
              <div 
                key={pb.id}
                onClick={() => onNavigate('lab', pb.slug)}
                className="bg-[#FFFFFF] border academic-hairline p-5 rounded-xs hover:border-[#92400E] cursor-pointer transition-all shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] pb-2 mb-2 border-b academic-hairline text-[#78716C]">
                    <span className="font-semibold text-[#92400E]">{pb.category}</span>
                    <span>{pb.readTime}</span>
                  </div>
                  <h4 className="text-sm font-serif-title font-bold text-[#1C1917] leading-snug mb-2">
                    {pb.title}
                  </h4>
                  <p className="text-xs text-[#57534E] line-clamp-3 leading-relaxed mb-3">
                    {pb.summary}
                  </p>
                </div>
                <div className="pt-2 border-t academic-hairline text-xs font-medium text-[#92400E] flex items-center justify-between">
                  <span>研读最佳实践大纲</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tools Grid Callout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div 
              onClick={() => onNavigate('lab', 'assessment')}
              className="bg-[#FFFFFF] p-3.5 rounded-xs border academic-hairline hover:border-[#92400E] cursor-pointer transition-colors"
            >
              <Compass className="w-4 h-4 text-[#92400E] mb-1" />
              <strong className="block text-[#1C1917]">背景四维雷达</strong>
              <span className="text-[11px] text-[#78716C]">量化准入胜算与缺漏</span>
            </div>

            <div 
              onClick={() => onNavigate('lab', 'timeline')}
              className="bg-[#FFFFFF] p-3.5 rounded-xs border academic-hairline hover:border-[#92400E] cursor-pointer transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#92400E] mb-1" />
              <strong className="block text-[#1C1917]">18月倒排时间轴</strong>
              <span className="text-[11px] text-[#78716C]">锁定关键早申批次</span>
            </div>

            <div 
              onClick={() => onNavigate('lab', 'checklist')}
              className="bg-[#FFFFFF] p-3.5 rounded-xs border academic-hairline hover:border-[#92400E] cursor-pointer transition-colors"
            >
              <FileText className="w-4 h-4 text-[#92400E] mb-1" />
              <strong className="block text-[#1C1917]">材料自检清单</strong>
              <span className="text-[11px] text-[#78716C]">公章、防伪、成绩核验</span>
            </div>

            <div 
              onClick={() => onNavigate('lab', 'cost')}
              className="bg-[#FFFFFF] p-3.5 rounded-xs border academic-hairline hover:border-[#92400E] cursor-pointer transition-colors"
            >
              <Clock className="w-4 h-4 text-[#92400E] mb-1" />
              <strong className="block text-[#1C1917]">留学预算粗算器</strong>
              <span className="text-[11px] text-[#78716C]">学费加生活费透底</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARENT READABLE BLOCK (Principle #1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParentReadableBlock />
      </section>

      {/* 9. CALL TO ACTION BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] text-[#FBF9F5] p-8 sm:p-12 rounded-sm text-center relative overflow-hidden shadow-lg">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono text-[#D97706] uppercase tracking-widest block">
              INITIAL ACADEMIC DIAGNOSIS · WORKDAY 15-MIN SLA
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-white leading-snug">
              开启您家庭的知情升学研判之旅
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
              带上真实的在校成绩单与学术兴趣。我们的剑桥博后与哥大博士带教团队将在 45 分钟初诊中，为您客观测算先修课匹配度与名单准入梯度。
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#92400E] hover:bg-[#B45309] text-white font-semibold text-xs sm:text-sm rounded-xs transition-colors shadow-xs"
              >
                免费预约 45 分钟背景研判初诊
              </button>
              <button
                onClick={onOpenWeCom}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#292524] hover:bg-[#44403C] text-[#EDE7DC] font-medium text-xs sm:text-sm rounded-xs border border-[#57534E] transition-colors"
              >
                加企业微信随时沟通
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

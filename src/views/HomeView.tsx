import React from 'react';
import { 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, MessageSquare, 
  Calculator, ListChecks, DollarSign
} from 'lucide-react';
import { 
  SERVICE_LINES, VERTICAL_TRACKS, CASE_STUDIES, ADVISORS, CaseStudyItem, AdvisorItem 
} from '../data/mockData';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { AdvisorCard } from '../components/AdvisorCard';
import { SuccessStoryCarousel } from '../components/SuccessStoryCarousel';
import { RecentAdmitsTicker } from '../components/RecentAdmitsTicker';
import { QuickIntentMatcher } from '../components/QuickIntentMatcher';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { FeeBoundary } from '../components/FeeBoundary';

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

  // Intent generator from Hero interactive tool
  const handleQuickIntentGenerated = (data: { track: string; degree: string; background: string; keyConcern: string }) => {
    onOpenBooking(undefined, data.track);
  };

  const handleSelectCaseBySlug = (slug: string) => {
    const found = CASE_STUDIES.find(c => c.slug === slug);
    if (found) {
      onSelectCase(found);
    } else {
      onNavigate('cases');
    }
  };

  const handleOpenBookingWithAdvisor = (advisorName: string) => {
    const found = ADVISORS.find(a => a.name.includes(advisorName));
    onOpenBooking(found?.id);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* ========================================================================= */}
      {/* 模块 1：首屏 HERO & 快速意向自测 (清晰明了，新东方/金吉列大气实用风)        */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 border-b academic-hairline overflow-hidden bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 顶条便签 */}
          <div className="flex flex-wrap items-center justify-between pb-3.5 mb-6 border-b academic-hairline gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#78350F] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span>🔥 2026/2027 申请季已全面启动</span>
              <span className="text-[#A8A29E]">/</span>
              <span className="text-[#57534E]">英美港新名校早鸟规划通道</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#78716C]">
              <span>正规留学合同保障</span>
              <span className="text-[#D6CEBF]">|</span>
              <span className="text-[#059669] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 拒录全额退费 · 签约前明码标价
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* 左侧 6 列：主标题、核心痛点保障、行动转化 */}
            <div className="lg:col-span-6 space-y-5">
              
              <div>
                <span className="inline-block px-2.5 py-1 bg-[#EDE7DC] text-[#78350F] font-semibold text-xs rounded-xs mb-3">
                  专注全球名校高端留学申请
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#1C1917] tracking-tight leading-[1.2] text-balance">
                  选对好学校，冲刺世界名校<br />
                  <span className="text-[#92400E] font-medium">青藤国际 · 资深导师 1对1 护航</span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
                拒绝流水线中介模板代写，由海外名校导师亲授。精准把关院校录取门槛、深度挖掘个人特色定制原创文书，网申账号密码 100% 共享自持，让您的每一步留学投资都透明安心。
              </p>

              {/* 四大核心保障金牌标签 (击中中国家长与学生痛点) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 pb-1 text-xs">
                <div className="bg-[#FFFFFF] p-2.5 rounded-xs border academic-hairline flex items-center gap-2 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span className="text-[#1C1917] font-medium">名校导师 1对1 规划带教</span>
                </div>
                <div className="bg-[#FFFFFF] p-2.5 rounded-xs border academic-hairline flex items-center gap-2 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span className="text-[#1C1917] font-medium">拒绝模板套作 · 文书满意定稿</span>
                </div>
                <div className="bg-[#FFFFFF] p-2.5 rounded-xs border academic-hairline flex items-center gap-2 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span className="text-[#1C1917] font-medium">网申账号 100% 学生自持查进度</span>
                </div>
                <div className="bg-[#FFFFFF] p-2.5 rounded-xs border academic-hairline flex items-center gap-2 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span className="text-[#1C1917] font-medium">正规合同保障 · 拒录全额退费</span>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3.5 bg-[#92400E] hover:bg-[#78350F] text-[#FBF9F5] font-semibold text-xs sm:text-sm rounded-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>免费获取 1对1 名校申请方案</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenWeCom}
                  className="px-5 py-3.5 bg-[#FFFFFF] hover:bg-[#EDE7DC] text-[#292524] font-medium text-xs sm:text-sm rounded-xs border academic-hairline transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#059669]" />
                  <span>微信直接咨询顾问</span>
                </button>
              </div>

              {/* 关键保障数字 */}
              <div className="flex items-center gap-6 pt-2 text-xs border-t academic-hairline text-[#78716C]">
                <div>
                  <span className="font-mono text-base font-bold text-[#1C1917] block">98.2%</span>
                  <span>前三志愿录取率</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="font-mono text-base font-bold text-[#1C1917] block">100%</span>
                  <span>网申账号自主掌控</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="font-mono text-base font-bold text-[#1C1917] block">0隐形收费</span>
                  <span>明码标价签署合同</span>
                </div>
              </div>

            </div>

            {/* 右侧 6 列：简单直接的 30 秒自测表单 */}
            <div className="lg:col-span-6">
              <QuickIntentMatcher onGeneratePlan={handleQuickIntentGenerated} />
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 2：最新录取喜报跑马灯 (Recent Admits Ticker)                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentAdmitsTicker />
      </section>

      {/* ========================================================================= */}
      {/* 模块 3：想去哪里留学？热门国家与方向一览 (Hot Destinations)                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b academic-hairline gap-3">
            <div>
              <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
                POPULAR DESTINATIONS · 热门留学目的地
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
                想去哪里留学？热门国家与地区一览
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-2xl leading-relaxed">
                英美港新澳加学制、学费、申请门槛大不同，为您量身匹配最适合的求学与就业路径
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('tracks')}
              className="text-xs text-[#92400E] hover:underline font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>查看全部国家详细规划</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VERTICAL_TRACKS.map((track) => (
              <div
                key={track.id}
                className="bg-[#FBF9F5] border academic-hairline p-5 rounded-xs hover:border-[#92400E] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#EDE7DC] text-[#78350F] rounded-xs">
                      {track.badge}
                    </span>
                    <span className="text-xs text-[#059669] font-medium">2026申请中</span>
                  </div>

                  <h3 className="text-base font-bold text-[#1C1917] group-hover:text-[#92400E] transition-colors mb-2">
                    {track.name}
                  </h3>

                  <p className="text-xs text-[#57534E] leading-relaxed mb-4 line-clamp-2">
                    {track.overview}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#78716C] border-t academic-hairline pt-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span>建议均分：</span>
                      <span className="text-[#1C1917] font-medium truncate max-w-[180px]">
                        {track.scoreBenchmark.split('，')[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>规划节奏：</span>
                      <span className="text-[#92400E] font-medium">{track.typicalTimeline.split('，')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t academic-hairline">
                  <button
                    onClick={() => onNavigate('tracks', track.slug)}
                    className="flex-1 py-2 text-center text-xs font-semibold bg-white hover:bg-[#EDE7DC] border academic-hairline text-[#1C1917] rounded-xs transition-colors cursor-pointer"
                  >
                    查看该国方案
                  </button>
                  <button
                    onClick={() => onOpenBooking(undefined, track.id)}
                    className="flex-1 py-2 text-center text-xs font-semibold bg-[#92400E] hover:bg-[#78350F] text-white rounded-xs transition-colors cursor-pointer"
                  >
                    咨询专属导师
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 4：四大核心服务项目 (What We Offer - 一眼看懂你要买什么)             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b academic-hairline gap-3">
            <div>
              <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
                OUR SERVICES · 核心服务项目
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
                全学段量身定制留学服务项目
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-2xl leading-relaxed">
                从高中、本科到硕士、博士，全流程精细护航，签约前明码标价无隐形消费
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('services')}
              className="text-xs text-[#92400E] hover:underline font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>查看服务详细条款与报价单</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_LINES.map((srv, idx) => (
              <div 
                key={srv.id}
                className="bg-[#FBF9F5] border academic-hairline p-6 rounded-xs flex flex-col justify-between hover:border-[#92400E] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#EDE7DC] text-[#78350F] rounded-xs font-mono">
                      PRODUCT 0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#059669]">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1C1917] group-hover:text-[#92400E] transition-colors mb-1">
                    {srv.name}
                  </h3>
                  <span className="text-xs text-[#78716C] block mb-3 font-mono">
                    {srv.subname}
                  </span>

                  <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                    {srv.targetAudience}
                  </p>

                  <div className="border-t academic-hairline pt-3 mb-4 space-y-2">
                    <strong className="text-xs text-[#1C1917] block">核心包含内容：</strong>
                    <div className="space-y-1 text-xs text-[#57534E]">
                      {srv.deliverables.slice(0, 4).map((d, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                          <span className="leading-snug">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t academic-hairline">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs text-[#78716C]">定价机制</span>
                    <span className="text-xs font-semibold text-[#92400E]">{srv.pricingLogic}</span>
                  </div>
                  <button
                    onClick={() => onOpenBooking(undefined, srv.id)}
                    className="w-full py-2.5 bg-[#1C1917] hover:bg-[#78350F] text-white font-semibold text-xs rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>立即咨询该服务</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 5：三大中国家庭最需要的实用自测工具箱 (Free Tools)                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border academic-hairline p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b academic-hairline gap-3">
            <div>
              <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
                FREE DECISION TOOLS · 免费决策工具箱
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
                不用找中介，先用免费工具测一测
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-2xl leading-relaxed">
                基于英美港新官方最新 2026/2027 招生规程与名单标准，让您心里更有本明白账
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('lab')}
              className="text-xs text-[#92400E] hover:underline font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>进入完整工具箱</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 工具 1 */}
            <div 
              onClick={() => onNavigate('lab', 'assessment')}
              className="bg-white p-5 rounded-xs border academic-hairline hover:border-[#92400E] transition-all cursor-pointer group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xs bg-[#FAF8F5] border academic-hairline flex items-center justify-center text-[#92400E] mb-3 group-hover:bg-[#EDE7DC]">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1C1917] group-hover:text-[#92400E] transition-colors mb-1">
                名校录取概率快速自测
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                输入本科学校档次、绩点成绩与专业方向，快速测算匹配冲刺、核心与保底院校。
              </p>
              <span className="text-xs text-[#92400E] font-semibold flex items-center gap-1">
                立即测算 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 工具 2 */}
            <div 
              onClick={() => onNavigate('lab', 'cost')}
              className="bg-white p-5 rounded-xs border academic-hairline hover:border-[#92400E] transition-all cursor-pointer group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xs bg-[#FAF8F5] border academic-hairline flex items-center justify-center text-[#92400E] mb-3 group-hover:bg-[#EDE7DC]">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1C1917] group-hover:text-[#92400E] transition-colors mb-1">
                留学总费用预算粗算器
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                自主选择目标国家与生活消费水准，3秒生成精细到学费、住宿费与汇率的总开销账单。
              </p>
              <span className="text-xs text-[#92400E] font-semibold flex items-center gap-1">
                测算费用 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* 工具 3 */}
            <div 
              onClick={() => onNavigate('lab', 'checklist')}
              className="bg-white p-5 rounded-xs border academic-hairline hover:border-[#92400E] transition-all cursor-pointer group shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xs bg-[#FAF8F5] border academic-hairline flex items-center justify-center text-[#92400E] mb-3 group-hover:bg-[#EDE7DC]">
                <ListChecks className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1C1917] group-hover:text-[#92400E] transition-colors mb-1">
                申请与行前材料核对清单
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                成绩单防伪章、存款证明冻结期、推荐信信头纸逐项打勾自查，避免因缺漏材料被秒拒。
              </p>
              <span className="text-xs text-[#92400E] font-semibold flex items-center gap-1">
                核对材料 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 6：真实学员录取故事与成功案例 (Success Story Carousel)                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SuccessStoryCarousel 
          onSelectCaseBySlug={handleSelectCaseBySlug} 
          onOpenBookingWithAdvisor={handleOpenBookingWithAdvisor} 
        />
      </section>

      {/* ========================================================================= */}
      {/* 模块 7：精选案例卡片展示 (Featured Cases)                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b academic-hairline gap-3">
            <div>
              <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
                REAL ADMISSION CASES · 真实录取实录
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
                申请难点与学术解决方案精选
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-2xl leading-relaxed">
                客观还原学员学术背景痛点与针对性应对方案，给您最真实的参考
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('cases')}
              className="text-xs text-[#92400E] hover:underline font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>查看全部 50+ 案例案卷</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCases.map((c) => (
              <CaseStudyCard 
                key={c.id} 
                item={c} 
                onSelect={(selected) => onSelectCase(selected)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 8：资深顾问导师团队 (Advisor Team)                                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b academic-hairline gap-3">
            <div>
              <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
                ADVISORY TEAM · 资深顾问导师团队
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
                名校学者与资深留学督导
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-2xl leading-relaxed">
                拒绝刚毕业的销售，全员海外名校博士/硕士背景，带教经验丰富，亲自操刀文书与选校
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('advisors')}
              className="text-xs text-[#92400E] hover:underline font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>查看全部顾问资历</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAdvisors.map((adv) => (
              <AdvisorCard 
                key={adv.id} 
                advisor={adv} 
                onAppoint={(advisor: AdvisorItem) => onOpenBooking(advisor.id)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 9：全流程 5 阶透明服务交付 (Process Timeline)                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProcessTimeline />
      </section>

      {/* ========================================================================= */}
      {/* 模块 10：青藤国际 VS 传统流水线中介（签约前必看对比）                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm shadow-xs space-y-6">
          <div className="pb-4 border-b academic-hairline">
            <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
              TRANSPARENCY & COMPARISON · 签约前充分知情
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
              为什么理性家庭更信任青藤国际？
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-2xl leading-relaxed">
              针对传统留学机构四大痛点：模板代写、扣留账号、推诿退费、隐瞒差校，青藤国际实行全透明规范运作
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200 bg-[#FAF8F5] text-[#1C1917]">
                  <th className="p-3.5 font-bold">对比维度</th>
                  <th className="p-3.5 font-bold text-[#92400E] bg-[#EDE7DC]/50">青藤国际 (Ivy Global)</th>
                  <th className="p-3.5 font-medium text-[#78716C]">传统大型流水线中介</th>
                  <th className="p-3.5 font-medium text-[#78716C]">淘宝/个人无资质作坊</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1C1917]">文书创作模式</td>
                  <td className="p-3.5 text-[#92400E] font-medium bg-[#EDE7DC]/20">
                    名校导师 1对1 深度沟通，根据学生亮点完全原创定制，满意后才定稿
                  </td>
                  <td className="p-3.5 text-[#57534E]">文案兼职/实习生套用模板套作，错误率高</td>
                  <td className="p-3.5 text-[#78716C]">语法代写，无学术逻辑，易触发查重拦截</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1C1917]">网申账号权限</td>
                  <td className="p-3.5 text-[#92400E] font-medium bg-[#EDE7DC]/20">
                    100% 账号密码学生自持，递交全过程透明，随时登录官方系统查看
                  </td>
                  <td className="p-3.5 text-[#57534E]">中介扣留邮箱与密码，隐瞒真实申请结果</td>
                  <td className="p-3.5 text-[#78716C]">无系统保障，常出现漏交或错绑材料</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1C1917]">选校策略定位</td>
                  <td className="p-3.5 text-[#92400E] font-medium bg-[#EDE7DC]/20">
                    冲刺、核心、稳妥合理梯队，直击名校热门院系，拒绝推荐野鸡合作校
                  </td>
                  <td className="p-3.5 text-[#57534E]">主推有高额返佣的海外合作校或偏门专业</td>
                  <td className="p-3.5 text-[#78716C]">凭经验盲猜，对最新院校名单毫无概念</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1C1917]">合同与退费保障</td>
                  <td className="p-3.5 text-[#92400E] font-medium bg-[#EDE7DC]/20">
                    正规合同，明文约定“无录取全额退费”，72小时无条件冷静期
                  </td>
                  <td className="p-3.5 text-[#57534E]">霸王条款，即便失误也找各种理由扣留服务费</td>
                  <td className="p-3.5 text-[#78716C]">无正规企业法人，纠纷时直接失联拉黑</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 11：费用边界与安全声明 (Fee Boundary)                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeeBoundary />
      </section>

      {/* ========================================================================= */}
      {/* 模块 12：底部强力转化区 (Bottom CTA)                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] text-[#EDE7DC] p-8 sm:p-12 rounded-sm text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider block">
              START YOUR ADMISSION JOURNEY TODAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-white tracking-tight">
              选对留学领路人，名校录取快人一步
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
              无论您是处于早期的国家选择、背景规划，还是已进入申请季需要紧急文书打磨，青藤国际资深导师都会为您提供客观中肯的专业分析。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#92400E] hover:bg-[#B45309] text-white font-semibold text-xs sm:text-sm rounded-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>立即免费预约 1对1 选校规划</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenWeCom}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#EDE7DC] text-[#1C1917] font-semibold text-xs sm:text-sm rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#059669]" />
              <span>微信即时在线咨询</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-[#78716C] flex items-center justify-center gap-4">
            <span>全国免费热线：400-820-1926</span>
            <span>·</span>
            <span>工作日 15 分钟内专业答复</span>
            <span>·</span>
            <span>严守家庭隐私</span>
          </div>
        </div>
      </section>

    </div>
  );
};

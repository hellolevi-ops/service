import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { 
  SERVICE_LINES, VERTICAL_TRACKS, CASE_STUDIES, ADVISORS, CaseStudyItem, AdvisorItem 
} from '../data/mockData';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { AdvisorCard } from '../components/AdvisorCard';
import { RecentAdmitsTicker } from '../components/RecentAdmitsTicker';
import { QuickIntentMatcher } from '../components/QuickIntentMatcher';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { FeeBoundary } from '../components/FeeBoundary';
import { NewsInsightsSection } from '../components/NewsInsightsSection';
import { 
  OxfordVisual, 
  ColumbiaVisual, 
  HkuNusVisual, 
  AusCanVisual, 
  ArtsStudioVisual, 
  PhdLabVisual,
  OfferBadgeVisual
} from '../components/VisualAssets';

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

  // Flagship Admits for Showcase (图文案例集)
  const flagshipAdmits = [
    {
      university: '牛津大学 (Oxford University)',
      degree: 'MSc in Materials Science',
      badge: '英国 G5 · 罗素集团',
      student: '陈同学 · 985高校材料工程',
      gpa: '均分 89.6 · 雅思 7.5',
      breakthrough: '牛津博导 1对1 挖掘电池储能独立课题，精准匹配导师科研方向',
      slug: 'oxford-materials'
    },
    {
      university: '哥伦比亚大学 (Columbia University)',
      degree: 'MA in Statistics ($15,000奖学金)',
      badge: '美国常春藤 · Top30',
      student: '张同学 · 美本经济与数学双专业',
      gpa: 'GPA 3.12 破格逆袭',
      breakthrough: '重构数据科学量化实训经历，针对性解释大二均分波折，斩获藤校录取',
      slug: 'columbia-stats'
    },
    {
      university: '帝国理工学院 (Imperial College)',
      degree: 'MSc Computing (Software Engineering)',
      badge: '全球 Top6 · 理工翘楚',
      student: '李同学 · 华东双非软科前120',
      gpa: '均分 88.4 · 雅思 7.5',
      breakthrough: '攻关帝国理工 List 外审例外条款，主打独立开源代码库与全栈工程成果',
      slug: 'imperial-computing'
    },
    {
      university: '香港大学 (HKU)',
      degree: 'Master of Laws (LL.M. in Corporate Law)',
      badge: '亚洲顶尖 · 港前三',
      student: '孙同学 · 华东政法大学',
      gpa: '均分 86.8 · 涉外模拟法庭奖项',
      breakthrough: '港大前招生官深度模拟全英文学术面试，第一轮次即斩获无条件录取',
      slug: 'hku-llm'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-[#F8FAFC]">
      
      {/* ========================================================================= */}
      {/* 模块 1：首屏 HERO · 图文并茂学术旗舰主场 (Visual Hero Banner)                 */}
      {/* ========================================================================= */}
      <section className="bg-[#0B1528] text-white pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-slate-800 relative overflow-hidden">
        {/* 背景微光与网格 */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* 顶通公信力状态栏 */}
          <div className="flex flex-wrap items-center justify-between pb-4 mb-8 border-b border-white/10 gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
              <span className="tracking-wide">2026 / 2027 全球名校高端规划通道全面启动</span>
              <span className="text-white/20">/</span>
              <span className="text-slate-300">英美港新海归博导团队限额带教</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="text-slate-300">教育部涉外监管资质合规</span>
              <span className="text-white/20">|</span>
              <span className="text-amber-300 font-medium">
                正规法务合同 · 拒录全额退款保障
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* 左侧 6 列：主标题、核心主张、信任背书、行动入口 */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase block mb-3 font-mono">
                  IVY GLOBAL · 专注全球顶尖大学高端录取
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2] font-editorial-title">
                  选对学术领路人，<br />
                  <span className="text-amber-300">
                    名校录取快人一步
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                拒绝流水线中介模板代写，由海外名校硕博导师亲自操刀。精准把关院校录取内部名单（List）、深度挖掘个人独特学术潜质，网申账号密码 100% 学生自主掌控，签约合同明文约定拒录全额退费。
              </p>

              {/* 四大核心学术保障 (清晰的报刊式双列排版，绝不滥用图标) */}
              <div className="grid grid-cols-2 gap-3.5 pt-2 pb-1 text-xs">
                <div className="border-l-2 border-amber-400/60 pl-3 space-y-0.5">
                  <span className="text-white font-semibold block">名校导师 1对1 规划</span>
                  <span className="text-slate-400 text-[11px] leading-tight block">年限带教 6–8 人，拒绝销售转包</span>
                </div>
                <div className="border-l-2 border-amber-400/60 pl-3 space-y-0.5">
                  <span className="text-white font-semibold block">原创文书满意定稿</span>
                  <span className="text-slate-400 text-[11px] leading-tight block">同行评审级学术构思，杜绝套作</span>
                </div>
                <div className="border-l-2 border-amber-400/60 pl-3 space-y-0.5">
                  <span className="text-white font-semibold block">网申账号 100% 自持</span>
                  <span className="text-slate-400 text-[11px] leading-tight block">密码邮箱公开，随时查阅官方进度</span>
                </div>
                <div className="border-l-2 border-amber-400/60 pl-3 space-y-0.5">
                  <span className="text-white font-semibold block">正规合同 拒录全退</span>
                  <span className="text-slate-400 text-[11px] leading-tight block">签约前明码标价，无任何隐形消费</span>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>免费预约 1对1 专家初步诊断</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={onOpenWeCom}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <span>微信直连导师答疑</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* 关键公信力数字 (Tabular numbers) */}
              <div className="flex items-center gap-6 pt-4 text-xs border-t border-white/10 text-slate-400">
                <div>
                  <span className="text-xl font-bold text-white block leading-tight tabular-nums">98.2%</span>
                  <span>前三志愿录取率</span>
                </div>
                <div className="h-7 w-px bg-white/10" />
                <div>
                  <span className="text-xl font-bold text-white block leading-tight tabular-nums">1,280+</span>
                  <span>全球Top50录取</span>
                </div>
                <div className="h-7 w-px bg-white/10" />
                <div>
                  <span className="text-xl font-bold text-white block leading-tight tabular-nums">100%</span>
                  <span>账号密码自主掌握</span>
                </div>
                <div className="h-7 w-px bg-white/10" />
                <div>
                  <span className="text-xl font-bold text-white block leading-tight tabular-nums">0 隐形消费</span>
                  <span>合同明码标价兜底</span>
                </div>
              </div>

            </div>

            {/* 右侧 6 列：现代智能选校与录取定位测评工作台 */}
            <div className="lg:col-span-6">
              <QuickIntentMatcher onGeneratePlan={handleQuickIntentGenerated} />
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 2：最新录取喜报通知条 (Recent Admits Ticker)                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentAdmitsTicker onSelectCase={() => onNavigate('cases')} />
      </section>

      {/* ========================================================================= */}
      {/* 模块 3：主流留学国家与名校梯队 (图文模式 · 真实校园建筑与专业研判视觉)        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                多国顶尖名校规划专区
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                主流名校录取规程与专业梯队
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                按国家与学科梯队深入剖析学制门槛、院校内部名单（List）认可偏好与录取侧重
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('tracks')}
              className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>查看全部国家详细规划</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 大方向图文卡片网格 (Image-Text Cards Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. 英国 G5 罗素集团 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <OxfordVisual className="w-full h-44" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-950">牛津 · 剑桥 · 帝国理工 · UCL · LSE</span>
                    <span className="tabular-nums">1年制硕博</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    全面掌握英国罗素盟校院系内部认可名单（List），第一轮次递交抢占有限席位，攻关学术文书与先修课要求。
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="text-slate-500 flex justify-between">
                      <span>均分建议：</span>
                      <strong className="text-slate-800">985/211 85%+ · 双非 88%+</strong>
                    </div>
                    <div className="text-slate-500 flex justify-between">
                      <span>轮次节奏：</span>
                      <strong className="text-slate-800">每年 9-11 月第一轮抢跑</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('tracks', 'uk-pg')}
                  className="flex-1 py-2 text-center text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  方案解析
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'uk-pg')}
                  className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 hover:bg-blue-950 text-white rounded-lg transition-colors cursor-pointer"
                >
                  咨询专属博导
                </button>
              </div>
            </div>

            {/* 2. 美国常春藤与 Top30 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <ColumbiaVisual className="w-full h-44" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-950">哥伦比亚 · 康奈尔 · 纽大 · 约翰霍普金斯</span>
                    <span className="tabular-nums">本硕长线</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    注重学术科研经历、推荐信背书与差异化文书故事主轴。由常春藤硕博导师与前招生官 1对1 挖掘核心竞争优势。
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="text-slate-500 flex justify-between">
                      <span>均分建议：</span>
                      <strong className="text-slate-800">GPA 3.6+ · 标化 GRE/GMAT</strong>
                    </div>
                    <div className="text-slate-500 flex justify-between">
                      <span>规划主轴：</span>
                      <strong className="text-slate-800">高含金量科研课题与文书深度</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('tracks', 'us-ug')}
                  className="flex-1 py-2 text-center text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  方案解析
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'us-ug')}
                  className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 hover:bg-blue-950 text-white rounded-lg transition-colors cursor-pointer"
                >
                  咨询专属博导
                </button>
              </div>
            </div>

            {/* 3. 中国香港与新加坡公立名校 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <HkuNusVisual className="w-full h-44" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-950">港大 · 港中文 · 港科大 · NUS · NTU</span>
                    <span className="tabular-nums">高性价比</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    亚洲顶尖公立学府，审理节奏极快（Rolling制），重视院校背景、对口实习与全英文现场面试发挥。
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="text-slate-500 flex justify-between">
                      <span>均分建议：</span>
                      <strong className="text-slate-800">985/211 83%+ · 双非 86%+</strong>
                    </div>
                    <div className="text-slate-500 flex justify-between">
                      <span>面试指导：</span>
                      <strong className="text-slate-800">英文模拟题库与真题实战</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('tracks', 'hk-sg')}
                  className="flex-1 py-2 text-center text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  方案解析
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'hk-sg')}
                  className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 hover:bg-blue-950 text-white rounded-lg transition-colors cursor-pointer"
                >
                  咨询专属博导
                </button>
              </div>
            </div>

            {/* 4. 澳大利亚八大 & 加拿大顶尖大学 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <AusCanVisual className="w-full h-44" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-950">墨尔本 · 悉尼 · 新南威尔士 · 多伦多 · UBC</span>
                    <span className="tabular-nums">宜居深造</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    全球综合排名前列，均分审核公式精细化，提供快速无语言双录取及工签移民衔接方案。
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="text-slate-500 flex justify-between">
                      <span>均分建议：</span>
                      <strong className="text-slate-800">加权算术双向核准与精算</strong>
                    </div>
                    <div className="text-slate-500 flex justify-between">
                      <span>奖学金：</span>
                      <strong className="text-slate-800">协助申请学院最高 20%–50% 减免</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('tracks', 'aus-can')}
                  className="flex-1 py-2 text-center text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  方案解析
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'aus-can')}
                  className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 hover:bg-blue-950 text-white rounded-lg transition-colors cursor-pointer"
                >
                  咨询专属博导
                </button>
              </div>
            </div>

            {/* 5. 艺术设计与建筑空间 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <ArtsStudioVisual className="w-full h-44" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-950">皇家艺术学院 RCA · 伦敦艺术大学 UAL · 罗德岛</span>
                    <span className="tabular-nums">作品集辅导</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    纯原创作品集深度打磨，海外名校在职导师 1对1 评图与策展概念辅导，拒绝模板流水线。
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="text-slate-500 flex justify-between">
                      <span>辅导重心：</span>
                      <strong className="text-slate-800">概念推演、实验性过程与排版</strong>
                    </div>
                    <div className="text-slate-500 flex justify-between">
                      <span>评审机制：</span>
                      <strong className="text-slate-800">名校考官同侪答辩与模拟评审</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('tracks', 'arts')}
                  className="flex-1 py-2 text-center text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  方案解析
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'arts')}
                  className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 hover:bg-blue-950 text-white rounded-lg transition-colors cursor-pointer"
                >
                  咨询专属博导
                </button>
              </div>
            </div>

            {/* 6. 海外博士全奖申请 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <PhdLabVisual className="w-full h-44" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-950">海外终身教职博导团队 · 全额奖学金 (Full Funding)</span>
                    <span className="tabular-nums">学术殿堂</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    研究计划书（RP）深度打磨，海外对口博导精准学术套磁与全真学术面试答辩推演。
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="text-slate-500 flex justify-between">
                      <span>核心输出：</span>
                      <strong className="text-slate-800">博士研究计划书 (Research Proposal)</strong>
                    </div>
                    <div className="text-slate-500 flex justify-between">
                      <span>奖学金目标：</span>
                      <strong className="text-slate-800">免除学费 + 全额生活津贴 (Stipend)</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('services', 'phd')}
                  className="flex-1 py-2 text-center text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  方案解析
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'phd')}
                  className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 hover:bg-blue-950 text-white rounded-lg transition-colors cursor-pointer"
                >
                  咨询专属博导
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 4：名校真实录取榜报大厅 (Offer Showcase · 沉甸甸的图文公信力)         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                2026/2027 真实录取榜报
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                全球顶尖名校录取榜单实录
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                全流程留痕、真实官方录取通知书存档，不夸大、不造假，还原真实学业逆袭之路
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('cases')}
              className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>查看全部 50+ 真实录取案例</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {flagshipAdmits.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => handleSelectCaseBySlug(item.slug)}
                className="bg-slate-50/70 border border-slate-200 p-4 rounded-xl hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80 text-[11px]">
                    <span className="font-semibold text-blue-900">
                      {item.badge}
                    </span>
                    <OfferBadgeVisual universityName={item.university} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-1 font-editorial-title">
                    {item.university}
                  </h3>
                  <span className="text-xs text-slate-600 block mb-2 font-medium">
                    {item.degree}
                  </span>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 mb-3 space-y-1 text-xs">
                    <div className="text-slate-800 font-medium truncate">
                      {item.student}
                    </div>
                    <div className="text-slate-500 text-[11px] tabular-nums">
                      {item.gpa}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    <strong className="text-slate-700">破局打法：</strong>{item.breakthrough}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">导师全案辅导</span>
                  <span className="text-blue-950 font-medium group-hover:underline flex items-center gap-0.5">
                    案卷实录 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 5：真实学员录取实录与破局案卷 (Featured Case Dossiers)                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                录取实录档案
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                真实学术背景与破局录取实录
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                客观还原不同始发背景学子的申请瓶颈、先修课补足及文书重塑策略，提供切实的参考依据
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('cases')}
              className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
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
      {/* 模块 6：海外名校学者与资深留学督导阵容 (图文导师库，写实学者肖像)            */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                海外博导团队
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                海外名校学者与资深留学督导阵容
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                全员具备海外名校博士/硕士学位，带教年限 7–12 年，亲自执笔文书构思与选校推演，杜绝业务员转单
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('advisors')}
              className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
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
      {/* 模块 7：青藤国际 VS 传统流水线中介（签约前必看痛点对照）(The Comparison)    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
              理性家庭的选择
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
              为什么理性的高知家庭更信任青藤国际？
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              针对传统留学机构四大痛点：模板代写、扣留账号、推诿退费、隐瞒差校，青藤国际实行全透明规范运作
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-900">
                  <th className="p-4 font-bold">对比维度</th>
                  <th className="p-4 font-bold text-blue-950 bg-blue-50/70 border-x border-blue-100">青藤国际 (Ivy Global)</th>
                  <th className="p-4 font-medium text-slate-500">传统大型流水线中介</th>
                  <th className="p-4 font-medium text-slate-500">淘宝 / 个人无资质作坊</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-bold text-slate-900">文书创作模式</td>
                  <td className="p-4 text-blue-950 font-semibold bg-blue-50/40 border-x border-blue-100">
                    名校导师 1对1 深度沟通，根据学生亮点完全原创定制，满意后才定稿
                  </td>
                  <td className="p-4 text-slate-600">文案兼职/实习生套用模板套作，错误率高</td>
                  <td className="p-4 text-slate-500">语法代写，无学术逻辑，易触发查重拦截</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">网申账号权限</td>
                  <td className="p-4 text-blue-950 font-semibold bg-blue-50/40 border-x border-blue-100">
                    100% 账号密码学生自持，递交全过程透明，随时登录官方系统查看
                  </td>
                  <td className="p-4 text-slate-600">中介扣留邮箱与密码，隐瞒真实申请结果</td>
                  <td className="p-4 text-slate-500">无系统保障，常出现漏交或错绑材料</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">选校策略定位</td>
                  <td className="p-4 text-blue-950 font-semibold bg-blue-50/40 border-x border-blue-100">
                    冲刺、核心、稳妥合理梯队，直击名校热门院系，拒绝推荐野鸡合作校
                  </td>
                  <td className="p-4 text-slate-600">主推有高额返佣的海外合作校或偏门专业</td>
                  <td className="p-4 text-slate-500">凭经验盲猜，对最新院校名单毫无概念</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">合同与退费保障</td>
                  <td className="p-4 text-blue-950 font-semibold bg-blue-50/40 border-x border-blue-100">
                    正规合同，明文约定“无录取全额退费”，72小时无条件冷静期
                  </td>
                  <td className="p-4 text-slate-600">霸王条款，即便失误也找各种理由扣留服务费</td>
                  <td className="p-4 text-slate-500">无正规企业法人，纠纷时直接失联拉黑</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 8：全学段量身定制学术服务体系 (Service Programs)                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                全周期服务
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                全学段量身定制学术服务体系
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                涵盖名校硕士全案、本科长线早申与博士全奖申请，签约前明确交付清单与拒录退款条款
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('services')}
              className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>查看服务详细条款与报价单</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_LINES.map((srv, idx) => (
              <div 
                key={srv.id}
                className="bg-slate-50/70 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-300 hover:bg-white hover:shadow-xs transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80 text-xs">
                    <span className="font-semibold text-blue-900">
                      项目 0{idx + 1}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-1 font-editorial-title">
                    {srv.name}
                  </h3>
                  <span className="text-xs text-slate-500 block mb-3 font-medium">
                    {srv.subname}
                  </span>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {srv.targetAudience}
                  </p>

                  <div className="border-t border-slate-200/80 pt-3 mb-4 space-y-2">
                    <strong className="text-xs text-slate-900 block font-semibold">核心交付物标准：</strong>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      {srv.deliverables.slice(0, 4).map((d, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                          <span className="leading-snug">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80">
                  <div className="flex items-baseline justify-between mb-3 text-xs">
                    <span className="text-slate-500">收费标准</span>
                    <span className="font-semibold text-slate-900">{srv.pricingLogic}</span>
                  </div>
                  <button
                    onClick={() => onOpenBooking(undefined, srv.id)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-blue-950 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>预约该服务学术初诊</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 9：决策自测工具箱 (Decision Toolkit)                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                决策工具箱
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                官方录取规程对齐 · 申请决策工具箱
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                签约前可先免费自测：核准你的均分档次、粗算真实留学开支、逐项核对材料防被秒拒
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('lab')}
              className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>进入完整学术工具箱</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 工具 1 */}
            <div 
              onClick={() => onNavigate('lab', 'assessment')}
              className="bg-slate-50/70 hover:bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider block mb-2">
                  TOOL 01 · 录取概率
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1 font-editorial-title">
                  名校录取概率快速自测
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  输入本科学校档次、绩点成绩与专业方向，即时评估冲刺、核心与保底院校梯度。
                </p>
              </div>
              <span className="text-xs text-blue-950 font-semibold flex items-center gap-1">
                <span>免费自测评级</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            {/* 工具 2 */}
            <div 
              onClick={() => onNavigate('lab', 'cost')}
              className="bg-slate-50/70 hover:bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider block mb-2">
                  TOOL 02 · 留学花费
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1 font-editorial-title">
                  留学总费用预算粗算器
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  选择目标国家与生活消费水准，生成精细到学费、住宿费与汇率波动的总开销清单。
                </p>
              </div>
              <span className="text-xs text-blue-950 font-semibold flex items-center gap-1">
                <span>测算花费预算</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            {/* 工具 3 */}
            <div 
              onClick={() => onNavigate('lab', 'checklist')}
              className="bg-slate-50/70 hover:bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider block mb-2">
                  TOOL 03 · 材料自检
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1 font-editorial-title">
                  申请与行前材料核对清单
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  成绩单盖章、存款冻结期、推荐信抬头逐项打勾自查，避免因缺漏材料被秒拒。
                </p>
              </div>
              <span className="text-xs text-blue-950 font-semibold flex items-center gap-1">
                <span>逐项核对材料</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 模块 10：全流程 5 阶透明服务交付 (Process Timeline)                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProcessTimeline />
      </section>

      {/* ========================================================================= */}
      {/* 模块 11：留学政策资讯与官方动态 (News & Insights)                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsInsightsSection 
          onNavigate={onNavigate} 
          onOpenWeCom={onOpenWeCom} 
        />
      </section>

      {/* ========================================================================= */}
      {/* 模块 12：费用边界与安全声明 (Fee Boundary)                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeeBoundary />
      </section>

      {/* ========================================================================= */}
      {/* 模块 13：底部公信力与学术咨询预约区 (Bottom Reassurance & CTA)             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1528] text-white p-8 sm:p-14 rounded-2xl text-center space-y-6 relative overflow-hidden shadow-lg border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-semibold text-amber-400 tracking-wider block uppercase font-mono">
              严谨治学 · 诚信交付 · 拒录全额退款
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-editorial-title">
              选对留学领路人，名校录取快人一步
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              无论您是处于早期的国家选择、学术背景规划，还是已进入申请季需要紧急文书打磨，青藤国际资深导师都会为您提供客观中肯的专业分析。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>立即免费预约 1对1 选校规划</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <button
              onClick={onOpenWeCom}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <span>微信即时在线咨询</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span>专属博导 1对1 规划</span>
            <span>·</span>
            <span>工作日 15 分钟内专业答复</span>
            <span>·</span>
            <span>严格遵守家庭隐私保护条例</span>
            <span>·</span>
            <span>网申账号100%自主掌控</span>
          </div>
        </div>
      </section>

    </div>
  );
};

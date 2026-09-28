import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Quote, Award, BookOpen, 
  ArrowRight, ShieldCheck, TrendingUp, ExternalLink, Pause, Play, Sparkles
} from 'lucide-react';
import { CASE_STUDIES } from '../data/mockData';

export interface AlumniStory {
  caseSlug: string;
  studentInitials: string;
  enrollmentYear: string;
  originInstitution: string;
  gpaAndScores: string;
  admittedSchool: string;
  admittedDegree: string;
  scholarshipOrHonor?: string;
  currentTrajectory: string;
  academicBreakthrough: string;
  quote: string;
  advisorSignature: string;
  advisorTitle: string;
  domainTrack: string;
}

const ALUMNI_STORIES: AlumniStory[] = [
  {
    caseSlug: 'imperial-college-cs-2025',
    studentInitials: 'T同学',
    enrollmentYear: '2025秋季录取',
    originInstitution: '华东双非重点高校 · 软件工程系 (年级前3%)',
    gpaAndScores: '均分 88.6 / 100 · 雅思 7.5 (单项6.5+)',
    admittedSchool: '帝国理工学院 (Imperial College London)',
    admittedDegree: 'MSc Computing (Software Engineering)',
    scholarshipOrHonor: '全奖候选资格 · 官方无条件直录 (Unconditional Offer)',
    currentTrajectory: '目前于牛津大学联合实验室担任客座访问学者，已投递首篇顶级系统会议论文。',
    academicBreakthrough: '弥补双非非核心名单的背景限制，导师指导重构 25 页中英课程大纲微积分与体系结构学分证明，并系统性展示其在开源分布式计算系统的学术贡献。',
    quote: '“导师不仅带我看清了帝国理工在分布式系统方向的研究重点，更把我的文书从普通自述升华成了一篇具备同行交流水准的学术文书。这彻底改变了我对留学申请的认知。”',
    advisorSignature: '陆博 (Dr. Lu)',
    advisorTitle: '剑桥大学三一学院博士后 · 理工科申请规划总监',
    domainTrack: '英国 G5 硕士'
  },
  {
    caseSlug: 'columbia-ivy-undergrad-2025',
    studentInitials: 'C同学',
    enrollmentYear: '2025秋季录取 (早申请 ED)',
    originInstitution: '北京某公立示范高中国际部 · AP 体系',
    gpaAndScores: 'GPA 3.92 / 4.0 · 托福 114 · SAT 1540',
    admittedSchool: '哥伦比亚大学 (Columbia University)',
    admittedDegree: 'Columbia College (History & Economics 双专业)',
    scholarshipOrHonor: '入选哥大本科跨学科杰出青年学者培养计划 (Columbia Scholar)',
    currentTrajectory: '大一即受邀加入哥伦比亚大学拉蒙特实证经济研究中心，担任亚太区域口述史研究助理。',
    academicBreakthrough: '摒弃千篇一律的商业模拟赛，顾清华博士启发其立足北京胡同非正式经济开展为期 18 个月的田野人类学调查，形成兼具中国在地情怀与西方学术范式的完整申请主轴。',
    quote: '“青藤国际没有像传统中介那样逼我凑竞赛，而是教我如何真正像一个学者一样去好奇自己的城市。在纽约晨边高地的图书馆里，我依然能感受到当初在书院构思主文书时内心的那份坚定。”',
    advisorSignature: '顾清华 博士 (Dr. Gu)',
    advisorTitle: '哥伦比亚大学教育学博士 · 常春藤本科早申专家',
    domainTrack: '美本常春藤'
  },
  {
    caseSlug: 'nus-fintech-2026',
    studentInitials: 'W同学',
    enrollmentYear: '2026春季提前批直录',
    originInstitution: '武汉某 211 高校 · 金融学 (均分 86.2)',
    gpaAndScores: '均分 86.2 / 100 · GMAT 680 · 雅思 7.0',
    admittedSchool: '新加坡国立大学 (NUS)',
    admittedDegree: 'MSc Digital Financial Technology',
    scholarshipOrHonor: '第一轮次无条件优先直录',
    currentTrajectory: '目前于新加坡淡马锡旗下数字金融创新实验室开展毕业设计。',
    academicBreakthrough: '克服转专业 Python 与计量经济先修课学分欠缺，针对性定制新加坡金融科技监管沙盒真实项目演练，实现文书降维打击。',
    quote: '“NUS 这个专业每年录取率不到 5%，青藤国际精准指导我补足了三门计算机关键核心先修课，面试模拟更是押中了三道原题！”',
    advisorSignature: '林哲 硕士 (M.Phil. Lin)',
    advisorTitle: '新加坡国立大学计算金融硕士 · 亚洲顶级公立名校主管',
    domainTrack: '港新名校硕士'
  }
];

interface SuccessStoryCarouselProps {
  onSelectCaseBySlug: (slug: string) => void;
  onOpenBookingWithAdvisor?: (advisorName: string) => void;
}

export const SuccessStoryCarousel: React.FC<SuccessStoryCarouselProps> = ({
  onSelectCaseBySlug,
  onOpenBookingWithAdvisor
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentStory = ALUMNI_STORIES[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % ALUMNI_STORIES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + ALUMNI_STORIES.length) % ALUMNI_STORIES.length);
  };

  const handleSelectDot = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 7500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div 
      className="bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl shadow-sm relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-mono font-semibold text-blue-800 tracking-wider block mb-1">
            04 / ADMISSION STORIES
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
            学员真实录取故事与心路实录
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            真实申请档案记录 · 记录普通学子打破门槛入读世界顶级名校的突破路径
          </p>
        </div>

        {/* Carousel Operational Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-2 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            title={isAutoPlaying ? '暂停轮播' : '恢复自动轮播'}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-blue-700" /> : <Play className="w-3.5 h-3.5 text-emerald-700" />}
            <span className="text-xs hidden sm:inline">{isAutoPlaying ? '自动轮播' : '已暂停'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 px-3 py-1.5 bg-slate-100 rounded-lg font-bold">
            <span className="text-blue-700">{currentIndex + 1}</span>
            <span className="text-slate-400">/</span>
            <span>{ALUMNI_STORIES.length}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="查看上一份案例"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="查看下一份案例"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Animated Carousel Body */}
      <div className="relative min-h-[340px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left 5 Cols: Student Identity, Admission, and Trajectory */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 border border-slate-200/90 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
                  <span className="font-semibold text-blue-800">
                    {currentStory.domainTrack}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">{currentStory.enrollmentYear}</span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-editorial-title">
                    {currentStory.admittedSchool}
                  </h4>
                  <span className="text-xs text-slate-600 font-medium block mt-0.5">
                    {currentStory.admittedDegree}
                  </span>
                </div>

                {currentStory.scholarshipOrHonor && (
                  <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60">
                    <Award className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                    <span className="leading-snug font-semibold">{currentStory.scholarshipOrHonor}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs pt-1 text-slate-600">
                  <div>
                    <span className="text-slate-400 mr-1.5">始发背景：</span>
                    <strong className="text-slate-900">{currentStory.studentInitials} · {currentStory.originInstitution}</strong>
                  </div>
                  <div className="tabular-nums">
                    <span className="text-slate-400 mr-1.5">标化均分：</span>
                    <span className="font-bold text-slate-900">{currentStory.gpaAndScores}</span>
                  </div>
                </div>
              </div>

              {/* Trajectory Box */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl text-xs space-y-1">
                <span className="text-xs font-semibold text-slate-900 block flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
                  <span>学员当前学术与深造动态</span>
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {currentStory.currentTrajectory}
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Academic Breakthrough, Verbatim Quote, Advisor Signature */}
            <div className="lg:col-span-7 space-y-5">
              {/* Breakthrough */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>背景突破点与导师对策</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  {currentStory.academicBreakthrough}
                </p>
              </div>

              {/* Quote Block (Refined editorial typography) */}
              <blockquote className="bg-slate-50 border-l-4 border-slate-900 p-5 rounded-r-xl border-y border-r border-slate-200/70">
                <Quote className="w-5 h-5 text-slate-400 mb-2" />
                <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed font-editorial-title">
                  {currentStory.quote}
                </p>
              </blockquote>

              {/* Advisor attribution & Quick actions */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0 font-editorial-title">
                    {currentStory.advisorSignature.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block font-editorial-title">
                      指导导师：{currentStory.advisorSignature}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {currentStory.advisorTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => onSelectCaseBySlug(currentStory.caseSlug)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>查看完整案卷</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  {onOpenBookingWithAdvisor && (
                    <button
                      onClick={() => onOpenBookingWithAdvisor(currentStory.advisorSignature)}
                      className="px-4 py-2 bg-slate-900 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>预约同类规划</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {ALUMNI_STORIES.map((story, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => handleSelectDot(dotIdx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`切换至 ${story.studentInitials} 案例`}
              aria-label={`切换至第 ${dotIdx + 1} 个案例`}
            />
          ))}
          <span className="text-xs text-slate-400 ml-2">点击指示点快速切换</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>所引感言与录取数据均经学员书面脱敏授权备案</span>
        </div>
      </div>
    </div>
  );
};

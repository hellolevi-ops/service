import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Quote, Award, BookOpen, 
  User, ArrowRight, ShieldCheck, TrendingUp, Building2, ExternalLink, Pause, Play
} from 'lucide-react';
import { CASE_STUDIES, CaseStudyItem } from '../data/mockData';

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
    currentTrajectory: '目前于牛津大学量子计算联合实验室担任客座访问学者，已投递首篇顶级系统会议论文。',
    academicBreakthrough: '弥补双非非核心名单的背景限制，陆博指导重构 25 页中英课程大纲微积分与体系结构学分证明，并系统性展示其在开源分布式计算系统的学术贡献。',
    quote: '“陆博不仅带我看清了帝国理工导师在分布式系统方向的研究重点，更把我的文书从普通自述升华成了一篇具备同行交流水准的学术备忘录。这彻底改变了我对留学申请的认知。”',
    advisorSignature: '陆博 (Dr. Lu)',
    advisorTitle: '剑桥大学三一学院博士后 · 自然科学与工程研判领衔',
    domainTrack: '英国 G5 研博深耕'
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
    academicBreakthrough: '摒弃千篇一律的商业模拟赛，顾清华博士启发其立足北京胡同非正式经济开展为期 18 个月的田野人类学调查，形成兼具中国在地情怀与西方史学范式的完整学术主轴。',
    quote: '“书院没有像传统中介那样逼我凑竞赛，而是教我如何真正像一个学者一样去好奇自己的城市。在纽约晨边高地的图书馆里，我依然能感受到当初在书院构思主文书时内心的那份坚定。”',
    advisorSignature: '顾清华 博士 (Dr. Gu)',
    advisorTitle: '哥伦比亚大学教育学博士 · 常春藤盟校本科研判领衔',
    domainTrack: '美本常春藤 & Top 30'
  },
  {
    caseSlug: 'nus-fintech-2026',
    studentInitials: 'L同学',
    enrollmentYear: '2026春季首轮录取',
    originInstitution: '华中某 985 重点大学 · 金融工程专业',
    gpaAndScores: '均分 85.2 / 100 · 托福 103 · GMAT Focus 675',
    admittedSchool: '新加坡国立大学 (NUS)',
    admittedDegree: 'MSc in Digital Financial Technology (金融科技)',
    scholarshipOrHonor: '首轮 Early 批次直录 · 兼获香港科技大学全额录取',
    currentTrajectory: '已锁定新加坡主权基金淡马锡 (Temasek) 生态量化对冲基金暑期投资分析师席位。',
    academicBreakthrough: '在 985 绩点处于中位线的劣势下，陈立言导师深挖其券商量化风控对冲建模实操，全真模拟新国立全英专业技术面试与新加坡金管局 (MAS) 最新监管沙盒条例。',
    quote: '“面试前一晚，陈老师带着我把新加坡金融科技最新白皮书复盘了三遍。次日教授提问了完全相同的监管博弈命题，我从容作答，次周即收到官方录用通知。”',
    advisorSignature: '陈立言 导师 (Prof. Chen)',
    advisorTitle: '伦敦政经 LSE 金融学硕士 · 港新与亚太商科研判领衔',
    domainTrack: '港新公立顶尖研判'
  },
  {
    caseSlug: 'oxford-materials-msc-2025',
    studentInitials: 'W同学',
    enrollmentYear: '2025秋季录取',
    originInstitution: '华中科技类 985 重点大学 · 材料科学与工程',
    gpaAndScores: '均分 89.4 / 100 · 雅思 7.5 (单项7.0+)',
    admittedSchool: '牛津大学 (University of Oxford)',
    admittedDegree: 'MSc in Materials Science and Engineering',
    scholarshipOrHonor: '免除全部语言先修班要求 · 直接进入核心国家实验室课题组',
    currentTrajectory: '正在牛津大学 Begbroke 科学园参与下一代超导材料表征前沿实验，拟直博深造。',
    academicBreakthrough: '针对其自写文书缺乏学术批判性的短板，陆博带读牛津材料系最新 5 篇顶刊文献，在学术目的陈述中精准指出牛津当前实验室研究的潜在补充点，将申请信提升为同行学术备忘录。',
    quote: '“学术申请讲求‘对话感’。青藤国际让我明白，向牛津教授陈述申请意图，不是卑微求学，而是在同行学者之间展示你的学术价值与独立思考。”',
    advisorSignature: '陆博 (Dr. Lu)',
    advisorTitle: '剑桥大学物理学博士后 · 皇家物理学会 (IOP) 会员',
    domainTrack: '英国 G5 研博深耕'
  },
  {
    caseSlug: 'risd-mdes-interdisciplinary-2025',
    studentInitials: 'M同学',
    enrollmentYear: '2025秋季录取',
    originInstitution: '国内普通二本美术学院 · 视觉传达系',
    gpaAndScores: 'GPA 3.45 / 4.0 · 托福 98 (写作26)',
    admittedSchool: '罗德岛设计学院 (RISD)',
    admittedDegree: 'Master of Design (MDes in Adaptive Reuse)',
    scholarshipOrHonor: '荣获 12,000 美元专项院长学术成就奖学金 (Dean’s Fellowship)',
    currentTrajectory: '受邀在普罗维登斯当代建筑年会上展出毕业调研手稿《中国传统木构的非实体数字化再造》。',
    academicBreakthrough: '沈梦舟导师推翻其早期流水线商业渲染图，指导其回归物质材质本身的破坏性实验与草图本（Sketchbook）空间思辨，重塑极具个人力量的艺术家陈述 (Artist Statement)。',
    quote: '“沈老师逼着我丢掉了几十张精致却空洞的效果图，逼我拿起刻刀与木头去感受材料的裂纹。那本沾满木屑与铅笔灰的手稿本，成了打动 RISD 教授的决定性钥匙。”',
    advisorSignature: '沈梦舟 导师 (M. Shen)',
    advisorTitle: '罗德岛设计学院 (RISD) 硕士 · 跨学科设计实验室主任',
    domainTrack: '跨学科设计与前沿艺术'
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
  const [direction, setDirection] = useState<number>(1);
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

  // Autoplay management
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
      x: direction > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -40 : 40,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <div 
      className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-10 rounded-sm shadow-xs relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b academic-hairline gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#92400E]" />
            <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider font-sans">
              ALUMNI SCHOLAR ACHIEVEMENTS & TESTIMONIALS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917]">
            学长学者成就展厅与实证答卷
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5">
            脱敏学术档案库 · 追踪带教学员自申请录取至海外在研阶段的真实学术成长
          </p>
        </div>

        {/* Carousel Operational Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1.5 text-xs text-[#78716C] hover:text-[#1C1917] bg-[#F5F2EB] border academic-hairline rounded-xs flex items-center gap-1 transition-colors"
            title={isAutoPlaying ? '暂停轮播' : '恢复自动轮播'}
          >
            {isAutoPlaying ? <Pause className="w-3 h-3 text-[#92400E]" /> : <Play className="w-3 h-3 text-[#059669]" />}
            <span className="text-[10px] hidden sm:inline">{isAutoPlaying ? '轮播中' : '已暂停'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#78716C] px-2 py-1 bg-[#FBF9F5] border academic-hairline rounded-xs">
            <span className="text-[#1C1917] font-bold">{currentIndex + 1}</span>
            <span className="text-[#A8A29E]">/</span>
            <span>{ALUMNI_STORIES.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F2EB] border academic-hairline rounded-xs transition-colors cursor-pointer"
              aria-label="查看上一份学者案例"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F2EB] border academic-hairline rounded-xs transition-colors cursor-pointer"
              aria-label="查看下一份学者案例"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Animated Carousel Body */}
      <div className="relative min-h-[360px] overflow-hidden">
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
              <div className="bg-[#FAF8F5] border academic-hairline p-5 rounded-xs space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b academic-hairline">
                  <span className="font-semibold text-[#92400E] bg-[#FFFFFF] px-2 py-0.5 rounded-xs border academic-hairline">
                    {currentStory.domainTrack}
                  </span>
                  <span className="font-mono text-[#78716C]">{currentStory.enrollmentYear}</span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917] leading-snug">
                    {currentStory.admittedSchool}
                  </h4>
                  <span className="text-xs text-[#57534E] font-medium block mt-0.5">
                    {currentStory.admittedDegree}
                  </span>
                </div>

                {currentStory.scholarshipOrHonor && (
                  <div className="flex items-start gap-1.5 text-xs text-[#065F46] bg-[#ECFDF5] p-2.5 rounded-xs border border-[#A7F3D0]">
                    <Award className="w-4 h-4 shrink-0 text-[#059669] mt-0.5" />
                    <span className="leading-snug">{currentStory.scholarshipOrHonor}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs pt-1 text-[#57534E]">
                  <div>
                    <span className="text-[#A8A29E] mr-1">始发背景：</span>
                    <strong className="text-[#1C1917] font-medium">{currentStory.studentInitials} · {currentStory.originInstitution}</strong>
                  </div>
                  <div>
                    <span className="text-[#A8A29E] mr-1">标化均分：</span>
                    <span className="font-mono text-[#1C1917] font-medium">{currentStory.gpaAndScores}</span>
                  </div>
                </div>
              </div>

              {/* Trajectory Box */}
              <div className="bg-[#FBF9F5] border academic-hairline p-4 rounded-xs text-xs space-y-1">
                <span className="text-[11px] font-semibold text-[#92400E] uppercase tracking-wider block flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>学者当前学术与职业成就发展</span>
                </span>
                <p className="text-[#44403C] leading-relaxed font-serif-title">
                  {currentStory.currentTrajectory}
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Academic Breakthrough, Verbatim Quote, Advisor Signature */}
            <div className="lg:col-span-7 space-y-5">
              {/* Breakthrough */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#92400E]" />
                  <span>关键背景考量与应对建议 (Advisory Evaluation)</span>
                </span>
                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xs border academic-hairline font-serif-title">
                  {currentStory.academicBreakthrough}
                </p>
              </div>

              {/* Quote Block */}
              <div className="bg-[#FFFFFF] border-l-3 border-[#92400E] p-4 sm:p-5 rounded-r-xs bg-[#FAF8F5]/30 border-y border-r academic-hairline">
                <Quote className="w-6 h-6 text-[#D6CEBF] mb-2" />
                <p className="text-sm sm:text-base text-[#1C1917] font-serif-title italic leading-relaxed">
                  {currentStory.quote}
                </p>
              </div>

              {/* Advisor attribution & Quick actions */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif-title font-bold text-sm shrink-0">
                    {currentStory.advisorSignature.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-[#1C1917] block">
                      指导带教学者：{currentStory.advisorSignature}
                    </span>
                    <span className="text-[11px] text-[#78716C] block">
                      {currentStory.advisorTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => onSelectCaseBySlug(currentStory.caseSlug)}
                    className="px-3 py-1.5 bg-[#F5F2EB] hover:bg-[#EDE7DC] text-[#78350F] font-medium rounded-xs border academic-hairline flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>查看完整研判案卷</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  {onOpenBookingWithAdvisor && (
                    <button
                      onClick={() => onOpenBookingWithAdvisor(currentStory.advisorSignature)}
                      className="px-3 py-1.5 bg-[#1C1917] hover:bg-[#78350F] text-white font-medium rounded-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>预约同类研判</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators & Auto-progress timeline */}
      <div className="mt-8 pt-4 border-t academic-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {ALUMNI_STORIES.map((story, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => handleSelectDot(dotIdx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-8 bg-[#92400E]'
                  : 'w-2 bg-[#D6CEBF] hover:bg-[#A8A29E]'
              }`}
              title={`切换至 ${story.studentInitials} 案例`}
              aria-label={`切换至第 ${dotIdx + 1} 个案例`}
            />
          ))}
          <span className="text-[11px] text-[#A8A29E] ml-2">点击指示点快速切换案例</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#78716C]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
          <span>所引感言与学术去向均经当事学子书面审查授权备案</span>
        </div>
      </div>
    </div>
  );
};

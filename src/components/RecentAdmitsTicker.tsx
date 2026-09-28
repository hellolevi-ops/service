import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, ShieldCheck, ChevronRight } from 'lucide-react';

interface AdmitNotification {
  id: string;
  timeAgo: string;
  student: string;
  undergrad: string;
  gpa: string;
  school: string;
  program: string;
  track: string;
}

const RECENT_ADMITS: AdmitNotification[] = [
  {
    id: 'a1',
    timeAgo: '12分钟前',
    student: '李同学',
    undergrad: '华东双非软科前120',
    gpa: '均分 88.4',
    school: '帝国理工学院 (Imperial College)',
    program: 'MSc Computing (Software Engineering)',
    track: '英研G5'
  },
  {
    id: 'a2',
    timeAgo: '28分钟前',
    student: '张同学',
    undergrad: '北京某公立示范国际部',
    gpa: 'GPA 3.94 / SAT 1540',
    school: '哥伦比亚大学 (Columbia University)',
    program: 'Columbia College (History & Econ)',
    track: '美本Top30'
  },
  {
    id: 'a3',
    timeAgo: '45分钟前',
    student: '王同学',
    undergrad: '武汉某211高校 · 金融',
    gpa: '均分 86.2 / GMAT 680',
    school: '新加坡国立大学 (NUS)',
    program: 'MSc Digital Financial Technology',
    track: '港新前沿'
  },
  {
    id: 'a4',
    timeAgo: '1小时前',
    student: '陈同学',
    undergrad: '985大学 · 材料科学',
    gpa: '均分 89.6 / 雅思 7.5',
    school: '牛津大学 (Oxford University)',
    program: 'MSc in Materials Science',
    track: '英研G5'
  },
  {
    id: 'a5',
    timeAgo: '2小时前',
    student: '赵同学',
    undergrad: '普通本科 · 艺术设计',
    gpa: 'GPA 3.42 / 托福 99',
    school: '罗德岛设计学院 (RISD)',
    program: 'MDes in Adaptive Reuse ($12,000奖学金)',
    track: '艺术跨学科'
  },
  {
    id: 'a6',
    timeAgo: '3小时前',
    student: '孙同学',
    undergrad: '华东政法大学 · 法学',
    gpa: '均分 86.8 / 雅思 7.5',
    school: '香港大学 (HKU)',
    program: 'Master of Laws (LL.M. in Corporate Law)',
    track: '港新前沿'
  }
];

interface RecentAdmitsTickerProps {
  onSelectCase?: () => void;
}

export const RecentAdmitsTicker: React.FC<RecentAdmitsTickerProps> = ({ onSelectCase }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % RECENT_ADMITS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = RECENT_ADMITS[currentIndex];

  return (
    <div className="bg-[#1C1917] text-[#EDE7DC] border-y border-[#3E3A36] py-2 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
          <span className="font-semibold text-[#F59E0B] tracking-wide flex items-center gap-1 font-mono uppercase text-[11px]">
            <Award className="w-3.5 h-3.5" />
            2026/2027 实时录取放榜播报
          </span>
          <span className="text-[#57534E]">|</span>
        </div>

        {/* Center Animated Notification */}
        <div className="flex-1 flex items-center gap-2 overflow-hidden text-center sm:text-left justify-center sm:justify-start">
          <span className="text-[11px] text-[#A8A29E] shrink-0 font-mono">[{current.timeAgo}]</span>
          <span className="font-medium text-[#FBF9F5] truncate">
            恭喜 <strong className="text-[#D97706]">{current.student}</strong>（{current.undergrad} · {current.gpa}）
            斩获 <strong className="text-white underline decoration-[#92400E] underline-offset-2">{current.school}</strong> {current.program}！
          </span>
        </div>

        {/* Right CTA */}
        <button
          onClick={onSelectCase}
          className="shrink-0 text-[11px] text-[#EDE7DC] hover:text-[#F59E0B] transition-colors flex items-center gap-1 font-medium group cursor-pointer"
        >
          <span>查看全部实证案卷</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

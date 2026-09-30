"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

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
    <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-xl py-2.5 px-4 sm:px-6 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-amber-400 font-bold text-xs tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            2026/2027 官方录取喜报
          </span>
          <span className="text-slate-700">|</span>
        </div>

        {/* Center Animated Notification */}
        <div className="flex-1 flex items-center gap-2 overflow-hidden text-center sm:text-left justify-center sm:justify-start">
          <span className="text-[11px] text-slate-400 shrink-0 font-mono">[{current.timeAgo}]</span>
          <span className="font-medium text-white truncate">
            恭喜 <strong className="text-amber-400 font-bold">{current.student}</strong>（{current.undergrad} · {current.gpa}）
            斩获 <strong className="text-blue-400 font-bold">{current.school}</strong> {current.program}！
          </span>
        </div>

        {/* Right CTA */}
        <button
          onClick={onSelectCase}
          className="shrink-0 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-semibold group cursor-pointer"
        >
          <span>查看全部录取案例</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-amber-400" />
        </button>
      </div>
    </div>
  );
};

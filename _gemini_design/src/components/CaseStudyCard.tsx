import React from 'react';
import { CaseStudyItem } from '../data/mockData';
import { ChevronRight } from 'lucide-react';

interface CaseStudyCardProps {
  item: CaseStudyItem;
  onSelect: (item: CaseStudyItem) => void;
  onAppointAdvisor?: (advisorId: string) => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  item,
  onSelect,
  onAppointAdvisor
}) => {
  // 根据录取的大学赋予不同的视觉特色色带
  const isUk = item.trackId.includes('uk');
  const isUs = item.trackId.includes('us');
  const isHkSg = item.trackId.includes('hk') || item.trackId.includes('sg');

  const bannerBg = isUk 
    ? 'from-blue-950 to-indigo-900' 
    : isUs 
    ? 'from-sky-950 to-blue-900' 
    : isHkSg 
    ? 'from-teal-950 to-slate-900' 
    : 'from-slate-900 to-slate-800';

  return (
    <div 
      onClick={() => onSelect(item)}
      className="bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden cursor-pointer"
    >
      <div>
        {/* 卡片顶部：图文视觉横幅 (Image-Text Banner Header) */}
        <div className={`p-4 bg-gradient-to-r ${bannerBg} text-white relative overflow-hidden`}>
          <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
          
          <div className="flex items-center justify-between text-[11px] pb-2 mb-2 border-b border-white/15">
            <span className="font-semibold text-amber-300">
              {item.trackName}
            </span>
            <span className="text-slate-300 tabular-nums">
              {item.enrollmentYear} 录取档
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors leading-tight font-editorial-title">
            {item.admitUniversity}
          </h4>
          <span className="text-xs text-slate-200 block mt-1 font-medium truncate">
            {item.admitProgram}
          </span>
        </div>

        <div className="p-5 space-y-3.5">
          {/* Background Details Summary */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="text-slate-700">
              <span className="text-slate-400 mr-1.5">始发背景：</span>
              <span className="font-semibold text-slate-900">{item.undergradProfile}</span>
            </div>
            <div className="text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200 tabular-nums">
              <span>
                <span className="text-slate-400 mr-1">GPA：</span>
                <span className="font-bold text-slate-900">{item.gpa}</span>
              </span>
              <span>
                <span className="text-slate-400 mr-1">标化：</span>
                <span className="font-bold text-slate-900">{item.testScores}</span>
              </span>
            </div>
          </div>

          {/* Core Bottlenecks Highlight */}
          <div className="text-xs space-y-1">
            <div className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider">
              申请难点：
            </div>
            <p className="text-slate-600 line-clamp-2 leading-relaxed">
              {item.hardBottlenecks}
            </p>
          </div>

          {/* Strategic Insight Snippet */}
          <div className="text-xs space-y-1">
            <div className="text-[11px] font-semibold text-slate-900 uppercase tracking-wider">
              学术破局：
            </div>
            <p className="text-slate-700 line-clamp-2 leading-relaxed">
              {item.strategicInsight}
            </p>
          </div>
        </div>
      </div>

      {/* Footer: Advisor Sign-off + Detail CTA */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">
          带教导师：{item.leadAdvisorName}
        </span>

        <span className="font-semibold text-blue-950 group-hover:text-blue-700 flex items-center gap-0.5 transition-colors">
          <span>阅读案卷实录</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};

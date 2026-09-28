import React from 'react';
import { CaseStudyItem } from '../data/mockData';
import { ArrowRight, Award, ShieldAlert, User, BookOpen } from 'lucide-react';

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
  return (
    <div className="bg-[#FFFFFF] border academic-hairline p-5 sm:p-6 rounded-sm hover:border-[#92400E] transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between">
      <div>
        {/* Top Meta: Academic Track + Background Grade */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b academic-hairline text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#92400E] bg-[#F5F2EB] px-2 py-0.5 rounded-xs">
              {item.trackName}
            </span>
            <span className="text-[#78716C] font-mono">{item.enrollmentYear}</span>
          </div>
          <span className="text-[#44403C] font-medium bg-[#EDE7DC]/70 px-2 py-0.5 rounded-xs">
            {item.backgroundGrade}
          </span>
        </div>

        {/* Student Target & Admit University */}
        <div className="mb-3">
          <h4 className="text-base sm:text-lg font-serif-title font-bold text-[#1C1917] group-hover:text-[#92400E] leading-snug">
            {item.admitUniversity}
          </h4>
          <span className="text-xs text-[#78716C] block mt-0.5 font-medium">
            {item.admitProgram}
          </span>
        </div>

        {/* Background Details Summary */}
        <div className="bg-[#FBF9F5] p-3 rounded-xs border academic-hairline mb-3 text-xs space-y-1">
          <div className="text-[#57534E]">
            <span className="text-[#A8A29E] mr-1.5">原始背景：</span>
            <span>{item.undergradProfile}</span>
          </div>
          <div className="text-[#57534E] flex items-center justify-between">
            <span>
              <span className="text-[#A8A29E] mr-1.5">GPA/均分：</span>
              <span className="font-mono font-medium text-[#1C1917]">{item.gpa}</span>
            </span>
            <span>
              <span className="text-[#A8A29E] mr-1.5">语言/标化：</span>
              <span className="font-mono font-medium text-[#1C1917]">{item.testScores}</span>
            </span>
          </div>
        </div>

        {/* Core Bottlenecks Highlight */}
        <div className="mb-3">
          <div className="text-[11px] font-semibold text-[#DC2626] uppercase tracking-wider mb-1 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            <span>核心申请难点 (Bottleneck)</span>
          </div>
          <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed">
            {item.hardBottlenecks}
          </p>
        </div>

        {/* Strategic Insight Snippet */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-[#059669] uppercase tracking-wider mb-1 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>书院导师应对建议</span>
          </div>
          <p className="text-xs text-[#44403C] line-clamp-2 leading-relaxed font-serif-title">
            {item.strategicInsight}
          </p>
        </div>
      </div>

      {/* Footer: Advisor Sign-off + Detail CTA */}
      <div className="pt-3 border-t academic-hairline flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#57534E]">
          <User className="w-3.5 h-3.5 text-[#A8A29E]" />
          <span>指导：{item.leadAdvisorName}</span>
        </div>

        <button
          onClick={() => onSelect(item)}
          className="text-xs font-semibold text-[#92400E] hover:text-[#78350F] flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>完整研判案卷</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { AdvisorItem } from '../data/mockData';
import { Award, BookOpen, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AdvisorCardProps {
  advisor: AdvisorItem;
  onAppoint: (advisor: AdvisorItem) => void;
  onViewCase?: (caseSlug: string) => void;
}

export const AdvisorCard: React.FC<AdvisorCardProps> = ({
  advisor,
  onAppoint,
  onViewCase
}) => {
  return (
    <div className="bg-[#FFFFFF] border academic-hairline p-6 rounded-sm shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
      <div>
        {/* Top Header: Name, Title, Experience */}
        <div className="flex items-start justify-between pb-4 mb-4 border-b academic-hairline">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg sm:text-xl font-serif-title font-bold text-[#1C1917]">
                {advisor.name}
              </h4>
              <span className="text-xs text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-xs font-medium">
                接受预约初诊
              </span>
            </div>
            <span className="text-xs font-semibold text-[#92400E] block mt-1">
              {advisor.title}
            </span>
          </div>

          <div className="text-right shrink-0">
            <span className="text-lg font-serif-title font-bold text-[#1C1917] block">
              {advisor.experienceYears} 年
            </span>
            <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider">从研/带教资历</span>
          </div>
        </div>

        {/* Academic Pedigree / Alma Mater */}
        <div className="bg-[#FBF9F5] p-3 rounded-xs border academic-hairline mb-4 text-xs">
          <div className="text-[#1C1917] font-medium flex items-start gap-1.5 leading-snug">
            <Award className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
            <span>{advisor.academicBackground}</span>
          </div>
          <div className="text-[#78716C] mt-1.5 pl-5">
            研究领域：{advisor.researchFocus}
          </div>
        </div>

        {/* Philosophy */}
        <blockquote className="text-xs text-[#44403C] italic border-l-2 border-[#D6CEBF] pl-3 py-1 my-3 leading-relaxed font-serif-title">
          {advisor.consultationPhilosophy}
        </blockquote>

        {/* Admit Highlights */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-[#78716C] uppercase tracking-wider block mb-1.5">
            重点录取履约沉淀
          </span>
          <div className="flex flex-wrap gap-1.5">
            {advisor.admitHighlights.map((hl, i) => (
              <span 
                key={i} 
                className="text-[11px] text-[#57534E] bg-[#F5F2EB] px-2 py-0.5 rounded-xs border academic-hairline"
              >
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Parent Sync Method */}
        <div className="bg-[#FAF8F5] p-2.5 rounded-xs border academic-hairline mb-4 text-[11px] text-[#57534E] flex items-start gap-2">
          <Users className="w-3.5 h-3.5 text-[#92400E] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#1C1917] font-medium">家长协同：</strong>
            {advisor.parentSyncMethod}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t academic-hairline flex items-center justify-between gap-3">
        <span className="text-[11px] text-[#A8A29E]">
          每年限量带教 6–8 人
        </span>

        <button
          onClick={() => onAppoint(advisor)}
          className="px-3.5 py-1.5 text-xs font-semibold text-[#FBF9F5] bg-[#1C1917] hover:bg-[#78350F] rounded-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>指定 TA 为我做初诊评估</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

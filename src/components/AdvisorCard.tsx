import React from 'react';
import { AdvisorItem } from '../data/mockData';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { ScholarPortrait } from './VisualAssets';

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
    <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: Scholar Portrait, Name, Title, Experience */}
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-start gap-3.5">
            <ScholarPortrait 
              name={advisor.name} 
              title={advisor.title} 
              className="w-14 h-14"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-slate-900 font-editorial-title">
                  {advisor.name}
                </h4>
                <span className="text-[11px] text-emerald-800 font-medium">
                  · 接受预约
                </span>
              </div>
              <span className="text-xs font-semibold text-blue-950 block mt-0.5">
                {advisor.title}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {advisor.academicBackground}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-lg font-bold text-slate-900 block leading-tight tabular-nums">
              {advisor.experienceYears} 年
            </span>
            <span className="text-[11px] text-slate-400">带教资历</span>
          </div>
        </div>

        {/* Academic Pedigree / Alma Mater */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-3.5 text-xs">
          <div className="text-slate-900 font-semibold leading-snug">
            研究方向：{advisor.researchFocus}
          </div>
          <div className="text-slate-500 mt-1">
            专注领域：{advisor.specialtyTracks.join(' · ')}
          </div>
        </div>

        {/* Philosophy */}
        <blockquote className="text-xs text-slate-600 border-l-2 border-slate-300 pl-3 py-1 my-3 leading-relaxed italic">
          “{advisor.consultationPhilosophy}”
        </blockquote>

        {/* Admit Highlights - Zero-Pill Unboxed Clean Text */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            代表录取成果
          </span>
          <div className="text-xs text-slate-800 leading-relaxed font-medium">
            {advisor.admitHighlights.map((hl, i) => (
              <span key={i}>
                {i > 0 && <span className="text-slate-300 mx-1.5">/</span>}
                <span className="hover:text-blue-900 transition-colors">{hl}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Parent Sync Method */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 text-xs text-slate-600">
          <strong className="text-slate-800 font-semibold block mb-0.5">全透明同步机制：</strong>
          <span>{advisor.parentSyncMethod}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400 tabular-nums">
          年限带教 6–8 人
        </span>

        <button
          onClick={() => onAppoint(advisor)}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-950 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>预约专属初诊</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>
    </div>
  );
};

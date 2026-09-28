import React from 'react';
import { ADVISORS, AdvisorItem } from '../data/mockData';
import { AdvisorCard } from '../components/AdvisorCard';
import { ShieldCheck, Award, Users, BookOpen, Clock } from 'lucide-react';
import { ParentReadableBlock } from '../components/ParentReadableBlock';

interface AdvisorsViewProps {
  onOpenBooking: (advisorId?: string) => void;
  onViewCase?: (caseSlug: string) => void;
}

export const AdvisorsView: React.FC<AdvisorsViewProps> = ({
  onOpenBooking,
  onViewCase
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          EXPERT ADVISORS & MENTORS · 资深顾问与名校导师
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          资深名校顾问与导师团队
        </h1>
        <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed">
          坚决杜绝“销售签约后转包无名实习生流水线套模板”的行业潜规则。青藤国际所有主导选校与文书的导师均具备海外名校博士/硕士背景与多年一线申请经验，签约明确绑定负责导师，1对1负责到底。
        </p>
      </div>

      {/* Advisory Principles Badge Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-[#FFFFFF] p-4 rounded-xs border academic-hairline flex items-start gap-3">
          <Award className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1C1917] block font-medium">同行学者对话机制</strong>
            <span className="text-[#78716C] leading-relaxed">导师皆具备海外高阶科研经验，深谙目标院系教授审稿与录取口味。</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-4 rounded-xs border academic-hairline flex items-start gap-3">
          <Clock className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1C1917] block font-medium">严控限量带教配额</strong>
            <span className="text-[#78716C] leading-relaxed">精品线每位导师每年带教学员严格控制在 6–8 人以内，确保充沛打磨精力。</span>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-4 rounded-xs border academic-hairline flex items-start gap-3">
          <Users className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1C1917] block font-medium">双向透明与家长同步</strong>
            <span className="text-[#78716C] leading-relaxed">企微双周工作备忘录推送，关键节点三方决策会，绝不将家长排斥在外。</span>
          </div>
        </div>
      </div>

      {/* Advisors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ADVISORS.map((advisor) => (
          <AdvisorCard
            key={advisor.id}
            advisor={advisor}
            onAppoint={(adv) => onOpenBooking(adv.id)}
            onViewCase={onViewCase}
          />
        ))}
      </div>

      {/* Parent Readable Block */}
      <ParentReadableBlock />
    </div>
  );
};

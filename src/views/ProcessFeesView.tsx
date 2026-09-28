import React from 'react';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { FeeBoundary } from '../components/FeeBoundary';
import { ParentReadableBlock } from '../components/ParentReadableBlock';
import { ShieldCheck, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface ProcessFeesViewProps {
  onOpenBooking: () => void;
  onOpenWeCom: () => void;
}

export const ProcessFeesView: React.FC<ProcessFeesViewProps> = ({
  onOpenBooking,
  onOpenWeCom
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          LIFECYCLE, TRANSPARENT FEES & EXIT POLICIES
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          服务交付全生命周期、费用构成与解约退费准则
        </h1>
        <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed font-serif-title">
          我们拒绝任何形式的“前轻后重”或“隐形收费”。签约前向每一位家长与学子明示全部 7 阶交付节点、明确列支第三方不包含项、并公开分阶段解约退费细则。
        </p>
      </div>

      {/* 1. Seven-Stage Process Timeline */}
      <ProcessTimeline />

      {/* 2. Fee Boundary & Not-Included Items */}
      <FeeBoundary />

      {/* 3. Parent Readable Block */}
      <ParentReadableBlock />

      {/* 4. Action Banner */}
      <div className="bg-[#FAF8F5] border academic-hairline p-8 rounded-sm text-center max-w-2xl mx-auto space-y-3">
        <h3 className="text-lg sm:text-xl font-serif-title font-bold text-[#1C1917]">
          先获取详细分项报价清单，再做知情决策
        </h3>
        <p className="text-xs text-[#78716C] leading-relaxed">
          免费预约 45 分钟学术背景诊断。我们将针对您的学科目标复杂度出具正式的书面报价明细单，有效期内保留名额。
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#1C1917] hover:bg-[#78350F] text-white text-xs font-semibold rounded-xs shadow-xs"
          >
            预约学术初诊并索取报价单
          </button>
          <button
            onClick={onOpenWeCom}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#FFFFFF] hover:bg-[#EDE7DC] text-[#44403C] text-xs font-medium border academic-hairline rounded-xs"
          >
            企微咨询合同法务细则
          </button>
        </div>
      </div>
    </div>
  );
};

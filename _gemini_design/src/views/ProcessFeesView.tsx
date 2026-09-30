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
      <div className="pb-8 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>TRANSPARENT PROCESS & FEES · 流程、费用与退费保障</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          服务流程、费用构成与退费保障
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          签约前明示完整服务交付节点、明码标价无任何隐形消费，明确列支第三方费用（如大学网申费与使馆签证费自付），正规合同保障拒录全额退费与冷静期退费权益。
        </p>
      </div>

      {/* 1. Seven-Stage Process Timeline */}
      <ProcessTimeline />

      {/* 2. Fee Boundary & Not-Included Items */}
      <FeeBoundary />

      {/* 3. Parent Readable Block */}
      <ParentReadableBlock />

      {/* 4. Action Banner */}
      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xs text-center max-w-2xl mx-auto space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          先获取详细分项报价清单，再做知情决策
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
          免费预约 45 分钟学术背景诊断。我们将针对您的学科目标复杂度出具正式的书面报价明细单，有效期内保留名额。
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            预约学术初诊并索取报价单
          </button>
          <button
            onClick={onOpenWeCom}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            企微咨询合同法务细则
          </button>
        </div>
      </div>
    </div>
  );
};

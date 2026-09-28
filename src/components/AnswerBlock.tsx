import React from 'react';
import { BookOpen, Calendar, CheckCircle2 } from 'lucide-react';

interface AnswerBlockProps {
  title?: string;
  answer: string;
  sourceStamp?: string;
  keyPoints?: string[];
}

export const AnswerBlock: React.FC<AnswerBlockProps> = ({
  title = "学术研判核心结论 (Answer Block)",
  answer,
  sourceStamp = "2026/2027年申请季最新权威核准口径 · 依据海外大学官方录取公报与先修课大纲",
  keyPoints
}) => {
  return (
    <div 
      id="answer"
      className="bg-[#FFFFFF] border-l-4 border-[#92400E] border-y border-r academic-hairline p-5 sm:p-6 rounded-r-sm shadow-xs my-6"
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b academic-hairline">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#92400E]" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78350F]">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#A8A29E]">
          <Calendar className="w-3 h-3" />
          <span>权威口径</span>
        </div>
      </div>

      <p className="text-[14px] sm:text-[15px] text-[#1C1917] leading-relaxed font-serif-title font-medium">
        {answer}
      </p>

      {keyPoints && keyPoints.length > 0 && (
        <div className="mt-3.5 pt-3 border-t academic-hairline grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57534E]">
          {keyPoints.map((pt, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 pt-2 text-[11px] text-[#A8A29E] flex items-center justify-between">
        <span>{sourceStamp}</span>
        <span className="text-[10px] text-[#78350F] font-mono">SoT · 真实可引用</span>
      </div>
    </div>
  );
};

import React from 'react';
import { BookOpen, Calendar, CheckCircle2 } from 'lucide-react';

interface AnswerBlockProps {
  title?: string;
  answer: string;
  sourceStamp?: string;
  keyPoints?: string[];
}

export const AnswerBlock: React.FC<AnswerBlockProps> = ({
  title = "官方研判核心结论 (Official Insights)",
  answer,
  sourceStamp = "2026/2027年申请季最新权威核准口径 · 依据海外大学官方录取公报与先修课大纲",
  keyPoints
}) => {
  return (
    <div 
      id="answer"
      className="bg-white border-l-4 border-l-blue-600 border border-slate-200 p-5 sm:p-6 rounded-r-2xl rounded-l-md shadow-xs my-6"
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>权威口径</span>
        </div>
      </div>

      <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
        {answer}
      </p>

      {keyPoints && keyPoints.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
          {keyPoints.map((pt, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-50">
        <span>{sourceStamp}</span>
        <span className="text-[11px] text-blue-600 font-semibold">真实核准口径</span>
      </div>
    </div>
  );
};

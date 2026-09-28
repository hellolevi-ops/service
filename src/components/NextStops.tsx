import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface NextStopItem {
  title: string;
  url?: string;
  tabId?: string;
  extraSlug?: string;
  reason: string;
}

interface NextStopsProps {
  items: NextStopItem[];
  onNavigate: (tab: string, extraSlug?: string) => void;
}

export const NextStops: React.FC<NextStopsProps> = ({ items, onNavigate }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl my-6">
      <div className="flex items-center gap-2 mb-3">
        <Compass className="w-4 h-4 text-blue-600" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          下一步深度探索推荐 (Next Stops)
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (item.tabId) {
                onNavigate(item.tabId, item.extraSlug);
              } else if (item.url?.startsWith('/')) {
                const parts = item.url.replace(/^\//, '').split('/');
                onNavigate(parts[0] || 'home', parts[1]);
              }
            }}
            className="bg-white border border-slate-200 p-4 rounded-xl hover:border-blue-300 hover:shadow-sm cursor-pointer group transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {item.title}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              理由：{item.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

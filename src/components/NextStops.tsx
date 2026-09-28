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
    <div className="bg-[#F5F2EB]/70 border academic-hairline p-5 rounded-sm my-6">
      <div className="flex items-center gap-2 mb-3">
        <Compass className="w-4 h-4 text-[#92400E]" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#44403C]">
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
            className="bg-[#FFFFFF] border academic-hairline p-3.5 rounded-sm hover:border-[#92400E] cursor-pointer group transition-all shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs sm:text-sm font-medium text-[#1C1917] group-hover:text-[#92400E] transition-colors leading-snug">
                {item.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#92400E] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
            </div>
            <p className="text-[11px] text-[#78716C] mt-1.5 leading-relaxed">
              理由：{item.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

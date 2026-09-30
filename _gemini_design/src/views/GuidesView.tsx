import React, { useState } from 'react';
import { GUIDES_ARTICLES, GuideArticle } from '../data/mockData';
import { AnswerBlock } from '../components/AnswerBlock';
import { NextStops } from '../components/NextStops';
import { BookOpen, Calendar, Clock, ArrowRight, User, HelpCircle } from 'lucide-react';

interface GuidesViewProps {
  initialSlug?: string;
  onNavigate: (tab: string, extraSlug?: string) => void;
  onOpenBooking: () => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({
  initialSlug,
  onNavigate,
  onOpenBooking
}) => {
  const [activeSlug, setActiveSlug] = useState<string>(initialSlug || GUIDES_ARTICLES[0].slug);
  const activeArticle = GUIDES_ARTICLES.find(a => a.slug === activeSlug) || GUIDES_ARTICLES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          SOURCE OF TRUTH · ACADEMIC INTELLIGENCE
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          真相源权威升学指南与政策考据
        </h1>
        <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed font-serif-title">
          一篇内容只回答一个具体的升学意图。前 120 字直接给出结论（Answer Block），所有费用与录取门槛均标注核准年份与法定义务依据。
        </p>
      </div>

      {/* 2 Columns: Left article selector (4 cols) & Right Article Reader (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left list */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-semibold text-[#78716C] uppercase tracking-wider block mb-2">
            核心政策与选校指南
          </span>
          {GUIDES_ARTICLES.map((art) => (
            <div
              key={art.slug}
              onClick={() => setActiveSlug(art.slug)}
              className={`p-3.5 border rounded-xs cursor-pointer transition-all ${
                activeSlug === art.slug
                  ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                  : 'bg-[#FFFFFF] border-stone-200 text-[#44403C] hover:bg-[#F5F2EB]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] opacity-70 mb-1">
                <span className="font-semibold text-[#92400E]">{art.category}</span>
                <span className="font-mono">{art.dateModified}</span>
              </div>
              <h4 className="text-xs font-semibold leading-snug">
                {art.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Right Article Content */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border academic-hairline p-6 sm:p-10 rounded-sm shadow-xs space-y-8">
          {/* Article Header */}
          <div className="pb-5 border-b academic-hairline">
            <div className="flex items-center gap-2 text-xs mb-2">
              <span className="font-semibold text-[#92400E] bg-[#F5F2EB] px-2 py-0.5 rounded-xs">
                {activeArticle.category}
              </span>
              <span className="text-[#57534E] flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#A8A29E]" />
                {activeArticle.author}
              </span>
              <span className="text-[#A8A29E] ml-auto font-mono text-[11px]">
                更新日期：{activeArticle.dateModified}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917] leading-snug">
              {activeArticle.title}
            </h2>
            <div className="mt-2 text-xs text-[#78716C] font-mono">
              口径基准：{activeArticle.publishYear}
            </div>
          </div>

          {/* Mandatory Answer Block */}
          <AnswerBlock
            title="本篇核心结论 (Direct Answer Block)"
            answer={activeArticle.answerBlock}
            sourceStamp="博研书院 SoT 知识库 · 真实数据可引用"
          />

          {/* Body Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-[#44403C] leading-relaxed font-serif-title">
            {activeArticle.content.map((p, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-3 pt-4 border-t academic-hairline">
            <h3 className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#92400E]" />
              <span>本篇相关高频答疑 (Schema.org FAQ)</span>
            </h3>
            <div className="space-y-2">
              {activeArticle.faqs.map((f, fIdx) => (
                <div key={fIdx} className="bg-[#FBF9F5] p-3.5 rounded-xs border academic-hairline text-xs space-y-1">
                  <strong className="text-[#1C1917] block font-medium">问：{f.q}</strong>
                  <p className="text-[#57534E] leading-relaxed">答：{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NextStops */}
          <NextStops
            items={activeArticle.nextStops}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
};

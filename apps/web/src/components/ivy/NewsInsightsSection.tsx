"use client";

import React, { useState } from 'react';
import { 
  ChevronRight, ArrowRight, Eye, FileText
} from 'lucide-react';
import { NEWS_ARTICLES, NewsArticleItem } from '@/data/portalData';

interface NewsInsightsSectionProps {
  onNavigate: (tab: string, extraSlug?: string) => void;
  onOpenWeCom: () => void;
}

export const NewsInsightsSection: React.FC<NewsInsightsSectionProps> = ({
  onOpenWeCom
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [activeArticleModal, setActiveArticleModal] = useState<NewsArticleItem | null>(null);

  const categories = ['全部', '名校政策', '申请大数据', '签证速递', '行前避坑'];

  const filteredNews = NEWS_ARTICLES.filter(n => {
    if (selectedCategory === '全部') return true;
    return n.category === selectedCategory;
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
            官方政策与数据洞察
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
            全球留学资讯 · 官方政策动态与申请数据
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            实时汇聚英美港新官方招生办规程、使领馆签证更新、真实录取大数据分析与涉外合规指引
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            onClick={() => setActiveArticleModal(news)}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-950">
                    {news.category}
                  </span>
                  {news.hot && (
                    <>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-rose-700 font-semibold text-[11px]">
                        独家研判
                      </span>
                    </>
                  )}
                </div>
                <span className="text-slate-400 text-[11px] tabular-nums">{news.date}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 mb-2 font-editorial-title">
                {news.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                {news.summary}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-200/80">
              <span className="text-slate-500 flex items-center gap-1 tabular-nums">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{news.readCount} 阅读</span>
              </span>

              <span className="text-slate-900 group-hover:text-blue-900 font-medium flex items-center gap-1">
                <span>阅读研判解读</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar: Download full report CTA */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-xl border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              免费索取《2026 中国留学生全球名校录取大数据年度白皮书》（PDF 电子版）
            </h4>
            <p className="text-slate-600 text-xs mt-0.5">
              新东方/青藤核心数据沉淀：涵盖英美港新各专业录取均分、跨专业要求与院校内部名单
            </p>
          </div>
        </div>

        <button
          onClick={onOpenWeCom}
          className="w-full sm:w-auto px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <span>添加企微免费发送</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* News Article Modal Detail */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded">
                {activeArticleModal.category} · {activeArticleModal.tag}
              </span>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="text-slate-400 hover:text-slate-800 text-sm font-semibold p-1"
              >
                ✕ 关闭
              </button>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-mono block mb-1">
                发布日期：{activeArticleModal.date} · 来源：青藤国际全球学术智库
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial-title">
                {activeArticleModal.title}
              </h2>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <strong className="text-slate-900 block font-semibold">【核心研判摘要】</strong>
              <p>{activeArticleModal.summary}</p>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed space-y-3">
              <p>
                根据青藤国际战略研判团队的最新追踪，当前主流海外名校在筛选中国申请人时，正在从早期的“唯 GPA 论”向“先修课硬实力匹配 + 原创学术思辨”深度转型。
              </p>
              <p>
                建议意向申请 2026/2027 季度的同学尽早自测校内均分与目标大学内部认可名单（List）的匹配程度，避免由于信息滞后投递已被除名的院系。
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                如需针对该政策评估自身学术背景，可联系学术督导
              </span>
              <button
                onClick={() => {
                  setActiveArticleModal(null);
                  onOpenWeCom();
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                微信直连导师解读
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

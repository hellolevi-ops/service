"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Lock,
  MessageSquare,
  ShieldAlert,
  Unlock,
  X,
} from "lucide-react";
import { COMMUNITY_TOPICS, type CommunityTopic } from "@/data/catalog";

const CATEGORIES = ["all", "选校与定位", "文书与面试", "真实在读体验", "风险预案与申诉"] as const;

export default function CommunityPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<CommunityTopic | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    void fetch("/api/auth/me")
      .then((r) => r.json())
      .then((json) => setIsAuthenticated(Boolean(json.user)))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? COMMUNITY_TOPICS
        : COMMUNITY_TOPICS.filter((t) => t.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="page-banner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="page-banner__chip">
              学者与学子互助社区
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
              海外名校学长与学者研判社区
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              汇集英美港新在读学长与海归学者的实名申请经验、专业课程选择指南与学术答辩心得。内容均由真实用户发布。
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              {isAuthenticated ? (
                <Unlock className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-slate-500" />
              )}
              <span className="text-slate-700 font-medium">
                {isAuthenticated ? "已认证学员 (L1)" : "访客浏览模式"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (isAuthenticated) {
                  void fetch("/api/auth/logout", { method: "POST" }).then(() =>
                    setIsAuthenticated(false),
                  );
                } else {
                  window.location.href = "/login?returnUrl=/community";
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                isAuthenticated
                  ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {isAuthenticated ? "退出" : "学员登录"}
            </button>
          </div>
        </div>
      </div>

      {/* Community Rules Notice */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl grid md:grid-cols-3 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>仅限真实分享与学术交流，个人隐私文件请自行保密</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-600 shrink-0" />
          <span>深度研判实录仅对注册认证用户开放全文查阅</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>特邀在读学长与博导官方帖均附带学术认证标记</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCategory(c)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
              activeCategory === c
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            {c === "all" ? "全部话题" : c}
          </button>
        ))}
      </div>

      {/* Topics Feed */}
      <div className="grid gap-4">
        {filtered.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => setSelectedTopic(topic)}
            className="text-left bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2.5">
              <span className="font-semibold text-slate-900">{topic.authorBadge}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{topic.category}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{topic.author} ({topic.authorUniversity})</span>
              <span className="text-slate-400 ml-auto flex items-center gap-4 tabular-nums">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {topic.viewCount}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {topic.replyCount}
                </span>
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-editorial-title leading-snug">
              {topic.title}
            </h2>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
              {topic.previewSnippet}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-editorial-title">
            想向名校学长与博导深度提问？
          </h2>
          <p className="text-sm text-slate-400">
            免费预约 1对1 学术初诊，由同专业海归博导为您全面答疑解惑。
          </p>
        </div>
        <Link
          href="/book"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 !text-slate-950 text-xs font-bold rounded-xl shrink-0 transition-colors shadow-sm inline-flex items-center gap-1.5"
        >
          <span>预约免费初诊</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-slate-900">{selectedTopic.authorBadge}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>{selectedTopic.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-editorial-title mt-1">
                  {selectedTopic.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  作者：{selectedTopic.author} · {selectedTopic.authorUniversity}
                </p>
              </div>
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                onClick={() => setSelectedTopic(null)}
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {selectedTopic.previewSnippet}
            </p>

            {isAuthenticated || !selectedTopic.requiresAuthToReadFull ? (
              <div className="text-xs text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <p>{selectedTopic.fullBody}</p>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-800 space-y-3">
                <p className="flex items-center gap-2 font-semibold text-slate-900">
                  <Lock className="w-4 h-4 text-amber-600" />
                  全文及学员讨论区需登录后可见
                </p>
                <p className="text-slate-500 text-xs">
                  为保护学长学术经验分享的版权，请先完成学员登录或微信手机号注册。
                </p>
                <Link
                  href="/login?returnUrl=/community"
                  className="inline-flex px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                >
                  立即登录查阅完整讨论
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
} from "lucide-react";
import { COMMUNITY_TOPICS, type CommunityTopic } from "@/data/boyan";

const CATEGORIES = ["all", "选校与定位", "文书与面试", "真实在读体验", "避坑与申诉"] as const;

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
      <div className="pb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
              SCHOLAR COMMUNITY · 学术互助社区
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
              学长学者学术研判互助社区
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
              连接「申请中」与「海外在读/学者」的实名交流圈层。L0 公网摘要 + L1
              认证可见，杜绝虚假马甲与中介水军。
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              {isAuthenticated ? (
                <Unlock className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-amber-600" />
              )}
              <span>
                {isAuthenticated ? "已认证在读学子 (L1)" : "访客浏览 (L0 摘要)"}
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
              className={`px-2.5 py-1 rounded-lg font-medium ${
                isAuthenticated
                  ? "bg-slate-200 text-slate-700"
                  : "bg-slate-900 text-white"
              }`}
            >
              {isAuthenticated ? "退出" : "登录"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl grid md:grid-cols-3 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          严禁违规交易、保录诱导及隐私原件展示
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-700 shrink-0" />
          全文仅对认证用户可见，禁止外部爬虫
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          特邀在读与官方帖均有显性认证徽章
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCategory(c)}
            className={`px-3 py-1.5 rounded-lg ${
              activeCategory === c
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            }`}
          >
            {c === "all" ? "全部话题" : c}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => setSelectedTopic(topic)}
            className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-sm transition-all"
          >
            <div className="flex flex-wrap items-center gap-2 text-[11px] mb-2">
              <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                {topic.authorBadge}
              </span>
              <span className="text-slate-500">{topic.category}</span>
              <span className="text-slate-400 ml-auto flex items-center gap-3">
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
            <h2 className="text-base font-bold text-slate-900 font-editorial-title leading-snug">
              {topic.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {topic.author} · {topic.authorUniversity}
            </p>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
              {topic.previewSnippet}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-slate-900 text-slate-300 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-editorial-title">想参与深度讨论？</h2>
          <p className="text-sm text-slate-400 mt-1">认证后可读全文；也可先预约导师 1对1 诊断。</p>
        </div>
        <Link
          href="/book"
          className="px-5 py-2.5 bg-amber-400 !text-slate-950 text-sm font-bold rounded-xl inline-flex items-center gap-1"
        >
          预约评估 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {selectedTopic && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-lg">
                  {selectedTopic.authorBadge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-editorial-title mt-2">
                  {selectedTopic.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedTopic.author} · {selectedTopic.authorUniversity}
                </p>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-800 text-sm font-semibold"
                onClick={() => setSelectedTopic(null)}
              >
                关闭
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedTopic.previewSnippet}
            </p>
            {isAuthenticated || !selectedTopic.requiresAuthToReadFull ? (
              <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-4">
                {selectedTopic.fullBody}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-3">
                <p className="flex items-center gap-2 font-semibold">
                  <Lock className="w-4 h-4" />
                  全文需登录后可见（L1）
                </p>
                <Link
                  href="/login?returnUrl=/community"
                  className="inline-flex px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold"
                >
                  登录后阅读全文
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

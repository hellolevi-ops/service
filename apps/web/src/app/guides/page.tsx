"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { GUIDES_ARTICLES } from "@/data/catalog";

export default function GuidesPage() {
  const [activeSlug, setActiveSlug] = useState(GUIDES_ARTICLES[0]?.slug ?? "");
  const active = useMemo(
    () => GUIDES_ARTICLES.find((a) => a.slug === activeSlug) || GUIDES_ARTICLES[0],
    [activeSlug],
  );

  if (!active) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-slate-500">暂无指南内容</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
          SOURCE OF TRUTH · 真相源指南
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
          权威升学指南与政策考据
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
          一篇内容只回答一个具体升学意图。前 120 字给出结论（Answer Block），费用与门槛均标注核准年份。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            核心政策与选校指南
          </span>
          {GUIDES_ARTICLES.map((art) => (
            <button
              key={art.slug}
              type="button"
              onClick={() => setActiveSlug(art.slug)}
              className={`w-full text-left p-3.5 border rounded-xl transition-all ${
                activeSlug === art.slug
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] opacity-80 mb-1">
                <span className={activeSlug === art.slug ? "text-amber-300" : "text-amber-700"}>
                  {art.category}
                </span>
                <span className="font-mono tabular-nums">{art.dateModified}</span>
              </div>
              <h4 className="text-xs font-semibold leading-snug">{art.title}</h4>
            </button>
          ))}
          <Link
            href="/guides/faq"
            className="block text-xs text-blue-900 font-semibold pt-2 hover:underline"
          >
            常见问题汇总 →
          </Link>
        </div>

        <article className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl shadow-xs space-y-8">
          <div className="pb-5 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
              <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                {active.category}
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {active.author}
              </span>
              <span className="text-slate-400 ml-auto font-mono text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                更新：{active.dateModified}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial-title leading-snug">
              {active.title}
            </h2>
            <p className="text-xs text-slate-500 mt-2">{active.publishYear}</p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed">
            <strong className="text-blue-900 block mb-1 text-xs uppercase tracking-wider">
              Answer Block
            </strong>
            {active.answerBlock}
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            {active.content.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          {active.faqs.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">常见追问</h3>
              {active.faqs.map((f) => (
                <details
                  key={f.q}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer">{f.q}</summary>
                  <p className="text-slate-600 mt-2 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">下一站</h3>
            {active.nextStops.map((n) => (
              <Link
                key={n.url}
                href={fixNextUrl(n.url)}
                className="flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 block">{n.title}</span>
                  <span className="text-slate-500">{n.reason}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              </Link>
            ))}
            <Link
              href={`/guides/${encodeURIComponent(active.category)}/${active.slug}`}
              className="inline-flex items-center gap-1 text-xs text-blue-900 font-semibold pt-2"
            >
              打开独立指南页 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

function fixNextUrl(url: string) {
  if (url.startsWith("/tools/")) return url.replace("/tools/", "/lab/tools/");
  return url;
}

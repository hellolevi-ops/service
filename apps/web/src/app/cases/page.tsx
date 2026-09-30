"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/data/catalog";
import { CaseStudyCard } from "@/components/catalog/CaseStudyCard";
import { Search } from "lucide-react";

const TRACKS = ["全部赛道", ...Array.from(new Set(CASE_STUDIES.map((c) => c.trackName)))];
const GRADES = ["全部背景", "985/211", "双非本科", "美本/海本", "国际高中/K12", "艺术跨学科"];

export default function CasesPage() {
  const [track, setTrack] = useState("全部赛道");
  const [grade, setGrade] = useState("全部背景");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter((c) => {
      if (!c.authorized) return false;
      if (track !== "全部赛道" && c.trackName !== track) return false;
      if (grade !== "全部背景" && c.backgroundGrade !== grade) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        const hit =
          c.admitUniversity.toLowerCase().includes(s) ||
          c.admitProgram.toLowerCase().includes(s) ||
          c.undergradProfile.toLowerCase().includes(s) ||
          c.hardBottlenecks.toLowerCase().includes(s);
        if (!hit) return false;
      }
      return true;
    });
  }, [track, grade, q]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Editorial Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
          ADMISSIONS ARCHIVES · 真实录取案卷库
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          名校录取案卷复盘与破局实录
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          收录牛剑、常春藤、港前三及新加坡公立名校真实录取脱敏案卷。深入剖析学员初始背景、申请卡点、学术破局主轴与最终录取交付。
        </p>
      </div>

      {/* Filter Console */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-xl shadow-xs space-y-4 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索目标大学、录取专业、原始背景或核心突破点关键词…"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-medium mr-1 shrink-0">方向筛选：</span>
          <div className="flex flex-wrap gap-1.5">
            {TRACKS.map((t) => (
              <FilterTab key={t} active={track === t} onClick={() => setTrack(t)} label={t} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-slate-500 font-medium mr-1 shrink-0">背景层次：</span>
          <div className="flex flex-wrap gap-1.5">
            {GRADES.map((g) => (
              <FilterTab key={g} active={grade === g} onClick={() => setGrade(g)} label={g} />
            ))}
          </div>
        </div>
      </div>

      {/* Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          共检索到 <strong className="text-slate-900 font-semibold">{filtered.length}</strong> 份官方留痕案卷
        </span>
        <span>严谨脱敏展示 · 拒绝夸大宣传</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-sm text-slate-500 border border-slate-200 rounded-xl bg-white space-y-3">
          <p>暂无符合当前筛选条件的案例，建议更换搜索关键词，或</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            预约专家进行同类背景评估
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <CaseStudyCard key={c.id} item={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
        active
          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
          : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200 hover:text-slate-900"
      }`}
    >
      {label}
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/data/catalog";
import { CaseStudyCard } from "@/components/catalog/CaseStudyCard";

const TRACKS = ["全部", ...Array.from(new Set(CASE_STUDIES.map((c) => c.trackName)))];
const GRADES = ["全部", "985/211", "双非本科", "美本/海本", "国际高中/K12", "艺术跨学科"];

export default function CasesPage() {
  const [track, setTrack] = useState("全部");
  const [grade, setGrade] = useState("全部");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter((c) => {
      if (!c.authorized) return false;
      if (track !== "全部" && c.trackName !== track) return false;
      if (grade !== "全部" && c.backgroundGrade !== grade) return false;
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
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          CASE STUDIES · 真实录取案卷
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          看难点与破局路径，不贩卖成功率
        </h1>
        <p className="text-sm text-[#57534E] mt-2 max-w-3xl leading-relaxed">
          以下案卷经学员授权脱敏展示。重点看「卡点—策略—交付」，个案不代表概率，亦不构成任何录取承诺。
        </p>
      </div>

      <div className="bg-white border academic-hairline p-4 sm:p-5 rounded-sm space-y-3 text-xs">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索院校、专业、背景或难点关键词…"
          className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs focus:border-[#92400E] focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <span className="text-[#A8A29E] self-center mr-1">赛道：</span>
          {TRACKS.map((t) => (
            <Chip key={t} active={track === t} onClick={() => setTrack(t)} label={t} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-2 border-t academic-hairline">
          <span className="text-[#A8A29E] self-center mr-1">背景：</span>
          {GRADES.map((g) => (
            <Chip key={g} active={grade === g} onClick={() => setGrade(g)} label={g} />
          ))}
        </div>
      </div>

      <p className="text-xs text-[#78716C]">
        共 <strong className="text-[#1C1917]">{filtered.length}</strong> 份匹配案卷
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-sm text-[#78716C] border academic-hairline rounded-sm bg-white">
          暂无匹配案例，请放宽筛选，或
          <Link href="/book" className="text-[#92400E] font-semibold mx-1">
            预约同类背景评估
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <CaseStudyCard key={c.id} item={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
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
      className={`px-3 py-1.5 rounded-xs transition-colors ${
        active
          ? "bg-[#1C1917] text-white font-medium"
          : "bg-[#F5F2EB] text-[#57534E] hover:bg-[#EDE7DC]"
      }`}
    >
      {label}
    </button>
  );
}

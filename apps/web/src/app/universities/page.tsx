"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Compass,
  DollarSign,
  Globe,
  Landmark,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { GLOBAL_UNIVERSITIES, type UniversityItem } from "@/data/boyan";

const COUNTRIES = ["全部", "英国", "美国", "中国香港", "新加坡"];
const RANK_TIERS = ["全部", "全球前10", "全球前30", "全球前50"];
const LIST_POLICIES = [
  "全部",
  "严格执行白名单 (List严卡)",
  "按院校梯队分层 (List分档)",
  "无固定List (全面考量先修课)",
];
const DISCIPLINES = ["全部", "STEM理工", "商科经济", "人文社科", "涉外法律", "前沿艺术"];

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("全部");
  const [selectedRankTier, setSelectedRankTier] = useState("全部");
  const [selectedListPolicy, setSelectedListPolicy] = useState("全部");
  const [selectedDiscipline, setSelectedDiscipline] = useState("全部");
  const [sortBy, setSortBy] = useState<"qs" | "acceptance">("qs");
  const [selectedUni, setSelectedUni] = useState<UniversityItem | null>(null);

  const filtered = useMemo(() => {
    return GLOBAL_UNIVERSITIES.filter((uni) => {
      if (selectedCountry !== "全部" && uni.country !== selectedCountry) return false;
      if (selectedRankTier === "全球前10" && uni.qsRank2026 > 10) return false;
      if (selectedRankTier === "全球前30" && uni.qsRank2026 > 30) return false;
      if (selectedRankTier === "全球前50" && uni.qsRank2026 > 50) return false;
      if (selectedListPolicy !== "全部" && uni.chineseListPolicy !== selectedListPolicy)
        return false;
      if (
        selectedDiscipline !== "全部" &&
        !uni.disciplines.includes(selectedDiscipline as UniversityItem["disciplines"][number])
      )
        return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const hit =
          uni.nameZh.toLowerCase().includes(q) ||
          uni.nameEn.toLowerCase().includes(q) ||
          uni.city.toLowerCase().includes(q) ||
          uni.featuredPrograms.some((p) => p.toLowerCase().includes(q));
        if (!hit) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "qs") return a.qsRank2026 - b.qsRank2026;
      return parseFloat(a.meanAcceptanceRate) - parseFloat(b.meanAcceptanceRate);
    });
  }, [
    searchTerm,
    selectedCountry,
    selectedRankTier,
    selectedListPolicy,
    selectedDiscipline,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b academic-hairline">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#92400E]" />
              <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider">
                GLOBAL UNIVERSITIES DIRECTORY · 全球名校库
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
              全球名校库与各校录取要求查询
            </h1>
            <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed">
              汇集英美港新主流大学 2026/2027 最新招生政策、中国高校内部认可名单（List）要求、学费预算与录取难度，帮您快速定位适合自己的冲刺与保底大学。
            </p>
          </div>
          <Link
            href="/book"
            className="px-4 py-2 bg-[#F5F2EB] hover:bg-[#EDE7DC] text-[#78350F] font-medium text-xs rounded-xs border academic-hairline flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#B45309]" />
            微信领取《2026各大名校录取名单完整版》
          </Link>
        </div>
      </div>

      <div className="bg-white border academic-hairline p-6 rounded-sm shadow-2xs space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-[#A8A29E] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="搜索大学中英文名称、所在城市、或优势专业..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none"
            />
          </div>
          <div className="sm:col-span-4 flex items-center justify-end gap-2">
            <span className="text-[#78716C] shrink-0 font-medium">排序：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "qs" | "acceptance")}
              className="p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] font-medium focus:border-[#92400E] focus:outline-none"
            >
              <option value="qs">按 QS 2026 排名</option>
              <option value="acceptance">按录取率（竞争度）</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t academic-hairline">
          <span className="text-[#A8A29E] text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1">
            留学目的地：
          </span>
          {COUNTRIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                selectedCountry === c
                  ? "bg-[#1C1917] text-white font-medium"
                  : "bg-[#F5F2EB] text-[#292524] hover:bg-[#EDE7DC]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t academic-hairline">
          <div>
            <label className="block text-[11px] font-semibold text-[#78716C] mb-1">
              QS 2026 排名梯队
            </label>
            <select
              value={selectedRankTier}
              onChange={(e) => setSelectedRankTier(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border academic-hairline rounded-xs"
            >
              {RANK_TIERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#78716C] mb-1">
              中国生源 List 政策
            </label>
            <select
              value={selectedListPolicy}
              onChange={(e) => setSelectedListPolicy(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border academic-hairline rounded-xs"
            >
              {LIST_POLICIES.map((lp) => (
                <option key={lp} value={lp}>
                  {lp}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#78716C] mb-1">优势学科</label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full p-2 bg-[#FBF9F5] border academic-hairline rounded-xs"
            >
              {DISCIPLINES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#78716C]">
        <span>
          共找到 <strong className="text-[#1C1917]">{filtered.length}</strong> 所匹配院校
        </span>
        <Link href="/book" className="text-[#92400E] font-semibold flex items-center gap-1">
          不确定怎么选？预约导师帮你定位
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((uni) => (
          <button
            key={uni.id}
            type="button"
            onClick={() => setSelectedUni(uni)}
            className="text-left bg-white border academic-hairline p-5 rounded-sm hover:border-[#92400E] transition-all shadow-2xs"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#EDE7DC] text-[#78350F] rounded-xs">
                    QS #{uni.qsRank2026}
                  </span>
                  <span className="text-[10px] text-[#78716C]">{uni.country}</span>
                </div>
                <h2 className="text-lg font-serif-title font-bold text-[#1C1917]">{uni.nameZh}</h2>
                <p className="text-xs text-[#78716C]">{uni.nameEn}</p>
              </div>
              <Landmark className="w-5 h-5 text-[#D6CEBF] shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#57534E] mb-3">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#A8A29E]" />
                {uni.city}
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#A8A29E]" />
                录取率 {uni.meanAcceptanceRate}
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <DollarSign className="w-3.5 h-3.5 text-[#A8A29E]" />
                {uni.tuitionYear}
              </div>
            </div>
            <p className="text-[11px] text-[#78716C] line-clamp-2 mb-3">{uni.chineseListPolicy}</p>
            <div className="flex flex-wrap gap-1.5">
              {uni.featuredPrograms.slice(0, 3).map((p) => (
                <span
                  key={p}
                  className="px-2 py-0.5 bg-[#FBF9F5] border academic-hairline text-[10px] text-[#44403C] rounded-xs"
                >
                  {p}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-sm text-[#78716C] border academic-hairline rounded-sm bg-white">
          暂无匹配院校，请放宽筛选条件，或
          <Link href="/book" className="text-[#92400E] font-semibold mx-1">
            预约导师定制选校方案
          </Link>
        </div>
      )}

      {selectedUni && (
        <div
          className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4"
          onClick={() => setSelectedUni(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-sm shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b academic-hairline px-5 py-4 flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold text-[#78350F] bg-[#EDE7DC] px-2 py-0.5 rounded-xs">
                  QS #{selectedUni.qsRank2026} · {selectedUni.country}
                </span>
                <h3 className="text-xl font-serif-title font-bold text-[#1C1917] mt-1">
                  {selectedUni.nameZh}
                </h3>
                <p className="text-xs text-[#78716C]">{selectedUni.nameEn}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUni(null)}
                className="p-1.5 hover:bg-[#F5F2EB] rounded-xs"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs text-[#44403C]">
              <div className="grid grid-cols-2 gap-3">
                <Info label="所在城市" value={selectedUni.city} />
                <Info label="录取率参考" value={selectedUni.meanAcceptanceRate} />
                <Info label="学费区间" value={selectedUni.tuitionYear} />
                <Info label="首轮截止" value={selectedUni.applicationDeadlineRound1} />
              </div>
              <div>
                <h4 className="font-semibold text-[#1C1917] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#92400E]" />
                  中国生源 List 政策
                </h4>
                <p className="leading-relaxed text-[#57534E]">{selectedUni.chineseListPolicy}</p>
                <p className="leading-relaxed text-[#78716C] mt-1">{selectedUni.gpaRequirementZh}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1C1917] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#92400E]" />
                  优势专业方向
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUni.featuredPrograms.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-1 bg-[#FBF9F5] border academic-hairline rounded-xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1C1917] mb-1">院校速写</h4>
                <p className="leading-relaxed text-[#57534E]">{selectedUni.academicProfileSnippet}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1C1917] mb-1">青藤研判要点</h4>
                <p className="leading-relaxed text-[#57534E]">{selectedUni.advisoryInsight}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t academic-hairline">
                <Link
                  href="/book"
                  className="flex-1 py-2.5 text-center bg-[#92400E] hover:bg-[#78350F] text-white font-semibold rounded-xs"
                >
                  预约导师解读该校录取要求
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#FBF9F5] border academic-hairline rounded-xs p-3">
      <div className="text-[10px] text-[#A8A29E] mb-0.5">{label}</div>
      <div className="font-medium text-[#1C1917] leading-snug">{value}</div>
    </div>
  );
}

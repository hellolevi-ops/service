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
  ChevronRight,
} from "lucide-react";
import { GLOBAL_UNIVERSITIES, type UniversityItem } from "@/data/catalog";

const COUNTRIES = ["全部目的地", "英国", "美国", "中国香港", "新加坡"];
const RANK_TIERS = ["全部排名", "全球前10", "全球前30", "全球前50"];
const LIST_POLICIES = [
  "全部政策",
  "严格执行白名单 (List严卡)",
  "按院校梯队分层 (List分档)",
  "无固定List (全面考量先修课)",
];
const DISCIPLINES = ["全部学科", "STEM理工", "商科经济", "人文社科", "涉外法律", "前沿艺术"];

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("全部目的地");
  const [selectedRankTier, setSelectedRankTier] = useState("全部排名");
  const [selectedListPolicy, setSelectedListPolicy] = useState("全部政策");
  const [selectedDiscipline, setSelectedDiscipline] = useState("全部学科");
  const [sortBy, setSortBy] = useState<"qs" | "acceptance">("qs");
  const [selectedUni, setSelectedUni] = useState<UniversityItem | null>(null);

  const filtered = useMemo(() => {
    return GLOBAL_UNIVERSITIES.filter((uni) => {
      if (selectedCountry !== "全部目的地" && uni.country !== selectedCountry) return false;
      if (selectedRankTier === "全球前10" && uni.qsRank2026 > 10) return false;
      if (selectedRankTier === "全球前30" && uni.qsRank2026 > 30) return false;
      if (selectedRankTier === "全球前50" && uni.qsRank2026 > 50) return false;
      if (selectedListPolicy !== "全部政策" && uni.chineseListPolicy !== selectedListPolicy)
        return false;
      if (
        selectedDiscipline !== "全部学科" &&
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
      {/* Editorial Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
              GLOBAL UNIVERSITIES DIRECTORY · 全球名校库与招生规程
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
              全球主流名校库与录取门槛查询
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              汇集英、美、港、新主流大学 QS 2026 最新招生政策、中国高校内部认可名单（List）要求、学费预算与录取竞争度，帮您科学定位冲刺与保底梯度。
            </p>
          </div>
          <Link
            href="/book"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl flex items-center gap-2 shrink-0 transition-colors shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>免费领取《2026名校List白皮书》</span>
          </Link>
        </div>
      </div>

      {/* Filter Console */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-xs space-y-4 text-xs">
        {/* Search & Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索大学中英文名称、所在城市、或优势专业..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
            />
          </div>
          <div className="sm:col-span-4 flex items-center justify-end gap-2">
            <span className="text-slate-500 shrink-0 font-medium">排序方式：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "qs" | "acceptance")}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:bg-white focus:border-slate-400 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="qs">按 QS 2026 综合排名</option>
              <option value="acceptance">按录取竞争度排序</option>
            </select>
          </div>
        </div>

        {/* Country Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-slate-500 font-medium mr-1 shrink-0">目的地：</span>
          <div className="flex flex-wrap gap-1.5">
            {COUNTRIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCountry(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                  selectedCountry === c
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Select Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              QS 2026 排名梯度
            </label>
            <select
              value={selectedRankTier}
              onChange={(e) => setSelectedRankTier(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              {RANK_TIERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              中国生源 List 政策
            </label>
            <select
              value={selectedListPolicy}
              onChange={(e) => setSelectedListPolicy(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              {LIST_POLICIES.map((lp) => (
                <option key={lp} value={lp}>
                  {lp}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">优势学科分类</label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
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

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          共检索到 <strong className="text-slate-900 font-semibold">{filtered.length}</strong> 所全球名校
        </span>
        <Link href="/book" className="text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1">
          需要导师帮助定位选校？
          <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
        </Link>
      </div>

      {/* University Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((uni) => (
          <button
            key={uni.id}
            type="button"
            onClick={() => setSelectedUni(uni)}
            className="text-left bg-white border border-slate-200 p-6 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md">
                      QS #{uni.qsRank2026}
                    </span>
                    <span className="text-xs text-slate-400">{uni.country}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-editorial-title">
                    {uni.nameZh}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">{uni.nameEn}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-700 transition-colors shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{uni.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  <span>录取率 {uni.meanAcceptanceRate}</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 pt-1 border-t border-slate-200/60">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  <span>学费：{uni.tuitionYear}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                {uni.chineseListPolicy}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {uni.featuredPrograms.slice(0, 2).map((p) => (
                  <span
                    key={p}
                    className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] rounded-md"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <span className="text-slate-900 font-semibold flex items-center gap-0.5 group-hover:text-blue-900">
                <span>详情</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-sm text-slate-500 border border-slate-200 rounded-2xl bg-white space-y-3">
          <p>暂无符合当前筛选条件的院校，建议放宽筛选维度，或</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            预约导师定制选校方案
          </Link>
        </div>
      )}

      {/* University Detail Modal */}
      {selectedUni && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs grid place-items-center p-4"
          onClick={() => setSelectedUni(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-start justify-between gap-3 z-10">
              <div>
                <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  QS #{selectedUni.qsRank2026} · {selectedUni.country}
                </span>
                <h3 className="text-xl font-serif-title font-bold text-slate-900 mt-1">
                  {selectedUni.nameZh}
                </h3>
                <p className="text-xs text-slate-500">{selectedUni.nameEn}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUni(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-slate-700">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Info label="所在城市" value={selectedUni.city} />
                <Info label="录取率参考" value={selectedUni.meanAcceptanceRate} />
                <Info label="年度学费" value={selectedUni.tuitionYear} />
                <Info label="第一轮截止" value={selectedUni.applicationDeadlineRound1} />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  中国生源内部名单 (List) 政策
                </h4>
                <p className="leading-relaxed text-slate-700">{selectedUni.chineseListPolicy}</p>
                <p className="leading-relaxed text-slate-500 pt-1 border-t border-slate-200/60 font-mono text-[11px]">
                  GPA最低要求：{selectedUni.gpaRequirementZh}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-1.5 text-sm">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  优势专业方向
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUni.featuredPrograms.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 font-medium rounded-lg text-xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-slate-900 text-sm">院校学术档案</h4>
                <p className="leading-relaxed text-slate-600">{selectedUni.academicProfileSnippet}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-slate-900 text-sm">青藤学术研判建议</h4>
                <p className="leading-relaxed text-slate-600">{selectedUni.advisoryInsight}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/book?track=${selectedUni.country === "英国" ? "uk-pg" : selectedUni.country === "美国" ? "us-ug" : "hk-sg"}`}
                  className="flex-1 py-3 text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
                >
                  预约导师解读该校内部录取规程
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
    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
      <div className="text-[10px] text-slate-400 mb-0.5">{label}</div>
      <div className="font-semibold text-slate-900 leading-snug">{value}</div>
    </div>
  );
}

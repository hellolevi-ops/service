import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ADVISORS,
  CASE_STUDIES,
  VERTICAL_TRACKS,
  type TrackItem,
} from "@/data/catalog";
import { CaseStudyCard } from "@/components/catalog/CaseStudyCard";
import { AdvisorCard } from "@/components/catalog/AdvisorCard";
import { CheckCircle2, ArrowRight, AlertTriangle, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return VERTICAL_TRACKS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const track = VERTICAL_TRACKS.find((t) => t.slug === slug);
  if (!track) return {};
  return { title: track.name, description: track.overview.slice(0, 120) };
}

export default async function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const track = VERTICAL_TRACKS.find((t) => t.slug === slug);
  if (!track) notFound();

  const cases = CASE_STUDIES.filter((c) => c.trackId === track.id && c.authorized).slice(0, 3);
  const advisors = ADVISORS.filter((a) => a.specialtyTracks.includes(track.id));
  const lead = ADVISORS.find((a) => a.id === track.recommendedAdvisorId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Breadcrumb & Header */}
      <div className="page-banner">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link href="/tracks" className="hover:text-slate-900 transition-colors">
            留学赛道
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-medium">{track.name}</span>
        </div>

        <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md mb-2">
          {track.badge}
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          {track.name}
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">{track.subtitle}</p>
        <p className="text-sm text-slate-600 mt-4 max-w-3xl leading-relaxed">{track.overview}</p>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={`/book?track=${track.id}`}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>预约该方向免费初诊</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
          <Link
            href="/universities"
            className="px-5 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            查名校 List
          </Link>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <Stat label="目标攻读学位" value={track.targetDegree} />
        <Stat label="申请规划节奏" value={track.typicalTimeline} />
        <Stat label="生源成绩基准" value={track.scoreBenchmark} />
        <Stat label="年总费用区间" value={track.costRange} />
      </div>

      {/* Academic Research Insight Block */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <span className="page-banner__chip">
          学术研判
        </span>
        <h2 className="text-lg font-serif-title font-bold text-slate-900 mb-3">
          青藤学术研判核心要点
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">{track.answerBlock}</p>
      </section>

      {/* Advisory Methodology */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-serif-title font-bold text-slate-900">
            带教核心方法论
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          {track.advisoryMethods.map((m) => (
            <div
              key={m}
              className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-xl p-4 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-relaxed">{m}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Key Risks & Caveats */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-serif-title font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            关键申请风险提示
          </h2>
        </div>
        <ul className="space-y-2.5 text-xs text-slate-700">
          {track.keyRisks.map((r) => (
            <li key={r} className="bg-white border border-slate-200 rounded-xl p-4 leading-relaxed shadow-xs">
              {r}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ Details */}
      {track.faqs.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-serif-title font-bold text-slate-900">
              常见申请疑难与解答
            </h2>
          </div>
          <div className="space-y-3">
            {track.faqs.map((f) => (
              <details
                key={f.question}
                className="bg-white border border-slate-200 rounded-xl p-4 group transition-colors"
              >
                <summary className="text-sm font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{f.question}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related Admissions Cases */}
      {cases.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl font-serif-title font-bold text-slate-900">
                本赛道精选录取案卷
              </h2>
            </div>
            <Link href="/cases" className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1">
              全部录取案卷 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <CaseStudyCard key={c.id} item={c} />
            ))}
          </div>
        </section>
      )}

      {/* Faculty Advisors */}
      {(lead || advisors.length > 0) && (
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-serif-title font-bold text-slate-900">
              对口学科推荐导师
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(lead ? [lead, ...advisors.filter((a) => a.id !== lead.id)] : advisors)
              .slice(0, 3)
              .map((a) => (
                <AdvisorCard key={a.id} advisor={a} />
              ))}
          </div>
        </section>
      )}

      <TrackCta track={track} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xs text-slate-900 font-medium leading-snug">{value}</div>
    </div>
  );
}

function TrackCta({ track }: { track: TrackItem }) {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-serif-title font-bold text-white">
          启动 {track.name} 规划初诊
        </h2>
        <p className="text-sm text-slate-400">
          免费背景定位评估 · 签约前明码标价 · 退费规则全公开
        </p>
      </div>
      <Link
        href={`/book?track=${track.id}`}
        className="px-6 py-3 bg-amber-400 hover:bg-amber-300 !text-slate-950 text-xs font-bold rounded-xl shrink-0 transition-colors shadow-sm"
      >
        预约免费初诊
      </Link>
    </div>
  );
}

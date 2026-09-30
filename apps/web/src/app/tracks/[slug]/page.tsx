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
import { CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
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
      <div className="pb-6 border-b academic-hairline">
        <p className="text-xs text-[#78716C] mb-2">
          <Link href="/tracks" className="hover:text-[#92400E]">
            留学赛道
          </Link>{" "}
          / {track.name}
        </p>
        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#EDE7DC] text-[#78350F] rounded-xs mb-2">
          {track.badge}
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          {track.name}
        </h1>
        <p className="text-xs text-[#78716C] font-mono mt-1">{track.subtitle}</p>
        <p className="text-sm text-[#57534E] mt-4 max-w-3xl leading-relaxed">{track.overview}</p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={`/book?track=${track.id}`}
            className="px-5 py-2.5 bg-[#92400E] hover:bg-[#78350F] text-white text-xs font-semibold rounded-xs inline-flex items-center gap-1.5"
          >
            预约该赛道免费评估
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/universities"
            className="px-5 py-2.5 border academic-hairline text-xs font-semibold rounded-xs hover:bg-[#F5F2EB]"
          >
            查名校 List
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <Stat label="目标学位" value={track.targetDegree} />
        <Stat label="规划节奏" value={track.typicalTimeline} />
        <Stat label="成绩基准" value={track.scoreBenchmark} />
        <Stat label="费用区间" value={track.costRange} />
      </div>

      <section className="bg-[#FAF8F5] border academic-hairline rounded-sm p-6 sm:p-8">
        <h2 className="text-lg font-serif-title font-bold text-[#1C1917] mb-3">学术研判结论</h2>
        <p className="text-sm text-[#44403C] leading-relaxed">{track.answerBlock}</p>
      </section>

      <section>
        <h2 className="text-xl font-serif-title font-bold text-[#1C1917] mb-4">顾问方法论</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          {track.advisoryMethods.map((m) => (
            <div
              key={m}
              className="flex items-start gap-2 bg-white border academic-hairline rounded-xs p-3"
            >
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
              <span className="text-[#44403C] leading-relaxed">{m}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-serif-title font-bold text-[#1C1917] mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
          关键风险提示
        </h2>
        <ul className="space-y-2 text-xs text-[#57534E]">
          {track.keyRisks.map((r) => (
            <li key={r} className="bg-white border academic-hairline rounded-xs p-3 leading-relaxed">
              {r}
            </li>
          ))}
        </ul>
      </section>

      {track.faqs.length > 0 && (
        <section>
          <h2 className="text-xl font-serif-title font-bold text-[#1C1917] mb-4">常见问题</h2>
          <div className="space-y-3">
            {track.faqs.map((f) => (
              <details
                key={f.question}
                className="bg-white border academic-hairline rounded-sm p-4 group"
              >
                <summary className="text-sm font-semibold text-[#1C1917] cursor-pointer">
                  {f.question}
                </summary>
                <p className="text-xs text-[#57534E] mt-3 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-serif-title font-bold text-[#1C1917]">相关录取案卷</h2>
            <Link href="/cases" className="text-xs text-[#92400E] font-semibold">
              全部案例
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {cases.map((c) => (
              <CaseStudyCard key={c.id} item={c} />
            ))}
          </div>
        </section>
      )}

      {(lead || advisors.length > 0) && (
        <section>
          <h2 className="text-xl font-serif-title font-bold text-[#1C1917] mb-4">推荐导师</h2>
          <div className="grid md:grid-cols-3 gap-5">
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
    <div className="bg-white border academic-hairline rounded-sm p-4">
      <div className="text-[10px] text-[#A8A29E] uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xs text-[#1C1917] font-medium leading-snug">{value}</div>
    </div>
  );
}

function TrackCta({ track }: { track: TrackItem }) {
  return (
    <div className="bg-[#1C1917] text-[#EDE7DC] rounded-sm p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-serif-title font-bold text-white">启动 {track.name} 规划</h2>
        <p className="text-sm text-[#A8A29E] mt-1">免费背景评估 · 签约前明码标价 · 拒录规则透明</p>
      </div>
      <Link
        href={`/book?track=${track.id}`}
        className="px-5 py-2.5 bg-[#92400E] hover:bg-[#78350F] text-white text-sm font-semibold rounded-xs"
      >
        立即预约
      </Link>
    </div>
  );
}

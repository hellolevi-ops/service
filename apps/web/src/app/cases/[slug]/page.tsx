import { notFound } from "next/navigation";
import Link from "next/link";
import { ADVISORS, CASE_STUDIES } from "@/data/catalog";
import { ArrowRight, CheckCircle2, ChevronRight, Quote, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";
import { FavoriteButton } from "@/components/domain/FavoriteButton";
import { OfferBadgeVisual, ScholarPortrait } from "@/components/home/VisualAssets";

export function generateStaticParams() {
  return CASE_STUDIES.filter((c) => c.authorized).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = CASE_STUDIES.find((c) => c.slug === slug && c.authorized);
  if (!item) return { title: "案例详情" };
  return {
    title: `${item.admitUniversity} · ${item.admitProgram} 录取案卷`,
    description: item.hardBottlenecks.slice(0, 120),
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = CASE_STUDIES.find((c) => c.slug === slug && c.authorized);
  if (!item) notFound();

  const advisor = ADVISORS.find((a) => a.id === item.leadAdvisorId);
  const related = CASE_STUDIES.filter(
    (c) => c.authorized && c.trackId === item.trackId && c.slug !== slug,
  ).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header & Breadcrumb */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link href="/cases" className="hover:text-slate-900 transition-colors">
            录取案卷库
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-medium">{item.trackName}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-md">
              {item.trackName}
            </span>
            <span className="text-slate-400 font-mono">· {item.enrollmentYear} 录取</span>
            <span className="text-slate-400">· {item.backgroundGrade}</span>
          </div>
          <OfferBadgeVisual />
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          {item.admitUniversity}
        </h1>
        <p className="text-base text-slate-600 mt-1 font-medium">{item.admitProgram}</p>

        <div className="mt-3 flex items-center gap-3">
          <FavoriteButton
            targetType="case"
            targetSlug={item.slug}
            title={`${item.admitUniversity} · ${item.admitProgram}`}
            href={`/cases/${item.slug}`}
          />
          {item.scholarship ? (
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
              {item.scholarship}
            </span>
          ) : null}
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 leading-relaxed">
        本案卷经学员授权并脱敏展示，聚焦「难点剖析—学术策略—阶段交付」。个案仅作路径参考，录取结果由院校决定。
      </div>

      {/* Baseline Section */}
      <Section title="学员初始学术背景">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="text-sm font-semibold text-slate-900">
            {item.studentInitials} · {item.undergradProfile}
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-700">
            <span>平时绩点：GPA {item.gpa}</span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span>标化成绩：{item.testScores}</span>
          </div>
        </div>
      </Section>

      {/* Bottlenecks Section */}
      <Section title="核心申请难点与卡点" icon={<ShieldAlert className="w-4 h-4 text-rose-600" />}>
        <div className="bg-rose-50/60 border border-rose-200/70 rounded-xl p-5 text-slate-800 text-xs sm:text-sm leading-relaxed">
          {item.hardBottlenecks}
        </div>
      </Section>

      {/* Strategic Insight Section */}
      <Section title="青藤导师战略研判与破局路径" tone="success">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-800 text-xs sm:text-sm leading-relaxed font-serif">
          {item.strategicInsight}
        </div>
      </Section>

      {/* Deliverables Section */}
      <Section title="核心关键书面交付物">
        <ul className="grid sm:grid-cols-2 gap-3 text-xs">
          {item.keyDeliverables.map((d) => (
            <li key={d} className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-relaxed font-medium">{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Outcome Section */}
      <Section title="最终录取交付结果">
        <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-md p-5">
          <span className="text-emerald-800 font-bold text-sm block">
            {item.finalResult}
          </span>
        </div>
      </Section>

      {/* Student Testimonial Quote */}
      <blockquote className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs relative">
        <Quote className="w-5 h-5 text-amber-500/60 mb-2" />
        <p className="text-sm font-serif italic text-slate-700 leading-relaxed">
          &ldquo;{item.quote}&rdquo;
        </p>
        <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span>{item.studentInitials}</span>
          <span>带教导师：{item.leadAdvisorName}</span>
        </p>
      </blockquote>

      {/* Assigned Lead Advisor Card */}
      {advisor ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 rounded-lg p-5 bg-slate-50/80 text-xs">
          <div className="flex items-center gap-3">
            <ScholarPortrait name={advisor.name} title={advisor.title} className="w-11 h-11" />
            <div>
              <span className="text-slate-400 text-xs block">该案卷领衔导师</span>
              <Link
                href={`/advisors/${advisor.id}`}
                className="font-bold text-slate-900 text-sm hover:text-blue-900 transition-colors"
              >
                {advisor.name} · {advisor.title}
              </Link>
            </div>
          </div>
          <Link
            href={`/book?advisor=${advisor.id}`}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md inline-flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs"
          >
            <span>预约该导师初诊</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      ) : null}

      {/* Next Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href="/book"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 !text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          免费同类背景评估
        </Link>
        <Link
          href="/cases"
          className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
        >
          返回案例库
        </Link>
      </div>

      {/* Related Cases */}
      {related.length > 0 && (
        <div className="pt-6 border-t border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 font-editorial-title">
            同赛道其他精选案卷
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 block">{c.admitUniversity}</span>
                  <span className="text-slate-500 text-xs block mt-0.5">{c.admitProgram}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  icon,
  tone,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  tone?: "success";
}) {
  return (
    <section className="space-y-2">
      <h2
        className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
          tone === "success" ? "text-amber-700" : "text-slate-600"
        }`}
      >
        {icon}
        {title}
      </h2>
      <div className="text-slate-700">{children}</div>
    </section>
  );
}

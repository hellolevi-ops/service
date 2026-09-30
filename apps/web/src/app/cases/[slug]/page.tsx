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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 sm:space-y-10">
      <p className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <Link href="/cases" className="hover:text-slate-900 transition-colors">
          录取案卷库
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-medium">{item.trackName}</span>
      </p>

      <div className="page-banner">
        <span className="page-banner__chip">{item.trackName}</span>
        <h1>{item.admitUniversity}</h1>
        <p>
          {item.admitProgram} · {item.enrollmentYear} 录取 · {item.backgroundGrade}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
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
          <div className="sm:ml-auto">
            <OfferBadgeVisual />
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500 bg-white/70 border border-slate-200/80 rounded-xl p-3.5 leading-relaxed">
        本案卷经学员授权并脱敏展示，聚焦「难点剖析—学术策略—阶段交付」。个案仅作路径参考，录取结果由院校决定。
      </div>

      <Section title="学员初始学术背景">
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
          <div className="text-sm font-semibold text-slate-900">
            {item.studentInitials} · {item.undergradProfile}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs font-mono text-slate-700">
            <span>平时绩点：GPA {item.gpa}</span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-300">
              |
            </span>
            <span>标化成绩：{item.testScores}</span>
          </div>
        </div>
      </Section>

      <Section title="核心申请难点与卡点" icon={<ShieldAlert className="w-4 h-4 text-rose-600" />}>
        <div className="bg-rose-50/60 border border-rose-200/70 rounded-xl p-4 sm:p-5 text-slate-800 text-xs sm:text-sm leading-relaxed">
          {item.hardBottlenecks}
        </div>
      </Section>

      <Section title="青藤国际导师战略研判与破局路径" tone="success">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-slate-800 text-xs sm:text-sm leading-relaxed font-serif">
          {item.strategicInsight}
        </div>
      </Section>

      <Section title="核心关键书面交付物">
        <ul className="grid sm:grid-cols-2 gap-3 text-xs">
          {item.keyDeliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-relaxed font-medium">{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="最终录取交付结果">
        <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-md p-4 sm:p-5">
          <span className="text-emerald-800 font-bold text-sm block">{item.finalResult}</span>
        </div>
      </Section>

      <blockquote className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 shadow-xs relative">
        <Quote className="w-5 h-5 text-amber-500/60 mb-2" />
        <p className="text-sm font-serif italic text-slate-700 leading-relaxed">
          &ldquo;{item.quote}&rdquo;
        </p>
        <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span>{item.studentInitials}</span>
          <span>带教导师：{item.leadAdvisorName}</span>
        </p>
      </blockquote>

      {advisor ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 rounded-lg p-4 sm:p-5 bg-slate-50/80 text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <ScholarPortrait name={advisor.name} title={advisor.title} className="w-11 h-11 shrink-0" />
            <div className="min-w-0">
              <span className="text-slate-400 text-xs block">该案卷领衔导师</span>
              <Link
                href={`/advisors/${advisor.id}`}
                className="font-bold text-slate-900 text-sm hover:text-blue-900 transition-colors break-words"
              >
                {advisor.name} · {advisor.title}
              </Link>
            </div>
          </div>
          <Link
            href={`/book?advisor=${advisor.id}`}
            className="btn btn--cta btn--cta-sm w-full sm:w-auto inline-flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>预约该导师初诊</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
        <Link href="/book" className="btn btn--cta btn--cta-sm w-full sm:w-auto justify-center">
          免费同类背景评估
        </Link>
        <Link
          href="/cases"
          className="btn btn--outline btn--cta-sm w-full sm:w-auto justify-center"
        >
          返回案例库
        </Link>
      </div>

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
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  <span className="font-semibold text-slate-900 block truncate">
                    {c.admitUniversity}
                  </span>
                  <span className="text-slate-500 text-xs block mt-0.5 line-clamp-2">
                    {c.admitProgram}
                  </span>
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

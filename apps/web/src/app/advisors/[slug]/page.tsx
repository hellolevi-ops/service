import { notFound } from "next/navigation";
import Link from "next/link";
import { ADVISORS, CASE_STUDIES } from "@/data/catalog";
import { CaseStudyCard } from "@/components/catalog/CaseStudyCard";
import { ArrowRight, Award, CheckCircle2, ChevronRight, Users, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ScholarPortrait } from "@/components/home/VisualAssets";

export function generateStaticParams() {
  return ADVISORS.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const advisor = ADVISORS.find((a) => a.id === slug);
  if (!advisor) return { title: "导师主页" };
  return { title: `${advisor.name} · ${advisor.title}`, description: advisor.academicBackground };
}

export default async function AdvisorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const advisor = ADVISORS.find((a) => a.id === slug);
  if (!advisor) notFound();

  const cases = CASE_STUDIES.filter(
    (c) => c.authorized && advisor.representativeCases.includes(c.slug),
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header & Breadcrumb */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link href="/advisors" className="hover:text-slate-900 transition-colors">
            学术导师团队
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-medium">{advisor.name}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
          <div className="flex items-start gap-4">
            <ScholarPortrait name={advisor.name} title={advisor.title} className="w-16 h-16 sm:w-20 sm:h-20" />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900">
                  {advisor.name}
                </h1>
                {advisor.acceptingAppointments ? (
                  <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                    接受预约初诊
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-medium">
                    本期满额
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-700 mt-1">{advisor.title}</p>
              <p className="text-xs text-slate-400 mt-1 tabular-nums">
                {advisor.experienceYears} 年从研与名校规划指导资历
              </p>
            </div>
          </div>

          {advisor.acceptingAppointments ? (
            <Link
              href={`/book?advisor=${advisor.id}`}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-2 shrink-0 transition-colors shadow-xs"
            >
              <span>指定该导师进行初诊</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          ) : null}
        </div>
      </div>

      {/* Academic Background Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-xs sm:text-sm space-y-2">
        <div className="flex items-start gap-2.5">
          <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span className="text-slate-900 font-semibold">{advisor.academicBackground}</span>
        </div>
        <p className="text-xs text-slate-600 pl-6.5">
          <strong className="text-slate-700">主要研究领域与学术方向：</strong>
          {advisor.researchFocus}
        </p>
      </div>

      {/* Philosophy Quote */}
      <blockquote className="border-l-2 border-amber-400 pl-4 py-1 text-sm font-serif italic text-slate-700 leading-relaxed">
        &ldquo;{advisor.consultationPhilosophy}&rdquo;
      </blockquote>

      {/* Admit Highlights */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 font-editorial-title">
          代表录取与辅导亮点
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-xs">
          {advisor.admitHighlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-xl p-4 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Honorary Titles */}
      {advisor.honoraryTitles.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 font-editorial-title">
            学术兼职与专业资质
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {advisor.honoraryTitles.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Parent Collaboration */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 text-xs flex items-start gap-3 shadow-xs">
        <Users className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-900 block text-sm font-semibold">家长同步与协同机制</strong>
          <span className="text-slate-600 leading-relaxed block">{advisor.parentSyncMethod}</span>
        </div>
      </div>

      {/* Representative Cases */}
      {cases.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-editorial-title">
              该导师代表案卷精选
            </h2>
            <Link href="/cases" className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1">
              查阅全部案卷 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((c) => (
              <CaseStudyCard key={c.id} item={c} />
            ))}
          </div>
        </section>
      )}

      {/* Trust & Reassurance */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>青藤国际严格执行导师限额带教制度；支持依合同约定申请更换导师。</span>
        </div>
        <Link href="/about/trust" className="text-slate-900 hover:underline font-semibold shrink-0">
          合规与监督条款 →
        </Link>
      </div>
    </div>
  );
}

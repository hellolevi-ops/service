import { notFound } from "next/navigation";
import Link from "next/link";
import { ADVISORS, CASE_STUDIES } from "@/data/boyan";
import { CaseStudyCard } from "@/components/boyan/CaseStudyCard";
import { ArrowRight, Award, CheckCircle2, Users } from "lucide-react";
import type { Metadata } from "next";

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
  if (!advisor) return { title: "导师未找到" };
  return { title: advisor.name, description: advisor.title };
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
      <div className="pb-6 border-b academic-hairline">
        <p className="text-xs text-[#78716C] mb-2">
          <Link href="/advisors" className="hover:text-[#92400E]">
            导师团队
          </Link>{" "}
          / {advisor.name}
        </p>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
                {advisor.name}
              </h1>
              {advisor.acceptingAppointments ? (
                <span className="text-[10px] text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-xs font-medium">
                  接受预约初诊
                </span>
              ) : null}
            </div>
            <p className="text-sm font-semibold text-[#92400E]">{advisor.title}</p>
            <p className="text-xs text-[#78716C] mt-2">
              {advisor.experienceYears} 年从研/带教资历
            </p>
          </div>
          {advisor.acceptingAppointments ? (
            <Link
              href={`/book?advisor=${advisor.id}`}
              className="px-5 py-2.5 bg-[#92400E] hover:bg-[#78350F] text-white text-xs font-semibold rounded-xs inline-flex items-center gap-1.5 shrink-0"
            >
              指定该导师初诊
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : null}
        </div>
      </div>

      <div className="bg-[#FBF9F5] border academic-hairline rounded-sm p-5 text-sm space-y-2">
        <div className="flex items-start gap-2">
          <Award className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
          <span className="text-[#1C1917] font-medium">{advisor.academicBackground}</span>
        </div>
        <p className="text-xs text-[#78716C] pl-6">研究领域：{advisor.researchFocus}</p>
      </div>

      <blockquote className="border-l-2 border-[#D6CEBF] pl-4 py-1 text-sm font-serif-title italic text-[#44403C] leading-relaxed">
        {advisor.consultationPhilosophy}
      </blockquote>

      <section>
        <h2 className="text-lg font-serif-title font-bold text-[#1C1917] mb-3">代表录取亮点</h2>
        <ul className="space-y-2 text-xs">
          {advisor.admitHighlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 bg-white border academic-hairline rounded-xs p-3"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
              <span className="text-[#44403C]">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {advisor.honoraryTitles.length > 0 && (
        <section>
          <h2 className="text-lg font-serif-title font-bold text-[#1C1917] mb-3">荣誉与资质</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {advisor.honoraryTitles.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-[#EDE7DC] text-[#78350F] rounded-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="bg-[#FAF8F5] border academic-hairline rounded-sm p-4 text-xs flex items-start gap-2">
        <Users className="w-4 h-4 text-[#92400E] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#1C1917] block mb-1">家长协同方式</strong>
          <span className="text-[#57534E] leading-relaxed">{advisor.parentSyncMethod}</span>
        </div>
      </div>

      {cases.length > 0 && (
        <section>
          <h2 className="text-lg font-serif-title font-bold text-[#1C1917] mb-4">代表案卷</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {cases.map((c) => (
              <CaseStudyCard key={c.id} item={c} />
            ))}
          </div>
        </section>
      )}

      <p className="text-[11px] text-[#A8A29E]">
        可申请更换导师；纪律与学术合规监督邮箱见页脚。
        <Link href="/about/trust" className="text-[#92400E] ml-1">
          信任与合规
        </Link>
      </p>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ADVISORS, CASE_STUDIES } from "@/data/catalog";
import { ArrowRight, CheckCircle2, Quote, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";
import { FavoriteButton } from "@/components/domain/FavoriteButton";

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
  if (!item) return { title: "案例未找到" };
  return {
    title: `${item.admitUniversity} · ${item.admitProgram}`,
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="pb-6 border-b academic-hairline">
        <p className="text-xs text-[#78716C] mb-2">
          <Link href="/cases" className="hover:text-[#92400E]">
            成功案例
          </Link>{" "}
          / {item.trackName}
        </p>
        <div className="flex flex-wrap gap-2 text-[10px] mb-3">
          <span className="px-2 py-0.5 bg-[#EDE7DC] text-[#78350F] font-semibold rounded-xs">
            {item.trackName}
          </span>
          <span className="px-2 py-0.5 bg-[#F5F2EB] text-[#57534E] rounded-xs">
            {item.enrollmentYear}
          </span>
          <span className="px-2 py-0.5 bg-[#F5F2EB] text-[#57534E] rounded-xs">
            {item.backgroundGrade}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1C1917]">
          {item.admitUniversity}
        </h1>
        <p className="text-sm text-[#78716C] mt-1">{item.admitProgram}</p>
        <div className="mt-2">
          <FavoriteButton
            targetType="case"
            targetSlug={item.slug}
            title={`${item.admitUniversity} · ${item.admitProgram}`}
            href={`/cases/${item.slug}`}
          />
        </div>
        {item.scholarship ? (
          <p className="text-xs text-[#059669] font-medium mt-2">{item.scholarship}</p>
        ) : null}
      </div>

      <p className="text-[11px] text-[#A8A29E] bg-[#FAF8F5] border academic-hairline rounded-xs p-3">
        个案经授权脱敏展示，不代表录取概率，亦不构成任何保录承诺。
      </p>

      <Section title="原始背景">
        <p>
          {item.studentInitials} · {item.undergradProfile}
        </p>
        <p className="mt-2 font-mono text-[#1C1917]">
          GPA {item.gpa} · {item.testScores}
        </p>
      </Section>

      <Section title="核心申请难点" icon={<ShieldAlert className="w-4 h-4 text-[#DC2626]" />}>
        <p>{item.hardBottlenecks}</p>
      </Section>

      <Section title="青藤研判破局" tone="success">
        <p className="font-serif-title text-[#44403C] leading-relaxed">{item.strategicInsight}</p>
      </Section>

      <Section title="关键交付物">
        <ul className="space-y-2">
          {item.keyDeliverables.map((d) => (
            <li key={d} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="最终结果">
        <p className="font-medium text-[#1C1917]">{item.finalResult}</p>
      </Section>

      <blockquote className="bg-white border academic-hairline rounded-sm p-5">
        <Quote className="w-4 h-4 text-[#D6CEBF] mb-2" />
        <p className="text-sm font-serif-title italic text-[#44403C] leading-relaxed">
          {item.quote}
        </p>
        <p className="text-[11px] text-[#A8A29E] mt-3">
          — {item.studentInitials} · 导师 {item.leadAdvisorName}
        </p>
      </blockquote>

      {advisor ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border academic-hairline rounded-sm p-4 bg-[#FBF9F5] text-xs">
          <div>
            <span className="text-[#78716C]">领衔导师</span>
            <Link
              href={`/advisors/${advisor.id}`}
              className="block font-semibold text-[#1C1917] hover:text-[#92400E] mt-0.5"
            >
              {advisor.name} · {advisor.title}
            </Link>
          </div>
          <Link
            href={`/book?advisor=${advisor.id}`}
            className="px-4 py-2 bg-[#1C1917] text-white font-semibold rounded-xs inline-flex items-center gap-1 shrink-0"
          >
            指定该导师初诊
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/book"
          className="px-5 py-2.5 bg-[#92400E] text-white text-xs font-semibold rounded-xs"
        >
          同类背景评估
        </Link>
        <Link
          href="/cases"
          className="px-5 py-2.5 border academic-hairline text-xs font-semibold rounded-xs"
        >
          返回案例库
        </Link>
      </div>

      {related.length > 0 && (
        <div className="pt-6 border-t academic-hairline">
          <h2 className="text-sm font-semibold text-[#1C1917] mb-3">同赛道其他案卷</h2>
          <ul className="space-y-2 text-xs">
            {related.map((c) => (
              <li key={c.slug}>
                <Link href={`/cases/${c.slug}`} className="text-[#92400E] hover:underline">
                  {c.admitUniversity} · {c.admitProgram}
                </Link>
              </li>
            ))}
          </ul>
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
    <section>
      <h2
        className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
          tone === "success" ? "text-[#059669]" : "text-[#78350F]"
        }`}
      >
        {icon}
        {title}
      </h2>
      <div className="text-sm text-[#57534E] leading-relaxed">{children}</div>
    </section>
  );
}

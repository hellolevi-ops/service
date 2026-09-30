import { notFound } from "next/navigation";
import Link from "next/link";
import { PRACTICE_PLAYBOOKS } from "@/data/catalog";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PRACTICE_PLAYBOOKS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pb = PRACTICE_PLAYBOOKS.find((p) => p.slug === slug);
  if (!pb) return {};
  return { title: pb.title, description: pb.summary.slice(0, 140) };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pb = PRACTICE_PLAYBOOKS.find((p) => p.slug === slug);
  if (!pb) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <p className="text-xs text-slate-500">
        <Link href="/lab" className="hover:text-blue-900">
          Practice Lab
        </Link>{" "}
        / Playbook
      </p>
      <div>
        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
          {pb.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title mt-2 leading-snug">
          {pb.title}
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          {pb.author} · {pb.readTime} · {pb.updatedAt}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
          <strong className="text-emerald-800 block mb-1">适用</strong>
          <p className="text-emerald-900 leading-relaxed">{pb.targetAudience}</p>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
          <strong className="text-rose-800 block mb-1">不适用</strong>
          <p className="text-rose-900 leading-relaxed">{pb.notForAudience}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed">
        {pb.answerBlock}
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{pb.summary}</p>

      <section>
        <h2 className="text-lg font-bold text-slate-900 font-editorial-title mb-3">关键步骤</h2>
        <ol className="space-y-3">
          {pb.keySteps.map((s) => (
            <li
              key={s.step}
              className="bg-white border border-slate-200 rounded-xl p-4 text-xs"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <strong className="text-slate-900">{s.title}</strong>
              </div>
              <p className="text-slate-600 leading-relaxed pl-8">{s.desc}</p>
              {s.toolRef ? (
                <Link
                  href={`/lab/tools/${s.toolRef === "checklist" || s.toolRef === "cost" || s.toolRef === "assessment" || s.toolRef === "timeline" ? s.toolRef : "assessment"}`}
                  className="inline-flex items-center gap-1 text-blue-900 font-semibold pl-8 mt-2"
                >
                  打开相关工具 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <aside className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950">
        <strong className="flex items-center gap-1.5 mb-1">
          <AlertTriangle className="w-4 h-4" /> DIY 天花板
        </strong>
        {pb.diyCeiling}
      </aside>

      <section>
        <h2 className="text-sm font-bold text-slate-900 mb-2">何时需要顾问介入</h2>
        <ul className="space-y-2 text-xs text-slate-600">
          {pb.whenAdvisorNeeded.map((w) => (
            <li key={w} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              {w}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/book"
          className="px-5 py-2.5 bg-amber-400 !text-slate-950 text-xs font-bold rounded-xl"
        >
          预约评估
        </Link>
        <Link
          href="/lab"
          className="px-5 py-2.5 border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl"
        >
          返回工具箱
        </Link>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES_ARTICLES } from "@/data/catalog";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { FavoriteButton } from "@/components/domain/FavoriteButton";

export function generateStaticParams() {
  return GUIDES_ARTICLES.map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = GUIDES_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: article.title, description: article.answerBlock.slice(0, 140) };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = GUIDES_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <p className="text-xs text-slate-500">
        <Link href="/guides" className="hover:text-blue-900">
          指南
        </Link>{" "}
        / {article.category}
      </p>
      <div>
        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
          {article.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title mt-2 leading-snug">
          {article.title}
        </h1>
        <div className="mt-2">
          <FavoriteButton
            targetType="guide"
            targetSlug={article.slug}
            title={article.title}
            href={`/guides/${article.category}/${article.slug}`}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {article.author} · 更新 {article.dateModified} · {article.publishYear}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-800 leading-relaxed">
        {article.answerBlock}
      </div>

      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
        {article.content.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>

      {article.faqs.map((f) => (
        <details key={f.q} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
          <summary className="font-semibold text-slate-900 cursor-pointer">{f.q}</summary>
          <p className="mt-2 text-slate-600 leading-relaxed">{f.a}</p>
        </details>
      ))}

      <div className="space-y-2 pt-4 border-t border-slate-200">
        <h2 className="text-sm font-bold text-slate-900">下一站</h2>
        {article.nextStops.map((n) => (
          <Link
            key={n.url}
            href={n.url.startsWith("/tools/") ? n.url.replace("/tools/", "/lab/tools/") : n.url}
            className="flex items-center justify-between gap-2 p-3 border border-slate-200 rounded-xl text-xs hover:bg-slate-50"
          >
            <span>
              <strong className="text-slate-900 block">{n.title}</strong>
              <span className="text-slate-500">{n.reason}</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
          </Link>
        ))}
      </div>

      <Link href="/book" className="inline-flex px-5 py-2.5 bg-amber-400 !text-slate-950 text-xs font-bold rounded-xl">
        预约免费评估
      </Link>
    </div>
  );
}

import Link from "next/link";
import { GUIDES_ARTICLES } from "@/data/catalog";

export const metadata = { title: "常见问题 FAQ" };

export default function GuidesFaqPage() {
  const faqs = GUIDES_ARTICLES.flatMap((a) =>
    a.faqs.map((f) => ({ ...f, from: a.title, slug: a.slug, category: a.category })),
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="page-banner">
        <p className="text-xs text-slate-500 mb-2">
          <Link href="/guides" className="hover:text-blue-900">
            指南
          </Link>{" "}
          / FAQ
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title">
          常见问题汇总
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          汇集各篇权威指南中的高频追问。个案仍建议预约导师诊断。
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q + f.slug}
            className="bg-white border border-slate-200 rounded-xl p-4 text-xs"
          >
            <summary className="font-semibold text-slate-900 cursor-pointer">{f.q}</summary>
            <p className="mt-2 text-slate-600 leading-relaxed">{f.a}</p>
            <Link
              href={`/guides/${encodeURIComponent(f.category)}/${f.slug}`}
              className="inline-block mt-2 text-blue-900 font-medium"
            >
              来自：{f.from} →
            </Link>
          </details>
        ))}
      </div>

      <Link
        href="/book"
        className="inline-flex px-5 py-2.5 bg-amber-400 !text-slate-950 text-xs font-bold rounded-xl"
      >
        仍有疑问？预约免费评估
      </Link>
    </div>
  );
}

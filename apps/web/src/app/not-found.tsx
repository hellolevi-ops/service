import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-800">
        <Compass className="w-8 h-8" />
      </div>
      <div>
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
          404 · PAGE NOT FOUND
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900">
          您访问的页面已迁移或正在更新
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          请检查输入的网址是否有误，或通过下方导航返回青藤国际官方主页。
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold">
        <Link
          href="/"
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors shadow-xs"
        >
          返回官方首页
        </Link>
        <Link
          href="/universities"
          className="px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
        >
          查全球名校 List
        </Link>
        <Link
          href="/book"
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 !text-slate-950 rounded-xl transition-colors flex items-center gap-1"
        >
          <span>免费背景初诊</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

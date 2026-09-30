import Link from "next/link";
import { ArrowRight, HelpCircle, HeartHandshake, ShieldCheck, FileSpreadsheet } from "lucide-react";

export function ParentReadableBlock({
  variant,
  title,
  body,
  href,
  linkLabel,
}: {
  variant: "fee" | "boundary" | "sync" | "combo";
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}) {
  const getIcon = () => {
    switch (variant) {
      case "fee":
        return <FileSpreadsheet className="w-5 h-5 text-amber-700" />;
      case "boundary":
        return <ShieldCheck className="w-5 h-5 text-amber-700" />;
      case "sync":
        return <HeartHandshake className="w-5 h-5 text-amber-700" />;
      default:
        return <HelpCircle className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <aside
      data-variant={variant}
      className="my-6 bg-amber-50/40 border border-amber-200/70 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden"
    >
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center shrink-0">
          {getIcon()}
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
              家长决策备忘
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-editorial-title">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{body}</p>
          {href && (
            <div className="pt-2">
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-blue-900 transition-colors"
              >
                <span>{linkLabel || "了解更多政策细节"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

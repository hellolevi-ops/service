"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { Phone, MessageSquare, Calendar } from "lucide-react";

export function StickyMobileDock() {
  return (
    <nav className="dock fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)] border-t border-[var(--line)] shadow-lg sm:hidden flex items-center h-14" aria-label="移动端快捷联系">
      <a
        href={`tel:${SITE.phone}`}
        className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-medium text-[var(--ink)] hover:text-[var(--brand)] border-r border-[var(--line)]"
      >
        <Phone className="w-4 h-4 mb-0.5 text-[var(--brand)]" />
        <span>电话咨询</span>
      </a>
      <a
        href="#book"
        className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-medium text-[var(--ink)] hover:text-[var(--brand)] border-r border-[var(--line)]"
      >
        <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-600" />
        <span>微信直联</span>
      </a>
      <Link
        href="/book"
        className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-bold text-white bg-[var(--brand)] hover:opacity-95 h-full"
      >
        <Calendar className="w-4 h-4 mb-0.5" />
        <span>免费评估</span>
      </Link>
    </nav>
  );
}

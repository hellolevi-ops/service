"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { trackLabel } from "@/lib/site";
import type { CaseStudy } from "@/content/types";

export function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article
      style={{
        display: "grid",
        gap: "0.65rem",
        gridTemplateColumns: "1fr auto",
        alignItems: "start",
        padding: "1.15rem 1.25rem",
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--color-line)",
      }}
    >
      <div>
        <p className="muted" style={{ margin: 0, fontSize: "0.8rem", fontWeight: 600 }}>
          {trackLabel(item.track)} · {item.backgroundTier}
        </p>
        <h3 style={{ margin: "0.4rem 0", fontSize: "1.1rem" }}>
          <Link
            href={`/cases/${item.slug}`}
            onClick={() => track("case_view", { id: item.slug })}
            style={{ textDecoration: "none", color: "var(--color-ink)" }}
          >
            {item.title}
          </Link>
        </h3>
        <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>
          申请难点：{item.difficulty.slice(0, 90)}
          {item.difficulty.length > 90 ? "…" : ""}
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <span className="meta-chip" style={{ color: "var(--color-brand)", borderColor: "var(--color-brand-soft)" }}>
          {item.resultLevel}
        </span>
        <div style={{ marginTop: "0.75rem" }}>
          <Link href={`/cases/${item.slug}`} style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-brand)" }}>
            查看路径 →
          </Link>
        </div>
      </div>
    </article>
  );
}

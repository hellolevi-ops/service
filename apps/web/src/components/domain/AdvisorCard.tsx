"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { Advisor } from "@/content/types";
import { trackLabel } from "@/lib/site";

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <article
      style={{
        border: "1px solid var(--color-line)",
        padding: "1.25rem",
        background: "var(--color-bg-elevated)",
        display: "grid",
        gap: "0.75rem",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
        <div
          aria-hidden
          style={{
            width: "3.25rem",
            height: "3.25rem",
            background: "linear-gradient(145deg, var(--color-brand), #2a6b52)",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
          }}
        >
          {advisor.name.slice(0, 1)}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.15rem" }}>
            <Link
              href={`/advisors/${advisor.slug}`}
              onClick={() => track("advisor_card_click", { id: advisor.slug })}
              style={{ textDecoration: "none" }}
            >
              {advisor.name}
            </Link>
          </h3>
          <p className="muted" style={{ margin: "0.2rem 0 0", fontSize: "0.85rem" }}>
            {advisor.years} 年经验 · {advisor.tracks.map(trackLabel).join(" / ")}
          </p>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: "0.95rem", minHeight: "2.8rem" }}>{advisor.methodOneLiner}</p>
      {advisor.acceptBooking ? (
        <Link
          href={`/book?advisor=${advisor.slug}`}
          className="btn btn-primary"
          style={{ fontSize: "0.85rem", minHeight: "2.5rem", width: "fit-content" }}
          onClick={() => track("advisor_cta_click", { id: advisor.slug })}
        >
          指定 TA 评估
        </Link>
      ) : (
        <button type="button" className="btn btn-secondary" disabled>
          暂不接评估
        </button>
      )}
    </article>
  );
}

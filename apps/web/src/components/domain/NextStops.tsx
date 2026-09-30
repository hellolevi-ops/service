"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export function NextStops({
  items,
  from,
}: {
  items: { href: string; title: string; reason: string }[];
  from: string;
}) {
  if (!items || items.length < 2) return null;
  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 className="display" style={{ fontSize: "1.35rem" }}>
        下一站
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 0", display: "grid", gap: "0.75rem" }}>
        {items.map((item) => (
          <li key={item.href} style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "0.75rem" }}>
            <Link
              href={item.href}
              onClick={() => track("next_content_click", { from, to: item.href })}
              style={{ fontWeight: 700, textDecoration: "none" }}
            >
              {item.title}
            </Link>
            <p className="muted" style={{ margin: "0.25rem 0 0", fontSize: "0.9rem" }}>
              {item.reason}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

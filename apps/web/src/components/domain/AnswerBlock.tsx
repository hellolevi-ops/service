"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function AnswerBlock({ text }: { text: string }) {
  useEffect(() => {
    track("answer_block_view");
  }, []);

  return (
    <aside
      id="answer"
      style={{
        borderLeft: "3px solid var(--color-brand)",
        padding: "1rem 1.1rem",
        background: "var(--color-bg-elevated)",
        margin: "1.25rem 0",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.8rem", letterSpacing: "0.08em", color: "var(--color-accent)" }}>
        结论摘要
      </p>
      <p style={{ margin: "0.5rem 0 0", fontSize: "1.05rem" }}>{text}</p>
      <button
        type="button"
        className="btn btn-secondary"
        style={{ marginTop: "0.75rem", minHeight: "2.25rem", fontSize: "0.85rem" }}
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          track("answer_block_copy");
        }}
      >
        复制结论
      </button>
    </aside>
  );
}

"use client";

import Image from "next/image";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { useState } from "react";

export function WeComDock({
  placement = "inline",
  advisorName,
}: {
  placement?: "inline" | "drawer" | "footer";
  advisorName?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(SITE.wechatId);
      setCopied(true);
      track("wechat_copy", { placement });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      style={{
        border: "1px solid var(--color-line)",
        padding: "1rem",
        background: "#fff",
        color: "var(--color-ink)",
      }}
    >
      <p style={{ margin: "0 0 0.5rem", fontWeight: 700 }}>
        微信 / 企微咨询{advisorName ? ` · ${advisorName}` : ""}
      </p>
      <p style={{ margin: "0 0 0.75rem", fontSize: "0.9rem", color: "var(--color-ink-muted)" }}>
        工作时段目标 15 分钟内首触。可与表单并行，不互斥。
      </p>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <Image
          src={SITE.wecomQr}
          alt="微信咨询二维码"
          width={140}
          height={140}
          onClick={() => track("wechat_click", { placement })}
        />
        <div>
          <p style={{ margin: 0 }}>微信号：{SITE.wechatId}</p>
          <button type="button" className="btn btn-secondary" style={{ marginTop: "0.5rem" }} onClick={copyId}>
            {copied ? "已复制" : "复制微信号"}
          </button>
        </div>
      </div>
    </div>
  );
}

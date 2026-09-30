"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { WeComDock } from "./WeComDock";
import "@/components/layout/nav.css";

export function StickyMobileDock() {
  const [wecomOpen, setWecomOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => {
      setHidden(vv.height < window.innerHeight * 0.7);
    };
    vv.addEventListener("resize", onResize);
    return () => vv.removeEventListener("resize", onResize);
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        className="mobile-dock"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          gridTemplateColumns: "1fr 1fr 1fr",
          height: "calc(var(--dock-height) + env(safe-area-inset-bottom, 0px))",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          background: "var(--color-bg-elevated)",
          borderTop: "1px solid var(--color-line)",
        }}
      >
        <Link
          href="/book"
          onClick={() => track("cta_click", { location: "mobile_dock", label: "评估" })}
          style={{
            display: "grid",
            placeItems: "center",
            textDecoration: "none",
            fontWeight: 700,
            color: "var(--color-brand)",
          }}
        >
          评估
        </Link>
        <button
          type="button"
          onClick={() => {
            track("wechat_click", { placement: "mobile_dock" });
            setWecomOpen(true);
          }}
          style={{
            border: 0,
            background: "transparent",
            font: "inherit",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          微信
        </button>
        <a
          href={`tel:${SITE.phone}`}
          onClick={() => track("phone_click", { placement: "mobile_dock" })}
          style={{
            display: "grid",
            placeItems: "center",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          电话
        </a>
      </div>

      {wecomOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="微信咨询"
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--color-overlay)",
            zIndex: 60,
            display: "grid",
            placeItems: "end center",
          }}
          onClick={() => setWecomOpen(false)}
        >
          <div
            style={{
              width: "min(100%, 28rem)",
              background: "var(--color-bg-elevated)",
              padding: "1.25rem",
              borderRadius: "12px 12px 0 0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <WeComDock placement="drawer" />
            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: "100%", marginTop: "0.75rem" }}
              onClick={() => setWecomOpen(false)}
            >
              关闭
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

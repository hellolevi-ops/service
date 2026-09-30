"use client";

type Props = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    _hmt?: unknown[];
  }
}

function pushToAdapters(event: string, props: Props) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  if (gaId && typeof window.gtag === "function") {
    window.gtag("event", event, props);
  }
  if (typeof window._hmt !== "undefined" && Array.isArray(window._hmt)) {
    window._hmt.push(["_trackEvent", "sa", event, JSON.stringify(props).slice(0, 120)]);
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props, ts: Date.now(), path: window.location.pathname };
  // Console sink always on for ops debug; GA4/百度 when IDs + scripts configured.
  console.info("[analytics]", payload);
  window.dispatchEvent(new CustomEvent("sa:track", { detail: payload }));
  try {
    pushToAdapters(event, props);
  } catch {
    /* ignore adapter errors */
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export function captureUtmFromUrl() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const stored: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) stored[key] = v;
  }
  if (Object.keys(stored).length) {
    sessionStorage.setItem("sa_utm", JSON.stringify(stored));
  }
}

export function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("sa_utm") || "{}") as Record<
      string,
      string
    >;
  } catch {
    return {};
  }
}

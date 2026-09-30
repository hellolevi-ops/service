"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TRACK_OPTIONS, SITE, type TrackSlug } from "@/lib/site";
import { captureUtmFromUrl, readUtm, track } from "@/lib/analytics";

type Variant = "short" | "book" | "tool" | "event";

export function LeadForm({
  variant = "short",
  track: defaultTrack,
  preferredAdvisorId,
  eventSlug,
  labTool,
  privacyVersion = SITE.privacyVersion,
  submitLabel = "预约免费评估",
  onSuccess,
}: {
  variant?: Variant;
  track?: TrackSlug;
  preferredAdvisorId?: string;
  eventSlug?: string;
  labTool?: string;
  privacyVersion?: string;
  submitLabel?: string;
  onSuccess?: (leadId: string) => void;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [started, setStarted] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackSlug>(
    defaultTrack || "undecided",
  );

  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError("请勾选隐私政策后再提交");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const trackValue = String(fd.get("track") || "undecided") as TrackSlug;
    const utm = readUtm();
    const payload = {
      name: String(fd.get("name") || ""),
      mobile: String(fd.get("mobile") || ""),
      wechat: String(fd.get("wechat") || ""),
      track: trackValue,
      intentYear: String(fd.get("intentYear") || "") || undefined,
      educationStage: String(fd.get("educationStage") || "") || undefined,
      guardianName: String(fd.get("guardianName") || "") || undefined,
      guardianMobile: String(fd.get("guardianMobile") || "") || undefined,
      sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
      landingSlug:
        typeof window !== "undefined" ? window.location.pathname.slice(0, 120) : undefined,
      utmSource: utm.utm_source,
      utmMedium: utm.utm_medium,
      utmCampaign: utm.utm_campaign,
      utmContent: utm.utm_content,
      formVariant: variant,
      eventSlug,
      labTool,
      preferredAdvisorId: preferredAdvisorId || undefined,
      consent: true,
      privacyVersion,
      website: String(fd.get("website") || ""),
    };

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 204) {
        router.push("/thank-you");
        return;
      }
      const json = (await res.json()) as { ok?: boolean; leadId?: string; error?: string };
      if (!res.ok || !json.ok || !json.leadId) {
        track("form_submit_fail", { variant, track: payload.track });
        setError(json.error || "提交失败，请稍后再试");
        return;
      }
      track("form_submit_success", { variant, track: payload.track });
      if (onSuccess) onSuccess(json.leadId);
      else router.push(`/thank-you?lead=${json.leadId}`);
    } catch {
      track("form_submit_fail", { variant, track: payload.track });
      setError("网络异常，请稍后重试或改用微信");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => {
        if (!started) {
          setStarted(true);
          track("form_start", { variant, track: defaultTrack });
        }
      }}
      style={{
        border: "1px solid var(--color-line)",
        padding: "1.25rem",
        background: "#fff",
        color: "var(--color-ink)",
      }}
      noValidate
    >
      <p style={{ marginTop: 0, fontWeight: 700 }}>
        {variant === "event" ? "活动报名" : "预约免费评估 / 规划"}
      </p>
      <p className="muted" style={{ marginTop: "-0.35rem", fontSize: "0.9rem" }}>
        工作时段目标 15 分钟内首触。也可直接加企微。
      </p>

      <div className="field">
        <label htmlFor={`name-${variant}`}>称呼</label>
        <input id={`name-${variant}`} name="name" required maxLength={40} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor={`mobile-${variant}`}>手机</label>
        <input
          id={`mobile-${variant}`}
          name="mobile"
          required
          inputMode="numeric"
          pattern="^1[3-9]\\d{9}$"
          placeholder="大陆手机号"
          autoComplete="tel"
        />
      </div>
      <div className="field">
        <label htmlFor={`track-${variant}`}>意向方向</label>
        <select
          id={`track-${variant}`}
          name="track"
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value as TrackSlug)}
          required
        >
          {TRACK_OPTIONS.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTrack === "k12" && (
        <>
          <div className="field">
            <label htmlFor={`guardian-name-${variant}`}>监护人姓名</label>
            <input
              id={`guardian-name-${variant}`}
              name="guardianName"
              required
              maxLength={40}
              placeholder="低龄咨询必填"
            />
          </div>
          <div className="field">
            <label htmlFor={`guardian-mobile-${variant}`}>监护人手机</label>
            <input
              id={`guardian-mobile-${variant}`}
              name="guardianMobile"
              required
              inputMode="numeric"
              pattern="^1[3-9]\\d{9}$"
              placeholder="大陆手机号"
            />
          </div>
        </>
      )}

      {(variant === "book" || variant === "tool") && (
        <>
          <div className="field">
            <label htmlFor={`wechat-${variant}`}>微信（选填，可同号）</label>
            <input id={`wechat-${variant}`} name="wechat" maxLength={64} />
          </div>
          <div className="field">
            <label htmlFor={`year-${variant}`}>计划入学年（选填）</label>
            <input id={`year-${variant}`} name="intentYear" placeholder="如 2027" />
          </div>
          <div className="field">
            <label htmlFor={`stage-${variant}`}>学历阶段（选填）</label>
            <input id={`stage-${variant}`} name="educationStage" placeholder="如 大三 / 高二" />
          </div>
        </>
      )}

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`website-${variant}`}>网站</label>
        <input id={`website-${variant}`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "1rem" }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ width: "1.15rem", height: "1.15rem", marginTop: "0.2rem" }}
        />
        <span style={{ fontSize: "0.9rem" }}>
          我已阅读并同意{" "}
          <a href="/privacy" target="_blank" rel="noreferrer">
            隐私政策
          </a>
          （版本 {privacyVersion}）
        </span>
      </label>

      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary" disabled={loading || !consent} aria-busy={loading}>
        {loading ? "提交中…" : submitLabel}
      </button>
    </form>
  );
}

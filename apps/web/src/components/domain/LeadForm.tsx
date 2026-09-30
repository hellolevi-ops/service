"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TRACK_OPTIONS, SITE, type TrackSlug } from "@/lib/site";
import { captureUtmFromUrl, readUtm, track } from "@/lib/analytics";
import { ShieldCheck, ArrowRight } from "lucide-react";

type Variant = "short" | "book" | "tool" | "event";

export function LeadForm({
  variant = "short",
  track: defaultTrack,
  preferredAdvisorId,
  eventSlug,
  labTool,
  privacyVersion = SITE.privacyVersion,
  submitLabel = "预约免费学术初诊",
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
      setError("请先阅读并勾选隐私保护协议");
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
        setError(json.error || "提交失败，请检查输入或稍后重试");
        return;
      }
      track("form_submit_success", { variant, track: payload.track });
      if (onSuccess) onSuccess(json.leadId);
      else router.push(`/thank-you?lead=${json.leadId}`);
    } catch {
      track("form_submit_fail", { variant, track: payload.track });
      setError("网络异常，请稍后重试或改用微信直连");
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
      className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs text-slate-800 space-y-4 text-xs"
      noValidate
    >
      <div>
        <h3 className="text-base font-bold text-slate-900 font-editorial-title">
          {variant === "event" ? "专场活动预约报名" : "预约 1对1 免费专家初诊"}
        </h3>
        <p className="text-slate-500 text-xs mt-1">
          工作时段博导团队 15 分钟内专业答复 · 仅用于预约沟通
        </p>
      </div>

      <div className="space-y-1">
        <label htmlFor={`name-${variant}`} className="block font-semibold text-slate-700">
          您的称呼
        </label>
        <input
          id={`name-${variant}`}
          name="name"
          required
          maxLength={40}
          autoComplete="name"
          placeholder="如：张同学 / 李女士"
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor={`mobile-${variant}`} className="block font-semibold text-slate-700">
          手机联系方式
        </label>
        <input
          id={`mobile-${variant}`}
          name="mobile"
          required
          inputMode="numeric"
          pattern="^1[3-9]\d{9}$"
          placeholder="中国大陆手机号（必填）"
          autoComplete="tel"
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor={`track-${variant}`} className="block font-semibold text-slate-700">
          意向留学方向
        </label>
        <select
          id={`track-${variant}`}
          name="track"
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value as TrackSlug)}
          required
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
        >
          {TRACK_OPTIONS.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTrack === "k12" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1">
            <label htmlFor={`guardian-name-${variant}`} className="block font-semibold text-slate-700">
              监护人姓名
            </label>
            <input
              id={`guardian-name-${variant}`}
              name="guardianName"
              required
              maxLength={40}
              placeholder="低龄咨询必填"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor={`guardian-mobile-${variant}`} className="block font-semibold text-slate-700">
              监护人手机
            </label>
            <input
              id={`guardian-mobile-${variant}`}
              name="guardianMobile"
              required
              inputMode="numeric"
              pattern="^1[3-9]\d{9}$"
              placeholder="大陆手机号"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
            />
          </div>
        </div>
      )}

      {(variant === "book" || variant === "tool") && (
        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <label htmlFor={`wechat-${variant}`} className="block font-semibold text-slate-700">
              微信号（选填，方便直接发送方案）
            </label>
            <input
              id={`wechat-${variant}`}
              name="wechat"
              maxLength={64}
              placeholder="微信号或同手机号"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor={`year-${variant}`} className="block font-semibold text-slate-700">
                计划入学年份
              </label>
              <input
                id={`year-${variant}`}
                name="intentYear"
                placeholder="如 2026 / 2027"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor={`stage-${variant}`} className="block font-semibold text-slate-700">
                当前在读阶段
              </label>
              <input
                id={`stage-${variant}`}
                name="educationStage"
                placeholder="如 大三 / 高二"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* Honeypot */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`website-${variant}`}>网站</label>
        <input id={`website-${variant}`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Consent Checkbox */}
      <label className="flex items-start gap-2 pt-1 cursor-pointer select-none text-xs text-slate-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4 cursor-pointer"
        />
        <span>
          我已阅读并同意《
          <a href="/privacy" target="_blank" rel="noreferrer" className="text-slate-900 underline hover:text-blue-900">
            隐私权保护政策
          </a>
          》（版本 {privacyVersion}）。承诺信息仅用于留学初诊评估与方案沟通。
        </span>
      </label>

      {error ? (
        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || !consent}
        aria-busy={loading}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>{loading ? "正在提交评估中…" : submitLabel}</span>
        <ArrowRight className="w-3.5 h-3.5 text-white" />
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>正规合同保护 · 严格个人信息保护与数据安全保障</span>
      </div>
    </form>
  );
}

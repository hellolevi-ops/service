"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { SITE } from "@/lib/site";

const DEV_HINT =
  process.env.NEXT_PUBLIC_AUTH_DEV_OTP === "1"
    ? "测试环境：填任意 11 位手机号 → 点「获取验证码」→ 验证码填 888888 → 勾选隐私政策 → 登录"
    : "";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const returnUrl = search.get("returnUrl") || "/account";

  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [roleTag, setRoleTag] = useState("applicant");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");
  const [hint, setHint] = useState(DEV_HINT);
  const [busy, setBusy] = useState(false);

  async function sendCode() {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "发送失败");
        return;
      }
      setSent(true);
      setHint(json.devHint || DEV_HINT || "验证码已发送");
      if (json.devHint || DEV_HINT) {
        setCode("888888");
      }
      setCooldown(json.cooldown || 60);
      const timer = setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!sent && !DEV_HINT) {
      setError("请先点击「获取验证码」");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, code, consent, roleTag }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "登录失败");
        return;
      }
      router.replace(returnUrl.startsWith("/") ? returnUrl : "/account");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 space-y-4 shadow-sm"
    >
      {DEV_HINT ? (
        <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 leading-relaxed">
          {DEV_HINT}
        </p>
      ) : null}

        <label className="block text-xs font-semibold text-slate-700">
          手机号
          <input
            type="tel"
            inputMode="numeric"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 11))}
            className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
            placeholder="11 位大陆手机号，如 13900001111"
            required
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
          <label className="flex-1 block text-xs font-semibold text-slate-700 min-w-0">
            验证码
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
              placeholder="6 位数字"
              required
            />
          </label>
          <button
            type="button"
            disabled={busy || cooldown > 0 || mobile.length !== 11}
            onClick={() => void sendCode()}
            className="w-full sm:w-auto shrink-0 min-h-[44px] px-4 py-2.5 text-xs font-semibold border border-slate-200 rounded-xl disabled:opacity-50"
          >
            {cooldown > 0 ? `${cooldown}s` : sent ? "重新获取" : "获取验证码"}
          </button>
        </div>

        {hint && hint !== DEV_HINT ? (
          <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5">
            {hint}
          </p>
        ) : null}

        <label className="block text-xs font-semibold text-slate-700">
          我是
          <select
            value={roleTag}
            onChange={(e) => setRoleTag(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm"
          >
            <option value="applicant">申请中学生</option>
            <option value="parent">家长</option>
            <option value="enrolled">海外在读 / 已录取</option>
          </select>
        </label>

        <label className="flex items-start gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            我已阅读并同意{" "}
            <Link href="/privacy" className="text-blue-900 underline">
              隐私政策
            </Link>{" "}
            与{" "}
            <Link href="/terms" className="text-blue-900 underline">
              服务条款
            </Link>
          </span>
        </label>

        {error ? <p className="text-xs text-rose-600">{error}</p> : null}

        <button
          type="submit"
          disabled={busy || !consent}
          className="btn btn--cta btn--block disabled:opacity-50"
        >
          {busy ? "处理中…" : "登录"}
        </button>

        <p className="text-xs text-slate-400 text-center">
          需要申请咨询？直接{" "}
          <Link href="/book" className="text-blue-900 font-semibold">
            免费评估
          </Link>
          ，即可直接使用。
        </p>
      </form>
  );
}

export default function LoginPage() {
  return (
    <main className="max-w-lg mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-6">
      <div className="page-banner">
        <span className="page-banner__chip">{SITE.brand}</span>
        <h1>登录 / 注册</h1>
        <p>手机号验证码一键登录；首次验证即完成注册。咨询评估可直接预约，登录后可保存记录。</p>
      </div>
      <Suspense
        fallback={
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            加载中…
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}

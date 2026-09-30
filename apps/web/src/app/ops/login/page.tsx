"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function OpsLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/ops/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "登录失败");
        return;
      }
      router.replace("/ops/leads");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm"
      >
        <div>
          <h1 className="text-lg font-bold text-slate-900">员工登录</h1>
          <p className="text-xs text-slate-500 mt-1">线索工作台 · 员工专用入口</p>
        </div>
        <label className="block text-xs font-semibold">
          邮箱
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
            required
            autoComplete="username"
          />
        </label>
        <label className="block text-xs font-semibold">
          密码
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
            required
            autoComplete="current-password"
          />
        </label>
        {error && <p className="text-xs text-rose-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl"
        >
          {busy ? "登录中…" : "登录"}
        </button>
        <p className="text-xs text-slate-400 text-center">
          客户请使用{" "}
          <Link href="/login" className="text-blue-900">
            官网登录
          </Link>
        </p>
      </form>
    </main>
  );
}

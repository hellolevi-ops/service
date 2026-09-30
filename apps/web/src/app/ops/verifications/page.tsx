"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Row = {
  id: string;
  real_name: string;
  university: string;
  program: string | null;
  proof_note: string | null;
  status: string;
  created_at: string;
  mobile: string;
  nickname: string | null;
};

export default function OpsVerificationsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    const me = await fetch("/api/ops/auth/me").then((r) => r.json());
    if (!me.staff) {
      router.replace("/ops/login");
      return;
    }
    setReady(true);
    const res = await fetch(`/api/ops/verifications?status=${status}`);
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "加载失败");
      return;
    }
    setRows(json.requests || []);
  }, [router, status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function decide(id: string, decision: "approved" | "rejected") {
    const note =
      decision === "rejected" ? window.prompt("驳回原因（可选）") || "" : "";
    const res = await fetch("/api/ops/verifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, decision, reviewerNote: note }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "操作失败");
      return;
    }
    await load();
  }

  if (!ready) {
    return (
      <main className="min-h-screen grid place-items-center text-sm text-slate-500">
        校验登录态…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-base font-bold">在读认证审核</h1>
        <Link href="/ops/leads" className="text-xs text-blue-900 font-semibold">
          ← 线索台
        </Link>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5"
        >
          <option value="pending">待审核</option>
          <option value="approved">已通过</option>
          <option value="rejected">已驳回</option>
          <option value="all">全部</option>
        </select>
      </header>
      {error && <p className="px-4 py-2 text-xs text-rose-600 bg-rose-50">{error}</p>}
      <div className="p-4 space-y-3 max-w-3xl mx-auto">
        {!rows.length && (
          <p className="text-sm text-slate-500 text-center py-10">暂无记录</p>
        )}
        {rows.map((r) => (
          <article
            key={r.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 text-xs space-y-2"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <strong className="text-sm text-slate-900">
                {r.real_name} · {r.university}
              </strong>
              <span className="font-mono text-slate-500">{r.status}</span>
            </div>
            <p className="text-slate-600">
              {r.program || "专业未填"} · 手机 {r.mobile}
              {r.nickname ? ` · ${r.nickname}` : ""}
            </p>
            {r.proof_note && (
              <p className="bg-slate-50 rounded-lg p-2 text-slate-700">{r.proof_note}</p>
            )}
            <p className="text-slate-400 font-mono">
              {new Date(r.created_at).toLocaleString("zh-CN")}
            </p>
            {r.status === "pending" && (
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => void decide(r.id, "approved")}
                  className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-semibold"
                >
                  通过 → L2
                </button>
                <button
                  type="button"
                  onClick={() => void decide(r.id, "rejected")}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg font-semibold"
                >
                  驳回
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD_STATUSES } from "@/lib/ops-auth";

type Lead = {
  id: string;
  name: string;
  mobile: string;
  wechat: string | null;
  track: string;
  status: string;
  form_variant: string;
  utm_source: string | null;
  utm_campaign: string | null;
  landing_slug: string | null;
  event_slug: string | null;
  lab_tool: string | null;
  next_follow_up_at: string | null;
  first_contact_at: string | null;
  invalid_reason: string | null;
  merge_count: number;
  created_at: string;
};

type Note = { id: string; body: string; created_at: string };

type Staff = {
  id: string;
  email: string;
  display_name: string;
  role: string;
};

export default function OpsLeadsPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<Staff | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [reveal, setReveal] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void fetch("/api/ops/auth/me")
      .then((r) => r.json())
      .then((json) => {
        if (!json.staff) {
          router.replace("/ops/login");
          return;
        }
        setStaff(json.staff);
      })
      .finally(() => setAuthChecked(true));
  }, [router]);

  const load = useCallback(async () => {
    if (!staff) return;
    setBusy(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (q.trim()) params.set("q", q.trim());
      if (reveal) params.set("reveal", "1");
      const res = await fetch(`/api/ops/leads?${params}`);
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (res.status === 401) {
          router.replace("/ops/login");
          return;
        }
        setError(json.error || "加载失败");
        setLeads([]);
        return;
      }
      setLeads(json.leads || []);
      setTotal(json.total || 0);
    } catch {
      setError("加载失败");
    } finally {
      setBusy(false);
    }
  }, [staff, status, q, reveal, router]);

  useEffect(() => {
    if (staff) void load();
  }, [staff, load]);

  async function saveLead(patch: {
    status?: string;
    note?: string;
    nextFollowUpAt?: string | null;
    invalidReason?: string | null;
  }) {
    if (!selected) return;
    setBusy(true);
    try {
      const res = await fetch("/api/ops/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, ...patch }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "保存失败");
        return;
      }
      setNotes(json.notes || []);
      setNote("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  function exportCsv() {
    const url = `/api/ops/leads/export?${reveal ? "reveal=1" : ""}`;
    fetch(url, {
      headers: { "x-ops-actor": staff?.email || "ops-ui" },
    })
      .then((r) => r.blob())
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `leads-${Date.now()}.csv`;
        a.click();
      });
  }

  async function logout() {
    await fetch("/api/ops/auth/logout", { method: "POST" });
    router.replace("/ops/login");
  }

  if (!authChecked || !staff) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-slate-500">
        校验登录态…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-base font-bold">线索工作台</h1>
        <span className="text-xs text-slate-500">
          {staff.display_name} · {staff.role} · 共 {total} 条
        </span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5"
        >
          <option value="">全部状态</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索姓名/手机/微信"
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 w-48"
        />
        <label className="text-xs flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={reveal}
            onChange={(e) => setReveal(e.target.checked)}
          />
          显示完整手机号
        </label>
        <button
          type="button"
          onClick={() => void load()}
          disabled={busy}
          className="text-xs px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold"
        >
          刷新
        </button>
        <button
          type="button"
          onClick={exportCsv}
          className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg font-semibold"
        >
          导出 CSV
        </button>
        <a
          href="/ops/verifications"
          className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg font-semibold"
        >
          在读认证
        </a>
        <button
          type="button"
          onClick={() => void logout()}
          className="text-xs px-3 py-1.5 text-slate-500 hover:text-slate-900 ml-auto"
        >
          退出
        </button>
      </header>

      {error && <p className="px-4 py-2 text-xs text-rose-600 bg-rose-50">{error}</p>}

      <div className="grid lg:grid-cols-[1fr_22rem] gap-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-2.5 font-semibold">时间</th>
                <th className="p-2.5 font-semibold">姓名</th>
                <th className="p-2.5 font-semibold">手机</th>
                <th className="p-2.5 font-semibold">方向</th>
                <th className="p-2.5 font-semibold">状态</th>
                <th className="p-2.5 font-semibold">来源</th>
                <th className="p-2.5 font-semibold">UTM</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => {
                    setSelected(lead);
                    setNotes([]);
                  }}
                  className={`border-b border-slate-100 cursor-pointer hover:bg-amber-50/50 ${
                    selected?.id === lead.id ? "bg-amber-50" : "bg-white"
                  }`}
                >
                  <td className="p-2.5 whitespace-nowrap font-mono text-[11px] text-slate-500">
                    {new Date(lead.created_at).toLocaleString("zh-CN")}
                  </td>
                  <td className="p-2.5 font-semibold">{lead.name}</td>
                  <td className="p-2.5 font-mono">{lead.mobile}</td>
                  <td className="p-2.5">{lead.track}</td>
                  <td className="p-2.5">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-medium">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-600">
                    {lead.form_variant}
                    {lead.landing_slug ? ` · ${lead.landing_slug}` : ""}
                  </td>
                  <td className="p-2.5 text-slate-500">
                    {[lead.utm_source, lead.utm_campaign].filter(Boolean).join(" / ") ||
                      "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!leads.length && (
            <p className="p-8 text-sm text-slate-500 text-center">暂无线索</p>
          )}
        </div>

        <aside className="border-l border-slate-200 bg-white p-4 space-y-3 min-h-[24rem]">
          {selected ? (
            <>
              <div>
                <h2 className="font-bold text-sm">{selected.name}</h2>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{selected.id}</p>
              </div>
              <dl className="text-xs space-y-1 text-slate-600">
                <div>手机：{selected.mobile}</div>
                <div>微信：{selected.wechat || "—"}</div>
                <div>工具/活动：{selected.lab_tool || selected.event_slug || "—"}</div>
                <div>合并次数：{selected.merge_count}</div>
                <div>
                  首触：
                  {selected.first_contact_at
                    ? new Date(selected.first_contact_at).toLocaleString("zh-CN")
                    : "尚未联系"}
                </div>
              </dl>
              <label className="block text-xs font-semibold">
                状态
                <select
                  className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-1.5"
                  value={selected.status}
                  onChange={(e) => {
                    const next = e.target.value;
                    setSelected({ ...selected, status: next });
                    void saveLead({ status: next });
                  }}
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              {selected.status === "invalid" && (
                <input
                  className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs"
                  placeholder="失效原因"
                  defaultValue={selected.invalid_reason || ""}
                  onBlur={(e) => void saveLead({ invalidReason: e.target.value })}
                />
              )}
              <label className="block text-xs font-semibold">
                下次跟进
                <input
                  type="datetime-local"
                  className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs"
                  onChange={(e) =>
                    void saveLead({
                      nextFollowUpAt: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    })
                  }
                />
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="添加跟进备注…"
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs"
              />
              <button
                type="button"
                disabled={busy || !note.trim()}
                onClick={() => void saveLead({ note })}
                className="w-full py-2 bg-amber-400 !text-slate-950 text-xs font-bold rounded-lg"
              >
                保存备注
              </button>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {notes.map((n) => (
                  <div key={n.id} className="text-[11px] bg-slate-50 rounded-lg p-2">
                    <div className="text-slate-400 font-mono mb-0.5">
                      {new Date(n.created_at).toLocaleString("zh-CN")}
                    </div>
                    {n.body}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-500">选择左侧线索查看详情</p>
          )}
        </aside>
      </div>
    </main>
  );
}

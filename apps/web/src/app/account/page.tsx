"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Me = {
  id: string;
  mobile: string;
  nickname: string | null;
  role_tag: string;
  level: string;
};

type LeadRow = {
  id: string;
  track: string;
  status: string;
  form_variant: string;
  landing_slug: string | null;
  created_at: string;
};

type Fav = {
  id: string;
  target_type: string;
  target_slug: string;
  title: string;
  href: string;
  created_at: string;
};

type VerReq = {
  id: string;
  real_name: string;
  university: string;
  program: string | null;
  status: string;
  reviewer_note: string | null;
  created_at: string;
};

const ROLE_LABEL: Record<string, string> = {
  applicant: "申请中学生",
  parent: "家长",
  enrolled: "海外在读 / 已录取",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "待审核",
  approved: "已通过",
  rejected: "需补充材料",
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const [roleTag, setRoleTag] = useState("applicant");
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [favorites, setFavorites] = useState<Fav[]>([]);
  const [requests, setRequests] = useState<VerReq[]>([]);
  const [level, setLevel] = useState("L1");
  const [msg, setMsg] = useState("");
  const [verForm, setVerForm] = useState({
    realName: "",
    university: "",
    program: "",
    proofNote: "",
  });

  const refresh = useCallback(async () => {
    const me = await fetch("/api/auth/me").then((r) => r.json());
    if (!me.user) {
      router.replace("/login?returnUrl=/account");
      return;
    }
    setUser(me.user);
    setNickname(me.user.nickname || "");
    setRoleTag(me.user.role_tag || "applicant");
    setLevel(me.user.level || "L1");

    const [l, f, v] = await Promise.all([
      fetch("/api/auth/leads").then((r) => r.json()),
      fetch("/api/auth/favorites").then((r) => r.json()),
      fetch("/api/auth/verification").then((r) => r.json()),
    ]);
    setLeads(l.leads || []);
    setFavorites(f.favorites || []);
    setRequests(v.requests || []);
    if (v.level) setLevel(v.level);
  }, [router]);

  useEffect(() => {
    void refresh().finally(() => setLoading(false));
  }, [refresh]);

  async function saveProfile(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/auth/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, roleTag }),
    });
    const json = await res.json();
    if (!res.ok) {
      setMsg(json.error || "保存失败");
      return;
    }
    setUser(json.user);
    setMsg("资料已保存");
  }

  async function submitVerification(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/auth/verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(verForm),
    });
    const json = await res.json();
    if (!res.ok) {
      setMsg(json.error || "提交失败");
      return;
    }
    setMsg("在读认证已提交，请等待审核");
    setVerForm({ realName: "", university: "", program: "", proofNote: "" });
    await refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  async function removeFav(f: Fav) {
    await fetch(
      `/api/auth/favorites?targetType=${encodeURIComponent(f.target_type)}&targetSlug=${encodeURIComponent(f.target_slug)}`,
      { method: "DELETE" },
    );
    setFavorites((prev) => prev.filter((x) => x.id !== f.id));
  }

  if (loading || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-sm text-slate-500 text-center">
        加载中…
      </div>
    );
  }

  const hasPending = requests.some((r) => r.status === "pending");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-6 sm:space-y-8">
      <div className="page-banner">
        <span className="page-banner__chip">个人中心</span>
        <h1>我的账号</h1>
        <p>
          {ROLE_LABEL[user.role_tag] || user.role_tag} · {level}
          {level === "L2" ? " 在读认证" : ""}
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Link href="/community" className="btn btn--outline btn--cta-sm justify-center">
            社区
          </Link>
          <Link href="/book" className="btn btn--cta btn--cta-sm justify-center">
            免费评估
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="btn btn--outline btn--cta-sm justify-center"
          >
            退出
          </button>
        </div>
      </div>

      {msg && (
        <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
          {msg}
        </p>
      )}

      <section className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">资料</h2>
        <form onSubmit={saveProfile} className="space-y-3">
          <div className="text-xs text-slate-500">
            手机号 <span className="font-mono font-semibold text-slate-800">{user.mobile}</span>
          </div>
          <label className="block text-xs font-semibold">
            昵称
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
              maxLength={64}
            />
          </label>
          <label className="block text-xs font-semibold">
            身份标签
            <select
              value={roleTag}
              onChange={(e) => setRoleTag(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
            >
              <option value="applicant">申请中学生</option>
              <option value="parent">家长</option>
              <option value="enrolled">海外在读 / 已录取</option>
            </select>
          </label>
          <button
            type="submit"
            className="btn btn--cta btn--cta-sm"
          >
            保存资料
          </button>
        </form>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-900">我的咨询进度</h2>
        {!leads.length ? (
          <p className="text-xs text-slate-500">
            关联线索将显示在这里。提交{" "}
            <Link href="/book" className="text-blue-900 font-semibold">
              免费评估
            </Link>{" "}
            后将显示在此（同手机号自动关联）。
          </p>
        ) : (
          <ul className="space-y-2">
            {leads.map((l) => (
              <li
                key={l.id}
                className="text-xs border border-slate-100 rounded-xl px-3 py-2.5 flex flex-wrap justify-between gap-2"
              >
                <span>
                  {l.track} · {l.form_variant}
                  {l.landing_slug ? ` · ${l.landing_slug}` : ""}
                </span>
                <span className="font-semibold text-slate-800">{l.status}</span>
                <span className="w-full text-slate-400 font-mono text-xs">
                  {new Date(l.created_at).toLocaleString("zh-CN")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-900">收藏</h2>
        {!favorites.length ? (
          <p className="text-xs text-slate-500">浏览案例、指南时点击「收藏」即可保存到这里。</p>
        ) : (
          <ul className="space-y-2">
            {favorites.map((f) => (
              <li
                key={f.id}
                className="text-xs flex items-center justify-between gap-2 border border-slate-100 rounded-xl px-3 py-2"
              >
                <Link href={f.href} className="text-blue-900 font-semibold hover:underline">
                  {f.title}
                </Link>
                <button
                  type="button"
                  onClick={() => void removeFav(f)}
                  className="text-slate-400 hover:text-rose-600 shrink-0"
                >
                  取消
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-900">在读认证（L2）</h2>
        {level === "L2" ? (
          <p className="text-xs text-emerald-700 font-semibold">你已通过在读认证。</p>
        ) : (
          <>
            <p className="text-xs text-slate-500 leading-relaxed">
              通过后可进入社区在读频道与特邀讨论。请如实填写；运营将人工核验（可附学生证/录取说明摘要；证件原件照片请妥善保管在本地）。
            </p>
            {requests.length > 0 && (
              <ul className="space-y-1.5 text-xs">
                {requests.map((r) => (
                  <li key={r.id} className="bg-slate-50 rounded-lg px-3 py-2">
                    {r.university} · {STATUS_LABEL[r.status] || r.status}
                    {r.reviewer_note ? ` · ${r.reviewer_note}` : ""}
                  </li>
                ))}
              </ul>
            )}
            {!hasPending && (
              <form onSubmit={submitVerification} className="space-y-2 pt-1">
                <input
                  required
                  placeholder="真实姓名（仅审核可见）"
                  value={verForm.realName}
                  onChange={(e) => setVerForm({ ...verForm, realName: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
                <input
                  required
                  placeholder="就读 / 录取院校"
                  value={verForm.university}
                  onChange={(e) => setVerForm({ ...verForm, university: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
                <input
                  placeholder="专业（可选）"
                  value={verForm.program}
                  onChange={(e) => setVerForm({ ...verForm, program: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
                <textarea
                  placeholder="证明说明（如录取年份、可核验方式；证件号请自行隐去）"
                  rows={3}
                  value={verForm.proofNote}
                  onChange={(e) => setVerForm({ ...verForm, proofNote: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="btn btn--cta btn--cta-sm w-full sm:w-auto"
                >
                  提交认证申请
                </button>
              </form>
            )}
          </>
        )}
      </section>

      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500">
        微信绑定与短信正式通道将在短信/开放平台凭证就绪后开通。当前登录仍使用手机验证码。
      </section>
    </div>
  );
}

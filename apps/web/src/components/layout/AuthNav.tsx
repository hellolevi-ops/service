"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Me = {
  nickname: string | null;
  mobile: string;
  level: string;
};

export function AuthNav({ mobileMenu }: { mobileMenu?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<Me | null | undefined>(undefined);

  useEffect(() => {
    void fetch("/api/auth/me")
      .then((r) => r.json())
      .then((json) => setUser(json.user || null))
      .catch(() => setUser(null));
  }, [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
  }

  if (user === undefined) {
    return (
      <span className={mobileMenu ? "block py-2 text-slate-400 text-sm" : "hidden sm:inline text-xs text-slate-400 px-2"}>
        …
      </span>
    );
  }

  if (!user) {
    return (
      <Link
        href={`/login?returnUrl=${encodeURIComponent(pathname || "/")}`}
        className={
          mobileMenu
            ? "block py-2 border-b border-slate-100 text-slate-900 font-medium"
            : "hidden sm:inline-flex text-xs font-semibold text-slate-700 hover:text-blue-900 px-2 py-2"
        }
      >
        登录
      </Link>
    );
  }

  if (mobileMenu) {
    return (
      <>
        <Link
          href="/account"
          className="block py-2 border-b border-slate-100 text-slate-900 font-medium"
        >
          我的账号 ({user.level})
        </Link>
        <button
          type="button"
          onClick={() => void logout()}
          className="block w-full text-left py-2 border-b border-slate-100 text-slate-700 font-medium"
        >
          退出
        </button>
      </>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-1">
      <Link
        href="/account"
        className="text-xs font-semibold text-slate-700 hover:text-blue-900 px-2 py-2"
      >
        {user.nickname || "我的"}
      </Link>
      <button
        type="button"
        onClick={() => void logout()}
        className="text-xs text-slate-500 hover:text-slate-900 px-2 py-2"
      >
        退出
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  targetType: string;
  targetSlug: string;
  title: string;
  href: string;
  className?: string;
};

export function FavoriteButton({
  targetType,
  targetSlug,
  title,
  href,
  className = "",
}: Props) {
  const router = useRouter();
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    void fetch("/api/auth/me")
      .then((r) => r.json())
      .then(async (json) => {
        if (!json.user) {
          setAuthed(false);
          setReady(true);
          return;
        }
        setAuthed(true);
        const fav = await fetch("/api/auth/favorites").then((r) => r.json());
        const hit = (fav.favorites || []).some(
          (f: { target_type: string; target_slug: string }) =>
            f.target_type === targetType && f.target_slug === targetSlug,
        );
        setOn(hit);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [targetType, targetSlug]);

  async function toggle() {
    if (!authed) {
      router.push(`/login?returnUrl=${encodeURIComponent(href)}`);
      return;
    }
    if (on) {
      await fetch(
        `/api/auth/favorites?targetType=${encodeURIComponent(targetType)}&targetSlug=${encodeURIComponent(targetSlug)}`,
        { method: "DELETE" },
      );
      setOn(false);
    } else {
      const res = await fetch("/api/auth/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetSlug, title, href }),
      });
      if (res.ok) setOn(true);
    }
  }

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        on ? "text-amber-700" : "text-slate-500 hover:text-slate-800"
      } ${className}`}
      aria-label={on ? "取消收藏" : "收藏"}
    >
      {on ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
      {on ? "已收藏" : "收藏"}
    </button>
  );
}

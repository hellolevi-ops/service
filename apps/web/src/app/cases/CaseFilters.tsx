"use client";

import { useRouter, usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

export function CaseFilters({
  tracks,
  currentTrack,
  currentTier,
}: {
  tracks: { slug: string; name: string }[];
  currentTrack?: string;
  currentTier?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function update(next: { track?: string; tier?: string }) {
    const params = new URLSearchParams();
    const trackVal = next.track ?? currentTrack;
    const tierVal = next.tier ?? currentTier;
    if (trackVal) params.set("track", trackVal);
    if (tierVal) params.set("tier", tierVal);
    track("case_filter", { filters: params.toString() });
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "1.25rem 0" }}>
      <label>
        方向{" "}
        <select
          value={currentTrack || ""}
          onChange={(e) => update({ track: e.target.value || undefined, tier: currentTier })}
        >
          <option value="">全部</option>
          {tracks.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        背景{" "}
        <select
          value={currentTier || ""}
          onChange={(e) => update({ tier: e.target.value || undefined, track: currentTrack })}
        >
          <option value="">全部</option>
          <option value="双非">双非</option>
          <option value="普高">普高</option>
          <option value="艺术">艺术</option>
          <option value="跨专业">跨专业</option>
        </select>
      </label>
    </div>
  );
}

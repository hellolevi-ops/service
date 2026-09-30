"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TrustFooter } from "@/components/layout/TrustFooter";
import { StickyMobileDock } from "@/components/domain/StickyMobileDock";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const bare = pathname.startsWith("/ops");

  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      {children}
      <TrustFooter />
      <StickyMobileDock />
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "运营后台",
  robots: { index: false, follow: false },
};

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

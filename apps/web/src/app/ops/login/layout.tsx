import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "员工登录",
  robots: { index: false, follow: false },
};

export default function OpsLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

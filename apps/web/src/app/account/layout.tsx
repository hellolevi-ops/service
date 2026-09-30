import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的账号",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}

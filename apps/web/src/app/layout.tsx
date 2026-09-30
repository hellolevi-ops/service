import type { Metadata } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  Noto_Sans_SC,
  Noto_Serif_SC,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { UtmCapture } from "@/components/UtmCapture";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SITE } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: `${SITE.brand} · ${SITE.tagline}`,
    template: `%s · ${SITE.brand}`,
  },
  description: SITE.support,
  openGraph: {
    title: SITE.brand,
    description: SITE.tagline,
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/brand/og-share-preview.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: [{ url: "/brand/mark-on-dark.png", type: "image/png" }],
    apple: [{ url: "/brand/mark-on-dark.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      data-theme="qingteng"
      className={`${jakarta.variable} ${cormorant.variable} ${cinzel.variable} ${notoSans.variable} ${notoSerif.variable}`}
    >
      <body
        style={
          {
            ["--font-body" as string]:
              "var(--font-jakarta), var(--font-noto-sans), var(--font-body)",
            ["--font-display" as string]:
              "var(--font-cormorant), var(--font-noto-serif), var(--font-display)",
            ["--font-brand" as string]:
              "var(--font-cinzel), var(--font-noto-serif), var(--font-brand)",
          } as React.CSSProperties
        }
      >
        <OrganizationJsonLd />
        <UtmCapture />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = SITE.siteUrl.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/ops", "/account", "/login", "/api/", "/community"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

export const SITE = {
  brand: "青藤国际",
  brandEn: "Qingteng International",
  tagline: "专注全球名校高端留学申请",
  support:
    "拒绝流水线中介模板代写，由海外名校导师亲授。精准把关院校录取门槛、深度挖掘个人特色定制原创文书，网申账号密码 100% 共享自持。",
  phone: process.env.NEXT_PUBLIC_PHONE || "400-820-1926",
  wechatId: process.env.NEXT_PUBLIC_WECHAT_ID || "qingteng-edu",
  wecomQr: "/wecom-qr.svg",
  privacyVersion: process.env.PRIVACY_VERSION || "2026-09-28",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://154.94.225.204:3080",
  icpText: "北京青藤学术咨询交流有限公司 · 备案号待替换",
  complaintEmail: "supervision@qingteng.com",
  address: "北京市海淀区中关村南大街1号 · 清华科技园创新大厦B座",
} as const;

export type TrackSlug =
  | "us-ug"
  | "uk-pg"
  | "hk-sg"
  | "k12"
  | "arts"
  | "undecided";

export const TRACK_OPTIONS: { slug: TrackSlug; name: string; short: string }[] =
  [
    { slug: "us-ug", name: "美本", short: "常春藤 · Top30" },
    { slug: "uk-pg", name: "英研", short: "牛剑 · G5 · 罗素" },
    { slug: "hk-sg", name: "港新", short: "港校 · NUS · NTU" },
    { slug: "k12", name: "低龄", short: "国际高中与寄宿" },
    { slug: "arts", name: "艺术", short: "作品集与设计院校" },
    { slug: "undecided", name: "尚未确定", short: "先做方向评估" },
  ];

export function trackLabel(slug: TrackSlug | string) {
  return TRACK_OPTIONS.find((t) => t.slug === slug)?.name ?? slug;
}

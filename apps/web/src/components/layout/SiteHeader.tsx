"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { AuthNav } from "@/components/layout/AuthNav";
import { SITE } from "@/lib/site";
import {
  ChevronDown,
  Phone,
  MessageSquare,
  X,
  Check,
  Copy,
  ShieldCheck,
  Menu,
  Search,
} from "lucide-react";

export interface NavChild {
  label: string;
  href: string;
  desc?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavChild[];
}

export const HEADER_NAV: NavGroup[] = [
  {
    label: "服务",
    href: "/services",
    children: [
      {
        label: "精品定制线",
        href: "/services/premium",
        desc: "海外名校导师小班制 1v1 深度带教",
        badge: "旗舰",
      },
      {
        label: "全流程规划线",
        href: "/services/full-cycle",
        desc: "选校、文书到行前清单化透明交付",
      },
      {
        label: "服务方案对比",
        href: "/services/compare",
        desc: "看懂适合自己的规划深度与陪伴模式",
      },
      {
        label: "服务流程与透明费用",
        href: "/process-fees",
        desc: "交付节点一览 · 签约前明示另行约定事项与退费规则",
      },
    ],
  },
  {
    label: "留学方向",
    href: "/tracks",
    children: [
      {
        label: "美本精英 (US-UG)",
        href: "/tracks/us-ug",
        desc: "常春藤 · Top30 综合大学与顶尖文理学院",
      },
      {
        label: "英联邦硕博 (UK-PG)",
        href: "/tracks/uk-pg",
        desc: "牛剑 G5 · 罗素集团 List 梯队精细选校",
      },
      {
        label: "港新名校 (HK-SG)",
        href: "/tracks/hk-sg",
        desc: "港前三与新加坡双塔申请策略与轮次抢跑",
      },
      {
        label: "低龄国际教育 (K12)",
        href: "/tracks/k12",
        desc: "优质国际高中择校、海外寄宿与监护规划",
      },
      {
        label: "艺术与设计 (Arts)",
        href: "/tracks/arts",
        desc: "全球顶尖艺术殿堂与高分作品集研判",
      },
    ],
  },
  {
    label: "国家与指南",
    href: "/guides",
    children: [
      {
        label: "英国申请指南",
        href: "/countries/uk",
        desc: "大学官方 List 要求与学费预算",
      },
      {
        label: "美国申请指南",
        href: "/countries/us",
        desc: "标化考试、活动列表与文书主线",
      },
      {
        label: "中国香港 / 新加坡",
        href: "/countries/hk",
        desc: "抢位周期、跨申组合与保录真相",
      },
      {
        label: "申请政策真相中心",
        href: "/guides",
        desc: "原创实证风险预案长文与行业信息解读",
      },
      {
        label: "常见疑难问答 (FAQ)",
        href: "/guides/faq",
        desc: "关于网申自持、顾问指定与退费承诺",
      },
    ],
  },
  {
    label: "真实案例",
    href: "/cases",
  },
  {
    label: "学术顾问",
    href: "/advisors",
  },
  {
    label: "工具与实践",
    href: "/lab",
    children: [
      {
        label: "Lab 自助工具总览",
        href: "/lab",
        desc: "客观真实的自查工具，打开即用",
      },
      {
        label: "背景实力评估",
        href: "/lab/tools/assessment",
        desc: "科学测算冲刺、核心与稳健三档范围",
      },
      {
        label: "申请时间倒推器",
        href: "/lab/tools/timeline",
        desc: "倒排语言、标化备考与材料定稿关键期",
      },
      {
        label: "留学费用精算器",
        href: "/lab/tools/cost",
        desc: "大学官方学费与当地生活费透明换算",
      },
      {
        label: "最佳实践 Playbook",
        href: "/lab/playbooks",
        desc: "一线资深导师沉淀的文书与选校方法论",
      },
    ],
  },
  {
    label: "活动",
    href: "/events",
  },
  {
    label: "关于我们",
    href: "/about",
    children: [
      {
        label: "工作室理念",
        href: "/about",
        desc: "深耕垂直赛道 · 顾问负责到底",
      },
      {
        label: "主体资质与合规承诺",
        href: "/about/trust",
        desc: "真实工商主体 · 账号自持 · 72h冷静期退费",
      },
      {
        label: "联系与学术监督",
        href: "/about/contact",
        desc: "北京办公室地址与督导投诉专线",
      },
    ],
  },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [showWechatModal, setShowWechatModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close flyout when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveFlyout(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(SITE.wechatId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <header className="site-head">
        {/* 顶部细条 */}
        <div className="util-bar hidden lg:block">
          <div className="wrap util-bar__in">
            <span>青藤国际 · 专注全球名校高端留学申请</span>
            <div className="util-bar__links">
              <Link href="/events">讲座活动</Link>
              <Link href="/cases">真实案例</Link>
              <button type="button" onClick={() => setShowWechatModal(true)}>官方微信</button>
              <a href={`tel:${SITE.phone}`}>咨询热线 {SITE.phone}</a>
            </div>
          </div>
        </div>

        {/* 主行：品牌、搜索、热线、登录与预约 */}
        <div className="main-bar">
          <div className="wrap main-bar__in">
            <BrandMark variant="light" size={36} withWordmark href="/" />

            <Link href="/universities" className="search-pill hidden md:flex" aria-label="搜索院校、专业与留学问题">
              <Search aria-hidden="true" />
              <span>搜索院校、专业、留学问题</span>
            </Link>

            <div className="main-bar__right">
              <a href={`tel:${SITE.phone}`} className="hotline hidden xl:flex" title="官方咨询热线">
                <Phone aria-hidden="true" />
                <span>
                  <small>咨询热线</small>
                  <b>{SITE.phone}</b>
                </span>
              </a>
              <AuthNav />
              <Link href="/book" className="btn btn--cta btn--cta-sm">免费评估</Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg border border-[var(--line-strong)] text-[var(--ink)] hover:bg-[var(--band)] transition-colors cursor-pointer shrink-0"
                aria-label="打开菜单"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 导航条 */}
        <div className="nav-bar hidden lg:block">
          <div className="wrap">
            <nav ref={navRef} className="nav-bar__nav" aria-label="网站主导航">
              <Link href="/" className="nav-link">首页</Link>
              {HEADER_NAV.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isOpen = activeFlyout === item.label;
                return (
                  <div
                    key={item.label}
                    className="nav-item"
                    onMouseEnter={() => hasChildren && setActiveFlyout(item.label)}
                    onMouseLeave={() => setActiveFlyout(null)}
                  >
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => setActiveFlyout(isOpen ? null : item.label)}
                        className={`nav-link ${isOpen ? "is-open" : ""}`}
                        aria-expanded={isOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    ) : (
                      <Link href={item.href} className="nav-link">
                        <span>{item.label}</span>
                      </Link>
                    )}

                    {hasChildren && isOpen && (
                      <div className="absolute top-full left-0 w-72 bg-[var(--surface)] border border-[var(--line)] rounded-b-xl shadow-xl p-2 z-50">
                        <div className="space-y-0.5">
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setActiveFlyout(null)}
                              className="group block px-3 py-2 rounded-lg hover:bg-[var(--band)] transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">{child.label}</span>
                                {child.badge && (
                                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#FFF2E2] text-[#9A4A04]">{child.badge}</span>
                                )}
                              </div>
                              {child.desc && (
                                <p className="text-xs text-[var(--ink-2)] mt-0.5 line-clamp-1 leading-snug">{child.desc}</p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* 4. Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 top-18 bg-[var(--surface)] z-50 overflow-y-auto border-t border-[var(--line)] pb-24 lg:hidden">
          <div className="wrap py-4 space-y-4">
            {/* Quick Actions in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[var(--line)]">
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="btn btn--sm text-center py-2.5 text-xs font-bold"
              >
                预约免费评估
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setShowWechatModal(true);
                }}
                className="px-3 py-2 border border-[var(--line-strong)] rounded-lg text-xs font-bold text-center text-[var(--ink)] bg-[var(--band)] flex items-center justify-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>微信直接咨询</span>
              </button>
            </div>

            {/* Nav list with accordions */}
            <div className="space-y-1">
              {HEADER_NAV.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = expandedMobile === item.label;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-base font-semibold text-[var(--ink)] hover:bg-[var(--band)] rounded-lg transition-colors border-b border-[var(--line)]"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="border-b border-[var(--line)]">
                    <button
                      type="button"
                      onClick={() => setExpandedMobile(isExpanded ? null : item.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-[var(--ink)] hover:bg-[var(--band)] rounded-lg transition-colors text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--ink-2)] transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pr-2 pb-2 pt-1 space-y-1 bg-[var(--band)]/50 rounded-lg my-1">
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-xs font-bold text-[var(--brand)] hover:underline"
                        >
                          → 查看{item.label}专区首页
                        </Link>
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 py-2 text-sm text-[var(--ink)] hover:text-[var(--brand)] transition-colors"
                          >
                            <div className="font-medium">{child.label}</div>
                            {child.desc && (
                              <div className="text-xs text-[var(--ink-2)] mt-0.5 line-clamp-1">
                                {child.desc}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Auth and Contact Footer */}
            <div className="pt-4 border-t border-[var(--line)] space-y-3">
              <AuthNav mobileMenu />
              <div className="pt-2 text-xs text-[var(--ink-2)] space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[var(--ink)]">
                  <Phone className="w-3.5 h-3.5 text-[var(--brand)]" />
                  <span>咨询专线：{SITE.phone}</span>
                </div>
                <div>服务时段：周一至周日 09:00 - 21:00</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. WeChat QR & ID Modal */}
      {showWechatModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-6 sm:p-7 max-w-sm w-full shadow-2xl relative space-y-5 text-center">
            <button
              type="button"
              onClick={() => setShowWechatModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--band)] transition-colors cursor-pointer"
              aria-label="关闭弹窗"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-[var(--ink)] font-serif">
                微信 / 企微学术直联
              </h3>
              <p className="text-xs text-[var(--ink-2)] mt-1">
                资深规划导师亲自解答 · 15 分钟内快速响应
              </p>
            </div>

            <div className="w-44 h-44 mx-auto bg-white border border-[var(--line-strong)] rounded-md p-2.5 shadow-xs flex items-center justify-center relative">
              <Image
                src={SITE.wecomQr}
                unoptimized
                alt="青藤国际企业微信官方二维码"
                width={160}
                height={160}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-3">
              <div className="bg-[var(--band)] border border-[var(--line)] rounded-md p-2.5">
                <span className="text-xs text-[var(--ink-2)] block">
                  官方学术微信号：
                </span>
                <span className="text-sm font-bold font-mono text-[var(--ink)] select-all block mt-0.5">
                  {SITE.wechatId}
                </span>
              </div>

              <button
                type="button"
                onClick={copyWechat}
                className="w-full py-2.5 px-4 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white rounded-md text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>微信号已复制到剪贴板</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-white" />
                    <span>复制微信号并打开微信</span>
                  </>
                )}
              </button>

              <p className="text-xs text-[var(--ink-2)] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>支持长按识别或在微信添加好友中粘贴</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

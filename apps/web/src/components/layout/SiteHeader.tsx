"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Compass,
  DollarSign,
  FileCheck,
  GraduationCap,
  Landmark,
  ListChecks,
  Menu,
  MessageSquare,
  Phone,
  Scale,
  Users,
  X,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { WeComDock } from "@/components/domain/WeComDock";
import { AuthNav } from "@/components/layout/AuthNav";
import { BrandMark } from "@/components/brand/BrandMark";

type MegaItem = {
  href: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
};

const COUNTRY_ITEMS: MegaItem[] = [
  {
    href: "/tracks/uk-pg",
    title: "英国名校 (牛剑G5 · 罗素集团)",
    desc: "牛津、剑桥、帝国理工、UCL、爱丁堡 · 硕博第一轮次精准卡位",
    icon: GraduationCap,
  },
  {
    href: "/tracks/us-ug",
    title: "美国名校 (常春藤 · Top30)",
    desc: "哥伦比亚、康奈尔、纽大 · 本硕长线规划与学术软实力构筑",
    icon: Compass,
  },
  {
    href: "/tracks/hk-sg",
    title: "中国香港 & 新加坡公立名校",
    desc: "港大、港中文、新加坡国立NUS、南洋理工NTU · 笔面试实战",
    icon: Landmark,
  },
  {
    href: "/tracks/arts",
    title: "艺术设计与建筑空间专项",
    desc: "皇艺RCA、伦艺UAL、罗德岛RISD · 海外名校导师原创作品集指导",
    icon: BookOpen,
  },
  {
    href: "/tracks/k12",
    title: "低龄国际高中与寄宿",
    desc: "英国九大公学、美高十校联盟 · 标化提升与全家庭伴跑",
    icon: Users,
  },
  {
    href: "/universities",
    title: "全球名校库与 List 查询",
    desc: "QS 2026 排名、中国本科内部认可名单与各院系录取门槛",
    icon: Landmark,
  },
];

const SERVICE_ITEMS: MegaItem[] = [
  {
    href: "/services",
    title: "名校硕士全案申请服务",
    desc: "精准选校 + 1对1量身原创文书 + 网申全透明递交 + 签证行前",
    icon: FileCheck,
  },
  {
    href: "/services/premium",
    title: "名校本科长线早申规划",
    desc: "学术竞赛主轴、校内GPA管理、课外活动提炼与文书深度打磨",
    icon: Compass,
  },
  {
    href: "/process-fees",
    title: "透明流程与费用明细",
    desc: "从评估到获签全流程透明，正规合同保障，费用与边界书面约定",
    icon: CheckCircle2,
  },
  {
    href: "/services/compare",
    title: "青藤国际 vs 传统中介",
    desc: "拒绝模板代写，网申账号密码 100% 自主掌握",
    icon: Scale,
  },
];

const TOOL_ITEMS: MegaItem[] = [
  {
    href: "/lab/tools/assessment",
    title: "名校录取概率快速自测",
    desc: "30秒测算冲刺、核心与保底院校",
    icon: Calculator,
  },
  {
    href: "/lab/tools/cost",
    title: "留学总费用预算粗算器",
    desc: "学费、住宿与生活费总开销测算",
    icon: DollarSign,
  },
  {
    href: "/lab/tools/checklist",
    title: "申请材料核对清单",
    desc: "成绩单、推荐信、存款证明逐项核对",
    icon: ListChecks,
  },
  {
    href: "/guides",
    title: "留学避坑指南与干货",
    desc: "官方政策、名单突破与教授沟通法则",
    icon: BookOpen,
  },
];

function MegaPanel({
  title,
  items,
  onClose,
}: {
  title: string;
  items: MegaItem[];
  onClose: () => void;
}) {
  return (
    <div className="absolute top-full left-0 w-[24rem] bg-white border border-slate-200 shadow-xl rounded-xl p-3 z-50">
      <div className="px-2 py-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-2">
        {title}
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href + item.title}
              href={item.href}
              onClick={onClose}
              className="p-2.5 rounded-lg hover:bg-slate-50 transition-colors group flex items-start gap-2.5"
            >
              <div className="p-1.5 bg-slate-50 group-hover:bg-white border border-slate-200 rounded-lg shrink-0 text-blue-900">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-900 truncate block">
                  {item.title}
                </span>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [wecomOpen, setWecomOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs truncate">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 !text-slate-950" />
              2026 / 2027 全球名校高端规划通道
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline">正规合同 · 服务边界书面约定</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline">网申账号 100% 学生自持</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs shrink-0">
            <a
              href={`tel:${SITE.phone}`}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              {SITE.phone}
            </a>
            <button
              type="button"
              onClick={() => {
                track("header_wecom_click");
                setWecomOpen(true);
              }}
              className="text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              学术督导微信直联
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] flex items-center justify-between gap-4">
        <BrandMark variant="light" size={40} withWordmark />

        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-slate-700">
          <Link
            href="/"
            className={`py-2 relative ${pathname === "/" ? "text-blue-900 font-bold" : "hover:text-blue-900"}`}
          >
            首页
            {pathname === "/" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full" />
            )}
          </Link>

          <div
            className="relative py-2"
            onMouseEnter={() => setDropdown("countries")}
            onMouseLeave={() => setDropdown(null)}
          >
            <Link
              href="/tracks"
              className={`flex items-center gap-1 hover:text-blue-900 ${
                isActive("/tracks") || isActive("/universities") ? "text-blue-900 font-bold" : ""
              }`}
            >
              选校方向
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            {dropdown === "countries" && (
              <MegaPanel title="留学国家与方向" items={COUNTRY_ITEMS} onClose={() => setDropdown(null)} />
            )}
          </div>

          <div
            className="relative py-2"
            onMouseEnter={() => setDropdown("services")}
            onMouseLeave={() => setDropdown(null)}
          >
            <Link
              href="/services"
              className={`flex items-center gap-1 hover:text-blue-900 ${
                isActive("/services") || isActive("/process-fees") ? "text-blue-900 font-bold" : ""
              }`}
            >
              服务项目
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            {dropdown === "services" && (
              <MegaPanel title="服务体系" items={SERVICE_ITEMS} onClose={() => setDropdown(null)} />
            )}
          </div>

          <div
            className="relative py-2"
            onMouseEnter={() => setDropdown("tools")}
            onMouseLeave={() => setDropdown(null)}
          >
            <Link
              href="/lab"
              className={`flex items-center gap-1 hover:text-blue-900 ${
                isActive("/lab") || isActive("/guides") ? "text-blue-900 font-bold" : ""
              }`}
            >
              免费工具
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            {dropdown === "tools" && (
              <MegaPanel title="决策工具箱" items={TOOL_ITEMS} onClose={() => setDropdown(null)} />
            )}
          </div>

          <Link
            href="/cases"
            className={`hover:text-blue-900 ${isActive("/cases") ? "text-blue-900 font-bold" : ""}`}
          >
            成功案例
          </Link>
          <Link
            href="/advisors"
            className={`hover:text-blue-900 ${isActive("/advisors") ? "text-blue-900 font-bold" : ""}`}
          >
            导师团队
          </Link>
          <Link
            href="/community"
            className={`hover:text-blue-900 ${isActive("/community") ? "text-blue-900 font-bold" : ""}`}
          >
            社区
          </Link>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <AuthNav />
          <Link
            href="/book"
            onClick={() => track("header_book_click")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 !text-slate-950 rounded-xl"
          >
            免费评估
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 border border-slate-200 rounded-lg"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 text-sm">
          {[
            ["/", "首页"],
            ["/tracks", "选校方向"],
            ["/universities", "全球名校库"],
            ["/services", "服务项目"],
            ["/lab", "免费工具"],
            ["/cases", "成功案例"],
            ["/advisors", "导师团队"],
            ["/community", "社区"],
            ["/events", "活动巡展"],
            ["/book", "免费评估"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-2 border-b border-slate-100 text-slate-900 font-medium"
            >
              {label}
            </Link>
          ))}
          <AuthNav mobileMenu />
        </div>
      )}

      {wecomOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-black/40 grid place-items-end sm:place-items-center"
          onClick={() => setWecomOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white p-5 rounded-t-xl sm:rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <WeComDock placement="drawer" />
            <button
              type="button"
              className="w-full mt-3 py-2.5 text-xs font-semibold text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50"
              onClick={() => setWecomOpen(false)}
            >
              关闭
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

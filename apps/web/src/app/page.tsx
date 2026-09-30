"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE, TRACK_OPTIONS } from "@/lib/site";
import { track } from "@/lib/analytics";
import {
  SERVICE_LINES,
  VERTICAL_TRACKS,
  CASE_STUDIES,
  ADVISORS,
  PRACTICE_PLAYBOOKS,
} from "@/data/catalog";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  FileCheck2,
  FileSpreadsheet,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  Landmark,
  MessageSquare,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { AdvisorPortrait } from "@/components/home/AdvisorPortrait";
import { HeroPortal } from "@/components/portal/HeroPortal";
import { StatsBand, ToolsGrid, TracksGrid, ServicePosters, CaseCards, AdvisorGrid, EventPosters, ProcessFlow } from "@/components/portal/HomeSections";

export default function HomePage() {
  const vineRef = useRef<SVGSVGElement | null>(null);
  const [formMsg, setFormMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copiedWechat, setCopiedWechat] = useState(false);

  // Vine SVG stroke animation
  useEffect(() => {
    const el = vineRef.current;
    if (!el) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add("grow");
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      el.classList.add("grow");
    }
  }, []);

  const handleBookingSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const trackInput = form.elements.namedItem("track") as HTMLSelectElement;
    const consentInput = document.getElementById("f-consent") as HTMLInputElement;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.replace(/\D/g, "");
    const trackVal = trackInput.value;
    const consent = consentInput?.checked;

    if (!name) {
      setFormMsg({ text: "请填写姓名，方便顾问称呼您。", isError: true });
      nameInput.focus();
      return;
    }

    if (!/^1\d{10}$/.test(phone)) {
      setFormMsg({ text: "请输入 11 位有效手机号，例如 13800000000。", isError: true });
      phoneInput.focus();
      return;
    }

    if (!consent) {
      setFormMsg({ text: "请先勾选同意隐私政策，我们才能与您取得联系。", isError: true });
      return;
    }

    setSubmitting(true);
    track("home_book_submit", { track: trackVal });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile: phone,
          track: trackVal,
          formVariant: "home_consultation",
        }),
      });

      if (res.ok) {
        setFormMsg({
          text: "已收到您的初诊预约。学术顾问将在 15 分钟至 1 个工作日内与您取得联系，请留意电话或短信。",
          isError: false,
        });
        form.reset();
      } else {
        setFormMsg({
          text: "已收到您的预约申请，学术顾问将尽快通过该手机号与您取得联系。",
          isError: false,
        });
      }
    } catch {
      setFormMsg({
        text: "已收到您的预约申请，学术顾问将尽快与您取得联系。",
        isError: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(SITE.wechatId);
      setCopiedWechat(true);
      setTimeout(() => setCopiedWechat(false), 2000);
    } catch {
      setCopiedWechat(false);
    }
  };

  // Top 3 featured real case studies
  const featuredCases = CASE_STUDIES.slice(0, 3);
  // Top advisors
  const featuredAdvisors = ADVISORS.slice(0, 4);

  return (
    <main className="bg-[var(--paper)]">
      <HeroPortal />

      <StatsBand />

      <ToolsGrid />

      <TracksGrid />

      <ServicePosters />

      <CaseCards />

      <AdvisorGrid />

      <EventPosters />

      <ProcessFlow />

      <section className="sec border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-[3px] border border-amber-300 inline-block font-mono">
                权责公约
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif leading-snug">
                签约前，四项权责与边界白纸黑字入合同
              </h2>
              <p className="text-sm text-[var(--ink-2)] leading-relaxed">
                针对家庭共同决策场景，青藤国际严格执行透明化制度。让家长随时掌控资金流向、服务进度与孩子真实备战状态。
              </p>
              <div className="pt-2">
                <Link
                  href="/process-fees"
                  className="btn btn--outline text-xs font-bold inline-flex items-center gap-1"
                >
                  <span>查阅完整流程与退费条款</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Unified Contractual Charter Panel */}
            <div className="lg:col-span-7 bg-[var(--paper)] border border-amber-300/80 rounded-lg p-6 sm:p-7 shadow-xs divide-y divide-amber-200/60">
              <div className="pb-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-serif font-bold text-amber-900 text-sm">
                  I
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--ink)] font-serif">
                    费用构成清晰 · 签约前书面列支另行约定事项
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    咨询服务费一次性明确，大学网申费、考试费、使领馆签证规费等第三方费用由家庭自理并按官方标准缴纳。所有收费项目均在合同中列明，价格全程一致。
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-serif font-bold text-amber-900 text-sm">
                  II
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--ink)] font-serif">
                    专属企微工作群 · 家长双周备忘同步
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    为每个家庭建立专属服务群，阶段交付物双向签字确认；每隔两周出具书面进度纪要，家长随时可以全盘掌握节奏。
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-serif font-bold text-amber-900 text-sm">
                  III
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--ink)] font-serif">
                    72小时冷静期 · 分阶段透明清算退费
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    签约后享 72 小时全额退款保障；服务启动后按已完成交付清单核对清算，合同白纸黑字载明退费比例，条款公平透明。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
              为何大陆理性家庭选择青藤国际？
            </h2>
            <p className="text-sm text-[var(--ink-2)] mt-2">
              我们以平和笃定的节奏服务家庭，坚持如实说明录取边界，以学者共同体的实证逻辑定义高端留学服务。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Pillar 1 */}
            <div className="bg-[var(--paper)] border border-[var(--line)] border-t-2 border-t-[var(--brand)] rounded-lg p-6 space-y-3 relative hover:border-[var(--brand)] transition-colors shadow-xs">
              <div className="w-11 h-11 rounded-full border border-emerald-300/80 bg-gradient-to-b from-white to-emerald-50/80 text-emerald-800 flex items-center justify-center font-serif text-base font-bold shadow-xs ring-2 ring-emerald-950/5">
                01
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)] font-serif">
                顾问可见 · 学者亲研
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                全职核心导师均为海外名校博士及常春藤校友，年带教名额严格限制在 6–8 人，从文书立意到模拟面试全程亲自指导，案件由核心导师本人全程负责。
              </p>
              <div className="pt-2">
                <Link href="/advisors" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1">
                  <span>查阅全职顾问公开档案</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[var(--paper)] border border-[var(--line)] border-t-2 border-t-[var(--brand)] rounded-lg p-6 space-y-3 relative hover:border-[var(--brand)] transition-colors shadow-xs">
              <div className="w-11 h-11 rounded-full border border-emerald-300/80 bg-gradient-to-b from-white to-emerald-50/80 text-emerald-800 flex items-center justify-center font-serif text-base font-bold shadow-xs ring-2 ring-emerald-950/5">
                02
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)] font-serif">
                真实难点 · 详尽复盘
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                案例库均已获学生书面授权。我们在展示录取信的同时，完整披露学生原始 GPA、重修记录、先修课补强路径及逆袭策略，真实展现“双非如何攻破 G5”。
              </p>
              <div className="pt-2">
                <Link href="/cases" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1">
                  <span>查看真实申请挑战档案</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[var(--paper)] border border-[var(--line)] border-t-2 border-t-[var(--brand)] rounded-lg p-6 space-y-3 relative hover:border-[var(--brand)] transition-colors shadow-xs">
              <div className="w-11 h-11 rounded-full border border-emerald-300/80 bg-gradient-to-b from-white to-emerald-50/80 text-emerald-800 flex items-center justify-center font-serif text-base font-bold shadow-xs ring-2 ring-emerald-950/5">
                03
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)] font-serif">
                流程边界 · 72h冷静期
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                网申账号由家庭自主持有。签约前明确服务范围、阶段交付物与第三方另行约定事项；签署教育部规范合同，享有 72 小时全额退款冷静期，条款公平透明。
              </p>
              <div className="pt-2">
                <Link href="/process-fees" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1">
                  <span>了解流程与退费承诺</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec bg-[var(--deep)] text-white py-14 sm:py-20" id="book">
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-[3px] inline-block mb-3 font-mono">
                1对1 学术背景免费初诊
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight">
                先聊 30 分钟，
                <br />
                再由你决定是否下一步合作
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/75 mt-3 leading-relaxed">
                留下学术背景与联系方式，专业对口的学者顾问将在 15 分钟至 1 个工作日内与您取得联系。合作决定权完全在您。
              </p>
            </div>

            {/* WeChat Connect Card in Hero */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-5 flex items-center gap-5">
              <div className="w-24 h-24 bg-white rounded-md p-1.5 shrink-0 shadow-md">
                <Image
                  src={SITE.wecomQr}
                  unoptimized
                  alt="青藤国际企业微信官方二维码"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-2 min-w-0">
                <div>
                  <h4 className="text-sm font-bold text-white">微信 / 企微学术直联</h4>
                  <p className="text-xs text-emerald-200/70 mt-0.5">
                    工作时段 15 分钟内快速响应 · 顾问亲自接待
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-emerald-900/80 px-2 py-1 rounded-[3px] text-emerald-200 select-all border border-emerald-800">
                    {SITE.wechatId}
                  </span>
                  <button
                    type="button"
                    onClick={copyWechat}
                    className="px-2.5 py-1 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white rounded-md text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedWechat ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedWechat ? "已复制" : "复制"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xs text-emerald-300/60 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>严守《个人信息保护法》，您的电话仅用于本次预约沟通，由我们全程保密</span>
            </div>
          </div>

          {/* Booking Form Panel */}
          <div className="lg:col-span-6 bg-white text-[var(--ink)] rounded-xl p-6 sm:p-8 shadow-xl border border-slate-200">
            <h3 className="text-xl font-bold font-serif mb-1">
              预约 30 分钟免费深度初诊
            </h3>
            <p className="text-xs text-[var(--ink-2)] mb-5">
              请填写学术基本信息，我们将安排对应专业背景的导师为您出具定位备忘
            </p>

            <form onSubmit={handleBookingSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="f-name" className="block text-xs font-bold text-slate-700 mb-1">
                  您的姓名 / 称呼 *
                </label>
                <input
                  id="f-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="例如：张同学 / 李女士"
                  required
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label htmlFor="f-phone" className="block text-xs font-bold text-slate-700 mb-1">
                  手机号码 * (用于顾问与您取得初诊联系)
                </label>
                <input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={11}
                  placeholder="11 位有效手机号码"
                  required
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                />
              </div>

              <div>
                <label htmlFor="f-track" className="block text-xs font-bold text-slate-700 mb-1">
                  意向升学方向 *
                </label>
                <select
                  id="f-track"
                  name="track"
                  defaultValue="uk-pg"
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                >
                  <option value="us-ug">美本常春藤与 Top 30 战略研判</option>
                  <option value="uk-pg">英国 G5 与罗素集团研博深耕</option>
                  <option value="hk-sg">中国香港与新加坡顶尖公立</option>
                  <option value="k12">低龄国际高中与成长型寄宿教育</option>
                  <option value="arts">跨学科设计、建筑与前沿艺术</option>
                  <option value="undecided">方向待定，先听专家综合建议</option>
                </select>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    id="f-consent"
                    defaultChecked
                    className="mt-0.5 rounded-[2px] border-slate-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>
                    我已阅读并同意
                    <Link href="/privacy" className="text-emerald-700 underline mx-0.5" target="_blank">
                      《隐私权政策》
                    </Link>
                    ，同意青藤国际学术顾问就本次初诊与我联系。
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-bold text-sm rounded-md transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                {submitting ? "正在为您安排导师..." : "提交并预约免费学术初诊"}
              </button>

              {formMsg && (
                <div
                  className={`p-3 rounded-md text-xs leading-relaxed ${
                    formMsg.isError
                      ? "bg-rose-50 text-rose-800 border border-rose-200"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}
                  role="status"
                >
                  {formMsg.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

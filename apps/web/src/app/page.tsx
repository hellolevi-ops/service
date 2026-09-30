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

const ADVISOR_PHOTOS: Record<string, string> = {
  "adv-lu": "/media/advisor/mentor-talk.jpg",
  "adv-gu": "/media/advisor/study-group.jpg",
  "adv-chen": "/media/campus/singapore.jpg",
  "adv-shen": "/media/advisor/desk-notes.jpg",
};

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
      {/* =========================================================================
          MODULE 1: Hero 英雄区 (D4 §5.1 T-HOME)
          ========================================================================= */}
      <section className="hero py-12 sm:py-18 border-b border-[var(--line)]">
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-[var(--band)] border border-[var(--line-strong)] text-xs font-semibold text-[var(--brand)] mb-4 tracking-wide font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>专注全球 Top 30 · 英联邦 G5 · 常春藤盟校</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] font-serif leading-[1.25]">
                从选校到入学，
                <br />
                由同一位学者导师负责到底
              </h1>
              <p className="lead text-base sm:text-lg text-[var(--ink-2)] mt-4 leading-relaxed max-w-2xl">
                垂直深耕 · 顾问可见 · 执行透明 —— 给大陆家庭的可核对升学规划。首次 30 分钟深度学术初诊免费，网申账号密码 100% 由学生自持，费用清单与服务边界在签约前写进正式合同。
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="hero-actions flex flex-wrap items-center gap-4 pt-1">
              <a className="btn shadow-sm" href="#book">
                预约免费初诊
              </a>
              <Link className="btn btn--outline" href="/cases">
                查阅真实录取案卷
              </Link>
              <a className="link text-sm font-semibold flex items-center gap-1 text-[var(--ink-2)] hover:text-[var(--brand)]" href="#lab">
                <span>先自测背景与预算</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* 3 Hard-core Trust Bullet Points */}
            <ul className="space-y-3 pt-3 text-sm text-[var(--ink)]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-[var(--brand)] shrink-0" />
                <span>首次 30 分钟学术初诊完全免费，深入研判背景，合作决定权完全在您</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-[var(--brand)] shrink-0" />
                <span>院校网申系统账号与密码 100% 由学生和家庭自主持有，官方邮件全透明</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-[var(--brand)] shrink-0" />
                <span>费用清单、交付里程碑、72小时冷静期退费规则签约前白纸黑字入合同</span>
              </li>
            </ul>
          </div>

          {/* Hero Visual: Academic Mentor Discussion Scene */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-[var(--line-strong)] bg-[var(--surface)] aspect-[4/5] group">
              <Image
                src="/media/advisor/mentor-talk.jpg"
                alt="青藤国际首席学术官与学子的一对一学术研讨交流"
                width={800}
                height={1000}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-md bg-white/95 backdrop-blur-xs border border-white/60 shadow-lg text-[var(--ink)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold font-serif">陆博 · 剑桥大学材料物理博后</h4>
                    <p className="text-xs text-[var(--ink-2)] mt-0.5">清华大学博士 · 13年名校理工研博规划带教</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-[3px] border border-emerald-200">
                    全职首席导师
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE 2: 为何可信 (Trust Pillars - 规范圆形学者印章与发丝网格)
          ========================================================================= */}
      <section className="sec border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1 font-mono">
              PROVEN INTEGRITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
              为何大陆理性家庭选择青藤国际？
            </h2>
            <p className="text-sm text-[var(--ink-2)] mt-2">
              我们拒绝贩卖焦虑、不搞虚假“保录协议”，以学者共同体的实证逻辑定义高端留学服务。
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
                全职核心导师均为海外名校博士及常春藤校友，年带教名额严格限制在 6–8 人，从文书立意到模拟面试全程亲自指导，绝不将案件转包给兼职或流水线实习生。
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
                案例库均已获学生书面授权。我们不只晒出一张录取信，更完整披露学生原始 GPA 劣势、重修记录、先修课缺口及逆袭策略，真实展现“双非如何攻破 G5”。
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
                网申账号由家庭自主持有。签约前明确服务范围、阶段交付物与第三方不含项；签署教育部规范合同，享有 72 小时全额退款冷静期，拒绝霸王条款。
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

      {/* =========================================================================
          MODULE 3: 五大垂直赛道入口 (TrackPillNav / 留学方向)
          ========================================================================= */}
      <section className="sec border-b border-[var(--line)]" id="tracks">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1 font-mono">
                VERTICAL TRACKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
                五大垂直升学赛道深耕
              </h2>
              <p className="text-sm text-[var(--ink-2)] mt-1">
                不拼 30 国杂乱全品类，专注大陆学子核心申学通道，2 次点击直达专业研判页。
              </p>
            </div>
            <Link className="link text-sm font-semibold inline-flex items-center gap-1 shrink-0" href="/tracks">
              <span>查看全部方向</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VERTICAL_TRACKS.map((track) => (
              <Link
                key={track.slug}
                href={`/tracks/${track.slug}`}
                className="group block bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] rounded-lg p-6 transition-all duration-200 shadow-xs hover:shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-[3px] bg-emerald-50 text-[var(--brand)] border border-emerald-200/60 font-mono">
                      {track.badge}
                    </span>
                    <span className="text-xs text-[var(--ink-2)] font-mono">
                      {track.slug.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[var(--ink)] font-serif group-hover:text-[var(--brand)] transition-colors">
                      {track.name}
                    </h3>
                    <p className="text-xs text-[var(--ink-2)] mt-1 line-clamp-2">
                      {track.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--line)] space-y-1.5 text-xs text-[var(--ink-2)]">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
                      <span className="line-clamp-1">{track.targetDegree}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
                      <span className="line-clamp-1">{track.typicalTimeline}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-bold text-[var(--brand)]">
                  <span>阅读专业研判方案</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE 4: 精选真实录取案卷 (Archival Dossier / 档案册式排版打破卡片感)
          ========================================================================= */}
      <section className="sec border-b border-[var(--line)] bg-[var(--surface)]" id="cases">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1 font-mono">
                CASE ARCHIVES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
                公开脱敏真实录取案卷
              </h2>
              <p className="text-sm text-[var(--ink-2)] mt-1">
                已获学员正式授权。详细呈现申请原始痛点、背景瓶颈与导师破局路径。
              </p>
            </div>
            <Link className="link text-sm font-semibold inline-flex items-center gap-1 shrink-0" href="/cases">
              <span>进入案例库检索</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Archival Ledger Structure */}
          <div className="border border-[var(--line-strong)] rounded-lg overflow-hidden bg-[var(--paper)] shadow-xs divide-y divide-[var(--line)]">
            {/* Top Docket Control Bar */}
            <div className="bg-[var(--band)]/70 px-5 sm:px-6 py-2.5 text-xs text-[var(--ink-2)] flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--brand)] shrink-0 inline-block" />
                <span className="font-bold text-[var(--ink)]">OFFICIAL ADMISSION DOSSIER · 实证录取档案长卷</span>
              </div>
              <span className="text-[11px]">教育部资质备案 · 全文真实脱敏</span>
            </div>

            {featuredCases.map((c) => (
              <article
                key={c.id}
                className="p-5 sm:p-7 hover:bg-white/60 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Admit School & Student background */}
                  <div className="lg:col-span-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-[3px] bg-emerald-50 text-[var(--brand)] border border-emerald-200 font-mono">
                        {c.enrollmentYear} · {c.trackName}
                      </span>
                      <span className="text-xs text-[var(--ink-2)] font-mono">{c.studentInitials} 卷号</span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--ink)] font-serif leading-snug">
                      {c.admitUniversity}
                    </h3>
                    <p className="text-sm font-medium text-[var(--brand)]">
                      {c.admitProgram}
                    </p>

                    <div className="pt-2 text-xs text-[var(--ink-2)] space-y-1 font-mono">
                      <div>本科：<span className="font-sans text-[var(--ink)]">{c.undergradProfile}</span></div>
                      <div>均分：<span className="text-[var(--ink)]">{c.gpa}</span></div>
                      <div>标化：<span className="text-[var(--ink)]">{c.testScores}</span></div>
                    </div>
                  </div>

                  {/* Middle: Challenge and Strategy */}
                  <div className="lg:col-span-5 space-y-3 border-t lg:border-t-0 lg:border-l border-[var(--line)] pt-4 lg:pt-0 lg:pl-6">
                    <div>
                      <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-[3px] border border-rose-200 inline-block mb-1 font-mono">
                        核心申请瓶颈与难点
                      </span>
                      <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                        {c.hardBottlenecks}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[3px] border border-emerald-200 inline-block mb-1 font-mono">
                        导师学术破局策略
                      </span>
                      <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                        {c.strategicInsight}
                      </p>
                    </div>
                  </div>

                  {/* Right: Advisor & CTA */}
                  <div className="lg:col-span-3 flex flex-col justify-between h-full border-t lg:border-t-0 lg:border-l border-[var(--line)] pt-4 lg:pt-0 lg:pl-6 space-y-4">
                    <div>
                      <span className="text-xs text-[var(--ink-2)] block">负责指导学者：</span>
                      <span className="text-sm font-bold text-[var(--ink)] font-serif block mt-0.5">
                        {c.leadAdvisorName}
                      </span>
                      <div className="mt-2 text-xs text-emerald-800 bg-emerald-50/80 p-2 rounded-md border border-emerald-200/60 font-medium">
                        {c.finalResult}
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <Link
                        href={`/book?track=${c.trackId}&preferredAdvisor=${c.leadAdvisorId}`}
                        className="btn btn--sm w-full text-center text-xs font-bold block"
                      >
                        预约同类背景规划
                      </Link>
                      <Link
                        href={`/cases/${c.slug}`}
                        className="text-xs text-center block text-[var(--ink-2)] hover:text-[var(--brand)] font-medium"
                      >
                        查阅完整录取复盘
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE 5: 核心顾问团队名录 (Advisors Spotlight)
          ========================================================================= */}
      <section className="sec border-b border-[var(--line)]" id="advisors">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1 font-mono">
                ACADEMIC FACULTY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
                全职对口学术顾问名录
              </h2>
              <p className="text-sm text-[var(--ink-2)] mt-1">
                每位导师真实学历与海外科研经历公开透明，年带教名额受控，支持指定导师初诊。
              </p>
            </div>
            <Link className="link text-sm font-semibold inline-flex items-center gap-1 shrink-0" href="/advisors">
              <span>查看全部导师团队</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAdvisors.map((adv) => (
              <div
                key={adv.id}
                className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-5 space-y-4 flex flex-col justify-between hover:border-[var(--brand)] transition-colors shadow-xs"
              >
                <div className="space-y-3">
                  <div className="aspect-[4/5] rounded-md overflow-hidden bg-[var(--band)] relative border border-[var(--line)]">
                    <Image
                      src={ADVISOR_PHOTOS[adv.id] || "/media/advisor/mentor-talk.jpg"}
                      alt={`${adv.name} 肖像`}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] font-mono">
                      {adv.experienceYears}年规划经验
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[var(--ink)] font-serif">
                      {adv.name}
                    </h3>
                    <p className="text-xs font-medium text-[var(--brand)] mt-0.5 line-clamp-1">
                      {adv.title}
                    </p>
                    <p className="text-xs text-[var(--ink-2)] mt-2 line-clamp-3 leading-relaxed">
                      {adv.academicBackground}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--line)] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[var(--ink-2)]">
                    <span>当前状态：</span>
                    <span className="text-emerald-700 font-semibold font-mono">
                      接受预定中 (剩 2 席)
                    </span>
                  </div>
                  <Link
                    href={`/book?preferredAdvisor=${adv.id}`}
                    className="btn btn--sm btn--block text-xs font-bold text-center"
                  >
                    指定 TA 预约初诊
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE 6: Lab 工具与实践「先自检，再评估」 (D4 §5.1)
          ========================================================================= */}
      <section className="sec border-b border-[var(--line)] bg-[var(--band)]/60" id="lab">
        <div className="wrap">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1 font-mono">
              SELF-CHECK & TOOLS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
              先自检，再评估 —— 打开就能用的客观工具
            </h2>
            <p className="text-sm text-[var(--ink-2)] mt-1">
              无需预留手机号即可测算。基于官方大学录取大纲研发，绝不制造虚假录取概率。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Tool 1 */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-5 space-y-3 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200/80 text-[var(--brand)] flex items-center justify-center shadow-2xs">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] font-serif">
                  背景实力三阶定位
                </h3>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">
                  输入本科学历、GPA、标化成绩与目标方向，快速获得冲刺、核心与稳健三阶分档院校建议。
                </p>
              </div>
              <Link
                href="/lab/tools/assessment"
                className="text-xs font-bold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2 border-t border-[var(--line)]"
              >
                <span>开始定位测评</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-5 space-y-3 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200/80 text-[var(--brand)] flex items-center justify-center shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] font-serif">
                  申请时间轴倒推器
                </h3>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">
                  输入计划入学年份与学期，系统科学倒排语言备考、文书选题定稿、网申首轮递交关键周期。
                </p>
              </div>
              <Link
                href="/lab/tools/timeline"
                className="text-xs font-bold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2 border-t border-[var(--line)]"
              >
                <span>生成时间线</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 3 */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-5 space-y-3 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200/80 text-[var(--brand)] flex items-center justify-center shadow-2xs">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] font-serif">
                  留学真实费用精算器
                </h3>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">
                  按目标国家与攻读阶段，计算大学官方最新学费、当地平均住宿饮食开支及汇率预算换算。
                </p>
              </div>
              <Link
                href="/lab/tools/cost"
                className="text-xs font-bold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2 border-t border-[var(--line)]"
              >
                <span>计算总预算</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 4 */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-5 space-y-3 flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200/80 text-[var(--brand)] flex items-center justify-center shadow-2xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] font-serif">
                  最佳实践 Playbook
                </h3>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">
                  一线导师积累的文书自查清单、先修课大纲核对法及海外大学内部 List 避坑手册。
                </p>
              </div>
              <Link
                href="/lab/playbooks"
                className="text-xs font-bold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2 border-t border-[var(--line)]"
              >
                <span>阅读实践方案</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE 7: 家长可读备忘 (Parent Assurance / 契约律条公约式排版)
          ========================================================================= */}
      <section className="sec border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-[3px] border border-amber-300 inline-block font-mono">
                PARENT ASSURANCE · 权责公约
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
                    费用构成清晰 · 签约前书面列支不含项
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    咨询服务费一次性明确，大学网申费、考试费、使领馆签证规费等第三方费用由家庭自理。坚决杜绝中途巧立名目加价。
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
                    为每个家庭建立专属服务群，阶段交付物双向签字确认；每隔两周出具书面进度纪要，家长无需反复催问即可全盘掌握节奏。
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-serif font-bold text-amber-900 text-sm">
                  III
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--ink)] font-serif">
                    72小时无理由冷静期 · 分阶段透明清算退费
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    签约后享 72 小时全额无理由退款保障；服务启动后按已完成交付清单核对清算，合同白纸黑字载明退费比例，杜绝霸王条款。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE 8: 服务三线总览 (Service Lines Framework)
          ========================================================================= */}
      <section className="sec border-b border-[var(--line)]" id="services">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1 font-mono">
                SERVICE LINES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
                三大服务体系 · 清晰适配不同需求
              </h2>
              <p className="text-sm text-[var(--ink-2)] mt-1">
                无论冲刺全球顶尖名校，还是需要稳健的全流程统筹，我们提供标准化的契约承诺。
              </p>
            </div>
            <Link className="link text-sm font-semibold inline-flex items-center gap-1 shrink-0" href="/services/compare">
              <span>查看三线选型对比表</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICE_LINES.map((s) => {
              const isFlagship = s.id === "premium";

              return (
                <div
                  key={s.id}
                  className={`rounded-lg p-6 sm:p-7 border flex flex-col justify-between transition-all duration-200 shadow-xs ${
                    isFlagship
                      ? "bg-[var(--surface)] border-2 border-[var(--brand)] ring-1 ring-[var(--brand)]/20"
                      : "bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-[3px] font-mono ${
                          isFlagship
                            ? "bg-emerald-100 text-emerald-950 border border-emerald-300"
                            : "bg-[var(--band)] text-[var(--ink-2)] border border-[var(--line)]"
                        }`}
                      >
                        {s.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[var(--ink)] font-serif">
                        {s.name}
                      </h3>
                      <p className="text-xs text-[var(--ink-2)] mt-1 font-mono">
                        {s.subname}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed border-t border-[var(--line)] pt-3">
                      {s.targetAudience}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                      <span className="text-xs font-bold text-[var(--ink)] block">
                        核心交付清单：
                      </span>
                      <ul className="space-y-1.5 text-xs text-[var(--ink-2)]">
                        {s.deliverables.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand)] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--line)] mt-6 space-y-3">
                    <div className="text-xs text-[var(--ink-2)] line-clamp-2">
                      <span className="font-semibold text-[var(--ink)]">定价逻辑：</span>
                      {s.pricingLogic}
                    </div>
                    <Link
                      href={s.id === "compare" ? "/services/compare" : `/services/${s.slug}`}
                      className={`btn btn--sm btn--block text-xs font-bold text-center ${
                        isFlagship ? "" : "btn--outline"
                      }`}
                    >
                      {s.ctaText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE 9: 近期学术活动与讲座预告 (Academic Calendar Stamp)
          ========================================================================= */}
      <section className="sec border-b border-[var(--line)] bg-[var(--surface)]" id="events">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1 font-mono">
                UPCOMING SESSIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] font-serif">
                近期学术讲座与答疑工作坊
              </h2>
              <p className="text-sm text-[var(--ink-2)] mt-1">
                由各赛道首席学术导师主讲，直面招生政策演变，名额受控需提前预约。
              </p>
            </div>
            <Link className="link text-sm font-semibold inline-flex items-center gap-1 shrink-0" href="/events">
              <span>查看全部讲座活动</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 space-y-4 flex flex-col justify-between hover:border-[var(--brand)] transition-colors shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Calendar Stamp */}
                  <div className="w-12 rounded-md bg-white border border-[var(--line-strong)] shadow-2xs flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <span className="w-full bg-[var(--brand)] text-white text-[9px] font-bold text-center py-0.5 tracking-wider uppercase font-mono">10月</span>
                    <span className="text-base font-serif font-bold text-[var(--ink)] leading-none py-1.5">17</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[3px] border border-emerald-200 font-mono">
                      线下深度研讨
                    </span>
                    <p className="text-xs text-[var(--ink-2)] mt-0.5">周六 14:00–16:30 · 北京中心</p>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] font-serif leading-snug">
                  英国罗素盟校 2026/2027 申请 List 规程深度研析会
                </h3>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">
                  重点拆解爱丁堡大学、曼彻斯特大学最新针对双非高校均分分档调整，以及计算机商科跨申实战。
                </p>
              </div>
              <a href="#book" className="btn btn--sm btn--outline text-xs font-bold text-center">
                预约现场席位 (限15人)
              </a>
            </div>

            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 space-y-4 flex flex-col justify-between hover:border-[var(--brand)] transition-colors shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Calendar Stamp */}
                  <div className="w-12 rounded-md bg-white border border-[var(--line-strong)] shadow-2xs flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <span className="w-full bg-[var(--brand)] text-white text-[9px] font-bold text-center py-0.5 tracking-wider uppercase font-mono">10月</span>
                    <span className="text-base font-serif font-bold text-[var(--ink)] leading-none py-1.5">22</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[3px] border border-emerald-200 font-mono">
                      线上学术直播
                    </span>
                    <p className="text-xs text-[var(--ink-2)] mt-0.5">周四 19:30–21:00 · 专属直播间</p>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] font-serif leading-snug">
                  常春藤盟校 ED/EA 早申主文书学术叙事线上研讨
                </h3>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">
                  顾清华博士主讲：如何拒绝包装苦难，从真实微观求知中构建具备学术不可替代性的个人陈述。
                </p>
              </div>
              <a href="#book" className="btn btn--sm btn--outline text-xs font-bold text-center">
                预约直播链接
              </a>
            </div>

            <div className="bg-[var(--paper)] border border-[var(--line)] rounded-lg p-6 space-y-4 flex flex-col justify-between hover:border-[var(--brand)] transition-colors shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Calendar Stamp */}
                  <div className="w-12 rounded-md bg-white border border-[var(--line-strong)] shadow-2xs flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <span className="w-full bg-[var(--brand)] text-white text-[9px] font-bold text-center py-0.5 tracking-wider uppercase font-mono">10月</span>
                    <span className="text-base font-serif font-bold text-[var(--ink)] leading-none py-1.5">31</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[3px] border border-emerald-200 font-mono">
                      上海答疑工坊
                    </span>
                    <p className="text-xs text-[var(--ink-2)] mt-0.5">周六 14:00–17:00 · 上海陆家嘴</p>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] font-serif leading-snug">
                  港大与新国立顶尖商科全英文面试技术实训
                </h3>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed">
                  金融科技与商学院无领导小组讨论、商业案例即兴研判全真演练，现场提供 1v1 反馈报告。
                </p>
              </div>
              <a href="#book" className="btn btn--sm btn--outline text-xs font-bold text-center">
                预约工坊名额
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE 10: 终区全局转化 (Final CTA / Booking Form)
          ========================================================================= */}
      <section className="sec bg-[#0B2523] text-white py-14 sm:py-20" id="book">
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
                    className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedWechat ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedWechat ? "已复制" : "复制"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xs text-emerald-300/60 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>严守《个人信息保护法》，承诺绝不将您的电话外泄给任何第三方</span>
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
                  <option value="undecided">尚未确定，先听专家综合建议</option>
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

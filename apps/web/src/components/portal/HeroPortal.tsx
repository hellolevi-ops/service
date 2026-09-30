"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, GraduationCap, PenLine, type LucideIcon } from "lucide-react";
import { LeadForm } from "@/components/domain/LeadForm";
import { NEWS_ARTICLES } from "@/data/portalData";
import { Flag, HeroArt, IconTile, type FlagCode } from "@/components/portal/PortalArt";

type Slide = {
  id: "diagnosis" | "uk" | "ivy";
  label: string;
  title: [string, string];
  sub: string;
  cta: string;
  href: string;
  chip: string;
};

const SLIDES: Slide[] = [
  {
    id: "diagnosis",
    label: "免费学术初诊",
    title: ["30 分钟", "免费学术初诊"],
    sub: "看清背景、目标与时间线，再决定是否合作",
    cta: "预约免费初诊",
    href: "/book",
    chip: "首次初诊免费",
  },
  {
    id: "uk",
    label: "英国 List 研析会",
    title: ["英国罗素盟校", "申请 List 研析会"],
    sub: "10 月 17 日 周六 14:00 · 北京中心 · 限 15 人",
    cta: "预约现场席位",
    href: "/events",
    chip: "线下深度研讨",
  },
  {
    id: "ivy",
    label: "常春藤早申研讨",
    title: ["常春藤盟校 ED/EA", "早申主文书研讨"],
    sub: "10 月 22 日 周四 19:30 · 线上直播",
    cta: "预约直播链接",
    href: "/events",
    chip: "线上学术研讨",
  },
];

type Category = { name: string; sub: string; href: string; flag?: FlagCode; icon?: LucideIcon };

const CATEGORIES: Category[] = [
  { flag: "us", name: "美国", sub: "本科 · 常春藤 · Top 30", href: "/countries/us" },
  { flag: "uk", name: "英国", sub: "研究生 · 牛剑 · G5 · 罗素", href: "/countries/uk" },
  { flag: "hk", name: "中国香港", sub: "港三 · 授课型硕士", href: "/countries/hk" },
  { flag: "sg", name: "新加坡", sub: "NUS · NTU", href: "/countries/sg" },
  { icon: GraduationCap, name: "低龄国际高中", sub: "寄宿与衔接课程", href: "/tracks/k12" },
  { icon: PenLine, name: "艺术与作品集", sub: "设计 · 建筑 · 美术", href: "/tracks/arts" },
];

export function HeroPortal() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 6500);
    return () => window.clearInterval(t);
  }, [paused]);

  const news = NEWS_ARTICLES.slice(0, 3);
  const slide = SLIDES[active];

  return (
    <section className="portal-hero" aria-label="首页主视觉">
      <div className="wrap portal-hero__grid">
        {/* 左：留学方向导航 */}
        <nav className="cat-panel" aria-label="按方向了解">
          <p className="cat-panel__head">留学方向</p>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.name}>
                <Link href={c.href} className="cat-item">
                  {c.flag ? <Flag code={c.flag} size={30} /> : <IconTile icon={c.icon!} tone="teal" size={30} />}
                  <span className="cat-item__text">
                    <b>{c.name}</b>
                    <small>{c.sub}</small>
                  </span>
                  <ChevronRight className="cat-item__chev" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/lab/tools/assessment" className="cat-panel__foot">
            方向待定？先做免费评估
          </Link>
        </nav>

        {/* 中：轮播与推荐 */}
        <div className="portal-hero__main">
          <div
            className="banner"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="banner__stage" data-slide={slide.id}>
              <div className="banner__copy" key={slide.id}>
                <span className="banner__chip">{slide.chip}</span>
                <h1 className="banner__title" aria-label={slide.title.join("")}>
                  {slide.title[0]}
                  <br />
                  {slide.title[1]}
                </h1>
                <p className="banner__sub">{slide.sub}</p>
                <Link href={slide.href} className="btn btn--cta">
                  {slide.cta}
                </Link>
              </div>
              <div className="banner__art">
                <HeroArt variant={slide.id} />
              </div>
            </div>
            <div className="banner__tabs" role="tablist" aria-label="切换主视觉">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={i === active ? "is-active" : ""}
                  onClick={() => setActive(i)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="portal-hero__strip">
            <div className="rec-box">
              <span className="rec-box__label">
                今日
                <br />
                推荐
              </span>
              <ul>
                {news.map((n) => (
                  <li key={n.id}>
                    <Link href="/guides">{n.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="promise-box">
              <p>签约后全额退费冷静期</p>
              <b>
                72<small>小时</small>
              </b>
            </div>
          </div>
        </div>

        {/* 右：预约表单 */}
        <aside className="portal-form" aria-label="免费学术初诊预约">
          <div className="portal-form__head">
            <b>免费学术初诊评估</b>
            <span>导师 15 分钟内答复</span>
          </div>
          <LeadForm variant="short" submitLabel="免费预约初诊" />
        </aside>
      </div>
    </section>
  );
}

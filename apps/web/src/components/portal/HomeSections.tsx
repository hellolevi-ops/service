import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Calculator,
  CalendarClock,
  Check,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  MessagesSquare,
  PenLine,
  Target,
  Compass,
  FileCheck2,
  PlaneTakeoff,
} from "lucide-react";
import { ADVISORS, CASE_STUDIES, SERVICE_LINES, VERTICAL_TRACKS } from "@/data/catalog";
import { AdvisorPortrait } from "@/components/home/AdvisorPortrait";
import { TRACK_OPTIONS } from "@/lib/site";
import { Flag, IconTile, Poster, type FlagCode, type PosterTone, type TileTone } from "@/components/portal/PortalArt";

function SectionHead({ title, desc, href, more }: { title: string; desc?: string; href?: string; more?: string }) {
  return (
    <div className="sec-head">
      <div>
        <h2>{title}</h2>
        {desc ? <p>{desc}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="more-link">
          {more ?? "查看全部"}
          <ChevronRight aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

/* 数据条：均为站内已公开的服务承诺 */
export function StatsBand() {
  const items = [
    { n: "0", u: "元", t: "首次 30 分钟学术初诊" },
    { n: "6–8", u: "人", t: "每位导师年带教名额上限" },
    { n: "72", u: "小时", t: "签约后全额退费冷静期" },
    { n: "100", u: "%", t: "网申账号由学生自主持有" },
    { n: String(VERTICAL_TRACKS.length), u: "大", t: "垂直升学赛道深耕" },
  ];
  return (
    <section className="stats-band" aria-label="服务承诺">
      <div className="wrap">
        <ul className="stats-band__grid">
          {items.map((i) => (
            <li key={i.t}>
              <b>
                {i.n}
                <small>{i.u}</small>
              </b>
              <span>{i.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 留学小工具 */
const TOOLS: { name: string; href: string; icon: typeof Target; tone: TileTone }[] = [
  { name: "背景定位测评", href: "/lab/tools/assessment", icon: Target, tone: "violet" },
  { name: "留学费用计算", href: "/lab/tools/cost", icon: Calculator, tone: "amber" },
  { name: "申请时间线", href: "/lab/tools/timeline", icon: CalendarClock, tone: "sky" },
  { name: "材料清单", href: "/lab/tools/checklist", icon: ClipboardCheck, tone: "teal" },
  { name: "实践 Playbook", href: "/lab", icon: BookOpen, tone: "coral" },
  { name: "院校库", href: "/universities", icon: BarChart3, tone: "sky" },
  { name: "真实录取案例", href: "/cases", icon: PenLine, tone: "amber" },
  { name: "常见问题", href: "/guides/faq", icon: MessagesSquare, tone: "teal" },
];

export function ToolsGrid() {
  return (
    <section className="sec sec--plain" id="lab">
      <div className="wrap">
        <SectionHead title="留学小工具" desc="打开就能用，手机号可选填。结果基于院校官方信息，仅供参考。" href="/lab" more="全部工具" />
        <ul className="tools-grid">
          {TOOLS.map((t) => (
            <li key={t.name}>
              <Link href={t.href}>
                <IconTile icon={t.icon} tone={t.tone} size={64} />
                <span>{t.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 热门方向 */
const TRACK_STYLE: Record<string, { tone: PosterTone; flags?: FlagCode[]; icon?: typeof Target }> = {
  "us-ug": { tone: "sky", flags: ["us"] },
  "uk-pg": { tone: "deep", flags: ["uk"] },
  "hk-sg": { tone: "teal", flags: ["hk", "sg"] },
  k12: { tone: "amber", icon: GraduationCap },
  arts: { tone: "sky", icon: PenLine },
};

export function TracksGrid() {
  return (
    <section className="sec sec--band" id="tracks">
      <div className="wrap">
        <SectionHead title="热门留学方向" desc="专注大陆学子核心申学通道，两次点击直达专业研判页。" href="/tracks" more="全部方向" />
        <ul className="track-grid">
          {VERTICAL_TRACKS.map((t) => {
            const opt = TRACK_OPTIONS.find((o) => o.slug === t.slug);
            const st = TRACK_STYLE[t.slug] ?? { tone: "teal" as PosterTone };
            return (
              <li key={t.id}>
                <Link href={`/tracks/${t.slug}`} className="track-card">
                  <Poster tone={st.tone} className="track-card__poster">
                    <div className="track-card__poster-in">
                      <div className="track-card__flags">
                        {st.flags?.map((f) => <Flag key={f} code={f} size={30} />)}
                        {st.icon ? <IconTile icon={st.icon} tone="teal" size={30} /> : null}
                      </div>
                      <b>{opt?.name ?? t.name}</b>
                      <span>{opt?.short}</span>
                    </div>
                  </Poster>
                  <div className="track-card__body">
                    <h3>{t.name}</h3>
                    <p>{t.typicalTimeline}</p>
                    <span className="track-card__go">
                      阅读研判方案
                      <ChevronRight aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* 服务体系 */
const LINE_TONE: PosterTone[] = ["deep", "teal", "sky"];

export function ServicePosters() {
  return (
    <section className="sec sec--plain" id="services">
      <div className="wrap">
        <SectionHead title="优选服务方案" desc="无论冲刺全球顶尖名校，还是需要稳健的全流程统筹，都有标准化的契约承诺。" href="/services/compare" more="三线选型对比" />
        <ul className="svc-grid">
          {SERVICE_LINES.map((s, i) => (
            <li key={s.id}>
              <article className="svc-card">
                <Poster tone={LINE_TONE[i % LINE_TONE.length]} className="svc-card__poster">
                  <div className="svc-card__poster-in">
                    <span className="svc-card__badge">{s.badge}</span>
                    <h3>{s.name}</h3>
                  </div>
                </Poster>
                <div className="svc-card__body">
                  <p className="svc-card__aud">{s.targetAudience}</p>
                  <ul className="svc-card__list">
                    {s.deliverables.slice(0, 3).map((d) => (
                      <li key={d}>
                        <Check aria-hidden="true" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${s.slug}`} className="btn btn--block">
                    {s.ctaText}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 近期活动 */
const EVENTS: { m: string; d: string; wk: string; tag: string; title: string; when: string; cta: string; tone: PosterTone }[] = [
  { m: "10月", d: "17", wk: "周六", tag: "线下深度研讨", title: "英国罗素盟校 2026/2027 申请 List 规程深度研析会", when: "14:00–16:30 · 北京中心", cta: "预约现场席位（限 15 人）", tone: "deep" },
  { m: "10月", d: "22", wk: "周四", tag: "线上学术直播", title: "常春藤盟校 ED/EA 早申主文书学术叙事线上研讨", when: "19:30–21:00 · 专属直播间", cta: "预约直播链接", tone: "sky" },
  { m: "10月", d: "31", wk: "周六", tag: "上海答疑工作坊", title: "港大与新国立顶尖商科全英文面试技术实训", when: "14:00–17:00 · 上海陆家嘴", cta: "预约工坊名额", tone: "amber" },
];

export function EventPosters() {
  return (
    <section className="sec sec--band" id="events">
      <div className="wrap">
        <SectionHead title="近期学术讲座与答疑工作坊" desc="由各赛道首席学术导师主讲，直面招生政策演变，名额受控，需提前预约。" href="/events" more="全部活动" />
        <ul className="evt-grid">
          {EVENTS.map((e) => (
            <li key={e.title}>
              <article className="evt-card">
                <Poster tone={e.tone} className="evt-card__poster">
                  <div className="evt-card__poster-in">
                    <span className="evt-card__tag">{e.tag}</span>
                    <div className="evt-card__date">
                      <small>{e.m}</small>
                      <b>{e.d}</b>
                      <em>{e.wk}</em>
                    </div>
                  </div>
                </Poster>
                <div className="evt-card__body">
                  <h3>{e.title}</h3>
                  <p>{e.when}</p>
                  <Link href="/events" className="btn btn--outline btn--block">
                    {e.cta}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 服务流程 */
const STEPS = [
  { icon: MessagesSquare, tone: "teal" as TileTone, t: "免费初诊", d: "30 分钟沟通背景与目标" },
  { icon: FileCheck2, tone: "sky" as TileTone, t: "方案签约", d: "服务范围与退费规则写入合同" },
  { icon: Target, tone: "violet" as TileTone, t: "选校定位", d: "分档院校清单与时间表" },
  { icon: PenLine, tone: "amber" as TileTone, t: "材料打磨", d: "文书、简历、推荐信逐份确认" },
  { icon: CalendarClock, tone: "coral" as TileTone, t: "递交面试", d: "学生本人递交，模拟面试练习" },
  { icon: GraduationCap, tone: "teal" as TileTone, t: "录取签证", d: "对比录取结果，办理签证" },
  { icon: PlaneTakeoff, tone: "sky" as TileTone, t: "行前服务", d: "行前清单与海外衔接" },
];

export function ProcessFlow() {
  return (
    <section className="sec sec--plain" id="process">
      <div className="wrap">
        <SectionHead title="在青藤，体验一站式留学服务" desc="每一步都有明确的交付物，你随时知道进行到哪了。" href="/process-fees" more="了解服务流程与费用" />
        <ol className="flow">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <IconTile icon={s.icon} tone={s.tone} size={64} />
              <b>
                <i>{i + 1}</i>
                {s.t}
              </b>
              <span>{s.d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 真实案例 */
const CASE_TONE: Record<string, PosterTone> = { "us-ug": "sky", "uk-pg": "deep", "hk-sg": "teal", k12: "amber", arts: "amber" };

export function CaseCards() {
  const items = CASE_STUDIES.slice(0, 3);
  return (
    <section className="sec sec--plain" id="cases">
      <div className="wrap">
        <SectionHead title="真实录取案卷" desc="案例库均已获学员正式授权，完整呈现申请难点、背景瓶颈与导师的破局路径。" href="/cases" more="进入案例库" />
        <ul className="case-grid">
          {items.map((c) => (
            <li key={c.id}>
              <article className="case-card">
                <Poster tone={CASE_TONE[c.trackId] ?? "teal"} className="case-card__poster">
                  <div className="case-card__poster-in">
                    <div className="case-card__meta">
                      <span>{c.trackName}</span>
                      <span>{c.enrollmentYear}</span>
                    </div>
                    <div>
                      <h3>{c.admitUniversity}</h3>
                      <p>{c.admitProgram}</p>
                    </div>
                  </div>
                </Poster>
                <div className="case-card__body">
                  <dl>
                    <div>
                      <dt>学员背景</dt>
                      <dd>{c.undergradProfile} · {c.gpa}</dd>
                    </div>
                    <div>
                      <dt>核心难点</dt>
                      <dd>{c.hardBottlenecks}</dd>
                    </div>
                    <div>
                      <dt>破局策略</dt>
                      <dd>{c.strategicInsight}</dd>
                    </div>
                  </dl>
                  <p className="case-card__result">
                    <Check aria-hidden="true" />
                    <span>{c.finalResult}</span>
                  </p>
                  <div className="case-card__foot">
                    <span>指导导师 {c.leadAdvisorName}</span>
                    <Link href={`/cases/${c.slug}`} className="more-link">
                      查阅完整案卷
                      <ChevronRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 学术顾问 */
export function AdvisorGrid() {
  const items = ADVISORS.slice(0, 4);
  return (
    <section className="sec sec--band" id="advisors">
      <div className="wrap">
        <SectionHead title="严选学术顾问，全流程服务" desc="每位导师的真实学历与海外科研经历公开透明，年带教名额受控，支持指定导师初诊。" href="/advisors" more="全部导师" />
        <ul className="adv-grid">
          {items.map((a) => (
            <li key={a.id}>
              <article className="adv-card">
                <div className="adv-card__photo">
                  <AdvisorPortrait name={a.name} />
                  <span className="adv-card__years">{a.experienceYears} 年规划经验</span>
                </div>
                <div className="adv-card__body">
                  <h3>{a.name}</h3>
                  <p className="adv-card__title">{a.title}</p>
                  <p className="adv-card__bg">{a.academicBackground}</p>
                  <p className="adv-card__state">
                    <i aria-hidden="true" />
                    {a.acceptingAppointments ? "可预约初诊" : "本期名额已满"}
                  </p>
                  <Link href={`/book?preferredAdvisor=${a.id}`} className="btn btn--block">
                    向 TA 咨询
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { Compass };

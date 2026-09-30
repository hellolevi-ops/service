"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { BrandMark } from "@/components/brand/BrandMark";
import {
  ADVISORS,
  CASE_STUDIES,
  SERVICE_LINES,
} from "@/data/catalog";
import { CaseStudyCard } from "@/components/catalog/CaseStudyCard";
import { AdvisorCard } from "@/components/catalog/AdvisorCard";
import { QuickIntentMatcher } from "@/components/home/QuickIntentMatcher";
import { RecentAdmitsTicker } from "@/components/home/RecentAdmitsTicker";
import { NewsInsightsSection } from "@/components/home/NewsInsightsSection";
import { WeComDock } from "@/components/domain/WeComDock";
import {
  OxfordVisual,
  ColumbiaVisual,
  HkuNusVisual,
  AusCanVisual,
  ArtsStudioVisual,
  PhdLabVisual,
} from "@/components/home/VisualAssets";

const DESTINATIONS = [
  {
    Visual: OxfordVisual,
    href: "/tracks/uk-pg",
    track: "uk-pg",
    schools: "牛津 · 剑桥 · 帝国理工 · UCL · LSE",
    meta: "1年制硕博",
    desc: "全面掌握英国罗素盟校院系内部认可名单（List），第一轮次递交抢占有限席位，攻关学术文书与先修课要求。",
    score: "985/211 85%+ · 双非 88%+",
    rhythm: "每年 9-11 月第一轮抢跑",
  },
  {
    Visual: ColumbiaVisual,
    href: "/tracks/us-ug",
    track: "us-ug",
    schools: "哥伦比亚 · 康奈尔 · 纽大 · 约翰霍普金斯",
    meta: "本硕长线",
    desc: "注重学术科研经历、推荐信背书与差异化文书故事主轴。由常春藤硕博导师与前招生官 1对1 挖掘核心竞争优势。",
    score: "GPA 3.6+ · 标化 GRE/GMAT",
    rhythm: "高含金量科研课题与文书深度",
  },
  {
    Visual: HkuNusVisual,
    href: "/tracks/hk-sg",
    track: "hk-sg",
    schools: "港大 · 港中文 · 港科大 · NUS · NTU",
    meta: "亚洲顶尖",
    desc: "面试与笔试权重极高，工签与就业路径清晰。港新公立名校是高性价比冲刺选择。",
    score: "均分 85%+ · 雅思 7.0+",
    rhythm: "首轮面试辅导关键",
  },
  {
    Visual: AusCanVisual,
    href: "/tracks",
    track: "uk-pg",
    schools: "墨尔本 · 悉尼 · 新南威尔士 · 多伦多 · UBC",
    meta: "八大 / U15",
    desc: "快捷通道与高额奖学金规划，适合求稳与就业导向家庭。",
    score: "均分 80–85%+",
    rhythm: "多轮滚动录取",
  },
  {
    Visual: ArtsStudioVisual,
    href: "/tracks/arts",
    track: "arts",
    schools: "皇家艺术学院 RCA · 伦敦艺术大学 UAL · 罗德岛",
    meta: "作品集",
    desc: "海外名校导师原创作品集指导，拒绝模板化视觉语言。",
    score: "作品集深度 > 均分",
    rhythm: "提前 12–18 个月启动",
  },
  {
    Visual: PhdLabVisual,
    href: "/services/premium",
    track: "uk-pg",
    schools: "海外终身教职博导团队 · 全额奖学金",
    meta: "PhD / 全奖",
    desc: "海外博导精准套磁、研究计划书（RP）构思与学术答辩演练。",
    score: "研究课题匹配优先",
    rhythm: "套磁窗口全年滚动",
  },
];

const FLAGSHIP = [
  {
    university: "牛津大学 (Oxford University)",
    degree: "MSc in Materials Science",
    badge: "英国 G5 · 罗素集团",
    student: "陈同学 · 985高校材料工程",
    gpa: "均分 89.6 · 雅思 7.5",
    breakthrough: "牛津博导 1对1 挖掘电池储能独立课题，精准匹配导师科研方向",
    slug: "oxford-materials-msc-2025",
  },
  {
    university: "哥伦比亚大学 (Columbia University)",
    degree: "Columbia College",
    badge: "美国常春藤 · Top30",
    student: "C同学 · 北京示范国际部",
    gpa: "GPA 3.94 / SAT 1540",
    breakthrough: "重构学术叙事主轴，斩获藤校早申录取",
    slug: "columbia-ivy-undergrad-2025",
  },
  {
    university: "帝国理工学院 (Imperial College)",
    degree: "MSc Computing (Software Engineering)",
    badge: "全球 Top6 · 理工翘楚",
    student: "李同学 · 华东双非软科前120",
    gpa: "均分 88.4 · 雅思 7.5",
    breakthrough: "攻关帝国理工 List 外审例外条款，主打独立开源代码库",
    slug: "imperial-college-cs-2025",
  },
  {
    university: "香港大学 (HKU)",
    degree: "Master of Laws (LL.M. in Corporate Law)",
    badge: "亚洲顶尖 · 港前三",
    student: "孙同学 · 华东政法大学",
    gpa: "均分 86.8 · 涉外模拟法庭奖项",
    breakthrough: "港大前招生官深度模拟全英文学术面试，第一轮获无条件录取",
    slug: "hku-llm-law-2026",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [wecomOpen, setWecomOpen] = useState(false);
  const featuredCases = CASE_STUDIES.slice(0, 3);
  const featuredAdvisors = ADVISORS.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-[#F8FAFC]">
      {/* Dark Hero */}
      <section className="bg-[#0B1528] text-white pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-slate-800 relative overflow-hidden">
        <Image
          src="/media/hero/campus-dusk.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-[#0B1528]/85 to-[#0B1528]/55 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between pb-4 mb-8 border-b border-white/10 gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 !text-slate-950" />
              <span className="tracking-wide">2026 / 2027 全球名校高端规划通道全面启动</span>
              <span className="text-white/20">/</span>
              <span className="text-slate-300">英美港新海归博导团队限额带教</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span>正规合同与服务边界书面约定</span>
              <span className="text-white/20">|</span>
              <span className="text-amber-300 font-medium">网申账号自持 · 费用明码标价</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <BrandMark variant="dark" size={44} withWordmark href={null} />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2] font-editorial-title mt-4">
                  选对学术领路人，
                  <br />
                  <span className="text-amber-300">名校录取快人一步</span>
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                拒绝流水线中介模板代写，由海外名校硕博导师亲自操刀。精准把关院校录取内部名单（List）、深度挖掘个人独特学术潜质；网申账号密码
                学生自主掌控。退费与服务边界以签约合同及报价单为准。
              </p>
              <div className="grid grid-cols-2 gap-3.5 pt-2 text-xs">
                {[
                  ["名校导师 1对1 规划", "年限带教 6–8 人，拒绝销售转包"],
                  ["原创文书满意定稿", "同行评审级学术构思，杜绝套作"],
                  ["网申账号 100% 自持", "密码邮箱公开，随时查阅官方进度"],
                  ["正规合同 明码标价", "签约前书面约定服务边界与费用"],
                ].map(([t, d]) => (
                  <div key={t} className="border-l-2 border-amber-400/60 pl-3 space-y-0.5">
                    <span className="text-white font-semibold block">{t}</span>
                    <span className="text-slate-400 text-[11px] leading-tight block">{d}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/book"
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 !text-slate-950 font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  免费预约 1对1 专家初步诊断
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setWecomOpen(true)}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-xl border border-white/20 flex items-center justify-center gap-2 backdrop-blur-md"
                >
                  微信直连导师答疑
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>
              <div className="flex items-center gap-6 pt-4 text-xs border-t border-white/10 text-slate-400">
                {[
                  ["导师制", "海外硕博一对一辅导"],
                  ["可核对", "材料清单与进度节点"],
                  ["自持账号", "网申密码学生掌握"],
                  ["明码价", "合同约定服务边界"],
                ].map(([n, l], i) => (
                  <div key={l} className="flex items-center gap-6">
                    {i > 0 && <div className="h-7 w-px bg-white/10 hidden sm:block" />}
                    <div>
                      <span className="text-xl font-bold text-white block leading-tight tabular-nums">
                        {n}
                      </span>
                      <span>{l}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <QuickIntentMatcher
                onGeneratePlan={(data) => {
                  router.push(`/book?track=${encodeURIComponent(data.track)}`);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentAdmitsTicker onSelectCase={() => router.push("/cases")} />
      </section>

      {/* Destinations with visuals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                多国顶尖名校规划专区
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                主流名校录取规程与专业梯队
              </h2>
            </div>
            <Link
              href="/tracks"
              className="text-xs text-slate-900 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              查看全部国家详细规划
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((d) => (
              <div
                key={d.schools}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <d.Visual className="w-full h-44" />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-blue-950">{d.schools}</span>
                      <span className="tabular-nums">{d.meta}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{d.desc}</p>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="text-slate-500 flex justify-between gap-2">
                        <span>均分建议：</span>
                        <strong className="text-slate-800 text-right">{d.score}</strong>
                      </div>
                      <div className="text-slate-500 flex justify-between gap-2">
                        <span>规划节奏：</span>
                        <strong className="text-slate-800 text-right">{d.rhythm}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                  <Link
                    href={d.href}
                    className="flex-1 py-2 text-center text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg"
                  >
                    方案解析
                  </Link>
                  <Link
                    href={`/book?track=${d.track}`}
                    className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 hover:bg-blue-950 text-white rounded-lg"
                  >
                    咨询专属博导
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship admits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-end justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                FLAGSHIP ADMITS · 旗舰录取
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                图文案例精选
              </h2>
            </div>
            <Link href="/cases" className="text-xs text-slate-900 font-semibold flex items-center gap-1">
              全部案卷 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {FLAGSHIP.map((f) => (
              <Link
                key={f.slug}
                href={`/cases/${f.slug}`}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all group"
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 font-editorial-title">
                  {f.university}
                </h3>
                <p className="text-xs text-slate-600 mt-1">{f.degree}</p>
                <p className="text-xs text-slate-500 mt-2">
                  {f.student} · {f.gpa}
                </p>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">{f.breakthrough}</p>
                <span className="text-blue-950 font-medium text-xs mt-3 inline-flex items-center gap-0.5 group-hover:underline">
                  查看完整复盘 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-end justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
                OUR SERVICES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
                全学段量身定制服务
              </h2>
            </div>
            <Link href="/services" className="text-xs font-semibold text-slate-900 flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SERVICE_LINES.map((srv, idx) => (
              <div
                key={srv.id}
                className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-500">
                    PRODUCT 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 font-editorial-title">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">{srv.targetAudience}</p>
                </div>
                <Link
                  href={`/book?track=${srv.id}`}
                  className="mt-4 w-full py-2.5 text-center text-xs font-semibold bg-slate-900 text-white rounded-lg"
                >
                  立即咨询
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsInsightsSection
          onNavigate={(tab) => {
            const map: Record<string, string> = {
              guides: "/guides",
              lab: "/lab",
              book: "/book",
              cases: "/cases",
            };
            router.push(map[tab] || "/guides");
          }}
          onOpenWeCom={() => setWecomOpen(true)}
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 font-editorial-title">真实录取案卷</h2>
          <Link href="/cases" className="text-xs font-semibold text-slate-900">
            全部案例 →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featuredCases.map((c) => (
            <CaseStudyCard key={c.id} item={c} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 font-editorial-title">海外名校学术导师</h2>
          <Link href="/advisors" className="text-xs font-semibold text-slate-900">
            全部导师 →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featuredAdvisors.map((a) => (
            <AdvisorCard key={a.id} advisor={a} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-slate-300 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-editorial-title mb-2">
              现在就开始你的名校申请规划
            </h2>
            <p className="text-sm text-slate-400">
              工作日 15 分钟内人工响应。免费背景评估，签约前明码标价。
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/book"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 !text-slate-950 font-bold text-sm rounded-xl"
            >
              预约免费评估
            </Link>
            <button
              type="button"
              onClick={() => setWecomOpen(true)}
              className="px-6 py-3 border border-slate-500 hover:border-amber-400 text-slate-100 hover:text-white text-sm font-medium rounded-xl"
            >
              微信咨询
            </button>
          </div>
        </div>
      </section>

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
              className="w-full mt-3 py-2.5 text-xs font-semibold text-slate-900 border border-slate-200 rounded-xl"
              onClick={() => setWecomOpen(false)}
            >
              关闭
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

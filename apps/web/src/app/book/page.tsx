import Link from "next/link";
import { LeadForm } from "@/components/domain/LeadForm";
import { WeComDock } from "@/components/domain/WeComDock";
import { ADVISORS } from "@/data/catalog";
import { SITE, type TrackSlug, TRACK_OPTIONS } from "@/lib/site";
import { ShieldCheck, CheckCircle2, Clock, Calendar } from "lucide-react";
import { ScholarPortrait } from "@/components/home/VisualAssets";

export const metadata = {
  title: "预约免费 1对1 名校申请评估",
  description: "工作时段提交后 15 分钟内专业答复。海归硕博导师把关，完全免费，签约前明码标价。",
};

const ADVISOR_UUIDS: Record<string, string> = {
  "adv-lu": "11111111-1111-4111-8111-111111111111",
  "adv-gu": "22222222-2222-4222-8222-222222222222",
  "adv-chen": "33333333-3333-4333-8333-333333333333",
  "adv-shen": "44444444-4444-4444-8444-444444444444",
};

function asTrackSlug(v?: string): TrackSlug | undefined {
  if (!v) return undefined;
  return TRACK_OPTIONS.some((t) => t.slug === v) ? (v as TrackSlug) : undefined;
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ advisor?: string; track?: string }>;
}) {
  const sp = await searchParams;
  const advisor = sp.advisor ? ADVISORS.find((a) => a.id === sp.advisor) : undefined;
  const preferredAdvisorId = advisor ? ADVISOR_UUIDS[advisor.id] : undefined;
  const track = asTrackSlug(sp.track);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="page-banner">
        <span className="page-banner__chip">专家初步诊断</span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          预约 1对1 免费名校申请与定位初诊
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          工作日提交后，青藤国际学术督导与海归导师团队将在 15 分钟内通过微信或电话与您取得联系，为您量身制定初步冲刺与定位方向。
        </p>

        {/* Trust Badges Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            完全免费 · 预约后由顾问按约定时间联系
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            工作日 15 分钟极速专业响应
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            签约前明码标价书面约定
          </span>
        </div>

        {/* Assigned Advisor Pill */}
        {advisor ? (
          <div className="mt-5 p-3 bg-slate-50 border border-slate-200 rounded-xl inline-flex items-center gap-3">
            <ScholarPortrait name={advisor.name} title={advisor.title} className="w-9 h-9" />
            <div className="text-xs">
              <span className="text-slate-500">已指定初诊导师：</span>
              <strong className="text-slate-900 font-bold ml-1">{advisor.name}</strong>
              <span className="text-slate-500 ml-1">({advisor.title})</span>
              <Link href="/advisors" className="text-blue-900 hover:underline font-semibold ml-3">
                更换导师 →
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {/* Main Two-Column Booking Suite */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <LeadForm
            variant="book"
            preferredAdvisorId={preferredAdvisorId}
            track={track}
          />
        </div>

        {/* Right Info & Dock */}
        <div className="lg:col-span-5 space-y-6">
          <WeComDock advisorName={advisor?.name} />

          {/* Preparation Checklist */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-700 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Calendar className="w-4 h-4 text-slate-600" />
              <h4 className="font-bold text-slate-900 text-sm">初诊沟通前建议准备</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>当前在读院校背景、平时成绩均分或 GPA 档位</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>意向留学国家（英、美、港、新、澳、加）与期望学位</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>外语标化进度（雅思、托福、GRE/GMAT 等，成绩待出时也可直接评估）</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-slate-200">
              <Link
                href="/lab/tools/assessment"
                className="text-slate-900 hover:text-blue-900 font-semibold inline-flex items-center gap-1 transition-colors"
              >
                <span>方向待定？先做背景定位自测</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

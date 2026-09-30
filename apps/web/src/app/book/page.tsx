import Link from "next/link";
import { LeadForm } from "@/components/domain/LeadForm";
import { WeComDock } from "@/components/domain/WeComDock";
import { ADVISORS } from "@/data/catalog";
import { SITE, type TrackSlug, TRACK_OPTIONS } from "@/lib/site";
import { ShieldCheck } from "lucide-react";

export const metadata = { title: "预约免费评估" };

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          FREE ASSESSMENT · 免费评估
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          预约免费 1对1 名校申请评估
        </h1>
        <p className="text-sm text-[#57534E] mt-2 max-w-2xl leading-relaxed">
          工作时段提交后，目标 {SITE.phone ? "15 分钟内" : "当日"}通过电话或微信首触。表单与企微并行，不互斥。
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-[#059669] font-medium">
          <ShieldCheck className="w-4 h-4" />
          完全免费 · 绝无推销电话骚扰 · 签约前明码标价
        </div>
        {advisor ? (
          <p className="mt-4 text-xs bg-[#FBF9F5] border academic-hairline rounded-xs px-3 py-2 inline-block">
            已指定导师：<strong className="text-[#1C1917]">{advisor.name}</strong>
            <Link href="/advisors" className="text-[#92400E] ml-2">
              更换
            </Link>
          </p>
        ) : null}
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <LeadForm
            variant="book"
            preferredAdvisorId={preferredAdvisorId}
            track={track}
          />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <WeComDock advisorName={advisor?.name} />
          <div className="bg-[#FAF8F5] border academic-hairline rounded-sm p-4 text-xs text-[#57534E] space-y-2">
            <p className="font-semibold text-[#1C1917]">评估前可先准备</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>当前就读学校与均分/GPA</li>
              <li>意向国家与学位阶段</li>
              <li>标化进度（雅思/托福/GRE 等，可无）</li>
            </ul>
            <Link href="/lab/tools/assessment" className="text-[#92400E] font-medium inline-block pt-1">
              或先做录取概率自测 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

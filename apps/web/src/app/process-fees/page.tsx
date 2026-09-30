import Link from "next/link";
import { ProcessTimeline } from "@/components/domain/ProcessTimeline";
import { FeeBoundary } from "@/components/domain/FeeBoundary";
import { ParentReadableBlock } from "@/components/domain/ParentReadableBlock";
import { LeadForm } from "@/components/domain/LeadForm";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = { title: "流程与费用" };

const STEPS = [
  {
    title: "免费评估",
    detail: "了解背景、意向与约束，判断是否匹配服务。",
    deliverable: "评估纪要 + 初步路径判断",
    duration: "30–45 分钟",
  },
  {
    title: "方案与边界",
    detail: "明确产品线、阶段、不含项与同步方式。",
    deliverable: "书面方案摘要",
    duration: "3–7 天",
  },
  {
    title: "签约启动",
    detail: "确认顾问、材料清单与里程碑。",
    deliverable: "启动包与责任表",
    duration: "1 周内",
  },
  {
    title: "执行与节点交付",
    detail: "选校/文书/面试等按节点推进并同步家长。",
    deliverable: "节点交付物 + 纪要",
    duration: "按赛道 2–12 月",
  },
  {
    title: "递交与结果决策",
    detail: "材料终检、补件支持、录取对比建议。",
    deliverable: "递交清单 / 决策对照",
    duration: "申请季",
  },
  {
    title: "行前与收尾",
    detail: "签证/住宿等边界内支持；服务归档。",
    deliverable: "行前核对表",
    duration: "录取后",
  },
];

export default function ProcessFeesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          PROCESS & FEES · 流程与费用
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          5 步透明流程 · 签约前明码标价
        </h1>
        <p className="text-sm text-[#57534E] mt-2 max-w-3xl leading-relaxed">
          正规留学合同保障，费用逻辑与不含项签约前可见。拒录退费规则写入合同，绝无口头模糊承诺。
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-[#059669] font-medium">
          <ShieldCheck className="w-4 h-4" />
          网申账号密码 100% 学生自持 · 0 隐形收费
        </div>
      </div>

      <section>
        <h2 className="text-xl font-serif-title font-bold text-[#1C1917] mb-4">服务流程</h2>
        <ProcessTimeline steps={STEPS} />
      </section>

      <section>
        <h2 className="text-xl font-serif-title font-bold text-[#1C1917] mb-4">费用边界</h2>
        <FeeBoundary />
      </section>

      <ParentReadableBlock
        variant="boundary"
        title="家长可读：费用与退费"
        body="签约前提供结构化报价清单；第三方规费（考试、公证、签证等）单列不含。拒录退费以书面合同条款为准。"
        href="/services"
        linkLabel="查看服务项目"
      />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-xl font-serif-title font-bold text-[#1C1917] mb-2">
            预约免费评估
          </h2>
          <p className="text-xs text-[#78716C] mb-4">
            工作日 15 分钟内人工首触。也可先浏览
            <Link href="/services" className="text-[#92400E] mx-1">
              服务项目
            </Link>
            。
          </p>
          <LeadForm variant="book" />
        </div>
        <div className="bg-[#1C1917] text-[#EDE7DC] rounded-sm p-8 space-y-4">
          <h3 className="text-lg font-serif-title font-bold text-white">还想先对比服务？</h3>
          <p className="text-sm text-[#A8A29E] leading-relaxed">
            精品战略咨询 vs 全流程交付，看适合信号再决定，避免买错产品线。
          </p>
          <Link
            href="/services/compare"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F59E0B]"
          >
            青藤国际 vs 传统中介对比
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

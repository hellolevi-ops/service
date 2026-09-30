import Link from "next/link";
import { ProcessTimeline } from "@/components/domain/ProcessTimeline";
import { FeeBoundary } from "@/components/domain/FeeBoundary";
import { ParentReadableBlock } from "@/components/domain/ParentReadableBlock";
import { LeadForm } from "@/components/domain/LeadForm";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "透明流程与收费标准",
  description: "正规留学服务合同保障，费用逻辑与另行约定事项签约前全公开。网申账号100%学生自持。",
};

const STEPS = [
  {
    title: "免费背景评估",
    detail: "全面了解学术背景、标化均分与意向院校约束，明确是否具备冲刺空间与服务匹配度。",
    deliverable: "初步评估纪要 + 梯队路径判断",
    duration: "30–45 分钟",
  },
  {
    title: "方案研判与边界约定",
    detail: "书面明确产品线、指导导师、阶段性成果交付物、另行约定事项与家校同步机制。",
    deliverable: "书面方案摘要与报价单",
    duration: "3–7 天",
  },
  {
    title: "正规签约启动",
    detail: "双方签署正规教育部推荐范本留学合同，分配对口海归硕博导师与专属学术督导。",
    deliverable: "规划启动包与责任清单",
    duration: "1 周内",
  },
  {
    title: "分阶段执行与交付",
    detail: "选校定案、学术课题指导、原创文书构思打磨、面试演练，每阶段均由学员满意定稿。",
    deliverable: "原创文书定本 + 节点签署备忘",
    duration: "按赛道 2–12 个月",
  },
  {
    title: "网申递交与录取决策",
    detail: "学生自主掌控网申账号密码，在系统监督下完成递交。官方录取下发后协助多校对比决策。",
    deliverable: "官方网申递交确认凭据",
    duration: "申请递交季",
  },
  {
    title: "签证行前与离岸支持",
    detail: "签证材料指导、住宿预订建议、行前学术适应指南，全方位保障顺利入读海外名校。",
    deliverable: "官方获签确认 + 行前核对表",
    duration: "录取确认后",
  },
];

export default function ProcessFeesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="page-banner">
        <span className="page-banner__chip">流程规范与费用边界</span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          全程透明服务规程 · 签约前明码标价
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          正规留学服务合同保障，费用构成与第三方规费签约前清晰列明。退费规则白纸黑字写入合同，全部承诺以书面为准，价格全程一致。
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            网申账号密码 100% 学生自主掌握
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>收费项目全部明示 · 合同列明另行约定事项明细</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>72 小时冷静期退费保障</span>
        </div>
      </div>

      {/* Process Timeline Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-serif-title font-bold text-slate-900">
            6 步全生命周期标准化服务规程
          </h2>
        </div>
        <ProcessTimeline steps={STEPS} />
      </section>

      {/* Fee Boundary Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-serif-title font-bold text-slate-900">
            收费边界与第三方规费自费明细
          </h2>
        </div>
        <FeeBoundary />
      </section>

      {/* Parent Readable Block */}
      <ParentReadableBlock
        variant="boundary"
        title="家长特别说明：费用与退费保障"
        body="签约前提供结构化书面报价单；第三方官方硬性规费（雅思托福考试费、公证费、使馆签证费、体检费等）单列自理，中介服务费清晰列明、独立计价。录取结果相关的退费规则，严格以签约正式合同条款为准。"
        href="/services"
        linkLabel="查阅全部服务体系"
      />

      {/* Consultation Action Section */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-serif-title font-bold text-slate-900">
              预约 1对1 免费初步诊断
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              工作日 15 分钟内专业答复。可先测算背景，评估后再考虑签约。
            </p>
          </div>
          <LeadForm variant="book" />
        </div>

        <div className="bg-slate-900 text-slate-300 rounded-2xl p-8 space-y-4 border border-slate-800 shadow-sm">
          <h3 className="text-xl font-serif-title font-bold text-white">
            还想了解各产品线区别？
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            青藤学术导师制精品咨询 vs 全流程精益交付 vs 传统中介填表套模，对比适合人群与交付质量，帮助家庭做出清晰的决策。
          </p>
          <div className="pt-2">
            <Link
              href="/services/compare"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 !text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              <span>查阅服务横向对比矩阵</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

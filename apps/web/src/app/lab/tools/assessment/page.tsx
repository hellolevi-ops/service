import Link from "next/link";
import { AssessmentTool } from "./AssessmentTool";
import { WeComDock } from "@/components/domain/WeComDock";

export const metadata = { title: "名校录取概率自测" };

export default function AssessmentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <p className="text-xs text-slate-500 mb-1">
          <Link href="/lab" className="hover:text-blue-900">
            Practice Lab
          </Link>{" "}
          / 录取概率自测
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
          名校录取概率快速自测
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          先出结果，再决定是否预约解读。无伪匹配百分比；非录取意见。
        </p>
      </div>
      <AssessmentTool />
      <WeComDock />
    </div>
  );
}

import { ChecklistTool } from "@/components/lab/ChecklistTool";
import Link from "next/link";

export const metadata = { title: "申请材料核对清单" };

export default function ChecklistToolPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <p className="text-xs text-slate-500 mb-1">
          <Link href="/lab" className="hover:text-blue-900">
            Practice Lab
          </Link>{" "}
          / 材料清单
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
          申请与行前材料核对清单
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          逐项勾选，进度保存在本机浏览器。完成后再预约导师终检。
        </p>
      </div>
      <ChecklistTool />
    </div>
  );
}

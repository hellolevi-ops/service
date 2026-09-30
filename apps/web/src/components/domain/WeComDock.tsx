"use client";

import Image from "next/image";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { useState } from "react";
import { Check, Copy, MessageSquare, ShieldCheck } from "lucide-react";

export function WeComDock({
  placement = "inline",
  advisorName,
}: {
  placement?: "inline" | "drawer" | "footer";
  advisorName?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(SITE.wechatId);
      setCopied(true);
      track("wechat_copy", { placement });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs text-slate-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-editorial-title">
              微信 / 企微学术直联{advisorName ? ` · ${advisorName}` : ""}
            </h4>
            <p className="text-[11px] text-slate-500">
              工作时段 15 分钟内首触 · 可直接发送背景评估方案
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200/60">
          ONLINE
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl shrink-0 group cursor-pointer">
          <Image
            src={SITE.wecomQr}
            alt="微信咨询二维码"
            width={128}
            height={128}
            className="rounded-lg transition-transform group-hover:scale-102"
            onClick={() => track("wechat_click", { placement })}
          />
        </div>

        <div className="space-y-2.5 flex-1 min-w-0 text-center sm:text-left">
          <div>
            <span className="text-xs text-slate-500 block">官方学术督导微信号：</span>
            <span className="text-sm font-bold font-mono text-slate-900 select-all block mt-0.5">
              {SITE.wechatId}
            </span>
          </div>

          <button
            type="button"
            onClick={copyId}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>微信号已复制到剪贴板</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>一键复制微信号</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>扫码添加或微信搜索同号即可添加</span>
          </p>
        </div>
      </div>
    </div>
  );
}

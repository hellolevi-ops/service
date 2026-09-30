"use client";

import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { BrandMark } from "@/components/brand/BrandMark";

export function TrustFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-24 sm:pb-12 border-t border-slate-800 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-10 mb-10 border-b border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-400">
          <TrustItem
            icon={<ShieldCheck className="w-5 h-5 text-amber-400" />}
            title="严谨选校原创文书"
            body="拒绝流水线模板套作与虚假包装，导师1对1定制专属亮点。"
          />
          <TrustItem
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            title="全透明网申账号"
            body="账号密码完全对学子与家长自主共享，官方邮件系统留痕。"
          />
          <TrustItem
            icon={<Award className="w-5 h-5 text-blue-400" />}
            title="绝无保录欺诈承诺"
            body="坚持实事求是。不借“内推关系”名义忽悠，凭硬核背景冲名校。"
          />
          <TrustItem
            icon={<Phone className="w-5 h-5 text-indigo-400" />}
            title="15 分钟极速响应"
            body="工作日提交背景自测或预约，资深导师 15 分钟内专业答复。"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-xs">
          <div className="col-span-2 space-y-4">
            <BrandMark variant="dark" size={36} withWordmark />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">{SITE.support}</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{SITE.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-white font-bold">全国咨询热线：{SITE.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${SITE.complaintEmail}`}>{SITE.complaintEmail}</a>
              </div>
            </div>
          </div>

          <FooterCol
            title="留学国家与规划"
            links={[
              ["/universities", "全球名校库与List查询"],
              ["/tracks/uk-pg", "英国 G5 / 罗素"],
              ["/tracks/us-ug", "美本常春藤"],
              ["/tracks/hk-sg", "港新公立"],
              ["/tracks/arts", "艺术作品集"],
            ]}
          />
          <FooterCol
            title="服务与工具"
            links={[
              ["/services", "服务项目"],
              ["/process-fees", "流程与费用"],
              ["/lab/tools/assessment", "录取概率自测"],
              ["/lab/tools/cost", "费用预算器"],
              ["/lab/tools/checklist", "材料清单"],
            ]}
          />
          <FooterCol
            title="信任与合规"
            links={[
              ["/about/trust", "主体与信任"],
              ["/community", "学术社区"],
              ["/events", "活动巡展"],
              ["/cases", "成功案例"],
              ["/advisors", "导师团队"],
              ["/privacy", "隐私政策"],
              ["/terms", "服务条款"],
            ]}
          />
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-3 text-[11px] text-slate-500">
          <span>{SITE.icpText}</span>
          <a
            href={`mailto:${SITE.complaintEmail}`}
            onClick={() => track("trust_complaint_click")}
            className="text-amber-400 hover:underline"
          >
            投诉 / 监督入口
          </a>
        </div>
      </div>
    </footer>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <strong className="text-white block font-bold text-sm mb-1">{title}</strong>
        <span>{body}</span>
      </div>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-white">{title}</h4>
      <ul className="space-y-2 text-slate-400">
        {links.map(([href, label]) => (
          <li key={href + label}>
            <Link href={href} className="hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

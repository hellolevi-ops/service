import Link from "next/link";
import { SITE } from "@/lib/site";
import { WeComDock } from "@/components/domain/WeComDock";
import { LeadForm } from "@/components/domain/LeadForm";
import { MapPin, Phone, Mail, Clock, Compass, ArrowRight } from "lucide-react";
import { BRANCH_OFFICES } from "@/data/portalData";

export const metadata = {
  title: "联系我们 · 青藤国际",
  description: "工作日 15 分钟内专业答复。全国咨询热线、各城市服务中心与微信直连。",
};

export default function ContactPage() {
  const hq = BRANCH_OFFICES[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-1">
          CONTACT & LOCATIONS · 全国服务中心与联系方式
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
          与青藤国际学术规划团队取得联系
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          工作日 09:00–21:00，提交评估或微信添加后 15 分钟内专业学术初诊首触。支持线上远程与线下城市办事处面询。
        </p>
      </div>

      {/* 4 Info Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <Info
          icon={<Phone className="w-4 h-4 text-amber-600" />}
          label="全国官方咨询专线"
          value={<a href={`tel:${SITE.phone}`} className="hover:text-blue-900">{SITE.phone}</a>}
        />
        <Info
          icon={<Mail className="w-4 h-4 text-slate-600" />}
          label="学术督导监督邮箱"
          value={<a href={`mailto:${SITE.complaintEmail}`} className="hover:text-blue-900">{SITE.complaintEmail}</a>}
        />
        <Info
          icon={<MapPin className="w-4 h-4 text-blue-600" />}
          label="中国区战略总部地址"
          value={SITE.address}
        />
        <Info
          icon={<Clock className="w-4 h-4 text-emerald-600" />}
          label="专家值守接待时段"
          value={hq?.hours ?? "工作日 09:00 – 21:00"}
        />
      </div>

      {/* Two Column Interaction */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-editorial-title">
            线上提交初步诊断申请
          </h2>
          <LeadForm variant="book" />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <WeComDock />

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-xs text-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm font-editorial-title">
              主要城市分支办事处
            </h3>
            <ul className="space-y-3">
              {BRANCH_OFFICES.map((b) => (
                <li key={b.city} className="pb-3 border-b border-slate-200/60 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>{b.city} 办事处 · {b.tier}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{b.phone}</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">{b.address}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center gap-2 text-slate-500 mb-1.5">
        {icon}
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <div className="font-semibold text-slate-900 text-sm leading-snug">{value}</div>
    </div>
  );
}

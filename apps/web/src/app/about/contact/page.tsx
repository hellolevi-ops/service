import Link from "next/link";
import { SITE } from "@/lib/site";
import { WeComDock } from "@/components/domain/WeComDock";
import { LeadForm } from "@/components/domain/LeadForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BRANCH_OFFICES } from "@/data/portalData";

export const metadata = { title: "联系我们" };

export default function ContactPage() {
  const hq = BRANCH_OFFICES[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
          CONTACT · 联系我们
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title">
          与青藤国际取得联系
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          工作日 09:00–21:00，目标 15 分钟内人工首触。表单与企微并行，不互斥。
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <Info
          icon={<Phone className="w-4 h-4 text-amber-500" />}
          label="全国咨询热线"
          value={<a href={`tel:${SITE.phone}`}>{SITE.phone}</a>}
        />
        <Info
          icon={<Mail className="w-4 h-4 text-slate-500" />}
          label="监督邮箱"
          value={<a href={`mailto:${SITE.complaintEmail}`}>{SITE.complaintEmail}</a>}
        />
        <Info
          icon={<MapPin className="w-4 h-4 text-blue-600" />}
          label="总部地址"
          value={SITE.address}
        />
        <Info
          icon={<Clock className="w-4 h-4 text-emerald-600" />}
          label="服务时间"
          value={hq?.hours ?? "工作日 09:00 – 21:00"}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-editorial-title mb-3">
            提交免费评估
          </h2>
          <LeadForm variant="book" />
        </div>
        <div className="space-y-4">
          <WeComDock />
          <Link
            href="/events"
            className="block text-xs font-semibold text-blue-900 hover:underline"
          >
            查看城市巡展与分公司 →
          </Link>
          <Link
            href="/about/trust"
            className="block text-xs font-semibold text-blue-900 hover:underline"
          >
            信任与投诉通道 →
          </Link>
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
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-2 text-slate-500 mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="font-medium text-slate-900 leading-snug">{value}</div>
    </div>
  );
}

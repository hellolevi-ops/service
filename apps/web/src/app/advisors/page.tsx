import Link from "next/link";
import { ShieldCheck, Users, Award } from "lucide-react";
import { ADVISORS } from "@/data/boyan";
import { AdvisorCard } from "@/components/boyan/AdvisorCard";

export const metadata = { title: "导师团队" };

export default function AdvisorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="pb-6 border-b academic-hairline">
        <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
          ADVISORS · 海外名校学术导师
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
          由学者带教，而非流水线顾问填表
        </h1>
        <p className="text-sm text-[#57534E] mt-2 max-w-3xl leading-relaxed">
          青藤国际导师均具备海外顶尖高校博士/博士后或对口学科深度履历。可浏览、可指定初诊；接评说明与家长同步方式公开。
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-xs">
        <Principle
          icon={<Award className="w-5 h-5 text-[#D97706]" />}
          title="学科对口带教"
          body="按赛道匹配导师，不做「万能顾问」包办所有国家。"
        />
        <Principle
          icon={<Users className="w-5 h-5 text-[#059669]" />}
          title="家长可同步"
          body="双周备忘录 / 三方会，进度与决策节点对家庭透明。"
        />
        <Principle
          icon={<ShieldCheck className="w-5 h-5 text-[#3B82F6]" />}
          title="可更换可投诉"
          body="服务对象可申请更换导师；监督邮箱公开可查。"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ADVISORS.map((a) => (
          <AdvisorCard key={a.id} advisor={a} />
        ))}
      </div>

      <div className="bg-[#1C1917] text-[#EDE7DC] rounded-sm p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif-title font-bold text-white">不确定该选哪位导师？</h2>
          <p className="text-sm text-[#A8A29E] mt-1">提交背景后，学术督导 15 分钟内为您匹配。</p>
        </div>
        <Link
          href="/book"
          className="px-5 py-2.5 bg-[#92400E] hover:bg-[#78350F] text-white text-sm font-semibold rounded-xs shrink-0"
        >
          预约免费匹配
        </Link>
      </div>
    </div>
  );
}

function Principle({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white border academic-hairline rounded-sm p-4 flex items-start gap-3">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <strong className="text-[#1C1917] block mb-1">{title}</strong>
        <span className="text-[#78716C]">{body}</span>
      </div>
    </div>
  );
}

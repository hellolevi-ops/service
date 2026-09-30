import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { SITE } from "@/lib/site";
import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export function TrustFooter() {
  return (
    <footer className="foot bg-[#0B2523] text-slate-300 pt-14 pb-10 border-t border-emerald-950">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandMark variant="dark" size={32} withWordmark href="/" />
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-md">
              垂直深耕型国际学者与升学研判体系。坚持导师全流程亲自负责，网申账号密码 100% 由学生与家庭自主自持。
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>签约前白纸黑字写明交付节点、另行约定事项与 72h 退费机制</span>
            </div>
          </div>

          {/* 1. 服务 */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              服务体系
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/premium" className="hover:text-white transition-colors">
                  精品定制线
                </Link>
              </li>
              <li>
                <Link href="/services/full-cycle" className="hover:text-white transition-colors">
                  全流程规划线
                </Link>
              </li>
              <li>
                <Link href="/services/compare" className="hover:text-white transition-colors">
                  服务方案对比
                </Link>
              </li>
              <li>
                <Link href="/process-fees" className="hover:text-white transition-colors">
                  服务流程与透明费用
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. 留学方向 */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              留学方向
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tracks/us-ug" className="hover:text-white transition-colors">
                  美本精英 (常春藤 · Top30)
                </Link>
              </li>
              <li>
                <Link href="/tracks/uk-pg" className="hover:text-white transition-colors">
                  英联邦硕博 (牛剑 · G5 · 罗素)
                </Link>
              </li>
              <li>
                <Link href="/tracks/hk-sg" className="hover:text-white transition-colors">
                  港新名校 (港前三 · NUS/NTU)
                </Link>
              </li>
              <li>
                <Link href="/tracks/k12" className="hover:text-white transition-colors">
                  低龄国际教育 (K12)
                </Link>
              </li>
              <li>
                <Link href="/tracks/arts" className="hover:text-white transition-colors">
                  艺术与设计 (作品集研判)
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. 资源与合规 */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              资源与工具
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/cases" className="hover:text-white transition-colors">
                  真实脱敏案例案卷
                </Link>
              </li>
              <li>
                <Link href="/advisors" className="hover:text-white transition-colors">
                  学术顾问团队名录
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-white transition-colors">
                  Lab 自助工具箱
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  申请真相与风险预案指南
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  近期讲座与工坊
                </Link>
              </li>
              <li>
                <Link href="/about/trust" className="hover:text-white transition-colors">
                  主体资质与合规保障
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact info row */}
        <div className="py-6 border-b border-emerald-900/40 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-emerald-200/80">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>官方专线：{SITE.phone}（09:00 - 21:00）</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>督导与合规投诉：{SITE.complaintEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>总部地址：{SITE.address}</span>
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <span>{SITE.icpText}</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              隐私权政策
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              服务条款
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              免责声明
            </Link>
            <Link href="/about/trust" className="hover:text-white transition-colors">
              退费与合规保障
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

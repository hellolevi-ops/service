import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Award, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, extraSlug?: string) => void;
  onOpenBooking: () => void;
  onOpenWeCom: () => void;
  onOpenAdminLeads: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenWeCom,
  onOpenAdminLeads
}) => {
  return (
    <footer className="bg-[#1C1917] text-[#EDE7DC] pt-14 pb-20 sm:pb-12 border-t border-[#44403C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="pb-10 mb-10 border-b border-[#292524] grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-[#A8A29E]">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#FBF9F5] block font-medium">严谨学术立项</strong>
              <span>拒绝流水线模板文书与虚假包装，学者领衔对标顶尖海外学风。</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#FBF9F5] block font-medium">全透明网申账号</strong>
              <span>账号密码完全对学子与家长自主共享，任何官方邮件全程留痕。</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#FBF9F5] block font-medium">绝无保录欺诈承诺</strong>
              <span>坚持实事求是。不借“内推关系”名义夸大承诺，合规防范风险。</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#FBF9F5] block font-medium">15 分钟学术响应 SLA</strong>
              <span>工作日提交背景诊断或预约，专业学术督导 15 分钟内人工触达。</span>
            </div>
          </div>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-xs">
          {/* Col 1: Brand & Identity */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#78350F] text-[#FBF9F5] flex items-center justify-center font-brand-title font-bold text-base">
                博
              </div>
              <div>
                <span className="text-lg font-serif-title font-bold text-[#FBF9F5] tracking-tight block">
                  博研书院
                </span>
                <span className="text-[10px] text-[#A8A29E] tracking-widest uppercase">
                  BOYAN ACADEMY & ADVISORY
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm">
              面向中国大陆高志向学子与理性家庭的垂直深耕型学术与留学研判体系。以严谨的文献方法学、先修课穿透匹配与全透明精益交付，打破传统中介的信息黑箱。
            </p>

            <div className="space-y-1.5 text-[11px] text-[#A8A29E]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#78350F]" />
                <span>北京市海淀区中关村南大街1号 · 清华科技园创新大厦B座</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#78350F]" />
                <span>全国咨询热线：400-880-9218 (工作日 09:00 - 21:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#78350F]" />
                <span>纪律与学术合规监督邮箱：supervision@boyan-academy.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services & Tracks */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] font-serif-title">
              服务与学术赛道
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li><button onClick={() => onNavigate('services', 'premium')} className="hover:text-[#FBF9F5]">学术导师制精品咨询</button></li>
              <li><button onClick={() => onNavigate('services', 'full-cycle')} className="hover:text-[#FBF9F5]">全流程精益交付线</button></li>
              <li><button onClick={() => onNavigate('services', 'compare')} className="hover:text-[#FBF9F5]">服务选型与对照中心</button></li>
              <li><button onClick={() => onNavigate('tracks', 'us-ug')} className="hover:text-[#FBF9F5]">美本常春藤与Top30</button></li>
              <li><button onClick={() => onNavigate('tracks', 'uk-pg')} className="hover:text-[#FBF9F5]">英国G5与罗素研博</button></li>
              <li><button onClick={() => onNavigate('tracks', 'hk-sg')} className="hover:text-[#FBF9F5]">中国香港与新加坡公立</button></li>
            </ul>
          </div>

          {/* Col 3: Practice Lab & Cases */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] font-serif-title">
              最佳实践 Lab & 研判
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li><button onClick={() => onNavigate('lab')} className="hover:text-[#FBF9F5]">Practice Lab 工具总览</button></li>
              <li><button onClick={() => onNavigate('lab', 'assessment')} className="hover:text-[#FBF9F5]">背景竞争力自测模型</button></li>
              <li><button onClick={() => onNavigate('lab', 'timeline')} className="hover:text-[#FBF9F5]">申请时间轴倒推生成器</button></li>
              <li><button onClick={() => onNavigate('lab', 'checklist')} className="hover:text-[#FBF9F5]">申请材料合规自检清单</button></li>
              <li><button onClick={() => onNavigate('lab', 'cost')} className="hover:text-[#FBF9F5]">留学预算粗算器</button></li>
              <li><button onClick={() => onNavigate('cases')} className="hover:text-[#FBF9F5]">8大真实难点案例库</button></li>
            </ul>
          </div>

          {/* Col 4: Trust & Admin */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF9F5] font-serif-title">
              合规机制与通道
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li><button onClick={() => onNavigate('process-fees')} className="hover:text-[#FBF9F5]">费用构成与退费原则</button></li>
              <li><button onClick={onOpenWeCom} className="hover:text-[#FBF9F5] flex items-center gap-1"><span>企微在线咨询</span><span className="text-[10px] bg-[#065F46] text-[#A7F3D0] px-1 py-0.2 rounded-xs">实时</span></button></li>
              <li><button onClick={() => onOpenBooking()} className="hover:text-[#FBF9F5]">预约45分钟初诊评估</button></li>
              <li><button onClick={() => onNavigate('guides')} className="hover:text-[#FBF9F5]">真相源权威政策指南</button></li>
              <li><button onClick={() => onNavigate('community')} className="hover:text-[#FBF9F5]">学长在读互助学术社区</button></li>
              <li>
                <button 
                  onClick={onOpenAdminLeads} 
                  className="text-[#D97706] hover:text-[#F59E0B] font-mono flex items-center gap-1 mt-2 text-[11px]"
                >
                  <span>[督导查验] 线索管理看板</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Compliance Stripe */}
        <div className="pt-8 border-t border-[#292524] text-[11px] text-[#78716C] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div>
              主办主体：北京博研学术咨询交流有限公司 (Boyan Academic & Advisory Ltd.)
              <span className="mx-2">|</span>
              京ICP备2026092801号-1
              <span className="mx-2">|</span>
              京公网安备 11010802039218号
            </div>
            <div>
              服务对象说明：本院所有申请规划与咨询服务仅面向 18 岁及以上意向学子或其法定监护人。低龄业务须由监护人全程签署知情协议。
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] text-[#A8A29E] space-y-0.5">
            <div>© 2026 博研书院. 版权所有. 保留一切学术与出版权利.</div>
            <div className="text-[10px] text-[#57534E]">
              免责声明：本院公布之过往案例均为真实脱敏记录，不构成对任何特定申请者录取之绝对要约或法律承诺。
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

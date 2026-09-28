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
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-20 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Banner */}
        <div className="pb-10 mb-10 border-b border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-slate-400">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-sm">严谨选校原创文书</strong>
              <span>拒绝流水线模板套作与虚假包装，导师1对1定制专属亮点。</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-sm">全透明网申账号</strong>
              <span>账号密码完全对学子与家长自主共享，官方邮件系统留痕。</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-sm">绝无保录欺诈承诺</strong>
              <span>坚持实事求是。不借“内推关系”名义忽悠，凭硬核背景冲名校。</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold text-sm">15 分钟极速响应</strong>
              <span>工作日提交背景自测或预约，资深导师 15 分钟内专业答复。</span>
            </div>
          </div>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-xs">
          {/* Col 1: Brand & Identity */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                青
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight block">
                  青藤国际
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                  IVY GLOBAL EDUCATION
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              专注英美港新主流名校高端留学规划。以严格的院校认可名单把控、深度个性化原创文书和全透明安心交付，消除留学信息不对称，给学子一个好前途。
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>北京市海淀区中关村南大街1号 · 清华科技园创新大厦B座</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-white font-bold">全国咨询热线：400-820-1926 (工作日 09:00 - 21:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>服务与学术合规监督邮箱：supervision@ivyglobal.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services & Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              留学国家与规划
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate('universities')} className="hover:text-white font-semibold text-amber-400 cursor-pointer">全球名校库与List查询</button></li>
              <li><button onClick={() => onNavigate('tracks', 'uk-pg')} className="hover:text-white cursor-pointer">英国G5与罗素名校硕士</button></li>
              <li><button onClick={() => onNavigate('tracks', 'us-ug')} className="hover:text-white cursor-pointer">美国常春藤与Top30本科</button></li>
              <li><button onClick={() => onNavigate('tracks', 'hk-sg')} className="hover:text-white cursor-pointer">中国香港与新加坡公立名校</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white cursor-pointer">名校硕士全案申请服务</button></li>
              <li><button onClick={() => onNavigate('services', 'compare')} className="hover:text-white cursor-pointer">青藤国际 vs 传统中介对比</button></li>
            </ul>
          </div>

          {/* Col 3: Practice Lab & Cases */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              免费工具与案例
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate('lab')} className="hover:text-white cursor-pointer">免费工具箱总览</button></li>
              <li><button onClick={() => onNavigate('lab', 'assessment')} className="hover:text-white text-blue-400 font-medium cursor-pointer">名校录取概率快速自测</button></li>
              <li><button onClick={() => onNavigate('lab', 'cost')} className="hover:text-white cursor-pointer">留学花费总预算粗算器</button></li>
              <li><button onClick={() => onNavigate('lab', 'checklist')} className="hover:text-white cursor-pointer">申请材料合规自检清单</button></li>
              <li><button onClick={() => onNavigate('lab', 'timeline')} className="hover:text-white cursor-pointer">申请时间轴倒推生成器</button></li>
              <li><button onClick={() => onNavigate('cases')} className="hover:text-white cursor-pointer">50+ 真实录取案例库</button></li>
            </ul>
          </div>

          {/* Col 4: Trust & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              服务保障与预约
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate('process-fees')} className="hover:text-white cursor-pointer">服务流程与退费准则</button></li>
              <li>
                <button onClick={onOpenWeCom} className="hover:text-white flex items-center gap-1.5 cursor-pointer">
                  <span>微信在线咨询</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">即时</span>
                </button>
              </li>
              <li><button onClick={() => onOpenBooking()} className="hover:text-white text-amber-400 font-semibold cursor-pointer">预约 1对1 免费规划</button></li>
              <li><button onClick={() => onNavigate('guides')} className="hover:text-white cursor-pointer">名校申请避坑实用指南</button></li>
              <li><button onClick={() => onNavigate('advisors')} className="hover:text-white cursor-pointer">资深导师背景资质查询</button></li>
              <li>
                <button 
                  onClick={onOpenAdminLeads} 
                  className="text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 mt-2 text-[11px] cursor-pointer"
                >
                  <span>[督导查验] 预约线索看板</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Compliance Stripe */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div>
              主办主体：北京青藤国际教育咨询有限公司 (Ivy Global Education & Advisory Ltd.)
              <span className="mx-2 text-slate-700">|</span>
              京ICP备2026092801号-1
              <span className="mx-2 text-slate-700">|</span>
              京公网安备 11010802039218号
            </div>
            <div>
              正规资质承诺：签约前明码标价无隐形消费，网申账号密码100%自主掌控，拒录按正规合同退费。
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-slate-400 space-y-0.5">
            <div>© 2026 青藤国际. 版权所有. All Rights Reserved.</div>
            <div className="text-[11px] text-slate-600">
              免责声明：公布之过往案例均为真实脱敏记录，不构成对任何特定申请者录取之绝对保录承诺。
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { ShieldCheck, FileSpreadsheet, AlertTriangle, Scale, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';

interface FeeBoundaryProps {
  onOpenBooking?: () => void;
  onOpenWeCom?: () => void;
}

export const FeeBoundary: React.FC<FeeBoundaryProps> = ({
  onOpenBooking,
  onOpenWeCom
}) => {
  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
      <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            FEE TRANSPARENCY & BOUNDARIES · 费用构成与安全边界
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            明码标价公约与合规服务边界
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            青藤国际坚持“签约前明码标价，中途绝不加收一分钱”，公开所有费用组成与官方规费自付明细。
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            教育部资质正规备案
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: 定价标准 */}
        <div className="bg-slate-50/70 border border-slate-200 p-5 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 pb-2 border-b border-slate-200">
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>1. 咨询服务费定价标准</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            我们拒绝传统中介模糊的一口价。费用根据目标国家、申请院校数量与学位阶段量化：
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
              <span className="font-bold text-blue-600 shrink-0">名校全案申请：</span>
              <span>2.8万 – 5.6万元（覆盖 5–8 所大学选校、原创文书、网申与签证）</span>
            </li>
            <li className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
              <span className="font-bold text-blue-600 shrink-0">名校导师精品线：</span>
              <span>5.8万 – 12.8万元（海外名校导师1对1带教、科研背景提升、多轮答辩）</span>
            </li>
            <li className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
              <span className="font-bold text-blue-600 shrink-0">单模块专项加购：</span>
              <span>8,000 – 18,000元（如单篇文书精修、RP课题辅导、模拟面试）</span>
            </li>
          </ul>
          <div className="text-[11px] text-blue-700 bg-blue-50 p-2.5 rounded-lg border border-blue-100 font-medium">
            首次 1对1 学术背景诊断完全免费，出具书面《选校建议与报价单》后再决定签约。
          </div>
        </div>

        {/* Section 2: 第三方不包含规费 */}
        <div className="bg-amber-50/40 border border-amber-200/80 p-5 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 pb-2 border-b border-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>2. 官方第三方规费【学生自付】</span>
          </div>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            为杜绝传统中介“低报价揽客后以各项名义乱加收”的恶疾，青藤国际承诺绝不代收以下硬性款项：
          </p>
          <ul className="space-y-1.5 text-xs text-amber-900">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold">•</span>
              <span>大学官方网申费 (每所大学约 £50–£150 / $80–$150)</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold">•</span>
              <span>成绩单官方公证、学信网认证或 WES 认证规费</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold">•</span>
              <span>雅思 / 托福 / GRE / GMAT 官方考试考务费</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold">•</span>
              <span>使领馆签证申请规费与海外学生医疗附加险 (IHS)</span>
            </li>
          </ul>
          <div className="text-[11px] text-amber-800 bg-white/80 p-2.5 rounded-lg border border-amber-200 font-medium">
            所有官方规费均由家庭直接通过学生本人的双币信用卡缴纳，绝不经过中介资金池。
          </div>
        </div>

        {/* Section 3: 合规退费准则 */}
        <div className="bg-emerald-50/40 border border-emerald-200/80 p-5 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 pb-2 border-b border-emerald-200">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>3. 正规退费准则与权益保障</span>
          </div>
          <p className="text-xs text-emerald-900/80 leading-relaxed">
            写入正规服务合同，保障每一位客户在任何非预期情况下的合法财产权益：
          </p>
          <div className="space-y-2 text-xs text-emerald-950">
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="font-bold block text-emerald-700">72 小时无条件反悔冷静期：</span>
              <span>签署合同后 72 小时内未启动文书创作前，无理由全额退还所缴款项。</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="font-bold block text-emerald-700">未获录取全额退费承诺：</span>
              <span>如在协议约定合理申请梯队内最终未获任一录取，全额退还服务费。</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="font-bold block text-emerald-700">导师过失兜底责任：</span>
              <span>因导师过失导致漏申、延误批次且经双方认定属实者，无条件退还全部对应服务费。</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-500">
          如需核实官方合同范本条款或咨询特定专业服务报价，顾问随时为您提供解答。
        </span>
        <div className="flex items-center gap-2">
          {onOpenWeCom && (
            <button
              onClick={onOpenWeCom}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>微信索取合同范本</span>
            </button>
          )}
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>预约 1对1 选校诊断</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

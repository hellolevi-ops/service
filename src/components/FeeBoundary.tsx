import React from 'react';
import { DollarSign, AlertCircle, ShieldAlert, Check, XCircle, FileSpreadsheet } from 'lucide-react';

export const FeeBoundary: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm my-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-6 border-b academic-hairline gap-3">
        <div>
          <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
            签约前完全知情原则
          </span>
          <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917]">
            费用构成逻辑、严正不含项与解约退费机制
          </h3>
        </div>
        <div className="text-xs text-[#78716C] bg-[#F5F2EB] px-3 py-1.5 rounded-xs border academic-hairline flex items-center gap-1.5 self-start sm:self-auto">
          <DollarSign className="w-3.5 h-3.5 text-[#B45309]" />
          <span>计费因子完全公开 · 绝无二次加价</span>
        </div>
      </div>

      {/* 3 Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Block 1: Advisory Fee Logic */}
        <div className="bg-[#FBF9F5] p-5 rounded-sm border academic-hairline flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#92400E] mb-3">
              <FileSpreadsheet className="w-4 h-4" />
              <span>1. 书院咨询服务费定价逻辑</span>
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed mb-4">
              我们拒绝传统中介模糊的一口价。费用根据学术目标跨度、选校数量与带教导师学术职级量化：
            </p>
            <ul className="space-y-2 text-xs text-[#44403C]">
              <li className="flex items-start gap-2 bg-white p-2 rounded-xs border academic-hairline">
                <span className="font-semibold text-[#92400E] shrink-0">全流程精益线：</span>
                <span>2.8万 – 5.6万元人民币（覆盖 5–8 所大学全生命周期质检与递交）</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-2 rounded-xs border academic-hairline">
                <span className="font-semibold text-[#92400E] shrink-0">精品学术领衔线：</span>
                <span>5.8万 – 12.8万元人民币（顶尖海外学者带教、文献研讨、多轮答辩）</span>
              </li>
              <li className="flex items-start gap-2 bg-white p-2 rounded-xs border academic-hairline">
                <span className="font-semibold text-[#92400E] shrink-0">单模块专项加购：</span>
                <span>8,000 – 18,000元（如独立学术文书打磨、博士研究提案评阅、签证申诉单项）</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t academic-hairline text-[11px] text-[#A8A29E]">
            初诊 45 分钟学术背景诊断完全免费，出具结构化《方案报价单》后再行决策。
          </div>
        </div>

        {/* Block 2: What is NOT Included */}
        <div className="bg-[#FEF2F2]/60 p-5 rounded-sm border border-[#FCA5A5]/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626] mb-3">
              <XCircle className="w-4 h-4" />
              <span>2. 严正声明：以下第三方规费【不包含】</span>
            </div>
            <p className="text-xs text-[#7F1D1D] leading-relaxed mb-4">
              为杜绝行业内“低报价揽客后以各项名义乱加收”的恶疾，书院承诺绝不代收以下由官方硬性收取的款项：
            </p>
            <ul className="space-y-1.5 text-xs text-[#991B1B]">
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">×</span>
                <span>海外大学官方申请费 (Application Fee: 每所约 50–150 美元/英镑)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">×</span>
                <span>使领馆签证费及体检费 (例如英国签证费与 IHS 医疗附加费)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">×</span>
                <span>官方语言与标化考试报名费 (托福、雅思、GRE、SAT官方报名费)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">×</span>
                <span>第三方学历认证与公证费 (WES 认证、学信网报告、派出所亲属公证)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">×</span>
                <span>个人往返国际机票、海外校外公寓租赁定金与生活开支</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FCA5A5]/30 text-[11px] text-[#B91C1C]">
            所有官方规费均由家庭使用自身外币信用卡在大学与使馆官网直接支付，保障财产绝对安全。
          </div>
        </div>

        {/* Block 3: Refund & Exit Policy */}
        <div className="bg-[#F0FDF4]/70 p-5 rounded-sm border border-[#86EFAC]/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#15803D] mb-3">
              <ShieldAlert className="w-4 h-4" />
              <span>3. 合同终止与分阶段退费准则</span>
            </div>
            <p className="text-xs text-[#166534] leading-relaxed mb-3">
              签约前将《服务协议争议解决与退费比例表》作为独立附件供家长审阅：
            </p>
            <div className="space-y-2 text-xs text-[#14532D]">
              <div className="bg-white p-2.5 rounded-xs border border-[#86EFAC]/40">
                <span className="font-semibold block text-[#15803D]">冷静期全额撤销：</span>
                <span>自签署之日起 72 小时内，未启动实质性文书与选校大纲前，家庭享有无条件全额解约权。</span>
              </div>
              <div className="bg-white p-2.5 rounded-xs border border-[#86EFAC]/40">
                <span className="font-semibold block text-[#15803D]">分阶段里程碑核算：</span>
                <span>如因学生个人原因（如决定保研或放弃留学）中途终止，按已交付里程碑实报实销，结余款项 7 个工作日退还。</span>
              </div>
              <div className="bg-white p-2.5 rounded-xs border border-[#86EFAC]/40">
                <span className="font-semibold block text-[#15803D]">全额赔付兜底责任：</span>
                <span>因书院导师过失导致漏申、延误批次且经双方认定属实者，无条件退还全部对应服务费。</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#86EFAC]/40 text-[11px] text-[#166534]">
            提供国家合规增值税专用发票 / 普通发票，法律权责经中国大陆律所全面审验。
          </div>
        </div>
      </div>
    </div>
  );
};

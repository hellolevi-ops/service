import React from 'react';
import { Users2, ShieldCheck, Clock, FileText, Check } from 'lucide-react';

interface ParentReadableBlockProps {
  feeLogicTitle?: string;
  feeLogicDesc?: string;
  boundaryTitle?: string;
  boundaryPoints?: string[];
  syncMethodTitle?: string;
  syncMethodDesc?: string;
}

export const ParentReadableBlock: React.FC<ParentReadableBlockProps> = ({
  feeLogicTitle = "费用构成与计费逻辑公约",
  feeLogicDesc = "博研书院全线服务采取公开透明的因子定损制。绝不在签约后巧立名目加收‘名校溢价’、‘文书加急费’或‘海外沟通渠道费’。所有使领馆规费、第三方公证与考试报名费均由家庭直接向官方机构缴纳，书院不设资金池。",
  boundaryTitle = "服务边界与严正合规底线",
  boundaryPoints = [
    "坚决拒绝‘内部关系保录’虚假承诺：所有录取均建立在学员硬核学术背景与合规文书之上",
    "网申账号密码完全对学员与家长透明共享，任何递交均有官方系统邮件留痕回执",
    "如因书院顾问主观漏申、错报等实质性违约导致失误，全额启动先行赔付退费程序",
    "提供正式服务协议与机打增值税发票，保障家庭合法消费权益"
  ],
  syncMethodTitle = "家长进度双向同步机制",
  syncMethodDesc = "我们深知低龄及本科留学是全家庭的重要决策。书院专设企微三方协同沟通组，双周推送《学业与申请备忘录 (Academic Progress Memo)》，关键选校定选节点召开线上/线下家庭决策会，确保父母随时洞悉进度而不造成对孩子文书自主性的过度干预。"
}) => {
  return (
    <div className="bg-[#FAF8F5] border academic-hairline p-6 sm:p-8 rounded-sm my-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#92400E]/5 rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 pb-4 mb-6 border-b academic-hairline">
        <div className="w-8 h-8 rounded-xs bg-[#78350F] text-[#FBF9F5] flex items-center justify-center">
          <Users2 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-serif-title font-bold text-[#1C1917]">
            致家长：理性、透明与安全决策三件套
          </h3>
          <p className="text-xs text-[#78716C]">
            针对中国大陆家庭共同决策特点定制的权责明细与协同公约
          </p>
        </div>
      </div>

      {/* 3 Columns / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Fee Logic */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
            <FileText className="w-4 h-4" />
            <span>{feeLogicTitle}</span>
          </div>
          <p className="text-xs text-[#57534E] leading-relaxed">
            {feeLogicDesc}
          </p>
        </div>

        {/* 2. Boundary */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
            <ShieldCheck className="w-4 h-4" />
            <span>{boundaryTitle}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#57534E]">
            {boundaryPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5 leading-snug">
                <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Sync Method */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
            <Clock className="w-4 h-4" />
            <span>{syncMethodTitle}</span>
          </div>
          <p className="text-xs text-[#57534E] leading-relaxed">
            {syncMethodDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

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
  feeLogicTitle = "费用构成与透明收费公约",
  feeLogicDesc = "青藤国际全线服务采取公开透明的收费标准。绝不在签约后巧立名目加收‘名校溢价’、‘文书加急费’或‘渠道费’。所有使领馆规费、第三方公证与考试报名费均由家庭直接向官方机构缴纳，机构不设任何资金截留池。",
  boundaryTitle = "服务边界与合规底线",
  boundaryPoints = [
    "坚决拒绝‘内部关系保录’虚假噱头：所有录取均建立在学员硬核学术背景与合规文书之上",
    "网申账号密码完全对学员与家长透明共享，任何递交均有官方系统邮件留痕回执",
    "如因顾问主观漏申、错报等实质性过失，全额启动先行退费程序",
    "提供正规留学服务合同与增值税发票，全面保障家庭合法消费权益"
  ],
  syncMethodTitle = "家长进度全程同步机制",
  syncMethodDesc = "我们深知出国留学是全家庭的重要投资决策。专设微信协同沟通群，定期同步学业与申请进展，关键选校定选节点召开线上/线下家庭决策会，确保父母随时知晓进度，踏实放心。"
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

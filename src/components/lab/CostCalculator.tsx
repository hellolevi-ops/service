import React, { useState } from 'react';
import { Calculator, DollarSign, Info, ShieldCheck, ArrowRight } from 'lucide-react';

export const CostCalculator: React.FC = () => {
  const [regionKey, setRegionKey] = useState<'uk-lon' | 'uk-other' | 'us-priv' | 'us-pub' | 'hk' | 'sg'>('uk-lon');
  const [degreeLevel, setDegreeLevel] = useState<'master' | 'bachelor'>('master');
  const [livingStyle, setLivingStyle] = useState<'standard' | 'economy' | 'comfort'>('standard');

  // Baseline data in local currency & RMB conversion (2026/2027 estimates)
  const presets = {
    'uk-lon': {
      name: '英国 · 伦敦地区 (IC / UCL / LSE / KCL)',
      curr: 'GBP (£)',
      rate: 9.35,
      tuition: degreeLevel === 'master' ? 32000 : 28000,
      rentYear: livingStyle === 'economy' ? 12000 : livingStyle === 'standard' ? 16500 : 23000,
      livingYear: livingStyle === 'economy' ? 6500 : livingStyle === 'standard' ? 8500 : 12000,
      officialFees: 1266, // IHS £776 + Visa £490
      notes: '伦敦 Zone 1–2 学生公寓租金是主要变量，商科理科学费普遍高出人文社科 25% 左右。'
    },
    'uk-other': {
      name: '英国 · 非伦敦地区 (爱丁堡 / 曼彻斯特 / 布里斯托)',
      curr: 'GBP (£)',
      rate: 9.35,
      tuition: degreeLevel === 'master' ? 29000 : 26000,
      rentYear: livingStyle === 'economy' ? 8500 : livingStyle === 'standard' ? 11500 : 16000,
      livingYear: livingStyle === 'economy' ? 5000 : livingStyle === 'standard' ? 7000 : 9500,
      officialFees: 1266,
      notes: '非伦敦地区住宿性价比显著提高，爱丁堡与曼大等罗素名校年总预算可稳健控制在 40 万元内。'
    },
    'us-priv': {
      name: '美国 · 顶尖私立名校 (常春藤 / 芝加哥 / 哥大 / NYU)',
      curr: 'USD ($)',
      rate: 7.25,
      tuition: degreeLevel === 'master' ? 64000 : 66000,
      rentYear: livingStyle === 'economy' ? 16000 : livingStyle === 'standard' ? 22000 : 30000,
      livingYear: livingStyle === 'economy' ? 10000 : livingStyle === 'standard' ? 14000 : 19000,
      officialFees: 900, // SEVIS fee + F-1 visa fee + insurance
      notes: '私立常春藤学费每年上调 3–5%，波士顿与纽约大都会区租房与餐饮开支处于全美最高阶梯。'
    },
    'us-pub': {
      name: '美国 · 顶尖公立院校 (UC加州大学系统 / 密歇根 / 华盛顿)',
      curr: 'USD ($)',
      rate: 7.25,
      tuition: degreeLevel === 'master' ? 46000 : 49000,
      rentYear: livingStyle === 'economy' ? 13000 : livingStyle === 'standard' ? 18000 : 24000,
      livingYear: livingStyle === 'economy' ? 9000 : livingStyle === 'standard' ? 12000 : 16000,
      officialFees: 900,
      notes: '国际生按非加州居民学费 (Non-resident tuition) 计费，加州生活费较中部五大湖地区高出约 30%。'
    },
    'hk': {
      name: '中国香港 · 港前三 (港大 / 中大 / 科大)',
      curr: 'HKD (HK$)',
      rate: 0.93,
      tuition: degreeLevel === 'master' ? 240000 : 180000,
      rentYear: livingStyle === 'economy' ? 75000 : livingStyle === 'standard' ? 100000 : 140000,
      livingYear: livingStyle === 'economy' ? 45000 : livingStyle === 'standard' ? 60000 : 80000,
      officialFees: 3000, // Visa & processing
      notes: '非本地硕士无宿舍保障，通常需合租沙田、红磡或西环私人公寓，商科学费近年涨幅较快。'
    },
    'sg': {
      name: '新加坡 · 新国立 NUS / 南洋理工 NTU',
      curr: 'SGD (S$)',
      rate: 5.40,
      tuition: degreeLevel === 'master' ? 42000 : 36000,
      rentYear: livingStyle === 'economy' ? 12000 : livingStyle === 'standard' ? 16000 : 22000,
      livingYear: livingStyle === 'economy' ? 8000 : livingStyle === 'standard' ? 11000 : 15000,
      officialFees: 600, // Student pass & medical
      notes: '新加坡租房市场受政府建屋局（HDB）与公寓（Condo）规制，合租租金处于亚太高位。'
    }
  };

  const current = presets[regionKey];
  const totalLocal = current.tuition + current.rentYear + current.livingYear + current.officialFees;
  const totalRMB = Math.round(totalLocal * current.rate);
  const bufferRMB = Math.round(totalRMB * 0.06); // 6% safety buffer for FX & unforeseen
  const grandTotalRMB = totalRMB + bufferRMB;

  return (
    <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm shadow-xs">
      <div className="flex items-center gap-2 pb-4 mb-6 border-b academic-hairline">
        <Calculator className="w-5 h-5 text-[#92400E]" />
        <div>
          <h3 className="text-lg sm:text-xl font-serif-title font-bold text-[#1C1917]">
            留学全成本与投资回报粗算器 (Cost & Budget Estimator)
          </h3>
          <p className="text-xs text-[#78716C]">
            依据 2026/2027 官方最新学费表、留学生公寓指数与当前汇率精确测算
          </p>
        </div>
      </div>

      {/* Control selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs">
        <div>
          <label className="block font-semibold text-[#44403C] mb-1.5">目标国家与地区档次</label>
          <select
            value={regionKey}
            onChange={(e) => setRegionKey(e.target.value as any)}
            className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] font-medium"
          >
            <option value="uk-lon">英国 · 伦敦地区 (IC / UCL / LSE)</option>
            <option value="uk-other">英国 · 非伦敦地区 (爱丁堡 / 曼大 / 布大)</option>
            <option value="us-priv">美国 · 顶尖私立名校 (常春藤 / 哥大 / NYU)</option>
            <option value="us-pub">美国 · 顶尖公立大学 (UC伯克利 / UCLA / 密歇根)</option>
            <option value="hk">中国香港 · 港前三 (港大 / 中大 / 科大)</option>
            <option value="sg">新加坡 · 新国立 NUS / 南洋理工 NTU</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-[#44403C] mb-1.5">攻读学段</label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setDegreeLevel('master')}
              className={`py-2 text-center rounded-xs transition-colors ${degreeLevel === 'master' ? 'bg-[#1C1917] text-white font-medium' : 'bg-[#FBF9F5] border academic-hairline text-[#57534E]'}`}
            >
              硕士研究生 (1-2年)
            </button>
            <button
              onClick={() => setDegreeLevel('bachelor')}
              className={`py-2 text-center rounded-xs transition-colors ${degreeLevel === 'bachelor' ? 'bg-[#1C1917] text-white font-medium' : 'bg-[#FBF9F5] border academic-hairline text-[#57534E]'}`}
            >
              本科直申 (3-4年)
            </button>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-[#44403C] mb-1.5">住宿与生活风格标准</label>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setLivingStyle('economy')}
              className={`py-2 text-center rounded-xs transition-colors ${livingStyle === 'economy' ? 'bg-[#92400E] text-white font-medium' : 'bg-[#FBF9F5] border academic-hairline text-[#57534E]'}`}
            >
              适度精简
            </button>
            <button
              onClick={() => setLivingStyle('standard')}
              className={`py-2 text-center rounded-xs transition-colors ${livingStyle === 'standard' ? 'bg-[#92400E] text-white font-medium' : 'bg-[#FBF9F5] border academic-hairline text-[#57534E]'}`}
            >
              标配标准
            </button>
            <button
              onClick={() => setLivingStyle('comfort')}
              className={`py-2 text-center rounded-xs transition-colors ${livingStyle === 'comfort' ? 'bg-[#92400E] text-white font-medium' : 'bg-[#FBF9F5] border academic-hairline text-[#57534E]'}`}
            >
              宽裕独立
            </button>
          </div>
        </div>
      </div>

      {/* Calculated Breakdown Display */}
      <div className="bg-[#FAF8F5] border academic-hairline p-6 rounded-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 mb-5 border-b academic-hairline gap-2">
          <div>
            <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block">
              TOTAL ESTIMATED ANNUAL BUDGET (CNY)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-serif-title font-bold text-[#92400E]">
                ¥ {grandTotalRMB.toLocaleString()}
              </span>
              <span className="text-xs text-[#78716C]">
                元人民币 / 年 (折合 {current.curr} {totalLocal.toLocaleString()})
              </span>
            </div>
          </div>
          <span className="text-xs text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1 rounded-xs font-medium self-start sm:self-auto">
            包含 6% 汇率与突发冗余安全池
          </span>
        </div>

        {/* Breakdown Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
          <div className="bg-white p-3 rounded-xs border academic-hairline">
            <span className="text-[#A8A29E] block text-[11px]">官方基础学费</span>
            <span className="text-sm font-semibold font-mono text-[#1C1917] block mt-0.5">
              {current.curr} {current.tuition.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#78716C]">约 ¥{Math.round(current.tuition * current.rate).toLocaleString()}</span>
          </div>

          <div className="bg-white p-3 rounded-xs border academic-hairline">
            <span className="text-[#A8A29E] block text-[11px]">学生公寓/校外租房</span>
            <span className="text-sm font-semibold font-mono text-[#1C1917] block mt-0.5">
              {current.curr} {current.rentYear.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#78716C]">约 ¥{Math.round(current.rentYear * current.rate).toLocaleString()}</span>
          </div>

          <div className="bg-white p-3 rounded-xs border academic-hairline">
            <span className="text-[#A8A29E] block text-[11px]">日常饮食与交通</span>
            <span className="text-sm font-semibold font-mono text-[#1C1917] block mt-0.5">
              {current.curr} {current.livingYear.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#78716C]">约 ¥{Math.round(current.livingYear * current.rate).toLocaleString()}</span>
          </div>

          <div className="bg-white p-3 rounded-xs border academic-hairline">
            <span className="text-[#A8A29E] block text-[11px]">签证/IHS医疗等硬性规费</span>
            <span className="text-sm font-semibold font-mono text-[#1C1917] block mt-0.5">
              {current.curr} {current.officialFees.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#78716C]">约 ¥{Math.round(current.officialFees * current.rate).toLocaleString()}</span>
          </div>
        </div>

        {/* Region specific guidance note */}
        <div className="text-xs text-[#57534E] flex items-start gap-2 bg-white/70 p-3 rounded-xs border academic-hairline">
          <Info className="w-4 h-4 text-[#92400E] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#1C1917]">学术研判顾问备注：</strong>
            {current.notes}
          </span>
        </div>
      </div>
    </div>
  );
};

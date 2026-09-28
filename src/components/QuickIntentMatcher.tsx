import React, { useState } from 'react';
import { Compass, ArrowRight, ShieldCheck, CheckCircle2, Sliders, Users, FileCheck, Calculator } from 'lucide-react';

interface QuickIntentMatcherProps {
  onGeneratePlan: (planData: {
    track: string;
    degree: string;
    background: string;
    keyConcern: string;
  }) => void;
}

export const QuickIntentMatcher: React.FC<QuickIntentMatcherProps> = ({ onGeneratePlan }) => {
  const [selectedDestination, setSelectedDestination] = useState('uk-pg');
  const [selectedDegree, setSelectedDegree] = useState('master');
  const [selectedBackground, setSelectedBackground] = useState('985_211');
  const [selectedGpa, setSelectedGpa] = useState('gpa_85');
  const [selectedConcern, setSelectedConcern] = useState('list_match');

  const destinations = [
    { id: 'uk-pg', label: '英国留学 (牛剑/G5/罗素)', flag: '🇬🇧' },
    { id: 'us-ug', label: '美国留学 (Top30/常春藤)', flag: '🇺🇸' },
    { id: 'hk-sg', label: '中国香港 & 新加坡名校', flag: '🇭🇰' },
    { id: 'aus-can', label: '澳洲八大 & 加拿大名校', flag: '🇦🇺' },
    { id: 'arts', label: '艺术设计 & 建筑空间', flag: '🎨' },
    { id: 'k12', label: '低龄国际高中 & 寄宿', flag: '🏫' },
  ];

  const degrees = [
    { id: 'master', label: '硕士研究生 (授课型 / 研究型)' },
    { id: 'bachelor', label: '本科直接申请 / 本科转学' },
    { id: 'phd', label: '海外博士申请 & 全额奖学金' },
    { id: 'k12', label: '初高中留学 / 国际学校衔接' },
  ];

  const backgrounds = [
    { id: '985_211', label: '985 / 211 重点高校' },
    { id: 'double_non_high', label: '双非重点一本院校 (排名前200)' },
    { id: 'double_non_std', label: '普通本科院校 / 独立学院' },
    { id: 'overseas', label: '海外本科 (美本 / 英本 / 加本 / 澳本)' },
    { id: 'international_k12', label: '国际高中 (IB / AP / A-Level)' },
  ];

  const gpaRanges = [
    { id: 'gpa_88', label: '均分 88+ / GPA 3.8+' },
    { id: 'gpa_85', label: '均分 85–87 / GPA 3.5–3.7' },
    { id: 'gpa_80', label: '均分 80–84 / GPA 3.0–3.4' },
    { id: 'gpa_below', label: '均分 80 以下 (需特殊选校)' },
  ];

  const concerns = [
    { id: 'list_match', label: '院校内部认可名单 (List) 与录取线' },
    { id: 'sop_story', label: '1对1定制文书，拒绝流水线模板' },
    { id: 'breakthrough', label: '跨专业申请 / 核心先修课如何补' },
    { id: 'full_cycle', label: '全流程透明，网申账号密码自己管' },
  ];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePlan({
      track: selectedDestination,
      degree: selectedDegree,
      background: selectedBackground,
      keyConcern: selectedConcern,
    });
  };

  return (
    <div className="bg-[#FFFFFF] border academic-hairline p-5 sm:p-7 rounded-sm shadow-md relative overflow-hidden">
      {/* 头部标题区 */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b academic-hairline">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1C1917] flex items-center gap-1.5 font-sans">
              <Calculator className="w-4 h-4 text-[#92400E]" />
              名校录取概率快速自测
            </h3>
            <p className="text-[11px] text-[#78716C] mt-0.5">
              30秒勾选学业背景 · 免费获取 2026/2027 梯队选校建议
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-[#EDE7DC] text-[#78350F] rounded-xs font-semibold">
          名师1对1诊断
        </span>
      </div>

      <form onSubmit={handleStart} className="space-y-4 text-xs">
        {/* 1. 目标国家 */}
        <div>
          <label className="block text-[#44403C] font-semibold mb-1.5 flex items-center justify-between">
            <span>1. 目标留学国家 / 地区</span>
            <span className="text-[11px] text-[#78716C] font-normal">点击直接选择</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {destinations.map((d) => (
              <button
                type="button"
                key={d.id}
                onClick={() => setSelectedDestination(d.id)}
                className={`py-2 px-2 text-left rounded-xs transition-all border flex items-center gap-1.5 cursor-pointer ${
                  selectedDestination === d.id
                    ? 'bg-[#1C1917] text-white border-[#1C1917] font-semibold shadow-2xs'
                    : 'bg-[#FBF9F5] text-[#44403C] border-stone-200 hover:bg-[#F5F2EB]'
                }`}
              >
                <span>{d.flag}</span>
                <span className="truncate text-[11px]">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. 攻读学历 & 目前学校 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[#44403C] font-semibold mb-1">
              2. 目标攻读阶段
            </label>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] font-medium focus:border-[#92400E] focus:outline-none cursor-pointer"
            >
              {degrees.map((deg) => (
                <option key={deg.id} value={deg.id}>{deg.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#44403C] font-semibold mb-1">
              3. 当前就读学校类型
            </label>
            <select
              value={selectedBackground}
              onChange={(e) => setSelectedBackground(e.target.value)}
              className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] font-medium focus:border-[#92400E] focus:outline-none cursor-pointer"
            >
              {backgrounds.map((bg) => (
                <option key={bg.id} value={bg.id}>{bg.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. GPA 均分段 */}
        <div>
          <label className="block text-[#44403C] font-semibold mb-1">
            4. 当前平时均分 / GPA
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {gpaRanges.map((g) => (
              <button
                type="button"
                key={g.id}
                onClick={() => setSelectedGpa(g.id)}
                className={`py-1.5 px-2 text-center rounded-xs transition-all border text-[11px] cursor-pointer ${
                  selectedGpa === g.id
                    ? 'bg-[#92400E] text-white border-[#92400E] font-semibold'
                    : 'bg-[#FBF9F5] text-[#57534E] border-stone-200 hover:bg-[#F5F2EB]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. 最关心的重点 */}
        <div>
          <label className="block text-[#44403C] font-semibold mb-1">
            5. 您目前最关心哪一方面？
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {concerns.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => setSelectedConcern(c.id)}
                className={`py-2 px-2.5 text-left rounded-xs transition-colors border text-[11px] truncate cursor-pointer ${
                  selectedConcern === c.id
                    ? 'bg-[#EDE7DC] text-[#78350F] border-[#B45309] font-semibold'
                    : 'bg-[#FBF9F5] text-[#57534E] border-stone-200 hover:bg-[#F5F2EB]'
                }`}
              >
                {selectedConcern === c.id ? '✓ ' : '○ '} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* 提交按钮与承诺 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 bg-[#92400E] hover:bg-[#78350F] text-[#FBF9F5] font-semibold text-xs sm:text-sm rounded-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>免费获取量身定制方案 & 测算录取率</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#78716C] px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              完全免费 · 绝无推销电话骚扰
            </span>
            <span className="text-[#059669] font-medium">
              资深导师 15 分钟内专业答复
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { Calculator, Info, ShieldCheck } from "lucide-react";

export const CostCalculator: React.FC = () => {
  const [regionKey, setRegionKey] = useState<
    "uk-lon" | "uk-other" | "us-priv" | "us-pub" | "hk" | "sg"
  >("uk-lon");
  const [degreeLevel, setDegreeLevel] = useState<"master" | "bachelor">("master");
  const [livingStyle, setLivingStyle] = useState<"standard" | "economy" | "comfort">("standard");

  // Baseline data in local currency & RMB conversion (2026/2027 estimates)
  const presets = {
    "uk-lon": {
      name: "英国 · 伦敦地区 (IC / UCL / LSE / KCL)",
      curr: "GBP (£)",
      rate: 9.35,
      tuition: degreeLevel === "master" ? 32000 : 28000,
      rentYear: livingStyle === "economy" ? 12000 : livingStyle === "standard" ? 16500 : 23000,
      livingYear: livingStyle === "economy" ? 6500 : livingStyle === "standard" ? 8500 : 12000,
      officialFees: 1266, // IHS £776 + Visa £490
      notes: "伦敦 Zone 1–2 学生公寓租金是主要变量，商科理科学费普遍高出人文社科 25% 左右。",
    },
    "uk-other": {
      name: "英国 · 伦敦以外地区 (爱丁堡 / 曼彻斯特 / 布里斯托)",
      curr: "GBP (£)",
      rate: 9.35,
      tuition: degreeLevel === "master" ? 29000 : 26000,
      rentYear: livingStyle === "economy" ? 8500 : livingStyle === "standard" ? 11500 : 16000,
      livingYear: livingStyle === "economy" ? 5000 : livingStyle === "standard" ? 7000 : 9500,
      officialFees: 1266,
      notes: "伦敦以外地区住宿性价比显著提高，爱丁堡与曼大等罗素名校年总预算可稳健控制在 40 万元内。",
    },
    "us-priv": {
      name: "美国 · 顶尖私立名校 (常春藤 / 芝加哥 / 哥大 / NYU)",
      curr: "USD ($)",
      rate: 7.25,
      tuition: degreeLevel === "master" ? 64000 : 66000,
      rentYear: livingStyle === "economy" ? 16000 : livingStyle === "standard" ? 22000 : 30000,
      livingYear: livingStyle === "economy" ? 10000 : livingStyle === "standard" ? 14000 : 19000,
      officialFees: 900, // SEVIS fee + F-1 visa fee + insurance
      notes: "私立常春藤学费每年上调 3–5%，波士顿与纽约大都会区租房与餐饮开支处于全美最高阶梯。",
    },
    "us-pub": {
      name: "美国 · 顶尖公立院校 (UC加州大学系统 / 密歇根 / 华盛顿)",
      curr: "USD ($)",
      rate: 7.25,
      tuition: degreeLevel === "master" ? 46000 : 49000,
      rentYear: livingStyle === "economy" ? 13000 : livingStyle === "standard" ? 18000 : 24000,
      livingYear: livingStyle === "economy" ? 9000 : livingStyle === "standard" ? 12000 : 16000,
      officialFees: 900,
      notes: "国际生按外州居民学费标准计费，加州生活费较中部五大湖地区高出约 30%。",
    },
    hk: {
      name: "中国香港 · 港前三 (港大 / 中大 / 科大)",
      curr: "HKD (HK$)",
      rate: 0.93,
      tuition: degreeLevel === "master" ? 240000 : 180000,
      rentYear: livingStyle === "economy" ? 75000 : livingStyle === "standard" ? 100000 : 140000,
      livingYear: livingStyle === "economy" ? 45000 : livingStyle === "standard" ? 60000 : 80000,
      officialFees: 3000,
      notes: "海外硕士通常需合租私人公寓（公立宿舍资源有限），商科与计算机学费近年微调较快。",
    },
    sg: {
      name: "新加坡 · 新国立 NUS / 南洋理工 NTU",
      curr: "SGD (S$)",
      rate: 5.4,
      tuition: degreeLevel === "master" ? 42000 : 36000,
      rentYear: livingStyle === "economy" ? 12000 : livingStyle === "standard" ? 16000 : 22000,
      livingYear: livingStyle === "economy" ? 8000 : livingStyle === "standard" ? 11000 : 15000,
      officialFees: 600,
      notes: "新加坡租房市场受政策调控，合租租金处于亚太主要留学城市前列。",
    },
  };

  const current = presets[regionKey];
  const totalLocal = current.tuition + current.rentYear + current.livingYear + current.officialFees;
  const totalRMB = Math.round(totalLocal * current.rate);
  const bufferRMB = Math.round(totalRMB * 0.06); // 6% safety buffer for FX & unforeseen
  const grandTotalRMB = totalRMB + bufferRMB;

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs">
      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-editorial-title">
            留学全周期成本测算器 (Cost & Budget Estimator)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            依据 2026/2027 官方最新公布学费、学生公寓租房指数与实时汇率测算
          </p>
        </div>
      </div>

      {/* Control selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">目标国家与地区</label>
          <select
            value={regionKey}
            onChange={(e) => setRegionKey(e.target.value as typeof regionKey)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:bg-white focus:border-slate-400 focus:outline-none transition-all cursor-pointer"
          >
            <option value="uk-lon">英国 · 伦敦地区 (IC / UCL / LSE)</option>
            <option value="uk-other">英国 · 伦敦以外地区 (爱丁堡 / 曼大 / 布大)</option>
            <option value="us-priv">美国 · 顶尖私立名校 (常春藤 / 哥大 / NYU)</option>
            <option value="us-pub">美国 · 顶尖公立大学 (UC伯克利 / UCLA / 密歇根)</option>
            <option value="hk">中国香港 · 港前三 (港大 / 中大 / 科大)</option>
            <option value="sg">新加坡 · 新国立 NUS / 南洋理工 NTU</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">攻读学段</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDegreeLevel("master")}
              className={`py-2 text-center rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                degreeLevel === "master"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200"
              }`}
            >
              硕士 (1–2年)
            </button>
            <button
              type="button"
              onClick={() => setDegreeLevel("bachelor")}
              className={`py-2 text-center rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                degreeLevel === "bachelor"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200"
              }`}
            >
              本科直申 (3–4年)
            </button>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">住宿生活档次</label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setLivingStyle("economy")}
              className={`py-2 text-center rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                livingStyle === "economy"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200"
              }`}
            >
              精简适度
            </button>
            <button
              type="button"
              onClick={() => setLivingStyle("standard")}
              className={`py-2 text-center rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                livingStyle === "standard"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200"
              }`}
            >
              标配标准
            </button>
            <button
              type="button"
              onClick={() => setLivingStyle("comfort")}
              className={`py-2 text-center rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                livingStyle === "comfort"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200"
              }`}
            >
              宽裕独立
            </button>
          </div>
        </div>
      </div>

      {/* Calculated Breakdown Display */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              TOTAL ESTIMATED ANNUAL BUDGET (CNY)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-editorial-title tabular-nums">
                ¥ {grandTotalRMB.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                元人民币 / 年 (折合 {current.curr} {totalLocal.toLocaleString()})
              </span>
            </div>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-[3px] font-semibold self-start sm:self-auto flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            包含 6% 汇率与突发冗余安全池
          </span>
        </div>

        {/* Breakdown Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-slate-400 block text-xs">官方基础学费</span>
            <span className="text-base font-bold font-mono text-slate-900 block mt-1">
              {current.curr} {current.tuition.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              约 ¥{Math.round(current.tuition * current.rate).toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-slate-400 block text-xs">学生公寓/校外租房</span>
            <span className="text-base font-bold font-mono text-slate-900 block mt-1">
              {current.curr} {current.rentYear.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              约 ¥{Math.round(current.rentYear * current.rate).toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-slate-400 block text-xs">日常饮食与交通</span>
            <span className="text-base font-bold font-mono text-slate-900 block mt-1">
              {current.curr} {current.livingYear.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              约 ¥{Math.round(current.livingYear * current.rate).toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-slate-400 block text-xs">签证/IHS医疗等硬性规费</span>
            <span className="text-base font-bold font-mono text-slate-900 block mt-1">
              {current.curr} {current.officialFees.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              约 ¥{Math.round(current.officialFees * current.rate).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Region specific guidance note */}
        <div className="text-xs text-slate-600 flex items-start gap-2.5 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-900">学术顾问实地备注：</strong>
            {current.notes}
          </span>
        </div>
      </div>
    </div>
  );
};

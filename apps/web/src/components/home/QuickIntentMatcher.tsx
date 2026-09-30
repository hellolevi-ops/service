"use client";

import React, { useState, useMemo } from "react";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";

interface QuickIntentMatcherProps {
  onGeneratePlan: (planData: {
    track: string;
    degree: string;
    background: string;
    keyConcern: string;
  }) => void;
}

export const QuickIntentMatcher: React.FC<QuickIntentMatcherProps> = ({ onGeneratePlan }) => {
  const [selectedDestination, setSelectedDestination] = useState("uk-pg");
  const [selectedDegree, setSelectedDegree] = useState("master");
  const [selectedBackground, setSelectedBackground] = useState("985_211");
  const [selectedGpa, setSelectedGpa] = useState("gpa_85");

  const destinations = [
    { id: "uk-pg", label: "英国 G5 · 罗素" },
    { id: "us-ug", label: "美国 Top30 · 藤校" },
    { id: "hk-sg", label: "中国香港 & 新加坡" },
    { id: "aus-can", label: "澳洲八大 · 加拿大" },
    { id: "arts", label: "艺术与空间设计" },
    { id: "phd", label: "海外博士 · 全奖" },
  ];

  const degrees = [
    { id: "master", label: "硕士 (Master)" },
    { id: "bachelor", label: "本科 (Undergrad)" },
    { id: "phd", label: "博士 (PhD)" },
  ];

  const backgrounds = [
    { id: "985_211", label: "985 / 211 高校" },
    { id: "double_non_high", label: "双非重点 (前150)" },
    { id: "double_non_std", label: "普通本科" },
    { id: "overseas", label: "海外本科" },
  ];

  const gpaRanges = [
    { id: "gpa_88", label: "均分 88+ / GPA 3.8+" },
    { id: "gpa_85", label: "均分 85–87 / 3.5+" },
    { id: "gpa_80", label: "均分 80–84 / 3.0+" },
    { id: "gpa_below", label: "均分 80 以下" },
  ];

  // Dynamic Matching Logic
  const matchingResult = useMemo(() => {
    if (selectedDestination === "uk-pg") {
      if (selectedBackground === "985_211" && (selectedGpa === "gpa_88" || selectedGpa === "gpa_85")) {
        return {
          tierDream: "牛津大学、剑桥大学、帝国理工学院",
          tierTarget: "伦敦大学学院 (UCL)、爱丁堡大学、KCL",
          tierSafety: "曼彻斯特大学、华威大学、布里斯托大学",
          strategyAdvice: "均分优势突出，重点攻关专业先修课与独立学术研究，第一轮次尽早投递以抢占名额。",
        };
      } else if (selectedBackground === "double_non_high") {
        return {
          tierDream: "帝国理工学院 (部分系)、伦敦大学学院 (UCL)",
          tierTarget: "爱丁堡大学、曼彻斯特大学、华威大学",
          tierSafety: "格拉斯哥大学、伯明翰大学、南安普顿大学",
          strategyAdvice: "严格对照院系内部认可名单（List），针对性选择入围院系，匹配高认可度学科交叉突围。",
        };
      } else {
        return {
          tierDream: "伦敦大学学院 (UCL)、爱丁堡大学",
          tierTarget: "布里斯托大学、南安普顿大学、格拉斯哥大学",
          tierSafety: "谢菲尔德大学、利兹大学、诺丁汉大学",
          strategyAdvice: "双非背景建议通过学术课题科研与高质量推荐信突围，选择竞争相对温和的学科方向。",
        };
      }
    } else if (selectedDestination === "us-ug") {
      return {
        tierDream: "哥伦比亚大学、康奈尔大学、约翰霍普金斯大学",
        tierTarget: "纽约大学、南加州大学、密歇根大学安娜堡分校",
        tierSafety: "加州大学尔湾/戴维斯分校、波士顿大学",
        strategyAdvice: "美本美硕申请注重学术软实力与个性化叙事主轴，由常春藤硕博导师与前招生官1对1挖掘文书亮点。",
      };
    } else if (selectedDestination === "hk-sg") {
      return {
        tierDream: "新加坡国立大学 (NUS)、香港大学 (HKU)",
        tierTarget: "南洋理工大学 (NTU)、香港中文大学 (CUHK)",
        tierSafety: "香港科技大学 (HKUST)、香港城市大学",
        strategyAdvice: "港新先到先得且面试权重高，建议尽早考出语言，提前展开全真英文学术面试演练。",
      };
    } else {
      return {
        tierDream: "墨尔本大学、悉尼大学、多伦多大学",
        tierTarget: "新南威尔士大学、英属哥伦比亚大学 (UBC)",
        tierSafety: "莫纳什大学、麦吉尔大学、麦克马斯特大学",
        strategyAdvice: "准确核算加权均分与算术均分差异，把关先修课匹配，搭配高额奖学金规划。",
      };
    }
  }, [selectedDestination, selectedBackground, selectedGpa]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePlan({
      track: selectedDestination,
      degree: selectedDegree,
      background: selectedBackground,
      keyConcern: "profile_assessment",
    });
  };

  return (
    <div className="bg-white border border-slate-300 rounded-xl shadow-xs overflow-hidden text-slate-800">
      {/* 头部面板 */}
      <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white font-editorial-title">
              名校录取定位与匹配测评
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            历年录取标准与认可名单（List）实时推演
          </p>
        </div>
        <span className="hidden sm:inline-block text-xs font-mono text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-[3px] border border-amber-300/30">
          LIVE MATCH
        </span>
      </div>

      <form onSubmit={handleStart} className="p-5 sm:p-6 space-y-4 text-xs">
        {/* 1. 目标国家/地区 */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1.5">
            1. 目标留学国家 / 地区
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {destinations.map((d) => (
              <button
                type="button"
                key={d.id}
                onClick={() => setSelectedDestination(d.id)}
                className={`py-2 px-2.5 text-left rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                  selectedDestination === d.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="truncate block">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. 目标学位与目前背景 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              2. 目标攻读阶段
            </label>
            <div className="space-y-1.5">
              {degrees.map((deg) => (
                <button
                  type="button"
                  key={deg.id}
                  onClick={() => setSelectedDegree(deg.id)}
                  className={`w-full py-1.5 px-2.5 text-left rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                    selectedDegree === deg.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate block">{deg.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              3. 当前高校层次
            </label>
            <div className="space-y-1.5">
              {backgrounds.map((bg) => (
                <button
                  type="button"
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={`w-full py-1.5 px-2.5 text-left rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                    selectedBackground === bg.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate block">{bg.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. GPA 均分档位 */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1.5">
            4. 当前平时均分 / GPA 档位
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {gpaRanges.map((g) => (
              <button
                type="button"
                key={g.id}
                onClick={() => setSelectedGpa(g.id)}
                className={`py-2 px-1.5 text-center rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                  selectedGpa === g.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 实时推演匹配卡片 */}
        <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 space-y-2 mt-2">
          <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-200 font-mono">
            <span className="font-bold text-slate-900">推演录取梯度预估</span>
            <span className="text-slate-500">官方历年录取数据比对</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-rose-700 w-16 shrink-0">冲刺梯队</span>
              <span className="text-slate-800 font-medium">{matchingResult.tierDream}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-slate-900 w-16 shrink-0">核心梯队</span>
              <span className="text-slate-800 font-medium">{matchingResult.tierTarget}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-emerald-700 w-16 shrink-0">稳健保底</span>
              <span className="text-slate-800 font-medium">{matchingResult.tierSafety}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 pt-1.5 border-t border-slate-200 leading-relaxed">
            <strong className="text-slate-800">导师初诊提示：</strong>
            {matchingResult.strategyAdvice}
          </p>
        </div>

        {/* 提交按钮 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>预约海外名校导师解读该方案</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>

          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              完全免费 · 仅用于预约沟通
            </span>
            <span>博导团队 15 分钟内专业答复</span>
          </div>
        </div>
      </form>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

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
    { id: 'uk-pg', label: '英国 (G5 · 罗素)' },
    { id: 'us-ug', label: '美国 (Top30 · 藤校)' },
    { id: 'hk-sg', label: '中国香港 & 新加坡' },
    { id: 'aus-can', label: '澳洲八大 · 加拿大' },
    { id: 'arts', label: '艺术与空间设计' },
    { id: 'phd', label: '海外博士 & 全奖' },
  ];

  const degrees = [
    { id: 'master', label: '授课型硕士 (Master)' },
    { id: 'bachelor', label: '名校本科 (直申/转学)' },
    { id: 'phd', label: '海外博士 (PhD全奖)' },
  ];

  const backgrounds = [
    { id: '985_211', label: '985 / 211 高校' },
    { id: 'double_non_high', label: '双非重点 (排名前150)' },
    { id: 'double_non_std', label: '普通本科院校' },
    { id: 'overseas', label: '海外本科 (英/美/澳/加)' },
  ];

  const gpaRanges = [
    { id: 'gpa_88', label: '均分 88+ / GPA 3.8+' },
    { id: 'gpa_85', label: '均分 85–87 / GPA 3.5+' },
    { id: 'gpa_80', label: '均分 80–84 / GPA 3.0+' },
    { id: 'gpa_below', label: '均分 80 以下 (需特殊策略)' },
  ];

  // Dynamic Matching Logic
  const matchingResult = useMemo(() => {
    if (selectedDestination === 'uk-pg') {
      if (selectedBackground === '985_211' && (selectedGpa === 'gpa_88' || selectedGpa === 'gpa_85')) {
        return {
          tierDream: '牛津大学、剑桥大学、帝国理工学院',
          tierTarget: '伦敦大学学院 (UCL)、爱丁堡大学、KCL',
          tierSafety: '曼彻斯特大学、华威大学、布里斯托大学',
          strategyAdvice: '均分优势明显，文书需重点攻关专业先修课与独立研究思考，尽早投递第一轮抢占席位。'
        };
      } else if (selectedBackground === 'double_non_high') {
        return {
          tierDream: '帝国理工学院、伦敦大学学院 (UCL部分学院)',
          tierTarget: '爱丁堡大学、曼彻斯特大学、华威大学',
          tierSafety: '格拉斯哥大学、伯明翰大学、南安普顿大学',
          strategyAdvice: '严格甄别学院内部认可名单（List），选择对双非开放且高认可度的相关学科组合进行精准突围。'
        };
      } else {
        return {
          tierDream: '伦敦大学学院 (UCL)、爱丁堡大学',
          tierTarget: '布里斯托大学、南安普顿大学、格拉斯哥大学',
          tierSafety: '谢菲尔德大学、利兹大学、诺丁汉大学',
          strategyAdvice: '针对非名校名单背景，建议量身定制学术软背景挖掘，避开热门院系内卷，主攻交叉前沿专业。'
        };
      }
    } else if (selectedDestination === 'us-ug') {
      return {
        tierDream: '哥伦比亚大学、康奈尔大学、约翰霍普金斯大学',
        tierTarget: '纽约大学、南加州大学、密歇根安娜堡分校',
        tierSafety: '加州大学尔湾/戴维斯分校、波士顿大学',
        strategyAdvice: '美国申请注重学术软实力与个人经历主轴，建议由前招生官与博导 1对1 挖掘差异化文书亮点。'
      };
    } else if (selectedDestination === 'hk-sg') {
      return {
        tierDream: '新加坡国立大学 (NUS)、香港大学 (HKU)',
        tierTarget: '南洋理工大学 (NTU)、香港中文大学 (CUHK)',
        tierSafety: '香港科技大学 (HKUST)、香港城市大学',
        strategyAdvice: '港新审理节奏快、先到先得，需尽早准备合格语言与对口实习科研经历，提前进行英文全真模拟面试。'
      };
    } else {
      return {
        tierDream: '墨尔本大学、悉尼大学、多伦多大学',
        tierTarget: '新南威尔士大学、英属哥伦比亚大学 (UBC)',
        tierSafety: '莫纳什大学、麦吉尔大学、麦克马斯特大学',
        strategyAdvice: '重点把关均分计算公式（加权与算术）以及院系先修课比对，合理搭配冲刺与高奖学金项目。'
      };
    }
  }, [selectedDestination, selectedBackground, selectedGpa]);

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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md relative overflow-hidden transition-all">
      {/* 头部专业标识 */}
      <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white font-editorial-title">
              名校录取定位与匹配测评
            </h3>
            <span className="text-[11px] text-amber-300 font-medium">
              · 历年录取规程对齐
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            30秒勾选背景，实时推演冲刺/核心/保底院校梯度
          </p>
        </div>

        <span className="hidden sm:inline text-xs text-amber-300 font-mono font-semibold bg-white/10 px-2.5 py-1 rounded">
          LIVE MATCH
        </span>
      </div>

      <form onSubmit={handleStart} className="p-5 sm:p-6 space-y-4 text-xs">
        {/* 1. 目标国家 */}
        <div>
          <label className="block text-slate-800 font-semibold mb-1.5 flex items-center justify-between text-xs">
            <span>1. 目标留学国家 / 地区</span>
            <span className="text-slate-400 font-normal">单选</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {destinations.map((d) => (
              <button
                type="button"
                key={d.id}
                onClick={() => setSelectedDestination(d.id)}
                className={`py-2 px-2.5 text-left rounded-lg transition-all border text-xs cursor-pointer ${
                  selectedDestination === d.id
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="truncate block">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. 攻读学历 & 目前学校 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-800 font-semibold mb-1.5 text-xs">
              2. 目标攻读阶段
            </label>
            <div className="space-y-1.5">
              {degrees.map((deg) => (
                <button
                  type="button"
                  key={deg.id}
                  onClick={() => setSelectedDegree(deg.id)}
                  className={`w-full py-1.5 px-2.5 text-left rounded-lg transition-all border text-xs cursor-pointer ${
                    selectedDegree === deg.id
                      ? 'bg-blue-900 text-white border-blue-900 font-medium'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate block">{deg.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-800 font-semibold mb-1.5 text-xs">
              3. 当前就读本科/高中层次
            </label>
            <div className="space-y-1.5">
              {backgrounds.map((bg) => (
                <button
                  type="button"
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={`w-full py-1.5 px-2.5 text-left rounded-lg transition-all border text-xs cursor-pointer ${
                    selectedBackground === bg.id
                      ? 'bg-blue-900 text-white border-blue-900 font-medium'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate block">{bg.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. GPA 均分段 */}
        <div>
          <label className="block text-slate-800 font-semibold mb-1.5 text-xs">
            4. 当前平时均分 / GPA 档位
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {gpaRanges.map((g) => (
              <button
                type="button"
                key={g.id}
                onClick={() => setSelectedGpa(g.id)}
                className={`py-2 px-2 text-center rounded-lg transition-all border text-xs cursor-pointer ${
                  selectedGpa === g.id
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 实时推演匹配卡片 (Live Match Result Card) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 mt-2">
          <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-200">
            <span className="font-bold text-slate-900">
              实时推演录取梯度预估
            </span>
            <span className="text-slate-500 font-medium">按官方历年录取数据推演</span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-bold text-rose-800 w-16 shrink-0">[冲刺梦校]</span>
              <span className="text-slate-800 font-medium">{matchingResult.tierDream}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-900 w-16 shrink-0">[核心匹配]</span>
              <span className="text-slate-800 font-medium">{matchingResult.tierTarget}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-emerald-800 w-16 shrink-0">[稳健保底]</span>
              <span className="text-slate-800 font-medium">{matchingResult.tierSafety}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 leading-relaxed">
            <strong className="text-slate-700">导师初诊提示：</strong>{matchingResult.strategyAdvice}
          </p>
        </div>

        {/* 提交按钮与承诺 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 hover:bg-blue-950 text-white font-bold text-sm rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>预约专家解读该评估报告与定位方案</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
          
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="text-slate-600">
              完全免费 · 绝无推销骚扰
            </span>
            <span className="text-slate-700 font-medium">
              名校博导团队 15 分钟内专业答复
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

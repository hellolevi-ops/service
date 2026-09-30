import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';

interface AssessmentToolProps {
  onProceedToBooking: (assessmentData: {
    track: string;
    gpa: string;
    bgType: string;
    langScore: string;
    summary: string;
  }) => void;
}

export const AssessmentTool: React.FC<AssessmentToolProps> = ({ onProceedToBooking }) => {
  const [bgType, setBgType] = useState('985/211重点院校');
  const [gpa, setGpa] = useState('86–89分 (或GPA 3.6-3.8)');
  const [langScore, setLangScore] = useState('雅思7.0 / 托福100左右');
  const [targetTrack, setTargetTrack] = useState('uk-pg');
  const [greGmat, setGreGmat] = useState('未准备 / 规划中');
  const [submitted, setSubmitted] = useState(false);

  const calculateResult = () => {
    let tier = '冲刺世界前 30 与英国 G5 具备坚实入围基础';
    let g5Odds = '良好 (先修课匹配至关重要)';
    let riskSignals: string[] = [];
    let diyAdvice: string[] = [];

    if (bgType.includes('双非')) {
      if (gpa.includes('80–85')) {
        tier = '重点冲刺 QS 30–80 罗素集团 / 港前五优势交叉学科';
        g5Odds = '受大学内部 List 严格限制，需精准避开纯商科与高门槛计算机';
        riskSignals.push('大学非名单内直接触碰机筛秒拒红线');
        riskSignals.push('核心专业课学分低于 88 分可能被降档评估');
        diyAdvice.push('立即制作中英文《先修课大纲对应表》，用高阶专业课成绩弥补通识课拖累');
        diyAdvice.push('赶在 9 月第一轮次 (Stage 1) 名额最充裕时完成无语言抢跑递交');
      } else {
        tier = '具备冲击英国 G5 边缘理工/交叉院系与香港顶尖公立的实力';
        g5Odds = '高均分（88+）双非是名校极为偏好的高确定性生源';
        riskSignals.push('推荐人公信力需强化，避免泛泛而谈的模板信件');
        diyAdvice.push('针对目标导师 3 篇学术专著撰写深度 SOP，展现独树一帜的科研视角');
      }
    } else {
      if (gpa.includes('86') || gpa.includes('90')) {
        tier = '美本/美研 Top 20、英国 G5 核心院系核心池候选人';
        g5Odds = '极高准入胜算，录取决胜点转向学术文书与面试答辩';
        riskSignals.push('标化成绩处于高同质化区间，缺乏独特学术主轴容易泯然众人');
        diyAdvice.push('打磨不可替代的个人叙事，将课外研讨收敛至明确学科问题');
      } else {
        tier = '985/211 优势背景但受均分制约，建议重点布局冲刺与核心梯度';
        g5Odds = '部分学院对 85 分以下卡线，需重点论证后两年学术上升曲线 (Upward Trend)';
        riskSignals.push('大一通识课拉低整体均分，需官方出具专业核心课排名');
        diyAdvice.push('用 GMAT 680+ 或 GRE 325+ 作为高阶学术数理能力的强补足依据');
      }
    }

    return { tier, g5Odds, riskSignals, diyAdvice };
  };

  const result = calculateResult();

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs">
      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            学术背景竞争力雷达自测模型 (Profile Match & Risk Radar)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            公开透明规则 · 基于英美港新官方最新 2026/2027 录取门槛与名单标准量化研判
          </p>
        </div>
      </div>

      {/* Input Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">本科 / 当前学业院校档次</label>
          <select
            value={bgType}
            onChange={(e) => setBgType(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
          >
            <option value="985/211重点院校">985 / 211 重点高校</option>
            <option value="双非一本重点高校">国内双非重点高校 (软科前100-200)</option>
            <option value="双非普通高校 (二本/跨专业)">普通双非高校 / 跨学科转专业</option>
            <option value="美本/英本海本体系">海本 (美本/英本/加澳等海外学位)</option>
            <option value="国际高中/IB/AP体系">国际高中 (IB / AP / A-Level体系)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">当前均分 / GPA 真实区间</label>
          <select
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
          >
            <option value="90分以上 (或GPA 3.85+) (专业排名前5%)">90分以上 (GPA 3.85+) · 前 5%</option>
            <option value="86–89分 (或GPA 3.6-3.8)">86–89 分 (GPA 3.6–3.8)</option>
            <option value="80–85分 (或GPA 3.2-3.5)">80–85 分 (GPA 3.2–3.5)</option>
            <option value="75–79分 (或GPA 2.8-3.1)">75–79 分 (需重点弥补)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">托福 / 雅思标化进展</label>
          <select
            value={langScore}
            onChange={(e) => setLangScore(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
          >
            <option value="雅思7.5+ / 托福110+ (高分出分)">雅思 7.5+ / 托福 110+ (高分就绪)</option>
            <option value="雅思7.0 / 托福100左右">雅思 7.0 / 托福 100 左右</option>
            <option value="雅思6.5 / 托福90左右">雅思 6.5 / 托福 90 左右</option>
            <option value="尚未出分 / 备考冲刺中">尚未出分 / 全力备考中</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">核心目标赛道</label>
          <select
            value={targetTrack}
            onChange={(e) => setTargetTrack(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
          >
            <option value="uk-pg">英国 G5 与罗素集团研博深耕</option>
            <option value="us-ug">美本常春藤与 Top 30 战略研判</option>
            <option value="hk-sg">中国香港与新加坡顶尖公立研判</option>
            <option value="k12">低龄国际高中与成长寄宿教育</option>
            <option value="arts">跨学科设计、建筑与前沿艺术</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">GRE / GMAT / 竞赛学术科研</label>
          <select
            value={greGmat}
            onChange={(e) => setGreGmat(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium"
          >
            <option value="已有GRE 325+ 或 GMAT 680+">已有 GRE 325+ / GMAT 680+</option>
            <option value="有高含金量科研论文 / 竞赛奖项">有省部级以上科研论文 / 竞赛奖项</option>
            <option value="未准备 / 规划中">尚无显性附加学术软实力</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>生成四维学术研判雷达</span>
          </button>
        </div>
      </div>

      {/* Result Section */}
      {submitted && (
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl animate-in fade-in duration-300 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
                ANALYSIS COMPLETE · ACADEMIC TIER RATING
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                研判评级：{result.tier}
              </h4>
            </div>
            <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
              名校准入胜算：{result.g5Odds}
            </div>
          </div>

          {/* 4 Standard Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Block 1: Assumptions & Calibration */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                1. 测算基准口径与底层假设
              </span>
              <p className="text-slate-600 leading-relaxed">
                本测算基于 2026/2027 海外名校最新公开招生报告及近三年真实全奖/免语言案例沉淀。测评剔除商业营销注水，假定所有成绩单均由正规教务处出具并附官方加权说明。
              </p>
            </div>

            {/* Block 2: DIY Next Steps */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="font-bold text-emerald-700 block mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                2. 现阶段 DIY 自主推进建议
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {result.diyAdvice.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">·</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Block 3: Risk Signals */}
            <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200 md:col-span-2">
              <span className="font-bold text-rose-800 block mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                3. 建议顾问深度介入的临界信号 (Advisor Critical Signals)
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-rose-950">
                {result.riskSignals.map((sig, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold text-rose-600">!</span>
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA: Pre-fill booking */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium">
              想获取基于您具体成绩单 40+ 门课程学分的 1 对 1 先修课对标研判书？
            </span>
            <button
              onClick={() => onProceedToBooking({
                track: targetTrack,
                gpa: gpa,
                bgType: bgType,
                langScore: langScore,
                summary: `自测评级：${result.tier}；准入胜算：${result.g5Odds}`
              })}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
            >
              <span>将此份数据带入预约顾问深度解读</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

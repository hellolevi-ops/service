import React, { useState } from 'react';
import { CheckCircle2, Clock, FileCheck, Users } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: '学业初诊与选校定位',
      phase: '入学前 18–24 个月',
      subtitle: 'Comprehensive Scholarly Diagnosis & Scoping',
      summary: '全面梳理学员已修课程大纲、绩点加权核算、语言考力及学术兴趣，建立专属申请学业档案。',
      deliverables: [
        '《学生学术竞争力与先修课对标诊断报告》（20+页深度分析）',
        '长周期标化考试与学科竞赛节点倒排甘特图',
        '双向签署《青藤学术诚信与服务边界公约》'
      ],
      parentSync: '召开家庭三方线下或视频会议，厘清长远升学目标与财务预算承受区间。',
      duration: '历时 2–3 周'
    },
    {
      num: '02',
      title: '选校方案与梯队规划',
      phase: '入学前 12–15 个月',
      subtitle: 'Strategic School Matrix & Admission Odds',
      summary: '结合当年英美各校最新内部名单 (List)、录取名额波动与历史数据，制定冲刺/核心/保障合理梯队。',
      deliverables: [
        '《多国多维选校梯队方案》（包含专业模块、录取难度分层、学费及就业分析）',
        '先修课学分对应补正方案（提供选修课加修建议或网课背书指引）',
        '保底院校安全边界量化评定书'
      ],
      parentSync: '提供完整的院校名单客观风险评估单，由学生与家长双向确认定稿签字。',
      duration: '历时 3–4 周'
    },
    {
      num: '03',
      title: '核心文书深度打磨',
      phase: '入学前 6–10 个月',
      subtitle: 'Intellectual Narrative & Essay Refinement',
      summary: '彻底摒弃模板与AI平庸文本。由对口学科领域导师领衔，多轮深度访谈，打磨体现独立个性的原创文书。',
      deliverables: [
        'Common App 主文书 / 英国 SOP 个人目的陈述定稿',
        '各顶尖院校特定附加文书（Supplemental Essays）分院系定制包',
        '学术推荐信（LOR）背景矩阵沟通提纲与英文学术简历（CV）'
      ],
      parentSync: '文书定稿前向家长汇报核心主旨框架，在尊重学生自我表达的同时确保价值观稳健。',
      duration: '历时 8–12 周（多轮精修）'
    },
    {
      num: '04',
      title: '材料合规与网申质检',
      phase: '入学前 4–8 个月',
      subtitle: 'Compliance Audit & Full-Transparency Dispatch',
      summary: '材料审核专员与主导师双人四眼质检。网申账号密码完全对学员共享，随时查进度。',
      deliverables: [
        '全部成绩单、在读/学位证明、WES认证报告防伪查验清单',
        '官方网申系统逐项填报确认单与官方递交收费凭证 (Receipt)',
        '推荐人网推邮件提交状态追踪记录'
      ],
      parentSync: '网申递交后发送官方系统生成之确认信原件，绝无暗箱扣留账号。',
      duration: '历时 4–6 周'
    },
    {
      num: '05',
      title: '面试实战与套磁答辩',
      phase: '入学前 2–6 个月',
      subtitle: 'Mock Interview & Research Defense',
      summary: '针对牛剑、常春藤及港新前沿面试，组织全真外教与同专业导师多轮高拟真模拟答辩。',
      deliverables: [
        '目标专业近三年真实面试原题库与答题思路拆解',
        '3–5 场全英文录像复盘与肢体表达优化建议书',
        '海外教授邮件沟通与 Waitlist 补件催决信策略'
      ],
      parentSync: '面试复盘录像可选择性向家长反馈，协助缓解家庭焦虑。',
      duration: '历时 3–8 周（跨时区预约）'
    },
    {
      num: '06',
      title: '录取决策与奖学金争取',
      phase: '入学前 1–4 个月',
      subtitle: 'Offer Evaluation & Appeal Strategy',
      summary: '综合权衡多枚 Offer 的学术声誉、导师资源、生活成本及毕业工签，做出最有利决策。',
      deliverables: [
        '《多枚录取优劣势对比与终选决策建议书》',
        '奖学金申诉信 (Financial Appeal Letter) 撰写指引',
        '官方押金（Deposit）缴纳与保位确认单'
      ],
      parentSync: '针对最终选择高校召开终审家庭会，指导换汇及首期学费电汇合规。',
      duration: '历时 2–3 周'
    },
    {
      num: '07',
      title: '签证行前与海外学术先修',
      phase: '入学前 1–2 个月',
      subtitle: 'Visa Logistics & Academic Pre-sessional',
      summary: '全程协助签证申请、体检及官方宿舍预订，提供海外文献阅读与论文写作学术先修课。',
      deliverables: [
        '英美加澳留学生官方签证无拒签档案包（含合规资金链流水说明）',
        '《海外学术生活与合规守则手册》',
        '同校学长学姐微信社群引荐'
      ],
      parentSync: '召开行前家长会，讲解海外医疗保险、紧急联络与监护人权益。',
      duration: '历时 4–6 周'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
          SERVICE LIFECYCLE · 服务交付全生命周期
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          全流程 7 步透明服务节点与书面交付清单
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          严格设立阶段里程碑。拒绝传统机构“签约前承诺、签约后拖延”的做法，每个环节均交付切实文书档案并对学员及家长全程公开同步。
        </p>
      </div>

      {/* Step Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        {steps.map((st, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
              activeStep === i
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-semibold'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className={`text-[10px] font-mono ${activeStep === i ? 'text-blue-100' : 'text-slate-400'}`}>STEP {st.num}</div>
            <div className="text-xs font-bold truncate mt-0.5">{st.title}</div>
            <div className={`text-[10px] truncate mt-1 ${activeStep === i ? 'text-blue-100' : 'text-slate-400'}`}>{st.phase}</div>
          </button>
        ))}
      </div>

      {/* Active Step Details Panel */}
      {steps[activeStep] && (
        <div className="bg-slate-50/70 border border-slate-200 p-6 sm:p-7 rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs font-bold text-blue-600 mr-2">
                STEP {steps[activeStep].num} · {steps[activeStep].phase}
              </span>
              <h4 className="text-lg font-bold text-slate-900 inline">
                {steps[activeStep].title}
              </h4>
              <span className="text-xs text-slate-500 block mt-0.5">
                {steps[activeStep].subtitle}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shrink-0 self-start sm:self-auto font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{steps[activeStep].duration}</span>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-5">
            {steps[activeStep].summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-slate-200">
            {/* Left: Deliverables */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>实质书面交付物 (Tangible Deliverables)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {steps[activeStep].deliverables.map((del, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Parent Sync */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span>家长专属同步与决策通道 (Parent Collaboration)</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-3">
                <p>{steps[activeStep].parentSync}</p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>微信双周进度同步 · 关键节点知情</span>
                  <span className="text-emerald-600 font-semibold">列入正规服务合同</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

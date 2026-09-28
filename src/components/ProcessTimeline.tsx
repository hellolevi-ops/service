import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Clock, FileCheck, Layers, Users } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: '初诊研判与学术立项',
      phase: '入学前 18–24 个月',
      subtitle: 'Comprehensive Scholarly Diagnosis & Scoping',
      summary: '全面梳理学员已修课程大纲、绩点加权算法、语言考力及学术兴趣，建立专属申请学术档案。',
      deliverables: [
        '《学生学术竞争力与先修课对标诊断报告》（20+页深度分析）',
        '长周期标化考试与学科竞赛节点倒排甘特图',
        '双向签署《博研学术诚信与服务边界公约》'
      ],
      parentSync: '召开家庭三方线下或视频会议，厘清长远升学目标与财务预算承受区间。',
      duration: '历时 2–3 周'
    },
    {
      num: '02',
      title: '选校博弈与梯队沙盘',
      phase: '入学前 12–15 个月',
      subtitle: 'Strategic School Matrix & Admission Odds',
      summary: '结合当年英美各校最新内部名单 (List)、录取名额波动与历史数据，推演冲刺/核心/保障黄金梯队。',
      deliverables: [
        '《多国多维选校梯队沙盘》（包含专业模块、录取难度分层、学费及就业分析）',
        '先修课学分对应补正方案（提供选修课加修建议或网课背书指引）',
        '保底院校安全边界量化评定书'
      ],
      parentSync: '提供完整的院校名单客观风险评估单，由学生与家长双向确认定稿签字。',
      duration: '历时 3–4 周'
    },
    {
      num: '03',
      title: '核心文书与学科叙事',
      phase: '入学前 6–10 个月',
      subtitle: 'Intellectual Narrative & Essay Refinement',
      summary: '彻底摒弃模板与AI平庸文本。由对口学科领域学者领衔，多轮深度访谈，打磨体现独立智识探索的原创文书。',
      deliverables: [
        'Common App 主文书 / 英国 SOP 个人目的陈述定稿',
        '各顶尖院校特定附加文书（Supplemental Essays）分院系定制包',
        '学术推荐信（LOR）背景矩阵沟通提纲与学术简历（Curriculum Vitae）'
      ],
      parentSync: '文书定稿前向家长汇报核心主旨框架，在尊重学生自我表达的同时确保价值观稳健。',
      duration: '历时 8–12 周（多轮精修）'
    },
    {
      num: '04',
      title: '材料合规与网申质检',
      phase: '入学前 4–8 个月',
      subtitle: 'Compliance Audit & Full-Transparency Dispatch',
      summary: '材料审核专员与主导师双人四眼质检（Four-Eyes Principle）。网申账号密码完全对学员共享。',
      deliverables: [
        '全部成绩单、在读/学位证明、WES认证报告防伪查验清单',
        '官方网申系统逐项填报确认单与官方递交收费凭证 (Receipt)',
        '推荐人网推邮件提交状态追踪记录'
      ],
      parentSync: '网申递交当日企微群同步官方确认回执邮件，账号密码永久由学员与家庭共同持有。',
      duration: '历时 4–6 周（分批递交）'
    },
    {
      num: '05',
      title: '面试答辩与套磁攻防',
      phase: '入学前 2–6 个月',
      subtitle: 'Academic Interview Simulation & Defense',
      summary: '针对商科、工科技术面或常春藤校友面试，组织同行专家进行高强度全英模拟考与抗压训练。',
      deliverables: [
        '历年目标院校全真技术机经考题库与答题逻辑指引',
        '至少 3 轮 1v1 纯英文视频模拟面试及逐帧复盘录像',
        '针对博士/研博学员的教授学术套磁（Cold Email）沟通指导'
      ],
      parentSync: '通报面试演练评估报告，提供面试心理调适与着装仪态家庭支持备忘录。',
      duration: '历时 2–4 周'
    },
    {
      num: '06',
      title: '录取决策与签证风控',
      phase: '入学前 2–4 个月',
      subtitle: 'Offer Evaluation & Visa Safety Compliance',
      summary: '权衡多个录取 Offer 条件，协助换取有条件/无条件录取、换取 CAS / I-20，并指导签证资金证明全合规。',
      deliverables: [
        '《多 Offer 综合学术与 ROI 决策比较书》',
        '使领馆学生签证全套申请表与资助证明公函',
        '面签问答全景预演及体检预约协助清单'
      ],
      parentSync: '协助家长理顺家庭银行账户大额资金存期与合规流水，规避因资金流异常遭大使馆电调审查。',
      duration: '历时 4–6 周'
    },
    {
      num: '07',
      title: '海外学术适应与先修伴跑',
      phase: '入学前 1–2 个月及抵校初期',
      subtitle: 'Academic Transition & Scholar Fellowship',
      summary: '开展学术写作（Academic Writing）、防学术抄袭（Plagiarism）规范培训，接入博研在读学者网络。',
      deliverables: [
        '《海外大学学术规范与文献引注实训指南》',
        '目标院校同专业优秀在读学长学姐一对一选课避坑交流',
        '抵校注册、宿舍租赁、海外银行开卡与安全互助指引'
      ],
      parentSync: '提供境外紧急联系人网络登记及行前安全手册，确保父母在国内安心无忧。',
      duration: '行前贯通至入学首学期'
    }
  ];

  return (
    <div className="bg-[#FFFFFF] border academic-hairline p-6 sm:p-8 rounded-sm my-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b academic-hairline gap-4">
        <div>
          <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
            严谨、确定、可验证的闭环交付
          </span>
          <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917]">
            全生命周期 7 阶服务交付流程
          </h3>
        </div>
        <p className="text-xs text-[#78716C] max-w-md leading-relaxed">
          像学术科研实验一样严格设立里程碑。拒绝传统机构“签约前热情、签约后失联”的黑箱操作，每个环节均可交付实物并对家长透明同步。
        </p>
      </div>

      {/* Step Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 mb-6">
        {steps.map((st, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`p-3 text-left border rounded-xs transition-all ${
              activeStep === i
                ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917] shadow-xs'
                : 'bg-[#FBF9F5] text-[#57534E] border-[#EDE7DC] hover:bg-[#F5F2EB]'
            }`}
          >
            <div className="text-[10px] font-mono opacity-60">STEP {st.num}</div>
            <div className="text-xs font-semibold truncate mt-0.5">{st.title}</div>
            <div className="text-[10px] text-[#A8A29E] truncate mt-1">{st.phase}</div>
          </button>
        ))}
      </div>

      {/* Active Step Details Panel */}
      {steps[activeStep] && (
        <div className="bg-[#FBF9F5] border academic-hairline p-6 rounded-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b academic-hairline gap-2">
            <div>
              <span className="text-[11px] font-mono text-[#92400E] font-semibold mr-2">
                STEP {steps[activeStep].num} · {steps[activeStep].phase}
              </span>
              <h4 className="text-lg font-serif-title font-bold text-[#1C1917] inline">
                {steps[activeStep].title}
              </h4>
              <span className="text-xs text-[#78716C] block mt-0.5">
                {steps[activeStep].subtitle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#78350F] bg-[#EDE7DC] px-2.5 py-1 rounded-xs shrink-0 self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5" />
              <span>{steps[activeStep].duration}</span>
            </div>
          </div>

          <p className="text-sm text-[#44403C] leading-relaxed mb-5 font-serif-title">
            {steps[activeStep].summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t academic-hairline">
            {/* Left: Deliverables */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] mb-2.5">
                <FileCheck className="w-4 h-4 text-[#059669]" />
                <span>客户及家庭实质交付物 (Tangible Deliverables)</span>
              </div>
              <ul className="space-y-2 text-xs text-[#57534E]">
                {steps[activeStep].deliverables.map((del, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2 bg-[#FFFFFF] p-2 rounded-xs border academic-hairline">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Parent Sync */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] mb-2.5">
                <Users className="w-4 h-4 text-[#92400E]" />
                <span>家长专属同步与决策通道 (Parent Collaboration)</span>
              </div>
              <div className="bg-[#FFFFFF] p-3.5 rounded-xs border academic-hairline text-xs text-[#57534E] leading-relaxed">
                <p>{steps[activeStep].parentSync}</p>
                <div className="mt-3 pt-2 border-t academic-hairline text-[11px] text-[#A8A29E] flex items-center justify-between">
                  <span>企微双周同步 · 关键节点签字</span>
                  <span className="text-[#059669] font-medium">已列入正式合同附件</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

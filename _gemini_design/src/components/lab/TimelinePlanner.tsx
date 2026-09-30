import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, ChevronRight, FileText, ArrowRight } from 'lucide-react';

export const TimelinePlanner: React.FC = () => {
  const [targetIntake, setTargetIntake] = useState('2026-fall');
  const [region, setRegion] = useState('uk');

  const timelineData = [
    {
      period: '大三上学期 (前溯 18–24 个月)',
      focus: 'GPA 拔尖锁定与首考摸底',
      tasks: [
        '核查目标大学专业先修课学分，对标加修高阶数学或理论课',
        '托福 / 雅思首次实战摸底考试，定位词汇与逻辑写作短板',
        '参与校内实验室基础项目或高质量学术社团'
      ],
      deliverable: '学术学分差距清单'
    },
    {
      period: '大三下学期 (前溯 12–16 个月)',
      focus: '科研深化、暑研匹配与推荐人建联',
      tasks: [
        '锁定至少 2 位学术推荐人（导师/任课教授），定期进行学术沟通',
        '申请海内外知名大学官方线上/线下暑期科研 (Summer Research)',
        '语言考分冲刺达标（雅思 7.0+ 或 托福 100+）'
      ],
      deliverable: '两封意向学术推荐信提纲'
    },
    {
      period: '申请季暑期 (前溯 6–9 个月)',
      focus: '文书核心定位与先修课大纲定稿',
      tasks: [
        '完成 Common App 主文书 / 英国 G5 个人目的陈述 (SOP) 3 轮精修',
        '开具带有教务处红色防伪印章的 6 学期官方中英文成绩单与在读证明',
        '针对商科或顶尖理工科完成 GRE / GMAT 刷分锁定'
      ],
      deliverable: '中英双语文书终稿合辑'
    },
    {
      period: '金秋 9–11 月 (前溯 2–5 个月)',
      focus: '网申首轮全开直投与推荐信跟踪',
      tasks: [
        '英国/港新 Stage 1 首轮极速递交，美本早申 (ED/EA 11月1日) 锁死',
        '督促推荐人于收到系统邮件 48 小时内完成网推签字确认',
        '监控院校官方申请 Portal 状态更新，补齐 WES 认证报告'
      ],
      deliverable: '官方递交确认回执单 (Receipts)'
    },
    {
      period: '冬春 12–次年 3 月',
      focus: '全真技术面试攻坚与早申 Offer 研判',
      tasks: [
        '梳理目标学院历年专业机经，开展全真英文 1v1 模拟考',
        '跟踪 Waitlist 状态，及时起草爱校更新信 (LOCI) 汇报最新学术成果',
        '美本常规轮 (RD) 最终放榜与香港留位费 (Deposit) 决策'
      ],
      deliverable: '多 Offer 综合评估对比表'
    },
    {
      period: '次年 4–8 月 (行前冲刺)',
      focus: '条件换无条件、CAS/I-20 与签证行前',
      tasks: [
        '提交本科全 8 学期完整成绩单与毕业证学位证，换取无条件录用通知书',
        '办理银行大额资金证明存期锁定，递交使领馆电子签证申请',
        '预约海外大学学生公寓住宿，参加青藤行前学术写作防剽窃工作坊'
      ],
      deliverable: '入境签注与抵校注册包'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              申请时间轴倒推生成器 (Timeline Planner)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              18–24 个月全周期里程碑倒排 · 锁定关键轮次与黄金投递窗口
            </p>
          </div>
        </div>

        {/* Region & Intake selectors */}
        <div className="flex items-center gap-2 text-xs">
          <select
            value={targetIntake}
            onChange={(e) => setTargetIntake(e.target.value)}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
          >
            <option value="2026-fall">2026 年秋季入学 (当前黄金周期)</option>
            <option value="2027-fall">2027 年秋季入学 (长线规划期)</option>
          </select>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
          >
            <option value="uk">英国 G5 / 罗素集团</option>
            <option value="us">美国 Top 30 / 常春藤</option>
            <option value="hk-sg">中国香港与新加坡</option>
          </select>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-4">
        {timelineData.map((item, idx) => (
          <div 
            key={idx}
            className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 bg-white transition-all shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {item.period}
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 self-start sm:self-auto">
                核心焦点：{item.focus}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="md:col-span-2 space-y-2 text-slate-600">
                {item.tasks.map((task, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{task}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 block font-medium">阶段里程碑交付物</span>
                <span className="font-bold text-slate-800 mt-1">{item.deliverable}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

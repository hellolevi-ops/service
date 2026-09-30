export type AssessmentInput = {
  track: string;
  gpaBand: string;
  language: string;
  timeline: string;
  goal: string;
};

export type LabResult = {
  summary: string;
  assumptions: string;
  diyNext: string[];
  askAdvisorSignals: string[];
};

export function runAssessment(input: AssessmentInput): LabResult {
  const gaps: string[] = [];
  if (input.gpaBand === "below-75") gaps.push("均分区间偏低，名单需更保守分层");
  if (input.language === "not-ready") gaps.push("语言成绩待提升，需先排考试节点");
  if (input.timeline === "lt-3m") gaps.push("距入学 3 个月以内，材料窗口紧凑");

  const summary =
    gaps.length === 0
      ? `方向「${input.track}」自检：基础条件可进入分层名单讨论，下一步建议用时间轴工具排节点。`
      : `方向「${input.track}」自检发现 ${gaps.length} 个优先事项：${gaps.join("；")}。`;

  return {
    summary,
    assumptions:
      "本结果基于你填写的区间假设，仅作规划参考，录取结果由院校决定。口径年份：2026。",
    diyNext: [
      "打开对应垂直页阅读费用框架与适配人群",
      "用时间轴工具生成个人节点",
      "浏览同背景层级案例的「申请难点」",
    ],
    askAdvisorSignals: [
      "家庭对冲刺/稳妥档存在重大分歧",
      "成绩单或跨专业需要策略性解释",
      "需要指定顾问做个性化名单与文书风险判断",
    ],
  };
}

export function runTimeline(input: {
  track: string;
  targetTerm: string;
}): LabResult {
  return {
    summary: `已按「${input.track} / ${input.targetTerm}」生成倒排骨架（示例节点，需按院校轮次微调）。`,
    assumptions: "假设常规授课型/本科轮次；节假日与语言班另行计入。此表为规划参考，以官方录取时间表为准。",
    diyNext: [
      "把节点写入日历并预留文书二稿时间",
      "核对语言考试报名截止",
      "阅读对应 Playbook 的 DIY 天花板",
    ],
    askAdvisorSignals: ["多国双申导致节点冲突", "需要与家长对齐的关键硬节点"],
  };
}

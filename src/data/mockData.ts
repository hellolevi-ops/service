/**
 * 博研书院 (Boyan Academic & Advisory)
 * 垂直深耕型国际学者与留学研判体系 - 全局权威学术数据与业务模型
 */

export interface TrackItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  badge: string;
  targetDegree: string;
  typicalTimeline: string;
  scoreBenchmark: string;
  costRange: string;
  overview: string;
  answerBlock: string;
  advisoryMethods: string[];
  keyRisks: string[];
  faqs: { question: string; answer: string }[];
  recommendedAdvisorId: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  studentInitials: string;
  enrollmentYear: string;
  trackId: string;
  trackName: string;
  backgroundGrade: '985/211' | '双非本科' | '美本/海本' | '国际高中/K12' | '艺术跨学科';
  undergradProfile: string;
  gpa: string;
  testScores: string;
  admitUniversity: string;
  admitProgram: string;
  scholarship?: string;
  hardBottlenecks: string;
  strategicInsight: string;
  keyDeliverables: string[];
  finalResult: string;
  leadAdvisorId: string;
  leadAdvisorName: string;
  quote: string;
  authorized: boolean;
  date: string;
}

export interface AdvisorItem {
  id: string;
  name: string;
  title: string;
  academicBackground: string;
  researchFocus: string;
  experienceYears: number;
  admitHighlights: string[];
  specialtyTracks: string[];
  representativeCases: string[];
  consultationPhilosophy: string;
  parentSyncMethod: string;
  acceptingAppointments: boolean;
  honoraryTitles: string[];
}

export interface PlaybookItem {
  id: string;
  slug: string;
  title: string;
  category: '选校博弈' | '文书大纲' | '风险避坑' | '家长指南' | '学业适应';
  author: string;
  readTime: string;
  targetAudience: string;
  notForAudience: string;
  summary: string;
  answerBlock: string;
  keySteps: { step: string; title: string; desc: string; toolRef?: string }[];
  diyCeiling: string;
  whenAdvisorNeeded: string[];
  updatedAt: string;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  category: '英研G5' | '美本Top30' | '港新前沿' | '选校博弈' | '费用政策' | '签证风控';
  author: string;
  publishYear: string;
  dateModified: string;
  summary: string;
  answerBlock: string;
  content: string[];
  faqs: { q: string; a: string }[];
  nextStops: { title: string; url: string; reason: string }[];
  relatedTrackSlug: string;
}

export interface CommunityTopic {
  id: string;
  title: string;
  author: string;
  authorBadge: '官方精选' | '特邀在读' | '顾问专栏' | '校友学长';
  authorUniversity: string;
  category: '选校与定位' | '文书与面试' | '真实在读体验' | '避坑与申诉';
  replyCount: number;
  viewCount: number;
  previewSnippet: string;
  fullBody: string;
  requiresAuthToReadFull: boolean;
  createdAt: string;
  tags: string[];
}

export interface LeadSubmission {
  id: string;
  name: string;
  mobile: string;
  wechat?: string;
  trackId: string;
  currentBackground: string;
  targetEnrollmentYear: string;
  preferredAdvisorId?: string;
  gpaRange: string;
  languageScore: string;
  budgetRange: string;
  remarks: string;
  formVariant: 'short' | 'book' | 'assessment';
  status: '待跟进' | '15分钟SLA响应中' | '已完成初诊' | '生成研判书';
  submittedAt: string;
  slaDeadline: string;
  privacyConsented: boolean;
}

// -------------------------------------------------------------
// 1. 服务三线体系 (Services)
// -------------------------------------------------------------
export const SERVICE_LINES = [
  {
    id: 'premium',
    slug: 'premium',
    name: '学术导师制 · 精品战略咨询',
    subname: 'Academic Fellowship & High-End Strategy',
    targetAudience: '目标全球 Top 30、英联邦 G5、常春藤盟校及学术博士/全奖项目的高志向学子',
    notForAudience: '仅需流水线机械填表、追求代写模板、或期望无底线“保录承诺”的家庭',
    philosophy: '秉承“学者共研”逻辑。由对应学科领域具有海外顶尖高校博士/终身学术履历的学者领衔，将申请过程转化为学术探究与深度叙事。',
    mentorRatio: '每位学员专配 3 位专家（领域学术导师 + 战略研判官 + 流程质检官），每年单导师带教限 6 人',
    deliverables: [
      '目标学科前沿文献研读与独立学术课题选题立项',
      '学术文书（Personal Statement / Statement of Purpose）由母语学者逐句打磨，严禁AI套话',
      '学术推荐信（LOR）背景矩阵规划与教授沟通策略演练',
      '模拟招生委员会多轮答辩（Mock Academic Interview）与抗压训练',
      '终身学术网络对接：学长学者一对一海外科研先修引导'
    ],
    pricingLogic: '学术评估初诊免费。按学员背景目标复杂度与学科跨度量化定损，基础包 5.8万–12.8万元人民币不等，明确列支不含项。',
    ctaText: '预约 45 分钟学术背景诊断',
    badge: '学术领衔 · 限量带教'
  },
  {
    id: 'full-cycle',
    slug: 'full-cycle',
    name: '精益把控制 · 全流程学业交付',
    subname: 'Rigorous Full-Cycle Application Delivery',
    targetAudience: '追求申请过程绝对透明、材料零差错、注重家长同步与多国联合博弈申请的理性家庭',
    notForAudience: '自控力极强、已有完备海外背景且仅需单点答疑的 DIY 极客',
    philosophy: '像管理临床试验一样管理申请周期。7 个关键里程碑节点双向签字确认，家长企微专属工作群双周纪要同步。',
    mentorRatio: '双顾问责任制（资深规划师 + 材料审核合规专员），执行与质检严格分离',
    deliverables: [
      '多国多维度选校梯度沙盘（冲刺 / 核心 / 保障 3:4:3 黄金比例）',
      '申请材料官方全清单合规质检（成绩单、WES认证、公证、均分说明单）',
      '网申系统全流程透明递交，账号密码学员完全自主共享持有',
      '官方Offer研判决策支持（条件录取换无条件、CAS/I-20换发、延期应对）',
      '签证资金合规排查、使领馆体检面签辅导与行前住宿安全对接'
    ],
    pricingLogic: '首诊评估后提供结构化报价清单。英/港/美/澳标准套餐 2.8万–5.6万元人民币，签约前完整列出所有不包含第三方规费。',
    ctaText: '获取全流程执行方案与梯队清单',
    badge: '节点签字 · 家长周报'
  },
  {
    id: 'compare',
    slug: 'compare',
    name: '选型决策对照中心',
    subname: 'Comparative Selection Matrix',
    targetAudience: '尚未厘清家庭精力分配、在“顶尖冲刺”与“稳健统筹”之间权衡的家长与学生',
    notForAudience: '无明确留学预算与时间表的泛咨询访客',
    philosophy: '拒绝模糊推销。我们以清晰的对比维度，协助家庭在签约前做出知情抉择。',
    mentorRatio: '透明可查',
    deliverables: [
      '精品咨询 vs 全流程 vs DIY 自助三方客观对比',
      '退费及合同终止条款事前通俗解读',
      '家长常见 10 项权责边界清单'
    ],
    pricingLogic: '完全公开对比原则，支持按需定制单模块加购（学术面试辅导/签证单项等）。',
    ctaText: '查看完整对照沙盘',
    badge: '理性选型 · 拒绝捆绑'
  }
];

// -------------------------------------------------------------
// 2. 五大垂直赛道 (Tracks)
// -------------------------------------------------------------
export const VERTICAL_TRACKS: TrackItem[] = [
  {
    id: 'us-ug',
    slug: 'us-ug',
    name: '美本常春藤与 Top 30 战略研判',
    subtitle: 'Ivy League & Top 30 US Undergraduate Admissions',
    badge: '学术叙事 · 全人博弈',
    targetDegree: '美国四年制学士学位（直申 / 转学）',
    typicalTimeline: '入学前 18–24 个月提早启动，重点把握早申（ED/EA）与常规轮（RD）节拍',
    scoreBenchmark: '建议托福 105+ 或雅思 7.5+，SAT 1500+ / ACT 33+（可选校视专业而定），GPA 3.8+ / 90%+',
    costRange: '美本年均学费加食宿生活费约 7.5万–9.5万美元（约合 55万–70万元人民币/年）',
    overview: '美本录取不仅是分数的竞争，更是一场关于“学术求知欲、社会责任感与独特心智模型”的深度考察。博研书院拒绝千篇一律的支教与水竞赛，坚持引导学生从自身真正的学术热爱出发，构建具备不可替代性的活动主轴。',
    answerBlock: '【学术研判结论】美本顶尖院校选拔已全面进入“学术纵深与独特视角”时代。单纯高标化不再构成录取充分条件；招生委员会更青睐在某一微观学科或真实社会问题中展现出持续、递进式研究闭环的申请者。早申（ED）的精准选校能为匹配度极高的学子带来显著竞争优势。',
    advisoryMethods: [
      '主文书（Common App Essay）哲学式研讨：拒绝包装虚假苦难，聚焦认知觉醒与学术原动力',
      '附加文书（Supplemental Essays）学院匹配沙盘：对标各校招生官核心特质，定制叙事语调',
      '校外学术科研与高含金量竞赛梯队规划：匹配海内外教授研讨班与独立论文写作',
      '面试实战演练：常春藤校友面试官模拟，训练敏捷思辨与深度交流能力'
    ],
    keyRisks: [
      '盲目冲刺高排名而忽视 Early Decision (ED) 唯一绑定义务的契约风险',
      '文书充斥 AI 生成腔调与模板化陈词滥调，触发招生系统原创性质检拦截',
      '活动列表分散凌乱无核心主题，沦为“清单式打卡”被判定缺乏学术专注力'
    ],
    faqs: [
      {
        question: '美本现在标化可选（Test-Optional）政策下，到底还需要提交 SAT/ACT 吗？',
        answer: '2025/2026申请季起，达特茅斯、耶鲁、MIT、布朗、UT奥斯汀等顶尖名校已相继恢复标化强制要求。针对 Top 30，我们建议凡能取得具有竞争力分数的学子务必提交，这仍是证实不同高中学术严谨度最硬核的基准标尺。'
      },
      {
        question: '家长在美本申请中应该扮演什么角色？如何避免过度干预？',
        answer: '美本极其强调学生的独立心智与自我表达。家长的核心职责是提供稳定的心理支持与家庭财务预算把控。书院建议家长通过我们的双周备忘录了解进度，而将个人陈述与面试真实表达完全还给学生。'
      },
      {
        question: '非美高/非体制内国际班（如普通高考班或国内普高）冲刺美本有机会吗？',
        answer: '完全有机会。普高学生的高考数理功底与独特中国视角，在常春藤招生官眼中具有差异化价值。核心难点在于将高考体系与全人评价体系衔接，提前完成托福与活动证据链梳理。'
      }
    ],
    recommendedAdvisorId: 'adv-gu'
  },
  {
    id: 'uk-pg',
    slug: 'uk-pg',
    name: '英国 G5 与罗素集团研博深耕',
    subtitle: 'UK G5 & Russell Group Postgraduate & Doctoral Research',
    badge: '名校名单 · 均分硬核',
    targetDegree: '英国一年制授课型硕士 (Taught MSc/MA) 与哲学硕士/博士 (MRes/PhD)',
    typicalTimeline: '入学前 12–15 个月启动，9月开放即冲刺“分批审理（Staged Admissions）”首轮',
    scoreBenchmark: '国内985/211高校均分 85–90%+，双非重点院校 88–92%+，雅思 7.0–7.5 (单项6.5+)',
    costRange: '学费加生活费总预算约 38万–55万元人民币/年（伦敦地区略高）',
    overview: '英国硕士录取以“本科学术出身、核心专业课成绩单（Transcript）与先修课匹配度”为核心红线。伴随帝国理工、爱丁堡、曼大等院校对中国大学内部名单（List）的严格执行，选校博弈与课程大纲匹配成为打破僵局的关键钥匙。',
    answerBlock: '【学术研判结论】英国名校申请本质是“硬实力门槛准入 + 学术文书精准对位”。各校录取名单存在严格隐形分层，先修课学分（Credits）不足是拒信首要原因。抢占秋季首轮批次（Round 1）递交，文书紧扣目标导师学术方向，是双非拔尖生与985均分受限生翻盘的核心战法。',
    advisoryMethods: [
      '精准院校名单（List）与专业跨学科穿透匹配，规避因学校降档或均分不足被系统拒筛',
      '专业课中英双语课程大纲（Syllabus）比对与先修课合规梳理，针对转专业学子强化说理',
      '学术目的陈述（SOP）纯学术化编撰：剖析专业课题、研究方法学（Methodology）与职业落脚点',
      '奖学金申请文书与博士学术提案（Research Proposal）同行学者评阅与润色'
    ],
    keyRisks: [
      '忽视大学严苛的认可名单（Acceptable University List），盲目投递遭自动秒拒',
      '文书通篇空谈感悟而缺乏目标专业具体 Module（模块）与文献支持，被视同模板',
      '拖延至第二、三轮递交，热门商科与计算机专业配额已满导致录取要求被动水涨船高'
    ],
    faqs: [
      {
        question: '双非一本学生均分 88 分，有机会拿到牛剑或帝国理工录取吗？',
        answer: '完全有机会。帝国理工部分工科专业与 UCL 多数学院并不完全锁死双非，关键在于核心数学与专业课成绩单是否名列前茅（如 90+）、是否有高含金量科研论文，以及 SOP 能否严丝合缝论证先修课储备。'
      },
      {
        question: '英国一年制硕士到底水不水？回国认可度如何？',
        answer: '英国授课型硕士学制紧凑、课程密度极大，课后文献阅读量与期末考核标准极高。在教育部涉外监管网、企事业单位招聘及北上广深落户政策中，罗素集团名校文凭依然具备高权重学术与就业认可。'
      }
    ],
    recommendedAdvisorId: 'adv-lu'
  },
  {
    id: 'hk-sg',
    slug: 'hk-sg',
    name: '中国香港与新加坡顶尖公立研判',
    subtitle: 'Hong Kong & Singapore Elite Public Universities Admissions',
    badge: '地缘优势 · 性价比之选',
    targetDegree: '香港前三（港大/中大/科大）与新加坡两校（新国立NUS/南洋理工NTU）硕博',
    typicalTimeline: '入学前 10–14 个月启动，重点在 9–11 月第一轮（Early/Round 1）递交',
    scoreBenchmark: '985/211 均分 85+，双非 88+，雅思 6.5–7.0 或托福 90–100，部分商科强求 GMAT/GRE 680+/320+',
    costRange: '总开支约 30万–48万元人民币/年（视商科学费与当地租金浮动）',
    overview: '坐拥亚洲乃至全球顶级学术声誉与便利的地缘优势，港新升学竞争近年进入白热化。港大、科大与新国立极其看重综合背景质感与实习研究背书，面试率极高且往往为突袭式英文专业面。',
    answerBlock: '【学术研判结论】港新申请兼具英联邦“硬标化”与美系“强背景与面试”双重特征。港前三与新两校极为偏好早批次申请者，且商科、金融科技与法学等高热度项目几乎全员附带群面或技术单面。早占位、GMAT/GRE早出分、精准跨申是制胜三大支柱。',
    advisoryMethods: [
      '港新专业多轮轮次（Rolling Admissions）动态名额监控系统，第一时间递交黄金批次',
      '英美港新“多国联申”互保沙盘：合理分配精力，降低单地区政策或竞争偶发波动风险',
      '全真全英面试题库解析：涵盖商科案例分析、工科专业概念辨析与无领导小组讨论演练',
      '语言成绩与网申文书多维校验，协助应届生与在职人士协调推荐信签署流程'
    ],
    keyRisks: [
      '错失首轮（Round 1）递交窗口，次轮面临积压数倍的高分海本与保研后分流学子竞争',
      '部分项目对 GMAT/GRE 为强建议要求，若盲信“无G申”可能在初筛即被降权处理',
      '香港留学签证（学生签注）办理周期较长，迟延确认可能影响按期报到'
    ],
    faqs: [
      {
        question: '香港授课型硕士毕业后有留在当地工作的机会吗？',
        answer: '有极为友善的 IANG 签证政策支持。非本地毕业生可申请为期 2 年的非本地毕业生留港/回港就业安排（IANG签证），无须在申请前获得聘用，为在港积累跨国金融与科技行业经验提供坚实跳板。'
      }
    ],
    recommendedAdvisorId: 'adv-chen'
  },
  {
    id: 'k12',
    slug: 'k12',
    name: '低龄国际高中与成长型寄宿教育',
    subtitle: 'Global K-12, Boarding Schools & Foundational Academics',
    badge: '家庭决策 · 长期主义',
    targetDegree: '美英顶尖寄宿高中（Boarding Schools）、国际初高中衔接体系（IB/A-Level/AP）',
    typicalTimeline: '提前 24–36 个月家庭系统性规划，包含语言能力、独立生活自理力与品格考察',
    scoreBenchmark: 'SSAT / ISEAT 90%+，小托福 TOEFL Junior 或托福 100+，近三年全优在校成绩单',
    costRange: '全寄宿学费加生活监护费约 6万–8.5万美元 / 4万–5.5万英镑/年（约合 45万–65万元人民币）',
    overview: '低龄留学关乎青少年的性格塑造、情感韧性与世界观形成。博研书院从全人关怀出发，坚持把“学校社区文化与孩子个性的契合度”置于单纯排名之上，为全家庭提供长达两年的系统伴跑。',
    answerBlock: '【学术研判结论】顶尖国际高中的考察维度远超应试知识点，核心在于孩子的求知热情、抗挫能力、道德品格与家庭教育哲学。申请文书包括学生版与家长版（Parent Statement），面试亦涵盖家长深度沟通。过早机械刷题而缺乏真实童年热忱的孩子在资深招生官面前极难脱颖而出。',
    advisoryMethods: [
      '孩子个性与英美寄宿学校文化生态深度契合度评估（100+细分维度沙盘）',
      '家长陈述（Parent Questionnaire/Statement）家庭教育理念深度书写指导',
      'Vericant（维立克）第三方预面试与校园正式访校（Campus Visit）全流程陪护方案',
      '海外合法监护人（Guardianship）法律筛选与行前心理成熟度准备工作坊'
    ],
    keyRisks: [
      '孩子身心尚未做好异国独立生活的准备，仓促送出导致适应障碍甚至退学',
      '盲目追求顶级大名气寄宿美高，忽视学校实际学术难度对孩子信心的潜在打击',
      '家长代笔或过度粉饰文书，在面试现场孩子真实表现产生巨大断层'
    ],
    faqs: [
      {
        question: '孩子几岁送出国读书最合适？初中还是高中？',
        answer: '这取决于孩子的独立生活能力、英语沟通自发性以及家庭整体长远规划。通常美高9年级（初三）是黄金入读节点，有完整的四年高中文凭且融入环境最自然。如孩子独立性较弱，可优先考虑国内双语学校过渡。'
      }
    ],
    recommendedAdvisorId: 'adv-gu'
  },
  {
    id: 'arts',
    slug: 'arts',
    name: '跨学科设计、建筑与前沿艺术留学',
    subtitle: 'Interdisciplinary Arts, Architecture & Design Portfolio',
    badge: '作品集先导 · 概念思辨',
    targetDegree: '全球顶尖艺术设计院校学士/硕士 (BFA/MFA/MDes/MArch)',
    typicalTimeline: '提前 12–18 个月专攻作品集（Portfolio）与设计研究文献（Design Research）',
    scoreBenchmark: '作品集评估占 70% 权重；在校成绩 GPA 3.0+；托福 90+ 或雅思 6.5+ (单项6.0+)',
    costRange: '艺术类学费普遍较高，年均总开支约 45万–65万元人民币（含材料费耗材）',
    overview: '艺术留学绝非单纯的美术手绘技能展示，而是通过视觉载体进行深刻的“问题定义、材料实验、社会学调研与批判性反思”。博研书院联合海外名校客座教授，指导学生打破专业壁垒，产出具备独立学术深度的作品集。',
    answerBlock: '【学术研判结论】海外顶尖艺术院校（如罗德岛RISD、皇艺RCA、伦艺UAL、帕森斯Parsons）对纯商业效果图已产生审美疲劳，极为看重调研手稿（Sketchbook）、材料实验的失败过程与独到观念。作品集必须体现逻辑演进闭环，而不仅仅是最终效果的精修堆砌。',
    advisoryMethods: [
      '罗德岛/皇家艺术学院校友及客座教授跨学科多对一阶段性 Crit（作品批评）会审',
      '从草图本（Sketchbook）到材料迭代全过程叙事逻辑梳理，杜绝“画廊流水线套作”',
      '专业艺术家陈述（Artist Statement）与作品描述词撰写，精准对位英美设计哲学',
      '跨学科新兴方向（交互设计、生成式AI协同设计、人居生态建筑）前沿选题指引'
    ],
    keyRisks: [
      '陷入传统商业画室的模板化套路制作，被顶级名校判定缺乏独立创作者思考',
      '只顾打磨作品集而彻底荒废托福/雅思，最终因语言成绩未达直录标准抱憾错失',
      '作品缺乏过程稿与调研记录，遭质疑真实原创性'
    ],
    faqs: [
      {
        question: '零基础跨专业申请工业设计、交互设计或建筑硕士，胜算几何？',
        answer: '跨专业在艺术与设计界非常常见且受到欢迎。例如计算机或心理学背景跨申交互设计，土木或文学跨申建筑学，往往能展现出超越纯美术生的多维洞察。核心在于利用前置专业的学术思维为新设计课题赋能。'
      }
    ],
    recommendedAdvisorId: 'adv-shen'
  }
];

// -------------------------------------------------------------
// 3. 严谨脱敏案例库 (Case Studies - 8详案)
// -------------------------------------------------------------
export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'case-01',
    slug: 'imperial-college-cs-2025',
    studentInitials: 'T同学',
    enrollmentYear: '2025秋季',
    trackId: 'uk-pg',
    trackName: '英国G5研博深耕',
    backgroundGrade: '双非本科',
    undergradProfile: '华东某双非院校 · 软件工程专业',
    gpa: '88.6 / 100（专业排名前 3%）',
    testScores: '雅思 7.5 (L8.5 R8.5 W6.5 S6.5)',
    admitUniversity: '帝国理工学院 (Imperial College London)',
    admitProgram: 'MSc Computing (Software Engineering)',
    hardBottlenecks: '院校不在主流 G5 核心商管白名单；本科核心数学理论学分稍显单薄；大二曾有一门重修记录。',
    strategicInsight: '放弃泛水文书。导师深挖其在开源社区的贡献与全国大学生算法竞赛二等奖经历，系统重构中英课程先修证明，附录量化数学知识大纲，首轮开放第 3 天完整递交。',
    keyDeliverables: ['25页专业课先修对标大纲', '开源代码仓库与算法解析附录', '两版针对系统架构的精准SOP'],
    finalResult: '斩获帝国理工全奖豁免候选资格，无条件录取 (Unconditional Offer)，并获爱丁堡大学与曼大双申全取。',
    leadAdvisorId: 'adv-lu',
    leadAdvisorName: '陆博 (剑桥大学博后)',
    quote: '“陆博带我看透了帝国理工导师目前在分布式系统上的研究断层，把我的文书从普通自夸升华成了一篇具备同行交流水准的申请学术备忘录。”',
    authorized: true,
    date: '2025-11-20'
  },
  {
    id: 'case-02',
    slug: 'columbia-ivy-undergrad-2025',
    studentInitials: 'C同学',
    enrollmentYear: '2025秋季',
    trackId: 'us-ug',
    trackName: '美本常春藤与Top30',
    backgroundGrade: '国际高中/K12',
    undergradProfile: '北京某公立国际部 · AP体系',
    gpa: 'Unweighted GPA 3.92 / 4.0 (9门AP 满分5分)',
    testScores: '托福 114 (口语28), SAT 1540 (数学790)',
    admitUniversity: '哥伦比亚大学 (Columbia University)',
    admitProgram: 'Columbia College (History & Economics)',
    hardBottlenecks: '标化成绩极高但在顶尖公立生源池中严重同质化；课外活动涉猎过杂，缺乏串联个人世界观的脊梁。',
    strategicInsight: '顾清华博士与其进行了 14 次深度研讨，摒弃常规商赛经历，以其高二自发调研的“北京胡同非正式经济变迁”为原点，构建经济学实证与历史口述史跨界学术主轴。',
    keyDeliverables: ['胡同口述史与微观经济独立研报', 'Common App 主文书《在瓦檐与市声之间》', '哥大核心课程体系匹配答辩稿'],
    finalResult: '早申请轮次 (ED) 直录哥伦比亚大学，并入选哥大本科跨学科杰出青年学者计划。',
    leadAdvisorId: 'adv-gu',
    leadAdvisorName: '顾清华 博士 (哥大教育学博士)',
    quote: '“书院没有像传统机构那样逼我凑竞赛，而是教我如何真正像一个学者一样去好奇自己的城市，这彻底打动了哥大的常春藤招生官。”',
    authorized: true,
    date: '2025-12-16'
  },
  {
    id: 'case-03',
    slug: 'nus-fintech-2026',
    studentInitials: 'L同学',
    enrollmentYear: '2026春/秋',
    trackId: 'hk-sg',
    trackName: '港新公立顶尖研判',
    backgroundGrade: '985/211',
    undergradProfile: '某 985 院校 · 金融工程专业',
    gpa: '85.2 / 100',
    testScores: '托福 103, GMAT Focus Edition 675',
    admitUniversity: '新加坡国立大学 (National University of Singapore)',
    admitProgram: 'MSc in Digital Financial Technology',
    hardBottlenecks: 'GPA 处于 985 申请者中位线，无显著科研 paper，曾担心新国立因绩点卡人。',
    strategicInsight: '陈立言导师精准利用其在大型券商固定收益部门的真实量化建模实习，将文书重点放在 Python 金融工具对冲实践上，避开纯理论劣势，首轮早申直通。',
    keyDeliverables: ['量化风控项目结构化代码集锦', '新国立全英文专业技术面试 1v1 模拟考题包', '行业高管推荐信背书梳理'],
    finalResult: '顺利斩获新加坡国立大学 MSc DFinTech 录取，并同时获香港科技大学 MSc Fintech 录取。',
    leadAdvisorId: 'adv-chen',
    leadAdvisorName: '陈立言 导师 (LSE硕士)',
    quote: '“面试前一晚，陈老师带着我把新加坡金融科技管理局 MAS 的最新监管沙盒条例复盘了三遍，面试中招生教授果然提到了类似问题！”',
    authorized: true,
    date: '2026-01-14'
  },
  {
    id: 'case-04',
    slug: 'oxford-materials-msc-2025',
    studentInitials: 'W同学',
    enrollmentYear: '2025秋季',
    trackId: 'uk-pg',
    trackName: '英国G5研博深耕',
    backgroundGrade: '985/211',
    undergradProfile: '华中某 985 · 材料科学与工程',
    gpa: '89.4 / 100',
    testScores: '雅思 7.5 (单项 7.0+)',
    admitUniversity: '牛津大学 (University of Oxford)',
    admitProgram: 'MSc in Materials Science and Engineering',
    hardBottlenecks: '学术专业素养极强，但英文学术表达相对生硬拘谨，曾因自写文书缺乏学术批判性而在往年遭遇挫败。',
    strategicInsight: '剑桥三一学院博后陆博亲自带读牛津材料系最新 5 篇顶刊论文，从学术脉络重塑研究计划，在文书中清晰指出牛津当前实验室研究的潜在补充点。',
    keyDeliverables: ['牛津大学学术研究动机信', '材料微观晶格实验报告合辑', '牛津系主任级学术面试抗压答辩'],
    finalResult: '牛津大学全录取，免除后续语言班要求。',
    leadAdvisorId: 'adv-lu',
    leadAdvisorName: '陆博 (剑桥大学博后)',
    quote: '“学术申请讲求‘对话感’。博研书院让我明白，向牛津教授陈述申请意图，不是卑微求学，而是在同行学者之间展示你的学术价值。”',
    authorized: true,
    date: '2025-02-18'
  },
  {
    id: 'case-05',
    slug: 'risd-mdes-interdisciplinary-2025',
    studentInitials: 'M同学',
    enrollmentYear: '2025秋季',
    trackId: 'arts',
    trackName: '跨学科设计与前沿艺术',
    backgroundGrade: '艺术跨学科',
    undergradProfile: '国内普通二本院校 · 视觉传达设计',
    gpa: '3.45 / 4.0',
    testScores: '托福 98 (写作26)',
    admitUniversity: '罗德岛设计学院 (Rhode Island School of Design)',
    admitProgram: 'Master of Design in Interior Studies / Adaptive Reuse',
    hardBottlenecks: '院校背景弱，早期自编作品集仅停留于商业包装与海报设计，严重欠缺空间叙事与当代思辨厚度。',
    strategicInsight: '沈梦舟导师对其进行 6 个月作品集重构，打破平面局限，以“中国传统木构遗存的非实体数字化再造”为主案，融入物理材料破坏性实验手稿。',
    keyDeliverables: ['4大主题跨学科概念设计手稿集', '物质材质实验视频纪录片', 'RISD风格独立艺术家陈述 (Artist Statement)'],
    finalResult: '逆袭拿下罗德岛设计学院 (RISD) Master of Design 录取，并获 12,000 美元专项院长奖学金。',
    leadAdvisorId: 'adv-shen',
    leadAdvisorName: '沈梦舟 导师 (RISD硕士)',
    quote: '“沈老师逼着我丢掉了几十张精致却空洞的效果图，逼我拿起刻刀与木头去感受材料的裂纹。那本沾满木屑与铅笔灰的手稿本，成了我打动RISD的关键。”',
    authorized: true,
    date: '2025-03-24'
  },
  {
    id: 'case-06',
    slug: 'andover-exeter-boarding-2025',
    studentInitials: 'H同学',
    enrollmentYear: '2025秋季',
    trackId: 'k12',
    trackName: '低龄国际高中与成长型寄宿',
    backgroundGrade: '国际高中/K12',
    undergradProfile: '上海某双语学校 · 8年级在读',
    gpa: '全 A (GPA 4.0)',
    testScores: '小托福 895/900, 托福 111, SSAT 98%',
    admitUniversity: '菲利普斯埃克塞特中学 (Phillips Exeter Academy)',
    admitProgram: 'Grade 9 Entry (High School Boarding)',
    hardBottlenecks: '优秀学子在申美高中扎堆，孩子性格沉稳内向，初次模拟面试中应对哈克尼斯圆桌（Harkness）开放式讨论容易退缩。',
    strategicInsight: '顾清华博士联合常春藤美高前招生专员开展 8 次全景沙盘，不教套路模板，转而启发孩子在天文学与古典大提琴上的纯粹沉浸，训练有温度的真诚表达。',
    keyDeliverables: ['全家教育理念与价值观白皮书', '学生自编天文观测日记精编', '埃克塞特圆桌式研讨模拟课程'],
    finalResult: '斩获菲利普斯埃克塞特中学与劳伦斯维尔中学 (Lawrenceville) 双顶尖美高录取。',
    leadAdvisorId: 'adv-gu',
    leadAdvisorName: '顾清华 博士 (哥大教育学博士)',
    quote: '“家长陈述那一章，顾博士帮助我们做父母的彻底理清了培养孩子的教育终极目的。这不仅是一场申请，更是一次全家人的精神洗礼。”',
    authorized: true,
    date: '2025-03-10'
  },
  {
    id: 'case-07',
    slug: 'hku-llm-law-2026',
    studentInitials: 'Z同学',
    enrollmentYear: '2026春/秋',
    trackId: 'hk-sg',
    trackName: '港新公立顶尖研判',
    backgroundGrade: '985/211',
    undergradProfile: '国内知名政法类 211 · 法学专业',
    gpa: '86.4 / 100',
    testScores: '雅思 7.5 (写作7.0)',
    admitUniversity: '香港大学 (The University of Hong Kong)',
    admitProgram: 'Master of Laws (LL.M. in Corporate and Financial Law)',
    hardBottlenecks: '司法考试备考与毕业论文冲突，精力分散；港大法学院对普通法系基础与商业实务经历考查极细。',
    strategicInsight: '陈立言导师协助其利用已有的跨国律所涉外非诉项目经历，在个人陈述中将大陆新公司法改革与香港普通法涉外仲裁紧密串联，直击港大法学院教授研判偏好。',
    keyDeliverables: ['涉外商事法案例研析文书', '全套港大法学院全真面试机经与速记备忘录', '跨国律所合伙人推荐信校准'],
    finalResult: '香港大学法学院 LL.M. 首轮录取，并获香港中文大学法学全额录取。',
    leadAdvisorId: 'adv-chen',
    leadAdvisorName: '陈立言 导师 (LSE硕士)',
    quote: '“博研书院让我感受到的是真正的法律学术共同体态度。文书里面对判例法的引注严谨规范到了每一个逗号。”',
    authorized: true,
    date: '2026-01-22'
  },
  {
    id: 'case-08',
    slug: 'lse-finance-double-degree-2025',
    studentInitials: 'Y同学',
    enrollmentYear: '2025秋季',
    trackId: 'uk-pg',
    trackName: '英国G5研博深耕',
    backgroundGrade: '美本/海本',
    undergradProfile: '美国加州大学某分校 · 数学与经济学双学位',
    gpa: '3.78 / 4.0',
    testScores: '免语言, GRE 329 (Verbal 160, Quant 169)',
    admitUniversity: '伦敦政治经济学院 (LSE)',
    admitProgram: 'MSc Finance and Economics',
    hardBottlenecks: '海本学生虽无语言障碍，但因缺乏强有力的英国院校推荐人，申请 LSE 顶级量化项目时文书容易写成泛泛的美式叙事风格。',
    strategicInsight: '陆博精准调整其英式逻辑结构，砍掉抒情段落，聚焦微观计量经济学模型代码及对欧洲央行货币政策的独立批判，完全对标 LSE 严苛的理科底色。',
    keyDeliverables: ['英伦古典学院派学术目的陈述', '计量经济学代码与实证研究附录', 'LSE先修数理课程详细背书'],
    finalResult: '顺利斩获 LSE MSc Finance and Economics 录取，并在第二阶段获帝国理工商学院 Finance 录取。',
    leadAdvisorId: 'adv-lu',
    leadAdvisorName: '陆博 (剑桥大学博后)',
    quote: '“美本的通识教育与英国高度垂直的学术风格有巨大鸿沟。书院帮我实现了这种学术语言与思维模式的完美跨洋切换。”',
    authorized: true,
    date: '2025-01-08'
  }
];

// -------------------------------------------------------------
// 4. 学术顾问导师团队 (Advisors)
// -------------------------------------------------------------
export const ADVISORS: AdvisorItem[] = [
  {
    id: 'adv-lu',
    name: '陆博 (Dr. Lu)',
    title: '首席学术战略官 · 自然科学与工程研判领衔',
    academicBackground: '剑桥大学 (University of Cambridge) 物理学博士后，清华大学材料科学学士/博士',
    researchFocus: '量子计算材料学、高维复杂系统建模与英国G5硕博选校博弈',
    experienceYears: 13,
    admitHighlights: ['牛津大学物理/材料硕士 23 例', '剑桥大学博士全奖 14 例', '帝国理工计算机/电子工程 78 例'],
    specialtyTracks: ['uk-pg', 'hk-sg'],
    representativeCases: ['imperial-college-cs-2025', 'oxford-materials-msc-2025', 'lse-finance-double-degree-2025'],
    consultationPhilosophy: '“学术申请不是商品交易，而是同行之间的学术契约。你必须在文书与交流中，证明你有能力成为该学科前沿的研究伙伴。”',
    parentSyncMethod: '双周学术进度备忘录抄送家长邮箱，关键选校梯队决策提供客观量化分析报表。',
    acceptingAppointments: true,
    honoraryTitles: ['英国皇家物理学会 (IOP) 会员', '博研学术委员会终身主席']
  },
  {
    id: 'adv-gu',
    name: '顾清华 博士 (Dr. Gu)',
    title: '人文与通识教育总监 · 常春藤盟校本科研判领衔',
    academicBackground: '哥伦比亚大学 (Columbia University) 比较教育学博士，北京大学英语语言文学学士',
    researchFocus: '英美私立学校精英教育史、全人文书叙事构建与家庭教育学',
    experienceYears: 15,
    admitHighlights: ['常春藤盟校 (大藤) 本科直录 31 例', '美本 Top 20 综合性大学直录 120+ 例', '全美前十寄宿美高 40+ 例'],
    specialtyTracks: ['us-ug', 'k12'],
    representativeCases: ['columbia-ivy-undergrad-2025', 'andover-exeter-boarding-2025'],
    consultationPhilosophy: '“顶尖大学拒绝戴着精致假面具的考试机器。我们寻找并唤醒孩子内心最真实的火种，并让常春藤招生官清晰看见。”',
    parentSyncMethod: '支持线上/线下三方战略诊断会，提供《家庭教育哲学与申请主轴对齐备忘录》。',
    acceptingAppointments: true,
    honoraryTitles: ['全美大学升学顾问协会 (NACAC) 认证顾问', '哥大中国学者联谊会前会长']
  },
  {
    id: 'adv-chen',
    name: '陈立言 导师 (Prof. Chen)',
    title: '商科与公共政策主管 · 港新与泛亚太研判领衔',
    academicBackground: '伦敦政治经济学院 (LSE) 金融学硕士，复旦大学经济学学士',
    researchFocus: '跨国金融市场规制、亚太宏观投资策略与港新多国联申沙盘',
    experienceYears: 11,
    admitHighlights: ['新加坡国立/南洋理工硕博 90+ 例', '港大/中大/科大金融与管理 160+ 例', 'LSE/IC商科录取 45 例'],
    specialtyTracks: ['hk-sg', 'uk-pg'],
    representativeCases: ['nus-fintech-2026', 'hku-llm-law-2026'],
    consultationPhilosophy: '“商业世界尊重数据与执行效率。在港新申请中，精准的批次节奏把握与敏锐的先修课包装就是最大的确定性。”',
    parentSyncMethod: '企微专属协同群随时响应，关键轮次递交与录取意向确认即时电话直通车。',
    acceptingAppointments: true,
    honoraryTitles: ['特许金融分析师 (CFA)', '上海国际商事仲裁咨询顾问']
  },
  {
    id: 'adv-shen',
    name: '沈梦舟 导师 (M. Shen)',
    title: '跨学科设计实验室主任 · 艺术与建筑研判领衔',
    academicBackground: '罗德岛设计学院 (RISD) 跨学科设计硕士，中国美术学院建筑学学士',
    researchFocus: '空间叙事、当代材料思辨与人居环境可持续性研究',
    experienceYears: 9,
    admitHighlights: ['罗德岛设计学院 (RISD) 录取 22 例', '英国皇家艺术学院 (RCA) 录取 38 例', '伦敦艺术大学 (UAL) 70+ 例'],
    specialtyTracks: ['arts'],
    representativeCases: ['risd-mdes-interdisciplinary-2025'],
    consultationPhilosophy: '“作品集不是画作展览，而是对世界的批判性反思。有缺陷但充满生命力的探索手稿，远胜过冷冰冰的商业渲染。”',
    parentSyncMethod: '作品集阶段性节点评审录像存档，提供图文并茂的进展白皮书。',
    acceptingAppointments: true,
    honoraryTitles: ['美国建筑师学会 (AIA) 国际准会员', '威尼斯建筑双年展参展青年建筑师']
  }
];

// -------------------------------------------------------------
// 5. Practice Lab 最佳实践手册与工具 (Playbooks & Tools)
// -------------------------------------------------------------
export const PRACTICE_PLAYBOOKS: PlaybookItem[] = [
  {
    id: 'pb-01',
    slug: 'double-non-g5-playbook',
    title: '双非院校均分 80–85 分冲刺英联邦 QS 前 50 选校分层模型',
    category: '选校博弈',
    author: '博研学术委员会 研判组',
    readTime: '12 分钟研读',
    targetAudience: '国内非 985/211 高校在读，均分 80–86 分，渴望冲刺英国爱丁堡、KCL、曼大、布里斯托等名校的学子',
    notForAudience: '均分低于 75 分或已锁定纯常春藤美本的学子',
    summary: '系统解析英国大学对于中国院校的内部“认可名单（List）”算法与加权绩点计算口径，拆解 3 种通过冷门交叉专业、课程大纲先修补正打破层级壁垒的实操路径。',
    answerBlock: '【核心结论】双非 80–85 分绝非英前50绝缘体。突破口在三处：① 规避各校严管商学院，转向社会科学与数据科学交叉的边缘院系；② 针对均分计算，剔除军训与思想政治公选课，提供系主任加权专业主干课 Ranking 证明；③ 在 9 月第一周首轮无语言抢跑递交。',
    keySteps: [
      { step: '01', title: '穿透院校 List 级别锁定', desc: '对照目标大学最新 2026 认可名单，核验自身院校在社科、工科、理科不同院系的入围档次与均分硬门槛。', toolRef: 'assessment' },
      { step: '02', title: '梳理专业课核心学分对标表', desc: '制作中英双语《先修课匹配度说明单 (Pre-requisite Modules Matrix)》，强化高数与核心专业课成绩。' },
      { step: '03', title: '撰写严谨的学术动机信 (SOP)', desc: '不谈情怀，聚焦大学特定课程模块（Modules），指明某两篇导师论文对自身学术志向的启发。' },
      { step: '04', title: '首轮开放首周极速递交', desc: '在名额最为充裕、硬卡指标尚未收紧的 Stage 1 抢占审核席位。', toolRef: 'timeline' }
    ],
    diyCeiling: '【DIY 局限性】各校内部名单每季度均有微调并不对公众完全透明；跨专业学分换算的专业词汇与论述逻辑若失之毫厘，将直接导致机筛自动秒拒。',
    whenAdvisorNeeded: [
      '目标专业在院校官网上写明“Competitively High”且未公开具体最低分时',
      '大学成绩单存在 1–2 门不及格或重修历史需要官方公函解释时',
      '需要协助与海外大学 Admissions Office 进行争议申诉（Appeals）时'
    ],
    updatedAt: '2026年3月最新审定'
  },
  {
    id: 'pb-02',
    slug: 'hk-singapore-timeline-playbook',
    title: '授课型港硕与新公立网申时间轴与材料极简极严标准',
    category: '选校博弈',
    author: '陈立言 导师',
    readTime: '10 分钟研读',
    targetAudience: '意向申请香港大学、香港中文大学、香港科技大学、新国立及南洋理工的在校生及在职职场人士',
    notForAudience: '仅打算考取国内研招且未准备托福/雅思考试的访客',
    summary: '针对港新极其残酷的多轮轮次制（Rolling Admissions），提供精确到周级的时间轴倒推表，并给出符合涉外合规标准的成绩单盖章、推荐信密封与在读证明极简清单。',
    answerBlock: '【核心结论】港新申请胜负手在“早（Early Bird）与准”。商科与热门科技专业 70% 的录取名额在第一轮（10–11月）消耗完毕。材料准备必须严丝合缝：教务处密封件、中英文等级说明、官方评分标准表缺一不可，否则将被系统退回延至后续批次。',
    keySteps: [
      { step: '01', title: '大三下学期（4-6月）：锁定标化与硬核材料', desc: '完成雅思 7.0+ 或托福 100+，商科学生全力备考 GMAT/GRE。开具带教务处公章的 6 学期中英成绩单与在读证明。', toolRef: 'checklist' },
      { step: '02', title: '暑期（7-8月）：学术文书与推荐人合规授权', desc: '完成专属 CV 与推荐信起草，与两位学术推荐人确定工作邮箱与签字流程。' },
      { step: '03', title: '秋季（9-10月）：网申首轮全开直投', desc: '网申系统开放首周内逐项核对上传，并在 24 小时内催促推荐人完成网推邮件链接提交。', toolRef: 'timeline' },
      { step: '04', title: '冬季（11-次年1月）：高频英文技术面试攻坚', desc: '梳理历年全真机经，针对金融模型、时事政策或工程算法进行 1v1 纯英文答辩模拟。' }
    ],
    diyCeiling: '【DIY 局限性】港新不同学院的推荐信提交流程差异极大（部分需纸质密封直邮，部分要求官邮问卷），网推系统链接超时失效或被误入垃圾邮箱极易导致申请逾期。',
    whenAdvisorNeeded: [
      '在职人员离校多年无法联系原本科导师撰写学术推荐信时',
      '收到面试通知且准备时间不足 72 小时需要突击机经演练时',
      '面临留位费（Deposit）交付期限与后续志愿 Offer 时间冲突需要协调时'
    ],
    updatedAt: '2026年3月最新审定'
  },
  {
    id: 'pb-03',
    slug: 'ivy-narrative-activity-playbook',
    title: '美本活动叙事拒绝堆砌：背景提升的学术主轴法则',
    category: '文书大纲',
    author: '顾清华 博士',
    readTime: '15 分钟研读',
    targetAudience: '美本 Top 30 / 常春藤冲刺家庭，学生已有一批零散课外活动却不知如何构建 Common App 主文书',
    notForAudience: '仅申请英国或香港等不侧重课外活动体系的学子',
    summary: '破解国内留美家庭最常见的“功利性活动堆砌”困境。提出“同心圆学术主轴模型”，指导学生将零散经历收拢为一条闪耀智识好奇与社会担当的完整人生弧光。',
    answerBlock: '【核心结论】常春藤招生委员会评价活动遵循“深度胜过广度（Spike over Round）”原则。一位在某一冷门历史领域读完 50 本专著并撰写博客的申请者，其权重远胜于同时打卡模联、敬老院、网球与学生会主席的“全才样板”。活动必须具有不可被代写的独特指纹。',
    keySteps: [
      { step: '01', title: '活动资产清盘与减法剥离', desc: '列出过往所有活动，毫不留情地划掉为了应试而参加的泛商业夏令营与无实质产出的打卡式社工。' },
      { step: '02', title: '确立核心学术“火种（The Core Spike）”', desc: '找出学生哪怕不给学分也愿意废寝忘食探讨的单一领域，将其定义为主线。' },
      { step: '03', title: '设计递进式产出证据链', desc: '从阅读兴趣 → 田野调研/实验研讨 → 独立产出（论文/软件/社群方案）→ 产生真实社会微影响。' },
      { step: '04', title: 'Common App 150字符精炼打磨', desc: '利用动词主导结构（Action Verbs）与量化指标清晰勾勒个人贡献与领导力。' }
    ],
    diyCeiling: '【DIY 局限性】高中生自我认知往往存在盲区，极易陷入自我感动式的宏大叙事；缺乏专业招生官眼光，难于辨别哪些叙事在美高招生体系中被视为文化不适或特权傲慢。',
    whenAdvisorNeeded: [
      '学生兴趣广泛但缺乏统筹能力，主文书难产多次推翻时',
      '家庭经历存在特殊转折（如健康、家庭变故）需要撰写“附加信息（Additional Info）”阐释时',
      '面临顶尖院校前招生官校友面试（Alumni Interview）抗压复盘时'
    ],
    updatedAt: '2026年3月最新审定'
  },
  {
    id: 'pb-04',
    slug: 'rejection-72h-review-playbook',
    title: '拒信后 72 小时黄金复盘与申诉/补件实操清单',
    category: '风险避坑',
    author: '博研学术委员会 研判组',
    readTime: '8 分钟研读',
    targetAudience: '在常规轮中突遭心仪名校拒信（Rejection）或被放入候补名单（Waitlist）的学子及家长',
    notForAudience: '尚未递交任何网申的预备期家庭',
    summary: '收到拒信不是终点。科学界定“硬性技术错误（如绩点换算错误、缺少材料）”与“竞争性淘汰”的界限，提供合规的情真意切爱校信（LOCI）模板与申诉申辩合规流程。',
    answerBlock: '【核心结论】收到拒信第一件事：严禁情绪化在社媒宣泄或向招生办发送指责邮件。首先核查申请 Portal 中的成绩单与推荐信状态是否因学校系统偶发故障导致缺失。对于 Waitlist，撰写一封高质感的情真意切更新信（Letter of Continued Interest - LOCI），报告最新学术进展，能将转正概率提升数倍。',
    keySteps: [
      { step: '01', title: '第 0–12 小时：情绪冷却与门户系统查缺', desc: '全面核查所有递交 PDF 与推荐信接收日期，排除招生办系统漏审或均分误算。' },
      { step: '02', title: '第 12–36 小时：理性定性拒信原因', desc: '对比该专业当年录取平均画像，评估是先修课不足、名额已满，还是文书未对齐研究方向。' },
      { step: '03', title: '第 36–72 小时：撰写 LOCI 或合规申诉公函', desc: '如确有客观技术漏审，由顾问起草学术申诉公函；如在候补名单，整理递交后取得的新成果（如新论文、新奖项）撰写 LOCI。' }
    ],
    diyCeiling: '【DIY 局限性】海外大学对于 Appeals（官方申诉）有着极其森严的行政法学程序，非实质性行政错误或重大不可抗力，盲目申诉会直接触怒校方并影响同校其他学子信誉。',
    whenAdvisorNeeded: [
      '确认成绩单被招生系统算法错误扣减（如将4分制误作5分制换算）时',
      '收到常春藤或英国 G5 候补通知（Waitlist），需动用高价值学术推荐与更新文书转正时'
    ],
    updatedAt: '2026年3月最新审定'
  },
  {
    id: 'pb-05',
    slug: 'parent-contract-trap-playbook',
    title: '家长指南：如何读懂留学合同边界与识破“保录欺诈”',
    category: '家长指南',
    author: '博研书院 法务与合规事务部',
    readTime: '11 分钟研读',
    targetAudience: '承担家庭教育出资决策的家长，正在对比不同机构合同条款或对市场乱象心存疑虑的家庭',
    notForAudience: '不涉及签约决策的学生个体',
    summary: '立足中国大陆《民法典》与反不正当竞争规范，逐条揭露行业内常见的“保录买名额骗局”、“隐瞒网申账号密码”、“全额退款文字陷阱”与“导师中途掉包”等 7 大黑幕。',
    answerBlock: '【核心结论】凡声称“有内部特殊名额保录哈佛牛剑港大”的均为欺诈或学术不端买卖，极易导致学生未来面临退学及签证撤销刑事风险。一份高信誉的合同必须具备三要素：① 网申账号密码完全对学员公开；② 签约前清晰列支第三方不可退规费；③ 详细约定主导文书与战略顾问的真实姓名、履历与违约责任。',
    keySteps: [
      { step: '01', title: '要求查验顾问真实全名与学术履历', desc: '拒绝只有代号（如“Lucy老师”）的匿名流水线销售，要求在协议中绑定核心交付专家姓名。' },
      { step: '02', title: '白纸黑字确认网申账号掌控权', desc: '在合同中明确约定：学员拥有官方网申账号密码的全部知情权与登录权，严禁机构隐瞒往来邮件。' },
      { step: '03', title: '审查不可退费（Non-Refundable）条款细则', desc: '区分机构咨询服务费与使领馆规费、官方网申费、语言考试费的边界，明确各阶段解约权与退款比例。' }
    ],
    diyCeiling: '【DIY 局限性】市场上有不法中介善于利用离岸公司或阴阳合同规避监管，家长需具备基础的合同要件审查意识。',
    whenAdvisorNeeded: [
      '在任何机构签约前，希望博研书院提供公益性《第三方留学合同合规性审查建议》时'
    ],
    updatedAt: '2026年3月最新审定'
  },
  {
    id: 'pb-06',
    slug: 'plagiarism-academic-integrity-playbook',
    title: '行前 30 天：海外大学学术诚信 (Plagiarism) 与学业适应防踩坑手册',
    category: '学业适应',
    author: '陆博 & 顾清华 博士',
    readTime: '13 分钟研读',
    targetAudience: '已拿到英美加澳港新录取、即将于 3–6 个月内赴海外开启大学或研究生生活的留学生',
    notForAudience: '初涉留学规划的早期探索者',
    summary: '针对中国留学生在海外最易遭受纪律处分乃至开除的“学术剽窃 (Plagiarism)”风险，详解 APA/Chicago/MLA 规范引注、AI 工具（如 ChatGPT）使用红线、以及海外教授 Office Hour 高效沟通法则。',
    answerBlock: '【核心结论】海外大学对抄袭实行零容忍制度（Zero-Tolerance）。引用他人观点哪怕仅换了几个同义词而未做规范引注，即构成学术不端；此外，“自我剽窃（把在A课提交过的文章在B课再次提交）”同样属于严重违规。熟练使用 Turnitin 查重与掌握学术写作规范是行前必须补上的一课。',
    keySteps: [
      { step: '01', title: '掌握三大国际主流引注格式', desc: '商科社科熟练运用 APA 7th，人文学科掌握 MLA 9th/Chicago，理工科熟悉 IEEE/Nature 规范。' },
      { step: '02', title: '理清生成式 AI 的合法与非法边界', desc: '区分“语言辅助润色”与“思路代写”，严格遵循各门课程 Syllabus 中对 AI 工具的明文要求并保留提示词记录。' },
      { step: '03', title: '学会主动预约 Office Hour', desc: '在学期第 2 周带着具体学术问题拜访任课教授，建立积极主动的学者形象，为未来争取研究助理（RA）打下基础。' }
    ],
    diyCeiling: '【DIY 局限性】国内应试教育中罕有系统的学术写作与文献引注训练，习惯于通篇总结归纳，在海外容易无意识踩中雷区。',
    whenAdvisorNeeded: [
      '赴海外前需要参加 1v1 学术写作文献引注专项实训营时',
      '在海外遭遇学术诚信指控（Academic Misconduct Hearing）需要紧急应对指导时'
    ],
    updatedAt: '2026年3月最新审定'
  }
];

// -------------------------------------------------------------
// 6. Guides 内容中心 (权威真实指南 + 答案块 + 下一站)
// -------------------------------------------------------------
export const GUIDES_ARTICLES: GuideArticle[] = [
  {
    id: 'guide-01',
    slug: 'uk-masters-cost-breakdown-2026',
    title: '2026/2027 英国授课型硕士全成本精细测算账单：从学费、伦敦租金到隐性规费',
    category: '费用政策',
    author: '陈立言 导师',
    publishYear: '2026/2027年最新核准口径',
    dateModified: '2026-03-15',
    summary: '基于英国罗素集团 24 所大学最新学费公告与英国国家统计局 (ONS) 租金指数，全面梳理涵盖学费、住宿、NHS医疗附加费、签证与生活开支的真实账目。',
    answerBlock: '【答案结论】2026/2027 学年英国授课型硕士一年全部实际开销为：伦敦地区 45万–58万元人民币；非伦敦地区（如曼彻斯特、爱丁堡、伯明翰）35万–46万元人民币。学费占整体预算 55%–65%（商科与理工科通常较文科高 30%–50%）。家庭应预留至少 5%–10% 的汇率波动冗余金。',
    content: [
      '学费层面：罗素集团名校 2026 年国际生硕士学费普遍在 26,000–42,000 英镑之间。牛剑及帝国理工商科（如金融/金融科技）最高可达 45,000 英镑；传统文社科与教育学相对温和，约在 24,000–29,000 英镑。',
      '住宿层面：伦敦 Zone 1–2 学生公寓（En-suite 或 Studio）周租金约在 320–550 英镑，年租期通常为 51 周，折合约 1.6万–2.8万英镑（15万–26万元人民币）；非伦敦地区同类房型周租金约 180–300 英镑，年预算约 8万–14万元人民币。',
      '法定义务规费：英国学生签证申请费（约 490 英镑）加 NHS 移民健康附加费（IHS，目前为每年 776 英镑），此项为硬性支出，合计约 1.2 万元人民币。',
      '生活杂费与交通：饮食、日常日用品与交通卡约 6,000–9,000 英镑/年。综合测算，除非获得奖学金，建议家庭准备不低于 45 万元人民币的总流动资金。'
    ],
    faqs: [
      { q: '学费可以分期付款吗？有额外手续费吗？', a: '绝大多数英国公立大学支持按学期（通常为 2–3 期）分期付款，一般不收取额外手续费，但需在指定日期前准时划扣，逾期可能面临滞纳金或学生账户冻结。' },
      { q: '留学生合法打工能覆盖多少生活费？', a: '持有 Tier 4 / Student 签证的授课型硕士在学期期间每周合法打工不得超过 20 小时。按英国法定最低时薪（约 11.44 英镑）计算，每月最多补缴 5,000–7,000 元人民币，可减轻零食与交通开支，但绝不可寄希望于打工赚取学费，否则极易影响学业乃至触发违规打工取消签证的法律风险。' }
    ],
    nextStops: [
      { title: '测算你的专属留学预算：在线费用粗算工具', url: '/tools/cost', reason: '输入你的意向城市与专业类型，3秒获取精确到千元的预算清单' },
      { title: '研读：双非院校均分80-85分冲刺G5选校模型', url: '/lab/playbooks/double-non-g5-playbook', reason: '了解如何在有限预算下最大化名校投入产出比 (ROI)' }
    ],
    relatedTrackSlug: 'uk-pg'
  },
  {
    id: 'guide-02',
    slug: 'g5-list-and-gpa-admission-truth',
    title: '牛津、剑桥与帝国理工硕士申请录取真相：均分算法与课程匹配度解析',
    category: '英研G5',
    author: '陆博 (剑桥三一博后)',
    publishYear: '2026/2027年申请季权威版',
    dateModified: '2026-03-20',
    summary: '穿透官方网站简略的“2:1 或 1st Class Honours”表述，揭秘招生委员会在审核中国本科成绩单时实际运行的核心算法与淘汰红线。',
    answerBlock: '【答案结论】英国 G5 官方标注的“2:1 相当于中国大学 80–85 分”对高竞争性专业完全失去指导意义。帝国理工与 UCL 的计算机、商科及高级工程项目，实际录取中国 985 学子的均分中位数普遍在 88.5 分以上；双非学子若想突围，专业课必须在 90–92 分以上且需递交由系主任签章的专业排名（Top 2%–3%）证明。',
    content: [
      '算法陷阱：国内高校成绩单上的算术平均分与加权平均分往往与英方算法存在断层。英国名校招生官只看专业核心课（Major Modules），体育、思想政治、军事理论等通识选修往往在后台被降权或剔除。',
      '先修课学分排查：以帝国理工 MSc Computing 为例，若本科缺少“离散数学”、“数据结构与算法”或“计算机体系结构”至少 30 个 ECTS 欧洲学分，无论总均分多高都会触发自动拒信。',
      '学术文书的学术密度：英国 G5 教授只给每份文书 3–5 分钟审阅时间。通篇谈论“童年梦想”与“人生感悟”的文书会被瞬间判定为缺乏学术训练；文书必须直入主题，讨论具体学术论文争议与你的研究视角。'
    ],
    faqs: [
      { q: '被 G5 拒了之后，能立刻向招生办提出申诉吗？', a: '英国大学申诉（Appeal）仅在存在程序不公或客观技术差错（如校方遗漏材料）时有效。若仅因“竞争激烈”，申诉无逆转可能。更理性的做法是评估备选志愿或补充新成果申请次年轮次。' }
    ],
    nextStops: [
      { title: '查看真实案例：双非逆袭帝国理工计算机无条件录取', url: '/cases/imperial-college-cs-2025', reason: '看看一位来自华东双非高校的学子如何通过先修课大纲与开源项目打动帝国理工' },
      { title: '预约 45 分钟学术背景研判诊断', url: '/book', reason: '让剑桥博后导师亲自为您测算成绩单先修课匹配度' }
    ],
    relatedTrackSlug: 'uk-pg'
  },
  {
    id: 'guide-03',
    slug: 'ivy-supplemental-essays-strategy',
    title: '拆解常春藤 2026 附加文书（Supplemental Essays）：招生官在字里行间找什么？',
    category: '美本Top30',
    author: '顾清华 博士',
    publishYear: '2026年最新修订',
    dateModified: '2026-03-22',
    summary: '常春藤盟校已全面升级附加文书题目。本文逐一剖析哈佛大学 5 篇短问答、耶鲁大学 35 词微写作与哥伦比亚大学必读书单背后的深层心理测试模型。',
    answerBlock: '【答案结论】常春藤附加文书不是 Common App 主文书的简单复述，而是每所大学特有校训（Ethos）的试金石。哈佛考察的是“智识好奇心如何与广泛社会群体产生共鸣”；哥大通过书单考察“不为应试而读书的原生阅读偏好”；耶鲁考察“微型词句中体现的思想幽默感与哲学自省”。回答切忌照搬通用文书。',
    content: [
      '“Why College”类文书的核心致命伤是把学校官网课程描述抄一遍。招生官要看的不是他们学校多好，而是你的思考方式如何与他们特定的教授实验室、甚至特定图书馆档案室产生化学反应。',
      '面对跨文化经历题目，切忌沉溺于“去国外旅游感到世界很大”的悬浮叙事。深度挖掘微观视角的困惑、误解与破冰，展现真实抗挫心理韧性。',
      '字数限制极为苛刻（往往仅 150–250 词），每一句话必须承担“披露新事实”或“体现新思考维度”的职责，杜绝任何外交辞令般的客套话。'
    ],
    faqs: [
      { q: '附加文书必须每一所学校都完全重写吗？能互相套用吗？', a: '基础素材可以提炼共性，但每一所常春藤名校的附加题结构都经过精细心理学设计，套用痕迹会被资深审阅官一眼识破并判定缺乏诚意。核心思想可以相通，但呈现角度必须与该校特定社群完全对齐。' }
    ],
    nextStops: [
      { title: '研读：美本活动叙事拒绝堆砌 Playbook', url: '/lab/playbooks/ivy-narrative-activity-playbook', reason: '学习如何把零散活动提炼为主文书与附加文书的坚固支柱' },
      { title: '预约常春藤前招生体系导师初诊', url: '/book', reason: '针对您的文书草稿进行 1v1 结构诊断' }
    ],
    relatedTrackSlug: 'us-ug'
  },
  {
    id: 'guide-04',
    slug: 'hk-singapore-visa-and-financial-prep',
    title: '港新留学签证、资金证明与行前合规风控全流程红线',
    category: '港新前沿',
    author: '博研合规与签证支持中心',
    publishYear: '2026最新政策指南',
    dateModified: '2026-03-25',
    summary: '香港特区入境事务处 (ImmD) 与新加坡移民与关卡局 (ICA) 对于学生签注办理材料的最新要求、存款证明存期认定与父母担保函法律要点。',
    answerBlock: '【答案结论】香港学生签证办理周期通常为 6–10 周，新加坡 Student Pass (STP) 为 4–6 周。资金证明是首要审查要件：建议准备不少于 30 万–40 万元人民币的银行存款证明，在递交前存满 3 个月以上。如资金在父母名下，必须附带由公证处或派出所认证的亲属关系证明及法定资助声明书。',
    content: [
      '香港签证流程：收到官方 Offer → 接受录取并缴纳留位费 (Deposit) → 院校向申请人发送签证申请包裹指南 → 寄送纸质或在线上传申请表 (ID995A)、身份证件、学历证明及资金证明 → 院校审核无误后递交入境处 → 入境处签发电子签证 (e-Visa) → 在大陆公安出入境办理往来港澳通行证及 D 逗留签注。',
      '新加坡流程：院校在 ICA SOLAR 系统中为学生注册申请编号 → 学生登录 SOLAR 填写 eForm 16 并支付申请规费 → 获批原则性批准信 (IPA Letter) → 凭 IPA 单次入境新加坡 → 在当地指定医疗中心体检 → 预约前往 ICA 大楼完成指纹与生物识别换领正式学生准证 (STP)。',
      '风控红线：严禁提交存期不足或突击大笔存入而缺乏合法收入佐证的异常账户流水；香港入境处对非应届毕业生的断档期（Gap Year）有权要求补充工作证明或合法生计说明。'
    ],
    faqs: [
      { q: '存款证明必须冻结到开学吗？', a: '建议开具冻结期覆盖至获得签证批准后（通常冻结 3–6 个月）。签证获批并顺利抵校后，该资金即可正常解冻转入日常学费与生活账户。' }
    ],
    nextStops: [
      { title: '下载材料自检清单：港新申请必备证件全览', url: '/tools/checklist', reason: '逐项核对身份证件、教务处盖章件与资金证明规范' }
    ],
    relatedTrackSlug: 'hk-sg'
  }
];

// -------------------------------------------------------------
// 7. Community 社区与互动飞轮 (Topics & AMA)
// -------------------------------------------------------------
export const COMMUNITY_TOPICS: CommunityTopic[] = [
  {
    id: 'comm-01',
    title: '【特邀在读】剑桥自然科学Tripos本科到帝国理工博士：我的5年全额奖学金答辩实录',
    author: 'Julian 学长',
    authorBadge: '特邀在读',
    authorUniversity: '帝国理工学院 物理系博士在读 (剑桥本科毕业)',
    category: '真实在读体验',
    replyCount: 38,
    viewCount: 1420,
    previewSnippet: '很多学弟学妹问我，英国博士奖学金到底怎么拿？是看导师喜好还是看学院委员会？今天用我真实的 2 轮导师学术面试与 EPSRC 奖学金答辩 PPT 结构，给大家做一次彻头彻尾的复盘...',
    fullBody: '在英国申请全额奖学金（如 EPSRC 或学院专项 Studentship），核心考核点从不只是你的本科学历，而是你的研究课题（Research Proposal）是否恰好能填补导师目前在研重大课题的某一关键子模块。在答辩现场，教授连续追问了我三个关于高维张量网络算法收敛性的细节，如果不是在博研书院期间陆博带我扎实推导过这套数学公式，我当时可能完全接不住这个即兴提问...',
    requiresAuthToReadFull: true,
    createdAt: '2026-03-24',
    tags: ['英国G5', '博士全奖', '学术答辩', '真实在读']
  },
  {
    id: 'comm-02',
    title: '【官方精选】双非背景冲刺英国 G5 到底卡在什么地方？2025/2026 录取数据深度拆解',
    author: '博研学术委员会 研判室',
    authorBadge: '官方精选',
    authorUniversity: '博研书院官方数据团队',
    category: '选校与定位',
    replyCount: 64,
    viewCount: 2850,
    previewSnippet: '我们梳理了过去三年内超过 400 份双非院校申请英国 G5 的真实案例库。发现 82% 被秒拒的学生，根本不是输在均分上，而是败在先修课学分对应与递交批次上...',
    fullBody: '拆解数据发现一个规律：双非学生在帝国理工工科与 UCL 多数院系的成功率，在每年 9 月 15 日到 10 月 15 日首轮递交期为 24.3%，而一旦拖延至 12 月以后，成功率直线坠落至 4.1%。此外，英国院校对双非高校的加权算法中，专业核心课的权重占 80% 以上。我们在文末附上了 2026 最新各学院名单比对备忘录...',
    requiresAuthToReadFull: true,
    createdAt: '2026-03-20',
    tags: ['选校策略', '数据复盘', '双非逆袭', 'G5名单']
  },
  {
    id: 'comm-03',
    title: '【顾问专栏】常春藤招生办为什么极度反感“AI 生成的精致文书”？',
    author: '顾清华 博士',
    authorBadge: '顾问专栏',
    authorUniversity: '博研书院 常春藤研判领衔 / 哥大博士',
    category: '文书与面试',
    replyCount: 52,
    viewCount: 3100,
    previewSnippet: '近期美本常春藤多所院校招生负责人公开表示，他们已将反 AI 审查嵌入初审流程。很多学生自以为用 ChatGPT 润色得天衣无缝，殊不知在经验丰富的招生官眼里，这种文章一眼就能被辨识...',
    fullBody: 'AI 生成的文本具有极其典型的特征：华丽的排比句、过于平滑缺乏瑕疵的情感过渡、以及充满“Delve into”、“Tapestry”、“Testament”等高频空洞词汇。常春藤名校寻找的是一个真实生活在当下世界、会困惑、会犯错、并在自我否定中建立起独立思辨能力的鲜活青少年，而不是一篇没有任何情绪体温的标准八股文...',
    requiresAuthToReadFull: true,
    createdAt: '2026-03-18',
    tags: ['美本Top30', '文书指导', '反AI套路', '常春藤']
  },
  {
    id: 'comm-04',
    title: '【特邀在读】哥大本科到华尔街投行实习：全美最卷学院的生存与选课指南',
    author: 'Vivian 学姐',
    authorBadge: '特邀在读',
    authorUniversity: '哥伦比亚大学 经济与数学系本科在读',
    category: '真实在读体验',
    replyCount: 29,
    viewCount: 1680,
    previewSnippet: '纽约的生活节奏快得令人窒息。初到晨边高地（Morningside Heights），如何在繁重的 Core Curriculum（核心课程）与每周密集的 Coffee Chat 之间找到呼吸的节奏...',
    fullBody: '很多刚进哥大的国内同学会把全部精力投在刷 GPA 上，结果到大二大三发现身边的同学已经拿到了摩根大通或麦肯锡的暑期实习 Offer。在曼哈顿读书，你必须学会把你的学术思考直接搬到华尔街的社交场域中。这篇攻略教你如何高效完成西方文学与现代哲学阅读，并合理规划每学期的课程负载...',
    requiresAuthToReadFull: true,
    createdAt: '2026-03-12',
    tags: ['美本生活', '哥伦比亚大学', '投行实习', '选课攻略']
  }
];

// -------------------------------------------------------------
// 8. 默认模拟线索库与状态机 (Leads Storage Mock)
// -------------------------------------------------------------
export const INITIAL_LEADS: LeadSubmission[] = [
  {
    id: 'BY-202609-0821',
    name: '周先生 (家长)',
    mobile: '138****9218',
    wechat: 'zhou_invest2026',
    trackId: 'us-ug',
    currentBackground: '上海某公立国际部高二 · AP体系',
    targetEnrollmentYear: '2026秋季美本直申',
    preferredAdvisorId: 'adv-gu',
    gpaRange: '3.85–3.95 (满分4.0)',
    languageScore: '托福已考 108，SAT准备中',
    budgetRange: '70万–90万元/年 (全额自费预算充足)',
    remarks: '孩子理科很好但文书表达偏内向，希望能约顾清华博士进行一次线上家庭三方诊断。',
    formVariant: 'book',
    status: '15分钟SLA响应中',
    submittedAt: '2026-09-28 09:12',
    slaDeadline: '2026-09-28 09:27 (剩余 8 分钟)',
    privacyConsented: true
  },
  {
    id: 'BY-202609-0794',
    name: '林同学 (本人)',
    mobile: '186****3310',
    wechat: 'lin_academic',
    trackId: 'uk-pg',
    currentBackground: '武汉某211高校 · 计算机科学与技术',
    targetEnrollmentYear: '2026秋季英国硕士',
    preferredAdvisorId: 'adv-lu',
    gpaRange: '均分 86.8 / 100',
    languageScore: '雅思备考中，目标 7.5',
    budgetRange: '40万–50万元/年',
    remarks: '想申请帝国理工或爱丁堡的软件工程方向，但担心本科重修了一门物理会成为污点，需要陆博评估。',
    formVariant: 'assessment',
    status: '已完成初诊',
    submittedAt: '2026-09-27 16:45',
    slaDeadline: '2026-09-27 17:00 (已按期履约)',
    privacyConsented: true
  }
];

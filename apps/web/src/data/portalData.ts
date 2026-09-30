/**
 * 展会巡展、城市分公司与留学干货快讯数据
 * 贴合新东方前途出国等国内头部留学门户的真实运营体系
 */

export interface ExpoEventItem {
  id: string;
  title: string;
  theme: string;
  type: '全国巡展' | '名校招生官面对面' | '大咖专场讲座' | '线上云展会';
  city: string;
  venue: string;
  dateTime: string;
  status: '正在报名' | '名额紧张' | '火热进行中' | '即将启幕';
  guestSchools: string[];
  highlights: string[];
  badge: string;
  registeredCount: number;
}

export interface BranchOfficeItem {
  id: string;
  city: string;
  province: string;
  tier: '全国总部' | '直营分公司' | '海外中心';
  address: string;
  phone: string;
  hours: string;
  consultantCount: number;
  featuredCountries: string[];
}

export interface NewsArticleItem {
  id: string;
  category: '名校政策' | '签证速递' | '申请大数据' | '名校访谈' | '行前清单';
  title: string;
  summary: string;
  date: string;
  readCount: string;
  tag: string;
  hot?: boolean;
}

// 2026 春季/秋季 国际教育展及招生官专场
export const EXPO_EVENTS: ExpoEventItem[] = [
  {
    id: 'expo-01',
    title: '2026 全球名校春季教育展 · 招生官直面会 (北京站)',
    theme: '英美加澳港新 80+ 海外名校联袂参展 · 现场评估学术背景 & 预录取面试',
    type: '全国巡展',
    city: '北京',
    venue: '中国国际贸易中心三期 · 大宴会厅 (地铁国贸站)',
    dateTime: '2026年3月28日 (周六) 13:00 - 18:00',
    status: '火热进行中',
    guestSchools: ['帝国理工学院', '伦敦大学学院 (UCL)', '康奈尔大学招生代表', '南洋理工大学 (NTU)', '墨尔本大学'],
    highlights: ['前藤校招生官现场一对一 15 分钟简评', '2026《中国留学白皮书》全国纸质首发', '名校录取学子家长经验圆桌论坛'],
    badge: '旗舰巡展 · 免费入场',
    registeredCount: 1428
  },
  {
    id: 'expo-02',
    title: '2026 英国罗素集团 & G5 专场招生学术沙龙 (上海站)',
    theme: '解析 2026/2027 英国分阶段审理（Staged Admissions）与双非破局申请策略',
    type: '名校招生官面对面',
    city: '上海',
    venue: '静安香格里拉大酒店 5F 盛世堂',
    dateTime: '2026年4月11日 (周六) 13:30 - 17:30',
    status: '名额紧张',
    guestSchools: ['曼彻斯特大学', '华威大学', '布里斯托大学', '伯明翰大学'],
    highlights: ['院系录取内部名单（List）现场针对性解读', '首轮抢跑（Round 1）时间轴推演', '文书学术严谨性现场诊断'],
    badge: '英伦专场',
    registeredCount: 890
  },
  {
    id: 'expo-03',
    title: '大湾区名校升学讲座：港新名校硕士与博士全奖申请解析 (深圳/广州)',
    theme: '港前三、新二所热门专业报录比真实剖析与留学生落户利好',
    type: '大咖专场讲座',
    city: '深圳',
    venue: '深圳福田香格里拉大酒店 · 2层莲花厅',
    dateTime: '2026年4月18日 (周六) 14:00 - 17:00',
    status: '正在报名',
    guestSchools: ['香港大学', '香港科技大学', '新加坡国立大学 (NUS)'],
    highlights: ['港新高校奖学金与助研（RA）导师套磁技巧', '大湾区高新产业急需人才与回国就业通道', '当天前 50 名签到赠 2026 录取案例集'],
    badge: '港新深耕',
    registeredCount: 654
  },
  {
    id: 'expo-04',
    title: '【线上云展】2026-2027 留学生签证与资金合规全景答疑直播',
    theme: '美国 F-1 签证面签要点、英国 CAS 换发合规、澳洲行前体检与入境申报',
    type: '线上云展会',
    city: '全国在线',
    venue: '青藤国际官方视频号 / 腾讯会议多端同步',
    dateTime: '2026年4月22日 (周三) 19:30 - 21:00',
    status: '正在报名',
    guestSchools: ['全英学联顾问', '持牌移民法务顾问团队'],
    highlights: ['使领馆最新签证审理周期排查', '签证复议与资金证明冻结期注意事项', '在线互动 1v1 答疑提问'],
    badge: '全国直播',
    registeredCount: 2310
  }
];

// 全国主要城市直营服务中心 (类似新东方前途出国 40+ 城市分支)
export const BRANCH_OFFICES: BranchOfficeItem[] = [
  {
    id: 'branch-bj',
    city: '北京 (全国总部)',
    province: '北京',
    tier: '全国总部',
    address: '海淀区中关村南大街1号清华科技园创新大厦B座8-9层',
    phone: '010-8208-1926',
    hours: '周一至周日 09:00 - 20:30',
    consultantCount: 52,
    featuredCountries: ['英国', '美国', '中国香港', '新加坡', '加拿大']
  },
  {
    id: 'branch-sh',
    city: '上海',
    province: '上海',
    tier: '直营分公司',
    address: '黄浦区西藏中路268号来福士广场办公楼28层',
    phone: '021-6351-1926',
    hours: '周一至周日 09:00 - 20:00',
    consultantCount: 38,
    featuredCountries: ['英国G5', '美本美研', '艺术设计', '港新']
  },
  {
    id: 'branch-gz',
    city: '广州',
    province: '广东',
    tier: '直营分公司',
    address: '天河区天河路208号粤海天河城大厦26层',
    phone: '020-3882-1926',
    hours: '周一至周日 09:00 - 20:00',
    consultantCount: 26,
    featuredCountries: ['中国香港', '新加坡', '英国', '澳洲八大']
  },
  {
    id: 'branch-sz',
    city: '深圳',
    province: '广东',
    tier: '直营分公司',
    address: '福田区益田路5033号平安金融中心82层',
    phone: '0755-8320-1926',
    hours: '周一至周日 09:00 - 20:30',
    consultantCount: 29,
    featuredCountries: ['港前三', '美本早申', '英国罗素', '新加坡']
  },
  {
    id: 'branch-hz',
    city: '杭州',
    province: '浙江',
    tier: '直营分公司',
    address: '上城区富春路701号万象城一期写字楼16层',
    phone: '0571-8722-1926',
    hours: '周一至周日 09:00 - 19:30',
    consultantCount: 21,
    featuredCountries: ['英国', '美研理工', '香港', '欧洲大陆']
  },
  {
    id: 'branch-cd',
    city: '成都',
    province: '四川',
    tier: '直营分公司',
    address: '锦江区红星路三段1号国际金融中心(IFS)一号办公楼22层',
    phone: '028-8671-1926',
    hours: '周一至周日 09:00 - 20:00',
    consultantCount: 23,
    featuredCountries: ['英国', '美国', '加拿大', '澳洲']
  },
  {
    id: 'branch-wh',
    city: '武汉',
    province: '湖北',
    tier: '直营分公司',
    address: '江汉区建设大道568号新世界国贸大厦35层',
    phone: '027-8577-1926',
    hours: '周一至周日 09:00 - 19:30',
    consultantCount: 19,
    featuredCountries: ['985/211优选', '英国工科', '港新硕博']
  },
  {
    id: 'branch-uk',
    city: '英国伦敦 (海外中心)',
    province: '海外直营',
    tier: '海外中心',
    address: '25 Canada Square, Canary Wharf, London E14 5LB',
    phone: '+44 (0)20 7946 0926',
    hours: 'GMT 09:00 - 18:00 (当地学术监督与境外学业伴跑)',
    consultantCount: 12,
    featuredCountries: ['全英大学对接', 'CAS落地签', '海外科研', '实习工签']
  }
];

// 实时留学资讯与政策干货
export const NEWS_ARTICLES: NewsArticleItem[] = [
  {
    id: 'news-01',
    category: '名校政策',
    title: '剑桥大学发布 2026/2027 招生新政：工程与自然科学笔试（ESAT）全面规范化',
    summary: '官方宣布合并部分学院自主出题科目，统一引入 Pearson VUE 计算机化机考，中国考区考位与报名窗口期解析。',
    date: '2026-03-22',
    readCount: '1.2万+',
    tag: '英本早申必读',
    hot: true
  },
  {
    id: 'news-02',
    category: '申请大数据',
    title: '香港前三高校公布最新一轮授课型硕士报录比：商科与计算机竞争烈度创近5年新高',
    summary: '港大、港中文、港科大内地生源均分中位数攀升至 87.5 分，跨学科与量化背景成为第一轮推研的决定性加分项。',
    date: '2026-03-18',
    readCount: '9,840',
    tag: '港新风向标',
    hot: true
  },
  {
    id: 'news-03',
    category: '签证速递',
    title: '美国国务院 2026 夏季 F-1 签证预约排期更新：各大使领馆提前 365 天开放预约',
    summary: '如何合理把握 DS-160 表格填写、SEVIS 规费缴纳与面签资金证明冻结时间点，提前规划，确保按时入学。',
    date: '2026-03-12',
    readCount: '7,430',
    tag: '签证合规',
    hot: false
  },
  {
    id: 'news-04',
    category: '行前清单',
    title: '教育部涉外监管信息网发布 2026 春季海外办学与中介资质核验提示通报',
    summary: '提醒留学生及家长通过正规院校官网核准官方学位认证代码，选择资质清晰、信息公开的服务与项目。',
    date: '2026-03-05',
    readCount: '1.5万+',
    tag: '官方安全预警',
    hot: true
  }
];

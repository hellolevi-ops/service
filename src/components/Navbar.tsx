import React, { useState } from 'react';
import { 
  Phone, MessageSquare, ChevronDown, Menu, X, ArrowRight, ShieldCheck, 
  Building2, GraduationCap, Compass, FileCheck, DollarSign, BookOpen, 
  Users, CheckCircle2, Landmark, Scale, Calculator, ListChecks
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, extraSlug?: string) => void;
  onOpenBooking: (advisorId?: string, trackId?: string) => void;
  onOpenWeCom: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenBooking,
  onOpenWeCom
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Group 1: 留学国家 (按国家选校)
  const countryTracksGroup = [
    {
      title: '英国留学 (牛剑G5 · 罗素集团)',
      desc: '牛津、剑桥、帝国理工、UCL、爱丁堡 · 1年制硕士先修课与第一轮次抢跑',
      tab: 'tracks',
      slug: 'uk-pg',
      badge: '热门',
      icon: GraduationCap
    },
    {
      title: '美国留学 (常春藤 · Top30名校)',
      desc: '哥伦比亚、康奈尔、纽约大学 · 本科早申规划、文书头脑风暴与软实力背景',
      tab: 'tracks',
      slug: 'us-ug',
      badge: '藤校',
      icon: Compass
    },
    {
      title: '中国香港 & 新加坡名校',
      desc: '香港大学、港中文、新加坡国立NUS、南洋理工NTU · 面试辅导与工签规划',
      tab: 'tracks',
      slug: 'hk-sg',
      badge: '高性价比',
      icon: Landmark
    },
    {
      title: '艺术留学与建筑设计',
      desc: '英国皇家艺术学院、伦敦艺术大学、罗德岛设计学院 · 纯原创作品集深度辅导',
      tab: 'tracks',
      slug: 'arts',
      badge: '作品集',
      icon: BookOpen
    },
    {
      title: '低龄国际高中与寄宿',
      desc: '英国九大公学、美高十校联盟 · 标化提升、学术衔接与全家庭伴跑',
      tab: 'tracks',
      slug: 'k12',
      badge: '低龄',
      icon: Users
    },
    {
      title: '全球名校库与名单 (List) 查询',
      desc: 'QS 2026 世界大学排名、中国本科内部认可名单与各院系录取门槛',
      tab: 'universities',
      slug: undefined,
      badge: '查询库',
      icon: Building2
    }
  ];

  // Group 2: 服务项目
  const servicesGroup = [
    {
      title: '名校硕士全案申请服务',
      desc: '选校定位 + 1对1量身原创文书 + 网申递交 + 面试辅导 + 签证行前',
      tab: 'services',
      slug: undefined,
      icon: FileCheck
    },
    {
      title: '名校本科早申与直录规划',
      desc: '初高中长期选课、学术竞赛、活动主轴设计与 Common App 深度打磨',
      tab: 'services',
      slug: undefined,
      icon: Compass
    },
    {
      title: '海外博士与全额奖学金申请',
      desc: '海外博导精准套磁、研究计划书 (RP) 课题打磨与学术答辩模拟',
      tab: 'services',
      slug: undefined,
      icon: GraduationCap
    },
    {
      title: '5步透明申请流程与费用明细',
      desc: '从初步评估到获签入读全流程透明，正规合同保障，拒录全额退费',
      tab: 'process-fees',
      slug: undefined,
      icon: CheckCircle2
    },
    {
      title: '青藤国际 vs 传统中介区别对比',
      desc: '为什么高知家庭更信任青藤：拒绝模板代写，网申账号密码100%自主掌握',
      tab: 'services',
      slug: 'compare',
      icon: Scale
    }
  ];

  // Group 3: 免费工具与测评
  const toolsGroup = [
    {
      title: '名校录取概率快速自测',
      desc: '输入本科院校、当前成绩与意向国家，30秒测算冲刺、核心与保底院校',
      tab: 'lab',
      slug: 'assessment',
      icon: Calculator
    },
    {
      title: '留学总费用预算粗算器',
      desc: '快速计算英美港新澳各国家学费、住宿费与生活费总开销',
      tab: 'lab',
      slug: 'cost',
      icon: DollarSign
    },
    {
      title: '申请与行前材料核对清单',
      desc: '成绩单盖章、推荐信、存款证明、体检签证逐项核对打勾，防漏防错',
      tab: 'lab',
      slug: 'checklist',
      icon: ListChecks
    },
    {
      title: '留学避坑指南与干货专栏',
      desc: '避免学术不端、双非打破名单限制、海外教授沟通法则等高价值指南',
      tab: 'guides',
      slug: undefined,
      icon: BookOpen
    }
  ];

  const handleLinkClick = (id: string, extraSlug?: string) => {
    onNavigate(id, extraSlug);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b academic-hairline transition-all">
      {/* 顶部公告条 (新东方/金吉列风格) */}
      <div className="bg-[#1C1917] text-[#EDE7DC] text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-4xl truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
          <span className="truncate">
            【2026/2027 申请季】英美港新名校早鸟规划通道全面开启 · 免费测算录取率 · 拒录全额退费 · 签约前明码标价
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-[#A8A29E] shrink-0">
          <span className="flex items-center gap-1 text-[#FBF9F5] font-medium">
            <Phone className="w-3 h-3 text-[#D97706]" /> 全国咨询热线：400-820-1926
          </span>
          <span className="text-[#57534E]">|</span>
          <span>网申账号密码 100% 学生自持</span>
        </div>
      </div>

      {/* 主导航栏 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* 品牌名称 Logo */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="cursor-pointer group flex items-center gap-2.5 select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-sm bg-[#1C1917] text-[#FBF9F5] flex items-center justify-center font-bold text-lg border border-[#78350F]/30 shadow-xs group-hover:bg-[#78350F] transition-colors">
            青
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-serif-title font-bold tracking-tight text-[#1C1917] group-hover:text-[#92400E] transition-colors leading-tight">
                青藤国际
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-[#EDE7DC] text-[#78350F] font-semibold rounded-xs">
                专注名校留学
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-[#78716C] font-mono -mt-0.5">
              IVY GLOBAL EDUCATION
            </span>
          </div>
        </div>

        {/* 电脑端菜单 */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[14px] font-medium text-[#44403C]">
          
          {/* 首页 */}
          <button
            onClick={() => handleLinkClick('home')}
            className={`py-1 text-left relative transition-colors ${
              currentTab === 'home' ? 'text-[#92400E] font-semibold' : 'text-[#44403C] hover:text-[#1C1917]'
            }`}
          >
            <span>首页</span>
            {currentTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#92400E] rounded-full" />
            )}
          </button>

          {/* 留学国家 下拉菜单 */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('countries')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              onClick={() => handleLinkClick('tracks')}
              className={`flex items-center gap-1 hover:text-[#92400E] transition-colors cursor-pointer ${
                currentTab === 'tracks' ? 'text-[#92400E] font-semibold' : ''
              }`}
            >
              <span>留学国家</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#A8A29E] transition-transform duration-200 ${
                activeDropdown === 'countries' ? 'rotate-180 text-[#92400E]' : ''
              }`} />
            </button>

            {activeDropdown === 'countries' && (
              <div className="absolute top-full left-0 w-96 bg-[#FFFFFF] border academic-hairline shadow-xl rounded-sm p-3 z-50 animate-in fade-in duration-150">
                <div className="px-2 py-1 text-[11px] font-semibold text-[#78350F] uppercase tracking-wider border-b academic-hairline mb-2 flex items-center justify-between">
                  <span>热门留学国家与方向</span>
                  <span className="text-[#A8A29E] font-mono text-[10px]">DESTINATIONS</span>
                </div>
                <div className="space-y-1">
                  {countryTracksGroup.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleLinkClick(item.tab, item.slug)}
                        className="p-2.5 rounded-xs hover:bg-[#F5F2EB] cursor-pointer transition-colors group flex items-start gap-2.5"
                      >
                        <div className="p-1.5 bg-[#FAF8F5] group-hover:bg-[#FFFFFF] border academic-hairline rounded-xs shrink-0 text-[#92400E]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#1C1917] group-hover:text-[#92400E] truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] text-[#78350F] bg-[#FAF8F5] border academic-hairline px-1.5 py-0.2 rounded-xs font-medium shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#78716C] line-clamp-1 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 服务项目 下拉菜单 */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              onClick={() => handleLinkClick('services')}
              className={`flex items-center gap-1 hover:text-[#92400E] transition-colors cursor-pointer ${
                currentTab === 'services' || currentTab === 'process-fees' ? 'text-[#92400E] font-semibold' : ''
              }`}
            >
              <span>服务项目</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#A8A29E] transition-transform duration-200 ${
                activeDropdown === 'services' ? 'rotate-180 text-[#92400E]' : ''
              }`} />
            </button>

            {activeDropdown === 'services' && (
              <div className="absolute top-full left-0 w-92 bg-[#FFFFFF] border academic-hairline shadow-xl rounded-sm p-3 z-50 animate-in fade-in duration-150">
                <div className="px-2 py-1 text-[11px] font-semibold text-[#78350F] uppercase tracking-wider border-b academic-hairline mb-2 flex items-center justify-between">
                  <span>全学段量身定制服务</span>
                  <span className="text-[#A8A29E] font-mono text-[10px]">PROGRAMS & FEES</span>
                </div>
                <div className="space-y-1">
                  {servicesGroup.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleLinkClick(item.tab, item.slug)}
                        className="p-2.5 rounded-xs hover:bg-[#F5F2EB] cursor-pointer transition-colors group flex items-start gap-2.5"
                      >
                        <div className="p-1.5 bg-[#FAF8F5] group-hover:bg-[#FFFFFF] border academic-hairline rounded-xs shrink-0 text-[#92400E]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold text-[#1C1917] group-hover:text-[#92400E] block truncate">
                            {item.title}
                          </span>
                          <p className="text-[11px] text-[#78716C] line-clamp-1 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 成功案例 */}
          <button
            onClick={() => handleLinkClick('cases')}
            className={`py-1 text-left relative transition-colors ${
              currentTab === 'cases' ? 'text-[#92400E] font-semibold' : 'text-[#44403C] hover:text-[#1C1917]'
            }`}
          >
            <span>成功案例</span>
            {currentTab === 'cases' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#92400E] rounded-full" />
            )}
          </button>

          {/* 名校库 & List */}
          <button
            onClick={() => handleLinkClick('universities')}
            className={`py-1 text-left relative transition-colors ${
              currentTab === 'universities' ? 'text-[#92400E] font-semibold' : 'text-[#44403C] hover:text-[#1C1917]'
            }`}
          >
            <span>名校库</span>
            {currentTab === 'universities' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#92400E] rounded-full" />
            )}
          </button>

          {/* 顾问导师 */}
          <button
            onClick={() => handleLinkClick('advisors')}
            className={`py-1 text-left relative transition-colors ${
              currentTab === 'advisors' ? 'text-[#92400E] font-semibold' : 'text-[#44403C] hover:text-[#1C1917]'
            }`}
          >
            <span>资深顾问</span>
            {currentTab === 'advisors' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#92400E] rounded-full" />
            )}
          </button>

          {/* 免费测算 & 工具 下拉菜单 */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('tools')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              onClick={() => handleLinkClick('lab')}
              className={`flex items-center gap-1 hover:text-[#92400E] transition-colors cursor-pointer ${
                currentTab === 'lab' || currentTab === 'guides' ? 'text-[#92400E] font-semibold' : ''
              }`}
            >
              <span>免费工具</span>
              <span className="px-1 py-0.2 bg-[#059669]/10 text-[#059669] text-[10px] rounded-xs font-semibold">自测</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#A8A29E] transition-transform duration-200 ${
                activeDropdown === 'tools' ? 'rotate-180 text-[#92400E]' : ''
              }`} />
            </button>

            {activeDropdown === 'tools' && (
              <div className="absolute top-full right-0 w-88 bg-[#FFFFFF] border academic-hairline shadow-xl rounded-sm p-3 z-50 animate-in fade-in duration-150">
                <div className="px-2 py-1 text-[11px] font-semibold text-[#78350F] uppercase tracking-wider border-b academic-hairline mb-2 flex items-center justify-between">
                  <span>免费自助工具与留学干货</span>
                  <span className="text-[#A8A29E] font-mono text-[10px]">FREE TOOLS</span>
                </div>
                <div className="space-y-1">
                  {toolsGroup.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleLinkClick(item.tab, item.slug)}
                        className="p-2.5 rounded-xs hover:bg-[#F5F2EB] cursor-pointer transition-colors group flex items-start gap-2.5"
                      >
                        <div className="p-1.5 bg-[#FAF8F5] group-hover:bg-[#FFFFFF] border academic-hairline rounded-xs shrink-0 text-[#92400E]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold text-[#1C1917] group-hover:text-[#92400E] block truncate">
                            {item.title}
                          </span>
                          <p className="text-[11px] text-[#78716C] line-clamp-1 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </nav>

        {/* 右侧高频转化行动区 (极具中国用户习惯) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenWeCom}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1C1917] bg-[#EDE7DC]/70 hover:bg-[#EDE7DC] border academic-hairline rounded-sm transition-colors cursor-pointer"
            title="微信即时在线咨询"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#059669]" />
            <span className="whitespace-nowrap">微信咨询</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FBF9F5] bg-[#92400E] hover:bg-[#78350F] rounded-sm transition-all shadow-xs whitespace-nowrap cursor-pointer"
          >
            <span>免费评估录取率</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 移动端汉堡按钮 */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="px-2.5 py-1.5 text-xs font-semibold text-[#FBF9F5] bg-[#92400E] rounded-sm"
          >
            免费测算
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#44403C] hover:text-[#1C1917] focus:outline-none cursor-pointer"
            aria-label="切换主菜单"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* 移动端抽屉导航 */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-t academic-hairline px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          
          <div>
            <span className="text-[11px] font-semibold text-[#78350F] uppercase tracking-wider block mb-2">
              快速导航
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleLinkClick('home')}
                className={`p-2.5 text-left rounded-xs border ${
                  currentTab === 'home' ? 'bg-[#1C1917] text-white border-[#1C1917] font-semibold' : 'bg-white border-stone-200 text-[#1C1917]'
                }`}
              >
                首页
              </button>
              <button
                onClick={() => handleLinkClick('tracks')}
                className={`p-2.5 text-left rounded-xs border ${
                  currentTab === 'tracks' ? 'bg-[#1C1917] text-white border-[#1C1917] font-semibold' : 'bg-white border-stone-200 text-[#1C1917]'
                }`}
              >
                留学国家
              </button>
              <button
                onClick={() => handleLinkClick('services')}
                className={`p-2.5 text-left rounded-xs border ${
                  currentTab === 'services' ? 'bg-[#1C1917] text-white border-[#1C1917] font-semibold' : 'bg-white border-stone-200 text-[#1C1917]'
                }`}
              >
                服务项目
              </button>
              <button
                onClick={() => handleLinkClick('cases')}
                className={`p-2.5 text-left rounded-xs border ${
                  currentTab === 'cases' ? 'bg-[#1C1917] text-white border-[#1C1917] font-semibold' : 'bg-white border-stone-200 text-[#1C1917]'
                }`}
              >
                成功案例
              </button>
              <button
                onClick={() => handleLinkClick('universities')}
                className={`p-2.5 text-left rounded-xs border ${
                  currentTab === 'universities' ? 'bg-[#1C1917] text-white border-[#1C1917] font-semibold' : 'bg-white border-stone-200 text-[#1C1917]'
                }`}
              >
                名校库 & List
              </button>
              <button
                onClick={() => handleLinkClick('advisors')}
                className={`p-2.5 text-left rounded-xs border ${
                  currentTab === 'advisors' ? 'bg-[#1C1917] text-white border-[#1C1917] font-semibold' : 'bg-white border-stone-200 text-[#1C1917]'
                }`}
              >
                资深顾问
              </button>
              <button
                onClick={() => handleLinkClick('lab')}
                className={`p-2.5 text-left rounded-xs border col-span-2 ${
                  currentTab === 'lab' ? 'bg-[#92400E] text-white border-[#92400E] font-semibold' : 'bg-white border-stone-200 text-[#92400E] font-medium'
                }`}
              >
                🎯 免费测评与自测工具箱 (录取率/费用/材料)
              </button>
            </div>
          </div>

          <div className="pt-2 border-t academic-hairline space-y-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#92400E] text-white font-semibold text-xs rounded-xs flex items-center justify-center gap-1.5"
            >
              <span>立即预约 1对1 免费规划</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onOpenWeCom();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#EDE7DC] text-[#78350F] font-semibold text-xs rounded-xs flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-[#059669]" />
              <span>微信直接咨询顾问</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
};

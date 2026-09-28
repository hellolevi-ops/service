import React, { useState } from 'react';
import { 
  Phone, ChevronDown, MessageSquare, Menu, X, ArrowRight, ShieldCheck, 
  GraduationCap, Compass, FileCheck, DollarSign, BookOpen, 
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
      title: '英国名校 (牛剑G5 · 罗素集团)',
      desc: '牛津、剑桥、帝国理工、UCL、爱丁堡 · 硕博第一轮次精准卡位',
      tab: 'tracks',
      slug: 'uk-pg',
      icon: GraduationCap
    },
    {
      title: '美国名校 (常春藤 · Top30)',
      desc: '哥伦比亚、康奈尔、纽大 · 本硕长线规划与学术软实力构筑',
      tab: 'tracks',
      slug: 'us-ug',
      icon: Compass
    },
    {
      title: '中国香港 & 新加坡公立名校',
      desc: '港大、港中文、新加坡国立NUS、南洋理工NTU · 笔面试实战',
      tab: 'tracks',
      slug: 'hk-sg',
      icon: Landmark
    },
    {
      title: '澳洲八大 & 加拿大顶尖大学',
      desc: '墨尔本、悉尼、多伦多、UBC · 快捷通道与高额奖学金规划',
      tab: 'tracks',
      slug: 'aus-can',
      icon: Users
    },
    {
      title: '艺术设计与建筑空间专项',
      desc: '皇艺RCA、伦艺UAL、罗德岛RISD · 海外名校导师原创作品集指导',
      tab: 'tracks',
      slug: 'arts',
      icon: BookOpen
    },
    {
      title: '海外博士申请与全额奖学金',
      desc: '海外博导精准套磁、研究计划书（RP）构思与学术答辩演练',
      tab: 'services',
      slug: 'phd',
      icon: FileCheck
    }
  ];

  // Group 2: 院校与名单库
  const universitiesGroup = [
    {
      title: '全球大学综合排名库 (QS 2026)',
      desc: '综合排名、学科细分排名、学制年限与院校综合录取胜率统计',
      tab: 'universities',
      slug: undefined,
      icon: Landmark
    },
    {
      title: '英国院校内部名单 (List) 查询',
      desc: '权威梳理院校对国内 985/211/双非 的梯度分组与均分硬性门槛',
      tab: 'universities',
      slug: undefined,
      icon: FileCheck
    }
  ];

  // Group 3: 服务体系与对比
  const servicesGroup = [
    {
      title: '名校硕士全案申请服务',
      desc: '精准选校 + 1对1量身原创文书 + 网申全透明递交 + 签证行前',
      tab: 'services',
      slug: undefined,
      icon: FileCheck
    },
    {
      title: '名校本科长线早申规划',
      desc: '学术竞赛主轴、校内GPA管理、课外活动提炼与文书深度打磨',
      tab: 'services',
      slug: undefined,
      icon: Compass
    },
    {
      title: '青藤国际 vs 传统流水线中介对照',
      desc: '100%账号密码自主掌握、拒绝流水线模板、正规合同拒录退款',
      tab: 'services',
      slug: 'compare',
      icon: Scale
    },
    {
      title: '5步全透明流程与收费标准',
      desc: '全流程各节点透明可见，签约前明码标价，无任何隐形消费',
      tab: 'process-fees',
      slug: undefined,
      icon: CheckCircle2
    }
  ];

  // Group 4: 免费工具与自测
  const toolsGroup = [
    {
      title: '名校录取概率快速自测',
      desc: '输入本科背景、均分成绩与目标方向，30秒测评冲刺/核心/保底梯队',
      tab: 'lab',
      slug: 'assessment',
      icon: Calculator
    },
    {
      title: '留学总费用预算粗算器',
      desc: '英美港新澳各国家学费、住宿生活与汇率浮动的全面预算评估',
      tab: 'lab',
      slug: 'cost',
      icon: DollarSign
    },
    {
      title: '申请与行前材料核对清单',
      desc: '成绩单公证、推荐信抬头、资金证明、签证体检逐项自检防遗漏',
      tab: 'lab',
      slug: 'checklist',
      icon: ListChecks
    }
  ];

  const handleLinkClick = (id: string, extraSlug?: string) => {
    onNavigate(id, extraSlug);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-all">
      
      {/* 顶部学术公信力与保障微栏 */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-300 truncate">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              2026 / 2027 全球名校高端规划通道
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-300">教育部涉外监管资质合规</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-slate-300">网申账号 100% 学生自持</span>
            <span className="text-slate-600 hidden lg:inline">·</span>
            <span className="hidden lg:inline text-slate-300">正规法务合同 · 拒录全额退款保障</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-slate-300 shrink-0">
            <span className="text-slate-400 hidden sm:inline">工作日响应时间：09:00 – 21:00</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              onClick={onOpenWeCom}
              className="text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>学术督导微信直联</span>
            </button>
          </div>
        </div>
      </div>

      {/* 主导航条：典雅、开阔、层次清晰 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Zone */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="cursor-pointer group flex items-center gap-3 select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xl shadow-xs group-hover:scale-105 transition-transform font-editorial-title border border-slate-800">
            青
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors leading-tight font-editorial-title">
              青藤国际
            </span>
            <span className="text-[10px] tracking-widest text-slate-500 font-sans uppercase">
              IVY GLOBAL EDUCATION
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-slate-700">
          
          {/* 首页 */}
          <button
            onClick={() => handleLinkClick('home')}
            className={`py-2 text-left relative transition-colors cursor-pointer ${
              currentTab === 'home' ? 'text-blue-900 font-bold' : 'hover:text-blue-900'
            }`}
          >
            <span>首页</span>
            {currentTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full" />
            )}
          </button>

          {/* 选校方向 */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('countries')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              onClick={() => handleLinkClick('tracks')}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                currentTab === 'tracks' ? 'text-blue-900 font-bold' : 'hover:text-blue-900'
              }`}
            >
              <span>全球选校方向</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'countries' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'countries' && (
              <div className="absolute top-full -left-12 w-[520px] bg-white rounded-xl shadow-xl border border-slate-200 p-3 grid grid-cols-2 gap-2 z-50 animate-in fade-in duration-150">
                {countryTracksGroup.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleLinkClick(item.tab, item.slug)}
                      className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all cursor-pointer group/sub"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-blue-900" />
                        <span className="font-bold text-xs text-slate-900 group-hover/sub:text-blue-900">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 院校库与名单 */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('unis')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              onClick={() => handleLinkClick('universities')}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                currentTab === 'universities' ? 'text-blue-900 font-bold' : 'hover:text-blue-900'
              }`}
            >
              <span>院校库与List</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'unis' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'unis' && (
              <div className="absolute top-full -left-6 w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 space-y-1.5 z-50 animate-in fade-in duration-150">
                {universitiesGroup.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleLinkClick(item.tab, item.slug)}
                      className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all cursor-pointer group/sub"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-blue-900" />
                        <span className="font-bold text-xs text-slate-900 group-hover/sub:text-blue-900">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 录取案例 */}
          <button
            onClick={() => handleLinkClick('cases')}
            className={`py-2 text-left relative transition-colors cursor-pointer ${
              currentTab === 'cases' ? 'text-blue-900 font-bold' : 'hover:text-blue-900'
            }`}
          >
            <span>真实录取案卷</span>
            {currentTab === 'cases' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full" />
            )}
          </button>

          {/* 导师团队 */}
          <button
            onClick={() => handleLinkClick('advisors')}
            className={`py-2 text-left relative transition-colors cursor-pointer ${
              currentTab === 'advisors' ? 'text-blue-900 font-bold' : 'hover:text-blue-900'
            }`}
          >
            <span>硕博导师阵容</span>
            {currentTab === 'advisors' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full" />
            )}
          </button>

          {/* 服务与透明度 */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              onClick={() => handleLinkClick('services')}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                currentTab === 'services' || currentTab === 'process-fees' ? 'text-blue-900 font-bold' : 'hover:text-blue-900'
              }`}
            >
              <span>服务体系与流程</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'services' && (
              <div className="absolute top-full -left-12 w-[460px] bg-white rounded-xl shadow-xl border border-slate-200 p-3 grid grid-cols-2 gap-2 z-50 animate-in fade-in duration-150">
                {servicesGroup.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleLinkClick(item.tab, item.slug)}
                      className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all cursor-pointer group/sub"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-blue-900" />
                        <span className="font-bold text-xs text-slate-900 group-hover/sub:text-blue-900">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 决策工具箱 */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('tools')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              onClick={() => handleLinkClick('lab')}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                currentTab === 'lab' ? 'text-blue-900 font-bold' : 'hover:text-blue-900'
              }`}
            >
              <span>决策工具箱</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'tools' && (
              <div className="absolute top-full -left-16 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 space-y-1.5 z-50 animate-in fade-in duration-150">
                {toolsGroup.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleLinkClick(item.tab, item.slug)}
                      className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all cursor-pointer group/sub"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-amber-700" />
                        <span className="font-bold text-xs text-slate-900 group-hover/sub:text-blue-900">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </nav>

        {/* Right Action Zone */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenWeCom}
            className="text-xs font-semibold text-slate-700 hover:text-blue-900 flex items-center gap-1.5 transition-colors cursor-pointer py-2 px-1"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>微信答疑</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 bg-slate-900 hover:bg-blue-950 text-white font-semibold text-xs rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
          >
            <span>预约学术初诊</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
          >
            初诊预约
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="切换菜单"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleLinkClick('home')}
              className={`p-3 text-left rounded-lg border font-medium ${
                currentTab === 'home' ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              首页
            </button>
            <button
              onClick={() => handleLinkClick('tracks')}
              className={`p-3 text-left rounded-lg border font-medium ${
                currentTab === 'tracks' ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              全球选校
            </button>
            <button
              onClick={() => handleLinkClick('universities')}
              className={`p-3 text-left rounded-lg border font-medium ${
                currentTab === 'universities' ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              名校库与List
            </button>
            <button
              onClick={() => handleLinkClick('cases')}
              className={`p-3 text-left rounded-lg border font-medium ${
                currentTab === 'cases' ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              真实录取案卷
            </button>
            <button
              onClick={() => handleLinkClick('advisors')}
              className={`p-3 text-left rounded-lg border font-medium ${
                currentTab === 'advisors' ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              硕博导师阵容
            </button>
            <button
              onClick={() => handleLinkClick('services')}
              className={`p-3 text-left rounded-lg border font-medium ${
                currentTab === 'services' ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              服务体系
            </button>
            <button
              onClick={() => handleLinkClick('lab')}
              className={`p-3 text-left rounded-lg border col-span-2 font-medium ${
                currentTab === 'lab' ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-slate-50 border-slate-200 text-amber-800'
              }`}
            >
              决策工具箱 (录取自测 / 费用测算 / 材料清单)
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-slate-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>预约 1对1 学术初诊</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => {
                onOpenWeCom();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-white text-slate-800 border border-slate-200 font-medium text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>微信直接咨询导师</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
};

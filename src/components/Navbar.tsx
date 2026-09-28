import React, { useState } from 'react';
import { Phone, MessageSquare, ChevronDown, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

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
  const [tracksDropdownOpen, setTracksDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: '首页' },
    { id: 'services', label: '服务体系' },
    { id: 'tracks', label: '五大垂直赛道', hasDropdown: true },
    { id: 'cases', label: '案例研判' },
    { id: 'advisors', label: '学术导师' },
    { id: 'process-fees', label: '流程与费用' },
    { id: 'lab', label: '最佳实践 Lab' },
    { id: 'guides', label: '内容中心' },
    { id: 'community', label: '学术社区' },
  ];

  const tracks = [
    { slug: 'us-ug', title: '美本常春藤 & Top 30' },
    { slug: 'uk-pg', title: '英国 G5 与罗素集团研博' },
    { slug: 'hk-sg', title: '中国香港与新加坡顶尖公立' },
    { slug: 'k12', title: '低龄国际高中与成长寄宿' },
    { slug: 'arts', title: '跨学科设计与前沿艺术' },
  ];

  const handleLinkClick = (id: string, extraSlug?: string) => {
    onNavigate(id, extraSlug);
    setMobileMenuOpen(false);
    setTracksDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b academic-hairline transition-all">
      {/* Top emergency / advisory ticker notice */}
      <div className="bg-[#1C1917] text-[#EDE7DC] text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-4xl truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
          <span className="truncate">
            【博研公告】2026/2027 申请季英美名校认可名单（List）及申请批次（Stage 1）已全面更新，提供工作日 15 分钟初诊学术响应保障
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-[#A8A29E] shrink-0">
          <span>纪律与投诉监督专线：400-880-9218</span>
          <span className="text-[#57534E]">|</span>
          <span>服务对象：18岁及以上学子或法定监护人</span>
        </div>
      </div>

      {/* Main 3-Zone Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element brand wordmark */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="cursor-pointer group flex items-center gap-3.5 select-none"
        >
          <div className="w-9 h-9 rounded-sm bg-[#1C1917] text-[#FBF9F5] flex items-center justify-center font-brand-title font-bold text-lg border border-[#78350F]/30 shadow-xs group-hover:bg-[#78350F] transition-colors">
            博
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-serif-title font-bold tracking-tight text-[#1C1917] group-hover:text-[#92400E] transition-colors leading-tight">
              博研书院
            </span>
            <span className="text-[10px] tracking-widest text-[#78716C] uppercase font-sans -mt-0.5">
              BOYAN ACADEMY & ADVISORY
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Text with clean underline) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[14px] font-medium text-[#44403C]">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div 
                  key={link.id} 
                  className="relative group py-2"
                  onMouseEnter={() => setTracksDropdownOpen(true)}
                  onMouseLeave={() => setTracksDropdownOpen(false)}
                >
                  <button 
                    onClick={() => handleLinkClick('tracks')}
                    className={`flex items-center gap-1 hover:text-[#92400E] transition-colors ${currentTab === 'tracks' ? 'text-[#92400E] font-semibold' : ''}`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#92400E] transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  {tracksDropdownOpen && (
                    <div className="absolute top-full left-0 w-64 bg-[#FFFFFF] border academic-hairline shadow-lg rounded-sm py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-semibold text-[#A8A29E] border-b academic-hairline uppercase tracking-wider">
                        核心研判学科与赛道
                      </div>
                      {tracks.map((t) => (
                        <div
                          key={t.slug}
                          onClick={() => handleLinkClick('tracks', t.slug)}
                          className="px-3.5 py-2 text-xs text-[#292524] hover:bg-[#F5F2EB] hover:text-[#92400E] cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <span>{t.title}</span>
                          <ArrowRight className="w-3 h-3 text-[#A8A29E]" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`py-1 text-left relative transition-colors ${
                  isActive ? 'text-[#92400E] font-semibold' : 'text-[#44403C] hover:text-[#1C1917]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#92400E] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (1-2 clean actions) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenWeCom}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#44403C] bg-[#EDE7DC]/70 hover:bg-[#EDE7DC] border academic-hairline rounded-sm transition-colors"
            title="微信/企微随时咨询"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#059669]" />
            <span className="whitespace-nowrap">企微直连</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FBF9F5] bg-[#1C1917] hover:bg-[#78350F] rounded-sm transition-all shadow-xs whitespace-nowrap cursor-pointer"
          >
            <span>预约免费学术评估</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="px-2.5 py-1.5 text-xs font-semibold text-[#FBF9F5] bg-[#1C1917] rounded-sm"
          >
            免费初诊
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#44403C] hover:text-[#1C1917] focus:outline-none"
            aria-label="切换主菜单"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-t academic-hairline px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-2 text-left text-sm rounded-sm ${
                  currentTab === link.id
                    ? 'bg-[#EDE7DC] text-[#92400E] font-semibold'
                    : 'text-[#44403C] hover:bg-[#F5F2EB]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t academic-hairline flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#1C1917] rounded-sm shadow-xs"
            >
              预约免费背景初诊研判
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWeCom();
              }}
              className="w-full py-2 text-center text-xs font-medium text-[#44403C] bg-[#EDE7DC] border academic-hairline rounded-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#059669]" />
              <span>打开微信 / 企微顾问二维码</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

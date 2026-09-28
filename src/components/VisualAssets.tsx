import React from 'react';

/**
 * 殿堂级名校实景与学者写实视觉组件库
 * 替代纯文字与空占位符，提供高审美、高公信力的“图文模式”
 */

// 1. 牛津大学 / 英国名校 建筑实景视觉 (16:9 或 4:3)
export const OxfordVisual: React.FC<{ className?: string }> = ({ className = "w-full h-44" }) => (
  <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className}`}>
    <svg viewBox="0 0 400 225" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="oxfordSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
        <linearGradient id="oxfordStone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="radcliffeDome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
      </defs>
      {/* 天空 */}
      <rect width="400" height="225" fill="url(#oxfordSky)" />
      {/* 晨曦柔光 */}
      <circle cx="340" cy="50" r="80" fill="#FEF3C7" opacity="0.35" filter="blur(20px)" />
      
      {/* 远景哥特尖塔轮廓 */}
      <path d="M40 140 L50 80 L60 140 Z M120 150 L130 95 L140 150 Z M280 150 L290 85 L300 150 Z M330 160 L340 100 L350 160 Z" fill="#1E293B" opacity="0.4" />
      
      {/* 主体：雷德克里夫图书馆 (Radcliffe Camera) 经典穹顶 */}
      <path d="M150 130 C150 75 250 75 250 130 Z" fill="url(#radcliffeDome)" />
      <rect x="195" y="55" width="10" height="22" fill="#FBBF24" />
      <polygon points="200,45 193,55 207,55" fill="#F59E0B" />
      
      {/* 图书馆圆柱形下座 */}
      <rect x="140" y="130" width="120" height="60" rx="4" fill="url(#oxfordStone)" />
      {/* 罗马柱与古典窗拱 */}
      <rect x="155" y="140" width="12" height="25" rx="6" fill="#1E293B" opacity="0.75" />
      <rect x="175" y="140" width="12" height="25" rx="6" fill="#1E293B" opacity="0.75" />
      <rect x="195" y="140" width="12" height="25" rx="6" fill="#1E293B" opacity="0.75" />
      <rect x="215" y="140" width="12" height="25" rx="6" fill="#1E293B" opacity="0.75" />
      <rect x="235" y="140" width="12" height="25" rx="6" fill="#1E293B" opacity="0.75" />

      {/* 侧翼学院古老回廊 */}
      <rect x="0" y="150" width="145" height="75" fill="#B45309" opacity="0.9" />
      <rect x="255" y="150" width="145" height="75" fill="#78350F" opacity="0.95" />
      <rect x="20" y="165" width="16" height="30" rx="8" fill="#0F172A" opacity="0.7" />
      <rect x="50" y="165" width="16" height="30" rx="8" fill="#0F172A" opacity="0.7" />
      <rect x="80" y="165" width="16" height="30" rx="8" fill="#0F172A" opacity="0.7" />
      <rect x="110" y="165" width="16" height="30" rx="8" fill="#0F172A" opacity="0.7" />
      <rect x="280" y="165" width="16" height="30" rx="8" fill="#0F172A" opacity="0.7" />
      <rect x="310" y="165" width="16" height="30" rx="8" fill="#0F172A" opacity="0.7" />
      <rect x="340" y="165" width="16" height="30" rx="8" fill="#0F172A" opacity="0.7" />

      {/* 前景庭院绿草坪与漫步小径 */}
      <rect x="0" y="195" width="400" height="30" fill="#14532D" />
      <path d="M120 225 L180 195 L220 195 L280 225 Z" fill="#E2E8F0" opacity="0.6" />
      
      {/* 渐变遮罩压暗底部确保文字高对比 */}
      <rect x="0" y="120" width="400" height="105" fill="url(#bottomScrim)" />
      <defs>
        <linearGradient id="bottomScrim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F172A" stopOpacity="0" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
      英国 G5 · 罗素集团
    </div>
    <div className="absolute bottom-2.5 left-3 text-white">
      <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">牛津 & 帝国理工学术通道</span>
      <span className="text-[11px] text-amber-200 block drop-shadow-xs">内部认可名单（List）与先修课第一轮抢跑</span>
    </div>
  </div>
);

// 2. 哥伦比亚大学 / 美国常春藤与Top30 实景视觉
export const ColumbiaVisual: React.FC<{ className?: string }> = ({ className = "w-full h-44" }) => (
  <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className}`}>
    <svg viewBox="0 0 400 225" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="nySky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>
        <linearGradient id="columbiaDome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#nySky)" />
      {/* 阳光 */}
      <circle cx="70" cy="50" r="70" fill="#FEF08A" opacity="0.3" filter="blur(18px)" />

      {/* 哥伦比亚大学 Low Memorial Library 新古典主义宏伟立柱与大穹顶 */}
      <path d="M140 115 C140 60 260 60 260 115 Z" fill="url(#columbiaDome)" opacity="0.9" />
      <polygon points="120,120 280,120 200,90" fill="#CBD5E1" />
      <rect x="120" y="120" width="160" height="15" fill="#94A3B8" />

      {/* 雄伟罗马科林斯廊柱 */}
      <rect x="135" y="135" width="12" height="60" fill="#F8FAFC" />
      <rect x="155" y="135" width="12" height="60" fill="#F8FAFC" />
      <rect x="175" y="135" width="12" height="60" fill="#F8FAFC" />
      <rect x="195" y="135" width="12" height="60" fill="#F8FAFC" />
      <rect x="215" y="135" width="12" height="60" fill="#F8FAFC" />
      <rect x="235" y="135" width="12" height="60" fill="#F8FAFC" />
      <rect x="255" y="135" width="12" height="60" fill="#F8FAFC" />

      {/* 图书馆前宽阔大理石台阶 */}
      <rect x="80" y="195" width="240" height="6" fill="#E2E8F0" />
      <rect x="60" y="201" width="280" height="8" fill="#CBD5E1" />
      <rect x="40" y="209" width="320" height="16" fill="#94A3B8" />

      {/* 侧面常春藤红砖教学楼 */}
      <rect x="0" y="100" width="105" height="125" fill="#7F1D1D" />
      <rect x="295" y="100" width="105" height="125" fill="#991B1B" />
      <rect x="15" y="115" width="14" height="22" fill="#FEF08A" opacity="0.75" />
      <rect x="45" y="115" width="14" height="22" fill="#FEF08A" opacity="0.75" />
      <rect x="75" y="115" width="14" height="22" fill="#FEF08A" opacity="0.75" />
      <rect x="310" y="115" width="14" height="22" fill="#FEF08A" opacity="0.75" />
      <rect x="340" y="115" width="14" height="22" fill="#FEF08A" opacity="0.75" />
      <rect x="370" y="115" width="14" height="22" fill="#FEF08A" opacity="0.75" />

      {/* 渐变遮罩压暗底部 */}
      <rect x="0" y="110" width="400" height="115" fill="url(#bottomScrimCol)" />
      <defs>
        <linearGradient id="bottomScrimCol" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B132B" stopOpacity="0" />
          <stop offset="100%" stopColor="#0B132B" stopOpacity="0.88" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
      美国常春藤 · Top30
    </div>
    <div className="absolute bottom-2.5 left-3 text-white">
      <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">常春藤与Top30战略主轴</span>
      <span className="text-[11px] text-sky-200 block drop-shadow-xs">学术科研课题 · 1对1独创文书 · 软实力破局</span>
    </div>
  </div>
);

// 3. 香港大学与新加坡公立名校 (亚洲双雄)
export const HkuNusVisual: React.FC<{ className?: string }> = ({ className = "w-full h-44" }) => (
  <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className}`}>
    <svg viewBox="0 0 400 225" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="asianSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0C4A6E" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#asianSky)" />
      
      {/* 维多利亚港天际线远景 */}
      <rect x="40" y="70" width="25" height="100" fill="#0369A1" opacity="0.5" />
      <rect x="80" y="55" width="20" height="115" fill="#075985" opacity="0.6" />
      <rect x="120" y="80" width="30" height="90" fill="#0369A1" opacity="0.5" />
      <rect x="300" y="65" width="35" height="105" fill="#075985" opacity="0.5" />
      <rect x="350" y="85" width="28" height="85" fill="#0369A1" opacity="0.5" />

      {/* 港大本部大楼红砖钟楼 (Main Building Clock Tower) */}
      <rect x="180" y="45" width="40" height="150" fill="#991B1B" />
      <polygon points="200,20 175,45 225,45" fill="#7F1D1D" />
      {/* 钟表盘 */}
      <circle cx="200" cy="70" r="10" fill="#FEF9C3" />
      <line x1="200" y1="70" x2="200" y2="64" stroke="#7F1D1D" strokeWidth="2" />
      <line x1="200" y1="70" x2="204" y2="70" stroke="#7F1D1D" strokeWidth="2" />

      {/* 两侧英伦殖民风格爱德华巴洛克拱廊 */}
      <rect x="140" y="110" width="40" height="85" fill="#B91C1C" />
      <rect x="220" y="110" width="40" height="85" fill="#B91C1C" />
      <rect x="150" y="125" width="20" height="35" rx="10" fill="#450A0A" />
      <rect x="230" y="125" width="20" height="35" rx="10" fill="#450A0A" />

      {/* 新加坡绿意科技校园元素 (前沿热带园林景观) */}
      <rect x="0" y="180" width="400" height="45" fill="#065F46" />
      <circle cx="50" cy="180" r="25" fill="#047857" />
      <circle cx="90" cy="175" r="30" fill="#059669" />
      <circle cx="310" cy="175" r="30" fill="#047857" />
      <circle cx="350" cy="180" r="28" fill="#059669" />

      {/* 渐变遮罩压暗底部 */}
      <rect x="0" y="110" width="400" height="115" fill="url(#bottomScrimHk)" />
      <defs>
        <linearGradient id="bottomScrimHk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B132B" stopOpacity="0" />
          <stop offset="100%" stopColor="#0B132B" stopOpacity="0.88" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
      中国香港 & 新加坡公立名校
    </div>
    <div className="absolute bottom-2.5 left-3 text-white">
      <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">港前三与 NUS / NTU 顶尖公立</span>
      <span className="text-[11px] text-teal-200 block drop-shadow-xs">极速审理轮次 · 英文全真面试 · 工签全线规划</span>
    </div>
  </div>
);

// 4. 澳大利亚八大 & 加拿大顶尖公立 (悉尼大学 / 墨大 / 多伦多大学)
export const AusCanVisual: React.FC<{ className?: string }> = ({ className = "w-full h-44" }) => (
  <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className}`}>
    <svg viewBox="0 0 400 225" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ausSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="50%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#C7D2FE" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#ausSky)" />
      
      {/* 悉尼大学四方院 (The Quadrangle) 标志性沙岩哥特建筑与大草坪 */}
      <polygon points="170,120 230,120 200,60" fill="#E2E8F0" />
      <rect x="180" y="80" width="40" height="90" fill="#D97706" />
      <polygon points="200,40 170,80 230,80" fill="#92400E" />

      <rect x="60" y="110" width="120" height="60" fill="#B45309" />
      <rect x="220" y="110" width="120" height="60" fill="#B45309" />
      
      {/* 经典哥特式排窗 */}
      <rect x="80" y="125" width="12" height="24" rx="6" fill="#1E1B4B" />
      <rect x="105" y="125" width="12" height="24" rx="6" fill="#1E1B4B" />
      <rect x="130" y="125" width="12" height="24" rx="6" fill="#1E1B4B" />
      <rect x="155" y="125" width="12" height="24" rx="6" fill="#1E1B4B" />
      <rect x="240" y="125" width="12" height="24" rx="6" fill="#1E1B4B" />
      <rect x="265" y="125" width="12" height="24" rx="6" fill="#1E1B4B" />
      <rect x="290" y="125" width="12" height="24" rx="6" fill="#1E1B4B" />
      <rect x="315" y="125" width="12" height="24" rx="6" fill="#1E1B4B" />

      {/* 蓝花楹盛开景象 (Jacaranda) */}
      <circle cx="50" cy="140" r="35" fill="#7C3AED" opacity="0.85" />
      <circle cx="80" cy="155" r="28" fill="#8B5CF6" opacity="0.8" />
      <circle cx="350" cy="140" r="35" fill="#7C3AED" opacity="0.85" />

      {/* 辽阔南半球阳光草地 */}
      <rect x="0" y="170" width="400" height="55" fill="#15803D" />

      {/* 渐变遮罩压暗底部 */}
      <rect x="0" y="110" width="400" height="115" fill="url(#bottomScrimAus)" />
      <defs>
        <linearGradient id="bottomScrimAus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B132B" stopOpacity="0" />
          <stop offset="100%" stopColor="#0B132B" stopOpacity="0.88" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
      澳洲八大 · 加拿大顶尖大学
    </div>
    <div className="absolute bottom-2.5 left-3 text-white">
      <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">墨尔本、悉尼与多伦多大学</span>
      <span className="text-[11px] text-indigo-200 block drop-shadow-xs">加权均分核算 · 快速无语言双录 · 奖学金申请</span>
    </div>
  </div>
);

// 5. 艺术与设计顶尖殿堂 (皇艺 RCA / 伦艺 UAL / 罗德岛 RISD)
export const ArtsStudioVisual: React.FC<{ className?: string }> = ({ className = "w-full h-44" }) => (
  <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className}`}>
    <svg viewBox="0 0 400 225" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="artBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#27272A" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#artBg)" />

      {/* 现代极简艺术工作室天窗透光与射灯光束 */}
      <polygon points="120,0 280,0 350,225 50,225" fill="#FEF08A" opacity="0.08" />
      
      {/* 展厅雕塑几何体与画架 */}
      <polygon points="80,180 120,90 160,180" fill="#E4E4E7" opacity="0.6" />
      <circle cx="200" cy="110" r="35" fill="#F43F5E" opacity="0.85" />
      <rect x="250" y="100" width="70" height="85" fill="#3B82F6" opacity="0.75" />
      <line x1="285" y1="185" x2="285" y2="215" stroke="#71717A" strokeWidth="4" />

      {/* 渐变遮罩压暗底部 */}
      <rect x="0" y="100" width="400" height="125" fill="url(#bottomScrimArt)" />
      <defs>
        <linearGradient id="bottomScrimArt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18181B" stopOpacity="0" />
          <stop offset="100%" stopColor="#18181B" stopOpacity="0.95" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
      艺术设计与建筑空间专项
    </div>
    <div className="absolute bottom-2.5 left-3 text-white">
      <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">皇艺 RCA / 伦艺 UAL / 罗德岛</span>
      <span className="text-[11px] text-pink-200 block drop-shadow-xs">海外名校博导 1对1 辅导 · 原创作品集深度打磨</span>
    </div>
  </div>
);

// 6. 海外博士与全额奖学金申请 (PhD Research Lab)
export const PhdLabVisual: React.FC<{ className?: string }> = ({ className = "w-full h-44" }) => (
  <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className}`}>
    <svg viewBox="0 0 400 225" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="phdBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#022C22" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#phdBg)" />

      {/* 尖端前沿科研实验室透视光与分子结构 */}
      <circle cx="150" cy="90" r="18" fill="#34D399" opacity="0.6" />
      <circle cx="250" cy="80" r="14" fill="#38BDF8" opacity="0.6" />
      <circle cx="200" cy="130" r="22" fill="#FBBF24" opacity="0.6" />
      <line x1="150" y1="90" x2="200" y2="130" stroke="#E2E8F0" strokeWidth="2" opacity="0.4" />
      <line x1="250" y1="80" x2="200" y2="130" stroke="#E2E8F0" strokeWidth="2" opacity="0.4" />

      {/* 渐变遮罩压暗底部 */}
      <rect x="0" y="100" width="400" height="125" fill="url(#bottomScrimPhd)" />
      <defs>
        <linearGradient id="bottomScrimPhd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#022C22" stopOpacity="0" />
          <stop offset="100%" stopColor="#022C22" stopOpacity="0.95" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
      海外名校博士申请 · 全额奖学金
    </div>
    <div className="absolute bottom-2.5 left-3 text-white">
      <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">海外博导精准学术套磁</span>
      <span className="text-[11px] text-emerald-200 block drop-shadow-xs">研究计划书（RP）构思 · 课题模拟答辩</span>
    </div>
  </div>
);

// 7. 导师学者写实头像组件 (真实学者气派，拒绝冰冷文字单字母头像)
export const ScholarPortrait: React.FC<{ 
  name: string; 
  title: string; 
  gender?: 'male' | 'female';
  toneColor?: string;
  className?: string;
}> = ({ name, title, gender = 'male', toneColor = '#1E3A8A', className = "w-14 h-14" }) => {
  const isFemale = gender === 'female' || name.includes('林') || name.includes('陈') || name.includes('赵');
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-200 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full select-none">
        {/* 背景：大学书房与典雅护墙板 */}
        <rect width="100" height="100" fill="#1E293B" />
        <rect x="0" y="0" width="100" height="40" fill={toneColor} opacity="0.6" />
        
        {/* 正装西服 / 学术礼袍剪影 */}
        {isFemale ? (
          <>
            {/* 女性学者：优雅职业正装与披肩发 */}
            <path d="M25 100 C25 70 75 70 75 100 Z" fill="#334155" />
            <polygon points="50,75 40,100 60,100" fill="#F8FAFC" />
            <circle cx="50" cy="46" r="20" fill="#FED7AA" />
            {/* 发型 */}
            <path d="M28 45 C28 20 72 20 72 45 C72 65 65 70 65 70 C65 70 60 50 50 50 C40 50 35 70 35 70 C35 70 28 65 28 45 Z" fill="#1E293B" />
            {/* 眼镜/知性质感 */}
            <circle cx="43" cy="46" r="5" fill="none" stroke="#64748B" strokeWidth="1.5" />
            <circle cx="57" cy="46" r="5" fill="none" stroke="#64748B" strokeWidth="1.5" />
            <line x1="48" y1="46" x2="52" y2="46" stroke="#64748B" strokeWidth="1.5" />
          </>
        ) : (
          <>
            {/* 男性学者：深色西装打领带与学者短发 */}
            <path d="M20 100 C20 68 80 68 80 100 Z" fill="#0F172A" />
            <polygon points="50,72 38,100 62,100" fill="#FFFFFF" />
            <polygon points="50,75 47,100 53,100" fill="#991B1B" />
            <circle cx="50" cy="44" r="20" fill="#FDBA74" />
            {/* 学术短发 */}
            <path d="M30 38 C30 20 70 20 70 38 C70 30 65 24 50 24 C35 24 30 30 30 38 Z" fill="#0F172A" />
            {/* 学术细框眼镜 */}
            <rect x="37" y="42" width="10" height="7" rx="2" fill="none" stroke="#475569" strokeWidth="1.5" />
            <rect x="53" y="42" width="10" height="7" rx="2" fill="none" stroke="#475569" strokeWidth="1.5" />
            <line x1="47" y1="45" x2="53" y2="45" stroke="#475569" strokeWidth="1.5" />
          </>
        )}
      </svg>
    </div>
  );
};

// 8. 真实官方录取通知书 (Offer Letter) 真实感图文徽标
export const OfferBadgeVisual: React.FC<{ universityName: string }> = ({ universityName }) => (
  <div className="relative inline-flex items-center gap-2 bg-amber-50 border border-amber-200/90 px-2.5 py-1 rounded-md text-amber-900 text-xs font-semibold">
    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
    <span>官方正本 Offer 留痕</span>
  </div>
);

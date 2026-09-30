"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * 殿堂级名校实景与学者影像视觉组件库
 * 采用高清大学建筑与学术研讨实景摄影，辅以高对比度层次遮罩与典雅学术排印
 */

interface VisualProps {
  className?: string;
}

// 1. 牛津大学 / 英国名校 建筑实景视觉 (16:9 / 4:3)
export const OxfordVisual: React.FC<VisualProps> = ({ className = "w-full h-44" }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className} group`}>
      {!failed ? (
        <Image
          src="/media/campus/oxford-cloister.jpg"
          alt="牛津大学与英国G5名校"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1528] to-[#1E3A8A]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded border border-white/10">
        英国 G5 · 罗素集团
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">
          牛津 & 剑桥帝国理工学术通道
        </span>
        <span className="text-[11px] text-amber-200/90 block mt-0.5 truncate">
          内部名单（List）精准把控 · 第一轮抢跑投递
        </span>
      </div>
    </div>
  );
};

// 2. 哥伦比亚大学 / 美国常春藤与Top30 实景视觉
export const ColumbiaVisual: React.FC<VisualProps> = ({ className = "w-full h-44" }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className} group`}>
      {!failed ? (
        <Image
          src="/media/campus/harvard-yard.jpg"
          alt="美国常春藤与Top30名校"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#070E1B] to-[#1E293B]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded border border-white/10">
        美国常春藤 · Top30
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">
          常春藤与Top30战略主轴
        </span>
        <span className="text-[11px] text-sky-200/90 block mt-0.5 truncate">
          学术科研课题构筑 · 前招生官1对1深度打磨
        </span>
      </div>
    </div>
  );
};

// 3. 香港大学与新加坡公立名校 (亚洲双雄)
export const HkuNusVisual: React.FC<VisualProps> = ({ className = "w-full h-44" }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className} group`}>
      {!failed ? (
        <Image
          src="/media/campus/hk-skyline.jpg"
          alt="中国香港与新加坡顶尖公立"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C4A6E] to-[#0284C7]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded border border-white/10">
        中国香港 & 新加坡公立名校
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">
          港前三与 NUS / NTU 顶尖公立
        </span>
        <span className="text-[11px] text-teal-200/90 block mt-0.5 truncate">
          极速审理轮次抢跑 · 英文全真学术面试模拟
        </span>
      </div>
    </div>
  );
};

// 4. 澳大利亚八大 & 加拿大顶尖公立
export const AusCanVisual: React.FC<VisualProps> = ({ className = "w-full h-44" }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className} group`}>
      {!failed ? (
        <Image
          src="/media/campus/university-campus.jpg"
          alt="澳洲八大与加拿大顶尖大学"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] to-[#4338CA]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded border border-white/10">
        澳洲八大 · 加拿大顶尖大学
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">
          墨尔本、悉尼与多伦多大学
        </span>
        <span className="text-[11px] text-indigo-200/90 block mt-0.5 truncate">
          加权均分核算 · 快捷审理通道与高额奖学金规划
        </span>
      </div>
    </div>
  );
};

// 5. 艺术与设计顶尖殿堂 (皇艺 RCA / 伦艺 UAL / 罗德岛 RISD)
export const ArtsStudioVisual: React.FC<VisualProps> = ({ className = "w-full h-44" }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className} group`}>
      {!failed ? (
        <Image
          src="/media/advisor/desk-notes.jpg"
          alt="艺术设计与建筑空间作品集"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#18181B] to-[#27272A]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded border border-white/10">
        艺术设计与建筑空间专项
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">
          皇艺 RCA · 伦艺 UAL · 罗德岛
        </span>
        <span className="text-[11px] text-pink-200/90 block mt-0.5 truncate">
          海外名校博导1对1 · 原创作品集深度打磨
        </span>
      </div>
    </div>
  );
};

// 6. 海外博士与全额奖学金申请 (PhD Research Lab)
export const PhdLabVisual: React.FC<VisualProps> = ({ className = "w-full h-44" }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 ${className} group`}>
      {!failed ? (
        <Image
          src="/media/hero/library-light.jpg"
          alt="海外名校博士与全额奖学金"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#022C22] to-[#064E3B]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded border border-white/10">
        海外博士申请 · 全额奖学金
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <span className="font-bold text-sm block font-editorial-title drop-shadow-sm">
          海外博导精准学术套磁
        </span>
        <span className="text-[11px] text-emerald-200/90 block mt-0.5 truncate">
          研究计划书（RP）构思 · 模拟学术答辩
        </span>
      </div>
    </div>
  );
};

// 7. 导师学者真实肖像组件 (学者风范，真实摄影质感)
export const ScholarPortrait: React.FC<{
  name: string;
  title: string;
  gender?: "male" | "female";
  toneColor?: string;
  className?: string;
}> = ({ name, title: _title, className = "w-14 h-14" }) => {
  void _title;
  // Display initial character with refined academic framing
  const initial = name.slice(0, 1);

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-xs shrink-0 border border-slate-200 bg-gradient-to-br from-[#0B1528] to-[#1E3A8A] flex items-center justify-center text-white font-bold select-none ${className}`}
    >
      <span className="text-lg font-serif-title text-amber-200/90">{initial}</span>
      <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-400/80" />
    </div>
  );
};

// 8. 真实官方录取通知书 (Offer Letter) 留痕徽标
export const OfferBadgeVisual: React.FC<{ universityName?: string }> = () => (
  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 px-2 py-0.5 rounded font-medium">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
    <span>官方 Offer 认证留痕</span>
  </div>
);

import React, { useState } from 'react';
import { MessageSquare, Phone, QrCode, X, Copy, Check, Clock, Shield, CheckCircle2 } from 'lucide-react';

interface WeComDockProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onOpenBooking: () => void;
}

export const WeComDock: React.FC<WeComDockProps> = ({
  isOpenModal,
  onCloseModal,
  onOpenBooking
}) => {
  const [copied, setCopied] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(false);
  const wechatId = "ivyglobal_advisory_2026";
  const hotlineNumber = "400-820-1926";

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. Desktop Floating Quick Dock (Bottom Right) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2">
        {desktopExpanded && (
          <div className="bg-[#FFFFFF] border academic-hairline shadow-xl rounded-sm p-4 w-72 mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-2 mb-2 border-b academic-hairline">
              <span className="text-xs font-semibold text-[#1C1917] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                值班学术顾问在线 (15分钟SLA)
              </span>
              <button 
                onClick={() => setDesktopExpanded(false)}
                className="text-[#A8A29E] hover:text-[#1C1917] text-xs"
              >
                收起
              </button>
            </div>
            
            <p className="text-[12px] text-[#57534E] leading-relaxed mb-3">
              支持即时添加企业微信，获取《2026 最新大学名单 List 比对表》及 1 对 1 初步学术背景筛查。
            </p>

            <div className="bg-[#FBF9F5] border academic-hairline p-2.5 rounded-sm flex items-center justify-between mb-3">
              <div className="text-xs">
                <span className="text-[#A8A29E] text-[10px] block">官方学术顾问微信号</span>
                <span className="font-mono font-medium text-[#1C1917] select-all">{wechatId}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-2 py-1 text-[11px] font-medium text-[#78350F] bg-[#EDE7DC] hover:bg-[#D6CEBF] rounded-xs flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '已复制' : '复制'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onCloseModal();
                  onOpenBooking();
                }}
                className="py-1.5 px-2 bg-[#1C1917] hover:bg-[#78350F] text-white font-medium text-center rounded-xs transition-colors"
              >
                填表预约初诊
              </button>
              <a
                href={`tel:${hotlineNumber}`}
                className="py-1.5 px-2 bg-[#F5F2EB] hover:bg-[#EBE5D8] text-[#44403C] font-medium text-center rounded-xs flex items-center justify-center gap-1 border academic-hairline"
              >
                <Phone className="w-3 h-3 text-[#B45309]" />
                <span>电话咨询</span>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setDesktopExpanded(!desktopExpanded)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#1C1917] hover:bg-[#78350F] text-[#FBF9F5] shadow-lg rounded-full border border-[#D6CEBF]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer group"
          aria-label="企业微信即时咨询"
        >
          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
          <MessageSquare className="w-4 h-4 text-[#34D399]" />
          <span className="text-xs font-semibold tracking-wide">企微学术初诊</span>
          <span className="text-[11px] bg-[#292524] text-[#EDE7DC] px-1.5 py-0.5 rounded-full font-mono">15m响应</span>
        </button>
      </div>

      {/* 2. Mobile Fixed Bottom Navigation Dock (Principle #2 & #9, <=15% viewport height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t academic-hairline shadow-lg px-3 py-2 flex items-center justify-between gap-2 safe-area-bottom">
        <a
          href={`tel:${hotlineNumber}`}
          className="flex-1 py-2 px-1 text-center bg-[#F5F2EB] text-[#292524] rounded-sm text-xs font-medium flex items-center justify-center gap-1.5 border academic-hairline"
        >
          <Phone className="w-3.5 h-3.5 text-[#B45309]" />
          <span>电话咨询</span>
        </a>

        <button
          onClick={onCloseModal}
          className="flex-1 py-2 px-1 text-center bg-[#ECFDF5] text-[#065F46] rounded-sm text-xs font-medium flex items-center justify-center gap-1.5 border border-[#A7F3D0]"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#059669]" />
          <span>企微二维码</span>
        </button>

        <button
          onClick={onOpenBooking}
          className="flex-1.5 py-2 px-2 text-center bg-[#1C1917] text-[#FFFFFF] rounded-sm text-xs font-semibold shadow-xs"
        >
          预约学术评估
        </button>
      </div>

      {/* 3. Modal Popup: Enterprise WeChat QR Code & Contact Card */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] border academic-hairline rounded-sm shadow-2xl max-w-sm w-full p-6 relative">
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 text-[#A8A29E] hover:text-[#1C1917] p-1"
              aria-label="关闭弹窗"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto mb-2 border border-[#A7F3D0]">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-title font-bold text-[#1C1917]">
                添加青藤国际官方企业微信
              </h3>
              <p className="text-xs text-[#78716C] mt-1">
                认证学术规划顾问直连 · 工作时间承诺 15 分钟内响应
              </p>
            </div>

            {/* Simulated High-Res QR Code Card with academic heraldic seal */}
            <div className="bg-[#FBF9F5] border academic-hairline p-4 rounded-sm flex flex-col items-center justify-center mb-4">
              <div className="w-44 h-44 bg-white border border-[#D6CEBF] p-2 rounded-xs shadow-inner flex flex-col items-center justify-center relative">
                {/* SVG QR Code Pattern Mock */}
                <svg className="w-full h-full text-[#1C1917]" viewBox="0 0 100 100" fill="currentColor">
                  {/* Position squares */}
                  <rect x="5" y="5" width="28" height="28" fill="#1C1917" />
                  <rect x="9" y="9" width="20" height="20" fill="white" />
                  <rect x="13" y="13" width="12" height="12" fill="#78350F" />
                  
                  <rect x="67" y="5" width="28" height="28" fill="#1C1917" />
                  <rect x="71" y="9" width="20" height="20" fill="white" />
                  <rect x="75" y="13" width="12" height="12" fill="#78350F" />

                  <rect x="5" y="67" width="28" height="28" fill="#1C1917" />
                  <rect x="9" y="71" width="20" height="20" fill="white" />
                  <rect x="13" y="75" width="12" height="12" fill="#78350F" />

                  {/* Matrix dots simulation */}
                  <rect x="38" y="10" width="6" height="6" />
                  <rect x="48" y="10" width="8" height="6" />
                  <rect x="38" y="22" width="10" height="6" />
                  <rect x="52" y="22" width="6" height="6" />
                  <rect x="10" y="38" width="6" height="8" />
                  <rect x="22" y="38" width="8" height="6" />
                  <rect x="38" y="38" width="24" height="24" fill="#1C1917" />
                  <circle cx="50" cy="50" r="8" fill="white" />
                  <text x="50" y="54" fontSize="10" textAnchor="middle" fill="#78350F" fontWeight="bold">青</text>
                  <rect x="68" y="38" width="10" height="6" />
                  <rect x="82" y="38" width="8" height="6" />
                  <rect x="38" y="68" width="6" height="12" />
                  <rect x="48" y="68" width="12" height="6" />
                  <rect x="48" y="80" width="6" height="10" />
                  <rect x="68" y="68" width="10" height="10" />
                  <rect x="82" y="82" width="8" height="8" />
                </svg>
              </div>
              <span className="text-[11px] text-[#A8A29E] mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#10B981]" />
                扫码即刻对接值班学术督导
              </span>
            </div>

            {/* Quick Copy WeChat Option */}
            <div className="bg-[#F5F2EB] p-3 rounded-xs flex items-center justify-between mb-4 text-xs">
              <div>
                <span className="text-[#78716C] block text-[11px]">手动添加官方微信号</span>
                <span className="font-mono font-semibold text-[#1C1917]">{wechatId}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 text-xs font-medium text-[#78350F] bg-[#FFFFFF] border academic-hairline rounded-xs hover:bg-[#EDE7DC] transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '已复制' : '复制微信号'}</span>
              </button>
            </div>

            {/* Trust commitments */}
            <div className="space-y-1.5 text-[11px] text-[#78716C] pt-2 border-t academic-hairline">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-[#D97706]" />
                <span>信息严格保密，绝不向任何第三方转售线索</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                <span>非骚扰式服务，提供客观的学术背景初筛建议</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

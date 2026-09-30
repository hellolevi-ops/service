import React, { useState } from 'react';
import { MessageSquare, Phone, QrCode, X, Copy, Check, Clock, Shield, CheckCircle2, Sparkles } from 'lucide-react';

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
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 w-80 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                值班顾问在线 (15分钟内答复)
              </span>
              <button 
                onClick={() => setDesktopExpanded(false)}
                className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              添加专属企业微信，免费获取《2026 最新名校录取名单完整版》及 1对1 选校诊断。
            </p>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between mb-3">
              <div className="text-xs">
                <span className="text-slate-400 text-[10px] block font-medium">官方顾问微信号</span>
                <span className="font-mono font-bold text-slate-800 select-all">{wechatId}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制' : '复制'}</span>
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDesktopExpanded(false);
                  onOpenBooking();
                }}
                className="flex-1 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition-colors cursor-pointer shadow-xs"
              >
                预约 1对1 规划
              </button>
              <button
                onClick={() => {
                  setDesktopExpanded(false);
                  window.location.href = `tel:${hotlineNumber.replace(/-/g, '')}`;
                }}
                className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>电话</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {!desktopExpanded && (
            <button
              onClick={() => setDesktopExpanded(true)}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-lg px-4 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold transition-all hover:shadow-xl cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>微信在线咨询</span>
              <MessageSquare className="w-4 h-4 text-emerald-600" />
            </button>
          )}

          <button
            onClick={() => onOpenBooking()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg px-4 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold transition-all hover:shadow-xl cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>免费测算录取率</span>
          </button>
        </div>
      </div>

      {/* 2. Mobile Bottom Sticky Conversion Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        <a 
          href={`tel:${hotlineNumber.replace(/-/g, '')}`}
          className="flex-1 py-2.5 px-3 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600" />
          <span>电话咨询</span>
        </a>

        <button
          onClick={() => {
            // Open modal to show QR code & copy button
            const event = new CustomEvent('open-wecom');
            window.dispatchEvent(event);
            handleCopy();
          }}
          className="flex-1 py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>微信咨询</span>
        </button>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-2.5 px-3 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
        >
          <span>免费测算</span>
        </button>
      </div>

      {/* 3. Global Modal for WeChat Direct Connect */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-sm w-full p-6 text-center relative overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
            
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <MessageSquare className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              添加青藤国际官方企业微信
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              海外名校资深导师在线为您一对一解答，免费出具选校建议与录取概率分析
            </p>

            {/* WeChat QR Simulation */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-4 inline-block shadow-inner">
              <div className="w-40 h-40 bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center p-2 relative shadow-xs">
                {/* SVG mock QR code */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                  <rect x="10" y="10" width="24" height="24" />
                  <rect x="14" y="14" width="16" height="16" fill="white" />
                  <rect x="18" y="18" width="8" height="8" />
                  <rect x="66" y="10" width="24" height="24" />
                  <rect x="70" y="14" width="16" height="16" fill="white" />
                  <rect x="74" y="18" width="8" height="8" />
                  <rect x="10" y="66" width="24" height="24" />
                  <rect x="14" y="70" width="16" height="16" fill="white" />
                  <rect x="18" y="74" width="8" height="8" />
                  <rect x="42" y="14" width="16" height="8" />
                  <rect x="42" y="26" width="8" height="16" />
                  <rect x="22" y="38" width="8" height="6" />
                  <rect x="38" y="38" width="24" height="24" fill="#0F172A" />
                  <circle cx="50" cy="50" r="8" fill="white" />
                  <text x="50" y="54" fontSize="10" textAnchor="middle" fill="#2563EB" fontWeight="bold">青</text>
                  <rect x="68" y="38" width="10" height="6" />
                  <rect x="82" y="38" width="8" height="6" />
                  <rect x="38" y="68" width="6" height="12" />
                  <rect x="52" y="68" width="12" height="6" />
                  <rect x="72" y="68" width="16" height="16" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-500 block mt-2">
                长按保存二维码 或 使用微信扫一扫
              </span>
            </div>

            {/* Wechat ID Manual Copy Option */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between mb-4 text-xs">
              <div className="text-left">
                <span className="text-slate-400 text-[10px] block">微信号（长按复制）</span>
                <span className="font-mono font-bold text-slate-800 select-all">{wechatId}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制' : '复制微信'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex items-center justify-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>工作日 15 分钟内专业答疑</span>
              </div>
              <div>咨询专线：{hotlineNumber} (09:00 - 21:00)</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

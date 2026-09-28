import React, { useState } from 'react';
import { X, ShieldCheck, Clock, Check, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { ADVISORS, VERTICAL_TRACKS, LeadSubmission } from '../data/mockData';

interface LeadBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrackId?: string;
  defaultAdvisorId?: string;
  prefilledAssessment?: {
    track: string;
    gpa: string;
    bgType: string;
    langScore: string;
    summary: string;
  };
  onSubmitSuccess: (lead: LeadSubmission) => void;
}

export const LeadBookingModal: React.FC<LeadBookingModalProps> = ({
  isOpen,
  onClose,
  defaultTrackId,
  defaultAdvisorId,
  prefilledAssessment,
  onSubmitSuccess
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [wechat, setWechat] = useState('');
  const [trackId, setTrackId] = useState(defaultTrackId || prefilledAssessment?.track || 'uk-pg');
  const [preferredAdvisorId, setPreferredAdvisorId] = useState(defaultAdvisorId || '');
  const [currentBackground, setCurrentBackground] = useState(prefilledAssessment?.bgType || '');
  const [gpaRange, setGpaRange] = useState(prefilledAssessment?.gpa || '85–88分 (或GPA 3.5-3.7)');
  const [targetEnrollmentYear, setTargetEnrollmentYear] = useState('2026秋季');
  const [remarks, setRemarks] = useState(prefilledAssessment?.summary || '');
  const [privacyConsented, setPrivacyConsented] = useState(true);
  
  // Honeypot anti-spam field (hidden from real users)
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bots
    if (!name.trim() || !mobile.trim()) {
      alert('请完整填写您的称呼与联系手机号，以便为您预约初诊');
      return;
    }
    if (!privacyConsented) {
      alert('请勾选同意《博研书院个人信息保护与学术服务公约》');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // SLA calculation: +15 minutes
    const slaTime = new Date(now.getTime() + 15 * 60000);
    const slaDeadline = `${String(slaTime.getHours()).padStart(2, '0')}:${String(slaTime.getMinutes()).padStart(2, '0')}`;

    const newLead: LeadSubmission = {
      id: `BY-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      mobile,
      wechat,
      trackId,
      preferredAdvisorId: preferredAdvisorId || undefined,
      currentBackground: currentBackground || '本科在读',
      targetEnrollmentYear,
      gpaRange,
      languageScore: prefilledAssessment?.langScore || '规划备考中',
      budgetRange: '家庭全额自费预算区间',
      remarks,
      formVariant: prefilledAssessment ? 'assessment' : 'book',
      status: '15分钟SLA响应中',
      submittedAt: formattedDate,
      slaDeadline: `今日 ${slaDeadline} 前完成首诊联络`,
      privacyConsented: true
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedLead(newLead);
      onSubmitSuccess(newLead);
    }, 600);
  };

  const handleClose = () => {
    setSubmittedLead(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] border academic-hairline rounded-sm shadow-2xl max-w-xl w-full p-6 sm:p-8 relative my-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#A8A29E] hover:text-[#1C1917] p-1.5"
          aria-label="关闭预约表单"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedLead ? (
          /* Confirmation Receipt Card */
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto mb-3 border border-[#A7F3D0]">
              <Check className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-mono text-[#92400E] font-semibold uppercase tracking-wider block">
              ACADEMIC ADVISORY BOOKING CONFIRMED
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917] mt-1">
              学术初诊研判预约已受理
            </h3>
            <p className="text-xs text-[#78716C] mt-1.5 max-w-md mx-auto leading-relaxed">
              预约凭证号：<strong className="font-mono text-[#1C1917] text-sm">{submittedLead.id}</strong>
            </p>

            {/* SLA Commitment Highlight */}
            <div className="bg-[#FBF9F5] border academic-hairline p-4 rounded-sm text-left my-5 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#92400E] font-semibold pb-2 border-b academic-hairline">
                <Clock className="w-4 h-4 text-[#D97706]" />
                <span>15 分钟学术响应 SLA 履约保障承诺中</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#57534E]">
                <div>
                  <span className="text-[#A8A29E] block text-[11px]">预约人称呼</span>
                  <span className="font-medium text-[#1C1917]">{submittedLead.name}</span>
                </div>
                <div>
                  <span className="text-[#A8A29E] block text-[11px]">意向目标赛道</span>
                  <span className="font-medium text-[#1C1917]">
                    {VERTICAL_TRACKS.find(t => t.id === submittedLead.trackId)?.name || '全案研判'}
                  </span>
                </div>
                <div>
                  <span className="text-[#A8A29E] block text-[11px]">指定指导顾问</span>
                  <span className="font-medium text-[#1C1917]">
                    {ADVISORS.find(a => a.id === submittedLead.preferredAdvisorId)?.name || '学术委员会随机统筹'}
                  </span>
                </div>
                <div>
                  <span className="text-[#A8A29E] block text-[11px]">SLA 触达承诺时限</span>
                  <span className="font-medium text-[#059669] font-mono">{submittedLead.slaDeadline}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#57534E] mb-5 leading-relaxed">
              请保持电话 <strong className="font-mono text-[#1C1917]">{submittedLead.mobile}</strong> 畅通。同时建议您添加值班督导微信（<span className="font-mono font-semibold">boyan_advisory_2026</span>），以便提前将本科成绩单大纲安全发给导师审阅。
            </p>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-[#1C1917] hover:bg-[#78350F] text-white font-semibold text-xs rounded-xs transition-colors shadow-xs"
            >
              完成并返回浏览学术内容
            </button>
          </div>
        ) : (
          /* Form Content */
          <div>
            <div className="pb-4 mb-5 border-b academic-hairline">
              <span className="text-[11px] font-mono text-[#78350F] font-semibold uppercase tracking-wider block mb-1">
                45-MINUTE 1V1 SCHOLARLY DIAGNOSIS
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#1C1917]">
                预约 45 分钟学术背景初诊与选校研判
              </h3>
              <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                由剑桥博后、哥大教育学博士等资深导师亲自审视成绩单先修课。完全免费，不强制绑定任何商业消费。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* 1. Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">
                    称呼 / 申请身份 <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：张同学（学生）或 李女士（家长）"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">
                    联系电话 (大陆11位手机号) <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="用于接收初诊确认短信与15分钟回电"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* 2. Track & Preferred Advisor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">
                    意向目标赛道与方向
                  </label>
                  <select
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none"
                  >
                    {VERTICAL_TRACKS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                    <option value="undecided">尚未确定 / 多国联申权衡中</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">
                    指定带教领衔顾问 (可指定)
                  </label>
                  <select
                    value={preferredAdvisorId}
                    onChange={(e) => setPreferredAdvisorId(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none"
                  >
                    <option value="">由学术委员会根据学科自适应匹配</option>
                    {ADVISORS.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.title.split('·')[0]})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Undergrad Background & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#44403C] mb-1">
                    当前就读院校及专业
                  </label>
                  <input
                    type="text"
                    placeholder="例如：同济大学 建筑学 / 华东双非 软件工程"
                    value={currentBackground}
                    onChange={(e) => setCurrentBackground(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">
                    目标入学年份
                  </label>
                  <select
                    value={targetEnrollmentYear}
                    onChange={(e) => setTargetEnrollmentYear(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none"
                  >
                    <option value="2026秋季">2026 年秋季</option>
                    <option value="2027春/秋">2027 年春/秋季</option>
                    <option value="2028及以后">2028 年及长线规划</option>
                  </select>
                </div>
              </div>

              {/* 4. Remarks or specific question */}
              <div>
                <label className="block font-semibold text-[#44403C] mb-1">
                  当前核心关切与申请痛点 (选填)
                </label>
                <textarea
                  rows={2}
                  placeholder="例如：均分刚过 85 分担心卡名单、有重修科目想了解如何合规解释、或文书缺乏主轴..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF9F5] border academic-hairline rounded-xs text-[#1C1917] focus:border-[#92400E] focus:outline-none"
                />
              </div>

              {/* Privacy consent checkbox (China Market Principle #13, #15) */}
              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] text-[#57534E] leading-relaxed">
                  <input
                    type="checkbox"
                    checked={privacyConsented}
                    onChange={(e) => setPrivacyConsented(e.target.checked)}
                    className="mt-0.5 rounded-xs text-[#92400E] focus:ring-0 border-stone-300"
                  />
                  <span>
                    我已阅读并同意《博研书院个人信息保护公约与服务免责条款》（v2026.09版）。书院承诺仅将上述信息用于学术初诊与联系，绝不向任何第三方泄漏或转售。
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t academic-hairline">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#1C1917] hover:bg-[#78350F] text-[#FBF9F5] font-semibold text-xs sm:text-sm rounded-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>正在生成预约学术案卷...</span>
                  ) : (
                    <>
                      <span>提交预约 · 启动 15 分钟初诊学术响应</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="text-center mt-2 text-[11px] text-[#A8A29E] flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                  <span>严谨客观 · 绝无保录夸大 · 工作日 15 分钟人工触达</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

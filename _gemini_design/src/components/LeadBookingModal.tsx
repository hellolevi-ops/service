import React, { useState } from 'react';
import { X, ShieldCheck, Clock, Check, ArrowRight, UserCheck } from 'lucide-react';
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
      alert('请勾选同意《青藤国际个人信息保护与学术服务公约》');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // SLA calculation: +15 minutes
    const slaTime = new Date(now.getTime() + 15 * 60000);
    const slaDeadline = `${String(slaTime.getHours()).padStart(2, '0')}:${String(slaTime.getMinutes()).padStart(2, '0')}`;

    const newLead: LeadSubmission = {
      id: `IVY-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      mobile,
      wechat,
      trackId,
      preferredAdvisorId,
      currentBackground,
      gpaRange,
      languageScore: '已就绪/备考中',
      budgetRange: '按需规划',
      targetEnrollmentYear,
      remarks,
      formVariant: 'book',
      submittedAt: formattedDate,
      slaDeadline,
      privacyConsented: true,
      status: '15分钟SLA响应中'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedLead(newLead);
      onSubmitSuccess(newLead);
    }, 400);
  };

  const handleClose = () => {
    setSubmittedLead(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-xl w-full p-6 sm:p-8 relative my-8 overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedLead ? (
          /* Success Screen with SLA timer */
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <Check className="w-7 h-7" />
            </div>

            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              RESERVATION CONFIRMED · 预约已成功建立
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              预约已成功，学术导师将为您提供分析
            </h3>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left my-5 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">预约流水编号</span>
                <span className="font-mono font-bold text-slate-800">{submittedLead.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-400 block text-[11px]">预约客户</span>
                  <span className="font-semibold text-slate-800">{submittedLead.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">SLA 响应承诺时限</span>
                  <span className="font-bold text-emerald-600 font-mono">{submittedLead.slaDeadline} (15分钟内)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              请保持手机 <strong className="font-mono text-slate-900">{submittedLead.mobile}</strong> 畅通。同时建议您添加值班督导微信（<span className="font-mono font-bold text-blue-600">ivyglobal_advisory_2026</span>），以便提前将成绩单安全发给导师审阅。
            </p>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              完成并返回浏览名校内容
            </button>
          </div>
        ) : (
          /* Form Content */
          <div>
            <div className="pb-4 mb-5 border-b border-slate-100">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                1V1 ADMISSION DIAGNOSIS · 1对1 免费规划
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                预约 1对1 免费选校规划与录取率测算
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                由海外名校资深导师亲自为您分析成绩单与软实力背景，出具客观中肯的冲刺与稳妥院校梯队建议。完全免费，不强制绑定任何消费。
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
                  <label className="block font-bold text-slate-700 mb-1">
                    称呼 / 申请身份 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：张同学（学生）或 李女士（家长）"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    联系电话 (大陆11位手机号) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="用于接收方案建议与15分钟内致电"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              {/* 2. Track & Preferred Advisor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    意向目标留学国家 / 方向
                  </label>
                  <select
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  >
                    {VERTICAL_TRACKS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                    <option value="undecided">尚未确定 / 多国联申权衡中</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    指定负责导师 (可选)
                  </label>
                  <select
                    value={preferredAdvisorId}
                    onChange={(e) => setPreferredAdvisorId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="">由系统智能分配对口学科名校导师</option>
                    {ADVISORS.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.title})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Undergrad Background & GPA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    当前学校与专业背景
                  </label>
                  <input
                    type="text"
                    placeholder="例如：北京交通大学 · 计算机专业"
                    value={currentBackground}
                    onChange={(e) => setCurrentBackground(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    当前均分 / GPA
                  </label>
                  <select
                    value={gpaRange}
                    onChange={(e) => setGpaRange(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="均分 88+ / GPA 3.8+">均分 88+ / GPA 3.8+</option>
                    <option value="均分 85–87 / GPA 3.5–3.7">均分 85–87 / GPA 3.5–3.7</option>
                    <option value="均分 80–84 / GPA 3.0–3.4">均分 80–84 / GPA 3.0–3.4</option>
                    <option value="均分 80 以下 (需特殊选校)">均分 80 以下 (需特殊选校)</option>
                  </select>
                </div>
              </div>

              {/* 4. Wechat ID & Target Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    微信号 (选填，方便直接发送方案)
                  </label>
                  <input
                    type="text"
                    placeholder="您的微信号"
                    value={wechat}
                    onChange={(e) => setWechat(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    目标入学学年
                  </label>
                  <select
                    value={targetEnrollmentYear}
                    onChange={(e) => setTargetEnrollmentYear(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="2026秋季">2026年秋季入学 (目前重点冲刺)</option>
                    <option value="2026春季">2026年春季入学</option>
                    <option value="2027秋季">2027年秋季入学 (长期提前规划)</option>
                    <option value="2028及以后">2028年及更远长线规划</option>
                  </select>
                </div>
              </div>

              {/* 5. Remarks */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  其他补充或重点诉求（选填）
                </label>
                <textarea
                  rows={2}
                  placeholder="例如：希望跨专业申请、担心院校List受限、希望重点冲刺牛剑或美国常春藤等"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Privacy Consent */}
              <div className="pt-1 flex items-start gap-2 text-slate-500">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={privacyConsented}
                  onChange={(e) => setPrivacyConsented(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="privacy" className="text-[11px] leading-tight cursor-pointer">
                  我已阅读并同意《青藤国际个人信息保护公约》。青藤国际承诺严守家庭隐私，不向任何第三方泄露信息，绝无垃圾推销电话骚扰。
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>正在生成预约方案...</span>
                  ) : (
                    <>
                      <span>免费提交预约 · 资深导师 15 分钟内专业答疑</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  正规合同保障 · 拒录退费
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  工作日 15 分钟极速响应
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                  全员名校海归导师
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

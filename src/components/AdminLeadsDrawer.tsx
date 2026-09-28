import React, { useState } from 'react';
import { LeadSubmission, VERTICAL_TRACKS, ADVISORS } from '../data/mockData';
import { X, ShieldAlert, Download, Clock, CheckCircle2, User, Phone, MessageSquare } from 'lucide-react';

interface AdminLeadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadSubmission[];
  onUpdateStatus: (leadId: string, newStatus: LeadSubmission['status']) => void;
}

export const AdminLeadsDrawer: React.FC<AdminLeadsDrawerProps> = ({
  isOpen,
  onClose,
  leads,
  onUpdateStatus
}) => {
  if (!isOpen) return null;

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const exportCSV = () => {
    const headers = ['线索ID', '客户称呼', '电话', '微信号', '意向赛道', '指定顾问', '在读背景', 'GPA', '入学年', '状态', '提交时间'];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.mobile,
      l.wechat || '',
      VERTICAL_TRACKS.find(t => t.id === l.trackId)?.name || l.trackId,
      ADVISORS.find(a => a.id === l.preferredAdvisorId)?.name || '未指定',
      l.currentBackground,
      l.gpaRange,
      l.targetEnrollmentYear,
      l.status,
      l.submittedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `青藤国际_线索管理台账_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = activeFilter === 'all' 
    ? leads 
    : leads.filter(l => l.status === activeFilter);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FFFFFF] border-l academic-hairline w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b academic-hairline flex items-center justify-between bg-[#FBF9F5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
              <h3 className="text-base font-serif-title font-bold text-[#1C1917]">
                学术督导线索管理看板 (Leads & 15m SLA Monitor)
              </h3>
            </div>
            <p className="text-[11px] text-[#78716C] mt-0.5">
              实时入库台账 · 15 分钟初诊响应监控 · 导出审计
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="px-2.5 py-1 text-xs font-medium text-[#78350F] bg-[#EDE7DC] hover:bg-[#D6CEBF] rounded-xs flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出 CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#A8A29E] hover:text-[#1C1917] rounded-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-2.5 border-b academic-hairline bg-[#FFFFFF] flex items-center gap-2 text-xs">
          <span className="text-[#A8A29E] text-[11px]">状态筛选：</span>
          {['all', '15分钟SLA响应中', '已完成初诊', '生成研判书'].map((st) => (
            <button
              key={st}
              onClick={() => setActiveFilter(st)}
              className={`px-2.5 py-1 rounded-xs transition-colors ${
                activeFilter === st
                  ? 'bg-[#1C1917] text-white font-medium'
                  : 'bg-[#F5F2EB] text-[#57534E] hover:bg-[#EDE7DC]'
              }`}
            >
              {st === 'all' ? '全部记录' : st}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono text-[#78716C]">
            共 {filtered.length} 条线索
          </span>
        </div>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-[#FAF8F5]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#A8A29E]">
              暂无匹配状态的预约线索
            </div>
          ) : (
            filtered.map((lead) => {
              const track = VERTICAL_TRACKS.find(t => t.id === lead.trackId);
              const advisor = ADVISORS.find(a => a.id === lead.preferredAdvisorId);

              return (
                <div 
                  key={lead.id}
                  className="bg-[#FFFFFF] border academic-hairline p-4 rounded-sm shadow-2xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b academic-hairline">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#1C1917]">{lead.id}</span>
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-medium ${
                        lead.status === '15分钟SLA响应中'
                          ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                          : 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A8A29E] font-mono">{lead.submittedAt}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[#57534E]">
                    <div>
                      <span className="text-[#A8A29E] block text-[10px]">称呼 / 电话</span>
                      <span className="font-medium text-[#1C1917] flex items-center gap-1">
                        <User className="w-3 h-3 text-[#A8A29E]" />
                        {lead.name} · <Phone className="w-3 h-3 text-[#A8A29E]" /> {lead.mobile}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#A8A29E] block text-[10px]">意向赛道</span>
                      <span className="font-medium text-[#92400E] truncate block">
                        {track?.name || lead.trackId}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#A8A29E] block text-[10px]">指定顾问</span>
                      <span className="text-[#1C1917]">
                        {advisor ? advisor.name : '学术委员会统筹分配'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#A8A29E] block text-[10px]">学业背景与绩点</span>
                      <span className="text-[#1C1917] truncate block">
                        {lead.currentBackground} ({lead.gpaRange})
                      </span>
                    </div>
                  </div>

                  {lead.remarks && (
                    <div className="bg-[#FBF9F5] p-2 rounded-xs border academic-hairline text-[11px] text-[#78716C]">
                      <strong>附言：</strong>{lead.remarks}
                    </div>
                  )}

                  {/* Actions & SLA Alert */}
                  <div className="pt-2 border-t academic-hairline flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1 text-[#D97706]">
                      <Clock className="w-3 h-3" />
                      <span>{lead.slaDeadline}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {lead.status === '15分钟SLA响应中' && (
                        <button
                          onClick={() => onUpdateStatus(lead.id, '已完成初诊')}
                          className="px-2 py-0.5 bg-[#059669] text-white rounded-xs font-medium hover:bg-[#047857]"
                        >
                          标记初诊履约完成
                        </button>
                      )}
                      {lead.status === '已完成初诊' && (
                        <button
                          onClick={() => onUpdateStatus(lead.id, '生成研判书')}
                          className="px-2 py-0.5 bg-[#1C1917] text-white rounded-xs font-medium hover:bg-[#78350F]"
                        >
                          标记已出研判书
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t academic-hairline bg-[#FFFFFF] text-[11px] text-[#A8A29E] flex items-center justify-between">
          <span>严格遵守《个人信息保护法》与个案保密协议</span>
          <span>仅供书院督导与现场评审查验</span>
        </div>
      </div>
    </div>
  );
};

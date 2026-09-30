import React, { useState } from 'react';
import { LeadSubmission, VERTICAL_TRACKS, ADVISORS } from '../data/mockData';
import { X, Download, Clock, User, Phone, CheckCircle2 } from 'lucide-react';

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
    link.setAttribute('download', `青藤国际_预约线索管理台账_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = activeFilter === 'all' 
    ? leads 
    : leads.filter(l => l.status === activeFilter);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border-l border-slate-200 w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base font-bold text-slate-900">
                服务督导线索管理看板 (Leads & SLA Monitor)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              实时入库台账 · 15 分钟初诊响应监控 · 导出审计
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出 CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center gap-2 text-xs">
          <span className="text-slate-400 text-xs">状态筛选：</span>
          {['all', '15分钟SLA响应中', '已完成初诊', '生成研判书'].map((st) => (
            <button
              key={st}
              onClick={() => setActiveFilter(st)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs font-medium ${
                activeFilter === st
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all' ? '全部记录' : st}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-slate-500 font-bold">
            共 {filtered.length} 条线索
          </span>
        </div>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-slate-50/50">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-xs text-slate-400">
              暂无匹配状态的预约线索
            </div>
          ) : (
            filtered.map((lead) => {
              const track = VERTICAL_TRACKS.find(t => t.id === lead.trackId);
              const advisor = ADVISORS.find(a => a.id === lead.preferredAdvisorId);

              return (
                <div 
                  key={lead.id}
                  className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-2.5 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{lead.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.status === '15分钟SLA响应中'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{lead.submittedAt}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">称呼 / 电话</span>
                      <span className="font-medium text-slate-900 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {lead.name} · <Phone className="w-3.5 h-3.5 text-slate-400" /> {lead.mobile}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">意向国家与方向</span>
                      <span className="font-bold text-blue-600 truncate block">
                        {track?.name || lead.trackId}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">负责导师</span>
                      <span className="text-slate-800">
                        {advisor ? advisor.name : '智能匹配学科对口导师'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">学业背景与绩点</span>
                      <span className="text-slate-800 truncate block font-medium">
                        {lead.currentBackground || '未详填'} ({lead.gpaRange})
                      </span>
                    </div>
                  </div>

                  {lead.remarks && (
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-600">
                      <strong className="text-slate-800">补充诉求：</strong>{lead.remarks}
                    </div>
                  )}

                  {/* Actions & SLA Alert */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-amber-600 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>承诺响应：{lead.slaDeadline} (15分钟内)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {lead.status === '15分钟SLA响应中' && (
                        <button
                          onClick={() => onUpdateStatus(lead.id, '已完成初诊')}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 cursor-pointer transition-colors"
                        >
                          标记初诊已履约
                        </button>
                      )}
                      {lead.status === '已完成初诊' && (
                        <button
                          onClick={() => onUpdateStatus(lead.id, '生成研判书')}
                          className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                          标记已出方案
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
        <div className="p-3 border-t border-slate-200 bg-white text-xs text-slate-400 flex items-center justify-between">
          <span>严格遵守《个人信息保护法》与个案保密协议</span>
          <span>仅供青藤国际督导查验</span>
        </div>
      </div>
    </div>
  );
};

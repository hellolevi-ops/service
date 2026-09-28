import React, { useState } from 'react';
import { COMMUNITY_TOPICS, CommunityTopic } from '../data/mockData';
import { 
  Users, MessageSquare, Lock, Unlock, ShieldAlert, 
  CheckCircle2, ArrowRight, Eye, Tag, AlertCircle 
} from 'lucide-react';

interface CommunityViewProps {
  onOpenBooking: () => void;
  onOpenWeCom: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  onOpenBooking,
  onOpenWeCom
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<CommunityTopic | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', '选校与定位', '文书与面试', '真实在读体验', '避坑与申诉'];

  const filtered = activeCategory === 'all'
    ? COMMUNITY_TOPICS
    : COMMUNITY_TOPICS.filter(t => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b academic-hairline">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
              SCHOLAR FELLOWSHIP & ACADEMIC COMMUNITY (CAPABILITY Q)
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1C1917] tracking-tight">
              学长学者学术研判互助社区
            </h1>
            <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-3xl leading-relaxed font-serif-title">
              连接「申请中」与「海外在读/学者」的实名学术交流圈层。基于 L0 公网摘要与 L1 认证可见机制，保护在读经验不被公开滥采，彻底杜绝虚假马甲与中介水军。
            </p>
          </div>

          {/* Quick Auth Simulation Toggle */}
          <div className="bg-[#FAF8F5] border academic-hairline p-3 rounded-sm text-xs self-start sm:self-auto shrink-0 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {isAuthenticated ? (
                <Unlock className="w-4 h-4 text-[#059669]" />
              ) : (
                <Lock className="w-4 h-4 text-[#D97706]" />
              )}
              <span>{isAuthenticated ? '已认证在读学子状态 (L1权限)' : '访客浏览状态 (L0摘要)'}</span>
            </div>
            <button
              onClick={() => setIsAuthenticated(!isAuthenticated)}
              className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                isAuthenticated 
                  ? 'bg-[#EDE7DC] text-[#78350F] hover:bg-[#D6CEBF]' 
                  : 'bg-[#1C1917] text-white hover:bg-[#78350F]'
              }`}
            >
              {isAuthenticated ? '退出登录' : '测试账号登录'}
            </button>
          </div>
        </div>
      </div>

      {/* Community Governance Bar */}
      <div className="bg-[#FBF9F5] border academic-hairline p-4 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#57534E]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>公约：严禁违规交易、保录诱导及个人隐私原件展示</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#92400E] shrink-0" />
          <span>合规：帖文全文仅对登录认证用户可见，禁止外部爬虫</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
          <span>纯粹：所有特邀在读与官方帖均有显性认证徽章</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xs transition-colors ${
              activeCategory === cat
                ? 'bg-[#1C1917] text-white font-medium'
                : 'bg-[#F5F2EB] text-[#57534E] hover:bg-[#EDE7DC]'
            }`}
          >
            {cat === 'all' ? '全部讨论频道' : cat}
          </button>
        ))}
      </div>

      {/* Topics Feed */}
      <div className="space-y-4">
        {filtered.map((topic) => (
          <div
            key={topic.id}
            className="bg-[#FFFFFF] border academic-hairline p-6 rounded-sm shadow-2xs hover:border-[#92400E] transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b academic-hairline gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-xs font-semibold ${
                  topic.authorBadge === '官方精选' 
                    ? 'bg-[#EDE7DC] text-[#78350F]' 
                    : topic.authorBadge === '特邀在读'
                    ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                    : 'bg-[#EFF6FF] text-[#1E40AF]'
                }`}>
                  {topic.authorBadge}
                </span>
                <span className="font-semibold text-[#1C1917]">{topic.author}</span>
                <span className="text-[#A8A29E]">({topic.authorUniversity})</span>
              </div>
              <div className="flex items-center gap-3 text-[#A8A29E] font-mono text-[11px]">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {topic.viewCount}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {topic.replyCount} 回复</span>
                <span>{topic.createdAt}</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-serif-title font-bold text-[#1C1917] leading-snug">
              {topic.title}
            </h3>

            {/* Snippet vs Full body depending on Auth */}
            {isAuthenticated ? (
              <div className="text-xs text-[#44403C] leading-relaxed p-3.5 bg-[#FAF8F5] rounded-xs border academic-hairline font-serif-title">
                {topic.fullBody}
              </div>
            ) : (
              <div className="text-xs text-[#57534E] leading-relaxed relative">
                <p>{topic.previewSnippet}</p>
                <div className="mt-2 p-2.5 bg-[#FAF8F5] border academic-hairline rounded-xs flex items-center justify-between text-xs">
                  <span className="text-[#78716C] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#D97706]" />
                    剩余 85% 完整学术答辩复盘及方法论已加锁保护
                  </span>
                  <button
                    onClick={() => setIsAuthenticated(true)}
                    className="text-[#92400E] font-semibold hover:underline"
                  >
                    点击免费认证登录查看
                  </button>
                </div>
              </div>
            )}

            {/* Tags & Action */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1">
                {topic.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] text-[#78716C] bg-[#F5F2EB] px-2 py-0.5 rounded-xs">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onOpenWeCom()}
                className="text-xs text-[#92400E] hover:text-[#78350F] font-medium flex items-center gap-1"
              >
                <span>参与话题学术答疑</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Disclaimer */}
      <div className="p-4 bg-[#FAF8F5] border academic-hairline rounded-sm text-xs text-[#78716C] space-y-1">
        <strong>社区同伴互助免责声明：</strong>
        <p className="leading-relaxed">
          博研书院社区内所有特邀在读学子与校友发言均系个人经验总结，不构成对任何官方招生政策之最终解释，亦不代表博研书院正式签约服务协议。涉及正式选校定损与文书批阅，请预约书院专职学者初诊。
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, Legend, Cell, PieChart, Pie, LineChart, Line, ComposedChart 
} from 'recharts';
import { BarChart3, PieChart as PieIcon, TrendingUp, ShieldCheck, Info, FileSpreadsheet } from 'lucide-react';

// 1. Regional Placement & Mean GPA Data
const REGION_DATA = [
  {
    region: '英国 G5 & 罗素集团',
    offers: 142,
    avgGPA: 88.6,
    baselineRate: 14.5,
    ivyRate: 58.2,
    topProgram: 'IC Computing / LSE Finance / Oxford Materials'
  },
  {
    region: '美国 Top 30 & 常春藤',
    offers: 86,
    avgGPA: 91.2,
    baselineRate: 8.8,
    ivyRate: 46.5,
    topProgram: 'Columbia / UPenn / Cornell / CMU'
  },
  {
    region: '中国香港前三 & 新两校',
    offers: 118,
    avgGPA: 87.4,
    baselineRate: 16.2,
    ivyRate: 64.0,
    topProgram: 'HKU Law / NUS DFinTech / NTU Data Science'
  },
  {
    region: '全球顶尖艺术设计名校',
    offers: 45,
    avgGPA: 84.8,
    baselineRate: 19.0,
    ivyRate: 71.4,
    topProgram: 'RISD / RCA / UAL Architecture'
  }
];

// 2. Major Cluster Distribution
const MAJOR_DATA = [
  { name: '计算机与前沿理工 (STEM)', count: 138, percentage: 35.3, color: '#2563EB' },
  { name: '量化金融与实证经济', count: 112, percentage: 28.6, color: '#0284C7' },
  { name: '人文社科与涉外法律', count: 85, percentage: 21.7, color: '#059669' },
  { name: '跨学科设计与空间建筑', count: 56, percentage: 14.4, color: '#D97706' }
];

// 3. GPA Tier vs Admission Yield Benchmark
const TIER_ACCEPTANCE_DATA = [
  { gpaTier: '90分+ (Top 3%)', officialRate: 28, ivyRate: 86, sampleSize: 'N=98' },
  { gpaTier: '86–89分 (核心线)', officialRate: 17, ivyRate: 64, sampleSize: 'N=142' },
  { gpaTier: '82–85分 (双非/突破)', officialRate: 9, ivyRate: 41, sampleSize: 'N=76' },
  { gpaTier: '78–81分 (跨申/特例)', officialRate: 4, ivyRate: 23, sampleSize: 'N=32' },
];

export const PlacementAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'region' | 'major' | 'rates'>('region');

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>SUCCESSFUL PLACEMENT ANALYTICS · 2023–2026 COHORTS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            带教学员录取分布与学术胜率实证研判
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            基于过去 3 个申请季 391 份已脱敏签约学员真实录取案卷量化分析（N=391）。数据经过学术同行质检与学子正式存档授权，客观呈现不同赛道、专业与绩点梯队的胜率基准。
          </p>
        </div>

        {/* View Segmented Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs self-start md:self-auto border border-slate-200">
          <button
            onClick={() => setActiveTab('region')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'region'
                ? 'bg-white text-blue-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>按申请区域与录取量</span>
          </button>

          <button
            onClick={() => setActiveTab('major')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'major'
                ? 'bg-white text-blue-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>按学科门类占比</span>
          </button>

          <button
            onClick={() => setActiveTab('rates')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rates'
                ? 'bg-white text-blue-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>录取率与绩点梯度对标</span>
          </button>
        </div>
      </div>

      {/* Tab 1: By Region */}
      {activeTab === 'region' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {REGION_DATA.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block truncate font-medium">{item.region}</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {item.offers}
                  </span>
                  <span className="text-xs text-slate-400">枚Offer</span>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span>生源均分中位：</span>
                  <span className="font-mono font-bold text-blue-600">{item.avgGPA}分</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                各区域核心录取数量与平均录取生源均分分布 (Placement Volume & Mean GPA)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                单位：枚 / 均分(100分制)
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={REGION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis 
                    dataKey="region" 
                    tick={{ fill: '#475569', fontSize: 11 }} 
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    axisLine={false}
                    tickLine={false}
                    label={{ value: '累计录取枚数', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 10 }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[75, 100]}
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    axisLine={false}
                    tickLine={false}
                    label={{ value: '加权均分(分)', angle: 90, position: 'insideRight', fill: '#64748B', fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderColor: '#E2E8F0', 
                      borderRadius: '12px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === '累计斩获名校Offer') return [`${value} 枚`, name];
                      if (name === '生源加权均分中位数') return [`${value} 分`, name];
                      return [value, name];
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                  />
                  <Bar 
                    yAxisId="left"
                    dataKey="offers" 
                    name="累计斩获名校Offer" 
                    fill="#2563EB" 
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="avgGPA" 
                    name="生源加权均分中位数" 
                    stroke="#D97706" 
                    strokeWidth={2.5}
                    dot={{ fill: '#D97706', r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-xs text-slate-400 mt-2 text-center">
              注：英国罗素集团包含帝国理工、UCL、爱丁堡、曼大；美本Top30涵盖哥伦比亚、康奈尔、CMU等；香港前三含港大、中大、科大；新两校为NUS与NTU。
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Major Cluster Distribution */}
      {activeTab === 'major' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 bg-slate-50/70 p-5 rounded-xl border border-slate-200 h-80 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-800 block mb-2">
              四大优势学科门类录取占比 (Discipline Share)
            </span>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MAJOR_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="count"
                    label={({ percent }: any) => `${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {MAJOR_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderColor: '#E2E8F0', 
                      borderRadius: '12px',
                      fontSize: '12px' 
                    }}
                    formatter={(value: any, name: any, item: any) => [
                      `${value} 人 (${item.payload.percentage}%)`, 
                      item.payload.name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="md:col-span-6 space-y-3 text-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              学科门类研判特征与典型录取专长
            </span>

            {MAJOR_DATA.map((m, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                <div 
                  className="w-3.5 h-3.5 rounded-md shrink-0 mt-0.5" 
                  style={{ backgroundColor: m.color }} 
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">{m.name}</strong>
                    <span className="font-mono text-blue-600 font-bold">{m.count} 例 ({m.percentage}%)</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {idx === 0 && '重点突破先修课学分对应与代码附录，在计算机科学、数据工程与自动化机器人方向具备高准入度。'}
                    {idx === 1 && '深耕量化风控、宏观政策与公司法交叉专业，全真模拟投行面试机经考题库。'}
                    {idx === 2 && '专注公共政策、国际关系、口述史与社会学，摒弃平庸套作，主打深度学术思辨文书。'}
                    {idx === 3 && '罗德岛与皇艺客座导师多对一 Crit 评审，聚焦空间叙事与材质实验，作品集拒走商业快餐风。'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Acceptance Rate & GPA Tier Benchmark */}
      {activeTab === 'rates' && (
        <div className="space-y-6">
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  不同成绩梯度名校录取率对标对比 (Acceptance Rate Benchmark)
                </span>
                <span className="text-xs text-slate-500">
                  青藤学术导师制带教成功率 vs 海外大学官方国际生平均基准录取率
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                单位：% (百分比)
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={TIER_ACCEPTANCE_DATA} 
                  margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis 
                    dataKey="gpaTier" 
                    tick={{ fill: '#475569', fontSize: 11 }} 
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    label={{ value: '录取率 (%)', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderColor: '#E2E8F0', 
                      borderRadius: '12px',
                      fontSize: '12px' 
                    }}
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar 
                    dataKey="officialRate" 
                    name="海外大学官方国际生平均录取率基准" 
                    fill="#CBD5E1" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  <Bar 
                    dataKey="ivyRate" 
                    name="青藤国际全案带教学员实证录用率" 
                    fill="#059669" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">86分+核心池：</strong>通过高阶先修课补充与原创文献级 SOP，将全球 G5 与常春藤的平均录取胜率显著提升。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">82-85分梯队：</strong>依靠交叉学科优势、合理梯度配置与首轮申请，有效提升录取胜率。
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Academic Methodology & Integrity Note */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-700">数据统计方法学公约：</strong>
          上述实证统计样本源自青藤国际 2023–2026 届正式签约学员，官方基准数据引自 UCAS、Common App、Open Doors 及各院校官方年度 Admissions Report。青藤国际严守《反不正当竞争法》与广告法合规边界，绝不捏造虚假“100%保录”承诺，个案过往表现受申请人当年自身学术努力与多重不可控外部竞争影响。
        </span>
      </div>
    </div>
  );
};

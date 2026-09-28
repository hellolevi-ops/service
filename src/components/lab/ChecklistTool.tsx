import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, RotateCcw, ShieldCheck, AlertCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: '学术件' | '文书推荐信' | '财务合规' | '质检核验';
  title: string;
  detail: string;
  required: boolean;
}

export const ChecklistTool: React.FC = () => {
  const initialItems: ChecklistItem[] = [
    { id: 'c1', category: '学术件', title: '6学期中英文官方在校成绩单', detail: '必须带有教务处红色防伪鲜章，并附官方加权绩点计算规则与等级说明', required: true },
    { id: 'c2', category: '学术件', title: '中英文在读证明或毕业证/学位证', detail: '已毕业学子提供双证原件及学信网 (CHESICC) 电子认证报告', required: true },
    { id: 'c3', category: '学术件', title: '核心专业课先修课程大纲 (Syllabus)', detail: '针对转专业或跨学科申请，列出 30+ 门主干课英译教学计划与学分说明', required: false },
    { id: 'c4', category: '文书推荐信', title: '至少 2 封官方大学邮箱学术推荐信 (LOR)', detail: '使用带有大学抬头纸（Letterhead）打印，推荐人必须使用官方 .edu 邮箱提交', required: true },
    { id: 'c5', category: '文书推荐信', title: '纯学术目的陈述 (Statement of Purpose)', detail: '拒绝模板套作与流水线套词，前 150 词清晰界定学术兴趣，对标目标系所教授研读篇目', required: true },
    { id: 'c6', category: '文书推荐信', title: '学术简历 (Curriculum Vitae)', detail: '排版严谨符合英美学术圈传统，着重列出科研项目、论文、学术会议与专业技能', required: true },
    { id: 'c7', category: '财务合规', title: '30万–50万元人民币银行存款证明', detail: '必须冻结 3–6 个月，开具中英文对照原件，覆盖首年学费与官方生活费基准', required: true },
    { id: 'c8', category: '财务合规', title: '父母资助声明与亲属关系公证件', detail: '资金若在父母名下，需由派出所户口本公证或公证处出具正式声明函', required: true },
    { id: 'c9', category: '质检核验', title: '官方标化送分代码与账号绑定 (TOEFL/IELTS/GRE)', detail: '核对大学特定学院特定部门送分代码（Institution Code & Dept Code）', required: true },
    { id: 'c10', category: '质检核验', title: '护照原件扫描件（有效期至少 18 个月以上）', detail: '个人资料页与签名页高精扫描，留足空白签证页', required: true },
  ];

  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ivyglobal_checklist_state');
      return saved ? JSON.parse(saved) : ['c1', 'c4'];
    } catch {
      return ['c1', 'c4'];
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('全部');

  useEffect(() => {
    try {
      localStorage.setItem('ivyglobal_checklist_state', JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(i => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  const categories = ['全部', '学术件', '文书推荐信', '财务合规', '质检核验'];
  const filtered = activeCategory === '全部' 
    ? initialItems 
    : initialItems.filter(i => i.category === activeCategory);

  const completedCount = checkedIds.length;
  const totalCount = initialItems.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              留学硬核申请材料自检清单 (Checklist Matrix)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              本地实时持久化保存 · 彻底杜绝因公章、格式或邮箱纰漏遭院校退件
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl mb-6">
        <div className="flex items-center justify-between text-xs mb-2.5">
          <span className="font-bold text-slate-900">材料完备度：{completedCount} / {totalCount} 项</span>
          <span className="font-mono text-blue-600 font-extrabold">{progressPercent}% 就绪</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 rounded-full" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {progressPercent < 100 && (
          <p className="text-xs text-slate-400 mt-2.5">
            提示：带星号项目为海外大学网申系统 mandatory 必填项，未全部勾选前请勿贸然提交网申缴费。
          </p>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-5 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5">
        {filtered.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 border rounded-xl cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                isChecked
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300" />
                )}
              </div>

              <div className="flex-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${isChecked ? 'text-emerald-900 line-through opacity-80' : 'text-slate-900'}`}>
                    {item.title}
                  </span>
                  {item.required && (
                    <span className="text-xs text-rose-600 font-semibold">*必填</span>
                  )}
                  <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

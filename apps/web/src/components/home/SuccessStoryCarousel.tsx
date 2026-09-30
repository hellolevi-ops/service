"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const STORIES = [
  {
    slug: "imperial-college-cs-2025",
    student: "T同学",
    year: "2025秋季录取",
    from: "华东双非 · 软件工程",
    school: "帝国理工学院",
    program: "MSc Computing",
    quote:
      "陆博把我的文书从普通自述升华成具备同行交流水准的学术备忘录，彻底改变了我对留学申请的认知。",
    advisor: "陆博 · 剑桥博士后",
  },
  {
    slug: "columbia-ivy-undergrad-2025",
    student: "C同学",
    year: "2025秋季 ED",
    from: "北京示范国际部 · AP",
    school: "哥伦比亚大学",
    program: "Columbia College",
    quote:
      "青藤国际没有逼我凑竞赛，而是教我像学者一样好奇自己的城市。这份主轴支撑了我整个早申叙事。",
    advisor: "顾清华博士 · 哥大教育学博士",
  },
  {
    slug: "nus-fintech-2026",
    student: "L同学",
    year: "2026春季首轮",
    from: "华中 985 · 金融工程",
    school: "新加坡国立大学",
    program: "MSc Digital Financial Technology",
    quote:
      "面试前复盘新加坡金融科技白皮书，次日教授问了相同命题，一周内收到录取。",
    advisor: "陈立言导师 · LSE 金融学硕士",
  },
];

export function SuccessStoryCarousel() {
  const [idx, setIdx] = useState(0);
  const story = STORIES[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STORIES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white border academic-hairline rounded-sm p-6 sm:p-8 shadow-sm">
      <div className="flex items-end justify-between gap-4 pb-4 mb-5 border-b academic-hairline">
        <div>
          <span className="text-xs font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
            SUCCESS STORIES
          </span>
          <h2 className="text-2xl font-serif-title font-bold text-[#1C1917]">学员录取故事精选</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 border academic-hairline rounded-xs hover:bg-[#F5F2EB]"
            onClick={() => setIdx((i) => (i - 1 + STORIES.length) % STORIES.length)}
            aria-label="上一条"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 border academic-hairline rounded-xs hover:bg-[#F5F2EB]"
            onClick={() => setIdx((i) => (i + 1) % STORIES.length)}
            aria-label="下一条"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 space-y-2 text-xs">
          <span className="text-[#92400E] font-semibold">{story.year}</span>
          <h3 className="text-xl font-serif-title font-bold text-[#1C1917]">{story.school}</h3>
          <p className="text-[#78716C]">{story.program}</p>
          <p className="text-[#57534E]">
            {story.student} · {story.from}
          </p>
          <p className="text-[#A8A29E]">{story.advisor}</p>
        </div>
        <div className="md:col-span-8">
          <Quote className="w-5 h-5 text-[#D6CEBF] mb-2" />
          <p className="text-sm sm:text-base font-serif-title text-[#44403C] leading-relaxed italic mb-4">
            “{story.quote}”
          </p>
          <Link
            href={`/cases/${story.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#92400E]"
          >
            查看完整案例复盘
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Award, Users } from "lucide-react";
import type { AdvisorItem } from "@/data/boyan";

export function AdvisorCard({ advisor }: { advisor: AdvisorItem }) {
  return (
    <article className="bg-white border academic-hairline p-6 rounded-sm shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between pb-4 mb-4 border-b academic-hairline gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-serif-title font-bold text-[#1C1917]">
                <Link href={`/advisors/${advisor.id}`}>{advisor.name}</Link>
              </h3>
              {advisor.acceptingAppointments ? (
                <span className="text-xs text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-xs font-medium">
                  接受预约初诊
                </span>
              ) : null}
            </div>
            <span className="text-xs font-semibold text-[#92400E] block mt-1">
              {advisor.title}
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="text-lg font-serif-title font-bold text-[#1C1917] block">
              {advisor.experienceYears} 年
            </span>
            <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider">
              从研/带教资历
            </span>
          </div>
        </div>

        <div className="bg-[#FBF9F5] p-3 rounded-xs border academic-hairline mb-4 text-xs">
          <div className="text-[#1C1917] font-medium flex items-start gap-1.5 leading-snug">
            <Award className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
            <span>{advisor.academicBackground}</span>
          </div>
          <div className="text-[#78716C] mt-1.5 pl-5">研究领域：{advisor.researchFocus}</div>
        </div>

        <blockquote className="text-xs text-[#44403C] italic border-l-2 border-[#D6CEBF] pl-3 py-1 my-3 leading-relaxed font-serif-title">
          {advisor.consultationPhilosophy}
        </blockquote>

        <div className="bg-[#FAF8F5] p-2.5 rounded-xs border academic-hairline mb-4 text-[11px] text-[#57534E] flex items-start gap-2">
          <Users className="w-3.5 h-3.5 text-[#92400E] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#1C1917] font-medium">家长协同：</strong>
            {advisor.parentSyncMethod}
          </span>
        </div>
      </div>

      {advisor.acceptingAppointments ? (
        <Link
          href={`/book?advisor=${advisor.id}`}
          className="w-full py-2.5 text-center text-xs font-semibold text-[#FBF9F5] bg-[#1C1917] hover:bg-[#78350F] rounded-xs flex items-center justify-center gap-1.5"
        >
          指定该导师初诊
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ) : (
        <button type="button" className="btn btn-secondary w-full" disabled>
          暂不接评估
        </button>
      )}
    </article>
  );
}

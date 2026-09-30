"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export function FeeBoundary() {
  return (
    <div
      style={{
        border: "1px solid var(--color-line)",
        padding: "1.25rem",
        background: "var(--color-bg-elevated)",
      }}
    >
      <h3 className="display" style={{ marginTop: 0, fontSize: "1.25rem" }}>
        费用逻辑与边界
      </h3>
      <ul style={{ paddingLeft: "1.1rem" }}>
        <li>
          <strong>计费逻辑：</strong>按产品线（精品节点 / 全流程）与申请方向复杂度分档报价；签约前提供书面区间与阶段划分。
        </li>
        <li>
          <strong>就读成本：</strong>学费与生活费按目标国家/城市官网区间单列，并标注年份口径。
        </li>
        <li>
          <strong>不含项：</strong>语言考试报名、签证加急特批、代考、代做作品集、第三方活动/竞赛报名、机票住宿定金等。
        </li>
        <li>
          <strong>退费原则：</strong>未启动服务可协商全额；已交付节点按阶段结算。详见条款摘要。
        </li>
      </ul>
      <Link
        href="/book"
        className="btn btn-primary"
        onClick={() => track("fee_cta_click", { page: "process-fees" })}
      >
        获取个性化报价说明
      </Link>
    </div>
  );
}

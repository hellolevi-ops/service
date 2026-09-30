import { SITE } from "@/lib/site";

export function GET() {
  const base = SITE.siteUrl.replace(/\/$/, "");
  const body = `# ${SITE.brand}

> ${SITE.tagline}. ${SITE.support}

## 核心服务
- 精品咨询: ${base}/services/premium
- 全流程服务: ${base}/services/full-cycle
- 服务对比: ${base}/services/compare
- 流程与费用: ${base}/process-fees

## 垂直方向
- 美本: ${base}/tracks/us-ug
- 英研: ${base}/tracks/uk-pg
- 港新: ${base}/tracks/hk-sg
- 低龄: ${base}/tracks/k12
- 艺术: ${base}/tracks/arts

## 信任与工具
- 案例: ${base}/cases
- 顾问: ${base}/advisors
- Lab: ${base}/lab
- 背景评估: ${base}/lab/tools/assessment
- 指南: ${base}/guides
- 预约: ${base}/book
- 联系: ${base}/about/contact

## 合规
录取由院校决定；案例个案仅作路径参考。社区 UGC 仅供站内阅读。
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

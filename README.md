# 青藤国际 / Ivy Global Education

留学服务官网与运营后台（P0）。

## 结构

| 路径 | 说明 |
|---|---|
| `apps/web` | Next.js 15 站点（客户站 + `/ops` 员工台） |
| `docs` | 产品 / 设计 / 账号权限文档 |
| `_gemini_design` | 早期 Gemini 视觉原型（Vite，仅参考） |

## 本地启动

```bash
cd apps/web
cp .env.example .env.local   # 按需填写
pnpm install
pnpm dev
```

生产部署目录参考：`/data/studyabroad/apps/web`（PM2 `studyabroad-web`）。

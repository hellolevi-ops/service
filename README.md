# 青藤国际 / Ivy Global Education

留学服务官网与运营后台（P0）。

## 结构

| 路径 | 说明 |
|---|---|
| `apps/web` | Next.js 15 站点（客户站 + `/ops` 员工台） |
| `docs` | 产品 / 设计 / 账号权限文档 |

早期 Gemini / Vite 视觉原型已归档到分支 [`archive/gemini-vite`](https://github.com/hellolevi-ops/service/tree/archive/gemini-vite)，不再随 `main` 维护。

## 本地启动

```bash
cd apps/web
cp .env.example .env.local   # 按需填写
pnpm install
pnpm dev
```

生产部署目录参考：`/data/studyabroad/apps/web`（PM2 `studyabroad-web`）。

# 青藤国际官网（Next.js）

香港服务器路径：`/data/studyabroad/apps/web`

## 常用命令

```bash
pnpm install
pnpm db:migrate
pnpm dev          # 127.0.0.1:3000
pnpm build && pnpm start
pnpm outbox -- --once
pnpm healthcheck
```

PM2：

```bash
pm2 start ecosystem.config.cjs
pm2 save
```

密钥仅服务器 `.env.local`，勿入库。详见仓库 `docs/部署运行手册_HK.md`。

继续

# 继续




| 项    | 内容                                             |
| ---- | ---------------------------------------------- |
| 日期   | 2026-09-28                                     |
| 主机   | `154.94.225.204`                               |
| 项目根  | `/data/studyabroad`                            |
| Web  | `/data/studyabroad/apps/web`（Next.js 15 + PM2） |
| 本地镜像 | `/Users/jingjianyu/Service/apps/web`           |


---

## 1. 架构速览

```
SSH 隧道 / 本机浏览器
        │
        ▼
  Next.js :3000 (127.0.0.1, PM2: studyabroad-web)
        │
   ┌────┼────────────┐
   ▼    ▼            ▼
  PG   Redis      Directus :8055
studyabroad_app   (CMS DB: studyabroad)
+ outbox worker (PM2: studyabroad-outbox)
```

**约束：** nginx `:9443` 为既有 jq-factor 服务，禁止改动其配置与端口绑定。

**公网访问（已开通）：**


| 项       | 值                                                        |
| ------- | -------------------------------------------------------- |
| 官网      | [http://154.94.225.204:3080](http://154.94.225.204:3080) |
| 反代      | nginx `studyabroad-web` → `127.0.0.1:3000`               |
| 防火墙     | UFW 放行 `3080/tcp`（Anywhere）                              |
| Next 进程 | 仍只绑 `127.0.0.1:3000`（不直接对公网）                             |


Directus（`:8055`）仍仅本机；管理后台请用 SSH 隧道。

---

## 2. 凭证位置（勿入库）


| 文件                                        | 用途                                        |
| ----------------------------------------- | ----------------------------------------- |
| `/data/studyabroad/infra/.env`            | Docker Compose / Directus / PG / Redis    |
| `/data/studyabroad/infra/CREDENTIALS.txt` | 运维速查（权限 600）                              |
| `/data/studyabroad/apps/web/.env.local`   | Next / Lead API / Outbox / Directus Token |


查看：`sudo cat /data/studyabroad/infra/CREDENTIALS.txt`

Directus 管理员邮箱因校验不接受 `.local`，已使用 `admin@example.com`（密码仍以 `infra/.env` 的 `DIRECTUS_ADMIN_PASSWORD` 为准）。登录后请尽快在后台改密。

---

## 3. 日常启停

### 3.1 基础设施（Docker）

```bash
ssh 154.94.225.204
cd /data/studyabroad/infra
docker compose ps
docker compose logs -f --tail=100
# 重启（谨慎）
# docker compose up -d
```

systemd：`studyabroad-infra.service` 已 enable，开机拉起 Compose。

### 3.2 应用（PM2）

```bash
cd /data/studyabroad/apps/web
pm2 status
pm2 logs studyabroad-web --lines 100
pm2 logs studyabroad-outbox --lines 50
pm2 restart studyabroad-web
pm2 restart studyabroad-outbox
```

进程：


| 名称                   | 作用                                                        |
| -------------------- | --------------------------------------------------------- |
| `studyabroad-web`    | `next start --hostname 127.0.0.1 --port 3000`             |
| `studyabroad-outbox` | 每分钟处理 `outbox_notifications`（无 SMTP 时 dry-run 打日志并标 sent） |


配置：`apps/web/ecosystem.config.cjs`。`pm2 save` 已执行；开机自启可用 `pm2 startup`。

### 3.3 访问方式

**官网（外网）：** 浏览器直接打开 [http://154.94.225.204:3080](http://154.94.225.204:3080)  

**Directus 后台（仍内网）：**

```bash
ssh -L 8055:127.0.0.1:8055 154.94.225.204
```

然后打开 [http://127.0.0.1:8055](http://127.0.0.1:8055)  

nginx 配置文件：`/etc/nginx/sites-available/studyabroad-web`（已 symlink 到 `sites-enabled`）。

---

## 4. 发布 / 更新流程

在本地改代码后同步并构建：

```bash
# 本机
rsync -az --delete \
  --exclude node_modules --exclude .next --exclude .git --exclude .env.local \
  /Users/jingjianyu/Service/apps/web/ \
  154.94.225.204:/data/studyabroad/apps/web/

# 服务器
ssh 154.94.225.204
cd /data/studyabroad/apps/web
pnpm install
set -a; source .env.local; set +a
pnpm db:migrate          # 若有 schema 变更
pnpm build
pm2 restart studyabroad-web studyabroad-outbox
bash scripts/health-check.sh
```

回滚：保留上一版可用的 `.next` 备份目录，或用 git/rsync 回退源码后重新 `pnpm build && pm2 restart`。

---

## 5. 数据库与线索

- CMS 库：`studyabroad`（Directus）  
- 应用库：`studyabroad_app`（`leads` / `consent_records` / `outbox_notifications` / `lab_sessions` / `settings`）  
- 迁移：`pnpm db:migrate`（`scripts/migrate.sql`）

线索写入：`POST /api/leads` → PG → Outbox。手机号限流：Redis，同号约 10 分钟窗口。

### 线索工作台（顾问）

- 员工登录：`http://<host>:3080/ops/login`（邮箱+密码；公网顶栏不展示）
- 线索台：`http://<host>:3080/ops/leads`（`robots` 禁止收录）
- 种子管理员：`STAFF_ADMIN_EMAIL` / `STAFF_ADMIN_PASSWORD`（migrate 时写入 `staff_users`）
- Break-glass：Header `x-ops-key` = `OPS_ADMIN_KEY` 或 `REVALIDATE_SECRET`（紧急运维）
- 能力：列表/搜索/状态流转、备注、下次跟进、手机号脱敏、CSV 导出（写入 `lead_export_logs`）
- API：`GET/PATCH /api/ops/leads`，`GET /api/ops/leads/export`

### 客户登录（社区 L1）

- 入口：顶栏「登录」、`/login`（`/register` 重定向到登录）、`/account`
- 方式：手机号 OTP；`AUTH_DEV_OTP=1` 时验证码固定 `888888`
- Cookie：`sa_session`；个人中心含资料、线索进度、收藏、L2 认证申请
- 员工审核 L2：`/ops/verifications`
- 设计说明：`docs/账号与权限设计.md`

### Directus 发布刷缓存

```bash
# 手动
curl "http://127.0.0.1:3000/api/revalidate?secret=$REVALIDATE_SECRET&tag=cms:articles"
# Webhook（Directus Flow）
curl -X POST http://127.0.0.1:3000/api/revalidate \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"collection":"articles"}'
```
  
未配置 `SMTP_HOST` 时 Outbox 打印脱敏 dry-run 日志并将状态置为 `sent`（避免积压）；配置 SMTP 后自动发信到 `LEAD_NOTIFY_TO`。

---

## 6. Directus 内容与 ISR

1. 隧道打开 Directus，登录管理员。
2. 编辑 `articles` 集合中的指南（如 `uk-pg-cost-2026`）。
3. 前台默认 `revalidate: 60`；也可手动：

```bash
curl "http://127.0.0.1:3000/api/revalidate?secret=$REVALIDATE_SECRET&tag=cms:articles"
```

无 Token 或 CMS 不可达时，前台回落本地种子内容（`src/content/seed.ts`），保证页面可渲染。

---

## 7. 健康检查

```bash
cd /data/studyabroad/apps/web
bash scripts/health-check.sh
# 或
curl -s http://127.0.0.1:3000/api/health
```

期望：`web` / `postgres` / `redis` / `directus` 均为 `ok`。

---

## 8. 排障


| 现象                  | 排查                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| 3000 无响应            | `pm2 status`；`pm2 logs studyabroad-web`；确认未改 bind 地址                                           |
| `/api/leads` 500    | 检查 `DATABASE_URL` 是否指向 `studyabroad_app`；`pnpm db:migrate`                                     |
| `/api/leads` 429    | Redis 限流触发；换号或等窗口                                                                              |
| Directus 503 / 上传失败 | `sudo chown -R 1000:1000 /data/studyabroad/infra/directus/uploads`                             |
| Directus 无法登录       | 确认用户为 `admin@example.com`；密码见 `infra/.env`                                                     |
| Outbox 不跑           | `pm2 logs studyabroad-outbox`；手动 `node --env-file=.env.local scripts/outbox-worker.mjs --once` |
| 9443 异常             | **不要**用官网 nginx 配置覆盖；先确认是否误改 jq-factor                                                         |


---

## 9. 安全备忘

- 公网勿裸奔 `:3000`；需暴露时另配 nginx `server_name` + 防火墙，且不影响 `:9443`。  
- `.env.local` / `CREDENTIALS.txt` 权限保持 600；禁止提交 git。  
- 日志禁止打印完整手机号（Outbox 已脱敏）。

---

## 10. 相关文档

- 任务书：`docs/开发部署会话_任务书.md`  
- 验收记录：`docs/P0开发验收记录.md`  
- 设计包：`docs/design/`  
- PRD：`docs/留学服务官网_产品需求文档_v2.md`


import fs from "node:fs";
import crypto from "node:crypto";

function parseEnv(file) {
  const env = {};
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    env[line.slice(0, i)] = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
  }
  return env;
}

const infra = parseEnv("/data/studyabroad/infra/.env");
const localPath = "/data/studyabroad/apps/web/.env.local";
const local = parseEnv(localPath);

const email = infra.DIRECTUS_ADMIN_EMAIL;
const password = infra.DIRECTUS_ADMIN_PASSWORD;
const base = local.DIRECTUS_URL || "http://127.0.0.1:8055";

async function login() {
  const res = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`login ${res.status} ${await res.text()}`);
  return (await res.json()).data.access_token;
}

async function ensureCollection(token, collection, fields) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const exists = await fetch(`${base}/collections/${collection}`, { headers });
  if (exists.status === 404) {
    const create = await fetch(`${base}/collections`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        collection,
        meta: { icon: "box" },
        schema: {},
        fields,
      }),
    });
    if (!create.ok) throw new Error(`${collection} ${await create.text()}`);
    console.log(`created ${collection}`);
  } else {
    console.log(`${collection} exists`);
  }
}

async function ensureArticles(token) {
  await ensureCollection(token, "articles", [
    {
      field: "id",
      type: "integer",
      meta: { hidden: true },
      schema: { is_primary_key: true, has_auto_increment: true },
    },
    { field: "status", type: "string", schema: { default_value: "published" } },
    { field: "slug", type: "string", schema: { is_unique: true } },
    { field: "category", type: "string" },
    { field: "title", type: "string" },
    { field: "summary", type: "text" },
    { field: "answer_block", type: "text" },
    { field: "body", type: "json" },
    { field: "faq", type: "json" },
    { field: "next_stops", type: "json" },
    { field: "published_at", type: "date" },
    { field: "updated_at", type: "date" },
    { field: "review_at", type: "date" },
    { field: "author", type: "string" },
    { field: "social_hooks", type: "string" },
  ]);
}

const idField = {
  field: "id",
  type: "integer",
  meta: { hidden: true },
  schema: { is_primary_key: true, has_auto_increment: true },
};

async function ensureCoreCollections(token) {
  await ensureArticles(token);
  await ensureCollection(token, "cases", [
    idField,
    { field: "status", type: "string", schema: { default_value: "draft" } },
    { field: "slug", type: "string", schema: { is_unique: true } },
    { field: "title", type: "string" },
    { field: "summary", type: "text" },
    { field: "authorized", type: "boolean", schema: { default_value: false } },
    { field: "anonymized", type: "boolean", schema: { default_value: true } },
    { field: "advisor_slug", type: "string" },
    { field: "published_at", type: "date" },
    { field: "unpublished_at", type: "date" },
    { field: "body", type: "json" },
  ]);
  await ensureCollection(token, "advisors", [
    idField,
    { field: "status", type: "string", schema: { default_value: "published" } },
    { field: "slug", type: "string", schema: { is_unique: true } },
    { field: "name", type: "string" },
    { field: "title", type: "string" },
    { field: "tracks", type: "json" },
    { field: "bio", type: "text" },
    { field: "booking_enabled", type: "boolean", schema: { default_value: true } },
    { field: "representative_cases", type: "json" },
  ]);
  await ensureCollection(token, "events", [
    idField,
    { field: "status", type: "string", schema: { default_value: "draft" } },
    { field: "slug", type: "string", schema: { is_unique: true } },
    { field: "title", type: "string" },
    { field: "summary", type: "text" },
    { field: "starts_at", type: "dateTime" },
    { field: "ends_at", type: "dateTime" },
    { field: "city", type: "string" },
  ]);
  await ensureCollection(token, "tracks", [
    idField,
    { field: "status", type: "string", schema: { default_value: "published" } },
    { field: "slug", type: "string", schema: { is_unique: true } },
    { field: "name", type: "string" },
    { field: "hero_claim", type: "text" },
    { field: "answer_block", type: "text" },
    { field: "body", type: "json" },
  ]);
  await ensureCollection(token, "playbooks", [
    idField,
    { field: "status", type: "string", schema: { default_value: "published" } },
    { field: "slug", type: "string", schema: { is_unique: true } },
    { field: "title", type: "string" },
    { field: "summary", type: "text" },
    { field: "body", type: "json" },
    { field: "review_at", type: "date" },
  ]);
  await ensureCollection(token, "settings", [
    {
      field: "key",
      type: "string",
      schema: { is_primary_key: true },
    },
    { field: "value", type: "text" },
    { field: "updated_at", type: "dateTime" },
  ]);
}

async function upsertArticle(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const item = {
    status: "published",
    slug: "uk-pg-cost-2026",
    category: "费用",
    title: "2026 英研一年花费怎么估？（Directus 可编辑）",
    summary: "学费+生活费框架，附不含项提醒。",
    answer_block:
      "英研一年总成本 = 学费 + 生活费 + 杂费；服务费另计。（可由 Directus 更新后 revalidate）",
    body: ["先查目标校学费页。", "生活费按城市分档并标注年份。", "服务费与就读成本分列。"],
    faq: [{ q: "生活费参考哪来？", a: "签证生活费指引与学校国际生页面。" }],
    next_stops: [
      { href: "/tracks/uk-pg", title: "英研垂直页", reason: "看选校分层" },
      { href: "/lab/tools/assessment", title: "背景评估", reason: "先自检" },
    ],
    published_at: "2026-09-01",
    social_hooks: "英研费用框架可转发家长",
  };
  const q = await fetch(
    `${base}/items/articles?filter[slug][_eq]=${encodeURIComponent(item.slug)}`,
    { headers },
  );
  const data = await q.json();
  if (data.data?.length) {
    await fetch(`${base}/items/articles/${data.data[0].id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(item),
    });
    console.log("updated article");
  } else {
    const res = await fetch(`${base}/items/articles`, {
      method: "POST",
      headers,
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error(await res.text());
    console.log("created article");
  }
}

async function ensureToken(token) {
  if (local.DIRECTUS_TOKEN) {
    console.log("DIRECTUS_TOKEN already set");
    return;
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const me = await fetch(`${base}/users/me`, { headers }).then((r) => r.json());
  const staticToken = "sa_cms_" + crypto.randomBytes(16).toString("hex");
  const patch = await fetch(`${base}/users/${me.data.id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ token: staticToken }),
  });
  if (!patch.ok) throw new Error(`token ${await patch.text()}`);
  fs.appendFileSync(localPath, `\nDIRECTUS_ADMIN_PASSWORD=${password}\nDIRECTUS_TOKEN=${staticToken}\n`);
  console.log("wrote DIRECTUS_TOKEN");
}

const access = await login();
console.log("directus login ok");
await ensureCoreCollections(access);
await upsertArticle(access);
await ensureToken(access);

/**
 * Creates minimal Directus collections + seed articles so editors can
 * update a guide and trigger ISR via /api/revalidate.
 * Falls back content remains in Next seed if Directus unavailable.
 */
const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://127.0.0.1:8055";
const EMAIL = process.env.DIRECTUS_ADMIN_EMAIL;
const PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD;

async function login() {
  const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`login failed ${res.status}`);
  const json = await res.json();
  return json.data.access_token;
}

async function ensureCollection(token, collection, fields) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const exists = await fetch(`${DIRECTUS_URL}/collections/${collection}`, { headers });
  if (exists.status === 404) {
    const create = await fetch(`${DIRECTUS_URL}/collections`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        collection,
        meta: { icon: "article", singleton: false },
        schema: {},
        fields,
      }),
    });
    if (!create.ok) {
      const t = await create.text();
      throw new Error(`create ${collection}: ${create.status} ${t}`);
    }
    console.log("created collection", collection);
  } else {
    console.log("collection exists", collection);
  }
}

async function upsertArticle(token, item) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const q = await fetch(
    `${DIRECTUS_URL}/items/articles?filter[slug][_eq]=${encodeURIComponent(item.slug)}`,
    { headers },
  );
  const data = await q.json();
  if (data.data?.length) {
    const id = data.data[0].id;
    await fetch(`${DIRECTUS_URL}/items/articles/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(item),
    });
    console.log("updated article", item.slug);
  } else {
    const res = await fetch(`${DIRECTUS_URL}/items/articles`, {
      method: "POST",
      headers,
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error(await res.text());
    console.log("created article", item.slug);
  }
}

async function main() {
  if (!EMAIL || !PASSWORD) {
    console.error("DIRECTUS_ADMIN_EMAIL/PASSWORD required");
    process.exit(1);
  }
  const token = await login();
  await ensureCollection(token, "articles", [
    { field: "id", type: "integer", meta: { hidden: true }, schema: { is_primary_key: true, has_auto_increment: true } },
    { field: "status", type: "string", meta: { interface: "select-dropdown", options: { choices: [{ text: "published", value: "published" }, { text: "draft", value: "draft" }] } }, schema: { default_value: "published" } },
    { field: "slug", type: "string", schema: { is_unique: true } },
    { field: "category", type: "string" },
    { field: "title", type: "string" },
    { field: "summary", type: "text" },
    { field: "answer_block", type: "text" },
    { field: "body", type: "json" },
    { field: "faq", type: "json" },
    { field: "next_stops", type: "json" },
    { field: "published_at", type: "date" },
    { field: "social_hooks", type: "string" },
  ]);

  await upsertArticle(token, {
    status: "published",
    slug: "uk-pg-cost-2026",
    category: "费用",
    title: "2026 英研一年花费怎么估？（Directus 可编辑）",
    summary: "学费+生活费框架，附不含项提醒。",
    answer_block:
      "英研一年总成本 = 学费（按院校官网）+ 生活费（城市区间）+ 保险与杂费；服务费另计。先用区间估算，再预约核对个性化方案。（可由 Directus 更新）",
    body: ["先查目标校学费页。", "生活费按城市分档并标注年份。", "服务费与就读成本分列。"],
    faq: [{ q: "生活费参考哪来？", a: "签证生活费指引与学校国际生页面，标注访问年份。" }],
    next_stops: [
      { href: "/tracks/uk-pg", title: "英研垂直页", reason: "看选校分层" },
      { href: "/lab/tools/assessment", title: "背景评估", reason: "先自检" },
    ],
    published_at: "2026-09-01",
    social_hooks: "英研费用框架可转发家长",
  });

  console.log("Directus seed done. Set DIRECTUS_TOKEN for Next to read CMS.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

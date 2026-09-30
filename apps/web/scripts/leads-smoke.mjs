#!/usr/bin/env node
/**
 * Minimal lead API smoke (run against local or HK with DATABASE_URL + Redis).
 * Usage: node --env-file=.env.local scripts/leads-smoke.mjs [baseUrl]
 */
const base = process.argv[2] || "http://127.0.0.1:3000";

async function post(body) {
  const res = await fetch(`${base}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-request-id": `smoke_${Date.now()}` },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { status: res.status, requestId: res.headers.get("x-request-id"), json };
}

const mobile = `138${String(Date.now()).slice(-8)}`;

async function main() {
  const basePayload = {
    name: "冒烟测试",
    mobile,
    track: "uk-pg",
    consent: true,
    privacyVersion: "2026-09-28",
    formVariant: "short",
    landingSlug: "/smoke",
    website: "",
  };

  const reject = await post({ ...basePayload, consent: false });
  console.log("consent reject", reject.status, reject.json);

  const honeypot = await post({ ...basePayload, website: "http://spam.test" });
  console.log("honeypot", honeypot.status);

  const ok = await post(basePayload);
  console.log("create", ok.status, ok.json);

  const merge = await post({ ...basePayload, name: "冒烟合并" });
  console.log("merge", merge.status, merge.json);

  const k12 = await post({
    ...basePayload,
    mobile: `139${String(Date.now()).slice(-8)}`,
    track: "k12",
  });
  console.log("k12 missing guardian", k12.status, k12.json);

  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

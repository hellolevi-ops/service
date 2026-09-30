import { z } from "zod";
import { query, withTransaction } from "./db";
import { rateLimit } from "./redis";
import { SITE } from "./site";

export const leadSchema = z.object({
  name: z.string().trim().min(1).max(40),
  mobile: z
    .string()
    .trim()
    .regex(/^1[3-9]\d{9}$/, "请输入有效大陆手机号"),
  wechat: z.string().trim().max(64).optional().or(z.literal("")),
  track: z.enum(["us-ug", "uk-pg", "hk-sg", "k12", "arts", "undecided"]),
  intentYear: z.string().trim().max(16).optional(),
  educationStage: z.string().trim().max(32).optional(),
  guardianName: z.string().trim().max(40).optional().or(z.literal("")),
  guardianMobile: z
    .string()
    .trim()
    .regex(/^1[3-9]\d{9}$/, "请输入有效监护人手机号")
    .optional()
    .or(z.literal("")),
  sourceUrl: z.string().max(2000).optional(),
  landingSlug: z.string().max(128).optional(),
  utmSource: z.string().max(64).optional(),
  utmMedium: z.string().max(64).optional(),
  utmCampaign: z.string().max(128).optional(),
  utmContent: z.string().max(128).optional(),
  formVariant: z.enum(["short", "book", "tool", "event", "community"]).default("short"),
  eventSlug: z.string().max(128).optional(),
  labTool: z.string().max(64).optional(),
  preferredAdvisorId: z.string().uuid().optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "请勾选隐私政策" }),
  privacyVersion: z.string().min(1),
  website: z.string().optional(), // honeypot
});

export type LeadInput = z.infer<typeof leadSchema>;

function hashIp(ip: string) {
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = (h * 31 + ip.charCodeAt(i)) >>> 0;
  return `ip_${h.toString(16)}`;
}

function maskMobile(mobile: string) {
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

function newRequestId() {
  return `ld_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function createLead(
  raw: unknown,
  meta: { ip?: string; userAgent?: string; requestId?: string },
) {
  const requestId = meta.requestId || newRequestId();
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 400 as const,
      body: {
        ok: false,
        error: parsed.error.issues[0]?.message || "校验失败",
        requestId,
      },
    };
  }
  const data = parsed.data;

  if (data.track === "k12") {
    if (!data.guardianName?.trim() || !data.guardianMobile?.trim()) {
      return {
        status: 400 as const,
        body: {
          ok: false,
          error: "低龄咨询请填写监护人姓名与手机号",
          requestId,
        },
      };
    }
  }

  // Honeypot: silent success, no real lead / notification.
  if (data.website && data.website.trim().length > 0) {
    return { status: 204 as const, body: null };
  }

  const mobileRl = await rateLimit(`m:${data.mobile}`, 5, 600);
  if (!mobileRl.ok) {
    return {
      status: 429 as const,
      body: { ok: false, error: "提交过于频繁，请稍后再试", requestId },
    };
  }

  if (meta.ip && meta.ip !== "unknown") {
    const ipRl = await rateLimit(`ip:${hashIp(meta.ip)}`, 20, 600);
    if (!ipRl.ok) {
      return {
        status: 429 as const,
        body: { ok: false, error: "提交过于频繁，请稍后再试", requestId },
      };
    }
  }

  const existing = await query<{ id: string; merge_count: number }>(
    `SELECT id, coalesce(merge_count, 1) AS merge_count FROM leads
     WHERE mobile = $1 AND coalesce(landing_slug,'') = coalesce($2,'')
       AND created_at > now() - interval '10 minutes'
       AND honeypot_hit = false
     ORDER BY created_at DESC LIMIT 1`,
    [data.mobile, data.landingSlug || null],
  );

  if (existing.rows[0]) {
    const leadId = existing.rows[0].id;
    await query(
      `UPDATE leads
       SET merge_count = coalesce(merge_count, 1) + 1,
           updated_at = now(),
           name = coalesce(nullif($2, ''), name),
           wechat = coalesce(nullif($3, ''), wechat)
       WHERE id = $1`,
      [leadId, data.name, data.wechat || ""],
    );
    console.info("[leads]", {
      requestId,
      event: "merged",
      leadId,
      mobile: maskMobile(data.mobile),
    });
    return {
      status: 201 as const,
      body: { ok: true, leadId, merged: true, requestId },
    };
  }

  const preferred =
    data.preferredAdvisorId && data.preferredAdvisorId.length
      ? data.preferredAdvisorId
      : null;

  try {
    const leadId = await withTransaction(async (client) => {
      const insert = await client.query<{ id: string }>(
        `INSERT INTO leads (
          name, mobile, wechat, track, intent_year, education_stage,
          guardian_name, guardian_mobile,
          source_url, landing_slug, utm_source, utm_medium, utm_campaign, utm_content,
          form_variant, event_slug, lab_tool, preferred_advisor_id,
          status, consent_at, privacy_version, honeypot_hit, merge_count, request_id
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,
          'new', now(), $19, false, 1, $20
        ) RETURNING id`,
        [
          data.name,
          data.mobile,
          data.wechat || null,
          data.track,
          data.intentYear || null,
          data.educationStage || null,
          data.guardianName || null,
          data.guardianMobile || null,
          data.sourceUrl || null,
          data.landingSlug || null,
          data.utmSource || null,
          data.utmMedium || null,
          data.utmCampaign || null,
          data.utmContent || null,
          data.formVariant,
          data.eventSlug || null,
          data.labTool || null,
          preferred,
          data.privacyVersion || SITE.privacyVersion,
          requestId,
        ],
      );

      const id = insert.rows[0].id;

      await client.query(
        `INSERT INTO consent_records (lead_id, policy_version, ip_hash, user_agent)
         VALUES ($1,$2,$3,$4)`,
        [
          id,
          data.privacyVersion || SITE.privacyVersion,
          meta.ip ? hashIp(meta.ip) : null,
          meta.userAgent?.slice(0, 500) || null,
        ],
      );

      await client.query(
        `INSERT INTO outbox_notifications (type, payload_json, status)
         VALUES ('lead_email', $1::jsonb, 'pending')`,
        [
          JSON.stringify({
            leadId: id,
            requestId,
            name: data.name,
            mobile: maskMobile(data.mobile),
            track: data.track,
            formVariant: data.formVariant,
            preferredAdvisorId: preferred,
            utmSource: data.utmSource,
            eventSlug: data.eventSlug,
            labTool: data.labTool,
            guardianName: data.guardianName || undefined,
          }),
        ],
      );

      return id;
    });

    console.info("[leads]", {
      requestId,
      event: "created",
      leadId,
      mobile: maskMobile(data.mobile),
    });

    return { status: 201 as const, body: { ok: true, leadId, requestId } };
  } catch (err) {
    console.error("[leads]", {
      requestId,
      event: "error",
      message: err instanceof Error ? err.message : "error",
    });
    throw err;
  }
}

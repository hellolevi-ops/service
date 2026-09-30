import { cookies } from "next/headers";
import { query } from "@/lib/db";
import {
  CUSTOMER_COOKIE,
  SESSION_DAYS,
  DEV_OTP_CODE,
  hashIp,
  hashOtp,
  hashToken,
  randomToken,
  generateOtpCode,
  isDevOtpEnabled,
  normalizeMobile,
  sessionCookieOptions,
} from "./crypto";
import { rateLimit } from "@/lib/redis";
import { SITE } from "@/lib/site";

export type CustomerUser = {
  id: string;
  mobile: string;
  nickname: string | null;
  role_tag: string;
  level: string;
};

function maskMobile(mobile: string) {
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

export async function getCustomerFromRequest(): Promise<CustomerUser | null> {
  const jar = await cookies();
  const token = jar.get(CUSTOMER_COOKIE)?.value;
  if (!token) return null;
  const tokenHash = hashToken(token);
  const result = await query<CustomerUser & { expires_at: string }>(
    `SELECT u.id, u.mobile, u.nickname, u.role_tag, u.level, s.expires_at
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > now()
     LIMIT 1`,
    [tokenHash],
  );
  return result.rows[0]
    ? {
        id: result.rows[0].id,
        mobile: result.rows[0].mobile,
        nickname: result.rows[0].nickname,
        role_tag: result.rows[0].role_tag,
        level: result.rows[0].level,
      }
    : null;
}

export async function sendOtp(mobileRaw: string, meta: { ip?: string }) {
  const mobile = normalizeMobile(mobileRaw);
  if (!/^1[3-9]\d{9}$/.test(mobile)) {
    return { ok: false as const, error: "请输入有效大陆手机号", status: 400 };
  }

  const rl = await rateLimit(`otp:m:${mobile}`, 8, 3600);
  if (!rl.ok) {
    return { ok: false as const, error: "发送过于频繁，请稍后再试", status: 429 };
  }
  if (meta.ip) {
    const ipRl = await rateLimit(`otp:ip:${hashIp(meta.ip)}`, 40, 3600);
    if (!ipRl.ok) {
      return { ok: false as const, error: "发送过于频繁，请稍后再试", status: 429 };
    }
  }

  const devOtp = isDevOtpEnabled();
  const hasSms = Boolean(process.env.SMS_PROVIDER && process.env.SMS_API_KEY);
  if (!devOtp && !hasSms && process.env.NODE_ENV === "production") {
    return {
      ok: false as const,
      error: "短信服务未配置，请联系运营",
      status: 503,
    };
  }

  if (!devOtp) {
    const recent = await query<{ created_at: string }>(
      `SELECT created_at FROM otp_challenges
       WHERE mobile = $1 AND created_at > now() - interval '60 seconds'
       ORDER BY created_at DESC LIMIT 1`,
      [mobile],
    );
    if (recent.rows[0]) {
      return { ok: false as const, error: "请 60 秒后再获取验证码", status: 429 };
    }
  } else {
    await query(
      `UPDATE otp_challenges SET consumed = true
       WHERE mobile = $1 AND consumed = false`,
      [mobile],
    );
  }

  const code = devOtp ? DEV_OTP_CODE : generateOtpCode();
  await query(
    `INSERT INTO otp_challenges (mobile, code_hash, expires_at, ip_hash)
     VALUES ($1, $2, now() + interval '15 minutes', $3)`,
    [mobile, hashOtp(code), meta.ip ? hashIp(meta.ip) : null],
  );

  if (devOtp) {
    console.info("[auth/otp]", { mobile: maskMobile(mobile), code, mode: "dev" });
  } else if (hasSms) {
    console.info("[auth/otp]", { mobile: maskMobile(mobile), event: "sms_queued" });
  }

  return {
    ok: true as const,
    status: 200,
    body: {
      ok: true,
      cooldown: devOtp ? 3 : 60,
      ...(devOtp
        ? { devHint: `开发模式：验证码固定为 ${DEV_OTP_CODE}（须先点「获取验证码」）` }
        : {}),
    },
  };
}

export async function verifyOtpAndCreateSession(
  raw: {
    mobile: string;
    code: string;
    consent: boolean;
    roleTag?: string;
    nickname?: string;
  },
  meta: { ip?: string; userAgent?: string },
) {
  if (!raw.consent) {
    return { ok: false as const, error: "请勾选隐私政策", status: 400 };
  }
  const mobile = normalizeMobile(raw.mobile);
  const code = String(raw.code || "").replace(/\D/g, "").slice(0, 6);
  if (!/^1[3-9]\d{9}$/.test(mobile)) {
    return { ok: false as const, error: "请输入有效大陆手机号", status: 400 };
  }
  if (!/^\d{6}$/.test(code)) {
    return { ok: false as const, error: "验证码格式错误", status: 400 };
  }

  const devOtp = isDevOtpEnabled();

  // Dev: accept fixed code even if user skipped「获取验证码」
  if (devOtp && code === DEV_OTP_CODE) {
    const open = await query<{ id: string }>(
      `SELECT id FROM otp_challenges
       WHERE mobile = $1 AND consumed = false AND expires_at > now()
       ORDER BY created_at DESC LIMIT 1`,
      [mobile],
    );
    if (!open.rows[0]) {
      await query(
        `INSERT INTO otp_challenges (mobile, code_hash, expires_at, consumed)
         VALUES ($1, $2, now() + interval '15 minutes', false)`,
        [mobile, hashOtp(DEV_OTP_CODE)],
      );
    }
  }

  const challenge = await query<{
    id: string;
    code_hash: string;
    attempts: number;
  }>(
    `SELECT id, code_hash, attempts FROM otp_challenges
     WHERE mobile = $1 AND consumed = false AND expires_at > now()
     ORDER BY created_at DESC LIMIT 1`,
    [mobile],
  );
  const row = challenge.rows[0];
  if (!row) {
    return {
      ok: false as const,
      error: "请先点击「获取验证码」后再登录",
      status: 400,
    };
  }
  if (row.attempts >= 5) {
    await query(`UPDATE otp_challenges SET consumed = true WHERE id = $1`, [row.id]);
    return { ok: false as const, error: "验证码错误次数过多，请重新获取", status: 400 };
  }

  if (row.code_hash !== hashOtp(code)) {
    await query(
      `UPDATE otp_challenges SET attempts = attempts + 1 WHERE id = $1`,
      [row.id],
    );
    return {
      ok: false as const,
      error: devOtp ? `验证码错误（开发模式请填 ${DEV_OTP_CODE}）` : "验证码错误",
      status: 400,
    };
  }

  await query(`UPDATE otp_challenges SET consumed = true WHERE id = $1`, [row.id]);

  const roleTag = ["applicant", "parent", "enrolled"].includes(raw.roleTag || "")
    ? raw.roleTag!
    : "applicant";

  const upsert = await query<{
    id: string;
    nickname: string | null;
    level: string;
    role_tag: string;
  }>(
    `INSERT INTO users (mobile, nickname, role_tag, level, privacy_version)
     VALUES ($1, $2, $3, 'L1', $4)
     ON CONFLICT (mobile) DO UPDATE SET
       updated_at = now(),
       privacy_version = EXCLUDED.privacy_version,
       nickname = COALESCE(NULLIF(EXCLUDED.nickname, ''), users.nickname),
       role_tag = COALESCE(NULLIF(EXCLUDED.role_tag, ''), users.role_tag)
     RETURNING id, nickname, level, role_tag`,
    [
      mobile,
      raw.nickname?.trim().slice(0, 64) || null,
      roleTag,
      SITE.privacyVersion,
    ],
  );
  const user = upsert.rows[0];

  await query(
    `INSERT INTO user_lead_links (user_id, lead_id)
     SELECT $1, id FROM leads WHERE mobile = $2 AND honeypot_hit = false
     ON CONFLICT DO NOTHING`,
    [user.id, mobile],
  );

  const token = randomToken();
  await query(
    `INSERT INTO sessions (user_id, token_hash, expires_at, user_agent, ip_hash)
     VALUES ($1, $2, now() + interval '30 days', $3, $4)`,
    [
      user.id,
      hashToken(token),
      meta.userAgent?.slice(0, 500) || null,
      meta.ip ? hashIp(meta.ip) : null,
    ],
  );

  return {
    ok: true as const,
    status: 200,
    token,
    cookie: sessionCookieOptions(SESSION_DAYS * 86400),
    user: {
      id: user.id,
      mobile: maskMobile(mobile),
      nickname: user.nickname,
      role_tag: user.role_tag,
      level: user.level,
    },
  };
}

export async function destroyCustomerSession(token: string | undefined) {
  if (!token) return;
  await query(`DELETE FROM sessions WHERE token_hash = $1`, [hashToken(token)]);
}

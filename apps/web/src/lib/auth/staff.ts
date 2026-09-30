import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { query } from "@/lib/db";
import {
  STAFF_COOKIE,
  STAFF_SESSION_DAYS,
  hashIp,
  hashToken,
  randomToken,
  sessionCookieOptions,
  verifyPassword,
} from "./crypto";
import { getOpsSecret } from "@/lib/ops-auth";

export type StaffUser = {
  id: string;
  email: string;
  display_name: string;
  role: string;
};

export async function getStaffFromCookies(): Promise<StaffUser | null> {
  const jar = await cookies();
  const token = jar.get(STAFF_COOKIE)?.value;
  if (!token) return null;
  return getStaffByToken(token);
}

export async function getStaffByToken(token: string): Promise<StaffUser | null> {
  const result = await query<StaffUser>(
    `SELECT su.id, su.email, su.display_name, su.role
     FROM staff_sessions ss
     JOIN staff_users su ON su.id = ss.staff_id
     WHERE ss.token_hash = $1 AND ss.expires_at > now() AND su.active = true
     LIMIT 1`,
    [hashToken(token)],
  );
  return result.rows[0] || null;
}

/** Session cookie OR break-glass OPS key. */
export async function resolveOpsAuth(req: NextRequest): Promise<{
  ok: boolean;
  staff: StaffUser | null;
  via: "session" | "key" | null;
}> {
  const expected = getOpsSecret();
  const header = req.headers.get("x-ops-key") || "";
  const queryKey = req.nextUrl.searchParams.get("key") || "";
  const cookieKey = req.cookies.get("ops_key")?.value || "";
  if (expected && (header === expected || queryKey === expected || cookieKey === expected)) {
    return {
      ok: true,
      staff: {
        id: "00000000-0000-0000-0000-000000000000",
        email: "breakglass@local",
        display_name: "紧急运维",
        role: "admin",
      },
      via: "key",
    };
  }

  const token = req.cookies.get(STAFF_COOKIE)?.value;
  if (token) {
    const staff = await getStaffByToken(token);
    if (staff) return { ok: true, staff, via: "session" };
  }

  return { ok: false, staff: null, via: null };
}

export async function loginStaff(
  email: string,
  password: string,
  meta: { ip?: string; userAgent?: string },
) {
  const normalized = email.trim().toLowerCase();
  const result = await query<{
    id: string;
    email: string;
    display_name: string;
    role: string;
    password_hash: string;
    active: boolean;
  }>(`SELECT * FROM staff_users WHERE email = $1 LIMIT 1`, [normalized]);
  const row = result.rows[0];
  if (!row || !row.active) {
    return { ok: false as const, error: "邮箱或密码错误", status: 401 };
  }
  const valid = await verifyPassword(password, row.password_hash);
  if (!valid) {
    return { ok: false as const, error: "邮箱或密码错误", status: 401 };
  }

  const token = randomToken();
  await query(
    `INSERT INTO staff_sessions (staff_id, token_hash, expires_at, user_agent, ip_hash)
     VALUES ($1, $2, now() + interval '7 days', $3, $4)`,
    [
      row.id,
      hashToken(token),
      meta.userAgent?.slice(0, 500) || null,
      meta.ip ? hashIp(meta.ip) : null,
    ],
  );

  return {
    ok: true as const,
    status: 200,
    token,
    cookie: sessionCookieOptions(STAFF_SESSION_DAYS * 86400),
    staff: {
      id: row.id,
      email: row.email,
      display_name: row.display_name,
      role: row.role,
    },
  };
}

export async function destroyStaffSession(token: string | undefined) {
  if (!token) return;
  await query(`DELETE FROM staff_sessions WHERE token_hash = $1`, [hashToken(token)]);
}

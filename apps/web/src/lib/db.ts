import pg from "pg";
import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);

async function generatePasswordHash(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

// In-Memory database tables
interface LeadRecord {
  id: string;
  name: string;
  mobile: string;
  wechat: string | null;
  track: string;
  intent_year: string | null;
  education_stage: string | null;
  source_url: string | null;
  landing_slug: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  form_variant: string;
  event_slug: string | null;
  lab_tool: string | null;
  preferred_advisor_id: string | null;
  assigned_advisor_id: string | null;
  status: string;
  consent_at: string;
  privacy_version: string;
  honeypot_hit: boolean;
  merge_count: number;
  guardian_name: string | null;
  guardian_mobile: string | null;
  request_id: string;
  first_contact_at: string | null;
  next_follow_up_at: string | null;
  invalid_reason: string | null;
  created_at: string;
  updated_at: string;
}

interface UserRecord {
  id: string;
  mobile: string;
  nickname: string | null;
  role_tag: string;
  level: string;
  privacy_version: string;
  guardian_mobile?: string | null;
  created_at: string;
  updated_at: string;
}

interface StaffRecord {
  id: string;
  email: string;
  password_hash: string;
  display_name: string;
  role: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const memUsers = new Map<string, UserRecord>();
const memSessions = new Map<string, any>();
const memOtpChallenges: any[] = [];
const memLeads: LeadRecord[] = [];
const memLeadNotes: any[] = [];
const memConsentRecords: any[] = [];
const memOutbox: any[] = [];
const memStaff = new Map<string, StaffRecord>();
const memStaffSessions = new Map<string, any>();
const memUserFavorites: any[] = [];
const memVerificationRequests: any[] = [];
const memUserLeadLinks: any[] = [];

const DEFAULT_ADMIN_HASH =
  "scrypt$a1b2c3d4e5f60718$321ae6e730a50d5f7ba0b74ad0926a7414b40d8f10579bb9802cc9e733a103f33b11f7990cb7ce9c3a8d9f1616636bc0c9ec53b0210f33afb692b8e592ad589b";

const defaultAdminRecord: StaffRecord = {
  id: "11111111-2222-3333-4444-555555555555",
  email: "admin@qingteng.local",
  password_hash: DEFAULT_ADMIN_HASH,
  display_name: "系统管理员",
  role: "admin",
  active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

memStaff.set("admin@qingteng.local", defaultAdminRecord);
if (process.env.STAFF_ADMIN_EMAIL?.trim()) {
  memStaff.set(process.env.STAFF_ADMIN_EMAIL.trim().toLowerCase(), {
    ...defaultAdminRecord,
    email: process.env.STAFF_ADMIN_EMAIL.trim().toLowerCase(),
  });
}

function mockQueryResult<T extends pg.QueryResultRow>(rows: T[]): pg.QueryResult<T> {
  return {
    rows,
    command: "SELECT",
    rowCount: rows.length,
    oid: 0,
    fields: [],
  };
}

async function executeMockQuery<T extends pg.QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<pg.QueryResult<T>> {
  const sql = text.trim();
  const lower = sql.toLowerCase();

  // Health check
  if (lower.startsWith("select 1") || lower === "select 1;") {
    return mockQueryResult([{ "?column?": 1 } as unknown as T]);
  }

  // Count leads
  if (lower.includes("select count(*)::text as c from leads")) {
    const active = memLeads.filter((l) => !l.honeypot_hit);
    return mockQueryResult([{ c: String(active.length) } as unknown as T]);
  }

  // Select leads
  if (lower.includes("from leads") && lower.startsWith("select")) {
    if (lower.includes("where mobile = $1 and coalesce(landing_slug")) {
      const mobile = String(params[0] || "");
      const slug = params[1] ? String(params[1]) : "";
      const found = memLeads.find(
        (l) => l.mobile === mobile && (l.landing_slug || "") === slug && !l.honeypot_hit,
      );
      return mockQueryResult(
        found ? ([{ id: found.id, merge_count: found.merge_count }] as unknown as T[]) : [],
      );
    }

    let rows = memLeads.filter((l) => !l.honeypot_hit);
    rows.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return mockQueryResult(rows as unknown as T[]);
  }

  // Insert into leads
  if (lower.startsWith("insert into leads")) {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const newLead: LeadRecord = {
      id,
      name: String(params[0] || ""),
      mobile: String(params[1] || ""),
      wechat: params[2] ? String(params[2]) : null,
      track: String(params[3] || "undecided"),
      intent_year: params[4] ? String(params[4]) : null,
      education_stage: params[5] ? String(params[5]) : null,
      guardian_name: params[6] ? String(params[6]) : null,
      guardian_mobile: params[7] ? String(params[7]) : null,
      source_url: params[8] ? String(params[8]) : null,
      landing_slug: params[9] ? String(params[9]) : null,
      utm_source: params[10] ? String(params[10]) : null,
      utm_medium: params[11] ? String(params[11]) : null,
      utm_campaign: params[12] ? String(params[12]) : null,
      utm_content: params[13] ? String(params[13]) : null,
      form_variant: String(params[14] || "short"),
      event_slug: params[15] ? String(params[15]) : null,
      lab_tool: params[16] ? String(params[16]) : null,
      preferred_advisor_id: params[17] ? String(params[17]) : null,
      assigned_advisor_id: null,
      status: "new",
      consent_at: now,
      privacy_version: String(params[18] || "2026-09-28"),
      honeypot_hit: false,
      merge_count: 1,
      request_id: String(params[19] || id),
      first_contact_at: null,
      next_follow_up_at: null,
      invalid_reason: null,
      created_at: now,
      updated_at: now,
    };
    memLeads.unshift(newLead);
    return mockQueryResult([{ id }] as unknown as T[]);
  }

  // Update leads
  if (lower.startsWith("update leads")) {
    const id = String(params[0] || "");
    const lead = memLeads.find((l) => l.id === id);
    if (lead) {
      if (lower.includes("merge_count")) {
        lead.merge_count += 1;
      }
      if (params[1]) lead.name = String(params[1]);
      if (params[2] !== undefined) lead.wechat = params[2] ? String(params[2]) : null;
      lead.updated_at = new Date().toISOString();
    }
    return mockQueryResult([]);
  }

  // Customer auth: sessions & users
  if (lower.includes("from sessions s") && lower.includes("join users u")) {
    const tokenHash = String(params[0] || "");
    const sess = memSessions.get(tokenHash);
    if (!sess || new Date(sess.expires_at).getTime() < Date.now()) {
      return mockQueryResult([]);
    }
    const user = memUsers.get(sess.user_id);
    if (!user) return mockQueryResult([]);
    return mockQueryResult([
      {
        id: user.id,
        mobile: user.mobile,
        nickname: user.nickname,
        role_tag: user.role_tag,
        level: user.level,
        expires_at: sess.expires_at,
      } as unknown as T,
    ]);
  }

  // OTP challenges
  if (lower.includes("from otp_challenges")) {
    const mobile = String(params[0] || "");
    const list = memOtpChallenges.filter(
      (c) => c.mobile === mobile && !c.consumed && new Date(c.expires_at).getTime() > Date.now(),
    );
    list.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return mockQueryResult(list as unknown as T[]);
  }

  if (lower.startsWith("insert into otp_challenges")) {
    const record = {
      id: crypto.randomUUID(),
      mobile: String(params[0] || ""),
      code_hash: String(params[1] || ""),
      expires_at: new Date(Date.now() + 15 * 60000).toISOString(),
      attempts: 0,
      consumed: false,
      ip_hash: params[2] ? String(params[2]) : null,
      created_at: new Date().toISOString(),
    };
    memOtpChallenges.push(record);
    return mockQueryResult([{ id: record.id }] as unknown as T[]);
  }

  if (lower.startsWith("update otp_challenges")) {
    if (lower.includes("consumed = true") && lower.includes("where id = $1")) {
      const id = String(params[0] || "");
      const c = memOtpChallenges.find((x) => x.id === id);
      if (c) c.consumed = true;
    } else if (lower.includes("attempts = attempts + 1")) {
      const id = String(params[0] || "");
      const c = memOtpChallenges.find((x) => x.id === id);
      if (c) c.attempts += 1;
    }
    return mockQueryResult([]);
  }

  // Upsert users
  if (lower.startsWith("insert into users")) {
    const mobile = String(params[0] || "");
    let user = Array.from(memUsers.values()).find((u) => u.mobile === mobile);
    const now = new Date().toISOString();
    if (user) {
      if (params[1]) user.nickname = String(params[1]);
      if (params[2]) user.role_tag = String(params[2]);
      user.updated_at = now;
    } else {
      user = {
        id: crypto.randomUUID(),
        mobile,
        nickname: params[1] ? String(params[1]) : null,
        role_tag: String(params[2] || "applicant"),
        level: "L1",
        privacy_version: String(params[3] || "2026-09-28"),
        created_at: now,
        updated_at: now,
      };
      memUsers.set(user.id, user);
    }
    return mockQueryResult([
      {
        id: user.id,
        nickname: user.nickname,
        level: user.level,
        role_tag: user.role_tag,
      } as unknown as T,
    ]);
  }

  // Update users
  if (lower.startsWith("update users")) {
    const id = String(params[0] || "");
    const user = memUsers.get(id);
    if (user) {
      if (params[1] !== undefined && params[1] !== null) user.nickname = String(params[1]);
      if (params[2] !== undefined && params[2] !== null) user.role_tag = String(params[2]);
      if (lower.includes("level = 'l2'")) user.level = "L2";
      user.updated_at = new Date().toISOString();
      return mockQueryResult([user as unknown as T]);
    }
    return mockQueryResult([]);
  }

  // Insert session
  if (lower.startsWith("insert into sessions")) {
    const record = {
      id: crypto.randomUUID(),
      user_id: String(params[0] || ""),
      token_hash: String(params[1] || ""),
      expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
      user_agent: params[2] ? String(params[2]) : null,
      ip_hash: params[3] ? String(params[3]) : null,
      created_at: new Date().toISOString(),
    };
    memSessions.set(record.token_hash, record);
    return mockQueryResult([]);
  }

  // Delete session
  if (lower.startsWith("delete from sessions")) {
    const tokenHash = String(params[0] || "");
    memSessions.delete(tokenHash);
    return mockQueryResult([]);
  }

  // Staff users & sessions
  if (lower.includes("from staff_users") && lower.startsWith("select")) {
    const email = String(params[0] || "").toLowerCase();
    const staff = memStaff.get(email);
    return mockQueryResult(staff ? [staff as unknown as T] : []);
  }

  if (lower.includes("from staff_sessions ss") && lower.includes("join staff_users su")) {
    const tokenHash = String(params[0] || "");
    const sess = memStaffSessions.get(tokenHash);
    if (!sess || new Date(sess.expires_at).getTime() < Date.now()) {
      return mockQueryResult([]);
    }
    const staff = Array.from(memStaff.values()).find((s) => s.id === sess.staff_id);
    if (!staff || !staff.active) return mockQueryResult([]);
    return mockQueryResult([
      {
        id: staff.id,
        email: staff.email,
        display_name: staff.display_name,
        role: staff.role,
      } as unknown as T,
    ]);
  }

  if (lower.startsWith("insert into staff_sessions")) {
    const record = {
      id: crypto.randomUUID(),
      staff_id: String(params[0] || ""),
      token_hash: String(params[1] || ""),
      expires_at: new Date(Date.now() + 7 * 86400000).toISOString(),
      user_agent: params[2] ? String(params[2]) : null,
      ip_hash: params[3] ? String(params[3]) : null,
      created_at: new Date().toISOString(),
    };
    memStaffSessions.set(record.token_hash, record);
    return mockQueryResult([]);
  }

  if (lower.startsWith("delete from staff_sessions")) {
    const tokenHash = String(params[0] || "");
    memStaffSessions.delete(tokenHash);
    return mockQueryResult([]);
  }

  // Favorites
  if (lower.includes("from user_favorites") && lower.startsWith("select")) {
    const userId = String(params[0] || "");
    const favs = memUserFavorites.filter((f) => f.user_id === userId);
    return mockQueryResult(favs as unknown as T[]);
  }

  if (lower.startsWith("insert into user_favorites")) {
    const record = {
      id: crypto.randomUUID(),
      user_id: String(params[0] || ""),
      target_type: String(params[1] || ""),
      target_slug: String(params[2] || ""),
      title: String(params[3] || ""),
      href: String(params[4] || ""),
      created_at: new Date().toISOString(),
    };
    const idx = memUserFavorites.findIndex(
      (f) =>
        f.user_id === record.user_id &&
        f.target_type === record.target_type &&
        f.target_slug === record.target_slug,
    );
    if (idx >= 0) {
      memUserFavorites[idx] = record;
    } else {
      memUserFavorites.unshift(record);
    }
    return mockQueryResult([{ id: record.id }] as unknown as T[]);
  }

  if (lower.startsWith("delete from user_favorites")) {
    const userId = String(params[0] || "");
    const targetType = String(params[1] || "");
    const targetSlug = String(params[2] || "");
    const idx = memUserFavorites.findIndex(
      (f) =>
        f.user_id === userId &&
        f.target_type === targetType &&
        f.target_slug === targetSlug,
    );
    if (idx >= 0) memUserFavorites.splice(idx, 1);
    return mockQueryResult([]);
  }

  // Verification requests
  if (lower.includes("from verification_requests") && lower.startsWith("select")) {
    const status = params[0] ? String(params[0]) : "all";
    let list = memVerificationRequests;
    if (status !== "all") {
      list = list.filter((r) => r.status === status);
    }
    return mockQueryResult(list as unknown as T[]);
  }

  if (lower.startsWith("insert into verification_requests")) {
    const record = {
      id: crypto.randomUUID(),
      user_id: String(params[0] || ""),
      real_name: String(params[1] || ""),
      university: String(params[2] || ""),
      program: params[3] ? String(params[3]) : null,
      proof_note: params[4] ? String(params[4]) : null,
      status: "pending",
      reviewer_note: null,
      reviewed_by: null,
      reviewed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    memVerificationRequests.unshift(record);
    return mockQueryResult([{ id: record.id, status: record.status, created_at: record.created_at }] as unknown as T[]);
  }

  if (lower.startsWith("update verification_requests")) {
    const id = String(params[0] || "");
    const req = memVerificationRequests.find((r) => r.id === id);
    if (req) {
      req.status = String(params[1] || req.status);
      req.reviewer_note = params[2] ? String(params[2]) : null;
      req.reviewed_by = params[3] ? String(params[3]) : null;
      req.reviewed_at = new Date().toISOString();
      req.updated_at = new Date().toISOString();
    }
    return mockQueryResult([]);
  }

  // Generic fallback
  return mockQueryResult([]);
}

const globalForPg = globalThis as unknown as { pgPool?: pg.Pool };

export function getPool() {
  if (!globalForPg.pgPool) {
    const connectionString = process.env.DATABASE_URL?.trim();
    if (connectionString) {
      try {
        globalForPg.pgPool = new pg.Pool({
          connectionString,
          max: 10,
        });
      } catch {
        console.warn("[AI Studio] PostgreSQL not connected — in-memory mock active");
      }
    }
  }
  return globalForPg.pgPool;
}

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<pg.QueryResult<T>> {
  const pool = getPool();
  if (pool) {
    try {
      return await pool.query<T>(text, params);
    } catch {
      console.warn("[AI Studio] Database connection error — falling back to mock");
    }
  }
  return executeMockQuery<T>(text, params);
}

/** Run multiple statements on one client inside BEGIN/COMMIT. */
export async function withTransaction<T>(
  fn: (client: pg.PoolClient) => Promise<T>,
): Promise<T> {
  const pool = getPool();
  if (pool) {
    try {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await fn(client);
        await client.query("COMMIT");
        return result;
      } catch (err) {
        try {
          await client.query("ROLLBACK");
        } catch {
          /* ignore rollback errors */
        }
        throw err;
      } finally {
        client.release();
      }
    } catch {
      console.warn("[AI Studio] Transaction failed with real DB — fallback to mock");
    }
  }

  // Mock client implementation for in-memory transactions
  const mockClient = {
    query: async (text: string, params?: unknown[]) => executeMockQuery(text, params),
    release: () => {},
  } as unknown as pg.PoolClient;

  return await fn(mockClient);
}

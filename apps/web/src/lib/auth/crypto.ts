import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function randomToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashOtp(code: string) {
  return crypto.createHash("sha256").update(`otp:${code}`).digest("hex");
}

/** Keep digits only — paste with spaces/dashes still works. */
export function normalizeMobile(raw: string) {
  return String(raw || "").replace(/\D/g, "").slice(0, 11);
}

export function isDevOtpEnabled() {
  return process.env.AUTH_DEV_OTP === "1" || process.env.AUTH_DEV_OTP === "true";
}

export const DEV_OTP_CODE = "888888";

export function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function hashIp(ip: string) {
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = (h * 31 + ip.charCodeAt(i)) >>> 0;
  return `ip_${h.toString(16)}`;
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [algo, salt, hex] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hex) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hex, "hex");
  if (expected.length !== derived.length) return false;
  return crypto.timingSafeEqual(expected, derived);
}

export const CUSTOMER_COOKIE = "sa_session";
export const STAFF_COOKIE = "ops_session";
export const SESSION_DAYS = 30;
export const STAFF_SESSION_DAYS = 7;

export function cookieSecure() {
  return process.env.NODE_ENV === "production" && (process.env.NEXT_PUBLIC_SITE_URL || "").startsWith("https");
}

export function sessionCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { promisify } from "node:util";
import pg from "pg";

const scrypt = promisify(crypto.scrypt);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, "migrate.sql");

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = /** @type {Buffer} */ (await scrypt(password, salt, 64));
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

async function seedStaff(client) {
  const email = (process.env.STAFF_ADMIN_EMAIL || "admin@qingteng.local").toLowerCase();
  const password = process.env.STAFF_ADMIN_PASSWORD || "ChangeMe_Ops_2026!";
  const existing = await client.query(
    `SELECT id FROM staff_users WHERE email = $1`,
    [email],
  );
  if (existing.rows[0]) {
    console.log("Staff admin already exists:", email);
    return;
  }
  const passwordHash = await hashPassword(password);
  await client.query(
    `INSERT INTO staff_users (email, password_hash, display_name, role, active)
     VALUES ($1, $2, $3, 'admin', true)`,
    [email, passwordHash, "系统管理员"],
  );
  console.log("Seeded staff admin:", email);
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  const sql = fs.readFileSync(sqlPath, "utf8");
  await client.query(sql);
  console.log("Migration applied OK");
  await seedStaff(client);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

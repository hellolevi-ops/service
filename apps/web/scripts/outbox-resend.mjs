#!/usr/bin/env node
/**
 * Requeue failed outbox notifications for retry.
 * Usage: node --env-file=.env.local scripts/outbox-resend.mjs [--all | --id <uuid>]
 */
import pg from "pg";

const args = process.argv.slice(2);
const all = args.includes("--all");
const idIdx = args.indexOf("--id");
const id = idIdx >= 0 ? args[idIdx + 1] : null;

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL required");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: url });

async function main() {
  let res;
  if (id) {
    res = await pool.query(
      `UPDATE outbox_notifications
       SET status = 'pending', attempts = 0, next_run_at = now(), last_error = null, updated_at = now()
       WHERE id = $1 AND status = 'failed'
       RETURNING id, type`,
      [id],
    );
  } else if (all) {
    res = await pool.query(
      `UPDATE outbox_notifications
       SET status = 'pending', attempts = 0, next_run_at = now(), last_error = null, updated_at = now()
       WHERE status = 'failed'
       RETURNING id, type`,
    );
  } else {
    const list = await pool.query(
      `SELECT id, type, attempts, last_error, created_at
       FROM outbox_notifications WHERE status = 'failed'
       ORDER BY created_at DESC LIMIT 50`,
    );
    console.log(JSON.stringify(list.rows, null, 2));
    console.log("\nRequeue with --all or --id <uuid>");
    await pool.end();
    return;
  }
  console.log(`requeued ${res.rowCount}:`, res.rows);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

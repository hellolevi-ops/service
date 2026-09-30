import pg from "pg";
import nodemailer from "nodemailer";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL required");
  process.exit(1);
}

const client = new pg.Client({ connectionString: DATABASE_URL });

function createTransport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

async function processOnce() {
  await client.query("BEGIN");
  try {
    const { rows } = await client.query(
      `SELECT id, type, payload_json, attempts
       FROM outbox_notifications
       WHERE status = 'pending' AND next_run_at <= now()
       ORDER BY created_at ASC
       LIMIT 20
       FOR UPDATE SKIP LOCKED`,
    );

    const transport = createTransport();
    const to = process.env.LEAD_NOTIFY_TO || "ops@studyabroad.local";

    for (const row of rows) {
      try {
        if (row.type === "lead_email") {
          const p = row.payload_json;
          const subject = `[线索] ${p.track} / ${p.formVariant} / ${p.name}`;
          const text = `leadId=${p.leadId}
name=${p.name}
mobile=${p.mobile}
track=${p.track}
variant=${p.formVariant}
utm=${p.utmSource || "-"}
advisor=${p.preferredAdvisorId || "-"}
event=${p.eventSlug || "-"}
lab=${p.labTool || "-"}
`;
          if (transport) {
            await transport.sendMail({
              from: process.env.SMTP_FROM || "noreply@studyabroad.local",
              to,
              subject,
              text,
            });
          } else {
            console.log("[outbox:dry-run]", subject, text.replace(/\n/g, " | "));
          }
        }

        await client.query(
          `UPDATE outbox_notifications
           SET status = 'sent', updated_at = now(), attempts = attempts + 1
           WHERE id = $1`,
          [row.id],
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        await client.query(
          `UPDATE outbox_notifications
           SET attempts = attempts + 1,
               last_error = $2,
               next_run_at = now() + interval '2 minutes',
               status = CASE WHEN attempts + 1 >= 8 THEN 'failed' ELSE 'pending' END,
               updated_at = now()
           WHERE id = $1`,
          [row.id, msg.slice(0, 500)],
        );
        console.error("[outbox:fail]", row.id, msg);
      }
    }
    await client.query("COMMIT");
    return rows.length;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }
}

async function main() {
  await client.connect();
  const once = process.argv.includes("--once");
  if (once) {
    const n = await processOnce();
    console.log(`processed ${n}`);
    await client.end();
    return;
  }
  console.log("outbox worker started");
  for (;;) {
    try {
      await processOnce();
    } catch (err) {
      console.error(err);
    }
    await new Promise((r) => setTimeout(r, 60_000));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

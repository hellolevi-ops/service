-- Application schema (studyabroad_app)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(40) NOT NULL,
  mobile varchar(32) NOT NULL,
  wechat varchar(64),
  track varchar(32) NOT NULL,
  intent_year varchar(16),
  education_stage varchar(32),
  source_url text,
  landing_slug varchar(128),
  utm_source varchar(64),
  utm_medium varchar(64),
  utm_campaign varchar(128),
  utm_content varchar(128),
  form_variant varchar(32) NOT NULL DEFAULT 'short',
  event_slug varchar(128),
  lab_tool varchar(64),
  preferred_advisor_id uuid,
  status varchar(32) NOT NULL DEFAULT 'new',
  consent_at timestamptz,
  privacy_version varchar(32),
  honeypot_hit boolean NOT NULL DEFAULT false,
  merge_count int NOT NULL DEFAULT 1,
  guardian_name varchar(40),
  guardian_mobile varchar(32),
  request_id varchar(64),
  first_contact_at timestamptz,
  assigned_advisor_id uuid,
  next_follow_up_at timestamptz,
  invalid_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Idempotent upgrades for existing DBs
ALTER TABLE leads ADD COLUMN IF NOT EXISTS merge_count int NOT NULL DEFAULT 1;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS guardian_name varchar(40);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS guardian_mobile varchar(32);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS request_id varchar(64);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS first_contact_at timestamptz;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_advisor_id uuid;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS next_follow_up_at timestamptz;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS invalid_reason text;

CREATE INDEX IF NOT EXISTS leads_mobile_created_idx ON leads (mobile, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_track_idx ON leads (track);

CREATE TABLE IF NOT EXISTS lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  advisor_id uuid,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  policy_version varchar(32) NOT NULL,
  ip_hash varchar(128),
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS outbox_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type varchar(64) NOT NULL,
  payload_json jsonb NOT NULL,
  status varchar(32) NOT NULL DEFAULT 'pending',
  attempts int NOT NULL DEFAULT 0,
  next_run_at timestamptz NOT NULL DEFAULT now(),
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS outbox_pending_idx
  ON outbox_notifications (status, next_run_at)
  WHERE status = 'pending';

CREATE TABLE IF NOT EXISTS lab_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool varchar(64) NOT NULL,
  input_json jsonb NOT NULL,
  result_json jsonb NOT NULL,
  lead_id uuid REFERENCES leads(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lead_export_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor varchar(128) NOT NULL,
  row_count int NOT NULL,
  reveal_full boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  key varchar(64) PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO settings (key, value) VALUES
  ('privacy_version', '2026-09-28'),
  ('brand_name', '青藤国际'),
  ('phone', '400-820-1926'),
  ('wechat_id', 'qingteng-edu')
ON CONFLICT (key) DO NOTHING;

UPDATE settings SET value = '青藤国际', updated_at = now() WHERE key = 'brand_name' AND value = '研迹留学';

-- Customer auth
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile varchar(32) NOT NULL UNIQUE,
  nickname varchar(64),
  role_tag varchar(32) NOT NULL DEFAULT 'applicant',
  level varchar(8) NOT NULL DEFAULT 'L1',
  privacy_version varchar(32),
  guardian_mobile varchar(32),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS otp_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile varchar(32) NOT NULL,
  code_hash varchar(128) NOT NULL,
  expires_at timestamptz NOT NULL,
  attempts int NOT NULL DEFAULT 0,
  consumed boolean NOT NULL DEFAULT false,
  ip_hash varchar(128),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS otp_mobile_created_idx ON otp_challenges (mobile, created_at DESC);

CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash varchar(128) NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  user_agent text,
  ip_hash varchar(128),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions (user_id);

CREATE TABLE IF NOT EXISTS user_lead_links (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  linked_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lead_id)
);

-- Staff auth (ops console)
CREATE TABLE IF NOT EXISTS staff_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(128) NOT NULL UNIQUE,
  password_hash varchar(256) NOT NULL,
  display_name varchar(64) NOT NULL,
  role varchar(32) NOT NULL DEFAULT 'advisor',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS staff_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid NOT NULL REFERENCES staff_users(id) ON DELETE CASCADE,
  token_hash varchar(128) NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  user_agent text,
  ip_hash varchar(128),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS staff_sessions_staff_idx ON staff_sessions (staff_id);

-- Phase B: favorites + L2 verification
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type varchar(32) NOT NULL,
  target_slug varchar(128) NOT NULL,
  title varchar(256) NOT NULL,
  href varchar(512) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, target_type, target_slug)
);

CREATE INDEX IF NOT EXISTS user_favorites_user_idx ON user_favorites (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS verification_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  real_name varchar(64) NOT NULL,
  university varchar(128) NOT NULL,
  program varchar(128),
  proof_note text,
  status varchar(32) NOT NULL DEFAULT 'pending',
  reviewer_note text,
  reviewed_by uuid REFERENCES staff_users(id),
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS verification_requests_user_idx ON verification_requests (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS verification_requests_status_idx ON verification_requests (status, created_at DESC);

-- ============================================================
-- Athar Islamic — Database Schema
-- PostgreSQL / Supabase
-- Version: 1.0
-- اللغة الأساسية: العربية
-- ============================================================

-- تفعيل UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  avatar      TEXT,
  country     TEXT,
  language    TEXT DEFAULT 'ar',                          -- ar | en | fr | tr | id
  theme       TEXT DEFAULT 'emerald',                     -- emerald | dark | gold | light
  provider    TEXT DEFAULT 'email',                       -- email | google | apple | anonymous
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- 2. PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  user_id     UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  bio         TEXT,
  gender      TEXT CHECK (gender IN ('male', 'female')),
  birth_date  DATE,
  city        TEXT,
  phone       TEXT,
  streak      INT DEFAULT 0,
  level       INT DEFAULT 1,
  experience  INT DEFAULT 0,
  last_login  TIMESTAMPTZ
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- 3. MEMORIAL PAGES (صفحات الأثر)
-- ============================================================
CREATE TABLE IF NOT EXISTS memorial_pages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  slug        TEXT UNIQUE NOT NULL,
  person_name TEXT NOT NULL,
  gender      TEXT CHECK (gender IN ('male', 'female')),
  photo       TEXT,
  biography   TEXT,
  birth_date  DATE,
  death_date  DATE,
  visibility  TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'family')),
  status      TEXT DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'pending')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE memorial_pages ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_memorial_pages_owner ON memorial_pages(owner_id);
CREATE INDEX idx_memorial_pages_slug  ON memorial_pages(slug);

CREATE POLICY "memorial_public_read" ON memorial_pages
  FOR SELECT USING (visibility = 'public' AND status = 'active');

CREATE POLICY "memorial_owner_all" ON memorial_pages
  FOR ALL USING (auth.uid() = owner_id);

-- ============================================================
-- 4. MEMORIAL PARTICIPANTS
-- ============================================================
CREATE TABLE IF NOT EXISTS memorial_participants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  guest_name  TEXT,
  country     TEXT,
  joined_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE memorial_participants ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_participants_page ON memorial_participants(page_id);

CREATE POLICY "participants_read_public" ON memorial_participants
  FOR SELECT USING (true);

CREATE POLICY "participants_insert_auth" ON memorial_participants
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- 5. TASBEEH RECORDS
-- ============================================================
CREATE TABLE IF NOT EXISTS tasbeeh_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  dhikr       TEXT NOT NULL,
  count       INT NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasbeeh_records ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_tasbeeh_user  ON tasbeeh_records(user_id);
CREATE INDEX idx_tasbeeh_page  ON tasbeeh_records(page_id);
CREATE INDEX idx_tasbeeh_date  ON tasbeeh_records(created_at);

CREATE POLICY "tasbeeh_read_own" ON tasbeeh_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "tasbeeh_insert_auth" ON tasbeeh_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 6. DUA RECORDS
-- ============================================================
CREATE TABLE IF NOT EXISTS dua_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  dua_id      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE dua_records ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_dua_page ON dua_records(page_id);

-- ============================================================
-- 7. QURAN RECORDS
-- ============================================================
CREATE TABLE IF NOT EXISTS quran_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  surah       INT NOT NULL,
  ayah        INT,
  juz         INT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quran_records ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_quran_records_page ON quran_records(page_id);

-- ============================================================
-- 8. COMMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  message     TEXT NOT NULL,
  status      TEXT DEFAULT 'visible' CHECK (status IN ('visible', 'hidden', 'flagged')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_comments_page ON comments(page_id);

CREATE POLICY "comments_read_visible" ON comments
  FOR SELECT USING (status = 'visible');

CREATE POLICY "comments_insert_auth" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 9. AZKAR
-- ============================================================
CREATE TABLE IF NOT EXISTS azkar (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category    TEXT NOT NULL,   -- morning | evening | prayer | sleep | travel | food | general
  title       JSONB NOT NULL,  -- { ar: '...', en: '...', fr: '...', tr: '...', id: '...' }
  arabic      TEXT NOT NULL,
  translation JSONB,           -- { ar: '...', en: '...', fr: '...', tr: '...', id: '...' }
  reference   TEXT,
  benefit     JSONB,
  audio       TEXT,
  "order"     INT DEFAULT 0
);

ALTER TABLE azkar ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_azkar_category ON azkar(category);

CREATE POLICY "azkar_read_all" ON azkar
  FOR SELECT USING (true);

-- ============================================================
-- 10. QURAN
-- ============================================================
CREATE TABLE IF NOT EXISTS quran (
  surah       INT NOT NULL,
  ayah        INT NOT NULL,
  arabic      TEXT NOT NULL,
  translation JSONB,           -- { ar: '...', en: '...', fr: '...', tr: '...', id: '...' }
  audio       TEXT,
  tafsir      JSONB,
  PRIMARY KEY (surah, ayah)
);

ALTER TABLE quran ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quran_read_all" ON quran
  FOR SELECT USING (true);

-- ============================================================
-- 11. PRAYER TIMES CACHE
-- ============================================================
CREATE TABLE IF NOT EXISTS prayer_times_cache (
  city        TEXT NOT NULL,
  country     TEXT NOT NULL,
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  fajr        TIME,
  dhuhr       TIME,
  asr         TIME,
  maghrib     TIME,
  isha        TIME,
  PRIMARY KEY (city, country, date)
);

ALTER TABLE prayer_times_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "prayer_times_read_all" ON prayer_times_cache
  FOR SELECT USING (true);

-- ============================================================
-- 12. ACHIEVEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS achievements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           JSONB NOT NULL,
  description     JSONB,
  icon            TEXT,
  required_points INT DEFAULT 0
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "achievements_read_all" ON achievements
  FOR SELECT USING (true);

-- ============================================================
-- 13. USER ACHIEVEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_achievements (
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id  UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at       TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_achievements_read_own" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- 14. DAILY GOALS
-- ============================================================
CREATE TABLE IF NOT EXISTS daily_goals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  goal_type   TEXT NOT NULL CHECK (goal_type IN ('tasbeeh', 'quran', 'dua', 'azkar')),
  target      INT NOT NULL,
  completed   INT DEFAULT 0,
  date        DATE NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE daily_goals ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_daily_goals_user ON daily_goals(user_id);
CREATE INDEX idx_daily_goals_date ON daily_goals(date);

CREATE POLICY "daily_goals_own" ON daily_goals
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- 15. STATISTICS
-- ============================================================
CREATE TABLE IF NOT EXISTS statistics (
  user_id             UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  tasbeeh_total       BIGINT DEFAULT 0,
  dua_total           INT DEFAULT 0,
  quran_total         INT DEFAULT 0,
  memorial_created    INT DEFAULT 0,
  longest_streak      INT DEFAULT 0,
  best_day            DATE
);

ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "statistics_read_own" ON statistics
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- 16. NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  title       JSONB NOT NULL,
  message     JSONB,
  type        TEXT NOT NULL CHECK (type IN ('reminder', 'achievement', 'community', 'memorial', 'system', 'security')),
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

CREATE POLICY "notifications_own" ON notifications
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- 17. FAMILY GROUPS
-- ============================================================
CREATE TABLE IF NOT EXISTS family_groups (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  family_name TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE family_groups ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 18. FAMILY MEMBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS family_members (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id         UUID REFERENCES family_groups(id) ON DELETE CASCADE,
  person_name       TEXT NOT NULL,
  relation          TEXT,
  memorial_page_id  UUID REFERENCES memorial_pages(id) ON DELETE SET NULL
);

ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 19. CHALLENGES
-- ============================================================
CREATE TABLE IF NOT EXISTS challenges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       JSONB NOT NULL,
  description JSONB,
  goal        INT NOT NULL,
  start_date  DATE,
  end_date    DATE,
  status      TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended', 'upcoming'))
);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "challenges_read_all" ON challenges
  FOR SELECT USING (true);

-- ============================================================
-- 20. CHALLENGE MEMBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS challenge_members (
  challenge_id  UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  progress      INT DEFAULT 0,
  joined_at     TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (challenge_id, user_id)
);

ALTER TABLE challenge_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "challenge_members_read_all" ON challenge_members
  FOR SELECT USING (true);

CREATE POLICY "challenge_members_own" ON challenge_members
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- 21. ACTIVITY LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,   -- login | logout | create | update | delete | join | share
  entity      TEXT,            -- memorial | challenge | tasbeeh | quran | azkar
  entity_id   UUID,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_activity_logs_user   ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_date   ON activity_logs(created_at);

CREATE POLICY "activity_logs_own" ON activity_logs
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- REALTIME — تفعيل البث الحي
-- ============================================================

-- تسبيح حي على صفحات الأثر
ALTER TABLE tasbeeh_records REPLICA IDENTITY FULL;

-- تقدم التحديات حيًا
ALTER TABLE challenge_members REPLICA IDENTITY FULL;

-- إحصائيات المجتمع حية
ALTER TABLE statistics REPLICA IDENTITY FULL;

-- التعليقات الحية
ALTER TABLE comments REPLICA IDENTITY FULL;

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- يتم إنشاؤها من لوحة Supabase أو API:
-- avatars/    → صور المستخدمين (max 2MB)
-- memorial/   → صور صفحات الأثر (max 5MB)
-- family/     → صور العائلة (max 5MB)
-- audio/      → ملفات صوت الأذكار
-- qr/         → رموز QR
-- temp/       → ملفات مؤقتة (تُحذف تلقائيًا بعد 24h)

-- ============================================================
-- END OF SCHEMA
-- ============================================================

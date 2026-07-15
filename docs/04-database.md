# 04 — Database Architecture & API Documentation
# هيكل قاعدة البيانات والـ API

**Athar Islamic · Version 1.0**

---

## فلسفة قاعدة البيانات

قاعدة البيانات مصممة لتكون:

| المعيار | التطبيق |
|---------|---------|
| **Scalable** | UUID كـ Primary Keys، Indexes على الحقول المتكررة |
| **Secure** | Row Level Security على كل الجداول |
| **Realtime** | Supabase Realtime على الجداول الحيّة |
| **Fast** | Indexes، Caching، Edge Functions |
| **Easy to Maintain** | تسمية واضحة، Foreign Keys، Migrations |

---

## مخطط العلاقات (ER Diagram)

```
Users
│
├── Profiles
├── Sessions
├── Notifications
├── Achievements
├── Daily Goals
├── Favorites
├── Activity Logs
├── Devices
│
├── Memorial Pages (صفحات الأثر)
│       ├── Participants
│       ├── Tasbeeh Records
│       ├── Dua Records
│       ├── Quran Records
│       ├── Comments
│       ├── Family Members
│       └── QR Codes
│
├── Challenges (التحديات)
│       ├── Members
│       └── Progress
│
└── Admin
```

---

## تفاصيل الجداول

### 1. جدول `users`

```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  avatar      TEXT,
  country     TEXT,
  language    TEXT DEFAULT 'ar',
  theme       TEXT DEFAULT 'emerald',
  provider    TEXT DEFAULT 'email',   -- email | google | apple | anonymous
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. جدول `profiles`

```sql
CREATE TABLE profiles (
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
```

### 3. جدول `memorial_pages` (صفحات الأثر)

```sql
CREATE TABLE memorial_pages (
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
```

### 4. جدول `memorial_participants`

```sql
CREATE TABLE memorial_participants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  guest_name  TEXT,                   -- للمشاركة بدون حساب
  country     TEXT,
  joined_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. جدول `tasbeeh_records`

```sql
CREATE TABLE tasbeeh_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  dhikr       TEXT NOT NULL,          -- سبحان الله | الحمد لله | ...
  count       INT NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 6. جدول `dua_records`

```sql
CREATE TABLE dua_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  dua_id      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 7. جدول `quran_records`

```sql
CREATE TABLE quran_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  surah       INT NOT NULL,
  ayah        INT,
  juz         INT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 8. جدول `comments`

```sql
CREATE TABLE comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID REFERENCES memorial_pages(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  message     TEXT NOT NULL,
  status      TEXT DEFAULT 'visible' CHECK (status IN ('visible', 'hidden', 'flagged')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 9. جدول `azkar`

```sql
CREATE TABLE azkar (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category    TEXT NOT NULL,          -- morning | evening | prayer | sleep | ...
  title       TEXT NOT NULL,
  arabic      TEXT NOT NULL,
  translation JSONB,                  -- { ar: ..., en: ..., fr: ..., tr: ..., id: ... }
  reference   TEXT,
  benefit     JSONB,                  -- متعدد اللغات
  audio       TEXT,
  "order"     INT DEFAULT 0
);
```

### 10. جدول `quran`

```sql
CREATE TABLE quran (
  surah       INT NOT NULL,
  ayah        INT NOT NULL,
  arabic      TEXT NOT NULL,
  translation JSONB,                  -- { ar: ..., en: ..., fr: ..., tr: ..., id: ... }
  audio       TEXT,
  tafsir      JSONB,
  PRIMARY KEY (surah, ayah)
);
```

### 11. جدول `prayer_times_cache`

```sql
CREATE TABLE prayer_times_cache (
  city        TEXT NOT NULL,
  country     TEXT NOT NULL,
  date        DATE NOT NULL,
  fajr        TIME,
  dhuhr       TIME,
  asr         TIME,
  maghrib     TIME,
  isha        TIME,
  PRIMARY KEY (city, country, date)
);
```

### 12. جدول `achievements`

```sql
CREATE TABLE achievements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           JSONB NOT NULL,     -- متعدد اللغات
  description     JSONB,
  icon            TEXT,
  required_points INT DEFAULT 0
);
```

### 13. جدول `user_achievements`

```sql
CREATE TABLE user_achievements (
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id  UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at       TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);
```

### 14. جدول `daily_goals`

```sql
CREATE TABLE daily_goals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  goal_type   TEXT NOT NULL,          -- tasbeeh | quran | dua | azkar
  target      INT NOT NULL,
  completed   INT DEFAULT 0,
  date        DATE NOT NULL DEFAULT CURRENT_DATE
);
```

### 15. جدول `statistics`

```sql
CREATE TABLE statistics (
  user_id             UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  tasbeeh_total       BIGINT DEFAULT 0,
  dua_total           INT DEFAULT 0,
  quran_total         INT DEFAULT 0,
  memorial_created    INT DEFAULT 0,
  longest_streak      INT DEFAULT 0,
  best_day            DATE
);
```

### 16. جدول `notifications`

```sql
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  title       JSONB NOT NULL,         -- متعدد اللغات
  message     JSONB,
  type        TEXT NOT NULL CHECK (type IN ('reminder', 'achievement', 'community', 'memorial', 'system', 'security')),
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 17. جدول `family_groups`

```sql
CREATE TABLE family_groups (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  family_name TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 18. جدول `family_members`

```sql
CREATE TABLE family_members (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id         UUID REFERENCES family_groups(id) ON DELETE CASCADE,
  person_name       TEXT NOT NULL,
  relation          TEXT,
  memorial_page_id  UUID REFERENCES memorial_pages(id) ON DELETE SET NULL
);
```

### 19. جدول `challenges`

```sql
CREATE TABLE challenges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       JSONB NOT NULL,         -- متعدد اللغات
  description JSONB,
  goal        INT NOT NULL,
  start_date  DATE,
  end_date    DATE,
  status      TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended', 'upcoming'))
);
```

### 20. جدول `challenge_members`

```sql
CREATE TABLE challenge_members (
  challenge_id  UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  progress      INT DEFAULT 0,
  joined_at     TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (challenge_id, user_id)
);
```

### 21. جدول `activity_logs`

```sql
CREATE TABLE activity_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,          -- login | create | update | delete | join | share
  entity      TEXT,                   -- memorial | challenge | tasbeeh | ...
  entity_id   UUID,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## المصادقة (Authentication)

| الطريقة | الحالة |
|---------|-------|
| ✅ Email / Password | مدعوم |
| ✅ Google OAuth | مدعوم |
| ✅ Apple Sign In | مدعوم |
| ✅ Anonymous | مدعوم (للضيوف) |

---

## التخزين (Supabase Storage)

```
Buckets:
├── avatars/       # صور المستخدمين
├── memorial/      # صور صفحات الأثر
├── family/        # صور العائلة
├── audio/         # ملفات صوتية للأذكار والقرآن
├── qr/            # رموز QR
└── temp/          # ملفات مؤقتة
```

---

## هيكل الـ API

### المصادقة

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### المستخدم

```http
GET    /api/profile
PATCH  /api/profile
DELETE /api/profile
```

### صفحات الأثر

```http
POST   /api/memorial
GET    /api/memorial
GET    /api/memorial/:slug
PATCH  /api/memorial/:id
DELETE /api/memorial/:id
```

### التسبيح

```http
POST   /api/tasbeeh
GET    /api/tasbeeh/history
GET    /api/tasbeeh/statistics
```

### القرآن

```http
GET    /api/quran
GET    /api/quran/surah
POST   /api/quran/bookmark
```

### الأذكار

```http
GET    /api/azkar
GET    /api/azkar/category
GET    /api/azkar/details
```

### الصلاة

```http
GET    /api/prayer-times
GET    /api/qibla
```

### التحديات

```http
GET    /api/challenges
POST   /api/challenges/join
PATCH  /api/challenges/progress
```

### المجتمع

```http
GET    /api/community/live
GET    /api/community/statistics
GET    /api/community/leaderboard
```

### الإشعارات

```http
GET    /api/notifications
PATCH  /api/notifications/read
```

---

## استراتيجية الـ Caching

| البيانات | مدة الكاش |
|---------|----------|
| مواقيت الصلاة | 24 ساعة |
| القرآن الكريم | دائم |
| الأذكار | دائم |
| بيانات المستخدم | 5 دقائق |
| الإحصائيات | 30 ثانية |
| لوحة المتصدرين | دقيقة واحدة |

---

## الميزات الحية (Realtime)

```
🔴 LIVE Features (Supabase Realtime):
├── عداد التسبيح الحي
├── تقدم التحديات في الوقت الفعلي
├── المستخدمون المتصلون الآن
├── التعليقات الحية على صفحات الأثر
├── إحصائيات المجتمع
└── التغذية الراجعة للمجتمع
```

---

## النسخ الاحتياطي

- ✅ نسخة احتياطية يومية تلقائية
- ✅ نسخة احتياطية أسبوعية كاملة
- ✅ تخزين سحابي
- ✅ نقاط الاسترداد (Restore Points)

---

## قابلية التوسع

النظام مصمم ليستوعب:

- 🧑 أكثر من **مليون مستخدم**
- 📿 أكثر من **100 مليون تسبيحة** مسجلة
- 📜 آلاف **صفحات الأثر**
- ⚡ تحديثات مباشرة بدون التأثير على الأداء

---

<div align="center">

تم التصميم بواسطة **[El Araby 360 Digital Agency](https://www.facebook.com/ElAraby360D)**

</div>

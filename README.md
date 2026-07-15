<div dir="rtl">

# أثر إسلامي — Athar Islamic 🌿

> **منصة إسلامية متكاملة من الجيل القادم**  
> *A next-generation Islamic platform — elegant, scalable, and spiritually meaningful*

[![Version](https://img.shields.io/badge/version-1.0.0-emerald?style=flat-square)](.)
[![Stack](https://img.shields.io/badge/stack-Next.js%2015%20%2B%20Supabase-black?style=flat-square)](.)
[![Language](https://img.shields.io/badge/primary%20language-Arabic-green?style=flat-square)](.)
[![License](https://img.shields.io/badge/license-Private-red?style=flat-square)](.)

---

## 🌟 نبذة عن المشروع

**Athar Islamic** ليس مجرد تطبيق أذكار — بل هو **بيئة إسلامية متكاملة** تساعد المسلم على:

- 📖 قراءة القرآن الكريم وتتبع الحفظ
- 📿 التسبيح والذكر مع إحصائيات حية
- 🌅 أذكار الصباح والمساء وأوقات الصلاة
- 🕌 معرفة مواقيت الصلاة واتجاه القبلة
- 📜 إنشاء صفحات أثر (تذكارية) للمتوفين والأحياء
- 👨‍👩‍👧‍👦 ربط أفراد العائلة في منظومة واحدة
- 🏆 الانضمام للتحديات الجماعية
- 📊 تتبع الأهداف والعادات اليومية
- 🤖 الاستفادة من مساعد AI ذكي وآمن

---

## 📚 التوثيق الكامل

| الملف | الوصف |
|-------|-------|
| [01 — Vision & Overview](./docs/01-vision.md) | رؤية المشروع وأهدافه |
| [02 — User Stories](./docs/02-user-stories.md) | قصص المستخدمين الكاملة |
| [03 — UI/UX Design System](./docs/03-design-system.md) | منظومة التصميم والألوان |
| [04 — Database Architecture](./docs/04-database.md) | هيكل قاعدة البيانات والـ API |
| [05 — Frontend & Backend Structure](./docs/05-architecture.md) | بنية الكود الكاملة |
| [06 — Admin Dashboard & AI](./docs/06-admin-ai.md) | لوحة الإدارة وميزات الذكاء الاصطناعي |
| [07 — Master Prompt](./docs/07-master-prompt.md) | المتطلبات الكاملة للتنفيذ |

---

## 🚀 Tech Stack

```
Frontend:   Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui
Animation:  Framer Motion
State:      Zustand · TanStack Query
Forms:      React Hook Form · Zod
i18n:       next-intl (AR · EN · FR · TR · ID)
PWA:        next-pwa

Backend:    Supabase (PostgreSQL · Realtime · Storage · Edge Functions)
Auth:       Email · Google · Apple · Anonymous
Hosting:    Vercel (Frontend) · Supabase (Backend)
Analytics:  PostHog
Monitoring: Sentry
```

---

## 🗂️ هيكل المجلدات

```
src/
├── app/
│   ├── (auth)/          # Login, Register, Onboarding
│   ├── (dashboard)/     # Home, Profile, Settings
│   ├── tasbeeh/         # عداد التسبيح
│   ├── quran/           # القرآن الكريم
│   ├── azkar/           # الأذكار
│   ├── prayer/          # مواقيت الصلاة والقبلة
│   ├── memorial/        # صفحات الأثر
│   ├── community/       # المجتمع والتحديات
│   └── admin/           # لوحة الإدارة
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── layout/          # Navbar, Sidebar, Footer
│   ├── memorial/        # Memorial-specific components
│   ├── quran/           # Quran reader components
│   ├── azkar/           # Azkar card components
│   ├── tasbeeh/         # Counter & animation
│   └── shared/          # Reusable cross-feature components
├── hooks/               # Custom React hooks
├── services/            # API layer (one file per domain)
├── store/               # Zustand stores
├── lib/                 # Utilities & Supabase client
├── types/               # TypeScript types & interfaces
└── middleware.ts        # Auth & route protection
```

---

## 🌍 اللغات المدعومة

| الرمز | اللغة | الاتجاه |
|------|-------|---------|
| `ar` | **العربية** *(الافتراضية)* | RTL ← |
| `en` | الإنجليزية | LTR → |
| `fr` | الفرنسية | LTR → |
| `tr` | التركية | LTR → |
| `id` | الإندونيسية | LTR → |

---

## 🗺️ خريطة التطوير (Roadmap)

```
V1 — الأساس
  ✅ التسبيح  ✅ الأذكار  ✅ القرآن  ✅ صفحات الأثر  ✅ الملف الشخصي

V2 — المجتمع
  ⏳ التحديات  ⏳ الإحصائيات  ⏳ العائلة  ⏳ الإشعارات

V3 — الذكاء الاصطناعي
  🔮 Athar AI  🔮 البحث الذكي  🔮 التوصيات  🔮 الرؤى الأسبوعية

V4 — التوسع
  📱 Android  📱 iOS  ⌚ Smart Watch  🖥️ Desktop App
```

---

## 👥 أدوار المستخدمين

| الدور | الصلاحيات |
|------|-----------|
| **Guest** | تصفح المحتوى العام فقط |
| **User** | جميع الميزات الأساسية |
| **Premium** | ميزات متقدمة وتخصيص |
| **Moderator** | مراجعة المحتوى والبلاغات |
| **Admin** | إدارة المنصة بالكامل |
| **Super Admin** | جميع الصلاحيات + الإعدادات النظامية |

---

## 🔒 الأمان

- ✅ JWT Authentication
- ✅ Row Level Security (RLS) على كل جداول قاعدة البيانات
- ✅ Rate Limiting على جميع الـ APIs
- ✅ Input Validation بـ Zod
- ✅ CSRF Protection
- ✅ Audit Logs لكل العمليات الحساسة
- ✅ Content Moderation بالذكاء الاصطناعي

---

## 📐 معايير الكود

```typescript
// Components → PascalCase
export const TasbeehCard = () => { ... }

// Hooks → use prefix + camelCase
export const useTasbeeh = () => { ... }

// Types → descriptive suffix
type TasbeehRecord = { ... }
interface UserProfile { ... }

// Constants → UPPER_SNAKE_CASE
const MAX_TASBEEH_COUNT = 9999

// Services → domain-based files
// services/tasbeeh.service.ts
// services/quran.service.ts
```

---

## 📝 ملاحظات مهمة للمطورين

> **IMPORTANT:** العربية هي اللغة الأساسية — جميع المحتوى والواجهة تبدأ بالعربية

> **IMPORTANT:** لا تستخدم lorem ipsum في أي مكان — لا تُشفِّر البيانات داخل الكود مباشرة

> **WARNING:** لا تعرض أي "عداد حسنات" أو تقديرات للثواب — هذا أمر غيبي

> **NOTE:** اسم "Memorial" داخل الكود يُكتب بـ memorial لكن يُعرض للمستخدم بـ "صفحة الأثر"

---

## 🏗️ بدء التطوير

```bash
# نسخ المشروع
git clone https://github.com/your-org/athar-islamic.git
cd athar-islamic

# تثبيت الحزم
npm install

# إعداد متغيرات البيئة
cp .env.example .env.local
# عدّل NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY

# تشغيل الخادم المحلي
npm run dev

# فتح المتصفح على http://localhost:3000
```

---

*بُني هذا التوثيق بعناية لكل مطور سيعمل على Athar Islamic.*
*اللهم اجعله في ميزان الحسنات.*

---

<div align="center">

تم التصميم بواسطة **[El Araby 360 Digital Agency](https://www.facebook.com/ElAraby360D)**

</div>

</div>

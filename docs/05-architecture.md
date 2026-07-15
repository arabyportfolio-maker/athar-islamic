# 05 — Frontend Architecture & Backend Structure
# بنية الكود الكاملة

**Athar Islamic · Version 1.0**

---

## 1. Tech Stack

### Frontend

| الحزمة | الاستخدام |
|--------|----------|
| **Next.js 15** (App Router) | الإطار الأساسي + SSR |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | التصميم والتنسيق |
| **shadcn/ui** | مكونات UI جاهزة |
| **Framer Motion** | الحركات والتحريكات |
| **Zustand** | إدارة الحالة العامة |
| **TanStack Query** | إدارة طلبات الـ API |
| **React Hook Form** | إدارة النماذج |
| **Zod** | التحقق من المدخلات |
| **next-intl** | الترجمة متعددة اللغات |
| **next-pwa** | Progressive Web App |

### Backend

| الخدمة | الاستخدام |
|--------|----------|
| **Supabase** | البنية التحتية الكاملة |
| **PostgreSQL** | قاعدة البيانات |
| **Edge Functions** | منطق الخادم |
| **Storage** | تخزين الملفات |
| **Realtime** | البيانات الحية |
| **Authentication** | نظام المصادقة |

---

## 2. هيكل المجلدات الكامل

```
src/
│
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── onboarding/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx          ← Dashboard Layout
│   │   ├── home/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   │
│   ├── tasbeeh/
│   │   └── page.tsx
│   │
│   ├── quran/
│   │   ├── page.tsx
│   │   └── [surah]/
│   │       └── page.tsx
│   │
│   ├── azkar/
│   │   ├── page.tsx
│   │   └── [category]/
│   │       └── page.tsx
│   │
│   ├── prayer/
│   │   └── page.tsx
│   │
│   ├── memorial/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── community/
│   │   └── page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx          ← Admin Layout
│   │   ├── page.tsx
│   │   ├── users/
│   │   ├── memorial/
│   │   ├── azkar/
│   │   ├── reports/
│   │   └── notifications/
│   │
│   ├── layout.tsx              ← Root Layout
│   ├── not-found.tsx           ← 404
│   ├── error.tsx               ← 500
│   └── offline/
│       └── page.tsx
│
├── components/
│   ├── ui/                     ← shadcn/ui base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── progress.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   │
│   ├── tasbeeh/
│   │   ├── TasbeehCounter.tsx
│   │   ├── TasbeehRipple.tsx
│   │   ├── TasbeehHistory.tsx
│   │   └── TasbeehGoal.tsx
│   │
│   ├── quran/
│   │   ├── QuranReader.tsx
│   │   ├── SurahCard.tsx
│   │   ├── AyahCard.tsx
│   │   └── QuranSearch.tsx
│   │
│   ├── azkar/
│   │   ├── DhikrCard.tsx
│   │   ├── AzkarCategory.tsx
│   │   └── AzkarAudio.tsx
│   │
│   ├── memorial/
│   │   ├── MemorialCard.tsx
│   │   ├── MemorialForm.tsx
│   │   ├── TreeOfImpact.tsx
│   │   ├── ParticipantList.tsx
│   │   └── QRCode.tsx
│   │
│   ├── cards/
│   │   ├── PrayerCard.tsx
│   │   ├── GoalCard.tsx
│   │   ├── StatCard.tsx
│   │   └── ChallengeCard.tsx
│   │
│   └── shared/
│       ├── LoadingSkeleton.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       ├── LanguageSwitcher.tsx
│       └── ThemeSwitcher.tsx
│
├── hooks/
│   ├── useTasbeeh.ts
│   ├── useQuran.ts
│   ├── useAzkar.ts
│   ├── usePrayer.ts
│   ├── useMemorial.ts
│   ├── useChallenges.ts
│   ├── useNotifications.ts
│   └── useUser.ts
│
├── services/
│   ├── auth.service.ts
│   ├── profile.service.ts
│   ├── tasbeeh.service.ts
│   ├── quran.service.ts
│   ├── azkar.service.ts
│   ├── memorial.service.ts
│   ├── challenge.service.ts
│   └── notification.service.ts
│
├── store/
│   ├── authStore.ts
│   ├── themeStore.ts
│   ├── tasbeehStore.ts
│   ├── userStore.ts
│   ├── notificationStore.ts
│   ├── settingsStore.ts
│   ├── memorialStore.ts
│   └── challengeStore.ts
│
├── lib/
│   ├── supabase.ts             ← Supabase Client
│   ├── utils.ts
│   └── constants.ts
│
├── types/
│   ├── user.types.ts
│   ├── memorial.types.ts
│   ├── tasbeeh.types.ts
│   ├── quran.types.ts
│   ├── azkar.types.ts
│   └── challenge.types.ts
│
├── utils/
│   ├── formatDate.ts
│   ├── prayerUtils.ts
│   ├── quranUtils.ts
│   └── imageUtils.ts
│
├── styles/
│   └── globals.css
│
├── assets/
│   ├── icons/
│   └── images/
│
└── middleware.ts
```

---

## 3. Naming Conventions

```typescript
// ✅ Components → PascalCase
export const TasbeehCard = () => {}
export const MemorialForm = () => {}

// ✅ Hooks → use + camelCase
export const useTasbeeh = () => {}
export const useMemorial = () => {}

// ✅ Functions → camelCase
const formatDate = () => {}
const calculateStreak = () => {}

// ✅ Types → PascalCase + Type/Interface
type TasbeehRecord = {}
type MemorialPage = {}
interface UserProfile {}

// ✅ Enums → PascalCase
enum MemorialVisibility {
  Public = 'public',
  Private = 'private',
  Family = 'family',
}

// ✅ Constants → UPPER_SNAKE_CASE
const MAX_TASBEEH_COUNT = 9999
const DEFAULT_LANGUAGE = 'ar'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
```

---

## 4. Layout System

```
Root Layout (app/layout.tsx)
│   ├── ThemeProvider
│   ├── I18nProvider
│   └── QueryClientProvider
│
├── Auth Layout (app/(auth)/layout.tsx)
│       └── AuthCard wrapper
│
├── Dashboard Layout (app/(dashboard)/layout.tsx)
│       ├── Navbar
│       ├── Sidebar
│       ├── Footer
│       ├── ToastProvider
│       └── DialogProvider
│
└── Admin Layout (app/admin/layout.tsx)
        ├── AdminNavbar
        ├── AdminSidebar
        └── AuditLogger
```

---

## 5. State Management — Zustand Stores

```typescript
// store/authStore.ts
interface AuthStore {
  user: User | null
  session: Session | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void
}

// store/tasbeehStore.ts
interface TasbeehStore {
  count: number
  sessionCount: number
  selectedDhikr: string
  increment: () => void
  reset: () => void
  setDhikr: (dhikr: string) => void
}

// store/themeStore.ts
interface ThemeStore {
  theme: 'emerald' | 'dark' | 'gold' | 'light'
  setTheme: (theme: string) => void
}

// store/memorialStore.ts
interface MemorialStore {
  pages: MemorialPage[]
  currentPage: MemorialPage | null
  participants: Participant[]
  setCurrentPage: (page: MemorialPage) => void
}
```

---

## 6. API Services Pattern

```typescript
// services/tasbeeh.service.ts
import { supabase } from '@/lib/supabase'
import type { TasbeehRecord } from '@/types/tasbeeh.types'

export const tasbeehService = {
  // إضافة تسبيحة
  async create(data: Partial<TasbeehRecord>) {
    const { data: record, error } = await supabase
      .from('tasbeeh_records')
      .insert(data)
      .select()
      .single()
    if (error) throw error
    return record
  },

  // جلب السجل
  async getHistory(userId: string) {
    const { data, error } = await supabase
      .from('tasbeeh_records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // الإحصائيات
  async getStatistics(userId: string) {
    const { data, error } = await supabase
      .from('statistics')
      .select('tasbeeh_total, best_day')
      .eq('user_id', userId)
      .single()
    if (error) throw error
    return data
  },
}
```

---

## 7. Form Pattern

```typescript
// مثال: نموذج إنشاء صفحة أثر
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const memorialSchema = z.object({
  person_name: z.string().min(2, 'الاسم قصير جدًا'),
  gender: z.enum(['male', 'female']),
  biography: z.string().optional(),
  birth_date: z.string().optional(),
  death_date: z.string().optional(),
  visibility: z.enum(['public', 'private', 'family']).default('public'),
})

type MemorialFormData = z.infer<typeof memorialSchema>

export const MemorialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemorialFormData>({
    resolver: zodResolver(memorialSchema),
  })

  const onSubmit = async (data: MemorialFormData) => {
    // ... إرسال البيانات
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* حقول النموذج */}
    </form>
  )
}
```

---

## 8. Routing المسارات

```
/                           ← الصفحة الرئيسية
/login                      ← تسجيل الدخول
/register                   ← إنشاء حساب
/onboarding                 ← الإعداد الأولي

/home                       ← لوحة المستخدم
/tasbeeh                    ← عداد التسبيح
/quran                      ← القرآن الكريم
/quran/[surah]              ← سورة محددة
/azkar                      ← الأذكار
/azkar/[category]           ← تصنيف محدد
/prayer                     ← مواقيت الصلاة
/memorial                   ← صفحات الأثر
/memorial/new               ← إنشاء صفحة جديدة
/memorial/[slug]            ← صفحة أثر معينة
/community                  ← المجتمع
/challenges                 ← التحديات
/profile                    ← الملف الشخصي
/settings                   ← الإعدادات

/admin                      ← لوحة الإدارة
/admin/users                ← إدارة المستخدمين
/admin/memorial             ← إدارة الصفحات
/admin/azkar                ← إدارة الأذكار
/admin/reports              ← البلاغات
/admin/notifications        ← الإشعارات
```

---

## 9. i18n — الترجمة متعددة اللغات

```typescript
// messages/ar.json (الافتراضي)
{
  "common": {
    "save": "حفظ",
    "cancel": "إلغاء",
    "delete": "حذف",
    "loading": "جارٍ التحميل..."
  },
  "tasbeeh": {
    "title": "التسبيح",
    "counter": "العداد",
    "history": "السجل",
    "reset": "إعادة تعيين"
  },
  "memorial": {
    "title": "صفحة الأثر",
    "create": "إنشاء صفحة جديدة",
    "participants": "المشاركون",
    "share": "مشاركة"
  }
}
```

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['ar', 'en', 'fr', 'tr', 'id'],
  defaultLocale: 'ar',
  localePrefix: 'as-needed',     // العربية لا تحتاج prefix
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
```

---

## 10. نظام الثيمات (Themes)

```typescript
// styles/themes.ts
export const themes = {
  emerald: {
    primary: '#059669',
    secondary: '#D4A017',
    background: '#FAFAF8',
    card: '#FFFFFF',
    text: '#1A1A1A',
  },
  dark: {
    primary: '#10B981',
    secondary: '#F59E0B',
    background: '#0D0D0D',
    card: '#1A1A1A',
    text: '#F5F5F5',
  },
  gold: {
    primary: '#D4A017',
    secondary: '#059669',
    background: '#FDF8F0',
    card: '#FFFBF0',
    text: '#2D2000',
  },
  light: {
    primary: '#047857',
    secondary: '#B7791F',
    background: '#FFFFFF',
    card: '#F9FAFB',
    text: '#111827',
  },
}
```

---

## 11. Performance

```typescript
// Dynamic Imports للصفحات الكبيرة
const QuranReader = dynamic(() => import('@/components/quran/QuranReader'), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
})

// Image Optimization
import Image from 'next/image'
<Image
  src={memorial.photo}
  alt={memorial.person_name}
  width={200}
  height={200}
  className="rounded-full"
  placeholder="blur"
/>

// Server Components للبيانات الثابتة
// app/azkar/page.tsx
export default async function AzkarPage() {
  const azkar = await getAzkar()   // Server-side fetch
  return <AzkarList data={azkar} />
}
```

---

## 12. معايير الكود (Coding Standards)

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react/no-danger": "error"
  }
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

## 13. المنتجات الثلاثة (Future Vision)

```
Athar Personal    ← للأفراد (الأذكار · القرآن · الأهداف الشخصية)
       +
Athar Legacy      ← صفحات الأثر والعائلة
       +
Athar Community   ← التحديات الجماعية والمساجد والمؤسسات
```

> هذا التقسيم يجعل المشروع قابلًا للتوسع دون الحاجة لإعادة تصميم النظام من الصفر.

---

## 14. متغيرات البيئة

```env
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# App
NEXT_PUBLIC_APP_URL=https://athar-islamic.com
NEXT_PUBLIC_DEFAULT_LOCALE=ar

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...

# Sentry Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## 15. PWA Configuration

```js
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*supabase\.co\/.*/i,
      handler: 'NetworkFirst',
      options: { cacheName: 'supabase-cache' },
    },
  ],
})

module.exports = withPWA({
  experimental: { appDir: true },
})
```

```json
// public/manifest.json
{
  "name": "أثر إسلامي",
  "short_name": "أثر",
  "lang": "ar",
  "dir": "rtl",
  "theme_color": "#059669",
  "background_color": "#FAFAF8",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

<div align="center">

تم التصميم بواسطة **[El Araby 360 Digital Agency](https://www.facebook.com/ElAraby360D)**

</div>

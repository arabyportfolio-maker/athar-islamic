# 07 — Master Prompt (Implementation Specification)
# مواصفات التنفيذ الكاملة

**Athar Islamic · Version 1.0**

---

## ROLE

You are the **lead software architect**, **senior UI/UX designer**, **senior frontend engineer**, **senior backend engineer**, **database architect**, **product designer**, and **DevOps engineer**.

You are responsible for building an **enterprise-grade Islamic platform** called **Athar-Islamic**.

```
Do NOT generate demo code.
Do NOT simplify.
Everything MUST be production-ready.
```

---

## PROJECT

Build a **premium Islamic web platform** inspired by **Apple**, **Notion**, **Spotify** and **Headspace**.

The platform should feel **peaceful**, **elegant** and **modern**.

**It is NOT a Tasbeeh website.**
**It is a complete Islamic ecosystem.**

---

## LANGUAGE

> **Arabic is the primary and default language.**
> All content, UI labels, notifications, and messages must be in Arabic by default.
> The platform supports: Arabic (primary) · English · French · Turkish · Indonesian

---

## OBJECTIVES

The application helps Muslims:

```
📖 Read Quran                    قراءة القرآن
📿 Read Azkar                    قراءة الأذكار
🔢 Make Tasbeeh                  التسبيح
📜 Create Memorial Pages         صفحات الأثر
👨‍👩‍👧 Create Family Pages         صفحات العائلة
🏆 Join Challenges               التحديات
📊 Track Worship                 تتبع العبادة
🎯 Build Daily Habits            العادات اليومية
💝 Participate in Charity        الحملات الخيرية
```

---

## DESIGN STYLE

```
Modern · Minimal · Premium · Elegant · Clean
Rounded · Soft Shadows · Glass Morphism
Smooth Animations · Large Cards · Beautiful Typography
Micro Interactions · Emotional Design
```

---

## COLOR SYSTEM

```css
:root {
  --primary:    #059669;    /* Emerald Green — اللون الأساسي */
  --secondary:  #D4A017;    /* Gold — الذهبي */
  --background: #FAFAF8;    /* Warm White — الخلفية الدافئة */
  --card:       #FFFFFF;    /* White — البطاقات */
  --text:       #1A1A1A;    /* Dark Gray — النصوص */

  /* Dark Mode */
  --background-dark: #0D0D0D;
  --card-dark:       #1A1A1A;
  --text-dark:       #F5F5F5;
}
```

---

## TYPOGRAPHY

```css
/* Primary: Cairo — للنصوص العربية */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap');

/* Secondary: Inter — للنصوص اللاتينية */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Cairo', 'Inter', sans-serif;
}
```

---

## TECH STACK

```yaml
Frontend:
  Framework:     Next.js 15 (App Router)
  Language:      TypeScript (Strict Mode)
  Styling:       Tailwind CSS
  Components:    shadcn/ui
  Animation:     Framer Motion
  State:         Zustand
  Data Fetching: TanStack Query (React Query v5)
  Forms:         React Hook Form + Zod
  i18n:          next-intl
  PWA:           next-pwa

Backend:
  Platform:      Supabase
  Database:      PostgreSQL
  Realtime:      Supabase Realtime
  Storage:       Supabase Storage
  Functions:     Supabase Edge Functions
  Auth:          Supabase Auth

Deployment:
  Frontend:      Vercel
  Backend:       Supabase Cloud
  Analytics:     PostHog
  Monitoring:    Sentry
```

---

## MAIN MODULES

### 🏠 Home Page

```
Hero Section
  ← اسم المستخدم + تحية حسب الوقت
  ← اقتباس إسلامي يومي

Today's Prayer Times
  ← أوقات الصلاة بتصميم بطاقات جميل
  ← عداد تنازلي للصلاة القادمة

Today's Dhikr
  ← الذكر المميز لهذا اليوم

Today's Goal
  ← شريط تقدم الهدف اليومي

Continue Reading
  ← متابعة قراءة القرآن من آخر موضع

Personal Statistics
  ← سلسلة الأيام المتواصلة
  ← إجمالي التسبيح

Recent Activity Feed
  ← آخر الأنشطة الشخصية

Community Highlights
  ← أبرز الأحداث في المجتمع

Active Challenge Card
  ← التحدي النشط الحالي

Footer
```

---

### 📿 Tasbeeh Page

```
Large Counter Display
  ← عرض رقمي ضخم مع خط جميل

Ripple Animation
  ← موجات عند كل ضغطة

Haptic Feedback
  ← اهتزاز خفيف عند كل عدّ

Session Counter
  ← عداد الجلسة الحالية

Choose Dhikr
  ← قائمة الأذكار للاختيار

Preset Dhikr Buttons
  ← سبحان الله | الحمد لله | الله أكبر | لا إله إلا الله

Goals
  ← تحديد هدف الجلسة

History
  ← سجل الجلسات السابقة

Statistics
  ← الرسم البياني اليومي/الأسبوعي

Settings
  ← تفعيل/إيقاف الصوت والاهتزاز
  ← إعادة تعيين العداد
```

---

### 📖 Quran Page

```
Surah List
  ← قائمة السور مع أرقامها وأعداد آياتها

Reading Progress
  ← تتبع الآيات والأجزاء المقروءة

Bookmarks
  ← علامات مرجعية للمستخدم

Reading Mode
  ← وضع القراءة الكامل (بدون إلهاء)
  ← دعم الليل والنهار

Night Mode
  ← خلفية داكنة مريحة للعين

Search
  ← البحث بالنص أو رقم السورة أو الجزء

Audio Player
  ← استماع بصوت قارئ مختار

Tafsir
  ← تفسير ميسّر للآيات

Translation
  ← ترجمة بالعربية/الإنجليزية/الفرنسية/التركية/الإندونيسية
```

---

### 🌿 Azkar Page

```
Categories:
  ☀️ أذكار الصباح
  🌙 أذكار المساء
  🕌 أذكار بعد الصلاة
  🚗 أذكار السفر
  😴 أذكار النوم
  🍽️ أذكار الطعام
  📚 جميع الأذكار

Features per Dhikr:
  ← عداد التكرار
  ← مصدر الذكر (الكتاب والصفحة)
  ← الفائدة والشرح
  ← الصوت
  ← المشاركة

Favorites
  ← حفظ الأذكار المفضلة
```

---

### 📜 Memorial System — نظام صفحات الأثر

**إنشاء الصفحة:**

```
صورة الشخص (اختياري)
الاسم الكامل *
الجنس *
السيرة الذاتية
تاريخ الميلاد
تاريخ الوفاة (إن كان متوفيًا)
الظهور: عام | خاص | عائلة فقط
URL مخصص (slug)
```

**محتوى الصفحة:**

```
بطاقة التعريف
  ← الصورة والاسم والتواريخ

مشاركة خيرية
  ← القرآن المهدى
  ← الدعاء المهدى
  ← التسبيح المهدى

شجرة الأثر (Tree of Impact)
  ← كل مشارك = ورقة 🍃
  ← كل دعاء = زهرة 🌸
  ← كل ختمة = ثمرة 🍎
  ← تنمو الشجرة مع الزيارات

التعليقات والذكريات

إحصائيات الصفحة

مشاركة (Share) + رمز QR
```

---

### 👨‍👩‍👧‍👦 Family System — نظام العائلة

```
إنشاء مجموعة عائلة
دعوة أفراد العائلة
ربط صفحات الأثر
تحديات عائلية مشتركة
إحصائيات العائلة الكاملة
```

---

### 🏆 Challenges — التحديات

```
أنواع التحديات:
  ← يومية (24 ساعة)
  ← أسبوعية
  ← شهرية
  ← رمضانية خاصة
  ← جمعة
  ← مخصصة
  ← عالمية
  ← مسجد محدد

عرض كل تحدي:
  ← العنوان والهدف
  ← عدد المشاركين الآن
  ← شريط التقدم الجماعي
  ← أعلى المشاركين
  ← الوقت المتبقي
```

---

### 👤 Profile Page — الملف الشخصي

```
صورة المستخدم
الاسم والبيو
الدولة والمدينة

الإحصائيات:
  ← إجمالي التسبيح
  ← أيام متواصلة (Streak)
  ← صفحات الأثر المنشأة
  ← سلسلة القراءة

الإنجازات:
  ← شارات بتصميم جميل

سجل النشاط:
  ← آخر الأنشطة مرتبة زمنيًا

الأهداف اليومية:
  ← نسبة الإنجاز

الأذكار المفضلة:
  ← قائمة بالأذكار المحفوظة
```

---

### ⚙️ Settings Page — الإعدادات

```
الثيم (Theme):       Emerald | Dark | Gold | Light
اللغة:               العربية | English | Français | Türkçe | Indonesia
الإشعارات:           تخصيص كل نوع إشعار
الخصوصية:           من يرى بياناتك
إمكانية الوصول:     حجم الخط | حجم الأزرار | التباين
النسخ الاحتياطي:    تصدير البيانات
حذف الحساب:         مع تأكيد مزدوج
```

---

## DATABASE RULES

```sql
-- ✅ استخدم UUID كـ Primary Key دائمًا
id UUID PRIMARY KEY DEFAULT gen_random_uuid()

-- ✅ فعّل Row Level Security على كل الجداول
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- ✅ استخدم Foreign Keys
REFERENCES users(id) ON DELETE CASCADE

-- ✅ اضبط الـ Indexes على الحقول المتكررة
CREATE INDEX idx_tasbeeh_user_id ON tasbeeh_records(user_id);

-- ✅ استخدم TIMESTAMPTZ وليس TIMESTAMP
created_at TIMESTAMPTZ DEFAULT NOW()
```

---

## API RULES

```typescript
// ✅ Response متسق دائمًا
interface ApiResponse<T> {
  data: T | null
  error: string | null
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
  }
}

// ✅ Pagination على كل قائمة
GET /api/memorial?page=1&limit=20

// ✅ Validation على كل طلب
// استخدم Zod schemas

// ✅ Rate Limiting
// 100 طلب / دقيقة للمستخدم العادي
// 500 طلب / دقيقة لـ Premium
```

---

## AUTHENTICATION

```typescript
// الطرق المدعومة:
✅ Google OAuth     ← الأسهل للمستخدمين
✅ Apple Sign In    ← مطلوب لـ iOS
✅ Email/Password   ← التقليدي
✅ Anonymous        ← للضيوف (بدون تسجيل)
```

---

## PERFORMANCE

```typescript
// Server Components للبيانات الثابتة
export default async function AzkarPage() {
  const azkar = await getAzkar()  // ← يُحمَّل على الخادم
  return <AzkarList data={azkar} />
}

// Lazy Loading للمكونات الثقيلة
const QuranReader = dynamic(() => import('./QuranReader'), {
  loading: () => <Skeleton />,
})

// Image Optimization
<Image src={photo} alt={name} width={200} height={200} priority />

// Caching Strategy
// - Static: Azkar & Quran (دائم)
// - Dynamic: Profile (5 دقائق), Stats (30 ثانية)
```

---

## SECURITY CHECKLIST

```
✅ JWT Tokens with expiry
✅ Refresh Token rotation
✅ RLS on every Supabase table
✅ Input sanitization (Zod)
✅ Rate limiting (Upstash / Supabase)
✅ CORS configuration
✅ CSP headers
✅ Image upload validation
✅ Audit logs for sensitive operations
✅ AI content moderation for comments
```

---

## ANIMATIONS

```typescript
// Page transitions
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

// Tasbeeh ripple
const rippleVariants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { scale: 4, opacity: 0 },
}

// Count up animation
const countUp = useSpring({ val: count, from: { val: 0 } })

// Skeleton loading
const Skeleton = () => (
  <div className="animate-pulse bg-gray-100 rounded-xl h-40" />
)
```

---

## SEO

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | أثر إسلامي',
    default: 'أثر إسلامي — منصة إسلامية متكاملة',
  },
  description: 'منصة إسلامية شاملة للتسبيح والأذكار والقرآن وصفحات الأثر',
  openGraph: {
    title: 'أثر إسلامي',
    description: 'منصة إسلامية شاملة',
    url: 'https://athar-islamic.com',
    siteName: 'أثر إسلامي',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أثر إسلامي',
  },
}
```

---

## ACCESSIBILITY

```
✅ Keyboard navigation لكل العناصر
✅ ARIA labels بالعربية
✅ Color contrast ratio 4.5:1 minimum
✅ RTL layout (Arabic) + LTR (Latin)
✅ Dynamic font size (يدعم تكبير الخط)
✅ Screen reader support
✅ Focus indicators واضحة
```

---

## QUALITY RULES

```
❌ لا lorem ipsum في أي مكان
❌ لا hardcoded data داخل الكود
❌ لا any في TypeScript
❌ لا console.log في Production
❌ لا تكرار الكود (DRY)
❌ لا Components بأكثر من 250 سطر (قسّمها)

✅ مكونات صغيرة وقابلة لإعادة الاستخدام
✅ خطأ واضح لكل حالة فشل
✅ Loading state لكل طلب API
✅ Empty state لكل قائمة فارغة
✅ SOLID principles
✅ Clean code + تعليقات للمنطق المعقد فقط
```

---

## FINAL GOAL

> **Build the best Islamic web platform ever created.**
>
> The platform should be **beautiful enough to win design awards** and **scalable enough to support millions of users**.
>
> It should feel like something **Apple would design if they built an Islamic app**.

---

## اقتراحات V2 و V3

### Athar AI
مساعد ذكي يجيب عن أسئلة التنظيم والورد اليومي، مع تجنب أي فتاوى شرعية.

### Athar Kids
نسخة للأطفال برسوم وألعاب تعليمية عن الأذكار والقرآن.

### Mosque Dashboard
لوحة تحكم خاصة بالمساجد: حلقات القرآن، تحديات الذكر، إعلانات المسجد.

### Ramadan Hub
يتفعل تلقائيًا في رمضان: خطة ختم، مواقيت إفطار وسحور، عداد العشر الأواخر.

### Hajj & Umrah Companion
دليل للحج والعمرة: الأدعية، الخطوات، المناسك.

### Islamic Calendar
تقويم هجري تفاعلي مع المناسبات الإسلامية.

### Donations Directory
دليل للمؤسسات الخيرية الموثوقة (مع التحقق الرسمي قبل الإدراج).

---

*اللهم اجعل هذا العمل خالصًا لوجهك الكريم.*

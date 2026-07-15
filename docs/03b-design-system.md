# 03b — Design System
# منظومة التصميم

**Athar Islamic · Version 1.0**

---

## الفلسفة التصميمية

> التصميم يجب أن يشعر المستخدم بـ **السكينة** · **الأناقة** · **القيمة**  
> مستوحى من: **Apple** في البساطة · **Notion** في التنظيم · **Headspace** في الهدوء

---

## 1. نظام الألوان

### الألوان الأساسية

```css
/* Primary — الأخضر الزمردي */
--primary-50:  #F0FDF4;
--primary-100: #DCFCE7;
--primary-200: #BBF7D0;
--primary-300: #86EFAC;
--primary-400: #4ADE80;
--primary-500: #22C55E;
--primary-600: #16A34A;
--primary-700: #059669;  /* ← اللون الرئيسي */
--primary-800: #065F46;
--primary-900: #064E3B;

/* Secondary — الذهبي */
--secondary-400: #FBBF24;
--secondary-500: #F59E0B;
--secondary-600: #D4A017;  /* ← الذهبي الرئيسي */
--secondary-700: #B45309;
```

### الثيمات الأربعة

```css
/* Emerald Theme (الافتراضي) */
.theme-emerald {
  --bg:       #FAFAF8;
  --card:     #FFFFFF;
  --text:     #1A1A1A;
  --muted:    #6B7280;
  --border:   #E5E7EB;
  --primary:  #059669;
  --accent:   #D4A017;
}

/* Dark Theme */
.theme-dark {
  --bg:       #0D0D0D;
  --card:     #1A1A1A;
  --text:     #F5F5F5;
  --muted:    #9CA3AF;
  --border:   #2D2D2D;
  --primary:  #10B981;
  --accent:   #F59E0B;
}

/* Gold Theme */
.theme-gold {
  --bg:       #FDF8F0;
  --card:     #FFFBF0;
  --text:     #2D2000;
  --muted:    #78650A;
  --border:   #F3E4B0;
  --primary:  #D4A017;
  --accent:   #059669;
}

/* Light Theme */
.theme-light {
  --bg:       #FFFFFF;
  --card:     #F9FAFB;
  --text:     #111827;
  --muted:    #6B7280;
  --border:   #E5E7EB;
  --primary:  #047857;
  --accent:   #B7791F;
}
```

### ألوان الحالات

```css
--success:  #10B981;   /* ✅ نجاح */
--warning:  #F59E0B;   /* ⚠️ تحذير */
--error:    #EF4444;   /* ❌ خطأ */
--info:     #3B82F6;   /* ℹ️ معلومة */
```

---

## 2. الطباعة (Typography)

```css
/* استيراد الخطوط */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

/* الخطوط */
--font-arabic: 'Cairo', sans-serif;   /* للنصوص العربية والواجهة */
--font-latin:  'Inter', sans-serif;   /* للأرقام والنصوص اللاتينية */
--font-quran:  'KFGQPC Uthmanic Script';  /* للنص القرآني */
```

### مقاسات النصوص

| الاسم | الحجم | الوزن | الاستخدام |
|------|------|------|---------|
| `display-xl` | 48px | 800 | العناوين الكبيرة |
| `display-lg` | 36px | 700 | العداد الرئيسي |
| `h1` | 28px | 700 | عناوين الصفحات |
| `h2` | 22px | 600 | عناوين الأقسام |
| `h3` | 18px | 600 | عناوين البطاقات |
| `body-lg` | 16px | 400 | نصوص رئيسية |
| `body` | 14px | 400 | نصوص عادية |
| `body-sm` | 12px | 400 | نصوص صغيرة |
| `caption` | 11px | 400 | تعليقات |

### حجم نص القرآن

```css
.quran-text {
  font-family: 'KFGQPC Uthmanic Script', serif;
  font-size: clamp(20px, 4vw, 28px);
  line-height: 2.2;
  letter-spacing: 0;
  direction: rtl;
}
```

---

## 3. المسافات (Spacing)

```css
/* نظام 4px */
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

---

## 4. الزوايا (Border Radius)

```css
--radius-sm:  8px;    /* حقول الإدخال */
--radius-md:  12px;   /* البطاقات الصغيرة */
--radius-lg:  16px;   /* البطاقات الكبيرة */
--radius-xl:  24px;   /* البطاقات الرئيسية */
--radius-2xl: 32px;   /* الشاشات الكاملة */
--radius-full: 9999px; /* الأزرار الدائرية */
```

---

## 5. الظلال (Shadows)

```css
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
--shadow-md:  0 4px 6px rgba(0,0,0,0.07);
--shadow-lg:  0 10px 15px rgba(0,0,0,0.10);
--shadow-xl:  0 20px 25px rgba(0,0,0,0.12);

/* ظل ملون للعناصر Primary */
--shadow-primary: 0 8px 24px rgba(5, 150, 105, 0.25);
--shadow-gold:    0 8px 24px rgba(212, 160, 23, 0.25);
```

---

## 6. الحركات (Animations)

```css
/* مدد الحركة */
--duration-fast:   150ms;
--duration-normal: 250ms;
--duration-slow:   400ms;
--duration-slower: 600ms;

/* منحنيات الحركة */
--ease-out:    cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* للأزرار */
```

### حركات Framer Motion

```typescript
// Page Transition
const pageVariants = {
  initial:  { opacity: 0, y: 8 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit:     { opacity: 0, y: -8 },
}

// Card Hover
const cardHover = {
  whileHover: { scale: 1.02, y: -2 },
  transition: { type: 'spring', stiffness: 300, damping: 20 },
}

// Ripple Effect (Tasbeeh)
const rippleVariants = {
  initial:  { scale: 0, opacity: 0.6 },
  animate:  { scale: 4, opacity: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

// Count Up
const useCountUp = (target: number) => {
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  useEffect(() => spring.set(target), [target])
  return useTransform(spring, Math.round)
}

// Skeleton Pulse
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}
.skeleton { animation: pulse 1.5s ease-in-out infinite; }
```

---

## 7. المكونات الأساسية (Base Components)

### Button

```typescript
// أنواع الأزرار
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type ButtonSize    = 'sm' | 'md' | 'lg' | 'xl'

// أمثلة
<Button variant="primary" size="lg">   // أخضر ممتلئ
<Button variant="secondary" size="md"> // ذهبي ممتلئ
<Button variant="ghost" size="sm">     // شفاف بحدود
<Button variant="danger" size="md">    // أحمر (حذف / خروج)
```

### Card

```typescript
// أنواع البطاقات
type CardVariant = 'default' | 'elevated' | 'glass' | 'bordered'

// Glass Card (للصلاة وبعض العناصر)
.card-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Input

```css
/* حالات حقل الإدخال */
.input-default { border: 1px solid var(--border); }
.input-focused  { border: 2px solid var(--primary); box-shadow: 0 0 0 3px rgba(5,150,105,0.1); }
.input-error    { border: 2px solid var(--error); }
.input-success  { border: 2px solid var(--success); }
```

### Badge

```typescript
type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'gold' | 'premium'

// مثال: حالة الصفحة
<Badge variant="success">نشطة</Badge>
<Badge variant="warning">بانتظار</Badge>
<Badge variant="error">موقوفة</Badge>
<Badge variant="gold">Premium</Badge>
```

---

## 8. Iconography (الأيقونات)

```
المكتبة: Lucide React (الأساسية) + SVG مخصصة

أيقونات المنصة:
  🕌  mosque      ← الصلاة
  📿  beads       ← التسبيح
  📖  quran       ← القرآن
  🌿  leaf        ← الأذكار / الأثر
  📜  scroll      ← صفحات الأثر
  🌳  tree        ← شجرة الأثر
  🏆  trophy      ← التحديات
  ⭐  star        ← المفضلة
  🔔  bell        ← الإشعارات
  👤  user        ← الملف الشخصي
```

---

## 9. Grid System

```css
/* Mobile First */
.container {
  width: 100%;
  max-width: 480px;    /* Mobile */
  margin: 0 auto;
  padding: 0 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .container { max-width: 768px; padding: 0 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1280px; padding: 0 32px; }
}
```

---

## 10. RTL / LTR Support

```css
/* العناصر المرايا تلقائيًا مع dir="rtl" */
[dir="rtl"] .arrow-icon  { transform: scaleX(-1); }
[dir="rtl"] .timeline    { border-right: 2px solid; border-left: none; }
[dir="rtl"] .progress    { direction: rtl; }

/* Tailwind RTL Classes */
/* rtl:text-right, rtl:flex-row-reverse, rtl:mr-auto, etc. */
```

---

## 11. Accessibility

```css
/* Focus Ring */
:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Minimum touch target */
.btn, .card-clickable, [role="button"] {
  min-height: 44px;
  min-width: 44px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. Tailwind CSS Configuration

```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          50:  '#F0FDF4',
          500: '#22C55E',
          700: '#059669',
          900: '#064E3B',
        },
        gold: {
          DEFAULT: '#D4A017',
          400: '#FBBF24',
          600: '#D4A017',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
        latin:  ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl':  '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'primary': '0 8px 24px rgba(5, 150, 105, 0.25)',
        'gold':    '0 8px 24px rgba(212, 160, 23, 0.25)',
      },
    },
  },
}
```

---

<div align="center">

تم التصميم بواسطة **[El Araby 360 Digital Agency](https://www.facebook.com/ElAraby360D)**

</div>

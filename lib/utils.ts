// ── Utilities ────────────────────────────────────────────────────
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'م'
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'ألف'
  return n.toLocaleString('ar-EG')
}

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 6)  return 'طيّب الليل 🌙'
  if (h < 12) return 'صباح الخير ☀️'
  if (h < 17) return 'مرحباً 🌿'
  if (h < 20) return 'مساء الخير 🌅'
  return 'طيّب المساء 🌙'
}

export function getHijriDate(): string {
  try {
    return new Date().toLocaleDateString('ar-SA-u-ca-islamic', {
      day:'numeric', month:'long', year:'numeric'
    })
  } catch { return '' }
}

export function getArabicDate(): string {
  return new Date().toLocaleDateString('ar-EG', {
    weekday:'long', day:'numeric', month:'long', year:'numeric'
  })
}

export function timeAgo(date: string): string {
  const d = new Date(date)
  const diff = Date.now() - d.getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'الآن'
  if (m < 60) return `منذ ${m} دقيقة`
  const h = Math.floor(m / 60)
  if (h < 24) return `منذ ${h} ساعة`
  return `منذ ${Math.floor(h/24)} يوم`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .slice(0, 60)
}

export function generateQRData(slug: string): string {
  return `https://athar-islamic.com/legacy/${slug}`
}

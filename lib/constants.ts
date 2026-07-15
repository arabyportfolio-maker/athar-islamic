export const APP_NAME = 'أثر إسلامي'
export const APP_URL  = 'https://athar-islamic.com'
export const WHATSAPP_NUMBER = '201121827680'

export const PRAYER_NAMES: Record<string, string> = {
  fajr:'الفجر', dhuhr:'الظهر', asr:'العصر', maghrib:'المغرب', isha:'العشاء'
}

// بيانات تجريبية لمواقيت الصلاة
export const MOCK_PRAYER_TIMES = {
  fajr:'04:52', dhuhr:'12:18', asr:'15:43', maghrib:'18:21', isha:'19:48',
  next: 'maghrib',
}

// إحصائيات المجتمع التجريبية
export const MOCK_COMMUNITY_STATS = {
  onlineNow: 3421,
  tasbeehToday: 245_980_000,
  memorialPages: 18_542,
  totalUsers: 125_430,
}

// بيانات تحديات تجريبية
export const MOCK_CHALLENGES = [
  { id:'c1', title:'مليون استغفار', desc:'تحدٍّ يومي جماعي', progress:78, joined:8421, total:1_000_000, timeLeft:'8 ساعات', joined_by_user:true,  userProgress:350, color:'#059669' },
  { id:'c2', title:'ختمة أسبوعية', desc:'اقرأ القرآن كاملاً في أسبوع', progress:62, joined:2100, total:114, timeLeft:'5 أيام', joined_by_user:false, userProgress:0,   color:'#6366F1' },
  { id:'c3', title:'ورد الفجر', desc:'أذكار الصباح 7 أيام متواصلة', progress:91, joined:12500, total:7, timeLeft:'يومياً', joined_by_user:true,  userProgress:5,   color:'#F59E0B' },
]

// صفحات أثر تجريبية
export const MOCK_MEMORIAL_PAGES = [
  { id:'p1', slug:'mohammed-abdullah', name:'محمد عبد الله',    photo:'', participants:1245, tasbeeh:87432, type:'deceased', date:'١٩٤٥ — ٢٠٢٤', country:'مصر',         bio:'كان رجلاً صالحاً يحب الخير ويحب مساعدة الناس...' },
  { id:'p2', slug:'fatima-ali',        name:'فاطمة علي',        photo:'', participants:432,  tasbeeh:23100, type:'deceased', date:'١٩٦٠ — ٢٠٢٣', country:'السعودية',    bio:'أم كريمة وامرأة صالحة...' },
  { id:'p3', slug:'ahmed-family',      name:'عائلة أحمد',       photo:'', participants:89,   tasbeeh:5400,  type:'family',   date:'',             country:'الكويت',      bio:'صفحة عائلية مشتركة للأهداف والورد اليومي' },
  { id:'p4', slug:'quran-for-gaza',    name:'ختمة لأهل غزة',   photo:'', participants:45821, tasbeeh:2_100_000, type:'campaign', date:'', country:'',          bio:'حملة جماعية لقراءة القرآن والدعاء لأهل غزة' },
]

// أشخاص لوحة المتصدرين
export const MOCK_LEADERBOARD = [
  { rank:1, name:'أحمد محمد',     country:'🇪🇬', count:1_245_632 },
  { rank:2, name:'فاطمة علي',     country:'🇸🇦', count:987_432   },
  { rank:3, name:'عبد الرحمن',    country:'🇰🇼', count:876_123   },
  { rank:4, name:'مريم إبراهيم',  country:'🇲🇦', count:654_890   },
  { rank:5, name:'يوسف عمر',      country:'🇹🇷', count:543_210   },
]

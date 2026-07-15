/**
 * Supabase Client Configuration
 * ─────────────────────────────────────────────────────
 * استبدل القيم التالية بـ project URL و anon key الخاصة بك من:
 * https://supabase.com/dashboard → Settings → API
 *
 * ملاحظة: هذا الملف يعمل في بيئة Static/Demo حالياً
 * لتفعيل قاعدة البيانات الحقيقية:
 * 1. أنشئ مشروعاً على supabase.com
 * 2. شغّل ملفات migration من docs/04-database.md
 * 3. ضع المتغيرات أدناه في ملف .env.local
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://your-project.supabase.co'
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Auth helpers ──────────────────────────────────────────────────────────────

export const signIn = async (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password })

export const signUp = async (email: string, password: string, fullName: string) =>
  supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })

export const signOut = () => supabase.auth.signOut()

export const getUser = () => supabase.auth.getUser()

export const signInWithGoogle = () =>
  supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/home` } })

// ── Memorial Pages ────────────────────────────────────────────────────────────

export const getMemorialPage = async (slug: string) => {
  const { data, error } = await supabase
    .from('memorial_pages')
    .select('*, participants(*), tasbeeh_records(*)')
    .eq('slug', slug)
    .single()
  return { data, error }
}

export const createMemorialPage = async (payload: {
  name:       string
  slug:       string
  bio?:       string
  type:       string
  visibility: string
  user_id:    string
}) => supabase.from('memorial_pages').insert(payload).select().single()

// ── Tasbeeh ───────────────────────────────────────────────────────────────────

export const saveTasbeehSession = async (session: {
  user_id:    string
  dhikr:      string
  count:      number
  page_id?:   string
}) => supabase.from('tasbeeh_records').insert(session)

export const getTodayTasbeeh = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('tasbeeh_records')
    .select('count')
    .eq('user_id', userId)
    .gte('created_at', today)
  const total = data?.reduce((sum, r) => sum + (r.count || 0), 0) || 0
  return { total, error }
}

// ── Community ────────────────────────────────────────────────────────────────

export const getCommunityStats = async () => {
  const { data, error } = await supabase
    .from('community_stats')
    .select('*')
    .single()
  return { data, error }
}

// ── Profile ───────────────────────────────────────────────────────────────────

export const updateProfile = async (userId: string, updates: {
  full_name?: string
  avatar?:    string
  country?:   string
  language?:  string
  theme?:     string
}) => supabase.from('profiles').update(updates).eq('user_id', userId)

export const getUserStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

'use client'
import { useState, useEffect, useRef, use } from 'react'
import { ChevronLeft, Loader2, Play, Pause, Settings2, Share2, BookOpen, ChevronRight, Check, Bookmark, Mic2, X, PlayCircle } from 'lucide-react'
import { ALL_SURAHS } from '@/data/quran-complete'
import { useQuranStore, RECITERS } from '@/store/quranStore'

interface Verse {
  number: number
  globalNumber: number
  arabic: string
  translation: string
  page: number
}

// Custom Ayah End SVG matching design
const AyahEnd = ({ num }: { num: number }) => (
  <span className="inline-flex items-center justify-center w-10 h-10 relative mx-2 align-middle">
    <svg className="absolute w-full h-full text-gold-500" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1"/>
    </svg>
    <span className="text-xs font-bold font-arabic relative z-10" style={{ color: 'inherit' }}>
      {num.toLocaleString('ar-EG')}
    </span>
  </span>
)

export default function SurahPage({ params }: { params: Promise<{ surah: string }> }) {
  const { surah } = use(params)
  const num = parseInt(surah) || 1
  const surahMeta = ALL_SURAHS.find(s => s.number === num)

  const { theme, setTheme, fontSize, setFontSize, reciterId, setReciterId, saveBookmark, getBookmark, removeBookmark } = useQuranStore()
  
  const currentReciter = RECITERS.find(r => r.id === reciterId) || RECITERS[0]
  
  const [verses, setVerses] = useState<Verse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showReciters, setShowReciters] = useState(false)
  
  const [selectedAyah, setSelectedAyah] = useState<Verse | null>(null)
  const [playingAyah, setPlayingAyah] = useState<Verse | null>(null)

  const ayahAudioRef = useRef<HTMLAudioElement | null>(null)

  const savedBookmark = getBookmark(num)

  const loadSurah = async () => {
    setLoading(true)
    setError(false)
    setVerses([])
    try {
      const arRes = await fetch(`https://api.alquran.cloud/v1/surah/${num}`, { cache: 'force-cache' })
      if (!arRes.ok) throw new Error('API error')
      const arData = await arRes.json()
      const arAyahs = arData?.data?.ayahs || []

      let mapped: Verse[] = arAyahs.map((a: any) => ({
        number: a.numberInSurah,
        globalNumber: a.number,
        arabic: a.text,
        translation: '',
        page: a.page || 1
      }))

      if (num !== 1 && num !== 9 && mapped[0] && mapped[0].arabic.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')) {
        mapped[0].arabic = mapped[0].arabic.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim()
      }

      setVerses(mapped)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadSurah() }, [num])

  // Sync audio player with state
  useEffect(() => {
    const audio = document.getElementById(`audio-player-${num}`) as HTMLAudioElement
    if (audio) {
      if (isPlaying) {
        // Pause ayah audio if surah starts playing
        if (playingAyah && ayahAudioRef.current) {
          ayahAudioRef.current.pause()
          setPlayingAyah(null)
        }
        audio.play().catch(e => {
          console.error("Audio play failed:", e)
          setIsPlaying(false)
        })
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, num, playingAyah])

  // Single Ayah playback sync
  useEffect(() => {
    if (ayahAudioRef.current) {
      if (playingAyah) {
        // Pause full surah if ayah starts
        if (isPlaying) setIsPlaying(false)
        ayahAudioRef.current.play().catch(console.error)
      } else {
        ayahAudioRef.current.pause()
      }
    }
  }, [playingAyah, isPlaying])

  // Scroll to bookmark on load
  useEffect(() => {
    if (!loading && verses.length > 0 && savedBookmark) {
      setTimeout(() => {
        const el = document.getElementById(`ayah-${savedBookmark.ayah}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 500)
    }
  }, [loading, verses.length, savedBookmark])

  const handleBookmarkToggle = () => {
    if (selectedAyah) {
      if (savedBookmark?.ayah === selectedAyah.number) {
        removeBookmark(num)
      } else {
        saveBookmark(num, selectedAyah.number, selectedAyah.page)
      }
      setSelectedAyah(null)
    }
  }

  if (!surahMeta) return (
    <div className="text-center p-12 font-sans text-red-500">
      سورة غير موجودة
    </div>
  )

  // Theme classes
  const bgClass = theme === 'dark' ? 'bg-gray-950 text-gray-200' : theme === 'warm' ? 'bg-[#FDF8F0] text-primary-900' : 'bg-warm-50 text-black'
  const cardBgClass = theme === 'dark' ? 'bg-gray-900 border-gray-800' : theme === 'warm' ? 'bg-[#FDF8F0] border-gold-400/20' : 'bg-white border-border-light'
  const textClass = theme === 'dark' ? 'text-gray-100' : 'text-primary-900'
  const highlightClass = theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gold-50/50'

  // Group verses by page
  const pagesMap = verses.reduce((acc, v) => {
    if (!acc[v.page]) acc[v.page] = []
    acc[v.page].push(v)
    return acc
  }, {} as Record<number, Verse[]>)
  
  const pages = Object.entries(pagesMap).map(([p, vs]) => ({ pageNum: Number(p), verses: vs }))

  const getAyahAudioUrl = (verse: Verse | null) => {
    if (!verse) return ''
    if (currentReciter.singleAyahProvider === 'everyayah') {
      return `https://everyayah.com/data/${currentReciter.ayahIdentifier}/${String(num).padStart(3, '0')}${String(verse.number).padStart(3, '0')}.mp3`
    }
    return `https://cdn.islamic.network/quran/audio/128/${currentReciter.ayahIdentifier}/${verse.globalNumber}.mp3`
  }

  return (
    <div className={`min-h-screen font-sans pb-32 transition-colors duration-300 ${bgClass}`} dir="rtl">
      
      {/* Hidden Audio for single Ayah */}
      <audio 
        ref={ayahAudioRef}
        src={getAyahAudioUrl(playingAyah)}
        onEnded={() => setPlayingAyah(null)}
      />

      {/* ── Header ───────────────────────────── */}
      <header className={`flex justify-between items-center px-6 py-6 shadow-sm sticky top-0 z-40 transition-colors ${theme === 'dark' ? 'bg-gray-950/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'}`}>
        <button onClick={() => setShowSettings(true)} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-warm-100 text-text-muted hover:text-primary'}`}>
          <Settings2 size={20} />
        </button>
        <div className="text-center">
          <h1 className={`text-xl font-bold leading-none mb-1 ${textClass}`}>سورة {surahMeta.name}</h1>
          <div className="text-xs text-text-muted font-semibold">{surahMeta.type} · {surahMeta.verses} آية</div>
        </div>
        <button onClick={() => window.history.back()} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-warm-100 text-text-muted hover:text-primary'}`}>
          <ChevronLeft size={20} />
        </button>
      </header>

      <div className="px-6 py-6">
        
        {/* ── Dua Before Reading ─────────────────────────── */}
        <div className={`rounded-2xl p-4 border flex items-start gap-4 mb-8 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-primary-50 border-primary-100'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${theme === 'dark' ? 'bg-gray-800 text-gold-400' : 'bg-white text-primary-600'}`}>
            <BookOpen size={20} />
          </div>
          <div>
            <div className={`text-sm font-bold mb-1 ${textClass}`}>دعاء قبل القراءة</div>
            <p className={`text-xs leading-relaxed font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-primary-700'}`}>
              اللهم افتح لي أبواب رحمتك، وأنطقني بالحكمة، واجعل لي في قلبي نوراً...
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="text-primary animate-spin" />
            <p className="text-text-muted font-bold">جاري تحميل السورة...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-200">
            <p className="text-red-500 font-bold mb-4">تعذّر تحميل الآيات</p>
            <button onClick={loadSurah} className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md">
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* ── Quran Text by Pages ────────────────────────── */}
        {!loading && !error && pages.map((pageData, index) => (
          <div key={pageData.pageNum} className={`rounded-3xl p-6 md:p-10 shadow-floating border relative overflow-hidden animate-enter mb-8 transition-colors ${cardBgClass}`}>
            
            {/* Bismillah Header (only on the first page of the Surah, if not Tawbah) */}
            {index === 0 && num !== 9 && (
              <div className={`relative flex justify-center items-center py-10 mb-8 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-border-light'}`}>
                {/* Decorative border matching Screen 14 */}
                <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center">
                   <svg width="300" height="100" viewBox="0 0 300 100" fill="none" stroke="#D4A017" strokeWidth="2">
                     <path d="M 0 50 Q 50 0 150 50 T 300 50" />
                   </svg>
                </div>
                <div className={`text-3xl md:text-4xl font-arabic leading-loose relative z-10 ${textClass}`}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              </div>
            )}

            <div className="text-justify leading-[3] relative" style={{ direction: 'rtl', textJustify: 'inter-word' }}>
              <p className={`font-arabic m-0 ${textClass}`} style={{ fontSize: `${fontSize}px` }}>
                {pageData.verses.map((v) => {
                  const isBookmarked = savedBookmark?.ayah === v.number
                  const isPlayingThis = playingAyah?.number === v.number
                  return (
                    <span 
                      key={v.number} 
                      id={`ayah-${v.number}`}
                      onClick={() => setSelectedAyah(v)}
                      className={`inline cursor-pointer transition-colors rounded relative ${isBookmarked ? (theme === 'dark' ? 'bg-gold-900/30 text-gold-400' : 'bg-gold-100 text-gold-800') : highlightClass} ${isPlayingThis ? 'text-primary-500' : ''}`}
                    >
                      {isPlayingThis && <PlayCircle className="inline-block w-4 h-4 mr-1 text-primary-500 animate-pulse" />}
                      {isBookmarked && <Bookmark className="inline-block w-4 h-4 ml-1 text-gold-500 fill-gold-500" />}
                      {v.arabic}
                      <AyahEnd num={v.number} />
                    </span>
                  )
                })}
              </p>
            </div>
            
            {/* Page Footer Label */}
            <div className={`mt-8 pt-4 border-t flex justify-center text-xs font-bold ${theme === 'dark' ? 'border-gray-800 text-gray-500' : 'border-border-light text-text-muted'}`}>
              صفحة {pageData.pageNum.toLocaleString('ar-EG')}
            </div>
          </div>
        ))}

      </div>

      {/* ── Audio Player Bottom Bar ──────────────────── */}
      <div className="fixed bottom-20 left-0 right-0 p-6 z-40 pointer-events-none">
        <div className="bg-primary-900 rounded-full p-3 flex items-center justify-between shadow-[0_10px_40px_rgba(6,78,59,0.3)] max-w-md mx-auto pointer-events-auto">
          
          <button 
            onClick={async () => {
              try {
                if (navigator.share) {
                  await navigator.share({
                    title: `سورة ${surahMeta.name}`,
                    text: `اقرأ سورة ${surahMeta.name} من تطبيق أثر إسلامي بصوت ${currentReciter.name}`,
                    url: window.location.href,
                  });
                } else {
                  await navigator.clipboard.writeText(window.location.href);
                  alert('تم نسخ الرابط!');
                }
              } catch (e) { console.error(e) }
            }}
            className="w-12 h-12 flex items-center justify-center text-primary-200 hover:text-white transition-colors">
            <Share2 size={22} />
          </button>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => { if (num < 114) window.location.href = `/quran/${num + 1}` }}
              className={`w-10 h-10 flex items-center justify-center transition-colors ${num < 114 ? 'text-white hover:text-gold-400' : 'text-primary-700 cursor-not-allowed'}`}>
              <ChevronRight size={28} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="w-14 h-14 rounded-full bg-gold-500 text-white flex items-center justify-center shadow-md hover:bg-gold-400 transition-transform active:scale-95">
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            <button 
              onClick={() => { if (num > 1) window.location.href = `/quran/${num - 1}` }}
              className={`w-10 h-10 flex items-center justify-center transition-colors ${num > 1 ? 'text-white hover:text-gold-400' : 'text-primary-700 cursor-not-allowed'}`}>
              <ChevronLeft size={28} />
            </button>
          </div>

          <button 
            onClick={() => setShowReciters(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-primary-200"
          >
            <span className="text-xs font-bold line-clamp-1 max-w-[80px]">{currentReciter.name.split(' ')[0]}</span>
            <Mic2 size={16} />
          </button>
          
          {/* Hidden Audio Element for Full Surah */}
          <audio 
            id={`audio-player-${num}`}
            src={`${currentReciter.surahUrl}/${String(num).padStart(3, '0')}.mp3`}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </div>

      {/* ── Ayah Action Menu (Bottom Sheet) ──────────── */}
      {selectedAyah && (
        <div className="relative z-[110]">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedAyah(null)}></div>
          <div className={`fixed bottom-0 left-0 right-0 rounded-t-[2rem] flex flex-col pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`} style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
            <div className={`w-12 h-1.5 rounded-full mx-auto mt-4 mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-border-dark/50'}`}></div>
            <div className="flex justify-between items-center px-6 mb-4">
              <h3 className={`text-xl font-bold font-arabic ${theme === 'dark' ? 'text-white' : 'text-primary-900'}`}>الآية {selectedAyah.number.toLocaleString('ar-EG')}</h3>
              <button onClick={() => setSelectedAyah(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-warm-100 text-text-muted">
                <X size={16} />
              </button>
            </div>
            
            <div className="px-6 space-y-3 pb-safe">
              <button 
                onClick={() => {
                  setPlayingAyah(selectedAyah)
                  setSelectedAyah(null)
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-warm-50 border-warm-100 text-primary-900 hover:bg-warm-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center">
                  <Play size={20} fill="currentColor" className="ml-1" />
                </div>
                <div className="text-right">
                  <div className="font-bold">استماع للآية</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-text-muted'}`}>بصوت {currentReciter.name}</div>
                </div>
              </button>

              <button 
                onClick={handleBookmarkToggle}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-warm-50 border-warm-100 text-primary-900 hover:bg-warm-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <Bookmark size={20} fill={savedBookmark?.ayah === selectedAyah.number ? "currentColor" : "none"} />
                </div>
                <div className="text-right">
                  <div className="font-bold">{savedBookmark?.ayah === selectedAyah.number ? 'إزالة العلامة المرجعية' : 'حفظ كعلامة مرجعية'}</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-text-muted'}`}>الرجوع لهذه الآية لاحقاً</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reciters Selection Menu ────────────────────── */}
      {showReciters && (
        <div className="relative z-[110]">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowReciters(false)}></div>
          <div className={`fixed bottom-0 left-0 right-0 rounded-t-[2rem] flex flex-col pb-6 max-h-[80vh] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`} style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
            <div className={`w-12 h-1.5 rounded-full mx-auto mt-4 mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-border-dark/50'}`}></div>
            <div className="flex justify-between items-center px-6 mb-4">
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-primary-900'}`}>اختيار القارئ</h3>
              <button onClick={() => setShowReciters(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-warm-100 text-text-muted">
                <X size={16} />
              </button>
            </div>
            
            <div className="px-6 overflow-y-auto pb-safe space-y-2">
              {RECITERS.map(r => (
                <button 
                  key={r.id}
                  onClick={() => {
                    setReciterId(r.id)
                    setShowReciters(false)
                    setIsPlaying(false) // Stop current playing
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${reciterId === r.id ? (theme === 'dark' ? 'bg-primary-900/40 border-primary-500 text-gold-400' : 'bg-primary-50 border-primary-500 text-primary-900') : (theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-warm-50 border-border-light text-text-muted')}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${reciterId === r.id ? 'bg-primary text-white' : (theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-white text-border-dark')}`}>
                      <Mic2 size={18} />
                    </div>
                    <span className="font-bold text-lg">{r.name}</span>
                  </div>
                  {reciterId === r.id && <Check size={20} className="text-primary-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Settings Bottom Sheet ──────────────────────── */}
      {showSettings && (
        <div className="relative z-[100]">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowSettings(false)}></div>
          <div className={`fixed bottom-0 left-0 right-0 rounded-t-[2rem] flex flex-col pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] ${theme === 'dark' ? 'bg-gray-900' : 'bg-warm-50'}`} style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
            <div className={`w-12 h-1.5 rounded-full mx-auto mt-4 mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-border-dark/50'}`}></div>
            <h3 className={`text-xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-primary-900'}`}>إعدادات القراءة</h3>
            
            <div className="px-6 space-y-6 pb-safe">
              <div>
                <label className={`text-sm font-bold mb-4 block ${theme === 'dark' ? 'text-gray-400' : 'text-text-muted'}`}>حجم الخط</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setFontSize((f: number) => Math.max(20, f - 2))} className={`w-12 h-12 rounded-xl font-bold text-lg shadow-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-border-light text-primary-900'}`}>أ-</button>
                  <div className={`flex-1 h-2 rounded-full overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-border-light'}`}>
                    <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${((fontSize-20)/20)*100}%` }}></div>
                  </div>
                  <button onClick={() => setFontSize((f: number) => Math.min(60, f + 2))} className={`w-12 h-12 rounded-xl font-bold text-xl shadow-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-border-light text-primary-900'}`}>أ+</button>
                </div>
              </div>

              <div>
                <label className={`text-sm font-bold mb-4 block ${theme === 'dark' ? 'text-gray-400' : 'text-text-muted'}`}>لون الخلفية</label>
                <div className="flex gap-4">
                  {/* Light */}
                  <button onClick={() => setTheme('light')} className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border-2 ${theme === 'light' ? 'border-primary-500 text-primary-500' : 'border-gray-200'}`}>
                    {theme === 'light' && <Check size={20} />}
                  </button>
                  {/* Warm */}
                  <button onClick={() => setTheme('warm')} className={`w-12 h-12 rounded-full bg-[#FDF8F0] shadow-sm flex items-center justify-center border-2 ${theme === 'warm' ? 'border-primary-500 text-primary-500' : 'border-[#e8dcc4]'}`}>
                    {theme === 'warm' && <Check size={20} />}
                  </button>
                  {/* Dark */}
                  <button onClick={() => setTheme('dark')} className={`w-12 h-12 rounded-full bg-gray-950 shadow-sm flex items-center justify-center border-2 ${theme === 'dark' ? 'border-primary-500 text-white' : 'border-gray-800'}`}>
                    {theme === 'dark' && <Check size={20} />}
                  </button>
                </div>
              </div>
              
              <button onClick={() => setShowSettings(false)} className="w-full py-4 mt-8 rounded-2xl bg-primary-600 text-white font-bold text-lg shadow-md hover:bg-primary-700 transition-colors">
                حفظ الإعدادات
              </button>
            </div>
          </div>
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}

    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Only show if the user hasn't dismissed it before
      if (localStorage.getItem('pwa_prompt_dismissed') !== 'true') {
        setShowPrompt(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    localStorage.setItem('pwa_prompt_dismissed', 'true')
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-28 left-4 right-4 z-[200] bg-primary-900 text-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-enter" dir="rtl">
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
        <Download size={24} className="text-gold-400" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">أضف أثر إلى هاتفك</h3>
        <p className="text-xs text-primary-200">لتجربة أسرع وأفضل، قم بتثبيت التطبيق على الشاشة الرئيسية.</p>
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        <button onClick={handleInstall} className="bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
          تثبيت
        </button>
        <button onClick={handleDismiss} className="text-primary-300 hover:text-white text-xs px-3 py-1.5 flex items-center justify-center transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { Link } from '@/lib/router'

const KEY = 'nh-cookie-consent'
// Use this before loading any analytics or marketing scripts: only run them when it returns 'accepted'.
export const getCookieConsent = () => { try { return localStorage.getItem(KEY) } catch { return null } }

export default function CookieNotice() {
  const [show, setShow] = useState(false)
  useEffect(() => { if (getCookieConsent() === null) setShow(true) }, [])
  if (!show) return null
  const choose = v => { try { localStorage.setItem(KEY, v) } catch { /* storage unavailable */ } setShow(false) }
  return (
    <section aria-label="Cookie notice" className="fixed inset-x-3 bottom-3 z-50 rounded-2xl bg-black p-5 text-white shadow-2xl md:inset-x-auto md:left-6 md:bottom-6 md:max-w-md">
      <p className="text-sm text-white/90">We use cookies and similar technologies to remember your preferences and improve the platform. Read our <Link to="/privacy" className="underline">Privacy Policy</Link> to learn more.</p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => choose('accepted')} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white">Accept</button>
        <button onClick={() => choose('declined')} className="rounded-lg border border-white/50 px-5 py-2 text-sm font-medium">Decline</button>
      </div>
    </section>
  )
}

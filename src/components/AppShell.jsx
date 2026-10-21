'use client'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Footer from './Footer.jsx'
import CookieNotice from './CookieNotice.jsx'
import WaitlistProvider from './WaitlistProvider.jsx'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Page frame: skip link, main landmark, footer, cookie notice, and the fade-up reveal of each section.
export default function AppShell({ children }) {
  const pathname = usePathname()
  const first = useRef(true)
  useIsoLayoutEffect(() => {
    const initial = first.current
    first.current = false
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('reveal-in'); io.unobserve(e.target) }
    }), { threshold: 0.08 })
    document.querySelectorAll('main > *, footer').forEach(el => {
      // On a hard load the server-rendered first screen is already visible, so only animate what is below it.
      if (initial && el.getBoundingClientRect().top < window.innerHeight * 0.9) return
      el.classList.remove('reveal-in'); el.classList.add('reveal'); io.observe(el)
    })
    if (!initial) document.getElementById('main')?.focus({ preventScroll: true })
    return () => io.disconnect()
  }, [pathname])
  return (
    <WaitlistProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg">Skip to main content</a>
      <main id="main" tabIndex={-1} className="outline-none">{children}</main>
      <Footer />
      <CookieNotice />
    </WaitlistProvider>
  )
}

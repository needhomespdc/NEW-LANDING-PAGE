import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'

export default function Hero({ tag, title, text, ctas = true, primaryLabel = 'Start Investing', primaryTo = '/investment/save-to-own', accent = '.', badge, tone, big, animate, children }) {
  return (
    <header className="px-4 pt-4 md:px-[66px]">
      <div className={`relative overflow-hidden rounded-[32px] md:rounded-[40px] ${tone === 'orange' ? 'bg-gradient-to-br from-[#F27B2C] via-[#E8661A] to-[#C24D0B]' : 'bg-[#1b1512]'}`}>
        <img src="/images/hero-bg.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-soft-light" />
        <div className="relative pb-12 md:pb-14">
          <Navbar />
          <div className={`mt-10 grid gap-6 px-6 md:mt-16 md:px-[48px] ${big ? 'lg:grid-cols-[1.5fr_1fr]' : 'lg:grid-cols-2'} lg:items-end`}>
            <div>
              {tag && <span className="inline-block rounded-full border border-white/60 px-3 py-1 text-xs text-white">{tag}</span>}
              {badge && <span className="ml-2 inline-block rounded-full bg-primary px-3 py-1 text-xs text-white">{badge}</span>}
              <h1 className={`mt-4 font-semibold leading-[1.08] tracking-tight text-white ${big ? 'max-w-[760px] text-[42px] md:text-[60px]' : 'max-w-[560px] text-[34px] md:text-[44px]'}`}>
                {animate ? title.split(' ').map((w, i) => <span key={i} className="hero-rise mr-[0.25em]" style={{ animationDelay: `${0.1 + i * 0.09}s` }}>{w}</span>) : title}<span className="text-primary">{accent}</span>
              </h1>
            </div>
            <p className={`max-w-[520px] text-[15px] leading-relaxed text-white/90 lg:justify-self-end ${animate ? 'hero-fade' : ''}`}>{text}</p>
          </div>
          {children}
          {ctas && (
            <div className="mx-6 mt-10 flex flex-wrap justify-center gap-3 border-t border-white/20 pt-8 md:mx-[48px]">
              {primaryTo.startsWith('#')
                ? <a href={primaryTo} className="rounded-xl bg-primary px-8 py-3 text-[15px] font-medium text-white">{primaryLabel}</a>
                : <Link to={primaryTo} className="rounded-xl bg-primary px-8 py-3 text-[15px] font-medium text-white">{primaryLabel}</Link>}
              <Link to="/property-hub" className="rounded-xl border border-white/70 px-8 py-3 text-[15px] font-medium text-white">Explore Property Hub</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

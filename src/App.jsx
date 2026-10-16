import { useEffect, useLayoutEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import PropertyHub from './pages/PropertyHub.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx'
import Partner from './pages/Partner.jsx'
import AgentPartner from './pages/AgentPartner.jsx'
import Contact from './pages/Contact.jsx'
import SaveToOwn from './pages/SaveToOwn.jsx'
import { Outright, LandBanking, CoDevelopment, Fractional } from './pages/investments.jsx'
import PayMyRent from './pages/PayMyRent.jsx'
import Faq from './pages/Faq.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import { DataDeletion, Deactivation } from './pages/AccountRequests.jsx'
import NotFound from './pages/NotFound.jsx'
import CookieNotice from './components/CookieNotice.jsx'
import { metaFor } from './seo.js'

// Subtle fade-up as each top-level section of a page (and the footer) scrolls into view.
function useSectionReveal(path) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('reveal-in'); io.unobserve(e.target) }
    }), { threshold: 0.08 })
    document.querySelectorAll('main > *, footer').forEach(el => { el.classList.remove('reveal-in'); el.classList.add('reveal'); io.observe(el) })
    return () => io.disconnect()
  }, [path])
}

function setTag(selector, make, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) { el = make(); document.head.appendChild(el) }
  el.setAttribute(attr, value)
}
// Updates the page title and meta tags on every route change and moves focus to the new page for screen readers.
function usePageMeta(path) {
  const first = useRef(true)
  useEffect(() => {
    const m = metaFor(path)
    document.title = m.title
    const tag = (sel, attrName, attrVal, value) => setTag(sel, () => { const e = document.createElement('meta'); e.setAttribute(attrName, attrVal); return e }, 'content', value)
    tag('meta[name="description"]', 'name', 'description', m.description)
    tag('meta[name="robots"]', 'name', 'robots', m.noindex ? 'noindex' : 'index,follow')
    tag('meta[property="og:title"]', 'property', 'og:title', m.title)
    tag('meta[property="og:description"]', 'property', 'og:description', m.description)
    if (m.canonical) {
      tag('meta[property="og:url"]', 'property', 'og:url', m.canonical)
      setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', m.canonical)
    }
    if (first.current) first.current = false
    else document.getElementById('main')?.focus({ preventScroll: true })
  }, [path])
}

export default function App() {
  const { pathname } = useLocation()
  useSectionReveal(pathname)
  usePageMeta(pathname)
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg">Skip to main content</a>
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/property-hub" element={<PropertyHub />} />
          <Route path="/property-hub/:slug" element={<PropertyDetail />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/partner/agent" element={<AgentPartner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/investment/save-to-own" element={<SaveToOwn />} />
          <Route path="/investment/outright-purchase" element={<Outright />} />
          <Route path="/investment/land-banking" element={<LandBanking />} />
          <Route path="/investment/co-development" element={<CoDevelopment />} />
          <Route path="/investment/fractional-ownership" element={<Fractional />} />
          <Route path="/pay-my-rent" element={<PayMyRent />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/account-deactivation" element={<Deactivation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieNotice />
    </>
  )
}

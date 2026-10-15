import { useLayoutEffect } from 'react'
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
import Stub from './pages/Stub.jsx'

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

export default function App() {
  useSectionReveal(useLocation().pathname)
  return (
    <>
      <main>
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
          <Route path="*" element={<Stub />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

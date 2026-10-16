import { Link } from 'react-router-dom'
import { Phone, Mail, ArrowUp, Facebook, Instagram, Linkedin, Youtube, Twitter, MessageCircle, Music2 } from 'lucide-react'
import Logo from './Logo.jsx'
import { investmentLinks } from '../nav.js'

const company = [['About us', '/about'], ['Partner', '/partner'], ['Property Hub', '/property-hub'], ['Contact Us', '/contact']]
const privacy = [['Privacy policy', '/privacy'], ['Terms and condition', '/terms'], ['FAQ', '/faq'], ['Deactivate Account', '/account-deactivation'], ['Request Data Deletion', '/data-deletion']]
const socials = [[Twitter, 'X'], [Facebook, 'Facebook'], [Instagram, 'Instagram'], [Linkedin, 'LinkedIn'], [Youtube, 'YouTube'], [Music2, 'TikTok'], [MessageCircle, 'WhatsApp']]

function Col({ title, links }) {
  return (
    <div>
      <h3 className="text-xl font-medium text-white">{title}</h3>
      <ul className="mt-6 space-y-4">
        {links.map(([label, to]) => <li key={label}><Link to={to} className="text-white/85 hover:text-primary">{label}</Link></li>)}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0604] pb-10 pt-20 text-white">
      <img loading="lazy" decoding="async" src="/images/footer-skyline.webp" alt="" className="pointer-events-none absolute bottom-0 left-1/2 w-[1440px] max-w-none -translate-x-1/2 opacity-40" />
      <div className="page-x relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-6 flex items-center gap-3"><Phone size={18} />+234 702 500 5857</p>
            <p className="mt-4 flex items-center gap-3"><Mail size={18} />support@needhomespdc.com</p>
            <p className="mt-8 text-sm text-white/85">Join the 1250+ investors who signed up today</p>
            <div className="mt-3 flex gap-3">
              <a href="#" className="rounded-lg bg-primary px-4 py-2 text-sm"><span className="block text-[9px] uppercase opacity-80">Download on the</span>App Store</a>
              <a href="#" className="rounded-lg bg-white px-4 py-2 text-sm text-ink"><span className="block text-[9px] uppercase opacity-70">Get it on</span>Google Play</a>
            </div>
          </div>
          <Col title="Company" links={company} />
          <Col title="Investment" links={investmentLinks.map(l => [l.label, l.to])} />
          <Col title="Privacy" links={privacy} />
        </div>
        <div className="mt-14 border-t border-white/20 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 text-white/90">
                Back to top <span className="grid size-8 place-items-center rounded-md border border-white/40"><ArrowUp size={14} /></span>
              </button>
              <p className="mt-6 text-white/85">© 2026 Needhomes Property Investment Limited. All rights reserved.</p>
            </div>
            <div className="flex gap-3">
              {socials.map(([Icon, label]) => <a key={label} href="#" aria-label={label} className="grid size-11 place-items-center rounded-full border border-white/40 hover:border-primary"><Icon size={18} /></a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

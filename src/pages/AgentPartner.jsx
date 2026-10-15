import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Steps } from '../components/InvestmentPage.jsx'

const perks = ['Access verified property opportunities', 'Connect with more qualified customers', 'Promote properties through a trusted platform', 'Earn commissions on successful transactions', 'Grow your real estate business with technology']
const steps = [
  { img: 'phone-agent-dashboard', title: 'Create Your Account', text: 'Sign up as a NeedHomes Real Estate Partner and create your agent profile.' },
  { img: 'phone-agent-properties', title: 'Choose & Promote Properties', text: 'Browse available properties and select the ones you want to promote. Get your unique referral link and share property listings across your social media, WhatsApp, personal network, and other channels.' },
  { img: 'phone-agent-property', title: 'Bring in a Buyer', text: 'When someone clicks your referral link and purchases a property through your link, the sale is attributed to your account.' },
  { img: 'phone-agent-commission', title: 'Earn Your Commission', text: 'Once the property transaction is successfully confirmed, you earn your applicable commission.' },
  { img: 'phone-agent-performance', title: 'Track Your Earnings', text: 'Monitor your referrals, successful sales, pending commissions, and earned commissions from your partner dashboard.' },
]

export default function AgentPartner() {
  return (
    <>
      <Hero tag="Partner" title="Turn Property Connections Into Real Income" primaryLabel="Become a Partner Agent" primaryTo="/contact"
        text="Are you ready to promote properties, connect buyers and earn commission on successful sales?" />
      <section className="py-20 page-x">
        <h2 className="text-4xl font-semibold md:text-5xl">Become a NeedHomes Partner Agent</h2>
        <p className="mt-5 max-w-4xl text-sm text-muted">Promote verified NeedHomes properties to your network and earn a commission whenever a buyer purchases through your unique referral link.</p>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
          <div>
            <ul className="space-y-4 text-sm text-muted">{perks.map(p => <li key={p} className="flex items-center gap-4"><span className="size-2.5 shrink-0 bg-primary" />{p}</li>)}</ul>
            <p className="mt-6 max-w-sm text-sm text-muted">You bring the connections. We provide the platform. Together, we create more opportunities.</p>
          </div>
          <img src="/images/agent-open-house.webp" alt="Agents showing a couple around an open house" className="w-full rounded-2xl object-cover" />
        </div>
      </section>
      <Steps numbered title={['Simple Steps to', 'Own Your Home']} steps={steps} />
      <CtaBand title="Ready to" accent="Earn Income" text="Join a growing network of real estate partners promoting NeedHomes properties and earning commissions from successful referrals" primaryLabel="Become a Partner Agent" primaryTo="/contact" />
    </>
  )
}

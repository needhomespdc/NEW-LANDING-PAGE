'use client'
import { Network, TrendingUp, Users } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { Link } from '@/lib/router'
import CountUp from '../components/CountUp.jsx'

const pillars = [
  [Network, 'Flexible Investment Models', 'Fractional ownership, land banking & more'],
  [TrendingUp, 'High Returns', 'Properties with strong growth potential'],
  [Users, 'Trusted by Thousands', 'Join 12,500+ investors across Nigeria'],
]
const promise = [['N', 'Navigate'], ['E', 'Empower'], ['E', 'Expand'], ['D', 'Deliver'], ['H', 'Homes'], ['O', 'Ownership'], ['M', 'Markets'], ['E', 'Equity'], ['S', 'Secure']]
const stats = [['100%', 'Secured & Regulated'], ['99.9%', 'Uptime'], ['50+', 'Active Properties']]

export default function About() {
  return (
    <>
      <Hero tag="About NeedHomes" title="Building Homes, Creating Wealth, Changing Lives" ctas={false}
        text="NeedHomes is a PropTech enabled real estate investment platform focused on affordable housing, through co-development, fractional ownership, land banking, save-to-own and outright purchase, that enables Individual home buyers and Corporate Investors to discover, promote, and earn returns on their investments.">
        <div className="mx-6 mt-10 grid gap-4 border-t border-white/20 pt-8 md:mx-[48px] md:grid-cols-3">
          {pillars.map(([Icon, t, d]) => (
            <div key={t} className="rounded-2xl border border-white/25 p-6">
              <Icon size={30} className="text-[#FFBE98]" />
              <h3 className="mt-4 font-medium text-primary">{t}</h3>
              <p className="mt-1 text-sm text-white">{d}</p>
            </div>
          ))}
        </div>
      </Hero>

      <section className="grid gap-6 py-20 page-x md:grid-cols-2">
        {[['icon-vision', 'Our Vision', "To become Africa's trusted real estate investment platform, making property ownership and wealth creation accessible to everyone"],
          ['icon-mission', 'Our Mission', 'To provide accessible and affordable property investment opportunities to everyone by leveraging technology, market expertise, and transparent processes.']].map(([img, t, d]) => (
          <div key={t} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,.08)]">
            <img loading="lazy" decoding="async" src={`/images/${img}.webp`} alt="" className="size-20 shrink-0 object-contain" />
            <div><h2 className="text-xl font-semibold">{t}</h2><p className="mt-1 text-sm text-muted">{d}</p></div>
          </div>
        ))}
      </section>

      <section className="pb-20 page-x">
        <span className="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-sm text-primary">Our Core Objectives</span>
        <h2 className="mt-5 text-5xl font-semibold leading-tight">Built on the<br /><span className="text-muted">NEEDHOMES promise</span></h2>
        <ul className="mt-10 flex flex-wrap gap-4">
          {promise.map(([l, w], i) => (
            <li key={i} className="w-[88px] text-center">
              <span className="mx-auto grid size-[76px] place-items-center rounded-full bg-primary-50 text-5xl font-medium text-primary">{l}</span>
              <span className="mt-3 block text-sm">{w}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-20 page-x">
        <dl className="grid gap-8 rounded-2xl border border-ink/10 bg-[#F1F4F8] px-6 py-14 text-center sm:grid-cols-3">
          {stats.map(([n, l]) => (
            <div key={l}><dd className="text-5xl font-semibold tracking-tight text-primary md:text-6xl"><CountUp value={n} /></dd><div className="mx-auto mt-4 h-1.5 w-40 rounded bg-mist" /><dt className="mt-3 text-base text-muted">{l}</dt></div>
          ))}
        </dl>
      </section>

      <section className="pb-24 page-x">
        <span className="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-sm text-primary">Our Story</span>
        <h2 className="mt-5 text-5xl font-semibold leading-tight">Property Ownership<br />shouldn't be out of reach</h2>
        <div className="mt-6 space-y-4 text-muted">
          <p>For many people, the desire to own property or build wealth through real estate is real, but high entry costs, rigid payment structures, limited access to trusted opportunities, and complicated processes often make getting started difficult.</p>
          <p>That's the problem NeedHomes was created to solve.</p>
          <p>NeedHomes is a PropTech platform making real estate investment and property ownership more accessible, flexible, and transparent. We use technology to simplify how people discover opportunities, invest, make payments, manage their properties, and track their investments. Through Fractional Ownership, Land Banking, Save-to-Own, Co-Development, and Outright Purchase, we provide different pathways into real estate, allowing people to choose an option that fits their goals and financial capacity.</p>
          <p>At NeedHomes, we're creating a simpler way for more people to start, invest, and move closer to property ownership.</p>
        </div>
        <Link to="/property-hub" className="mt-8 inline-block rounded-xl bg-primary px-8 py-3.5 font-medium text-white">PropertyHub</Link>
      </section>

      <CtaBand title="Ready to Own" accent="Your Dream Home?" text="Join buyers who chose full ownership with verified properties and a clear path to possession" />
    </>
  )
}

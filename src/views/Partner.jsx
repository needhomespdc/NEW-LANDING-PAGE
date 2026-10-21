'use client'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import ContactForm from '../components/ContactForm.jsx'

const why = [
  ['icon-strategic-growth', 'Strategic Growth', 'Access to prime real estate opportunities across Africa with proven ROI and sustainable growth potential.'],
  ['icon-risk-mitigation', 'Risk Mitigation', 'Our rigorous due diligence process and legal framework ensure your investments are protected and compliant.'],
  ['icon-network-access', 'Network Access', 'Join a community of forward-thinking investors and developers shaping the future of African real estate.'],
  ['icon-fast-execution', 'Fast Execution', 'To provide accessible and affordable property investment opportunities to everyone by leveraging technology, market expertise, and transparent processes.'],
]
const stats = [['50+', 'Active Properties', 'Trusted partners across Africa contributing to our shared vision of accessible real estate wealth.'], ['₦2.5 Billion', 'Total Partnership Value', 'Combined value of all partnership agreements, demonstrating our scale and impact in the market.'], ['28%', 'Average Partner ROI', 'Our partners consistently achieve above-market returns through strategic collaboration and expert execution.']]
const flow = [['Project listing', 'bg-primary-50'], ['Funding', 'bg-[#FDB894]'], ['Sales', 'bg-[#F68F52]'], ['Ownership', 'bg-primary']]
const perks = ['Reach more qualified buyers', 'Access investor demand', 'Expand your sales network', 'Structure projects for co-development & investment', 'Increase your project visibility.']
const process = [
  ['Initial Consultation.', 'Schedule a call with our partnership team to discuss your goals, investment capacity, and preferred partnership model.'],
  ['Due Diligence', 'We conduct thorough background checks and share detailed project documentation, financial projections, and legal frameworks.'],
  ['Agreement Structuring', 'Our legal team works with you to create a partnership agreement that protects all parties and aligns incentives.'],
  ['Project Execution', 'Begin collaboration with regular updates, transparent reporting, and dedicated support throughout the project lifecycle.'],
]

export default function Partner() {
  return (
    <>
      <Hero tag="Partner" title="Build More. Sell Faster. Grow with NeedHomes" primaryLabel="Partner with us" primaryTo="#partner-form"
        text="Are you a property developer with a great project but looking for more buyers, stronger sales channels, or better access to property investors?" />

      <section className="py-20 page-x">
        <h2 className="text-4xl font-semibold md:text-5xl">Why partner with NeedHomes?</h2>
        <div className="mt-5 max-w-4xl space-y-3 text-sm text-muted">
          <p>At NeedHomes, we believe that the most impactful real estate ventures are built on strong partnerships. Whether you're a developer, investor, or institution, we offer collaborative opportunities designed to maximize value and minimize risk.</p>
          <p>Our track record speaks for itself: over ₦500 million invested, multiple successful projects delivered, and a growing network of satisfied partners across Africa.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([img, t, d]) => (
            <div key={t} className="rounded-xl bg-white p-6 shadow-[0_8px_30px_rgba(42,18,4,.08)]">
              <img loading="lazy" decoding="async" src={`/images/${img}.webp`} alt="" className="size-14" />
              <h3 className="mt-6 text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
        <dl className="mt-14 grid gap-8 rounded-2xl bg-[#F1F4F8] px-8 py-12 text-center md:grid-cols-3">
          {stats.map(([n, l, d]) => (
            <div key={l}><dd className="text-3xl font-medium">{n}</dd><dt className="mt-2 text-sm font-medium text-primary">{l}</dt><p className="mx-auto mt-2 max-w-[300px] text-sm text-muted">{d}</p></div>
          ))}
        </dl>
      </section>

      <section className="pb-20 page-x">
        <h2 className="text-4xl font-semibold md:text-5xl">Partner with NeedHomes.</h2>
        <p className="mt-4 max-w-2xl text-sm text-muted">Put your development in front of a growing network of homebuyers, investors, subscribers and partner agents, while NeedHomes helps create a structured pathway from project:</p>
        <ol className="mt-8 flex flex-wrap items-center gap-3">
          {flow.map(([l, c], i) => (
            <li key={l} className="flex items-center gap-3">
              <span className={`grid size-32 place-items-center rounded-full px-3 text-center text-lg font-medium md:size-[140px] ${c} ${i === 3 ? 'text-white' : ''}`}>{l}</span>
              {i < 3 && <span aria-hidden className="text-2xl text-muted/60">→</span>}
            </li>
          ))}
        </ol>
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
          <ul className="space-y-4 text-sm text-muted">
            {perks.map(p => <li key={p} className="flex items-center gap-4"><span className="size-2.5 shrink-0 bg-primary" />{p}</li>)}
          </ul>
          <img loading="lazy" decoding="async" src="/images/partner-handshake.webp" alt="A developer and a NeedHomes representative shaking hands on a building site" className="w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="pb-20 page-x">
        <h2 className="text-4xl font-semibold md:text-5xl">Our Partnership Process.</h2>
        <p className="mt-3 text-sm text-muted">We've streamlined our partnership onboarding to ensure transparency, efficiency, and mutual success from day one.</p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(([t, d], i) => (
            <li key={t} className="rounded-xl bg-white p-3 shadow-[0_8px_30px_rgba(42,18,4,.08)]">
              <span className="block text-center text-7xl font-bold text-[#FDB894]">{String(i + 1).padStart(2, '0')}</span>
              <div className="rounded-lg bg-primary-50 p-4 text-center"><h3 className="text-lg font-semibold">{t}</h3><p className="mt-2 text-xs text-muted">{d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-20 page-x">
        <ContactForm form="partner" id="partner-form" title="Become a NeedHomes Developer Partner today" intro="Become a NeedHomes Developer Partner today." button="Register" />
      </section>

      <CtaBand title="Ready to Grow" accent="Partner with us?" text="Let's discuss how a partnership with NeedHomes can accelerate your real estate investment goals and create lasting value." primaryLabel="Become a Partner" primaryTo="#partner-form" />
    </>
  )
}

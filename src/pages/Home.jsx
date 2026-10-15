import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Download, ChevronLeft, ChevronRight, MapPin, TrendingUp, Home as HomeIcon, ArrowRight, Mail } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import FaqList from '../components/FaqList.jsx'
import { properties } from '../data/properties.js'

const Tag = ({ children }) => <span className="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-sm text-primary">{children}</span>
const Head = ({ a, b, text }) => (
  <div className="grid items-end gap-4 lg:grid-cols-2">
    <h2 className="text-4xl font-semibold md:text-5xl">{a} <span className="text-muted">{b}</span></h2>
    <p className="max-w-[440px] text-sm text-muted lg:justify-self-end">{text}</p>
  </div>
)
const AppBtn = () => <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-[15px] font-medium text-white">Download App <Download size={16} /></a>

const reviews = [['Folorunsho Azeez'], ['Felix Ikechukwu']]
const bars = [['Jan', 28], ['Feb', 40], ['Mar', 52], ['Apr', 100], ['May', 58], ['Jun', 70]]
const stats = [['Active Investors', '1,250+'], ['Properties Listed', '35+'], ['Investments Funded', '₦2.4B+'], ['Avg. Project ROI', '18.7%']]
const ways = [
  ['invest-fractional', 'Fractional Ownership', 'Own a share of premium properties and earn rental income.', '/investment/fractional-ownership'],
  ['invest-land', 'Land Banking', 'Own verified land in high-growth areas, hold for appreciation, and exit for strong long-term returns.', '/investment/land-banking'],
  ['invest-save-to-own', 'Save to Own', 'Save to Own allows you to secure a verified property and pay gradually through a flexible payment plan.', '/investment/save-to-own'],
  ['invest-co-dev', 'Co-development', 'Co-fund verified real estate projects and own appreciated property upon completion', '/investment/co-development'],
  ['invest-outright', 'Outright Purchase', 'Purchase ready homes with verified titles, take full ownership, enjoy the freedom to live in, rent out, or hold...', '/investment/outright-purchase'],
]
const steps = [['Create Your Account', 'Sign up free and complete a quick verification.'], ['Browse & Choose', 'Explore verified properties and pick your investment.'], ['Invest Securely', 'Fund through your wallet and confirm in a few taps.'], ['Track & Earn', 'Monitor progress and returns in real time.']]
const badge = { Fractional: 'bg-[#5B21B6] text-white', Outright: 'bg-white text-ink', 'Land banking': 'bg-primary text-white', 'Co-Dev': 'bg-[#0F8A5F] text-white' }
const partnerRows = [
  [['QoreID', 'partner-qoreid'], ['Cutstruct', 'partner-cutstruct'], ['GlobalTrust', 'partner-globaltrust'], ['Grayson\'s Trust', 'partner-graysons', true]],
  [['REDAN', 'partner-redan'], ['Paystack', 'partner-paystack'], ['Wema Bank', null]],
  [['Flutterwave', 'partner-flutterwave'], ['EFCC', 'partner-efcc'], ['Arelipowerco', 'partner-arelipowerco'], ['LASRERA', 'partner-lasrera']],
]

function Slider() {
  const ref = useRef(null)
  const go = d => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  const arrow = 'absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg md:grid'
  const featured = properties.filter(p => ['oasis-resort', 'oasis-luxuria', 'happy-view-estate', 'fowosere-court', 'mandys-court'].includes(p.slug))
  return (
    <div className="relative mt-10">
      <button onClick={() => go(-1)} aria-label="Previous properties" className={`${arrow} -left-5`}><ChevronLeft /></button>
      <button onClick={() => go(1)} aria-label="Next properties" className={`${arrow} -right-5`}><ChevronRight /></button>
      <div ref={ref} role="region" aria-label="Featured properties" tabIndex={0} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {featured.map(p => (
          <Link key={p.slug} to={`/property-hub/${p.slug}`} className="w-[290px] shrink-0 snap-start rounded-2xl bg-[#F1F4F8] p-2.5 transition-shadow hover:shadow-lg md:w-[320px]">
            <div className="relative overflow-hidden rounded-xl">
              <img src={`/images/${p.img}.webp`} alt={p.name} className="aspect-[4/3] w-full object-cover" draggable="false" />
              <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-sm ${badge[p.type]}`}>{p.type}</span>
            </div>
            <div className="px-1.5 pb-1.5 pt-4">
              <h3 className="truncate text-xl font-medium">{p.name}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted"><MapPin size={16} />{p.loc}</p>
              <p className="mt-3 flex justify-between text-sm"><span className="text-muted">Investment window</span><b>{p.offer}</b></p>
              <div className="mt-3 grid grid-cols-2 divide-x divide-ink/10 rounded-lg bg-white py-2 text-center">
                <div><b className="block">{p.price}</b><span className="text-xs text-muted">Price per {p.unit}</span></div>
                <div><b className="block">{p.slots}</b><span className="text-xs text-muted">Slots left</span></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero tone="orange" title="Your Smooth Journey to Property Ownership" accent="" ctas={false}
        text="Co-develop, own a fraction, and grow wealth with trusted real estate investments, all in one secure platform.">
        <div className="mx-6 mt-8 border-t border-white/25 pt-6 md:mx-[48px]">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-white">
            <span className="inline-flex items-center gap-2"><TrendingUp size={18} />Build Wealth the smart way</span>
            <span className="inline-flex items-center gap-2"><HomeIcon size={18} />Co-own trusted Real estate Investment Portfolio</span>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 text-ink">
              <h3 className="font-semibold">Verified &amp; Secure</h3>
              <p className="mt-1 text-xs text-muted">Every property and transaction is verified for your peace of mind.</p>
              <div className="mt-3 space-y-2">
                {reviews.map(([n]) => (
                  <div key={n} className="rounded-xl bg-[#1b1512] p-3 text-white">
                    <div className="flex items-center justify-between text-sm"><span>{n}</span><span aria-label="5 stars" className="text-[#F5A623]">★★★★★</span></div>
                    <p className="mt-1 text-[11px] text-white/70">"Every property and transaction is verified for your peace of mind."</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 text-ink">
              <p className="text-sm text-muted">Total Portfolio Value</p>
              <p className="mt-1 text-3xl font-semibold">₦125.4M</p>
              <span className="mt-1 inline-block rounded-full bg-[#E3F4E6] px-2.5 py-0.5 text-[11px] text-[#2E8B43]">▲ 18.7% this month</span>
              <svg viewBox="0 0 200 70" className="mt-2 h-20 w-full" role="img" aria-label="Portfolio value trending up">
                <defs><linearGradient id="pg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#EF6A1B" stopOpacity=".35" /><stop offset="1" stopColor="#EF6A1B" stopOpacity="0" /></linearGradient></defs>
                <path d="M0 62 C30 60 50 50 80 47 S125 36 150 22 S185 8 200 4 V70 H0Z" fill="url(#pg)" /><path d="M0 62 C30 60 50 50 80 47 S125 36 150 22 S185 8 200 4" fill="none" stroke="#EF6A1B" strokeWidth="2" />
              </svg>
              <a href="#" className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#2A1204] py-2.5 text-sm font-medium text-white">Download App <Download size={14} /></a>
            </div>
            <div className="rounded-2xl bg-white p-5 text-ink">
              <h3 className="font-semibold">Realtime Tracking</h3>
              <p className="mt-1 text-xs text-muted">Monitor rental income and project milestones in real time.</p>
              <div className="mt-3 flex h-28 items-end justify-between gap-3" role="img" aria-label="Monthly income bar chart, April highest at ₦15.2M">
                {bars.map(([m, h]) => (
                  <div key={m} className="flex flex-1 flex-col items-center justify-end gap-1">
                    {m === 'Apr' && <span className="rounded bg-[#E3F4E6] px-1.5 py-0.5 text-[10px] text-[#2E8B43]">₦15.2M</span>}
                    <div className={`w-full rounded-t ${m === 'Apr' ? 'bg-[#3FA34D]' : 'bg-[#B9DFB4]'}`} style={{ height: `${h * 0.7}%` }} />
                    <span className="text-[11px] text-muted">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Hero>

      <section className="grid gap-4 px-4 pt-4 md:grid-cols-2 md:px-[66px] lg:grid-cols-4">
        {stats.map(([l, v], i) => (
          <div key={l} className={`rounded-2xl p-8 ${i === 0 ? 'bg-[#2A1204] text-white' : 'bg-[#F1F4F8]'}`}>
            <p className={`text-sm ${i === 0 ? 'text-white/85' : 'text-muted'}`}>{l}</p>
            <p className={`mt-3 text-5xl font-semibold ${i === 0 ? '' : 'text-primary'}`}>{v}</p>
          </div>
        ))}
      </section>

      <section className="py-20 page-x">
        <Head a="Invest" b="Your Way" text="Multiple investment options designed to help you grow wealth and achieve your goals." />
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {ways.map(([img, t, d, to]) => (
            <Link key={t} to={to} className="w-full rounded-2xl bg-[#F1F4F8] p-6 transition hover:-translate-y-1 hover:shadow-lg sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <img src={`/images/${img}.webp`} alt="" className="h-40 w-full object-contain" />
              <h3 className="mt-4 text-xl font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted">{d}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">Learn More <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid items-center gap-12 bg-[#F5F7FA] py-20 page-x lg:grid-cols-2">
        <div className="overflow-hidden rounded-[28px] bg-primary-50"><img src="/images/signup-phone-woman.webp" alt="Woman celebrating beside the NeedHomes app dashboard" className="w-full" /></div>
        <div>
          <Tag>How It Works</Tag>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">From signup to<br /><span className="text-muted">property ownership</span></h2>
          <p className="mt-4 max-w-[480px] text-sm text-muted">A clear path to owning a property through Nigerian real estate, no guesswork, just guided steps.</p>
          <ol className="mt-6 space-y-5">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex items-center gap-4">
                <span className="w-8 text-4xl font-light text-primary/70" aria-hidden>{i + 1}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist text-muted"><Mail size={14} /></span>
                <div><h3 className="font-semibold">{t}</h3><p className="text-sm text-muted">{d}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-6"><AppBtn /><Link to="/faq" className="inline-flex items-center gap-1 text-sm">See all process <ChevronRight size={16} /></Link></div>
        </div>
      </section>

      <section className="py-20 page-x">
        <Head a="Featured" b="Properties" text="Hot and newly listed investment opportunities with high potential returns." />
        <Slider />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6"><AppBtn /><Link to="/property-hub" className="inline-flex items-center gap-1 text-sm">View Property Hub <ChevronRight size={16} /></Link></div>
      </section>

      <section className="bg-[#F5F7FA] py-20 page-x">
        <Tag>FAQ</Tag>
        <h2 className="mb-10 mt-4 text-4xl font-semibold md:text-5xl">Frequently Asked <span className="text-muted">Questions (FAQ)</span></h2>
        <FaqList limit={5} />
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-[15px] font-medium text-white">Contact us <ArrowRight size={16} /></Link>
          <Link to="/faq" className="text-sm">View More FAQs</Link>
        </div>
      </section>

      <section className="bg-[#64748B] py-20 page-x">
        <h2 className="text-center text-4xl font-semibold text-white md:text-5xl">Meet our Partners</h2>
        <div className="mt-10 space-y-4">
          {partnerRows.map((row, i) => (
            <div key={i} className="flex flex-wrap justify-center gap-4">
              {row.map(([name, img, dark]) => (
                <div key={name} className={`grid h-24 w-[calc(50%-8px)] place-items-center rounded-xl px-5 md:w-[240px] ${dark ? 'bg-[#262626]' : 'bg-white'}`}>
                  {img ? <img src={`/images/${img}.webp`} alt={name} className="max-h-16 w-auto max-w-full object-contain" />
                    : <span className="text-xl font-bold tracking-tight text-[#8A1B6F]">{name.toUpperCase()}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Ready to Start Your" accent="Investment Journey" text="Join investors building wealth the smart way." />
    </>
  )
}

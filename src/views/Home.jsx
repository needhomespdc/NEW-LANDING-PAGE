'use client'
import { useRef } from 'react'
import { Link } from '@/lib/router'
import { CircleUser, ChevronLeft, ChevronRight, MapPin, TrendingUp, Home as HomeIcon, ArrowRight, Mail } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import CountUp from '../components/CountUp.jsx'
import { AppleIcon, PlayIcon } from '../components/StoreBadges.jsx'
import { useWaitlist } from '../components/WaitlistProvider.jsx'
import CtaBand from '../components/CtaBand.jsx'
import FaqList from '../components/FaqList.jsx'
import { imgSrc, leftLabel } from '../data/properties.js'

const Tag = ({ children }) => <span className="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-sm text-primary">{children}</span>
const Head = ({ a, b, text }) => (
  <div className="grid items-end gap-4 lg:grid-cols-2">
    <h2 className="text-4xl font-semibold md:text-5xl">{a} <span className="text-muted">{b}</span></h2>
    <p className="max-w-[440px] text-sm text-muted lg:justify-self-end">{text}</p>
  </div>
)
function AppBtn() {
  const openWaitlist = useWaitlist()
  return <button type="button" onClick={() => openWaitlist('download-app')} className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-[15px] font-medium text-white">Download App <span className="flex gap-1.5"><AppleIcon className="size-4" /><PlayIcon className="size-4" /></span></button>
}

const bars = [['Jan', 51], ['Feb', 71], ['Mar', 56], ['Apr', 100], ['May', 67], ['Jun', 67]]
const stats = [['Active Investors', '1,250+'], ['Properties Listed', '35+'], ['Investments Funded', '₦2.4B+'], ['Avg. Project ROI', '18.7%']]
const ways = [
  ['invest-fractional', 'Fractional Ownership', 'Own a share of premium properties and earn rental income.', '/investment/fractional-ownership'],
  ['invest-land', 'Land Banking', 'Own verified land in high-growth areas, hold for appreciation, and exit for strong long-term returns.', '/investment/land-banking'],
  ['invest-save-to-own', 'Save to Own', 'Save to Own allows you to secure a verified property and pay gradually through a flexible payment plan.', '/investment/save-to-own'],
  ['invest-co-dev', 'Co-development', 'Co-fund verified real estate projects and own appreciated property upon completion', '/investment/co-development'],
  ['invest-outright', 'Outright Purchase', 'Purchase ready homes with verified titles, take full ownership, enjoy the freedom to live in, rent out, or hold...', '/investment/outright-purchase'],
]
const steps = [['Create Your Account', 'Sign up free and complete a quick verification.'], ['Browse & Choose', 'Explore verified properties and pick your investment.'], ['Invest Securely', 'Fund through your wallet and confirm in a few taps.'], ['Track & Earn', 'Monitor progress and returns in real time.']]
const badge = { Fractional: 'bg-[#5B21B6] text-white', Outright: 'bg-white text-ink', 'Land banking': 'bg-primary text-white', 'Co-Dev': 'bg-[#0F8A5F] text-white', 'Save-to-Own': 'bg-[#1D4ED8] text-white' }
const partnerRows = [
  [['QoreID', 'partner-qoreid'], ['Cutstruct', 'partner-cutstruct'], ['GlobalTrust', 'partner-globaltrust'], ['Grayson\'s Trust', 'partner-graysons', true]],
  [['REDAN', 'partner-redan'], ['Paystack', 'partner-paystack'], ['Wema Bank', null]],
  [['Flutterwave', 'partner-flutterwave'], ['EFCC', 'partner-efcc'], ['Arelipowerco', 'partner-arelipowerco'], ['LASRERA', 'partner-lasrera']],
]

function Slider({ properties }) {
  const ref = useRef(null)
  const go = d => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  const arrow = 'absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg md:grid'
  const flagged = properties.filter(p => p.featured)
  const featured = (flagged.length ? flagged : properties).slice(0, 8)
  if (!featured.length) return <p className="mt-10 text-center text-muted">New properties are being added. Check back shortly.</p>
  return (
    <div className="relative mt-10">
      <button onClick={() => go(-1)} aria-label="Previous properties" className={`${arrow} -left-5`}><ChevronLeft /></button>
      <button onClick={() => go(1)} aria-label="Next properties" className={`${arrow} -right-5`}><ChevronRight /></button>
      <div ref={ref} role="region" aria-label="Featured properties (use left and right arrow keys to scroll)" tabIndex={0} onKeyDown={e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {featured.map(p => (
          <Link key={p.slug} to={`/property-hub/${p.slug}`} className="w-[290px] shrink-0 snap-start rounded-2xl bg-[#F1F4F8] p-2.5 transition-shadow hover:shadow-lg md:w-[320px]">
            <div className="relative overflow-hidden rounded-xl">
              <img loading="lazy" decoding="async" src={imgSrc(p)} alt={p.name} className="aspect-[4/3] w-full object-cover" draggable="false" />
              <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-sm ${badge[p.type]}`}>{p.type}</span>
            </div>
            <div className="px-1.5 pb-1.5 pt-4">
              <h3 className="truncate text-xl font-medium">{p.name}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted"><MapPin size={16} />{p.loc}</p>
              <p className="mt-3 flex justify-between text-sm"><span className="text-muted">{p.offerLabel || 'Investment window'}</span><b>{p.offer}</b></p>
              <div className="mt-3 grid grid-cols-2 divide-x divide-ink/10 rounded-lg bg-white py-2 text-center">
                <div><b className="block">{p.price}</b><span className="text-xs text-muted">Price per {p.unit}</span></div>
                <div><b className="block">{p.slots}</b><span className="text-xs text-muted">{leftLabel(p)}</span></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Home({ properties = [], reviews = [], reviewSummary = null }) {
  const openWaitlist = useWaitlist()
  return (
    <>
      <Hero tone="orange" big animate title="Your Smooth Journey to Property Ownership" accent="" ctas={false}
        text="Co-develop, own a fraction, and grow wealth with trusted real estate investments, all in one secure platform.">
        <div className="mx-6 mt-8 border-t border-white/25 pt-6 md:mx-[48px]">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-white">
            <span className="inline-flex items-center gap-2"><TrendingUp size={18} />Build Wealth the smart way</span>
            <span className="inline-flex items-center gap-2"><HomeIcon size={18} />Co-own trusted Real estate Investment Portfolio</span>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl bg-[#F8FAFC] p-6 text-ink">
              <h3 className="text-2xl font-semibold">Verified &amp; Secure</h3>
              <p className="mt-2 max-w-[360px] text-muted">Every property and transaction is verified for your peace of mind.</p>
              <div className="mt-5 space-y-4">
                {reviews.map(({ name: n, rating, text, url }, i) => (
                  <div key={n + i} className="review-slide rounded-2xl bg-[#2A1204] p-4 text-white" style={{ animationDelay: `${i * 1.2}s` }}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-base font-medium"><CircleUser size={22} aria-hidden="true" />{url ? <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">{n}</a> : n}</span>
                      <span aria-label={`${rating} out of 5 stars`} className="whitespace-nowrap">
                        {[0, 1, 2, 3, 4].map(j => <span key={j} aria-hidden="true" className="star-pop" style={{ color: j < Math.floor(rating) ? '#F26A1B' : '#7A3A12', animationDelay: `${i * 1.2 + 0.4 + j * 0.12}s` }}>★</span>)}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm text-[#8E96A3]">“{text}”</p>
                  </div>
                ))}
                {!reviews.length && <p className="text-sm text-muted">Read what investors say about us on Google.</p>}
              </div>
              {reviewSummary && <a href={reviewSummary.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted hover:underline"><span className="text-[#F5A623]" aria-hidden="true">★</span><b className="text-ink">{reviewSummary.rating}</b> · {reviewSummary.count} Google reviews</a>}
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-3xl bg-[#F8FAFC] p-6 text-ink">
                <div className="relative z-10">
                  <p className="text-lg text-muted">Total Portfolio Value</p>
                  <p className="mt-2 text-5xl font-extrabold tracking-tight text-[#2A1204] md:text-6xl">₦125.4M</p>
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#D5EDE0] px-4 py-1.5 text-sm text-[#2E8B43]">18.7% this month <span aria-hidden="true">▲</span></span>
                </div>
                <div className="chart-grow absolute bottom-0 left-4 h-1/2 w-[calc(100%-2rem)]">
                <svg viewBox="0 -4 200 104" preserveAspectRatio="none" role="img" aria-label="Portfolio value trending up" className="h-full w-full">
                  <defs><linearGradient id="pg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#F4A77A" stopOpacity=".75" /><stop offset="1" stopColor="#F4A77A" stopOpacity="0" /></linearGradient></defs>
                  <path d="M0 82 C16 72 32 46 52 46 C76 46 88 62 108 62 C136 62 148 8 176 2 C188 -1 196 4 200 10 V100 H0Z" fill="url(#pg)" />
                  <path d="M0 82 C16 72 32 46 52 46 C76 46 88 62 108 62 C136 62 148 8 176 2 C188 -1 196 4 200 10" fill="none" stroke="#8B3A0A" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                </svg>
                </div>
              </div>
              <button type="button" onClick={() => openWaitlist('download-app')} className="flex items-center justify-center gap-2 rounded-xl bg-[#2A1204] py-3.5 font-medium text-white">Download App <span className="flex gap-1.5"><AppleIcon className="size-4" /><PlayIcon className="size-4" /></span></button>
            </div>

            <div className="rounded-3xl bg-[#F8FAFC] p-6 text-ink">
              <h3 className="text-2xl font-semibold">Realtime Tracking</h3>
              <p className="mt-2 text-muted">Monitor rental income and project milestones in real time.</p>
              <div className="mt-14 flex h-44 items-end gap-3" role="img" aria-label="Monthly income bar chart, April highest at ₦15.2M">
                {bars.map(([m, h], i) => (
                  <div key={m} className="relative flex h-full flex-1 items-end">
                    {m === 'Apr' && (
                      <span className="tip-pop absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#14663A] px-3 py-1.5 text-sm font-medium text-white" style={{ bottom: `calc(${h}% + 12px)`, animationDelay: `${i * 0.15 + 0.5}s` }}>
                        ₦15.2M<span aria-hidden="true" className="absolute left-1/2 top-full -mt-1.5 size-3 -translate-x-1/2 rotate-45 bg-[#14663A]" />
                      </span>
                    )}
                    <div className={`bar-grow w-full rounded-t-sm bg-gradient-to-b ${m === 'Apr' ? 'from-[#D5E6CD] to-[#6FA55A]' : 'from-[#EAF4E5] to-[#A8D39A]'}`} style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }} />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-3 text-center text-sm text-muted" aria-hidden="true">{bars.map(([m]) => <span key={m} className="flex-1">{m}</span>)}</div>
            </div>
          </div>
        </div>
      </Hero>

      <section className="grid gap-4 px-4 pt-4 md:grid-cols-2 md:px-[66px] lg:grid-cols-4">
        {stats.map(([l, v], i) => (
          <div key={l} className={`rounded-2xl p-8 ${i === 0 ? 'bg-[#2A1204] text-white' : 'bg-[#F1F4F8]'}`}>
            <p className={`text-sm ${i === 0 ? 'text-white/85' : 'text-muted'}`}>{l}</p>
            <p className={`mt-3 text-5xl font-semibold ${i === 0 ? '' : 'text-primary'}`}><CountUp value={v} /></p>
          </div>
        ))}
      </section>

      <section className="py-20 page-x">
        <Head a="Invest" b="Your Way" text="Multiple investment options designed to help you grow wealth and achieve your goals." />
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {ways.map(([img, t, d, to]) => (
            <Link key={t} to={to} className="w-full rounded-2xl bg-[#F1F4F8] p-6 transition hover:-translate-y-1 hover:shadow-lg sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <img loading="lazy" decoding="async" src={`/images/${img}.webp`} alt="" className="h-40 w-full object-contain" />
              <h3 className="mt-4 text-xl font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted">{d}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">Learn More <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid items-center gap-12 bg-[#F5F7FA] py-20 page-x lg:grid-cols-2">
        <div className="overflow-hidden rounded-[28px] bg-primary-50"><img loading="lazy" decoding="async" src="/images/signup-phone-woman.webp" alt="Woman celebrating beside the NeedHomes app dashboard" className="w-full" /></div>
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
        <Slider properties={properties} />
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
                  {img ? <img loading="lazy" decoding="async" src={`/images/${img}.webp`} alt={name} className="max-h-16 w-auto max-w-full object-contain" />
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

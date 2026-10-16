import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Naira from '../components/NairaIcon.jsx'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'

const intro = [
  ['Choose Your Home', 'Pick a verified property you want to own and lock in a clear savings path.'],
  ['Save at Your Pace', 'Pay gradually on a flexible plan that fits your budget and timeline.'],
  ['Build Toward Ownership', 'Every contribution moves you closer to full ownership without a heavy upfront cost.'],
  ['Become the Full Owner', 'Complete your plan and take ownership of the property on your terms.'],
]
// Each step owns the phone screen shown while it is hovered, focused or tapped.
const steps = [
  { title: 'Choose Property', text: 'Browse verified homes and select the one you want to own.', img: 'phone-property-hub', alt: 'Property Hub screen listing verified properties' },
  { title: 'Select Plan', text: 'Pick a flexible savings plan that fits your budget and timeline.', img: 'phone-start-saving', alt: 'Start Saving screen with amount and frequency options' },
  { title: 'Start Saving', text: 'Make regular contributions and track your progress toward ownership.', img: 'phone-investment-details', alt: 'Investment Details screen showing ownership progress' },
  { title: 'Own Your Property', text: 'Complete your plan and take full ownership of your home.', img: 'phone-happy-palace', alt: 'Property detail screen for a Save-to-Own home' },
]
const benefits = [
  'Save at your own pace with a plan that matches your income',
  'Lock in the property price while you complete your contributions',
  'Build toward ownership without waiting to raise the full amount upfront',
  'Become the full owner once your savings plan is complete',
]

function Pill({ children }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-sm"><Sparkles size={14} />{children}</span>
}

function Steps() {
  const [active, setActive] = useState(0)
  return (
    <section className="bg-[#F5F7FA] py-20 page-x">
      <Pill>How It Works</Pill>
      <h2 className="mt-5 text-4xl font-semibold md:text-5xl">Simple Steps to <span className="text-muted">Own Your Home</span></h2>
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <ol className="space-y-3" onMouseLeave={() => {}}>
          {steps.map((s, i) => {
            const on = i === active
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-current={on}
                  className={`flex w-full gap-4 rounded-2xl p-4 text-left transition-colors ${on ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}
                >
                  <span className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full transition-colors ${on ? 'bg-primary text-white' : 'bg-primary-50 text-primary'}`}><Naira size={16} /></span>
                  <span>
                    <span className={`block text-2xl font-medium transition-colors ${on ? 'text-primary' : 'text-ink'}`}>{s.title}</span>
                    <span className="mt-1 block max-w-[380px] text-muted">{s.text}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-[32px] bg-primary-50 px-12 pt-12 sm:px-20">
          <div className="relative aspect-[858/1050]">
            {steps.map((s, i) => (
              <img loading="lazy" decoding="async" key={s.img} src={`/images/${s.img}.webp`} alt={s.alt} aria-hidden={i !== active}
                className={`absolute inset-0 h-full w-full object-contain object-top transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-0'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SaveToOwn() {
  return (
    <>
      <Hero tag="Save-to-Own" title="Pay gradually toward a home and own it confidently"
        text="Save to Own allows you to secure a verified property and pay gradually through a flexible payment plan. Once your payments are complete, you become the full owner of the property." />

      <section className="py-20 page-x">
        <Pill>About Save to Own</Pill>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <h2 className="text-5xl font-semibold leading-tight">Save Gradually.<br /><span className="text-muted">Own Fully.</span></h2>
          <div className="max-w-[420px] space-y-4 text-muted">
            <p>Save to Own lets you pay gradually toward a property and become the full owner over time.</p>
            <p>You choose a verified home, follow a flexible plan, and take ownership when your payments are complete.</p>
          </div>
        </div>
        <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2 md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(odd)]:pr-10 border-ink/10">
          {intro.map(([t, d]) => (
            <div key={t} className="flex gap-4 border-ink/10"><span className="mt-1.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary-50 text-primary"><Naira size={14} /></span>
              <div><h3 className="text-2xl font-medium">{t}</h3><p className="mt-1 max-w-[360px] text-muted">{d}</p></div></div>
          ))}
        </div>
      </section>

      <Steps />

      <section className="grid items-center gap-12 py-20 page-x lg:grid-cols-2">
        <div className="overflow-hidden rounded-[32px] bg-primary-50 px-16 pt-12 sm:px-28">
          <img loading="lazy" decoding="async" src="/images/phone-exit-details.webp" alt="Exit Details screen showing an approved exit request" className="w-full" />
        </div>
        <div>
          <Pill>Exit</Pill>
          <h2 className="mt-5 text-5xl font-semibold leading-tight">Can't Complete your <span className="text-muted">Payment Plan</span></h2>
          <p className="mt-6 max-w-[520px] text-muted">If you are unable to continue with your save-to-own payment plan, you can request an exit.</p>
          <p className="mt-4 max-w-[520px] text-muted">Once your exit is approved, you will receive the amount you have paid towards the property, based on your eligible payments and the applicable exit terms.</p>
          <Link to="/property-hub" className="mt-7 inline-block rounded-xl bg-primary px-6 py-3 text-[15px] font-medium text-white">Buy a property</Link>
        </div>
      </section>

      <section className="grid items-center gap-12 pb-20 page-x lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-sm text-primary">Key Benefits</span>
          <h2 className="mt-5 text-5xl font-semibold leading-tight">Save steadily.<br /><span className="text-muted">Own completely.</span></h2>
          <p className="mt-5 max-w-[540px] text-muted">Save to Own makes property ownership reachable. You choose a verified home, pay gradually on a flexible plan, and become the full owner when your contributions are complete.</p>
          <ul className="mt-8 space-y-5">
            {benefits.map(b => <li key={b} className="flex items-center gap-4"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-50 text-primary"><Naira size={16} /></span><span className="max-w-[460px] text-[17px]">{b}</span></li>)}
          </ul>
          <Link to="/property-hub" className="mt-8 inline-block rounded-xl bg-primary px-6 py-3 text-[15px] font-medium text-white">Start Saving to own</Link>
        </div>
        <img loading="lazy" decoding="async" src="/images/save-to-own-hero-woman.webp" alt="Woman imagining her future home beside the Save to Own app" className="w-full rounded-[28px] object-cover" />
      </section>

      <CtaBand title="Ready to Start Saving" accent="Towards Ownership?" text="Join buyers who chose full ownership with verified properties and a clear path to possession" />
    </>
  )
}

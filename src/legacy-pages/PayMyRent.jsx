import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'

// `icon` = file in /images (no extension).
const steps = [
  { icon: 'icon-rent-goal', title: 'Set Your Rental Goal', text: ['Tell us how much you need for your next annual rent payment. Your rental goal helps us determine your required savings target and repayment structure.'] },
  { icon: 'icon-rent-account', title: 'Create Your Pay My Rent Account', text: ['Create your NeedHomes Pay My Rent account and complete the required information, including:'],
    list: ['Personal information', 'Valid identification and KYC', 'Employment or income information', 'Current rental information', 'Landlord/property details', 'Annual rent amount', 'Preferred repayment plan'], after: ['This information helps us verify your rental needs and assess your eligibility.'] },
  { icon: 'icon-rent-30', title: 'Start With 30%', text: ['NeedHomes calculates 30% of your verified annual rent as your initial savings target.'], after: ['This is the amount you work towards during the 90-day savings period.'] },
  { icon: 'icon-rent-fund-90', title: 'Build Your Rent Fund for 90 Days', text: ['Make scheduled payments into your NeedHomes Pay My Rent wallet over the 90-day period.', 'During this period, NeedHomes tracks your:'],
    list: ['Payment consistency', 'Savings progress', 'Income and cash-flow information', 'KYC status', 'Rent and property verification', 'Eligibility for the remaining 70% rent financing'], after: ['Your payment history helps demonstrate your ability to maintain the agreed repayment plan.'] },
  { icon: 'icon-rent-target-30', title: 'Reach Your 30% Target', text: ['Once you successfully reach your 30% savings target within the required period, your accumulated funds can move into a designated escrow arrangement with an approved financial partner, subject to applicable legal, regulatory, and financial requirements.'] },
  { icon: 'icon-rent-70', title: 'Access the Remaining 70%', text: ['Subject to eligibility, approval, and the applicable terms, the remaining 70% of your annual rent may be provided through our financing structure and financial partners.'], after: ['The financed amount is intended to complete your annual rent payment.'] },
  { icon: 'icon-rent-paid', title: 'Your Rent Is Paid', text: ['Once the required conditions are met, the applicable rent funds are disbursed directly to the verified landlord or property owner, helping you secure your accommodation without having to raise the entire annual rent upfront.'], after: ['Start Preparing for Your Rent Today'] },
]

export default function PayMyRent() {
  return (
    <>
      <Hero tag="Pay My Rent" badge="Coming Soon" title="Get Ready Before Your Rent Is Due" text="Rent shouldn't become a last-minute financial burden." primaryLabel="Pay My Rent Now" primaryTo="/pay-my-rent" />
      <section className="grid items-center gap-10 py-20 page-x lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-sm"><Sparkles size={14} />About Pay My Rent</span>
          <h2 className="mt-5 text-5xl font-semibold">Pay My Rent</h2>
          <div className="mt-6 max-w-[520px] space-y-4 text-sm text-muted">
            <p>With NeedHomes Pay My Rent, you can start preparing for your annual rent payment ahead of time. Save towards 30% of your annual rent over 90 days, while becoming eligible for the remaining 70% rent financing through our financing structure and financial partners.</p>
            <p>Instead of struggling to raise your full annual rent at once, you can plan ahead, build a consistent savings history, and work towards having your rent covered when it is due.</p>
          </div>
        </div>
        <img loading="lazy" decoding="async" src="/images/pay-my-rent-hero.webp" alt="Man celebrating after paying his rent from his phone" className="w-full rounded-2xl object-cover" />
      </section>
      <section className="pb-20 page-x">
        <h2 className="text-5xl font-semibold">How it Works</h2>
        <ol className="mt-6 divide-y divide-ink/10">
          {steps.map((s, i) => (
            <li key={s.title} className="py-7">
              <div className="flex items-center gap-4">
                {s.icon ? <img loading="lazy" decoding="async" src={`/images/${s.icon}.webp`} alt="" className="size-20" />
                  : <span aria-hidden className="grid size-16 place-items-center rounded-full bg-primary-50 text-2xl font-semibold text-primary">{i + 1}</span>}
                <h3 className="text-2xl font-medium">{s.title}</h3>
              </div>
              <div className="mt-4 max-w-5xl space-y-3 text-muted">
                {s.text.map(t => <p key={t}>{t}</p>)}
                {s.list && <ul className="ml-5 list-disc space-y-1 text-sm">{s.list.map(l => <li key={l}>{l}</li>)}</ul>}
                {s.after?.map(t => <p key={t}>{t}</p>)}
              </div>
            </li>
          ))}
        </ol>
        <Link to="/pay-my-rent" className="mt-6 inline-block rounded-xl bg-primary px-8 py-3.5 font-medium text-white">Get Started</Link>
      </section>
      <CtaBand single title="Plan Ahead. Save Consistently." accent="Pay Your Rent." text="Join others using Pay My Rent to prepare for their annual rent and reduce the financial pressure when rent is due" primaryLabel="Pay my rent Now" primaryTo="/pay-my-rent" />
    </>
  )
}

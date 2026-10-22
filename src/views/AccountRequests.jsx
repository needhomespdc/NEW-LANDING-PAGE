'use client'
import { useState } from 'react'
import { Link } from '@/lib/router'
import { Info, Mail } from 'lucide-react'
import { submitForm } from '@/lib/submitForm'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import FormSuccessModal from '../components/FormSuccessModal.jsx'

const a = 'text-primary underline-offset-2 hover:underline'
const Mail_ = () => <a href="mailto:support@needhomespdc.com" className={a}>support@needhomespdc.com</a>
const field = 'mt-1.5 w-full rounded-lg border border-ink/10 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
const label = 'block text-sm uppercase text-muted'

function RequestForm({ kind, intro, confirm, button }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [showSuccess, setShowSuccess] = useState(false)
  async function onSubmit(e) {
    e.preventDefault()
    const el = e.currentTarget
    setStatus({ state: 'sending', message: '' })
    try {
      await submitForm(kind, Object.fromEntries(new FormData(el)))
      el.reset()
      setStatus({ state: 'idle', message: '' })
      setShowSuccess(true)
    } catch (err) { setStatus({ state: 'error', message: err.message }) }
  }
  return (
    <form onSubmit={onSubmit} className="relative rounded-3xl bg-[#EEF2F6] p-6 md:p-8">
      <h2 className="text-3xl font-medium">Submit a request.</h2>
      <p className="mt-4 text-muted">{intro}</p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="mt-4 space-y-5">
        <label className={label}>Full name<span className="text-primary"> *</span><input required name="name" autoComplete="name" className={field} /></label>
        <label className={label}>Account email address<span className="text-primary"> *</span><input required type="email" name="email" autoComplete="email" className={field} /></label>
        <label className={label}>Additional details<textarea name="details" rows={6} className={`${field} resize-none`} /></label>
      </div>
      <label className="mt-5 flex items-start gap-3 text-muted"><input required type="checkbox" name="confirm" className="mt-1 size-4 accent-[#EF6A1B]" />{confirm}</label>
      <p className="mt-4 text-sm text-muted">By providing your name, phone number and email you consent to NeedHomes Property Investment Limited's use of your personal data in accordance with the <Link to="/privacy" className={a}>Privacy Policy</Link>.</p>
      <button disabled={status.state === 'sending'} className="mt-5 rounded-xl bg-primary px-8 py-3.5 font-medium text-white disabled:opacity-60">{status.state === 'sending' ? 'Sending…' : button}</button>
      <p className="mt-5 flex items-center gap-3 text-muted"><Mail size={18} className="text-primary" />Prefer email? Write to support@needhomespdc.com</p>
      {status.state === 'error' && <p role="alert" className="mt-3 text-sm text-red-600">{status.message}</p>}
      <FormSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Request received"
        message="Thanks. Your request has been received and we will follow up at the email provided."
      />
    </form>
  )
}

function Page({ hero, sections, note, form }) {
  return (
    <>
      <Hero title={hero.title} text={hero.text} />
      <section className="grid gap-10 py-20 page-x lg:grid-cols-2">
        <div className="space-y-8 text-muted">
          {sections.map(s => (
            <div key={s.h}>
              <h2 className="text-2xl font-semibold text-ink">{s.h}</h2>
              {s.p && <p className="mt-2">{s.p}</p>}
              {s.list && <ul className="ml-5 mt-2 list-disc space-y-1">{s.list.map((l, i) => <li key={i}>{l}</li>)}</ul>}
              {s.after && <p className="mt-2">{s.after}</p>}
            </div>
          ))}
          <aside className="rounded-2xl border border-ink/10 bg-[#EEF2F6] p-6"><Info size={20} className="text-primary" /><p className="mt-4">{note}</p></aside>
        </div>
        <RequestForm {...form} />
      </section>
      <CtaBand title="Ready to Start your" accent="Investment Journey" text="Join investors building wealth the smart way." />
    </>
  )
}

export const DataDeletion = () => (
  <Page
    hero={{ title: 'Request Data Deletion', text: 'Use this page to ask NeedHomes to delete your account and associated personal data. You do not need to be logged in to submit a request.' }}
    sections={[
      { h: 'How to request deletion', list: ['In the NeedHomes app: open More, then choose Delete account.', 'On this page: submit the form with the email on your account. We will verify the request and follow up at that address.', <>Or email <Mail_ /> with the subject “Data deletion request”.</>], after: <>If you only want to pause access without erasing your data, use <Link to="/account-deactivation" className={a}>Request account deactivation</Link> instead.</> },
      { h: 'Before we can delete an account', p: 'For security and regulatory reasons, deletion is completed after these conditions are met:', list: ['Wallet balance is withdrawn.', 'Active investments are closed or exited.', 'Pending exit requests are resolved.', 'Active or under-review resale listings are cancelled.'] },
      { h: 'What is deleted', list: ['Name, email, phone number, and profile photo.', 'KYC documents and identity details such as NIN, CAC files, and liveness images.', 'Login credentials and biometric device identifiers.', 'Referral codes and personally identifiable support records.'] },
      { h: 'What may be retained', p: 'Limited records may be kept where Nigerian law, tax, AML, or dispute-resolution duties require it. Those records are anonymized where possible and are not used to identify you for marketing.', list: ['Investment and payment history required for accounting.', 'Records needed to complete pending legal or regulatory inquiries.'] },
    ]}
    note={<>Valid requests are processed within 30 days after identity is confirmed and the conditions above are met. Read our <Link to="/privacy" className={a}>Privacy Policy</Link> for more detail.</>}
    form={{ kind: 'data-deletion', intro: 'We will only use this information to verify and process your deletion request.', confirm: 'I confirm I am the account owner and I request deletion of my NeedHomes account and associated personal data.', button: 'Submit deletion request' }}
  />
)

export const Deactivation = () => (
  <Page
    hero={{ title: 'Deactivate Account', text: 'Deactivation temporarily disables your NeedHomes account. Your data is kept so you can ask support to restore access later. You do not need to be logged in to submit a request.' }}
    sections={[
      { h: 'How to request deactivation', list: ['In the NeedHomes app: open More, then choose Delete account.', 'On this page: submit the form with the email on your account. We will verify the request and follow up at that address.', <>Or email <Mail_ /> with the subject “Account deactivation request”.</>] },
      { h: 'What deactivation does', list: ['Your account is temporarily disabled and you cannot sign in.', 'Active sessions are signed out, including biometric login.', 'Your profile, investments, wallet, and KYC records are kept so the account can be restored.', 'To restore access later, contact support from the email on the account.'] },
      { h: 'Deactivation vs deletion', p: 'Choose deactivation if you only want to pause the account. Choose deletion if you want your personal data erased. Deletion cannot be undone.', after: <>To erase your account and personal data instead, use <Link to="/data-deletion" className={a}>Request data deletion</Link>.</> },
    ]}
    note={<>Valid deactivation requests are processed within <b>7 days</b> after we confirm the account. Read our <Link to="/privacy" className={a}>Privacy Policy</Link> for how we handle your information while the account is paused.</>}
    form={{ kind: 'deactivation', intro: 'We will only use this information to verify and process your deactivation request.', confirm: 'I confirm I am the account owner and I request temporary deactivation of my NeedHomes account.', button: 'Submit deactivation request' }}
  />
)

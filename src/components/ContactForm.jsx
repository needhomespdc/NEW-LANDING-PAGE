'use client'
import { useState } from 'react'
import { submitForm } from '@/lib/submitForm'

const field = 'mt-1.5 w-full rounded-lg border border-ink/10 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
const label = 'block text-sm uppercase text-muted'
const Req = () => <span className="text-primary"> *</span>

// `form` must match a key in src/lib/forms.js ('contact' or 'partner').
export default function ContactForm({ form, title, intro, button, id }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  async function onSubmit(e) {
    e.preventDefault()
    const el = e.currentTarget
    setStatus({ state: 'sending', message: '' })
    try {
      await submitForm(form, Object.fromEntries(new FormData(el)))
      el.reset()
      setStatus({ state: 'success', message: 'Thanks. Your message has been received and our team will get back to you.' })
    } catch (err) { setStatus({ state: 'error', message: err.message }) }
  }
  return (
    <form id={id} onSubmit={onSubmit} className="relative rounded-3xl bg-[#EEF2F6] p-6 md:p-8">
      <h2 className="text-3xl font-medium md:text-[32px]">{title}</h2>
      {intro && <p className="mt-3 text-sm text-muted">{intro}</p>}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="mt-5 grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <label className={label}>First name<Req /><input required name="first" autoComplete="given-name" className={field} /></label>
        <label className={label}>Last name<Req /><input required name="last" autoComplete="family-name" className={field} /></label>
        <label className={label}>Telephone no<Req /><input required type="tel" name="tel" autoComplete="tel" className={field} /></label>
        <label className={label}>Email address<Req /><input required type="email" name="email" autoComplete="email" className={field} /></label>
        <label className={`${label} sm:col-span-2`}>Your message<textarea name="message" rows={7} className={`${field} resize-none`} /></label>
      </div>
      <p className="mt-5 text-sm text-muted">By providing your name, phone number and email you consent to NeedHomes Property Investment Limited's use of your personal data in accordance with the <a href="/privacy" className="text-primary">Privacy Policy</a>.</p>
      <button disabled={status.state === 'sending'} className="mt-5 rounded-xl bg-primary px-10 py-3.5 font-medium text-white disabled:opacity-60">{status.state === 'sending' ? 'Sending…' : button}</button>
      <p role={status.state === 'error' ? 'alert' : 'status'} className={`mt-4 text-sm ${status.state === 'error' ? 'text-red-600' : 'text-primary'}`}>{status.message}</p>
    </form>
  )
}

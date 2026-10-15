import { useState } from 'react'
const field = 'mt-1.5 w-full rounded-lg border border-ink/10 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
const label = 'block text-sm uppercase text-muted'
function Req() { return <span className="text-primary"> *</span> }

// TODO: replace the submit handler with your backend / Firebase call.
export default function ContactForm({ title, intro, button, id }) {
  const [sent, setSent] = useState(false)
  const submit = e => { e.preventDefault(); setSent(true) }
  return (
    <form id={id} onSubmit={submit} className="rounded-3xl bg-[#EEF2F6] p-6 md:p-8">
      <h2 className="text-3xl font-medium md:text-[32px]">{title}</h2>
      {intro && <p className="mt-3 text-sm text-muted">{intro}</p>}
      <div className="mt-5 grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <label className={label}>First name<Req /><input required name="first" className={field} /></label>
        <label className={label}>Last name<Req /><input required name="last" className={field} /></label>
        <label className={label}>Telephone no<Req /><input required type="tel" name="tel" className={field} /></label>
        <label className={label}>Email address<Req /><input required type="email" name="email" className={field} /></label>
        <label className={`${label} sm:col-span-2`}>Your message<textarea name="message" rows={7} className={`${field} resize-none`} /></label>
      </div>
      <p className="mt-5 text-sm text-muted">By providing your name, phone number and email you consent to NeedHomes Property Investment Limited's use of your personal data in accordance with the <a href="/privacy" className="text-primary">Privacy Policy</a>.</p>
      <button className="mt-5 rounded-xl bg-primary px-10 py-3.5 font-medium text-white">{button}</button>
      <p role="status" className="mt-4 text-sm text-primary">{sent ? 'Thanks. Your message has been received and our team will get back to you.' : ''}</p>
    </form>
  )
}

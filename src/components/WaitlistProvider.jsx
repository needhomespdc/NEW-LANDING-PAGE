'use client'
import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Link } from '@/lib/router'
import { submitForm } from '@/lib/submitForm'

const Ctx = createContext(() => {})
// const openWaitlist = useWaitlist(); openWaitlist('get-started')  (the argument is sent along as `trigger`)
export const useWaitlist = () => useContext(Ctx)

function WaitlistForm({ trigger, onClose }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  async function onSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'sending', message: '' })
    try {
      await submitForm('waitlist', { ...Object.fromEntries(new FormData(e.currentTarget)), trigger })
      setStatus({ state: 'success', message: '' })
    } catch (err) { setStatus({ state: 'error', message: err.message }) }
  }
  if (status.state === 'success') {
    return (
      <div role="status">
        <h2 id="waitlist-title" className="text-3xl font-semibold">You're on the list.</h2>
        <p className="mt-3 text-muted">Thanks for joining. We'll email you as soon as NeedHomes opens up.</p>
        <button onClick={onClose} className="mt-6 rounded-xl bg-primary px-8 py-3 font-medium text-white">Close</button>
      </div>
    )
  }
  return (
    <form onSubmit={onSubmit} className="relative">
      <h2 id="waitlist-title" className="pr-8 text-3xl font-semibold">Join the waitlist</h2>
      <p className="mt-3 text-muted">Get early access to NeedHomes. Drop your email and we'll let you know as soon as we open up.</p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <label className="mt-6 block text-sm uppercase text-muted">Email address<span className="text-primary"> *</span>
        <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className="mt-1.5 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-base normal-case text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </label>
      <button disabled={status.state === 'sending'} className="mt-5 w-full rounded-xl bg-primary py-3.5 font-medium text-white disabled:opacity-60">{status.state === 'sending' ? 'Joining…' : 'Join the waitlist'}</button>
      <p role="alert" className="mt-3 min-h-5 text-sm text-red-600">{status.state === 'error' ? status.message : ''}</p>
      <p className="mt-2 text-xs text-muted">We'll only use your email to tell you about the launch. See our <Link to="/privacy" onClick={onClose} className="text-primary underline">Privacy Policy</Link>.</p>
    </form>
  )
}

export default function WaitlistProvider({ children }) {
  const ref = useRef(null)
  const [session, setSession] = useState({ id: 0, trigger: 'get-started' })
  const open = useCallback((trigger = 'get-started') => {
    setSession(s => ({ id: s.id + 1, trigger }))
    const d = ref.current
    if (d && !d.open) { document.documentElement.style.overflow = 'hidden'; d.showModal() }
    setTimeout(() => ref.current?.querySelector('input[name=email]')?.focus(), 60)
  }, [])
  const close = () => ref.current?.close()
  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog ref={ref} aria-labelledby="waitlist-title" onClose={() => { document.documentElement.style.overflow = '' }}
        onClick={e => { if (e.target === ref.current) close() }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-black/60">
        <div className="relative p-7 md:p-9">
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-muted hover:bg-ink/5"><X size={20} /></button>
          <WaitlistForm key={session.id} trigger={session.trigger} onClose={close} />
        </div>
      </dialog>
    </Ctx.Provider>
  )
}

'use client'

import { useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'

const WHATSAPP_CONTACT = 'https://wa.me/2349018464742'

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  function continueToWhatsApp(event) {
    event.preventDefault()
    const text = message.trim()
    if (!text) return
    window.open(`${WHATSAPP_CONTACT}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed bottom-5 right-4 z-40 md:bottom-7 md:right-7">
      {open && (
        <section aria-label="NeedHomes WhatsApp chat" className="mb-3 w-[min(350px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,.24)]">
          <div className="flex items-center justify-between bg-black px-5 py-4 text-white">
            <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#25D366]"><MessageCircle size={20} /></span><div><h2 className="font-semibold">NeedHomes</h2><p className="text-xs text-white/70">WhatsApp support</p></div></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close WhatsApp chat" className="grid size-9 place-items-center rounded-full hover:bg-white/10"><X size={19} /></button>
          </div>
          <form onSubmit={continueToWhatsApp} className="p-4">
            <p className="rounded-xl bg-[#F1F4F8] p-3 text-sm text-muted">Hello! How can NeedHomes help you today?</p>
            <label htmlFor="whatsapp-message" className="sr-only">Your WhatsApp message</label>
            <textarea id="whatsapp-message" value={message} onChange={event => setMessage(event.target.value)} rows={3} placeholder="Type your message..." className="mt-3 w-full resize-none rounded-xl border border-black/10 p-3 text-sm outline-none transition focus:border-primary" />
            <button type="submit" disabled={!message.trim()} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50">Continue in WhatsApp <Send size={17} /></button>
            <p className="mt-2 text-center text-xs text-muted">WhatsApp will open with your message ready to send.</p>
          </form>
        </section>
      )}
      <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label={open ? 'Close NeedHomes WhatsApp chat' : 'Chat with NeedHomes on WhatsApp'}
        className="group ml-auto grid size-14 place-items-center rounded-full border-4 border-white bg-[#25D366] text-white shadow-[0_12px_32px_rgba(0,0,0,.24)] transition hover:-translate-y-1 hover:bg-[#1FB95A] focus-visible:-translate-y-1 md:size-16">
        {open ? <X size={28} aria-hidden="true" /> : <MessageCircle size={28} strokeWidth={2.2} aria-hidden="true" />}
        {!open && <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity md:block md:group-hover:opacity-100">Chat with NeedHomes</span>}
      </button>
    </div>
  )
}

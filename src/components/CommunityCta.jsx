'use client'

import { MessageCircle } from 'lucide-react'
import { useWaitlist } from './WaitlistProvider.jsx'
import { links, ext } from '../links.js'

export default function CommunityCta() {
  const openWaitlist = useWaitlist()
  const communityUrl = links.whatsappCommunity
  return (
    <section className="bg-mist py-20 text-center page-x">
      <h2 className="text-[34px] font-semibold leading-tight md:text-5xl">Ready to Start Your<br /><span className="text-primary">Investment Journey</span></h2>
      <p className="mx-auto mt-5 max-w-[640px] text-muted">Join investors building wealth the smart way.</p>
      <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => openWaitlist('homepage-cta')} className="rounded-xl bg-primary px-7 py-3.5 font-medium text-white">Join the waitlist</button>
        <a href={communityUrl} {...ext(communityUrl)} aria-disabled={communityUrl === '#'} className={`inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366] bg-white px-7 py-3.5 font-medium text-[#128C4A] ${communityUrl === '#' ? 'cursor-not-allowed opacity-60' : 'hover:bg-[#F0FFF5]'}`}>
          <MessageCircle size={19} />Join Our WhatsApp Community
        </a>
      </div>
    </section>
  )
}

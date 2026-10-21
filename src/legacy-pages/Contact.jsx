import { Phone, MessageCircle, Mail } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import ContactForm from '../components/ContactForm.jsx'

export default function Contact() {
  return (
    <>
      <Hero tag="Contact us" title="How can we Help You" accent="?" text="Have a question about a property, investment options or your Needhomes account? Our team is ready to assist you." />
      <section className="grid gap-12 py-20 page-x lg:grid-cols-[1fr_1.35fr]">
        <div>
          <h2 className="text-5xl font-semibold leading-tight">9 Orchid Road,<br />Lekki, Lagos</h2>
          <ul className="mt-6 space-y-4 text-xl text-muted">
            <li><a href="tel:+2347025005857" className="flex items-center gap-4"><Phone className="text-primary" size={22} />+234 702 500 5857</a></li>
            <li><a href="https://wa.me/2349018464742" className="flex items-center gap-4"><MessageCircle className="text-primary" size={22} />2349018464742</a></li>
            <li><a href="mailto:support@needhomespdc.com" className="flex items-center gap-4"><Mail className="text-primary" size={22} />support@needhomespdc.com</a></li>
          </ul>
        </div>
        <ContactForm title="Send a message." button="Send message" />
      </section>
      <CtaBand title="Ready to Start Your" accent="Investment Journey" text="Join the thousand of users building their property future. Own, invest, save towards property or plan ahead for your rent." />
    </>
  )
}

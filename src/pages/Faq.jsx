import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import FaqList from '../components/FaqList.jsx'

export default function Faq() {
  return (
    <>
      <Hero title="FAQs" text="Have a question about a property, investment options or your Needhomes account? Our team is ready to assist you." />
      <section className="py-20 page-x">
        <h1 className="mb-12 text-4xl font-semibold md:text-5xl">Frequently Asked <span className="text-muted">Questions (FAQ)</span></h1>
        <FaqList />
      </section>
      <CtaBand title="Ready to Start your" accent="Investment Journey" text="Join investors building wealth the smart way." />
    </>
  )
}

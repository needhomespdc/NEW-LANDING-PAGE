import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'

const links = [['Property Hub', '/property-hub'], ['Save to Own', '/investment/save-to-own'], ['Pay My Rent', '/pay-my-rent'], ['Partner with us', '/partner'], ['FAQs', '/faq'], ['Contact us', '/contact']]

export default function NotFound() {
  return (
    <>
      <Hero tag="404" title="Page not found" text="The page you're looking for doesn't exist or has moved. Let's get you back on track." primaryLabel="Back to Home" primaryTo="/" />
      <section className="py-20 page-x">
        <h2 className="text-3xl font-semibold md:text-4xl">Popular <span className="text-muted">pages</span></h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map(([t, to]) => <li key={to}><Link to={to} className="block rounded-2xl bg-[#F1F4F8] px-6 py-5 text-lg font-medium transition hover:-translate-y-0.5 hover:shadow-lg">{t}</Link></li>)}
        </ul>
      </section>
    </>
  )
}

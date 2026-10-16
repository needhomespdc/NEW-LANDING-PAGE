import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import { properties } from '../data/properties.js'

// Placeholder until the real property details page is designed.
export default function PropertyDetail() {
  const p = properties.find(x => x.slug === useParams().slug)
  return (
    <>
      <Hero tag={p?.type || 'Property Hub'} title={p?.name || 'Property not found'} text={p ? `${p.loc}. Full property details are coming soon.` : 'We could not find that property.'} ctas={false} />
      <section className="py-16 page-x">
        <Link to="/property-hub" className="inline-flex items-center gap-2 text-primary"><ArrowLeft size={18} />Back to Property Hub</Link>
        {p && (
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
            <img loading="lazy" decoding="async" src={`/images/${p.img}.webp`} alt={p.name} className="w-full rounded-2xl object-cover" />
            <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-[#F1F4F8] p-6">
              <div><dt className="text-sm text-muted">Price per {p.unit}</dt><dd className="text-2xl font-semibold">{p.price}</dd></div>
              <div><dt className="text-sm text-muted">Slots left</dt><dd className="text-2xl font-semibold">{p.slots}</dd></div>
              <div><dt className="text-sm text-muted">Offer period</dt><dd className="text-xl font-medium text-primary">{p.offer}</dd></div>
              <div><dt className="text-sm text-muted">Location</dt><dd className="text-xl font-medium">{p.loc}</dd></div>
            </dl>
          </div>
        )}
      </section>
    </>
  )
}

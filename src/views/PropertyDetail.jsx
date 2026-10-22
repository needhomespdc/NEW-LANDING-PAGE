'use client'
import Image from 'next/image'
import { Link } from '@/lib/router'
import { ArrowLeft } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import { imgSrc, leftLabel } from '../data/properties.js'

// Placeholder layout until the real property details page is designed.
export default function PropertyDetail({ property: p }) {
  return (
    <>
      <Hero tag={p.type} title={p.name} text={`${p.loc}. Full property details are coming soon.`} ctas={false} />
      <section className="py-16 page-x">
        <Link to="/property-hub" className="inline-flex items-center gap-2 text-primary"><ArrowLeft size={18} />Back to Property Hub</Link>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
          <Image src={imgSrc(p)} alt={p.name} width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full rounded-2xl object-cover" />
          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-[#F1F4F8] p-6">
            <div><dt className="text-sm text-muted">Price per {p.unit}</dt><dd className="text-2xl font-semibold">{p.price}</dd></div>
            <div><dt className="text-sm text-muted">{leftLabel(p)}</dt><dd className="text-2xl font-semibold">{p.slots}</dd></div>
            <div><dt className="text-sm text-muted">{p.offerLabel || 'Offer period'}</dt><dd className="text-xl font-medium text-primary">{p.offer}</dd></div>
            <div><dt className="text-sm text-muted">Location</dt><dd className="text-xl font-medium">{p.loc}</dd></div>
          </dl>
          {p.description && <p className="text-muted lg:col-span-2">{p.description}</p>}
        </div>
      </section>
    </>
  )
}

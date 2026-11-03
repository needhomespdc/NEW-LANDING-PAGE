'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/lib/router'
import { ArrowLeft, FileText, MapPin, ShieldCheck, Star, MapPinned, ExternalLink } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import PropertyBadges from '../components/PropertyBadges.jsx'
import { useWaitlist } from '../components/WaitlistProvider.jsx'
import { imgSrc, leftLabel } from '../data/properties.js'

const highlightIcons = { map_pin: MapPin, star: Star, shield_check: ShieldCheck }

function DetailRow({ label, value }) {
  if (value == null || value === '') return null
  return <div className="flex items-start justify-between gap-5 border-b border-black/8 py-3 last:border-0"><dt className="text-sm text-muted">{label}</dt><dd className="text-right font-medium">{value}</dd></div>
}

export default function PropertyDetail({ property: p }) {
  const openWaitlist = useWaitlist()
  const galleryImages = [
    ...(p.images || [])
      .slice()
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map((image) => ({
        src: image.secureUrl || image.url,
        alt: image.altText || `${p.name} property image`,
      })),
    { src: imgSrc(p), alt: `${p.name} in ${p.loc}` },
  ].filter((image, index, images) => image.src && images.findIndex(candidate => candidate.src === image.src) === index)
  const [activeImage, setActiveImage] = useState(galleryImages[0]?.src || imgSrc(p))
  const activeAlt = galleryImages.find(image => image.src === activeImage)?.alt || `${p.name} in ${p.loc}`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name}, ${p.loc}`)}`
  const description = p.description || `${p.name} is a verified ${p.type.toLowerCase()} property opportunity in ${p.loc}, selected to help buyers and investors build long-term value through real estate.`
  const highlights = p.highlights?.length ? p.highlights : [
    { label: 'Verified Property', iconKey: 'shield_check' },
    { label: 'Strategic Location', iconKey: 'map_pin' },
    { label: 'Growth Potential', iconKey: 'star' },
  ]

  return (
    <>
      <header className="px-4 pt-4 md:px-[66px]">
        <Navbar />
        <div className="relative isolate overflow-hidden rounded-[32px] bg-black md:rounded-[40px]">
          <img src="/images/hero-bg.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-soft-light" />
          <div className="relative pb-12 pt-[76px] md:pb-14 md:pt-[84px]">
            <Breadcrumbs currentTitle={p.name} />
            <div className="mt-8 px-6 md:px-[48px]">
              <PropertyBadges property={p} />
              <h1 className="mt-5 max-w-4xl text-[36px] font-semibold uppercase leading-tight tracking-tight text-white md:text-[52px]">{p.name}</h1>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.loc} on Google Maps`} className="mt-3 inline-flex items-center gap-2 text-white/80 transition hover:text-white focus-visible:text-white">
                <MapPin size={18} className="text-primary" />{p.loc}<ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="py-14 page-x">
        <Link to="/property-hub" className="inline-flex items-center gap-2 text-primary"><ArrowLeft size={18} />Back to Property Hub</Link>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,.75fr)]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#F1F4F8]">
              <Image src={activeImage} alt={activeAlt} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
            </div>
            {galleryImages.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2" role="list" aria-label={`${p.name} image gallery`}>
                {galleryImages.map((image, index) => (
                  <button key={image.src} type="button" role="listitem" onClick={() => setActiveImage(image.src)} aria-label={`View property image ${index + 1}`} aria-pressed={activeImage === image.src}
                    className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-[#F1F4F8] transition md:w-28 ${activeImage === image.src ? 'border-primary shadow-sm' : 'border-transparent opacity-75 hover:opacity-100'}`}>
                    <Image src={image.src} alt="" fill sizes="112px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <section className="mt-10">
              <h2 className="text-3xl font-semibold">About this property</h2>
              <p className="mt-4 leading-relaxed text-muted">{description}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-3xl font-semibold">Highlights</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {highlights.map(({ label, iconKey }) => {
                  const Icon = highlightIcons[iconKey] || MapPinned
                  return <li key={label} className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary"><Icon size={19} /></span><span>{label}</span></li>
                })}
              </ul>
            </section>

            {p.documents?.length > 0 && (
              <section className="mt-10">
                <h2 className="text-3xl font-semibold">Documents</h2>
                <div className="mt-5 space-y-3">
                  {p.documents.map(document => (
                    <a key={document.id || document.fileName} href={document.secureUrl || document.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 p-4 transition hover:border-primary hover:bg-primary-50/40">
                      <span className="flex items-center gap-3"><FileText size={20} className="text-primary" />{document.fileName || document.originalFilename || 'Property document'}</span><ExternalLink size={17} className="text-muted" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,.08)] lg:sticky lg:top-28">
            <p className="text-sm uppercase tracking-wide text-muted">Starting from</p>
            <p className="mt-2 text-4xl font-semibold text-primary">{p.price || 'Contact us'}</p>
            <p className="mt-1 text-sm text-muted">per {p.unit}</p>
            <dl className="mt-6">
              <DetailRow label={leftLabel(p)} value={p.slots} />
              <DetailRow label="Return type" value={p.returnType} />
              <DetailRow label="Stage" value={p.developmentStage} />
              <DetailRow label="Land size" value={p.landSize} />
              <DetailRow label="Permit" value={p.buildingPermitNumber} />
              <DetailRow label={p.offerLabel || 'Investment window'} value={p.offer} />
            </dl>
            {p.canAcceptInvestments
              ? <a href="https://app.needhomespdc.com/" className="mt-6 block rounded-xl bg-primary px-6 py-3.5 text-center font-medium text-white">Open in app</a>
              : <button type="button" onClick={() => openWaitlist(`property-${p.slug}`)} className="mt-6 w-full rounded-xl bg-primary px-6 py-3.5 font-medium text-white">Join waitlist to invest</button>}
            <Link to="/contact" className="mt-3 block rounded-xl border border-black/15 px-6 py-3.5 text-center font-medium">Speak with an adviser</Link>
          </aside>
        </div>
      </main>
    </>
  )
}

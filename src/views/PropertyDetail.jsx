'use client'

import { useEffect, useMemo, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
import { Link } from '@/lib/router'
import {
  ArrowLeft, Building2, Car, ChevronLeft, ChevronRight, Copy, Download,
  ExternalLink, FileText, Hammer, MapPin, Phone, Play,
  ShieldCheck, Sparkles, Star, TrendingUp, Wrench, X,
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import PropertyBadges from '../components/PropertyBadges.jsx'
import { useWaitlist } from '../components/WaitlistProvider.jsx'
import { imgSrc } from '../data/properties.js'

const modelConfig = {
  fractional: { label: 'Fractional Ownership', tag: 'bg-[#55219A] text-white', section: 'Investment Details', cta: 'Invest Now', priceLabel: 'Price per slot' },
  'land-banking': { label: 'Land Banking', tag: 'bg-primary text-white', section: 'Overview', cta: 'Buy Now', priceLabel: 'Price per plot' },
  'save-to-own': { label: 'Save-to-Own', tag: 'bg-[#078BE8] text-white', section: 'Overview', cta: 'Save Now', priceLabel: 'Price per unit' },
  'co-development': { label: 'Co-development', tag: 'bg-[#118B5B] text-white', section: 'Overview', cta: 'Join Project', priceLabel: 'Price per slot' },
  outright: { label: 'Outright', tag: 'bg-white text-ink', section: 'Overview', cta: 'Acquire Now', priceLabel: 'Price per unit' },
}

const highlightIcons = {
  map_pin: MapPin, star: Star, shield_check: ShieldCheck, trending_up: TrendingUp,
  wrench: Wrench, car: Car, sparkles: Sparkles, building: Building2, hammer: Hammer,
}

const money = value => value == null || value === '' ? null : `₦${Number(value).toLocaleString('en-NG')}`
const formatDate = value => value ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value)) : null
const dateRange = (start, end) => start && end ? `${formatDate(start)} – ${formatDate(end)}` : null
const duration = (start, end) => {
  if (!start || !end) return null
  const days = Math.max(1, Math.ceil((new Date(end) - new Date(start)) / 86400000))
  return `${days} day${days === 1 ? '' : 's'}`
}
const fact = (property, pattern) => property.keyFacts?.find(item => pattern.test(item.label))?.value
const phoneDigits = value => String(value || '').replace(/\D/g, '').replace(/^0/, '234')

function Panel({ title, children, className = '' }) {
  return <section className={`rounded-2xl bg-white p-5 md:p-6 ${className}`}><h2 className="text-xl font-semibold">{title}</h2>{children}</section>
}

function Rows({ rows }) {
  return <dl className="mt-4">{rows.filter(([, value]) => value != null && value !== '').map(([label, value, special]) => (
    <div key={label} className="flex items-start justify-between gap-5 border-b border-[#DCE3EA] py-3.5 last:border-0">
      <dt className="text-muted">{label}</dt>
      <dd className={`text-right font-medium ${special || ''}`}>{value}</dd>
    </div>
  ))}</dl>
}

function modelRows(p, model, windowOpen) {
  if (model === 'fractional') return [
    ['Total Slots', p.inventoryTotal || p.slots],
    ['Offer Period', p.offer],
    ['Investment Window', dateRange(p.investmentWindowStart, p.investmentWindowEnd)],
    ['Holding Period', fact(p, /holding/i)],
    ['Investment Duration', duration(p.investmentWindowStart, p.investmentWindowEnd) || (p.investmentWindowMonths ? `${p.investmentWindowMonths} month${p.investmentWindowMonths === 1 ? '' : 's'}` : null)],
    ['Minimum Slots to Buy', 1],
    ['Status', <span key="status" className={`rounded-lg px-3 py-1 ${windowOpen ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{windowOpen ? 'Window Open' : 'Window Closed'}</span>],
  ]
  if (model === 'land-banking') return [
    ['Available Plots', p.slots], ['Price Per Plot', money(p.minInvestment)], ['Land Size Per Plot', p.landSize],
    ['Buy-back Option', p.buyBackOption ?? (p.allowResale ? 'Yes' : 'No')],
  ]
  if (model === 'save-to-own') return [
    ['Available Units', p.slots], ['Property Price', money(p.minInvestment)], ['Land Size', p.landSize],
  ]
  if (model === 'co-development') return [
    ['Investment Window', p.offer], ['Investment Duration', dateRange(p.investmentWindowStart, p.investmentWindowEnd)],
    ['Project End Date', formatDate(p.projectEndDate)], ['Project Duration', duration(p.investmentWindowStart, p.projectEndDate)],
    ['Co-Developer Slots', p.inventoryTotal || p.slots],
  ]
  return []
}

export default function PropertyDetail({ property: p }) {
  const openWaitlist = useWaitlist()
  const model = p.modelType || String(p.type || '').toLowerCase().replace(/\s+/g, '-')
  const config = modelConfig[model] || modelConfig.fractional
  const soldOut = Boolean(p.soldOut || p.slots <= 0 || /sold/i.test(String(p.status || '')))
  const windowOpen = Boolean(!soldOut && p.canAcceptInvestments && p.slots > 0)
  const gallery = useMemo(() => [
    ...(p.images || []).slice().sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map(image => ({ src: image.secureUrl || image.url, alt: image.altText || `${p.name} property image` })),
    { src: imgSrc(p), alt: `${p.name} in ${p.loc}` },
  ].filter((image, index, images) => image.src && images.findIndex(candidate => candidate.src === image.src) === index), [p])
  const [activeIndex, setActiveIndex] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const active = gallery[activeIndex] || gallery[0]
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name}, ${p.loc}`)}`
  const description = p.description || `${p.name} is a verified ${config.label.toLowerCase()} opportunity in ${p.loc}, selected to support confident property ownership and long-term value.`
  const highlights = [{ label: p.loc, iconKey: 'map_pin' }, ...(p.highlights || [])]
    .filter((item, index, items) => item.label && items.findIndex(other => other.label === item.label) === index)
  const feeItems = p.managementFees?.items || []
  const feeTotal = Number(p.managementFees?.total || feeItems.reduce((sum, item) => sum + Number(item.amount || 0), 0))
  const purchaseTotal = Number(p.minInvestment || 0) + feeTotal
  const managerPhone = phoneDigits(p.projectManagerContact)
  const detailRows = modelRows(p, model, windowOpen)

  const changeImage = direction => setActiveIndex(index => (index + direction + gallery.length) % gallery.length)

  useEffect(() => {
    if (!galleryOpen) return
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const onKeyDown = event => {
      if (event.key === 'Escape') setGalleryOpen(false)
      if (event.key === 'ArrowLeft') changeImage(-1)
      if (event.key === 'ArrowRight') changeImage(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = previousOverflow
    }
  }, [galleryOpen, gallery.length])

  return (
    <div className="bg-[#F1F4F6]">
      <header className="bg-black px-4 pb-6 pt-4 md:px-[66px]">
        <Navbar />
        <div className="h-20 md:h-24" />
      </header>

      <div className="mx-auto max-w-[1480px] px-4 pb-8 pt-8 md:px-[66px] md:pt-12">
        <div className="flex items-start gap-4">
          <Link to="/property-hub" aria-label="Back to Property Hub" className="mt-1 grid size-10 shrink-0 place-items-center rounded-full transition hover:bg-white"><ArrowLeft size={22} /></Link>
          <div><h1 className="text-3xl font-semibold md:text-4xl">{p.name}</h1><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-muted transition hover:text-primary"><MapPin size={20} />{p.loc}<ExternalLink size={14} /></a></div>
        </div>

        <section className="mt-7 rounded-2xl bg-white p-4 md:p-5">
          <div className="relative aspect-[16/7] min-h-[280px] overflow-hidden rounded-2xl bg-[#E8EDF2]">
            <Image src={active.src} alt={active.alt} fill priority sizes="(max-width: 1024px) 100vw, 1300px" className="object-cover" />
            {gallery.length > 1 && <>
              <button type="button" onClick={() => changeImage(-1)} aria-label="Previous property image" className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"><ChevronLeft /></button>
              <button type="button" onClick={() => changeImage(1)} aria-label="Next property image" className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"><ChevronRight /></button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">{gallery.map((image, index) => <button key={image.src} type="button" onClick={() => setActiveIndex(index)} aria-label={`View image ${index + 1}`} className={`size-3 rounded-full border-2 border-white ${index === activeIndex ? 'bg-primary' : 'bg-white/80'}`} />)}</div>
            </>}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2"><span className={`rounded-full px-4 py-1.5 text-sm font-medium ${config.tag}`}>{config.label}</span><PropertyBadges property={{ ...p, type: '' }} compact /></div>
            <button type="button" onClick={() => setGalleryOpen(true)} className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-black/55 px-3 py-2 text-sm text-white backdrop-blur-sm"><ExternalLink size={16} />Click to expand</button>
          </div>
          <h2 className="mt-5 text-lg font-semibold uppercase">About {p.name}</h2>
          <p className="mt-3 leading-relaxed text-muted">{description}</p>
        </section>

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <div className="space-y-5">
            <Panel title="Property Highlights">
              <ul className="mt-4 grid sm:grid-cols-2">{highlights.map(({ label, iconKey }) => { const Icon = highlightIcons[iconKey] || Sparkles; return <li key={label} className="flex items-center gap-3 border-b border-[#DCE3EA] py-3 text-muted"><Icon size={23} className="shrink-0 text-primary" /><span>{label}</span></li> })}</ul>
            </Panel>

            {detailRows.length > 0 && <Panel title={config.section}><Rows rows={detailRows} /></Panel>}

            {(model !== 'fractional' || feeItems.length > 0) && <Panel title="Cost Breakdown">
              <Rows rows={[
                [model === 'land-banking' ? 'Property cost' : model === 'co-development' || model === 'outright' ? 'Property cost (per unit)' : config.priceLabel, money(p.minInvestment)],
              ]} />
              {feeItems.length > 0 && <><h3 className="rounded-lg bg-[#DDE4ED] px-3 py-2 font-semibold">Management fee</h3><Rows rows={feeItems.map(item => [item.label, money(item.amount)])} /></>}
              <div className="flex items-center justify-between rounded-lg bg-[#FFF1E9] px-3 py-2"><span className="font-medium">Total purchase price</span><strong className="text-xl text-primary">{money(purchaseTotal)}</strong></div>
            </Panel>}

            {(p.documents?.length > 0 || p.buildingPermitNumber) && <Panel title="Property Title Documents">
              <div className="mt-4 space-y-2">{p.documents?.map(document => <a key={document.id || document.fileName} href={document.secureUrl || document.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 border-b border-[#DCE3EA] py-3 transition hover:text-primary"><span className="flex min-w-0 items-center gap-3"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-50 text-primary"><FileText size={24} /></span><span className="min-w-0"><b className="block truncate">{document.fileName || document.originalFilename || 'Property document'}</b><small className="text-muted">Property document</small></span></span><span className="flex items-center gap-2 text-primary">View <Download size={18} /></span></a>)}</div>
              {p.buildingPermitNumber && <div className="mt-3 flex items-center justify-between gap-3"><div><b>{p.buildingPermitNumber}</b><p className="text-sm text-muted">Building Permit Number</p></div><button type="button" onClick={() => navigator.clipboard?.writeText(p.buildingPermitNumber)} aria-label="Copy building permit number" className="text-muted hover:text-primary"><Copy size={20} /></button></div>}
            </Panel>}
          </div>

          <div className="space-y-5">
            <Panel title="Property Video">
              <div className="mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-[#DCE3EA] bg-[#F8FAFC]">
                {p.video?.secureUrl || p.video?.url ? <video controls preload="metadata" className="h-full w-full object-cover"><source src={p.video.secureUrl || p.video.url} /></video> : <span className="grid size-16 place-items-center rounded-full bg-black text-white"><Play fill="currentColor" /></span>}
              </div>
            </Panel>

            {model === 'co-development' && p.milestones?.length > 0 && <Panel title="Development Milestones">
              <p className="mt-1 text-sm text-muted">Your contribution is released per milestone as construction progresses.</p>
              <div className="mt-4 space-y-4">{p.milestones.map(milestone => <article key={milestone.id || milestone.title} className="border-l-2 border-primary/25 pl-4"><div className="flex justify-between gap-3"><h3 className="font-semibold">{milestone.title}</h3><span className="rounded-lg bg-primary-50 px-2 py-1 text-xs text-primary">{String(milestone.status || '').replace(/_/g, ' ')}</span></div><p className="mt-1 text-sm text-muted">{formatDate(milestone.targetDate)}</p><p className="mt-2 text-sm text-muted">{milestone.description}</p></article>)}</div>
            </Panel>}

            {(p.projectManagerName || p.projectManagerContact) && <div>
              <h2 className="mb-3 text-xl font-semibold">Have questions about this investment?</h2>
              <section className="rounded-2xl bg-white p-5"><p className="font-semibold text-muted">Project Manager</p><div className="mt-3 flex items-center gap-3">{p.projectManagerImageUrl ? <img src={p.projectManagerImageUrl} alt="" className="size-14 rounded-full object-cover" /> : <span className="grid size-14 place-items-center rounded-full bg-primary-50 text-primary"><Building2 /></span>}<div className="min-w-0 flex-1"><b className="block">{p.projectManagerName || 'NeedHomes Adviser'}</b><span className="text-muted">{p.projectManagerContact}</span></div>{managerPhone && <><a href={`https://wa.me/${managerPhone}`} target="_blank" rel="noopener noreferrer" aria-label="Message project manager on WhatsApp" className="text-green-600"><FaWhatsapp size={24} /></a><a href={`tel:+${managerPhone}`} aria-label="Call project manager" className="text-primary"><Phone size={23} /></a></>}</div></section>
            </div>}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 border-t border-black/5 bg-white/95 px-4 py-4 shadow-[0_-10px_35px_rgba(0,0,0,.08)] backdrop-blur md:px-[66px]">
        <div className="mx-auto flex max-w-4xl items-center gap-6"><div className="shrink-0"><p className="text-sm text-muted">{config.priceLabel}</p><strong className="text-xl">{money(model === 'land-banking' || model === 'outright' || model === 'save-to-own' ? purchaseTotal : p.minInvestment) || 'Contact us'}</strong></div>{soldOut ? <button type="button" disabled aria-disabled="true" className="flex-1 cursor-not-allowed rounded-2xl bg-red-100 px-6 py-4 font-semibold text-red-600 opacity-70">Sold Out</button> : <button type="button" onClick={() => openWaitlist(`property-${p.slug}`)} className="flex-1 rounded-2xl bg-primary px-6 py-4 font-semibold text-white">{config.cta}</button>}</div>
      </div>

      {galleryOpen && <div role="dialog" aria-modal="true" aria-label={`${p.name} image gallery`} onMouseDown={event => { if (event.target === event.currentTarget) setGalleryOpen(false) }} className="fixed inset-0 z-[200] flex flex-col bg-black/95 p-4 md:p-8">
        <div className="flex items-center justify-between gap-4 text-white"><div><h2 className="text-xl font-semibold md:text-2xl">{p.name}</h2><p className="text-sm text-white/60">Image {activeIndex + 1} of {gallery.length}</p></div><button type="button" autoFocus onClick={() => setGalleryOpen(false)} aria-label="Close image gallery" className="grid size-12 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><X /></button></div>
        <div className="relative my-5 min-h-0 flex-1">
          <Image src={active.src} alt={active.alt} fill priority sizes="100vw" className="object-contain" />
          {gallery.length > 1 && <><button type="button" onClick={() => changeImage(-1)} aria-label="Previous image" className="absolute left-0 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 md:left-4"><ChevronLeft size={30} /></button><button type="button" onClick={() => changeImage(1)} aria-label="Next image" className="absolute right-0 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 md:right-4"><ChevronRight size={30} /></button></>}
        </div>
        {gallery.length > 1 && <div className="mx-auto flex max-w-full gap-3 overflow-x-auto pb-1">{gallery.map((image, index) => <button key={image.src} type="button" onClick={() => setActiveIndex(index)} aria-label={`View image ${index + 1}`} aria-pressed={index === activeIndex} className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border-2 md:w-24 ${index === activeIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}><Image src={image.src} alt="" fill sizes="96px" className="object-cover" /></button>)}</div>}
      </div>}
    </div>
  )
}

'use client'
import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { MapPin, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/lib/router'
import { imgSrc, leftLabel } from '../data/properties.js'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import PropertyBadges from '../components/PropertyBadges.jsx'

const PAGE_SIZE = 12
const PRICE_RANGES = [
  { value: 'under-500k', label: 'Under ₦500,000', min: 0, max: 499999 },
  { value: '500k-1m', label: '₦500,000 – ₦1,000,000', min: 500000, max: 1000000 },
  { value: '1m-5m', label: '₦1,000,001 – ₦5,000,000', min: 1000001, max: 5000000 },
  { value: 'over-5m', label: 'Above ₦5,000,000', min: 5000001, max: Infinity },
]

const uniqueValues = (properties, key) => [...new Set(properties.map(property => property[key]).filter(Boolean))]
  .sort((a, b) => a.localeCompare(b))

function FilterSelect({ label, value, onChange, options, allLabel }) {
  return (
    <label className="relative min-w-[170px] flex-1 sm:flex-none">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={event => onChange(event.target.value)} aria-label={label}
        className="w-full appearance-none rounded-full border border-ink/10 bg-white py-3 pl-4 pr-10 text-sm text-muted outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/15">
        <option value="">{allLabel}</option>
        {options.map(option => { const optionValue = typeof option === 'string' ? option : option.value; const optionLabel = typeof option === 'string' ? option : option.label; return <option key={optionValue} value={optionValue}>{optionLabel}</option> })}
      </select>
      <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
    </label>
  )
}

function pageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, 'ellipsis-end', total]
  if (current >= total - 3) return [1, 'ellipsis-start', total - 4, total - 3, total - 2, total - 1, total]
  return [1, 'ellipsis-start', current - 1, current, current + 1, 'ellipsis-end', total]
}

function Card({ p }) {
  return (
    <Link to={`/properties/${p.slug}`} className="relative block overflow-hidden rounded-2xl bg-[#F1F4F8] p-2.5 transition-shadow hover:shadow-lg">
      <div className={p.soldOut ? 'opacity-40 grayscale' : ''}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image src={imgSrc(p)} alt={p.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
        <PropertyBadges property={p} compact className="absolute left-3 top-3" />
      </div>
      <div className="px-1.5 pb-1.5 pt-4">
        <h3 className="truncate text-xl font-medium">{p.name}</h3>
        <p className="mt-2 flex items-center gap-2 text-muted"><MapPin size={16} />{p.loc}</p>
        <div className="mt-3 grid grid-cols-2 divide-x divide-ink/10 rounded-lg bg-white py-2 text-center">
          <div><b className="block text-lg">{p.price}</b><span className="text-sm text-muted">Price per {p.unit}</span></div>
          <div><b className="block text-lg">{p.slots}</b><span className="text-sm text-muted">{leftLabel(p)}</span></div>
        </div>
        <p className="mt-3 flex justify-between text-sm"><span className="text-muted">{p.offerLabel || 'Offer period'}</span><b className="text-primary">{p.offer}</b></p>
      </div>
      </div>
      {p.soldOut && <span className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-white/15"><strong className="-rotate-6 rounded-xl border-4 border-red-600 bg-white/95 px-6 py-3 text-3xl font-black tracking-wider text-red-600 shadow-xl md:text-4xl">SOLD OUT</strong></span>}
    </Link>
  )
}

export default function PropertyHub({ properties = [] }) {
  const [filter, setFilter] = useState('')
  const [location, setLocation] = useState('')
  const [propertyKind, setPropertyKind] = useState('')
  const [returnType, setReturnType] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const options = useMemo(() => ({
    locations: uniqueValues(properties, 'loc'),
    types: uniqueValues(properties, 'type'),
    propertyKinds: uniqueValues(properties, 'kind'),
    returnTypes: uniqueValues(properties, 'returnType'),
    priceRanges: PRICE_RANGES.filter(range => properties.some(property => Number.isFinite(Number(property.minInvestment)) && Number(property.minInvestment) >= range.min && Number(property.minInvestment) <= range.max)),
  }), [properties])
  const selectedPriceRange = PRICE_RANGES.find(range => range.value === priceRange)
  const list = useMemo(() => properties.filter(p =>
    (!filter || p.type === filter) &&
    (!location || p.loc === location) &&
    (!propertyKind || p.kind === propertyKind) &&
    (!returnType || p.returnType === returnType) &&
    (!selectedPriceRange || (Number(p.minInvestment) >= selectedPriceRange.min && Number(p.minInvestment) <= selectedPriceRange.max)) &&
    `${p.name} ${p.loc} ${p.type} ${p.kind || ''} ${p.returnType || ''}`.toLowerCase().includes(q.trim().toLowerCase())),
  [properties, filter, location, propertyKind, returnType, priceRange, selectedPriceRange, q])
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const visible = useMemo(() => list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [list, page])
  useEffect(() => setPage(1), [filter, location, propertyKind, returnType, priceRange, q])
  useEffect(() => { if (page > pageCount) setPage(pageCount) }, [page, pageCount])
  const firstResult = list.length ? (page - 1) * PAGE_SIZE + 1 : 0
  const lastResult = Math.min(page * PAGE_SIZE, list.length)
  return (
    <>
      <Hero tag="Property Hub" title="Find Your Next Property Investment" text="Browse and invest in verified real estate opportunities across every NeedHomes investment model." />
      <section className="py-16 page-x">
        <div className="flex flex-wrap gap-3">
          <label className="relative min-w-60 flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search properties, location or type" aria-label="Search properties" className="w-full rounded-full border border-ink/10 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary" />
          </label>
          <FilterSelect label="Filter by location" value={location} onChange={setLocation} options={options.locations} allLabel="All locations" />
          <FilterSelect label="Filter by investment type" value={filter} onChange={setFilter} options={options.types} allLabel="All types" />
          <FilterSelect label="Filter by property type" value={propertyKind} onChange={setPropertyKind} options={options.propertyKinds} allLabel="All property types" />
          <FilterSelect label="Filter by return type" value={returnType} onChange={setReturnType} options={options.returnTypes} allLabel="All return types" />
          <FilterSelect label="Filter by price range" value={priceRange} onChange={setPriceRange} options={options.priceRanges} allLabel="All price ranges" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
          {['', ...options.types].map(type => (
            <button key={type || 'all'} onClick={() => setFilter(type)} aria-pressed={filter === type}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${filter === type ? 'border-primary bg-[#FFF4D6] text-ink' : 'border-ink/10 text-muted hover:border-primary'}`}>{type || 'All properties'}</button>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          {list.length ? `Showing ${firstResult}–${lastResult} of ${list.length} properties` : '0 properties found'}
        </p>
        {list.length ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map(p => <Card key={p.slug} p={p} />)}</div>
        ) : <p className="mt-10 text-center text-muted">No properties match. Try a different search or filter.</p>}
        {pageCount > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-2 text-sm text-muted" aria-label="Property pagination">
            <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="grid size-9 place-items-center rounded-full border border-ink/10 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35" aria-label="Previous page">
              <ChevronLeft size={17} />
            </button>
            {pageItems(page, pageCount).map(item => typeof item === 'number' ? (
              <button type="button" key={item} onClick={() => setPage(item)} aria-label={`Page ${item}`} aria-current={page === item ? 'page' : undefined}
                className={`grid size-9 place-items-center rounded-full transition-colors ${page === item ? 'bg-primary text-white' : 'hover:bg-primary-50 hover:text-primary'}`}>
                {item}
              </button>
            ) : <span key={item} className="grid size-9 place-items-center" aria-hidden="true">…</span>)}
            <button type="button" onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount}
              className="grid size-9 place-items-center rounded-full border border-ink/10 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35" aria-label="Next page">
              <ChevronRight size={17} />
            </button>
          </nav>
        )}
      </section>
      <CtaBand title="Ready to Start your" accent="Investment Journey" text="Join investors building wealth the smart way." />
    </>
  )
}

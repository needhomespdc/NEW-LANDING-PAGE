'use client'
import { useEffect, useState, useMemo } from 'react'
import { Heart, MapPin, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/lib/router'
import { imgSrc, leftLabel } from '../data/properties.js'
import Hero from '../components/Hero.jsx'
import CtaBand from '../components/CtaBand.jsx'

const badge = { Fractional: 'bg-[#5B21B6] text-white', Outright: 'bg-white text-ink', 'Land banking': 'bg-primary text-white', 'Co-Dev': 'bg-[#0F8A5F] text-white', 'Save-to-Own': 'bg-[#1D4ED8] text-white' }
const filters = ['All properties', 'Fractional', 'Co-Dev', 'Land banking', 'Save-to-Own', 'Outright']
const dropdowns = ['Location', 'Types', 'Property types', 'Return types']
const PAGE_SIZE = 6

function pageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, 'ellipsis-end', total]
  if (current >= total - 3) return [1, 'ellipsis-start', total - 4, total - 3, total - 2, total - 1, total]
  return [1, 'ellipsis-start', current - 1, current, current + 1, 'ellipsis-end', total]
}

function Card({ p }) {
  const [liked, setLiked] = useState(false)
  return (
    <Link to={`/property-hub/${p.slug}`} className="block rounded-2xl bg-[#F1F4F8] p-2.5 transition-shadow hover:shadow-lg">
      <div className="relative overflow-hidden rounded-xl">
        <img loading="lazy" decoding="async" src={imgSrc(p)} alt={p.name} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className={`rounded-md px-2.5 py-1 text-sm ${badge[p.type]}`}>{p.type}</span>
          {p.isNew && <span className="rounded-md bg-primary px-2.5 py-1 text-sm text-white">NEW</span>}
        </div>
        <button onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked) }} aria-pressed={liked} aria-label={`Save ${p.name}`} className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90">
          <Heart size={16} className={liked ? 'fill-primary text-primary' : ''} />
        </button>
        {p.soldOut && <span className="absolute inset-0 grid place-items-center bg-black/30 text-4xl font-bold text-white">SOLD OUT</span>}
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
    </Link>
  )
}

export default function PropertyHub({ properties = [] }) {
  const [filter, setFilter] = useState('All properties')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const list = useMemo(() => properties.filter(p =>
    (filter === 'All properties' || p.type === filter) &&
    `${p.name} ${p.loc} ${p.type}`.toLowerCase().includes(q.trim().toLowerCase())), [properties, filter, q])
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const visible = useMemo(() => list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [list, page])
  useEffect(() => setPage(1), [filter, q])
  useEffect(() => { if (page > pageCount) setPage(pageCount) }, [page, pageCount])
  const firstResult = list.length ? (page - 1) * PAGE_SIZE + 1 : 0
  const lastResult = Math.min(page * PAGE_SIZE, list.length)
  return (
    <>
      <Hero tag="Property Hub" title="Pay gradually toward a home and own it confidently" text="Browse and invest in verified real estate opportunities across every NeedHomes investment model." />
      <section className="py-16 page-x">
        <div className="flex flex-wrap gap-3">
          <label className="relative min-w-60 flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search properties, location or type" aria-label="Search properties" className="w-full rounded-full border border-ink/10 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary" />
          </label>
          {dropdowns.map(d => <button key={d} className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-3 text-sm text-muted">{d}<ChevronDown size={14} /></button>)}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${filter === f ? 'border-primary bg-[#FFF4D6] text-ink' : 'border-ink/10 text-muted hover:border-primary'}`}>{f}</button>
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

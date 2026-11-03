const typeStyles = {
  Fractional: 'bg-[#5B21B6] text-white',
  Outright: 'bg-white text-ink ring-1 ring-black/10',
  'Land banking': 'bg-primary text-white',
  'Co-Dev': 'bg-[#0F8A5F] text-white',
  'Save-to-Own': 'bg-[#1D4ED8] text-white',
}

export default function PropertyBadges({ property, compact = false, className = '' }) {
  const size = compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className={`rounded-full font-semibold uppercase tracking-wide ${size} ${typeStyles[property.type] || 'bg-primary text-white'}`}>{property.type}</span>
      {property.hot && <span className={`rounded-full bg-[#FFF0E7] font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/20 ${size}`}><span className="hot-fire mr-1 inline-block" aria-hidden="true">🔥</span>Hot</span>}
      {property.isNew && <span className={`rounded-full bg-white font-semibold uppercase tracking-wide text-ink ring-1 ring-black/10 ${size}`}>New</span>}
    </div>
  )
}

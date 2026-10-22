// Server-side data access for the Property Hub. Runs on the server only, so the API URL and key stay private.
import { properties as sample } from '../data/properties.js'

const BASE = process.env.PROPERTIES_API_URL
const REVALIDATE_SECONDS = 60
const PAGE_SIZE = 50
const MAX_PAGES = 20

const TYPES = {
  fractional: 'Fractional',
  'co-development': 'Co-Dev',
  'land-banking': 'Land banking',
  'save-to-own': 'Save-to-Own',
  outright: 'Outright',
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const naira = n => n == null ? '' : '₦' + (n >= 1e9 ? +(n / 1e9).toFixed(1) + 'B' : n >= 1e6 ? +(n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? +(n / 1e3).toFixed(0) + 'k' : n)
// The API sometimes returns ALL CAPS or lowercase text; show it in a consistent style.
const tidyName = s => {
  let t = String(s ?? '').replace(/\s+/g, ' ').trim()
  if (t && t === t.toUpperCase()) t = t.toLowerCase().replace(/(^|[\s-])([a-z])/g, (_, a, b) => a + b.toUpperCase())
  return t.replace(/\bneedhomes\b/gi, 'NeedHomes')
}
const tidyLoc = s => { const t = tidyName(s); return t.charAt(0).toUpperCase() + t.slice(1) }
const windowLabel = r => {
  if (!r.investmentWindowStart || !r.investmentWindowEnd) return null
  const a = MONTHS[new Date(r.investmentWindowStart).getMonth()], b = MONTHS[new Date(r.investmentWindowEnd).getMonth()]
  return a === b ? a : `${a} - ${b}`
}

// One record from the API -> the shape the site uses.
export function mapProperty(r) {
  const [offerStat, leftStat] = r.listingStats ?? []
  const slots = Number(r.inventoryAvailable ?? leftStat?.value ?? 0)
  const unit = (leftStat?.label ?? '').match(/slot|plot|unit/i)?.[0]?.toLowerCase() ?? 'unit'
  const type = TYPES[String(r.investmentModelType ?? '').toLowerCase().replace(/_/g, '-')] ?? 'Fractional'
  return {
    slug: r.slug ?? String(r.id),
    name: tidyName(r.title),
    type,
    loc: tidyLoc(r.location),
    price: naira(r.minInvestment),               // price per slot / plot / unit
    minInvestment: r.minInvestment ?? null,
    totalPrice: r.totalPrice ? naira(r.totalPrice) : null,
    unit,
    slots,
    offer: offerStat?.value ?? windowLabel(r) ?? 'Open',
    offerLabel: (offerStat?.label ?? 'Offer period').replace(/^Inv\.?\s*/i, 'Investment '),
    isNew: Boolean(r.isNewListing),
    hot: Boolean(r.isHotSelling),
    soldOut: slots === 0 || /sold/i.test(r.status ?? ''),
    featured: Boolean(r.isHotSelling) && slots > 0,   // home page slider shows hot-selling properties that are still available
    imageUrl: r.primaryImageUrl ?? undefined,
    description: r.description ?? '',
    kind: r.propertyKindLabel,
    returnType: r.returnTypeLabel,
    updatedAt: r.updatedAt ?? r.publishedAt ?? null,
  }
}

const headers = {
  Accept: 'application/json',
  ...(process.env.PROPERTIES_API_KEY && { Authorization: `Bearer ${process.env.PROPERTIES_API_KEY}` }),
}
async function fetchPage(page, limit) {
  const url = new URL(BASE)
  url.searchParams.set('page', page)
  if (limit) url.searchParams.set('limit', limit)
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS }, headers })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
const rows = body => (Array.isArray(body) ? body : body.data ?? body.items ?? [])

// Reads every page of the list ({ data: [...], meta: { page, limit, total, totalPages } }).
export async function getProperties() {
  if (!BASE) {
    console.warn('PROPERTIES_API_URL is not set: showing built-in sample properties.')
    return sample
  }
  try {
    let limit = PAGE_SIZE, first
    try { first = await fetchPage(1, limit) } catch { limit = undefined; first = await fetchPage(1) } // in case the API rejects a large `limit`
    const all = [...rows(first)]
    const totalPages = Math.min(first.meta?.totalPages ?? 1, MAX_PAGES)
    if (totalPages > 1) {
      const rest = await Promise.all(Array.from({ length: totalPages - 1 }, (_, i) => fetchPage(i + 2, limit)))
      rest.forEach(b => all.push(...rows(b)))
    }
    const seen = new Set()
    return all
      .filter(r => (r.status ?? 'published') === 'published')
      .map(mapProperty)
      .filter(p => !seen.has(p.slug) && seen.add(p.slug))
  } catch (e) {
    console.error('Could not load properties from the API:', e.message)
    return []
  }
}

export async function getProperty(slug) {
  return (await getProperties()).find(p => p.slug === slug) ?? null
}

// Live Google reviews via the Places API (New). Server-side only, cached for 24 hours.
const KEY = process.env.GOOGLE_PLACES_API_KEY
const PLACE = process.env.GOOGLE_PLACE_ID
const BASE = process.env.GOOGLE_PLACES_BASE_URL || 'https://places.googleapis.com'

// Shown only when Google is not configured (local development).
const sample = [
  { name: 'Folorunsho Azeez', rating: 4, text: 'Every property and transaction is verified for your peace of mind.' },
  { name: 'Felix Ikechukwu', rating: 5, text: 'Every property and transaction is verified for your peace of mind.' },
]

export async function getReviews() {
  if (!KEY || !PLACE) return { reviews: sample, summary: null }
  try {
    const res = await fetch(`${BASE}/v1/places/${PLACE}`, {
      headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews' },
      next: { revalidate: 86400 },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const d = await res.json()
    const reviews = (d.reviews ?? [])
      .filter(r => r.rating >= 4 && r.text?.text)
      .sort((a, b) => b.rating - a.rating || a.text.text.length - b.text.text.length)
      .slice(0, 2)
      .map(r => ({ name: r.authorAttribution?.displayName ?? 'Google user', rating: r.rating, text: r.text.text.trim(), url: r.authorAttribution?.uri }))
    const summary = d.rating ? { rating: Number(d.rating).toFixed(1), count: d.userRatingCount, url: d.googleMapsUri } : null
    return { reviews, summary }
  } catch (e) {
    console.error('Could not load Google reviews:', e.message)
    return { reviews: [], summary: null }
  }
}

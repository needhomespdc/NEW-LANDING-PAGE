import Home from '@/views/Home'
import { getProperties } from '@/lib/api'
import { getReviews } from '@/lib/reviews'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('/')
export default async function Page() {
  const [all, { reviews, summary }] = await Promise.all([getProperties(), getReviews()])
  // The home page only shows the featured slider, so send just those (not the whole list) to the browser.
  const flagged = all.filter(p => p.featured)
  const properties = (flagged.length ? flagged : all).slice(0, 8)
  return <Home properties={properties} reviews={reviews} reviewSummary={summary} />
}

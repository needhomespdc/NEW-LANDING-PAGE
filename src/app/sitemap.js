import { getProperties } from '@/lib/api'
import { SITE, pages } from '@/lib/seo'

export default async function sitemap() {
  const properties = await getProperties()
  return [
    ...Object.keys(pages).map(p => ({ url: SITE + (p === '/' ? '' : p) })),
    ...properties.map(p => ({ url: `${SITE}/property-hub/${p.slug}` })),
  ]
}

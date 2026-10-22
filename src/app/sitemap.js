import { getProperties } from '@/lib/api'
import { SITE, pages } from '@/lib/seo'

export default async function sitemap() {
  const properties = await getProperties()
  const routePriority = path => path === '/' ? 1 : path === '/property-hub' ? 0.9 : path.startsWith('/investment/') ? 0.8 : 0.6
  return [
    ...Object.keys(pages).map(path => ({
      url: SITE + (path === '/' ? '' : path),
      changeFrequency: path === '/' || path === '/property-hub' ? 'weekly' : 'monthly',
      priority: routePriority(path),
    })),
    ...properties.map(property => ({
      url: `${SITE}/property-hub/${property.slug}`,
      ...(property.updatedAt && { lastModified: new Date(property.updatedAt) }),
      changeFrequency: 'weekly',
      priority: 0.8,
      images: property.imageUrl ? [property.imageUrl] : undefined,
    })),
  ]
}

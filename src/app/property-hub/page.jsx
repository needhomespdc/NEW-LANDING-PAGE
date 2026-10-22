import PropertyHub from '@/views/PropertyHub'
import { getProperties } from '@/lib/api'
import { pageMeta, socialImage } from '@/lib/seo'

export async function generateMetadata() {
  const metadata = pageMeta('/property-hub')
  const properties = await getProperties()
  const property = properties.find(item => item.featured && item.imageUrl) ?? properties.find(item => item.imageUrl)
  if (!property) return metadata
  const image = property.imageUrl
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, images: [socialImage(image, `${property.name} in ${property.loc}`)] },
    twitter: { ...metadata.twitter, images: [image] },
  }
}

export default async function Page() { return <PropertyHub properties={await getProperties()} /> }

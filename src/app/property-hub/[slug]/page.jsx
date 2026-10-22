import { notFound } from 'next/navigation'
import PropertyDetail from '@/views/PropertyDetail'
import { getProperties, getProperty } from '@/lib/api'
import { imgSrc } from '@/data/properties'
import { SITE, socialImage } from '@/lib/seo'

export async function generateStaticParams() { return (await getProperties()).map(p => ({ slug: p.slug })) }

export async function generateMetadata({ params }) {
  const p = await getProperty((await params).slug)
  if (!p) return { title: 'Property not found | NeedHomes', robots: { index: false } }
  const title = `${p.name} | Property Hub | NeedHomes`
  const description = (p.description || `${p.name} in ${p.loc}. ${p.type} opportunity on the NeedHomes Property Hub.`).slice(0, 160)
  const url = `${SITE}/property-hub/${p.slug}`
  const img = imgSrc(p)
  const image = img.startsWith('http') ? img : SITE + img
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    openGraph: { title, description, url, siteName: 'NeedHomes', locale: 'en_NG', type: 'website', images: [socialImage(image, `${p.name} property in ${p.loc}`)] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export default async function Page({ params }) {
  const p = await getProperty((await params).slug)
  if (!p) notFound()
  const image = imgSrc(p)
  const url = `${SITE}/property-hub/${p.slug}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description || `${p.type} property opportunity in ${p.loc}`,
    image: [image.startsWith('http') ? image : SITE + image],
    url,
    category: p.kind || p.type,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'NGN',
      ...(p.minInvestment != null && { price: p.minInvestment }),
      availability: p.soldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <PropertyDetail property={p} />
    </>
  )
}

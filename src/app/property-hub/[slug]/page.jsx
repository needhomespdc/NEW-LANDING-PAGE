import { notFound } from 'next/navigation'
import PropertyDetail from '@/views/PropertyDetail'
import { getProperties, getProperty } from '@/lib/api'
import { imgSrc } from '@/data/properties'
import { SITE } from '@/lib/seo'

export async function generateStaticParams() { return (await getProperties()).map(p => ({ slug: p.slug })) }

export async function generateMetadata({ params }) {
  const p = await getProperty((await params).slug)
  if (!p) return { title: 'Property not found | NeedHomes', robots: { index: false } }
  const title = `${p.name} | Property Hub | NeedHomes`
  const description = (p.description || `${p.name} in ${p.loc}. ${p.type} opportunity on the NeedHomes Property Hub.`).slice(0, 160)
  const url = `${SITE}/property-hub/${p.slug}`
  const img = imgSrc(p)
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: [{ url: img.startsWith('http') ? img : SITE + img }] }, twitter: { card: 'summary_large_image' } }
}

export default async function Page({ params }) {
  const p = await getProperty((await params).slug)
  if (!p) notFound()
  return <PropertyDetail property={p} />
}

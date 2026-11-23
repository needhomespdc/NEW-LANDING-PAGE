import { permanentRedirect } from 'next/navigation'
import { getProperties } from '@/lib/api'
export async function generateStaticParams() { return (await getProperties()).map(p => ({ slug: p.slug })) }
export default async function Page({ params }) { permanentRedirect(`/properties/${(await params).slug}`) }

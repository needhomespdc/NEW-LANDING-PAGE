import PropertyHub from '@/views/PropertyHub'
import { getProperties } from '@/lib/api'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('/property-hub')
export default async function Page() { return <PropertyHub properties={await getProperties()} /> }

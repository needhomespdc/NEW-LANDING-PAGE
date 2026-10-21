import Faq from '@/views/Faq'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('/faq')
export default function Page() { return <Faq /> }

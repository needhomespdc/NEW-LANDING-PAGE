import Contact from '@/views/Contact'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('/contact')
export default function Page() { return <Contact /> }

import About from '@/views/About'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('/about')
export default function Page() { return <About /> }

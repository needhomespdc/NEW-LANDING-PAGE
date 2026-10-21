import { Deactivation } from '@/views/AccountRequests'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('/account-deactivation')
export default function Page() { return <Deactivation /> }

import { DataDeletion } from '@/views/AccountRequests'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('/data-deletion')
export default function Page() { return <DataDeletion /> }

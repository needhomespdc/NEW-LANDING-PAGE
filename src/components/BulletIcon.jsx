import { Box } from 'lucide-react'

export default function BulletIcon({ big = false, active = false, className = '' }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full border border-black/5 shadow-sm transition-colors ${big ? 'size-9' : 'size-7'} ${active ? 'bg-primary text-white' : 'bg-[#F7F8FA] text-primary'} ${className}`}>
      <Box size={big ? 18 : 14} strokeWidth={3} aria-hidden="true" />
    </span>
  )
}

import { BadgeCheck, BarChart3, Building2, FileCheck2, HandCoins, Hammer, Home, KeyRound, Landmark, MapPin, Search, WalletCards } from 'lucide-react'

const iconRules = [
  [/verify|inspect|document|title/i, FileCheck2],
  [/track|return|income|payout|performance|maturity|appreciat/i, BarChart3],
  [/build|develop|milestone|project completion/i, Hammer],
  [/own|ownership|acquire|possession/i, KeyRound],
  [/pay|payment|purchase|fund|invest|wallet|saving|secure your plot/i, WalletCards],
  [/bank|hold/i, Landmark],
  [/partner|join/i, HandCoins],
  [/location|site/i, MapPin],
  [/home/i, Home],
  [/building/i, Building2],
  [/browse|explore|choose|select|discover|property|land/i, Search],
]

export default function StepIcon({ label, active = false }) {
  const Icon = iconRules.find(([pattern]) => pattern.test(label))?.[1] || BadgeCheck
  return (
    <span className={`mt-1 grid size-10 shrink-0 place-items-center rounded-full border transition-colors ${active ? 'border-primary bg-primary text-white' : 'border-primary/15 bg-primary-50 text-primary'}`}>
      <Icon size={19} strokeWidth={2.2} aria-hidden="true" />
    </span>
  )
}

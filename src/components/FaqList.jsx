import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '../data/faqs.js'

export default function FaqList({ limit }) {
  const [open, setOpen] = useState(1)
  return (
    <ul className="space-y-2">
      {faqs.slice(0, limit).map(([q, a], i) => {
        const on = open === i
        return (
          <li key={q} className={`rounded-2xl px-6 py-5 transition-colors md:px-8 ${on ? 'bg-[#EBF1F8]' : ''}`}>
            <button className="flex w-full items-center justify-between gap-4 text-left text-lg font-medium" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
              {q}{on ? <Minus size={22} /> : <Plus size={22} />}
            </button>
            {on && <p className="mt-3 max-w-4xl text-muted">{a || 'Answer coming soon. Contact support@needhomespdc.com for help.'}</p>}
          </li>
        )
      })}
    </ul>
  )
}

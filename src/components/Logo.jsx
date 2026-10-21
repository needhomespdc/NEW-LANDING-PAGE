'use client'
import { useEffect, useRef, useState } from 'react'

// Drop logo-dark.svg (nav) and logo-light.svg (footer) into /public/images and they are picked up automatically.
// Until the files exist, a text wordmark is shown instead.
export default function Logo({ light = false }) {
  const [missing, setMissing] = useState(false)
  const ref = useRef(null)
  // The image can fail before React has hydrated, so also check it once on mount.
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setMissing(true) }, [])
  if (!missing) {
    return <img ref={ref} src={`/images/${light ? 'logo-light' : 'logo-dark'}.svg`} alt="NeedHomes" onError={() => setMissing(true)} className="h-12 w-auto" />
  }
  return (
    <span className={`inline-flex flex-col items-center leading-none ${light ? 'text-white' : 'text-ink'}`}>
      <svg width="44" height="14" viewBox="0 0 44 14" fill="none" aria-hidden="true"><path d="M2 12 22 2l20 10" stroke="#EF6A1B" strokeWidth="2.5" strokeLinecap="round" /></svg>
      <span className="mt-1 text-[17px] font-semibold tracking-wide">NEEDHOMES</span>
    </span>
  )
}

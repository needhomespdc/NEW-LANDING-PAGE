import { useEffect, useRef, useState } from 'react'

// Counts a figure like "1,250+", "₦2.4B+" or "18.7%" up from 0 the first time it scrolls into view.
export default function CountUp({ value, duration = 1800 }) {
  const [, pre = '', num = '0', post = ''] = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/) || []
  const target = parseFloat(num.replace(/,/g, ''))
  const decimals = (num.split('.')[1] || '').length
  const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(reduce ? target : 0)
  const ref = useRef(null)

  useEffect(() => {
    if (reduce) return
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = t => {
        const p = Math.min((t - t0) / duration, 1)
        setN(target * (1 - Math.pow(1 - p, 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [target, duration, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{pre}{fmt(n)}{post}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

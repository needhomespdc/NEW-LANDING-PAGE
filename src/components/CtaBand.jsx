import { Link } from 'react-router-dom'
export default function CtaBand({ title, accent, text, primaryLabel = 'Start Investing', primaryTo = '/investment/save-to-own', single = false }) {
  return (
    <section className="bg-mist py-20 text-center page-x">
      <h2 className="text-[34px] font-semibold leading-tight md:text-5xl">{title}<br /><span className="text-primary">{accent}</span></h2>
      <p className="mx-auto mt-5 max-w-[640px] text-muted">{text}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {!single && <Link to="/property-hub" className="rounded-xl border border-ink/60 px-7 py-3 text-[15px] font-medium">Explore Property Hub</Link>}
        {primaryTo.startsWith('#')
          ? <a href={primaryTo} className="rounded-xl bg-primary px-7 py-3 text-[15px] font-medium text-white">{primaryLabel}</a>
          : <Link to={primaryTo} className="rounded-xl bg-primary px-7 py-3 text-[15px] font-medium text-white">{primaryLabel}</Link>}
      </div>
    </section>
  )
}

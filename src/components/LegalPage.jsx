import Hero from './Hero.jsx'
import CtaBand from './CtaBand.jsx'

export default function LegalPage({ title, effective, intro, sections, declaration }) {
  return (
    <>
      <Hero title={title} text="" />
      <article className="page-x py-16 text-sm text-muted">
        <p className="text-xs">Effective Date: {effective}</p>
        {intro.map(p => <p key={p} className="mt-4">{p}</p>)}
        {sections.map(([t, lead, items], i) => (
          <section key={t} className="mt-8">
            <h2 className="text-xl font-semibold text-ink">{i + 1}. {t}</h2>
            <div className="mt-2 space-y-2">{lead.map(p => <p key={p}>{p}</p>)}</div>
            {items.length > 0 && <ul className="ml-5 mt-1 list-disc space-y-0.5">{items.map(l => <li key={l}>{l}</li>)}</ul>}
          </section>
        ))}
        <aside className="mt-12 rounded-xl border border-ink/10 bg-[#EEF2F6] p-6">
          <h2 className="text-xl font-semibold text-ink">{declaration[0]}</h2>
          <p className="mt-2">{declaration[1]}</p>
        </aside>
      </article>
      <CtaBand title="Ready to Start your" accent="Investment Journey" text="Join investors building wealth the smart way." />
    </>
  )
}

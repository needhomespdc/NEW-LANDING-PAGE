'use client'
import { useState } from 'react'
import { Link } from '@/lib/router'
import { Sparkles } from 'lucide-react'
import Naira from './NairaIcon.jsx'
import Hero from './Hero.jsx'
import CtaBand from './CtaBand.jsx'

const Pill = ({ children }) => <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-sm"><Sparkles size={14} />{children}</span>
const Dot = ({ big }) => <span className={`grid shrink-0 place-items-center rounded-full bg-primary-50 text-primary ${big ? 'size-9' : 'size-7'}`}><Naira size={14} /></span>
const Head = ({ a, b, className = '' }) => <h2 className={`text-4xl font-semibold leading-tight md:text-5xl ${className}`}>{a}{b && <><br className="hidden md:block" /> <span className="text-muted">{b}</span></>}</h2>

export function Steps({ title, steps, numbered = false }) {
  const [active, setActive] = useState(0)
  return (
    <section className={`${numbered ? '' : 'bg-[#F5F7FA]'} py-20 page-x`}>
      <Pill>How It Works</Pill>
      <h2 className="mt-5 text-4xl font-semibold md:text-5xl">{title[0]} <span className="text-muted">{title[1]}</span></h2>
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <ol className="space-y-3">
          {steps.map((s, i) => {
            const on = i === active
            return (
              <li key={s.title}>
                <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-current={on}
                  className={`flex w-full gap-4 rounded-2xl p-4 text-left transition-colors ${on ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}>
                  {numbered
                    ? <span className={`w-12 shrink-0 text-2xl font-semibold transition-colors ${on ? 'text-primary' : 'text-[#FDB894]'}`}>{String(i + 1).padStart(2, '0')}</span>
                    : <span className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full transition-colors ${on ? 'bg-primary text-white' : 'bg-primary-50 text-primary'}`}><Naira size={16} /></span>}
                  <span><span className={`block text-2xl font-medium transition-colors ${on ? 'text-primary' : ''}`}>{s.title}</span><span className="mt-1 block max-w-[420px] text-muted">{s.text}</span></span>
                </button>
              </li>
            )
          })}
        </ol>
        <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-[32px] bg-primary-50 px-12 pt-12 sm:px-20">
          <div className="relative aspect-[858/1050]">
            {steps.map((s, i) => <img loading="lazy" decoding="async" key={s.title} src={`/images/${s.img || 'phone-property-hub'}.webp`} alt={`${s.title} screen`} aria-hidden={i !== active}
              className={`absolute inset-0 h-full w-full object-contain ${s.plain ? 'object-bottom mix-blend-multiply' : 'object-top'} transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-0'}`} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Flow({ words }) {
  const shades = ['bg-primary-50', 'bg-[#FDB894]', 'bg-[#F68F52]', 'bg-primary text-white']
  return (
    <ol className="mt-12 flex flex-wrap items-center justify-center gap-3">
      {words.map((w, i) => (
        <li key={w} className="flex items-center gap-3">
          <span className={`grid size-32 place-items-center rounded-full px-2 text-center text-xl font-medium md:size-[150px] md:text-2xl ${shades[i]}`}>{w}</span>
          {i < words.length - 1 && <span aria-hidden className="text-2xl text-muted/60">→</span>}
        </li>
      ))}
    </ol>
  )
}

export default function InvestmentPage({ c }) {
  const m = c.middle, k = c.key
  return (
    <>
      <Hero tag={c.tag} title={c.title} text={c.text} />
      <section className="py-20 page-x">
        <Pill>{c.aboutTag}</Pill>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <Head a={c.headline[0]} b={c.headline[1]} />
          <div className="max-w-[440px] space-y-4 text-muted">{c.about.map(p => <p key={p}>{p}</p>)}</div>
        </div>
        <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2 md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(odd)]:pr-10 border-ink/10">
          {c.pillars.map(([t, d]) => <div key={t} className="flex gap-4 border-ink/10"><span className="mt-1.5"><Dot /></span><div><h3 className="text-2xl font-medium">{t}</h3><p className="mt-1 max-w-[380px] text-muted">{d}</p></div></div>)}
        </div>
      </section>

      <Steps title={c.stepsTitle} steps={c.steps} />

      {m.type === 'band' ? (
        <section className="bg-primary-50 py-24 page-x">
          <Pill>{m.tag}</Pill>
          <div className="mt-6 grid gap-6 lg:grid-cols-2"><h2 className="text-4xl font-semibold leading-tight text-primary md:text-5xl">{m.heading}</h2><p className="max-w-[420px] text-muted">{m.text[0]}</p></div>
        </section>
      ) : (
        <section className="py-20 page-x">
          <Pill>{m.tag}</Pill>
          <div className={m.type === 'flow' ? 'mt-6 grid gap-6 lg:grid-cols-2' : 'mt-6'}>
            <Head a={m.heading[0]} b={m.heading[1]} />
            <div className={`space-y-4 text-muted ${m.type === 'flow' ? 'max-w-[440px]' : 'mt-6 max-w-4xl'}`}>{m.text.map(p => <p key={p}>{p}</p>)}
              {m.lines && <ul className="text-sm">{m.lines.map(l => <li key={l}>{l}</li>)}</ul>}</div>
          </div>
          {m.flow && <Flow words={m.flow} />}
        </section>
      )}

      <section className="grid items-center gap-12 pb-20 page-x lg:grid-cols-2">
        <img loading="lazy" decoding="async" src={`/images/${k.img}.webp`} alt={k.alt} className="w-full rounded-[28px] object-cover lg:max-h-[520px]" />
        <div>
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-sm text-primary">{k.tag}</span>
          <Head a={k.heading[0]} b={k.heading[1]} className="mt-5" />
          <div className="mt-5 max-w-[560px] space-y-3 text-muted">{k.text.map(p => <p key={p}>{p}</p>)}</div>
          {k.bullets && <ul className="mt-8 space-y-5">{k.bullets.map(b => <li key={b} className="flex items-center gap-4"><Dot big /><span className="max-w-[460px] text-[17px]">{b}</span></li>)}</ul>}
          <Link to={k.to || '/property-hub'} className="mt-8 inline-block rounded-xl bg-primary px-6 py-3 text-[15px] font-medium text-white">{k.button}</Link>
        </div>
      </section>
      <CtaBand {...c.cta} />
    </>
  )
}

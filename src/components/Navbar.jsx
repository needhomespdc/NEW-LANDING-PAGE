import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, ArrowDownRight, Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { navLinks } from '../nav.js'

function Item({ item }) {
  const base = 'px-3 py-2 text-[15px] text-white/90 hover:text-white transition-colors'
  if (!item.children) return <NavLink to={item.to} className={base}>{item.label}</NavLink>
  return (
    <div className="group relative">
      <button className={`${base} inline-flex items-center gap-1`}>
        {item.label}<ChevronDown size={16} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-30 min-w-52 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-2xl bg-white p-2 shadow-xl">
          {item.children.map(c => (
            <Link key={c.label} to={c.to} className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-primary-50">{c.label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav aria-label="Main" onKeyDown={e => e.key === 'Escape' && setOpen(false)} className="relative z-20 flex items-start justify-between">
      <Link to="/" className="rounded-br-[28px] bg-white px-7 pb-4 pt-5 md:px-10" aria-label="NeedHomes home"><Logo /></Link>
      <div className="hidden flex-1 items-center justify-between pl-4 pr-8 pt-6 lg:flex">
        <div className="flex items-center gap-1">{navLinks.map(i => <Item key={i.label} item={i} />)}</div>
        <Link to="/investment/save-to-own" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[15px] font-medium text-ink">
          Get Started <ArrowDownRight size={16} />
        </Link>
      </div>
      <button className="p-5 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      {open && (
        <div className="absolute inset-x-4 top-20 rounded-2xl bg-white p-4 shadow-xl lg:hidden">
          {navLinks.flatMap(i => i.children ? i.children : [i]).map(l => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-ink hover:bg-primary-50">{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}

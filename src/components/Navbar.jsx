'use client'
import { useEffect, useState } from 'react'
import { Link, NavLink } from '@/lib/router'
import { ChevronDown, ArrowDownRight, Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { useWaitlist } from './WaitlistProvider.jsx'
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

function MobileItem({ item, closeMenu }) {
  const [expanded, setExpanded] = useState(false)
  if (!item.children) return <Link to={item.to} onClick={closeMenu} className="block rounded-xl px-3 py-2.5 text-ink hover:bg-primary-50">{item.label}</Link>
  return (
    <div>
      <button type="button" onClick={() => setExpanded(value => !value)} aria-expanded={expanded}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-ink hover:bg-primary-50">
        {item.label}<ChevronDown size={17} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="ml-3 border-l border-black/10 pl-2">
          {item.children.map(child => <Link key={child.label} to={child.to} onClick={closeMenu} className="block rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-primary-50">{child.label}</Link>)}
        </div>
      )}
    </div>
  )
}

export default function Navbar({ tone }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const openWaitlist = useWaitlist()
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <nav aria-label="Main" onKeyDown={e => e.key === 'Escape' && setOpen(false)}
      className={`fixed inset-x-4 top-4 z-[100] flex items-start justify-between rounded-[24px] transition-[background-color,box-shadow] duration-300 md:inset-x-[66px] md:rounded-[28px] ${scrolled || open ? `${tone === 'orange' ? 'bg-[#E8661A]/95' : 'bg-black/95'} shadow-lg backdrop-blur-xl` : 'bg-transparent'}`}>
      <Link to="/" className="rounded-br-[28px] bg-white px-7 pb-4 pt-5 md:px-10" aria-label="NeedHomes home"><Logo /></Link>
      <div className="hidden flex-1 items-center justify-between pl-4 pr-8 pt-6 lg:flex">
        <div className="flex items-center gap-1">{navLinks.map(i => <Item key={i.label} item={i} />)}</div>
        <button type="button" onClick={() => openWaitlist('get-started')} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[15px] font-medium text-ink">
          Get Started <ArrowDownRight size={16} />
        </button>
      </div>
      <button className="p-5 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      {open && (
        <div className="absolute inset-x-4 top-20 rounded-2xl bg-white p-4 shadow-xl lg:hidden">
          {navLinks.map(item => <MobileItem key={item.label} item={item} closeMenu={() => setOpen(false)} />)}
          <button type="button" onClick={() => { setOpen(false); openWaitlist('get-started') }} className="mt-2 w-full rounded-xl bg-primary px-4 py-3 font-medium text-white">Get Started</button>
        </div>
      )}
    </nav>
  )
}

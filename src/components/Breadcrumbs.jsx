'use client'

import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { Link } from '@/lib/router'
import { SITE } from '@/lib/seo'

const labels = {
  about: 'About',
  contact: 'Contact',
  faq: 'FAQs',
  investment: 'Investment',
  'save-to-own': 'Save to Own',
  'outright-purchase': 'Outright Purchase',
  'land-banking': 'Land Banking',
  'co-development': 'Co-Development',
  'fractional-ownership': 'Fractional Ownership',
  partner: 'Partner',
  agent: 'Agent Partners',
  'pay-my-rent': 'Pay My Rent',
  privacy: 'Privacy Policy',
  terms: 'Terms and Conditions',
  'data-deletion': 'Data Deletion',
  'account-deactivation': 'Account Deactivation',
  'property-hub': 'Property Hub',
}

const titleCase = value => value
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')

export default function Breadcrumbs({ currentTitle }) {
  const pathname = usePathname()
  if (!pathname || pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = [
    { name: 'Home', href: '/' },
    ...segments.map((segment, index) => ({
      name: index === segments.length - 1 && currentTitle ? currentTitle : labels[segment] ?? titleCase(segment),
      href: '/' + segments.slice(0, index + 1).join('/'),
    })),
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: SITE + (crumb.href === '/' ? '' : crumb.href),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <nav aria-label="Breadcrumb" className="px-6 pt-8 md:px-[48px]">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/80">
          {crumbs.map((crumb, index) => {
            const current = index === crumbs.length - 1
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
                {current
                  ? <span aria-current="page" className="font-medium text-white">{crumb.name}</span>
                  : <Link to={crumb.href} className="inline-flex items-center gap-1 hover:text-white">{index === 0 && <Home size={14} aria-hidden="true" />}{crumb.name}</Link>}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

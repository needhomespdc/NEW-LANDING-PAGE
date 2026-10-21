'use client'
// Keeps the existing `to=` props working on top of next/link.
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

export function Link({ to, href, ...rest }) { return <NextLink href={to ?? href} {...rest} /> }
export function NavLink({ to, ...rest }) {
  const path = usePathname()
  return <NextLink href={to} aria-current={path === to ? 'page' : undefined} {...rest} />
}

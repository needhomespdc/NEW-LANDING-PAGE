import '@fontsource-variable/inter'
import './globals.css'
import AppShell from '@/components/AppShell'
import { SITE, pages } from '@/lib/seo'

const [title, description] = pages['/']
export const metadata = {
  metadataBase: new URL(SITE),
  title, description,
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
  openGraph: { type: 'website', siteName: 'NeedHomes', title, description, url: SITE, images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
}
export const viewport = { themeColor: '#EF6A1B' }

const organization = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'NeedHomes Property Investment Limited', url: SITE,
  logo: SITE + '/apple-touch-icon.png', email: 'support@needhomespdc.com', telephone: '+2347025005857',
  address: { '@type': 'PostalAddress', streetAddress: '9 Orchid Road, Lekki', addressLocality: 'Lagos', addressCountry: 'NG' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}

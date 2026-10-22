import '@fontsource-variable/inter'
import './globals.css'
import AppShell from '@/components/AppShell'
import { DEFAULT_SOCIAL_IMAGE, SITE, pages, socialImage } from '@/lib/seo'

const [title, description] = pages['/']
export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: title, template: '%s' },
  description,
  applicationName: 'NeedHomes',
  authors: [{ name: 'NeedHomes Property Investment Limited', url: SITE }],
  creator: 'NeedHomes Property Investment Limited',
  publisher: 'NeedHomes Property Investment Limited',
  category: 'Real estate',
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { type: 'website', siteName: 'NeedHomes', locale: 'en_NG', title, description, url: SITE, images: [socialImage()] },
  twitter: { card: 'summary_large_image', title, description, images: [DEFAULT_SOCIAL_IMAGE] },
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

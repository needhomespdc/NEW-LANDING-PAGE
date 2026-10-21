export const SITE = 'https://needhomespdc.com'
const pages = {
  '/': ['NeedHomes | Property Investment & Ownership in Nigeria', 'Co-develop, own a fraction, save to own or buy outright. NeedHomes makes verified real estate investment accessible across Nigeria.'],
  '/about': ['About Us | NeedHomes', 'NeedHomes is a PropTech platform making real estate investment and property ownership more accessible, flexible and transparent for everyone.'],
  '/property-hub': ['Property Hub | NeedHomes', 'Browse and invest in verified real estate across every NeedHomes model: fractional ownership, co-development, land banking, save to own and outright purchase.'],
  '/partner': ['Developer Partners | NeedHomes', 'Put your development in front of a growing network of homebuyers and investors. Partner with NeedHomes to sell faster and grow.'],
  '/partner/agent': ['Agent Partners | NeedHomes', 'Promote verified NeedHomes properties to your network and earn commission whenever a buyer purchases through your referral link.'],
  '/contact': ['Contact Us | NeedHomes', 'Questions about a property, investment options or your account? Reach the NeedHomes team in Lekki, Lagos by phone, WhatsApp, email or our form.'],
  '/investment/save-to-own': ['Save to Own | NeedHomes', 'Pay gradually toward a verified property on a flexible plan and become the full owner when your payments are complete.'],
  '/investment/outright-purchase': ['Outright Purchase | NeedHomes', 'Buy ready homes with verified titles, take full ownership, and live in, rent out or hold your property as value grows.'],
  '/investment/land-banking': ['Land Banking | NeedHomes', 'Own verified land in high-growth areas, hold for appreciation, and exit for strong long-term returns.'],
  '/investment/co-development': ['Co-Development | NeedHomes', 'Co-fund verified real estate projects from the ground up and receive your share of the property on completion.'],
  '/investment/fractional-ownership': ['Fractional Ownership | NeedHomes', 'Own a share of premium real estate from as low as ₦50,000 and earn rental income or capital appreciation.'],
  '/pay-my-rent': ['Pay My Rent | NeedHomes', 'Save 30% of your annual rent over 90 days and become eligible for financing on the remaining 70%. Coming soon.'],
  '/faq': ['FAQs | NeedHomes', 'Answers to common questions about creating an account, investing in a property, withdrawals, security and returns on NeedHomes.'],
  '/terms': ['Terms and Conditions | NeedHomes', 'The terms that govern use of the NeedHomes platform, investment services, payments and Save-to-Own programs.'],
  '/privacy': ['Privacy Policy | NeedHomes', 'How NeedHomes collects, uses, shares and protects your personal information under the Nigeria Data Protection Act.'],
  '/data-deletion': ['Request Data Deletion | NeedHomes', 'Ask NeedHomes to delete your account and personal data. No login required.'],
  '/account-deactivation': ['Deactivate Account | NeedHomes', 'Temporarily disable your NeedHomes account while keeping your data so access can be restored later.'],
}

export { pages }

// Next.js metadata object for a static route.
export function pageMeta(path) {
  const [title, description] = pages[path]
  const url = SITE + (path === '/' ? '' : path)
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'NeedHomes', type: 'website', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image' },
  }
}

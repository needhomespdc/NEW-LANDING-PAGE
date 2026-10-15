export const investmentLinks = [
  { label: 'Fractional Ownership', to: '/investment/fractional-ownership' },
  { label: 'Co-Development', to: '/investment/co-development' },
  { label: 'Land Banking', to: '/investment/land-banking' },
  { label: 'Outright Purchase', to: '/investment/outright-purchase' },
  { label: 'Save to own', to: '/investment/save-to-own' },
]
export const partnerLinks = [
  { label: 'Developer partner', to: '/partner' },
  { label: 'Agent partner', to: '/partner/agent' },
]
export const navLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Investment', children: investmentLinks },
  { label: 'Property Hub', to: '/property-hub' },
  { label: 'Pay My Rent', to: '/pay-my-rent' },
  { label: 'Partner', children: partnerLinks },
  { label: 'Contact', to: '/contact' },
]

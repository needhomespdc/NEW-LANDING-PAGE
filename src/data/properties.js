export const properties = [
  { slug: 'mandys-court', featured: true, name: 'Mandys Court 1', type: 'Fractional', img: 'mandys-court', loc: 'Dangote Road', price: '₦50k', unit: 'slot', slots: 500, offer: 'July - Aug' },
  { slug: 'oasis-luxuria', featured: true, name: 'Oasis Luxuria', type: 'Outright', img: 'oasis-luxuria', loc: 'Dangote Road', price: '₦5.2M', unit: 'slot', slots: 500, offer: 'July - Aug' },
  { slug: 'happy-view-estate', featured: true, name: 'Happy View Estate', type: 'Land banking', img: 'happy-view-estate', loc: 'Dangote Road', price: '₦52k', unit: 'slot', slots: 500, offer: 'Open' },
  { slug: 'westland-estate', name: 'Westland Estate', type: 'Co-Dev', isNew: true, img: 'westland-estate', loc: 'Dangote Road', price: '₦50k', unit: 'slot', slots: 500, offer: 'Open' },
  { slug: 'oasis-resort', featured: true, name: 'Oasis Resort & Vacation', type: 'Outright', isNew: true, img: 'oasis-resort', loc: 'Dangote Road', price: '₦15M', unit: 'slot', slots: 500, offer: 'July - Aug' },
  { slug: 'greenfield-land', name: 'Greenfield land', type: 'Land banking', isNew: true, img: 'greenfield-land', loc: 'Dangote Road', price: '₦400k', unit: 'slot', slots: 500, offer: 'July - Aug' },
  { slug: 'needhomes-land', name: 'NeedHomes Land', type: 'Land banking', soldOut: true, img: 'needhomes-land', loc: 'Dangote Road', price: '₦1.7M', unit: 'plot', slots: 500, offer: 'Open' },
  { slug: 'fowosere-court', featured: true, name: 'Fowosere Court', type: 'Fractional', img: 'fowosere-court', loc: 'Lekki Phase 2', price: '₦50k', unit: 'slot', slots: 500, offer: 'Open' },
  { slug: 'fowosere-court-2', name: 'Fowosere Court', type: 'Fractional', img: 'fowosere-court', loc: 'Lekki Phase 2', price: '₦50k', unit: 'slot', slots: 500, offer: 'Open' },
]

// Image for a property: a Cloudinary/remote URL when set in the admin, otherwise a bundled image.
export const imgSrc = p => {
  if (p.imageUrl) return p.imageUrl.includes('res.cloudinary.com') && !p.imageUrl.includes('/upload/f_') ? p.imageUrl.replace('/upload/', '/upload/f_auto,q_auto,w_900/') : p.imageUrl
  return `/images/${p.img}.webp`
}

// "Slots left" / "Plots left" / "Units left"
export const leftLabel = p => ({ slot: 'Slots', plot: 'Plots' }[p.unit] ?? 'Units') + ' left'

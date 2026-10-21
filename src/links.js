// All external links live here. Replace each '#' with the real URL (include https://).
// Anything left as '#' stays a harmless placeholder and does not open a new tab.
export const links = {
  appStore: '#',      // footer App Store badge
  playStore: '#',     // footer Google Play badge
  social: {
    x: '#',
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    youtube: '#',
    tiktok: '#',
    whatsapp: '#',    // e.g. https://wa.me/2349018464742
  },
}

// Opens real links in a new tab; leaves '#' placeholders alone.
export const ext = href => (href && href !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})

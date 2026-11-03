// All external links live here. Replace each '#' with the real URL (include https://).
// Anything left as '#' stays a harmless placeholder and does not open a new tab.
export const links = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || '#',
  playStore: process.env.NEXT_PUBLIC_PLAY_STORE_URL || '#',
  whatsappCommunity: process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL || 'https://chat.whatsapp.com/EF4SScZAhuj5KhGyJSKCG0',
  social: {
    x: 'https://x.com/needhomespdc_ng',
    facebook: 'https://www.facebook.com/share/r/199Ap1PwpB/',
    instagram: 'https://www.instagram.com/needhomesinvest?utm_source=qr&igsi=aGl6OXduOTN2amMx',
    linkedin: 'https://www.linkedin.com/in/needhomes-property-investment-proptech-company-4475a7394/',
    youtube: 'https://youtube.com/@needhomespdc2847?si=xB_C6R9X5i8hAoJx',
    tiktok: 'https://www.tiktok.com/@needhomespdc?_r=1&_t=ZS-990xS2VS7RV',
    whatsapp: 'https://wa.me/2347025005857',
  },
}

// Opens real links in a new tab; leaves '#' placeholders alone.
export const ext = href => (href && href !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})

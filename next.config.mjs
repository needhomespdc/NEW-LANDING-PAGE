import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

export default phase => ({
  // Keep development and production artifacts separate. Running `next build`
  // while the dev server is open must not remove the chunks used by the browser.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
})

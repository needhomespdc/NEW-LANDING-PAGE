let loader
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
function loadScript() {
  if (!siteKey) return Promise.reject(new Error('reCAPTCHA is not configured.'))
  if (typeof window === 'undefined') return Promise.reject(new Error('reCAPTCHA is only available in the browser.'))
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha)
  if (!loader) loader = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-recaptcha-v3]')
    if (existing) { existing.addEventListener('load', () => resolve(window.grecaptcha), { once: true }); existing.addEventListener('error', reject, { once: true }); return }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
    script.async = true; script.defer = true; script.dataset.recaptchaV3 = 'true'
    script.onload = () => resolve(window.grecaptcha); script.onerror = () => reject(new Error('Could not load reCAPTCHA.'))
    document.head.appendChild(script)
  })
  return loader
}
export const recaptchaAction = form => `form_${String(form).replace(/[^a-zA-Z0-9_]/g, '_')}`
export async function getRecaptchaToken(form) {
  const grecaptcha = await loadScript(); const action = recaptchaAction(form)
  return new Promise((resolve, reject) => grecaptcha.ready(() => grecaptcha.execute(siteKey, { action }).then(token => resolve({ recaptchaToken: token, recaptchaAction: action })).catch(reject)))
}

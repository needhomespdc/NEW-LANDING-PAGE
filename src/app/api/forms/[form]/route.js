import { NextResponse } from 'next/server'
import { FORMS } from '@/lib/forms'

// Very small per-instance rate limit (5 submissions per minute per IP). Add a real limiter if you get abuse.
const hits = new Map()
const limited = ip => {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < 60_000)
  recent.push(now); hits.set(ip, recent)
  return recent.length > 5
}
const fail = (error, status) => NextResponse.json({ error }, { status })

export async function POST(request, { params }) {
  const { form } = await params
  const cfg = FORMS[form]
  if (!cfg) return fail('Unknown form.', 404)

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return fail('Too many requests. Please wait a minute and try again.', 429)

  let body
  try { body = await request.json() } catch { return fail('Invalid request.', 400) }
  if (body.website) return NextResponse.json({ ok: true }) // hidden honeypot field: bots fill it, people do not

  const data = {}
  for (const [k, v] of Object.entries(body)) if (k !== 'website' && typeof v === 'string') data[k] = v.trim().slice(0, 5000)
  if (cfg.required.some(k => !data[k])) return fail('Please fill in all required fields.', 400)
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return fail('Please enter a valid email address.', 400)

  const endpoint = process.env[cfg.env]
  if (!endpoint) {
    console.warn(`${cfg.env} is not set, so the "${form}" form cannot be sent.`)
    return fail('This form is not connected yet. Please email support@needhomespdc.com.', 503)
  }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(process.env.FORM_API_KEY && { Authorization: `Bearer ${process.env.FORM_API_KEY}` }) },
      body: JSON.stringify({ form, ...data, submittedAt: new Date().toISOString(), source: 'needhomespdc.com' }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(`Form "${form}" failed:`, e.message)
    return fail('We could not send your message. Please try again or email support@needhomespdc.com.', 502)
  }
}

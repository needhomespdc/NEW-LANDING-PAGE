'use client'
import { useCallback, useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
export default function CaptchaField({ form }) {
  const [captcha,setCaptcha]=useState(null); const [error,setError]=useState('')
  const load=useCallback(async()=>{setCaptcha(null);setError('');try{const r=await fetch(`/api/forms/${form}`,{cache:'no-store'});const j=await r.json();if(!r.ok)throw new Error();setCaptcha(j)}catch{setError('Could not load the security check. Please refresh it.')}},[form])
  useEffect(()=>{load()},[load])
  return <div className="mt-5 rounded-xl border border-ink/15 bg-white/70 p-4"><input type="hidden" name="captchaToken" value={captcha?.token||''}/><div className="flex items-center justify-between gap-3"><label htmlFor={`${form}-captcha`} className="text-sm font-medium normal-case text-ink">Security check: {captcha?captcha.question:'Loading...'}</label><button type="button" onClick={load} aria-label="Get a new security question" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-white"><RefreshCw size={17}/></button></div><input id={`${form}-captcha`} required inputMode="numeric" pattern="[0-9]+" name="captchaAnswer" disabled={!captcha} autoComplete="off" placeholder="Your answer" className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-base text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"/>{error&&<p className="mt-2 text-sm text-red-600">{error}</p>}</div>
}

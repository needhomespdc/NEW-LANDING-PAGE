// Browser side: posts to our own /api/forms/<form> route, which forwards to the real endpoint on the server.
export async function submitForm(form, data) {
  const res = await fetch(`/api/forms/${form}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.')
  return json
}

'use client'

import { useEffect, useRef } from 'react'
import { Check, X } from 'lucide-react'

export default function FormSuccessModal({ open, onClose, title = 'Submission received', message }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="submission-success-title"
      onClose={onClose}
      onClick={event => { if (event.target === ref.current) ref.current.close() }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-black/60"
    >
      <div className="relative p-7 text-center md:p-9">
        <button type="button" onClick={() => ref.current?.close()} aria-label="Close confirmation" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-muted hover:bg-ink/5">
          <X size={20} />
        </button>
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <Check size={32} strokeWidth={2.5} />
        </div>
        <h2 id="submission-success-title" className="mt-5 text-3xl font-semibold">{title}</h2>
        <p className="mt-3 text-muted">{message}</p>
        <button type="button" onClick={() => ref.current?.close()} className="mt-7 rounded-xl bg-primary px-10 py-3.5 font-medium text-white">
          Done
        </button>
      </div>
    </dialog>
  )
}

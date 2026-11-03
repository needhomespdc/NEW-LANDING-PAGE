'use client'

import { createContext, useCallback, useContext, useRef } from 'react'
import { Download, Smartphone, X } from 'lucide-react'
import StoreBadges from './StoreBadges.jsx'
import { useWaitlist } from './WaitlistProvider.jsx'

const DownloadAppContext = createContext(() => {})

export const useDownloadApp = () => useContext(DownloadAppContext)

export default function DownloadAppProvider({ children }) {
  const dialogRef = useRef(null)
  const openWaitlist = useWaitlist()
  const open = useCallback(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      document.documentElement.style.overflow = 'hidden'
      dialog.showModal()
    }
  }, [])
  const close = () => dialogRef.current?.close()
  const joinWaitlist = () => {
    close()
    setTimeout(() => openWaitlist('download-app'), 80)
  }

  return (
    <DownloadAppContext.Provider value={open}>
      {children}
      <dialog ref={dialogRef} aria-labelledby="download-app-title" onClose={() => { document.documentElement.style.overflow = '' }} onClick={event => { if (event.target === dialogRef.current) close() }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-black/65">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="bg-black px-7 py-8 text-white md:px-9">
            <button type="button" onClick={close} aria-label="Close download options" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-white/75 hover:bg-white/10 hover:text-white"><X size={20} /></button>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary text-white"><Smartphone size={24} /></span>
            <h2 id="download-app-title" className="mt-5 text-3xl font-semibold">Get the NeedHomes app</h2>
            <p className="mt-2 max-w-md text-white/70">Choose your device to access verified properties, manage investments, and track progress from anywhere.</p>
          </div>
          <div className="p-7 md:p-9">
            <StoreBadges onUnavailable={joinWaitlist} className="justify-center" />
            <p className="mt-5 text-center text-sm text-muted">Store links will open in a new tab. If your store version is not yet available, you can join the launch waitlist.</p>
            <button type="button" onClick={joinWaitlist} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-black/15 px-5 py-3 font-medium transition hover:border-primary hover:text-primary"><Download size={17} />Join app launch waitlist</button>
          </div>
        </div>
      </dialog>
    </DownloadAppContext.Provider>
  )
}

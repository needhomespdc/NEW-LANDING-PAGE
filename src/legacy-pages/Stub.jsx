import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
export default function Stub() {
  const name = useLocation().pathname.split('/').filter(Boolean).pop() || 'Home'
  return (
    <>
      <Hero tag="Coming soon" title={name.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())} text="This page is not built yet." ctas={false} />
      <div className="h-40" />
    </>
  )
}

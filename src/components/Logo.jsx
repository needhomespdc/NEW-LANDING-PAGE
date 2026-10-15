// Placeholder wordmark. Swap for <img src="/images/logo-dark.svg"> / logo-light.svg once exported.
export default function Logo({ light = false }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${light ? 'text-white' : 'text-ink'}`}>
      <svg width="44" height="14" viewBox="0 0 44 14" fill="none" aria-hidden><path d="M2 12 22 2l20 10" stroke="#EF6A1B" strokeWidth="2.5" strokeLinecap="round"/></svg>
      <span className="mt-1 text-[17px] font-semibold tracking-wide">NEEDHOMES</span>
    </span>
  )
}

'use client'

function PartnerLogo({ partner }) {
  const [name, img, dark] = partner
  return (
    <div className={`partner-logo grid h-24 w-[210px] shrink-0 place-items-center rounded-2xl px-6 shadow-sm transition duration-300 sm:w-[240px] ${dark ? 'bg-[#262626]' : 'bg-white'}`}>
      {img
        ? <img loading="lazy" decoding="async" src={`/images/${img}.webp`} alt={name} className="max-h-16 w-auto max-w-full object-contain" />
        : <span className="text-xl font-bold tracking-tight text-[#8A1B6F]">{name.toUpperCase()}</span>}
    </div>
  )
}

export default function PartnerMarquee({ partners }) {
  return (
    <div className="partner-marquee mt-10" role="region" aria-label="NeedHomes partners">
      <div className="partner-marquee-track">
        {[0, 1].map(copy => (
          <div key={copy} className="partner-marquee-group" aria-hidden={copy === 1}>
            {partners.map(partner => <PartnerLogo key={`${copy}-${partner[0]}`} partner={partner} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

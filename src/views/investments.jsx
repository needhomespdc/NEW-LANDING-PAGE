'use client'
import InvestmentPage from '../components/InvestmentPage.jsx'
// Each step's `img` is the screen shown while that step is hovered. `plain: true` blends a non-phone image into the panel.
const cta = (title, accent, text) => ({ title, accent, text })

const outright = {
  tag: 'Outright Purchase', title: 'Buy a verified property and own it fully',
  text: 'Purchase ready homes with verified titles, take full ownership, enjoy the freedom to live in, rent out, or hold your property as value grows.',
  aboutTag: 'About Outright Purchase', headline: ['Buy Once. Own Fully.', 'Decide Freely.'],
  about: ['Outright purchase means you buy a ready property and become the sole owner from day one.', 'You get full control to live in it, rent it out, or hold it for appreciation, with clear titles and a straightforward process.'],
  pillars: [['Full Ownership', 'Buy a verified property and take complete ownership with no shared decisions.'], ['Live, Rent, or Hold', 'Move in, earn rental income, or keep the property as a long term asset.'], ['Your Property, Your Rules', 'After purchase, take ownership immediately or rent it out on your own terms.'], ['Clear and Secure', 'Every home comes with verified titles, proper documentation, and a guided purchase process.']],
  stepsTitle: ['Simple Steps to', 'Full Ownership'],
  steps: [{ img: 'phone-outright-browse', title: 'Browse the Property Hub', text: 'Explore verified ready homes available for outright purchase.' }, { img: 'phone-outright-select', title: 'Select Property', text: 'Choose the property that fits your goals, budget, and lifestyle.' }, { img: 'phone-outright-acquire', title: 'Make Property Purchase', text: 'Complete payment securely and lock in full ownership of your home.' }, { img: 'outright-documents', plain: true, title: 'Get Property Documents', text: 'Receive your documents and take ownership on your own terms.' }],
  middle: { type: 'lines', tag: 'Outright Purchase Resale', heading: ['Outright purchase Resale'], text: ['With NeedHomes Outright Purchase, you can buy a property, secure full ownership, and position yourself to resell when the market and your investment goals make sense.'],
    lines: ['Your property. Your asset. Your exit.', "Buy at today's property value", 'Own your property outright', 'Benefit from potential property appreciation', 'Resell when you choose, subject to applicable terms', 'Track your property journey with NeedHomes', "Don't just buy property—build an asset you can grow and eventually exit from."] },
  key: { img: 'outright-key', alt: 'Modern apartment building at dusk', tag: 'Key Benefits', heading: ['Buy fully.', 'Own completely.'],
    text: ['Outright purchase is straightforward. You buy a verified ready home, receive your documents, and decide whether to live in it or rent it out. NeedHomes does not keep your property.'],
    bullets: ['Become the sole owner with complete control from day one', 'Take possession immediately or rent the property on your own terms', 'Get your property documents after a clear and guided purchase', 'Buy with confidence through verified titles and transparent deals'], button: 'Buy a property' },
  cta: cta('Ready to Own', 'Your Dream Home?', 'Join buyers who chose full ownership with verified properties and a clear path to possession'),
}
const land = {
  tag: 'Land Banking', title: 'Invest in land today and grow value over time',
  text: 'Own verified land in high-growth areas, hold for appreciation, and exit for strong long-term returns.',
  aboutTag: 'About Land Banking', headline: ['Buy Land. Hold Patiently.', 'Grow Wealth.'],
  about: ['Land banking is investing in strategic land parcels and holding them over time for appreciation.', 'You acquire verified land today, wait as value compounds, and exit when the market rewards your patience.'],
  pillars: [['Acquire Strategic Land', 'Buy verified plots in high-growth corridors and emerging development zones.'], ['Hold Over Time', 'Patient capital compounds. Hold through the appreciation cycle with minimal upkeep.'], ['Benefit from Appreciation', 'As infrastructure and demand grow around your land, so does its market value.'], ['Secure & Transparent', 'Every parcel comes with verified titles, clear documentation, and full transparency.']],
  stepsTitle: ['Simple Steps to', 'Full Ownership'],
  steps: [{ img: 'phone-land-browse', title: 'Browse Lands', text: 'Explore verified land opportunities in high growth corridors and emerging zones.' }, { img: 'phone-land-detail', title: 'Verify and Inspect', text: 'Review documentation and complete a site inspection with our team.' }, { img: 'phone-land-reserve', title: 'Secure Your Plot', text: 'Complete payment and legal documentation to lock in your land purchase.' }, { img: 'phone-land-holding', title: 'Hold Over Time', text: 'Keep your land through the appreciation cycle with little to no upkeep.' }],
  middle: { type: 'flow', tag: 'Buy Back', heading: ['Sell Your Land Back to NeedHomes'], flow: ['Invest', 'Hold', 'Appreciate', 'Resell'],
    text: ['Your NeedHomes land banking investment gives you the flexibility to resell your land to an updated market value, subject to the applicable terms, valuation and resale conditions.', 'When eligible, request a buyback and receive the applicable value of your property.'] },
  key: { img: 'land-key', alt: 'Surveyed plots of land', tag: 'Key Benefits', heading: ['Buy land today.', 'Grow value over time.'],
    text: ['Land banking is simple. You buy verified land in areas set to grow, hold it patiently, and exit when appreciation has worked in your favour.'],
    bullets: ['Build wealth patiently as land in growth corridors rises in value', 'Invest with confidence through verified titles and transparent deals', 'Protect your money over time without the stress of managing a property', 'Start with land banking as a simpler path into real estate ownership'], button: 'Start Land banking' },
  cta: cta('Ready to Bank on', 'Land Appreciation?', 'Join investors who are building wealth by holding strategic land over time'),
}
const codev = {
  tag: 'Co-Development', title: 'Co-fund verified real estate projects and grow returns together',
  text: 'Partner with other investors to fund property projects from conception to completion. Higher returns, lower risk.',
  aboutTag: 'About Co-Development', headline: ['You Invest. We Build.', 'You Own.'],
  about: ['Co-development allows you to invest in real estate projects from the ground up.', 'When the project is completed, you receive your share of the property, not just returns.'],
  pillars: [['Co-Own Real Estate', 'Become a co-owner of premium properties with like-minded investors.'], ['Quality Development', 'We manage the development with trusted partners and industry professionals.'], ['Own a Share', 'At completion, you receive your allocated unit based on your investment.'], ['Safe & Transparent', 'Every step is tracked, verified, and communicated for your peace of mind.']],
  stepsTitle: ['Simple Steps to', 'Powerful Impact.'],
  steps: [{ img: 'phone-codev-hub', title: 'Browse Projects', text: 'Explore co-development projects and choose the one you believe in.' }, { img: 'phone-codev-join', title: 'Invest Securely', text: 'Invest with Needhomes and become a project Partner.' }, { img: 'phone-codev-milestones', title: 'Track Milestones', text: 'We build, you track. Get updates as each milestone is achieved.' }, { img: 'phone-codev-details', title: 'Project Completion', text: 'After completion, own your property and enjoy its appreciated value.' }],
  middle: { type: 'flow', tag: 'Co-development Resale', heading: ['You Invest. We Build.', 'You Own.'], flow: ['Invest', 'Co-Develop', 'Own', 'Resell'],
    text: ["Your NeedHomes co-development journey doesn't have to end at handover. Once construction is completed, you can list your property for resale directly on the NeedHomes platform."] },
  key: { img: 'codev-key', alt: 'Investor and developer shaking hands in front of a building site', tag: 'Why Co-Develop with NeedHomes?', heading: ['Stronger Projects.', 'Shared Ownership.'],
    text: ['We turn land and capital into profitable real estate opportunities.', 'Partner with NeedHomes for trusted execution, Project Milestone, shared returns, and market-driven projects from development to sales.'], button: 'Start Investing Today' },
  cta: cta('Ready to Partner in', 'Development', 'Join investors who are building wealth by holding strategic land over time'),
}
const fractional = {
  tag: 'Fractional Ownership', title: 'Own a share of real estate and earn rental/ capital appreciation',
  text: 'Explore the fractional ownership Property Hub with verified properties, invest and start earning passive income.',
  aboutTag: 'About Fractional Ownership', headline: ['Smart Investing.', 'Shared Ownership. Real Returns.'],
  about: ['Fractional Ownership allows you to own a share of premium real estate properties. You earn rental income periodically or benefit from capital appreciation when the investment matures.'],
  pillars: [['Own a Share', "You don't need millions to own prime properties. Buy a fraction and start building wealth."], ['Earn Rental Income', 'Receive rental income periodically after the holding period begins.'], ['Grow with Appreciation', 'Benefit from capital appreciation paid at the end of the investment period.'], ['Secure & Transparent', 'Your investment is protected with clear terms, verified properties, and full transparency.']],
  stepsTitle: ['Simple Steps to', 'Start Your Journey'],
  steps: [{ img: 'phone-fractional-hub', title: 'Explore Properties', text: 'Browse fractional investment opportunities and choose a property you love.' }, { img: 'phone-fractional-detail', title: 'Choose Your Slot', text: 'Select the amount you want to invest. Own a share starting from as low as 50,000.' }, { img: 'phone-fractional-invest', title: 'Complete Investment', text: 'Fund your wallet and complete your investment securely.' }, { img: 'phone-fractional-payouts', title: 'Earn Rental Income', text: 'After the holding period, earn rental income periodically.' }, { img: 'phone-fractional-invest', title: 'Get Paid at Maturity', text: 'Receive your capital appreciation when the investment matures.' }],
  middle: { type: 'band', tag: 'Exits', heading: 'Ready to Exit Your Investment?', text: ['Request an exit from your eligible fractional property investment and view your estimated exit value, applicable terms and next steps.'] },
  key: { img: 'fractional-key', alt: 'Apartment towers against a blue sky', tag: 'Perfect For', heading: ['Who Is This For?'],
    text: [], bullets: ['First-time investors looking to start small', 'Busy professionals building long-term wealth', 'Anyone who wants passive income from real estate', 'Investors who believe in the future of real estate'], button: 'Invest Now' },
  cta: cta('Ready to Start your', 'Investment Journey', 'Join other investors and own a fraction of a property, invest within your means, and grow your real estate portfolio with NeedHomes'),
}
export const Outright = () => <InvestmentPage c={outright} />
export const LandBanking = () => <InvestmentPage c={land} />
export const CoDevelopment = () => <InvestmentPage c={codev} />
export const Fractional = () => <InvestmentPage c={fractional} />

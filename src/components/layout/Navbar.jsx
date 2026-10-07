import { Link, useLocation } from 'react-router-dom'

const navigation = [['Home', '/'], ['About Us', '/about-us'], ['Services', '/services'], ['Projects', '/projects'], ['HSE & Quality', '/hse-quality'], ['Contact & RFQ', '/contact']]

export default function Navbar() {
 const { pathname } = useLocation()
 return <>
 <a className="skip-link" href="#page-content">Skip to content</a>
 <details className="mobile-navigation">
<summary aria-label="Open navigation">Menu</summary>
<nav>{navigation.map(([label, to]) => <Link key={to} to={to} aria-current={pathname === to ? 'page' : undefined} onClick={event => { event.currentTarget.closest('details').open = false }}>{label}</Link>)}</nav>
</details>
 <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
<div className="bg-primary text-on-primary hidden md:block">
<div className="max-w-7xl mx-auto px-6 lg:px-12 h-10 flex items-center justify-between font-label-sm text-label-sm tracking-wider uppercase">
<div className="flex items-center gap-space-lg">
<div className="flex items-center gap-space-xs text-primary-fixed">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span>Dubai, United Arab Emirates</span>
</div>
<div className="flex items-center gap-space-xs text-primary-fixed">
<span className="material-symbols-outlined text-[16px]">call</span>
<span className="font-data-mono-num text-data-mono-num font-medium">+971 50 319 6134 / +971 56 109 8915</span>
</div>
<div className="hidden lg:flex items-center gap-space-xs text-primary-fixed">
<span className="material-symbols-outlined text-[16px]">mail</span>
<span className="lowercase font-body-sm text-body-sm">servicesmsmtechnical@gmail.com</span>
</div>
</div>
<div className="flex items-center gap-space-md">
<div className="flex items-center gap-space-xs text-primary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>ASHRAE &amp; SMACNA GUIDELINES</span>
</div>
</div>
</div>
</div>
<div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
<div className="flex items-center gap-space-md">
<img alt="MSM Technical Services Corporate Logo" className="h-8 w-auto object-contain" src={`${import.meta.env.BASE_URL}msm-mark.svg`}/>
<div className="flex flex-col">
<span className="font-title-md text-title-md uppercase tracking-tight text-primary leading-none">MSM TECHNICAL SERVICES</span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mt-1">L.L.C • DUBAI, UAE</span>
</div>
</div>
<nav className="hidden lg:flex items-center gap-space-lg" aria-label="Main navigation">
{navigation.map(([label, to]) => {
 const active = to === '/' ? ['/', '/home-1', '/home-2'].includes(pathname) : pathname === to
 return <Link key={to} to={to} aria-current={active ? 'page' : undefined} className={`font-label-md text-label-md uppercase tracking-wider transition-colors ${active ? 'text-secondary font-bold underline underline-offset-8' : 'text-on-surface-variant hover:text-secondary'}`}>{label === 'Contact & RFQ' ? 'Contact' : label}</Link>
})}
</nav>
<div className="flex items-center gap-space-md">
<Link className="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm bg-secondary text-on-secondary rounded font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.06)]" data-path="request-a-quote" to="/contact#rfqForm" aria-current={pathname === '/contact#rfqForm' ? 'page' : undefined}>Request a Quote</Link>
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
</div>
</div>
</div>
</header>
 </>
}

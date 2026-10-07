import { Link } from 'react-router-dom'

export default function Footer() {
 return <>
<div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary-container text-on-primary px-space-md py-space-sm flex items-center justify-between shadow-[0_-2px_10px_rgba(0,0,0,0.15)]">
<a className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-primary uppercase tracking-wide" href="tel:+971503196134">
<span className="material-symbols-outlined text-[18px] text-secondary-container">call</span>
<span>Call Operations</span>
</a>
<Link className="px-space-md py-space-xs bg-secondary text-on-secondary rounded font-label-sm text-label-sm uppercase tracking-wider font-semibold" data-path="request-a-quote" to="/contact#rfqForm">Request Quote</Link>
</div>
<footer className="w-full bg-primary text-on-primary mt-space-xl">
<div className="bg-tertiary-container text-primary-fixed border-b border-primary-container py-space-sm">
<div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm tracking-wider uppercase">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary-container text-[18px]">engineering</span>
<span>Engineering Standard: MEP Works executed with reference to ASHRAE and SMACNA Guidelines</span>
</div>
<div className="text-primary-fixed-dim">MSM Technical Services • Dubai, UAE</div>
</div>
</div>
<div className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl">
<div className="flex flex-col gap-space-md">
<div className="flex items-center gap-space-sm">
<span className="font-title-md text-title-md uppercase tracking-tight text-on-primary font-bold">MSM TECHNICAL SERVICES L.L.C</span>
</div>
<p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed">MSM Technical Services L.L.C - HVAC, Ventilation, Plumbing, Electrical &amp; Technical Services across Dubai and the UAE. Delivering precision-engineered MEP solutions for commercial, industrial, and residential sectors.</p>
<div className="flex items-center gap-space-sm font-data-mono-num text-data-mono-num text-secondary-container mt-space-xs">
<span className="material-symbols-outlined text-[18px]">schedule</span>
<span>Installation • Maintenance • Testing &amp; Commissioning</span>
</div>
</div>
<div className="flex flex-col gap-space-md">
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary-container font-semibold">Quick Links</span>
<nav className="flex flex-col gap-space-xs font-body-sm text-body-sm">
<Link className="text-primary-fixed hover:text-on-primary transition-colors" data-path="home" to="/">Home</Link>
<Link className="text-primary-fixed hover:text-on-primary transition-colors" data-path="about-us" to="/about-us">About Us</Link>
<Link className="text-primary-fixed hover:text-on-primary transition-colors" data-path="services" to="/services">Services Matrix</Link>
<Link className="text-primary-fixed hover:text-on-primary transition-colors" data-path="projects" to="/projects">Execution Projects</Link>
<Link className="text-primary-fixed hover:text-on-primary transition-colors" data-path="hse-quality" to="/hse-quality">HSE &amp; Quality Manual</Link>
<Link className="text-primary-fixed hover:text-on-primary transition-colors" data-path="contact" to="/contact">Contact &amp; RFQ</Link>
</nav>
</div>
<div className="flex flex-col gap-space-md">
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary-container font-semibold">MEP Capabilities</span>
<div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-primary-fixed-dim">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>HVAC &amp; Central Chilled Water Systems</span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>Ventilation &amp; SMACNA Ducting Works</span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>Commercial Plumbing &amp; Drainage</span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>Electrical Fitting &amp; Fixture Maintenance</span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>False Ceilings, Light Partitions &amp; Tiling</span>
</div>
</div>
<div className="flex flex-col gap-space-md">
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary-container font-semibold">Direct Contact</span>
<div className="flex flex-col gap-space-sm font-body-sm text-body-sm text-primary-fixed">
<div className="flex items-start gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-secondary-container mt-0.5">location_on</span>
<span>Dubai, United Arab Emirates<br/>
<span className="text-primary-fixed-dim">P.O. Box 119753</span>
</span>
</div>
<div className="flex items-start gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-secondary-container mt-0.5">call</span>
<div className="flex flex-col font-data-mono-num text-data-mono-num">
<a className="hover:text-on-primary transition-colors" href="tel:+971503196134">+971 50 319 6134</a>
<a className="hover:text-on-primary transition-colors" href="tel:+971561098915">+971 56 109 8915</a>
</div>
</div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-secondary-container">mail</span>
<a className="hover:text-on-primary transition-colors" href="mailto:servicesmsmtechnical@gmail.com">servicesmsmtechnical@gmail.com</a>
</div>
</div>
</div>
</div>
<div className="border-t border-primary-container py-space-md">
<div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-space-xs font-label-sm text-label-sm text-primary-fixed-dim tracking-wide">
<p>© 2026 MSM Technical Services L.L.C. All rights reserved. Registered in Dubai, UAE.</p>
<div className="flex items-center gap-space-lg">
<Link className="hover:text-on-primary transition-colors" data-path="hse-quality" to="/hse-quality">Quality Policy</Link>
</div>
</div>
</div>
</footer>
</>
}

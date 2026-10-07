export const pages = {
  '/': { title: 'HVAC & Technical Services in Dubai | MSM Technical Services', description: 'MSM Technical Services provides HVAC installation, ventilation, plumbing, electrical maintenance and technical finishing works in Dubai and the UAE.', name: 'Home' },
  '/about-us': { title: 'About MSM Technical Services | Dubai HVAC & MEP Team', description: 'Meet MSM Technical Services, a Dubai-based team providing building-services installation, maintenance, testing and commissioning across the UAE.', name: 'About Us' },
  '/services': { title: 'HVAC, Plumbing & Electrical Services Dubai | MSM', description: 'Explore HVAC and AC installation, chilled-water systems, ventilation, plumbing, electrical maintenance, ceilings, partitions and tiling services in Dubai.', name: 'Services' },
  '/projects': { title: 'HVAC Projects in Dubai | Chiller & DX Systems | MSM', description: 'Explore MSM HVAC project experience in Dubai: residential buildings, villas and warehouses with Carrier, York and Mitsubishi chiller, DX and district-cooling systems.', name: 'Projects' },
  '/hse-quality': { title: 'HSE & Quality | HVAC Installation Standards | MSM Dubai', description: 'Learn how MSM approaches safe site execution, installation quality, ASHRAE and SMACNA practices, and HVAC testing and commissioning in Dubai.', name: 'HSE & Quality' },
  '/contact': { title: 'Contact MSM Dubai | Request an HVAC & MEP Quote', description: 'Contact MSM Technical Services in Dubai for HVAC, ventilation, plumbing, electrical and finishing works. Call +971 50 319 6134 or request a quotation.', name: 'Contact' },
}

export const aliases = { '/home-1': '/', '/home-2': '/', '/request-a-quote': '/contact' }
export const serviceNames = ['HVAC & Air Conditioning', 'Ventilation Systems', 'Plumbing & Sanitary Installation', 'Electrical Fitting & Maintenance', 'False Ceiling & Light Partitions', 'Floor & Wall Tiling', 'Testing & Commissioning']

export function validateSiteUrl(value = '') {
  if (!value.trim()) return ''
  const url = new URL(value)
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || url.port || !url.hostname.includes('.') || /(^|\.)(localhost|example\.(com|org|net))$/.test(url.hostname) || /^\d+(\.\d+){3}$/.test(url.hostname)) {
    throw new Error('VITE_SITE_URL must be the real public HTTPS origin, without a path, query or fragment.')
  }
  return url.origin
}

export function getSeo(pathname, origin = '') {
  const path = pathname.replace(/\/+$/, '') || '/'
  const canonicalPath = aliases[path] || path
  const page = pages[canonicalPath]
  const title = page?.title || 'Page Not Found | MSM Technical Services'
  const description = page?.description || 'The requested page could not be found. Browse MSM technical services or contact our Dubai team.'
  const canonical = origin && page ? origin + canonicalPath : ''
  const meta = [
    ['name', 'description', description],
    ['name', 'robots', page && origin ? 'index, follow, max-image-preview:large' : 'noindex, follow'],
    ['property', 'og:type', 'website'], ['property', 'og:site_name', 'MSM Technical Services L.L.C'],
    ['property', 'og:locale', 'en_AE'], ['property', 'og:title', title], ['property', 'og:description', description],
    ['name', 'twitter:card', 'summary'], ['name', 'twitter:title', title], ['name', 'twitter:description', description],
  ]
  if (canonical) meta.push(['property', 'og:url', canonical])
  const organization = {
    '@type': 'Organization', '@id': `${origin}/#organization`, name: 'MSM Technical Services L.L.C', url: `${origin}/`,
    logo: `${origin}/msm-mark.svg`, email: 'servicesmsmtechnical@gmail.com', telephone: '+971503196134',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE', postOfficeBoxNumber: '119753' },
    contactPoint: [{ '@type': 'ContactPoint', telephone: '+971503196134', contactType: 'project enquiries' }, { '@type': 'ContactPoint', telephone: '+971561098915', contactType: 'project enquiries' }],
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  }
  const graph = origin && page ? [organization,
    { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: organization.name, publisher: { '@id': organization['@id'] } },
    { '@type': canonicalPath === '/contact' ? 'ContactPage' : canonicalPath === '/about-us' ? 'AboutPage' : 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description, inLanguage: 'en', isPartOf: { '@id': `${origin}/#website` }, about: { '@id': organization['@id'] } },
  ] : []
  if (graph.length && canonicalPath !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
    { '@type': 'ListItem', position: 2, name: page.name, item: canonical },
  ] })
  if (graph.length && canonicalPath === '/services') graph.push(...serviceNames.map(name => ({ '@type': 'Service', name, provider: { '@id': organization['@id'] }, areaServed: { '@type': 'Country', name: 'United Arab Emirates' }, url: canonical })))
  return { title, meta, canonical, structuredData: graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null }
}

export const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
export const serializeJson = value => JSON.stringify(value).replaceAll('<', '\\u003c')

export function renderSeoHead(seo) {
  return `<title data-seo>${escapeHtml(seo.title)}</title>\n` + seo.meta.map(([attribute, key, value]) => `<meta data-seo ${attribute}="${key}" content="${escapeHtml(value)}" />`).join('\n') +
    (seo.canonical ? `\n<link data-seo rel="canonical" href="${escapeHtml(seo.canonical)}" />` : '') +
    (seo.structuredData ? `\n<script data-seo type="application/ld+json">${serializeJson(seo.structuredData)}</script>` : '')
}

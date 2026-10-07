import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

// One-time importer for the supplied Stitch export. Scripts are never shipped.
const root = process.argv[2]
if (!root) throw new Error('Usage: node scripts/import-designs.mjs <export-directory>')
const pages = { home: 'home_1', 'home-2': 'home_2', about: 'about_us', contact: 'contact_rfq' }
fs.mkdirSync('src/pages/public/designs', { recursive: true })
let theme
for (const [name, source] of Object.entries(pages)) {
  const html = fs.readFileSync(path.join(root, `msm_technical_services_${source}`, 'code.html'), 'utf8')
  if (!theme) {
    const config = html.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/)[1]
    const context = { tailwind: {} }
    vm.runInNewContext(config, context, { timeout: 1000 })
    theme = context.tailwind.config.theme.extend
  }
  let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1]
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/\s+on\w+="[^"]*"/g, '')
    .replace(/© 2025/g, '© 2026')
  const routes = { home: '/', 'about-us': '/about-us', contact: '/contact', 'request-a-quote': '/contact#rfqForm', services: '/#services', projects: '/#projects', 'hse-quality': '/#standards' }
  body = body.replace(/<a\b([^>]*data-path="([^"]+)"[^>]*)>/g, (tag, attrs, route) => {
    if (!routes[route]) return tag
    return `<a${attrs.replace(/href="[^"]*"/, `href="${routes[route]}"`)}>`
  })
  body = body.replace(/<a\b[^>]*data-path="(?:admin-portal|terms)"[^>]*>[\s\S]*?<\/a>/g, '')
    .replace(/(<img alt="MSM Technical Services Corporate Logo"[^>]*src=")[^"]+("\/?>)/g, '$1/msm-mark.svg$2')
    .replace(/<button[^>]*>العربية<\/button>/g, '<span title="English content">EN</span>')
    .replace(/<span class="text-on-primary font-bold">EN<\/span><span class="text-primary-fixed-dim">\/<\/span>/g, '')
    .replace(/Download Contractor Capability Profile \(PDF\)/g, 'Request Contractor Capability Profile')
    .replace(/(<a[^>]*href=")#("[^>]*>\s*Home\s*<\/a>)/gi, '$1/$2')
    .replace(/View All 9\+ Dubai Projects/g, 'View Featured Dubai Projects')
  if (name.startsWith('home')) {
    for (const [id, hint] of [['services', 'Core MEP'], ['projects', 'project-item'], ['standards', 'Engineering Governance']]) {
      const sections = [...body.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)]
      const section = sections.find(entry => entry[0].includes(hint))
      if (section) body = body.replace(section[0], section[0].replace('<section ', `<section id="${id}" `))
    }
  }
  if (name === 'contact') {
    body = body.replace('<form ', '<p id="rfq-notice" class="mb-space-lg text-on-surface-variant">This form prepares an email draft. Send it from your email application and attach selected drawings manually to complete your request.</p><form ')
    body = body.replace('Submit Request for Quotation (RFQ)', 'Prepare RFQ Email')
      .replace('End-to-End Encrypted Portal', 'Send using your email application')
      .replace('Attach Drawings, Schedules or BoQ (Optional)', 'Select Drawings, Schedules or BoQ (Attach to your email manually)')
      .replace('Drag and drop engineering drawings here, or', 'Select engineering drawings, or')
      .replace('RFQ Successfully Received', 'RFQ email draft prepared')
      .replace('Your inquiry has been assigned to our Estimating Desk. A confirmation email and project docket number have been issued. For urgent site visits, call operations directly at +971 50 319 6134.', 'Send the draft in your email application to complete your request. Add selected drawings as attachments manually. If your email application did not open, email servicesmsmtechnical@gmail.com or call +971 50 319 6134.')
  }
  // Shared navigation and footer are maintained as React layout components.
  const main = body.slice(body.indexOf('<main'), body.lastIndexOf('</main>') + 7)
  fs.writeFileSync(`src/pages/public/designs/${name}.html`, main)
}
const tokens = []
for (const [name, value] of Object.entries(theme.colors)) tokens.push(`--color-${name}: ${value};`)
for (const [name, value] of Object.entries(theme.spacing)) tokens.push(`--spacing-${name}: ${value};`)
for (const [name, value] of Object.entries(theme.borderRadius)) tokens.push(`--radius${name === 'DEFAULT' ? '' : `-${name}`}: ${value};`)
for (const name of Object.keys(theme.fontFamily)) tokens.push(`--font-${name}: 'IBM Plex Sans', sans-serif;`)
for (const [name, [size, properties]] of Object.entries(theme.fontSize)) {
  tokens.push(`--text-${name}: ${size};`)
  for (const [property, value] of Object.entries(properties)) tokens.push(`--text-${name}--${property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}: ${value};`)
}
fs.writeFileSync('src/design-theme.css', `@theme {\n${tokens.join('\n')}\n}\n`)

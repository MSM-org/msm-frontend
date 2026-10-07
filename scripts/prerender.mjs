import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createServer, loadEnv } from 'vite'
import { aliases, escapeHtml, getSeo, pages, renderSeoHead, validateSiteUrl } from '../src/seo/config.js'
import { normalizeBase, withBase } from '../src/utils/sitePath.js'

const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env }
const origin = validateSiteUrl(env.VITE_SITE_URL)
const base = normalizeBase(env.VITE_BASE_PATH || '/')
const siteUrl = origin ? origin + base.slice(0, -1) : ''
if (process.argv.includes('--release') && !origin) throw new Error('Set VITE_SITE_URL to the final public HTTPS domain before building for release.')
const template = await readFile('dist/index.html', 'utf8')
const server = await createServer({ mode: 'production', server: { middlewareMode: true }, appType: 'custom' })
try {
  const { AppRoutes } = await server.ssrLoadModule('/src/App.jsx')
  for (const route of [...Object.keys(pages), ...Object.keys(aliases), '/404']) {
    const content = renderToString(createElement(StaticRouter, { basename: base, location: withBase(route, base) }, createElement(AppRoutes)))
    const html = template.replace(/<title data-seo>[\s\S]*?<\/title>/, '').replace('<!-- seo-head -->', renderSeoHead(getSeo(route, siteUrl))).replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    const directory = route === '/' || route === '/404' ? 'dist' : `dist${route}`
    await mkdir(directory, { recursive: true })
    await writeFile(`${directory}/${route === '/404' ? '404.html' : 'index.html'}`, html)
  }
  await writeFile('dist/.nojekyll', '')
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : '# Preview build: HTML pages are noindex until VITE_SITE_URL is configured.\n'}`)
  if (origin) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map(route => `<url><loc>${escapeHtml(siteUrl + route)}</loc></url>`).join('')}</urlset>\n`)
  console.log(`Pre-rendered 6 public pages, 3 aliases and a 404 page. ${origin ? 'Canonical URLs and sitemap generated.' : 'Preview mode: set VITE_SITE_URL for indexing and sitemap generation.'}`)
} finally {
  await server.close()
}

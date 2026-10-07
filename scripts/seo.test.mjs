import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { aliases, getSeo, pages, renderSeoHead, validateSiteUrl } from '../src/seo/config.js'
import { normalizeBase, prefixMarkupPaths, withBase, withoutBase } from '../src/utils/sitePath.js'

const base = normalizeBase(process.env.VITE_BASE_PATH || '/')

test('repository paths preserve links, anchors and external URLs', () => {
  assert.equal(withBase('/contact#rfqForm', '/msm-frontend/'), '/msm-frontend/contact#rfqForm')
  assert.equal(withoutBase('/msm-frontend/contact#rfqForm', '/msm-frontend/'), '/contact#rfqForm')
  assert.equal(withoutBase('/other/services', '/msm-frontend/'), '/other/services')
  assert.equal(prefixMarkupPaths('<a href="/projects">Projects</a><img src="/logo.svg"><a href="//external.test">External</a>', '/msm-frontend/'), '<a href="/msm-frontend/projects">Projects</a><img src="/msm-frontend/logo.svg"><a href="//external.test">External</a>')
})

test('canonical pages are unique and aliases consolidate signals', () => {
  const origin = 'https://msm.test'
  assert.equal(new Set(Object.values(pages).map(page => page.title)).size, 6)
  assert.equal(new Set(Object.values(pages).map(page => page.description)).size, 6)
  for (const [alias, route] of Object.entries(aliases)) assert.equal(getSeo(alias, origin).canonical, origin + route)
  assert.equal(getSeo('/services/', origin).canonical, origin + '/services')
})

test('previews and unknown routes are noindex with no invented canonical', () => {
  for (const seo of [getSeo('/services'), getSeo('/unknown', 'https://msm.test')]) {
    assert.equal(seo.canonical, '')
    assert.ok(seo.meta.some(([, key, value]) => key === 'robots' && value.includes('noindex')))
    assert.equal(seo.structuredData, null)
  }
})

test('domain validation and metadata escaping', () => {
  assert.equal(validateSiteUrl(''), '')
  assert.equal(validateSiteUrl('https://msm.test/'), 'https://msm.test')
  for (const value of ['http://msm.test', 'https://localhost', 'https://example.com', 'https://msm.test/path', 'https://msm.test?q=1']) assert.throws(() => validateSiteUrl(value))
  const seo = getSeo('/services', 'https://msm.test')
  assert.equal(seo.structuredData['@graph'].filter(item => item['@type'] === 'Service').length, 7)
  assert.ok(renderSeoHead({ ...seo, title: '<unsafe>' }).includes('&lt;unsafe&gt;'))
})

test('built pages expose content, links and unique metadata without JavaScript', async () => {
  for (const route of Object.keys(pages)) {
    const html = await readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8')
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route)
    assert.equal((html.match(/<title\b/g) || []).length, 1, route)
    assert.equal((html.match(/name="description"/g) || []).length, 1, route)
    assert.ok(html.includes('servicesmsmtechnical@gmail.com'), route)
    for (const link of ['/services', '/projects', '/hse-quality', '/contact']) assert.ok(html.includes(`href="${withBase(link, base)}"`), `${route}: ${link}`)
    assert.ok(html.includes(`src="${base}msm-mark.svg"`))
    const assets = [...html.matchAll(/(?:src|href)="([^\"]*\/assets\/[^\"]+)"/g)]
    assert.ok(assets.length)
    for (const [, url] of assets) assert.ok(url.startsWith(`${base}assets/`), url)
  }
  const missing = await readFile('dist/404.html', 'utf8')
  assert.ok(missing.includes('noindex, follow'))
  assert.ok(missing.includes('Page not found'))
})

test('release sitemap includes canonical routes only and matches page metadata', async () => {
  const robots = await readFile('dist/robots.txt', 'utf8')
  const sitemapUrl = robots.match(/^Sitemap: (.+)\/sitemap.xml$/m)
  if (!sitemapUrl) {
    await assert.rejects(readFile('dist/sitemap.xml'), { code: 'ENOENT' })
    return
  }
  const origin = sitemapUrl[1]
  const xml = await readFile('dist/sitemap.xml', 'utf8')
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
  assert.deepEqual(locations, Object.keys(pages).map(route => origin + route))
  for (const route of Object.keys(pages)) {
    const html = await readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8')
    assert.ok(html.includes(`rel="canonical" href="${origin + route}"`))
    assert.ok(!html.includes('noindex'))
    const schema = JSON.parse(html.match(/<script data-seo type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
    assert.ok(schema['@graph'].some(item => item['@type'] === 'Organization'))
  }
})

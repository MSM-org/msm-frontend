# MSM search optimization

## Implemented

- Six public pages have unique titles, descriptions, canonical URLs when configured, Open Graph and Twitter metadata.
- Production builds pre-render visible page content and shared navigation/footer into HTML; the site does not require JavaScript for a crawler to read its content.
- Organization, WebSite, WebPage, breadcrumbs and service structured data use documented company facts. No invented street address, reviews, ratings, opening hours or certifications.
- The sitemap contains only the six canonical public routes. Home variants canonicalize to `/`; the quote alias canonicalizes to `/contact`.
- Unknown pages use noindex. A pre-rendered `404.html` is supplied for the host's real 404 response.
- Relevant Dubai/UAE service phrases appear naturally in titles, descriptions, visible headings and source-backed content. No hidden keyword lists or doorway pages.
- Image alt attributes, deferred image loading below the home hero, font preconnections and an SVG favicon are included.

## Search topic map

| Page | Search intent and related phrases |
| --- | --- |
| Home | HVAC services Dubai, technical services Dubai, building services UAE |
| About | MSM Technical Services, Dubai HVAC team, MEP installation and maintenance |
| Services | AC installation and maintenance Dubai, chilled-water systems, air-cooled chillers, DX systems, ventilation ductwork, FCU/AHU installation, plumbing and sanitary installation, electrical fitting maintenance, false ceilings, light partitions, floor and wall tiling, testing and commissioning |
| Projects | HVAC projects Dubai, Carrier chiller Al Barsha, York chiller Al Quoz, district cooling Dubai South, Mitsubishi DX Al Qusais |
| HSE & Quality | HVAC quality procedures, site safety, ASHRAE and SMACNA practices, HVAC testing and commissioning |
| Contact | HVAC quotation Dubai, MEP service enquiry, MSM phone and email |

These are relevance targets based on the supplied scope, not claims of measured search volume or guaranteed rankings.

## Development and release

The site is currently under development. With no `VITE_SITE_URL`, `npm run build` creates a pre-rendered preview with noindex pages and no sitemap or invented canonical domain.

Before launch, set `VITE_SITE_URL` in `.env.production.local` or the hosting build environment to the real public HTTPS origin. Run `npm run build:release`; it rejects a missing or invalid public domain. Deploy the generated `dist` folder.

Configure the host to serve each route's generated `index.html`, normalize trailing slashes to the canonical URL, redirect HTTP/alternate domains permanently to the canonical HTTPS domain, and serve `404.html` with HTTP 404 for unknown paths. Do not rewrite every URL to the home HTML: that would lose the per-page metadata and produce soft 404s. Prefer permanent redirects for `/home-1` and `/request-a-quote` to their canonical routes; `/home-2` remains a canonicalized design variant.

After deployment, verify the domain in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`, inspect all six URLs and test structured data. Test mobile Core Web Vitals on the deployed site; no live performance or ranking scores have been claimed. Enable HTTPS and compression and cache hashed assets for a year while allowing HTML updates.

For local discovery, verify an eligible Google Business Profile with the same approved company contact details, accurate service area and business category. Add approved original project photos and useful project case studies, and seek genuine customer reviews. These external actions require the deployed domain and company account access and have not been performed here.

## References

- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Supported meta tags: Google ignores meta keywords](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Google spam policies, including keyword stuffing](https://developers.google.com/search/docs/essentials/spam-policies)

SEO improves discoverability; no implementation can guarantee the number-one position for every related search.

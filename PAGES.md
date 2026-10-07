# Corporate pages

The supplied Stitch exports are integrated into the existing React/Vite app.

| Route | Page |
| --- | --- |
| `/` or `/home-1` | Home variant 1 (default) |
| `/home-2` | Home variant 2 |
| `/about-us` | About Us |
| `/services` | Services |
| `/projects` | Projects with system filters |
| `/hse-quality` | HSE & Quality |
| `/contact` or `/request-a-quote` | Contact and RFQ |

Services, Projects, and HSE & Quality have standalone, shareable routes. Home contains short overviews linking to those pages. Legacy home section URLs redirect to the corresponding standalone page. All routes use one shared navigation and footer layout. Both home variants preserve the supplied content and styling. The Engineered Precision folder provided design tokens rather than another page.

Run `npm run dev` to preview and `npm run build` to produce pre-rendered files. Set the real `VITE_SITE_URL` and use `npm run build:release` for launch. Configure the host to serve each route's generated `index.html` and return `404.html` with HTTP 404 for unknown paths. See `SEO.md` for deployment and search configuration.

The RFQ form validates required fields and a 25 MB total file size limit, then prepares a mailto email draft. The visitor must send that draft and attach their selected files manually. No inquiry or file is uploaded by this app; a backend endpoint is needed for direct submission.

Fonts and design images currently use the external URLs included in the exports. Arabic translation, staff authentication, legal pages, and a capability PDF were not supplied.

Local script-free page content lives in `src/pages/public/designs`. Shared navigation lives in `src/components/layout/Navbar.jsx`; the footer and mobile contact bar live in `src/components/layout/Footer.jsx`. React supplies filtering and form interactions in `src/App.jsx`. Tailwind is compiled through Vite, without the exported CDN runtime. To reimport page content from the originals, run `node scripts/import-designs.mjs <export-directory>`; this preserves the separate layout components.

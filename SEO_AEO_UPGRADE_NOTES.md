# SEO + AEO Upgrade Notes

Updated: 2026-05-26

## What changed

- Sharpened homepage title and meta description around `Cybersecurity & IT Portfolio`.
- Added a homepage quick-answer section for AEO / AI extraction: `Who is Logan Goodwin?`.
- Added homepage WebPage + FAQPage schema.
- Added `llms.txt` to give AI crawlers a clean summary of the site, key pages, and preferred identity summary.
- Added FAQPage + WebPage schema to the Somersworth IT & Cybersecurity service page.
- Added three focused authority pages:
  - `/cybersecurity-portfolio/`
  - `/network-security-labs/`
  - `/incident-response-grc/`
- Added stronger internal links from the homepage, project library, and service page to the new authority pages.
- Added CollectionPage + ItemList schema to `/projects/`.
- Added answer-ready summary blocks to priority project pages.
- Updated `sitemap.xml` with the new pages and `llms.txt`.
- Added reusable CSS for answer-ready cards, authority link grids, and project answer blocks.

## After upload

1. Replace the current GitHub Pages files with this updated folder.
2. Commit and push to the `main` branch.
3. Open `https://loganggoodwin.com/llms.txt` to confirm it resolves.
4. Resubmit `https://loganggoodwin.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
5. Test the service page and project library in a browser after deployment.

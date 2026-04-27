# Logan G. Goodwin Portfolio Site

A polished GitHub Pages portfolio focused on cybersecurity, infrastructure, networking, technical documentation, and active CTF work.

## What is included

- Updated homepage with featured work, active projects, certifications, experience, target-role positioning, and a portfolio status section
- Projects landing page with duplicate Information Assurance card removed
- CTF hash-cracking / NCL recap page with a clear disclosure callout for sample or restricted competition data
- Open Graph preview image added for better LinkedIn and social sharing
- Contact form wired to Formspree with a mailto fallback and copy-email button
- Accessibility and performance quick wins: skip links, stronger focus states, descriptive alt text, async image decoding, and lazy loading for non-critical images
- Proof-artifact sections added to the network-focused project pages to make the artifact trail more visible

## Deploy on GitHub Pages

1. Copy the contents of this folder into the root of your `loganggoodwin.github.io` repository
2. Commit and push to GitHub
3. GitHub Pages will publish the site from the repository root

## Manual verification checklist

### 1. Test the contact form end-to-end
The contact form is currently pointed at Formspree endpoint `mzdygvle`. Before sending the site to employers, submit a test message from the live GitHub Pages site and confirm the message arrives in the Formspree inbox and forwards to your email.

### 2. Replace or confirm CTF sample data
The CTF/NCL page now includes a visible disclosure note: “Sample data used pending competition disclosure.” If any hashes, flags, challenge output, or screenshots are still illustrative, keep the disclosure visible. Once disclosure is allowed, replace sample material with sanitized real results.

### 3. Add stronger proof artifacts over time
The network project pages now include proof-artifact sections. The strongest next upgrade would be adding real Packet Tracer topology screenshots, sanitized configuration files, and test-output screenshots showing successful pings and blocked guest-to-internal traffic.

## Where things live

- Homepage: `/index.html`
- Projects landing page: `/projects/index.html`
- CTF / NCL recap: `/projects/ctf-hash-cracking/index.html`
- Guest VLAN project: `/projects/guest-network-vlan/index.html`
- Secure campus project: `/projects/secure-enterprise-campus/index.html`
- Open Graph image: `/images/og-preview.png`

## File cleanup note

The site now uses one main stylesheet (`styles.css`) and one main script file (`script.js`). The temporary `styles-updated.css` and `script-updated.js` files were merged and removed so GitHub Pages only needs the original filenames.

# Logan G. Goodwin Portfolio Site

A polished GitHub Pages portfolio focused on cybersecurity, infrastructure, networking, technical documentation, and active CTF work.

## What is included

- Updated homepage with featured work, active projects, certifications, experience, target-role positioning, and a portfolio status section
- Projects landing page with duplicate Information Assurance card removed
- CTF hash-cracking / NCL recap page with a clear disclosure callout for sample or restricted competition data
- Open Graph preview image added for better LinkedIn and social sharing
- Contact form wired to a real Formspree POST endpoint, plus direct email and copy-email options
- Accessibility and performance quick wins: skip links, stronger focus states, descriptive alt text, async image decoding, and lazy loading for non-critical images
- Proof-artifact sections added to the network-focused project pages to make the artifact trail more visible

## Deploy on GitHub Pages

1. Copy the contents of this folder into the root of your `loganggoodwin.github.io` repository
2. Commit and push to GitHub
3. GitHub Pages will publish the site from the repository root

## Manual verification checklist

### 1. Test the contact form end-to-end
The contact form posts to `https://formspree.io/f/mzdygvle` from `index.html`, and `script.js` reads the endpoint from the form action. Before sending the site to employers, submit a test message from the live GitHub Pages site and confirm the message arrives in the Formspree inbox and forwards to your email.

### 2. Replace or confirm CTF sample data
The CTF/NCL page now includes a visible disclosure note: “Sample data used pending competition disclosure.” If any hashes, flags, challenge output, or screenshots are still illustrative, keep the disclosure visible. Once disclosure is allowed, replace sample material with sanitized real results.

### 3. Add stronger proof artifacts over time
The network project pages now include proof-artifact sections. The strongest next upgrade would be adding real Packet Tracer topology screenshots, sanitized configuration files, and test-output screenshots showing successful pings and blocked guest-to-internal traffic.


### 4. Confirm résumé links
The primary résumé path is `/assets/Logan_Garth_Goodwin_Resume.pdf`. Homepage résumé buttons use direct PDF links that open in a new tab so recruiters can view or download the file without a ZIP or secondary page.

### 5. Confirm project discoverability
The CTF page is linked from both the homepage featured work section and `/projects/index.html`, with hash-cracking wording in the title/metadata. A basic `sitemap.xml` and `robots.txt` are included to make the project pages easier for search engines to crawl.

### 6. Review the two project READMEs
Two project-specific README files were added so GitHub reviewers see more than only the live webpages:

- `/projects/secure-enterprise-campus/README.md` - detailed technical README with VLAN plan, ACL logic, verification tests, tools used, evidence-packet guidance, and key learning.
- `/projects/healthcare-breach-analysis/README.md` - written/security-analysis README with incident findings, recommendations, week-one job actions, tools used, evidence artifacts, and key learning.

These are meant to be the strongest GitHub-facing documentation examples: one hands-on technical project and one security-analysis project.

## Where things live

- Homepage: `/index.html`
- Projects landing page: `/projects/index.html`
- CTF / NCL recap: `/projects/ctf-hash-cracking/index.html`
- Guest VLAN project: `/projects/guest-network-vlan/index.html`
- Secure campus project: `/projects/secure-enterprise-campus/index.html`
- Open Graph image: `/images/og-preview.png`

## File cleanup note

The site now uses one main stylesheet (`styles.css`) and one main script file (`script.js`). The temporary updated asset files were merged and removed so GitHub Pages only needs the original filenames.

## Additional Verified Learning

The homepage includes a separate **Additional Verified Learning** section for HarvardX, MITx, and IMFx certificates. These are intentionally separated from industry certifications such as CompTIA, EC-Council, and TestOut so the credential language remains clear and professional.

## Software, Game, Music & Tribute Builds

The homepage and Projects page now separate **Software & Game Builds** from **Music & Community Tribute Projects**. This keeps the cybersecurity and infrastructure portfolio focused while still showing hands-on web publishing, documentation, media organization, and creative GitHub Pages projects.


## Portfolio Organization Update

The portfolio now separates software/game builds from music and community tribute projects so technical hiring content stays focused while creative GitHub Pages work remains visible. The tribute section includes newer song projects such as No Doubt About It — Christine’s Song, Strength in Numbers, and Since Single Digits.

## Playable Cybersecurity Project

The portfolio now includes **Firewall Defender**, a playable browser-based cybersecurity learning game located at `/projects/firewall-defender/`. The homepage and Projects page both include project cards with a local **Play game** link and a GitHub repository link.


## Playable Database Administration Project

The portfolio now includes **SQL Database Troubleshooter**, a playable browser-based database administration learning game located at `/projects/sql-database-troubleshooter/`. The homepage and Projects page include local **Play game** links plus a GitHub repository link. The game teaches database setup, user permissions, service outages, query tuning, backup checks, integrity checks, least-privilege access control, and troubleshooting workflows across Easy, Normal, and Hard difficulty levels.


## Playable Networking Training Project

The portfolio now includes **BusinessNet VLAN Router Lab**, a playable browser-based networking and cybersecurity training game located at `/projects/business-network-vlan-game/`. The homepage and Projects page include local **Play game** links plus a GitHub repository link. The game teaches Cisco-style VLAN design, router-on-a-stick subinterfaces, DHCP planning, access/trunk ports, voice VLANs, NAT, default routing, firewall basics, and troubleshooting logic across Easy, Normal, and Hard difficulty levels.

## Playable Firewall Rule Training Project

The portfolio now includes **Firewall Rule Lab**, a playable browser-based cybersecurity training game located at `/projects/firewall-rule-lab-web-game/`. The homepage and Projects page include local **Play game** links plus a GitHub repository link. The game teaches firewall rule changes, least privilege, ACLs, implicit deny, rule order, logging, alerting, cloud firewall defaults, and PCAP-style traffic testing through scenario-based practice.

## Playable Cyber Threat Detection Project

The portfolio now includes **Cyber Threat Sentinel**, a playable browser-based cybersecurity learning game located at `/projects/cyber-threat-sentinel-game/`. The homepage and Projects page include local **Play game** links plus a GitHub repository link. The game simulates SOC-style decision-making across suspicious emails, network traffic, endpoint activity, identity anomalies, malware behavior, brute-force attempts, and possible data exfiltration.


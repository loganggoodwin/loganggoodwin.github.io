# Firewall Defender Advanced

**Firewall Defender Advanced** is a web-based cybersecurity learning game that explains how firewalls inspect packets, evaluate rules, filter ports, enforce least privilege, and protect segmented networks.

This version expands the original prototype into a five-level browser game with more ports, more realistic packet scenarios, rule order, source/destination zones, connection state, a built-in port guide, and a progressive hint system.

## Project Goal

The goal of this project is to teach firewall concepts through hands-on decision-making. Instead of only reading about ports and firewall rules, players inspect simulated packets and decide whether the firewall should allow or block them.

The game teaches users to think like a firewall:

- Inspect packet details
- Identify source and destination zones
- Read protocol, source port, and destination port
- Match traffic against firewall rules
- Understand rule order
- Allow required business services
- Block risky or unnecessary services
- Apply least privilege
- Segment sensitive systems
- Use default-deny logic
- Recognize basic stateful firewall behavior

## Levels

| Level | Topic | Correct Answers Needed |
|---|---|---:|
| 1 | Basic Port Filtering | 8 |
| 2 | Least Privilege for Admin Access | 10 |
| 3 | Email and VPN Policy | 12 |
| 4 | Segmentation and Server Protection | 14 |
| 5 | Stateful Filtering and Defense-in-Depth | 16 |

## Ports and Protocols Included

This project includes examples involving:

- TCP 20/21 - FTP
- TCP 22 - SSH
- TCP 23 - Telnet
- TCP 25 - SMTP relay
- UDP/TCP 53 - DNS
- UDP 69 - TFTP
- TCP 80 - HTTP
- TCP 110 - POP3
- UDP 123 - NTP
- UDP 161 - SNMP
- TCP 443 - HTTPS
- TCP 445 - SMB
- TCP 587 - SMTP submission
- TCP 993 - IMAPS
- TCP 1433 - Microsoft SQL Server
- TCP 3306 - MySQL
- TCP 3389 - RDP
- TCP 5432 - PostgreSQL
- TCP 5900 - VNC
- TCP 6379 - Redis
- TCP 6443 - Kubernetes API
- TCP 6667 - IRC / command-and-control example
- TCP 8080 - Admin panel / web proxy example
- UDP 51820 - WireGuard VPN
- ICMP - Monitoring and ping sweep examples

## Features

- Five complete levels
- More than 30 packet scenarios
- Many different ports and protocols
- Source zone and destination zone logic
- Source and destination port display
- Connection state display
- Firewall rule toggles
- Rule order awareness
- Allow/block player decisions
- “Apply Active Rules” mode
- Scoreboard and progress bar
- Decision history log
- Built-in port guide
- Progressive hint feature with three levels of guidance
- Built-in “How Firewalls Work” panel
- Keyboard shortcuts
- Static HTML/CSS/JavaScript only
- No build tools required

## Keyboard Shortcuts

| Key | Action |
|---|---|
| A | Allow packet |
| B | Block packet |
| R | Reset current level |
| H | Show a hint for the current packet |
| Escape | Close help or hint panel |

## Hint Feature

The game includes a **Need a Hint?** button for players who get stuck. The hint system gives three levels of guidance:

1. **Packet-field hint** - points the player toward protocol, destination port, and zones.
2. **Risk/context hint** - explains why the traffic may be trusted, risky, administrative, database-related, legacy, or stateful.
3. **Policy comparison hint** - shows what the active firewall rules would do and then reveals the recommended learning answer.

This makes the game more useful for students because it teaches the reasoning process instead of only marking answers right or wrong.

## How to Run Locally

1. Download or clone this project.
2. Open the folder.
3. Double-click `index.html`.

That is all. The project is static and does not require Node.js, npm, or a local server.

## How to Upload to GitHub

1. Create a new GitHub repository.
2. Upload these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `LICENSE`
   - `.gitignore`
   - `assets/firewall-defender-icon.svg`
3. Commit the files.

## How to Publish with GitHub Pages

1. Go to your repository on GitHub.
2. Open **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save.
6. GitHub will provide a public website link after Pages finishes deploying.

## Portfolio Description

**Firewall Defender Advanced** is an interactive cybersecurity learning game that demonstrates how firewalls inspect packets and apply allow/block rules. The game teaches ports, protocols, source and destination zones, least privilege, segmentation, default-deny policy, and basic stateful firewall behavior through five hands-on levels.

## Suggested Project Card Text

**Firewall Defender Advanced: Web-Based Cybersecurity Learning Game**

- Built a five-level interactive game that explains firewall packet filtering through hands-on decisions.
- Demonstrates ports, protocols, rule order, source/destination zones, least privilege, segmentation, default-deny policy, and stateful filtering.
- Includes more than 30 packet scenarios, score tracking, decision logs, a port guide, progressive hints, and built-in cybersecurity explanations.

## Technologies Used

- HTML
- CSS
- JavaScript
- Cybersecurity concepts: packet filtering, firewall rules, rule order, ports, protocols, segmentation, least privilege, default deny, stateful filtering

## Author

Logan Garth Goodwin

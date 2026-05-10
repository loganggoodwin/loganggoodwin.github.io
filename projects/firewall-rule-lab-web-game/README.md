# Firewall Rule Lab

**Author:** Logan Garth Goodwin

Firewall Rule Lab is a standalone, web-based cybersecurity learning game. It teaches firewall rule configuration through scenario-based levels that move from easy to expert.

## What It Does

Players review a business need, create firewall rules, test simulated packets, and tune logging or alerts until the policy supports daily operations while maintaining least privilege.

The game covers:

- Prescribing firewall rule changes based on business scenarios
- Configuring firewall rules for detection
- Identifying when firewall rules must be reconfigured for operational needs
- Minimum performance needs such as approved streaming video, email, transactions, and required website access
- SSID and group-policy-style firewall rules
- Top-to-bottom rule evaluation and first-match behavior
- Access control lists
- Implicit deny
- Stateful and stateless firewall concepts
- Blocked services, blocked sites, and port-based filtering
- Cloud firewall restrictive defaults
- Network firewall vs. application firewall differences
- PCAP-style packet testing, logs, and alerting

## How to Run

Open `index.html` in a web browser.

No server, package manager, or build step is required.

## Portfolio Description

Firewall Rule Lab is an interactive web-based cybersecurity game that teaches firewall rule configuration through hands-on scenarios. Players build allow/block rules, tune logging and alerting, and test simulated packet traffic against business requirements. The game helps users understand how firewall policies support daily operations such as video access, email, secure transactions, approved websites, guest Wi-Fi isolation, VPN access, and cloud application protection.

This project demonstrates practical knowledge of firewall design, least privilege, ACLs, implicit deny, rule order, stateful and stateless filtering concepts, PCAP-style analysis, detection configuration, cloud firewall behavior, and front-end web development.

## Suggested Portfolio Card

**Firewall Rule Lab: Interactive Cybersecurity Training Game**

Firewall Rule Lab is a browser-based game that teaches users how firewall rules are configured, tested, and adjusted to support business operations while maintaining security. Players work through easy-to-expert scenarios involving approved web access, email, secure transactions, guest Wi-Fi isolation, ACLs, cloud firewalls, application firewalls, and PCAP-style traffic review.

- Built an interactive rule builder for source, destination, protocol, port, action, and detection settings.
- Created scenario-based levels that teach least privilege, implicit deny, rule order, logging, and alerting.
- Designed packet simulation feedback so users can see why a firewall rule supports or blocks traffic.

## Files

- `index.html` — main game page
- `styles.css` — responsive visual design
- `script.js` — game logic, levels, scoring, packet simulation, and feedback
- `portfolio-description.md` — copy-and-paste portfolio text

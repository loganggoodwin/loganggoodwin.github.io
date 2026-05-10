# Cyber Threat Sentinel

**Author:** Logan Garth Goodwin

Cyber Threat Sentinel is an interactive web-based cybersecurity game that simulates real-time security operations center decision-making. Players review live alerts involving suspicious emails, network traffic, endpoint activity, identity events, data exfiltration, brute-force attempts, and malware behavior. The goal is to choose the right response before the timer runs out.

## Features

- Three difficulty levels: Easy, Medium, and Hard
- Real-time countdown for every security event
- Simulated alert sources: Email Gateway, Firewall, IDS, EDR, Web Proxy, DLP, and Identity Provider
- Multiple response actions:
  - Allow / Mark Safe
  - Quarantine Email
  - Block IP / Traffic
  - Isolate Host
  - Escalate Incident
- Score, accuracy, lives, event count, and live analyst notes
- End-of-mission training takeaways
- Local high score tracking by difficulty level
- Runs entirely in the browser with no server required

## How to Play

1. Open `index.html` in a modern web browser.
2. Choose Easy, Medium, or Hard.
3. Read the event description, details, and evidence.
4. Choose the best response before the timer expires.
5. Review your final score and training takeaways.

## Difficulty Levels

### Easy — Guided Analyst

- 10 events
- 18 seconds per event
- Evidence tags and hints enabled
- Best for learning threat indicators

### Medium — SOC Operator

- 12 events
- 14 seconds per event
- Evidence tags enabled
- No response hints
- Best for practicing independent analysis

### Hard — Incident Commander

- 15 events
- 10 seconds per event
- No hints or evidence tags
- Higher penalties
- Best for testing speed and judgment

## Portfolio Description

Cyber Threat Sentinel is an interactive cybersecurity awareness and SOC decision-making game. It helps users practice identifying suspicious emails, malicious network activity, endpoint compromise indicators, identity anomalies, and possible data exfiltration. The game is useful because it turns security concepts into hands-on decisions: players must decide whether to allow activity, quarantine phishing, block traffic, isolate a host, or escalate an incident. This makes the project stronger than a static write-up because visitors can actively play, make decisions, receive feedback, and learn why each response matters.

## Project Structure

```text
cyber-threat-sentinel/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Customization Ideas

- Add more events to `EVENT_LIBRARY` in `script.js`.
- Add a fourth difficulty level for expert users.
- Add sound effects for correct and incorrect responses.
- Add a leaderboard stored in local storage.
- Add a tutorial mode with screenshots or examples.

## License

This project is intended for educational and portfolio use.

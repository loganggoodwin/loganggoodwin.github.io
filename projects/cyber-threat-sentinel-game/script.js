const LEVELS = {
  easy: {
    title: "Guided Analyst",
    copy: "Use the evidence tags and hints to choose the safest response.",
    events: 10,
    time: 18,
    lives: 4,
    hintMode: "full",
    scoreMultiplier: 1,
    penalty: 35
  },
  medium: {
    title: "SOC Operator",
    copy: "Analyze the evidence without response hints. Choose quickly and accurately.",
    events: 12,
    time: 14,
    lives: 3,
    hintMode: "tags",
    scoreMultiplier: 1.3,
    penalty: 50
  },
  hard: {
    title: "Incident Commander",
    copy: "Fast alerts, fewer clues, and more false positives. Trust the evidence.",
    events: 15,
    time: 10,
    lives: 3,
    hintMode: "none",
    scoreMultiplier: 1.7,
    penalty: 75
  }
};

const ACTION_LABELS = {
  allow: "Allow / Mark Safe",
  quarantine: "Quarantine Email",
  block: "Block IP / Traffic",
  isolate: "Isolate Host",
  escalate: "Escalate Incident"
};

const EVENT_LIBRARY = [
  {
    type: "email",
    source: "Email Gateway",
    severity: "High",
    title: "Invoice email from look-alike vendor domain",
    description: "An accounts payable user receives an urgent invoice message with a macro-enabled spreadsheet attached.",
    details: {
      Sender: "billing@micros0ft-payments.example",
      Subject: "URGENT: Past Due Invoice - Enable Editing",
      Attachment: "invoice_8841.xlsm",
      SPF: "Fail"
    },
    tags: ["look-alike domain", "urgent language", "macro attachment", "SPF fail"],
    hint: "This is likely phishing with a dangerous attachment. Remove it from the mailbox before a user opens it.",
    correct: "quarantine",
    lesson: "Quarantine suspicious email when sender identity, authentication, and attachment behavior indicate phishing."
  },
  {
    type: "email",
    source: "Email Gateway",
    severity: "Medium",
    title: "Password reset email using unusual link shortener",
    description: "A user reports a password reset message that points to a shortened URL instead of the normal identity portal.",
    details: {
      Sender: "security-alerts@company-helpdesk.example",
      Link: "hxxps://bit.ly/reset-now-9021",
      Tone: "Immediate action required",
      DKIM: "Pass"
    },
    tags: ["credential theft risk", "shortened link", "urgent request"],
    hint: "Even with one passing mail check, the suspicious reset link should not remain in the user's inbox.",
    correct: "quarantine",
    lesson: "Phishing decisions should weigh the whole message, not only a single pass/fail email-authentication field."
  },
  {
    type: "email",
    source: "Email Gateway",
    severity: "Low",
    title: "Expected HR benefits reminder",
    description: "Human Resources sends an open enrollment reminder from the approved company benefits platform.",
    details: {
      Sender: "benefits@trusted-hr.example",
      Link: "https://benefits.trusted-hr.example/open-enrollment",
      SPF: "Pass",
      DKIM: "Pass"
    },
    tags: ["known sender", "valid domain", "expected business process"],
    hint: "This message matches expected behavior and has no suspicious attachment or link pattern.",
    correct: "allow",
    lesson: "Not every alert is malicious. Marking legitimate events safe helps reduce alert fatigue."
  },
  {
    type: "network",
    source: "Network IDS",
    severity: "High",
    title: "Internal host scanning multiple subnets",
    description: "A workstation begins connecting to many internal addresses across common admin ports in a short time window.",
    details: {
      Source: "10.20.14.88",
      Destination: "10.20.0.0/16",
      Ports: "22, 80, 135, 139, 445, 3389",
      Rate: "415 connection attempts/min"
    },
    tags: ["lateral movement", "port scanning", "internal source"],
    hint: "A single internal host probing many systems should be contained before it spreads further.",
    correct: "isolate",
    lesson: "When an endpoint behaves like it may be compromised, isolate the host to stop lateral movement."
  },
  {
    type: "network",
    source: "Firewall",
    severity: "Medium",
    title: "Repeated SSH login attempts from external address",
    description: "The firewall logs a burst of failed SSH attempts against a public-facing Linux server.",
    details: {
      Source: "185.203.44.91",
      Destination: "203.0.113.25",
      Port: "22/TCP",
      Attempts: "97 failures in 4 minutes"
    },
    tags: ["brute force", "external IP", "SSH", "failed logins"],
    hint: "Block the source traffic and review exposed management services.",
    correct: "block",
    lesson: "Repeated failed attempts from one external source should be blocked while exposure and logs are reviewed."
  },
  {
    type: "network",
    source: "Firewall",
    severity: "Low",
    title: "Approved cloud backup traffic",
    description: "A file server uploads encrypted backup data to the company's approved cloud backup provider during the maintenance window.",
    details: {
      Source: "10.20.8.15",
      Destination: "backup.approved-cloud.example",
      Port: "443/TCP",
      Volume: "2.4 GB"
    },
    tags: ["approved destination", "scheduled window", "encrypted traffic"],
    hint: "The destination and timing match the organization's backup baseline.",
    correct: "allow",
    lesson: "Baseline knowledge helps distinguish normal high-volume traffic from data exfiltration."
  },
  {
    type: "network",
    source: "DLP Monitor",
    severity: "Critical",
    title: "Large outbound transfer to unknown country",
    description: "A finance workstation sends a compressed archive to an unapproved external host after business hours.",
    details: {
      Source: "10.20.32.44",
      Destination: "198.51.100.77",
      File: "finance_export.zip",
      Time: "02:17 AM"
    },
    tags: ["possible exfiltration", "unknown destination", "after hours", "sensitive data"],
    hint: "Potential data loss requires a higher-level incident response workflow, not just a simple allow/block choice.",
    correct: "escalate",
    lesson: "Potential data exfiltration should be escalated because legal, privacy, and containment teams may be needed."
  },
  {
    type: "endpoint",
    source: "Endpoint EDR",
    severity: "High",
    title: "PowerShell launches encoded command",
    description: "An endpoint alert shows PowerShell using an encoded command after a user opened a downloaded file.",
    details: {
      Host: "WS-ACCT-014",
      Process: "powershell.exe -enc SQBFAFgA...",
      Parent: "excel.exe",
      User: "j.parker"
    },
    tags: ["suspicious script", "possible malware", "office parent process"],
    hint: "A host running suspicious encoded commands should be contained for investigation.",
    correct: "isolate",
    lesson: "Suspicious endpoint execution often requires host isolation before deeper forensic review."
  },
  {
    type: "identity",
    source: "Identity Provider",
    severity: "Medium",
    title: "Impossible travel login pattern",
    description: "A user logs in from Boston and then from another continent eight minutes later, with no VPN approval record.",
    details: {
      User: "m.rivera",
      FirstLogin: "Boston, US",
      SecondLogin: "Singapore",
      Gap: "8 minutes"
    },
    tags: ["impossible travel", "account compromise risk", "MFA review"],
    hint: "This deserves escalation because an account may be compromised and user verification is required.",
    correct: "escalate",
    lesson: "Suspicious identity events can indicate account takeover and should trigger an incident workflow."
  },
  {
    type: "endpoint",
    source: "Patch Manager",
    severity: "Low",
    title: "Scheduled browser update completes successfully",
    description: "A managed endpoint installs a signed browser update from the official update service.",
    details: {
      Host: "WS-MKT-022",
      Vendor: "Known browser vendor",
      Signature: "Valid",
      Policy: "Scheduled patch window"
    },
    tags: ["signed update", "expected process", "policy match"],
    hint: "Signed software from an expected update policy is normal activity.",
    correct: "allow",
    lesson: "Trusted updates that match policy should be allowed to keep systems secure and current."
  },
  {
    type: "network",
    source: "Web Proxy",
    severity: "High",
    title: "User visits newly registered domain after phishing email",
    description: "Minutes after receiving a suspicious message, a workstation connects to a newly registered domain requesting credentials.",
    details: {
      User: "k.owens",
      Domain: "company-login-verify.example",
      Age: "2 days old",
      Category: "Uncategorized"
    },
    tags: ["new domain", "credential page", "phishing chain"],
    hint: "The suspicious web destination should be blocked to stop credential theft.",
    correct: "block",
    lesson: "Blocking malicious web traffic can stop a phishing attack after email delivery."
  },
  {
    type: "email",
    source: "Email Gateway",
    severity: "High",
    title: "CEO gift card request from personal address",
    description: "An employee receives a message claiming to be from the CEO asking for gift cards and secrecy.",
    details: {
      Sender: "ceo.office.personal@gmail.example",
      Subject: "Need a quick favor",
      ReplyTo: "external personal mailbox",
      Attachment: "None"
    },
    tags: ["business email compromise", "external sender", "secrecy request"],
    hint: "This is a social engineering message. Remove it and report it as phishing.",
    correct: "quarantine",
    lesson: "Business email compromise often relies on urgency, authority, and secrecy rather than malware attachments."
  },
  {
    type: "network",
    source: "Network IDS",
    severity: "Medium",
    title: "Printer receiving normal print traffic",
    description: "The office printer receives several print jobs from known workstations during business hours.",
    details: {
      Source: "10.20.12.0/24",
      Destination: "10.20.20.35",
      Port: "9100/TCP",
      Time: "10:44 AM"
    },
    tags: ["known subnet", "expected service", "business hours"],
    hint: "This is normal hardware traffic for a printer on a business network.",
    correct: "allow",
    lesson: "Context matters. Printers receiving expected traffic from known subnets should not be treated as threats."
  },
  {
    type: "endpoint",
    source: "Endpoint EDR",
    severity: "Critical",
    title: "Ransomware-like file rename activity",
    description: "A workstation rapidly renames hundreds of files and creates a ransom note in multiple directories.",
    details: {
      Host: "WS-DESIGN-009",
      FilesChanged: "1,120 in 3 minutes",
      Note: "READ_ME_TO_RESTORE.txt",
      Process: "unknown.exe"
    },
    tags: ["ransomware behavior", "mass file changes", "unknown process"],
    hint: "Contain the endpoint immediately before more files are affected.",
    correct: "isolate",
    lesson: "Ransomware-like behavior requires immediate host isolation to reduce blast radius."
  },
  {
    type: "network",
    source: "Firewall",
    severity: "Critical",
    title: "Inbound traffic spike against public web server",
    description: "A public web server receives a massive increase in requests from thousands of source addresses.",
    details: {
      Destination: "203.0.113.80",
      Port: "443/TCP",
      Rate: "48,000 requests/min",
      Sources: "3,900 unique IPs"
    },
    tags: ["possible DDoS", "public service impact", "distributed sources"],
    hint: "Distributed attacks are bigger than a single block rule. Escalate to the incident and service availability process.",
    correct: "escalate",
    lesson: "DDoS response often requires escalation, traffic scrubbing, provider support, and business communication."
  },
  {
    type: "network",
    source: "Firewall",
    severity: "Medium",
    title: "Single blocked Telnet attempt",
    description: "A firewall rule blocks one Telnet connection attempt to an internal server from the internet.",
    details: {
      Source: "192.0.2.44",
      Destination: "10.20.10.15",
      Port: "23/TCP",
      Rule: "Default deny"
    },
    tags: ["blocked by policy", "legacy port", "single attempt"],
    hint: "The firewall already blocked it. A simple block/mark handled is enough unless repeated activity appears.",
    correct: "block",
    lesson: "Default-deny policies are useful, but analysts should still recognize risky legacy services like Telnet."
  },
  {
    type: "identity",
    source: "Identity Provider",
    severity: "Low",
    title: "Successful MFA login from usual device",
    description: "A user signs in from their normal location and device after completing MFA.",
    details: {
      User: "a.nguyen",
      Location: "New Hampshire, US",
      Device: "Known laptop",
      MFA: "Approved"
    },
    tags: ["known device", "MFA success", "normal location"],
    hint: "This sign-in matches normal behavior and has completed MFA.",
    correct: "allow",
    lesson: "Strong authentication and normal context reduce the likelihood that a login event is malicious."
  },
  {
    type: "email",
    source: "Email Gateway",
    severity: "Medium",
    title: "External partner sends expected contract PDF",
    description: "A known partner sends a contract PDF that was requested by the legal team earlier in the day.",
    details: {
      Sender: "contracts@trusted-partner.example",
      Attachment: "service_agreement.pdf",
      RequestedBy: "Legal team ticket #1184",
      MalwareScan: "Clean"
    },
    tags: ["expected file", "known partner", "clean scan"],
    hint: "The attachment is expected, scanned clean, and tied to a known business request.",
    correct: "allow",
    lesson: "Analysts should avoid overblocking when evidence supports a legitimate business workflow."
  },
  {
    type: "network",
    source: "Web Proxy",
    severity: "High",
    title: "Malware callback to command-and-control pattern",
    description: "An endpoint repeatedly beacons to a suspicious domain with the same packet size every 60 seconds.",
    details: {
      Host: "WS-SALES-031",
      Domain: "cdn-update-check.example",
      Interval: "60 seconds",
      Pattern: "Beaconing"
    },
    tags: ["C2 beacon", "regular interval", "suspicious domain"],
    hint: "The host may be infected. Isolate it for investigation instead of only blocking one destination.",
    correct: "isolate",
    lesson: "Beaconing can indicate command-and-control activity and should lead to endpoint containment."
  },
  {
    type: "network",
    source: "Firewall",
    severity: "High",
    title: "Unauthorized database connection from guest Wi-Fi",
    description: "A device on the guest network attempts to connect to the internal database server.",
    details: {
      Source: "172.16.50.23",
      Destination: "10.20.30.10",
      Port: "5432/TCP",
      Segment: "Guest Wi-Fi"
    },
    tags: ["segmentation violation", "database access", "guest network"],
    hint: "This traffic should not be allowed between guest Wi-Fi and internal database services.",
    correct: "block",
    lesson: "Network segmentation rules should block guest networks from sensitive internal systems."
  }
];

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const levelCards = document.querySelectorAll(".level-card");
const missionTitle = document.getElementById("mission-title");
const missionCopy = document.getElementById("mission-copy");
const scoreEl = document.getElementById("score");
const accuracyEl = document.getElementById("accuracy");
const livesEl = document.getElementById("lives");
const roundCountEl = document.getElementById("round-count");
const timerText = document.getElementById("timer-text");
const timerFill = document.getElementById("timer-fill");
const eventSource = document.getElementById("event-source");
const eventSeverity = document.getElementById("event-severity");
const eventTitle = document.getElementById("event-title");
const eventId = document.getElementById("event-id");
const eventDescription = document.getElementById("event-description");
const eventDetails = document.getElementById("event-details");
const evidenceTags = document.getElementById("evidence-tags");
const hintBox = document.getElementById("hint-box");
const feedback = document.getElementById("feedback");
const actionButtons = document.querySelectorAll(".action-btn");
const activityFeed = document.getElementById("activity-feed");
const restartBtn = document.getElementById("restart-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const changeLevelBtn = document.getElementById("change-level-btn");
const endTitle = document.getElementById("end-title");
const endSummary = document.getElementById("end-summary");
const finalScore = document.getElementById("final-score");
const finalCorrect = document.getElementById("final-correct");
const finalMissed = document.getElementById("final-missed");
const bestScore = document.getElementById("best-score");
const trainingSummary = document.getElementById("training-summary");

let state = createInitialState();
let timerInterval = null;
let advanceTimeout = null;

function createInitialState() {
  return {
    levelKey: "easy",
    config: LEVELS.easy,
    queue: [],
    currentEvent: null,
    eventIndex: 0,
    score: 0,
    correct: 0,
    missed: 0,
    lives: 3,
    secondsLeft: 0,
    answered: false,
    lessons: []
  };
}

function startGame(levelKey) {
  const config = LEVELS[levelKey];
  state = createInitialState();
  state.levelKey = levelKey;
  state.config = config;
  state.queue = buildEventQueue(config.events, levelKey);
  state.lives = config.lives;
  state.secondsLeft = config.time;

  missionTitle.textContent = config.title;
  missionCopy.textContent = config.copy;
  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  activityFeed.innerHTML = "";
  addFeedNote("Mission started", `Difficulty: ${capitalize(levelKey)}. Watch the evidence before taking action.`);
  showEvent();
}

function buildEventQueue(count, levelKey) {
  const pool = [...EVENT_LIBRARY];
  shuffle(pool);

  if (levelKey === "hard") {
    pool.sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity));
    shuffle(pool.slice(4));
  }

  const selected = pool.slice(0, count);
  while (selected.length < count) {
    selected.push(EVENT_LIBRARY[Math.floor(Math.random() * EVENT_LIBRARY.length)]);
  }
  return selected;
}

function showEvent() {
  clearTimers();
  state.answered = false;

  if (state.eventIndex >= state.queue.length || state.lives <= 0) {
    endGame();
    return;
  }

  state.currentEvent = state.queue[state.eventIndex];
  state.secondsLeft = state.config.time;

  renderEvent(state.currentEvent);
  updateStats();
  enableActionButtons(true);
  setFeedback("", "");
  startTimer();
}

function renderEvent(event) {
  eventSource.textContent = event.source;
  eventSeverity.textContent = event.severity;
  eventSeverity.className = `severity ${event.severity.toLowerCase()}`;
  eventTitle.textContent = event.title;
  eventId.textContent = `EVT-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  eventDescription.textContent = event.description;

  eventDetails.innerHTML = Object.entries(event.details).map(([label, value]) => `
    <div class="detail-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");

  if (state.config.hintMode === "none") {
    evidenceTags.innerHTML = "";
    hintBox.classList.add("hidden");
  } else {
    evidenceTags.innerHTML = event.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
    if (state.config.hintMode === "full") {
      hintBox.textContent = `Hint: ${event.hint}`;
      hintBox.classList.remove("hidden");
    } else {
      hintBox.classList.add("hidden");
    }
  }
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    state.secondsLeft -= 0.1;
    if (state.secondsLeft <= 0) {
      state.secondsLeft = 0;
      updateTimerDisplay();
      handleTimeout();
      return;
    }
    updateTimerDisplay();
  }, 100);
}

function updateTimerDisplay() {
  const whole = Math.ceil(state.secondsLeft);
  timerText.textContent = `${whole}s`;
  const pct = Math.max(0, Math.min(100, (state.secondsLeft / state.config.time) * 100));
  timerFill.style.width = `${pct}%`;
}

function handleAction(action) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(timerInterval);
  enableActionButtons(false);

  const event = state.currentEvent;
  const isCorrect = action === event.correct;

  if (isCorrect) {
    const speedBonus = Math.ceil(state.secondsLeft * 8 * state.config.scoreMultiplier);
    const severityBonus = severityWeight(event.severity) * 15;
    const gained = Math.round(100 * state.config.scoreMultiplier + speedBonus + severityBonus);
    state.score += gained;
    state.correct += 1;
    state.lessons.push(event.lesson);
    setFeedback(`Correct: ${ACTION_LABELS[action]}. +${gained} points. ${event.lesson}`, "correct");
    addFeedNote("Correct response", `${event.title} → ${ACTION_LABELS[action]}`);
  } else {
    state.score = Math.max(0, state.score - state.config.penalty);
    state.missed += 1;
    state.lives -= 1;
    state.lessons.push(event.lesson);
    setFeedback(`Not quite. Best response: ${ACTION_LABELS[event.correct]}. ${event.lesson}`, "wrong");
    addFeedNote("Incorrect response", `${event.title} needed ${ACTION_LABELS[event.correct]}`);
  }

  state.eventIndex += 1;
  updateStats();
  scheduleNextEvent();
}

function handleTimeout() {
  if (state.answered) return;
  state.answered = true;
  clearInterval(timerInterval);
  enableActionButtons(false);

  const event = state.currentEvent;
  state.missed += 1;
  state.lives -= 1;
  state.score = Math.max(0, state.score - state.config.penalty);
  state.lessons.push(event.lesson);
  setFeedback(`Time expired. Best response: ${ACTION_LABELS[event.correct]}. ${event.lesson}`, "wrong");
  addFeedNote("Missed response", `${event.title} timed out.`);
  state.eventIndex += 1;
  updateStats();
  scheduleNextEvent();
}

function scheduleNextEvent() {
  clearTimeout(advanceTimeout);
  advanceTimeout = setTimeout(showEvent, 1900);
}

function updateStats() {
  scoreEl.textContent = state.score;
  livesEl.textContent = state.lives;
  roundCountEl.textContent = `${Math.min(state.eventIndex + 1, state.queue.length)}/${state.queue.length}`;
  const attempts = state.correct + state.missed;
  const accuracy = attempts === 0 ? 100 : Math.round((state.correct / attempts) * 100);
  accuracyEl.textContent = `${accuracy}%`;
}

function setFeedback(message, kind) {
  feedback.textContent = message;
  feedback.className = "feedback-box";
  if (kind) feedback.classList.add(kind);
}

function addFeedNote(title, body) {
  const item = document.createElement("li");
  const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  item.innerHTML = `<strong>${escapeHtml(title)}</strong><br><span>${escapeHtml(stamp)} — ${escapeHtml(body)}</span>`;
  activityFeed.prepend(item);
}

function enableActionButtons(enabled) {
  actionButtons.forEach(button => {
    button.disabled = !enabled;
  });
}

function endGame() {
  clearTimers();
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");

  const attempts = state.correct + state.missed;
  const accuracy = attempts === 0 ? 0 : Math.round((state.correct / attempts) * 100);
  const bestKey = `cyber-threat-sentinel-best-${state.levelKey}`;
  const storedBest = Number(localStorage.getItem(bestKey) || 0);
  const newBest = Math.max(storedBest, state.score);
  localStorage.setItem(bestKey, String(newBest));

  endTitle.textContent = state.lives <= 0 ? "Mission ended. Keep training." : "Mission complete. Nice work, Analyst.";
  endSummary.textContent = `You finished ${capitalize(state.levelKey)} with ${accuracy}% accuracy. Correct decisions matter because the right response can prevent phishing, malware spread, account takeover, and data loss.`;
  finalScore.textContent = state.score;
  finalCorrect.textContent = state.correct;
  finalMissed.textContent = state.missed;
  bestScore.textContent = newBest;

  const uniqueLessons = [...new Set(state.lessons)].slice(0, 6);
  trainingSummary.innerHTML = `
    <h3>Training Takeaways</h3>
    <ul>${uniqueLessons.map(lesson => `<li>${escapeHtml(lesson)}</li>`).join("")}</ul>
  `;
}

function restartGame() {
  startGame(state.levelKey);
}

function changeLevel() {
  clearTimers();
  endScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function clearTimers() {
  clearInterval(timerInterval);
  clearTimeout(advanceTimeout);
}

function severityWeight(severity) {
  return {
    Low: 1,
    Medium: 2,
    High: 3,
    Critical: 4
  }[severity] || 1;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function capitalize(word) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

levelCards.forEach(card => {
  card.addEventListener("click", () => startGame(card.dataset.level));
});

actionButtons.forEach(button => {
  button.addEventListener("click", () => handleAction(button.dataset.action));
});

restartBtn.addEventListener("click", restartGame);
playAgainBtn.addEventListener("click", restartGame);
changeLevelBtn.addEventListener("click", changeLevel);

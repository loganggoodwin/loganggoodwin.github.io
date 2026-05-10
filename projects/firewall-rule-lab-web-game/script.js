const LESSONS = [
  "Allow approved day-to-day traffic such as training video, email attachments, transactions, and required websites.",
  "Use least privilege: permit only what the role, SSID, VLAN, service, or system requires.",
  "Traditional firewall and SSID policies are often evaluated top to bottom; the first matching rule wins.",
  "Cloud firewalls usually start restrictive. Add specific allow rules instead of opening broad access.",
  "Stateless rules can use fixed criteria such as source, destination, protocol, port, site, keyword, or schedule.",
  "Stateful protection evaluates traffic behavior such as scans, malformed traffic, ping floods, and denial-of-service patterns.",
  "Logs and alerts prove what the firewall did and support PCAP-based validation.",
  "Network firewalls protect network traffic broadly; application firewalls protect specific apps, such as web applications."
];

const LEVELS = [
  {
    title: "Level 1 — Minimum Business Access",
    difficulty: "Easy",
    mode: "Exact rule match",
    scenario: "Employees need approved training video, email attachments, secure transactions, and company website access. They do not need remote admin services.",
    hint: "Allow only the required business services. Block RDP from normal users and set that blocked rule to Alert.",
    sources: ["Internal LAN", "Internet", "Guest Wi-Fi", "Admin VLAN"],
    destinations: ["Training Site", "Mail Server", "Payment Gateway", "Company Website", "Internal Server"],
    ports: ["443", "587", "993", "80", "22", "3389"],
    packets: [
      ["Internal LAN", "Training Site", "TCP", "443", "Allow", "Training video over HTTPS is approved business traffic."],
      ["Internal LAN", "Mail Server", "TCP", "587", "Allow", "Authenticated email submission supports sending attachments."],
      ["Internal LAN", "Mail Server", "TCP", "993", "Allow", "Secure mail retrieval supports normal work."],
      ["Internal LAN", "Payment Gateway", "TCP", "443", "Allow", "Transactions require HTTPS to the payment gateway."],
      ["Internal LAN", "Internal Server", "TCP", "3389", "Block", "Regular users do not need RDP to servers."]
    ],
    required: [
      ["Allow", "Internal LAN", "Training Site", "TCP", "443", "Log"],
      ["Allow", "Internal LAN", "Mail Server", "TCP", "587", "Log"],
      ["Allow", "Internal LAN", "Mail Server", "TCP", "993", "Log"],
      ["Allow", "Internal LAN", "Payment Gateway", "TCP", "443", "Log"],
      ["Block", "Internal LAN", "Internal Server", "TCP", "3389", "Alert"]
    ]
  },
  {
    title: "Level 2 — SSID and Group Policy Order",
    difficulty: "Normal",
    mode: "Top-to-bottom first match",
    scenario: "Guest Wi-Fi users need internet access, but they must not reach internal file shares, printers, database servers, or firewall management pages.",
    hint: "Put specific block rules above broad allow rules. If a broad HTTPS allow appears before a specific management block, dangerous internal HTTPS can slip through.",
    sources: ["Guest Wi-Fi", "Internal LAN", "Admin VLAN", "Internet"],
    destinations: ["Internet", "File Server", "Printer", "Database Server", "Firewall Management"],
    ports: ["53", "80", "443", "445", "9100", "3306", "8443"],
    packets: [
      ["Guest Wi-Fi", "Internet", "UDP", "53", "Allow", "DNS is needed for web browsing."],
      ["Guest Wi-Fi", "Internet", "TCP", "443", "Allow", "Guest users may browse the internet over HTTPS."],
      ["Guest Wi-Fi", "File Server", "TCP", "445", "Block", "Guest users should not reach SMB file shares."],
      ["Guest Wi-Fi", "Printer", "TCP", "9100", "Block", "Raw printer access should not be exposed to guests."],
      ["Guest Wi-Fi", "Firewall Management", "TCP", "8443", "Block", "Management interfaces must not be reachable from guest Wi-Fi."]
    ],
    required: [
      ["Block", "Guest Wi-Fi", "File Server", "TCP", "445", "Alert"],
      ["Block", "Guest Wi-Fi", "Printer", "TCP", "9100", "Alert"],
      ["Block", "Guest Wi-Fi", "Firewall Management", "TCP", "8443", "Alert"],
      ["Allow", "Guest Wi-Fi", "Internet", "UDP", "53", "Log"],
      ["Allow", "Guest Wi-Fi", "Internet", "TCP", "443", "Log"]
    ]
  },
  {
    title: "Level 3 — ACL Blocked Services and Sites",
    difficulty: "Normal",
    mode: "Access control list",
    scenario: "The business wants finance users to process transactions but does not want unrelated streaming, social media, direct database administration, or FTP file transfer.",
    hint: "Do not fix an outage by opening everything. Allow the exact payment path and block unrelated services or sites.",
    sources: ["Finance VLAN", "Internal LAN", "Guest Wi-Fi", "Admin VLAN"],
    destinations: ["Payment Gateway", "Streaming Site", "Social Media", "Database Server", "FTP Server"],
    ports: ["443", "80", "21", "20", "3306", "3389"],
    packets: [
      ["Finance VLAN", "Payment Gateway", "TCP", "443", "Allow", "Finance needs HTTPS to complete transactions."],
      ["Finance VLAN", "Streaming Site", "TCP", "443", "Block", "This destination is not part of the transaction workflow."],
      ["Finance VLAN", "Social Media", "TCP", "443", "Block", "Social media is unrelated to the stated operational need."],
      ["Finance VLAN", "Database Server", "TCP", "3306", "Block", "Finance users do not need direct database administration access."],
      ["Finance VLAN", "FTP Server", "TCP", "21", "Block", "FTP is a risky service and not required in this scenario."]
    ],
    required: [
      ["Allow", "Finance VLAN", "Payment Gateway", "TCP", "443", "Log"],
      ["Block", "Finance VLAN", "Streaming Site", "TCP", "443", "Alert"],
      ["Block", "Finance VLAN", "Social Media", "TCP", "443", "Alert"],
      ["Block", "Finance VLAN", "Database Server", "TCP", "3306", "Alert"],
      ["Block", "Finance VLAN", "FTP Server", "TCP", "21", "Alert"]
    ]
  },
  {
    title: "Level 4 — Stateful Detection and PCAP Review",
    difficulty: "Hard",
    mode: "Detection tuning",
    scenario: "A packet capture shows repeated inbound scans against RDP, SSH, and database ports. The company still needs public HTTPS, email, and VPN access.",
    hint: "Allowed business traffic should be logged. Suspicious scans and direct admin access from the internet should trigger alerts.",
    sources: ["Internet", "Internal LAN", "VPN Users", "Admin VLAN"],
    destinations: ["Web Server", "Mail Server", "VPN Gateway", "Database Server", "Domain Controller"],
    ports: ["443", "587", "993", "1194", "22", "3389", "3306"],
    packets: [
      ["Internet", "Web Server", "TCP", "443", "Allow", "Public HTTPS is required for the customer website."],
      ["Internal LAN", "Mail Server", "TCP", "587", "Allow", "Internal users need authenticated outbound email."],
      ["Internet", "VPN Gateway", "UDP", "1194", "Allow", "VPN is an approved remote access path."],
      ["Internet", "Domain Controller", "TCP", "3389", "Block", "Direct RDP from the internet is high risk and should alert."],
      ["Internet", "Database Server", "TCP", "3306", "Block", "Public database scans should be blocked and alerted."],
      ["Internet", "Web Server", "TCP", "22", "Block", "Public SSH probing should be blocked and alerted."]
    ],
    required: [
      ["Allow", "Internet", "Web Server", "TCP", "443", "Log"],
      ["Allow", "Internal LAN", "Mail Server", "TCP", "587", "Log"],
      ["Allow", "Internet", "VPN Gateway", "UDP", "1194", "Log"],
      ["Block", "Internet", "Domain Controller", "TCP", "3389", "Alert"],
      ["Block", "Internet", "Database Server", "TCP", "3306", "Alert"],
      ["Block", "Internet", "Web Server", "TCP", "22", "Alert"]
    ]
  },
  {
    title: "Level 5 — Cloud Firewall and Application Protection",
    difficulty: "Expert",
    mode: "Restrictive cloud default",
    scenario: "A cloud web app is unreachable after deployment. Customers need HTTPS to the web instance, admins need VPN-only SSH, and the database must not be public. A web application firewall protects only the web app layer.",
    hint: "Expose only HTTPS publicly. Keep database traffic private. Use VPN-only admin access. Remember that a WAF protects the app, not the whole network.",
    sources: ["Internet", "VPN Users", "Cloud Web Instance", "Admin VLAN", "App Firewall"],
    destinations: ["Cloud Web Instance", "Cloud Database", "VPN Gateway", "Web Application", "Internet"],
    ports: ["443", "80", "22", "3306", "1194"],
    packets: [
      ["Internet", "Cloud Web Instance", "TCP", "443", "Allow", "Customers need HTTPS access to the public cloud web instance."],
      ["Internet", "Cloud Web Instance", "TCP", "22", "Block", "SSH should not be directly exposed to the internet."],
      ["VPN Users", "Cloud Web Instance", "TCP", "22", "Allow", "Admin SSH is allowed only after VPN access."],
      ["Internet", "Cloud Database", "TCP", "3306", "Block", "The database should not be public."],
      ["Cloud Web Instance", "Cloud Database", "TCP", "3306", "Allow", "The web application needs private database access."],
      ["App Firewall", "Web Application", "TCP", "443", "Allow", "The application firewall protects app-layer web traffic, not the full network."]
    ],
    required: [
      ["Allow", "Internet", "Cloud Web Instance", "TCP", "443", "Log"],
      ["Block", "Internet", "Cloud Web Instance", "TCP", "22", "Alert"],
      ["Allow", "VPN Users", "Cloud Web Instance", "TCP", "22", "Log"],
      ["Block", "Internet", "Cloud Database", "TCP", "3306", "Alert"],
      ["Allow", "Cloud Web Instance", "Cloud Database", "TCP", "3306", "Log"],
      ["Allow", "App Firewall", "Web Application", "TCP", "443", "Log"]
    ]
  }
];

let state = {
  levelIndex: 0,
  rules: [],
  selectedPacket: 0,
  hintVisible: false,
  submitted: false,
  log: []
};

const actions = ["Allow", "Block"];
const protocols = ["TCP", "UDP", "ICMP"];
const detections = ["Log", "Alert", "None"];

function $(id) { return document.getElementById(id); }
function toRule(row) { return { action: row[0], source: row[1], destination: row[2], protocol: row[3], port: row[4], detection: row[5] }; }
function toPacket(row) { return { source: row[0], destination: row[1], protocol: row[2], port: row[3], expected: row[4], reason: row[5] }; }
function ruleKey(rule) { return `${rule.action}|${rule.source}|${rule.destination}|${rule.protocol}|${rule.port}|${rule.detection}`; }
function trafficKey(item) { return `${item.source}|${item.destination}|${item.protocol}|${item.port}`; }

function decide(rules, packet, level) {
  const matches = rules.filter(rule => trafficKey(rule) === trafficKey(packet));
  if (matches.length === 0) {
    if (level.mode.includes("Restrictive")) {
      return { decision: "Block", detection: "None", note: "No explicit allow rule exists, so the restrictive cloud default blocks it." };
    }
    return { decision: "No Match", detection: "None", note: "No matching rule was found." };
  }
  const selected = level.mode.includes("Restrictive") ? matches.find(rule => rule.action === "Block") || matches[0] : matches[0];
  return { decision: selected.action, detection: selected.detection, note: level.mode.includes("Top-to-bottom") ? "First matching rule was applied." : "Matching firewall rule was applied." };
}

function getEvaluation() {
  const level = LEVELS[state.levelIndex];
  const packets = level.packets.map(toPacket);
  const required = level.required.map(toRule);
  const currentRuleSet = new Set(state.rules.map(ruleKey));
  const requiredRuleSet = new Set(required.map(ruleKey));
  const matched = required.filter(rule => currentRuleSet.has(ruleKey(rule)));
  const missing = required.filter(rule => !currentRuleSet.has(ruleKey(rule)));
  const extra = state.rules.filter(rule => !requiredRuleSet.has(ruleKey(rule)));
  const packetResults = packets.map(packet => {
    const result = decide(state.rules, packet, level);
    const correctDecision = result.decision === packet.expected;
    const goodDetection = packet.expected === "Block" ? result.detection === "Alert" : result.detection === "Log" || result.detection === "Alert";
    return { ...packet, ...result, correctDecision, goodDetection };
  });
  const packetScore = packetResults.filter(item => item.correctDecision).length / packets.length;
  const detectionScore = packetResults.filter(item => item.correctDecision && item.goodDetection).length / packets.length;
  const requiredScore = matched.length / required.length;
  const penalty = Math.min(20, extra.length * 4);
  const score = Math.max(0, Math.min(100, Math.round(packetScore * 40 + detectionScore * 25 + requiredScore * 35 - penalty)));
  return { level, packets, required, matched, missing, extra, packetResults, score, pass: score >= 85 && missing.length === 0 };
}

function setOptions(select, values) {
  select.innerHTML = values.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char]));
}

function renderTabs() {
  const tabs = $("levelTabs");
  tabs.innerHTML = LEVELS.map((level, index) => `
    <button class="level-tab ${index === state.levelIndex ? "active" : ""}" data-level="${index}">
      <p class="eyebrow">${level.difficulty}</p>
      <strong>Level ${index + 1}</strong>
      <span>${level.title.replace(/Level \d — /, "")}</span>
    </button>
  `).join("");
  tabs.querySelectorAll("button").forEach(button => button.addEventListener("click", () => changeLevel(Number(button.dataset.level))));
}

function render() {
  const evaluation = getEvaluation();
  const { level, required, missing, extra, matched, packetResults, score, pass } = evaluation;
  $("levelTitle").textContent = level.title;
  $("levelScenario").textContent = level.scenario;
  $("levelMode").textContent = level.mode;
  $("hintText").textContent = level.hint;
  $("hintText").classList.toggle("hidden", !state.hintVisible);
  $("hintButton").textContent = state.hintVisible ? "Hide Hint" : "Show Hint";
  $("scoreNumber").textContent = score;
  $("scoreMeter").style.width = `${score}%`;
  $("passState").textContent = pass ? "PASS" : "TUNE";
  $("passState").style.color = pass ? "var(--green)" : "var(--amber)";

  setOptions($("actionSelect"), actions);
  setOptions($("sourceSelect"), level.sources);
  setOptions($("destinationSelect"), level.destinations);
  setOptions($("protocolSelect"), protocols);
  setOptions($("portSelect"), level.ports);
  setOptions($("detectionSelect"), detections);

  $("conceptList").innerHTML = LESSONS.map(lesson => `<li>${escapeHtml(lesson)}</li>`).join("");
  $("ruleCount").textContent = `${state.rules.length} rule${state.rules.length === 1 ? "" : "s"}`;
  renderRules();
  renderPackets(packetResults);
  renderFeedback(required, matched, missing, extra);
  renderLog();
  renderTabs();
}

function renderRules() {
  const list = $("rulesList");
  if (!state.rules.length) {
    list.innerHTML = `<div class="empty">No firewall rules configured yet. Add rules or use Training Assist.</div>`;
    return;
  }
  list.innerHTML = state.rules.map((rule, index) => `
    <div class="rule-card">
      <div class="rule-title ${rule.action === "Allow" ? "allow" : "block"}">${index + 1}. ${rule.action} ${escapeHtml(rule.source)} → ${escapeHtml(rule.destination)}</div>
      <div class="rule-meta">${escapeHtml(rule.protocol)}/${escapeHtml(rule.port)} · Detection: ${escapeHtml(rule.detection)}</div>
      <div class="rule-actions">
        <button data-action="up" data-index="${index}">Move Up</button>
        <button data-action="down" data-index="${index}">Move Down</button>
        <button data-action="remove" data-index="${index}">Remove</button>
      </div>
    </div>
  `).join("");
  list.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.index);
    if (button.dataset.action === "remove") removeRule(index);
    if (button.dataset.action === "up") moveRule(index, -1);
    if (button.dataset.action === "down") moveRule(index, 1);
  }));
}

function renderPackets(packetResults) {
  const grid = $("packetGrid");
  grid.innerHTML = packetResults.map((packet, index) => `
    <button class="packet-card ${index === state.selectedPacket ? "active" : ""}" data-packet="${index}">
      <div class="packet-top">
        <strong>Packet ${index + 1}</strong>
        <span class="badge ${packet.correctDecision ? "good" : "bad"}">${escapeHtml(packet.decision)}</span>
      </div>
      <div class="packet-meta">${escapeHtml(packet.source)} → ${escapeHtml(packet.destination)}</div>
      <div class="packet-meta">${escapeHtml(packet.protocol)}/${escapeHtml(packet.port)}</div>
    </button>
  `).join("");
  grid.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    state.selectedPacket = Number(button.dataset.packet);
    render();
  }));
  const packet = packetResults[state.selectedPacket] || packetResults[0];
  $("packetAnalysis").innerHTML = `
    <strong>Packet Analysis</strong>
    <p>Expected: <b>${escapeHtml(packet.expected)}</b> · Your decision: <b>${escapeHtml(packet.decision)}</b> · Detection: <b>${escapeHtml(packet.detection)}</b></p>
    <p>${escapeHtml(packet.reason)}</p>
    <p><b>Simulator note:</b> ${escapeHtml(packet.note)}</p>
  `;
}

function renderFeedback(required, matched, missing, extra) {
  $("requiredMetric").textContent = `${matched.length}/${required.length}`;
  $("missingMetric").textContent = missing.length;
  $("extraMetric").textContent = extra.length;
  $("missingRules").innerHTML = missing.length ? `
    <strong>Missing required changes</strong>
    <ul>${missing.map(rule => `<li>${escapeHtml(rule.action)} ${escapeHtml(rule.source)} → ${escapeHtml(rule.destination)} ${escapeHtml(rule.protocol)}/${escapeHtml(rule.port)}, Detection: ${escapeHtml(rule.detection)}</li>`).join("")}</ul>
  ` : `<strong>No missing required rules.</strong><p class="small-copy">Now check packet results, detection settings, and reflection.</p>`;
  const feedback = $("submitFeedback");
  if (!state.submitted) {
    feedback.className = "submit-feedback hidden";
    feedback.textContent = "";
  } else {
    const evaluation = getEvaluation();
    feedback.className = `submit-feedback ${evaluation.pass ? "pass" : "tune"}`;
    feedback.textContent = evaluation.pass
      ? "Good work. This firewall policy supports business operations while preserving least privilege and detection."
      : "Keep tuning. Check missing rules, rule order, implicit deny behavior, and whether risky blocked traffic uses Alert.";
  }
}

function renderLog() {
  const log = $("activityLog");
  if (!state.log.length) {
    log.innerHTML = `<div class="empty">Your firewall actions will appear here.</div>`;
    return;
  }
  log.innerHTML = state.log.map(item => `<div class="log-entry">${escapeHtml(item)}</div>`).join("");
}

function getDraftRule() {
  return {
    action: $("actionSelect").value,
    source: $("sourceSelect").value,
    destination: $("destinationSelect").value,
    protocol: $("protocolSelect").value,
    port: $("portSelect").value,
    detection: $("detectionSelect").value
  };
}

function addRule(rule = getDraftRule()) {
  if (state.rules.some(item => ruleKey(item) === ruleKey(rule))) {
    addLog("Duplicate rule ignored.");
    return;
  }
  state.rules.push(rule);
  addLog(`Added ${rule.action}: ${rule.source} → ${rule.destination} ${rule.protocol}/${rule.port}, Detection: ${rule.detection}.`);
  render();
}

function removeRule(index) {
  state.rules.splice(index, 1);
  addLog("Removed one firewall rule.");
  render();
}

function moveRule(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= state.rules.length) return;
  const copy = [...state.rules];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  state.rules = copy;
  addLog("Changed rule order. In ordered policies, the first matching rule wins.");
  render();
}

function trainingAssist() {
  const evaluation = getEvaluation();
  const level = evaluation.level;
  const count = level.difficulty === "Easy" ? evaluation.required.length : level.difficulty === "Normal" ? 2 : 1;
  state.rules = evaluation.required.slice(0, count);
  addLog(`Training Assist loaded ${count} recommended rule${count === 1 ? "" : "s"}.`);
  render();
}

function changeLevel(index) {
  state = { levelIndex: index, rules: [], selectedPacket: 0, hintVisible: index === 0, submitted: false, log: [] };
  $("reflectionBox").value = "";
  render();
}

function addLog(message) {
  state.log.unshift(message);
}

$("hintButton").addEventListener("click", () => { state.hintVisible = !state.hintVisible; render(); });
$("assistButton").addEventListener("click", trainingAssist);
$("addRuleButton").addEventListener("click", () => addRule());
$("submitButton").addEventListener("click", () => {
  state.submitted = true;
  const evaluation = getEvaluation();
  addLog(evaluation.pass ? "Level passed." : "Level submitted but not passed yet.");
  render();
});

render();

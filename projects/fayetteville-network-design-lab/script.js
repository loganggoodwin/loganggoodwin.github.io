const decisions = [
  {
    category: "Topology selection",
    title: "Choose the office network topology",
    text: "The Fayetteville office needs a dependable network that is easy to troubleshoot and simple to expand as new staff and devices are added.",
    businessNeed: "Keep users connected while making support manageable for a lean IT team.",
    designGoal: "Select a topology that supports reliability, clear cabling, and future growth.",
    status: "Topology selected",
    choices: [
      { label: "Use a star topology with managed switching at the center", note: "Centralized connectivity makes troubleshooting and expansion easier.", impact: { reliability: 12, security: 5, scalability: 12, support: 12, budget: -3 }, feedback: "Strong choice. A star topology is practical for a new office because endpoints connect through a central switch, making failures easier to isolate and growth easier to manage.", highlight: ["mapCore", "mapEndpoints"] },
      { label: "Use a bus topology to reduce equipment cost", note: "Lower initial cost, but weaker fault isolation and outdated design.", impact: { reliability: -15, security: -4, scalability: -12, support: -14, budget: 8 }, feedback: "Risky choice. Bus topology can look cheaper, but it creates poor fault isolation and does not match a modern business office environment.", warn: ["mapCore"] },
      { label: "Use only wireless access points with no wired core plan", note: "Convenient, but weak for printers, conferencing, and stable office operations.", impact: { reliability: -10, security: -6, scalability: -4, support: -8, budget: 3 }, feedback: "Incomplete choice. Wireless can support mobility, but a business office still needs a planned wired core for stable infrastructure and easier troubleshooting.", warn: ["mapEndpoints"] }
    ]
  },
  {
    category: "ISP and uptime",
    title: "Select the internet service plan",
    text: "The office will rely on cloud services, teleconferencing, remote access, and daily business communication.",
    businessNeed: "Avoid outages and bandwidth bottlenecks during meetings and file sharing.",
    designGoal: "Pick an ISP approach that supports speed, reliability, and room for growth.",
    status: "ISP plan selected",
    choices: [
      { label: "Business fiber service with SLA, static IP option, and documented support path", note: "Best balance for uptime, bandwidth, and business support.", impact: { reliability: 14, security: 4, scalability: 8, support: 7, budget: -7 }, feedback: "Strong choice. Business fiber with a service commitment supports video, cloud workflows, VPN, and growth better than consumer-grade service.", highlight: ["mapIsp"] },
      { label: "Residential internet to save money", note: "Cheaper, but weaker support and less predictable uptime.", impact: { reliability: -12, security: -2, scalability: -6, support: -9, budget: 10 }, feedback: "Weak choice. Residential service may reduce cost, but it usually lacks the support and reliability expectations needed for a business office.", warn: ["mapIsp"] },
      { label: "Business fiber plus documented backup hotspot/failover process", note: "Best resilience, but adds cost and operational planning.", impact: { reliability: 17, security: 5, scalability: 9, support: 9, budget: -11 }, feedback: "Excellent resilience choice. A primary business fiber connection plus a documented backup path gives the office a practical continuity plan.", highlight: ["mapIsp", "mapFirewall"] }
    ]
  },
  {
    category: "Core hardware",
    title: "Choose switching and cabling infrastructure",
    text: "The office needs reliable wired connectivity for workstations, printers, and shared services.",
    businessNeed: "Support current users without forcing a redesign during the next expansion.",
    designGoal: "Choose hardware that provides management visibility, spare capacity, and clean troubleshooting.",
    status: "Switching plan selected",
    choices: [
      { label: "Managed gigabit switch, patch panel, labels, and spare ports", note: "Supports visibility, clean cabling, and expansion.", impact: { reliability: 12, security: 8, scalability: 13, support: 14, budget: -7 }, feedback: "Strong choice. Managed switching, patch panels, labels, and spare ports make the network easier to maintain and scale.", highlight: ["mapCore"] },
      { label: "Unmanaged desktop switches wherever more ports are needed", note: "Fast setup, but hard to monitor and troubleshoot.", impact: { reliability: -8, security: -7, scalability: -5, support: -12, budget: 7 }, feedback: "Risky choice. Unmanaged switches may work short term, but they reduce visibility and make troubleshooting harder.", warn: ["mapCore"] },
      { label: "One oversized switch with no patch panel or cable plan", note: "Capacity exists, but supportability suffers.", impact: { reliability: 2, security: 1, scalability: 3, support: -7, budget: -4 }, feedback: "Partial choice. Port capacity helps, but without labeling and patch management, support becomes harder as the office grows.", warn: ["mapCore"] }
    ]
  },
  {
    category: "Security architecture",
    title: "Plan network separation and firewall placement",
    text: "Even a small office benefits from clear boundaries between trusted endpoints, guest traffic, printers, and management functions.",
    businessNeed: "Reduce the chance that one risky device or guest connection affects the entire office.",
    designGoal: "Apply practical segmentation and default-deny thinking without overcomplicating the deployment.",
    status: "Security boundary selected",
    choices: [
      { label: "Place a firewall at the edge and separate users, guest access, printers, and management traffic", note: "Improves containment and gives IT a clearer rule structure.", impact: { reliability: 6, security: 16, scalability: 8, support: 8, budget: -7 }, feedback: "Excellent choice. Segmentation and an edge firewall reduce blast radius and make policy enforcement clearer.", highlight: ["mapFirewall", "mapPrinter", "mapEndpoints"] },
      { label: "Use one flat network for everything", note: "Simple, but weak isolation and higher impact from compromised devices.", impact: { reliability: -4, security: -16, scalability: -8, support: -7, budget: 6 }, feedback: "Risky choice. A flat network is easier to set up, but it increases exposure and makes containment harder.", warn: ["mapFirewall", "mapEndpoints", "mapPrinter"] },
      { label: "Only rely on endpoint antivirus and skip network controls", note: "Endpoint security matters, but it is not a complete network design.", impact: { reliability: -2, security: -11, scalability: -4, support: -5, budget: 3 }, feedback: "Incomplete choice. Endpoint protection helps, but it does not replace network boundaries, firewall rules, and secure remote access.", warn: ["mapFirewall"] }
    ]
  },
  {
    category: "Endpoint protection",
    title: "Protect workstations and stored data",
    text: "The proposal includes Windows workstations that may store or access sensitive business data.",
    businessNeed: "Limit data exposure if a device is lost, stolen, or improperly accessed.",
    designGoal: "Choose a practical workstation protection baseline.",
    status: "Endpoint baseline selected",
    choices: [
      { label: "Windows 11 baseline with BitLocker, TPM, standard accounts, and update policy", note: "Protects data at rest and improves endpoint hygiene.", impact: { reliability: 4, security: 15, scalability: 5, support: 7, budget: -4 }, feedback: "Strong choice. BitLocker and a standard workstation baseline directly support data protection and easier support.", highlight: ["mapEndpoints"] },
      { label: "Use administrator accounts for all users so fewer support tickets occur", note: "Convenient, but increases risk from malware and mistakes.", impact: { reliability: -3, security: -14, scalability: -4, support: -6, budget: 2 }, feedback: "Risky choice. Admin rights for all users can reduce friction at first, but it increases malware and configuration risk.", warn: ["mapEndpoints"] },
      { label: "Encrypt only laptops and leave desktops unprotected", note: "Better than nothing, but inconsistent.", impact: { reliability: 1, security: 5, scalability: 1, support: -2, budget: 2 }, feedback: "Partial choice. Laptop encryption is important, but a consistent baseline is easier to audit and support.", warn: ["mapEndpoints"] }
    ]
  },
  {
    category: "Remote access",
    title: "Choose the remote access model",
    text: "Staff may need secure access when working off-site or traveling.",
    businessNeed: "Allow remote work without exposing internal systems directly to the internet.",
    designGoal: "Provide secure, accountable, and supportable access.",
    status: "Remote access model selected",
    choices: [
      { label: "VPN with MFA, named users, logging, and least-privilege access", note: "Secure and accountable remote access.", impact: { reliability: 4, security: 16, scalability: 7, support: 8, budget: -6 }, feedback: "Excellent choice. VPN with MFA and logging supports secure remote work without exposing internal resources directly.", highlight: ["mapFirewall"] },
      { label: "Open remote desktop directly to the internet", note: "Convenient, but highly exposed.", impact: { reliability: -7, security: -18, scalability: -6, support: -8, budget: 4 }, feedback: "Dangerous choice. Exposing remote desktop directly to the internet is a common attack path and should be avoided.", warn: ["mapFirewall"] },
      { label: "Use one shared VPN login for the team", note: "Easier to manage, but weak accountability.", impact: { reliability: 1, security: -8, scalability: -4, support: -5, budget: 2 }, feedback: "Weak choice. Shared accounts make auditing and access control difficult. Named users and MFA are stronger.", warn: ["mapFirewall"] }
    ]
  },
  {
    category: "Printing and shared services",
    title: "Plan network printing",
    text: "The office needs shared printing without turning printers into an unmanaged security gap.",
    businessNeed: "Make printing easy for staff while keeping device access controlled.",
    designGoal: "Choose a printer deployment model that supports operations and security.",
    status: "Printer plan selected",
    choices: [
      { label: "Network printer with static/reserved IP, access controls, and documented driver setup", note: "Supports shared use and easier troubleshooting.", impact: { reliability: 6, security: 8, scalability: 4, support: 10, budget: -4 }, feedback: "Strong choice. A documented network printer deployment reduces confusion and makes support easier.", highlight: ["mapPrinter"] },
      { label: "Let staff connect personal printers as needed", note: "Flexible, but harder to secure or support.", impact: { reliability: -5, security: -8, scalability: -5, support: -10, budget: 3 }, feedback: "Risky choice. Personal printers create inconsistent support and potential security issues.", warn: ["mapPrinter"] },
      { label: "USB printer attached to one employee workstation", note: "Cheap, but creates a single point of failure.", impact: { reliability: -8, security: -3, scalability: -7, support: -8, budget: 5 }, feedback: "Weak choice. A USB-shared printer depends on one workstation and creates avoidable support problems.", warn: ["mapPrinter"] }
    ]
  },
  {
    category: "Collaboration support",
    title: "Support teleconferencing and collaboration",
    text: "Video meetings are a baseline business requirement, not an optional extra.",
    businessNeed: "Keep video calls stable while normal business traffic continues.",
    designGoal: "Plan bandwidth, device placement, and basic traffic prioritization.",
    status: "Collaboration plan selected",
    choices: [
      { label: "Reserve wired conference connections, validate bandwidth, and document basic QoS priorities", note: "Supports stable meetings and predictable troubleshooting.", impact: { reliability: 11, security: 2, scalability: 7, support: 8, budget: -5 }, feedback: "Strong choice. Video reliability improves when conference rooms have stable wired connections and bandwidth expectations are documented.", highlight: ["mapCollab"] },
      { label: "Assume the 1 Gbps link automatically solves all video problems", note: "Bandwidth helps, but local Wi-Fi and endpoint issues can still hurt calls.", impact: { reliability: -2, security: 0, scalability: 1, support: -5, budget: 2 }, feedback: "Partial choice. Bandwidth is important, but local network design and troubleshooting documentation still matter.", warn: ["mapCollab"] },
      { label: "Use only guest Wi-Fi for conference systems", note: "Easy to deploy, but unstable and poorly integrated.", impact: { reliability: -10, security: -4, scalability: -4, support: -7, budget: 3 }, feedback: "Weak choice. Guest Wi-Fi should not be the foundation for business-critical meeting systems.", warn: ["mapCollab"] }
    ]
  },
  {
    category: "Growth and documentation",
    title: "Prepare for expansion and support handoff",
    text: "The office may add users, devices, rooms, and new services after the initial launch.",
    businessNeed: "Avoid redesigning the network every time the office grows.",
    designGoal: "Create a supportable handoff package with capacity and contingency planning.",
    status: "Growth plan selected",
    choices: [
      { label: "Create a network diagram, IP plan, cable labels, config backups, spare ports, and rollout checklist", note: "Best operational handoff and growth readiness.", impact: { reliability: 12, security: 8, scalability: 16, support: 16, budget: -6 }, feedback: "Excellent choice. Documentation and spare capacity turn the proposal into a supportable operating environment.", highlight: ["mapIsp", "mapFirewall", "mapCore", "mapEndpoints", "mapPrinter", "mapCollab"] },
      { label: "Document only the ISP account and admin passwords", note: "Some recovery value, but not a real support plan.", impact: { reliability: -3, security: -8, scalability: -4, support: -8, budget: 3 }, feedback: "Weak choice. Passwords alone do not explain topology, device placement, addressing, or recovery steps.", warn: ["mapCore"] },
      { label: "Skip formal documentation until something breaks", note: "Saves time now, but increases outage duration later.", impact: { reliability: -9, security: -5, scalability: -10, support: -15, budget: 5 }, feedback: "Risky choice. Lack of documentation makes outages longer and future changes more dangerous.", warn: ["mapCore", "mapFirewall"] }
    ]
  }
];

const state = { step: 0, metrics: { reliability: 50, security: 50, scalability: 50, support: 50, budget: 50 }, decisions: [] };
const ids = {
  reliability: ["reliabilityValue", "reliabilityMeter"],
  security: ["securityValue", "securityMeter"],
  scalability: ["scalabilityValue", "scalabilityMeter"],
  support: ["supportValue", "supportMeter"],
  budget: ["budgetValue", "budgetMeter"]
};

function clamp(value) { return Math.max(0, Math.min(100, value)); }
function $(id) { return document.getElementById(id); }

function updateMetrics() {
  Object.entries(ids).forEach(([key, [valueId, meterId]]) => {
    const value = clamp(state.metrics[key]);
    $(valueId).textContent = value;
    $(meterId).style.width = `${value}%`;
  });
}

function clearMapState() {
  ["mapIsp", "mapFirewall", "mapCore", "mapEndpoints", "mapPrinter", "mapCollab"].forEach(id => {
    const el = $(id);
    if (el) el.classList.remove("good", "warn");
  });
}

function updateStatus() {
  const list = $("statusList");
  if (!state.decisions.length) {
    list.innerHTML = `<span>Awaiting topology decision</span><span>Awaiting ISP decision</span><span>Awaiting security controls</span>`;
    return;
  }
  list.innerHTML = state.decisions.slice(-5).map(item => `<span>${item}</span>`).join("");
}

function renderDecision() {
  clearMapState();
  updateMetrics();
  updateStatus();
  const decision = decisions[state.step];
  $("decisionPanel").classList.remove("hidden");
  $("feedbackPanel").classList.add("hidden");
  $("finalPanel").classList.add("hidden");
  $("stepCounter").textContent = `Decision ${state.step + 1} of ${decisions.length}`;
  $("progressFill").style.width = `${(state.step / decisions.length) * 100}%`;
  $("decisionCategory").textContent = decision.category;
  $("decisionTitle").textContent = decision.title;
  $("decisionText").textContent = decision.text;
  $("businessNeed").textContent = decision.businessNeed;
  $("designGoal").textContent = decision.designGoal;
  $("choiceList").innerHTML = decision.choices.map((choice, index) => `
    <button class="choice" type="button" data-choice="${index}">
      <strong>${choice.label}</strong>
      <span>${choice.note}</span>
    </button>
  `).join("");
  document.querySelectorAll(".choice").forEach(button => button.addEventListener("click", handleChoice));
}

function handleChoice(event) {
  const choiceIndex = Number(event.currentTarget.dataset.choice);
  const decision = decisions[state.step];
  const choice = decision.choices[choiceIndex];
  Object.entries(choice.impact).forEach(([key, value]) => {
    state.metrics[key] = clamp(state.metrics[key] + value);
  });
  state.decisions.push(decision.status);
  updateMetrics();
  updateStatus();
  clearMapState();
  (choice.highlight || []).forEach(id => $(id)?.classList.add("good"));
  (choice.warn || []).forEach(id => $(id)?.classList.add("warn"));
  $("decisionPanel").classList.add("hidden");
  $("feedbackPanel").classList.remove("hidden");
  $("feedbackTitle").textContent = choice.label;
  $("feedbackText").textContent = choice.feedback;
  $("impactReliability").textContent = `Reliability: ${formatImpact(choice.impact.reliability)}`;
  $("impactSecurity").textContent = `Security: ${formatImpact(choice.impact.security)}`;
  $("impactScalability").textContent = `Scalability: ${formatImpact(choice.impact.scalability)}`;
  $("impactSupport").textContent = `Supportability: ${formatImpact(choice.impact.support)}`;
  $("impactBudget").textContent = `Budget: ${formatImpact(choice.impact.budget)}`;
  $("nextButton").textContent = state.step === decisions.length - 1 ? "View final report" : "Next decision";
}

function formatImpact(value) { return value > 0 ? `+${value}` : `${value}`; }

function nextStep() {
  state.step += 1;
  if (state.step >= decisions.length) showFinal();
  else renderDecision();
}

function scoreAverage() {
  const { reliability, security, scalability, support, budget } = state.metrics;
  return Math.round((reliability + security + scalability + support + budget) / 5);
}

function showFinal() {
  clearMapState();
  ["mapIsp", "mapFirewall", "mapCore", "mapEndpoints", "mapPrinter", "mapCollab"].forEach(id => $(id)?.classList.add("good"));
  updateMetrics();
  updateStatus();
  $("decisionPanel").classList.add("hidden");
  $("feedbackPanel").classList.add("hidden");
  $("finalPanel").classList.remove("hidden");
  $("progressFill").style.width = "100%";
  $("stepCounter").textContent = "Design complete";
  const avg = scoreAverage();
  let grade = "Needs redesign";
  if (avg >= 85) grade = "Excellent readiness";
  else if (avg >= 72) grade = "Strong readiness";
  else if (avg >= 60) grade = "Moderate readiness";
  $("finalGrade").textContent = `Network readiness: ${grade} (${avg}%)`;
  const strongest = Object.entries(state.metrics).sort((a,b) => b[1] - a[1])[0];
  const weakest = Object.entries(state.metrics).sort((a,b) => a[1] - b[1])[0];
  const labels = { reliability: "Reliability", security: "Security", scalability: "Scalability", support: "Supportability", budget: "Budget Control" };
  $("reportBody").innerHTML = `
    <p><strong>Executive summary:</strong> The proposed Fayetteville office network was evaluated across reliability, security, scalability, supportability, and budget control. The strongest designs use a star topology, business-grade internet service, managed switching, practical security controls, BitLocker, VPN access, and clear documentation.</p>
    <p><strong>Strongest area:</strong> ${labels[strongest[0]]} scored ${strongest[1]}/100.</p>
    <p><strong>Area to review:</strong> ${labels[weakest[0]]} scored ${weakest[1]}/100. This is where leadership should confirm funding, documentation, or implementation details before deployment.</p>
    <p><strong>Recommended next step:</strong> Finalize the network diagram, IP plan, hardware list, security baseline, remote access policy, and rollout checklist before the office goes live.</p>
  `;
}

function restart() {
  state.step = 0;
  state.metrics = { reliability: 50, security: 50, scalability: 50, support: 50, budget: 50 };
  state.decisions = [];
  renderDecision();
}

$("nextButton").addEventListener("click", nextStep);
$("restartButton").addEventListener("click", restart);
$("printButton").addEventListener("click", () => window.print());
renderDecision();

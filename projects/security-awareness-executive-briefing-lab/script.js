const scenarios = [
  {
    category: "Phishing awareness",
    title: "A suspicious Microsoft login email is reported",
    text: "One employee reports a message that appears to be a Microsoft password-expiration notice. The link points to an unfamiliar domain, and the employee is unsure if anyone else received it.",
    concern: "Leadership wants to avoid panic but also wants proof that the organization responds quickly to social engineering.",
    goal: "Preserve evidence, contain the threat, notify users clearly, and reinforce the reporting process.",
    choices: [
      { title: "Send a company-wide warning, preserve the email, block the domain, and open an incident note.", desc: "Treat the report as useful intelligence while keeping the response measured.", risk: -14, readiness: 12, culture: 10, budget: -1, quality: "best", feedback: "Strong decision. This validates the employee report, supports containment, and creates a record for follow-up training and metrics." },
      { title: "Delete the email from the reporter's inbox only.", desc: "Fix the visible issue for the one person who reported it.", risk: 8, readiness: -4, culture: -3, budget: 0, quality: "weak", feedback: "This is too narrow. Other employees may still have the message, and the organization loses a chance to reinforce reporting behavior." },
      { title: "Tell the employee to forward it to everyone so they can see what it looks like.", desc: "Use the real email as a quick warning example.", risk: 16, readiness: -8, culture: -5, budget: 0, quality: "poor", feedback: "Forwarding the suspected phishing email increases exposure and teaches the wrong behavior. Use screenshots or sanitized examples instead." },
      { title: "Reset all employee passwords immediately.", desc: "Take the strongest possible action before confirming compromise.", risk: 1, readiness: -4, culture: -6, budget: -2, quality: "mixed", feedback: "This may be excessive without evidence of credential theft. It creates disruption and can reduce leadership confidence in the response process." }
    ]
  },
  {
    category: "Password and MFA policy",
    title: "Executives ask whether MFA is worth the friction",
    text: "Several managers say employees already complain about too many logins. Leadership wants a recommendation that protects accounts without creating unnecessary resistance.",
    concern: "Executives need a policy that reduces account takeover risk and can be explained in business terms.",
    goal: "Recommend MFA and password controls in a way that is practical, enforceable, and measurable.",
    choices: [
      { title: "Require MFA for email, VPN, admin accounts, and systems with sensitive data; pair it with short training and help-desk support.", desc: "Focus on high-risk access and user adoption.", risk: -13, readiness: 11, culture: 7, budget: -1, quality: "best", feedback: "Strong decision. This reduces the most likely account-compromise paths while anticipating user support needs." },
      { title: "Keep passwords only, but require users to change them every 30 days.", desc: "Avoid MFA friction by relying on frequent password rotation.", risk: 7, readiness: -5, culture: -4, budget: 0, quality: "weak", feedback: "Frequent rotation alone often creates weak password habits. MFA provides stronger protection against phishing and credential reuse." },
      { title: "Require MFA only for the IT department.", desc: "Protect technical staff first because they have powerful access.", risk: -2, readiness: 2, culture: -2, budget: 0, quality: "mixed", feedback: "This helps but is incomplete. Executives, finance, HR, email, VPN, and sensitive-data systems also need protection." },
      { title: "Delay the decision until after the next audit.", desc: "Wait for external pressure before changing policy.", risk: 11, readiness: -8, culture: -6, budget: 0, quality: "poor", feedback: "Waiting for an audit keeps a known risk open. Security awareness works best when leadership acts before a required deadline." }
    ]
  },
  {
    category: "Sensitive data handling",
    title: "A manager wants to email a spreadsheet with customer data",
    text: "A department manager asks if they can email a spreadsheet containing customer names, contact details, and internal notes to a personal account so they can work from home over the weekend.",
    concern: "Leadership wants productivity, but not at the cost of data exposure or unclear accountability.",
    goal: "Apply data handling rules that support secure remote work and explain why the rule matters.",
    choices: [
      { title: "Deny personal email use and provide an approved secure access method with least-privilege permissions.", desc: "Support the work need through a controlled channel.", risk: -12, readiness: 9, culture: 7, budget: -1, quality: "best", feedback: "Strong decision. It protects sensitive data while offering a workable business path instead of only saying no." },
      { title: "Allow the email if the manager promises to delete it afterward.", desc: "Trust the manager and avoid delay.", risk: 14, readiness: -6, culture: -4, budget: 0, quality: "poor", feedback: "Promises are not a control. Personal email creates retention, forwarding, device, and audit problems." },
      { title: "Tell the manager to zip the file and use a simple password.", desc: "Add lightweight protection to the emailed file.", risk: 5, readiness: -2, culture: -2, budget: 0, quality: "weak", feedback: "This is better than no protection, but it still routes sensitive data through an unapproved account and weakens accountability." },
      { title: "Escalate every similar request directly to the CEO.", desc: "Make leadership approve all data-sharing decisions.", risk: -1, readiness: -3, culture: -5, budget: -1, quality: "mixed", feedback: "Executive escalation may be needed for exceptions, but daily data handling needs a clear policy and approved workflow." }
    ]
  },
  {
    category: "Social engineering",
    title: "A caller claims to be from the help desk",
    text: "An employee receives a phone call from someone claiming to be IT support. The caller asks the employee to approve an MFA prompt and read back a temporary login code.",
    concern: "Leadership wants employees to recognize manipulation tactics without feeling blamed for asking questions.",
    goal: "Teach verification behavior and build a culture where employees stop suspicious requests.",
    choices: [
      { title: "Train employees to refuse code-sharing, hang up, and contact IT through the official channel.", desc: "Make verification the expected behavior.", risk: -15, readiness: 10, culture: 12, budget: -1, quality: "best", feedback: "Strong decision. This gives employees a specific safe action and reinforces that stopping the call is the right move." },
      { title: "Tell employees to comply if the caller sounds professional.", desc: "Assume legitimate support calls are easy to recognize.", risk: 18, readiness: -8, culture: -8, budget: 0, quality: "poor", feedback: "Professional tone is not proof of identity. Social engineers often sound credible on purpose." },
      { title: "Ban all phone support permanently.", desc: "Remove the entire channel to reduce risk.", risk: -2, readiness: -4, culture: -6, budget: -1, quality: "mixed", feedback: "This reduces one vector but may disrupt operations. A better answer is verification, callback procedures, and user education." },
      { title: "Warn only new employees during onboarding.", desc: "Focus training on the group that is least familiar with policy.", risk: 4, readiness: 0, culture: -2, budget: 0, quality: "weak", feedback: "New employees need training, but social engineering targets everyone. Refreshers and role-based examples are needed." }
    ]
  },
  {
    category: "Insider risk and turnover",
    title: "High turnover creates access-control problems",
    text: "HR reports that several employees left recently. Some shared folders and SaaS accounts still show access for former staff or users who changed departments months ago.",
    concern: "Leadership sees this as an administrative issue, not a security issue. You need to explain the business risk.",
    goal: "Turn account cleanup into a repeatable process tied to HR, managers, and IT operations.",
    choices: [
      { title: "Create a joiner-mover-leaver process with HR triggers, manager review, and quarterly access recertification.", desc: "Make access ownership a process, not a one-time cleanup.", risk: -14, readiness: 12, culture: 6, budget: -2, quality: "best", feedback: "Strong decision. This connects human resources, business ownership, least privilege, and auditability." },
      { title: "Ask IT to remove accounts only when someone remembers to send a ticket.", desc: "Keep the process informal and flexible.", risk: 10, readiness: -6, culture: -3, budget: 0, quality: "weak", feedback: "Informal access cleanup creates gaps. A repeatable trigger-based process is safer and easier to audit." },
      { title: "Disable all shared folders until the review is complete.", desc: "Take an aggressive containment action.", risk: -3, readiness: -5, culture: -7, budget: -1, quality: "mixed", feedback: "This may protect data short term but can interrupt operations. Prioritized review and owner validation is usually better." },
      { title: "Ignore it because former employees probably cannot log in anymore.", desc: "Assume inactive employees no longer have useful access.", risk: 16, readiness: -9, culture: -5, budget: 0, quality: "poor", feedback: "Assumptions are dangerous. Dormant accounts, shared credentials, and stale permissions can all become attack paths." }
    ]
  },
  {
    category: "Security metrics",
    title: "Leadership wants proof the program is working",
    text: "The executive team approves awareness training but asks what should be measured after rollout. They do not want a dashboard full of vanity metrics.",
    concern: "Leadership needs simple measures that connect awareness work to risk reduction.",
    goal: "Choose metrics that show behavior change, response quality, and control maturity.",
    choices: [
      { title: "Track phishing report rate, repeat-click rate, training completion, time to report, and policy exception trends.", desc: "Measure both participation and behavior change.", risk: -10, readiness: 12, culture: 6, budget: -1, quality: "best", feedback: "Strong decision. These metrics help leadership see whether the program is changing behavior and reducing exposure." },
      { title: "Only track whether employees clicked through the training slides.", desc: "Use completion as the main evidence of success.", risk: 6, readiness: -4, culture: -2, budget: 0, quality: "weak", feedback: "Completion matters, but it does not prove safer behavior. Combine completion with phishing, reporting, and exception metrics." },
      { title: "Publish a shame list of employees who fail simulations.", desc: "Use public pressure to force better behavior.", risk: 7, readiness: -5, culture: -13, budget: 0, quality: "poor", feedback: "Shame damages security culture. Coaching and targeted reinforcement work better than public blame." },
      { title: "Stop measuring after the first quarter if the numbers improve.", desc: "Avoid long-term dashboard maintenance.", risk: 8, readiness: -6, culture: -3, budget: 1, quality: "weak", feedback: "Security awareness needs trend data. Attack methods and employee behavior change over time." }
    ]
  },
  {
    category: "Executive sponsorship",
    title: "The final funding decision goes to leadership",
    text: "You have one slide left. Executives ask what they personally need to do besides approve the budget.",
    concern: "The program will fail if leadership treats it as an IT-only task.",
    goal: "Ask for visible sponsorship, budget, participation, and quarterly review cadence.",
    choices: [
      { title: "Ask executives to approve Phase 1, complete the same training, sponsor quarterly reviews, and model reporting behavior.", desc: "Turn leadership approval into visible culture change.", risk: -13, readiness: 15, culture: 12, budget: -1, quality: "best", feedback: "Strong decision. Awareness programs work when leaders model the behavior they expect from the rest of the organization." },
      { title: "Ask only for money and let IT handle everything else.", desc: "Keep executives out of the operational details.", risk: 5, readiness: 1, culture: -7, budget: -1, quality: "weak", feedback: "Funding helps, but executive behavior matters. If leaders do not participate, employees treat the program as optional compliance noise." },
      { title: "Delay the program until every policy is rewritten perfectly.", desc: "Avoid launching before documentation is complete.", risk: 12, readiness: -8, culture: -4, budget: 0, quality: "poor", feedback: "Perfection delays risk reduction. A phased rollout can begin with high-impact training and improve policy maturity over time." },
      { title: "Launch training quietly with no executive announcement.", desc: "Avoid making security feel like a major change.", risk: 6, readiness: -4, culture: -5, budget: 0, quality: "weak", feedback: "Quiet rollout weakens adoption. A clear leadership message helps employees understand why the program matters." }
    ]
  }
];

const state = {
  index: 0,
  risk: 50,
  readiness: 50,
  culture: 50,
  budget: 8,
  history: []
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const $ = (id) => document.getElementById(id);

function setWidth(id, value, max = 100) {
  const el = $(id);
  el.style.width = `${clamp(value, 0, max) / max * 100}%`;
}

function updateDashboard() {
  state.risk = clamp(state.risk, 0, 100);
  state.readiness = clamp(state.readiness, 0, 100);
  state.culture = clamp(state.culture, 0, 100);
  state.budget = clamp(state.budget, 0, 8);
  $("riskValue").textContent = state.risk;
  $("readinessValue").textContent = state.readiness;
  $("cultureValue").textContent = state.culture;
  $("budgetValue").textContent = state.budget;
  setWidth("riskMeter", state.risk);
  setWidth("readinessMeter", state.readiness);
  setWidth("cultureMeter", state.culture);
  setWidth("budgetMeter", state.budget, 8);
  setWidth("progressFill", state.index, scenarios.length);
}

function renderScenario() {
  updateDashboard();
  const scenario = scenarios[state.index];
  $("stepCounter").textContent = `Scenario ${state.index + 1} of ${scenarios.length}`;
  $("scenarioCategory").textContent = scenario.category;
  $("scenarioTitle").textContent = scenario.title;
  $("scenarioText").textContent = scenario.text;
  $("leadershipConcern").textContent = scenario.concern;
  $("securityGoal").textContent = scenario.goal;
  $("feedbackPanel").classList.add("hidden");
  $("scenarioPanel").classList.remove("hidden");
  $("finalPanel").classList.add("hidden");

  const choiceList = $("choiceList");
  choiceList.innerHTML = "";
  scenario.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<strong>${choice.title}</strong><span>${choice.desc}</span>`;
    button.addEventListener("click", () => chooseOption(choiceIndex));
    choiceList.appendChild(button);
  });
}

function chooseOption(choiceIndex) {
  const scenario = scenarios[state.index];
  const choice = scenario.choices[choiceIndex];
  state.risk += choice.risk;
  state.readiness += choice.readiness;
  state.culture += choice.culture;
  state.budget += choice.budget;
  state.history.push({ scenario: scenario.title, category: scenario.category, choice: choice.title, quality: choice.quality, feedback: choice.feedback });

  updateDashboard();
  $("scenarioPanel").classList.add("hidden");
  $("feedbackPanel").classList.remove("hidden");
  $("feedbackLabel").textContent = `${scenario.category} decision`;
  $("feedbackTitle").textContent = choice.quality === "best" ? "Strong executive-ready decision" : choice.quality === "mixed" ? "Partly useful, but incomplete" : "Risk remains after this decision";
  $("feedbackText").textContent = choice.feedback;
  $("impactRisk").textContent = `Risk: ${choice.risk > 0 ? "+" : ""}${choice.risk}`;
  $("impactReadiness").textContent = `Readiness: ${choice.readiness > 0 ? "+" : ""}${choice.readiness}`;
  $("impactCulture").textContent = `Culture: ${choice.culture > 0 ? "+" : ""}${choice.culture}`;
  $("impactBudget").textContent = `Budget: ${choice.budget > 0 ? "+" : ""}${choice.budget}`;
  $("nextButton").textContent = state.index === scenarios.length - 1 ? "View executive report" : "Next scenario";
}

function renderFinalReport() {
  $("scenarioPanel").classList.add("hidden");
  $("feedbackPanel").classList.add("hidden");
  $("finalPanel").classList.remove("hidden");
  setWidth("progressFill", scenarios.length, scenarios.length);

  const bestCount = state.history.filter(item => item.quality === "best").length;
  const weakChoices = state.history.filter(item => item.quality !== "best");
  const score = Math.round(((100 - state.risk) * 0.35) + (state.readiness * 0.3) + (state.culture * 0.25) + (state.budget * 1.25));
  let grade = "Needs improvement";
  if (score >= 86 && bestCount >= 5) grade = "Strong";
  else if (score >= 72) grade = "Developing";

  $("finalGrade").textContent = `Program readiness: ${grade} · Score ${clamp(score, 0, 100)}%`;

  const strengths = [];
  if (state.risk <= 35) strengths.push("Risk decisions reduced exposure across phishing, account access, data handling, and insider-risk scenarios.");
  if (state.readiness >= 70) strengths.push("Executive readiness improved through measurable controls, leadership cadence, and practical program governance.");
  if (state.culture >= 70) strengths.push("Security culture improved because employees were treated as reporting partners, not blame targets.");
  if (!strengths.length) strengths.push("The briefing created a starting point for discussing human risk and leadership accountability.");

  const recommendations = [];
  if (state.risk > 35) recommendations.push("Prioritize phishing reporting, MFA coverage, sensitive-data handling, and access-review procedures.");
  if (state.readiness < 70) recommendations.push("Build a quarterly executive review rhythm with simple metrics and clear business-risk language.");
  if (state.culture < 70) recommendations.push("Avoid blame-based training. Use coaching, sanitized examples, and positive reporting reinforcement.");
  if (state.budget <= 2) recommendations.push("Recheck budget tradeoffs and phase work so the highest-risk controls are funded first.");
  if (!recommendations.length) recommendations.push("Move forward with Phase 1 training, phishing simulations, MFA reinforcement, and quarterly security awareness reporting.");

  const decisionList = state.history.map(item => `<li><strong>${item.category}:</strong> ${item.choice}</li>`).join("");
  const weakList = weakChoices.length
    ? weakChoices.map(item => `<li><strong>${item.category}:</strong> ${item.feedback}</li>`).join("")
    : "<li>No major weak decisions. Continue measuring behavior over time.</li>";

  $("reportBody").innerHTML = `
    <div class="report-box"><h3>Executive Summary</h3><p>This briefing evaluated people-side cybersecurity decisions across phishing, MFA, data handling, social engineering, access review, metrics, and leadership sponsorship.</p></div>
    <div class="report-box"><h3>Strong Areas</h3><ul>${strengths.map(item => `<li>${item}</li>`).join("")}</ul></div>
    <div class="report-box"><h3>Recommended Next Steps</h3><ul>${recommendations.map(item => `<li>${item}</li>`).join("")}</ul></div>
    <div class="report-box"><h3>Decision Record</h3><ul>${decisionList}</ul></div>
    <div class="report-box"><h3>Coaching Notes</h3><ul>${weakList}</ul></div>
  `;
}

$("nextButton").addEventListener("click", () => {
  state.index += 1;
  if (state.index >= scenarios.length) renderFinalReport();
  else renderScenario();
});

$("restartButton").addEventListener("click", () => {
  state.index = 0;
  state.risk = 50;
  state.readiness = 50;
  state.culture = 50;
  state.budget = 8;
  state.history = [];
  renderScenario();
});

$("printButton").addEventListener("click", () => window.print());

renderScenario();

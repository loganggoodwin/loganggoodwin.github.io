const terminal = document.getElementById('terminal');
const form = document.getElementById('commandForm');
const input = document.getElementById('commandInput');
const promptEl = document.getElementById('prompt');
const scoreEl = document.getElementById('score');
const rankEl = document.getElementById('rank');
const missionsEl = document.getElementById('missions');
const endpointGrid = document.getElementById('endpointGrid');
const toastEl = document.getElementById('toast');
const difficultyButtons = document.querySelectorAll('[data-difficulty]');
const difficultyLabelEl = document.getElementById('difficultyLabel');
const difficultyHelpEl = document.getElementById('difficultyHelp');
const easyBuilderEl = document.getElementById('easyBuilder');
const easyActionsEl = document.getElementById('easyActions');
const guidePanelEl = document.getElementById('guidePanel');
const demoBtn = document.getElementById('demoBtn');
const hintBtn = document.getElementById('hintBtn');

const demoCommands = [
  'enable',
  'configure terminal',
  'hostname BRANCH-R1',
  'vlan 10',
  'name HARDWARE',
  'exit',
  'vlan 20',
  'name PHONES',
  'exit',
  'interface range fa0/1-5',
  'switchport mode access',
  'switchport access vlan 10',
  'switchport voice vlan 20',
  'exit',
  'interface fa0/24',
  'switchport mode trunk',
  'switchport trunk allowed vlan 10,20',
  'no shutdown',
  'exit',
  'interface gigabitEthernet0/0',
  'no ip address',
  'no shutdown',
  'exit',
  'interface gigabitEthernet0/0.10',
  'encapsulation dot1Q 10',
  'ip address 192.168.10.1 255.255.255.0',
  'ip nat inside',
  'exit',
  'interface gigabitEthernet0/0.20',
  'encapsulation dot1Q 20',
  'ip address 192.168.20.1 255.255.255.0',
  'ip nat inside',
  'exit',
  'interface gigabitEthernet0/1',
  'ip address 10.0.0.1 255.255.255.252',
  'no shutdown',
  'ip nat outside',
  'exit',
  'ip dhcp excluded-address 192.168.10.1 192.168.10.20',
  'ip dhcp excluded-address 192.168.10.50 192.168.10.50',
  'ip dhcp excluded-address 192.168.20.1 192.168.20.20',
  'ip dhcp excluded-address 192.168.20.10 192.168.20.10',
  'ip dhcp pool HARDWARE',
  'network 192.168.10.0 255.255.255.0',
  'default-router 192.168.10.1',
  'dns-server 8.8.8.8',
  'exit',
  'ip dhcp pool PHONES',
  'network 192.168.20.0 255.255.255.0',
  'default-router 192.168.20.1',
  'dns-server 8.8.8.8',
  'option 150 ip 192.168.20.10',
  'exit',
  'access-list 10 permit 192.168.10.0 0.0.0.255',
  'access-list 20 permit 192.168.20.0 0.0.0.255',
  'ip nat inside source list 10 interface gigabitEthernet0/1 overload',
  'ip nat inside source list 20 interface gigabitEthernet0/1 overload',
  'ip route 0.0.0.0 0.0.0.0 10.0.0.2',
  'printer ip 192.168.10.50',
  'printer gateway 192.168.10.1',
  'printer online',
  'firewall enable',
  'firewall wan 10.0.0.2 255.255.255.252',
  'firewall gateway 10.0.0.1',
  'firewall allow vlan 10 outbound',
  'firewall allow vlan 20 outbound',
  'firewall allow tcp 80',
  'firewall allow tcp 443',
  'firewall allow udp 53',
  'firewall allow udp 5060',
  'firewall deny inbound any',
  'end',
  'write memory',
  'test network'
];

const employees = [
  { name: 'Ava', role: 'Manager' },
  { name: 'Ben', role: 'Sales' },
  { name: 'Chloe', role: 'Accounting' },
  { name: 'Diego', role: 'Support' },
  { name: 'Emma', role: 'Design' }
];

const missionDefs = [
  { id: 'privileged', title: 'Enter privileged mode', desc: 'Use enable to access router administration.', points: 4 },
  { id: 'hostname', title: 'Name the router', desc: 'Set hostname to BRANCH-R1.', points: 5 },
  { id: 'vlans', title: 'Create the two VLANs', desc: 'VLAN 10 must be HARDWARE and VLAN 20 must be PHONES.', points: 10 },
  { id: 'switching', title: 'Configure switch ports', desc: 'Fa0/1-5 need access VLAN 10 and voice VLAN 20; Fa0/24 must trunk VLANs 10 and 20.', points: 12 },
  { id: 'subinterfaces', title: 'Build router-on-a-stick gateways', desc: 'G0/0.10 and G0/0.20 need dot1Q tags and correct gateway IPs.', points: 14 },
  { id: 'wan', title: 'Bring up the WAN link', desc: 'G0/1 needs 10.0.0.1/30, no shutdown, and NAT outside.', points: 9 },
  { id: 'hardwareDhcp', title: 'Program Hardware VLAN DHCP', desc: 'Pool HARDWARE must serve the PCs in VLAN 10 with gateway and DNS.', points: 10 },
  { id: 'phoneDhcp', title: 'Program Phone VLAN DHCP', desc: 'Pool PHONES must serve VLAN 20 with gateway, DNS, and option 150.', points: 10 },
  { id: 'printer', title: 'Add the business printer', desc: 'Printer needs 192.168.10.50, gateway 192.168.10.1, and online status.', points: 7 },
  { id: 'natRoute', title: 'Configure NAT and default route', desc: 'Both VLANs must overload through G0/1 and route to firewall 10.0.0.2.', points: 10 },
  { id: 'firewall', title: 'Secure the edge firewall', desc: 'Allow VLAN 10, VLAN 20, web, DNS, voice signaling, and deny inbound.', points: 6 },
  { id: 'saved', title: 'Save the configuration', desc: 'Use write memory so the network survives a reboot.', points: 3 }
];

const difficultyNames = {
  easy: 'Easy',
  normal: 'Normal',
  hard: 'Hard'
};

const difficultyDescriptions = {
  easy: 'Easy mode gives you a command builder. Click the task you want, and the game writes the commands for you so you can learn the flow.',
  normal: 'Normal mode is the standard lab. You type commands yourself, but hints, the accepted-command guide, and the demo config are available.',
  hard: 'Hard mode is the engineer challenge. Hints, demo config, and the accepted-command list are hidden, so you must know the commands yourself.'
};

const easyActionDefs = [
  {
    id: 'hostname',
    title: 'Start router admin',
    desc: 'Enter enable, config mode, and set hostname.',
    commands: ['enable', 'configure terminal', 'hostname BRANCH-R1']
  },
  {
    id: 'vlans',
    title: 'Create VLANs',
    desc: 'Build VLAN 10 HARDWARE and VLAN 20 PHONES.',
    commands: ['vlan 10', 'name HARDWARE', 'exit', 'vlan 20', 'name PHONES', 'exit']
  },
  {
    id: 'switching',
    title: 'Configure switch ports',
    desc: 'Set PC ports, voice VLAN, and trunk uplink.',
    commands: ['interface range fa0/1-5', 'switchport mode access', 'switchport access vlan 10', 'switchport voice vlan 20', 'exit', 'interface fa0/24', 'switchport mode trunk', 'switchport trunk allowed vlan 10,20', 'no shutdown', 'exit']
  },
  {
    id: 'subinterfaces',
    title: 'Build VLAN gateways',
    desc: 'Configure router-on-a-stick for VLAN 10 and VLAN 20.',
    commands: ['interface gigabitEthernet0/0', 'no ip address', 'no shutdown', 'exit', 'interface gigabitEthernet0/0.10', 'encapsulation dot1Q 10', 'ip address 192.168.10.1 255.255.255.0', 'ip nat inside', 'exit', 'interface gigabitEthernet0/0.20', 'encapsulation dot1Q 20', 'ip address 192.168.20.1 255.255.255.0', 'ip nat inside', 'exit']
  },
  {
    id: 'wan',
    title: 'Configure WAN',
    desc: 'Set G0/1 as the router link to the firewall.',
    commands: ['interface gigabitEthernet0/1', 'ip address 10.0.0.1 255.255.255.252', 'no shutdown', 'ip nat outside', 'exit']
  },
  {
    id: 'hardwareDhcp',
    title: 'Hardware DHCP',
    desc: 'Give the PCs DHCP on VLAN 10.',
    commands: ['ip dhcp excluded-address 192.168.10.1 192.168.10.20', 'ip dhcp excluded-address 192.168.10.50 192.168.10.50', 'ip dhcp pool HARDWARE', 'network 192.168.10.0 255.255.255.0', 'default-router 192.168.10.1', 'dns-server 8.8.8.8', 'exit']
  },
  {
    id: 'phoneDhcp',
    title: 'Phone DHCP',
    desc: 'Give phones DHCP and option 150 on VLAN 20.',
    commands: ['ip dhcp excluded-address 192.168.20.1 192.168.20.20', 'ip dhcp excluded-address 192.168.20.10 192.168.20.10', 'ip dhcp pool PHONES', 'network 192.168.20.0 255.255.255.0', 'default-router 192.168.20.1', 'dns-server 8.8.8.8', 'option 150 ip 192.168.20.10', 'exit']
  },
  {
    id: 'printer',
    title: 'Add printer',
    desc: 'Place the printer on VLAN 10 with a static address.',
    commands: ['printer ip 192.168.10.50', 'printer gateway 192.168.10.1', 'printer online']
  },
  {
    id: 'natRoute',
    title: 'NAT and route',
    desc: 'Permit both VLANs, overload NAT, and set default route.',
    commands: ['access-list 10 permit 192.168.10.0 0.0.0.255', 'access-list 20 permit 192.168.20.0 0.0.0.255', 'ip nat inside source list 10 interface gigabitEthernet0/1 overload', 'ip nat inside source list 20 interface gigabitEthernet0/1 overload', 'ip route 0.0.0.0 0.0.0.0 10.0.0.2']
  },
  {
    id: 'firewall',
    title: 'Configure firewall',
    desc: 'Allow safe outbound traffic and block inbound traffic.',
    commands: ['firewall enable', 'firewall wan 10.0.0.2 255.255.255.252', 'firewall gateway 10.0.0.1', 'firewall allow vlan 10 outbound', 'firewall allow vlan 20 outbound', 'firewall allow tcp 80', 'firewall allow tcp 443', 'firewall allow udp 53', 'firewall allow udp 5060', 'firewall deny inbound any']
  },
  {
    id: 'saved',
    title: 'Save and test',
    desc: 'End config mode, save, and run network validation.',
    commands: ['end', 'write memory', 'test network']
  }
];

let difficulty = 'normal';
let state;
let history = [];
let historyIndex = -1;

function freshState() {
  return {
    mode: 'user',
    currentInterface: null,
    currentPool: null,
    currentVlan: null,
    hostname: 'Router',
    saved: false,
    privileged: false,
    router: {
      g00: { noIp: false, up: false },
      g0010: { dot1q: null, ip: null, mask: null, nat: null },
      g0020: { dot1q: null, ip: null, mask: null, nat: null },
      g01: { ip: null, mask: null, up: false, nat: null },
      defaultRoute: null,
      acl10: false,
      acl20: false,
      nat10: false,
      nat20: false
    },
    switch: {
      vlan10: { exists: false, name: null },
      vlan20: { exists: false, name: null },
      userPorts: { mode: null, accessVlan: null, voiceVlan: null, up: true },
      trunk: { mode: null, allowedVlans: [], up: false }
    },
    dhcp: {
      hardware: { poolName: null, network: null, mask: null, gateway: null, dns: null, excludedInfra: false, excludedPrinter: false },
      phones: { poolName: null, network: null, mask: null, gateway: null, dns: null, option150: null, excludedInfra: false, excludedTftp: false }
    },
    firewall: {
      enabled: false,
      wanIp: null,
      wanMask: null,
      gateway: null,
      allowVlan10: false,
      allowVlan20: false,
      allow80: false,
      allow443: false,
      allow53: false,
      allow5060: false,
      denyInbound: false
    },
    printer: { ip: null, gateway: null, online: false },
    pcs: employees.map((person, i) => ({
      id: `pc${i + 1}`,
      name: person.name,
      role: person.role,
      ip: null,
      gateway: null,
      dns: null,
      vlan: 10,
      online: false
    })),
    phones: employees.map((person, i) => ({
      id: `phone${i + 1}`,
      owner: person.name,
      ip: null,
      gateway: null,
      dns: null,
      tftp: null,
      vlan: 20,
      online: false
    }))
  };
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
  }[char]));
}

function print(text, className = '') {
  const line = document.createElement('div');
  if (className) line.className = className;
  line.innerHTML = escapeHtml(text);
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toastEl.classList.remove('show'), 2600);
}

function normalizeInterfaceName(name) {
  return name.toLowerCase().replace(/\s+/g, '').replace('fastethernet', 'fa').replace('gigabitethernet', 'gi');
}

function interfaceKey(name) {
  const n = normalizeInterfaceName(name);
  if (['gi0/0', 'g0/0'].includes(n)) return 'g00';
  if (['gi0/0.10', 'g0/0.10'].includes(n)) return 'g0010';
  if (['gi0/0.20', 'g0/0.20'].includes(n)) return 'g0020';
  if (['gi0/1', 'g0/1'].includes(n)) return 'g01';
  if (['fa0/24', 'f0/24'].includes(n)) return 'fa024';
  return null;
}

function isUserPortRange(name) {
  const n = normalizeInterfaceName(name);
  return ['fa0/1-5', 'fa0/1-0/5', 'f0/1-5'].includes(n) || n.includes('fa0/1-5');
}

function currentPrompt() {
  if (state.mode === 'privileged') return `${state.hostname}#`;
  if (state.mode === 'config') return `${state.hostname}(config)#`;
  if (state.mode === 'interface') return `${state.hostname}(config-if)#`;
  if (state.mode === 'dhcp') return `${state.hostname}(dhcp-config)#`;
  if (state.mode === 'vlan') return `${state.hostname}(config-vlan)#`;
  return `${state.hostname}>`;
}

function updatePrompt() {
  promptEl.textContent = currentPrompt();
}

function vlanStatus() {
  return state.switch.vlan10.exists && state.switch.vlan10.name === 'HARDWARE'
    && state.switch.vlan20.exists && state.switch.vlan20.name === 'PHONES';
}

function switchingStatus() {
  const allowed = state.switch.trunk.allowedVlans.includes(10) && state.switch.trunk.allowedVlans.includes(20);
  return vlanStatus()
    && state.switch.userPorts.mode === 'access'
    && state.switch.userPorts.accessVlan === 10
    && state.switch.userPorts.voiceVlan === 20
    && state.switch.trunk.mode === 'trunk'
    && allowed
    && state.switch.trunk.up;
}

function hardwareGatewayStatus() {
  return state.router.g00.noIp
    && state.router.g00.up
    && state.router.g0010.dot1q === 10
    && state.router.g0010.ip === '192.168.10.1'
    && state.router.g0010.mask === '255.255.255.0'
    && state.router.g0010.nat === 'inside';
}

function phoneGatewayStatus() {
  return state.router.g00.noIp
    && state.router.g00.up
    && state.router.g0020.dot1q === 20
    && state.router.g0020.ip === '192.168.20.1'
    && state.router.g0020.mask === '255.255.255.0'
    && state.router.g0020.nat === 'inside';
}

function wanStatus() {
  return state.router.g01.ip === '10.0.0.1'
    && state.router.g01.mask === '255.255.255.252'
    && state.router.g01.up
    && state.router.g01.nat === 'outside';
}

function hardwareDhcpStatus() {
  const p = state.dhcp.hardware;
  return p.poolName === 'HARDWARE'
    && p.network === '192.168.10.0'
    && p.mask === '255.255.255.0'
    && p.gateway === '192.168.10.1'
    && p.dns === '8.8.8.8'
    && p.excludedInfra
    && p.excludedPrinter;
}

function phoneDhcpStatus() {
  const p = state.dhcp.phones;
  return p.poolName === 'PHONES'
    && p.network === '192.168.20.0'
    && p.mask === '255.255.255.0'
    && p.gateway === '192.168.20.1'
    && p.dns === '8.8.8.8'
    && p.option150 === '192.168.20.10'
    && p.excludedInfra
    && p.excludedTftp;
}

function printerStatus() {
  return state.printer.ip === '192.168.10.50'
    && state.printer.gateway === '192.168.10.1'
    && state.printer.online;
}

function natRouteStatus() {
  return state.router.acl10
    && state.router.acl20
    && state.router.nat10
    && state.router.nat20
    && state.router.defaultRoute === '10.0.0.2';
}

function firewallStatus() {
  return state.firewall.enabled
    && state.firewall.wanIp === '10.0.0.2'
    && state.firewall.wanMask === '255.255.255.252'
    && state.firewall.gateway === '10.0.0.1'
    && state.firewall.allowVlan10
    && state.firewall.allowVlan20
    && state.firewall.allow80
    && state.firewall.allow443
    && state.firewall.allow53
    && state.firewall.allow5060
    && state.firewall.denyInbound;
}

function objectiveStatus() {
  return {
    privileged: state.privileged,
    hostname: state.hostname === 'BRANCH-R1',
    vlans: vlanStatus(),
    switching: switchingStatus(),
    subinterfaces: hardwareGatewayStatus() && phoneGatewayStatus(),
    wan: wanStatus(),
    hardwareDhcp: hardwareDhcpStatus(),
    phoneDhcp: phoneDhcpStatus(),
    printer: printerStatus(),
    natRoute: natRouteStatus(),
    firewall: firewallStatus(),
    saved: state.saved
  };
}

function allocateLeasesIfReady() {
  if (switchingStatus() && hardwareGatewayStatus() && hardwareDhcpStatus()) {
    state.pcs.forEach((pc, idx) => {
      pc.ip = `192.168.10.${21 + idx}`;
      pc.gateway = state.dhcp.hardware.gateway;
      pc.dns = state.dhcp.hardware.dns;
      pc.online = true;
    });
  } else {
    state.pcs.forEach(pc => {
      pc.ip = null; pc.gateway = null; pc.dns = null; pc.online = false;
    });
  }

  if (switchingStatus() && phoneGatewayStatus() && phoneDhcpStatus()) {
    state.phones.forEach((phone, idx) => {
      phone.ip = `192.168.20.${21 + idx}`;
      phone.gateway = state.dhcp.phones.gateway;
      phone.dns = state.dhcp.phones.dns;
      phone.tftp = state.dhcp.phones.option150;
      phone.online = true;
    });
  } else {
    state.phones.forEach(phone => {
      phone.ip = null; phone.gateway = null; phone.dns = null; phone.tftp = null; phone.online = false;
    });
  }
}

function scoreStatus() {
  const status = objectiveStatus();
  const earned = missionDefs.reduce((sum, m) => sum + (status[m.id] ? m.points : 0), 0);
  const total = missionDefs.reduce((sum, m) => sum + m.points, 0);
  return { status, earned, total, percent: Math.round((earned / total) * 100) };
}

function rankFor(percent) {
  if (percent >= 100) return 'Network Engineer';
  if (percent >= 85) return 'VLAN Specialist';
  if (percent >= 65) return 'Junior Admin';
  if (percent >= 35) return 'Help Desk Pro';
  return 'Intern Tech';
}

function updateDifficultyUI() {
  difficultyButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.difficulty === difficulty);
  });

  difficultyLabelEl.textContent = difficultyNames[difficulty];
  difficultyHelpEl.textContent = difficultyDescriptions[difficulty];
  easyBuilderEl.hidden = difficulty !== 'easy';
  guidePanelEl.hidden = difficulty === 'hard';

  hintBtn.disabled = difficulty === 'hard';
  hintBtn.textContent = difficulty === 'hard' ? 'Hint Locked' : 'Hint';
  demoBtn.disabled = difficulty === 'hard';
  demoBtn.textContent = difficulty === 'hard' ? 'Demo Locked' : 'Run Demo Config';
  input.placeholder = difficulty === 'hard' ? 'Hard mode: type commands from memory' : 'Type help or enable';
}

function runCommandSequence(commands, label = 'Easy command builder') {
  print(`--- ${label} ---`, 'system');
  const sequence = (commands[0] === 'enable' || commands[0] === 'end')
    ? commands
    : ['end', 'enable', 'configure terminal', ...commands];
  sequence.forEach(cmd => {
    handleCommand(cmd);
    updateUI();
  });
}

function renderEasyActions(status) {
  if (difficulty !== 'easy') {
    easyActionsEl.innerHTML = '';
    return;
  }

  easyActionsEl.innerHTML = easyActionDefs.map(action => {
    const done = status[action.id];
    return `<button class="easy-action ${done ? 'done' : ''}" type="button" data-easy-action="${escapeHtml(action.id)}">
      <strong>${done ? '✓ ' : ''}${escapeHtml(action.title)}</strong>
      <span>${escapeHtml(action.desc)}</span>
    </button>`;
  }).join('');
}

function setDifficulty(level) {
  if (!difficultyNames[level]) return;
  difficulty = level;
  resetLab();
  showToast(`${difficultyNames[level]} mode loaded.`);
}

function setDeviceStatus(id, status) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('online', 'warning', 'down');
  el.classList.add(status);
}

function updateUI() {
  allocateLeasesIfReady();
  const { status, percent } = scoreStatus();
  scoreEl.textContent = `${percent}%`;
  rankEl.textContent = `${difficultyNames[difficulty]} • ${rankFor(percent)}`;
  updatePrompt();

  document.getElementById('router-name').textContent = state.hostname === 'Router' ? 'Cisco Router' : state.hostname;
  const hardwareGw = state.router.g0010.ip ? `V10 ${state.router.g0010.ip}` : 'V10 pending';
  const phoneGw = state.router.g0020.ip ? `V20 ${state.router.g0020.ip}` : 'V20 pending';
  const wan = state.router.g01.ip ? `WAN ${state.router.g01.ip}${state.router.g01.up ? '' : ' down'}` : 'WAN pending';
  document.getElementById('router-ips').textContent = `${hardwareGw} • ${phoneGw} • ${wan}`;
  document.getElementById('firewall-ip').textContent = state.firewall.wanIp ? `WAN ${state.firewall.wanIp}` : 'WAN pending';
  document.getElementById('switch-status').textContent = status.switching ? 'Access + voice + trunk ready' : 'VLANs/trunk pending';

  const internetOk = status.wan && status.firewall && status.natRoute && state.pcs.every(pc => pc.online) && state.phones.every(phone => phone.online);
  setDeviceStatus('dev-internet', internetOk ? 'online' : 'warning');
  setDeviceStatus('dev-firewall', status.firewall ? 'online' : state.firewall.enabled ? 'warning' : 'down');
  setDeviceStatus('dev-router', status.subinterfaces && status.wan ? 'online' : status.subinterfaces || status.wan ? 'warning' : 'down');
  setDeviceStatus('dev-switch', status.switching ? 'online' : status.vlans ? 'warning' : 'down');

  endpointGrid.innerHTML = '';
  state.pcs.forEach((pc, idx) => {
    const card = document.createElement('article');
    card.className = `device ${pc.online ? 'online' : 'down'}`;
    card.innerHTML = `
      <span class="device-icon">💻</span>
      <h3>PC${idx + 1}: ${escapeHtml(pc.name)}</h3>
      <p>${escapeHtml(pc.role)}<br>${pc.ip || 'Waiting for VLAN 10 DHCP'}</p>
      <span class="badge">VLAN 10</span>
      <span class="status-dot"></span>
    `;
    endpointGrid.appendChild(card);
  });

  state.phones.forEach((phone, idx) => {
    const card = document.createElement('article');
    card.className = `device ${phone.online ? 'online' : 'down'}`;
    card.innerHTML = `
      <span class="device-icon">☎️</span>
      <h3>Phone${idx + 1}: ${escapeHtml(phone.owner)}</h3>
      <p>${phone.ip || 'Waiting for VLAN 20 DHCP'}<br>${phone.tftp ? `TFTP ${phone.tftp}` : 'Option 150 pending'}</p>
      <span class="badge voice">VLAN 20</span>
      <span class="status-dot"></span>
    `;
    endpointGrid.appendChild(card);
  });

  const printerCard = document.createElement('article');
  printerCard.className = `device ${status.printer && hardwareGatewayStatus() && switchingStatus() ? 'online' : state.printer.ip ? 'warning' : 'down'}`;
  printerCard.innerHTML = `
    <span class="device-icon">🖨️</span>
    <h3>Office Printer</h3>
    <p>${state.printer.ip || 'Static IP pending'}<br>${state.printer.gateway || 'Gateway pending'}</p>
    <span class="badge print">VLAN 10</span>
    <span class="status-dot"></span>
  `;
  endpointGrid.appendChild(printerCard);

  renderEasyActions(status);

  missionsEl.innerHTML = missionDefs.map(m => `
    <div class="mission ${status[m.id] ? 'done' : ''}">
      <span class="check">${status[m.id] ? '✓' : '·'}</span>
      <div><strong>${escapeHtml(m.title)}</strong><p>${escapeHtml(m.desc)}</p></div>
      <small>${m.points} pts</small>
    </div>
  `).join('');
}

function requireMode(command, allowedModes) {
  if (allowedModes.includes(state.mode)) return true;
  print(`% Command "${command}" is not valid in ${state.mode} mode. Try enable or configure terminal.`, 'bad');
  return false;
}

function currentPoolObject() {
  if (state.currentPool === 'HARDWARE') return state.dhcp.hardware;
  if (state.currentPool === 'PHONES') return state.dhcp.phones;
  return null;
}

function currentInterfaceObject() {
  const key = state.currentInterface;
  if (key === 'g00') return state.router.g00;
  if (key === 'g0010') return state.router.g0010;
  if (key === 'g0020') return state.router.g0020;
  if (key === 'g01') return state.router.g01;
  if (key === 'faUserRange') return state.switch.userPorts;
  if (key === 'fa024') return state.switch.trunk;
  return null;
}

function interfaceLabel(key = state.currentInterface) {
  const names = {
    g00: 'GigabitEthernet0/0',
    g0010: 'GigabitEthernet0/0.10',
    g0020: 'GigabitEthernet0/0.20',
    g01: 'GigabitEthernet0/1',
    faUserRange: 'FastEthernet0/1-5',
    fa024: 'FastEthernet0/24'
  };
  return names[key] || 'unknown interface';
}

function parseAllowedVlans(command) {
  const raw = command.substring(command.toLowerCase().indexOf('vlan') + 4).trim();
  return raw.split(',').map(v => Number(v.trim())).filter(v => Number.isFinite(v));
}

function runTests() {
  allocateLeasesIfReady();
  const status = objectiveStatus();
  const pcsReady = state.pcs.every(pc => pc.online && pc.gateway === '192.168.10.1' && pc.dns === '8.8.8.8');
  const phonesReady = state.phones.every(phone => phone.online && phone.gateway === '192.168.20.1' && phone.tftp === '192.168.20.10');
  const printerReady = status.printer && hardwareGatewayStatus() && switchingStatus();
  const internetReady = pcsReady && phonesReady && status.wan && status.firewall && status.natRoute;

  print('--- VLAN Network Validation Report ---', 'system');
  print(`${status.vlans ? 'PASS' : 'FAIL'}  VLAN 10 HARDWARE and VLAN 20 PHONES exist.`, status.vlans ? 'good' : 'bad');
  print(`${status.switching ? 'PASS' : 'FAIL'}  Switch user ports and trunk are correctly configured.`, status.switching ? 'good' : 'bad');
  print(`${hardwareGatewayStatus() ? 'PASS' : 'FAIL'}  VLAN 10 gateway G0/0.10 is configured.`, hardwareGatewayStatus() ? 'good' : 'bad');
  print(`${phoneGatewayStatus() ? 'PASS' : 'FAIL'}  VLAN 20 gateway G0/0.20 is configured.`, phoneGatewayStatus() ? 'good' : 'bad');
  print(`${status.wan ? 'PASS' : 'FAIL'}  WAN link to firewall is configured.`, status.wan ? 'good' : 'bad');
  print(`${pcsReady ? 'PASS' : 'FAIL'}  Five PCs received VLAN 10 DHCP leases.`, pcsReady ? 'good' : 'bad');
  print(`${phonesReady ? 'PASS' : 'FAIL'}  Five phones received VLAN 20 DHCP leases and option 150.`, phonesReady ? 'good' : 'bad');
  print(`${printerReady ? 'PASS' : 'FAIL'}  PCs can reach the VLAN 10 office printer.`, printerReady ? 'good' : 'bad');
  print(`${internetReady ? 'PASS' : 'FAIL'}  VLAN 10 and VLAN 20 can reach the internet through NAT and firewall.`, internetReady ? 'good' : 'bad');
  print(`${status.saved ? 'PASS' : 'WARN'}  Configuration saved to startup-config.`, status.saved ? 'good' : 'warn');

  if (printerReady && internetReady && status.saved) {
    print('MISSION COMPLETE: The two-VLAN five-person business network is fully functional.', 'good');
    showToast('Mission complete — VLAN business network is live.');
  } else {
    print('Keep configuring. Use hint, show commands, or Run Demo Config if you need help.', 'warn');
  }
  updateUI();
}

function showHelp() {
  print(`Available commands:
  enable
  configure terminal
  hostname BRANCH-R1
  vlan 10 | vlan 20
  name HARDWARE | name PHONES
  interface range fa0/1-5
  interface fa0/24
  interface gigabitEthernet0/0 | interface gigabitEthernet0/0.10 | interface gigabitEthernet0/0.20 | interface gigabitEthernet0/1
  switchport mode access | switchport mode trunk
  switchport access vlan 10
  switchport voice vlan 20
  switchport trunk allowed vlan 10,20
  no ip address
  encapsulation dot1Q 10 | encapsulation dot1Q 20
  ip address <ip> <mask>
  no shutdown
  ip nat inside | ip nat outside
  ip dhcp excluded-address <start> <end>
  ip dhcp pool HARDWARE | ip dhcp pool PHONES
  network <network> <mask>
  default-router <gateway>
  dns-server 8.8.8.8
  option 150 ip 192.168.20.10
  access-list 10 permit 192.168.10.0 0.0.0.255
  access-list 20 permit 192.168.20.0 0.0.0.255
  ip nat inside source list 10 interface gigabitEthernet0/1 overload
  ip nat inside source list 20 interface gigabitEthernet0/1 overload
  ip route 0.0.0.0 0.0.0.0 10.0.0.2
  printer ip 192.168.10.50
  printer gateway 192.168.10.1
  printer online
  firewall enable
  firewall wan 10.0.0.2 255.255.255.252
  firewall gateway 10.0.0.1
  firewall allow vlan 10 outbound | firewall allow vlan 20 outbound
  firewall allow tcp 80 | firewall allow tcp 443 | firewall allow udp 53 | firewall allow udp 5060
  firewall deny inbound any
  show vlan brief | show interfaces trunk | show ip interface brief | show running-config | show ip dhcp binding | show ip route | show nat | show firewall
  ping 192.168.10.1 | ping 192.168.20.1 | ping 192.168.10.50 | ping 8.8.8.8
  test hardware | test phones | test network
  write memory
  reset lab`, 'system');
}

function showRunningConfig() {
  const r = state.router;
  const s = state.switch;
  const d = state.dhcp;
  const f = state.firewall;
  print(`Building configuration...

hostname ${state.hostname}
!
vlan 10
 name ${s.vlan10.name || '(not set)'}
vlan 20
 name ${s.vlan20.name || '(not set)'}
!
interface FastEthernet0/1-5
 switchport mode ${s.userPorts.mode || '(not set)'}
 switchport access vlan ${s.userPorts.accessVlan || '(not set)'}
 switchport voice vlan ${s.userPorts.voiceVlan || '(not set)'}
!
interface FastEthernet0/24
 switchport mode ${s.trunk.mode || '(not set)'}
 switchport trunk allowed vlan ${s.trunk.allowedVlans.length ? s.trunk.allowedVlans.join(',') : '(not set)'}
 ${s.trunk.up ? 'no shutdown' : 'shutdown'}
!
interface GigabitEthernet0/0
 ${r.g00.noIp ? 'no ip address' : '(ip address not removed)'}
 ${r.g00.up ? 'no shutdown' : 'shutdown'}
!
interface GigabitEthernet0/0.10
 encapsulation dot1Q ${r.g0010.dot1q || '(not set)'}
 ip address ${r.g0010.ip || '(not set)'} ${r.g0010.mask || ''}
 ip nat ${r.g0010.nat || '(not set)'}
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q ${r.g0020.dot1q || '(not set)'}
 ip address ${r.g0020.ip || '(not set)'} ${r.g0020.mask || ''}
 ip nat ${r.g0020.nat || '(not set)'}
!
interface GigabitEthernet0/1
 ip address ${r.g01.ip || '(not set)'} ${r.g01.mask || ''}
 ${r.g01.up ? 'no shutdown' : 'shutdown'}
 ip nat ${r.g01.nat || '(not set)'}
!
ip dhcp pool ${d.hardware.poolName || '(hardware pool not set)'}
 network ${d.hardware.network || '(not set)'} ${d.hardware.mask || ''}
 default-router ${d.hardware.gateway || '(not set)'}
 dns-server ${d.hardware.dns || '(not set)'}
!
ip dhcp pool ${d.phones.poolName || '(phone pool not set)'}
 network ${d.phones.network || '(not set)'} ${d.phones.mask || ''}
 default-router ${d.phones.gateway || '(not set)'}
 dns-server ${d.phones.dns || '(not set)'}
 option 150 ip ${d.phones.option150 || '(not set)'}
!
${r.acl10 ? 'access-list 10 permit 192.168.10.0 0.0.0.255' : '! ACL 10 missing'}
${r.acl20 ? 'access-list 20 permit 192.168.20.0 0.0.0.255' : '! ACL 20 missing'}
${r.nat10 ? 'ip nat inside source list 10 interface GigabitEthernet0/1 overload' : '! NAT for VLAN 10 missing'}
${r.nat20 ? 'ip nat inside source list 20 interface GigabitEthernet0/1 overload' : '! NAT for VLAN 20 missing'}
ip route 0.0.0.0 0.0.0.0 ${r.defaultRoute || '(not set)'}
!
printer ip ${state.printer.ip || '(not set)'}
printer gateway ${state.printer.gateway || '(not set)'}
printer ${state.printer.online ? 'online' : 'offline'}
!
firewall ${f.enabled ? 'enabled' : 'disabled'}
firewall wan ${f.wanIp || '(not set)'} ${f.wanMask || ''}
firewall gateway ${f.gateway || '(not set)'}
`, 'system');
}

function showInterfaceBrief() {
  print(`Interface              IP-Address       OK? Method Status
GigabitEthernet0/0      ${state.router.g00.noIp ? 'unassigned' : 'needs no ip'}     YES manual ${state.router.g00.up ? 'up' : 'administratively down'}
GigabitEthernet0/0.10   ${state.router.g0010.ip || 'unassigned'}     YES manual ${hardwareGatewayStatus() ? 'up' : 'down'}
GigabitEthernet0/0.20   ${state.router.g0020.ip || 'unassigned'}     YES manual ${phoneGatewayStatus() ? 'up' : 'down'}
GigabitEthernet0/1      ${state.router.g01.ip || 'unassigned'}     YES manual ${wanStatus() ? 'up' : 'down'}`, 'system');
}

function showVlanBrief() {
  print(`VLAN Name       Status    Ports
10   ${state.switch.vlan10.name || '(not named)'} ${state.switch.vlan10.exists ? 'active' : 'missing'}   ${state.switch.userPorts.accessVlan === 10 ? 'Fa0/1-5' : '-'}
20   ${state.switch.vlan20.name || '(not named)'} ${state.switch.vlan20.exists ? 'active' : 'missing'}   ${state.switch.userPorts.voiceVlan === 20 ? 'voice on Fa0/1-5' : '-'}`, 'system');
}

function showTrunk() {
  const allowed = state.switch.trunk.allowedVlans.length ? state.switch.trunk.allowedVlans.join(',') : '(none)';
  print(`Port      Mode       Status       Native vlan  Allowed VLANs
Fa0/24    ${state.switch.trunk.mode || 'not set'}    ${state.switch.trunk.up ? 'trunking' : 'down'}      1            ${allowed}`, 'system');
}

function showDhcpBindings() {
  allocateLeasesIfReady();
  const rows = [];
  state.pcs.forEach((pc, idx) => rows.push(`${pc.ip || 'pending'}     PC${idx + 1}-${pc.name}      VLAN10-HARDWARE`));
  state.phones.forEach((phone, idx) => rows.push(`${phone.ip || 'pending'}     PHONE${idx + 1}-${phone.owner}   VLAN20-PHONES`));
  print(`IP address       Client-ID        Pool
${rows.join('\n')}`, 'system');
}

function showRoute() {
  print(`Gateway of last resort is ${state.router.defaultRoute || 'not set'}
C    192.168.10.0/24 is directly connected, GigabitEthernet0/0.10 ${hardwareGatewayStatus() ? '' : '(not active)'}
C    192.168.20.0/24 is directly connected, GigabitEthernet0/0.20 ${phoneGatewayStatus() ? '' : '(not active)'}
C    10.0.0.0/30 is directly connected, GigabitEthernet0/1 ${wanStatus() ? '' : '(not active)'}
S*   0.0.0.0/0 [1/0] via ${state.router.defaultRoute || '(missing)'}`, 'system');
}

function showNat() {
  print(`NAT Status
VLAN 10 inside: ${state.router.g0010.nat === 'inside' ? 'yes' : 'no'}
VLAN 20 inside: ${state.router.g0020.nat === 'inside' ? 'yes' : 'no'}
WAN outside: ${state.router.g01.nat === 'outside' ? 'yes' : 'no'}
ACL 10: ${state.router.acl10 ? 'permit 192.168.10.0/24' : 'missing'}
ACL 20: ${state.router.acl20 ? 'permit 192.168.20.0/24' : 'missing'}
Overload VLAN 10: ${state.router.nat10 ? 'enabled' : 'missing'}
Overload VLAN 20: ${state.router.nat20 ? 'enabled' : 'missing'}`, 'system');
}

function showFirewall() {
  const f = state.firewall;
  print(`Firewall Status
Enabled: ${f.enabled ? 'yes' : 'no'}
WAN: ${f.wanIp || '(not set)'} ${f.wanMask || ''}
Gateway: ${f.gateway || '(not set)'}
Allow VLAN 10 outbound: ${f.allowVlan10 ? 'yes' : 'no'}
Allow VLAN 20 outbound: ${f.allowVlan20 ? 'yes' : 'no'}
Allow TCP 80: ${f.allow80 ? 'yes' : 'no'}
Allow TCP 443: ${f.allow443 ? 'yes' : 'no'}
Allow UDP 53: ${f.allow53 ? 'yes' : 'no'}
Allow UDP 5060 voice: ${f.allow5060 ? 'yes' : 'no'}
Deny inbound any: ${f.denyInbound ? 'yes' : 'no'}`, 'system');
}

function hint() {
  const status = objectiveStatus();
  const hints = [
    ['privileged', 'Start with: enable'],
    ['hostname', 'Go to configure terminal, then type: hostname BRANCH-R1'],
    ['vlans', 'Create VLANs: vlan 10 / name HARDWARE and vlan 20 / name PHONES.'],
    ['switching', 'Set Fa0/1-5 as access VLAN 10 with voice VLAN 20, then set Fa0/24 as trunk allowed VLANs 10,20.'],
    ['subinterfaces', 'Configure router-on-a-stick: G0/0 no ip/no shut, G0/0.10 dot1Q 10 192.168.10.1, and G0/0.20 dot1Q 20 192.168.20.1.'],
    ['wan', 'Configure G0/1 as 10.0.0.1 255.255.255.252, no shutdown, and ip nat outside.'],
    ['hardwareDhcp', 'Create DHCP pool HARDWARE for 192.168.10.0/24 with gateway 192.168.10.1 and DNS 8.8.8.8.'],
    ['phoneDhcp', 'Create DHCP pool PHONES for 192.168.20.0/24 with gateway 192.168.20.1, DNS 8.8.8.8, and option 150 ip 192.168.20.10.'],
    ['printer', 'Set printer ip 192.168.10.50, printer gateway 192.168.10.1, then printer online.'],
    ['natRoute', 'Add ACLs 10 and 20, NAT overload for both lists through G0/1, and default route to 10.0.0.2.'],
    ['firewall', 'Enable the firewall, set WAN 10.0.0.2/30, gateway 10.0.0.1, allow VLAN 10/20 outbound, web, DNS, UDP 5060, and deny inbound.'],
    ['saved', 'Save it with: write memory']
  ];
  const next = hints.find(([id]) => !status[id]);
  print(next ? `Hint: ${next[1]}` : 'All missions are complete. Run test network to verify.', 'warn');
}

function handleShow(lower) {
  if (lower === 'show running-config' || lower === 'show run') { showRunningConfig(); return true; }
  if (lower === 'show ip interface brief' || lower === 'show ip int brief') { showInterfaceBrief(); return true; }
  if (lower === 'show vlan brief') { showVlanBrief(); return true; }
  if (lower === 'show interfaces trunk') { showTrunk(); return true; }
  if (lower === 'show ip dhcp binding') { showDhcpBindings(); return true; }
  if (lower === 'show ip route') { showRoute(); return true; }
  if (lower === 'show nat') { showNat(); return true; }
  if (lower === 'show firewall') { showFirewall(); return true; }
  return false;
}

function handlePing(target) {
  allocateLeasesIfReady();
  const s = objectiveStatus();
  if (target === '192.168.10.1') {
    const ok = hardwareGatewayStatus() && switchingStatus();
    print(ok ? '!!!!! Success rate is 100 percent, VLAN 10 gateway reachable.' : '..... Success rate is 0 percent, VLAN 10 gateway is not ready.', ok ? 'good' : 'bad');
    return;
  }
  if (target === '192.168.20.1') {
    const ok = phoneGatewayStatus() && switchingStatus();
    print(ok ? '!!!!! Success rate is 100 percent, VLAN 20 gateway reachable.' : '..... Success rate is 0 percent, VLAN 20 gateway is not ready.', ok ? 'good' : 'bad');
    return;
  }
  if (target === '192.168.10.50' || target === 'printer') {
    const ok = s.printer && hardwareGatewayStatus() && switchingStatus() && state.pcs.every(pc => pc.online);
    print(ok ? '!!!!! Success rate is 100 percent, printer reachable from Hardware VLAN.' : '..... Success rate is 0 percent, check VLAN 10, DHCP, and printer gateway.', ok ? 'good' : 'bad');
    return;
  }
  if (target === '8.8.8.8' || target === 'internet') {
    const ok = s.wan && s.firewall && s.natRoute && state.pcs.every(pc => pc.online) && state.phones.every(phone => phone.online);
    print(ok ? '!!!!! Success rate is 100 percent, internet reachable from both VLANs.' : '..... Success rate is 0 percent, check WAN, default route, NAT, firewall, and DHCP.', ok ? 'good' : 'bad');
    return;
  }
  print('Ping target not part of this lab. Try 192.168.10.1, 192.168.20.1, 192.168.10.50, or 8.8.8.8.', 'warn');
}

function handleCommand(rawCommand) {
  const command = rawCommand.trim();
  if (!command) return;
  const lower = command.toLowerCase();
  print(`${currentPrompt()} ${command}`, 'cmd');

  if (lower === 'help' || lower === '?') {
    if (difficulty === 'hard') {
      print('Hard mode: help is locked. Use the network specs and your own command knowledge.', 'warn');
    } else {
      showHelp();
    }
    return;
  }
  if (lower === 'hint') {
    if (difficulty === 'hard') {
      print('Hard mode: hints are locked.', 'warn');
    } else {
      hint();
    }
    return;
  }
  if (lower === 'reset lab') { resetLab(); return; }

  if (lower === 'enable' || lower === 'en') {
    state.mode = 'privileged';
    state.privileged = true;
    print('Privileged EXEC mode enabled.', 'good');
    return;
  }

  if (lower === 'disable') {
    state.mode = 'user';
    print('Returned to user EXEC mode.', 'system');
    return;
  }

  if (lower === 'configure terminal' || lower === 'conf t') {
    if (!requireMode(command, ['privileged'])) return;
    state.mode = 'config';
    print('Enter configuration commands, one per line. End with CNTL/Z or end.', 'system');
    return;
  }

  if (lower === 'end') {
    state.mode = state.privileged ? 'privileged' : 'user';
    state.currentInterface = null;
    state.currentPool = null;
    state.currentVlan = null;
    print('Returned to privileged EXEC mode.', 'system');
    return;
  }

  if (lower === 'exit') {
    if (['interface', 'dhcp', 'vlan'].includes(state.mode)) {
      state.mode = 'config';
      state.currentInterface = null;
      state.currentPool = null;
      state.currentVlan = null;
      print('Exit to global configuration mode.', 'system');
    } else if (state.mode === 'config') {
      state.mode = state.privileged ? 'privileged' : 'user';
      print('Exit to privileged EXEC mode.', 'system');
    } else if (state.mode === 'privileged') {
      state.mode = 'user';
      print('Exit to user EXEC mode.', 'system');
    }
    return;
  }

  if (lower === 'write memory' || lower === 'wr mem' || lower === 'copy running-config startup-config') {
    if (!requireMode(command, ['privileged'])) return;
    state.saved = true;
    print('Building configuration... [OK]', 'good');
    return;
  }

  if (lower === 'test network') { runTests(); return; }
  if (lower === 'test hardware') {
    allocateLeasesIfReady();
    const ok = state.pcs.every(pc => pc.online) && printerStatus() && hardwareGatewayStatus() && switchingStatus();
    print(ok ? 'PASS: Hardware VLAN PCs and printer are functional.' : 'FAIL: Check VLAN 10, switch access ports, G0/0.10, DHCP, and printer settings.', ok ? 'good' : 'bad');
    return;
  }
  if (lower === 'test phones') {
    allocateLeasesIfReady();
    const ok = state.phones.every(phone => phone.online) && phoneGatewayStatus() && switchingStatus();
    print(ok ? 'PASS: Phone VLAN devices received DHCP, gateway, and option 150.' : 'FAIL: Check VLAN 20, switch voice VLAN, G0/0.20, DHCP, and option 150.', ok ? 'good' : 'bad');
    return;
  }

  if (handleShow(lower)) return;

  if (lower.startsWith('ping ')) {
    handlePing(lower.split(/\s+/)[1]);
    return;
  }

  if (lower.startsWith('hostname ')) {
    if (!requireMode(command, ['config'])) return;
    const name = command.split(/\s+/)[1];
    state.hostname = name;
    print(`Hostname set to ${name}.`, name === 'BRANCH-R1' ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('vlan ')) {
    if (!requireMode(command, ['config'])) return;
    const vlanId = Number(command.split(/\s+/)[1]);
    if (vlanId !== 10 && vlanId !== 20) {
      print('% This lab only requires VLAN 10 and VLAN 20.', 'bad');
      return;
    }
    state.currentVlan = vlanId;
    state.mode = 'vlan';
    if (vlanId === 10) state.switch.vlan10.exists = true;
    if (vlanId === 20) state.switch.vlan20.exists = true;
    print(`VLAN ${vlanId} created.`, 'good');
    return;
  }

  if (lower.startsWith('name ')) {
    if (!requireMode(command, ['vlan'])) return;
    const name = command.split(/\s+/).slice(1).join(' ').toUpperCase();
    if (state.currentVlan === 10) {
      state.switch.vlan10.name = name;
      print(`VLAN 10 name set to ${name}.`, name === 'HARDWARE' ? 'good' : 'warn');
    } else if (state.currentVlan === 20) {
      state.switch.vlan20.name = name;
      print(`VLAN 20 name set to ${name}.`, name === 'PHONES' ? 'good' : 'warn');
    }
    return;
  }

  if (lower.startsWith('interface range ')) {
    if (!requireMode(command, ['config'])) return;
    const ifaceName = command.substring(command.toLowerCase().indexOf('range') + 5).trim();
    if (!isUserPortRange(ifaceName)) {
      print('% This lab expects interface range fa0/1-5 for user desk ports.', 'bad');
      return;
    }
    state.mode = 'interface';
    state.currentInterface = 'faUserRange';
    print('Configuring FastEthernet0/1-5 user desk ports.', 'system');
    return;
  }

  if (lower.startsWith('interface ')) {
    if (!requireMode(command, ['config'])) return;
    const ifaceName = command.substring(command.indexOf(' ') + 1).trim();
    const key = interfaceKey(ifaceName);
    if (!key) {
      print('% Unknown interface. Use G0/0, G0/0.10, G0/0.20, G0/1, Fa0/24, or interface range Fa0/1-5.', 'bad');
      return;
    }
    state.mode = 'interface';
    state.currentInterface = key;
    print(`Configuring ${interfaceLabel(key)}.`, 'system');
    return;
  }

  if (lower === 'switchport mode access') {
    if (!requireMode(command, ['interface'])) return;
    if (state.currentInterface !== 'faUserRange') {
      print('% Access mode belongs on interface range fa0/1-5 in this lab.', 'warn');
      return;
    }
    state.switch.userPorts.mode = 'access';
    print('User desk ports set to access mode.', 'good');
    return;
  }

  if (lower === 'switchport mode trunk') {
    if (!requireMode(command, ['interface'])) return;
    if (state.currentInterface !== 'fa024') {
      print('% Trunk mode belongs on Fa0/24 in this lab.', 'warn');
      return;
    }
    state.switch.trunk.mode = 'trunk';
    print('Fa0/24 set to trunk mode.', 'good');
    return;
  }

  if (lower.startsWith('switchport access vlan ')) {
    if (!requireMode(command, ['interface'])) return;
    const vlan = Number(command.split(/\s+/)[3]);
    if (state.currentInterface !== 'faUserRange') {
      print('% Access VLAN should be applied to interface range fa0/1-5.', 'warn');
      return;
    }
    state.switch.userPorts.accessVlan = vlan;
    print(`User desk access VLAN set to ${vlan}.`, vlan === 10 ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('switchport voice vlan ')) {
    if (!requireMode(command, ['interface'])) return;
    const vlan = Number(command.split(/\s+/)[3]);
    if (state.currentInterface !== 'faUserRange') {
      print('% Voice VLAN should be applied to interface range fa0/1-5.', 'warn');
      return;
    }
    state.switch.userPorts.voiceVlan = vlan;
    print(`User desk voice VLAN set to ${vlan}.`, vlan === 20 ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('switchport trunk allowed vlan ')) {
    if (!requireMode(command, ['interface'])) return;
    if (state.currentInterface !== 'fa024') {
      print('% Trunk allowed VLANs should be applied to Fa0/24.', 'warn');
      return;
    }
    state.switch.trunk.allowedVlans = parseAllowedVlans(command);
    const ok = state.switch.trunk.allowedVlans.includes(10) && state.switch.trunk.allowedVlans.includes(20);
    print(`Trunk allowed VLANs set to ${state.switch.trunk.allowedVlans.join(',') || '(none)'}.`, ok ? 'good' : 'warn');
    return;
  }

  if (lower === 'no ip address') {
    if (!requireMode(command, ['interface'])) return;
    if (state.currentInterface !== 'g00') {
      print('% In this lab, no ip address is only needed on parent interface G0/0.', 'warn');
      return;
    }
    state.router.g00.noIp = true;
    print('Parent interface G0/0 has no IP address, ready for subinterfaces.', 'good');
    return;
  }

  if (lower.startsWith('encapsulation dot1q ')) {
    if (!requireMode(command, ['interface'])) return;
    if (!['g0010', 'g0020'].includes(state.currentInterface)) {
      print('% Encapsulation dot1Q belongs on G0/0.10 or G0/0.20.', 'bad');
      return;
    }
    const vlan = Number(command.split(/\s+/)[2]);
    state.router[state.currentInterface].dot1q = vlan;
    const ok = (state.currentInterface === 'g0010' && vlan === 10) || (state.currentInterface === 'g0020' && vlan === 20);
    print(`${interfaceLabel()} set to dot1Q VLAN ${vlan}.`, ok ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('ip address ')) {
    if (!requireMode(command, ['interface'])) return;
    const [, , ip, mask] = command.split(/\s+/);
    if (!ip || !mask) {
      print('% Usage: ip address <ip> <mask>', 'bad');
      return;
    }
    if (!['g0010', 'g0020', 'g01'].includes(state.currentInterface)) {
      print('% IP address should be placed on G0/0.10, G0/0.20, or G0/1 in this lab.', 'warn');
      return;
    }
    const iface = currentInterfaceObject();
    iface.ip = ip;
    iface.mask = mask;
    const ok = (state.currentInterface === 'g0010' && ip === '192.168.10.1' && mask === '255.255.255.0')
      || (state.currentInterface === 'g0020' && ip === '192.168.20.1' && mask === '255.255.255.0')
      || (state.currentInterface === 'g01' && ip === '10.0.0.1' && mask === '255.255.255.252');
    print(`IP address set to ${ip} ${mask}.`, ok ? 'good' : 'warn');
    return;
  }

  if (lower === 'no shutdown') {
    if (!requireMode(command, ['interface'])) return;
    if (state.currentInterface === 'g00') {
      state.router.g00.up = true;
      print('G0/0 changed state to up.', 'good');
      return;
    }
    if (state.currentInterface === 'g01') {
      state.router.g01.up = true;
      print('G0/1 changed state to up.', 'good');
      return;
    }
    if (state.currentInterface === 'fa024') {
      state.switch.trunk.up = true;
      print('Fa0/24 trunk link changed state to up.', 'good');
      return;
    }
    if (state.currentInterface === 'faUserRange') {
      state.switch.userPorts.up = true;
      print('User desk ports changed state to up.', 'good');
      return;
    }
    print(`${interfaceLabel()} does not require no shutdown in this simulation, but it is accepted.`, 'system');
    return;
  }

  if (lower === 'shutdown') {
    if (!requireMode(command, ['interface'])) return;
    const iface = currentInterfaceObject();
    if (iface && Object.prototype.hasOwnProperty.call(iface, 'up')) iface.up = false;
    print(`${interfaceLabel()} administratively down.`, 'warn');
    return;
  }

  if (lower === 'ip nat inside' || lower === 'ip nat outside') {
    if (!requireMode(command, ['interface'])) return;
    const natRole = lower.endsWith('inside') ? 'inside' : 'outside';
    if (natRole === 'inside' && !['g0010', 'g0020'].includes(state.currentInterface)) {
      print('% NAT inside belongs on the VLAN subinterfaces G0/0.10 and G0/0.20.', 'warn');
      return;
    }
    if (natRole === 'outside' && state.currentInterface !== 'g01') {
      print('% NAT outside belongs on G0/1.', 'warn');
      return;
    }
    state.router[state.currentInterface].nat = natRole;
    print(`${interfaceLabel()} marked as NAT ${natRole}.`, 'good');
    return;
  }

  if (lower.startsWith('ip dhcp excluded-address ')) {
    if (!requireMode(command, ['config'])) return;
    if (lower === 'ip dhcp excluded-address 192.168.10.1 192.168.10.20') {
      state.dhcp.hardware.excludedInfra = true;
      print('Reserved VLAN 10 gateway and infrastructure range.', 'good');
    } else if (lower === 'ip dhcp excluded-address 192.168.10.50 192.168.10.50') {
      state.dhcp.hardware.excludedPrinter = true;
      print('Reserved printer static address on VLAN 10.', 'good');
    } else if (lower === 'ip dhcp excluded-address 192.168.20.1 192.168.20.20') {
      state.dhcp.phones.excludedInfra = true;
      print('Reserved VLAN 20 gateway and phone infrastructure range.', 'good');
    } else if (lower === 'ip dhcp excluded-address 192.168.20.10 192.168.20.10') {
      state.dhcp.phones.excludedTftp = true;
      print('Reserved voice TFTP/option 150 server address.', 'good');
    } else {
      print('Exclusion accepted, but it does not match a mission requirement.', 'warn');
    }
    return;
  }

  if (lower.startsWith('ip dhcp pool ')) {
    if (!requireMode(command, ['config'])) return;
    const poolName = command.split(/\s+/).slice(3).join(' ').trim().toUpperCase();
    if (!['HARDWARE', 'PHONES'].includes(poolName)) {
      print('% This lab requires DHCP pools named HARDWARE and PHONES.', 'warn');
    }
    state.currentPool = poolName;
    state.mode = 'dhcp';
    const pool = currentPoolObject();
    if (pool) pool.poolName = poolName;
    print(`DHCP pool ${poolName} created.`, ['HARDWARE', 'PHONES'].includes(poolName) ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('network ')) {
    if (!requireMode(command, ['dhcp'])) return;
    const [, network, mask] = command.split(/\s+/);
    const pool = currentPoolObject();
    if (!pool) { print('% Select DHCP pool HARDWARE or PHONES first.', 'bad'); return; }
    pool.network = network;
    pool.mask = mask;
    const ok = (state.currentPool === 'HARDWARE' && network === '192.168.10.0' && mask === '255.255.255.0')
      || (state.currentPool === 'PHONES' && network === '192.168.20.0' && mask === '255.255.255.0');
    print(`DHCP ${state.currentPool} network set to ${network} ${mask}.`, ok ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('default-router ')) {
    if (!requireMode(command, ['dhcp'])) return;
    const gateway = command.split(/\s+/)[1];
    const pool = currentPoolObject();
    if (!pool) { print('% Select DHCP pool HARDWARE or PHONES first.', 'bad'); return; }
    pool.gateway = gateway;
    const ok = (state.currentPool === 'HARDWARE' && gateway === '192.168.10.1')
      || (state.currentPool === 'PHONES' && gateway === '192.168.20.1');
    print(`DHCP ${state.currentPool} default gateway set to ${gateway}.`, ok ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('dns-server ')) {
    if (!requireMode(command, ['dhcp'])) return;
    const dns = command.split(/\s+/)[1];
    const pool = currentPoolObject();
    if (!pool) { print('% Select DHCP pool HARDWARE or PHONES first.', 'bad'); return; }
    pool.dns = dns;
    print(`DHCP ${state.currentPool} DNS server set to ${dns}.`, dns === '8.8.8.8' ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('option 150 ip ')) {
    if (!requireMode(command, ['dhcp'])) return;
    const ip = command.split(/\s+/)[3];
    const pool = currentPoolObject();
    if (!pool || state.currentPool !== 'PHONES') {
      print('% Option 150 belongs in DHCP pool PHONES.', 'bad');
      return;
    }
    pool.option150 = ip;
    print(`Phone TFTP option 150 set to ${ip}.`, ip === '192.168.20.10' ? 'good' : 'warn');
    return;
  }

  if (lower === 'access-list 10 permit 192.168.10.0 0.0.0.255') {
    if (!requireMode(command, ['config'])) return;
    state.router.acl10 = true;
    print('ACL 10 now permits VLAN 10 Hardware subnet.', 'good');
    return;
  }

  if (lower === 'access-list 20 permit 192.168.20.0 0.0.0.255') {
    if (!requireMode(command, ['config'])) return;
    state.router.acl20 = true;
    print('ACL 20 now permits VLAN 20 Phones subnet.', 'good');
    return;
  }

  if (lower === 'ip nat inside source list 10 interface gigabitethernet0/1 overload' || lower === 'ip nat inside source list 10 interface g0/1 overload') {
    if (!requireMode(command, ['config'])) return;
    state.router.nat10 = true;
    print('NAT overload enabled for VLAN 10 Hardware.', 'good');
    return;
  }

  if (lower === 'ip nat inside source list 20 interface gigabitethernet0/1 overload' || lower === 'ip nat inside source list 20 interface g0/1 overload') {
    if (!requireMode(command, ['config'])) return;
    state.router.nat20 = true;
    print('NAT overload enabled for VLAN 20 Phones.', 'good');
    return;
  }

  if (lower.startsWith('ip route 0.0.0.0 0.0.0.0 ')) {
    if (!requireMode(command, ['config'])) return;
    const nextHop = command.split(/\s+/)[4];
    state.router.defaultRoute = nextHop;
    print(`Default route set to ${nextHop}.`, nextHop === '10.0.0.2' ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('printer ip ')) {
    if (!requireMode(command, ['config', 'privileged'])) return;
    const ip = command.split(/\s+/)[2];
    state.printer.ip = ip;
    print(`Printer static IP set to ${ip}.`, ip === '192.168.10.50' ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('printer gateway ')) {
    if (!requireMode(command, ['config', 'privileged'])) return;
    const gateway = command.split(/\s+/)[2];
    state.printer.gateway = gateway;
    print(`Printer gateway set to ${gateway}.`, gateway === '192.168.10.1' ? 'good' : 'warn');
    return;
  }

  if (lower === 'printer online') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.printer.online = true;
    print('Printer is online and ready for Hardware VLAN traffic.', 'good');
    return;
  }

  if (lower === 'firewall enable') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.firewall.enabled = true;
    print('Firewall enabled.', 'good');
    return;
  }

  if (lower.startsWith('firewall wan ')) {
    if (!requireMode(command, ['config', 'privileged'])) return;
    const parts = command.split(/\s+/);
    state.firewall.wanIp = parts[2];
    state.firewall.wanMask = parts[3];
    print(`Firewall WAN set to ${parts[2]} ${parts[3]}.`, parts[2] === '10.0.0.2' && parts[3] === '255.255.255.252' ? 'good' : 'warn');
    return;
  }

  if (lower.startsWith('firewall gateway ')) {
    if (!requireMode(command, ['config', 'privileged'])) return;
    const gateway = command.split(/\s+/)[2];
    state.firewall.gateway = gateway;
    print(`Firewall gateway set to ${gateway}.`, gateway === '10.0.0.1' ? 'good' : 'warn');
    return;
  }

  if (lower === 'firewall allow vlan 10 outbound') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.firewall.allowVlan10 = true;
    print('Firewall allows VLAN 10 outbound.', 'good');
    return;
  }

  if (lower === 'firewall allow vlan 20 outbound') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.firewall.allowVlan20 = true;
    print('Firewall allows VLAN 20 outbound.', 'good');
    return;
  }

  if (lower === 'firewall allow tcp 80') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.firewall.allow80 = true;
    print('Firewall allows HTTP outbound.', 'good');
    return;
  }

  if (lower === 'firewall allow tcp 443') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.firewall.allow443 = true;
    print('Firewall allows HTTPS outbound.', 'good');
    return;
  }

  if (lower === 'firewall allow udp 53') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.firewall.allow53 = true;
    print('Firewall allows DNS outbound.', 'good');
    return;
  }

  if (lower === 'firewall allow udp 5060') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.firewall.allow5060 = true;
    print('Firewall allows SIP/voice signaling UDP 5060 outbound.', 'good');
    return;
  }

  if (lower === 'firewall deny inbound any') {
    if (!requireMode(command, ['config', 'privileged'])) return;
    state.firewall.denyInbound = true;
    print('Default inbound deny rule applied.', 'good');
    return;
  }

  print('% Invalid input detected. Type help for accepted commands.', 'bad');
}

function resetLab() {
  state = freshState();
  terminal.innerHTML = '';
  updateDifficultyUI();
  print('Welcome to BusinessNet VLAN Cisco Router Lab.', 'system');
  print('Mission: configure VLAN 10 HARDWARE for five PCs/printer and VLAN 20 PHONES for five phones.', 'system');
  if (difficulty === 'easy') {
    print('Easy mode: click an Easy Command Builder task. The game writes and runs the matching commands so you can learn each step.', 'system');
  } else if (difficulty === 'normal') {
    print('Normal mode: type commands yourself. Use help, hint, accepted commands, or Run Demo Config if you get stuck.', 'system');
  } else {
    print('Hard mode: hints, help, demo config, and the accepted-command guide are locked. Use the specs and command memory.', 'warn');
  }
  updateUI();
}

function runDemoConfig() {
  if (difficulty === 'hard') {
    print('Hard mode: demo configuration is locked.', 'warn');
    return;
  }
  terminal.innerHTML = '';
  print('Running demo configuration...', 'system');
  demoCommands.forEach(cmd => {
    handleCommand(cmd);
    updateUI();
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const command = input.value;
  input.value = '';
  if (!command.trim()) return;
  history.push(command);
  historyIndex = history.length;
  handleCommand(command);
  updateUI();
});

input.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (history.length === 0) return;
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = history[historyIndex] || '';
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] || '';
  }
});

document.getElementById('runTestsBtn').addEventListener('click', () => runTests());
hintBtn.addEventListener('click', () => { hint(); updateUI(); });
document.getElementById('resetBtn').addEventListener('click', resetLab);
demoBtn.addEventListener('click', runDemoConfig);

difficultyButtons.forEach(button => {
  button.addEventListener('click', () => setDifficulty(button.dataset.difficulty));
});

easyActionsEl.addEventListener('click', event => {
  const button = event.target.closest('[data-easy-action]');
  if (!button || difficulty !== 'easy') return;
  const action = easyActionDefs.find(item => item.id === button.dataset.easyAction);
  if (!action) return;
  runCommandSequence(action.commands, action.title);
});

resetLab();

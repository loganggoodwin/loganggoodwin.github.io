const PACKET_TYPES = [
  {
    id: "https_web",
    label: "Secure Web Browsing",
    service: "HTTPS",
    protocol: "TCP",
    srcPort: 51512,
    destPort: 443,
    source: "Employee Laptop",
    destination: "Public Website",
    sourceZone: "LAN",
    destinationZone: "Internet",
    state: "NEW",
    expected: "allow",
    icon: "🔒",
    lesson: "HTTPS uses TCP destination port 443. It is normally allowed outbound for secure web browsing."
  },
  {
    id: "http_web",
    label: "Standard Web Browsing",
    service: "HTTP",
    protocol: "TCP",
    srcPort: 51513,
    destPort: 80,
    source: "Employee Laptop",
    destination: "Public Website",
    sourceZone: "LAN",
    destinationZone: "Internet",
    state: "NEW",
    expected: "allow",
    icon: "🌎",
    lesson: "HTTP uses TCP destination port 80. It may be allowed for normal browsing, although HTTPS is preferred."
  },
  {
    id: "dns_udp",
    label: "DNS Lookup",
    service: "DNS",
    protocol: "UDP",
    srcPort: 53012,
    destPort: 53,
    source: "Employee Laptop",
    destination: "Approved DNS Server",
    sourceZone: "LAN",
    destinationZone: "DNS",
    state: "NEW",
    expected: "allow",
    icon: "🌐",
    lesson: "DNS commonly uses UDP destination port 53. Without DNS, users may not resolve domain names."
  },
  {
    id: "dns_tcp_zone",
    label: "Suspicious DNS Zone Transfer",
    service: "DNS Zone Transfer",
    protocol: "TCP",
    srcPort: 44991,
    destPort: 53,
    source: "Unknown Internet Host",
    destination: "Internal DNS Server",
    sourceZone: "Internet",
    destinationZone: "DNS",
    state: "NEW",
    expected: "block",
    icon: "🕵️",
    lesson: "DNS can use TCP port 53, but an external zone transfer attempt against an internal DNS server should be blocked."
  },
  {
    id: "telnet",
    label: "Telnet Login Attempt",
    service: "Telnet",
    protocol: "TCP",
    srcPort: 50110,
    destPort: 23,
    source: "Unknown Host",
    destination: "Internal Server",
    sourceZone: "Internet",
    destinationZone: "Server VLAN",
    state: "NEW",
    expected: "block",
    icon: "⚠️",
    lesson: "Telnet uses TCP destination port 23 and sends data without encryption, so it should be blocked."
  },
  {
    id: "ftp_plain",
    label: "Plain FTP Upload",
    service: "FTP",
    protocol: "TCP",
    srcPort: 50222,
    destPort: 21,
    source: "Employee Laptop",
    destination: "External File Server",
    sourceZone: "LAN",
    destinationZone: "Internet",
    state: "NEW",
    expected: "block",
    icon: "📁",
    lesson: "FTP uses TCP port 21 and does not protect credentials well. Many organizations block it or replace it with secure alternatives."
  },
  {
    id: "irc_c2",
    label: "Malware IRC Beacon",
    service: "IRC/C2",
    protocol: "TCP",
    srcPort: 51001,
    destPort: 6667,
    source: "Infected Workstation",
    destination: "Command Server",
    sourceZone: "LAN",
    destinationZone: "Internet",
    state: "NEW",
    expected: "block",
    icon: "🐞",
    lesson: "TCP port 6667 is commonly associated with IRC. In this scenario it represents command-and-control beaconing and should be blocked."
  },
  {
    id: "unknown_4444",
    label: "Unknown Backdoor Port",
    service: "Unknown Service",
    protocol: "TCP",
    srcPort: 50999,
    destPort: 4444,
    source: "Unknown Host",
    destination: "Internal Server",
    sourceZone: "Internet",
    destinationZone: "Server VLAN",
    state: "NEW",
    expected: "block",
    icon: "❓",
    lesson: "Unknown inbound services should be blocked unless there is a documented business need and a specific approved rule."
  },
  {
    id: "ssh_admin",
    label: "Approved Admin SSH",
    service: "SSH",
    protocol: "TCP",
    srcPort: 52101,
    destPort: 22,
    source: "Admin Workstation",
    destination: "Linux Server",
    sourceZone: "Admin VLAN",
    destinationZone: "Server VLAN",
    state: "NEW",
    expected: "allow",
    icon: "⌨️",
    lesson: "SSH uses TCP port 22. It should be allowed only from approved admin systems, not from anywhere."
  },
  {
    id: "ssh_internet",
    label: "Untrusted SSH Attempt",
    service: "SSH",
    protocol: "TCP",
    srcPort: 52222,
    destPort: 22,
    source: "Internet Host",
    destination: "Linux Server",
    sourceZone: "Internet",
    destinationZone: "Server VLAN",
    state: "NEW",
    expected: "block",
    icon: "🚫",
    lesson: "SSH from the open internet should be blocked unless there is a tightly controlled access path such as VPN, bastion, or zero-trust access."
  },
  {
    id: "rdp_internet",
    label: "Internet RDP Attempt",
    service: "RDP",
    protocol: "TCP",
    srcPort: 53221,
    destPort: 3389,
    source: "Internet Host",
    destination: "Workstation",
    sourceZone: "Internet",
    destinationZone: "LAN",
    state: "NEW",
    expected: "block",
    icon: "🧨",
    lesson: "Remote Desktop Protocol uses TCP port 3389. Exposing RDP directly to the internet is high risk and should be blocked."
  },
  {
    id: "ntp_sync",
    label: "Time Sync Request",
    service: "NTP",
    protocol: "UDP",
    srcPort: 55123,
    destPort: 123,
    source: "Employee Laptop",
    destination: "Approved NTP Server",
    sourceZone: "LAN",
    destinationZone: "Infrastructure",
    state: "NEW",
    expected: "allow",
    icon: "⏱️",
    lesson: "NTP commonly uses UDP port 123. Time synchronization supports logging, authentication, and incident investigations."
  },
  {
    id: "smb_internet",
    label: "Internet SMB Attempt",
    service: "SMB",
    protocol: "TCP",
    srcPort: 55145,
    destPort: 445,
    source: "Internet Host",
    destination: "File Server",
    sourceZone: "Internet",
    destinationZone: "Server VLAN",
    state: "NEW",
    expected: "block",
    icon: "🗄️",
    lesson: "SMB uses TCP port 445. It should not be exposed directly to the internet."
  },
  {
    id: "smtp_submission",
    label: "Secure Mail Submission",
    service: "SMTP Submission",
    protocol: "TCP",
    srcPort: 56000,
    destPort: 587,
    source: "Employee Laptop",
    destination: "Mail Server",
    sourceZone: "LAN",
    destinationZone: "Mail",
    state: "NEW",
    expected: "allow",
    icon: "✉️",
    lesson: "SMTP submission commonly uses TCP port 587. It is normally allowed to approved mail servers."
  },
  {
    id: "imaps",
    label: "Secure Mail Retrieval",
    service: "IMAPS",
    protocol: "TCP",
    srcPort: 56001,
    destPort: 993,
    source: "Employee Laptop",
    destination: "Mail Server",
    sourceZone: "LAN",
    destinationZone: "Mail",
    state: "NEW",
    expected: "allow",
    icon: "📨",
    lesson: "IMAPS uses TCP port 993 and protects email retrieval with encryption."
  },
  {
    id: "smtp_spam",
    label: "Workstation SMTP Relay Attempt",
    service: "SMTP Relay",
    protocol: "TCP",
    srcPort: 56025,
    destPort: 25,
    source: "Employee Laptop",
    destination: "External Mail Relay",
    sourceZone: "LAN",
    destinationZone: "Internet",
    state: "NEW",
    expected: "block",
    icon: "📤",
    lesson: "TCP port 25 is used for SMTP relay, but normal workstations should not send directly to external mail relays."
  },
  {
    id: "pop3_clear",
    label: "Cleartext POP3 Login",
    service: "POP3",
    protocol: "TCP",
    srcPort: 56110,
    destPort: 110,
    source: "Employee Laptop",
    destination: "Mail Server",
    sourceZone: "LAN",
    destinationZone: "Mail",
    state: "NEW",
    expected: "block",
    icon: "📭",
    lesson: "POP3 on TCP port 110 is not the preferred secure option. Encrypted mail retrieval such as IMAPS is safer."
  },
  {
    id: "vpn_wireguard",
    label: "Approved VPN Tunnel",
    service: "WireGuard VPN",
    protocol: "UDP",
    srcPort: 57444,
    destPort: 51820,
    source: "Remote Employee",
    destination: "VPN Gateway",
    sourceZone: "Internet",
    destinationZone: "DMZ",
    state: "NEW",
    expected: "allow",
    icon: "🔐",
    lesson: "WireGuard often uses UDP port 51820. VPN traffic should be allowed only to approved VPN gateways."
  },
  {
    id: "shadow_vpn",
    label: "Unauthorized VPN Tunnel",
    service: "Unknown VPN",
    protocol: "UDP",
    srcPort: 57999,
    destPort: 1194,
    source: "Employee Laptop",
    destination: "Unknown VPN Provider",
    sourceZone: "LAN",
    destinationZone: "Internet",
    state: "NEW",
    expected: "block",
    icon: "🥷",
    lesson: "UDP port 1194 is often used by VPN tools. Unauthorized tunnels can bypass monitoring and should be blocked by policy."
  },
  {
    id: "mysql_app",
    label: "App Server to MySQL",
    service: "MySQL",
    protocol: "TCP",
    srcPort: 58100,
    destPort: 3306,
    source: "Application Server",
    destination: "Database Server",
    sourceZone: "App VLAN",
    destinationZone: "Database VLAN",
    state: "NEW",
    expected: "allow",
    icon: "🧩",
    lesson: "MySQL uses TCP port 3306. It may be allowed from the application server to the database server only."
  },
  {
    id: "mysql_internet",
    label: "Internet MySQL Attempt",
    service: "MySQL",
    protocol: "TCP",
    srcPort: 58200,
    destPort: 3306,
    source: "Internet Host",
    destination: "Database Server",
    sourceZone: "Internet",
    destinationZone: "Database VLAN",
    state: "NEW",
    expected: "block",
    icon: "🧨",
    lesson: "Database ports such as TCP 3306 should not be exposed to the internet."
  },
  {
    id: "mssql_app",
    label: "App Server to Microsoft SQL",
    service: "MSSQL",
    protocol: "TCP",
    srcPort: 58300,
    destPort: 1433,
    source: "Application Server",
    destination: "Database Server",
    sourceZone: "App VLAN",
    destinationZone: "Database VLAN",
    state: "NEW",
    expected: "allow",
    icon: "🗃️",
    lesson: "Microsoft SQL Server commonly uses TCP port 1433. It should be limited to approved application servers."
  },
  {
    id: "mssql_internet",
    label: "Internet MSSQL Attempt",
    service: "MSSQL",
    protocol: "TCP",
    srcPort: 58400,
    destPort: 1433,
    source: "Internet Host",
    destination: "Database Server",
    sourceZone: "Internet",
    destinationZone: "Database VLAN",
    state: "NEW",
    expected: "block",
    icon: "🚧",
    lesson: "Exposing MSSQL on TCP port 1433 to the internet creates unnecessary attack surface."
  },
  {
    id: "postgres_app",
    label: "App Server to PostgreSQL",
    service: "PostgreSQL",
    protocol: "TCP",
    srcPort: 58432,
    destPort: 5432,
    source: "Application Server",
    destination: "Database Server",
    sourceZone: "App VLAN",
    destinationZone: "Database VLAN",
    state: "NEW",
    expected: "allow",
    icon: "🐘",
    lesson: "PostgreSQL uses TCP port 5432. The firewall should limit it to approved application paths."
  },
  {
    id: "snmp_monitor",
    label: "Approved SNMPv3 Monitoring",
    service: "SNMP",
    protocol: "UDP",
    srcPort: 59161,
    destPort: 161,
    source: "Monitoring Server",
    destination: "Core Switch",
    sourceZone: "Management VLAN",
    destinationZone: "Infrastructure",
    state: "NEW",
    expected: "allow",
    icon: "📊",
    lesson: "SNMP uses UDP port 161. It should be limited to approved monitoring servers and secure versions such as SNMPv3."
  },
  {
    id: "snmp_public",
    label: "Untrusted SNMP Probe",
    service: "SNMP",
    protocol: "UDP",
    srcPort: 59162,
    destPort: 161,
    source: "Unknown Host",
    destination: "Core Switch",
    sourceZone: "Internet",
    destinationZone: "Infrastructure",
    state: "NEW",
    expected: "block",
    icon: "🔎",
    lesson: "Untrusted SNMP probes can expose device information and should be blocked."
  },
  {
    id: "tftp",
    label: "TFTP Attempt",
    service: "TFTP",
    protocol: "UDP",
    srcPort: 59069,
    destPort: 69,
    source: "Unknown Host",
    destination: "Network Device",
    sourceZone: "Internet",
    destinationZone: "Infrastructure",
    state: "NEW",
    expected: "block",
    icon: "📦",
    lesson: "TFTP uses UDP port 69 and lacks strong security controls. It should not be broadly reachable."
  },
  {
    id: "vnc_internet",
    label: "Internet VNC Attempt",
    service: "VNC",
    protocol: "TCP",
    srcPort: 59590,
    destPort: 5900,
    source: "Internet Host",
    destination: "Admin Workstation",
    sourceZone: "Internet",
    destinationZone: "Admin VLAN",
    state: "NEW",
    expected: "block",
    icon: "🖥️",
    lesson: "VNC often uses TCP port 5900. Remote-control services should not be exposed directly to the internet."
  },
  {
    id: "redis_internet",
    label: "Internet Redis Attempt",
    service: "Redis",
    protocol: "TCP",
    srcPort: 59637,
    destPort: 6379,
    source: "Internet Host",
    destination: "Cache Server",
    sourceZone: "Internet",
    destinationZone: "Database VLAN",
    state: "NEW",
    expected: "block",
    icon: "🧱",
    lesson: "Redis commonly uses TCP port 6379. It should never be exposed broadly to the internet."
  },
  {
    id: "established_https",
    label: "Established HTTPS Response",
    service: "HTTPS Return Traffic",
    protocol: "TCP",
    srcPort: 443,
    destPort: 51844,
    source: "Public Website",
    destination: "Employee Laptop",
    sourceZone: "Internet",
    destinationZone: "LAN",
    state: "ESTABLISHED",
    expected: "allow",
    icon: "↩️",
    lesson: "Stateful firewalls can allow return traffic for sessions that were initiated by trusted internal hosts."
  },
  {
    id: "unsolicited_response",
    label: "Unsolicited Fake Response",
    service: "Fake Return Traffic",
    protocol: "TCP",
    srcPort: 443,
    destPort: 51845,
    source: "Unknown Internet Host",
    destination: "Employee Laptop",
    sourceZone: "Internet",
    destinationZone: "LAN",
    state: "NEW",
    expected: "block",
    icon: "🎭",
    lesson: "A packet that looks like return traffic but is not part of an established session should be blocked."
  },
  {
    id: "https_c2",
    label: "Known C2 Over HTTPS",
    service: "HTTPS/C2",
    protocol: "TCP",
    srcPort: 60123,
    destPort: 443,
    source: "Infected Workstation",
    destination: "Known Command Server",
    sourceZone: "LAN",
    destinationZone: "Internet",
    state: "NEW",
    expected: "block",
    icon: "🦠",
    lesson: "Not all TCP 443 traffic is safe. Destination reputation and context matter when blocking known command-and-control traffic."
  },
  {
    id: "kube_admin",
    label: "Admin Kubernetes API Access",
    service: "Kubernetes API",
    protocol: "TCP",
    srcPort: 60443,
    destPort: 6443,
    source: "Admin Workstation",
    destination: "Kubernetes Control Plane",
    sourceZone: "Admin VLAN",
    destinationZone: "Server VLAN",
    state: "NEW",
    expected: "allow",
    icon: "☸️",
    lesson: "Kubernetes API commonly uses TCP port 6443. It should be limited to trusted admin paths."
  },
  {
    id: "kube_internet",
    label: "Internet Kubernetes API Probe",
    service: "Kubernetes API",
    protocol: "TCP",
    srcPort: 60444,
    destPort: 6443,
    source: "Internet Host",
    destination: "Kubernetes Control Plane",
    sourceZone: "Internet",
    destinationZone: "Server VLAN",
    state: "NEW",
    expected: "block",
    icon: "🚨",
    lesson: "The Kubernetes API should not be exposed directly to the internet."
  },
  {
    id: "http_admin_public",
    label: "Public Admin Panel Over HTTP",
    service: "Admin HTTP",
    protocol: "TCP",
    srcPort: 60080,
    destPort: 8080,
    source: "Internet Host",
    destination: "Admin Web Panel",
    sourceZone: "Internet",
    destinationZone: "Admin VLAN",
    state: "NEW",
    expected: "block",
    icon: "🚪",
    lesson: "Admin panels on ports such as TCP 8080 should not be reachable from the public internet."
  },
  {
    id: "icmp_monitor",
    label: "Internal Monitoring Ping",
    service: "ICMP Echo",
    protocol: "ICMP",
    srcPort: "-",
    destPort: "-",
    source: "Monitoring Server",
    destination: "Core Router",
    sourceZone: "Management VLAN",
    destinationZone: "Infrastructure",
    state: "NEW",
    expected: "allow",
    icon: "📡",
    lesson: "ICMP can be useful for monitoring when it is limited to trusted management systems."
  },
  {
    id: "ping_sweep",
    label: "External Ping Sweep",
    service: "ICMP Recon",
    protocol: "ICMP",
    srcPort: "-",
    destPort: "-",
    source: "Unknown Internet Host",
    destination: "Internal Network Range",
    sourceZone: "Internet",
    destinationZone: "LAN",
    state: "NEW",
    expected: "block",
    icon: "📍",
    lesson: "External ping sweeps may be reconnaissance activity and should be blocked or heavily limited."
  }
];

const RULES = {
  allow_web: {
    name: "Allow Outbound Web",
    short: "ALLOW LAN → INTERNET TCP 80/443",
    description: "Allows normal outbound web browsing from the LAN to the internet.",
    action: "allow",
    matches: p => p.sourceZone === "LAN" && p.destinationZone === "Internet" && p.protocol === "TCP" && [80, 443].includes(p.destPort) && p.state === "NEW"
  },
  allow_dns_udp: {
    name: "Allow Approved DNS",
    short: "ALLOW LAN → DNS UDP 53",
    description: "Allows DNS lookups from LAN clients to the approved DNS server.",
    action: "allow",
    matches: p => p.sourceZone === "LAN" && p.destinationZone === "DNS" && p.protocol === "UDP" && p.destPort === 53
  },
  block_dns_zone_transfer: {
    name: "Block External DNS Zone Transfer",
    short: "BLOCK INTERNET → DNS TCP 53",
    description: "Blocks untrusted TCP/53 attempts against internal DNS infrastructure.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.destinationZone === "DNS" && p.protocol === "TCP" && p.destPort === 53
  },
  block_telnet: {
    name: "Block Telnet",
    short: "BLOCK TCP 23",
    description: "Blocks insecure Telnet login attempts.",
    action: "block",
    matches: p => p.protocol === "TCP" && p.destPort === 23
  },
  block_ftp: {
    name: "Block Plain FTP",
    short: "BLOCK TCP 21",
    description: "Blocks legacy FTP traffic that may expose credentials.",
    action: "block",
    matches: p => p.protocol === "TCP" && p.destPort === 21
  },
  block_c2_irc: {
    name: "Block IRC/C2 Beacon",
    short: "BLOCK TCP 6667",
    description: "Blocks suspicious IRC-style command-and-control traffic.",
    action: "block",
    matches: p => p.protocol === "TCP" && p.destPort === 6667
  },
  allow_admin_ssh: {
    name: "Allow Admin SSH",
    short: "ALLOW ADMIN → SERVER TCP 22",
    description: "Allows SSH only from the admin VLAN to server systems.",
    action: "allow",
    matches: p => p.sourceZone === "Admin VLAN" && p.destinationZone === "Server VLAN" && p.protocol === "TCP" && p.destPort === 22
  },
  block_ssh_internet: {
    name: "Block Internet SSH",
    short: "BLOCK INTERNET → SERVER TCP 22",
    description: "Blocks untrusted SSH attempts from the public internet.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.protocol === "TCP" && p.destPort === 22
  },
  block_rdp_internet: {
    name: "Block Internet RDP",
    short: "BLOCK INTERNET → LAN TCP 3389",
    description: "Blocks direct RDP exposure from the internet.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.protocol === "TCP" && p.destPort === 3389
  },
  allow_ntp: {
    name: "Allow Time Sync",
    short: "ALLOW LAN → INFRA UDP 123",
    description: "Allows clients to sync time with approved infrastructure.",
    action: "allow",
    matches: p => p.sourceZone === "LAN" && p.destinationZone === "Infrastructure" && p.protocol === "UDP" && p.destPort === 123
  },
  block_smb_internet: {
    name: "Block Internet SMB",
    short: "BLOCK INTERNET → SERVER TCP 445",
    description: "Blocks file-sharing exposure from the public internet.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.protocol === "TCP" && p.destPort === 445
  },
  allow_mail_submit: {
    name: "Allow Mail Submission",
    short: "ALLOW LAN → MAIL TCP 587",
    description: "Allows users to submit mail to the approved mail server.",
    action: "allow",
    matches: p => p.sourceZone === "LAN" && p.destinationZone === "Mail" && p.protocol === "TCP" && p.destPort === 587
  },
  allow_imaps: {
    name: "Allow Secure Mail Retrieval",
    short: "ALLOW LAN → MAIL TCP 993",
    description: "Allows encrypted IMAP mail retrieval.",
    action: "allow",
    matches: p => p.sourceZone === "LAN" && p.destinationZone === "Mail" && p.protocol === "TCP" && p.destPort === 993
  },
  block_smtp_workstation: {
    name: "Block Workstation SMTP Relay",
    short: "BLOCK LAN → INTERNET TCP 25",
    description: "Blocks workstations from sending direct external SMTP relay traffic.",
    action: "block",
    matches: p => p.sourceZone === "LAN" && p.destinationZone === "Internet" && p.protocol === "TCP" && p.destPort === 25
  },
  block_pop3: {
    name: "Block Cleartext POP3",
    short: "BLOCK TCP 110",
    description: "Blocks cleartext POP3 mail retrieval.",
    action: "block",
    matches: p => p.protocol === "TCP" && p.destPort === 110
  },
  allow_vpn_wireguard: {
    name: "Allow Approved VPN",
    short: "ALLOW INTERNET → DMZ UDP 51820",
    description: "Allows approved WireGuard VPN traffic to the VPN gateway only.",
    action: "allow",
    matches: p => p.sourceZone === "Internet" && p.destinationZone === "DMZ" && p.protocol === "UDP" && p.destPort === 51820
  },
  block_shadow_vpn: {
    name: "Block Unauthorized VPN",
    short: "BLOCK LAN → INTERNET UDP 1194",
    description: "Blocks unauthorized VPN tunnels that bypass company monitoring.",
    action: "block",
    matches: p => p.sourceZone === "LAN" && p.destinationZone === "Internet" && p.protocol === "UDP" && p.destPort === 1194
  },
  allow_app_mysql: {
    name: "Allow App to MySQL",
    short: "ALLOW APP → DB TCP 3306",
    description: "Allows MySQL traffic only from application servers to database systems.",
    action: "allow",
    matches: p => p.sourceZone === "App VLAN" && p.destinationZone === "Database VLAN" && p.protocol === "TCP" && p.destPort === 3306
  },
  allow_app_mssql: {
    name: "Allow App to MSSQL",
    short: "ALLOW APP → DB TCP 1433",
    description: "Allows Microsoft SQL Server traffic only from approved app servers.",
    action: "allow",
    matches: p => p.sourceZone === "App VLAN" && p.destinationZone === "Database VLAN" && p.protocol === "TCP" && p.destPort === 1433
  },
  allow_app_postgres: {
    name: "Allow App to PostgreSQL",
    short: "ALLOW APP → DB TCP 5432",
    description: "Allows PostgreSQL only from the app VLAN to the database VLAN.",
    action: "allow",
    matches: p => p.sourceZone === "App VLAN" && p.destinationZone === "Database VLAN" && p.protocol === "TCP" && p.destPort === 5432
  },
  block_db_internet: {
    name: "Block Internet Databases",
    short: "BLOCK INTERNET → DB TCP 1433/3306/5432/6379",
    description: "Blocks direct internet access to database and cache services.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.destinationZone === "Database VLAN" && p.protocol === "TCP" && [1433, 3306, 5432, 6379].includes(p.destPort)
  },
  allow_monitoring_snmp: {
    name: "Allow Approved SNMP",
    short: "ALLOW MGMT → INFRA UDP 161",
    description: "Allows SNMP only from the monitoring server to infrastructure devices.",
    action: "allow",
    matches: p => p.sourceZone === "Management VLAN" && p.destinationZone === "Infrastructure" && p.protocol === "UDP" && p.destPort === 161
  },
  block_snmp_public: {
    name: "Block Public SNMP",
    short: "BLOCK INTERNET → INFRA UDP 161",
    description: "Blocks untrusted SNMP probes.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.destinationZone === "Infrastructure" && p.protocol === "UDP" && p.destPort === 161
  },
  block_tftp: {
    name: "Block TFTP",
    short: "BLOCK UDP 69",
    description: "Blocks insecure TFTP access.",
    action: "block",
    matches: p => p.protocol === "UDP" && p.destPort === 69
  },
  block_vnc: {
    name: "Block Internet VNC",
    short: "BLOCK INTERNET → ADMIN TCP 5900",
    description: "Blocks public access to VNC remote-control services.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.protocol === "TCP" && p.destPort === 5900
  },
  block_redis_internet: {
    name: "Block Internet Redis",
    short: "BLOCK INTERNET → DB TCP 6379",
    description: "Blocks internet access to Redis cache services.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.destinationZone === "Database VLAN" && p.protocol === "TCP" && p.destPort === 6379
  },
  allow_established: {
    name: "Allow Established Sessions",
    short: "ALLOW ESTABLISHED/RELATED",
    description: "Allows return traffic for sessions already approved by the firewall.",
    action: "allow",
    matches: p => p.state === "ESTABLISHED"
  },
  block_known_c2_https: {
    name: "Block Known C2 over HTTPS",
    short: "BLOCK INFECTED HOST → KNOWN C2 TCP 443",
    description: "Blocks traffic to a known command-and-control destination even when it uses port 443.",
    action: "block",
    matches: p => p.id === "https_c2"
  },
  allow_admin_kubeapi: {
    name: "Allow Admin Kubernetes API",
    short: "ALLOW ADMIN → SERVER TCP 6443",
    description: "Allows Kubernetes API access only from admin systems.",
    action: "allow",
    matches: p => p.sourceZone === "Admin VLAN" && p.destinationZone === "Server VLAN" && p.protocol === "TCP" && p.destPort === 6443
  },
  block_kubeapi_internet: {
    name: "Block Internet Kubernetes API",
    short: "BLOCK INTERNET → SERVER TCP 6443",
    description: "Blocks public probing of Kubernetes control plane services.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.protocol === "TCP" && p.destPort === 6443
  },
  block_http_admin_panel: {
    name: "Block Public Admin Panel",
    short: "BLOCK INTERNET → ADMIN TCP 8080",
    description: "Blocks public access to administrative web panels.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.destinationZone === "Admin VLAN" && p.protocol === "TCP" && p.destPort === 8080
  },
  allow_icmp_monitor: {
    name: "Allow Monitoring ICMP",
    short: "ALLOW MGMT → INFRA ICMP",
    description: "Allows ICMP only from the monitoring system to infrastructure devices.",
    action: "allow",
    matches: p => p.sourceZone === "Management VLAN" && p.destinationZone === "Infrastructure" && p.protocol === "ICMP"
  },
  block_ping_sweep: {
    name: "Block External Ping Sweep",
    short: "BLOCK INTERNET → LAN ICMP",
    description: "Blocks external ICMP reconnaissance against internal ranges.",
    action: "block",
    matches: p => p.sourceZone === "Internet" && p.destinationZone === "LAN" && p.protocol === "ICMP"
  },
  default_deny: {
    name: "Default Deny",
    short: "DENY ANY OTHER",
    description: "Blocks anything that does not match a more specific allow rule.",
    action: "block",
    matches: () => true
  }
};

const LEVELS = [
  {
    title: "Level 1: Basic Port Filtering",
    briefing: "Start with common services. Allow web and DNS traffic. Block risky legacy and unknown ports.",
    objective: "Answer 8 packet questions correctly.",
    target: 8,
    rules: ["allow_web", "allow_dns_udp", "block_telnet", "block_ftp", "block_c2_irc", "default_deny"],
    enabledStart: ["allow_web", "allow_dns_udp", "block_telnet", "block_ftp", "block_c2_irc", "default_deny"],
    packetIds: ["https_web", "http_web", "dns_udp", "telnet", "ftp_plain", "irc_c2", "unknown_4444"]
  },
  {
    title: "Level 2: Least Privilege for Admin Access",
    briefing: "Management access is powerful. Allow admin SSH from the admin VLAN, but block SSH, RDP, and SMB from the internet.",
    objective: "Answer 10 packet questions correctly.",
    target: 10,
    rules: ["allow_web", "allow_dns_udp", "allow_admin_ssh", "block_ssh_internet", "block_rdp_internet", "allow_ntp", "block_smb_internet", "default_deny"],
    enabledStart: ["allow_web", "allow_dns_udp", "allow_admin_ssh", "block_ssh_internet", "block_rdp_internet", "allow_ntp", "block_smb_internet", "default_deny"],
    packetIds: ["https_web", "dns_udp", "ssh_admin", "ssh_internet", "rdp_internet", "ntp_sync", "smb_internet", "telnet"]
  },
  {
    title: "Level 3: Email and VPN Policy",
    briefing: "Allow approved mail and VPN services. Block unsafe mail protocols, direct SMTP relay, and unauthorized tunnels.",
    objective: "Answer 12 packet questions correctly.",
    target: 12,
    rules: ["allow_web", "allow_dns_udp", "allow_mail_submit", "allow_imaps", "allow_vpn_wireguard", "block_smtp_workstation", "block_pop3", "block_shadow_vpn", "default_deny"],
    enabledStart: ["allow_web", "allow_dns_udp", "allow_mail_submit", "allow_imaps", "allow_vpn_wireguard", "block_smtp_workstation", "block_pop3", "block_shadow_vpn", "default_deny"],
    packetIds: ["smtp_submission", "imaps", "vpn_wireguard", "smtp_spam", "pop3_clear", "shadow_vpn", "https_web", "dns_udp", "ftp_plain"]
  },
  {
    title: "Level 4: Segmentation and Server Protection",
    briefing: "Protect databases and infrastructure. Allow approved app-to-database paths and monitoring, but block public access to sensitive services.",
    objective: "Answer 14 packet questions correctly.",
    target: 14,
    rules: ["allow_app_mysql", "allow_app_mssql", "allow_app_postgres", "allow_monitoring_snmp", "block_db_internet", "block_snmp_public", "block_tftp", "block_vnc", "block_redis_internet", "default_deny"],
    enabledStart: ["allow_app_mysql", "allow_app_mssql", "allow_app_postgres", "allow_monitoring_snmp", "block_db_internet", "block_snmp_public", "block_tftp", "block_vnc", "block_redis_internet", "default_deny"],
    packetIds: ["mysql_app", "mysql_internet", "mssql_app", "mssql_internet", "postgres_app", "snmp_monitor", "snmp_public", "tftp", "vnc_internet", "redis_internet"]
  },
  {
    title: "Level 5: Stateful Filtering and Defense-in-Depth",
    briefing: "Advanced firewalls look at state, destination reputation, and context. Do not trust a packet just because it uses a common port.",
    objective: "Answer 16 packet questions correctly.",
    target: 16,
    rules: ["allow_established", "block_known_c2_https", "allow_admin_kubeapi", "block_kubeapi_internet", "block_http_admin_panel", "block_dns_zone_transfer", "allow_icmp_monitor", "block_ping_sweep", "allow_web", "allow_dns_udp", "default_deny"],
    enabledStart: ["allow_established", "block_known_c2_https", "allow_admin_kubeapi", "block_kubeapi_internet", "block_http_admin_panel", "block_dns_zone_transfer", "allow_icmp_monitor", "block_ping_sweep", "allow_web", "allow_dns_udp", "default_deny"],
    packetIds: ["established_https", "unsolicited_response", "https_c2", "kube_admin", "kube_internet", "http_admin_public", "dns_tcp_zone", "icmp_monitor", "ping_sweep", "https_web", "dns_udp"]
  }
];

const PORT_GUIDE = [
  "20/21 FTP", "22 SSH", "23 Telnet", "25 SMTP Relay", "53 DNS", "69 TFTP", "80 HTTP", "110 POP3", "123 NTP", "1433 MSSQL", "161 SNMP", "443 HTTPS", "445 SMB", "587 Mail Submit", "993 IMAPS", "3306 MySQL", "3389 RDP", "5432 PostgreSQL", "5900 VNC", "6379 Redis", "6443 Kubernetes API", "6667 IRC/C2", "8080 Admin/Web Proxy", "51820 WireGuard"
];

const state = {
  levelIndex: 0,
  enabledRules: [],
  packet: null,
  score: 0,
  mistakes: 0,
  streak: 0,
  running: false,
  history: [],
  hintStep: 0,
  autoTimer: null,
  completedLevels: new Set()
};

const el = {
  startBtn: document.getElementById("startBtn"),
  howBtn: document.getElementById("howBtn"),
  closeHowBtn: document.getElementById("closeHowBtn"),
  howPanel: document.getElementById("howPanel"),
  resetBtn: document.getElementById("resetBtn"),
  autoBtn: document.getElementById("autoBtn"),
  hintBtn: document.getElementById("hintBtn"),
  hintBox: document.getElementById("hintBox"),
  hintTitle: document.getElementById("hintTitle"),
  hintText: document.getElementById("hintText"),
  hintDetail: document.getElementById("hintDetail"),
  hintStepLabel: document.getElementById("hintStepLabel"),
  allowBtn: document.getElementById("allowBtn"),
  blockBtn: document.getElementById("blockBtn"),
  nextLevelBtn: document.getElementById("nextLevelBtn"),
  missionTitle: document.getElementById("missionTitle"),
  missionBriefing: document.getElementById("missionBriefing"),
  missionObjective: document.getElementById("missionObjective"),
  rulesList: document.getElementById("rulesList"),
  packetCard: document.getElementById("packetCard"),
  packetBubble: document.getElementById("packetBubble"),
  feedbackBox: document.getElementById("feedbackBox"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackText: document.getElementById("feedbackText"),
  scoreValue: document.getElementById("scoreValue"),
  mistakesValue: document.getElementById("mistakesValue"),
  streakValue: document.getElementById("streakValue"),
  progressFill: document.getElementById("progressFill"),
  progressText: document.getElementById("progressText"),
  policyText: document.getElementById("policyText"),
  historyList: document.getElementById("historyList"),
  levelMap: document.getElementById("levelMap"),
  portGuide: document.getElementById("portGuide"),
  leftZoneLabel: document.getElementById("leftZoneLabel"),
  rightZoneLabel: document.getElementById("rightZoneLabel")
};

function currentLevel() {
  return LEVELS[state.levelIndex];
}

function packetById(id) {
  return PACKET_TYPES.find(packet => packet.id === id);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createPacket(activeLevel = currentLevel()) {
  const available = activeLevel.packetIds.map(packetById).filter(Boolean);
  let next = pickRandom(available);
  if (state.packet && available.length > 1) {
    let safety = 0;
    while (next.id === state.packet.id && safety < 8) {
      next = pickRandom(available);
      safety += 1;
    }
  }
  return { ...next, instanceId: `${next.id}-${Date.now()}-${Math.random()}` };
}

function evaluatePacket(packet) {
  const level = currentLevel();
  const orderedEnabledRules = level.rules.filter(ruleId => state.enabledRules.includes(ruleId));
  for (const ruleId of orderedEnabledRules) {
    const rule = RULES[ruleId];
    if (rule && rule.matches(packet)) {
      return { action: rule.action, ruleId, ruleName: rule.name, ruleShort: rule.short };
    }
  }
  return {
    action: "block",
    ruleId: "implicit_default_deny",
    ruleName: "Implicit Default Deny",
    ruleShort: "NO MATCH → BLOCK"
  };
}

function setFeedback(type, title, text) {
  el.feedbackBox.className = `feedback ${type}`;
  el.feedbackTitle.textContent = title;
  el.feedbackText.textContent = text;
  const icon = el.feedbackBox.querySelector(".feedback-icon");
  icon.textContent = type === "success" ? "✅" : type === "danger" ? "⚠️" : type === "win" ? "🏆" : "📘";
}

function portLabel(packet) {
  if (packet.protocol === "ICMP" || packet.destPort === "-") {
    return "ICMP traffic without a TCP or UDP port";
  }
  return `${packet.protocol} destination port ${packet.destPort}`;
}

function riskClue(packet) {
  const inbound = packet.sourceZone === "Internet";
  const adminService = ["SSH", "RDP", "VNC", "Kubernetes API", "Admin Panel"].includes(packet.service);
  const databaseService = ["MSSQL", "MySQL", "PostgreSQL", "Redis"].includes(packet.service);
  const legacyService = ["Telnet", "FTP", "TFTP", "POP3"].includes(packet.service);

  if (packet.state === "ESTABLISHED") {
    return "Because the connection state is ESTABLISHED, a stateful firewall may allow it as return traffic for a session that was already approved.";
  }
  if (packet.state === "INVALID") {
    return "Because the connection state is INVALID, a stateful firewall should usually drop it because it does not belong to a valid session.";
  }
  if (databaseService) {
    return "Database ports should normally be reachable only from approved application servers or management networks, not from users or the internet.";
  }
  if (adminService && inbound) {
    return "Administrative services from the public internet are high risk. Look for a VPN, bastion host, admin VLAN, or another approved management path.";
  }
  if (adminService) {
    return "Administrative access should be restricted by source zone and device identity, not just by port number.";
  }
  if (legacyService) {
    return "Legacy clear-text services are risky because they may expose credentials or transfer data without proper protection.";
  }
  if (packet.source.includes("Infected") || packet.source.includes("Unknown") || packet.label.toLowerCase().includes("suspicious")) {
    return "The source or behavior is suspicious, so think about whether this traffic has a documented business purpose.";
  }
  return "This looks like ordinary business traffic only if the source, destination, port, and zone all match the policy.";
}

function buildHint(packet, step) {
  const decision = evaluatePacket(packet);
  const srcDst = `${packet.sourceZone} → ${packet.destinationZone}`;
  const basePort = portLabel(packet);

  if (step === 1) {
    return {
      title: "Hint 1: Read the packet fields",
      text: `Start with the service, protocol, destination port, and zones. This packet is ${basePort}, traveling ${srcDst}.`,
      detail: "Firewalls usually care more about the destination port than the source port because the destination port identifies the service being requested."
    };
  }

  if (step === 2) {
    return {
      title: "Hint 2: Think about trust and business need",
      text: riskClue(packet),
      detail: `Source: ${packet.source}. Destination: ${packet.destination}. Connection state: ${packet.state}.`
    };
  }

  return {
    title: "Hint 3: Compare it to the active policy",
    text: `Your active rules currently evaluate this packet as ${decision.action.toUpperCase()} because of: ${decision.ruleName}.`,
    detail: `The best learning answer for this scenario is to ${packet.expected.toUpperCase()} it. After deciding, read the feedback to see why.`
  };
}

function hideHint() {
  state.hintStep = 0;
  el.hintBox.classList.add("hidden");
}

function showHint() {
  state.hintStep = Math.min(state.hintStep + 1, 3);
  const hint = buildHint(state.packet, state.hintStep);
  el.hintTitle.textContent = hint.title;
  el.hintText.textContent = hint.text;
  el.hintDetail.textContent = hint.detail;
  el.hintStepLabel.textContent = `Hint ${state.hintStep} of 3`;
  el.hintBox.classList.remove("hidden");
  el.hintBtn.textContent = state.hintStep >= 3 ? "💡 Show Final Hint Again" : "💡 More Hint";
}

function resetHintForNewPacket() {
  hideHint();
  el.hintBtn.textContent = "💡 Need a Hint?";
}

function setPacketAnimation(status) {
  el.packetBubble.classList.remove("at-firewall", "allowed", "blocked");
  if (status) {
    requestAnimationFrame(() => el.packetBubble.classList.add(status));
  }
}

function renderPacket() {
  const p = state.packet;
  const statusClass = p.expected === "allow" ? "safe" : "danger";
  const statusText = p.expected === "allow" ? "Business Traffic" : "Risky Traffic";
  el.leftZoneLabel.textContent = p.sourceZone;
  el.rightZoneLabel.textContent = p.destinationZone;
  el.packetBubble.textContent = p.protocol === "ICMP" ? "ICMP" : `${p.protocol}/${p.destPort}`;
  setPacketAnimation("at-firewall");

  el.packetCard.innerHTML = `
    <div class="packet-main">
      <div class="packet-icon">${p.icon}</div>
      <div class="packet-content">
        <div class="packet-title-row">
          <h2>${p.label}</h2>
          <span class="badge ${statusClass}">${statusText}</span>
          <span class="badge neutral">${p.service}</span>
        </div>
        <div class="packet-fields advanced-fields">
          <div class="field"><strong>Protocol</strong>${p.protocol}</div>
          <div class="field"><strong>Source Port</strong>${p.srcPort}</div>
          <div class="field"><strong>Destination Port</strong>${p.destPort}</div>
          <div class="field"><strong>State</strong>${p.state}</div>
          <div class="field"><strong>Source</strong>${p.source}</div>
          <div class="field"><strong>Source Zone</strong>${p.sourceZone}</div>
          <div class="field"><strong>Destination</strong>${p.destination}</div>
          <div class="field"><strong>Destination Zone</strong>${p.destinationZone}</div>
        </div>
        <p class="packet-hint"><strong>Question:</strong> Should the firewall allow or block this packet?</p>
      </div>
    </div>
  `;
}

function renderRules() {
  const level = currentLevel();
  el.rulesList.innerHTML = "";
  level.rules.forEach((ruleId, index) => {
    const rule = RULES[ruleId];
    const active = state.enabledRules.includes(ruleId);
    const button = document.createElement("button");
    button.className = `rule-card ${active ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <div class="rule-top">
        <span>${index + 1}. ${rule.name}</span>
        <span class="rule-status">${active ? "ON" : "OFF"}</span>
      </div>
      <code class="rule-code">${rule.short}</code>
      <p class="rule-description">${rule.description}</p>
    `;
    button.addEventListener("click", () => toggleRule(ruleId));
    el.rulesList.appendChild(button);
  });
}

function renderLevelMap() {
  el.levelMap.innerHTML = "";
  LEVELS.forEach((level, index) => {
    const button = document.createElement("button");
    button.className = `level-button ${index === state.levelIndex ? "active" : ""} ${state.completedLevels.has(index) ? "complete" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="level-number">${index + 1}</span>
      <span>
        <strong>${level.title.replace(`Level ${index + 1}: `, "")}</strong>
        <small>${level.target} correct answers</small>
      </span>
    `;
    button.addEventListener("click", () => loadLevel(index));
    el.levelMap.appendChild(button);
  });
}

function renderPortGuide() {
  const level = currentLevel();
  const activePorts = new Set();
  level.packetIds.map(packetById).filter(Boolean).forEach(p => {
    if (p.destPort !== "-") activePorts.add(String(p.destPort));
  });

  el.portGuide.innerHTML = PORT_GUIDE.map(item => {
    const port = item.split(" ")[0];
    const active = port.split("/").some(part => activePorts.has(part));
    return `<span class="port-pill ${active ? "active" : ""}">${item}</span>`;
  }).join("");
}

function renderPolicy() {
  const level = currentLevel();
  const enabled = level.rules
    .filter(ruleId => state.enabledRules.includes(ruleId))
    .map(ruleId => RULES[ruleId]?.short)
    .filter(Boolean);
  el.policyText.textContent = enabled.length ? enabled.join("\n") : "No active rules. The firewall will rely on implicit default deny.";
}

function renderHistory() {
  if (state.history.length === 0) {
    el.historyList.innerHTML = `<p class="empty-history">No decisions yet.</p>`;
    return;
  }
  el.historyList.innerHTML = state.history.map(item => `
    <div class="history-item">
      <div class="history-top">
        <span>${item.packet}</span>
        <span class="badge ${item.correct ? "safe" : "danger"}">${item.correct ? "Correct" : "Wrong"}</span>
      </div>
      <div class="history-meta">${item.protocol} ${item.destPortText} → ${item.action.toUpperCase()}</div>
      <div class="history-meta">Rule: ${item.rule}</div>
    </div>
  `).join("");
}

function renderScore() {
  const level = currentLevel();
  const progress = Math.min(100, Math.round((state.score / level.target) * 100));
  el.scoreValue.textContent = state.score;
  el.mistakesValue.textContent = state.mistakes;
  el.streakValue.textContent = state.streak;
  el.progressFill.style.width = `${progress}%`;
  el.progressText.textContent = `Progress: ${progress}% (${state.score}/${level.target} correct)`;
}

function renderMission() {
  const level = currentLevel();
  el.missionTitle.textContent = level.title;
  el.missionBriefing.textContent = level.briefing;
  el.missionObjective.textContent = level.objective;
}

function renderAll() {
  renderMission();
  renderRules();
  renderPacket();
  renderScore();
  renderPolicy();
  renderHistory();
  renderLevelMap();
  renderPortGuide();
}

function toggleRule(ruleId) {
  if (state.enabledRules.includes(ruleId)) {
    state.enabledRules = state.enabledRules.filter(id => id !== ruleId);
  } else {
    state.enabledRules = [...state.enabledRules, ruleId];
  }
  renderRules();
  renderPolicy();
}

function loadLevel(index) {
  state.levelIndex = index;
  const level = currentLevel();
  state.enabledRules = [...level.enabledStart];
  state.packet = createPacket(level);
  state.score = 0;
  state.mistakes = 0;
  state.streak = 0;
  state.history = [];
  state.hintStep = 0;
  state.running = false;
  stopAuto();
  el.nextLevelBtn.classList.add("hidden");
  resetHintForNewPacket();
  setFeedback("info", level.title, level.briefing);
  renderAll();
}

function resetLevel() {
  loadLevel(state.levelIndex);
}

function decide(playerAction) {
  const p = state.packet;
  const firewallDecision = evaluatePacket(p);
  const actualAction = playerAction === "auto" ? firewallDecision.action : playerAction;
  const correct = actualAction === p.expected;
  const policyAligned = firewallDecision.action === p.expected;
  const level = currentLevel();

  setPacketAnimation(actualAction === "allow" ? "allowed" : "blocked");

  if (correct) {
    state.score += 1;
    state.streak += 1;
    let extra = "";
    if (playerAction !== "auto" && !policyAligned) {
      extra = ` However, your active rules would currently ${firewallDecision.action.toUpperCase()} it because of ${firewallDecision.ruleName}. Adjust the policy if you want the firewall to make the same choice automatically.`;
    } else {
      extra = ` Matching rule: ${firewallDecision.ruleName}.`;
    }
    setFeedback("success", actualAction === "allow" ? "Correct: packet allowed" : "Correct: packet blocked", `${p.lesson}${extra}`);
  } else {
    state.mistakes += 1;
    state.streak = 0;
    setFeedback("danger", actualAction === "allow" ? "Oops: risky traffic got through" : "Oops: needed traffic was blocked", `${p.lesson} The better decision was to ${p.expected.toUpperCase()} this packet. Active rule result: ${firewallDecision.ruleName} → ${firewallDecision.action.toUpperCase()}.`);
  }

  state.history = [
    {
      packet: p.label,
      protocol: p.protocol,
      destPortText: p.destPort === "-" ? "ICMP" : `dst/${p.destPort}`,
      action: actualAction,
      correct,
      rule: firewallDecision.ruleName
    },
    ...state.history
  ].slice(0, 7);

  renderScore();
  renderHistory();

  const levelComplete = state.score >= level.target;
  if (levelComplete) {
    state.completedLevels.add(state.levelIndex);
    stopAuto();
    const isLast = state.levelIndex === LEVELS.length - 1;
    setFeedback(
      "win",
      isLast ? "Game complete" : "Level complete",
      isLast
        ? "You completed all five levels. You practiced port filtering, least privilege, email/VPN policy, segmentation, stateful filtering, and default-deny logic."
        : "Nice work. You protected the network and can move to the next firewall challenge."
    );
    el.nextLevelBtn.textContent = isLast ? "Replay Level 5" : "Next Level";
    el.nextLevelBtn.classList.remove("hidden");
    renderLevelMap();
    return;
  }

  setTimeout(() => {
    state.packet = createPacket(level);
    resetHintForNewPacket();
    renderPacket();
  }, 850);
}

function startAuto() {
  if (state.running) return;
  state.running = true;
  el.autoBtn.textContent = "⏸ Stop Auto";
  state.autoTimer = setInterval(() => decide("auto"), 2600);
}

function stopAuto() {
  state.running = false;
  el.autoBtn.textContent = "▶ Apply Active Rules";
  if (state.autoTimer) {
    clearInterval(state.autoTimer);
    state.autoTimer = null;
  }
}

function toggleAuto() {
  if (state.running) {
    stopAuto();
  } else {
    startAuto();
  }
}

function showHow() {
  el.howPanel.classList.remove("hidden");
}

function hideHow() {
  el.howPanel.classList.add("hidden");
}

function wireEvents() {
  el.startBtn.addEventListener("click", () => {
    document.querySelector(".game-grid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  el.howBtn.addEventListener("click", showHow);
  el.closeHowBtn.addEventListener("click", hideHow);
  el.resetBtn.addEventListener("click", resetLevel);
  el.autoBtn.addEventListener("click", toggleAuto);
  el.hintBtn.addEventListener("click", showHint);
  el.allowBtn.addEventListener("click", () => decide("allow"));
  el.blockBtn.addEventListener("click", () => decide("block"));
  el.nextLevelBtn.addEventListener("click", () => {
    if (state.levelIndex < LEVELS.length - 1) {
      loadLevel(state.levelIndex + 1);
    } else {
      resetLevel();
    }
  });
  document.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();
    if (key === "a") decide("allow");
    if (key === "b") decide("block");
    if (key === "r") resetLevel();
    if (key === "h") showHint();
    if (key === "escape") {
      hideHow();
      hideHint();
      el.hintBtn.textContent = "💡 Need a Hint?";
    }
  });
}

function init() {
  wireEvents();
  loadLevel(0);
}

init();

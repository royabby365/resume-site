/* =====================================================================
   RESUME SITE DATA  (DE-IDENTIFIED — no PII)
   ---------------------------------------------------------------------
   Single source of truth. Edit here; index.html/app.js render it.
   No name, location, employer, contact, or handle is published.
   Identity is presented role-based only. Replace the placeholder
   values in the CONTACT section before going live if you want a
   generic reachability path that is not tied to a real person.
   ===================================================================== */
const RESUME = {
  name: "Roy U. Abernathy",
  initials: "RA",
  eyebrow: "Cybersecurity Engineering",
  tagline:
    "Defense-focused security engineer with a builder's mindset — I secure mission-critical systems the way I run a homelab: redundant, observable, and ready to pivot when the mission changes.",
  motto: "Semper Gumby — always flexible, mission first.",
  // No street address / phone / email / personal handle published (contact via form)
  heroMeta: [
    { label: "Experience", value: "8+ years" },
    { label: "Focus", value: "DoD / RMF" },
    { label: "Status", value: "Open to remote" },
  ],

  about:
    "Senior Cybersecurity Engineer with 8+ years of experience securing mission-critical Department of Defense and enterprise portfolios — leading 30-person teams, managing $2.5B in mission systems, and delivering a 100% ATO success rate. Expert in vulnerability management and a veteran with a \"builder\" mindset: I automate complex security workflows via command line and CI/CD pipelines, and I run a high-availability home lab to stay sharp.",

  /* ---- Core Competencies ---- */
  competencies: [
    {
      group: "Security & Compliance",
      items: [
        "RMF & NIST 800-53",
        "eMASS / Authorization Packages",
        "STIG / SRG Validation & SCAP",
        "DoDI 8500.01 & 8510.01",
        "POA&M Management",
        "Vulnerability Management (ACAS / Nessus)",
        "Risk Assessment & ATO Support",
      ],
    },
    {
      group: "Technical Engineering",
      items: [
        "SIEM Deployment & Tuning",
        "Linux (RHEL) Hardening & Automation",
        "Network & Endpoint Security",
        "Cloud & Hybrid Infrastructure",
        "Containerization & Virtualization (Proxmox)",
        "CI/CD Security Pipelines",
      ],
    },
    {
      group: "Automation",
      items: [
        "Bash / Python Scripting",
        "Cron & Scheduled Workflows",
        "Nessus Plugin Ingest Automation",
        "STIG Audit & Report Generation",
        "Big Data Platform Publishing",
        "Infrastructure-as-Code",
      ],
    },
  ],

  /* ---- Experience ---- */
  experience: [
    {
      title: "Senior IA Policy & Compliance Lead",
      org: "Alesig Consulting (Contractor)",
      period: "Jun 2023 – Present",
      summary:
        "Remote / CONUS base support. Spearheaded a LogRhythm SIEM deployment with 50+ custom threat detection rules, increasing detection efficacy by 35%. ACAS Administrator since Oct 2023 — developed multiple customized active and agent scan policies to boost organizational security posture visibility. Decreased workload through RHEL bash scripting and cron automation: Nessus plugin ingest, Big Data Platform publishing, and STIG audits/reports.",
    },
    {
      title: "Information Assurance Engineer",
      org: "Agile Defense (Contractor to Army TRADOC)",
      period: "Nov 2022 – Jun 2023",
      summary:
        "CONUS base support. Supported a major Army training and doctrine command by ensuring the security posture of multi-billion-dollar mission system portfolios in compliance with DoD cybersecurity directives (DoDI 8500.01, RMF/NIST 800-53).",
    },
    {
      title: "Cybersecurity Engineer",
      org: "Telos (Contractor to U.S. Army)",
      period: "Jun 2022 – Nov 2022",
      summary:
        "CONUS base support. Supported Army mission systems by maintaining security posture and continuous improvement of existing practices in compliance with organizational cybersecurity requirements — gaining deep, hands-on familiarity with RMF, NIST controls, and eMASS.",
    },
    {
      title: "Cybersecurity Engineer",
      org: "Applied Insight (Contractor to U.S. Air Force — Air Mobility Command)",
      period: "Jan 2021 – Jun 2022",
      summary:
        "Supported an Air Force major command mission by maintaining security posture and continuous improvement of practices in compliance with DoD cybersecurity requirements.",
    },
    {
      title: "Cybersecurity Engineer",
      org: "Apex Systems (Contractor)",
      period: "Sep 2020 – Jan 2021",
      summary:
        "Contracted cybersecurity engineering support across federal mission environments, applying RMF/NIST 800-53 controls and contributing to vulnerability management and compliance workflows.",
    },
    {
      title: "United States Air Force",
      org: "Senior Airman (AFSC 3D1X1) — Military Service",
      period: "Sep 2016 – 2020",
      summary:
        "Served as a Senior Airman (AFSC 3D1X1, Client Systems) with hands-on experience in Public Key Infrastructure, server management, and system administration. Built the discipline, chain-of-command fluency, and mission-first mindset that still drives my approach to defense cybersecurity.",
    },
  ],

  /* ---- Personal Projects ---- */
  projects: [
    {
      title: "Enterprise Home Lab & Security Sandbox",
      detail:
        "High-availability Proxmox cluster on a mini-PC fleet providing redundant compute and storage for a self-hosted services stack. Runs a reverse-proxy gateway with automatic TLS, isolated service networks, and a VPN-tunnelled egress path. Used daily to prototype detection rules, validate STIG hardening, and rehearse incident-response playbooks in a safe, disposable environment.",
    },
    {
      title: "Automated Vulnerability & Compliance Pipeline",
      detail:
        "Bash + cron pipeline that pulls Nessus plugin feeds, runs scheduled authenticated scans against lab hosts, and emits STIG-compliance reports — a miniature version of the workflows run in production, built to stay current between contracts.",
    },
    {
      title: "Self-Hosted Media & Backup Vault",
      detail:
        "Network-attached storage with scheduled, versioned backups and off-site replication. Centralized file, photo, and media serving with wired + wireless coverage — engineered for quiet, low-power, always-on operation.",
    },
    {
      title: "Botanisht",
      detail:
        "Open-source, offline-first plant care companion built with Flutter — 121+ species catalog, care schedules, hydroponics, no ads or tracking.",
      link: "https://botanisht.com",
    },
    {
      title: "Juggernaut: Revenge of Sovering — 64-bit Port",
      detail:
        "Resurrecting a 2012 Unity abandonware RPG for modern ARM64 Android — a verified UnityPy asset-extraction pipeline across 772 bundles and a playable placeholder APK.",
      link: "https://github.com/royabby365/juggernaut-arm64-port",
    },
    {
      title: "The Use of AI in Resurrecting Abandonware",
      detail:
        "Whitepaper announcement — documenting the full AI-guided Juggernaut ARM64 case study: reverse engineering, asset extraction, and human-AI collaboration patterns. DOI: 10.5281/zenodo.22017430",
      link: "https://doi.org/10.5281/zenodo.22017430",
    },
  ],

  /* ---- FOSS & Community (rendered inside the Personal Projects section) ---- */
  foss: {
    title: "FOSS & Community Contributions",
    note:
      "Open source isn't a side effect of the projects above — it's the point. Every project on this page ships with public source, and the tools below are maintained so the community can use, study, and build on them. This site is open too: the template that powers it is MIT-licensed and free to fork.",
    items: [
      {
        title: "SOC Resume Template (this site)",
        detail:
          "The self-hostable, SOC-style resume/portfolio powering this very page — live data rail, click-to-pin drawers, a real FireHOL attack globe, and every number sourced from real data. MIT-licensed: fork it, feed it your own data, self-host it anywhere.",
        link: "https://github.com/royabby365/soc-resume-template",
      },
      {
        title: "IzzyOnDroid Reproducible Builds (rbtlog)",
        detail:
          "Builder recipes and build logs contributed to the IzzyOnDroid Reproducible Builds Transparency Log (AGPL-3.0) — part of the pipeline that lets the community verify independent Android apps build bit-for-bit from source.",
        link: "https://github.com/royabby365/izzy-verification-builder",
      },
      {
        title: "hermes-chat",
        detail:
          "Self-hostable web chat UI for the open-source Hermes Agent — model picker, session management, and settings, so anyone can run a private agent chat front end on their own infrastructure.",
        link: "https://github.com/royabby365/hermes-chat",
      },
    ],
  },

  /* ---- Certifications ---- */
  certifications: [
    { name: "CompTIA Security+", issuer: "CompTIA", date: "2017", note: "Expires Mar 2029" },
    { name: "CompTIA Network+", issuer: "CompTIA", date: "2018" },
    { name: "CompTIA A+", issuer: "CompTIA", date: "2016" },
    { name: "ITIL Foundation", issuer: "Axelos", date: "2019" },
    { name: "Linux Essentials", issuer: "LPI", date: "2020" },
    { name: "ACAS Operator & Supervisor", issuer: "DoD / NCMS", date: "2023" },
    { name: "ESS Administrator 201 (ePO 5.10)", issuer: "McAfee / DoD", date: "2021" },
  ],

  /* ---- Skills (0-100) ---- */
  skills: [
    { name: "RMF / NIST 800-53", level: 95 },
    { name: "Vulnerability Management (ACAS)", level: 92 },
    { name: "SIEM / Detection Engineering", level: 85 },
    { name: "Linux / Bash Automation", level: 90 },
    { name: "STIG Hardening & SCAP", level: 88 },
    { name: "Network & Endpoint Security", level: 82 },
    { name: "Cloud / Virtualization", level: 80 },
    { name: "CI/CD Pipelines", level: 75 },
  ],

  /* ---- Education & Military ---- */
  education: [
    {
      name: "United States Air Force",
      type: "Military Service — Senior Airman (AFSC 3D1X1)",
      detail:
        "Served as a Senior Airman (AFSC 3D1X1, Client Systems) with hands-on experience in Public Key Infrastructure, server management, and system administration. Built the discipline, chain-of-command fluency, and mission-first mindset that still drives my approach to defense cybersecurity.",
    },
    {
      name: "Western Governor's University",
      type: "Attended",
      detail:
        "B.S. Cybersecurity program — attended, 68 credits completed. No degree conferred. Coursework in networking, security operations, and systems administration.",
    },
  ],

  /* ---- Memberships (affiliation-specific detail withheld) ---- */
  memberships: [
    {
      type: "Membership",
      name: "InfraGard — St. Louis Chapter",
      detail: "FBI-affiliated public-private partnership for critical infrastructure protection.",
    },
    {
      type: "Award",
      name: "Consulting Excellence Award (AC DRIVE)",
      detail: "Recognized for outstanding contribution to mission cybersecurity outcomes.",
    },
    {
      type: "Award",
      name: "WOW Award",
      detail: "Alesig Consulting recognition (Nov 2023) for initiative and service beyond role.",
    },
    {
      type: "Award",
      name: "Good Citizenship Medal",
      detail: "Earned with the rank of Eagle Scout — Boy Scouts of America recognition for citizenship and leadership.",
    },
  ],

  /* ---- Home Lab diagram (generic, safe, richly labeled) ---- */
  homelab: {
    title: "Home Lab Topology",
    caption:
      "Bird's-eye view of the lab: a hardened VPN gateway at the edge, two redundant Proxmox hypervisors on an isolated core network, a dedicated backup storage vault, and a TLS-terminating services network. Built for no single point of failure.",
    zones: [
      { label: "EDGE / WAN", x: 50, y: 18, w: 150, h: 250 },
      { label: "CORE NETWORK", x: 50, y: 290, w: 330, h: 250 },
      { label: "SERVICES NET", x: 360, y: 290, w: 170, h: 250 },
    ],
    nodes: [
      { id: "isp",    label: ["Internet", "WAN uplink"],                x: 60,  y: 50,  kind: "edge", note: "Public internet uplink" },
      { id: "gw",     label: ["Secure Gateway", "router + VPN egress"], x: 60,  y: 175, kind: "gateway", note: "Firewall, NAT, WireGuard/VPN tunnel" },
      { id: "switch", label: ["Managed Switch", "VLAN trunk"],          x: 60,  y: 300, kind: "net", note: "Layer-2 segmentation, 802.1Q VLANs" },
      { id: "node1",  label: ["Hypervisor A", "Proxmox VE"],            x: 230, y: 350, kind: "node", note: "Primary compute — VMs + containers" },
      { id: "node2",  label: ["Hypervisor B", "Proxmox VE"],            x: 230, y: 500, kind: "node", note: "Secondary / standby compute" },
      { id: "nas",    label: ["Storage Vault", "backups + NAS"],        x: 60,  y: 500, kind: "storage", note: "Versioned backups, off-site replication" },
      { id: "svc",    label: ["Services Net", "proxy + TLS"],           x: 480, y: 350, kind: "svc", note: "Reverse proxy, automatic certificates" },
      { id: "vault",  label: ["Media & File", "Vault"],                    x: 480, y: 500, kind: "svc", note: "File, photo & media serving" },
    ],
    links: [
      ["isp", "gw"],
      ["gw", "switch"],
      ["switch", "node1"],
      ["switch", "node2"],
      ["switch", "nas"],
      ["node1", "svc"],
      ["node2", "svc"],
      ["nas", "vault"],
      ["svc", "vault"],
    ],
    legend: [
      { kind: "edge", label: "WAN / Internet" },
      { kind: "gateway", label: "Gateway / VPN" },
      { kind: "net", label: "Network switch" },
      { kind: "node", label: "Compute (hypervisor)" },
      { kind: "storage", label: "Storage / backups" },
      { kind: "svc", label: "Service network" },
    ],
  },

  // Contact: no address / phone / email / handle published in the page.
  // The "Contact me" form POSTs to contact.endpoint; the destination
  // address lives only server-side (see contact.php / mailer config).
  contact: {
    endpoint: "/contact",
    note: "Messages go straight to my inbox — no address published here.",
    availability: "Open to remote & contract roles · typically replies within 48h",
  },

  links: {},
  footer: "Roy U. Abernathy · Self-hosted on the BigDeborah homelab stack",
};

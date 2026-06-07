# SKILL: Technical Reconnaissance & Landscape Intelligence
> Athanasios owns this. Run before every project engagement. The goal: arrive informed, not surprised.
> Only run against systems and networks you have authorisation to assess.

---

## The Reconnaissance Phases

```
Phase 1 — Passive (no contact with target)
  → WHOIS, DNS, OSINT, public records, Shodan, cert transparency
  → Zero footprint. The target cannot see you.

Phase 2 — Semi-passive (looks like normal traffic)
  → Web scraping, HTTP headers, SSL inspection, subdomain enumeration
  → Indistinguishable from normal browsing.

Phase 3 — Active (direct interaction with target)
  → Port scanning, service fingerprinting, network discovery
  → Leaves traces. Only on authorised systems.

Phase 4 — Code & Config Intelligence
  → Secrets scanning, dependency audit, hardcoded credentials
  → Against repositories and codebases you own or have access to.
```

---

## Phase 1 — Passive OSINT

### WHOIS & Domain Intelligence
```powershell
# WHOIS lookup (Windows)
whois domain.com          # if whois is installed via winget
# Or use: https://www.whois.com / https://who.is

# RDAP (modern WHOIS replacement — JSON output)
curl https://rdap.org/domain/domain.com | jq .

# Domain history and infrastructure
# → https://securitytrails.com (free tier: 50 queries/month)
# → https://viewdns.info (free, comprehensive)
# → https://domaintools.com (paid but deep)
```

**What to look for:** registrar, registration date (new domain = higher risk), registrant org, name servers, privacy guard (hiding ownership = investigate further).

---

### DNS Intelligence
```powershell
# All DNS records
nslookup -type=ANY domain.com
Resolve-DnsName -Name domain.com -Type ANY

# Specific records
Resolve-DnsName domain.com -Type A      # IPv4
Resolve-DnsName domain.com -Type MX     # Mail servers
Resolve-DnsName domain.com -Type TXT    # SPF, DMARC, verification tokens
Resolve-DnsName domain.com -Type NS     # Name servers
Resolve-DnsName domain.com -Type CNAME  # Aliases

# Subdomain enumeration (passive — uses public certificate transparency logs)
# → https://crt.sh/?q=%.domain.com
# → https://dnsdumpster.com
```

**What to look for:** 
- SPF/DMARC present? (no = phishing-susceptible domain)
- Interesting subdomains (staging, admin, dev, api, vpn, mail, old)
- Name servers reveal hosting provider
- TXT records often expose SaaS tools in use (e.g. `google-site-verification`, `ms=...` for Office 365)

---

### Shodan / Censys (Internet-Connected Systems)
```
# Shodan — what's exposed to the internet on this IP/domain
https://www.shodan.io/search?query=hostname:domain.com
https://www.shodan.io/host/[IP_ADDRESS]

# Censys — similar, often finds more certs/services
https://search.censys.io/

# VirusTotal — reputation check on domain/IP
https://www.virustotal.com/gui/domain/domain.com

# URLScan.io — scan a URL and see what it loads, requests, cookies
https://urlscan.io/search/#domain:domain.com
```

**What to look for:** open ports, banner information (service versions), exposed admin panels, known vulnerabilities associated with the service version, historical IP changes.

---

### Certificate Transparency
```
# All SSL certificates ever issued for a domain (and subdomains)
https://crt.sh/?q=%.domain.com

# SSL certificate quality check
https://www.ssllabs.com/ssltest/analyze.html?d=domain.com
```

**What to look for:** subdomains revealed by cert SAN fields, expired/self-signed certs, weak cipher suites, certificate issuer, wildcard certs.

---

### Wayback Machine / Archive Intelligence
```
# Historical snapshots of a site
https://web.archive.org/web/*/domain.com

# Check what was there before (old admin panels, old tech stack, leaked info)
# API: https://archive.org/wayback/available?url=domain.com
```

---

## Phase 2 — Semi-Passive Web Intelligence

### Site Scraping & Archival
```powershell
# wget — mirror an entire site (Windows via winget install GnuWin32.Wget)
wget --mirror --convert-links --adjust-extension --page-requisites `
     --no-parent https://domain.com -P ./site-archive

# httrack — SiteSucker equivalent for Windows (full site download)
# Install: https://www.httrack.com
httrack https://domain.com -O ./archive "+*.domain.com/*" -v

# curl — single page with full response
curl -I https://domain.com          # headers only
curl -L -A "Mozilla/5.0" https://domain.com  # follow redirects, fake UA

# PowerShell — quick header inspection
Invoke-WebRequest https://domain.com -Method HEAD | Select-Object -ExpandProperty Headers
```

### HTTP Header Intelligence
```powershell
curl -I https://domain.com
# What to look for in headers:
# Server: nginx/1.18.0 → version fingerprint
# X-Powered-By: PHP/7.4 → tech stack leak
# X-Frame-Options: missing → clickjacking possible
# Strict-Transport-Security: missing → HTTPS not enforced
# Content-Security-Policy: missing → XSS vectors not blocked
# X-Content-Type-Options: missing → MIME sniffing possible

# Full security header check
https://securityheaders.com/?q=domain.com
```

### Technology Fingerprinting
```
# Wappalyzer (browser extension OR API) — tech stack detection
https://www.wappalyzer.com/lookup/domain.com

# BuiltWith — what the site is built with
https://builtwith.com/domain.com

# retire.js — scan JS files for known vulnerable libraries
# Run as npm tool: npx retire --path ./site-archive
```

---

## Phase 3 — Active Scanning (Authorised Systems Only)

### Network Discovery (What's on This Network)
```powershell
# Discover all live hosts on local network (like Fing)
# nmap — install from https://nmap.org
nmap -sn 192.168.1.0/24           # Ping sweep — who's alive?
nmap -sn 192.168.1.0/24 --open    # Only show up hosts

# ARP scan (faster for local networks)
# arp-a shows local ARP cache — quick wins
arp -a

# Get your own network info
ipconfig /all
Get-NetIPConfiguration
```

### Port Scanning & Service Fingerprinting
```powershell
# Quick scan — top 1000 ports
nmap -sV --open target.ip

# Full port scan
nmap -sV -p- --open target.ip

# OS + service detection
nmap -A target.ip

# Specific service checks
nmap -sV -p 80,443,8080,8443,3000,3306,5432,6379,27017 target.ip
#                                                         ^ Redis  ^ MongoDB
```

**Common ports and what they signal:**
| Port | Service | If open, investigate |
|------|---------|---------------------|
| 21 | FTP | Unencrypted file transfer — credentials in plaintext |
| 22 | SSH | Normal, but check for default creds |
| 23 | Telnet | Should never be open — unencrypted |
| 25/587 | SMTP | Mail server — check relay config |
| 80/443 | HTTP/S | Normal web |
| 3306 | MySQL | DB exposed — should never be public-facing |
| 5432 | PostgreSQL | DB exposed — investigate |
| 6379 | Redis | Often misconfigured with no auth |
| 8080/8443 | Alt HTTP/S | Dev servers, admin panels |
| 27017 | MongoDB | Often no auth by default |
| 9200 | Elasticsearch | Often no auth — full data exposure risk |

---

## Phase 4 — Code & Config Intelligence

### Secrets & Credential Scanning
```powershell
# gitleaks — scan a repo for hardcoded secrets
# Install: winget install gitleaks
gitleaks detect --source ./repo-path --report-format json --report-path leaks.json

# truffleHog — scans git history too, not just current state
npx trufflehog filesystem ./repo-path

# grep patterns — quick manual scan
# API keys, tokens, passwords in code
grep -r "password\s*=" ./src --include="*.ts" --include="*.js" --include="*.env"
grep -r "api_key\|apikey\|API_KEY\|secret\|token" ./src --include="*.ts" -l
grep -r "-----BEGIN" ./src  # Private keys
grep -r "mongodb://\|postgres://\|mysql://" ./src  # Connection strings with creds
```

### Dependency Vulnerability Audit
```powershell
# npm audit — known CVEs in dependencies
cd ./ui && npm audit
cd ./server && npm audit

# Better output with fix suggestions
npm audit --json | ConvertFrom-Json | Select-Object -ExpandProperty vulnerabilities

# pnpm audit
pnpm audit --json

# Snyk (deeper, tracks over time — free tier available)
npx snyk test
```

### Hardcoded Issues Pattern Search
```powershell
# Hardcoded IPs (should be env vars)
grep -r "\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b" ./src --include="*.ts" -l

# TODO/FIXME/HACK comments (technical debt flags)
grep -r "TODO\|FIXME\|HACK\|XXX\|TEMP\|temporary" ./src --include="*.ts" -n

# console.log left in production code
grep -r "console\.log\|console\.error\|console\.warn" ./src --include="*.ts" -l

# .env files accidentally committed
git log --all --full-history -- "**/.env"
git ls-files | grep "\.env"

# Backdoor patterns
grep -r "eval(" ./src --include="*.ts" --include="*.js" -n
grep -r "exec(\|spawn(" ./src --include="*.ts" -n
grep -r "dangerouslySetInnerHTML" ./src --include="*.tsx" -n
```

---

## The Athanasios Recon Report Format

```
ATHANASIOS — RECONNAISSANCE BRIEF
Target: [domain / IP / system / codebase]
Authorised by: [Steve / client / self-assessment]
Date:
Phase: [Passive / Semi-Passive / Active / Code]
Confidence: HIGH / MEDIUM / LOW

LANDSCAPE SUMMARY
[What this system is, who runs it, what tech stack, what's exposed]

CRITICAL FINDINGS
[Things that need immediate attention — priority order]
1. [Finding] — [Risk] — [Recommendation]

INTELLIGENCE FINDINGS
[Useful but non-critical information]
1.

ATTACK SURFACE
[What an adversary could see / try / exploit]

RECOMMENDED ACTIONS
[Ordered by impact: fix these first]

GAPS / NOT ASSESSED
[What wasn't checked and why]
```

---

## Quick Windows Tooling Setup

```powershell
# Install essentials via winget
winget install nmap                    # Port scanning
winget install GnuWin32.Wget          # Site mirroring
winget install jqlang.jq              # JSON processing
winget install gitleaks               # Secrets scanning

# npm-based tools (no install needed)
npx trufflehog filesystem ./path      # Secret scanning with git history
npx retire --path ./path              # JS library vulnerability check
npx snyk test                         # Dependency audit

# Browser tools (install as extensions)
# Wappalyzer — tech fingerprinting
# uBlock Origin — see what requests a page makes
```

---

## What to Deliver to Superman After Recon

1. **Go / No-Go signal** — is there anything that blocks starting the project?
2. **Tech stack confirmed** — what's actually running (may differ from what Steve was told)
3. **Exposed surfaces** — what's visible that shouldn't be
4. **Critical security findings** — anything that needs fixing before new code is added
5. **Infrastructure map** — hosts, services, domains, relationships

Athanasios files this into `.squad/agents/athanasios/knowledge/recon/[project-name].md` for the team to reference throughout the engagement.

---

*Maintained in `.squad/skills/recon-intelligence.md`*

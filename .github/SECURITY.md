# Security Policy

This repository is the source for the production website at
[https://www.ewastekochi.com/](https://www.ewastekochi.com/). We take security
issues seriously.

## Reporting a vulnerability

If you believe you have found a security vulnerability affecting this
repository or the live production site, please report it privately.

**Contact:** [info@ewastekochi.com](mailto:info@ewastekochi.com)

**Please include:**

- A clear description of the vulnerability
- The affected URL, endpoint, or code path
- Steps to reproduce, if applicable
- Any relevant logs, screenshots, or proof-of-concept
- Your name / handle for acknowledgement (optional)

**Please do not:**

- File a public GitHub Issue for security problems — email first
- Test on production accounts, form submissions, or data belonging to real
  customers
- Attempt denial-of-service, credential stuffing, or exfiltration of any
  data that is not yours
- Publicly disclose the issue before we have had a reasonable window to
  investigate and respond

## What to expect

- **Acknowledgement:** within a few business days of receipt
- **Investigation and triage:** we will confirm whether the report is
  reproducible and determine severity
- **Remediation:** timing depends on severity and complexity; we will
  keep you informed
- **Disclosure coordination:** we will coordinate with you on any public
  disclosure timing after the issue is resolved

## Scope

**In scope:**

- The production site at `https://www.ewastekochi.com/`
- Source code in this repository (`CodesbyFebin/ewaste-kochi-main`)
- Related first-party subdomains under `ewastekochi.com` operated by the
  business (see [https://www.ewastekochi.com/](https://www.ewastekochi.com/)
  for the canonical presence)

**Out of scope:**

- Third-party services embedded on the site (report to the respective
  provider — Google Ads, Google Tag Manager, Vercel, etc.)
- Social profiles listed under `Organization.sameAs` in our site's
  structured data (report to the respective platform)
- Denial-of-service issues that require unrealistic request volume
- Findings from automated scanners without a manual reproduction

## Safe harbour

Good-faith security research that stays within the scope above and follows
the reporting rules will not be pursued as a policy violation or a legal
matter. We appreciate the work.

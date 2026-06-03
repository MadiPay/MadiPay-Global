# Security Policy

## Supported Versions

We take the security of MadiPay Global seriously. Currently, only the latest commits on the `main` branch are actively evaluated for security vulnerabilities.

| Version | Supported          |
| ------- | ------------------ |
| dev-main| :white_check_mark: |
| < 1.0.0 | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please **do not** open a public issue. Publicly disclosing cryptographic or routing vulnerabilities can expose infrastructure and transaction endpoints to malicious bot activity.

Instead, please report vulnerabilities by following these steps:
1. Draft a detailed explanation of the vulnerability, including steps to reproduce or proof-of-concept (PoC) code.
2. Submit your report directly via GitHub's private vulnerability reporting feature (if enabled) or contact the core maintainer securely.

We will acknowledge receipt of your vulnerability report within 48 hours and provide a timeline for coordination and patching.

## Security Practices

* **Zero Hardcoded Secrets:** No API keys, credentials, or encryption keys should ever be committed to this repository. Always utilize environment variables (`.env`).
* **Cryptographic Isolation:** All transaction state calculations and escrow validation logic must undergo strict automated verification before deployment.

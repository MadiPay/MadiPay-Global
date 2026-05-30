# MadiPay Global - Smart Routing & Escrow Protocol 🚀

An elite, mobile-first FinTech core application engineered for dynamic payment routing, multi-market liquidity bridging, and secure decentralized escrow management. Designed with a high-end cyber-style visual identity using Glassmorphic architecture.

## ⚡ Core Architecture & Features
### 🌐 System Data-Flow Architecture

```mermaid
graph TD
    A[Mobile Client UI] -->|Initiate Tx| B(CyberShield Core Router)
    B -->|Step 1: AML Velocity Check| C{AML Audit Engine}
    C -->|Exceeds 1M / Suspicious| D[Status: HOLD / REJECTED]
    C -->|Approved| E[Autonomous Escrow Lock]
    E -->|Dual-Action Settlement| F[Vortex Ledger System]
    F -->|Secure Write| G[(Encrypted LocalStorage)]

graph TD
    A[Mobile Client UI] -->|Initiate Tx| B(CyberShield Core Router)
    B -->|Step 1: AML Velocity Check| C{AML Audit Engine}
    C -->|Exceeds 1M / Suspicious| D[Status: HOLD / REJECTED]
    C -->|Approved| E[Autonomous Escrow Lock]
    E -->|Dual-Action Settlement| F[Vortex Ledger System]
    F -->|Secure Write| G[(Encrypted LocalStorage)]

### 1. Smart Currency Routing Engine
* **Dual-Market Analytics:** Real-time simulation bridging official banking rates and parallel market liquidity rates.
* **Dynamic Net Calculation:** Instant computation of routing values based on the selected financial market.

### 2. Autonomous Escrow Protocol
* **Liquidity Lock:** Secures transaction volume on-hold until mutual multi-party verification.
* **Dual-Action Settlement:** Supports instant automated release to the active wallet or immediate penalty-free transaction reversal.

### 3. Vortex Ledger & Audit Trail
* **Immutable Logs:** Live transactional history auditing inputs, outputs, market origins, and real-time execution states.
* **Security Badging:** Direct color-coded classification of transaction health (`Hold`, `Success`, `Rejected`).

### 4. Enterprise-Grade Simulation Resilience
* **Data Persistence:** Integrated `localStorage` pipeline to maintain wallet balances and ledger auditing across sessions.
* **Cyber Shield Verification:** Automated volume-threshold firewall rejecting abnormal transactions exceeding 1,000,000 units to simulate anti-money laundering (AML) protocols.

## 🎨 Visual Identity & UI Stack

* **Background:** Charcoal Gray `#12161A` (Sovereign Depth)
* **Accent Primary:** Neon Orange `#FF6B00` (Transaction Energy)
* **Accent Success:** Emerald Green `#00E676` (Liquidity & Trust)
* **Design Pattern:** Advanced Glassmorphism with dynamic mobile responsiveness.

## 🛠️ Deployment & Execution

The system is compiled into a single-file highly optimized architecture tailored for low-resource environments and mobile-browser execution. 

Live preview deployed via **GitHub Pages**.

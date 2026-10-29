# QMS Builder Program — Cohort I Application Draft

Use this document as source material for https://qms.finance/builders-program (Oct 28 – Nov 18, 2026).

---

## Project name

**QMS Passport**

## One-line pitch

Open-source **front door** to QMS Testnet: guided onboarding into QWAP, **PoUW-aware** transaction history, and a **Migration Kit** so builders survive the December testnet reset without losing deploy metadata.

## Repository

https://github.com/Isaaco3349/QMS-Passport

## Live demo

https://qms-passport.vercel.app

---

## What we're building

QMS Passport is three connected surfaces:

1. **Consumer onboarding** — Chainlist → faucet → QWAP first swap in one checklist (reduces drop-off on early L1).  
2. **PoUW narrative layer** — Every user tx links to the **QUBO / useful-work trace** for its inclusion block (QMSScan), making QMS’s differentiation visible to non-researchers.  
3. **Builder Migration Kit** — Versioned deployment manifests, export/import in `@qms-passport/sdk`, Foundry redeploy templates, optional `DeploymentRegistry` attestation.

We also ship **`@qms-passport/sdk`**, a public package encoding QMS v0.1 quirks (no `finalized` tag, confirmation helpers, Blockscout client) for other cohort teams.

---

## Why QMS (fit with network capabilities)

| QMS capability | How Passport uses it |
|----------------|----------------------|
| EVM compatibility (Solidity, Foundry, Hardhat) | Same stack; manifest + redeploy scripts |
| PoUW + QUBO traces on QMSScan | Core UX — activity feed |
| Public testnet + imminent reset | Migration Kit as ecosystem infrastructure |
| QWAP + faucet already live | We deep-link and measure funnel completion |
| Roadmap: finality layer | SDK switches from confirmations → configurable policy |
| Roadmap: useful-work marketplace (v2) | Phase 3 read-only preview tab |

We are **not** claiming post-quantum wallet security on EOAs today; we align with current testnet scope and PQ account roadmap.

---

## Technical execution (what exists today)

**Shipped and verifiable:**

- Public monorepo (MIT): docs, architecture, integration map  
- **Live web alpha:** https://qms-passport.vercel.app — wallet connect, onboarding, Activity (QMSScan), Migration Kit export, Badges  
- `@qms-passport/chain-config` — viem chain `19480` + ecosystem URLs  
- `@qms-passport/sdk` — QMSScan client, confirmation waiter, manifest schema, achievement inference  
- Foundry `DeploymentRegistry` with passing unit tests  
- Integration validated against live QMSScan API and QWAP router decodes on testnet  

**Before / during cohort (Nov 18+):**

- npm publish for `@qms-passport/sdk` (or documented GitHub install path for cohort teams)  
- Optional: deploy + verify `DeploymentRegistry` on testnet; 2-minute demo video  
- PoUW structured API integration when QMS / QMSScan exposes fields ([docs/POUW_DATA.md](../docs/POUW_DATA.md))

---

## Team experience

**Primary builder — @Isaaco3349**

- **GitHub:** https://github.com/Isaaco3349  
- **Focus:** EVM application layer, wallet UX, developer tooling on early-stage L1 testnets  
- **This project:** End-to-end delivery of QMS Passport — Next.js + wagmi/viem app, TypeScript SDK monorepo, Foundry contracts, Vercel production deploy, and QMS-specific docs (confirmations vs `finalized`, Blockscout integration, testnet reset manifests).  
- **Why credible for Cohort I:** Working public repo + live demo, not a slide deck; designed as **ecosystem public good** (SDK + Migration Kit) rather than a closed mini-app.

**Roles covered (lean team):**

| Role | Owner | Evidence |
|------|--------|----------|
| Product + architecture | @Isaaco3349 | README, `docs/ARCHITECTURE.md`, cohort positioning |
| Frontend / wallet UX | @Isaaco3349 | `apps/web` — onboarding, activity, badges |
| Infra / SDK | @Isaaco3349 | `@qms-passport/sdk`, `@qms-passport/chain-config`, Vercel monorepo build |

_Add if you use them on the form: X / Discord / prior shipped repos (2–3 links strengthen “team experience” without needing a large team.)_

---

## Product potential

**Users:**  
- New QMS testnet participants (onboarding)  
- Existing swappers/LPs who want context on PoUW blocks  
- Developers deploying before the December reset  

**Problem:**  
Early L1s fragment onboarding across Chainlist, faucet, DEX, and explorer; QMS’s unique PoUW story is invisible; reset destroys deployment metadata scattered across notes and explorers.

**Milestones:**

| Date | Milestone | Status |
|------|-----------|--------|
| Oct 2026 | Public repo + SDK + docs | Done |
| Oct 2026 | Live alpha at qms-passport.vercel.app | Done |
| Nov 18, 2026 | Cohort I application submitted | Planned |
| Nov 30, 2026 | Migration Kit CLI + redeploy script demo | Planned |
| Dec 2026 (reset) | Manifest import on new testnet | Planned |

**Business model:** Open source + public good; no testnet monetization required.

---

## Real progress / traction

- **Repo:** https://github.com/Isaaco3349/QMS-Passport (public)  
- **Demo:** https://qms-passport.vercel.app (production deploy on Vercel)  
- **Scope:** 4 workspace packages (web, SDK, chain-config, contracts) + builder documentation  
- **On-chain (optional next):** `DeploymentRegistry` deploy + QMSScan verify  

_Update before submit if available: GitHub stars, wallet connects on demo, manifest downloads, Discord / X post linking demo._

---

## Support requested from QMS

1. **Priority technical review** of proposed PoUW JSON API ([docs/POUW_DATA.md](../docs/POUW_DATA.md)).  
2. **Builder channel** access for QWAP router/factory address registry in official docs.  
3. **Showcase inclusion** — featured onboarding link if alpha meets quality bar.  
4. **Reset timeline signal** for in-app countdown (status page or pinned Discord date).

---

## Why spotlight / top builder tier (respectful framing)

We optimize for **ecosystem multiplier**, not a closed demo:

- **SDK** reduces support burden on QMS eng (finality tag footguns, fee estimation).  
- **Migration Kit** addresses a pain **every** team feels before December reset.  
- **PoUW UX** advances QMS narrative better than another generic DeFi fork.  
- Open to **co-marketing** with QWAP (“First swap via Passport”) and linking from official onboarding when ready.

---

## Links (paste into form)

| | URL |
|--|-----|
| GitHub | https://github.com/Isaaco3349/QMS-Passport |
| Live demo | https://qms-passport.vercel.app |
| Docs | https://github.com/Isaaco3349/QMS-Passport#readme |
| QMS Testnet RPC | https://rpc.testnet.qms.finance |
| QMSScan | https://testnet.qmsscan.io |
| QWAP | https://testnet.qwap.xyz |

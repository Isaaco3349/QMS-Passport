# QMS Builder Program — Cohort I Application Draft

Use this document as source material for https://qms.finance/builders-program (Oct 28 – Nov 18, 2026). Replace `[TEAM]` placeholders before submit.

---

## Project name

**QMS Passport**

## One-line pitch

Open-source **front door** to QMS Testnet: guided onboarding into QWAP, **PoUW-aware** transaction history, and a **Migration Kit** so builders survive the December testnet reset without losing deploy metadata.

## Repository

`https://github.com/[TEAM]/qms-passport` (public from day 0)

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

**Already in repo:**

- Monorepo with MIT license, architecture docs, integration map  
- `@qms-passport/chain-config` — viem chain + ecosystem URLs  
- `@qms-passport/sdk` — QMSScan client, confirmation waiter, manifest schema, achievement inference  
- Foundry `DeploymentRegistry` + tests scaffold  
- Verified integration against live APIs (`/api/v2/stats`, address txs, QwapRouter decodes on QMSScan)

**By Nov 18:**

- Deployed web alpha (`apps/web`) with wallet connect, onboarding, `/activity`, manifest export  
- Public demo URL + 2-minute walkthrough video  
- SDK published to npm (or GitHub packages) for cohort reuse  

---

## Team experience

`[TEAM: bios — prior shipped products, GitHub, X, relevant EVM + developer tooling experience. Pseudonym OK with verifiable track record.]`

**Roles:**

- `[Lead / product + smart contracts]`  
- `[Frontend / wallet UX]`  
- `[Infra / SDK]`  

---

## Product potential

**Users:**  
- New QMS testnet participants (onboarding)  
- Existing swappers/LPs who want context on PoUW blocks  
- Developers deploying before the December reset  

**Problem:**  
Early L1s fragment onboarding across Chainlist, faucet, DEX, and explorer; QMS’s unique PoUW story is invisible; reset destroys deployment metadata scattered across notes and explorers.

**Milestones:**

| Date | Milestone |
|------|-----------|
| Nov 7 | Public alpha URL + onboarding + activity |
| Nov 18 | Application deadline; SDK docs complete |
| Nov 30 | Migration Kit CLI + redeploy script demo |
| Dec (reset) | Manifest import on new testnet; cohort postmortem blog |

**Business model:** Open source + public good; optional hosted Passport Pro later (team analytics) — **not required for testnet**.

---

## Real progress / traction

`[Fill as you ship:]`

- GitHub stars / forks  
- Weekly active wallets  
- Manifest exports  
- Other teams importing `@qms-passport/sdk`  

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

## Links

- Docs index: [README.md](../README.md)  
- Architecture: [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)  
- QMS Testnet RPC: https://rpc.testnet.qms.finance  
- QMSScan: https://testnet.qmsscan.io  
- QWAP: https://testnet.qwap.xyz  

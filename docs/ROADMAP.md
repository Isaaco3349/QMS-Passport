# Roadmap

Timeline aligned with **QMS Builder Program Cohort I** and the **early December 2026** testnet reset announced by QMS.

## Phase 0 — Foundation (Oct 2026) ✅

- [x] Monorepo, MIT license, architecture docs  
- [x] `@qms-passport/chain-config`  
- [x] `@qms-passport/sdk` (Blockscout, confirmations, manifests, achievements)  
- [x] Foundry `DeploymentRegistry` scaffold  
- [x] Builder application draft  

**Milestone for application:** public GitHub + README + working SDK installs.

## Phase 1 — Public alpha (Nov 1 – Nov 18, 2026)

Target: live URL before application deadline **Nov 18, 2026**.

- [ ] `apps/web` deploy (Vercel or similar)  
- [ ] Wallet connect + onboarding checklist  
- [ ] `/activity` powered by QMSScan address API  
- [ ] PoUW link cards (Tier A from [POUW_DATA.md](./POUW_DATA.md))  
- [ ] `/build` local manifest editor + JSON export  
- [ ] Basic badges + OG share image for one milestone  

**Success metrics (report to QMS):**

- Unique wallets connected  
- % completing faucet step (self-reported + balance heuristic)  
- QWAP router interactions referred from Passport  
- Manifest exports created  

## Phase 2 — Migration Kit (Nov – early Dec 2026)

- [ ] CLI: `pnpm passport export` / `import`  
- [ ] Foundry `RedeployFromManifest.s.sol` documented end-to-end  
- [ ] Deploy `DeploymentRegistry` on testnet; register cohort demo  
- [ ] In-app **reset countdown** + export reminder banner  
- [ ] Publish **“Redeploy on new testnet”** guide for other builders  

**Success metrics:**

- Number of manifests exported pre-reset  
- Number of teams importing SDK for confirmations helper  

## Phase 3 — Ecosystem embed (post-reset, Dec 2026+)

- [ ] npm packages stable `@qms-passport/sdk@0.x`  
- [ ] React components: `<QmsOnboardingButton />`, `<QmsConfirmationsToast />`  
- [ ] Optional EIP-712 signed manifests  
- [ ] PoUW structured API integration (when available)  
- [ ] Explore **useful-work marketplace** read-only preview when QMS v2 testnet ships  

## Phase 4 — Mainnet readiness (future)

Out of scope for Cohort I; design constraints noted:

- Replace public RPC with provider strategy  
- PQ account flows when QMS enables ERC-4337 PQ options  
- Production analytics and SLAs  

## Non-goals (explicit)

- Competing with QWAP on AMM features  
- Custodial wallets or faucet automation that bypasses abuse controls  
- Promising post-quantum security for EOAs on current testnet  

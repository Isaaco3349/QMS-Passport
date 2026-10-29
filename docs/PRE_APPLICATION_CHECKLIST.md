# Pre-application checklist (Cohort I)

Deadline: **Nov 18, 2026** — https://qms.finance/builders-program

Repo: https://github.com/Isaaco3349/QMS-Passport

---

## Phase 1 — Local testing (~30 min)

Use a **dedicated test wallet** (not your main account).

```powershell
cd C:\Users\user\qms-passport
pnpm install
pnpm build
pnpm dev
```

| Step | Action | Pass? |
|------|--------|-------|
| 1 | Open http://localhost:3000 — no crash | ☐ |
| 2 | **Connect wallet** → switch to **QMS Testnet (19480)** | ☐ |
| 3 | **Onboard** — Chainlist, faucet, QWAP links open | ☐ |
| 4 | **Faucet** — balance shows QMS after claim | ☐ |
| 5 | **QWAP** — one small swap on testnet.qwap.xyz | ☐ |
| 6 | **Activity** — your swap tx appears + PoUW block link | ☐ |
| 7 | **Migration Kit** — add a contract address, download JSON | ☐ |
| 8 | **Badges** — at least “Fueled” / “QWAP explorer” unlock | ☐ |

Contracts (optional but strong):

```powershell
cd packages\contracts; forge test
```

---

## Phase 2 — Vercel deployment (~20 min)

1. Go to https://vercel.com → **Add New Project** → Import **Isaaco3349/QMS-Passport**.
2. **Root Directory:** click Edit → set to **`apps/web`**.
3. Framework should detect **Next.js**. Root **`apps/web`**; `vercel.json` installs from monorepo root (`cd .. && pnpm install`). The web **`build`** script compiles `@qms-passport/*` packages then runs `next build` (required because `dist/` is not committed).
4. **Environment variables** (optional — defaults work):
   - `NEXT_PUBLIC_QMS_RPC_URL` = `https://rpc.testnet.qms.finance`
   - `NEXT_PUBLIC_QMSSCAN_API` = `https://testnet.qmsscan.io/api/v2`
5. Deploy → copy live URL (e.g. `https://qms-passport-xxx.vercel.app`).

### Re-test on production URL

Repeat Phase 1 table on the **Vercel URL** (wallet + QMS Testnet).

---

## Phase 3 — Polish GitHub (~15 min)

- [ ] Add **live demo link** at top of `README.md` (Deployment URL).
- [ ] Fill **team / bios** in `builders/APPLICATION_DRAFT.md` (replace `[TEAM]` blocks).
- [ ] Commit + push:

```powershell
git add .
git commit -m "Add Vercel config and pre-application checklist"
git push
```

Optional tag:

```powershell
git tag -a v0.1.0-alpha -m "Web alpha"
git push origin v0.1.0-alpha
```

---

## Phase 4 — Optional “top tier” signals

| Item | Effort | Impact |
|------|--------|--------|
| **90s screen recording** (connect → faucet → QWAP → Activity) | Low | High |
| Deploy + verify **DeploymentRegistry** on testnet | Medium | High |
| Short post on X tagging **@QMSNetwork** with repo + demo URL | Low | Medium |
| Discord intro in QMS / builder channel with demo link | Low | Medium |

Registry deploy (throwaway key only):

```powershell
cd packages\contracts
forge script script/DeployRegistry.s.sol --rpc-url https://rpc.testnet.qms.finance --private-key $env:PRIVATE_KEY --broadcast
```

Then verify per `packages/contracts/README.md`.

---

## Phase 5 — Submit application

Use text from **`builders/APPLICATION_DRAFT.md`**. Include:

- **GitHub:** https://github.com/Isaaco3349/QMS-Passport  
- **Live demo:** your Vercel URL  
- **What you built:** onboarding + PoUW activity + Migration Kit + open SDK  
- **Why QMS:** PoUW UX + December reset tooling + public good for cohort  
- **Support needed:** PoUW JSON on QMSScan API (see `docs/POUW_DATA.md`)

---

## Order of operations (recommended)

1. Local test (Phase 1)  
2. Vercel (Phase 2)  
3. README demo link + application draft (Phase 3)  
4. Submit (Phase 5)  
5. Optional registry + video (Phase 4) if time before Nov 18  

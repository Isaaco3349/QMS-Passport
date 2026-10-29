# When to push to GitHub

Push **once** when the checklist below is green. That gives reviewers a credible public artifact without rushing a broken demo.

## Push now (minimum bar) ✅

You are ready for the **first public push** when all of these pass locally:

```powershell
cd C:\Users\user\qms-passport
pnpm install
pnpm build
cd packages\contracts; forge test
pnpm dev
```

Then in the browser at http://localhost:3000:

- [ ] Connect wallet (or see connect button without errors)
- [ ] Onboarding links open (Chainlist, faucet, QWAP)
- [ ] **Activity** loads txs when connected on QMS Testnet (or shows empty state)
- [ ] **Migration Kit** add + download manifest JSON
- [ ] **Badges** renders locked/unlocked states

**Do not commit:** `.env`, private keys, `packages/contracts/broadcast/` with your deploy key paths, or manifests containing secrets.

### First push commands

```powershell
cd C:\Users\user\qms-passport
git init
git add .
git commit -m "Initial QMS Passport: SDK, web alpha, Migration Kit docs"
```

Create an empty repo on GitHub (public), then:

```powershell
git remote add origin https://github.com/Isaaco3349/QMS-Passport.git
git branch -M main
git push -u origin main
```

Paste **https://github.com/Isaaco3349/QMS-Passport** into the Builder Program form (repo link is also in `builders/APPLICATION_DRAFT.md`).

---

## Push again (optional, stronger application)

Schedule a **second push** (or release tag `v0.1.0-alpha`) when you add:

| Enhancement | Why |
|-------------|-----|
| Live demo URL (Vercel/Netlify) | Reviewers click without cloning |
| `DeploymentRegistry` deployed + verified on QMSScan | On-chain execution proof |
| 60–90s demo video in README | Faster review |
| Team section filled in `builders/APPLICATION_DRAFT.md` | Human trust |

Tag after deploy:

```powershell
git tag -a v0.1.0-alpha -m "Public alpha web + SDK"
git push origin v0.1.0-alpha
```

---

## Before Nov 18, 2026 (application deadline)

- [ ] GitHub public and linked in application  
- [ ] Demo URL or clear README proof of local run  
- [ ] At least one manifest export tested end-to-end  
- [ ] Optional: tweet / Discord intro tagging @QMSNetwork with repo + one-line pitch  

---

## After push: deploy web (recommended within 48h)

1. Import repo in Vercel, root `apps/web` or monorepo preset.  
2. Build command: `cd ../.. && pnpm install && pnpm build` (adjust for platform) or set root to monorepo with `pnpm --filter @qms-passport/web build`.  
3. Env: copy from `apps/web/.env.example` (defaults are fine).  
4. Add demo URL to README and application.

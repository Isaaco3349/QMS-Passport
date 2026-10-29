# QMS Passport — Web

Reference client for onboarding, PoUW activity, badges, and manifest export.

## Stack

- Next.js 15 (App Router)
- wagmi v2 + viem + `@qms-passport/chain-config`
- TanStack Query for QMSScan (respect RPC/explorer rate limits)

## Routes

| Path | Purpose |
|------|---------|
| `/` | Connect wallet + onboarding checklist |
| `/activity` | Address transactions + PoUW block cards |
| `/build` | Deployment manifest editor + export |
| `/badges` | Achievements + share cards |

## Environment

```env
NEXT_PUBLIC_QMS_RPC_URL=https://rpc.testnet.qms.finance
NEXT_PUBLIC_QMSSCAN_API=https://testnet.qmsscan.io/api/v2
```

## Run

From repo root:

```powershell
pnpm install
pnpm dev
```

Or from this directory:

```powershell
pnpm dev
```

Target: **public demo URL before Nov 18, 2026** (Cohort I application deadline). See [docs/PUSH_CHECKLIST.md](../../docs/PUSH_CHECKLIST.md).

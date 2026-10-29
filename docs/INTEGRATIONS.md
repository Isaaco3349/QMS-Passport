# Integrations

All integrations use **public** QMS and ecosystem endpoints. This document is the implementation checklist for `@qms-passport/sdk` and `apps/web`.

**Source code:** https://github.com/Isaaco3349/QMS-Passport

## Network

| Field | Value | Source |
|-------|-------|--------|
| Network name | QMS Testnet | [Add QMS Network](https://docs.qms.finance/onboarding/add-qms-network) |
| Chain ID | `19480` | |
| RPC HTTPS | `https://rpc.testnet.qms.finance` | [Network and RPC](https://docs.qms.finance/for-developers/network-and-rpc) |
| RPC WSS | `wss://rpc.testnet.qms.finance` | |
| Currency | QMS (18 decimals) | |
| Block time | ~10s target, probabilistic | [EVM Compatibility](https://docs.qms.finance/for-developers/evm-compatibility) |
| Chainlist | https://chainlist.org/chain/19480 | |
| Registry short name | `qmstest` | ethereum-lists |

### RPC constraints

- ~**50 req/s** per client IP, burst ~200, HTTP 429 beyond.
- Namespaces: `eth`, `net`, `web3` on public endpoint (no `debug` / `trace`).
- **No third-party RPC providers** yet — design for caching and graceful degradation.

### JSON-RPC differences (must handle)

| Topic | Behavior on QMS v0.1 | Passport handling |
|-------|------------------------|-------------------|
| Blob txs (type 3) | Rejected `-32003` | Never submit blobs |
| `safe` / `finalized` tags | Return **genesis** | Use confirmation count only |
| `PREVRANDAO` | Always zero | Do not use for apps or games |
| Gas token | QMS native | EIP-1559; suggest fee margin in UI |
| Hard fork | Osaka from genesis | Compile `prague` / `osaka` |

## Block explorer (QMSScan / Blockscout)

| Item | Value |
|------|-------|
| UI | https://testnet.qmsscan.io |
| API v2 base | https://testnet.qmsscan.io/api/v2 |
| Verification | Blockscout verifier, no API key ([Deploy a smart contract](https://docs.qms.finance/for-developers/deploy-a-smart-contract)) |

### Endpoints we use

| Operation | Method & path |
|-----------|----------------|
| Chain stats | `GET /stats` |
| Address transactions | `GET /addresses/{hash}/transactions` |
| Transaction | `GET /transactions/{hash}` |
| Block | `GET /blocks/{height_or_hash}` |
| Block transactions | `GET /blocks/{height}/transactions` |

### PoUW-specific UI (not yet in standard block JSON)

Each **block page** in the modified explorer shows:

- QUBO instance hash  
- Winning solution + objective value  
- Download `.mtx.gz` (Matrix Market)

Passport links directly: `https://testnet.qmsscan.io/block/{height}` until structured API exists ([POUW_DATA.md](./POUW_DATA.md)).

## Faucet

| Item | Value |
|------|-------|
| URL | https://faucet.testnet.qms.finance |
| Policy (public messaging) | 10 test QMS per request, up to 4 requests / 24h (per QWAP onboarding thread) |

Passport does **not** automate faucet claims (CAPTCHA / abuse policies). We detect funding via balance delta or incoming tx from faucet contract if documented.

## QWAP (DEX)

| Item | Value |
|------|-------|
| App | https://testnet.qwap.xyz |
| Twitter | [@QWAP_xyz](https://x.com/QWAP_xyz) |

### Known verified contracts (from QMSScan, Oct 2026)

These are **testnet** addresses inferred from indexed txs — confirm on explorer before hardcoding in production UI:

| Contract | Address |
|----------|---------|
| QwapRouter | `0x93AFF45f28e5DF1b55f5AEFEfB807De843b12619` |

Passport uses router name match in Blockscout tx decode to detect “first swap” achievements.

## Predeployed infrastructure (QMS)

From [Tools and wallets](https://docs.qms.finance/for-developers/tools-and-wallets):

| Contract | Address |
|----------|---------|
| Multicall3 | `0xcA11bde05977b3631167028862bE2a173976CA11` |
| CREATE2 deployer | `0x4e59b44847b379578588920cA78FbF26c0B4956C` |
| Permit2 | `0x000000000022D473030F116dDEE9F6B43aC78BA3` |

## Status & ops

| Item | URL |
|------|-----|
| Testnet status | https://status.testnet.qms.finance |

Show degraded mode banner when status API reports incident (Phase 1).

## Developer tooling compatibility

| Tool | QMS support |
|------|-------------|
| Foundry | `forge`, `cast`, `--rpc-url https://rpc.testnet.qms.finance` |
| Hardhat 3 | `chainId: 19480`, Blockscout verify via `chainDescriptors` |
| viem / wagmi | `defineChain` — see `packages/chain-config` |
| Remix | Injected provider + QMS Testnet in wallet |

## Wallet connect

Any injected EVM wallet with custom networks (MetaMask, Rabby, OKX, etc.). We recommend a **dedicated test account** per QMS onboarding docs.

## What we do **not** have (and do not fake)

- Private QMS SDK or authenticated core APIs  
- Post-quantum signing on testnet ([EVM Compatibility — Accounts](https://docs.qms.finance/for-developers/evm-compatibility))  
- Useful-work **marketplace** contracts (roadmap QMS v2)  
- Blob / L2 sequencer infrastructure  

When those ship, Passport extends `packages/sdk` without breaking manifest v1.

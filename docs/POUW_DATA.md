# PoUW data integration

QMS blocks are produced by **proof-of-useful-work (PoUW)**: miners run a QUBO solver; block rights come from a lottery over valid outputs ([How QMS Works](https://docs.qms.finance/overview/how-qms-works-at-a-glance)).

QMSScan is a **modified Blockscout** that exposes PoUW traces on **block pages** ([Network and RPC — Block explorer](https://docs.qms.finance/for-developers/network-and-rpc)):

- QUBO instance hash  
- Winning solution and objective value  
- Full instance download (`.mtx.gz`, Matrix Market format)

Passport’s product promise is to make this **visible beside every user transaction**, not buried in explorer advanced views.

## Current API reality (verified Oct 2026)

`GET https://testnet.qmsscan.io/api/v2/blocks/{height}` returns standard Blockscout fields (gas, miner, timestamp, tx count) but **does not include** PoUW-specific fields in JSON.

Therefore v0.1 enrichment strategy:

| Tier | Approach | Reliability |
|------|----------|-------------|
| **A (ship now)** | Deep link: `https://testnet.qmsscan.io/block/{height}` with copy explaining QUBO trace | High |
| **B (optional)** | Parse HTML block page server-side in BFF (fragile; feature-flagged) | Medium |
| **C (preferred partnership)** | Official PoUW fields on explorer API or `GET /blocks/{height}/pouw` | High |

## Proposed PoUW JSON shape (collaboration draft)

We submitted this shape to align SDK types with a future endpoint — feedback welcome from QMS engineering:

```json
{
  "block_height": 232600,
  "block_hash": "0x…",
  "pouw": {
    "qubo_instance_hash": "0x…",
    "objective_value": "-12345",
    "winning_solution": "…",
    "instance_download_url": "https://testnet.qmsscan.io/…/instance.mtx.gz",
    "problem_class": "QUBO"
  }
}
```

`@qms-passport/sdk` already types this as `PouwBlockMeta | null` in `pouw.ts` and falls back to explorer links when null.

## UX copy (accurate, non-hype)

Use language consistent with QMS docs:

- Blocks are **probabilistic** (~10s target), not fixed slots.  
- PoUW lottery is over **valid solver runs**, not “best solution wins the block.”  
- Today’s testnet uses **randomly generated** QUBO instances; client-submitted marketplace problems are **roadmap** ([Releases](https://docs.qms.finance/overview/releases)).

## Why this matters for Builder Program spotlight

QMS differentiates on useful work + post-quantum roadmap. Most apps ignore PoUW entirely. Passport makes PoUW **the default story** after every swap, deploy, or transfer — without requiring users to download `.mtx.gz` files.

**Ask:** priority technical support to land Tier C before Cohort I demo day — unlocks live PoUW cards in `/activity` instead of link-only mode.

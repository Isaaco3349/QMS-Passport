# Testnet Migration Kit

QMS has communicated a **major testnet reset** around **early December 2026**. All balances, LP positions, and contract deployments on the current testnet are ephemeral ([Builder Program announcement](https://qms.finance/builders-program), [Welcome to QMS Testnet](https://qms.finance/news/welcome-to-qms-testnet)).

Passport treats migration as a **first-class product**, not a footnote.

## Manifest format (`passport-manifest/v1`)

```json
{
  "version": "passport-manifest/v1",
  "chainId": 19480,
  "exportedAt": "2026-11-15T12:00:00.000Z",
  "project": {
    "name": "my-dapp",
    "repository": "https://github.com/you/my-dapp"
  },
  "deployments": [
    {
      "name": "MyToken",
      "address": "0x…",
      "transactionHash": "0x…",
      "blockNumber": 123456,
      "deployer": "0x…",
      "compiler": {
        "tool": "foundry",
        "version": "0.2.0",
        "evmVersion": "prague"
      },
      "constructorArgs": [],
      "abi": [],
      "commit": "abc123"
    }
  ],
  "notes": "Testnet v0.1 — redeploy on new chainId if changed"
}
```

Validate with `@qms-passport/sdk`:

```typescript
import { parseManifest, serializeManifest } from "@qms-passport/sdk";
const manifest = parseManifest(jsonString);
```

## User workflow

1. **During v0.1 testnet:** register each deployment in Passport `/build`.  
2. **Export** JSON before reset deadline.  
3. **Store** in repo `deployments/qms-testnet-v0.1.json` (no private keys).  
4. **After new testnet launches:** update RPC + chain ID if needed; run redeploy script with same constructor args / CREATE2 salts.  
5. **Optional:** call `DeploymentRegistry.registerDeployment(manifestHash, metadataURI)` for public attestation.

## Foundry redeploy (template)

```bash
cd packages/contracts
export MANIFEST_PATH=../../deployments/qms-testnet-v0.1.json
forge script script/RedeployFromManifest.s.sol \
  --rpc-url https://rpc.testnet.qms.finance \
  --broadcast
```

Script behavior (Phase 2):

- Reads manifest JSON from `MANIFEST_PATH`  
- Redeploys contracts in dependency order (user-defined `deployOrder` field — upcoming)  
- Writes `passport-manifest/v1` for **new** testnet with fresh addresses  

## Checklist for other Builder teams

Share this checklist in Discord — positions Passport as **ecosystem public good**:

- [ ] Export ABIs and constructor args  
- [ ] Pin compiler `evmVersion` (`prague` / `osaka`)  
- [ ] Document external dependencies (oracles, QWAP pairs)  
- [ ] Re-verify on QMSScan after redeploy  
- [ ] Re-seed test liquidity on QWAP if applicable  

## Optional on-chain registry

`DeploymentRegistry.sol`:

- Stores `manifestHash → registrant, timestamp, metadataURI`  
- **Does not** store full ABI on-chain (too large); URI points to IPFS/GitHub release  

Use case: cohort demo day — prove you redeployed the same codebase after reset.

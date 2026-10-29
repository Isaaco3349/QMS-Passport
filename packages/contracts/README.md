# QMS Passport — contracts

Foundry project for optional on-chain manifest anchoring on QMS Testnet.

## Test

```bash
forge install foundry-rs/forge-std --no-commit 2>/dev/null || true
forge test
```

## Deploy to QMS Testnet

```bash
forge script script/DeployRegistry.s.sol \
  --rpc-url https://rpc.testnet.qms.finance \
  --private-key $PRIVATE_KEY \
  --broadcast
```

Verify on QMSScan ([docs](https://docs.qms.finance/for-developers/deploy-a-smart-contract)):

```bash
forge verify-contract --verifier blockscout \
  --verifier-url https://testnet.qmsscan.io/api \
  --chain-id 19480 \
  <DEPLOYED_ADDRESS> \
  src/DeploymentRegistry.sol:DeploymentRegistry
```

`script/RedeployFromManifest.s.sol` lands in Phase 2 — see [docs/TESTNET_MIGRATION.md](../../docs/TESTNET_MIGRATION.md).

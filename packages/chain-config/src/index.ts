import { defineChain, type Chain } from "viem";

/** QMS Testnet — https://docs.qms.finance/for-developers/network-and-rpc */
export const QMS_TESTNET_CHAIN_ID = 19480 as const;

export const qmsTestnet: Chain = defineChain({
  id: QMS_TESTNET_CHAIN_ID,
  name: "QMS Testnet",
  nativeCurrency: { name: "QMS", symbol: "QMS", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.qms.finance"] },
    public: { http: ["https://rpc.testnet.qms.finance"] },
  },
  blockExplorers: {
    default: { name: "QMSScan", url: "https://testnet.qmsscan.io" },
  },
  testnet: true,
});

/** Until PQ finality ships, never rely on `safe` / `finalized` RPC tags. */
export const QMS_CONFIRMATIONS = {
  /** Default UI "confirmed" state */
  DEFAULT: 12,
  /** High-value actions (LP, large swaps) */
  STRICT: 20,
} as const;

export const ecosystemLinks = {
  docs: "https://docs.qms.finance",
  docsLlms: "https://docs.qms.finance/llms.txt",
  faucet: "https://faucet.testnet.qms.finance",
  qwap: "https://testnet.qwap.xyz",
  chainlist: "https://chainlist.org/chain/19480",
  status: "https://status.testnet.qms.finance",
  buildersProgram: "https://qms.finance/builders-program",
  qmsscanApiV2: "https://testnet.qmsscan.io/api/v2",
} as const;

/** Predeployed infra — https://docs.qms.finance/for-developers/tools-and-wallets */
export const qmsPredeployed = {
  multicall3: "0xcA11bde05977b3631167028862bE2a173976CA11",
  create2Deployer: "0x4e59b44847b379578588920cA78FbF26c0B4956C",
  permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
} as const;

/**
 * Verified on QMSScan (testnet, Oct 2026). Confirm on explorer before production reliance.
 * @see docs/INTEGRATIONS.md
 */
export const qmsEcosystemContracts = {
  qwapRouter: "0x93AFF45f28e5DF1b55f5AEFEfB807De843b12619",
} as const;

export function qmsscanBlockUrl(height: number | bigint): string {
  return `${qmsTestnet.blockExplorers!.default!.url}/block/${height}`;
}

export function qmsscanTxUrl(hash: `0x${string}`): string {
  return `${qmsTestnet.blockExplorers!.default!.url}/tx/${hash}`;
}

export function qmsscanAddressUrl(address: `0x${string}`): string {
  return `${qmsTestnet.blockExplorers!.default!.url}/address/${address}`;
}

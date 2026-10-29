import { QMS_TESTNET_CHAIN_ID } from "@qms-passport/chain-config";

export const MANIFEST_VERSION = "passport-manifest/v1" as const;

export type DeploymentEntry = {
  name: string;
  address: `0x${string}`;
  transactionHash?: `0x${string}`;
  blockNumber?: number;
  deployer?: `0x${string}`;
  compiler?: {
    tool: "foundry" | "hardhat" | "remix" | "other";
    version?: string;
    evmVersion?: string;
  };
  constructorArgs?: unknown[];
  abi?: unknown[];
  commit?: string;
};

export type PassportManifest = {
  version: typeof MANIFEST_VERSION;
  chainId: typeof QMS_TESTNET_CHAIN_ID;
  exportedAt: string;
  project?: {
    name?: string;
    repository?: string;
  };
  deployments: DeploymentEntry[];
  notes?: string;
};

export function createEmptyManifest(): PassportManifest {
  return {
    version: MANIFEST_VERSION,
    chainId: QMS_TESTNET_CHAIN_ID,
    exportedAt: new Date().toISOString(),
    deployments: [],
  };
}

export function parseManifest(json: string): PassportManifest {
  const data = JSON.parse(json) as PassportManifest;
  validateManifest(data);
  return data;
}

export function serializeManifest(manifest: PassportManifest): string {
  validateManifest(manifest);
  return JSON.stringify(manifest, null, 2);
}

export function validateManifest(m: PassportManifest): void {
  if (m.version !== MANIFEST_VERSION) {
    throw new Error(`Unsupported manifest version: ${m.version}`);
  }
  if (m.chainId !== QMS_TESTNET_CHAIN_ID) {
    throw new Error(`Expected chainId ${QMS_TESTNET_CHAIN_ID}, got ${m.chainId}`);
  }
  if (!Array.isArray(m.deployments)) {
    throw new Error("manifest.deployments must be an array");
  }
  for (const d of m.deployments) {
    if (!d.name?.trim()) throw new Error("deployment.name is required");
    if (!d.address?.startsWith("0x")) throw new Error(`invalid address for ${d.name}`);
  }
}

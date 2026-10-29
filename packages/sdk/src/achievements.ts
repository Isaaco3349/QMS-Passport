import { qmsEcosystemContracts } from "@qms-passport/chain-config";
import type { QmsscanAddressTx } from "./qmsscan.js";

export type BadgeId =
  | "network_citizen"
  | "fueled"
  | "qwap_explorer"
  | "builder"
  | "migration_ready";

export type Badge = {
  id: BadgeId;
  title: string;
  description: string;
  unlocked: boolean;
};

export type AchievementContext = {
  /** Native QMS balance > 0 */
  hasQmsBalance?: boolean;
  /** User exported a manifest this session (app-tracked) */
  exportedManifest?: boolean;
  transactions?: QmsscanAddressTx[];
};

const QWAP_ROUTER = qmsEcosystemContracts.qwapRouter.toLowerCase();

export function computeBadges(ctx: AchievementContext): Badge[] {
  const txs = ctx.transactions ?? [];
  const hasContractCreation = txs.some((t) => t.to === null || t.method === "create");
  const hasQwap = txs.some(
    (t) =>
      t.to?.hash?.toLowerCase() === QWAP_ROUTER ||
      t.to?.name?.toLowerCase().includes("qwap"),
  );

  return [
    {
      id: "network_citizen",
      title: "Network citizen",
      description: "Connected on QMS Testnet (chain 19480) with a live balance.",
      unlocked: Boolean(ctx.hasQmsBalance),
    },
    {
      id: "fueled",
      title: "Fueled",
      description: "Received test QMS from the faucet (balance detected).",
      unlocked: Boolean(ctx.hasQmsBalance),
    },
    {
      id: "qwap_explorer",
      title: "QWAP explorer",
      description: "Executed a swap or router interaction on QWAP.",
      unlocked: hasQwap,
    },
    {
      id: "builder",
      title: "Builder",
      description: "Deployed a smart contract on QMS Testnet.",
      unlocked: hasContractCreation,
    },
    {
      id: "migration_ready",
      title: "Migration-ready",
      description: "Exported a deployment manifest before the testnet reset.",
      unlocked: Boolean(ctx.exportedManifest),
    },
  ];
}

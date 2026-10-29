import type { PublicClient, Hash } from "viem";
import { QMS_CONFIRMATIONS } from "@qms-passport/chain-config";

export type WaitForConfirmationsOptions = {
  confirmations?: number;
  pollIntervalMs?: number;
  timeoutMs?: number;
};

/**
 * QMS v0.1 has no finality layer — `safe` / `finalized` return genesis.
 * Always wait for inclusion + N confirmations.
 */
export async function waitForQmsConfirmations(
  client: PublicClient,
  txHash: Hash,
  options: WaitForConfirmationsOptions = {},
): Promise<{ blockNumber: bigint; confirmations: number }> {
  const confirmationsNeeded = options.confirmations ?? QMS_CONFIRMATIONS.DEFAULT;
  const pollIntervalMs = options.pollIntervalMs ?? 2_000;
  const timeoutMs = options.timeoutMs ?? 180_000;
  const started = Date.now();

  let receipt = await client.getTransactionReceipt({ hash: txHash }).catch(() => null);
  while (!receipt) {
    if (Date.now() - started > timeoutMs) {
      throw new Error(`Timeout waiting for tx ${txHash} to be mined`);
    }
    await sleep(pollIntervalMs);
    receipt = await client.getTransactionReceipt({ hash: txHash }).catch(() => null);
  }

  const targetBlock = receipt.blockNumber;

  while (true) {
    const head = await client.getBlockNumber();
    const conf = Number(head - targetBlock) + 1;
    if (conf >= confirmationsNeeded) {
      return { blockNumber: targetBlock, confirmations: conf };
    }
    if (Date.now() - started > timeoutMs) {
      throw new Error(
        `Timeout waiting for ${confirmationsNeeded} confirmations on ${txHash} (at ${conf})`,
      );
    }
    await sleep(pollIntervalMs);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

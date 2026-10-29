import { qmsscanBlockUrl } from "@qms-passport/chain-config";

/** Future QMSScan / QMS PoUW API shape — see docs/POUW_DATA.md */
export type PouwBlockMeta = {
  block_height: number;
  block_hash?: `0x${string}`;
  pouw: {
    qubo_instance_hash?: `0x${string}`;
    objective_value?: string;
    winning_solution?: string;
    instance_download_url?: string;
    problem_class?: string;
  };
};

export type PouwCardModel = {
  blockHeight: number;
  explorerBlockUrl: string;
  structured: PouwBlockMeta | null;
  summary: string;
};

export function buildPouwCard(blockHeight: number, structured: PouwBlockMeta | null): PouwCardModel {
  const explorerBlockUrl = qmsscanBlockUrl(blockHeight);

  if (structured?.pouw?.qubo_instance_hash) {
    const obj = structured.pouw.objective_value ?? "—";
    return {
      blockHeight,
      explorerBlockUrl,
      structured,
      summary:
        `Block ${blockHeight} was produced via PoUW (QUBO). ` +
        `Instance ${structured.pouw.qubo_instance_hash.slice(0, 10)}… · objective ${obj}. ` +
        `Open the block on QMSScan for the full solution trace.`,
    };
  }

  return {
    blockHeight,
    explorerBlockUrl,
    structured: null,
    summary:
      `Block ${blockHeight} was produced via proof-of-useful-work. ` +
      `QMSScan shows the QUBO instance, winning solution, and downloadable matrix for this block.`,
  };
}

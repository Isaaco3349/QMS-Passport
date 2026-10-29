"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount, useBalance } from "wagmi";
import { computeBadges, createQmsscanClient } from "@qms-passport/sdk";
import { qmsTestnet } from "@qms-passport/chain-config";
import { useManifestStorage } from "@/hooks/useManifestStorage";

const scan = createQmsscanClient({
  baseUrl: process.env.NEXT_PUBLIC_QMSSCAN_API,
});

export default function BadgesPage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address, chainId: qmsTestnet.id });
  const { didExport } = useManifestStorage();

  const { data: txs } = useQuery({
    queryKey: ["badges-txs", address],
    enabled: Boolean(address),
    queryFn: () => scan.getAddressTransactions(address!, { maxPages: 2 }),
  });

  const badges = computeBadges({
    hasQmsBalance: Boolean(balance && balance.value > 0n),
    exportedManifest: didExport,
    transactions: txs,
  });

  if (!isConnected) {
    return (
      <main className="card">
        <h2>Badges</h2>
        <p className="muted">Connect wallet to evaluate milestones.</p>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <h1>Badges</h1>
        <p className="lead">Verifiable testnet milestones for cohort showcase and social sharing.</p>
      </section>

      <div className="badge-grid">
        {badges.map((b) => (
          <div key={b.id} className={`card badge ${b.unlocked ? "unlocked" : ""}`}>
            <h3>{b.title}</h3>
            <p className="muted">{b.description}</p>
            <p>{b.unlocked ? "Unlocked" : "Locked"}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { buildPouwCard, createQmsscanClient } from "@qms-passport/sdk";
import { qmsscanTxUrl } from "@qms-passport/chain-config";

const scan = createQmsscanClient({
  baseUrl: process.env.NEXT_PUBLIC_QMSSCAN_API,
});

export default function ActivityPage() {
  const { address, isConnected } = useAccount();

  const { data, isLoading, error } = useQuery({
    queryKey: ["activity", address],
    enabled: Boolean(address),
    queryFn: () => scan.getAddressTransactions(address!),
  });

  if (!isConnected) {
    return (
      <main className="card">
        <h2>Activity</h2>
        <p className="muted">Connect your wallet to load transactions from QMSScan.</p>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <h1>Activity</h1>
        <p className="lead">
          Your recent QMS Testnet transactions with proof-of-useful-work block context (via QMSScan).
        </p>
      </section>

      <div className="card">
        {isLoading && <p className="muted">Loading transactions…</p>}
        {error && <p className="muted">Could not load QMSScan: {(error as Error).message}</p>}
        {data && data.length === 0 && <p className="muted">No transactions yet on this address.</p>}
        {data?.slice(0, 20).map((tx) => {
          const pouw = buildPouwCard(tx.block_number, null);
          return (
            <div key={tx.hash} className="tx-row">
              <div className="mono">
                <a href={qmsscanTxUrl(tx.hash)} target="_blank" rel="noreferrer">
                  {tx.hash.slice(0, 10)}…
                </a>
                {tx.method ? ` · ${tx.method}` : ""}
              </div>
              <p className="muted" style={{ margin: "0.35rem 0" }}>
                Block {tx.block_number} · {tx.confirmations} confirmations
                {tx.to?.name ? ` · ${tx.to.name}` : ""}
              </p>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>{pouw.summary}</p>
              <p style={{ margin: "0.35rem 0 0" }}>
                <a href={pouw.explorerBlockUrl} target="_blank" rel="noreferrer">
                  View PoUW trace on QMSScan →
                </a>
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

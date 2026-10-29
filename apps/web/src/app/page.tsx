"use client";

import { ecosystemLinks, QMS_TESTNET_CHAIN_ID, qmsTestnet } from "@qms-passport/chain-config";
import { useAccount, useBalance } from "wagmi";

export default function OnboardPage() {
  const { isConnected, chainId } = useAccount();
  const { data: balance } = useBalance({ chainId: qmsTestnet.id });
  const onChain = isConnected && chainId === QMS_TESTNET_CHAIN_ID;
  const hasBalance = Boolean(balance && balance.value > 0n);

  const steps = [
    {
      title: "Connect wallet",
      done: isConnected,
      body: "Use MetaMask, Rabby, or any injected EVM wallet.",
    },
    {
      title: "Add QMS Testnet (chain 19480)",
      done: onChain,
      body: "Switch network or add via Chainlist.",
      action: { href: ecosystemLinks.chainlist, label: "Open Chainlist" },
    },
    {
      title: "Claim test QMS",
      done: hasBalance,
      body: "Faucet: 10 QMS per request (testnet only).",
      action: { href: ecosystemLinks.faucet, label: "Open faucet" },
    },
    {
      title: "First swap on QWAP",
      done: false,
      body: "Try Swap after you have gas. Passport detects QWAP txs on Activity.",
      action: { href: ecosystemLinks.qwap, label: "Open QWAP" },
    },
  ];

  return (
    <main>
      <section className="hero">
        <h1>Front door to the useful-work chain</h1>
        <p className="lead">
          Guided onboarding for QMS Testnet, PoUW context for your transactions, and a Migration Kit
          for the upcoming testnet reset. Built for the QMS Builder Program.
        </p>
      </section>

      <div className="card">
        <h2>Onboarding checklist</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className={`step-num ${s.done ? "done" : ""}`}>{i + 1}</span>
              <div className="step-body">
                <strong>{s.title}</strong>
                <p>{s.body}</p>
                {s.action && (
                  <p>
                    <a href={s.action.href} target="_blank" rel="noreferrer">
                      {s.action.label} →
                    </a>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Developer docs</h3>
          <p className="muted">
            EVM-compatible: Solidity, Foundry, Hardhat. No blob txs. Use confirmations, not
            finalized.
          </p>
          <p>
            <a href={ecosystemLinks.docs} target="_blank" rel="noreferrer">
              docs.qms.finance →
            </a>
          </p>
        </div>
        <div className="card">
          <h3>Builder Program</h3>
          <p className="muted">Cohort I applications open through Nov 18, 2026.</p>
          <p>
            <a href={ecosystemLinks.buildersProgram} target="_blank" rel="noreferrer">
              Apply →
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { qmsTestnet, QMS_TESTNET_CHAIN_ID } from "@qms-passport/chain-config";
import { formatEther } from "viem";

export function WalletBar() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address, chainId: qmsTestnet.id });

  const wrongChain = isConnected && chainId !== QMS_TESTNET_CHAIN_ID;

  return (
    <div className="wallet-bar">
      {!isConnected ? (
        <button
          type="button"
          className="btn primary"
          disabled={isPending}
          onClick={() => connect({ connector: connectors[0] })}
        >
          Connect wallet
        </button>
      ) : (
        <>
          {wrongChain && (
            <button
              type="button"
              className="btn warn"
              onClick={() => switchChain({ chainId: QMS_TESTNET_CHAIN_ID })}
            >
              Switch to QMS Testnet
            </button>
          )}
          <span className="mono">
            {address?.slice(0, 6)}…{address?.slice(-4)}
          </span>
          <span className="muted">
            {balance ? `${Number(formatEther(balance.value)).toFixed(4)} QMS` : "— QMS"}
          </span>
          <button type="button" className="btn ghost" onClick={() => disconnect()}>
            Disconnect
          </button>
        </>
      )}
    </div>
  );
}

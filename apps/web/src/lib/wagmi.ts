"use client";

import { createConfig, http, injected } from "wagmi";
import { qmsTestnet } from "@qms-passport/chain-config";

const rpcUrl =
  process.env.NEXT_PUBLIC_QMS_RPC_URL ?? "https://rpc.testnet.qms.finance";

export const wagmiConfig = createConfig({
  chains: [qmsTestnet],
  connectors: [injected()],
  transports: {
    [qmsTestnet.id]: http(rpcUrl),
  },
  ssr: true,
});

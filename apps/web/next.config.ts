import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  transpilePackages: ["@qms-passport/chain-config", "@qms-passport/sdk"],
  outputFileTracingRoot: root,
};

export default nextConfig;

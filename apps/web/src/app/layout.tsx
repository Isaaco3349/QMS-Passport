import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/Nav";
import { Providers } from "@/components/Providers";
import { WalletBar } from "@/components/WalletBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "QMS Passport — Front door to QMS Testnet",
  description:
    "Onboard to QMS Testnet, explore PoUW block context for your transactions, and export deployment manifests before the testnet reset.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="shell">
            <Nav />
            <WalletBar />
            <div className="banner">
              Testnet only. No real funds. Tokens and LP reset around early December 2026.
            </div>
            {children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "LucidEco Dapp",
  description: "Token + Faucet + Staking on Base",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

import ConnectWallet from "@/components/ConnectWallet";
import TokenInfo from "@/components/TokenInfo";
import Faucet from "@/components/Faucet";
import Staking from "@/components/Staking";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">LucidEco Dapp</h1>

      <ConnectWallet />

      <TokenInfo isConnected={false} />

      <Faucet />

      <Staking isConnected={false} />
    </main>
  );
}

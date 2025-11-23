"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContracts } from "@/lib/contract";

export default function Faucet() {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  async function claim() {
    try {
      setLoading(true);
      setTxHash("");

      if (!window.ethereum) return alert("Install MetaMask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const { staking } = await getContracts(signer);

      const tx = await staking.claimFaucet();
      await tx.wait();

      setTxHash(tx.hash);
      alert("Faucet claimed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-900 p-5 rounded-xl space-y-3">
      <h2 className="text-xl font-bold">Faucet</h2>

      <button
        onClick={claim}
        disabled={loading}
        className="bg-green-600 px-4 py-2 rounded-lg w-full hover:bg-green-700"
      >
        {loading ? "Claiming..." : "Claim Faucet Tokens"}
      </button>

      {txHash && (
        <p className="text-xs text-gray-400 break-all">
          Tx: {txHash}
        </p>
      )}
    </div>
  );
}

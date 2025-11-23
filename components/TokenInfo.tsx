"use client";

import { useEffect, useState } from "react";
import { getContracts } from "@/lib/contract";
import { ethers } from "ethers";

export default function TokenInfo() {
  const [balance, setBalance] = useState("0");
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function load() {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const user = await signer.getAddress();
      setAddress(user);

      const { token } = await getContracts(signer);
      const bal = await token.balanceOf(user);
      setBalance(ethers.formatUnits(bal, 18));
    }
    load();
  }, []);

  return (
    <div className="bg-gray-900 p-5 rounded-xl">
      <h2 className="text-xl font-bold mb-2">Your Token Balance</h2>
      <p className="text-2xl">{balance} LUT</p>
    </div>
  );
}

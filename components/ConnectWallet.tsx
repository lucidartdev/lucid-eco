"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet() {
  const [address, setAddress] = useState("");

  async function connect() {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAddress(accounts[0]);
  }

  return (
    <div className="bg-gray-900 p-4 rounded-xl flex justify-between items-center">
      <span className="text-sm text-gray-400">
        {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
      </span>
      <button
        onClick={connect}
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {address ? "Connected" : "Connect Wallet"}
      </button>
    </div>
  );
}

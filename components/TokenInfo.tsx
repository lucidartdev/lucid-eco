'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContracts } from '@/lib/contract';

interface TokenInfoProps {
  isConnected: boolean;
}

export default function TokenInfo({ isConnected }: TokenInfoProps) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('0');

  useEffect(() => {
    async function fetchTokenInfo() {
      if (!isConnected || !window.ethereum) return;

      const { token } = await getContracts();
      const tokenName = await token.name();
      const tokenSymbol = await token.symbol();
      const tokenSupply = await token.totalSupply();

      setName(tokenName);
      setSymbol(tokenSymbol);
      setSupply(ethers.formatUnits(tokenSupply, 18));
    }

    fetchTokenInfo();
  }, [isConnected]);

  return (
    <div className="bg-gray-900 p-5 rounded-xl space-y-2">
      <h2 className="text-xl font-bold">Token Info</h2>
      <p>Name: {name}</p>
      <p>Symbol: {symbol}</p>
      <p>Total Supply: {supply}</p>
    </div>
  );
}

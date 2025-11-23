'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContracts } from '@/lib/contract';

interface StakingProps {
  isConnected: boolean;
}

export default function Staking({ isConnected }: StakingProps) {
  const [amount, setAmount] = useState('');
  const [staked, setStaked] = useState('0');
  const [rewards, setRewards] = useState('0');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    async function fetchStakingInfo() {
      if (!isConnected || !window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const user = await signer.getAddress();
      const { staking } = await getContracts(signer);
      const stakeBal = await staking.stakedBalance(user);
      const rewardBal = await staking.calculateRewards(user);
      setStaked(ethers.formatUnits(stakeBal, 18));
      setRewards(ethers.formatUnits(rewardBal, 18));
    }
    fetchStakingInfo();
  }, [isConnected, refreshTrigger]);

  async function stake() {
    if (!amount) return;
    if (!isConnected) return alert('Connect wallet first');
    if (!window.ethereum) return alert('Please install MetaMask');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const { token, staking } = await getContracts(signer);

    const parsed = ethers.parseUnits(amount, 18);

    // Approve first
    const approveTx = await token.approve(staking.target, parsed);
    await approveTx.wait();

    // Stake
    const tx = await staking.stake(parsed);
    await tx.wait();

    alert('Staked!');
    setRefreshTrigger(t => t + 1);
  }

  async function unstake() {
    if (!isConnected) return alert('Connect wallet first');
    if (!window.ethereum) return alert('Please install MetaMask');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const { staking } = await getContracts(signer);
    const tx = await staking.unstake();
    await tx.wait();

    alert('Unstaked!');
    setRefreshTrigger(t => t + 1);
  }

  async function claimRewards() {
    if (!isConnected) return alert('Connect wallet first');
    if (!window.ethereum) return alert('Please install MetaMask');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const { staking } = await getContracts(signer);
    const tx = await staking.claimRewards();
    await tx.wait();

    alert('Rewards claimed!');
    setRefreshTrigger(t => t + 1);
  }

  return (
    <div className="bg-gray-900 p-5 rounded-xl space-y-4">
      <h2 className="text-xl font-bold">Staking</h2>

      <p>Staked: {staked} LUT</p>
      <p>Rewards: {rewards} LUT</p>

      <input
        type="number"
        placeholder="Amount"
        className="bg-gray-800 p-3 rounded w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={stake}
        className="bg-blue-600 w-full p-3 rounded hover:bg-blue-700"
      >
        Stake
      </button>

      <button
        onClick={unstake}
        className="bg-yellow-600 w-full p-3 rounded hover:bg-yellow-700"
      >
        Unstake
      </button>

      <button
        onClick={claimRewards}
        className="bg-purple-600 w-full p-3 rounded hover:bg-purple-700"
      >
        Claim Rewards
      </button>
    </div>
  );
}

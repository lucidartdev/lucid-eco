import { ethers } from "ethers";
import tokenABI from "./LucidToken.json";
import stakingABI from "./LucidStaking.json";

export const TOKEN_ADDRESS = "0xB5AC14e4a8C1C53c9b3E88E499B6344b7B871298";
export const STAKING_ADDRESS = "0x723d75511f7F7515bD4658C209374f3a17E292E3";

export async function getContracts(signer: any) {
  const token = new ethers.Contract(TOKEN_ADDRESS, tokenABI, signer);
  const staking = new ethers.Contract(STAKING_ADDRESS, stakingABI, signer);

  return { token, staking };
}

import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import BattlePool from "./components/BattlePool";
import Leaderboard from "./components/Leaderboard";

const poolAddress = "0xYourBattlePoolContract";
const tokenAddress = "0x765DE816845861e75A25fCA122bb6898B8B1282a"; // cUSD mainnet

export default function App() {
  const [wallet, setWallet] = useState("");
  const [battles, setBattles] = useState([]);

  return (
    <div style={{padding:"20px", fontFamily:"Arial"}}>
      <h1 style={{textAlign:"center"}}>CeloDeFiBattles</h1>
      <WalletConnect onConnect={setWallet} />
      {wallet && <BattlePool wallet={wallet} poolAddress={poolAddress} tokenAddress={tokenAddress} />}
      <Leaderboard battles={battles} />
    </div>
  );
}

import React, { useState } from "react";
import Web3 from "web3";

export default function BattlePool({ wallet, poolAddress, tokenAddress }) {
  const [opponent, setOpponent] = useState("");
  const [stake, setStake] = useState("");

  const handleCreateBattle = async () => {
    if (!wallet || !opponent || !stake) return;
    const web3 = new Web3(window.ethereum);
    const token = new web3.eth.Contract([
      {constant:false, inputs:[{name:"_spender",type:"address"}, {name:"_value",type:"uint256"}], name:"approve", outputs:[{name:"success",type:"bool"}], type:"function"}
    ], tokenAddress);

    const stakeWei = web3.utils.toWei(stake, "ether");
    await token.methods.approve(poolAddress, stakeWei).send({ from: wallet });
    alert("Approved. Call smart contract to create battle next.");
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <input type="text" placeholder="Opponent wallet" value={opponent} onChange={(e)=>setOpponent(e.target.value)} style={{width:"200px", padding:"5px"}} />
      <input type="number" placeholder="Stake amount" value={stake} onChange={(e)=>setStake(e.target.value)} style={{width:"150px", padding:"5px", marginLeft:"10px"}} />
      <button onClick={handleCreateBattle} style={{marginLeft:"10px", padding:"5px 10px"}}>Create Battle</button>
    </div>
  );
}

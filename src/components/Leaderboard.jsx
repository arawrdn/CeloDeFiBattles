import React from "react";

export default function Leaderboard({ battles }) {
  const stats = {};

  battles.forEach(b => {
    if (b.winner) stats[b.winner] = (stats[b.winner] || 0) + 1;
  });

  const sorted = Object.entries(stats).sort((a,b)=>b[1]-a[1]);

  return (
    <div style={{textAlign:"center", marginTop:"20px"}}>
      <h3>Leaderboard</h3>
      <ol>
        {sorted.map(([addr, wins])=><li key={addr}>{addr}: {wins} wins</li>)}
      </ol>
    </div>
  );
}

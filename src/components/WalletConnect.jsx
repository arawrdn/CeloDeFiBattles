import React, { useState } from "react";

export default function WalletConnect({ onConnect }) {
  const [address, setAddress] = useState("");

  const handleConnect = () => {
    if (address) onConnect(address);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <input
        type="text"
        placeholder="Enter your Celo wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "300px", padding: "5px" }}
      />
      <button onClick={handleConnect} style={{ marginLeft: "10px", padding: "5px 10px" }}>
        Connect
      </button>
    </div>
  );
}

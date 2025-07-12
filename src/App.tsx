import { useEffect, useState } from "react";
import "./App.css";

import { ethers } from "ethers";
import PhaserPetGame from "pet-rising-game";

function App() {
  const [keyPair, setKeyPair] = useState<{
    privateKey: string;
    publicKey: string;
  } | null>(null);
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);

  useEffect(() => {
    const generateKeyPair = async () => {
      const wallet = ethers.Wallet.createRandom();
      setKeyPair({
        privateKey: wallet.privateKey,
        publicKey: wallet.address
      });
    };
    generateKeyPair();
  }, []);

  // Create wallet from keyPair
  useEffect(() => {
    if (keyPair) {
      const newWallet = new ethers.Wallet(keyPair.privateKey);
      setWallet(newWallet);
    }
  }, [keyPair]);

  return (
    <>
      <h1>Pet Rising Game Demo</h1>
      <p>A pet with walking, sleeping, playing and chewing activities</p>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Install: <code>npm install pet-rising-game</code>
        </p>{" "}
        <PhaserPetGame
          publicKey={keyPair?.publicKey || ""}
          signMessage={(message) =>
            wallet?.signMessage(message) || Promise.resolve("")
          }
        />
      </div>
    </>
  );
}

export default App;

'use client';
import React from 'react';
import { useAuth } from '../providers/auth/auth';
import { WalletConnector } from '@/lib'; // adjust if needed

const WalletOptions: React.FC = () => {
  const { walletConnectors, connectToWallet } = useAuth();

  const handleWalletConnect = async (wallet: WalletConnector) => {
    const connected = await connectToWallet(wallet);
    if (connected) {
      console.log(`Connected to wallet: ${wallet.name}`);
      // Optionally, you can perform additional actions here (e.g., update UI)
    } else {
      console.error(`Failed to connect to wallet: ${wallet.name}`);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {walletConnectors.length > 0 ? (
        walletConnectors.map((wallet) => (
          <button
            key={wallet.name}
            onClick={() => handleWalletConnect(wallet)}
            className="flex items-center p-4 border rounded hover:bg-gray-100 transition-colors"
          >
            
            <span>{wallet.name}</span>
          </button>
        ))
      ) : (
        <div>No wallet options available.</div>
      )}
    </div>
  );
};

export default WalletOptions;

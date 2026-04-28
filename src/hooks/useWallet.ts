import { useState, useEffect } from 'react';

const WALLET_KEY = 'bet_king_balance';

export function useWallet() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem(WALLET_KEY);
    return saved ? parseInt(saved, 10) : 5000;
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem(WALLET_KEY);
      if (saved) setBalance(parseInt(saved, 10));
    };
    window.addEventListener('walletUpdate', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('walletUpdate', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const updateBalance = (amount: number) => {
    const currentStr = localStorage.getItem(WALLET_KEY);
    const current = currentStr ? parseInt(currentStr, 10) : 5000;
    const newBal = current + amount;
    localStorage.setItem(WALLET_KEY, newBal.toString());
    window.dispatchEvent(new Event('walletUpdate'));
  };

  return { balance, updateBalance };
}

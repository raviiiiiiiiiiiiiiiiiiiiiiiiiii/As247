import React, { useState } from 'react';

interface BetInputProps {
  balance: number;
  onStart: (bet: number) => void;
  maxBet?: number;
}

export default function BetInput({ balance, onStart, maxBet }: BetInputProps) {
  const [bet, setBet] = useState<number>(100);

  const handleStart = () => {
    if (bet > 0 && bet <= balance) {
      onStart(bet);
    }
  };

  return (
    <div className="flex flex-col items-center bg-casino-card border border-casino-gold/20 p-6 rounded-2xl max-w-sm w-full mx-auto shadow-lg">
      <h3 className="text-xl font-display text-white mb-2 uppercase tracking-wide">Place Your Bet</h3>
      <div className="mb-6 text-zinc-400 text-xs font-bold uppercase tracking-widest">
        Wallet: <span className="text-casino-gold">{balance.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setBet(Math.max(10, bet - 50))}
          className="w-10 h-10 rounded-full bg-black/50 text-white font-bold flex items-center justify-center border border-white/10"
        >-</button>
        <div className="relative">
          <input
            type="number"
            value={bet}
            onChange={e => setBet(Number(e.target.value))}
            className="bg-black border-2 border-casino-pink/50 rounded-lg px-4 py-3 text-white text-center w-32 font-display text-xl focus:border-casino-pink focus:outline-none transition-colors"
            min={10}
            max={balance}
          />
        </div>
        <button 
          onClick={() => setBet(Math.min(balance, bet + 50))}
          className="w-10 h-10 rounded-full bg-black/50 text-white font-bold flex items-center justify-center border border-white/10"
        >+</button>
      </div>

      <button
        onClick={handleStart}
        disabled={bet <= 0 || bet > balance}
        className="w-full bg-casino-pink text-white font-bold py-4 rounded-full shadow-lg shadow-casino-pink/30 hover:bg-casino-pink/90 active:scale-[0.98] transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:grayscale"
      >
        Play Game
      </button>
      {bet > balance && <p className="text-red-500 text-xs font-bold mt-3">Insufficient balance</p>}
    </div>
  );
}

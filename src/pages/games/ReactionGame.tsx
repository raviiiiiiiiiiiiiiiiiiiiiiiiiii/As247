import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '../../hooks/useWallet';
import BetInput from '../../components/BetInput';

export default function ReactionGame() {
  const { balance, updateBalance } = useWallet();
  const [gameState, setGameState] = useState<'bet' | 'waiting' | 'ready' | 'result'>('bet');
  const [bet, setBet] = useState(0);
  const [time, setTime] = useState(0);
  const startTime = useRef<number>(0);
  const timeoutRef = useRef<any>(null);

  const startWaiting = (b: number) => {
    setBet(b);
    updateBalance(-b);
    setGameState('waiting');
    
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTime.current = Date.now();
    }, 2000 + Math.random() * 3000);
  };

  const handleTap = () => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setTime(-1); // False start
      setGameState('result');
    } else if (gameState === 'ready') {
      const ms = Date.now() - startTime.current;
      setTime(ms);
      setGameState('result');
      
      if (ms < 200) updateBalance(bet * 3);
      else if (ms < 300) updateBalance(bet * 2);
      else if (ms < 400) updateBalance(bet * 1.5);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="p-4 flex flex-col items-center h-[70vh] justify-center">
      <h2 className="text-2xl font-display text-casino-gold uppercase mb-6">Reaction Challenge</h2>
      
      {gameState === 'bet' && (
        <div className="w-full max-w-sm">
          <p className="text-center text-sm mb-4 text-zinc-400">Wait for Green, then tap fast!<br/>&lt;200ms = 3x | &lt;300ms = 2x | &lt;400ms = 1.5x</p>
          <BetInput balance={balance} onStart={startWaiting} />
        </div>
      )}

      {(gameState === 'waiting' || gameState === 'ready') && (
        <button
          onPointerDown={handleTap}
          className={`w-64 h-64 rounded-full shadow-2xl transition-colors select-none ${gameState === 'waiting' ? 'bg-red-600' : 'bg-green-500 shadow-green-500/50'}`}
        >
          <span className="text-white font-bold text-2xl uppercase tracking-widest pointer-events-none">
            {gameState === 'waiting' ? 'WAIT...' : 'TAP NOW!'}
          </span>
        </button>
      )}

      {gameState === 'result' && (
        <div className="text-center w-full max-w-sm">
          {time === -1 ? (
            <h3 className="text-3xl font-display text-casino-pink mb-4">Too Early!</h3>
          ) : (
            <>
              <h3 className="text-5xl font-display font-bold text-white mb-2">{time}ms</h3>
              <p className="text-casino-gold font-bold mb-6">
                {time < 200 ? 'Incredible! 3X Payout!' : time < 300 ? 'Great! 2X Payout!' : time < 400 ? 'Good! 1.5X Payout' : 'Too slow, you lose!'}
              </p>
            </>
          )}
          <button onClick={() => setGameState('bet')} className="bg-white/10 px-8 py-3 rounded-full font-bold">Play Again</button>
        </div>
      )}
    </div>
  );
}

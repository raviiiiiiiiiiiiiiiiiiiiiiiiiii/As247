import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useWallet } from '../../hooks/useWallet';
import BetInput from '../../components/BetInput';

const TEAMS = ['Chennai Super Kings', 'Mumbai Indians', 'Royal Challengers', 'Kolkata Knights'];

export default function IplPredictor() {
  const { balance, updateBalance } = useWallet();
  const [bet, setBet] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [result, setResult] = useState<{winner: string, won: boolean} | null>(null);

  const [t1, t2] = [TEAMS[0], TEAMS[1]];

  const handleStart = (b: number) => {
    if (!prediction) return alert('Select a winner first!');
    setBet(b);
    updateBalance(-b);
    setPlaying(true);
    setResult(null);

    // Simulate match
    setTimeout(() => {
      const winner = Math.random() > 0.5 ? t1 : t2;
      const won = winner === prediction;
      if (won) {
        updateBalance(b * 1.9); // 1.9x payout
      }
      setResult({ winner, won });
    }, 2000);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-3xl font-display text-casino-gold uppercase tracking-widest mb-6">IPL Predictor</h2>

      {!playing || result ? (
        <div className="w-full max-w-sm">
          {result && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-6 rounded-2xl mb-6 text-center ${result.won ? 'bg-casino-green/20 border-casino-green' : 'bg-casino-pink/20 border-casino-pink'} border-2`}
            >
              <h3 className="text-2xl font-bold mb-2">{result.won ? 'YOU WON!' : 'YOU LOST!'}</h3>
              <p>Match Winner: <span className="font-bold text-white">{result.winner}</span></p>
              {result.won && <p className="text-casino-gold font-bold mt-2">Payout: +{(bet * 1.9).toFixed(0)}</p>}
            </motion.div>
          )}

          <div className="bg-casino-card p-4 rounded-xl border border-white/10 mb-6">
            <h3 className="text-center font-bold text-zinc-400 mb-4">Today's Match</h3>
            <div className="flex gap-2">
              {[t1, t2].map(t => (
                <button
                  key={t}
                  onClick={() => setPrediction(t)}
                  className={`flex-1 p-3 rounded-lg border-2 font-bold transition-all ${prediction === t ? 'border-casino-gold bg-casino-gold/10 text-casino-gold' : 'border-white/10 text-white/50'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <BetInput balance={balance} onStart={handleStart} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 border-4 border-casino-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-bold animate-pulse">Simulating Match...</h3>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import BetInput from '../../components/BetInput';
import { motion } from 'motion/react';

const EMOJIS = ['💎', '🎰', '♠️', '♥️', '🍒', '🔔', '7️⃣', '🎲'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatch() {
  const { balance, updateBalance } = useWallet();
  const [gameState, setGameState] = useState<'bet' | 'playing' | 'won'>('bet');
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [bet, setBet] = useState(0);

  const startGame = (b: number) => {
    setBet(b);
    updateBalance(-b);
    
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, isFlipped: false, isMatched: false }));
    
    setCards(deck);
    setFlipped([]);
    setMoves(0);
    setGameState('playing');
  };

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setTimeout(() => checkMatch(newFlipped, newCards), 1000);
    }
  };

  const checkMatch = ([first, second]: number[], currentCards: Card[]) => {
    if (currentCards[first].emoji === currentCards[second].emoji) {
      currentCards[first].isMatched = true;
      currentCards[second].isMatched = true;
      
      if (currentCards.every(c => c.isMatched)) {
        handleWin();
      }
    } else {
      currentCards[first].isFlipped = false;
      currentCards[second].isFlipped = false;
    }
    setCards([...currentCards]);
    setFlipped([]);
  };

  const handleWin = () => {
    setGameState('won');
    // Payout logic
    let multiplier = 0;
    if (moves <= 12) multiplier = 3;
    else if (moves <= 16) multiplier = 2;
    else if (moves <= 24) multiplier = 1.5;

    if (multiplier > 0) {
      updateBalance(bet * multiplier);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-display text-casino-gold uppercase mb-6">Memory Match</h2>
      
      {gameState === 'bet' && (
        <div className="w-full max-w-sm">
          <p className="text-center text-sm mb-4 text-zinc-400">Match all pairs in fewest moves!<br/>&le;12=3x | &le;16=2x | &le;24=1.5x</p>
          <BetInput balance={balance} onStart={startGame} />
        </div>
      )}

      {gameState === 'playing' && (
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="font-bold text-zinc-400">Moves: <span className="text-white">{moves}</span></span>
            <span className="font-bold text-casino-gold text-xs">Target: &le;24</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {cards.map((c, i) => (
              <button
                key={c.id}
                onClick={() => handleCardClick(i)}
                className={`aspect-square text-3xl flex items-center justify-center rounded-xl transition-all duration-300 ${c.isFlipped || c.isMatched ? 'bg-white' : 'bg-casino-card border border-white/10'}`}
                style={{ transform: c.isFlipped || c.isMatched ? 'rotateY(180deg)' : '' }}
              >
                <div style={{ transform: c.isFlipped || c.isMatched ? 'rotateY(180deg)' : '' }}>
                  {c.isFlipped || c.isMatched ? c.emoji : ''}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'won' && (
        <div className="text-center mt-10">
          <h3 className="text-4xl font-display text-casino-green mb-2">COMPLETE!</h3>
          <p className="text-xl mb-4">Total Moves: {moves}</p>
          {moves <= 24 ? (
            <p className="text-casino-gold font-bold text-xl mb-6">You Won!</p>
          ) : (
            <p className="text-casino-pink font-bold text-xl mb-6">Too many moves, No Payout</p>
          )}
          <button onClick={() => setGameState('bet')} className="bg-white/10 px-8 py-3 rounded-full font-bold">Play Again</button>
        </div>
      )}
    </div>
  );
}

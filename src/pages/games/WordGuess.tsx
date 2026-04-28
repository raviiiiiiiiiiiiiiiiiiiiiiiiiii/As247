import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import BetInput from '../../components/BetInput';

const WORDS = ['SMART', 'POKER', 'MONEY', 'CHIPS', 'VIGOR', 'FLUSH', 'BLUFF', 'LUCKY'];

export default function WordGuess() {
  const { balance, updateBalance } = useWallet();
  const [gameState, setGameState] = useState<'bet' | 'playing' | 'end'>('bet');
  const [bet, setBet] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [won, setWon] = useState(false);

  const startGame = (b: number) => {
    setBet(b);
    updateBalance(-b);
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses([]);
    setCurrentGuess('');
    setWon(false);
    setGameState('playing');
  };

  const handleKey = (key: string) => {
    if (gameState !== 'playing') return;
    
    if (key === 'ENTER') {
      if (currentGuess.length === 5) {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');

        if (currentGuess === targetWord) {
          setWon(true);
          const payouts = [10, 5, 3, 2, 1.5, 1];
          updateBalance(bet * payouts[newGuesses.length - 1]);
          setGameState('end');
        } else if (newGuesses.length === 6) {
          setGameState('end');
        }
      }
    } else if (key === 'BACK') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const KEYBOARD = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTER','Z','X','C','V','B','N','M','BACK']
  ];

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-display text-casino-gold uppercase mb-4">Word Guess</h2>

      {gameState === 'bet' && (
        <div className="w-full max-w-sm">
          <p className="text-center text-sm mb-4 text-zinc-400">Guess the 5-letter word in 6 tries.<br/>Fewer tries = Higher payout!</p>
          <BetInput balance={balance} onStart={startGame} />
        </div>
      )}

      {gameState !== 'bet' && (
        <div className="w-full max-w-sm flex flex-col gap-2">
          {Array(6).fill(0).map((_, i) => {
            const guess = i === guesses.length ? currentGuess.padEnd(5, ' ') : (guesses[i] || '     ');
            const isSubmitted = i < guesses.length;
            
            return (
              <div key={i} className="flex gap-2 justify-center">
                {guess.split('').map((letter, j) => {
                  let bgColor = 'bg-transparent border border-white/20';
                  if (isSubmitted) {
                    if (targetWord[j] === letter) bgColor = 'bg-casino-green border-casino-green text-black';
                    else if (targetWord.includes(letter)) bgColor = 'bg-casino-gold border-casino-gold text-black';
                    else bgColor = 'bg-black/50 border-white/10 text-white/30';
                  }
                  return (
                    <div key={j} className={`w-12 h-12 flex items-center justify-center font-bold text-xl rounded ${bgColor}`}>
                      {letter.trim()}
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div className="mt-8 flex flex-col gap-2 relative z-10 w-[400px] left-1/2 -ml-[200px]">
            {KEYBOARD.map((row, i) => (
              <div key={i} className="flex justify-center gap-1">
                {row.map(k => (
                  <button 
                    key={k} 
                    onClick={() => handleKey(k)}
                    className={`h-12 rounded font-bold text-xs bg-white/10 active:bg-white/30 ${k.length > 1 ? 'px-3' : 'w-8'}`}
                  >
                    {k === 'BACK' ? '⌫' : k}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {gameState === 'end' && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
              <div className="bg-casino-card p-8 rounded-2xl text-center border border-white/10">
                <h3 className={`text-4xl font-display mb-2 ${won ? 'text-casino-green' : 'text-casino-pink'}`}>
                  {won ? 'YOU WON!' : 'GAME OVER'}
                </h3>
                <p className="mb-6">The word was: <strong className="text-casino-gold">{targetWord}</strong></p>
                <button onClick={() => setGameState('bet')} className="bg-white/10 px-8 py-3 rounded-full font-bold">Play Again</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

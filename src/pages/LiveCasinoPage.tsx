import React from 'react';
import { motion } from 'motion/react';
import GameCard from '../components/GameCard';

const games = [
  { name: 'Matka', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { name: 'Andar Bahar', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
  { name: 'Worli Matka', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
  { name: 'Teen Patti T20', gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
  { name: 'AAA', gradient: 'linear-gradient(135deg, #14b8a6, #0f766e)' },
  { name: 'Lucky7B', gradient: 'linear-gradient(135deg, #fbbf24, #000000)' },
  { name: 'Lucky7A', gradient: 'linear-gradient(135deg, #7f1d1d, #450a0a)' },
  { name: 'DT20', gradient: 'linear-gradient(135deg, #a855f7, #581c87)' },
  { name: 'DT202', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
  { name: 'Teen Patti', gradient: 'linear-gradient(135deg, #be123c, #881337)' },
];

export default function LiveCasinoPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-24"
    >
      <h1 className="sr-only">247 Social Casino - Live Games</h1>
      <div className="flex items-center gap-2 p-3">
        <h2 className="text-lg font-display text-casino-gold uppercase tracking-wider">❤️ Live Games</h2>
      </div>

      <div className="grid grid-cols-3 gap-2 px-2.5">
        {games.map((game, i) => (
          <GameCard key={i} name={game.name} gradient={game.gradient} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

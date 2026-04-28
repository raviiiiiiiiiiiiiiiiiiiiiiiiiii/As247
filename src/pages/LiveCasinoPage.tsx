import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';

const games = [
  { name: 'IPL Predictor', path: '/game/ipl', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { name: 'Brick Tower', path: '/game/tower', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
  { name: 'Minesweeper', path: '/game/minesweeper', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
  { name: 'Reaction Challenge', path: '/game/reaction', gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
  { name: 'Word Guess', path: '/game/wordle', gradient: 'linear-gradient(135deg, #14b8a6, #0f766e)' },
  { name: 'Memory Match', path: '/game/memory', gradient: 'linear-gradient(135deg, #fbbf24, #000000)' },
];

export default function LiveCasinoPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-24"
    >
      <h1 className="sr-only">Betting King - Live Games</h1>
      <div className="flex items-center gap-2 p-3">
        <h2 className="text-lg font-display text-casino-gold uppercase tracking-wider">❤️ Minigames</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 px-3">
        {games.map((game, i) => (
          <Link to={game.path} key={i}>
            <GameCard name={game.name} gradient={game.gradient} index={i} />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}


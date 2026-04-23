import React from 'react';
import { motion } from 'motion/react';

interface GameCardProps {
  name: string;
  gradient: string;
  index: number;
  key?: React.Key;
}

export default function GameCard({ name, gradient, index }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative aspect-square rounded-lg overflow-hidden border border-casino-gold/10 group cursor-pointer"
      style={{ background: gradient }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
      
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="text-[10px] font-display font-bold text-white uppercase leading-tight tracking-tighter group-hover:text-casino-gold transition-colors">
          {name}
        </div>
      </div>
    </motion.div>
  );
}

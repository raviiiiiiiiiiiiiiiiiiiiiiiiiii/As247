import React, { useState } from 'react';
import { motion } from 'motion/react';
import StatementTable from '../components/StatementTable';

export default function StatementPage() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Casino', 'Sports'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-24"
    >
      <h1 className="sr-only">247 Social Casino - Statement</h1>
      <div className="p-3">
        <h2 className="text-lg font-display text-casino-gold uppercase tracking-wider mb-4">Statement</h2>
        
        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                filter === f 
                  ? 'bg-casino-gold text-black' 
                  : 'bg-casino-card text-zinc-400 border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <StatementTable />
    </motion.div>
  );
}

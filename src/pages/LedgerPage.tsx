import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpCircle, ArrowDownCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const ledgerEntries = [
  { id: 1, type: 'credit', desc: 'Chips Added by Agent', date: '2024-05-20 14:30', amount: 5000 },
  { id: 2, type: 'debit', desc: 'Match Loss Deducted', date: '2024-05-20 12:15', amount: 1200 },
  { id: 3, type: 'credit', desc: 'Winning Credited', date: '2024-05-19 22:45', amount: 2500 },
  { id: 4, type: 'debit', desc: 'Withdrawal to Bank', date: '2024-05-19 15:20', amount: 3000 },
  { id: 5, type: 'credit', desc: 'Deposit by Admin', date: '2024-05-19 10:00', amount: 1000 },
  { id: 6, type: 'debit', desc: 'Casino Loss', date: '2024-05-18 23:10', amount: 500 },
  { id: 7, type: 'credit', desc: 'Referral Bonus', date: '2024-05-18 18:30', amount: 200 },
  { id: 8, type: 'debit', desc: 'Match Loss Deducted', date: '2024-05-18 14:00', amount: 1500 },
  { id: 9, type: 'credit', desc: 'Chips Added by Agent', date: '2024-05-17 21:00', amount: 3000 },
  { id: 10, type: 'debit', desc: 'Match Loss Deducted', date: '2024-05-17 19:45', amount: 800 },
];

export default function LedgerPage() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Credit', 'Debit'];

  const filteredEntries = ledgerEntries.filter(entry => {
    if (filter === 'All') return true;
    return entry.type.toLowerCase() === filter.toLowerCase();
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-24"
    >
      <h1 className="sr-only">247 Social Casino - Ledger</h1>
      <div className="p-3">
        <h2 className="text-lg font-display text-casino-gold uppercase tracking-wider mb-4">Ledger</h2>

        {/* Summary Card */}
        <div className="bg-casino-card border border-casino-gold/30 rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1 border-r border-white/10">
              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Given</div>
              <div className="text-lg font-display text-casino-green leading-none">+12,500</div>
            </div>
            <div className="text-center flex-1 border-r border-white/10">
              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Taken</div>
              <div className="text-lg font-display text-casino-pink leading-none">-8,200</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Balance</div>
              <div className="text-lg font-display text-casino-gold leading-none">+4,300</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
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

        {/* Ledger Entries List */}
        <div className="space-y-0.5 rounded-xl overflow-hidden border border-white/5">
          {filteredEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center justify-between p-4 border-b border-casino-gold/10 ${
                i % 2 === 0 ? 'bg-casino-card' : 'bg-[#162E24]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={entry.type === 'credit' ? 'text-casino-green' : 'text-casino-pink'}>
                  {entry.type === 'credit' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight mb-0.5">{entry.desc}</div>
                  <div className="text-[9px] text-zinc-500 font-medium uppercase tracking-tighter">{entry.date}</div>
                </div>
              </div>
              <div className={`text-lg font-display ${entry.type === 'credit' ? 'text-casino-green' : 'text-casino-pink'}`}>
                {entry.type === 'credit' ? `+${entry.amount.toLocaleString()}` : `-${entry.amount.toLocaleString()}`}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-6 text-casino-gold font-bold text-[10px] uppercase tracking-widest">
          <button className="flex items-center gap-1 opacity-50 cursor-not-allowed">
            <ChevronLeft size={14} /> Prev
          </button>
          <span className="text-white/60">Page 1 of 3</span>
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

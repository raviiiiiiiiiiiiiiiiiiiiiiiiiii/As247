import React from 'react';
import Logo from './Logo';
import { ChevronDown } from 'lucide-react';

interface NavbarProps {
  isDemoMode?: boolean;
}

export default function Navbar({ isDemoMode = true }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 bg-[#111] border-b border-casino-gold/20 px-4 py-3 flex items-center justify-between">
      <Logo className="text-xl" />
      
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-[10px] text-zinc-400 uppercase font-bold tracking-widest">
          {isDemoMode ? 'C10-demo' : 'User-123'} <ChevronDown size={10} />
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <div className="text-[11px] font-bold">
            <span className="text-casino-gold">Chips:</span> 5001
          </div>
          <div className="text-[11px] font-bold">
            <span className="text-casino-pink">Expo:</span> 0
          </div>
        </div>
      </div>

      <button className="bg-casino-gold text-black text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-tighter">
        Bets
      </button>
    </nav>
  );
}

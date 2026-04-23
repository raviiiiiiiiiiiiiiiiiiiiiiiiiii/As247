import React from 'react';
import { Lock } from 'lucide-react';

export default function BetButton() {
  return (
    <button className="flex-1 h-10 bg-[#2A2A2A] rounded flex items-center justify-center text-zinc-500 cursor-not-allowed border border-white/5">
      <Lock size={14} />
    </button>
  );
}

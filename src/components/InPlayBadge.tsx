import React from 'react';

export default function InPlayBadge() {
  return (
    <div className="flex items-center gap-1 bg-casino-green/20 border border-casino-green/30 px-2 py-0.5 rounded text-[10px] font-bold text-casino-green uppercase tracking-wider">
      <span className="w-1.5 h-1.5 bg-casino-green rounded-full animate-pulse" />
      In Play
    </div>
  );
}

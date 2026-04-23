import React from 'react';
import InPlayBadge from './InPlayBadge';
import BetButton from './BetButton';

interface MatchCardProps {
  team1: string;
  team2: string;
  league: string;
  time: string;
  key?: React.Key;
}

export default function MatchCard({ team1, team2, league, time }: MatchCardProps) {
  return (
    <div className="bg-casino-card border border-casino-gold/15 rounded-lg p-3 mb-2.5 mx-2.5">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-0.5">{league}</div>
          <div className="text-sm font-bold text-white leading-tight">
            {team1} <span className="text-casino-pink mx-1">v</span> {team2}
          </div>
        </div>
        <div className="bg-casino-green px-1.5 py-0.5 rounded text-[9px] font-bold text-black uppercase">
          In-Play
        </div>
      </div>
      
      <div className="flex gap-2 mb-3">
        <BetButton />
        <BetButton />
        <BetButton />
        <BetButton />
      </div>

      <div className="text-[10px] text-zinc-500 font-medium italic">
        Starts at {time}
      </div>
    </div>
  );
}

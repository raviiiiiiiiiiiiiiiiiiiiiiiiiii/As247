import React from 'react';
import { motion } from 'motion/react';
import MatchCard from '../components/MatchCard';

export default function HomePage() {
  const matches = [
    { team1: 'Chennai Super Kings', team2: 'Mumbai Indians', league: 'IPL 2024', time: '19:30 IST' },
    { team1: 'Royal Challengers Bangalore', team2: 'Kolkata Knight Riders', league: 'IPL 2024', time: '20:00 IST' },
    { team1: 'Lahore Qalandars', team2: 'Karachi Kings', league: 'PSL 2024', time: '21:00 PKT' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-24"
    >
      <h1 className="sr-only">247 Social Casino - Sports Home</h1>
      <div className="flex items-center gap-2 p-3">
        <h2 className="text-lg font-display text-casino-gold uppercase tracking-wider">🏏 Cricket</h2>
      </div>

      <div className="space-y-4">
        {matches.map((match, i) => (
          <MatchCard key={i} team1={match.team1} team2={match.team2} league={match.league} time={match.time} />
        ))}
      </div>
    </motion.div>
  );
}

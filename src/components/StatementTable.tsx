import React from 'react';

const dummyData = [
  { date: '2024-05-20 14:30', desc: 'IPL: CSK vs MI (Win)', in: 1200, out: 0, bal: 5001 },
  { date: '2024-05-20 12:15', desc: 'Teen Patti T20 (Loss)', in: 0, out: 500, bal: 3801 },
  { date: '2024-05-19 22:45', desc: 'Andar Bahar (Win)', in: 850, out: 0, bal: 4301 },
  { date: '2024-05-19 20:00', desc: 'IPL: RCB vs KKR (Loss)', in: 0, out: 1000, bal: 3451 },
  { date: '2024-05-19 18:30', desc: 'Matka (Win)', in: 450, out: 0, bal: 4451 },
  { date: '2024-05-18 23:10', desc: 'AAA (Win)', in: 2000, out: 0, bal: 4001 },
  { date: '2024-05-18 21:00', desc: 'Worli Matka (Loss)', in: 0, out: 300, bal: 2001 },
  { date: '2024-05-18 19:45', desc: 'Lucky7B (Win)', in: 150, out: 0, bal: 2301 },
  { date: '2024-05-17 22:00', desc: 'DT20 (Loss)', in: 0, out: 500, bal: 2151 },
  { date: '2024-05-17 20:30', desc: 'Teen Patti (Win)', in: 650, out: 0, bal: 2651 },
];

export default function StatementTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead>
          <tr className="bg-casino-gold text-black font-bold uppercase tracking-tighter">
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Description</th>
            <th className="px-3 py-2 text-right">In</th>
            <th className="px-3 py-2 text-right">Out</th>
            <th className="px-3 py-2 text-right">Bal</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row, i) => (
            <tr 
              key={i} 
              className={i % 2 === 0 ? 'bg-casino-card' : 'bg-[#162E24]'}
            >
              <td className="px-3 py-3 text-zinc-400 whitespace-nowrap">{row.date}</td>
              <td className="px-3 py-3 font-medium">{row.desc}</td>
              <td className="px-3 py-3 text-right text-casino-green font-bold">
                {row.in > 0 ? `+${row.in}` : '-'}
              </td>
              <td className="px-3 py-3 text-right text-casino-pink font-bold">
                {row.out > 0 ? `-${row.out}` : '-'}
              </td>
              <td className="px-3 py-3 text-right font-bold">{row.bal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="p-4 bg-casino-card border-t border-white/10 flex justify-between items-center">
        <span className="text-zinc-400 font-bold uppercase text-[10px]">Total Balance</span>
        <span className="text-casino-gold font-bold text-lg">5001.00</span>
      </div>
    </div>
  );
}

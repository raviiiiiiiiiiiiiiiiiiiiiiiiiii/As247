import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import BetInput from '../../components/BetInput';
import { Flag, Bomb } from 'lucide-react';

const ROWS = 8;
const COLS = 8;
const MINES = 10;

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

export default function Minesweeper() {
  const { balance, updateBalance } = useWallet();
  const [gameState, setGameState] = useState<'bet' | 'playing' | 'end'>('bet');
  const [bet, setBet] = useState(0);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [won, setWon] = useState(false);

  const initGame = (b: number) => {
    setBet(b);
    updateBalance(-b);
    
    // Create empty board
    let newBoard: Cell[][] = Array(ROWS).fill(null).map(() => 
      Array(COLS).fill(null).map(() => ({ isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0 }))
    );

    // Place mines
    let minesPlaced = 0;
    while(minesPlaced < MINES) {
      let r = Math.floor(Math.random() * ROWS);
      let c = Math.floor(Math.random() * COLS);
      if(!newBoard[r][c].isMine) {
        newBoard[r][c].isMine = true;
        minesPlaced++;
      }
    }

    // Calc neighbors
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newBoard[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (r+dr >= 0 && r+dr < ROWS && c+dc >= 0 && c+dc < COLS && newBoard[r+dr][c+dc].isMine) count++;
            }
          }
          newBoard[r][c].neighborMines = count;
        }
      }
    }

    setBoard(newBoard);
    setWon(false);
    setGameState('playing');
  };

  const reveal = (r: number, c: number) => {
    if (gameState !== 'playing' || board[r][c].isRevealed || board[r][c].isFlagged) return;

    let newBoard = [...board.map(row => [...row])];
    
    if (newBoard[r][c].isMine) {
      // Explode
      newBoard.forEach(row => row.forEach(cell => { if(cell.isMine) cell.isRevealed = true; }));
      setBoard(newBoard);
      setWon(false);
      setGameState('end');
      return;
    }

    // Flood fill using stack to avoid deep recursion
    let stack = [[r, c]];
    while(stack.length > 0) {
      let [currR, currC] = stack.pop()!;
      if (!newBoard[currR][currC].isRevealed) {
        newBoard[currR][currC].isRevealed = true;
        if (newBoard[currR][currC].neighborMines === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
               let nr = currR+dr; let nc = currC+dc;
               if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !newBoard[nr][nc].isRevealed) {
                 stack.push([nr, nc]);
               }
            }
          }
        }
      }
    }

    setBoard(newBoard);
    checkWin(newBoard);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState !== 'playing' || board[r][c].isRevealed) return;
    
    let newBoard = [...board.map(row => [...row])];
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  };

  const checkWin = (b: Cell[][]) => {
    let unrevealedSafe = 0;
    b.forEach(row => row.forEach(c => {
      if (!c.isMine && !c.isRevealed) unrevealedSafe++;
    }));
    if (unrevealedSafe === 0) {
      setWon(true);
      setGameState('end');
      updateBalance(bet * 3); // 3x payout
    }
  };

  const COLORS = ['text-transparent', 'text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500', 'text-maroon-500', 'text-turquoise-500', 'text-black', 'text-gray-500'];

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-display text-casino-gold uppercase mb-4">Minesweeper</h2>

      {gameState === 'bet' && (
        <div className="w-full max-w-sm">
          <p className="text-center text-sm mb-4 text-zinc-400">Clear the minefield! Reveal all safe zones.<br/>Payout: 3X</p>
          <BetInput balance={balance} onStart={initGame} />
        </div>
      )}

      {gameState !== 'bet' && (
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="mb-4 text-white font-bold flex gap-4">
            <div>Bet: {bet}</div>
            <div className="text-casino-gold">Win: {bet * 3}</div>
          </div>

          <div className="bg-[#2A2A2A] p-2 rounded-lg border-2 border-white/10 select-none">
            {board.map((row, r) => (
              <div key={r} className="flex">
                {row.map((cell, c) => (
                  <div 
                    key={c}
                    onClick={() => reveal(r, c)}
                    onContextMenu={(e) => toggleFlag(e, r, c)}
                    className={`w-10 h-10 border border-black flex items-center justify-center font-bold text-lg
                      ${cell.isRevealed ? 'bg-[#111]' : 'bg-[#444] hover:bg-[#555] active:bg-[#333] cursor-pointer shadow-[inset_2px_2px_0px_rgba(255,255,255,0.2),inset_-2px_-2px_0px_rgba(0,0,0,0.5)]'}`}
                  >
                    {!cell.isRevealed && cell.isFlagged && <Flag size={20} className="text-red-500" />}
                    {cell.isRevealed && cell.isMine && <Bomb size={24} className="text-red-500" />}
                    {cell.isRevealed && !cell.isMine && cell.neighborMines > 0 && (
                      <span className={COLORS[cell.neighborMines]}>{cell.neighborMines}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {gameState === 'end' && (
            <div className="mt-8 text-center bg-casino-card p-6 rounded-2xl border border-white/10 w-full">
              <h3 className={`text-3xl font-display mb-2 ${won ? 'text-casino-green' : 'text-react-pink'}`}>
                {won ? 'YOU WON!' : 'BOOM! GAME OVER'}
              </h3>
              {won && <p className="text-casino-gold font-bold">+{bet * 3} Credited</p>}
              <button onClick={() => setGameState('bet')} className="mt-4 bg-white/10 px-8 py-3 rounded-full font-bold">Play Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

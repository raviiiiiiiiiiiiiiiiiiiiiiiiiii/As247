import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '../../hooks/useWallet';
import BetInput from '../../components/BetInput';

export default function BrickTower() {
  const { balance, updateBalance } = useWallet();
  const [gameState, setGameState] = useState<'bet' | 'playing' | 'end'>('bet');
  const [bet, setBet] = useState(0);
  
  const [stack, setStack] = useState<{x: number, w: number}[]>([]);
  const [moving, setMoving] = useState({ x: 0, w: 200, dir: 1 });
  const [score, setScore] = useState(0);

  const requestRef = useRef<number>();
  const containerWidth = 320;
  const blockHeight = 40;

  const startGame = (b: number) => {
    setBet(b);
    updateBalance(-b);
    setStack([{ x: 60, w: 200 }]); // Base block
    setMoving({ x: 0, w: 200, dir: 1 });
    setScore(0);
    setGameState('playing');
  };

  const updateMoving = () => {
    if (gameState !== 'playing') return;
    setMoving(prev => {
      let nx = prev.x + prev.dir * 4;
      let ndir = prev.dir;
      if (nx <= 0) { nx = 0; ndir = 1; }
      if (nx + prev.w >= containerWidth) { nx = containerWidth - prev.w; ndir = -1; }
      return { ...prev, x: nx, dir: ndir };
    });
    requestRef.current = requestAnimationFrame(updateMoving);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(updateMoving);
    }
    return () => cancelAnimationFrame(requestRef.current!);
  }, [gameState]);

  const handleDrop = () => {
    if (gameState !== 'playing') return;
    
    // Check overlap with top of stack
    const top = stack[stack.length - 1];
    const m = moving;
    
    const overlapStart = Math.max(top.x, m.x);
    const overlapEnd = Math.min(top.x + top.w, m.x + m.w);
    const newW = overlapEnd - overlapStart;

    if (newW <= 0) {
      // Missed
      handleEnd(false);
    } else {
      // Stack hit
      setStack(prev => [...prev, { x: overlapStart, w: newW }]);
      setMoving({ x: 0, w: newW, dir: 1 }); // next block same width
      setScore(s => s + 1);
      
      // Speed could increase here (handled by updating the interval/step, but let's keep it simple at dir * 4)
    }
  };

  const handleEnd = (cashOut: boolean) => {
    setGameState('end');
    if (cashOut && score > 0) {
      // Payout multiplier based on score (e.g. score of 5 gives 2x)
      const multiplier = 1 + (score * 0.2); 
      updateBalance(bet * multiplier);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-display text-casino-gold uppercase mb-2">Brick Tower</h2>

      {gameState === 'bet' && (
        <div className="w-full max-w-sm mt-8">
          <p className="text-center text-sm mb-4 text-zinc-400">Stack blocks! Each successful drop increases your multiplier. Cash out anytime.</p>
          <BetInput balance={balance} onStart={startGame} />
        </div>
      )}

      {(gameState === 'playing' || gameState === 'end') && (
        <div className="w-full flex flex-col items-center select-none" onPointerDown={gameState === 'playing' ? handleDrop : undefined}>
          
          <div className="flex justify-between w-full max-w-[320px] mb-4 text-white font-bold">
            <div>Score: {score}</div>
            <div>Multiplier: {(1 + score * 0.2).toFixed(1)}x</div>
          </div>

          <div 
            className="relative bg-black/40 border-2 border-white/10 overflow-hidden"
            style={{ width: containerWidth, height: 400 }}
          >
            {/* Background grids */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '100% 40px' }} />

            {/* Render Stack (from bottom up) */}
            <div className="absolute bottom-0 w-full" style={{ bottom: -(Math.max(0, stack.length - 8)) * blockHeight }}>
              {stack.map((block, i) => (
                <div 
                  key={i} 
                  className="absolute bg-casino-gold border border-black transition-all"
                  style={{ 
                    left: block.x, 
                    width: block.w, 
                    height: blockHeight, 
                    bottom: i * blockHeight 
                  }}
                />
              ))}

              {/* Moving Block */}
              {gameState === 'playing' && (
                <div 
                  className="absolute bg-casino-pink border border-black"
                  style={{ 
                    left: moving.x, 
                    width: moving.w, 
                    height: blockHeight, 
                    bottom: stack.length * blockHeight 
                  }}
                />
              )}
            </div>
          </div>

          {gameState === 'playing' && (
            <div className="flex gap-4 mt-6">
              <button 
                onClick={(e) => { e.stopPropagation(); handleDrop(); }}
                className="bg-casino-pink text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest"
              >Drop</button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleEnd(true); }}
                className="bg-casino-green text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest"
              >Cash Out</button>
            </div>
          )}

          {gameState === 'end' && (
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-display text-white mb-2">Game Over</h3>
              <p className="mb-6">Final Multiplier: <span className="text-casino-gold font-bold">{(1 + score * 0.2).toFixed(1)}x</span></p>
              <button onClick={() => setGameState('bet')} className="bg-white/10 px-8 py-3 rounded-full font-bold">Play Again</button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

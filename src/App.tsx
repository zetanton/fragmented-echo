import React, { useEffect, useRef } from 'react';
import { GameEngine } from './game/GameEngine';

function App() {
  const gameInitialized = useRef(false);

  useEffect(() => {
    if (!gameInitialized.current) {
      const game = new GameEngine('gameCanvas');
      game.start();
      gameInitialized.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-green-500 text-2xl mb-4 font-mono">Debug Quest: A Bug's Tale</h1>
      <div className="relative">
        <canvas
          id="gameCanvas"
          className="border-4 border-green-500 rounded-lg"
        ></canvas>
      </div>
      <div className="text-green-500 font-mono mt-4">
        <p>Controls: Arrow Keys to move, Space/Up to jump</p>
      </div>
    </div>
  );
}

export default App;
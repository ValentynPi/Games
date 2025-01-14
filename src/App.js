import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePortal from './pages/GamePortal';
import FlappyBird from './pages/FlappyBird';
import Snake from './pages/Snake';
import Pong from './pages/Pong';
import ColorMatch from './pages/ColorMatch';
import MemoryCards from './pages/MemoryCards';
import WordScramble from './pages/WordScramble';
import BrickBreaker from './pages/BrickBreaker';
import MathChallenge from './pages/MathChallenge';
import Tetris from './pages/Tetris';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePortal />} />
        <Route path="/flappy-bird" element={<FlappyBird />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/pong" element={<Pong />} />
        <Route path="/color-match" element={<ColorMatch />} />
        <Route path="/memory-cards" element={<MemoryCards />} />
        <Route path="/word-scramble" element={<WordScramble />} />
        <Route path="/brick-breaker" element={<BrickBreaker />} />
        <Route path="/math-challenge" element={<MathChallenge />} />
        <Route path="/tetris" element={<Tetris />} />
      </Routes>
    </Router>
  );
}

export default App; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

// Pages
import GamePortal from './pages/GamePortal';
import FlappyBird from './games/FlappyBird';
import Snake from './games/Snake';
import Pong from './games/Pong';
import ColorMatch from './games/ColorMatch';
import MemoryCards from './games/MemoryCards';
//import WordScramble from './games/WordScramble';
//import BrickBreaker from './games/BrickBreaker';
//import MathChallenge from './games/MathChallenge';
//import Tetris from './games/Tetris';
//import PacMan from './games/PacMan';
//import SpaceDodge from './games/SpaceDodge';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<GamePortal />} />
          <Route path="/flappy-bird" element={<FlappyBird />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/pong" element={<Pong />} />
          <Route path="/color-match" element={<ColorMatch />} />
          <Route path="/memory-cards" element={<MemoryCards />} />
          {/* <Route path="/word-scramble" element={<WordScramble />} />
          <Route path="/brick-breaker" element={<BrickBreaker />} />
          <Route path="/math-challenge" element={<MathChallenge />} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/pacman" element={<PacMan />} />
          <Route path="/space-dodge" element={<SpaceDodge />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
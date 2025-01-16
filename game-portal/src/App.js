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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import GamePortal from './pages/GamePortal';
import { Pong } from './games/Pong';
import Snake from './games/Snake';
import Tetris from './games/Tetris';
import DoodleJump from './games/DoodleJump';
import UnblockMe from './games/UnblockMe';
import { theme } from './theme';
import { CoinProvider } from './contexts/CoinContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #1a1a1a;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CoinProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<GamePortal />} />
            <Route path="/game/pong" element={<Pong />} />
            <Route path="/game/snake" element={<Snake />} />
            <Route path="/game/tetris" element={<Tetris />} />
            <Route path="/game/doodlejump" element={<DoodleJump />} />
            <Route path="/game/unblockme" element={<UnblockMe />} />
          </Routes>
        </Router>
      </CoinProvider>
    </ThemeProvider>
  );
};

export default App; 
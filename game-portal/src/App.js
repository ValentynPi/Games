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
import Shop from './pages/Shop';
import { theme } from './theme';
import { CoinProvider } from './contexts/CoinContext';
import { InventoryProvider } from './contexts/InventoryContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #1a1a1a;
    color: white;
    line-height: 1.5;
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #2c3e50;
  }

  ::-webkit-scrollbar-thumb {
    background: #34495e;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #3498db;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CoinProvider>
        <InventoryProvider>
          <GlobalStyle />
          <Router>
            <Routes>
              <Route path="/" element={<GamePortal />} />
              <Route path="/game/pong" element={<Pong />} />
              <Route path="/game/snake" element={<Snake />} />
              <Route path="/game/tetris" element={<Tetris />} />
              <Route path="/game/doodlejump" element={<DoodleJump />} />
              <Route path="/game/unblockme" element={<UnblockMe />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/game/:gameId" element={<div>Game Component Coming Soon</div>} />
            </Routes>
          </Router>
        </InventoryProvider>
      </CoinProvider>
    </ThemeProvider>
  );
};

export default App; 
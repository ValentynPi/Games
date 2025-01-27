import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { Snake } from './games/Snake';
import { Tetris } from './games/Tetris';
import { Pong } from './games/Pong';
import { UnblockMe } from './games/UnblockMe';
import { MiniMetro } from './games/MiniMetro';
import { CoinProvider } from './contexts/CoinContext';
import { InventoryProvider } from './contexts/InventoryContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/games/snake",
    element: <Snake />,
  },
  {
    path: "/games/tetris",
    element: <Tetris />,
  },
  {
    path: "/games/pong",
    element: <Pong />,
  },
  {
    path: "/games/unblock-me",
    element: <UnblockMe />,
  },
  {
    path: "/games/mini-metro",
    element: <MiniMetro />,
  },
], {
  basename: process.env.PUBLIC_URL || '/',
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true
  }
});

const App = () => {
  return (
    <React.StrictMode>
      <CoinProvider>
        <InventoryProvider>
          <RouterProvider router={router} />
        </InventoryProvider>
      </CoinProvider>
    </React.StrictMode>
  );
};

export default App; 
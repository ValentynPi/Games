import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import Snake from './games/Snake';
import Tetris from './games/Tetris';
import { Pong } from './games/Pong';
import UnblockMe from './games/UnblockMe';
import { CoinProvider } from './contexts/CoinContext';
import { InventoryProvider } from './contexts/InventoryContext';
import Layout from './pages/Layout';
import { Shop } from './components/Shop';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/games/pong",
        element: <Pong />,
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
        path: "/games/unblockme",
        element: <UnblockMe />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
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
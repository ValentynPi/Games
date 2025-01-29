import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import Snake from './games/Snake';
import Tetris from './games/Tetris';
import { Pong } from './games/Pong';
import UnblockMe from './games/UnblockMe';
import { CoinProvider } from './contexts/CoinContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './pages/Layout';
import Shop from './pages/Shop';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Landing from './components/Landing';
import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/home",
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: "/games/pong",
        element: <ProtectedRoute><Pong /></ProtectedRoute>,
      },
      {
        path: "/games/snake",
        element: <ProtectedRoute><Snake /></ProtectedRoute>,
      },
      {
        path: "/games/tetris",
        element: <ProtectedRoute><Tetris /></ProtectedRoute>,
      },
      {
        path: "/games/unblockme",
        element: <ProtectedRoute><UnblockMe /></ProtectedRoute>,
      },
      {
        path: "/shop",
        element: <ProtectedRoute><Shop /></ProtectedRoute>,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      // Catch all route - redirect to landing
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <AuthProvider>
      <CoinProvider>
        <InventoryProvider>
          <RouterProvider router={router} />
        </InventoryProvider>
      </CoinProvider>
    </AuthProvider>
  );
}

export default App; 
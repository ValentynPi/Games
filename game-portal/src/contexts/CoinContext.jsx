import React, { createContext, useState, useContext } from 'react';

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem('gameCoins');
    return savedCoins ? parseInt(savedCoins, 10) : 0;
  });

  const addCoins = (amount) => {
    setCoins(prev => {
      const newTotal = prev + amount;
      localStorage.setItem('gameCoins', newTotal.toString());
      return newTotal;
    });
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinProvider');
  }
  return context;
}; 
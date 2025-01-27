import React, { createContext, useContext, useState, useEffect } from 'react';

const CoinContext = createContext();

export const useCoins = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinProvider');
  }
  return context;
};

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem('playerCoins');
    return savedCoins ? parseInt(savedCoins, 10) : 1000;
  });

  useEffect(() => {
    localStorage.setItem('playerCoins', coins.toString());
  }, [coins]);

  const addCoins = (amount) => {
    setCoins(prev => prev + amount);
  };

  const spendCoins = (amount) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins, spendCoins }}>
      {children}
    </CoinContext.Provider>
  );
}; 
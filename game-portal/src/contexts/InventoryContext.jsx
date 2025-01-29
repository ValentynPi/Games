import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCoins } from './CoinContext';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const { spendCoins } = useCoins();
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('playerInventory');
    return savedInventory ? JSON.parse(savedInventory) : {
      skins: {
        pong: [],
        snake: [],
        tetris: [],
        doodlejump: [],
        unblockme: [],
        'mini-metro': []
      },
      effects: [],
      equipped: {
        pong: null,
        snake: null,
        tetris: null,
        doodlejump: null,
        unblockme: null,
        'mini-metro': null
      },
      ownedGames: ['snake'] // Snake is free
    };
  });

  useEffect(() => {
    localStorage.setItem('playerInventory', JSON.stringify(inventory));
  }, [inventory]);

  const addItem = (item) => {
    setInventory(prev => {
      if (item.type === 'skin') {
        return {
          ...prev,
          skins: {
            ...prev.skins,
            [item.game]: Array.isArray(prev.skins[item.game]) ? 
              [...prev.skins[item.game], item] : 
              [item]
          }
        };
      } else {
        return {
          ...prev,
          effects: Array.isArray(prev.effects) ? 
            [...prev.effects, item] : 
            [item]
        };
      }
    });
  };

  const hasItem = (itemId) => {
    return Object.values(inventory.skins).some(
      gameSkins => gameSkins.some(skin => skin.id === itemId)
    ) || inventory.effects.some(effect => effect.id === itemId);
  };

  const equipItem = (item) => {
    if (!item || !item.type) return false;
    
    if (item.type === 'skin') {
      setInventory(prev => {
        // First ensure the item exists in inventory
        const gameItems = prev.skins[item.game] || [];
        const itemExists = gameItems.some(i => i.id === item.id);
        
        if (!itemExists) return prev;

        return {
          ...prev,
          equipped: {
            ...prev.equipped,
            [item.game]: item.id
          }
        };
      });
      return true;
    }
    return false;
  };

  const unequipItem = (game) => {
    setInventory(prev => ({
      ...prev,
      equipped: {
        ...prev.equipped,
        [game]: null
      }
    }));
  };

  const getEquippedSkin = (game) => {
    if (!inventory?.equipped || !inventory?.skins || !game) return null;
    
    const equippedId = inventory.equipped[game];
    if (!equippedId) return null;
    
    const gameSkins = inventory.skins[game] || [];
    return gameSkins.find(skin => skin.id === equippedId) || null;
  };

  const getGameSkins = (game) => {
    return inventory.skins[game] || [];
  };

  const purchaseGame = (gameId, price) => {
    if (spendCoins(price)) {
      setInventory(prev => ({
        ...prev,
        ownedGames: [...prev.ownedGames, gameId]
      }));
      return true;
    }
    return false;
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      addItem,
      hasItem,
      equipItem,
      unequipItem,
      getEquippedSkin,
      getGameSkins,
      ownedGames: inventory.ownedGames,
      purchaseGame
    }}>
      {children}
    </InventoryContext.Provider>
  );
}; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoins } from '../../contexts/CoinContext';
import { useInventory } from '../../contexts/InventoryContext';
import {
  ShopContainer,
  ItemsGrid,
  ItemCard,
  ItemImage,
  ItemTitle,
  ItemPrice,
  BuyButton,
  CategoryTabs,
  TabButton,
  PreviewModal,
  ModalContent,
  CloseButton,
  ItemDescription,
  PriceTag,
  CoinIcon,
  ItemRarity,
  EquipButton
} from './styles';

// Game-specific items
const GAME_ITEMS = {
  pong: [
    {
      id: 'pong_neon',
      name: 'Neon Paddles',
      price: 100,
      image: '/assets/skins/pong/neon.png',
      preview: '/assets/skins/pong/neon_preview.png',
      description: 'Glowing neon paddles that light up the game!',
      rarity: 'rare',
      type: 'skin',
      game: 'pong',
      styles: {
        playerPaddle: {
          background: 'linear-gradient(to right, #ff00ff, #00ffff)',
          boxShadow: '0 0 20px rgba(255, 0, 255, 0.7)',
          border: '2px solid #ff00ff'
        }
      }
    },
    {
      id: 'pong_synthwave',
      name: 'Synthwave',
      price: 175,
      image: '/assets/skins/pong/synthwave.png',
      preview: '/assets/skins/pong/synthwave_preview.png',
      description: 'Retro-futuristic style with neon grid effects',
      rarity: 'epic',
      type: 'skin',
      game: 'pong',
      styles: {
        playerPaddle: {
          background: '#2d0066',
          boxShadow: '0 0 25px #ff0066',
          border: '2px solid #ff0066'
        }
      }
    },
    {
      id: 'pong_matrix',
      name: 'Matrix',
      price: 150,
      image: '/assets/skins/pong/matrix.png',
      preview: '/assets/skins/pong/matrix_preview.png',
      description: 'Enter the Matrix with digital rain effects',
      rarity: 'epic',
      type: 'skin',
      game: 'pong',
      styles: {
        playerPaddle: {
          background: '#000000',
          boxShadow: '0 0 15px #00ff00',
          border: '2px solid #00ff00'
        }
      }
    },
    {
      id: 'pong_fire_ice',
      name: 'Fire & Ice',
      price: 150,
      image: 'https://example.com/fire-ice.png',
      preview: 'https://example.com/fire-ice-preview.gif',
      description: 'Fire paddle vs Ice paddle - eternal rivalry',
      rarity: 'epic',
      type: 'skin',
      game: 'pong',
      styles: {
        baseStyle: {
          transition: 'all 0.3s ease'
        },
        playerPaddle: {
          background: 'linear-gradient(135deg, #ff4d00 0%, #ff0000 100%)',
          boxShadow: '0 0 20px rgba(255, 77, 0, 0.7)',
          border: '2px solid #ff4d00'
        },
        computerPaddle: {
          background: 'linear-gradient(135deg, #00ffff 0%, #0066ff 100%)',
          boxShadow: '0 0 20px rgba(0, 102, 255, 0.7)',
          border: '2px solid #0066ff'
        },
        ball: {
          background: 'linear-gradient(135deg, #ff4d00 0%, #0066ff 100%)',
          boxShadow: '0 0 15px rgba(255, 77, 0, 0.7)',
          border: '2px solid #ff4d00'
        },
        border: '2px solid #ff4d00'
      }
    },
    {
      id: 'pong_gold',
      name: 'Golden Paddles',
      price: 200,
      image: 'https://example.com/gold-paddles.png',
      preview: 'https://example.com/gold-paddles-preview.gif',
      description: 'Luxurious golden paddles for the champions',
      rarity: 'legendary',
      type: 'skin',
      game: 'pong',
      styles: {
        baseStyle: {
          transition: 'all 0.3s ease',
          height: 100
        },
        playerPaddle: {
          background: 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)',
          boxShadow: '0 0 25px rgba(255, 215, 0, 0.8)',
          border: '3px solid #ffd700'
        },
        computerPaddle: {
          background: 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)',
          boxShadow: '0 0 25px rgba(255, 215, 0, 0.8)',
          border: '3px solid #ffd700'
        },
        ball: {
          background: 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
          border: '3px solid #ffd700'
        },
        border: '3px solid #ffd700'
      }
    },
    {
      id: 'pong_retro',
      name: 'Retro Style',
      price: 50,
      image: 'https://example.com/retro-pong.png',
      preview: 'https://example.com/retro-pong-preview.gif',
      description: 'Classic arcade look with scanlines',
      rarity: 'common',
      type: 'skin',
      game: 'pong'
    }
  ],
  snake: [
    {
      id: 'snake_neon',
      name: 'Neon Viper',
      price: 150,
      image: '/assets/skins/snake/neon.png',
      preview: '/assets/skins/snake/neon_preview.png',
      description: 'A glowing neon snake that lights up the path!',
      rarity: 'rare',
      type: 'skin',
      game: 'snake',
      styles: {
        snake: {
          background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
          boxShadow: '0 0 15px rgba(255, 0, 255, 0.7)'
        }
      }
    },
    {
      id: 'snake_retro',
      name: 'Retro Arcade',
      price: 100,
      image: '/assets/skins/snake/retro.png',
      preview: '/assets/skins/snake/retro_preview.png',
      description: 'Classic arcade style with pixel art graphics',
      rarity: 'rare',
      type: 'skin',
      game: 'snake',
      styles: {
        snake: {
          background: '#000080',
          border: '2px solid #ffff00'
        }
      }
    },
    {
      id: 'snake_gold',
      name: 'Golden Snake',
      price: 200,
      image: '/assets/skins/snake/gold.png',
      preview: '/assets/skins/snake/gold_preview.png',
      description: 'A majestic golden snake for true champions!',
      rarity: 'legendary',
      type: 'skin',
      game: 'snake',
      styles: {
        snake: {
          background: 'linear-gradient(45deg, #ffd700, #ffa500)',
          boxShadow: '0 0 25px rgba(255, 215, 0, 0.8)'
        }
      }
    }
  ],
  tetris: [
    {
      id: 'tetris_cyberpunk',
      name: 'Cyberpunk',
      price: 200,
      image: '/assets/skins/tetris/cyberpunk.png',
      preview: '/assets/skins/tetris/cyberpunk_preview.png',
      description: 'Futuristic neon blocks with cyber effects',
      rarity: 'epic',
      type: 'skin',
      game: 'tetris',
      styles: {
        block: {
          background: '#1a0033',
          border: '2px solid #ff00ff',
          boxShadow: '0 0 30px #ff00ff'
        }
      }
    },
    {
      id: 'tetris_minimal',
      name: 'Minimalist',
      price: 150,
      image: '/assets/skins/tetris/minimal.png',
      preview: '/assets/skins/tetris/minimal_preview.png',
      description: 'Clean and modern minimalist design',
      rarity: 'rare',
      type: 'skin',
      game: 'tetris',
      styles: {
        block: {
          background: '#ffffff',
          border: '2px solid #000000',
          color: '#000000'
        }
      }
    }
  ],
  unblockme: [
    {
      id: 'unblockme_wooden',
      name: 'Wooden Classic',
      price: 125,
      image: '/assets/skins/unblockme/wooden.png',
      preview: '/assets/skins/unblockme/wooden_preview.png',
      description: 'Classic wooden texture with realistic grain',
      rarity: 'rare',
      type: 'skin',
      game: 'unblockme',
      styles: {
        block: {
          background: '#8b4513',
          boxShadow: '0 0 15px rgba(139, 69, 19, 0.5)',
          border: '2px solid #654321'
        }
      }
    },
    {
      id: 'unblockme_futuristic',
      name: 'Futuristic',
      price: 200,
      image: '/assets/skins/unblockme/futuristic.png',
      preview: '/assets/skins/unblockme/futuristic_preview.png',
      description: 'High-tech blocks with holographic effects',
      rarity: 'epic',
      type: 'skin',
      game: 'unblockme',
      styles: {
        block: {
          background: '#001a33',
          boxShadow: '0 0 20px #00ccff',
          border: '2px solid #00ccff'
        }
      }
    }
  ],
  'mini-metro': [
    {
      id: 'mini_metro_neon',
      name: 'Neon Metro',
      price: 200,
      image: '/assets/skins/mini-metro/neon.png',
      preview: '/assets/skins/mini-metro/neon_preview.png',
      description: 'Neon-lit stations and tracks that glow in the dark',
      rarity: 'epic',
      type: 'skin',
      game: 'mini-metro',
      styles: {
        station: {
          background: '#000000',
          boxShadow: '0 0 20px #ff00ff',
          border: '2px solid #ff00ff'
        }
      }
    },
    {
      id: 'mini_metro_blueprint',
      name: 'Blueprint',
      price: 150,
      image: '/assets/skins/mini-metro/blueprint.png',
      preview: '/assets/skins/mini-metro/blueprint_preview.png',
      description: 'Technical drawing style with blueprint aesthetics',
      rarity: 'rare',
      type: 'skin',
      game: 'mini-metro',
      styles: {
        station: {
          background: '#003366',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
          border: '2px solid #ffffff'
        }
      }
    },
    {
      id: 'mini_metro_night',
      name: 'Night Mode',
      price: 175,
      image: '/assets/skins/mini-metro/night.png',
      preview: '/assets/skins/mini-metro/night_preview.png',
      description: 'Dark theme with golden accents',
      rarity: 'epic',
      type: 'skin',
      game: 'mini-metro',
      styles: {
        station: {
          background: '#000000',
          boxShadow: '0 0 25px rgba(255, 215, 0, 0.3)',
          border: '2px solid #ffd700'
        }
      }
    }
  ]
};

const RARITY_COLORS = {
  common: '#95a5a6',
  rare: '#3498db',
  epic: '#9b59b6',
  legendary: '#f1c40f'
};

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [shopItems, setShopItems] = useState({ all: [], skins: [], effects: [] });
  const { coins, spendCoins } = useCoins();
  const { hasItem, addItem, equipItem, getEquippedSkin } = useInventory();
  const navigate = useNavigate();

  // Populate shop items
  useEffect(() => {
    const allItems = Object.values(GAME_ITEMS).flat();
    setShopItems({
      all: allItems,
      skins: allItems.filter(item => item.type === 'skin'),
      effects: allItems.filter(item => item.type === 'effect')
    });
  }, []);

  const handlePurchase = (item) => {
    if (coins >= item.price && !hasItem(item.id)) {
      if (spendCoins(item.price)) {
        addItem(item);
        equipItem(item);
        return true;
      }
    }
    return false;
  };

  const handleEquip = (e, item) => {
    e.stopPropagation();
    if (hasItem(item.id)) {
      equipItem(item);
    }
  };

  const getItemsToDisplay = () => {
    let items = shopItems[selectedCategory] || [];
    if (selectedGame !== 'all') {
      items = items.filter(item => item.game === selectedGame);
    }
    return items;
  };

  return (
    <ShopContainer>
      <CategoryTabs>
        <TabButton
          $active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        >
          All Items
        </TabButton>
        <TabButton
          $active={selectedCategory === 'skins'}
          onClick={() => setSelectedCategory('skins')}
        >
          Skins
        </TabButton>
        <TabButton
          $active={selectedCategory === 'effects'}
          onClick={() => setSelectedCategory('effects')}
        >
          Effects
        </TabButton>
      </CategoryTabs>

      <CategoryTabs>
        <TabButton
          $active={selectedGame === 'all'}
          onClick={() => setSelectedGame('all')}
        >
          All Games
        </TabButton>
        <TabButton
          $active={selectedGame === 'pong'}
          onClick={() => setSelectedGame('pong')}
        >
          Pong
        </TabButton>
        <TabButton
          $active={selectedGame === 'snake'}
          onClick={() => setSelectedGame('snake')}
        >
          Snake
        </TabButton>
        <TabButton
          $active={selectedGame === 'tetris'}
          onClick={() => setSelectedGame('tetris')}
        >
          Tetris
        </TabButton>
        <TabButton
          $active={selectedGame === 'unblockme'}
          onClick={() => setSelectedGame('unblockme')}
        >
          Unblock Me
        </TabButton>
        <TabButton
          $active={selectedGame === 'mini-metro'}
          onClick={() => setSelectedGame('mini-metro')}
        >
          Mini Metro
        </TabButton>
      </CategoryTabs>

      <ItemsGrid>
        {getItemsToDisplay().map(item => {
          const isOwned = hasItem(item.id);
          const equippedSkin = getEquippedSkin(item.game);
          const isEquipped = equippedSkin?.id === item.id;

          return (
            <ItemCard key={item.id} onClick={() => setSelectedItem(item)}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemRarity color={RARITY_COLORS[item.rarity]}>
                {item.rarity}
              </ItemRarity>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemPrice>
                <CoinIcon>🪙</CoinIcon>
                {item.price}
              </ItemPrice>
              {isOwned ? (
                <EquipButton 
                  onClick={(e) => handleEquip(e, item)}
                  equipped={isEquipped}
                >
                  {isEquipped ? 'Equipped' : 'Equip'}
                </EquipButton>
              ) : (
                <BuyButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    const success = handlePurchase(item);
                    if (success) {
                      alert(`Successfully purchased ${item.name}!`);
                    }
                  }}
                  disabled={coins < item.price}
                >
                  {coins < item.price ? `Need ${item.price - coins} more coins` : `Buy for ${item.price} coins`}
                </BuyButton>
              )}
            </ItemCard>
          );
        })}
      </ItemsGrid>

      {selectedItem && (
        <PreviewModal onClick={() => setSelectedItem(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedItem(null)}>×</CloseButton>
            <ItemImage src={selectedItem.preview || selectedItem.image} alt={selectedItem.name} />
            <ItemTitle>{selectedItem.name}</ItemTitle>
            <ItemDescription>{selectedItem.description}</ItemDescription>
            <PriceTag>
              <CoinIcon>🪙</CoinIcon>
              {selectedItem.price}
            </PriceTag>
          </ModalContent>
        </PreviewModal>
      )}
    </ShopContainer>
  );
} 
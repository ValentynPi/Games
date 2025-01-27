import React, { useState } from 'react';
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

const SHOP_ITEMS = {
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
        baseStyle: {
          height: 80,
          transition: 'all 0.3s ease'
        },
        playerPaddle: {
          background: 'linear-gradient(to right, #ff00ff, #00ffff)',
          boxShadow: '0 0 20px rgba(255, 0, 255, 0.7)',
          border: '2px solid #ff00ff'
        },
        computerPaddle: {
          background: 'linear-gradient(to left, #00ffff, #ff00ff)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.7)',
          border: '2px solid #00ffff'
        },
        ball: {
          background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
          boxShadow: '0 0 15px rgba(255, 0, 255, 0.7)',
          border: '2px solid #ff00ff'
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
      name: 'Neon Snake',
      price: 100,
      image: '/assets/skins/snake/neon.png',
      preview: '/assets/skins/snake/neon_preview.png',
      description: 'A glowing neon snake that lights up the path!',
      rarity: 'rare',
      type: 'skin',
      game: 'snake',
      styles: {
        snake: {
          background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
          boxShadow: '0 0 15px rgba(255, 0, 255, 0.7)',
          border: '2px solid #ff00ff'
        },
        food: {
          background: 'radial-gradient(#00ffff, #ff00ff)',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.7)',
          border: '2px solid #00ffff'
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
          boxShadow: '0 0 25px rgba(255, 215, 0, 0.8)',
          border: '3px solid #ffd700'
        },
        food: {
          background: 'radial-gradient(#ffd700, #ffa500)',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
          border: '3px solid #ffd700'
        }
      }
    }
  ],
  tetris: [
    {
      id: 'tetris_neon',
      name: 'Neon Blocks',
      price: 150,
      image: '/assets/skins/tetris/neon.png',
      preview: '/assets/skins/tetris/neon_preview.png',
      description: 'Glowing neon blocks that light up as they fall!',
      rarity: 'epic',
      type: 'skin',
      game: 'tetris',
      styles: {
        block: {
          background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
          boxShadow: '0 0 15px rgba(255, 0, 255, 0.7)',
          border: '2px solid #ff00ff'
        }
      }
    },
    {
      id: 'tetris_crystal',
      name: 'Crystal Blocks',
      price: 180,
      image: '/assets/skins/tetris/crystal.png',
      preview: '/assets/skins/tetris/crystal_preview.png',
      description: 'Beautiful crystal blocks that shimmer as they move!',
      rarity: 'epic',
      type: 'skin',
      game: 'tetris',
      styles: {
        block: {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(5px)'
        }
      }
    }
  ],
  unblockme: [
    {
      id: 'unblockme_ice',
      name: 'Ice Blocks',
      price: 120,
      image: '/assets/skins/unblockme/ice.png',
      preview: '/assets/skins/unblockme/ice_preview.png',
      description: 'Cool ice blocks that slide smoothly!',
      rarity: 'rare',
      type: 'skin',
      game: 'unblockme',
      styles: {
        baseStyle: {
          background: 'linear-gradient(135deg, #a8e6ff, #4fc3f7)',
          boxShadow: '0 0 15px rgba(79, 195, 247, 0.5)',
          border: '2px solid #4fc3f7'
        },
        mainBlock: {
          background: 'linear-gradient(45deg, #ff4081, #f50057)',
          boxShadow: '0 0 20px rgba(255, 64, 129, 0.6)',
          border: '2px solid #ff4081'
        },
        horizontalBlock: {
          background: 'linear-gradient(90deg, #66bb6a, #43a047)',
          boxShadow: '0 0 15px rgba(102, 187, 106, 0.5)',
          border: '2px solid #66bb6a'
        },
        verticalBlock: {
          background: 'linear-gradient(180deg, #5c6bc0, #3949ab)',
          boxShadow: '0 0 15px rgba(92, 107, 192, 0.5)',
          border: '2px solid #5c6bc0'
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
  const [selectedGame, setSelectedGame] = useState('pong');
  const [selectedItem, setSelectedItem] = useState(null);
  const { coins, spendCoins } = useCoins();
  const { hasItem, addItem, equipItem, getEquippedSkin } = useInventory();
  const navigate = useNavigate();

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
    e.stopPropagation(); // Prevent modal from opening
    if (hasItem(item.id)) {
      equipItem(item);
    }
  };

  return (
    <ShopContainer>
      <CategoryTabs>
        <TabButton 
          active={selectedGame === 'pong'} 
          onClick={() => setSelectedGame('pong')}
        >
          Pong
        </TabButton>
        <TabButton 
          active={selectedGame === 'snake'} 
          onClick={() => setSelectedGame('snake')}
        >
          Snake
        </TabButton>
        <TabButton 
          active={selectedGame === 'tetris'} 
          onClick={() => setSelectedGame('tetris')}
        >
          Tetris
        </TabButton>
        <TabButton 
          active={selectedGame === 'unblockme'} 
          onClick={() => setSelectedGame('unblockme')}
        >
          Unblock Me
        </TabButton>
      </CategoryTabs>

      <ItemsGrid>
        {(SHOP_ITEMS[selectedGame] || []).map(item => {
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
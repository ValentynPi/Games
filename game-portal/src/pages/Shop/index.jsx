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
  BuyButton,
  CategoryTabs,
  TabButton,
  PreviewModal,
  ModalContent,
  CloseButton,
  ItemDescription,
  PriceTag,
  CoinIcon,
  ItemRarity
} from './styles';
import { games } from '../../components/GameList';

const RARITY_COLORS = {
  common: '#95a5a6',
  rare: '#3498db',
  epic: '#9b59b6',
  legendary: '#f1c40f'
};

const getRarity = (price) => {
  if (price <= 50) return 'common';
  if (price <= 100) return 'rare';
  if (price <= 150) return 'epic';
  return 'legendary';
};

const DEFAULT_SKIN_IMAGES = {
  snake: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/skins/snake/default.png',
  tetris: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/skins/tetris/default.png',
  pong: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/skins/pong/default.png',
  unblockme: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/skins/unblockme/default.png'
};

export default function Shop() {
  const [selectedGame, setSelectedGame] = useState('all');
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
    e.stopPropagation();
    if (hasItem(item.id)) {
      equipItem(item);
    }
  };

  const getItemsToDisplay = () => {
    let items = [];
    games.forEach(game => {
      if (game.skins) {
        game.skins.forEach(skin => {
          items.push({
            ...skin,
            gameId: game.id,
            gameName: game.title,
            rarity: getRarity(skin.price),
            image: skin.image || DEFAULT_SKIN_IMAGES[game.id]
          });
        });
      }
    });

    if (selectedGame !== 'all') {
      items = items.filter(item => item.gameId === selectedGame);
    }

    return items;
  };

  return (
    <ShopContainer>
      <CategoryTabs>
        <TabButton
          $active={selectedGame === 'all'}
          onClick={() => setSelectedGame('all')}
        >
          All Games
        </TabButton>
        {games.map(game => (
          <TabButton
            key={game.id}
            $active={selectedGame === game.id}
            onClick={() => setSelectedGame(game.id)}
          >
            {game.title}
          </TabButton>
        ))}
      </CategoryTabs>

      <ItemsGrid>
        {getItemsToDisplay().map(item => {
          const isOwned = hasItem(item.id);
          const equippedSkin = getEquippedSkin(item.gameId);
          const isEquipped = equippedSkin?.id === item.id;

          return (
            <ItemCard key={item.id} onClick={() => setSelectedItem(item)}>
              <ItemImage style={item.styles?.baseStyle}>
                <img src={item.image} alt={item.name} />
              </ItemImage>
              <ItemRarity color={RARITY_COLORS[item.rarity]}>
                {item.rarity}
              </ItemRarity>
              <ItemTitle>{item.name}</ItemTitle>
              {!isOwned && (
                <PriceTag>
                  <CoinIcon>💎</CoinIcon>
                  {item.price}
                </PriceTag>
              )}
              <BuyButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (isOwned) {
                    handleEquip(e, item);
                  } else {
                    const success = handlePurchase(item);
                    if (success) {
                      alert(`Successfully purchased ${item.name}!`);
                    }
                  }
                }}
                disabled={!isOwned && coins < item.price}
                equipped={isEquipped}
              >
                {isEquipped ? 'Equipped' : isOwned ? 'Equip' : `Buy for ${item.price} coins`}
              </BuyButton>
            </ItemCard>
          );
        })}
      </ItemsGrid>

      {selectedItem && (
        <PreviewModal onClick={() => setSelectedItem(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedItem(null)}>×</CloseButton>
            <ItemImage style={selectedItem.styles?.baseStyle}>
              <img src={selectedItem.image} alt={selectedItem.name} />
            </ItemImage>
            <ItemTitle>{selectedItem.name}</ItemTitle>
            <ItemDescription>{selectedItem.description}</ItemDescription>
            <PriceTag>
              <CoinIcon>💎</CoinIcon>
              {selectedItem.price}
            </PriceTag>
          </ModalContent>
        </PreviewModal>
      )}
    </ShopContainer>
  );
} 
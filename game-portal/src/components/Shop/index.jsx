import React, { useState } from 'react';
import styled from 'styled-components';
import { useCoins } from '../../contexts/CoinContext';
import { useInventory } from '../../contexts/InventoryContext';
import { games } from '../GameList';

const ShopContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: #0a192f;
  color: #fff;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.$active ? '#2d5af7' : '#1a2c4e'};
  color: ${props => props.$active ? '#fff' : '#8892b0'};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${props => props.$active ? '#2d5af7' : '#233c6a'};
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ItemCard = styled.div`
  background: #112240;
  border: 1px solid #233c6a;
  border-radius: 8px;
  overflow: hidden;
  height: 320px;
  display: flex;
  flex-direction: column;
`;

const ItemImage = styled.div`
  width: 100%;
  height: 180px;
  background: ${props => props.style?.backgroundColor || '#1a2c4e'};
  border: ${props => props.style?.border || 'none'};
  box-shadow: ${props => props.style?.boxShadow || 'none'};
`;

const ItemInfo = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-grow: 1;
`;

const RarityTag = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props => {
    switch (props.rarity) {
      case 'COMMON': return '#8892b0';
      case 'RARE': return '#2d5af7';
      case 'EPIC': return '#7c5af7';
      case 'LEGENDARY': return '#5af7eb';
      default: return '#8892b0';
    }
  }};
`;

const ItemName = styled.h3`
  font-size: 1.125rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
`;

const PriceTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #5af7eb;
  margin-top: auto;

  &::before {
    content: '💎';
    font-size: 1.25rem;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  background: ${props => props.equipped ? '#1a2c4e' : '#2d5af7'};
  color: ${props => props.equipped ? '#8892b0' : '#fff'};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    background: ${props => props.equipped ? '#233c6a' : '#4a6ef8'};
  }
`;

const CoinsDisplay = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #112240;
  border: 1px solid #233c6a;
  border-radius: 6px;
  color: #5af7eb;
  font-weight: 700;
  font-size: 1.125rem;

  &::before {
    content: '💎';
    font-size: 1.125rem;
  }
`;

const getRarity = (price) => {
  if (price <= 50) return 'COMMON';
  if (price <= 100) return 'RARE';
  if (price <= 150) return 'EPIC';
  return 'LEGENDARY';
};

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { coins, addCoins } = useCoins();
  const { inventory, addToInventory, equipItem } = useInventory();

  const handlePurchase = (item) => {
    if (coins >= item.price && !inventory.includes(item.id)) {
      addCoins(-item.price);
      addToInventory(item.id);
    }
  };

  const handleEquip = (item) => {
    equipItem(item.id);
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
            styles: skin.styles || {},
            rarity: getRarity(skin.price)
          });
        });
      }
    });

    if (selectedCategory !== 'all') {
      items = items.filter(item => item.gameId === selectedCategory);
    }

    return items;
  };

  return (
    <ShopContainer key="shop-container-blue">
      <CoinsDisplay>{coins}</CoinsDisplay>
      <CategoryTabs>
        <TabButton
          $active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        >
          All Items
        </TabButton>
        {games.map(game => (
          <TabButton
            key={game.id}
            $active={selectedCategory === game.id}
            onClick={() => setSelectedCategory(game.id)}
          >
            {game.title}
          </TabButton>
        ))}
      </CategoryTabs>
      <ItemsGrid>
        {getItemsToDisplay().map(item => {
          const isOwned = inventory.includes(item.id);
          const isEquipped = isOwned && item.equipped;

          return (
            <ItemCard key={item.id}>
              <ItemImage style={item.styles.baseStyle} />
              <ItemInfo>
                <RarityTag rarity={item.rarity}>{item.rarity}</RarityTag>
                <ItemName>{item.name}</ItemName>
                {!isOwned && <PriceTag>{item.price}</PriceTag>}
              </ItemInfo>
              <ActionButton
                onClick={() => isOwned ? handleEquip(item) : handlePurchase(item)}
                disabled={!isOwned && coins < item.price}
                equipped={isEquipped}
              >
                {isEquipped ? 'Equipped' : isOwned ? 'Equip' : `Buy for ${item.price} coins`}
              </ActionButton>
            </ItemCard>
          );
        })}
      </ItemsGrid>
    </ShopContainer>
  );
}; 
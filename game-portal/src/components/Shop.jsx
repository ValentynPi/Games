import React from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import { useInventory } from '../contexts/InventoryContext';
import { useCoins } from '../contexts/CoinContext';
import { games } from './GameList';
import isPropValid from '@emotion/is-prop-valid';

const ShopContainer = styled.div`
  padding: 20px;
  color: white;
`;

const SkinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const SkinButton = styled.button.attrs(props => ({
  type: 'button',
  'data-equipped': props.$equipped,
  'data-active': props.$active
}))`
  background-color: ${props => props.$equipped ? '#2d8a4e' : '#2a2a2a'};
  color: white;
  padding: 15px;
  border: 2px solid ${props => props.$active ? '#ffffff' : '#2d8a4e'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(45, 138, 78, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Price = styled.span`
  color: #ffd700;
  font-weight: bold;
`;

export const Shop = ({ gameId }) => {
  const { coins } = useCoins();
  const { ownedSkins, equippedSkins, purchaseSkin, equipSkin } = useInventory();
  const game = games.find(g => g.id === gameId);

  if (!game) return null;

  const handleSkinAction = (skin) => {
    if (!ownedSkins.includes(skin.id)) {
      if (coins >= skin.price) {
        purchaseSkin(skin.id, skin.price);
      }
    } else {
      equipSkin(gameId, skin.id);
    }
  };

  return (
    <StyleSheetManager shouldComponentUpdate={(prop) => isPropValid(prop)}>
      <ShopContainer>
        <h2>Shop</h2>
        <SkinGrid>
          {game.skins.map(skin => {
            const isOwned = ownedSkins.includes(skin.id);
            const isEquipped = equippedSkins[gameId] === skin.id;
            const canAfford = coins >= skin.price;

            return (
              <SkinButton
                key={skin.id}
                onClick={() => handleSkinAction(skin)}
                disabled={!isOwned && !canAfford}
                $equipped={isEquipped}
                $active={isOwned}
              >
                <div>{skin.name}</div>
                {!isOwned && <Price>{skin.price} Coins</Price>}
                {isEquipped && <div>Equipped</div>}
              </SkinButton>
            );
          })}
        </SkinGrid>
      </ShopContainer>
    </StyleSheetManager>
  );
}; 
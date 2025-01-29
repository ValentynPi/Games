import React, { useState } from 'react';
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

const CodeRedemptionSection = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 2px solid #2d8a4e;
`;

const CodeInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  background-color: #1a1a1a;
  border: 2px solid #2d8a4e;
  border-radius: 4px;
  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const RedeemButton = styled.button`
  padding: 10px 20px;
  background-color: #2d8a4e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3cb371;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  margin-top: 10px;
  color: ${props => props.$success ? '#2ecc71' : '#e74c3c'};
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.$active ? '#2d8a4e' : '#2a2a2a'};
  color: white;
  border: 2px solid ${props => props.$active ? '#3cb371' : '#2d8a4e'};
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;

  &:hover {
    background-color: #3cb371;
  }
`;

const CodesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 2px solid #2d8a4e;
  max-width: 600px;
  margin: 0 auto;
`;

const CodeTitle = styled.h2`
  color: #3cb371;
  margin-bottom: 20px;
  font-size: 28px;
`;

const CodeDescription = styled.p`
  color: #ffffff;
  text-align: center;
  margin-bottom: 30px;
  font-size: 18px;
  line-height: 1.5;
`;

export const Shop = ({ gameId }) => {
  const { coins, addCoins } = useCoins();
  const { ownedSkins, equippedSkins, purchaseSkin, equipSkin } = useInventory();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [usedCodes, setUsedCodes] = useState(new Set());
  const [activeTab, setActiveTab] = useState('skins');
  const game = games.find(g => g.id === gameId);

  const handleSkinAction = (skin) => {
    if (!ownedSkins.includes(skin.id)) {
      if (coins >= skin.price) {
        purchaseSkin(skin.id, skin.price);
      }
    } else {
      equipSkin(gameId, skin.id);
    }
  };

  const handleCodeRedeem = () => {
    const trimmedCode = code.trim().toLowerCase();
    
    if (usedCodes.has(trimmedCode)) {
      setMessage('This code has already been used!');
      return;
    }

    if (trimmedCode === 'pidlypniy') {
      addCoins(100000);
      setUsedCodes(prev => new Set([...prev, trimmedCode]));
      setMessage('Successfully redeemed 100,000 coins!');
      setCode('');
    } else {
      setMessage('Invalid code!');
    }
  };

  const renderContent = () => {
    if (activeTab === 'codes') {
      return (
        <CodesSection>
          <CodeTitle>Redeem Codes</CodeTitle>
          <CodeDescription>
            Enter special codes to receive bonus coins and exclusive items!
            <br />
            Try entering the code "pidlypniy" for a special reward!
          </CodeDescription>
          <div>
            <CodeInput
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code..."
            />
            <RedeemButton onClick={handleCodeRedeem}>
              Redeem
            </RedeemButton>
          </div>
          {message && (
            <Message $success={message.includes('Successfully')}>
              {message}
            </Message>
          )}
        </CodesSection>
      );
    }

    return game ? (
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
    ) : (
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Select a game to view available skins</h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          {games.map(g => (
            <SkinButton
              key={g.id}
              onClick={() => window.location.href = `/shop?game=${g.id}`}
              $active={false}
            >
              {g.title}
            </SkinButton>
          ))}
        </div>
      </div>
    );
  };

  return (
    <StyleSheetManager shouldComponentUpdate={(prop) => isPropValid(prop)}>
      <ShopContainer>
        <h2>Shop</h2>
        
        <TabContainer>
          <Tab
            $active={activeTab === 'skins'}
            onClick={() => setActiveTab('skins')}
          >
            Skins
          </Tab>
          <Tab
            $active={activeTab === 'codes'}
            onClick={() => setActiveTab('codes')}
          >
            Codes
          </Tab>
        </TabContainer>

        {renderContent()}
      </ShopContainer>
    </StyleSheetManager>
  );
}; 
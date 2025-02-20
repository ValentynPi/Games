import React from 'react';
import { useCoins } from '../../contexts/CoinContext';
import styled from 'styled-components';

const CoinContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  z-index: 1000;
`;

const CoinIcon = styled.span`
  font-size: 24px;
`;

const CoinAmount = styled.span`
  color: #2c3e50;
  font-weight: bold;
  font-size: 18px;
`;

export const CoinDisplay = () => {
  const { coins } = useCoins();

  return (
    <CoinContainer>
      <CoinIcon>🪙</CoinIcon>
      <CoinAmount>{coins}</CoinAmount>
    </CoinContainer>
  );
}; 
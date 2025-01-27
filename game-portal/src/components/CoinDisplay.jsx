import React from 'react';
import styled from 'styled-components';
import { useCoins } from '../contexts/CoinContext';

const CoinContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  z-index: 1000;
  animation: ${props => props.theme.animations?.fadeIn || 'none'} 0.3s ease-out;
`;

const CoinIcon = styled.span`
  font-size: 24px;
`;

const CoinAmount = styled.span`
  color: #2c3e50;
  font-size: 18px;
  font-weight: bold;
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